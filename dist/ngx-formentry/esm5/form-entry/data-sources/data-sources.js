/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            for (var /** @type {?} */ o in dataSource) {
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
    return DataSources;
}());
export { DataSources };
function DataSources_tsickle_Closure_declarations() {
    /** @type {?} */
    DataSources.prototype._dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBO0lBRUk7NEJBRDRCLEVBQUU7S0FFN0I7SUFFRCxzQkFBSSxvQ0FBVzs7OztRQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7OztPQUFBOzs7Ozs7O0lBRUQsd0NBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFjO1FBQWQsdUJBQUEsRUFBQSxjQUFjO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBRVQsR0FBRyxDQUFDLENBQUMscUJBQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7U0FDSjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztLQUN2Qzs7Ozs7SUFFRCxxQ0FBZTs7OztJQUFmLFVBQWdCLEdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pDO3NCQXpCTDtJQTJCQyxDQUFBO0FBM0JELHVCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEYXRhU291cmNlcyB7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldCBkYXRhU291cmNlcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXM7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJEYXRhU291cmNlKGtleTogc3RyaW5nLCBkYXRhU291cmNlOiBhbnksIHVuV3JhcCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh1bldyYXApIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVnaXN0ZXJpbmcnLCBvLCBkYXRhU291cmNlW29dKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGF0YVNvdXJjZShvLCBkYXRhU291cmNlW29dLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZXNba2V5XSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdPdmVycmlkaW5nIHJlZ2lzdGVyZWQgZGF0YSBzb3VyY2UnLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2VzW2tleV0gPSBkYXRhU291cmNlO1xuICAgIH1cblxuICAgIGNsZWFyRGF0YVNvdXJjZShrZXk6IHN0cmluZykge1xuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVNvdXJjZXNba2V5XTtcbiAgICB9XG5cbn1cbiJdfQ==