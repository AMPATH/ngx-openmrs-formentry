import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
let HistoricalHelperService = class HistoricalHelperService {
    constructor() {
    }
    evaluate(expr, dataSources, additionalScopevalues) {
        const HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        const deps = {
            HD: HD
        };
        if (additionalScopevalues) {
            for (const o in additionalScopevalues) {
                if (additionalScopevalues[o]) {
                    deps[o] = additionalScopevalues[o];
                }
            }
        }
        const helper = new JsExpressionHelper();
        const control = new AfeFormControl();
        const runner = new ExpressionRunner();
        const runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    }
    evaluatePrecondition(expr, dataSources, historicalValue) {
        const additionalScope = {
            histValue: historicalValue
        };
        return this.evaluate(expr, dataSources, additionalScope);
    }
};
HistoricalHelperService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], HistoricalHelperService);
export { HistoricalHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBWSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUdwRixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUVsQztJQUNBLENBQUM7SUFFTSxRQUFRLENBQUMsSUFBWSxFQUFFLFdBQWdCLEVBQUUscUJBQTBCO1FBQ3hFLE1BQU0sRUFBRSxHQUFHLElBQUksOEJBQThCLEVBQUUsQ0FBQztRQUNoRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFRO1lBQ2hCLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQztRQUVGLElBQUkscUJBQXFCLEVBQUU7WUFDekIsS0FBSyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsRUFBRTtnQkFDckMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQzthQUNGO1NBQ0Y7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFDckQsTUFBTSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzRixPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sb0JBQW9CLENBQUMsSUFBWSxFQUFFLFdBQWdCLEVBQUUsZUFBb0I7UUFDOUUsTUFBTSxlQUFlLEdBQUc7WUFDdEIsU0FBUyxFQUFFLGVBQWU7U0FDM0IsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FFRixDQUFBO0FBcENZLHVCQUF1QjtJQURuQyxVQUFVLEVBQUU7O0dBQ0EsdUJBQXVCLENBb0NuQztTQXBDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2hpc3RvcmljYWwtZW5jb3VudGVyLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuL2pzLWV4cHJlc3Npb24taGVscGVyJztcbmltcG9ydCB7IFJ1bm5hYmxlLCBFeHByZXNzaW9uUnVubmVyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGUoZXhwcjogc3RyaW5nLCBkYXRhU291cmNlczogYW55LCBhZGRpdGlvbmFsU2NvcGV2YWx1ZXM6IGFueSk6IGFueSB7XG4gICAgY29uc3QgSEQgPSBuZXcgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlKCk7XG4gICAgSEQucmVnaXN0ZXJFbmNvdW50ZXJzKCdwcmV2RW5jJywgZGF0YVNvdXJjZXNbJ3Jhd1ByZXZFbmMnXSk7XG4gICAgY29uc3QgZGVwczogYW55ID0ge1xuICAgICAgSEQ6IEhEXG4gICAgfTtcblxuICAgIGlmIChhZGRpdGlvbmFsU2NvcGV2YWx1ZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbyBpbiBhZGRpdGlvbmFsU2NvcGV2YWx1ZXMpIHtcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxTY29wZXZhbHVlc1tvXSkge1xuICAgICAgICAgIGRlcHNbb10gPSBhZGRpdGlvbmFsU2NvcGV2YWx1ZXNbb107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2woKTtcbiAgICBjb25zdCBydW5uZXI6IEV4cHJlc3Npb25SdW5uZXIgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpO1xuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHJ1bm5lci5nZXRSdW5uYWJsZShleHByLCBjb250cm9sLCBoZWxwZXIuaGVscGVyRnVuY3Rpb25zLCBkZXBzKTtcblxuICAgIHJldHVybiBydW5uYWJsZS5ydW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZVByZWNvbmRpdGlvbihleHByOiBzdHJpbmcsIGRhdGFTb3VyY2VzOiBhbnksIGhpc3RvcmljYWxWYWx1ZTogYW55KTogYW55IHtcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NvcGUgPSB7XG4gICAgICBoaXN0VmFsdWU6IGhpc3RvcmljYWxWYWx1ZVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZShleHByLCBkYXRhU291cmNlcywgYWRkaXRpb25hbFNjb3BlKTtcbiAgfVxuXG59XG4iXX0=