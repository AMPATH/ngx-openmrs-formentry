var CheckboxControlComponent_1;
import * as tslib_1 from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let CheckboxControlComponent = CheckboxControlComponent_1 = class CheckboxControlComponent {
    constructor() {
        this._value = [];
        this.onChange = (change) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.options = this.options.map((option) => {
            if (this.selected.indexOf(option.value) !== -1) {
                Object.assign(option, { checked: true });
            }
            return option;
        });
    }
    ngAfterViewInit() { }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this._value || this._value[0];
        }
    }
    set value(v) {
        if (typeof v === 'undefined' || v === null || v === '') {
            v = [];
        }
        else if (typeof v === 'string') {
            v = [v];
        }
        else if (!Array.isArray(v)) {
            throw new TypeError('Value must be a string or an array.');
        }
    }
    selectOpt(option, event) {
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach((o) => {
                if (o.value === option.value) {
                    this._value.splice(o, 1);
                }
            });
        }
        this.onChange(this.value);
    }
};
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
                useExisting: forwardRef(() => CheckboxControlComponent_1),
                multi: true,
            }
        ],
        styles: [`
    .no-border {
      border: 0;
      box-shadow: none;
    }`]
    })
], CheckboxControlComponent);
export { CheckboxControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NoZWNrLWJveC9jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBaUJuRCxJQUFhLHdCQUF3QixnQ0FBckMsTUFBYSx3QkFBd0I7SUFmckM7UUFtQlMsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQXlEdkIsYUFBUSxHQUFHLENBQUMsTUFBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEMsY0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBMURRLFFBQVE7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxlQUFlLEtBQUksQ0FBQztJQUVwQixVQUFVLENBQUMsS0FBVTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEVBQWM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdEQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNSO2FBQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDaEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxTQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFTSxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUs7UUFDNUIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FLRixDQUFBO0FBOURVO0lBQVIsS0FBSyxFQUFFO3NDQUFpQixLQUFLO3lEQUFNO0FBQzNCO0lBQVIsS0FBSyxFQUFFO3NDQUFrQixLQUFLOzBEQUFNO0FBSDFCLHdCQUF3QjtJQWZwQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixrVEFBd0M7UUFDeEMsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBd0IsQ0FBQztnQkFDdkQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUFDO2lCQUNLOzs7O01BSUw7S0FDTCxDQUFDO0dBQ1csd0JBQXdCLENBZ0VwQztTQWhFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tib3hDb250cm9sQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1dLFxuICBzdHlsZXM6IFtgXG4gICAgLm5vLWJvcmRlciB7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBib3gtc2hhZG93OiBub25lO1xuICAgIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0ZWQ6IEFycmF5PGFueT47XG4gIHB1YmxpYyBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmRleE9mKG9wdGlvbi52YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0aW9uLCB7Y2hlY2tlZDogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7fVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICBpZiAodGhpcy5fdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZSB8fCB0aGlzLl92YWx1ZVswXTtcbiAgICB9XG4gIH1cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XG4gICAgICB2ID0gW107XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHYgPSBbdl07XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T3B0KG9wdGlvbiwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG8pID0+IHtcbiAgICAgICAgaWYgKG8udmFsdWUgPT09IG9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3ZhbHVlLnNwbGljZShvLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2UgPSAoY2hhbmdlOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbn1cbiJdfQ==