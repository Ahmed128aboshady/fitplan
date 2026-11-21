package com.example.fitplan;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedDispatcher;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/** Hosts the FitPlan web app (assets/index.html) in a WebView and exposes native helpers to JS. */
public class MainActivity extends Activity implements SensorEventListener {
    private static final int BG = Color.parseColor("#f7f8f2");
    private static final int REQ_STEPS = 2;
    private WebView web;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private SensorManager sm;
    private Sensor stepSensor;
    private boolean stepListening = false;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(BG);
        getWindow().setNavigationBarColor(BG);
        getWindow().getDecorView().setBackgroundColor(BG);
        int systemUi = android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
        if (Build.VERSION.SDK_INT >= 26) systemUi |= android.view.View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        getWindow().getDecorView().setSystemUiVisibility(systemUi);

        sm = (SensorManager) getSystemService(SENSOR_SERVICE);
        if (sm != null) stepSensor = sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(BG);
        web = new WebView(this);
        web.setBackgroundColor(BG);
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));

        // Keep content clear of the status/navigation bars (edge-to-edge on Android 15+).
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int l, t, r, b;
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets i = insets.getInsets(
                        WindowInsets.Type.systemBars() | WindowInsets.Type.ime() | WindowInsets.Type.displayCutout());
                l = i.left; t = i.top; r = i.right; b = i.bottom;
            } else {
                l = insets.getSystemWindowInsetLeft(); t = insets.getSystemWindowInsetTop();
                r = insets.getSystemWindowInsetRight(); b = insets.getSystemWindowInsetBottom();
            }
            v.setPadding(l, t, r, b);
            return insets;
        });

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        web.setWebViewClient(new WebViewClient());
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "AndroidApp");
        web.loadUrl("file:///android_asset/index.html");
        setContentView(root);

        tts = new TextToSpeech(this, status -> {
            if (status != TextToSpeech.SUCCESS) return;
            int res = tts.setLanguage(new Locale("ar", "EG"));
            if (res < 0) res = tts.setLanguage(new Locale("ar"));
            ttsReady = res >= 0;
        });

        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::handleBack);
        }

        tryStartSteps();
        Updater.check(this, false);
    }

    @Override
    protected void onResume() {
        super.onResume();
        tryStartSteps();
        Updater.resumePendingInstall(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (sm != null && stepListening) {
            sm.unregisterListener(this);
            stepListening = false;
        }
    }

    private boolean hasStepPerm() {
        if (Build.VERSION.SDK_INT < 29) return true;
        return checkSelfPermission(Manifest.permission.ACTIVITY_RECOGNITION) == PackageManager.PERMISSION_GRANTED;
    }

    private void tryStartSteps() {
        if (stepSensor == null || sm == null || stepListening || !hasStepPerm()) return;
        stepListening = sm.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    public void onRequestPermissionsResult(int req, String[] perms, int[] results) {
        super.onRequestPermissionsResult(req, perms, results);
        if (req == REQ_STEPS && results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            tryStartSteps();
            if (web != null) web.evaluateJavascript("syncNativeSteps();renderAll();", null);
        } else if (req == 1 && results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            int mins = getSharedPreferences("reminder", 0).getInt("min", 60);
            Reminder.showConfirmed(this, mins);
        } else if (req == 3 && results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            Reminder.show(this);
        }
    }

    private String todayKey() {
        return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
    }

    private int readTodaySteps() {
        SharedPreferences p = getSharedPreferences("steps", 0);
        if (!todayKey().equals(p.getString("day", ""))) return 0;
        return p.getInt("today", 0);
    }

    @Override
    public void onSensorChanged(SensorEvent e) {
        if (e.sensor.getType() != Sensor.TYPE_STEP_COUNTER || e.values.length == 0) return;
        int total = (int) e.values[0];
        String tk = todayKey();
        SharedPreferences p = getSharedPreferences("steps", 0);
        String savedDay = p.getString("day", "");
        int base = p.getInt("base", -1);
        int offset = p.getInt("offset", 0);
        int today;
        if (!tk.equals(savedDay) || base < 0) {
            base = total;
            offset = 0;
            today = 0;
        } else if (total < base) {
            // Device rebooted mid-day; keep accumulated steps in offset
            offset = p.getInt("today", 0);
            base = total;
            today = offset;
        } else {
            today = offset + (total - base);
        }
        p.edit().putString("day", tk).putInt("base", base).putInt("offset", offset).putInt("today", today).apply();
        final int val = today;
        runOnUiThread(() -> {
            if (web != null) web.evaluateJavascript("window.onNativeSteps && onNativeSteps(" + val + ")", null);
        });
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}

    private void handleBack() {
        web.evaluateJavascript("(window.handleBack && handleBack()) ? 'y' : 'n'", res -> {
            if (res == null || !res.contains("y")) finish();
        });
    }

    // API 33+ is handled by OnBackInvokedDispatcher in onCreate.
    // Keep this callback only for Android 7–12 compatibility.
    @SuppressLint("GestureBackNavigation")
    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        handleBack();
    }

    @Override
    protected void onDestroy() {
        if (sm != null && stepListening) sm.unregisterListener(this);
        if (tts != null) tts.shutdown();
        if (web != null) web.destroy();
        super.onDestroy();
    }

    /** Methods callable from JavaScript as window.AndroidApp.* */
    private class Bridge {
        @JavascriptInterface
        public void speak(String text) {
            if (tts != null && ttsReady) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "fitplan");
        }

        @JavascriptInterface
        public void stopSpeak() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public void vibrate(int ms) {
            Vibrator v = (Vibrator) getSystemService(VIBRATOR_SERVICE);
            if (v == null) return;
            if (Build.VERSION.SDK_INT >= 26) {
                v.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                v.vibrate(ms);
            }
        }

        @JavascriptInterface
        public void keepScreenOn(boolean on) {
            runOnUiThread(() -> {
                if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }

        @JavascriptInterface
        public void setReminder(boolean on, int minutes) {
            runOnUiThread(() -> {
                Reminder.schedule(MainActivity.this, on, minutes);
                if (on) {
                    if (Build.VERSION.SDK_INT >= 33
                            && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                            != PackageManager.PERMISSION_GRANTED) {
                        requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 1);
                    }
                }
            });
        }

        @JavascriptInterface
        public void testNotification() {
            runOnUiThread(() -> {
                if (Build.VERSION.SDK_INT >= 33
                        && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                        != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 3);
                } else {
                    Reminder.show(MainActivity.this);
                }
            });
        }

        @JavascriptInterface
        public boolean hasStepSensor() {
            return stepSensor != null;
        }

        @JavascriptInterface
        public boolean isStepActive() {
            return stepSensor != null && hasStepPerm();
        }

        @JavascriptInterface
        public void requestSteps() {
            runOnUiThread(() -> {
                if (Build.VERSION.SDK_INT >= 29 && !hasStepPerm()) {
                    requestPermissions(new String[]{Manifest.permission.ACTIVITY_RECOGNITION}, REQ_STEPS);
                } else {
                    tryStartSteps();
                }
            });
        }

        @JavascriptInterface
        public int getTodaySteps() {
            return readTodaySteps();
        }

        @JavascriptInterface
        public void checkForUpdate() {
            Updater.check(MainActivity.this, true);
        }

        @JavascriptInterface
        public String getVersionName() {
            return Updater.currentVersion(MainActivity.this);
        }
    }
}
