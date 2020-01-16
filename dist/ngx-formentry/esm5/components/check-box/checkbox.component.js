import * as tslib_1 from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CheckboxControlComponent = /** @class */ (function () {
    function CheckboxControlComponent() {
        this._value = [];
        this.onChange = function (change) { };
        this.onTouched = function () { };
    }
    CheckboxControlComponent_1 = CheckboxControlComponent;
    CheckboxControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = this.options.map(function (option) {
            if (_this.selected.indexOf(option.value) !== -1) {
                Object.assign(option, { checked: true });
            }
            return option;
        });
    };
    CheckboxControlComponent.prototype.ngAfterViewInit = function () { };
    CheckboxControlComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CheckboxControlComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CheckboxControlComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Object.defineProperty(CheckboxControlComponent.prototype, "value", {
        get: function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this._value || this._value[0];
            }
        },
        set: function (v) {
            if (typeof v === 'undefined' || v === null || v === '') {
                v = [];
            }
            else if (typeof v === 'string') {
                v = [v];
            }
            else if (!Array.isArray(v)) {
                throw new TypeError('Value must be a string or an array.');
            }
        },
        enumerable: true,
        configurable: true
    });
    CheckboxControlComponent.prototype.selectOpt = function (option, event) {
        var _this = this;
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach(function (o) {
                if (o.value === option.value) {
                    _this._value.splice(o, 1);
                }
            });
        }
        this.onChange(this.value);
    };
    var CheckboxControlComponent_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CheckboxControlComponent.prototype, "options", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CheckboxControlComponent.prototype, "selected", void 0);
    CheckboxControlComponent = CheckboxControlComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'checkbox',
            template: "<div *ngFor=\"let option of options; let i = index;\">\n    <label class=\"form-control no-border\">\n        <input type=\"checkbox\" id=\"i + 'id'\" (change)=\"selectOpt(option, $event)\" value=\"option.value\" [checked]=\"option.checked\">\n        {{ option.label }}\n    </label>\n</div>\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return CheckboxControlComponent_1; }),
                    multi: true,
                }
            ],
            styles: ["\n    .no-border {\n      border: 0;\n      box-shadow: none;\n    }"]
        })
    ], CheckboxControlComponent);
    return CheckboxControlComponent;
}());
export { CheckboxControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NoZWNrLWJveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBeUIsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFpQm5EO0lBZkE7UUFtQlMsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQXlEdkIsYUFBUSxHQUFHLFVBQUMsTUFBVyxJQUFPLENBQUMsQ0FBQztRQUNoQyxjQUFTLEdBQUcsY0FBUSxDQUFDLENBQUM7SUFFaEMsQ0FBQztpQ0FoRVksd0JBQXdCO0lBTTVCLDJDQUFRLEdBQWY7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQ3JDLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sa0RBQWUsR0FBdEIsY0FBMEIsQ0FBQztJQUVwQiw2Q0FBVSxHQUFqQixVQUFrQixLQUFVO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxtREFBZ0IsR0FBdkIsVUFBd0IsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLG9EQUFpQixHQUF4QixVQUF5QixFQUFjO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBSSwyQ0FBSzthQUFUO1lBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDO2FBRUQsVUFBVSxDQUFNO1lBQ2QsSUFBSSxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN0RCxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ1I7aUJBQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7aUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxTQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUM1RDtRQUNILENBQUM7OztPQVZBO0lBWU0sNENBQVMsR0FBaEIsVUFBaUIsTUFBTSxFQUFFLEtBQUs7UUFBOUIsaUJBWUM7UUFYQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDNUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOztJQXpEUTtRQUFSLEtBQUssRUFBRTswQ0FBaUIsS0FBSzs2REFBTTtJQUMzQjtRQUFSLEtBQUssRUFBRTswQ0FBa0IsS0FBSzs4REFBTTtJQUgxQix3QkFBd0I7UUFmcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsa1RBQXdDO1lBQ3hDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztvQkFDdkQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFBQztxQkFDSyxzRUFJTDtTQUNMLENBQUM7T0FDVyx3QkFBd0IsQ0FnRXBDO0lBQUQsK0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tib3hDb250cm9sQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1dLFxuICBzdHlsZXM6IFtgXG4gICAgLm5vLWJvcmRlciB7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBib3gtc2hhZG93OiBub25lO1xuICAgIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0ZWQ6IEFycmF5PGFueT47XG4gIHB1YmxpYyBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmRleE9mKG9wdGlvbi52YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9uLCB7Y2hlY2tlZDogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7fVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICBpZiAodGhpcy5fdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZSB8fCB0aGlzLl92YWx1ZVswXTtcbiAgICB9XG4gIH1cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XG4gICAgICB2ID0gW107XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHYgPSBbdl07XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T3B0KG9wdGlvbiwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG8pID0+IHtcbiAgICAgICAgaWYgKG8udmFsdWUgPT09IG9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3ZhbHVlLnNwbGljZShvLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbn1cbiJdfQ==