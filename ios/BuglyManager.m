//
//  Buglyanager.m
//  MiningApp
//
//  Created by roger on 2022/5/12.
//

#import <Foundation/Foundation.h>
#import <Bugly/Bugly.h>
#import "BuglyManager.h"

@interface BuglyManager ()


@end

@implementation BuglyManager

// To export a module
RCT_EXPORT_MODULE(BuglyManagerIOS);

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
- (NSDictionary *)constantsToExport
{
  return @{
  };
}

RCT_EXPORT_METHOD(init:(NSDictionary *)options)
{
  NSString* value = [ options objectForKey:@"appid" ];
  [ Bugly startWithAppId: value ];
}
RCT_EXPORT_METHOD(setUserIdentifier:(NSDictionary *)options)
{
  [ Bugly setUserIdentifier: [ options objectForKey:@"value" ]];
}
RCT_EXPORT_METHOD(setUserValue:(NSDictionary *)options)
{
  [ Bugly setUserValue:[ options objectForKey:@"value" ] forKey:[ options objectForKey:@"key" ] ];
}
RCT_EXPORT_METHOD(setTag:(NSDictionary *)options)
{
  NSNumber* value = [ options objectForKey:@"value" ];
  if (value)
    [ Bugly setTag: [ value integerValue ] ];
}

RCT_EXPORT_METHOD(getCurrentTag:(NSDictionary *)options c:(RCTResponseSenderBlock)successCallback)
{
  successCallback(@[ [ NSNumber numberWithLong:[ Bugly currentTag ]] ]);
}
RCT_EXPORT_METHOD(getAllUserValues:(NSDictionary *)options c:(RCTResponseSenderBlock)successCallback)
{
  successCallback(@[ [ Bugly allUserValues ] ]);
}
RCT_EXPORT_METHOD(reportException:(NSDictionary *)options)
{
  NSNumber* errorContent = [ options objectForKey:@"errorContent" ];
  if (errorContent)
      [ Bugly reportException: [ NSException exceptionWithName:NSGenericException reason:errorContent userInfo:nil ]];
}

@end
