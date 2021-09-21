import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
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
    AlertsFactory.decorators = [
        { type: Injectable },
    ];
    AlertsFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper }
    ]; };
    return AlertsFactory;
}());
export { AlertsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUNMLGdCQUFnQixFQUVqQixNQUFNLHdDQUF3QyxDQUFDO0FBT2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3JFO0lBRUUsdUJBQ1UsZ0JBQWtDLEVBQ2xDLGdCQUFvQztRQURwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7SUFDM0MsQ0FBQztJQUNKLGdEQUF3QixHQUF4QixVQUNFLFFBQXNCLEVBQ3RCLE9BQXFELEVBQ3JELElBQVc7UUFFWCxJQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUMxRCxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUNsQyxPQUFPLEVBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFDckMsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBTSxTQUFTLEdBQVU7WUFDdkIsS0FBSyxFQUFFLEtBQUs7WUFDWixtQkFBbUIsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtZQUN2RCxZQUFZLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ3BDLHlCQUF5QixFQUFFO2dCQUN6QixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzlCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQzNCLENBQUM7U0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDOztnQkE1QkYsVUFBVTs7O2dCQVpULGdCQUFnQjtnQkFTVCxrQkFBa0I7O0lBZ0MzQixvQkFBQztDQUFBLEFBN0JELElBNkJDO1NBNUJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcblxuaW1wb3J0IHtcbiAgRXhwcmVzc2lvblJ1bm5lcixcbiAgUnVubmFibGVcbn0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHtcbiAgQWZlRm9ybUNvbnRyb2wsXG4gIEFmZUZvcm1BcnJheSxcbiAgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRzRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcbiAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlclxuICApIHt9XG4gIGdldEpzRXhwcmVzc2lvbnNob3dBbGVydChcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IEFsZXJ0IHtcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxuICAgICAgY29udHJvbCxcbiAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICB7fSxcbiAgICAgIGZvcm1cbiAgICApO1xuICAgIGNvbnN0IHNob3dBbGVydDogQWxlcnQgPSB7XG4gICAgICBzaG93bjogZmFsc2UsXG4gICAgICBhbGVydFdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxuICAgICAgYWxlcnRNZXNzYWdlOiBxdWVzdGlvbi5hbGVydC5tZXNzYWdlLFxuICAgICAgcmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgc2hvd0FsZXJ0LnNob3duID0gcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNob3dBbGVydDtcbiAgfVxufVxuIl19