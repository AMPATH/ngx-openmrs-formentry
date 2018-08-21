/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
const /** @type {?} */ Moment = moment_;
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
        const /** @type {?} */ now = new Date();
        const /** @type {?} */ nextDate = now.setDate(now.getDate() + count * 7);
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

    Model Value {{modelValue}}
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

<time-picker *ngIf="showTimePicker" [initTime]="value" [use12Hour]="true" (onSelectTime)="setTime($event)" (onTimePickerCancel)="toggleTimePicker($event)"></time-picker>`,
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
/** @nocollapse */
DateTimePickerComponent.ctorParameters = () => [];
DateTimePickerComponent.propDecorators = {
    "modelValue": [{ type: Input },],
    "showDate": [{ type: Input },],
    "showTime": [{ type: Input },],
    "showWeeks": [{ type: Input },],
    "weeks": [{ type: Input },],
    "onDateChange": [{ type: Output },],
};
function DateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DateTimePickerComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyx1QkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBb0R2QixNQUFNO0lBWUY7d0JBVm9CLElBQUk7d0JBQ0osS0FBSzt5QkFDSixLQUFLO3FCQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDOzRCQUMxQixJQUFJLFlBQVksRUFBTzs4QkFDeEIsS0FBSzs4QkFDTCxLQUFLO3dCQUNiLEdBQUcsRUFBRSxJQUFJO3lCQUNSLEdBQUcsRUFBRSxJQUFJO0tBR3pCOzs7O0lBRUQsUUFBUSxNQUFNOzs7OztJQUVkLGFBQWEsQ0FBQyxLQUFLO1FBQ2YsdUJBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsdUJBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQzs7Ozs7SUFDRCxPQUFPLENBQUMsSUFBUztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7S0FFSjs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBUztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxNQUFNLENBQUM7S0FDVjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFlO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDOzs7Ozs7Ozs7OztRQVc3QixNQUFNLENBQUM7S0FDUjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFlO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQzdCLE1BQU0sQ0FBQztLQUNWOzs7O0lBQ0QsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDMUI7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3BCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO0tBQ0o7OztZQXRJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswS0FzQzRKO2dCQUN0SyxNQUFNLEVBQUUsQ0FBQyx3R0FBd0csQ0FBQztnQkFDbEgsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ3RELEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKO2FBQ0o7Ozs7OzJCQUVJLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzs2QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBNb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz0ncm93Jz5cbiAgICA8ZGl2ICpuZ0lmPVwiIXNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy0xMiBjb2wtbWQtMTInPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCIhc2hvd1dlZWtzXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdtZWRpdW1EYXRlJ1wiIChmb2N1cyk9XCJ0b2dnbGVEYXRlUGlja2VyKHRydWUpXCJcbiAgICAgICAgICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIiAvPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtzXCIgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdtZWRpdW1EYXRlJ1wiIChmb2N1cyk9XCJ0b2dnbGVEYXRlUGlja2VyKHRydWUpXCJcbiAgICAgICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+V2Vla3MgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IHVwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAoY2xpY2spPVwid2Vla3NTZWxlY3RlZChjb3VudClcIiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIj48c3Bhbj4ge3tjb3VudH19IFdlZWtzPC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIE1vZGVsIFZhbHVlIHt7bW9kZWxWYWx1ZX19XG4gICAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy04IGNvbC1tZC04Jz5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIXNob3dXZWVrc1wiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICByZWFkb25seSBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCIgLz5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrc1wiIGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIiAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPldlZWtzIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKGNsaWNrKT1cIndlZWtzU2VsZWN0ZWQoY291bnQpXCIgKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCI+PHNwYW4+IHt7Y291bnR9fSBXZWVrczwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9J2NvbC14cy00IGNvbC1tZC00Jz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnc2hvcnRUaW1lJ1wiIChmb2N1cyk9XCJ0b2dnbGVUaW1lUGlja2VyKHRydWUpXCIgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVGltZVwiXG4gICAgICAgIC8+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxkYXRlLXBpY2tlciAqbmdJZj1cInNob3dEYXRlUGlja2VyXCIgW2luaXREYXRlXT1cInZhbHVlXCIgKG9uU2VsZWN0RGF0ZSk9XCJzZXREYXRlKCRldmVudClcIiAob25EYXRlUGlja2VyQ2FuY2VsKT1cInRvZ2dsZURhdGVQaWNrZXIoJGV2ZW50KVwiPjwvZGF0ZS1waWNrZXI+XG5cbjx0aW1lLXBpY2tlciAqbmdJZj1cInNob3dUaW1lUGlja2VyXCIgW2luaXRUaW1lXT1cInZhbHVlXCIgW3VzZTEySG91cl09XCJ0cnVlXCIgKG9uU2VsZWN0VGltZSk9XCJzZXRUaW1lKCRldmVudClcIiAob25UaW1lUGlja2VyQ2FuY2VsKT1cInRvZ2dsZVRpbWVQaWNrZXIoJGV2ZW50KVwiPjwvdGltZS1waWNrZXI+YCxcbiAgICBzdHlsZXM6IFtgaW5wdXRbcmVhZG9ubHlde2JhY2tncm91bmQtY29sb3I6I2ZmZn0udXB7Ym90dG9tOjEwMCUhaW1wb3J0YW50O3RvcDphdXRvIWltcG9ydGFudH0uZ2x5cGhpY29ue3RvcDoxcHh9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd0RhdGUgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dUaW1lID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1dlZWtzID0gZmFsc2U7XG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBwdWJsaWMgc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTtcbiAgICBwdWJsaWMgc2hvd1RpbWVQaWNrZXIgPSBmYWxzZTtcbiAgICBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIHdlZWtzU2VsZWN0ZWQoY291bnQpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbmV4dERhdGUgPSBub3cuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgY291bnQgKiA3KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudChuZXh0RGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuICAgIHNldERhdGUoZGF0ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRlICYmIGRhdGUgIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KGRhdGUpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNldFRpbWUodGltZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aW1lICYmIHRpbWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KHRpbWUpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZURhdGVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gc3RhdHVzO1xuICAgICAgLypzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgX2JvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC13cmFwcGVyJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWN0aW9uLW1vZGFsLW1haW4nKTtcbiAgICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgICBsZXQgZWxlbUJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgaWYgKGVsZW1Cb3guYm90dG9tID4gX2JvZHkuYm90dG9tKSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9ICczNnB4JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDApOyovXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlVGltZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSB2YWw7XG4gICAgICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQodmFsKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWwpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KHZhbHVlKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==