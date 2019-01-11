/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CheckboxControlComponent = /** @class */ (function () {
    function CheckboxControlComponent() {
        this._value = [];
        this.onChange = function (change) { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    CheckboxControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    CheckboxControlComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxControlComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    Object.defineProperty(CheckboxControlComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this._value || this._value[0];
            }
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
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
    /**
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    CheckboxControlComponent.prototype.selectOpt = /**
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    function (option, event) {
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
    CheckboxControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox',
                    template: "<div *ngFor=\"let option of options; let i = index;\">\n    <label class=\"form-control no-border\">\n        <input type=\"checkbox\" id=\"i + 'id'\" (change)=\"selectOpt(option, $event)\" value=\"option.value\">\n        {{ option.label }}\n    </label>\n</div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CheckboxControlComponent; }),
                            multi: true,
                        }
                    ],
                    styles: ["\n  .no-border {\n    border: 0;\n    box-shadow: none;\n  }"]
                }] }
    ];
    CheckboxControlComponent.propDecorators = {
        options: [{ type: Input }]
    };
    return CheckboxControlComponent;
}());
export { CheckboxControlComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRXBGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUl4RTtJQUFBO1FBbUJTLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFrRHZCLGFBQVEsR0FBRyxVQUFFLE1BQVcsSUFBTyxDQUFDLENBQUM7UUFDakMsY0FBUyxHQUFHLGNBQVEsQ0FBQyxDQUFDO0lBRWhDLENBQUM7Ozs7SUFuRFEsMkNBQVE7OztJQUFmLGNBQW1CLENBQUM7Ozs7SUFFYixrREFBZTs7O0lBQXRCLGNBQTBCLENBQUM7Ozs7O0lBRXBCLDZDQUFVOzs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxtREFBZ0I7Ozs7SUFBdkIsVUFBd0IsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxvREFBaUI7Ozs7SUFBeEIsVUFBeUIsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsc0JBQUksMkNBQUs7Ozs7UUFBVDtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixPQUFPLEVBQUUsQ0FBQzthQUNiO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQU07WUFDZCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3BELENBQUMsR0FBRyxFQUFFLENBQUM7YUFDVjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDWDtpQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQzs7O09BVkE7Ozs7OztJQVlNLDRDQUFTOzs7OztJQUFoQixVQUFpQixNQUFNLEVBQUUsS0FBSztRQUE5QixpQkFZQztRQVhDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUM1QixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7O2dCQW5FRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLG1SQUF3QztvQkFDeEMsU0FBUyxFQUFFO3dCQUNUOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixDQUFDOzRCQUN2RCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFBQzs2QkFDSyw4REFJUDtpQkFDSDs7OzBCQUdFLEtBQUs7O0lBdURSLCtCQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0F6RFksd0JBQXdCOzs7SUFFbkMsMkNBQXdCOztJQUV4QiwwQ0FBK0I7Ozs7O0lBa0QvQiw0Q0FBeUM7Ozs7O0lBQ3pDLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveENvbnRyb2xDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XSxcbiAgc3R5bGVzOiBbYFxuICAubm8tYm9yZGVyIHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgfWBdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94Q29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM7XG5cbiAgcHVibGljIF92YWx1ZTogQXJyYXk8YW55PiA9IFtdO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIGlmICh0aGlzLl92YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSB8fCB0aGlzLl92YWx1ZVswXTtcbiAgICB9XG4gIH1cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XG4gICAgICAgIHYgPSBbXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgICAgICB2ID0gW3ZdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T3B0KG9wdGlvbiwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG8pID0+IHtcbiAgICAgICAgaWYgKG8udmFsdWUgPT09IG9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3ZhbHVlLnNwbGljZShvLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2UgPSAoIGNoYW5nZTogYW55KSA9PiB7IH07XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG59XG4iXX0=