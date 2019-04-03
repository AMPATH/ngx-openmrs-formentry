/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    { type: Injectable },
];
DataSources.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataSources.prototype._dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07SUFFRjtRQURRLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBRS9CLENBQUM7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsR0FBVyxFQUFFLFVBQWUsRUFBRSxNQUFNLEdBQUcsS0FBSztRQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsaUNBQWlDO1lBQ2pDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckQsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUExQkosVUFBVTs7Ozs7Ozs7SUFFUCxtQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlcyB7XHJcbiAgICBwcml2YXRlIF9kYXRhU291cmNlczogYW55ID0ge307XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YVNvdXJjZXMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJEYXRhU291cmNlKGtleTogc3RyaW5nLCBkYXRhU291cmNlOiBhbnksIHVuV3JhcCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHVuV3JhcCkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWdpc3RlcmluZycsIG8sIGRhdGFTb3VyY2Vbb10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRhdGFTb3VyY2UobywgZGF0YVNvdXJjZVtvXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2VzW2tleV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdPdmVycmlkaW5nIHJlZ2lzdGVyZWQgZGF0YSBzb3VyY2UnLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlc1trZXldID0gZGF0YVNvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVNvdXJjZXNba2V5XTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19