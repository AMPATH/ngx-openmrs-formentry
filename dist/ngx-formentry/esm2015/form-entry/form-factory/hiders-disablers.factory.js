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
/** @nocollapse */
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWpCLE1BQU0sd0NBQXdDLENBQUM7QUFPaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFckUsa0RBQWtEO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3BFLE1BQU07SUFDSixZQUNVLGdCQUFrQyxFQUNsQyxnQkFBb0MsRUFDcEMsaUJBQW1DO1FBRm5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBQzFDLENBQUM7SUFFSix1QkFBdUIsQ0FDckIsUUFBc0IsRUFDdEIsT0FBcUQsRUFDckQsSUFBVztRQUVYLE1BQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQzFELFFBQVEsQ0FBQyxPQUFpQixFQUMxQixPQUFPLEVBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFDckMsRUFBRSxFQUNGLElBQUksQ0FDTCxDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQWE7WUFDekIsU0FBUyxFQUFFLEtBQUs7WUFDaEIscUJBQXFCLEVBQUUsUUFBUSxDQUFDLE9BQWlCO1lBQ2pELDZCQUE2QixFQUFFLEdBQUcsRUFBRTtnQkFDbEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUM5QixDQUFDO1NBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELG9CQUFvQixDQUNsQixRQUFzQixFQUN0QixPQUFxRCxFQUNyRCxJQUFXO1FBRVgsTUFBTSxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyxNQUFNLEtBQUssR0FDVCxPQUFPLElBQUksS0FBSyxRQUFRO1lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO1lBQ3RDLENBQUMsQ0FBRSxRQUFRLENBQUMsSUFBZSxDQUFDO1FBRWhDLHNDQUFzQztRQUV0QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFM0QsTUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FDMUQsS0FBSyxFQUNMLE9BQU8sRUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUNyQyxFQUFFLEVBQ0YsSUFBSSxDQUNMLENBQUM7UUFFRixNQUFNLEtBQUssR0FBVTtZQUNuQixNQUFNLEVBQUUsS0FBSztZQUNiLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO2dCQUMvQjs7MkJBRVc7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUF5QixDQUFDLElBQVM7UUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sUUFBUSxHQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUEvRUYsVUFBVTs7OztZQWRULGdCQUFnQjtZQVNULGtCQUFrQjtZQUdsQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcblxuaW1wb3J0IHtcbiAgRXhwcmVzc2lvblJ1bm5lcixcbiAgUnVubmFibGVcbn0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHtcbiAgQWZlRm9ybUNvbnRyb2wsXG4gIEFmZUZvcm1BcnJheSxcbiAgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuLy8gQWRkIGFiaWxpdHkgdG8gZGlzcGxheSBhbGwgZmllbGRzIGZvciBkZWJ1Z2dpbmdcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxuICAgIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyLFxuICAgIHByaXZhdGUgX2RlYnVnTW9kZVNlcnZpY2U6IERlYnVnTW9kZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKTogRGlzYWJsZXIge1xuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgY29udHJvbCxcbiAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICB7fSxcbiAgICAgIGZvcm1cbiAgICApO1xuICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcbiAgICAgIHRvRGlzYWJsZTogZmFsc2UsXG4gICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgIGRpc2FibGVyLnRvRGlzYWJsZSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBkaXNhYmxlcjtcbiAgfVxuXG4gIGdldEpzRXhwcmVzc2lvbkhpZGVyKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKTogSGlkZXIge1xuICAgIGNvbnN0IGhpZGU6IGFueSA9IHF1ZXN0aW9uLmhpZGU7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2YgaGlkZSA9PT0gJ29iamVjdCdcbiAgICAgICAgPyB0aGlzLmNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZSlcbiAgICAgICAgOiAocXVlc3Rpb24uaGlkZSBhcyBzdHJpbmcpO1xuXG4gICAgLy8gY2hlY2sgaWYgZGVidWdnaW5nIGhhcyBiZWVuIGVuYWJsZWRcblxuICAgIGNvbnN0IGRlYnVnRW5hYmxlZCA9IHRoaXMuX2RlYnVnTW9kZVNlcnZpY2UuZGVidWdFbmFibGVkKCk7XG5cbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICB2YWx1ZSxcbiAgICAgIGNvbnRyb2wsXG4gICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLFxuICAgICAge30sXG4gICAgICBmb3JtXG4gICAgKTtcblxuICAgIGNvbnN0IGhpZGVyOiBIaWRlciA9IHtcbiAgICAgIHRvSGlkZTogZmFsc2UsXG4gICAgICBoaWRlV2hlbkV4cHJlc3Npb246IHZhbHVlLFxuICAgICAgcmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgLyogaWYgZGVidWcgaXMgZW5hYmxlZCB0aGVuIGhpZGVycyB0byBiZSBmYWxzZVxuICAgICAgICAgICAgICAgICBlbHNlIHJ1biB0aGUgbm9ybWFsIGV2ZWx1YXRvciBpLmUgcnVubmFibGUucnVuKClcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaGlkZXI7XG4gIH1cblxuICBjb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGU6IGFueSkge1xuICAgIGlmIChoaWRlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSBcIidcIiArIGhpZGUudmFsdWUuam9pbihcIicsJ1wiKSArIFwiJ1wiO1xuICAgICAgY29uc3QgZXhwID0gJyFhcnJheUNvbnRhaW5zKFsnICsgYXJyYXlTdHIgKyAnXSwnICsgaGlkZS5maWVsZCArICcpJztcbiAgICAgIHJldHVybiBleHA7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=