/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe, WrappedValue, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
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
        var /** @type {?} */ obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SecurePipe.prototype.internalTransform = /**
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
                .subscribe(function (m) {
                var /** @type {?} */ sanitized = _this.sanitizer.bypassSecurityTrustUrl(m);
                _this._result.next(sanitized);
            });
        }
        return this.result;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SecurePipe.prototype.asyncTrasnform = /**
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
     * @param {?} obj
     * @return {?}
     */
    SecurePipe.prototype._subscribe = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var /** @type {?} */ _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: function (e) { throw e; }
        });
    };
    /**
     * @return {?}
     */
    SecurePipe.prototype._dispose = /**
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
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    SecurePipe.prototype._updateLatestValue = /**
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
    /** @nocollapse */
    SecurePipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: DomSanitizer, },
    ]; };
    return SecurePipe;
}());
export { SecurePipe };
function SecurePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SecurePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SecurePipe.ctorParameters;
    /** @type {?} */
    SecurePipe.prototype._latestValue;
    /** @type {?} */
    SecurePipe.prototype._latestReturnedValue;
    /** @type {?} */
    SecurePipe.prototype._subscription;
    /** @type {?} */
    SecurePipe.prototype._obj;
    /** @type {?} */
    SecurePipe.prototype.getfile;
    /** @type {?} */
    SecurePipe.prototype.previousUrl;
    /** @type {?} */
    SecurePipe.prototype._result;
    /** @type {?} */
    SecurePipe.prototype.result;
    /** @type {?} */
    SecurePipe.prototype._internalSubscription;
    /** @type {?} */
    SecurePipe.prototype._ref;
    /** @type {?} */
    SecurePipe.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0lBb0JwRCxvQkFDWSxNQUNBO1FBREEsU0FBSSxHQUFKLElBQUk7UUFDSixjQUFTLEdBQVQsU0FBUzs0QkFaTyxJQUFJO29DQUNJLElBQUk7NkJBQ0YsSUFBSTtvQkFDVixJQUFJO3VCQUdJLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQztzQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7cUNBQ2YsSUFBSTtLQUs3Qzs7OztJQUVMLGdDQUFXOzs7SUFBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtLQUNKOzs7Ozs7SUFFRCw4QkFBUzs7Ozs7SUFBVCxVQUFVLEdBQVcsRUFBRSxPQUFPO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLHFCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRU8sc0NBQWlCOzs7O2NBQUMsR0FBVzs7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUks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QyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDNUI7OztnQkFsR1IsSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxLQUFLO2lCQUNkOzs7O2dCQWpCRyxpQkFBaUI7Z0JBU1osWUFBWTs7cUJBZnJCOztTQXdCYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgICBQaXBlLFxyXG4gICAgUGlwZVRyYW5zZm9ybSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIFdyYXBwZWRWYWx1ZSxcclxuICAgIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG4vLyBpbXBvcnQgeyBGaWxlVXBsb2FkUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZXRsLWFwaS9maWxlLXVwbG9hZC1yZXNvdXJjZS5zZXJ2aWNlJztcclxuXHJcbi8vIFVzaW5nIHNpbWlsYXJpdHkgZnJvbSBBc3luY1BpcGUgdG8gYXZvaWQgaGF2aW5nIHRvIHBpcGUgfHNlY3VyZXxhc3luYyBpbiBIVE1MLlxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLXBpcGUtdHJhbnNmb3JtLWludGVyZmFjZVxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnc2VjdXJlJyxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWN1cmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgX2xhdGVzdFZhbHVlOiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbGF0ZXN0UmV0dXJuZWRWYWx1ZTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgX29iajogT2JzZXJ2YWJsZTxhbnk+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ2V0ZmlsZTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Jlc3VsdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG4gICAgcHJpdmF0ZSByZXN1bHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3Jlc3VsdC5hc09ic2VydmFibGUoKTtcclxuICAgIHByaXZhdGUgX2ludGVybmFsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHVybDogc3RyaW5nLCBnZXRmaWxlKTogYW55IHtcclxuICAgICAgICB0aGlzLmdldGZpbGUgPSBnZXRmaWxlO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuaW50ZXJuYWxUcmFuc2Zvcm0odXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hc3luY1RyYXNuZm9ybShvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50ZXJuYWxUcmFuc2Zvcm0odXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzVXJsICE9PSB1cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IHVybDtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24gPSB0aGlzLmdldGZpbGUodXJsKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYW5pdGl6ZWQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKG0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdC5uZXh0KHNhbml0aXplZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jVHJhc25mb3JtKG9iajogT2JzZXJ2YWJsZTxhbnk+KTogYW55IHtcclxuICAgICAgICBpZiAoIXRoaXMuX29iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5fb2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdWJzY3JpYmUob2JqOiBPYnNlcnZhYmxlPGFueT4pIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fb2JqID0gb2JqO1xyXG5cclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBvYmouc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX3VwZGF0ZUxhdGVzdFZhbHVlKG9iaiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LCBlcnJvcjogKGU6IGFueSkgPT4geyB0aHJvdyBlOyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9vYmogPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUxhdGVzdFZhbHVlKGFzeW5jOiBhbnksIHZhbHVlOiBPYmplY3QpIHtcclxuICAgICAgICBpZiAoYXN5bmMgPT09IHRoaXMuX29iaikge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==