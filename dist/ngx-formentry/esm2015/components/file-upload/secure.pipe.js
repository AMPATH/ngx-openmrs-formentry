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
        /** @type {?} */
        const obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    }
    /**
     * @private
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
                .subscribe((/**
             * @param {?} m
             * @return {?}
             */
            m => {
                /** @type {?} */
                const sanitized = this.sanitizer.bypassSecurityTrustUrl(m);
                this._result.next(sanitized);
            }));
        }
        return this.result;
    }
    /**
     * @private
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
     * @private
     * @param {?} obj
     * @return {?}
     */
    _subscribe(obj) {
        /** @type {?} */
        const _this = this;
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
            (e) => { throw e; })
        });
    }
    /**
     * @private
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
     * @private
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
SecurePipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUdKLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFTeEQsTUFBTTs7Ozs7SUFXRixZQUNZLElBQXVCLEVBQ3ZCLFNBQXVCO1FBRHZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFaM0IsaUJBQVksR0FBUSxJQUFJLENBQUM7UUFDekIseUJBQW9CLEdBQVEsSUFBSSxDQUFDO1FBQ2pDLGtCQUFhLEdBQWlCLElBQUksQ0FBQztRQUNuQyxTQUFJLEdBQW9CLElBQUksQ0FBQztRQUc3QixZQUFPLEdBQXlCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELFdBQU0sR0FBb0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCwwQkFBcUIsR0FBaUIsSUFBSSxDQUFDO0lBSy9DLENBQUM7Ozs7SUFFTCxXQUFXO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBVyxFQUFFLE9BQU87UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O2NBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLE1BQU0s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Q0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsS0FBYTtRQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQzs7O1lBbkdKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsS0FBSzthQUNkOzs7WUFqQkcsaUJBQWlCO1lBU1osWUFBWTs7Ozs7OztJQVVqQixrQ0FBaUM7Ozs7O0lBQ2pDLDBDQUF5Qzs7Ozs7SUFDekMsbUNBQTJDOzs7OztJQUMzQywwQkFBcUM7Ozs7O0lBQ3JDLDZCQUFnQjs7Ozs7SUFDaEIsaUNBQTRCOzs7OztJQUM1Qiw2QkFBa0U7Ozs7O0lBQ2xFLDRCQUE4RDs7Ozs7SUFDOUQsMkNBQW1EOzs7OztJQUcvQywwQkFBK0I7Ozs7O0lBQy9CLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gICAgUGlwZSxcclxuICAgIFBpcGVUcmFuc2Zvcm0sXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBXcmFwcGVkVmFsdWUsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy8gaW1wb3J0IHsgRmlsZVVwbG9hZFJlc291cmNlU2VydmljZSB9IGZyb20gJy4uLy4uL2V0bC1hcGkvZmlsZS11cGxvYWQtcmVzb3VyY2Uuc2VydmljZSc7XHJcblxyXG4vLyBVc2luZyBzaW1pbGFyaXR5IGZyb20gQXN5bmNQaXBlIHRvIGF2b2lkIGhhdmluZyB0byBwaXBlIHxzZWN1cmV8YXN5bmMgaW4gSFRNTC5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1waXBlLXRyYW5zZm9ybS1pbnRlcmZhY2VcclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ3NlY3VyZScsXHJcbiAgICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VjdXJlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIF9sYXRlc3RWYWx1ZTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2xhdGVzdFJldHVybmVkVmFsdWU6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9vYmo6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGdldGZpbGU7XHJcbiAgICBwcml2YXRlIHByZXZpb3VzVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9yZXN1bHQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICAgIHByaXZhdGUgcmVzdWx0OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLl9yZXN1bHQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBwcml2YXRlIF9pbnRlcm5hbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybSh1cmw6IHN0cmluZywgZ2V0ZmlsZSk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5nZXRmaWxlID0gZ2V0ZmlsZTtcclxuICAgICAgICBjb25zdCBvYmogPSB0aGlzLmludGVybmFsVHJhbnNmb3JtKHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGludGVybmFsVHJhbnNmb3JtKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c1VybCAhPT0gdXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gdGhpcy5nZXRmaWxlKHVybClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUobSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FuaXRpemVkID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChtKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHQubmV4dChzYW5pdGl6ZWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luY1RyYXNuZm9ybShvYmo6IE9ic2VydmFibGU8YW55Pik6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzeW5jVHJhc25mb3JtKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xyXG4gICAgICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaWJlKG9iajogT2JzZXJ2YWJsZTxhbnk+KSB7XHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gb2JqLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl91cGRhdGVMYXRlc3RWYWx1ZShvYmosIHZhbHVlKTtcclxuICAgICAgICAgICAgfSwgZXJyb3I6IChlOiBhbnkpID0+IHsgdGhyb3cgZTsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb2JqID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVMYXRlc3RWYWx1ZShhc3luYzogYW55LCB2YWx1ZTogT2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKGFzeW5jID09PSB0aGlzLl9vYmopIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=