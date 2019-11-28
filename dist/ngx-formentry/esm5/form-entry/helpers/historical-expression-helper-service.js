import * as tslib_1 from "tslib";
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
    HistoricalHelperService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HistoricalHelperService);
    return HistoricalHelperService;
}());
export { HistoricalHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFHcEY7SUFFRTtJQUNBLENBQUM7SUFFTSwwQ0FBUSxHQUFmLFVBQWdCLElBQVksRUFBRSxXQUFnQixFQUFFLHFCQUEwQjtRQUN4RSxJQUFNLEVBQUUsR0FBRyxJQUFJLDhCQUE4QixFQUFFLENBQUM7UUFDaEQsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFNLElBQUksR0FBUTtZQUNoQixFQUFFLEVBQUUsRUFBRTtTQUNQLENBQUM7UUFFRixJQUFJLHFCQUFxQixFQUFFO1lBQ3pCLEtBQUssSUFBTSxDQUFDLElBQUkscUJBQXFCLEVBQUU7Z0JBQ3JDLElBQUkscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO1FBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQU0sT0FBTyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3JELElBQU0sTUFBTSxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDeEQsSUFBTSxRQUFRLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0YsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLHNEQUFvQixHQUEzQixVQUE0QixJQUFZLEVBQUUsV0FBZ0IsRUFBRSxlQUFvQjtRQUM5RSxJQUFNLGVBQWUsR0FBRztZQUN0QixTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQWxDVSx1QkFBdUI7UUFEbkMsVUFBVSxFQUFFOztPQUNBLHVCQUF1QixDQW9DbkM7SUFBRCw4QkFBQztDQUFBLEFBcENELElBb0NDO1NBcENZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuaW1wb3J0IHsgUnVubmFibGUsIEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuLi9leHByZXNzaW9uLXJ1bm5lci9leHByZXNzaW9uLXJ1bm5lcic7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZShleHByOiBzdHJpbmcsIGRhdGFTb3VyY2VzOiBhbnksIGFkZGl0aW9uYWxTY29wZXZhbHVlczogYW55KTogYW55IHtcbiAgICBjb25zdCBIRCA9IG5ldyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2UoKTtcbiAgICBIRC5yZWdpc3RlckVuY291bnRlcnMoJ3ByZXZFbmMnLCBkYXRhU291cmNlc1sncmF3UHJldkVuYyddKTtcbiAgICBjb25zdCBkZXBzOiBhbnkgPSB7XG4gICAgICBIRDogSERcbiAgICB9O1xuXG4gICAgaWYgKGFkZGl0aW9uYWxTY29wZXZhbHVlcykge1xuICAgICAgZm9yIChjb25zdCBvIGluIGFkZGl0aW9uYWxTY29wZXZhbHVlcykge1xuICAgICAgICBpZiAoYWRkaXRpb25hbFNjb3BldmFsdWVzW29dKSB7XG4gICAgICAgICAgZGVwc1tvXSA9IGFkZGl0aW9uYWxTY29wZXZhbHVlc1tvXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcbiAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCA9IG5ldyBBZmVGb3JtQ29udHJvbCgpO1xuICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XG4gICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKGV4cHIsIGNvbnRyb2wsIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIGRlcHMpO1xuXG4gICAgcmV0dXJuIHJ1bm5hYmxlLnJ1bigpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlUHJlY29uZGl0aW9uKGV4cHI6IHN0cmluZywgZGF0YVNvdXJjZXM6IGFueSwgaGlzdG9yaWNhbFZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGFkZGl0aW9uYWxTY29wZSA9IHtcbiAgICAgIGhpc3RWYWx1ZTogaGlzdG9yaWNhbFZhbHVlXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlKGV4cHIsIGRhdGFTb3VyY2VzLCBhZGRpdGlvbmFsU2NvcGUpO1xuICB9XG5cbn1cbiJdfQ==