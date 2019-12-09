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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBRUk7UUFEUSxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUUvQixDQUFDO0lBRUQsc0JBQUksb0NBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHdDQUFrQixHQUFsQixVQUFtQixHQUFXLEVBQUUsVUFBZSxFQUFFLE1BQWM7UUFBZCx1QkFBQSxFQUFBLGNBQWM7UUFDM0QsSUFBSSxNQUFNLEVBQUU7WUFDUixpQ0FBaUM7WUFDakMsS0FBSyxJQUFNLENBQUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFlLEdBQWYsVUFBZ0IsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQXpCUSxXQUFXO1FBRHZCLFVBQVUsRUFBRTs7T0FDQSxXQUFXLENBMkJ2QjtJQUFELGtCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlczogYW55ID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFTb3VyY2VzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcbiAgICB9XG5cbiAgICByZWdpc3RlckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcsIGRhdGFTb3VyY2U6IGFueSwgdW5XcmFwID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHVuV3JhcCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZycsIG8sIGRhdGFTb3VyY2Vbb10pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEYXRhU291cmNlKG8sIGRhdGFTb3VyY2Vbb10sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlc1trZXldKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZXNba2V5XSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgY2xlYXJEYXRhU291cmNlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xuICAgIH1cblxufVxuIl19