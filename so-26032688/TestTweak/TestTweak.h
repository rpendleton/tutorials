//
//  TestTweak.h
//  TestTweak
//
//  Created by Ryan Pendleton on 10/18/14.
//
//

#import <Foundation/Foundation.h>
#import "LMAlertView.h"

@interface TestTweak : NSObject <LMAlertViewDelegate>

@property (readonly, nonatomic) UIWindow *mainWindow;

@end
