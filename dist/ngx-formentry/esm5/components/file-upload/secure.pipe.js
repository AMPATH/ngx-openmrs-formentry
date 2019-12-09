import * as tslib_1 from "tslib";
import { Pipe, PipeTransform, OnDestroy, WrappedValue, ChangeDetectorRef } from '@angular/core';
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
    SecurePipe.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._dispose();
        }
    };
    SecurePipe.prototype.transform = function (url, getfile) {
        this.getfile = getfile;
        var obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    };
    SecurePipe.prototype.internalTransform = function (url) {
        var _this_1 = this;
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe(function (m) {
                var sanitized = _this_1.sanitizer.bypassSecurityTrustUrl(m);
                _this_1._result.next(sanitized);
            });
        }
        return this.result;
    };
    SecurePipe.prototype.asyncTrasnform = function (obj) {
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
    SecurePipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: function (e) { throw e; }
        });
    };
    SecurePipe.prototype._dispose = function () {
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
    SecurePipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    SecurePipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer }
    ]; };
    SecurePipe = tslib_1.__decorate([
        Pipe({
            name: 'secure',
            pure: false
        }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            DomSanitizer])
    ], SecurePipe);
    return SecurePipe;
}());
export { SecurePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQ0gsSUFBSSxFQUNKLGFBQWEsRUFDYixTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXNDLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUczRSxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsMEZBQTBGO0FBRTFGLGlGQUFpRjtBQUNqRix3REFBd0Q7QUFLeEQ7SUFXSSxvQkFDWSxJQUF1QixFQUN2QixTQUF1QjtRQUR2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBWjNCLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFHN0IsWUFBTyxHQUF5QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQW9CLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsMEJBQXFCLEdBQWlCLElBQUksQ0FBQztJQUsvQyxDQUFDO0lBRUwsZ0NBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsOEJBQVMsR0FBVCxVQUFVLEdBQVcsRUFBRSxPQUFPO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFB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O1FBQ2hELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7O2dCQW5GaUIsaUJBQWlCO2dCQUNaLFlBQVk7O0lBYjFCLFVBQVU7UUFKdEIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUM7aURBYW9CLGlCQUFpQjtZQUNaLFlBQVk7T0FiMUIsVUFBVSxDQWdHdEI7SUFBRCxpQkFBQztDQUFBLEFBaEdELElBZ0dDO1NBaEdZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG4gICAgUGlwZSxcbiAgICBQaXBlVHJhbnNmb3JtLFxuICAgIE9uRGVzdHJveSxcbiAgICBXcmFwcGVkVmFsdWUsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvZiAsICBTdWJzY3JpcHRpb24gLCAgT2JzZXJ2YWJsZSAsICBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuLy8gaW1wb3J0IHsgRmlsZVVwbG9hZFJlc291cmNlU2VydmljZSB9IGZyb20gJy4uLy4uL2V0bC1hcGkvZmlsZS11cGxvYWQtcmVzb3VyY2Uuc2VydmljZSc7XG5cbi8vIFVzaW5nIHNpbWlsYXJpdHkgZnJvbSBBc3luY1BpcGUgdG8gYXZvaWQgaGF2aW5nIHRvIHBpcGUgfHNlY3VyZXxhc3luYyBpbiBIVE1MLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1waXBlLXRyYW5zZm9ybS1pbnRlcmZhY2VcbkBQaXBlKHtcbiAgICBuYW1lOiAnc2VjdXJlJyxcbiAgICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBTZWN1cmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9sYXRlc3RWYWx1ZTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIF9sYXRlc3RSZXR1cm5lZFZhbHVlOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIF9vYmo6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBnZXRmaWxlO1xuICAgIHByaXZhdGUgcHJldmlvdXNVcmw6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXN1bHQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICBwcml2YXRlIHJlc3VsdDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fcmVzdWx0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHByaXZhdGUgX2ludGVybmFsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgICApIHsgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zZm9ybSh1cmw6IHN0cmluZywgZ2V0ZmlsZSk6IGFueSB7XG4gICAgICAgIHRoaXMuZ2V0ZmlsZSA9IGdldGZpbGU7XG4gICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuaW50ZXJuYWxUcmFuc2Zvcm0odXJsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGludGVybmFsVHJhbnNmb3JtKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzVXJsICE9PSB1cmwpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNVcmwgPSB1cmw7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbiA9IHRoaXMuZ2V0ZmlsZSh1cmwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FuaXRpemVkID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0Lm5leHQoc2FuaXRpemVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jVHJhc25mb3JtKG9iajogT2JzZXJ2YWJsZTxhbnk+KTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLl9vYmopIHtcbiAgICAgICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXRlc3RWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqICE9PSB0aGlzLl9vYmopIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzeW5jVHJhc25mb3JtKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gICAgICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaWJlKG9iajogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fb2JqID0gb2JqO1xuXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG9iai5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl91cGRhdGVMYXRlc3RWYWx1ZShvYmosIHZhbHVlKTtcbiAgICAgICAgICAgIH0sIGVycm9yOiAoZTogYW55KSA9PiB7IHRocm93IGU7IH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW50ZXJuYWxTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9vYmogPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUxhdGVzdFZhbHVlKGFzeW5jOiBhbnksIHZhbHVlOiBPYmplY3QpIHtcbiAgICAgICAgaWYgKGFzeW5jID09PSB0aGlzLl9vYmopIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=