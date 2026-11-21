package com.example.fitplan;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import java.util.Calendar;

/** Reliable water reminders that work even when the app is closed or the device is in Doze mode. */
public class Reminder extends BroadcastReceiver {
    private static final String CHANNEL = "water_v2";
    private static final String ACTION = "com.example.fitplan.WATER";
    private static final String[] MESSAGES = new String[]{
            "اشرب كوب ماء دلوقتي عشان الحرق يفضل شغال وسجّله في خطتي",
            "فكّر نفسك بكوب ماء! الترطيب بيقلل الجوع ويساعد على تنزيل الكرش",
            "وقت كوب ماء جديد — افتح خطتي وسجّله بضغطة واحدة"
    };

    static void schedule(Context c, boolean on, int minutes) {
        int mins = Math.max(15, minutes);
        c.getSharedPreferences("reminder", 0).edit()
                .putBoolean("on", on).putInt("min", mins).apply();
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        PendingIntent pi = pending(c);
        am.cancel(pi);
        if (on) {
            scheduleNext(am, pi, System.currentTimeMillis() + mins * 60_000L);
        }
    }

    private static PendingIntent pending(Context c) {
        Intent i = new Intent(c, Reminder.class).setAction(ACTION);
        return PendingIntent.getBroadcast(c, 0, i,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private static void scheduleNext(AlarmManager am, PendingIntent pi, long triggerAt) {
        if (Build.VERSION.SDK_INT >= 23) {
            am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pi);
        } else {
            am.set(AlarmManager.RTC_WAKEUP, triggerAt, pi);
        }
    }

    @Override
    public void onReceive(Context c, Intent intent) {
        SharedPreferences p = c.getSharedPreferences("reminder", 0);
        boolean on = p.getBoolean("on", false);
        int mins = Math.max(15, p.getInt("min", 60));

        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            if (on) schedule(c, true, mins);
            return;
        }
        if (!on) return;

        // Re-arm the next reminder first so it keeps repeating reliably across Doze cycles.
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am != null) {
            scheduleNext(am, pending(c), System.currentTimeMillis() + mins * 60_000L);
        }

        int h = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        if (h < 8 || h >= 23) return; // quiet hours (11 PM - 8 AM)
        int idx = p.getInt("msgIdx", 0);
        p.edit().putInt("msgIdx", (idx + 1) % MESSAGES.length).apply();
        show(c, "💧 وقت شرب الماء!", MESSAGES[idx % MESSAGES.length]);
    }

    static void show(Context c) {
        show(c, "💧 وقت شرب الماء!", MESSAGES[0]);
    }

    static void showConfirmed(Context c, int minutes) {
        String txt = minutes < 60
                ? "تم تفعيل التذكير — هنفكّرك تشرب ماء كل " + minutes + " دقيقة (من 8 ص لـ 11 م)"
                : "تم تفعيل التذكير — هنفكّرك تشرب ماء كل " + (minutes / 60) + " ساعة (من 8 ص لـ 11 م)";
        show(c, "✅ تذكير الماء شغال!", txt);
    }

    static void show(Context c, String title, String body) {
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel ch = new NotificationChannel(
                    CHANNEL, "تذكير شرب الماء", NotificationManager.IMPORTANCE_HIGH);
            ch.enableVibration(true);
            ch.setVibrationPattern(new long[]{0, 250, 150, 250});
            nm.createNotificationChannel(ch);
        }
        Intent open = new Intent(c, MainActivity.class)
                .setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent po = PendingIntent.getActivity(c, 1, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26
                ? new Notification.Builder(c, CHANNEL) : new Notification.Builder(c);
        b.setSmallIcon(R.drawable.ic_stat_water)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new Notification.BigTextStyle().bigText(body))
                .setDefaults(Notification.DEFAULT_ALL)
                .setAutoCancel(true)
                .setContentIntent(po);
        nm.notify(1, b.build());
    }
}
