/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
/** @type {?} */
const Moment = moment_;
export class DateTimePickerComponent {
    constructor() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
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
    ngOnInit() { }
    /**
     * @param {?} count
     * @return {?}
     */
    weeksSelected(count) {
        /** @type {?} */
        const now = new Date();
        /** @type {?} */
        const nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setDate(date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    }
    /**
     * @param {?} time
     * @return {?}
     */
    setTime(time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    }
    /**
     * @param {?} status
     * @return {?}
     */
    toggleDatePicker(status) {
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
    get value() {
        return this.modelValue;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        this.modelValue = val;
        this.onDateChange.emit(val);
        this.onChange(val);
        this.onTouched();
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
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    }
}
DateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-time-picker',
                template: `<div class='row'>
    <div *ngIf="!showTime" class='col-xs-12 col-md-12'>
        <input *ngIf="!showWeeks" type="text" class="form-control" [value]="value | date: 'mediumDate'" (focus)="toggleDatePicker(true)"
            readonly placeholder="Select Date" />
        <div *ngIf="showWeeks" class="input-group">
            <input type="text" class="form-control" class="form-control" [value]="value | date: 'mediumDate'" (focus)="toggleDatePicker(true)"
                readonly placeholder="Select Date">
            <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Weeks <span class="caret"></span></button>
                <ul class="dropdown-menu up">
                    <li (click)="weeksSelected(count)" *ngFor="let count of weeks"><span> {{count}} Weeks</span></li>
                </ul>
            </div>
        </div>
    </div>
    <div *ngIf="showTime" class='col-xs-8 col-md-8'>
        <input *ngIf="!showWeeks" type="text" class="form-control" [value]="value | date: 'mediumDate'" (focus)="toggleDatePicker(true)"
            readonly placeholder="Select Date" />
        <div *ngIf="showWeeks" class="input-group">
            <input type="text" class="form-control" class="form-control" [value]="value | date: 'mediumDate'" (focus)="toggleDatePicker(true)"
                readonly placeholder="Select Date">
            <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Weeks <span class="caret"></span></button>
                <ul class="dropdown-menu up">
                    <li (click)="weeksSelected(count)" *ngFor="let count of weeks"><span> {{count}} Weeks</span></li>
                </ul>
            </div>
        </div>
    </div>
    <div *ngIf="showTime" class='col-xs-4 col-md-4'>
        <input type="text" class="form-control" [value]="value | date: 'shortTime'" (focus)="toggleTimePicker(true)" readonly placeholder="Select Time"
        />
    </div>
</div>
<date-picker *ngIf="showDatePicker" [initDate]="value" (onSelectDate)="setDate($event)" (onDatePickerCancel)="toggleDatePicker($event)"></date-picker>

<time-picker *ngIf="showTimePicker" [initTime]="value" [use12Hour]="true" (onSelectTime)="setTime($event)" (onTimePickerCancel)="toggleTimePicker($event)"></time-picker>
`,
                styles: [`input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}`],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DateTimePickerComponent)),
                        multi: true
                    }
                ]
            },] },
];
DateTimePickerComponent.ctorParameters = () => [];
DateTimePickerComponent.propDecorators = {
    modelValue: [{ type: Input }],
    showDate: [{ type: Input }],
    showTime: [{ type: Input }],
    showWeeks: [{ type: Input }],
    weeks: [{ type: Input }],
    onDateChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87QUFtRHRCLE1BQU07SUFZRjtRQVZTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFROzs7UUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7UUFDMUIsY0FBUzs7O1FBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDO0lBRzNCLENBQUM7Ozs7SUFFRCxRQUFRLEtBQUssQ0FBQzs7Ozs7SUFFZCxhQUFhLENBQUMsS0FBSzs7Y0FDVCxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUU7O2NBQ2hCLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFL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QUMxQiw0Q0FBMkI7O0lBQzNCLHdDQUFvRDs7SUFDcEQsK0NBQWlEOztJQUNqRCxpREFBOEI7O0lBQzlCLGlEQUE4Qjs7SUFDOUIsMkNBQTBCOztJQUMxQiw0Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgTW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXRlLXRpbWUtcGlja2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz0ncm93Jz5cclxuICAgIDxkaXYgKm5nSWY9XCIhc2hvd1RpbWVcIiBjbGFzcz0nY29sLXhzLTEyIGNvbC1tZC0xMic+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIXNob3dXZWVrc1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIiAvPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla3NcIiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXHJcbiAgICAgICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPldlZWtzIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IHVwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJ3ZWVrc1NlbGVjdGVkKGNvdW50KVwiICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiPjxzcGFuPiB7e2NvdW50fX0gV2Vla3M8L3NwYW4+PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1RpbWVcIiBjbGFzcz0nY29sLXhzLTggY29sLW1kLTgnPlxyXG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIiFzaG93V2Vla3NcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxyXG4gICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCIgLz5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtzXCIgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxyXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5XZWVrcyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAoY2xpY2spPVwid2Vla3NTZWxlY3RlZChjb3VudClcIiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIj48c3Bhbj4ge3tjb3VudH19IFdlZWtzPC9zcGFuPjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy00IGNvbC1tZC00Jz5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdzaG9ydFRpbWUnXCIgKGZvY3VzKT1cInRvZ2dsZVRpbWVQaWNrZXIodHJ1ZSlcIiByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBUaW1lXCJcclxuICAgICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGF0ZS1waWNrZXIgKm5nSWY9XCJzaG93RGF0ZVBpY2tlclwiIFtpbml0RGF0ZV09XCJ2YWx1ZVwiIChvblNlbGVjdERhdGUpPVwic2V0RGF0ZSgkZXZlbnQpXCIgKG9uRGF0ZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVEYXRlUGlja2VyKCRldmVudClcIj48L2RhdGUtcGlja2VyPlxyXG5cclxuPHRpbWUtcGlja2VyICpuZ0lmPVwic2hvd1RpbWVQaWNrZXJcIiBbaW5pdFRpbWVdPVwidmFsdWVcIiBbdXNlMTJIb3VyXT1cInRydWVcIiAob25TZWxlY3RUaW1lKT1cInNldFRpbWUoJGV2ZW50KVwiIChvblRpbWVQaWNrZXJDYW5jZWwpPVwidG9nZ2xlVGltZVBpY2tlcigkZXZlbnQpXCI+PC90aW1lLXBpY2tlcj5cclxuYCxcclxuICAgIHN0eWxlczogW2BpbnB1dFtyZWFkb25seV17YmFja2dyb3VuZC1jb2xvcjojZmZmfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS5nbHlwaGljb257dG9wOjFweH1gXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xyXG4gICAgQElucHV0KCkgc2hvd0RhdGUgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xyXG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgcHVibGljIHNob3dEYXRlUGlja2VyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc2hvd1RpbWVQaWNrZXIgPSBmYWxzZTtcclxuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XHJcbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICAgIHdlZWtzU2VsZWN0ZWQoY291bnQpIHtcclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG5leHREYXRlID0gbm93LnNldERhdGUobm93LmdldERhdGUoKSArIGNvdW50ICogNyk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudChuZXh0RGF0ZSkuZm9ybWF0KCk7XHJcbiAgICB9XHJcbiAgICBzZXREYXRlKGRhdGU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChkYXRlICYmIGRhdGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQoZGF0ZSkuZm9ybWF0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lKHRpbWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aW1lICYmIHRpbWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodGltZSkuZm9ybWF0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVEYXRlUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gc3RhdHVzO1xyXG4gICAgICAvKnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IF9ib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtd3JhcHBlcicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWN0aW9uLW1vZGFsLW1haW4nKTtcclxuICAgICAgICBpZiAoZWxlbSkge1xyXG4gICAgICAgICAgbGV0IGVsZW1Cb3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgaWYgKGVsZW1Cb3guYm90dG9tID4gX2JvZHkuYm90dG9tKSB7XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gJzM2cHgnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgMCk7Ki9cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQodmFsKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KHZhbHVlKS5mb3JtYXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==