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
    /** @nocollapse */
    AlertsFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper }
    ]; };
    return AlertsFactory;
}());
export { AlertsFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9zaG93LW1lc3NhZ2VzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWpCLE1BQU0sd0NBQXdDLENBQUM7QUFPaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHckU7SUFFRSx1QkFDVSxnQkFBa0MsRUFDbEMsZ0JBQW9DO1FBRHBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtJQUMzQyxDQUFDO0lBQ0osZ0RBQXdCLEdBQXhCLFVBQ0UsUUFBc0IsRUFDdEIsT0FBcUQsRUFDckQsSUFBVztRQUVYLElBQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQzFELFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQ2xDLE9BQU8sRUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUNyQyxFQUFFLEVBQ0YsSUFBSSxDQUNMLENBQUM7UUFDRixJQUFNLFNBQVMsR0FBVTtZQUN2QixLQUFLLEVBQUUsS0FBSztZQUNaLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ3ZELFlBQVksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDcEMseUJBQXlCLEVBQUU7Z0JBQ3pCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDM0IsQ0FBQztTQUNGLENBQUM7UUFDRixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7O2dCQTVCRixVQUFVOzs7O2dCQVpULGdCQUFnQjtnQkFTVCxrQkFBa0I7O0lBZ0MzQixvQkFBQztDQUFBLEFBN0JELElBNkJDO1NBNUJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vY29udHJvbC1hbGVydHMvY2FuLWdlbmVyYXRlLWFsZXJ0JztcblxuaW1wb3J0IHtcbiAgRXhwcmVzc2lvblJ1bm5lcixcbiAgUnVubmFibGVcbn0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHtcbiAgQWZlRm9ybUNvbnRyb2wsXG4gIEFmZUZvcm1BcnJheSxcbiAgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRzRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcbiAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlclxuICApIHt9XG4gIGdldEpzRXhwcmVzc2lvbnNob3dBbGVydChcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IEFsZXJ0IHtcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxuICAgICAgY29udHJvbCxcbiAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICB7fSxcbiAgICAgIGZvcm1cbiAgICApO1xuICAgIGNvbnN0IHNob3dBbGVydDogQWxlcnQgPSB7XG4gICAgICBzaG93bjogZmFsc2UsXG4gICAgICBhbGVydFdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLFxuICAgICAgYWxlcnRNZXNzYWdlOiBxdWVzdGlvbi5hbGVydC5tZXNzYWdlLFxuICAgICAgcmVFdmFsdWF0ZUFsZXJ0RXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgc2hvd0FsZXJ0LnNob3duID0gcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNob3dBbGVydDtcbiAgfVxufVxuIl19