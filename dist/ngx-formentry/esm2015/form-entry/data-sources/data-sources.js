/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            for (const /** @type {?} */ o in dataSource) {
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
function DataSources_tsickle_Closure_declarations() {
    /** @type {?} */
    DataSources.prototype._dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNO0lBRUY7NEJBRDRCLEVBQUU7S0FFN0I7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUM1Qjs7Ozs7OztJQUVELGtCQUFrQixDQUFDLEdBQVcsRUFBRSxVQUFlLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDM0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7WUFFVCxHQUFHLENBQUMsQ0FBQyx1QkFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtTQUNKO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0tBQ3ZDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzIHtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlczogYW55ID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFTb3VyY2VzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcbiAgICB9XG5cbiAgICByZWdpc3RlckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcsIGRhdGFTb3VyY2U6IGFueSwgdW5XcmFwID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHVuV3JhcCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZycsIG8sIGRhdGFTb3VyY2Vbb10pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEYXRhU291cmNlKG8sIGRhdGFTb3VyY2Vbb10sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlc1trZXldKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ092ZXJyaWRpbmcgcmVnaXN0ZXJlZCBkYXRhIHNvdXJjZScsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZXNba2V5XSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgY2xlYXJEYXRhU291cmNlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xuICAgIH1cblxufVxuIl19