/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DataSources {
    constructor() {
        this._dataSources = {};
    }
    /**
     * @return {?}
     */
    get dataSources() {
        return this._dataSources;
    }
    /**
     * @param {?} key
     * @param {?} dataSource
     * @param {?=} unWrap
     * @return {?}
     */
    registerDataSource(key, dataSource, unWrap = false) {
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (const o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    clearDataSource(key) {
        delete this._dataSources[key];
    }
}
DataSources.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DataSources.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataSources.prototype._dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxXQUFXO0lBRXBCO1FBRFEsaUJBQVksR0FBUSxFQUFFLENBQUM7SUFFL0IsQ0FBQzs7OztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFNLEdBQUcsS0FBSztRQUMzRCxJQUFJLE1BQU0sRUFBRTtZQUNSLGlDQUFpQztZQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUExQkosVUFBVTs7Ozs7Ozs7O0lBRVAsbUNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZXMge1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXQgZGF0YVNvdXJjZXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGF0YVNvdXJjZShrZXk6IHN0cmluZywgZGF0YVNvdXJjZTogYW55LCB1bldyYXAgPSBmYWxzZSkge1xuICAgICAgICBpZiAodW5XcmFwKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyaW5nJywgbywgZGF0YVNvdXJjZVtvXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRhdGFTb3VyY2UobywgZGF0YVNvdXJjZVtvXSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignT3ZlcnJpZGluZyByZWdpc3RlcmVkIGRhdGEgc291cmNlJywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhU291cmNlc1trZXldID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cbiAgICBjbGVhckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFTb3VyY2VzW2tleV07XG4gICAgfVxuXG59XG4iXX0=