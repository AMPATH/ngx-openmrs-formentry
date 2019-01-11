/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var _this_1 = this;
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe(function (m) {
                /** @type {?} */
                var sanitized = _this_1.sanitizer.bypassSecurityTrustUrl(m);
                _this_1._result.next(sanitized);
            });
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
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: function (e) { throw e; }
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
                },] }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFLeEQ7SUFlSSxvQkFDWSxJQUF1QixFQUN2QixTQUF1QjtRQUR2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBWjNCLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFHN0IsWUFBTyxHQUF5QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQW9CLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsMEJBQXFCLEdBQWlCLElBQUksQ0FBQztJQUsvQyxDQUFDOzs7O0lBRUwsZ0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7Ozs7OztJQUVELDhCQUFTOzs7OztJQUFULFVBQVUsR0FBVyxFQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O1lBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGNBQWMs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SUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7Z0JBbkdKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsS0FBSztpQkFDZDs7OztnQkFqQkcsaUJBQWlCO2dCQVNaLFlBQVk7O0lBeUdyQixpQkFBQztDQUFBLEFBcEdELElBb0dDO1NBaEdZLFVBQVU7Ozs7OztJQUNuQixrQ0FBaUM7Ozs7O0lBQ2pDLDBDQUF5Qzs7Ozs7SUFDekMsbUNBQTJDOzs7OztJQUMzQywwQkFBcUM7Ozs7O0lBQ3JDLDZCQUFnQjs7Ozs7SUFDaEIsaUNBQTRCOzs7OztJQUM1Qiw2QkFBa0U7Ozs7O0lBQ2xFLDRCQUE4RDs7Ozs7SUFDOUQsMkNBQW1EOzs7OztJQUcvQywwQkFBK0I7Ozs7O0lBQy9CLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtcbiAgICBQaXBlLFxuICAgIFBpcGVUcmFuc2Zvcm0sXG4gICAgT25EZXN0cm95LFxuICAgIFdyYXBwZWRWYWx1ZSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuaW1wb3J0IHsgRG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vIGltcG9ydCB7IEZpbGVVcGxvYWRSZXNvdXJjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldGwtYXBpL2ZpbGUtdXBsb2FkLXJlc291cmNlLnNlcnZpY2UnO1xuXG4vLyBVc2luZyBzaW1pbGFyaXR5IGZyb20gQXN5bmNQaXBlIHRvIGF2b2lkIGhhdmluZyB0byBwaXBlIHxzZWN1cmV8YXN5bmMgaW4gSFRNTC5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1c2UtcGlwZS10cmFuc2Zvcm0taW50ZXJmYWNlXG5AUGlwZSh7XG4gICAgbmFtZTogJ3NlY3VyZScsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfbGF0ZXN0VmFsdWU6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfbGF0ZXN0UmV0dXJuZWRWYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfb2JqOiBPYnNlcnZhYmxlPGFueT4gPSBudWxsO1xuICAgIHByaXZhdGUgZ2V0ZmlsZTtcbiAgICBwcml2YXRlIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVzdWx0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgcHJpdmF0ZSByZXN1bHQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3Jlc3VsdC5hc09ic2VydmFibGUoKTtcbiAgICBwcml2YXRlIF9pbnRlcm5hbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7IH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcsIGdldGZpbGUpOiBhbnkge1xuICAgICAgICB0aGlzLmdldGZpbGUgPSBnZXRmaWxlO1xuICAgICAgICBjb25zdCBvYmogPSB0aGlzLmludGVybmFsVHJhbnNmb3JtKHVybCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFzeW5jVHJhc25mb3JtKG9iaik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbnRlcm5hbFRyYW5zZm9ybSh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1VybCAhPT0gdXJsKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gdXJsO1xuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24gPSB0aGlzLmdldGZpbGUodXJsKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUobSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhbml0aXplZCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwobSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdC5uZXh0KHNhbml0aXplZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luY1RyYXNuZm9ybShvYmo6IE9ic2VydmFibGU8YW55Pik6IGFueSB7XG4gICAgICAgIGlmICghdGhpcy5fb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiAhPT0gdGhpcy5fb2JqKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3luY1RyYXNuZm9ybShvYmopO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgICByZXR1cm4gV3JhcHBlZFZhbHVlLndyYXAodGhpcy5fbGF0ZXN0VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N1YnNjcmliZShvYmo6IE9ic2VydmFibGU8YW55Pikge1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBvYmouc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fdXBkYXRlTGF0ZXN0VmFsdWUob2JqLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LCBlcnJvcjogKGU6IGFueSkgPT4geyB0aHJvdyBlOyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb2JqID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVMYXRlc3RWYWx1ZShhc3luYzogYW55LCB2YWx1ZTogT2JqZWN0KSB7XG4gICAgICAgIGlmIChhc3luYyA9PT0gdGhpcy5fb2JqKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19