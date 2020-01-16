import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DataSources = /** @class */ (function () {
    function DataSources() {
        this._dataSources = {};
    }
    Object.defineProperty(DataSources.prototype, "dataSources", {
        get: function () {
            return this._dataSources;
        },
        enumerable: true,
        configurable: true
    });
    DataSources.prototype.registerDataSource = function (key, dataSource, unWrap) {
        if (unWrap === void 0) { unWrap = false; }
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (var o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    };
    DataSources.prototype.clearDataSource = function (key) {
        delete this._dataSources[key];
    };
    DataSources = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], DataSources);
    return DataSources;
}());
export { DataSources };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFFSTtRQURRLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBRS9CLENBQUM7SUFFRCxzQkFBSSxvQ0FBVzthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsd0NBQWtCLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxVQUFlLEVBQUUsTUFBYztRQUFkLHVCQUFBLEVBQUEsY0FBYztRQUMzRCxJQUFJLE1BQU0sRUFBRTtZQUNSLGlDQUFpQztZQUNqQyxLQUFLLElBQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBRUQscUNBQWUsR0FBZixVQUFnQixHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBekJRLFdBQVc7UUFEdkIsVUFBVSxFQUFFOztPQUNBLFdBQVcsQ0EyQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZXMge1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXQgZGF0YVNvdXJjZXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGF0YVNvdXJjZShrZXk6IHN0cmluZywgZGF0YVNvdXJjZTogYW55LCB1bldyYXAgPSBmYWxzZSkge1xuICAgICAgICBpZiAodW5XcmFwKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyaW5nJywgbywgZGF0YVNvdXJjZVtvXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRhdGFTb3VyY2UobywgZGF0YVNvdXJjZVtvXSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignT3ZlcnJpZGluZyByZWdpc3RlcmVkIGRhdGEgc291cmNlJywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhU291cmNlc1trZXldID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cbiAgICBjbGVhckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFTb3VyY2VzW2tleV07XG4gICAgfVxuXG59XG4iXX0=