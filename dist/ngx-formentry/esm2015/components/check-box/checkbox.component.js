/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class CheckboxControlComponent {
    constructor() {
        this._value = [];
        this.onChange = (/**
         * @param {?} change
         * @return {?}
         */
        (change) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @return {?}
     */
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this._value || this._value[0];
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
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
    /**
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    selectOpt(option, event) {
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach((/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
                if (o.value === option.value) {
                    this._value.splice(o, 1);
                }
            }));
        }
        this.onChange(this.value);
    }
}
CheckboxControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'checkbox',
                template: `<div *ngFor="let option of options; let i = index;">
    <label class="form-control no-border">
        <input type="checkbox" id="i + 'id'" (change)="selectOpt(option, $event)" value="option.value">
        {{ option.label }}
    </label>
</div>`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => CheckboxControlComponent)),
                        multi: true,
                    }
                ],
                styles: [`
  .no-border {
    border: 0;
    box-shadow: none;
  }`]
            },] },
];
CheckboxControlComponent.propDecorators = {
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CheckboxControlComponent.prototype.options;
    /** @type {?} */
    CheckboxControlComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    CheckboxControlComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    CheckboxControlComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRXBGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXdCeEUsTUFBTTtJQXBCTjtRQXdCUyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBa0R2QixhQUFROzs7O1FBQUcsQ0FBRSxNQUFXLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQztRQUNqQyxjQUFTOzs7UUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFFaEMsQ0FBQzs7OztJQW5EUSxRQUFRLEtBQUksQ0FBQzs7OztJQUViLGVBQWUsS0FBSSxDQUFDOzs7OztJQUVwQixVQUFVLENBQUMsS0FBVTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7OztJQUVNLGdCQUFnQixDQUFDLEVBQW9CO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUMsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLElBQUksU0FBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUM7Ozs7OztJQUVNLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSztRQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQXhFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRTs7Ozs7T0FLTDtnQkFDTCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsRUFBQzt3QkFDdkQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQUM7Z0JBQ0osTUFBTSxFQUFFLENBQUM7Ozs7SUFJUCxDQUFDO2FBQ0o7OztzQkFHRSxLQUFLOzs7O0lBQU4sMkNBQXdCOztJQUV4QiwwQ0FBK0I7Ozs7O0lBa0QvQiw0Q0FBeUM7Ozs7O0lBQ3pDLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjaGVja2JveCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cclxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbCBuby1ib3JkZXJcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJpICsgJ2lkJ1wiIChjaGFuZ2UpPVwic2VsZWN0T3B0KG9wdGlvbiwgJGV2ZW50KVwiIHZhbHVlPVwib3B0aW9uLnZhbHVlXCI+XHJcbiAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XHJcbiAgICA8L2xhYmVsPlxyXG48L2Rpdj5gLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29udHJvbENvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9XSxcclxuICBzdHlsZXM6IFtgXHJcbiAgLm5vLWJvcmRlciB7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gIH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM7XHJcblxyXG4gIHB1YmxpYyBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XHJcblxyXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgIGlmICh0aGlzLl92YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSB8fCB0aGlzLl92YWx1ZVswXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCB8fCB2ID09PSAnJykge1xyXG4gICAgICAgIHYgPSBbXTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdiA9IFt2XTtcclxuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE9wdChvcHRpb24sIGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5fdmFsdWUucHVzaChvcHRpb24udmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBpZiAoby52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl92YWx1ZS5zcGxpY2UobywgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNoYW5nZSA9ICggY2hhbmdlOiBhbnkpID0+IHsgfTtcclxuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcclxuXHJcbn1cclxuIl19