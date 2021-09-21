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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLGlCQUFpQixFQUVsQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHO0lBQ3hCLEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2hDO0NBQ0YsQ0FBQztBQXFFRixNQUFNO0lBbkVOO1FBcUVFLDJDQUEyQztRQUNwQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDckIsVUFBSyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNoQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUMsYUFBUSxHQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN6QixjQUFTLEdBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBb0duQyxDQUFDO0lBbkdRLFFBQVEsS0FBSSxDQUFDO0lBRWIsVUFBVSxDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEVBQUU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEVBQUUsSUFBRyxDQUFDO0lBRXhCLFlBQVksQ0FBQyxNQUFNO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxZQUFZLENBQUMsTUFBTTtRQUN4QixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsTUFBZTtRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUM7SUFDVCxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVSxDQUFDLE1BQU07UUFDdEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sZUFBZSxDQUFDLE1BQU07UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLHFCQUFxQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMscUJBQXFCLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDO0lBRU0scUJBQXFCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQy9CLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQy9CLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLENBQUMsc0JBQXNCLENBQUM7SUFDaEMsQ0FBQztJQUVNLHFCQUFxQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUMvQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUMvQixDQUFDO1FBQ0QsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQy9CLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU87UUFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxJQUFJLE9BQU8sQ0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDdkIsQ0FBQztRQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7OztZQXBMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFEWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxpS0FBaUssQ0FBQztnQkFDM0ssU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7b0JBQ25ELEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7b0JBQ3JEO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7d0JBQ3pELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7OztvQkFTRSxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBmb3J3YXJkUmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgRm9ybUNvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuZXhwb3J0IGNvbnN0IE1ZX0ZPUk1BVFMgPSB7XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiAnTEwnXG4gIH0sXG4gIGRpc3BsYXk6IHtcbiAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgbW9udGhZZWFyTGFiZWw6ICdNTU0gWVlZWScsXG4gICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcbiAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknXG4gIH1cbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kYXRlLXRpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCJcbiAgICAgICAgICAoZGF0ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgKGNsaWNrKT1cInBpY2tlci5vcGVuKClcIlxuICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgIC8+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIGRpc2FibGVkPVwiZmFsc2VcIj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlXG4gICAgICAgICAgbWF0U3VmZml4XG4gICAgICAgICAgW2Zvcl09XCJwaWNrZXJcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCJcbiAgICAgICAgPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0V2Vla1BpY2tlckNzc0NsYXNzKClcIiAqbmdJZj1cInNob3dXZWVrc1wiPlxuICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgV2Vla3NcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIG5hbWU9XCJ3ZWVrc1wiXG4gICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwid2Vla1NlbGVjdCgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCIgW3ZhbHVlXT1cImNvdW50XCI+XG4gICAgICAgICAge3sgY291bnQgfX0gV2Vla3NcbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFRpbWVQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93VGltZVwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnc2hvcnRUaW1lJ1wiXG4gICAgICAgIChmb2N1cyk9XCJ0b2dnbGVUaW1lUGlja2VyKHRydWUpXCJcbiAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVGltZVwiXG4gICAgICAvPlxuICAgICAgPHRpbWUtcGlja2VyXG4gICAgICAgICpuZ0lmPVwic2hvd1RpbWVQaWNrZXJcIlxuICAgICAgICBbaW5pdFRpbWVdPVwidmFsdWVcIlxuICAgICAgICBbdXNlMTJIb3VyXT1cInRydWVcIlxuICAgICAgICAob25TZWxlY3RUaW1lKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgKG9uVGltZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVUaW1lUGlja2VyKCRldmVudClcIlxuICAgICAgPjwvdGltZS1waWNrZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgI3RpbWUtc2VjdGlvbntkaXNwbGF5OmlubGluZS1ibG9ja30jbmd4LWF0cC10aW1lLXBpY2tlciwjbmd4LW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LnRpbWUtYnRue21hcmdpbi10b3A6LTIwcHh9YF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICB7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgcHVibGljIHNlbGVjdGVkVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICBwdWJsaWMgc2VsZWN0ZWREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gIHB1YmxpYyBsb2FkSW5pdGlhbCA9IGZhbHNlO1xuICBwdWJsaWMgdmFsdWU7XG4gIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMCwgMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1dlZWtzID0gdHJ1ZTtcbiAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcbiAgcHVibGljIG5nT25Jbml0KCkge31cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7fVxuXG4gIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcbiAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuICB9XG5cbiAgcHVibGljIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcbiAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KCRldmVudC52YWx1ZSk7XG4gICAgY29uc3Qgc2V0VGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gJGV2ZW50LnZhbHVlO1xuICAgIHRoaXMudmFsdWUgPSBkYXRlU3RyaW5nO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG4gICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBjdXJyZW50VGltZSk7XG4gIH1cblxuICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcbiAgICBjb25zdCBkYXRlVG9Vc2UgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQoZGF0ZVRvVXNlKS5hZGQoJGV2ZW50LnZhbHVlLCAnd2Vla3MnKTtcbiAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSBkYXRlVG9Vc2U7XG4gICAgdGhpcy5zZXREYXRlVGltZShuZXh0V2Vla0RhdGUsIG5leHRXZWVrVGltZSk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0aW9uQ2hhbmdlKCRldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdXZWVrIHNlbGVjdGVkJywgJGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTIgZm9ybS1ncm91cCc7XG4gICAgfVxuICAgIHJldHVybiAnY29sLXNtLTMgZm9ybS1ncm91cCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKCkge1xuICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93VGltZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuICdjb2wtc20tOCBmb3JtLWdyb3VwJztcbiAgICB9XG4gICAgcmV0dXJuICdjb2wtc20tMTIgZm9ybS1ncm91cCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGltZVBpY2tlckNzc0NsYXNzKCkge1xuICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICB9XG4gICAgcmV0dXJuICdjb2wtc20tNCBmb3JtLWdyb3VwJztcbiAgfVxuXG4gIHB1YmxpYyBzZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKSB7XG4gICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudChzZXREYXRlKS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICBsZXQgbmV3VGltZTtcbiAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgbmV3VGltZSA9IG1vbWVudChzZXRUaW1lKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1RpbWUgPSAnMDA6MDA6MDAnO1xuICAgIH1cbiAgICBjb25zdCBuZXdEYXRlVGltZSA9IG1vbWVudChuZXdEYXRlICsgJycgKyBuZXdUaW1lLCAnREQtTU0tWVlZWSBISDptbTpzcycpO1xuICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICByZXR1cm4gZGF0ZVRpbWVTdHJpbmc7XG4gIH1cbn1cbiJdfQ==