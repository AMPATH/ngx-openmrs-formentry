/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
export var /** @type {?} */ MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var NgxDateTimePickerComponent = /** @class */ (function () {
    function NgxDateTimePickerComponent() {
        this.selectedTime = moment().format('HH:mm');
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(NgxDateTimePickerComponent.prototype, "value", {
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
            var _this = this;
            setTimeout(function () {
                _this.onDateChange.emit(val);
            }, 100);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.loadInitial) {
            this.setFormValues(value);
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setFormValues = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.loadInitial = true;
        this.selectedDate = moment(val).format();
        this.selectedTime = moment(val).format('HH:mm');
        if (val instanceof Date) {
            this.value = moment(val).format();
        }
        else {
            this.value = val;
        }
        this.modelValue = this.value;
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getDatePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        if (this.showTime === true) {
            return 'col-sm-8 form-group';
        }
        return 'col-sm-12 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getTimePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnChange = /**
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
    NgxDateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onDateSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment($event);
        var /** @type {?} */ setTime = this.selectedTime;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onTimeSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ setTime = $event;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentTime = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(setDate, currentTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.weekSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ dateToUse;
        if (this.selectedDate === null && this.selectedDate === undefined) {
            dateToUse = moment().format();
        }
        var /** @type {?} */ nextWeekDate = moment(dateToUse).add($event, 'weeks');
        var /** @type {?} */ nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentDate = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ currentDay = moment();
        var /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(currentDay, currentTime);
    };
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setDateTime = /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    function (setDate, setTime) {
        var /** @type {?} */ newDate = moment(setDate).format('DD-MM-YYYY');
        var /** @type {?} */ newTime = setTime;
        var /** @type {?} */ newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm');
        var /** @type {?} */ dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = newTime;
        this.modelValue = dateTimeString;
        this.value = dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div class=\"form\">\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput [matDatepicker]=\"picker\" class=\"form-control\" [(ngModel)]=\"selectedDate\" placeholder=\"Choose a date\" (ngModelChange)=\"onDateSelect($event)\">\n        <mat-datepicker #picker touchUi=\"true\" disabled=\"false\"></mat-datepicker>\n        <div class=\"input-group-btn\">\n          <button class=\"btn btn-default\" (click)=\"picker.open()\">\n            <i class=\"glyphicon glyphicon-calendar\"></i>\n          </button>\n          <button class=\"btn btn-default\" (click)=\"setCurrentDate()\">\n            Set Current Date\n          </button>\n        </div>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\" class=\"form-control\" name=\"weeks\" [(ngModel)]=\"modelValue\" (ngModelChange)=\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n      <div class=\"input-group\">\n        <input type=\"time\" class=\"form-control\" atp-time-picker [(ngModel)]=\"selectedTime\" (ngModelChange)=\"onTimeSelect($event)\"\n          id=\"ngx-atp-time-picker\" />\n        <div class=\"input-group-btn\">\n          <button mat-raised-button class=\"btn btn-default\" (click)=\"setCurrentTime()\">\n            Set Current Time\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
                    styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                        { provide: DateAdapter, useClass: MomentDateAdapter },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxDateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxDateTimePickerComponent.propDecorators = {
        "weeks": [{ type: Input },],
        "modelValue": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showWeeks": [{ type: Input },],
        "onDateChange": [{ type: Output },],
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
function NgxDateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxDateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxDateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxDateTimePickerComponent.propDecorators;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedDate;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.loadInitial;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMscUJBQU0sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0osQ0FBQzs7OzRCQXNEd0IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFOzJCQUNsQixLQUFLO3FCQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFFbEMsS0FBSzt5QkFDSixJQUFJOzRCQUNBLElB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O2lDQUNMLE1BQU07O3FDQS9FWDs7U0FxRWEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuZXhwb3J0IGNvbnN0IE1ZX0ZPUk1BVFMgPSB7XG4gICAgcGFyc2U6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgICAgIG1vbnRoWWVhckxhYmVsOiAnTU1NIFlZWVknLFxuICAgICAgICBkYXRlQTExeUxhYmVsOiAnTEwnLFxuICAgICAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxuICAgIH0sXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1kYXRlLXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmb3JtXCI+XG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWREYXRlXCIgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgdG91Y2hVaT1cInRydWVcIiBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwicGlja2VyLm9wZW4oKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwic2V0Q3VycmVudERhdGUoKVwiPlxuICAgICAgICAgICAgU2V0IEN1cnJlbnQgRGF0ZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFdlZWtQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93V2Vla3NcIj5cbiAgICAgIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFdlZWtzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwid2Vla3NcIiBbKG5nTW9kZWwpXT1cIm1vZGVsVmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJ3ZWVrU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XG4gICAgICAgICAge3tjb3VudH19IFdlZWtzXG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1RpbWVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRpbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF0cC10aW1lLXBpY2tlciBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVGltZVwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICBpZD1cIm5neC1hdHAtdGltZS1waWNrZXJcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJzZXRDdXJyZW50VGltZSgpXCI+XG4gICAgICAgICAgICBTZXQgQ3VycmVudCBUaW1lXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCwgMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dUaW1lID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHZhbCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZEluaXRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9ybVZhbHVlcyh2YWwpIHtcblxuICAgICAgICB0aGlzLmxvYWRJbml0aWFsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQodmFsKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS0yIGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOCBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS00IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KCRldmVudCk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcblxuICAgIH1cbiAgICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGxldCBkYXRlVG9Vc2U7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZSA9PT0gbnVsbCAmJiB0aGlzLnNlbGVjdGVkRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRlVG9Vc2UgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQoZGF0ZVRvVXNlKS5hZGQoJGV2ZW50LCAnd2Vla3MnKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWtUaW1lID0gZGF0ZVRvVXNlO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudERhdGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBtb21lbnQoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoY3VycmVudERheSwgY3VycmVudFRpbWUpO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICBjb25zdCBuZXdUaW1lID0gc2V0VGltZTtcbiAgICAgICAgY29uc3QgbmV3RGF0ZVRpbWUgPSBtb21lbnQobmV3RGF0ZSArICcnICsgbmV3VGltZSwgJ0RELU1NLVlZWVkgSEg6bW0nKTtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWVTdHJpbmcgPSBtb21lbnQobmV3RGF0ZVRpbWUpLmZvcm1hdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG5ld1RpbWU7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XG5cblxuICAgIH1cbn1cbiJdfQ==