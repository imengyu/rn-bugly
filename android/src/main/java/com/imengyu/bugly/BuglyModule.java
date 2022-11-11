package com.imengyu.bugly;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.JavascriptException;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.HashMap;
import java.util.Map;

public class BuglyModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "BuglyModule";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  public BuglyModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }
  /**
   * 初始化 bugly
   */
  @ReactMethod
  public void init(ReadableMap options) {
    boolean debug = false;
    if (options.hasKey("debug"))
      debug = options.getBoolean("debug");
    CrashReport.initCrashReport(
      context.getApplicationContext(), 
      options.getString("appid"), 
      debug);
  }

  /**
   * 手动上发异常
   */
  @ReactMethod
  public void postCatchedException(String stack) {
    CrashReport.postCatchedException(new JavascriptException(stack));
  }

  @ReactMethod
  private void setUserId(String userId) {
    CrashReport.setUserId(reactContext, userId);
  }
  @ReactMethod
  private void setDeviceModel(String model) {
    CrashReport.setDeviceModel(reactContext, model);
  }
  @ReactMethod
  private void setDeviceId(String id) {
    CrashReport.setDeviceId(reactContext, id);
  }
  @ReactMethod
  private void setAppChannel(String id) {
    CrashReport.setAppChannel(reactContext, id);
  }
  @ReactMethod
  private void putUserData(String key, String value) {
    CrashReport.putUserData(reactContext, key, value);
  }
  @ReactMethod
  private void testANRCrash() {
    reactContext.getCurrentActivity().runOnUiThread(CrashReport::testANRCrash);
  }
  @ReactMethod
  private void testNativeCrash() {
    reactContext.getCurrentActivity().runOnUiThread(CrashReport::testNativeCrash);
  }
  @ReactMethod
  private void testJavaCrash() {
    reactContext.getCurrentActivity().runOnUiThread(CrashReport::testJavaCrash);
  }
  @ReactMethod
  private void enableBugly(Boolean b) {
    CrashReport.enableBugly(b);
  }

}

