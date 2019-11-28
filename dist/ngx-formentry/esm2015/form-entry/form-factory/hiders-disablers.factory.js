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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxrREFBa0Q7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHcEUsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFFL0IsWUFBb0IsZ0JBQWtDLEVBQzdDLGdCQUFvQyxFQUNwQyxpQkFBbUM7UUFGeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBQ3BDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDNUMsQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQXNCLEVBQUUsT0FBcUQsRUFDakcsSUFBVztRQUNYLE1BQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQWlCLEVBQUUsT0FBTyxFQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxNQUFNLFFBQVEsR0FBYTtZQUN2QixTQUFTLEVBQUUsS0FBSztZQUNoQixxQkFBcUIsRUFBRSxRQUFRLENBQUMsT0FBaUI7WUFDakQsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO2dCQUNoQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzlCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELG9CQUFvQixDQUFDLFFBQXNCLEVBQUUsT0FBcUQsRUFDOUYsSUFBVztRQUVYLE1BQU0sSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsTUFBTSxLQUFLLEdBQVcsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFjLENBQUM7UUFFaEgsc0NBQXNDO1FBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUzRCxNQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQzNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpELE1BQU0sS0FBSyxHQUFVO1lBQ2pCLE1BQU0sRUFBRSxLQUFLO1lBQ2Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QiwwQkFBMEIsRUFBRSxHQUFHLEVBQUU7Z0JBQzVCOztrQkFFRTtnQkFDSCxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2lCQUN6QjtxQkFBTTtvQkFDSCxLQUFLLENBQUMsTUFBTSxHQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDbEM7WUFDUCxDQUFDO1NBQ0osQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxJQUFTO1FBRWpDLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFFL0IsTUFBTSxRQUFRLEdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoRSxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3BFLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDSixDQUFBOztZQTlEeUMsZ0JBQWdCO1lBQzNCLGtCQUFrQjtZQUNqQixnQkFBZ0I7O0FBSm5DLHNCQUFzQjtJQURsQyxVQUFVLEVBQUU7NkNBRzZCLGdCQUFnQjtRQUMzQixrQkFBa0I7UUFDakIsZ0JBQWdCO0dBSm5DLHNCQUFzQixDQWdFbEM7U0FoRVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXNhYmxlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4tZGlzYWJsZSc7XG5pbXBvcnQgeyBIaWRlciB9IGZyb20gJy4uL2NvbnRyb2wtaGlkZXJzLWRpc2FibGVycy9jYW4taGlkZSc7XG5cbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuLy8gQWRkIGFiaWxpdHkgdG8gZGlzcGxheSBhbGwgZmllbGRzIGZvciBkZWJ1Z2dpbmdcbmltcG9ydCB7IERlYnVnTW9kZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2RlYnVnLW1vZGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXhwcmVzc2lvblJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lcixcbiAgICAgcHJpdmF0ZSBleHByZXNzaW9uSGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIsXG4gICAgIHByaXZhdGUgX2RlYnVnTW9kZVNlcnZpY2U6IERlYnVnTW9kZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBnZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZm9ybT86IEZvcm0pOiBEaXNhYmxlciB7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9XG4gICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SdW5uZXIuZ2V0UnVubmFibGUocXVlc3Rpb24uZGlzYWJsZSBhcyBzdHJpbmcsIGNvbnRyb2wsXG4gICAgICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xuICAgICAgICBjb25zdCBkaXNhYmxlcjogRGlzYWJsZXIgPSB7XG4gICAgICAgICAgICB0b0Rpc2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZVdoZW5FeHByZXNzaW9uOiBxdWVzdGlvbi5kaXNhYmxlIGFzIHN0cmluZyxcbiAgICAgICAgICAgIHJlRXZhbHVhdGVEaXNhYmxpbmdFeHByZXNzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVubmFibGUucnVuKCk7XG4gICAgICAgICAgICAgICAgZGlzYWJsZXIudG9EaXNhYmxlID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGlzYWJsZXI7XG4gICAgfVxuXG4gICAgZ2V0SnNFeHByZXNzaW9uSGlkZXIocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIGZvcm0/OiBGb3JtKTogSGlkZXIge1xuXG4gICAgICAgIGNvbnN0IGhpZGU6IGFueSA9IHF1ZXN0aW9uLmhpZGU7XG4gICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0eXBlb2YgaGlkZSA9PT0gJ29iamVjdCcgPyB0aGlzLmNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZSkgOiBxdWVzdGlvbi5oaWRlIGFzIHN0cmluZztcblxuICAgICAgICAvLyBjaGVjayBpZiBkZWJ1Z2dpbmcgaGFzIGJlZW4gZW5hYmxlZFxuXG4gICAgICAgIGNvbnN0IGRlYnVnRW5hYmxlZCA9IHRoaXMuX2RlYnVnTW9kZVNlcnZpY2UuZGVidWdFbmFibGVkKCk7XG5cbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHZhbHVlLCBjb250cm9sLFxuICAgICAgICB0aGlzLmV4cHJlc3Npb25IZWxwZXIuaGVscGVyRnVuY3Rpb25zLCB7fSwgZm9ybSk7XG5cbiAgICAgICAgY29uc3QgaGlkZXI6IEhpZGVyID0ge1xuICAgICAgICAgICAgdG9IaWRlOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGVXaGVuRXhwcmVzc2lvbjogdmFsdWUsXG4gICAgICAgICAgICByZUV2YWx1YXRlSGlkaW5nRXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAvKiBpZiBkZWJ1ZyBpcyBlbmFibGVkIHRoZW4gaGlkZXJzIHRvIGJlIGZhbHNlXG4gICAgICAgICAgICAgICAgIGVsc2UgcnVuIHRoZSBub3JtYWwgZXZlbHVhdG9yIGkuZSBydW5uYWJsZS5ydW4oKVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1Z0VuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlci50b0hpZGUgPSBmYWxzZSA7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGVyLnRvSGlkZSA9ICBydW5uYWJsZS5ydW4oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGhpZGVyO1xuICAgIH1cblxuICAgIGNvbnZlcnRIaWRlT2JqZWN0VG9TdHJpbmcoaGlkZTogYW55KSB7XG5cbiAgICAgIGlmIChoaWRlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuICAgICAgICBjb25zdCBhcnJheVN0cjogc3RyaW5nID0gJ1xcJycgKyBoaWRlLnZhbHVlLmpvaW4oJ1xcJyxcXCcnKSArICdcXCcnO1xuICAgICAgICBjb25zdCBleHAgPSAnIWFycmF5Q29udGFpbnMoWycgKyBhcnJheVN0ciArICddLCcgKyBoaWRlLmZpZWxkICsgJyknO1xuICAgICAgICByZXR1cm4gZXhwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIl19