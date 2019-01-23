/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
export class HistoricalHelperService {
    constructor() {
    }
    /**
     * @param {?} expr
     * @param {?} dataSources
     * @return {?}
     */
    evaluate(expr, dataSources) {
        /** @type {?} */
        const HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        /** @type {?} */
        const deps = {
            HD: HD
        };
        /** @type {?} */
        const helper = new JsExpressionHelper();
        /** @type {?} */
        const control = new AfeFormControl();
        /** @type {?} */
        const runner = new ExpressionRunner();
        /** @type {?} */
        const runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    }
}
HistoricalHelperService.decorators = [
    { type: Injectable },
];
HistoricalHelperService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFHcEYsTUFBTTtJQUVKO0lBQ0EsQ0FBQzs7Ozs7O0lBRU0sUUFBUSxDQUFDLElBQVksRUFBRSxXQUFnQjs7Y0FDdEMsRUFBRSxHQUFHLElBQUksOEJBQThCLEVBQUU7UUFDL0MsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Y0FDdEQsSUFBSSxHQUFRO1lBQ2hCLEVBQUUsRUFBRSxFQUFFO1NBQ1A7O2NBRUssTUFBTSxHQUFHLElBQUksa0JBQWtCLEVBQUU7O2NBQ2pDLE9BQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUU7O2NBQzlDLE1BQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRTs7Y0FDakQsUUFBUSxHQUFhLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztRQUUxRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQW5CRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBSdW5uYWJsZSwgRXhwcmVzc2lvblJ1bm5lciB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEhlbHBlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlKGV4cHI6IHN0cmluZywgZGF0YVNvdXJjZXM6IGFueSk6IGFueSB7XG4gICAgY29uc3QgSEQgPSBuZXcgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlKCk7XG4gICAgSEQucmVnaXN0ZXJFbmNvdW50ZXJzKCdwcmV2RW5jJywgZGF0YVNvdXJjZXNbJ3Jhd1ByZXZFbmMnXSk7XG4gICAgY29uc3QgZGVwczogYW55ID0ge1xuICAgICAgSEQ6IEhEXG4gICAgfTtcblxuICAgIGNvbnN0IGhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcbiAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCA9IG5ldyBBZmVGb3JtQ29udHJvbCgpO1xuICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XG4gICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKGV4cHIsIGNvbnRyb2wsIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIGRlcHMpO1xuXG4gICAgcmV0dXJuIHJ1bm5hYmxlLnJ1bigpO1xuICB9XG5cbn1cbiJdfQ==