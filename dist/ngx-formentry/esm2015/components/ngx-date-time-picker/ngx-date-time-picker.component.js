import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
const moment = moment_;
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
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
    ngOnInit() { }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) { }
    onTimeSelect($event) {
        const setDate = moment(this.selectedDate);
        const setTime = $event;
        this.setDateTime(setDate, setTime);
    }
    onDateSelect($event) {
        const setDate = moment($event.value);
        const setTime = this.selectedTime;
        const dateString = this.setDateTime(setDate, setTime);
        const selectedDate = $event.value;
        this.value = dateString;
    }
    toggleTimePicker(status) {
        this.showTimePicker = status;
        return;
    }
    setCurrentTime() {
        const setDate = moment(this.selectedDate);
        const currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    }
    weekSelect($event) {
        const dateToUse = moment().format();
        const nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        const nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }
    selectionChange($event) {
        console.log('Week selected', $event);
    }
    getWeekPickerCssClass() {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    }
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
    getTimePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    }
    setDateTime(setDate, setTime) {
        const newDate = moment(setDate).format('DD-MM-YYYY');
        let newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        const newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
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
        <input
          matInput
          [matDatepicker]="picker"
          class="form-control"
          [value]="value"
          placeholder="Choose a date"
          (dateChange)="onDateSelect($event)"
          (click)="picker.open()"
          readonly
        />
        <mat-datepicker #picker disabled="false"></mat-datepicker>
        <mat-datepicker-toggle
          matSuffix
          [for]="picker"
          class="input-group-btn"
        ></mat-datepicker-toggle>
      </div>
    </div>
    <div [class]="getWeekPickerCssClass()" *ngIf="showWeeks">
      <mat-select
        placeholder="Select Weeks"
        class="form-control"
        name="weeks"
        (selectionChange)="weekSelect($event)"
      >
        <mat-option *ngFor="let count of weeks" [value]="count">
          {{ count }} Weeks
        </mat-option>
      </mat-select>
    </div>
    <div [class]="getTimePickerCssClass()" *ngIf="showTime">
      <input
        type="text"
        class="form-control"
        [value]="value | date: 'shortTime'"
        (focus)="toggleTimePicker(true)"
        readonly
        placeholder="Select Time"
      />
      <time-picker
        *ngIf="showTimePicker"
        [initTime]="value"
        [use12Hour]="true"
        (onSelectTime)="onTimeSelect($event)"
        (onTimePickerCancel)="toggleTimePicker($event)"
      ></time-picker>
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25neC1kYXRlLXRpbWUtcGlja2VyL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDeEIsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsSUFBSTtRQUNmLGNBQWMsRUFBRSxVQUFVO1FBQzFCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGtCQUFrQixFQUFFLFdBQVc7S0FDaEM7Q0FDRixDQUFDO0FBcUVGLE1BQU07SUFuRU47UUFxRUUsMkNBQTJDO1FBQ3BDLGlCQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsaUJBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUNyQixVQUFLLEdBQWEsQ0FBQyxDQUFD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QUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDeEIsQ0FBQzs7O1lBcExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcURYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGlLQUFpSyxDQUFDO2dCQUMzSyxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtvQkFDbkQsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtvQkFDckQ7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzt3QkFDekQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7YUFDRjs7O29CQVNFLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBGb3JtQ29udHJvbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1tb21lbnQtYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5leHBvcnQgY29uc3QgTVlfRk9STUFUUyA9IHtcbiAgcGFyc2U6IHtcbiAgICBkYXRlSW5wdXQ6ICdMTCdcbiAgfSxcbiAgZGlzcGxheToge1xuICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICBkYXRlQTExeUxhYmVsOiAnTEwnLFxuICAgIG1vbnRoWWVhckExMXlMYWJlbDogJ01NTU0gWVlZWSdcbiAgfVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRhdGUtdGltZS1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNob29zZSBhIGRhdGVcIlxuICAgICAgICAgIChkYXRlQ2hhbmdlKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAoY2xpY2spPVwicGlja2VyLm9wZW4oKVwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgLz5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXIgZGlzYWJsZWQ9XCJmYWxzZVwiPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGVcbiAgICAgICAgICBtYXRTdWZmaXhcbiAgICAgICAgICBbZm9yXT1cInBpY2tlclwiXG4gICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIlxuICAgICAgICA+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XG4gICAgICA8bWF0LXNlbGVjdFxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBXZWVrc1wiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgbmFtZT1cIndlZWtzXCJcbiAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJ3ZWVrU2VsZWN0KCRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIiBbdmFsdWVdPVwiY291bnRcIj5cbiAgICAgICAgICB7eyBjb3VudCB9fSBXZWVrc1xuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0VGltZVBpY2tlckNzc0NsYXNzKClcIiAqbmdJZj1cInNob3dUaW1lXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdzaG9ydFRpbWUnXCJcbiAgICAgICAgKGZvY3VzKT1cInRvZ2dsZVRpbWVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICByZWFkb25seVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBUaW1lXCJcbiAgICAgIC8+XG4gICAgICA8dGltZS1waWNrZXJcbiAgICAgICAgKm5nSWY9XCJzaG93VGltZVBpY2tlclwiXG4gICAgICAgIFtpbml0VGltZV09XCJ2YWx1ZVwiXG4gICAgICAgIFt1c2UxMkhvdXJdPVwidHJ1ZVwiXG4gICAgICAgIChvblNlbGVjdFRpbWUpPVwib25UaW1lU2VsZWN0KCRldmVudClcIlxuICAgICAgICAob25UaW1lUGlja2VyQ2FuY2VsKT1cInRvZ2dsZVRpbWVQaWNrZXIoJGV2ZW50KVwiXG4gICAgICA+PC90aW1lLXBpY2tlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AjdGltZS1zZWN0aW9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNuZ3gtYXRwLXRpbWUtcGlja2VyLCNuZ3gtbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJX0udXB7Ym90dG9tOjEwMCUhaW1wb3J0YW50O3RvcDphdXRvIWltcG9ydGFudH0udGltZS1idG57bWFyZ2luLXRvcDotMjBweH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTVlfRk9STUFUUyB9LFxuICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy8gcHVibGljIGRhdGUgPSBuZXcgRm9ybUNvbnRyb2wobW9tZW50KCkpO1xuICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgcHVibGljIGxvYWRJbml0aWFsID0gZmFsc2U7XG4gIHB1YmxpYyB2YWx1ZTtcbiAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFswLCAyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93V2Vla3MgPSB0cnVlO1xuICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHt9XG5cbiAgcHVibGljIG9uVGltZVNlbGVjdCgkZXZlbnQpIHtcbiAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICBjb25zdCBzZXRUaW1lID0gJGV2ZW50O1xuICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG4gIH1cblxuICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xuICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50LnZhbHVlKTtcbiAgICBjb25zdCBzZXRUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSAkZXZlbnQudmFsdWU7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGVTdHJpbmc7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlVGltZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDdXJyZW50VGltZSgpIHtcbiAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcbiAgfVxuXG4gIHB1YmxpYyB3ZWVrU2VsZWN0KCRldmVudCkge1xuICAgIGNvbnN0IGRhdGVUb1VzZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgIGNvbnN0IG5leHRXZWVrRGF0ZSA9IG1vbWVudChkYXRlVG9Vc2UpLmFkZCgkZXZlbnQudmFsdWUsICd3ZWVrcycpO1xuICAgIGNvbnN0IG5leHRXZWVrVGltZSA9IGRhdGVUb1VzZTtcbiAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2UoJGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ1dlZWsgc2VsZWN0ZWQnLCAkZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGdldFdlZWtQaWNrZXJDc3NDbGFzcygpIHtcbiAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgcmV0dXJuICdjb2wtc20tMiBmb3JtLWdyb3VwJztcbiAgICB9XG4gICAgcmV0dXJuICdjb2wtc20tMyBmb3JtLWdyb3VwJztcbiAgfVxuXG4gIHB1YmxpYyBnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3dUaW1lID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS04IGZvcm0tZ3JvdXAnO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbC1zbS0xMiBmb3JtLWdyb3VwJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbC1zbS00IGZvcm0tZ3JvdXAnO1xuICB9XG5cbiAgcHVibGljIHNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpIHtcbiAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgIGxldCBuZXdUaW1lO1xuICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICBuZXdUaW1lID0gbW9tZW50KHNldFRpbWUpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VGltZSA9ICcwMDowMDowMCc7XG4gICAgfVxuICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUsICdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XG4gICAgY29uc3QgZGF0ZVRpbWVTdHJpbmcgPSBtb21lbnQobmV3RGF0ZVRpbWUpLmZvcm1hdCgpO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBkYXRlVGltZVN0cmluZztcbiAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgIHJldHVybiBkYXRlVGltZVN0cmluZztcbiAgfVxufVxuIl19