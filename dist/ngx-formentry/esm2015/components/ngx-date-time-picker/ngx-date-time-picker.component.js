/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
export const /** @type {?} */ MY_FORMATS = {
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
        this.selectedTime = moment().format('HH:mm');
        this.selectedDate = moment().format();
        this.loadInitial = false;
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
     * @return {?}
     */
    get value() {
        return this.modelValue;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        setTimeout(() => {
            this.onDateChange.emit(val);
        }, 100);
        this.onChange(val);
        this.onTouched();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!this.loadInitial) {
            this.setFormValues(value);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setFormValues(val) {
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
     * @param {?} $event
     * @return {?}
     */
    onDateSelect($event) {
        const /** @type {?} */ setDate = moment($event);
        const /** @type {?} */ setTime = this.selectedTime;
        this.setDateTime(setDate, setTime);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onTimeSelect($event) {
        const /** @type {?} */ setDate = moment(this.selectedDate);
        const /** @type {?} */ setTime = $event;
        this.setDateTime(setDate, setTime);
    }
    /**
     * @return {?}
     */
    setCurrentTime() {
        const /** @type {?} */ setDate = moment(this.selectedDate);
        const /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(setDate, currentTime);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    weekSelect($event) {
        let /** @type {?} */ dateToUse;
        if (this.selectedDate === null && this.selectedDate === undefined) {
            dateToUse = moment().format();
        }
        const /** @type {?} */ nextWeekDate = moment(dateToUse).add($event, 'weeks');
        const /** @type {?} */ nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }
    /**
     * @return {?}
     */
    setCurrentDate() {
        const /** @type {?} */ currentDay = moment();
        const /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(currentDay, currentTime);
    }
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    setDateTime(setDate, setTime) {
        const /** @type {?} */ newDate = moment(setDate).format('DD-MM-YYYY');
        const /** @type {?} */ newTime = setTime;
        const /** @type {?} */ newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm');
        const /** @type {?} */ dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = newTime;
        this.modelValue = dateTimeString;
        this.value = dateTimeString;
    }
}
NgxDateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-date-time-picker',
                template: `<div class="form">
  <div class="row">
    <div [class]="getDatePickerCssClass()">
      <div class="input-group">
        <input matInput [matDatepicker]="picker" class="form-control" [(ngModel)]="selectedDate" placeholder="Choose a date" (ngModelChange)="onDateSelect($event)">
        <mat-datepicker #picker touchUi="true" disabled="false"></mat-datepicker>
        <div class="input-group-btn">
          <button class="btn btn-default" (click)="picker.open()">
            <i class="glyphicon glyphicon-calendar"></i>
          </button>
          <button class="btn btn-default" (click)="setCurrentDate()">
            Set Current Date
          </button>
        </div>
      </div>
    </div>
    <div [class]="getWeekPickerCssClass()" *ngIf="showWeeks">
      <mat-select placeholder="Select Weeks" class="form-control" name="weeks" [(ngModel)]="modelValue" (ngModelChange)="weekSelect($event)">
        <mat-option *ngFor="let count of weeks" [value]="count">
          {{count}} Weeks
        </mat-option>
      </mat-select>
    </div>
    <div [class]="getTimePickerCssClass()" *ngIf="showTime">
      <div class="input-group">
        <input type="time" class="form-control" atp-time-picker [(ngModel)]="selectedTime" (ngModelChange)="onTimeSelect($event)"
          id="ngx-atp-time-picker" />
        <div class="input-group-btn">
          <button mat-raised-button class="btn btn-default" (click)="setCurrentTime()">
            Set Current Time
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`,
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
/** @nocollapse */
NgxDateTimePickerComponent.propDecorators = {
    "weeks": [{ type: Input },],
    "modelValue": [{ type: Input },],
    "showTime": [{ type: Input },],
    "showWeeks": [{ type: Input },],
    "onDateChange": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMsdUJBQU0sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0osQ0FBQztBQW1ERixNQUFNOzs0QkFHb0IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFOzJCQUNsQixLQUFLO3FCQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFFbEMsS0FBSzt5QkFDSixJQUFJ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QUs7MEJBQ0wsS0FBSzs2QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuZXhwb3J0IGNvbnN0IE1ZX0ZPUk1BVFMgPSB7XG4gICAgcGFyc2U6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgICAgIG1vbnRoWWVhckxhYmVsOiAnTU1NIFlZWVknLFxuICAgICAgICBkYXRlQTExeUxhYmVsOiAnTEwnLFxuICAgICAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxuICAgIH0sXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1kYXRlLXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmb3JtXCI+XG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWREYXRlXCIgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgdG91Y2hVaT1cInRydWVcIiBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwicGlja2VyLm9wZW4oKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwic2V0Q3VycmVudERhdGUoKVwiPlxuICAgICAgICAgICAgU2V0IEN1cnJlbnQgRGF0ZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFdlZWtQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93V2Vla3NcIj5cbiAgICAgIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFdlZWtzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwid2Vla3NcIiBbKG5nTW9kZWwpXT1cIm1vZGVsVmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJ3ZWVrU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XG4gICAgICAgICAge3tjb3VudH19IFdlZWtzXG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1RpbWVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRpbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGF0cC10aW1lLXBpY2tlciBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVGltZVwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICBpZD1cIm5neC1hdHAtdGltZS1waWNrZXJcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJzZXRDdXJyZW50VGltZSgpXCI+XG4gICAgICAgICAgICBTZXQgQ3VycmVudCBUaW1lXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCwgMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dUaW1lID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHZhbCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMubG9hZEluaXRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9ybVZhbHVlcyh2YWwpIHtcblxuICAgICAgICB0aGlzLmxvYWRJbml0aWFsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQodmFsKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS0yIGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOCBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS00IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KCRldmVudCk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcblxuICAgIH1cbiAgICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGxldCBkYXRlVG9Vc2U7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZSA9PT0gbnVsbCAmJiB0aGlzLnNlbGVjdGVkRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRlVG9Vc2UgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQoZGF0ZVRvVXNlKS5hZGQoJGV2ZW50LCAnd2Vla3MnKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWtUaW1lID0gZGF0ZVRvVXNlO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudERhdGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBtb21lbnQoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoY3VycmVudERheSwgY3VycmVudFRpbWUpO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICBjb25zdCBuZXdUaW1lID0gc2V0VGltZTtcbiAgICAgICAgY29uc3QgbmV3RGF0ZVRpbWUgPSBtb21lbnQobmV3RGF0ZSArICcnICsgbmV3VGltZSwgJ0RELU1NLVlZWVkgSEg6bW0nKTtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWVTdHJpbmcgPSBtb21lbnQobmV3RGF0ZVRpbWUpLmZvcm1hdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IG5ld1RpbWU7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XG5cblxuICAgIH1cbn1cbiJdfQ==