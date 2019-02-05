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
const moment = moment_;
/** @type {?} */
export const MY_FORMATS = {
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
export class NgxDateTimePickerComponent {
    constructor() {
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
        () => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
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
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onTimeSelect($event) {
        /** @type {?} */
        const setDate = moment(this.selectedDate);
        /** @type {?} */
        const setTime = $event;
        this.setDateTime(setDate, setTime);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onDateSelect($event) {
        /** @type {?} */
        const setDate = moment($event.value);
        /** @type {?} */
        const setTime = this.selectedTime;
        /** @type {?} */
        const dateString = this.setDateTime(setDate, setTime);
        /** @type {?} */
        const selectedDate = $event.value;
        this.value = dateString;
    }
    /**
     * @param {?} status
     * @return {?}
     */
    toggleTimePicker(status) {
        this.showTimePicker = status;
        return;
    }
    /**
     * @return {?}
     */
    setCurrentTime() {
        /** @type {?} */
        const setDate = moment(this.selectedDate);
        /** @type {?} */
        const currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    weekSelect($event) {
        /** @type {?} */
        const dateToUse = moment().format();
        /** @type {?} */
        const nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        /** @type {?} */
        const nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    selectionChange($event) {
        console.log('Week selected', $event);
    }
    /**
     * @return {?}
     */
    getWeekPickerCssClass() {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    }
    /**
     * @return {?}
     */
    getDatePickerCssClass() {
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
    }
    /**
     * @return {?}
     */
    getTimePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    }
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    setDateTime(setDate, setTime) {
        /** @type {?} */
        const newDate = moment(setDate).format('DD-MM-YYYY');
        /** @type {?} */
        let newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        /** @type {?} */
        const newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        /** @type {?} */
        const dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    }
}
NgxDateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-date-time-picker',
                template: `<div>
  <div class="row">
    <div [class]="getDatePickerCssClass()">
      <div class="input-group">
        <input matInput 
              [matDatepicker]="picker" 
              class="form-control" 
              [value]="value" 
              placeholder="Choose a date" 
              (dateChange)="onDateSelect($event)"
              (click)="picker.open()"
              readonly
        >
        <mat-datepicker #picker disabled="false"></mat-datepicker>
        <mat-datepicker-toggle matSuffix [for]="picker" class="input-group-btn"></mat-datepicker-toggle>
      </div>
    </div>
    <div [class]="getWeekPickerCssClass()" *ngIf="showWeeks">
      <mat-select placeholder="Select Weeks"  class="form-control" name="weeks" (selectionChange) ="weekSelect($event)">
        <mat-option *ngFor="let count of weeks" [value]="count">
          {{count}} Weeks
        </mat-option>
      </mat-select>
    </div>
    <div [class]="getTimePickerCssClass()" *ngIf="showTime">
          <input type="text" class="form-control" [value]="value | date: 'shortTime'" (focus)="toggleTimePicker(true)" readonly placeholder="Select Time"
          />
          <time-picker *ngIf="showTimePicker" [initTime]="value" [use12Hour]="true" (onSelectTime)="onTimeSelect($event)" (onTimePickerCancel)="toggleTimePicker($event)"></time-picker>
    </div>
  </div>
</div>

`,
                styles: [`#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}`],
                providers: [
                    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                    { provide: DateAdapter, useClass: MomentDateAdapter },
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgxDateTimePickerComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BQzVCLE1BQU0sR0FBRyxPQUFPOztBQUV0QixNQUFNLE9BQU8sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0o7QUFnREQsTUFBTTtJQTlDTjtRQWdESSwyQ0FBMkM7UUFDcEMsaUJBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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QUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUcxQixDQUFDOzs7WUEzS0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQ2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsaUtBQWlLLENBQUM7Z0JBQzNLLFNBQVMsRUFBRTtvQkFDUCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO29CQUNuRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO29CQUNyRDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixFQUFDO3dCQUN6RCxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjthQUNKOzs7b0JBU0ksS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxNQUFNOzs7O0lBVFAsa0RBQXdDOztJQUN4QyxrREFBd0M7O0lBQ3hDLGlEQUEyQjs7SUFDM0IsMkNBQWE7O0lBQ2Isb0RBQThCOztJQUM5QiwyQ0FBdUQ7O0lBQ3ZELGdEQUF5Qjs7SUFDekIsOENBQTBCOztJQUMxQiwrQ0FBMEI7O0lBQzFCLGtEQUFpRDs7SUFDakQsOENBQWlDOztJQUNqQywrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICAgIHBhcnNlOiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgICAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJyxcbiAgICB9LFxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgXG4gICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIFxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxuICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgXG4gICAgICAgICAgICAgIChkYXRlQ2hhbmdlKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInBpY2tlci5vcGVuKClcIlxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICA+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIGRpc2FibGVkPVwiZmFsc2VcIj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XG4gICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIlNlbGVjdCBXZWVrc1wiICBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJ3ZWVrc1wiIChzZWxlY3Rpb25DaGFuZ2UpID1cIndlZWtTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIiBbdmFsdWVdPVwiY291bnRcIj5cbiAgICAgICAgICB7e2NvdW50fX0gV2Vla3NcbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFRpbWVQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93VGltZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ3Nob3J0VGltZSdcIiAoZm9jdXMpPVwidG9nZ2xlVGltZVBpY2tlcih0cnVlKVwiIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFRpbWVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRpbWUtcGlja2VyICpuZ0lmPVwic2hvd1RpbWVQaWNrZXJcIiBbaW5pdFRpbWVdPVwidmFsdWVcIiBbdXNlMTJIb3VyXT1cInRydWVcIiAob25TZWxlY3RUaW1lKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCIgKG9uVGltZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVUaW1lUGlja2VyKCRldmVudClcIj48L3RpbWUtcGlja2VyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICAgIHN0eWxlczogW2AjdGltZS1zZWN0aW9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNuZ3gtYXRwLXRpbWUtcGlja2VyLCNuZ3gtbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJX0udXB7Ym90dG9tOjEwMCUhaW1wb3J0YW50O3RvcDphdXRvIWltcG9ydGFudH0udGltZS1idG57bWFyZ2luLXRvcDotMjBweH1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTVlfRk9STUFUUyB9LFxuICAgICAgICB7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLy8gcHVibGljIGRhdGUgPSBuZXcgRm9ybUNvbnRyb2wobW9tZW50KCkpO1xuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgcHVibGljIGxvYWRJbml0aWFsID0gZmFsc2U7XG4gICAgcHVibGljIHZhbHVlO1xuICAgIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFswLCAyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSB0cnVlO1xuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uVGltZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSAkZXZlbnQ7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcblxuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KCRldmVudC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVN0cmluZztcblxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG5cbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0ZVRvVXNlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgIGNvbnN0IG5leHRXZWVrRGF0ZSA9IG1vbWVudChkYXRlVG9Vc2UpLmFkZCgkZXZlbnQudmFsdWUsICd3ZWVrcycpO1xuICAgICAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSBkYXRlVG9Vc2U7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUobmV4dFdlZWtEYXRlLCBuZXh0V2Vla1RpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2UoJGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWVrIHNlbGVjdGVkJywgJGV2ZW50KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS0yIGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOCBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS00IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb21lbnQoc2V0RGF0ZSkuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgICAgIGxldCBuZXdUaW1lO1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgbmV3VGltZSA9IG1vbWVudChzZXRUaW1lKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gJzAwOjAwOjAwJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEYXRlVGltZSA9IG1vbWVudChuZXdEYXRlICsgJycgKyBuZXdUaW1lLCAnREQtTU0tWVlZWSBISDptbTpzcycpO1xuICAgICAgICBjb25zdCBkYXRlVGltZVN0cmluZyA9IG1vbWVudChuZXdEYXRlVGltZSkuZm9ybWF0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgICAgICByZXR1cm4gZGF0ZVRpbWVTdHJpbmc7XG5cblxuICAgIH1cbn1cbiJdfQ==