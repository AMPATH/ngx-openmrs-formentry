import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataSources = class DataSources {
    constructor() {
        this._dataSources = {};
    }
    get dataSources() {
        return this._dataSources;
    }
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
    clearDataSource(key) {
        delete this._dataSources[key];
    }
};
DataSources = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], DataSources);
export { DataSources };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFcEI7UUFEUSxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUUvQixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsVUFBZSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQzNELElBQUksTUFBTSxFQUFFO1lBQ1IsaUNBQWlDO1lBQ2pDLEtBQUssTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3BEO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUVKLENBQUE7QUEzQlksV0FBVztJQUR2QixVQUFVLEVBQUU7O0dBQ0EsV0FBVyxDQTJCdkI7U0EzQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlczogYW55ID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFTb3VyY2VzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcbiAgICB9XG5cbiAgICByZWdpc3RlckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcsIGRhdGFTb3VyY2U6IGFueSwgdW5XcmFwID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHVuV3JhcCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZycsIG8sIGRhdGFTb3VyY2Vbb10pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEYXRhU291cmNlKG8sIGRhdGFTb3VyY2Vbb10sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlc1trZXldKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZXNba2V5XSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgY2xlYXJEYXRhU291cmNlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xuICAgIH1cblxufVxuIl19