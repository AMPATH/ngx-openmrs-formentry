/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class AlertsFactory {
    /**
     * @param {?} expressionRunner
     * @param {?} expressionHelper
     */
    constructor(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionshowAlert(question, control, form) {
        /** @type {?} */
        const runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        const showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const result = runnable.run();
                showAlert.shown = result;
            })
        };
        return showAlert;
    }
}
AlertsFactory.decorators = [
    { type: Injectable },
];
AlertsFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertsFactory.prototype.expressionRunner;
    /**
     * @type {?}
     * @private
     */
    AlertsFactory.prototype.expressionHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSXJFLE1BQU07Ozs7O0lBQ0YsWUFBb0IsZ0JBQWtDLEVBQVUsZ0JBQW9DO1FBQWhGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO0lBQ3BHLENBQUM7Ozs7Ozs7SUFDRCx3QkFBd0IsQ0FBQyxRQUFzQixFQUFFLE9BQXFELEVBQ2xHLElBQVc7O2NBQ0wsUUFBUSxHQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7Y0FDbEQsU0FBUyxHQUFVO1lBQ3JCLEtBQUssRUFBRSxLQUFLO1lBQ1osbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUI7WUFDdkQsWUFBWSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNwQyx5QkFBeUI7OztZQUFFLEdBQUcsRUFBRTs7c0JBQ3RCLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUM3QixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUM3QixDQUFDLENBQUE7U0FDSjtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7O1lBbkJKLFVBQVU7OztZQU5GLGdCQUFnQjtZQUdoQixrQkFBa0I7Ozs7Ozs7SUFLWCx5Q0FBMEM7Ozs7O0lBQUUseUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xyXG5cclxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XHJcbmltcG9ydCB7IEZvcm19IGZyb20gJy4vZm9ybSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbGVydHNGYWN0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciwgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIpIHtcclxuICAgIH1cclxuICAgIGdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBmb3JtPzogRm9ybSk6IEFsZXJ0IHtcclxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPVxyXG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUocXVlc3Rpb24uYWxlcnQuYWxlcnRXaGVuRXhwcmVzc2lvbiwgY29udHJvbCxcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcclxuICAgICAgICBjb25zdCBzaG93QWxlcnQ6IEFsZXJ0ID0ge1xyXG4gICAgICAgICAgICBzaG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgIGFsZXJ0V2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmFsZXJ0LmFsZXJ0V2hlbkV4cHJlc3Npb24sXHJcbiAgICAgICAgICAgIGFsZXJ0TWVzc2FnZTogcXVlc3Rpb24uYWxlcnQubWVzc2FnZSxcclxuICAgICAgICAgICAgcmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxlcnQuc2hvd24gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBzaG93QWxlcnQ7XHJcbiAgICB9XHJcbn1cclxuIl19