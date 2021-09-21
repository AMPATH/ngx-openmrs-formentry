import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
export class HidersDisablersFactory {
    constructor(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    getJsExpressionDisabler(question, control, form) {
        const runnable = this.expressionRunner.getRunnable(question.disable, control, this.expressionHelper.helperFunctions, {}, form);
        const disabler = {
            toDisable: false,
            disableWhenExpression: question.disable,
            reEvaluateDisablingExpression: () => {
                const result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    }
    getJsExpressionHider(question, control, form) {
        const hide = question.hide;
        const value = typeof hide === 'object'
            ? this.convertHideObjectToString(hide)
            : question.hide;
        // check if debugging has been enabled
        const debugEnabled = this._debugModeService.debugEnabled();
        const runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        const hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: () => {
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
    }
    convertHideObjectToString(hide) {
        if (hide.value instanceof Array) {
            const arrayStr = "'" + hide.value.join("','") + "'";
            const exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    }
}
HidersDisablersFactory.decorators = [
    { type: Injectable },
];
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsT0FBTyxFQUNMLGdCQUFnQixFQUVqQixNQUFNLHdDQUF3QyxDQUFDO0FBT2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXJFLGtEQUFrRDtBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxNQUFNO0lBQ0osWUFDVSxnQkFBa0MsRUFDbEMsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUMxQyxDQUFDO0lBRUosdUJBQXVCLENBQ3JCLFFBQXNCLEVBQ3RCLE9BQXFELEVBQ3JELElBQVc7UUFFWCxNQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUMxRCxRQUFRLENBQUMsT0FBaUIsRUFDMUIsT0FBTyxFQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQ3JDLEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFhO1lBQ3pCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxPQUFpQjtZQUNqRCw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ2xDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDOUIsQ0FBQztTQUNGLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsUUFBc0IsRUFDdEIsT0FBcUQsRUFDckQsSUFBVztRQUVYLE1BQU0sSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQ1QsT0FBTyxJQUFJLEtBQUssUUFBUTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQztZQUN0QyxDQUFDLENBQUUsUUFBUSxDQUFDLElBQWUsQ0FBQztRQUVoQyxzQ0FBc0M7UUFFdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNELE1BQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQzFELEtBQUssRUFDTCxPQUFPLEVBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFDckMsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQVU7WUFDbkIsTUFBTSxFQUFFLEtBQUs7WUFDYixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtnQkFDL0I7OzJCQUVXO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQztZQUNILENBQUM7U0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxJQUFTO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLFFBQVEsR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQzs7O1lBL0VGLFVBQVU7OztZQWRULGdCQUFnQjtZQVNULGtCQUFrQjtZQUdsQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcblxuaW1wb3J0IHtcbiAgRXhwcmVzc2lvblJ1bm5lcixcbiAgUnVubmFibGVcbn0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHtcbiAgQWZlRm9ybUNvbnRyb2wsXG4gIEFmZUZvcm1BcnJheSxcbiAgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuLy8gQWRkIGFiaWxpdHkgdG8gZGlzcGxheSBhbGwgZmllbGRzIGZvciBkZWJ1Z2dpbmdcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxuICAgIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyLFxuICAgIHByaXZhdGUgX2RlYnVnTW9kZVNlcnZpY2U6IERlYnVnTW9kZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKTogRGlzYWJsZXIge1xuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgY29udHJvbCxcbiAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICB7fSxcbiAgICAgIGZvcm1cbiAgICApO1xuICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcbiAgICAgIHRvRGlzYWJsZTogZmFsc2UsXG4gICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgIGRpc2FibGVyLnRvRGlzYWJsZSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBkaXNhYmxlcjtcbiAgfVxuXG4gIGdldEpzRXhwcmVzc2lvbkhpZGVyKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKTogSGlkZXIge1xuICAgIGNvbnN0IGhpZGU6IGFueSA9IHF1ZXN0aW9uLmhpZGU7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2YgaGlkZSA9PT0gJ29iamVjdCdcbiAgICAgICAgPyB0aGlzLmNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZSlcbiAgICAgICAgOiAocXVlc3Rpb24uaGlkZSBhcyBzdHJpbmcpO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWdnaW5nIGhhcyBiZWVuIGVuYWJsZWRcblxuICAgIGNvbnN0IGRlYnVnRW5hYmxlZCA9IHRoaXMuX2RlYnVnTW9kZVNlcnZpY2UuZGVidWdFbmFibGVkKCk7XG5cbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICB2YWx1ZSxcbiAgICAgIGNvbnRyb2wsXG4gICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLFxuICAgICAge30sXG4gICAgICBmb3JtXG4gICAgKTtcblxuICAgIGNvbnN0IGhpZGVyOiBIaWRlciA9IHtcbiAgICAgIHRvSGlkZTogZmFsc2UsXG4gICAgICBoaWRlV2hlbkV4cHJlc3Npb246IHZhbHVlLFxuICAgICAgcmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgLyogaWYgZGVidWcgaXMgZW5hYmxlZCB0aGVuIGhpZGVycyB0byBiZSBmYWxzZVxuICAgICAgICAgICAgICAgICBlbHNlIHJ1biB0aGUgbm9ybWFsIGV2ZWx1YXRvciBpLmUgcnVubmFibGUucnVuKClcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaGlkZXI7XG4gIH1cblxuICBjb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGU6IGFueSkge1xuICAgIGlmIChoaWRlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSBcIidcIiArIGhpZGUudmFsdWUuam9pbihcIicsJ1wiKSArIFwiJ1wiO1xuICAgICAgY29uc3QgZXhwID0gJyFhcnJheUNvbnRhaW5zKFsnICsgYXJyYXlTdHIgKyAnXSwnICsgaGlkZS5maWVsZCArICcpJztcbiAgICAgIHJldHVybiBleHA7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=