/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, WrappedValue, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
// import { FileUploadResourceService } from '../../etl-api/file-upload-resource.service';
// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
// tslint:disable-next-line:use-pipe-transform-interface
var SecurePipe = /** @class */ (function () {
    function SecurePipe(_ref, sanitizer) {
        this._ref = _ref;
        this.sanitizer = sanitizer;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._result = new BehaviorSubject(null);
        this.result = this._result.asObservable();
        this._internalSubscription = null;
    }
    /**
     * @return {?}
     */
    SecurePipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._dispose();
        }
    };
    /**
     * @param {?} url
     * @param {?} getfile
     * @return {?}
     */
    SecurePipe.prototype.transform = /**
     * @param {?} url
     * @param {?} getfile
     * @return {?}
     */
    function (url, getfile) {
        this.getfile = getfile;
        /** @type {?} */
        var obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    };
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    SecurePipe.prototype.internalTransform = /**
     * @private
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe((/**
             * @param {?} m
             * @return {?}
             */
            function (m) {
                /** @type {?} */
                var sanitized = _this.sanitizer.bypassSecurityTrustUrl(m);
                _this._result.next(sanitized);
            }));
        }
        return this.result;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    SecurePipe.prototype.asyncTrasnform = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.asyncTrasnform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return WrappedValue.wrap(this._latestValue);
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    SecurePipe.prototype._subscribe = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                return _this._updateLatestValue(obj, value);
            }), error: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { throw e; })
        });
    };
    /**
     * @private
     * @return {?}
     */
    SecurePipe.prototype._dispose = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        if (this._internalSubscription) {
            this._internalSubscription.unsubscribe();
        }
        this._internalSubscription = null;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    /**
     * @private
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    SecurePipe.prototype._updateLatestValue = /**
     * @private
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    SecurePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'secure',
                    pure: false
                },] },
    ];
    SecurePipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer }
    ]; };
    return SecurePipe;
}());
export { SecurePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._latestValue;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._latestReturnedValue;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._subscription;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._obj;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype.getfile;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype.previousUrl;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._result;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype.result;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._internalSubscription;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype._ref;
    /**
     * @type {?}
     * @private
     */
    SecurePipe.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFLeEQ7SUFlSSxvQkFDWSxJQUF1QixFQUN2QixTQUF1QjtRQUR2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBWjNCLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFHN0IsWUFBTyxHQUF5QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQW9CLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsMEJBQXFCLEdBQWlCLElBQUksQ0FBQztJQUsvQyxDQUFDOzs7O0lBRUwsZ0NBQVc7OztJQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFRCw4QkFBUzs7Ozs7SUFBVCxVQUFVLEdBQVcsRUFBRSxPQUFPO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztZQUNqQixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztR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QUUsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFTyx1Q0FBa0I7Ozs7OztJQUExQixVQUEyQixLQUFVLEVBQUUsS0FBYTtRQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQzs7Z0JBbkdKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsS0FBSztpQkFDZDs7O2dCQWpCRyxpQkFBaUI7Z0JBU1osWUFBWTs7SUF5R3JCLGlCQUFDO0NBQUEsQUFwR0QsSUFvR0M7U0FoR1ksVUFBVTs7Ozs7O0lBQ25CLGtDQUFpQzs7Ozs7SUFDakMsMENBQXlDOzs7OztJQUN6QyxtQ0FBMkM7Ozs7O0lBQzNDLDBCQUFxQzs7Ozs7SUFDckMsNkJBQWdCOzs7OztJQUNoQixpQ0FBNEI7Ozs7O0lBQzVCLDZCQUFrRTs7Ozs7SUFDbEUsNEJBQThEOzs7OztJQUM5RCwyQ0FBbUQ7Ozs7O0lBRy9DLDBCQUErQjs7Ozs7SUFDL0IsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgICBQaXBlLFxyXG4gICAgUGlwZVRyYW5zZm9ybSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIFdyYXBwZWRWYWx1ZSxcclxuICAgIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG4vLyBpbXBvcnQgeyBGaWxlVXBsb2FkUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZXRsLWFwaS9maWxlLXVwbG9hZC1yZXNvdXJjZS5zZXJ2aWNlJztcclxuXHJcbi8vIFVzaW5nIHNpbWlsYXJpdHkgZnJvbSBBc3luY1BpcGUgdG8gYXZvaWQgaGF2aW5nIHRvIHBpcGUgfHNlY3VyZXxhc3luYyBpbiBIVE1MLlxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLXBpcGUtdHJhbnNmb3JtLWludGVyZmFjZVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnc2VjdXJlJyxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWN1cmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgX2xhdGVzdFZhbHVlOiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbGF0ZXN0UmV0dXJuZWRWYWx1ZTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgX29iajogT2JzZXJ2YWJsZTxhbnk+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ2V0ZmlsZTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Jlc3VsdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG4gICAgcHJpdmF0ZSByZXN1bHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3Jlc3VsdC5hc09ic2VydmFibGUoKTtcclxuICAgIHByaXZhdGUgX2ludGVybmFsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHVybDogc3RyaW5nLCBnZXRmaWxlKTogYW55IHtcclxuICAgICAgICB0aGlzLmdldGZpbGUgPSBnZXRmaWxlO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuaW50ZXJuYWxUcmFuc2Zvcm0odXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hc3luY1RyYXNuZm9ybShvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50ZXJuYWxUcmFuc2Zvcm0odXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzVXJsICE9PSB1cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IHVybDtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24gPSB0aGlzLmdldGZpbGUodXJsKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYW5pdGl6ZWQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKG0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdC5uZXh0KHNhbml0aXplZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jVHJhc25mb3JtKG9iajogT2JzZXJ2YWJsZTxhbnk+KTogYW55IHtcclxuICAgICAgICBpZiAoIXRoaXMuX29iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5fb2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdWJzY3JpYmUob2JqOiBPYnNlcnZhYmxlPGFueT4pIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fb2JqID0gb2JqO1xyXG5cclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBvYmouc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX3VwZGF0ZUxhdGVzdFZhbHVlKG9iaiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LCBlcnJvcjogKGU6IGFueSkgPT4geyB0aHJvdyBlOyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9vYmogPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUxhdGVzdFZhbHVlKGFzeW5jOiBhbnksIHZhbHVlOiBPYmplY3QpIHtcclxuICAgICAgICBpZiAoYXN5bmMgPT09IHRoaXMuX29iaikge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==