/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.onChange = () => { };
        this.onTouched = () => { };
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
        let dateToUse;
        if (this.value === '' || typeof this.value === 'undefined') {
            dateToUse = moment().format();
        }
        else {
            dateToUse = moment(this.value).format();
        }
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
                        useExisting: forwardRef(() => NgxDateTimePickerComponent),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BQzVCLE1BQU0sR0FBRyxPQUFPOztBQUV0QixNQUFNLE9BQU8sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0o7QUFnREQsTUFBTTtJQTlDTjtRQWdESSwyQ0FBMkM7UUFDcEMsaUJBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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QWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1tb21lbnQtYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5leHBvcnQgY29uc3QgTVlfRk9STUFUUyA9IHtcbiAgICBwYXJzZToge1xuICAgICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyTGFiZWw6ICdNTU0gWVlZWScsXG4gICAgICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXG4gICAgICAgIG1vbnRoWWVhckExMXlMYWJlbDogJ01NTU0gWVlZWScsXG4gICAgfSxcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgW2NsYXNzXT1cImdldERhdGVQaWNrZXJDc3NDbGFzcygpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IFxuICAgICAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIiBcbiAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCIgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIGEgZGF0ZVwiIFxuICAgICAgICAgICAgICAoZGF0ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwaWNrZXIub3BlbigpXCJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlciBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0V2Vla1BpY2tlckNzc0NsYXNzKClcIiAqbmdJZj1cInNob3dXZWVrc1wiPlxuICAgICAgPG1hdC1zZWxlY3QgcGxhY2Vob2xkZXI9XCJTZWxlY3QgV2Vla3NcIiAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwid2Vla3NcIiAoc2VsZWN0aW9uQ2hhbmdlKSA9XCJ3ZWVrU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XG4gICAgICAgICAge3tjb3VudH19IFdlZWtzXG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1RpbWVcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdzaG9ydFRpbWUnXCIgKGZvY3VzKT1cInRvZ2dsZVRpbWVQaWNrZXIodHJ1ZSlcIiByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBUaW1lXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDx0aW1lLXBpY2tlciAqbmdJZj1cInNob3dUaW1lUGlja2VyXCIgW2luaXRUaW1lXT1cInZhbHVlXCIgW3VzZTEySG91cl09XCJ0cnVlXCIgKG9uU2VsZWN0VGltZSk9XCJvblRpbWVTZWxlY3QoJGV2ZW50KVwiIChvblRpbWVQaWNrZXJDYW5jZWwpPVwidG9nZ2xlVGltZVBpY2tlcigkZXZlbnQpXCI+PC90aW1lLXBpY2tlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuYCxcbiAgICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgIHB1YmxpYyBsb2FkSW5pdGlhbCA9IGZhbHNlO1xuICAgIHB1YmxpYyB2YWx1ZTtcbiAgICBwdWJsaWMgc2hvd1RpbWVQaWNrZXIgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCwgMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dUaW1lID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICBjb25zdCBzZXRUaW1lID0gJGV2ZW50O1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XG5cbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCgkZXZlbnQudmFsdWUpO1xuICAgICAgICBjb25zdCBzZXRUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9ICRldmVudC52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVTdHJpbmc7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlVGltZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNldEN1cnJlbnRUaW1lKCkge1xuXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGxldCBkYXRlVG9Vc2U7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnJyB8fCB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGRhdGVUb1VzZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0ZVRvVXNlID0gbW9tZW50KHRoaXMudmFsdWUpLmZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRXZWVrRGF0ZSA9IG1vbWVudChkYXRlVG9Vc2UpLmFkZCgkZXZlbnQudmFsdWUsICd3ZWVrcycpO1xuICAgICAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSBkYXRlVG9Vc2U7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUobmV4dFdlZWtEYXRlLCBuZXh0V2Vla1RpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2UoJGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWVrIHNlbGVjdGVkJywgJGV2ZW50KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS0yIGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOCBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS00IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb21lbnQoc2V0RGF0ZSkuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgICAgIGxldCBuZXdUaW1lO1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgbmV3VGltZSA9IG1vbWVudChzZXRUaW1lKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gJzAwOjAwOjAwJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEYXRlVGltZSA9IG1vbWVudChuZXdEYXRlICsgJycgKyBuZXdUaW1lLCAnREQtTU0tWVlZWSBISDptbTpzcycpO1xuICAgICAgICBjb25zdCBkYXRlVGltZVN0cmluZyA9IG1vbWVudChuZXdEYXRlVGltZSkuZm9ybWF0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgICAgICByZXR1cm4gZGF0ZVRpbWVTdHJpbmc7XG5cblxuICAgIH1cbn1cbiJdfQ==