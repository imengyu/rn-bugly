import { NativeModules, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
 
/**
 * 初始化 bugly
 * @param options 参数
 */
function init(options: {
  /**
   * 必填，注册时申请的APPID
   */
  appid: string,
  /**
   * 调试模式开关，默认false
   * @platform Android
   */
  debug?: boolean,
}) {
  NativeModules.BuglyModule.init(options);
}

/**
 * 开启或关闭 Bugly
 * @param enable 状态
 * @platform Android
 */
function enableBugly(enable: boolean) {
  NativeModules.BuglyModule.enableBugly(enable);
}

/**
 * 上报自定义异常
 * @param err 异常字符串
 * @platform Android iOS
 */
function reportException(err: string) {
  if (isAndroid)
    NativeModules.BuglyModule.postCatchedException(err);
  else if (isIOS)
    NativeModules.BuglyManagerIOS.reportException({ errorContent: err });
}

/**
 * 设置自定义设备唯一标识
 * @param s
 * @platform Android iOS
 */
function setUserId(s: string) {
  if (isAndroid)
    NativeModules.BuglyModule?.setUserId(s);
  else if (isIOS)
    NativeModules.BuglyManagerIOS?.setUserIdentifier({ value: s });
}
/**
 * 设置设备型号
 * @param s
 * @platform Android
 */
function setDeviceModel(s: string) {
  if (isAndroid)
    NativeModules.BuglyModule.setDeviceModel(s);
}
/**
 * 设置设备id
 * @param s
 */
function setDeviceId(s: string) {
  if (isAndroid)
    NativeModules.BuglyModule.setDeviceId(s);
}
/**
 * 设置App渠道
 * @param s
 * @platform Android
 */
function setAppChannel(s: string) {
  if (isAndroid)
    NativeModules.BuglyModule.setAppChannel(s);
}
/**
 * 设置关键数据，随崩溃信息上报
 * @param key 键
 * @param value 值
 * @platform Android iOS
 */
function setUserValue(key: string, value: string) {
  if (isAndroid)
    NativeModules.BuglyModule?.putUserData(key, value);
  if (isIOS)
    NativeModules.BuglyManagerIOS?.setUserValue({ key, value });
}
/**
 * 设置标签
 * @param tag
 * @platform iOS
 */
function setTag(tag: String) {
  if (isIOS)
    NativeModules.BuglyManagerIOS.setUserValue({ value: tag });
}

/**
 * 测试 ANR
 * @platform Android
 */
function testANRCrash() {
  if (isAndroid)
    NativeModules.BuglyModule.testANRCrash();
}
/**
 * 测试NDK层崩溃
 * @platform Android
 */
function testNativeCrash() {
  if (isAndroid)
    NativeModules.BuglyModule.testNativeCrash();
}
/**
 * 测试Java代码崩溃
 * @platform Android
 */
function testJavaCrash() {
  if (isAndroid)
    NativeModules.BuglyModule.testJavaCrash();
}

export default {
  init,
  enableBugly,
  setUserId,
  setDeviceModel,
  setDeviceId,
  setAppChannel,
  setUserValue,
  setTag,
  reportException,
  testANRCrash,
  testNativeCrash,
  testJavaCrash,
};

