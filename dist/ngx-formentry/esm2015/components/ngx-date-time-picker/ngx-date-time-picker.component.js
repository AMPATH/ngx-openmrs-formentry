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
        const /** @type {?} */ nextWeekDate = moment(this.selectedDate).add($event, 'weeks');
        const /** @type {?} */ nextWeekTime = this.selectedTime;
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
                template: `<div class="row">
  <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">
    <div class="row">
        <div class="col-sm-9 col-md-9 col-lg-9 col-xs-12">
            <div class="input-group">
                   
                    <input matInput [matDatepicker]="picker" class="form-control" [(ngModel)]="selectedDate" placeholder="Choose a date" 
                    (ngModelChange)="onDateSelect($event)">
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
          <div class="col-sm-3 col-md-3 col-lg-3 col-xs-12" *ngIf="showWeeks">
          
              <div class="form-group">
                  <mat-select placeholder="Select Weeks" class="form-control" name="weeks" (ngModelChange)="weekSelect($event)">
                    <mat-option *ngFor="let count of weeks" [value]="count">
                      {{count}} Weeks
                    </mat-option>
                  </mat-select>
              </div>
          </div>
    </div>
    
  </div>
  <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12" id="time-section">
   
        <div class="input-group">
            <input type="time" class="form-control" atp-time-picker [(ngModel)] = "selectedTime" (ngModelChange)="onTimeSelect($event)" id="ngx-atp-time-picker"/>
            <div class="input-group-btn">
              <button mat-raised-button class="btn btn-default" (click)="setCurrentTime()">
                  Set Current Time
              </button>
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRyxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLHVCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFDLHVCQUFNLFVBQVUsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO1FBQ2YsY0FBYyxFQUFFLFVBQVU7UUFDMUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsa0JBQWtCLEVBQUUsV0FBVztLQUNoQztDQUNGLENBQUM7QUE4REosTUFBTTs7NEJBR29CLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRTsyQkFDbEIsS0FBSztxQkFDQyxDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7d0JBRXBDLEtBQUs7eUJBQ0osSUFB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RUFBRSxJQUFJO3FCQUNkO2lCQUNKO2FBQ0o7Ozs7c0JBT0ksS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SICwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyICwgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5leHBvcnQgY29uc3QgTVlfRk9STUFUUyA9IHtcclxuICAgIHBhcnNlOiB7XHJcbiAgICAgIGRhdGVJbnB1dDogJ0xMJyxcclxuICAgIH0sXHJcbiAgICBkaXNwbGF5OiB7XHJcbiAgICAgIGRhdGVJbnB1dDogJ0xMJyxcclxuICAgICAgbW9udGhZZWFyTGFiZWw6ICdNTU0gWVlZWScsXHJcbiAgICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXHJcbiAgICAgIG1vbnRoWWVhckExMXlMYWJlbDogJ01NTU0gWVlZWScsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGUtdGltZS1waWNrZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgPGRpdiBjbGFzcz1cImNvbC1zbS04IGNvbC1tZC04IGNvbC1sZy04IGNvbC14cy0xMlwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOSBjb2wtbWQtOSBjb2wtbGctOSBjb2wteHMtMTJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRGF0ZVwiIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIGEgZGF0ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgdG91Y2hVaT1cInRydWVcIiBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwicGlja2VyLm9wZW4oKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInNldEN1cnJlbnREYXRlKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBTZXQgQ3VycmVudCBEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0zIGNvbC1tZC0zIGNvbC1sZy0zIGNvbC14cy0xMlwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIlNlbGVjdCBXZWVrc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIndlZWtzXCIgKG5nTW9kZWxDaGFuZ2UpPVwid2Vla1NlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7e2NvdW50fX0gV2Vla3NcclxuICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgY29sLW1kLTQgY29sLWxnLTQgY29sLXhzLTEyXCIgaWQ9XCJ0aW1lLXNlY3Rpb25cIj5cclxuICAgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGltZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXRwLXRpbWUtcGlja2VyIFsobmdNb2RlbCldID0gXCJzZWxlY3RlZFRpbWVcIiAobmdNb2RlbENoYW5nZSk9XCJvblRpbWVTZWxlY3QoJGV2ZW50KVwiIGlkPVwibmd4LWF0cC10aW1lLXBpY2tlclwiLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwic2V0Q3VycmVudFRpbWUoKVwiPlxyXG4gICAgICAgICAgICAgICAgICBTZXQgQ3VycmVudCBUaW1lXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgICBcclxuICA8L2Rpdj5cclxuXHJcbjwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNWV9GT1JNQVRTIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgLy8gcHVibGljIGRhdGUgPSBuZXcgRm9ybUNvbnRyb2wobW9tZW50KCkpO1xyXG4gICAgcHVibGljIHNlbGVjdGVkVGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgIHB1YmxpYyBsb2FkSW5pdGlhbCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzAgLCAyICwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XHJcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcclxuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gICAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh2YWwpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWwpO1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9hZEluaXRpYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRGb3JtVmFsdWVzKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEZvcm1WYWx1ZXModmFsKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZEluaXRpYWwgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gbW9tZW50KHZhbCkuZm9ybWF0KCdISDptbScpO1xyXG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtb21lbnQodmFsKS5mb3JtYXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCgkZXZlbnQpO1xyXG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VGltZSgpIHtcclxuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpLmFkZCgkZXZlbnQgLCAnd2Vla3MnKTtcclxuICAgICAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcclxuICAgICAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VycmVudERhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudERheSA9IG1vbWVudCgpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoY3VycmVudERheSwgY3VycmVudFRpbWUpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpIHtcclxuICAgICAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgIGNvbnN0IG5ld1RpbWUgPSBzZXRUaW1lO1xyXG4gICAgICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUgLCAnREQtTU0tWVlZWSBISDptbScpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVUaW1lU3RyaW5nO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gbmV3VGltZTtcclxuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSBkYXRlVGltZVN0cmluZztcclxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=