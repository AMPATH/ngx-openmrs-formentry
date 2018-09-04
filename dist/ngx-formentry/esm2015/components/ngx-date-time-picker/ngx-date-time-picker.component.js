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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRyxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLHVCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFDLHVCQUFNLFVBQVUsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDTCxTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO1FBQ2YsY0FBYyxFQUFFLFVBQVU7UUFDMUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsa0JBQWtCLEVBQUUsV0FBVztLQUNoQztDQUNGLENBQUM7QUE4REosTUFBTTs7NEJBR29CLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRTsyQkFDbEIsS0FBSztxQkFDQyxDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7d0JBRXBDLEtBQUs7eUJBQ0osSUFB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RUFBRSxJQUFJO3FCQUNkO2lCQUNKO2FBQ0o7Ozs7c0JBT0ksS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyICwgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICAgIHBhcnNlOiB7XG4gICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXG4gICAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxuICAgIH0sXG4gIH07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggY29sLW1kLTggY29sLWxnLTggY29sLXhzLTEyXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTkgY29sLW1kLTkgY29sLWxnLTkgY29sLXhzLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZERhdGVcIiBwbGFjZWhvbGRlcj1cIkNob29zZSBhIGRhdGVcIiBcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgdG91Y2hVaT1cInRydWVcIiBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJwaWNrZXIub3BlbigpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwic2V0Q3VycmVudERhdGUoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBTZXQgQ3VycmVudCBEYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTMgY29sLW1kLTMgY29sLWxnLTMgY29sLXhzLTEyXCIgKm5nSWY9XCJzaG93V2Vla3NcIj5cbiAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFdlZWtzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwid2Vla3NcIiAobmdNb2RlbENoYW5nZSk9XCJ3ZWVrU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAge3tjb3VudH19IFdlZWtzXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgXG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgY29sLW1kLTQgY29sLWxnLTQgY29sLXhzLTEyXCIgaWQ9XCJ0aW1lLXNlY3Rpb25cIj5cbiAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGltZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYXRwLXRpbWUtcGlja2VyIFsobmdNb2RlbCldID0gXCJzZWxlY3RlZFRpbWVcIiAobmdNb2RlbENoYW5nZSk9XCJvblRpbWVTZWxlY3QoJGV2ZW50KVwiIGlkPVwibmd4LWF0cC10aW1lLXBpY2tlclwiLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJzZXRDdXJyZW50VGltZSgpXCI+XG4gICAgICAgICAgICAgICAgICBTZXQgQ3VycmVudCBUaW1lXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICBcbiAgICAgIFxuICA8L2Rpdj5cblxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCAsIDIgLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSB0cnVlO1xuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQodmFsKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWwpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2FkSW5pdGlhbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRGb3JtVmFsdWVzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRGb3JtVmFsdWVzKHZhbCkge1xuXG4gICAgICAgIHRoaXMubG9hZEluaXRpYWwgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbW9tZW50KHZhbCkuZm9ybWF0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gbW9tZW50KHZhbCkuZm9ybWF0KCdISDptbScpO1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG1vbWVudCh2YWwpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50KTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuXG4gICAgfVxuICAgIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICBjb25zdCBzZXRUaW1lID0gJGV2ZW50O1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDdXJyZW50VGltZSgpIHtcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmV4dFdlZWtEYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKS5hZGQoJGV2ZW50ICwgJ3dlZWtzJyk7XG4gICAgICAgIGNvbnN0IG5leHRXZWVrVGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudERhdGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBtb21lbnQoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoY3VycmVudERheSwgY3VycmVudFRpbWUpO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICBjb25zdCBuZXdUaW1lID0gc2V0VGltZTtcbiAgICAgICAgY29uc3QgbmV3RGF0ZVRpbWUgPSBtb21lbnQobmV3RGF0ZSArICcnICsgbmV3VGltZSAsICdERC1NTS1ZWVlZIEhIOm1tJyk7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBuZXdUaW1lO1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuXG5cbiAgICB9XG59XG4iXX0=