/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var DataSources = /** @class */ (function () {
    function DataSources() {
        this._dataSources = {};
    }
    Object.defineProperty(DataSources.prototype, "dataSources", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSources;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} dataSource
     * @param {?=} unWrap
     * @return {?}
     */
    DataSources.prototype.registerDataSource = /**
     * @param {?} key
     * @param {?} dataSource
     * @param {?=} unWrap
     * @return {?}
     */
    function (key, dataSource, unWrap) {
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
    /**
     * @param {?} key
     * @return {?}
     */
    DataSources.prototype.clearDataSource = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        delete this._dataSources[key];
    };
    DataSources.decorators = [
        { type: Injectable },
    ];
    DataSources.ctorParameters = function () { return []; };
    return DataSources;
}());
export { DataSources };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataSources.prototype._dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBR0k7UUFEUSxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUUvQixDQUFDO0lBRUQsc0JBQUksb0NBQVc7Ozs7UUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBOzs7Ozs7O0lBRUQsd0NBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFjO1FBQWQsdUJBQUEsRUFBQSxjQUFjO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxpQ0FBaUM7WUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQscUNBQWU7Ozs7SUFBZixVQUFnQixHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnQkExQkosVUFBVTs7O0lBNEJYLGtCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0EzQlksV0FBVzs7Ozs7O0lBQ3BCLG1DQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2VzOiBhbnkgPSB7fTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhU291cmNlcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcsIGRhdGFTb3VyY2U6IGFueSwgdW5XcmFwID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodW5XcmFwKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyaW5nJywgbywgZGF0YVNvdXJjZVtvXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGF0YVNvdXJjZShvLCBkYXRhU291cmNlW29dLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2VzW2tleV0gPSBkYXRhU291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRGF0YVNvdXJjZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=