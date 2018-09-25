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
        var /** @type {?} */ nextWeekDate = moment(this.selectedDate).add($event, 'weeks');
        var /** @type {?} */ nextWeekTime = this.selectedTime;
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
                    template: "<div class=\"row\">\n  <div class=\"col-sm-8 col-md-8 col-lg-8 col-xs-12\">\n    <div class=\"row\">\n        <div class=\"col-sm-9 col-md-9 col-lg-9 col-xs-12\">\n            <div class=\"input-group\">\n                   \n                    <input matInput [matDatepicker]=\"picker\" class=\"form-control\" [(ngModel)]=\"selectedDate\" placeholder=\"Choose a date\" \n                    (ngModelChange)=\"onDateSelect($event)\">\n                    <mat-datepicker #picker touchUi=\"true\" disabled=\"false\"></mat-datepicker>\n                    <div class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" (click)=\"picker.open()\">\n                            <i class=\"glyphicon glyphicon-calendar\"></i>\n                          </button>\n                        <button class=\"btn btn-default\" (click)=\"setCurrentDate()\">\n                          Set Current Date\n                        </button>\n                    </div>\n            </div>\n          </div>\n          <div class=\"col-sm-3 col-md-3 col-lg-3 col-xs-12\" *ngIf=\"showWeeks\">\n          \n              <div class=\"form-group\">\n                  <mat-select placeholder=\"Select Weeks\" class=\"form-control\" name=\"weeks\" (ngModelChange)=\"weekSelect($event)\">\n                    <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n                      {{count}} Weeks\n                    </mat-option>\n                  </mat-select>\n              </div>\n          </div>\n    </div>\n    \n  </div>\n  <div class=\"col-sm-4 col-md-4 col-lg-4 col-xs-12\" id=\"time-section\">\n   \n        <div class=\"input-group\">\n            <input type=\"time\" class=\"form-control\" atp-time-picker [(ngModel)] = \"selectedTime\" (ngModelChange)=\"onTimeSelect($event)\" id=\"ngx-atp-time-picker\"/>\n            <div class=\"input-group-btn\">\n              <button mat-raised-button class=\"btn btn-default\" (click)=\"setCurrentTime()\">\n                  Set Current Time\n              </button>\n            </div>\n         </div>\n    \n      \n  </div>\n\n</div>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRyxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLHFCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFDLHFCQUFNLFVBQVUsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO1FBQ2YsY0FBYyxFQUFFLFVBQVU7UUFDMUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsa0JBQWtCLEVBQUUsV0FBVztLQUNoQztDQUNGLENBQUM7Ozs0QkFpRXNCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRTsyQkFDbEIsS0FBSztxQkFDQyxDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7d0JBRXBDLEtBQUs7eUJBQ0osSUFBSTs0QkFDQSxJ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T0ksS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FDTCxNQUFNOztxQ0ExRlg7O1NBZ0ZhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciAsIE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1ZX0ZPUk1BVFMgPSB7XHJcbiAgICBwYXJzZToge1xyXG4gICAgICBkYXRlSW5wdXQ6ICdMTCcsXHJcbiAgICB9LFxyXG4gICAgZGlzcGxheToge1xyXG4gICAgICBkYXRlSW5wdXQ6ICdMTCcsXHJcbiAgICAgIG1vbnRoWWVhckxhYmVsOiAnTU1NIFlZWVknLFxyXG4gICAgICBkYXRlQTExeUxhYmVsOiAnTEwnLFxyXG4gICAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1kYXRlLXRpbWUtcGlja2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tOCBjb2wtbWQtOCBjb2wtbGctOCBjb2wteHMtMTJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTkgY29sLW1kLTkgY29sLWxnLTkgY29sLXhzLTEyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZERhdGVcIiBwbGFjZWhvbGRlcj1cIkNob29zZSBhIGRhdGVcIiBcclxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIHRvdWNoVWk9XCJ0cnVlXCIgZGlzYWJsZWQ9XCJmYWxzZVwiPjwvbWF0LWRhdGVwaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInBpY2tlci5vcGVuKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJzZXRDdXJyZW50RGF0ZSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0IEN1cnJlbnQgRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wtbWQtMyBjb2wtbGctMyBjb2wteHMtMTJcIiAqbmdJZj1cInNob3dXZWVrc1wiPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgcGxhY2Vob2xkZXI9XCJTZWxlY3QgV2Vla3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJ3ZWVrc1wiIChuZ01vZGVsQ2hhbmdlKT1cIndlZWtTZWxlY3QoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiIFt2YWx1ZV09XCJjb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3tjb3VudH19IFdlZWtzXHJcbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImNvbC1zbS00IGNvbC1tZC00IGNvbC1sZy00IGNvbC14cy0xMlwiIGlkPVwidGltZS1zZWN0aW9uXCI+XHJcbiAgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRpbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF0cC10aW1lLXBpY2tlciBbKG5nTW9kZWwpXSA9IFwic2VsZWN0ZWRUaW1lXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25UaW1lU2VsZWN0KCRldmVudClcIiBpZD1cIm5neC1hdHAtdGltZS1waWNrZXJcIi8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInNldEN1cnJlbnRUaW1lKClcIj5cclxuICAgICAgICAgICAgICAgICAgU2V0IEN1cnJlbnQgVGltZVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICBcclxuICAgICAgXHJcbiAgPC9kaXY+XHJcblxyXG48L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYCN0aW1lLXNlY3Rpb257ZGlzcGxheTppbmxpbmUtYmxvY2t9I25neC1hdHAtdGltZS1waWNrZXIsI25neC1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS50aW1lLWJ0bnttYXJnaW4tdG9wOi0yMHB4fWBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTVlfRk9STUFUUyB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlciB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XHJcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFswICwgMiAsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xyXG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xyXG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IHRydWU7XHJcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcclxuICAgIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQodmFsKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRJbml0aWFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGb3JtVmFsdWVzKHZhbCkge1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRJbml0aWFsID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQodmFsKS5mb3JtYXQoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgnSEg6bW0nKTtcclxuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbW9tZW50KHZhbCkuZm9ybWF0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50KTtcclxuICAgICAgICBjb25zdCBzZXRUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSAkZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XHJcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XHJcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFdlZWtEYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKS5hZGQoJGV2ZW50ICwgJ3dlZWtzJyk7XHJcbiAgICAgICAgY29uc3QgbmV4dFdlZWtUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShuZXh0V2Vla0RhdGUsIG5leHRXZWVrVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1cnJlbnREYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBtb21lbnQoKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKGN1cnJlbnREYXksIGN1cnJlbnRUaW1lKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKSB7XHJcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudChzZXREYXRlKS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuICAgICAgICBjb25zdCBuZXdUaW1lID0gc2V0VGltZTtcclxuICAgICAgICBjb25zdCBuZXdEYXRlVGltZSA9IG1vbWVudChuZXdEYXRlICsgJycgKyBuZXdUaW1lICwgJ0RELU1NLVlZWVkgSEg6bW0nKTtcclxuICAgICAgICBjb25zdCBkYXRlVGltZVN0cmluZyA9IG1vbWVudChuZXdEYXRlVGltZSkuZm9ybWF0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG5ld1RpbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIl19