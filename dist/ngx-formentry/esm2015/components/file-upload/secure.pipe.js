/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe, WrappedValue, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
export class SecurePipe {
    /**
     * @param {?} _ref
     * @param {?} sanitizer
     */
    constructor(_ref, sanitizer) {
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
    ngOnDestroy() {
        if (this._subscription) {
            this._dispose();
        }
    }
    /**
     * @param {?} url
     * @param {?} getfile
     * @return {?}
     */
    transform(url, getfile) {
        this.getfile = getfile;
        const /** @type {?} */ obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    internalTransform(url) {
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe(m => {
                const /** @type {?} */ sanitized = this.sanitizer.bypassSecurityTrustUrl(m);
                this._result.next(sanitized);
            });
        }
        return this.result;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    asyncTrasnform(obj) {
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
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    _subscribe(obj) {
        const /** @type {?} */ _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: (e) => { throw e; }
        });
    }
    /**
     * @return {?}
     */
    _dispose() {
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
    }
    /**
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    }
}
SecurePipe.decorators = [
    { type: Pipe, args: [{
                name: 'secure',
                pure: false
            },] },
];
/** @nocollapse */
SecurePipe.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DomSanitizer, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFTeEQsTUFBTTs7Ozs7SUFXRixZQUNZLE1BQ0E7UUFEQSxTQUFJLEdBQUosSUFBSTtRQUNKLGNBQVMsR0FBVCxTQUFTOzRCQVpPLElBQUk7b0NBQ0ksSUFBSTs2QkFDRixJQUFJO29CQUNWLElBQUk7dUJBR0ksSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDO3NCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtxQ0FDZixJQUFJO0tBSzdDOzs7O0lBRUwsV0FBVztRQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtLQUNKOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBVyxFQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsdUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxHQUFXO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxD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Q0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDNUI7Ozs7WUFsR1IsSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxLQUFLO2FBQ2Q7Ozs7WUFqQkcsaUJBQWlCO1lBU1osWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gICAgUGlwZSxcclxuICAgIFBpcGVUcmFuc2Zvcm0sXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBXcmFwcGVkVmFsdWUsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy8gaW1wb3J0IHsgRmlsZVVwbG9hZFJlc291cmNlU2VydmljZSB9IGZyb20gJy4uLy4uL2V0bC1hcGkvZmlsZS11cGxvYWQtcmVzb3VyY2Uuc2VydmljZSc7XHJcblxyXG4vLyBVc2luZyBzaW1pbGFyaXR5IGZyb20gQXN5bmNQaXBlIHRvIGF2b2lkIGhhdmluZyB0byBwaXBlIHxzZWN1cmV8YXN5bmMgaW4gSFRNTC5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1waXBlLXRyYW5zZm9ybS1pbnRlcmZhY2VcclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ3NlY3VyZScsXHJcbiAgICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VjdXJlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIF9sYXRlc3RWYWx1ZTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2xhdGVzdFJldHVybmVkVmFsdWU6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9vYmo6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGdldGZpbGU7XHJcbiAgICBwcml2YXRlIHByZXZpb3VzVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9yZXN1bHQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICAgIHByaXZhdGUgcmVzdWx0OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9yZXN1bHQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBwcml2YXRlIF9pbnRlcm5hbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybSh1cmw6IHN0cmluZywgZ2V0ZmlsZSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5nZXRmaWxlID0gZ2V0ZmlsZTtcclxuICAgICAgICBjb25zdCBvYmogPSB0aGlzLmludGVybmFsVHJhbnNmb3JtKHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVybmFsVHJhbnNmb3JtKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1VybCAhPT0gdXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gdGhpcy5nZXRmaWxlKHVybClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUobSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FuaXRpemVkID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChtKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHQubmV4dChzYW5pdGl6ZWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luY1RyYXNuZm9ybShvYmo6IE9ic2VydmFibGU8YW55Pik6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzeW5jVHJhc25mb3JtKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xyXG4gICAgICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaWJlKG9iajogT2JzZXJ2YWJsZTxhbnk+KSB7XHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gb2JqLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl91cGRhdGVMYXRlc3RWYWx1ZShvYmosIHZhbHVlKTtcclxuICAgICAgICAgICAgfSwgZXJyb3I6IChlOiBhbnkpID0+IHsgdGhyb3cgZTsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb2JqID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVMYXRlc3RWYWx1ZShhc3luYzogYW55LCB2YWx1ZTogT2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKGFzeW5jID09PSB0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=