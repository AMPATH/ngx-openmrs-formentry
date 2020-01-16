import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
let HidersDisablersFactory = class HidersDisablersFactory {
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
        const value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : question.hide;
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
            const arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            const exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    }
};
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];
HidersDisablersFactory = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExpressionRunner,
        JsExpressionHelper,
        DebugModeService])
], HidersDisablersFactory);
export { HidersDisablersFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9oaWRlcnMtZGlzYWJsZXJzLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXJFLGtEQUFrRDtBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUUvQixZQUFvQixnQkFBa0MsRUFDN0MsZ0JBQW9DLEVBQ3BDLGlCQUFtQztRQUZ4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUM1QyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUNqRyxJQUFXO1FBQ1gsTUFBTSxRQUFRLEdBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBaUIsRUFBRSxPQUFPLEVBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELE1BQU0sUUFBUSxHQUFhO1lBQ3ZCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxPQUFpQjtZQUNqRCw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDaEMsQ0FBQztTQUNKLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUM5RixJQUFXO1FBRVgsTUFBTSxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyxNQUFNLEtBQUssR0FBVyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQWMsQ0FBQztRQUVoSCxzQ0FBc0M7UUFFdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNELE1BQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFDM0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxLQUFLLEdBQVU7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtnQkFDNUI7O2tCQUVFO2dCQUNILElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtvQkFDckIsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUU7aUJBQ3pCO3FCQUFNO29CQUNILEtBQUssQ0FBQyxNQUFNLEdBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUNsQztZQUNQLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHlCQUF5QixDQUFDLElBQVM7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTtZQUUvQixNQUFNLFFBQVEsR0FBVyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2hFLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDcEUsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNKLENBQUE7O1lBOUR5QyxnQkFBZ0I7WUFDM0Isa0JBQWtCO1lBQ2pCLGdCQUFnQjs7QUFKbkMsc0JBQXNCO0lBRGxDLFVBQVUsRUFBRTs2Q0FHNkIsZ0JBQWdCO1FBQzNCLGtCQUFrQjtRQUNqQixnQkFBZ0I7R0FKbkMsc0JBQXNCLENBZ0VsQztTQWhFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpc2FibGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1kaXNhYmxlJztcbmltcG9ydCB7IEhpZGVyIH0gZnJvbSAnLi4vY29udHJvbC1oaWRlcnMtZGlzYWJsZXJzL2Nhbi1oaWRlJztcblxuaW1wb3J0IHsgRXhwcmVzc2lvblJ1bm5lciwgUnVubmFibGUgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXBcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG4vLyBBZGQgYWJpbGl0eSB0byBkaXNwbGF5IGFsbCBmaWVsZHMgZm9yIGRlYnVnZ2luZ1xuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLFxuICAgICBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcixcbiAgICAgcHJpdmF0ZSBfZGVidWdNb2RlU2VydmljZTogRGVidWdNb2RlU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldEpzRXhwcmVzc2lvbkRpc2FibGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IERpc2FibGVyIHtcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZywgY29udHJvbCxcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVyOiBEaXNhYmxlciA9IHtcbiAgICAgICAgICAgIHRvRGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlV2hlbkV4cHJlc3Npb246IHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLFxuICAgICAgICAgICAgcmVFdmFsdWF0ZURpc2FibGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlci50b0Rpc2FibGUgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXNhYmxlcjtcbiAgICB9XG5cbiAgICBnZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBIaWRlciB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogYW55ID0gcXVlc3Rpb24uaGlkZTtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHR5cGVvZiBoaWRlID09PSAnb2JqZWN0JyA/IHRoaXMuY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlKSA6IHF1ZXN0aW9uLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGRlYnVnZ2luZyBoYXMgYmVlbiBlbmFibGVkXG5cbiAgICAgICAgY29uc3QgZGVidWdFbmFibGVkID0gdGhpcy5fZGVidWdNb2RlU2VydmljZS5kZWJ1Z0VuYWJsZWQoKTtcblxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUodmFsdWUsIGNvbnRyb2wsXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcblxuICAgICAgICBjb25zdCBoaWRlcjogSGlkZXIgPSB7XG4gICAgICAgICAgICB0b0hpZGU6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZVdoZW5FeHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgICAgICAgIHJlRXZhbHVhdGVIaWRpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgIC8qIGlmIGRlYnVnIGlzIGVuYWJsZWQgdGhlbiBoaWRlcnMgdG8gYmUgZmFsc2VcbiAgICAgICAgICAgICAgICAgZWxzZSBydW4gdGhlIG5vcm1hbCBldmVsdWF0b3IgaS5lIHJ1bm5hYmxlLnJ1bigpXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gIHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaGlkZXI7XG4gICAgfVxuXG4gICAgY29udmVydEhpZGVPYmplY3RUb1N0cmluZyhoaWRlOiBhbnkpIHtcblxuICAgICAgaWYgKGhpZGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuXG4gICAgICAgIGNvbnN0IGFycmF5U3RyOiBzdHJpbmcgPSAnXFwnJyArIGhpZGUudmFsdWUuam9pbignXFwnLFxcJycpICsgJ1xcJyc7XG4gICAgICAgIGNvbnN0IGV4cCA9ICchYXJyYXlDb250YWlucyhbJyArIGFycmF5U3RyICsgJ10sJyArIGhpZGUuZmllbGQgKyAnKSc7XG4gICAgICAgIHJldHVybiBleHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iXX0=