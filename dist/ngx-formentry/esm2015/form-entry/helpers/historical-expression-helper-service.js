import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
export class HistoricalHelperService {
    constructor() { }
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
}
HistoricalHelperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HistoricalHelperService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUVMLGdCQUFnQixFQUNqQixNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUdwRixNQUFNO0lBQ0osZ0JBQWUsQ0FBQztJQUVULFFBQVEsQ0FDYixJQUFZLEVBQ1osV0FBZ0IsRUFDaEIscUJBQTBCO1FBRTFCLE1BQU0sRUFBRSxHQUFHLElBQUksOEJBQThCLEVBQUUsQ0FBQztRQUNoRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFRO1lBQ2hCLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFDckQsTUFBTSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUMzQyxJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sQ0FBQyxlQUFlLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1FBRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sb0JBQW9CLENBQ3pCLElBQVksRUFDWixXQUFnQixFQUNoQixlQUFvQjtRQUVwQixNQUFNLGVBQWUsR0FBRztZQUN0QixTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUE5Q0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHtcbiAgUnVubmFibGUsXG4gIEV4cHJlc3Npb25SdW5uZXJcbn0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgZXZhbHVhdGUoXG4gICAgZXhwcjogc3RyaW5nLFxuICAgIGRhdGFTb3VyY2VzOiBhbnksXG4gICAgYWRkaXRpb25hbFNjb3BldmFsdWVzOiBhbnlcbiAgKTogYW55IHtcbiAgICBjb25zdCBIRCA9IG5ldyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UoKTtcbiAgICBIRC5yZWdpc3RlckVuY291bnRlcnMoJ3ByZXZFbmMnLCBkYXRhU291cmNlc1sncmF3UHJldkVuYyddKTtcbiAgICBjb25zdCBkZXBzOiBhbnkgPSB7XG4gICAgICBIRDogSERcbiAgICB9O1xuXG4gICAgaWYgKGFkZGl0aW9uYWxTY29wZXZhbHVlcykge1xuICAgICAgZm9yIChjb25zdCBvIGluIGFkZGl0aW9uYWxTY29wZXZhbHVlcykge1xuICAgICAgICBpZiAoYWRkaXRpb25hbFNjb3BldmFsdWVzW29dKSB7XG4gICAgICAgICAgZGVwc1tvXSA9IGFkZGl0aW9uYWxTY29wZXZhbHVlc1tvXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcbiAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCA9IG5ldyBBZmVGb3JtQ29udHJvbCgpO1xuICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XG4gICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKFxuICAgICAgZXhwcixcbiAgICAgIGNvbnRyb2wsXG4gICAgICBoZWxwZXIuaGVscGVyRnVuY3Rpb25zLFxuICAgICAgZGVwc1xuICAgICk7XG5cbiAgICByZXR1cm4gcnVubmFibGUucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVQcmVjb25kaXRpb24oXG4gICAgZXhwcjogc3RyaW5nLFxuICAgIGRhdGFTb3VyY2VzOiBhbnksXG4gICAgaGlzdG9yaWNhbFZhbHVlOiBhbnlcbiAgKTogYW55IHtcbiAgICBjb25zdCBhZGRpdGlvbmFsU2NvcGUgPSB7XG4gICAgICBoaXN0VmFsdWU6IGhpc3RvcmljYWxWYWx1ZVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZShleHByLCBkYXRhU291cmNlcywgYWRkaXRpb25hbFNjb3BlKTtcbiAgfVxufVxuIl19