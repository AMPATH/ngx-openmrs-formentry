/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;
import * as _ from 'lodash';
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_
export class DatePickerComponent {
    constructor() {
        this.locale = 'en';
        this.viewFormat = 'll';
        this.returnObject = 'js';
        this.onDatePickerCancel = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onDisplayMonths = false;
        this.onDisplayYears = false;
        this.displayYearsIndex = 0;
        this.monthsShort = moment.monthsShort();
    }
    ngOnInit() {
        this.initValue();
        // default to current year range
        _.each(this.fullYearRange, (v, i) => {
            this.currentYear = this.calendarDate.clone().startOf('year').year();
            if (v.indexOf(this.currentYear) !== -1) {
                this.displayYearsIndex = i;
            }
        });
        this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        this.generateCalendar();
    }
    prev() {
        if (this.onDisplayYears) {
            this.displayYearsIndex--;
            if (this.displayYearsIndex < 0) {
                this.displayYearsIndex = 0;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        }
        else {
            this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
        }
        this.generateCalendar();
    }
    showMonthSelection() {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    }
    showYearSelection() {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    }
    next() {
        if (this.onDisplayYears) {
            this.displayYearsIndex++;
            if (this.displayYearsIndex >= this.fullYearRange.length) {
                this.displayYearsIndex = this.fullYearRange.length - 1;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
        }
        else {
            this.calendarDate = this.calendarDate.clone().add(1, 'M');
        }
        this.generateCalendar();
    }
    selectDay(day) {
        const daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        const selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    }
    selectMonth(month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    }
    selectYear(year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    }
    selectToday() {
        const today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    }
    clearPickDate() {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    }
    cancelDatePicker() {
        this.onDatePickerCancel.emit(false);
        return;
    }
    generateYears() {
        const currentYear = moment().year();
        const startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        const years = [];
        for (let year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    }
    initValue() {
        // set moment locale (default is en)
        moment.locale(this.locale);
        // set today value
        this.today = moment().startOf('date');
        this.currentMonth = this.monthsShort[moment().month()];
        this.currentYear = moment().year();
        // set week days name array
        this.dayNames = moment.weekdaysShort(true);
        // check if the input initDate has value
        if (this.initDate) {
            this.calendarDate =
                this.returnObject === 'string'
                    ? moment(this.initDate, this.viewFormat)
                    : moment(this.initDate);
            this.selectedDate = this.calendarDate.clone().startOf('date');
        }
        else {
            this.calendarDate = moment();
        }
        this.generateYears();
    }
    generateCalendar() {
        this.calendarDays = [];
        const start = 0 -
            ((this.calendarDate.clone().startOf('month').day() +
                (7 - moment.localeData().firstDayOfWeek())) %
                7);
        const end = 41 + start; // iterator ending point
        for (let i = start; i <= end; i += 1) {
            const day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    }
    parseToReturnObjectType(day) {
        switch (this.returnObject) {
            case 'js':
                return day.toDate();
            case 'string':
                return day.format(this.viewFormat);
            case 'moment':
                return day;
            case 'json':
                return day.toJSON();
            case 'array':
                return day.toArray();
            case 'iso':
                return day.toISOString();
            case 'object':
                return day.toObject();
            default:
                return day;
        }
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-picker',
                template: `<picker-modal (onOverlayClick)="cancelDatePicker()">
  <div class="picker-wrap">
    <div class="picker-box">
      <div class="picker-header">
        <div class="picker-header-nav">
          <span class="nav-prev" (click)="prev()"></span>
        </div>
        <div class="picker-header-content">
          <div class="content">
            <span (click)="showMonthSelection()" class="month">{{
              calendarDate | moment: 'MMMM'
            }}</span>
            <span class="seperator">|</span>
            <span (click)="showYearSelection()" class="year">{{
              calendarDate | moment: 'YYYY'
            }}</span>
          </div>
        </div>
        <div class="picker-header-nav">
          <span class="nav-next" (click)="next()"></span>
        </div>
      </div>
      <div class="picker-calendar">
        <div
          class="picker-calendar-row"
          *ngIf="!onDisplayMonths && !onDisplayYears"
        >
          <span class="picker-weekday" *ngFor="let day of dayNames">{{
            day
          }}</span>
        </div>
        <div
          class="picker-calendar-row"
          *ngIf="!onDisplayMonths && !onDisplayYears"
        >
          <span
            class="picker-day"
            (click)="selectDay(day)"
            [ngClass]="{
              'out-focus': day.month() != calendarDate.month(),
              today: day.isSame(today),
              selected: day.isSame(selectedDate)
            }"
            *ngFor="let day of calendarDays"
          >
            {{ day | moment: 'D' }}
          </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayMonths">
          <span
            class="picker-month"
            *ngFor="let month of monthsShort"
            (click)="selectMonth(month)"
            [ngClass]="{
              selected: month === currentMonth
            }"
          >
            {{ month }}
          </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayYears">
          <span
            class="picker-year"
            *ngFor="let year of displayYearRange"
            (click)="selectYear(year)"
            [ngClass]="{
              selected: year === currentYear
            }"
          >
            {{ year }}
          </span>
        </div>
      </div>
      <div class="picker-footer">
        <div class="picker-action action-today" (click)="selectToday()">
          <span class="text">Today</span>
        </div>
        <div class="picker-action action-clear" (click)="clearPickDate()">
          <span class="text">Clear</span>
        </div>
        <div class="picker-action action-close" (click)="cancelDatePicker()">
          <span class="text">Close</span>
        </div>
      </div>
    </div>
  </div>
</picker-modal>
`,
                styles: [`*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:' ';border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:' ';position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:' ';position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}`]
            },] },
];
DatePickerComponent.ctorParameters = () => [];
DatePickerComponent.propDecorators = {
    initDate: [{ type: Input }],
    locale: [{ type: Input }],
    viewFormat: [{ type: Input }],
    returnObject: [{ type: Input }],
    onDatePickerCancel: [{ type: Output }],
    onSelectDate: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSzVCLHFFQUFxRTtBQUNyRSxtRUFBbUU7QUFDbkUsWUFBWTtBQThGWixNQUFNO0lBdUJKO1FBbkJnQixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2pELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU9qRCxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFHdEIsZ0JBQVcsR0FBa0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRzFDLENBQUM7SUFFVCxRQUFRO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGdDQUFnQztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUss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LENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLElBQUk7Z0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV0QixLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJDLEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDO1lBRWIsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdEIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkIsS0FBSyxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFM0IsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFeEI7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDOzs7WUE3UkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVGWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzMUZBQXMxRixDQUFDO2FBQ2oyRjs7Ozt1QkFJRSxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS1waWNrZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxwaWNrZXItbW9kYWwgKG9uT3ZlcmxheUNsaWNrKT1cImNhbmNlbERhdGVQaWNrZXIoKVwiPlxuICA8ZGl2IGNsYXNzPVwicGlja2VyLXdyYXBcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWJveFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXItbmF2XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXYtcHJldlwiIChjbGljayk9XCJwcmV2KClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzaG93TW9udGhTZWxlY3Rpb24oKVwiIGNsYXNzPVwibW9udGhcIj57e1xuICAgICAgICAgICAgICBjYWxlbmRhckRhdGUgfCBtb21lbnQ6ICdNTU1NJ1xuICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlcGVyYXRvclwiPnw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwic2hvd1llYXJTZWxlY3Rpb24oKVwiIGNsYXNzPVwieWVhclwiPnt7XG4gICAgICAgICAgICAgIGNhbGVuZGFyRGF0ZSB8IG1vbWVudDogJ1lZWVknXG4gICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyLW5hdlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2LW5leHRcIiAoY2xpY2spPVwibmV4dCgpXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jYWxlbmRhclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCJcbiAgICAgICAgICAqbmdJZj1cIiFvbkRpc3BsYXlNb250aHMgJiYgIW9uRGlzcGxheVllYXJzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGlja2VyLXdlZWtkYXlcIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheU5hbWVzXCI+e3tcbiAgICAgICAgICAgIGRheVxuICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiXG4gICAgICAgICAgKm5nSWY9XCIhb25EaXNwbGF5TW9udGhzICYmICFvbkRpc3BsYXlZZWFyc1wiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJwaWNrZXItZGF5XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3REYXkoZGF5KVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICdvdXQtZm9jdXMnOiBkYXkubW9udGgoKSAhPSBjYWxlbmRhckRhdGUubW9udGgoKSxcbiAgICAgICAgICAgICAgdG9kYXk6IGRheS5pc1NhbWUodG9kYXkpLFxuICAgICAgICAgICAgICBzZWxlY3RlZDogZGF5LmlzU2FtZShzZWxlY3RlZERhdGUpXG4gICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgY2FsZW5kYXJEYXlzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBkYXkgfCBtb21lbnQ6ICdEJyB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCIgKm5nSWY9XCJvbkRpc3BsYXlNb250aHNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJwaWNrZXItbW9udGhcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoc1Nob3J0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RNb250aChtb250aClcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICBzZWxlY3RlZDogbW9udGggPT09IGN1cnJlbnRNb250aFxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgbW9udGggfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwib25EaXNwbGF5WWVhcnNcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJwaWNrZXIteWVhclwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgeWVhciBvZiBkaXNwbGF5WWVhclJhbmdlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RZZWFyKHllYXIpXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHllYXIgPT09IGN1cnJlbnRZZWFyXG4gICAgICAgICAgICB9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyB5ZWFyIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1mb290ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLXRvZGF5XCIgKGNsaWNrKT1cInNlbGVjdFRvZGF5KClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5Ub2RheTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbGVhclwiIChjbGljayk9XCJjbGVhclBpY2tEYXRlKClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5DbGVhcjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbG9zZVwiIChjbGljayk9XCJjYW5jZWxEYXRlUGlja2VyKClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5DbG9zZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3BpY2tlci1tb2RhbD5cbmAsXG4gIHN0eWxlczogW2AqLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5waWNrZXItd3JhcHt3aWR0aDo5NXZ3O21heC13aWR0aDo2NjZweH0ucGlja2VyLWJveHtmb250LWZhbWlseTonT3BlbiBTYW5zJzttaW4td2lkdGg6NDAwcHghaW1wb3J0YW50O3BhZGRpbmc6LjYyNXJlbSAxcmVtOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLWZvb3RlciwucGlja2VyLWhlYWRlcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO2Rpc3BsYXk6ZmxleDtoZWlnaHQ6Mi41cmVtO3dpZHRoOjEwMCV9LnBpY2tlci1oZWFkZXItbmF2e3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyO3dpZHRoOmNhbGMoMTAwJSAvIDgpfS5waWNrZXItaGVhZGVyLW5hdj4qe3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7cmlnaHQ6YXV0bztib3R0b206YXV0bztsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSl9LnBpY2tlci1oZWFkZXItbmF2IC5uYXYtbmV4dDo6YmVmb3JlLC5waWNrZXItaGVhZGVyLW5hdiAubmF2LXByZXY6OmJlZm9yZXtjb250ZW50OicgJztib3JkZXItdG9wOi41ZW0gc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTouNWVtIHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDouNzVlbSBzb2xpZCAjMDAwO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTpibG9jazttYXJnaW46MCBhdXRvfS5waWNrZXItaGVhZGVyLW5hdiAubmF2LW5leHQ6OmJlZm9yZXtib3JkZXItcmlnaHQ6MDtib3JkZXItbGVmdDouNzVlbSBzb2xpZCAjMDAwfS5waWNrZXItaGVhZGVyLWNvbnRlbnR7d2lkdGg6Y2FsYygxMDAlICogNiAvIDgpO3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItaGVhZGVyLWNvbnRlbnQgLm1vbnRoe2ZvbnQtc2l6ZToxLjc3OHJlbTtsaW5lLWhlaWdodDoyLjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtO2ZvbnQtd2VpZ2h0OjcwMH0ucGlja2VyLWhlYWRlci1jb250ZW50IC55ZWFye2ZvbnQtc3R5bGU6aXRhbGljO2NvbG9yOiM5OTl9LnBpY2tlci1jYWxlbmRhcnt3aWR0aDoxMDAlfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1jYWxlbmRhci1yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO3dpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTouNjI1cmVtfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci13ZWVrZGF5e2ZvbnQtd2VpZ2h0OjcwMDt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6Izk5OTt3aWR0aDpjYWxjKDEwMCUgLyA3KX0ucGlja2VyLWNhbGVuZGFyIC5waWNrZXItZGF5LC5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1tb250aCwucGlja2VyLWNhbGVuZGFyIC5waWNrZXIteWVhcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoyLjVyZW07dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6Y2FsYygxMDAlIC8gNyl9LnBpY2tlci1jYWxlbmRhciAucGlja2VyLWRheTpob3ZlciwucGlja2VyLWNhbGVuZGFyIC5waWNrZXItbW9udGg6aG92ZXIsLnBpY2tlci1jYWxlbmRhciAucGlja2VyLXllYXI6aG92ZXJ7YmFja2dyb3VuZDojYjFkY2ZifS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1c3tjb2xvcjojZGRkfS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1czpob3Zlcntjb2xvcjojMDAwfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVke2JhY2tncm91bmQ6IzAwODllYztjb2xvcjojZmZmfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVkOmhvdmVye2JhY2tncm91bmQ6IzAwODllY30ucGlja2VyLWNhbGVuZGFyIC50b2RheTo6YmVmb3Jle2NvbnRlbnQ6JyAnO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoycHg7cmlnaHQ6MnB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXRvcDouNWVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjVlbSBzb2xpZCB0cmFuc3BhcmVudH0ucGlja2VyLWZvb3RlcntjdXJzb3I6cG9pbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbnt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDpjYWxjKDEwMCUgLyAzKX0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiMWRjZmJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb24gLnRleHR7cGFkZGluZy1sZWZ0Oi44cmVtfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi10b2RheTo6YmVmb3Jle2NvbnRlbnQ6JyAnO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDowO3dpZHRoOjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi10b2RheTo6YmVmb3Jle2JvcmRlci10b3A6LjY2ZW0gc29saWQgIzAwNTliYztib3JkZXItbGVmdDouNjZlbSBzb2xpZCB0cmFuc3BhcmVudH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsZWFyOjpiZWZvcmV7dG9wOi0uNXJlbTt3aWR0aDoxcmVtO2JvcmRlci10b3A6M3B4IHNvbGlkICNlMjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbG9zZTo6YmVmb3Jle3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpLGxpbmVhci1ncmFkaWVudCh0byByaWdodCx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgZGF5TmFtZXM6IEFycmF5PHN0cmluZz47XG5cbiAgQElucHV0KCkgcHVibGljIGluaXREYXRlOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBsb2NhbGUgPSAnZW4nO1xuICBASW5wdXQoKSBwdWJsaWMgdmlld0Zvcm1hdCA9ICdsbCc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXR1cm5PYmplY3QgPSAnanMnO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRGF0ZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNlbGVjdERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgY2FsZW5kYXJEYXRlOiBNb21lbnQ7XG4gIHB1YmxpYyBzZWxlY3RlZERhdGU6IE1vbWVudDtcbiAgcHVibGljIGN1cnJlbnRNb250aDogYW55O1xuICBwdWJsaWMgdG9kYXk6IE1vbWVudDtcbiAgcHVibGljIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gIHB1YmxpYyBvbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgcHVibGljIG9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gIHB1YmxpYyBkaXNwbGF5WWVhcnNJbmRleCA9IDA7XG4gIHB1YmxpYyBkaXNwbGF5WWVhclJhbmdlOiBBcnJheTxudW1iZXI+O1xuICBwdWJsaWMgZnVsbFllYXJSYW5nZTogQXJyYXk8YW55PjtcbiAgcHVibGljIG1vbnRoc1Nob3J0OiBBcnJheTxzdHJpbmc+ID0gbW9tZW50Lm1vbnRoc1Nob3J0KCk7XG4gIHB1YmxpYyBjYWxlbmRhckRheXM6IEFycmF5PE1vbWVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xuICAgIC8vIGRlZmF1bHQgdG8gY3VycmVudCB5ZWFyIHJhbmdlXG4gICAgXy5lYWNoKHRoaXMuZnVsbFllYXJSYW5nZSwgKHYsIGkpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKS55ZWFyKCk7XG4gICAgICBpZiAodi5pbmRleE9mKHRoaXMuY3VycmVudFllYXIpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRpc3BsYXlZZWFyUmFuZ2UgPSB0aGlzLmZ1bGxZZWFyUmFuZ2VbdGhpcy5kaXNwbGF5WWVhcnNJbmRleF07XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vbkRpc3BsYXlZZWFycykge1xuICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleC0tO1xuICAgICAgaWYgKHRoaXMuZGlzcGxheVllYXJzSW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3VidHJhY3QoMSwgJ00nKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2hvd01vbnRoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub25EaXNwbGF5TW9udGhzID0gdHJ1ZTtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2hvd1llYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IHRydWU7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uRGlzcGxheVllYXJzKSB7XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4Kys7XG4gICAgICBpZiAodGhpcy5kaXNwbGF5WWVhcnNJbmRleCA+PSB0aGlzLmZ1bGxZZWFyUmFuZ2UubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSB0aGlzLmZ1bGxZZWFyUmFuZ2UubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4KytdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKDEsICdNJyk7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdERheShkYXk6IE1vbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRheXNEaWZmZXJlbmNlID0gZGF5LmRpZmYoXG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RhdGUnKSxcbiAgICAgICdkYXlzJ1xuICAgICk7XG4gICAgZGF5ID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoZGF5c0RpZmZlcmVuY2UsICdkJyk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKGRheSk7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChzZWxlY3RlZERheSk7XG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE1vbnRoKG1vbnRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkubW9udGgobW9udGgpO1xuICAgIHRoaXMub25EaXNwbGF5TW9udGhzID0gZmFsc2U7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0WWVhcih5ZWFyOiBudW1iZXIpIHtcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkueWVhcih5ZWFyKTtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0VG9kYXkoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXkgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKG1vbWVudCgpKTtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KHRvZGF5KTtcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgY2xlYXJQaWNrRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KG51bGwpO1xuICAgIHRoaXMuY2FuY2VsRGF0ZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxEYXRlUGlja2VyKCk6IHZvaWQge1xuICAgIHRoaXMub25EYXRlUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZVllYXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xuICAgIGNvbnN0IHN0YXJ0WXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEwMCwgJ3knKS55ZWFyKCk7XG4gICAgLy8gY29uc3QgZW5kWXIgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZCgxMCwgJ3knKS55ZWFyKCk7XG4gICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICBmb3IgKGxldCB5ZWFyID0gc3RhcnRZcjsgeWVhciA8PSBjdXJyZW50WWVhcjsgeWVhcisrKSB7XG4gICAgICB5ZWFycy5wdXNoKHllYXIpO1xuICAgIH1cblxuICAgIHRoaXMuZnVsbFllYXJSYW5nZSA9IF8uY2h1bmsoeWVhcnMsIDE0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmFsdWUoKSB7XG4gICAgLy8gc2V0IG1vbWVudCBsb2NhbGUgKGRlZmF1bHQgaXMgZW4pXG4gICAgbW9tZW50LmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgLy8gc2V0IHRvZGF5IHZhbHVlXG4gICAgdGhpcy50b2RheSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RhdGUnKTtcbiAgICB0aGlzLmN1cnJlbnRNb250aCA9IHRoaXMubW9udGhzU2hvcnRbbW9tZW50KCkubW9udGgoKV07XG4gICAgdGhpcy5jdXJyZW50WWVhciA9IG1vbWVudCgpLnllYXIoKTtcblxuICAgIC8vIHNldCB3ZWVrIGRheXMgbmFtZSBhcnJheVxuICAgIHRoaXMuZGF5TmFtZXMgPSBtb21lbnQud2Vla2RheXNTaG9ydCh0cnVlKTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCBpbml0RGF0ZSBoYXMgdmFsdWVcbiAgICBpZiAodGhpcy5pbml0RGF0ZSkge1xuICAgICAgdGhpcy5jYWxlbmRhckRhdGUgPVxuICAgICAgICB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG1vbWVudCh0aGlzLmluaXREYXRlLCB0aGlzLnZpZXdGb3JtYXQpXG4gICAgICAgICAgOiBtb21lbnQodGhpcy5pbml0RGF0ZSk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignZGF0ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlWWVhcnMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJEYXlzID0gW107XG4gICAgY29uc3Qgc3RhcnQgPVxuICAgICAgMCAtXG4gICAgICAoKHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5kYXkoKSArXG4gICAgICAgICg3IC0gbW9tZW50LmxvY2FsZURhdGEoKS5maXJzdERheU9mV2VlaygpKSkgJVxuICAgICAgICA3KTtcbiAgICBjb25zdCBlbmQgPSA0MSArIHN0YXJ0OyAvLyBpdGVyYXRvciBlbmRpbmcgcG9pbnRcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZGF5ID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLmFkZChpLCAnZGF5cycpO1xuICAgICAgdGhpcy5jYWxlbmRhckRheXMucHVzaChkYXkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShkYXk6IE1vbWVudCk6IGFueSB7XG4gICAgc3dpdGNoICh0aGlzLnJldHVybk9iamVjdCkge1xuICAgICAgY2FzZSAnanMnOlxuICAgICAgICByZXR1cm4gZGF5LnRvRGF0ZSgpO1xuXG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gZGF5LmZvcm1hdCh0aGlzLnZpZXdGb3JtYXQpO1xuXG4gICAgICBjYXNlICdtb21lbnQnOlxuICAgICAgICByZXR1cm4gZGF5O1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgcmV0dXJuIGRheS50b0pTT04oKTtcblxuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICByZXR1cm4gZGF5LnRvQXJyYXkoKTtcblxuICAgICAgY2FzZSAnaXNvJzpcbiAgICAgICAgcmV0dXJuIGRheS50b0lTT1N0cmluZygpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gZGF5LnRvT2JqZWN0KCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfVxuICB9XG59XG4iXX0=