plugins {
  alias(libs.plugins.android.application)
}

android {
  namespace = "com.example.fitplan"
  compileSdk = 36
  defaultConfig {
    applicationId = "com.example.fitplan"
    minSdk = 24
    targetSdk = 36
    versionCode = 5
    versionName = "2.2"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
    }
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
  buildFeatures {
    aidl = false
    buildConfig = false
    shaders = false
  }
}
