import { Injectable } from '@angular/core';
import { HistoricalEncounterDataService } from '../services/historical-encounter-data.service';
import { JsExpressionHelper } from './js-expression-helper';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
var HistoricalHelperService = /** @class */ (function () {
    function HistoricalHelperService() {
    }
    HistoricalHelperService.prototype.evaluate = function (expr, dataSources, additionalScopevalues) {
        var HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
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
        var helper = new JsExpressionHelper();
        var control = new AfeFormControl();
        var runner = new ExpressionRunner();
        var runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    };
    HistoricalHelperService.prototype.evaluatePrecondition = function (expr, dataSources, historicalValue) {
        var additionalScope = {
            histValue: historicalValue
        };
        return this.evaluate(expr, dataSources, additionalScope);
    };
    HistoricalHelperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HistoricalHelperService.ctorParameters = function () { return []; };
    return HistoricalHelperService;
}());
export { HistoricalHelperService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUVMLGdCQUFnQixFQUNqQixNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRjtJQUVFO0lBQWUsQ0FBQztJQUVULDBDQUFRLEdBQWYsVUFDRSxJQUFZLEVBQ1osV0FBZ0IsRUFDaEIscUJBQTBCO1FBRTFCLElBQU0sRUFBRSxHQUFHLElBQUksOEJBQThCLEVBQUUsQ0FBQztRQUNoRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQU0sSUFBSSxHQUFRO1lBQ2hCLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEMsSUFBTSxPQUFPLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFDckQsSUFBTSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUN4RCxJQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUMzQyxJQUFJLEVBQ0osT0FBTyxFQUNQLE1BQU0sQ0FBQyxlQUFlLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1FBRUYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sc0RBQW9CLEdBQTNCLFVBQ0UsSUFBWSxFQUNaLFdBQWdCLEVBQ2hCLGVBQW9CO1FBRXBCLElBQU0sZUFBZSxHQUFHO1lBQ3RCLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzNELENBQUM7O2dCQTlDRixVQUFVOzs7O0lBK0NYLDhCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0E5Q1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQge1xuICBSdW5uYWJsZSxcbiAgRXhwcmVzc2lvblJ1bm5lclxufSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBldmFsdWF0ZShcbiAgICBleHByOiBzdHJpbmcsXG4gICAgZGF0YVNvdXJjZXM6IGFueSxcbiAgICBhZGRpdGlvbmFsU2NvcGV2YWx1ZXM6IGFueVxuICApOiBhbnkge1xuICAgIGNvbnN0IEhEID0gbmV3IEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSgpO1xuICAgIEhELnJlZ2lzdGVyRW5jb3VudGVycygncHJldkVuYycsIGRhdGFTb3VyY2VzWydyYXdQcmV2RW5jJ10pO1xuICAgIGNvbnN0IGRlcHM6IGFueSA9IHtcbiAgICAgIEhEOiBIRFxuICAgIH07XG5cbiAgICBpZiAoYWRkaXRpb25hbFNjb3BldmFsdWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG8gaW4gYWRkaXRpb25hbFNjb3BldmFsdWVzKSB7XG4gICAgICAgIGlmIChhZGRpdGlvbmFsU2NvcGV2YWx1ZXNbb10pIHtcbiAgICAgICAgICBkZXBzW29dID0gYWRkaXRpb25hbFNjb3BldmFsdWVzW29dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xuICAgIGNvbnN0IGNvbnRyb2w6IEFmZUZvcm1Db250cm9sID0gbmV3IEFmZUZvcm1Db250cm9sKCk7XG4gICAgY29uc3QgcnVubmVyOiBFeHByZXNzaW9uUnVubmVyID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKTtcbiAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSBydW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICBleHByLFxuICAgICAgY29udHJvbCxcbiAgICAgIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICBkZXBzXG4gICAgKTtcblxuICAgIHJldHVybiBydW5uYWJsZS5ydW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZVByZWNvbmRpdGlvbihcbiAgICBleHByOiBzdHJpbmcsXG4gICAgZGF0YVNvdXJjZXM6IGFueSxcbiAgICBoaXN0b3JpY2FsVmFsdWU6IGFueVxuICApOiBhbnkge1xuICAgIGNvbnN0IGFkZGl0aW9uYWxTY29wZSA9IHtcbiAgICAgIGhpc3RWYWx1ZTogaGlzdG9yaWNhbFZhbHVlXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlKGV4cHIsIGRhdGFTb3VyY2VzLCBhZGRpdGlvbmFsU2NvcGUpO1xuICB9XG59XG4iXX0=