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
    DataSources.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DataSources.ctorParameters = function () { return []; };
    return DataSources;
}());
export { DataSources };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUdFO1FBRFEsaUJBQVksR0FBUSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVoQixzQkFBSSxvQ0FBVzthQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFjO1FBQWQsdUJBQUEsRUFBQSxjQUFjO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxpQ0FBaUM7WUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRCxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQ0FBZSxHQUFmLFVBQWdCLEdBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQXpCRixVQUFVOzs7O0lBMEJYLGtCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6QlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0IGRhdGFTb3VyY2VzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzO1xuICB9XG5cbiAgcmVnaXN0ZXJEYXRhU291cmNlKGtleTogc3RyaW5nLCBkYXRhU291cmNlOiBhbnksIHVuV3JhcCA9IGZhbHNlKSB7XG4gICAgaWYgKHVuV3JhcCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0ZXJpbmcnLCBvLCBkYXRhU291cmNlW29dKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRhdGFTb3VyY2UobywgZGF0YVNvdXJjZVtvXSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhU291cmNlc1trZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XG4gICAgfVxuICAgIHRoaXMuX2RhdGFTb3VyY2VzW2tleV0gPSBkYXRhU291cmNlO1xuICB9XG5cbiAgY2xlYXJEYXRhU291cmNlKGtleTogc3RyaW5nKSB7XG4gICAgZGVsZXRlIHRoaXMuX2RhdGFTb3VyY2VzW2tleV07XG4gIH1cbn1cbiJdfQ==