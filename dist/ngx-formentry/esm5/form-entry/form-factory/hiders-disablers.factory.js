import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
var HidersDisablersFactory = /** @class */ (function () {
    function HidersDisablersFactory(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    HidersDisablersFactory.prototype.getJsExpressionDisabler = function (question, control, form) {
        var runnable = this.expressionRunner.getRunnable(question.disable, control, this.expressionHelper.helperFunctions, {}, form);
        var disabler = {
            toDisable: false,
            disableWhenExpression: question.disable,
            reEvaluateDisablingExpression: function () {
                var result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    };
    HidersDisablersFactory.prototype.getJsExpressionHider = function (question, control, form) {
        var hide = question.hide;
        var value = typeof hide === 'object'
            ? this.convertHideObjectToString(hide)
            : question.hide;
        // check if debugging has been enabled
        var debugEnabled = this._debugModeService.debugEnabled();
        var runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        var hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: function () {
                /* if debug is enabled then hiders to be false
                         else run the normal eveluator i.e runnable.run()
                         */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            }
        };
        return hider;
    };
    HidersDisablersFactory.prototype.convertHideObjectToString = function (hide) {
        if (hide.value instanceof Array) {
            var arrayStr = "'" + hide.value.join("','") + "'";
            var exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    };
    HidersDisablersFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HidersDisablersFactory.ctorParameters = function () { return [
        { type: ExpressionRunner },
        { type: JsExpressionHelper },
        { type: DebugModeService }
    ]; };
    return HidersDisablersFactory;
}());
export { HidersDisablersFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWpCLE1BQU0sd0NBQXdDLENBQUM7QUFPaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFckUsa0RBQWtEO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXBFO0lBRUUsZ0NBQ1UsZ0JBQWtDLEVBQ2xDLGdCQUFvQyxFQUNwQyxpQkFBbUM7UUFGbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBQ3BDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKLHdEQUF1QixHQUF2QixVQUNFLFFBQXNCLEVBQ3RCLE9BQXFELEVBQ3JELElBQVc7UUFFWCxJQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUMxRCxRQUFRLENBQUMsT0FBaUIsRUFDMUIsT0FBTyxFQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQ3JDLEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FBQztRQUNGLElBQU0sUUFBUSxHQUFhO1lBQ3pCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxPQUFpQjtZQUNqRCw2QkFBNkIsRUFBRTtnQkFDN0IsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUM5QixDQUFDO1NBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELHFEQUFvQixHQUFwQixVQUNFLFFBQXNCLEVBQ3RCLE9BQXFELEVBQ3JELElBQVc7UUFFWCxJQUFNLElBQUksR0FBUSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQU0sS0FBSyxHQUNULE9BQU8sSUFBSSxLQUFLLFFBQVE7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7WUFDdEMsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxJQUFlLENBQUM7UUFFaEMsc0NBQXNDO1FBRXRDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUzRCxJQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUMxRCxLQUFLLEVBQ0wsT0FBTyxFQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQ3JDLEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FBQztRQUVGLElBQU0sS0FBSyxHQUFVO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1lBQ2Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QiwwQkFBMEIsRUFBRTtnQkFDMUI7OzJCQUVXO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQztZQUNILENBQUM7U0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwwREFBeUIsR0FBekIsVUFBMEIsSUFBUztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBTSxRQUFRLEdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM1RCxJQUFNLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7O2dCQS9FRixVQUFVOzs7O2dCQWRULGdCQUFnQjtnQkFTVCxrQkFBa0I7Z0JBR2xCLGdCQUFnQjs7SUFrRnpCLDZCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0EvRVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXNhYmxlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5cbmltcG9ydCB7XG4gIEV4cHJlc3Npb25SdW5uZXIsXG4gIFJ1bm5hYmxlXG59IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7XG4gIEFmZUZvcm1Db250cm9sLFxuICBBZmVGb3JtQXJyYXksXG4gIEFmZUZvcm1Hcm91cFxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbi8vIEFkZCBhYmlsaXR5IHRvIGRpc3BsYXkgYWxsIGZpZWxkcyBmb3IgZGVidWdnaW5nXG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcbiAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICBwcml2YXRlIF9kZWJ1Z01vZGVTZXJ2aWNlOiBEZWJ1Z01vZGVTZXJ2aWNlXG4gICkge31cblxuICBnZXRKc0V4cHJlc3Npb25EaXNhYmxlcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IERpc2FibGVyIHtcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICBxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZyxcbiAgICAgIGNvbnRyb2wsXG4gICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLFxuICAgICAge30sXG4gICAgICBmb3JtXG4gICAgKTtcbiAgICBjb25zdCBkaXNhYmxlcjogRGlzYWJsZXIgPSB7XG4gICAgICB0b0Rpc2FibGU6IGZhbHNlLFxuICAgICAgZGlzYWJsZVdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZyxcbiAgICAgIHJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICBkaXNhYmxlci50b0Rpc2FibGUgPSByZXN1bHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZGlzYWJsZXI7XG4gIH1cblxuICBnZXRKc0V4cHJlc3Npb25IaWRlcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IEhpZGVyIHtcbiAgICBjb25zdCBoaWRlOiBhbnkgPSBxdWVzdGlvbi5oaWRlO1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPVxuICAgICAgdHlwZW9mIGhpZGUgPT09ICdvYmplY3QnXG4gICAgICAgID8gdGhpcy5jb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGUpXG4gICAgICAgIDogKHF1ZXN0aW9uLmhpZGUgYXMgc3RyaW5nKTtcblxuICAgIC8vIGNoZWNrIGlmIGRlYnVnZ2luZyBoYXMgYmVlbiBlbmFibGVkXG5cbiAgICBjb25zdCBkZWJ1Z0VuYWJsZWQgPSB0aGlzLl9kZWJ1Z01vZGVTZXJ2aWNlLmRlYnVnRW5hYmxlZCgpO1xuXG4gICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKFxuICAgICAgdmFsdWUsXG4gICAgICBjb250cm9sLFxuICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucyxcbiAgICAgIHt9LFxuICAgICAgZm9ybVxuICAgICk7XG5cbiAgICBjb25zdCBoaWRlcjogSGlkZXIgPSB7XG4gICAgICB0b0hpZGU6IGZhbHNlLFxuICAgICAgaGlkZVdoZW5FeHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgIHJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgIC8qIGlmIGRlYnVnIGlzIGVuYWJsZWQgdGhlbiBoaWRlcnMgdG8gYmUgZmFsc2VcbiAgICAgICAgICAgICAgICAgZWxzZSBydW4gdGhlIG5vcm1hbCBldmVsdWF0b3IgaS5lIHJ1bm5hYmxlLnJ1bigpXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBoaWRlci50b0hpZGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWRlci50b0hpZGUgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGhpZGVyO1xuICB9XG5cbiAgY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlOiBhbnkpIHtcbiAgICBpZiAoaGlkZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjb25zdCBhcnJheVN0cjogc3RyaW5nID0gXCInXCIgKyBoaWRlLnZhbHVlLmpvaW4oXCInLCdcIikgKyBcIidcIjtcbiAgICAgIGNvbnN0IGV4cCA9ICchYXJyYXlDb250YWlucyhbJyArIGFycmF5U3RyICsgJ10sJyArIGhpZGUuZmllbGQgKyAnKSc7XG4gICAgICByZXR1cm4gZXhwO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxufVxuIl19