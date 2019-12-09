import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
var AlertsFactory = /** @class */ (function () {
    function AlertsFactory(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    AlertsFactory.prototype.getJsExpressionshowAlert = function (question, control, form) {
        var runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        var showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: function () {
                var result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    };
    AlertsFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper }
    ]; };
    AlertsFactory = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ExpressionRunner, JsExpressionHelper])
    ], AlertsFactory);
    return AlertsFactory;
}());
export { AlertsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUlyRTtJQUNJLHVCQUFvQixnQkFBa0MsRUFBVSxnQkFBb0M7UUFBaEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7SUFDcEcsQ0FBQztJQUNELGdEQUF3QixHQUF4QixVQUF5QixRQUFzQixFQUFFLE9BQXFELEVBQ2xHLElBQVc7UUFDWCxJQUFNLFFBQVEsR0FDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFNLFNBQVMsR0FBVTtZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ3ZELFlBQVksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDcEMseUJBQXlCLEVBQUU7Z0JBQ3ZCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDN0IsQ0FBQztTQUNKLENBQUM7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOztnQkFqQnFDLGdCQUFnQjtnQkFBNEIsa0JBQWtCOztJQUQzRixhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFFNkIsZ0JBQWdCLEVBQTRCLGtCQUFrQjtPQUQzRixhQUFhLENBbUJ6QjtJQUFELG9CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuLi9jb250cm9sLWFsZXJ0cy9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm19IGZyb20gJy4vZm9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbGVydHNGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4cHJlc3Npb25SdW5uZXI6IEV4cHJlc3Npb25SdW5uZXIsIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyKSB7XG4gICAgfVxuICAgIGdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBBbGVydCB7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9XG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUocXVlc3Rpb24uYWxlcnQuYWxlcnRXaGVuRXhwcmVzc2lvbiwgY29udHJvbCxcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG4gICAgICAgIGNvbnN0IHNob3dBbGVydDogQWxlcnQgPSB7XG4gICAgICAgICAgICBzaG93bjogZmFsc2UsXG4gICAgICAgICAgICBhbGVydFdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxuICAgICAgICAgICAgYWxlcnRNZXNzYWdlOiBxdWVzdGlvbi5hbGVydC5tZXNzYWdlLFxuICAgICAgICAgICAgcmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydC5zaG93biA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNob3dBbGVydDtcbiAgICB9XG59XG4iXX0=