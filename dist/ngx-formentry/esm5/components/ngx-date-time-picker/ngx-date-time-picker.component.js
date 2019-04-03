/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
/** @type {?} */
export var MY_FORMATS = {
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
        // public date = new FormControl(moment());
        this.selectedTime = moment().format();
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.showTimePicker = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.writeValue = /**
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
        /** @type {?} */
        var setDate = moment(this.selectedDate);
        /** @type {?} */
        var setTime = $event;
        this.setDateTime(setDate, setTime);
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
        /** @type {?} */
        var setDate = moment($event.value);
        /** @type {?} */
        var setTime = this.selectedTime;
        /** @type {?} */
        var dateString = this.setDateTime(setDate, setTime);
        /** @type {?} */
        var selectedDate = $event.value;
        this.value = dateString;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.toggleTimePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showTimePicker = status;
        return;
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var setDate = moment(this.selectedDate);
        /** @type {?} */
        var currentTime = moment().format('HH:mm:ss');
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
        /** @type {?} */
        var dateToUse = moment().format();
        /** @type {?} */
        var nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        /** @type {?} */
        var nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.selectionChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        console.log('Week selected', $event);
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
        /** @type {?} */
        var newDate = moment(setDate).format('DD-MM-YYYY');
        /** @type {?} */
        var newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        /** @type {?} */
        var newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        /** @type {?} */
        var dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput \n              [matDatepicker]=\"picker\" \n              class=\"form-control\" \n              [value]=\"value\" \n              placeholder=\"Choose a date\" \n              (dateChange)=\"onDateSelect($event)\"\n              (click)=\"picker.open()\"\n              readonly\n        >\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"input-group-btn\"></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\"  class=\"form-control\" name=\"weeks\" (selectionChange) =\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n          <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n          />\n          <time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"onTimeSelect($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n    </div>\n  </div>\n</div>\n\n",
                    styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                        { provide: DateAdapter, useClass: MomentDateAdapter },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NgxDateTimePickerComponent; })),
                            multi: true
                        }
                    ]
                },] },
    ];
    NgxDateTimePickerComponent.propDecorators = {
        weeks: [{ type: Input }],
        modelValue: [{ type: Input }],
        showTime: [{ type: Input }],
        showWeeks: [{ type: Input }],
        onDateChange: [{ type: Output }]
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
if (false) {
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedDate;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.loadInitial;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.value;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTimePicker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBQzVCLE1BQU0sR0FBRyxPQUFPOztBQUV0QixNQUFNLEtBQU8sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0o7QUFFRDtJQUFBO1FBZ0RJLDJDQUEyQztRQUNwQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDckIsVUFBSyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFF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QUU7UUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUcxQixDQUFDOztnQkEzS0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxvN0NBZ0NiO29CQUNHLE1BQU0sRUFBRSxDQUFDLGlLQUFpSyxDQUFDO29CQUMzSyxTQUFTLEVBQUU7d0JBQ1AsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTt3QkFDbkQsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTt3QkFDckQ7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsMEJBQTBCLEVBQTFCLENBQTBCLEVBQUM7NEJBQ3pELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO2lCQUNKOzs7d0JBU0ksS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzsrQkFDTCxNQUFNOztJQWtIWCxpQ0FBQztDQUFBLEFBNUtELElBNEtDO1NBOUhZLDBCQUEwQjs7O0lBR25DLGtEQUF3Qzs7SUFDeEMsa0RBQXdDOztJQUN4QyxpREFBMkI7O0lBQzNCLDJDQUFhOztJQUNiLG9EQUE4Qjs7SUFDOUIsMkNBQXVEOztJQUN2RCxnREFBeUI7O0lBQ3pCLDhDQUEwQjs7SUFDMUIsK0NBQTBCOztJQUMxQixrREFBaUQ7O0lBQ2pELDhDQUFpQzs7SUFDakMsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5leHBvcnQgY29uc3QgTVlfRk9STUFUUyA9IHtcclxuICAgIHBhcnNlOiB7XHJcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxyXG4gICAgfSxcclxuICAgIGRpc3BsYXk6IHtcclxuICAgICAgICBkYXRlSW5wdXQ6ICdMTCcsXHJcbiAgICAgICAgbW9udGhZZWFyTGFiZWw6ICdNTU0gWVlZWScsXHJcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcclxuICAgICAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxyXG4gICAgfSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgPGlucHV0IG1hdElucHV0IFxyXG4gICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIFxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCIgXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgXHJcbiAgICAgICAgICAgICAgKGRhdGVDaGFuZ2UpPVwib25EYXRlU2VsZWN0KCRldmVudClcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJwaWNrZXIub3BlbigpXCJcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgID5cclxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlciBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cclxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IFtjbGFzc109XCJnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XHJcbiAgICAgIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFdlZWtzXCIgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIndlZWtzXCIgKHNlbGVjdGlvbkNoYW5nZSkgPVwid2Vla1NlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XHJcbiAgICAgICAgICB7e2NvdW50fX0gV2Vla3NcclxuICAgICAgICA8L21hdC1vcHRpb24+XHJcbiAgICAgIDwvbWF0LXNlbGVjdD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0VGltZVBpY2tlckNzc0NsYXNzKClcIiAqbmdJZj1cInNob3dUaW1lXCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdzaG9ydFRpbWUnXCIgKGZvY3VzKT1cInRvZ2dsZVRpbWVQaWNrZXIodHJ1ZSlcIiByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBUaW1lXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8dGltZS1waWNrZXIgKm5nSWY9XCJzaG93VGltZVBpY2tlclwiIFtpbml0VGltZV09XCJ2YWx1ZVwiIFt1c2UxMkhvdXJdPVwidHJ1ZVwiIChvblNlbGVjdFRpbWUpPVwib25UaW1lU2VsZWN0KCRldmVudClcIiAob25UaW1lUGlja2VyQ2FuY2VsKT1cInRvZ2dsZVRpbWVQaWNrZXIoJGV2ZW50KVwiPjwvdGltZS1waWNrZXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5gLFxyXG4gICAgc3R5bGVzOiBbYCN0aW1lLXNlY3Rpb257ZGlzcGxheTppbmxpbmUtYmxvY2t9I25neC1hdHAtdGltZS1waWNrZXIsI25neC1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS50aW1lLWJ0bnttYXJnaW4tdG9wOi0yMHB4fWBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTVlfRk9STUFUUyB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlciB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgIHB1YmxpYyBsb2FkSW5pdGlhbCA9IGZhbHNlO1xyXG4gICAgcHVibGljIHZhbHVlO1xyXG4gICAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCwgMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XHJcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcclxuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gICAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50LnZhbHVlKTtcclxuICAgICAgICBjb25zdCBzZXRUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XHJcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9ICRldmVudC52YWx1ZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVN0cmluZztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VGltZSgpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XHJcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZVRvVXNlID0gbW9tZW50KCkuZm9ybWF0KCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFdlZWtEYXRlID0gbW9tZW50KGRhdGVUb1VzZSkuYWRkKCRldmVudC52YWx1ZSwgJ3dlZWtzJyk7XHJcbiAgICAgICAgY29uc3QgbmV4dFdlZWtUaW1lID0gZGF0ZVRvVXNlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUobmV4dFdlZWtEYXRlLCBuZXh0V2Vla1RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlZWsgc2VsZWN0ZWQnLCAkZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2Vla1BpY2tlckNzc0NsYXNzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTIgZm9ybS1ncm91cCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcclxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS04IGZvcm0tZ3JvdXAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICdjb2wtc20tNCBmb3JtLWdyb3VwJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb21lbnQoc2V0RGF0ZSkuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XHJcbiAgICAgICAgbGV0IG5ld1RpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcclxuICAgICAgICAgICAgbmV3VGltZSA9IG1vbWVudChzZXRUaW1lKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3VGltZSA9ICcwMDowMDowMCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUsICdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XHJcbiAgICAgICAgY29uc3QgZGF0ZVRpbWVTdHJpbmcgPSBtb21lbnQobmV3RGF0ZVRpbWUpLmZvcm1hdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVRpbWVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBkYXRlVGltZVN0cmluZztcclxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGVUaW1lU3RyaW5nO1xyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIl19