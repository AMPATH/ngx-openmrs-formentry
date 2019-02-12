/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
var HistoricalHelperService = /** @class */ (function () {
    function HistoricalHelperService() {
    }
    /**
     * @param {?} expr
     * @param {?} dataSources
     * @param {?} additionalScopevalues
     * @return {?}
     */
    HistoricalHelperService.prototype.evaluate = /**
     * @param {?} expr
     * @param {?} dataSources
     * @param {?} additionalScopevalues
     * @return {?}
     */
    function (expr, dataSources, additionalScopevalues) {
        /** @type {?} */
        var HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        /** @type {?} */
        var deps = {
            HD: HD
        };
        if (additionalScopevalues) {
            for (var o in additionalScopevalues) {
                if (additionalScopevalues[o]) {
                    deps[o] = additionalScopevalues[o];
                }
            }
        }
        /** @type {?} */
        var helper = new JsExpressionHelper();
        /** @type {?} */
        var control = new AfeFormControl();
        /** @type {?} */
        var runner = new ExpressionRunner();
        /** @type {?} */
        var runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    };
    /**
     * @param {?} expr
     * @param {?} dataSources
     * @param {?} historicalValue
     * @return {?}
     */
    HistoricalHelperService.prototype.evaluatePrecondition = /**
     * @param {?} expr
     * @param {?} dataSources
     * @param {?} historicalValue
     * @return {?}
     */
    function (expr, dataSources, historicalValue) {
        /** @type {?} */
        var additionalScope = {
            histValue: historicalValue
        };
        return this.evaluate(expr, dataSources, additionalScope);
    };
    HistoricalHelperService.decorators = [
        { type: Injectable },
    ];
    HistoricalHelperService.ctorParameters = function () { return []; };
    return HistoricalHelperService;
}());
export { HistoricalHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEY7SUFHRTtJQUNBLENBQUM7Ozs7Ozs7SUFFTSwwQ0FBUTs7Ozs7O0lBQWYsVUFBZ0IsSUFBWSxFQUFFLFdBQWdCLEVBQUUscUJBQTBCOztZQUNsRSxFQUFFLEdBQUcsSUFBSSw4QkFBOEIsRUFBRTtRQUMvQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztZQUN0RCxJQUFJLEdBQVE7WUFDaEIsRUFBRSxFQUFFLEVBQUU7U0FDUDtRQUVELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7O1lBRUssTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUU7O1lBQ2pDLE9BQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUU7O1lBQzlDLE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRTs7WUFDakQsUUFBUSxHQUFhLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztRQUUxRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7SUFFTSxzREFBb0I7Ozs7OztJQUEzQixVQUE0QixJQUFZLEVBQUUsV0FBZ0IsRUFBRSxlQUFvQjs7WUFDeEUsZUFBZSxHQUFHO1lBQ3RCLFNBQVMsRUFBRSxlQUFlO1NBQzNCO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMzRCxDQUFDOztnQkFuQ0YsVUFBVTs7O0lBcUNYLDhCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FwQ1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBSdW5uYWJsZSwgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEhlbHBlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGV4cHI6IHN0cmluZywgZGF0YVNvdXJjZXM6IGFueSwgYWRkaXRpb25hbFNjb3BldmFsdWVzOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IEhEID0gbmV3IEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSgpO1xuICAgIEhELnJlZ2lzdGVyRW5jb3VudGVycygncHJldkVuYycsIGRhdGFTb3VyY2VzWydyYXdQcmV2RW5jJ10pO1xuICAgIGNvbnN0IGRlcHM6IGFueSA9IHtcbiAgICAgIEhEOiBIRFxuICAgIH07XG5cbiAgICBpZiAoYWRkaXRpb25hbFNjb3BldmFsdWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG8gaW4gYWRkaXRpb25hbFNjb3BldmFsdWVzKSB7XG4gICAgICAgIGlmIChhZGRpdGlvbmFsU2NvcGV2YWx1ZXNbb10pIHtcbiAgICAgICAgICBkZXBzW29dID0gYWRkaXRpb25hbFNjb3BldmFsdWVzW29dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xuICAgIGNvbnN0IGNvbnRyb2w6IEFmZUZvcm1Db250cm9sID0gbmV3IEFmZUZvcm1Db250cm9sKCk7XG4gICAgY29uc3QgcnVubmVyOiBFeHByZXNzaW9uUnVubmVyID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKTtcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSBydW5uZXIuZ2V0UnVubmFibGUoZXhwciwgY29udHJvbCwgaGVscGVyLmhlbHBlckZ1bmN0aW9ucywgZGVwcyk7XG5cbiAgICByZXR1cm4gcnVubmFibGUucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVQcmVjb25kaXRpb24oZXhwcjogc3RyaW5nLCBkYXRhU291cmNlczogYW55LCBoaXN0b3JpY2FsVmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgYWRkaXRpb25hbFNjb3BlID0ge1xuICAgICAgaGlzdFZhbHVlOiBoaXN0b3JpY2FsVmFsdWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGUoZXhwciwgZGF0YVNvdXJjZXMsIGFkZGl0aW9uYWxTY29wZSk7XG4gIH1cblxufVxuIl19