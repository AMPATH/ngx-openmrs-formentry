import { Pipe, WrappedValue, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
// import { FileUploadResourceService } from '../../etl-api/file-upload-resource.service';
// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
// tslint:disable-next-line:use-pipe-transform-interface
export class SecurePipe {
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
    ngOnDestroy() {
        if (this._subscription) {
            this._dispose();
        }
    }
    transform(url, getfile) {
        this.getfile = getfile;
        const obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    }
    internalTransform(url) {
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url).subscribe((m) => {
                const sanitized = this.sanitizer.bypassSecurityTrustUrl(m);
                this._result.next(sanitized);
            });
        }
        return this.result;
    }
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
    _subscribe(obj) {
        const _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            },
            error: (e) => {
                throw e;
            }
        });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxJQUFJLEVBR0osWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCwwRkFBMEY7QUFFMUYsaUZBQWlGO0FBQ2pGLHdEQUF3RDtBQUt4RCxNQUFNO0lBV0osWUFDVSxJQUF1QixFQUN2QixTQUF1QjtRQUR2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBWnpCLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLHlCQUFvQixHQUFRLElBQUksQ0FBQztRQUNqQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFDbkMsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFHN0IsWUFBTyxHQUF5QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQW9CLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsMEJBQXFCLEdBQWlCLElBQUksQ0FBQztJQUtoRCxDQUFDO0lBRUosV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFXLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENB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QXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEtBQVUsRUFBRSxLQUFhO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDOzs7WUFyR0YsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxLQUFLO2FBQ1o7OztZQWhCQyxpQkFBaUI7WUFRVixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbiAgT25EZXN0cm95LFxuICBXcmFwcGVkVmFsdWUsXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBpbXBvcnQgeyBGaWxlVXBsb2FkUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZXRsLWFwaS9maWxlLXVwbG9hZC1yZXNvdXJjZS5zZXJ2aWNlJztcblxuLy8gVXNpbmcgc2ltaWxhcml0eSBmcm9tIEFzeW5jUGlwZSB0byBhdm9pZCBoYXZpbmcgdG8gcGlwZSB8c2VjdXJlfGFzeW5jIGluIEhUTUwuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLXBpcGUtdHJhbnNmb3JtLWludGVyZmFjZVxuQFBpcGUoe1xuICBuYW1lOiAnc2VjdXJlJyxcbiAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2xhdGVzdFZhbHVlOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF9sYXRlc3RSZXR1cm5lZFZhbHVlOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHByaXZhdGUgX29iajogT2JzZXJ2YWJsZTxhbnk+ID0gbnVsbDtcbiAgcHJpdmF0ZSBnZXRmaWxlO1xuICBwcml2YXRlIHByZXZpb3VzVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgX3Jlc3VsdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICBwcml2YXRlIHJlc3VsdDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fcmVzdWx0LmFzT2JzZXJ2YWJsZSgpO1xuICBwcml2YXRlIF9pbnRlcm5hbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcsIGdldGZpbGUpOiBhbnkge1xuICAgIHRoaXMuZ2V0ZmlsZSA9IGdldGZpbGU7XG4gICAgY29uc3Qgb2JqID0gdGhpcy5pbnRlcm5hbFRyYW5zZm9ybSh1cmwpO1xuICAgIHJldHVybiB0aGlzLmFzeW5jVHJhc25mb3JtKG9iaik7XG4gIH1cblxuICBwcml2YXRlIGludGVybmFsVHJhbnNmb3JtKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpb3VzVXJsICE9PSB1cmwpIHtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSB1cmw7XG4gICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbiA9IHRoaXMuZ2V0ZmlsZSh1cmwpLnN1YnNjcmliZSgobSkgPT4ge1xuICAgICAgICBjb25zdCBzYW5pdGl6ZWQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKG0pO1xuICAgICAgICB0aGlzLl9yZXN1bHQubmV4dChzYW5pdGl6ZWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luY1RyYXNuZm9ybShvYmo6IE9ic2VydmFibGU8YW55Pik6IGFueSB7XG4gICAgaWYgKCF0aGlzLl9vYmopIHtcbiAgICAgIGlmIChvYmopIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaWJlKG9iaik7XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gICAgfVxuICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xuICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUcmFzbmZvcm0ob2JqKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgIHJldHVybiBXcmFwcGVkVmFsdWUud3JhcCh0aGlzLl9sYXRlc3RWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpYmUob2JqOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fb2JqID0gb2JqO1xuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gb2JqLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLl91cGRhdGVMYXRlc3RWYWx1ZShvYmosIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKGU6IGFueSkgPT4ge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2ludGVybmFsU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9vYmogPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlTGF0ZXN0VmFsdWUoYXN5bmM6IGFueSwgdmFsdWU6IE9iamVjdCkge1xuICAgIGlmIChhc3luYyA9PT0gdGhpcy5fb2JqKSB7XG4gICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIl19