//
//  TestTweak.m
//  TestTweak
//
//  Created by Ryan Pendleton on 10/18/14.
//
//

#import "TestTweak.h"
#import <notify.h>

static TestTweak *_shared = nil;

@interface NSObject (SpringBoard)
- (instancetype)sharedInstance;
@end

@implementation TestTweak {
	int _displayToken;
	int _ringerToken;
	
	uint64_t _displayState;
	uint64_t _ringerState;
	
	LMAlertView *_alert;
}

@synthesize mainWindow = _mainWindow;

+ (void)load
{
	_shared = [self new];
}

- (id)init
{
	if(self = [super init])
	{
		notify_register_dispatch("com.apple.springboard.ringerstate", &_ringerToken, dispatch_get_main_queue(), ^(int token) {
			notify_get_state(_ringerToken, &_ringerState);
			
			if(_displayState == YES && _ringerState == YES)
			{
				_alert = [[LMAlertView alloc] initWithTitle:@"Device Not In Silent"
													message:@"You just took your device out of silent mode."
												   delegate:self
										  cancelButtonTitle:@"Okay"
										  otherButtonTitles:nil];
				
				[_alert setTintColor:[UIColor colorWithRed:14.0/255.0
													 green:122.0/255.0
													  blue:254.0/255.0
													 alpha:1.0]];
				
				[_alert show];
			}
		});
		
		notify_register_dispatch("com.apple.iokit.hid.displayStatus", &_displayToken, dispatch_get_main_queue(), ^(int info) {
			notify_get_state(_displayToken, &_displayState);
			
			if(_displayState == NO && _alert != nil)
			{
				[_alert dismissWithClickedButtonIndex:0 animated:NO];
				_alert = nil;
			}
		});
		
		notify_get_state(_ringerToken, &_ringerState);
		notify_get_state(_displayToken, &_displayState);
	}
	
	return self;
}

- (UIWindow *)mainWindow
{
	return [[NSClassFromString(@"SBUIController") sharedInstance] window];
}

@end
