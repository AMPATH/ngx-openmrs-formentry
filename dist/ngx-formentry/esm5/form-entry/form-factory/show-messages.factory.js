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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSXJFO0lBQ0ksdUJBQW9CLGdCQUFrQyxFQUFVLGdCQUFvQztRQUFoRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtJQUNwRyxDQUFDO0lBQ0QsZ0RBQXdCLEdBQXhCLFVBQXlCLFFBQXNCLEVBQUUsT0FBcUQsRUFDbEcsSUFBVztRQUNYLElBQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQU0sU0FBUyxHQUFVO1lBQ3JCLEtBQUssRUFBRSxLQUFLO1lBQ1osbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUI7WUFDdkQsWUFBWSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNwQyx5QkFBeUIsRUFBRTtnQkFDdkIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUM3QixDQUFDO1NBQ0osQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7O2dCQWpCcUMsZ0JBQWdCO2dCQUE0QixrQkFBa0I7O0lBRDNGLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQUU2QixnQkFBZ0IsRUFBNEIsa0JBQWtCO09BRDNGLGFBQWEsQ0FtQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQW5CWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4uL2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XG5cbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybX0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0c0ZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciwgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIpIHtcbiAgICB9XG4gICAgZ2V0SnNFeHByZXNzaW9uc2hvd0FsZXJ0KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IEFsZXJ0IHtcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLCBjb250cm9sLFxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcbiAgICAgICAgY29uc3Qgc2hvd0FsZXJ0OiBBbGVydCA9IHtcbiAgICAgICAgICAgIHNob3duOiBmYWxzZSxcbiAgICAgICAgICAgIGFsZXJ0V2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmFsZXJ0LmFsZXJ0V2hlbkV4cHJlc3Npb24sXG4gICAgICAgICAgICBhbGVydE1lc3NhZ2U6IHF1ZXN0aW9uLmFsZXJ0Lm1lc3NhZ2UsXG4gICAgICAgICAgICByZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0LnNob3duID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2hvd0FsZXJ0O1xuICAgIH1cbn1cbiJdfQ==