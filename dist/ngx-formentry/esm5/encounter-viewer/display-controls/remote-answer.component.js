import * as tslib_1 from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var noop = function () { };
var ɵ0 = noop;
var RemoteAnswerComponent = /** @class */ (function () {
    function RemoteAnswerComponent() {
        this.innerValue = null;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    RemoteAnswerComponent_1 = RemoteAnswerComponent;
    Object.defineProperty(RemoteAnswerComponent.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RemoteAnswerComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    // Current time string.
    RemoteAnswerComponent.prototype.writeValue = function (v) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this._dataSource) {
                this._dataSource.resolveSelectedValue(v).subscribe(function (ans) {
                    _this.innerValue = ans.label;
                });
            }
            else {
                this.innerValue = v;
            }
        }
    };
    // From ControlValueAccessor interface
    RemoteAnswerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    RemoteAnswerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    RemoteAnswerComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    RemoteAnswerComponent.prototype.onChange = function (event) {
    };
    var RemoteAnswerComponent_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], RemoteAnswerComponent.prototype, "source", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], RemoteAnswerComponent.prototype, "dataSource", null);
    RemoteAnswerComponent = RemoteAnswerComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'remote-answer',
            template: "\n    <div *ngIf=\"innerValue\">\n      {{innerValue}}\n      </div>\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return RemoteAnswerComponent_1; }),
                    multi: true
                }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RemoteAnswerComponent);
    return RemoteAnswerComponent;
}());
export { RemoteAnswerComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWFuc3dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFFckMsTUFBTSxlQUFlLENBQUM7QUFDekIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLElBQU0sSUFBSSxHQUFHLGNBQU8sQ0FBQyxDQUFDOztBQWtCdEI7SUFlSTtRQWJPLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFTekIsMkRBQTJEO1FBQzNELGdDQUFnQztRQUN4QixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUNuQyxDQUFDOzhCQWZQLHFCQUFxQjtJQUs5QixzQkFBVyw2Q0FBVTthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBQ0QsVUFBc0IsQ0FBYTtZQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQVVELHNCQUFJLHdDQUFLO1FBRFQsZUFBZTthQUNmO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7YUFDcEQsVUFBVSxDQUFNO1lBQ2QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7YUFDckI7UUFDSCxDQUFDOzs7T0FQQTtJQVFELHVCQUF1QjtJQUVoQiwwQ0FBVSxHQUFqQixVQUFrQixDQUFNO1FBQXhCLGlCQVVDO1FBVEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztvQkFDckQsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQzthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsc0NBQXNDO0lBQy9CLGdEQUFnQixHQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNDQUFzQztJQUMvQixpREFBaUIsR0FBeEIsVUFBeUIsRUFBTztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxzQ0FBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHdDQUFRLEdBQWYsVUFBZ0IsS0FBVTtJQUMxQixDQUFDOztJQXZEUTtRQUFSLEtBQUssRUFBRTs7eURBQW9CO0lBSTVCO1FBREMsS0FBSyxFQUFFOzs7MkRBR1A7SUFQUSxxQkFBcUI7UUFoQmpDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBRXpCLFFBQVEsRUFBRSx3RUFJYjtZQUNHLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx1QkFBcUIsRUFBckIsQ0FBcUIsQ0FBQztvQkFDcEQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7O09BQ1MscUJBQXFCLENBeUQvQjtJQUFELDRCQUFDO0NBQUEsQUF6REgsSUF5REc7U0F6RFUscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gICAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3JlbW90ZS1hbnN3ZXInLFxuICAgIHN0eWxlczogW10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaW5uZXJWYWx1ZVwiPlxuICAgICAge3tpbm5lclZhbHVlfX1cbiAgICAgIDwvZGl2PlxuYCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJlbW90ZUFuc3dlckNvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9KVxuZXhwb3J0IGNsYXNzIFJlbW90ZUFuc3dlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gICAgcHVibGljIGlubmVyVmFsdWUgPSBudWxsO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIC8vIGdldCBhY2Nlc3NvclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2KS5zdWJzY3JpYmUoKGFucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gYW5zLmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmx1cigpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIH1cbiAgfVxuIl19