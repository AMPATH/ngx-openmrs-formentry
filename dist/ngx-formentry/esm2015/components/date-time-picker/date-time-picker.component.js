/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.onChange = () => { };
        this.onTouched = () => { };
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
                        useExisting: forwardRef(() => DateTimePickerComponent),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87QUFtRHRCLE1BQU07SUFZRjtRQVZTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFHM0IsQ0FBQzs7OztJQUVELFFBQVEsS0FBSyxDQUFDOzs7OztJQUVkLGFBQWEsQ0FBQyxLQUFLOztjQUNULEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRTs7Y0FDaEIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FB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QUEyQjs7SUFDM0Isd0NBQW9EOztJQUNwRCwrQ0FBaUQ7O0lBQ2pELGlEQUE4Qjs7SUFDOUIsaURBQThCOztJQUM5QiwyQ0FBMEI7O0lBQzFCLDRDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgTW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkYXRlLXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J3Jvdyc+XG4gICAgPGRpdiAqbmdJZj1cIiFzaG93VGltZVwiIGNsYXNzPSdjb2wteHMtMTIgY29sLW1kLTEyJz5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIXNob3dXZWVrc1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCIgLz5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrc1wiIGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPldlZWtzIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKGNsaWNrKT1cIndlZWtzU2VsZWN0ZWQoY291bnQpXCIgKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCI+PHNwYW4+IHt7Y291bnR9fSBXZWVrczwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy04IGNvbC1tZC04Jz5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIXNob3dXZWVrc1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCIgLz5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrc1wiIGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPldlZWtzIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKGNsaWNrKT1cIndlZWtzU2VsZWN0ZWQoY291bnQpXCIgKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCI+PHNwYW4+IHt7Y291bnR9fSBXZWVrczwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy00IGNvbC1tZC00Jz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnc2hvcnRUaW1lJ1wiIChmb2N1cyk9XCJ0b2dnbGVUaW1lUGlja2VyKHRydWUpXCIgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVGltZVwiXG4gICAgICAgIC8+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxkYXRlLXBpY2tlciAqbmdJZj1cInNob3dEYXRlUGlja2VyXCIgW2luaXREYXRlXT1cInZhbHVlXCIgKG9uU2VsZWN0RGF0ZSk9XCJzZXREYXRlKCRldmVudClcIiAob25EYXRlUGlja2VyQ2FuY2VsKT1cInRvZ2dsZURhdGVQaWNrZXIoJGV2ZW50KVwiPjwvZGF0ZS1waWNrZXI+XG5cbjx0aW1lLXBpY2tlciAqbmdJZj1cInNob3dUaW1lUGlja2VyXCIgW2luaXRUaW1lXT1cInZhbHVlXCIgW3VzZTEySG91cl09XCJ0cnVlXCIgKG9uU2VsZWN0VGltZSk9XCJzZXRUaW1lKCRldmVudClcIiAob25UaW1lUGlja2VyQ2FuY2VsKT1cInRvZ2dsZVRpbWVQaWNrZXIoJGV2ZW50KVwiPjwvdGltZS1waWNrZXI+XG5gLFxuICAgIHN0eWxlczogW2BpbnB1dFtyZWFkb25seV17YmFja2dyb3VuZC1jb2xvcjojZmZmfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS5nbHlwaGljb257dG9wOjFweH1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93RGF0ZSA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBzaG93RGF0ZVBpY2tlciA9IGZhbHNlO1xuICAgIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgd2Vla3NTZWxlY3RlZChjb3VudCkge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBuZXh0RGF0ZSA9IG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgKyBjb3VudCAqIDcpO1xuICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KG5leHREYXRlKS5mb3JtYXQoKTtcbiAgICB9XG4gICAgc2V0RGF0ZShkYXRlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQoZGF0ZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZSh0aW1lOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRpbWUgJiYgdGltZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodGltZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlRGF0ZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAvKnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBfYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LXdyYXBwZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24tbW9kYWwtbWFpbicpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGxldCBlbGVtQm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoZWxlbUJveC5ib3R0b20gPiBfYm9keS5ib3R0b20pIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gJzM2cHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMCk7Ki9cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh2YWwpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodmFsdWUpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19