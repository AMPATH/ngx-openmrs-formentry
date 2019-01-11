/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
/** @type {?} */
var Moment = moment_;
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    DateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} count
     * @return {?}
     */
    DateTimePickerComponent.prototype.weeksSelected = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        /** @type {?} */
        var now = new Date();
        /** @type {?} */
        var nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateTimePickerComponent.prototype.setDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DateTimePickerComponent.prototype.setTime = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    DateTimePickerComponent.prototype.toggleDatePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showDatePicker = status;
        /*setTimeout(function() {
          let _body = document.getElementById('content-wrapper').getBoundingClientRect(),
            elem = document.getElementById('section-modal-main');
          if (elem) {
            let elemBox = elem.getBoundingClientRect();
            if (elemBox.bottom > _body.bottom) {
              elem.style.bottom = '36px';
            }
          }
        }, 0);*/
        return;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    DateTimePickerComponent.prototype.toggleTimePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showTimePicker = status;
        return;
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modelValue;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.modelValue = val;
            this.onDateChange.emit(val);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DateTimePickerComponent.prototype.registerOnChange = /**
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
    DateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-time-picker',
                    template: "<div class='row'>\n    <div *ngIf=\"!showTime\" class='col-xs-12 col-md-12'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-8 col-md-8'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-4 col-md-4'>\n        <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n        />\n    </div>\n</div>\n<date-picker *ngIf=\"showDatePicker\" [initDate]=\"value\" (onSelectDate)=\"setDate($event)\" (onDatePickerCancel)=\"toggleDatePicker($event)\"></date-picker>\n\n<time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"setTime($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true
                        }
                    ],
                    styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"]
                }] }
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return []; };
    DateTimePickerComponent.propDecorators = {
        modelValue: [{ type: Input }],
        showDate: [{ type: Input }],
        showTime: [{ type: Input }],
        showWeeks: [{ type: Input }],
        weeks: [{ type: Input }],
        onDateChange: [{ type: Output }]
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
if (false) {
    /** @type {?} */
    DateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    DateTimePickerComponent.prototype.showDate;
    /** @type {?} */
    DateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    DateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    DateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    DateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.showDatePicker;
    /** @type {?} */
    DateTimePickerComponent.prototype.showTimePicker;
    /** @type {?} */
    DateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUF3Qkk7UUFWUyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDOUIsYUFBUSxHQUFRLGNBQVEsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBUSxjQUFRLENBQUMsQ0FBQztJQUczQixDQUFDOzs7O0lBRUQsMENBQVE7OztJQUFSLGNBQWEsQ0FBQzs7Ozs7SUFFZCwrQ0FBYTs7OztJQUFiLFVBQWMsS0FBSzs7WUFDVCxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUU7O1lBQ2hCLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxD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eyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IE1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmNzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dEYXRlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFsyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgcHVibGljIHNob3dEYXRlUGlja2VyID0gZmFsc2U7XG4gICAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICB3ZWVrc1NlbGVjdGVkKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IG5leHREYXRlID0gbm93LnNldERhdGUobm93LmdldERhdGUoKSArIGNvdW50ICogNyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQobmV4dERhdGUpLmZvcm1hdCgpO1xuICAgIH1cbiAgICBzZXREYXRlKGRhdGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0ZSAmJiBkYXRlICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudChkYXRlKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRUaW1lKHRpbWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGltZSAmJiB0aW1lICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh0aW1lKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVEYXRlUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IHN0YXR1cztcbiAgICAgIC8qc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IF9ib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtd3JhcHBlcicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VjdGlvbi1tb2RhbC1tYWluJyk7XG4gICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgbGV0IGVsZW1Cb3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChlbGVtQm94LmJvdHRvbSA+IF9ib2R5LmJvdHRvbSkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAnMzZweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAwKTsqL1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1RpbWVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHZhbCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh2YWx1ZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=