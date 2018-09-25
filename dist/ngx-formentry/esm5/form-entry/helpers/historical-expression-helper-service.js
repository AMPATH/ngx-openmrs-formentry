/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
     * @return {?}
     */
    HistoricalHelperService.prototype.evaluate = /**
     * @param {?} expr
     * @param {?} dataSources
     * @return {?}
     */
    function (expr, dataSources) {
        var /** @type {?} */ HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        var /** @type {?} */ deps = {
            HD: HD
        };
        var /** @type {?} */ helper = new JsExpressionHelper();
        var /** @type {?} */ control = new AfeFormControl();
        var /** @type {?} */ runner = new ExpressionRunner();
        var /** @type {?} */ runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    };
    HistoricalHelperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HistoricalHelperService.ctorParameters = function () { return []; };
    return HistoricalHelperService;
}());
export { HistoricalHelperService };
function HistoricalHelperService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HistoricalHelperService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HistoricalHelperService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0lBS2xGO0tBQ0M7Ozs7OztJQUVNLDBDQUFROzs7OztjQUFDLElBQVksRUFBRSxXQUFnQjtRQUM1QyxxQkFBTSxFQUFFLEdBQUcsSUFBSSw4QkFBOEIsRUFBRSxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDNUQscUJBQU0sSUFBSSxHQUFRO1lBQ2hCLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQztRQUVGLHFCQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEMscUJBQU0sT0FBTyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3JELHFCQUFNLE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hELHFCQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDOzs7Z0JBbEJ6QixVQUFVOzs7O2tDQVBYOztTQVFhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2hpc3RvcmljYWwtZW5jb3VudGVyLWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vanMtZXhwcmVzc2lvbi1oZWxwZXInO1xyXG5pbXBvcnQgeyBSdW5uYWJsZSwgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV2YWx1YXRlKGV4cHI6IHN0cmluZywgZGF0YVNvdXJjZXM6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBIRCA9IG5ldyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UoKTtcclxuICAgIEhELnJlZ2lzdGVyRW5jb3VudGVycygncHJldkVuYycsIGRhdGFTb3VyY2VzWydyYXdQcmV2RW5jJ10pO1xyXG4gICAgY29uc3QgZGVwczogYW55ID0ge1xyXG4gICAgICBIRDogSERcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xyXG4gICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2woKTtcclxuICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XHJcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSBydW5uZXIuZ2V0UnVubmFibGUoZXhwciwgY29udHJvbCwgaGVscGVyLmhlbHBlckZ1bmN0aW9ucywgZGVwcyk7XHJcblxyXG4gICAgcmV0dXJuIHJ1bm5hYmxlLnJ1bigpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19