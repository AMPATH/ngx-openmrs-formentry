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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBR0k7UUFEUSxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUUvQixDQUFDO0lBRUQsc0JBQUksb0NBQVc7Ozs7UUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBOzs7Ozs7O0lBRUQsd0NBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFjO1FBQWQsdUJBQUEsRUFBQSxjQUFjO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxpQ0FBaUM7WUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQscUNBQWU7Ozs7SUFBZixVQUFnQixHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnQkExQkosVUFBVTs7O0lBNEJYLGtCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0EzQlksV0FBVzs7Ozs7O0lBQ3BCLG1DQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlczogYW55ID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFTb3VyY2VzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcbiAgICB9XG5cbiAgICByZWdpc3RlckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcsIGRhdGFTb3VyY2U6IGFueSwgdW5XcmFwID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHVuV3JhcCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZycsIG8sIGRhdGFTb3VyY2Vbb10pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEYXRhU291cmNlKG8sIGRhdGFTb3VyY2Vbb10sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlc1trZXldKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZXNba2V5XSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgY2xlYXJEYXRhU291cmNlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xuICAgIH1cblxufVxuIl19