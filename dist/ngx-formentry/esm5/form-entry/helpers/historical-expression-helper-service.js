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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEY7SUFHRTtJQUNBLENBQUM7Ozs7Ozs7SUFFTSwwQ0FBUTs7Ozs7O0lBQWYsVUFBZ0IsSUFBWSxFQUFFLFdBQWdCLEVBQUUscUJBQTBCOztZQUNsRSxFQUFFLEdBQUcsSUFBSSw4QkFBOEIsRUFBRTtRQUMvQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztZQUN0RCxJQUFJLEdBQVE7WUFDaEIsRUFBRSxFQUFFLEVBQUU7U0FDUDtRQUVELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7O1lBRUssTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUU7O1lBQ2pDLE9BQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUU7O1lBQzlDLE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRTs7WUFDakQsUUFBUSxHQUFhLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztRQUUxRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7SUFFTSxzREFBb0I7Ozs7OztJQUEzQixVQUE0QixJQUFZLEVBQUUsV0FBZ0IsRUFBRSxlQUFvQjs7WUFDeEUsZUFBZSxHQUFHO1lBQ3RCLFNBQVMsRUFBRSxlQUFlO1NBQzNCO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMzRCxDQUFDOztnQkFuQ0YsVUFBVTs7O0lBcUNYLDhCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FwQ1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9qcy1leHByZXNzaW9uLWhlbHBlcic7XHJcbmltcG9ydCB7IFJ1bm5hYmxlLCBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXZhbHVhdGUoZXhwcjogc3RyaW5nLCBkYXRhU291cmNlczogYW55LCBhZGRpdGlvbmFsU2NvcGV2YWx1ZXM6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBIRCA9IG5ldyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UoKTtcclxuICAgIEhELnJlZ2lzdGVyRW5jb3VudGVycygncHJldkVuYycsIGRhdGFTb3VyY2VzWydyYXdQcmV2RW5jJ10pO1xyXG4gICAgY29uc3QgZGVwczogYW55ID0ge1xyXG4gICAgICBIRDogSERcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGFkZGl0aW9uYWxTY29wZXZhbHVlcykge1xyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gYWRkaXRpb25hbFNjb3BldmFsdWVzKSB7XHJcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxTY29wZXZhbHVlc1tvXSkge1xyXG4gICAgICAgICAgZGVwc1tvXSA9IGFkZGl0aW9uYWxTY29wZXZhbHVlc1tvXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XHJcbiAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCA9IG5ldyBBZmVGb3JtQ29udHJvbCgpO1xyXG4gICAgY29uc3QgcnVubmVyOiBFeHByZXNzaW9uUnVubmVyID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKTtcclxuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHJ1bm5lci5nZXRSdW5uYWJsZShleHByLCBjb250cm9sLCBoZWxwZXIuaGVscGVyRnVuY3Rpb25zLCBkZXBzKTtcclxuXHJcbiAgICByZXR1cm4gcnVubmFibGUucnVuKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXZhbHVhdGVQcmVjb25kaXRpb24oZXhwcjogc3RyaW5nLCBkYXRhU291cmNlczogYW55LCBoaXN0b3JpY2FsVmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NvcGUgPSB7XHJcbiAgICAgIGhpc3RWYWx1ZTogaGlzdG9yaWNhbFZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlKGV4cHIsIGRhdGFTb3VyY2VzLCBhZGRpdGlvbmFsU2NvcGUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19