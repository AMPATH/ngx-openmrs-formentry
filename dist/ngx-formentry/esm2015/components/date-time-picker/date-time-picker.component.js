import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
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
    ngOnInit() { }
    weeksSelected(count) {
        const now = new Date();
        const nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    }
    setDate(date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    }
    setTime(time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    }
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
    toggleTimePicker(status) {
        this.showTimePicker = status;
        return;
    }
    get value() {
        return this.modelValue;
    }
    set value(val) {
        this.modelValue = val;
        this.onDateChange.emit(val);
        this.onChange(val);
        this.onTouched();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
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
                template: `<div class="row">
  <div *ngIf="!showTime" class="col-xs-12 col-md-12">
    <input
      *ngIf="!showWeeks"
      type="text"
      class="form-control"
      [value]="value | date: 'mediumDate'"
      (focus)="toggleDatePicker(true)"
      readonly
      placeholder="Select Date"
    />
    <div *ngIf="showWeeks" class="input-group">
      <input
        type="text"
        class="form-control"
        class="form-control"
        [value]="value | date: 'mediumDate'"
        (focus)="toggleDatePicker(true)"
        readonly
        placeholder="Select Date"
      />
      <div class="input-group-btn">
        <button
          type="button"
          class="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Weeks <span class="caret"></span>
        </button>
        <ul class="dropdown-menu up">
          <li (click)="weeksSelected(count)" *ngFor="let count of weeks">
            <span> {{ count }} Weeks</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div *ngIf="showTime" class="col-xs-8 col-md-8">
    <input
      *ngIf="!showWeeks"
      type="text"
      class="form-control"
      [value]="value | date: 'mediumDate'"
      (focus)="toggleDatePicker(true)"
      readonly
      placeholder="Select Date"
    />
    <div *ngIf="showWeeks" class="input-group">
      <input
        type="text"
        class="form-control"
        class="form-control"
        [value]="value | date: 'mediumDate'"
        (focus)="toggleDatePicker(true)"
        readonly
        placeholder="Select Date"
      />
      <div class="input-group-btn">
        <button
          type="button"
          class="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Weeks <span class="caret"></span>
        </button>
        <ul class="dropdown-menu up">
          <li (click)="weeksSelected(count)" *ngFor="let count of weeks">
            <span> {{ count }} Weeks</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div *ngIf="showTime" class="col-xs-4 col-md-4">
    <input
      type="text"
      class="form-control"
      [value]="value | date: 'shortTime'"
      (focus)="toggleTimePicker(true)"
      readonly
      placeholder="Select Time"
    />
  </div>
</div>
<date-picker
  *ngIf="showDatePicker"
  [initDate]="value"
  (onSelectDate)="setDate($event)"
  (onDatePickerCancel)="toggleDatePicker($event)"
></date-picker>

<time-picker
  *ngIf="showTimePicker"
  [initTime]="value"
  [use12Hour]="true"
  (onSelectTime)="setTime($event)"
  (onTimePickerCancel)="toggleTimePicker($event)"
></time-picker>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQW9IdkIsTUFBTTtJQVlKO1FBVlMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsVUFBSyxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzlCLGFBQVEsR0FBUSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUVYLENBQUM7SUFFaEIsUUFBUSxLQUFJLENBQUM7SUFFYixhQUFhLENBQUMsS0FBSztRQUNqQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxH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dXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IE1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGUtdGltZS1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgPGRpdiAqbmdJZj1cIiFzaG93VGltZVwiIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC0xMlwiPlxuICAgIDxpbnB1dFxuICAgICAgKm5nSWY9XCIhc2hvd1dlZWtzXCJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdtZWRpdW1EYXRlJ1wiXG4gICAgICAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICByZWFkb25seVxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiXG4gICAgLz5cbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtzXCIgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIFt2YWx1ZV09XCJ2YWx1ZSB8IGRhdGU6ICdtZWRpdW1EYXRlJ1wiXG4gICAgICAgIChmb2N1cyk9XCJ0b2dnbGVEYXRlUGlja2VyKHRydWUpXCJcbiAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCJcbiAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgPlxuICAgICAgICAgIFdlZWtzIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IHVwXCI+XG4gICAgICAgICAgPGxpIChjbGljayk9XCJ3ZWVrc1NlbGVjdGVkKGNvdW50KVwiICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiPlxuICAgICAgICAgICAgPHNwYW4+IHt7IGNvdW50IH19IFdlZWtzPC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJzaG93VGltZVwiIGNsYXNzPVwiY29sLXhzLTggY29sLW1kLThcIj5cbiAgICA8aW5wdXRcbiAgICAgICpuZ0lmPVwiIXNob3dXZWVrc1wiXG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIlxuICAgICAgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgcmVhZG9ubHlcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIlxuICAgIC8+XG4gICAgPGRpdiAqbmdJZj1cInNob3dXZWVrc1wiIGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIlxuICAgICAgICAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgIHJlYWRvbmx5XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiXG4gICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgID5cbiAgICAgICAgICBXZWVrcyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxuICAgICAgICAgIDxsaSAoY2xpY2spPVwid2Vla3NTZWxlY3RlZChjb3VudClcIiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIj5cbiAgICAgICAgICAgIDxzcGFuPiB7eyBjb3VudCB9fSBXZWVrczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwic2hvd1RpbWVcIiBjbGFzcz1cImNvbC14cy00IGNvbC1tZC00XCI+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnc2hvcnRUaW1lJ1wiXG4gICAgICAoZm9jdXMpPVwidG9nZ2xlVGltZVBpY2tlcih0cnVlKVwiXG4gICAgICByZWFkb25seVxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVGltZVwiXG4gICAgLz5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkYXRlLXBpY2tlclxuICAqbmdJZj1cInNob3dEYXRlUGlja2VyXCJcbiAgW2luaXREYXRlXT1cInZhbHVlXCJcbiAgKG9uU2VsZWN0RGF0ZSk9XCJzZXREYXRlKCRldmVudClcIlxuICAob25EYXRlUGlja2VyQ2FuY2VsKT1cInRvZ2dsZURhdGVQaWNrZXIoJGV2ZW50KVwiXG4+PC9kYXRlLXBpY2tlcj5cblxuPHRpbWUtcGlja2VyXG4gICpuZ0lmPVwic2hvd1RpbWVQaWNrZXJcIlxuICBbaW5pdFRpbWVdPVwidmFsdWVcIlxuICBbdXNlMTJIb3VyXT1cInRydWVcIlxuICAob25TZWxlY3RUaW1lKT1cInNldFRpbWUoJGV2ZW50KVwiXG4gIChvblRpbWVQaWNrZXJDYW5jZWwpPVwidG9nZ2xlVGltZVBpY2tlcigkZXZlbnQpXCJcbj48L3RpbWUtcGlja2VyPlxuYCxcbiAgc3R5bGVzOiBbYGlucHV0W3JlYWRvbmx5XXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LmdseXBoaWNvbnt0b3A6MXB4fWBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgQElucHV0KCkgc2hvd0RhdGUgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93V2Vla3MgPSBmYWxzZTtcbiAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBzaG93RGF0ZVBpY2tlciA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1RpbWVQaWNrZXIgPSBmYWxzZTtcbiAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgd2Vla3NTZWxlY3RlZChjb3VudCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbmV4dERhdGUgPSBub3cuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgY291bnQgKiA3KTtcbiAgICB0aGlzLnZhbHVlID0gTW9tZW50KG5leHREYXRlKS5mb3JtYXQoKTtcbiAgfVxuICBzZXREYXRlKGRhdGU6IGFueSk6IHZvaWQge1xuICAgIGlmIChkYXRlICYmIGRhdGUgIT09ICcnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gTW9tZW50KGRhdGUpLmZvcm1hdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lKHRpbWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aW1lICYmIHRpbWUgIT09ICcnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gTW9tZW50KHRpbWUpLmZvcm1hdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGltZTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdG9nZ2xlRGF0ZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNob3dEYXRlUGlja2VyID0gc3RhdHVzO1xuICAgIC8qc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IF9ib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtd3JhcHBlcicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VjdGlvbi1tb2RhbC1tYWluJyk7XG4gICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgbGV0IGVsZW1Cb3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChlbGVtQm94LmJvdHRvbSA+IF9ib2R5LmJvdHRvbSkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAnMzZweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAwKTsqL1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zaG93VGltZVBpY2tlciA9IHN0YXR1cztcbiAgICByZXR1cm47XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsKSB7XG4gICAgdGhpcy5tb2RlbFZhbHVlID0gdmFsO1xuICAgIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQodmFsKTtcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh2YWx1ZSkuZm9ybWF0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==