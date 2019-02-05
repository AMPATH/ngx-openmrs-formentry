/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    showMonthSelection() {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    }
    /**
     * @return {?}
     */
    showYearSelection() {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    }
    /**
     * @return {?}
     */
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
    /**
     * @param {?} day
     * @return {?}
     */
    selectDay(day) {
        /** @type {?} */
        const daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        /** @type {?} */
        const selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    }
    /**
     * @return {?}
     */
    selectToday() {
        /** @type {?} */
        const today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    }
    /**
     * @return {?}
     */
    clearPickDate() {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    }
    /**
     * @return {?}
     */
    cancelDatePicker() {
        this.onDatePickerCancel.emit(false);
        return;
    }
    /**
     * @protected
     * @return {?}
     */
    generateYears() {
        /** @type {?} */
        const currentYear = moment().year();
        /** @type {?} */
        const startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        /** @type {?} */
        const years = [];
        for (let year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    }
    /**
     * @protected
     * @return {?}
     */
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
            this.calendarDate = this.returnObject === 'string' ? moment(this.initDate, this.viewFormat) :
                moment(this.initDate);
            this.selectedDate = this.calendarDate.clone().startOf('date');
        }
        else {
            this.calendarDate = moment();
        }
        this.generateYears();
    }
    /**
     * @protected
     * @return {?}
     */
    generateCalendar() {
        this.calendarDays = [];
        /** @type {?} */
        const start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment.localeData().firstDayOfWeek())) % 7;
        /** @type {?} */
        const end = 41 + start;
        for (let i = start; i <= end; i += 1) {
            /** @type {?} */
            const day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    }
    /**
     * @protected
     * @param {?} day
     * @return {?}
     */
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
            <span (click)="showMonthSelection()" class="month">{{calendarDate | moment: "MMMM"}}</span>
            <span class="seperator">|</span>
            <span (click)="showYearSelection()" class="year">{{calendarDate | moment: "YYYY"}}</span>
          </div>
        </div>
        <div class="picker-header-nav">
          <span class="nav-next" (click)="next()"></span>
        </div>
      </div>
      <div class="picker-calendar">
        <div class="picker-calendar-row" *ngIf="!onDisplayMonths && !onDisplayYears">
          <span class="picker-weekday" *ngFor="let day of dayNames">{{ day }}</span>
        </div>
        <div class="picker-calendar-row" *ngIf="!onDisplayMonths && !onDisplayYears">
                    <span class="picker-day" (click)="selectDay(day)" [ngClass]="{
                       'out-focus': day.month() != calendarDate.month(),
                       'today': day.isSame(today),
                       'selected': day.isSame(selectedDate)
                      }" *ngFor="let day of calendarDays">
                    {{ day | moment: 'D'}}
                </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayMonths">
                    <span class="picker-month" *ngFor="let month of monthsShort"
                          (click)="selectMonth(month)"
                          [ngClass]="{
                       'selected': month === currentMonth
                      }">
                    {{ month }}
                </span>
        </div>
        <div class="picker-calendar-row" *ngIf="onDisplayYears">
                    <span class="picker-year" *ngFor="let year of displayYearRange"
                          (click)="selectYear(year)"
                          [ngClass]="{
                       'selected': year === currentYear
                      }">
                    {{ year }}
                </span>
        </div>
      </div>
      <div class="picker-footer">
        <div class="picker-action action-today" (click)="selectToday()"><span class="text">Today</span></div>
        <div class="picker-action action-clear" (click)="clearPickDate()"><span class="text">Clear</span></div>
        <div class="picker-action action-close" (click)="cancelDatePicker()"><span class="text">Close</span></div>
      </div>
    </div>
  </div>
</picker-modal>
`,
                styles: [`*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:" ";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:" ";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:" ";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}`],
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
if (false) {
    /** @type {?} */
    DatePickerComponent.prototype.dayNames;
    /** @type {?} */
    DatePickerComponent.prototype.initDate;
    /** @type {?} */
    DatePickerComponent.prototype.locale;
    /** @type {?} */
    DatePickerComponent.prototype.viewFormat;
    /** @type {?} */
    DatePickerComponent.prototype.returnObject;
    /** @type {?} */
    DatePickerComponent.prototype.onDatePickerCancel;
    /** @type {?} */
    DatePickerComponent.prototype.onSelectDate;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDate;
    /** @type {?} */
    DatePickerComponent.prototype.selectedDate;
    /** @type {?} */
    DatePickerComponent.prototype.currentMonth;
    /** @type {?} */
    DatePickerComponent.prototype.today;
    /** @type {?} */
    DatePickerComponent.prototype.currentYear;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayMonths;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayYears;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearsIndex;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.fullYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.monthsShort;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87QUFDdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUF5RTVCLE1BQU07SUF3Qko7UUFuQmdCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBT2pELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUd0QixnQkFBVyxHQUFrQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFJekQsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsZ0NBQWdDO1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRU0sSUFBSTtRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7O0lBRU0saUJBQWlCO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFTSxJQUFJO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsR0FBVzs7Y0FDcEIsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ2xGLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7O2NBQ25ELFdBQVcsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNULENBQUM7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVNLFVBQVUsQ0FBQyxJQUFZO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVNLFdBQVc7O2NBQ1YsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDVCxDQUFDOzs7O0lBRU0sYUFBYTtRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDVCxDQUFDOzs7O0lBRU0sZ0JBQWdCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFUyxhQUFhOztjQUNmLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUU7O2NBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOzs7Y0FFN0QsS0FBSyxHQUFHLEVBQUU7UUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksSUFBSSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNyRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRVMsU0FBUztRQUVqQixvQ0FBb0M7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbkMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyx3Q0FBd0M7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFUyxnQkFBZ0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7O2NBQ2pCLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUU7WUFDbEUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDOztjQUMxQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUs7UUFFdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztrQkFDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDOzs7Ozs7SUFFUyx1QkFBdUIsQ0FBQyxHQUFXO1FBQzNDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssSUFBSTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRCLEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFckMsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFFYixLQUFLLE1BQU07Z0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV0QixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUUzQixLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV4QjtnQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7OztZQTVQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBEWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzMUZBQXMxRixDQUFDO2FBQ2oyRjs7Ozt1QkFNRSxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLE1BQU07MkJBQ04sTUFBTTs7OztJQVBQLHVDQUErQjs7SUFFL0IsdUNBQThCOztJQUM5QixxQ0FBOEI7O0lBQzlCLHlDQUFrQzs7SUFDbEMsMkNBQW9DOztJQUNwQyxpREFBa0U7O0lBQ2xFLDJDQUF3RDs7SUFFeEQsMkNBQTRCOztJQUM1QiwyQ0FBNEI7O0lBQzVCLDJDQUEwQjs7SUFDMUIsb0NBQXFCOztJQUNyQiwwQ0FBMkI7O0lBQzNCLDhDQUErQjs7SUFDL0IsNkNBQThCOztJQUM5QixnREFBNkI7O0lBQzdCLCtDQUF1Qzs7SUFDdkMsNENBQWlDOztJQUNqQywwQ0FBeUQ7O0lBQ3pELDJDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS1waWNrZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxwaWNrZXItbW9kYWwgKG9uT3ZlcmxheUNsaWNrKT1cImNhbmNlbERhdGVQaWNrZXIoKVwiPlxuICA8ZGl2IGNsYXNzPVwicGlja2VyLXdyYXBcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWJveFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXItbmF2XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXYtcHJldlwiIChjbGljayk9XCJwcmV2KClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzaG93TW9udGhTZWxlY3Rpb24oKVwiIGNsYXNzPVwibW9udGhcIj57e2NhbGVuZGFyRGF0ZSB8IG1vbWVudDogXCJNTU1NXCJ9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VwZXJhdG9yXCI+fDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzaG93WWVhclNlbGVjdGlvbigpXCIgY2xhc3M9XCJ5ZWFyXCI+e3tjYWxlbmRhckRhdGUgfCBtb21lbnQ6IFwiWVlZWVwifX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlci1uYXZcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdi1uZXh0XCIgKGNsaWNrKT1cIm5leHQoKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jYWxlbmRhci1yb3dcIiAqbmdJZj1cIiFvbkRpc3BsYXlNb250aHMgJiYgIW9uRGlzcGxheVllYXJzXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItd2Vla2RheVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5TmFtZXNcIj57eyBkYXkgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwiIW9uRGlzcGxheU1vbnRocyAmJiAhb25EaXNwbGF5WWVhcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItZGF5XCIgKGNsaWNrKT1cInNlbGVjdERheShkYXkpXCIgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAnb3V0LWZvY3VzJzogZGF5Lm1vbnRoKCkgIT0gY2FsZW5kYXJEYXRlLm1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICd0b2RheSc6IGRheS5pc1NhbWUodG9kYXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiBkYXkuaXNTYW1lKHNlbGVjdGVkRGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICB9XCIgKm5nRm9yPVwibGV0IGRheSBvZiBjYWxlbmRhckRheXNcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZGF5IHwgbW9tZW50OiAnRCd9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCIgKm5nSWY9XCJvbkRpc3BsYXlNb250aHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItbW9udGhcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzU2hvcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TW9udGgobW9udGgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiBtb250aCA9PT0gY3VycmVudE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgfVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBtb250aCB9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCIgKm5nSWY9XCJvbkRpc3BsYXlZZWFyc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpY2tlci15ZWFyXCIgKm5nRm9yPVwibGV0IHllYXIgb2YgZGlzcGxheVllYXJSYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RZZWFyKHllYXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiB5ZWFyID09PSBjdXJyZW50WWVhclxuICAgICAgICAgICAgICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgICAgICAgICAge3sgeWVhciB9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItZm9vdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi10b2RheVwiIChjbGljayk9XCJzZWxlY3RUb2RheSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+VG9kYXk8L3NwYW4+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbGVhclwiIChjbGljayk9XCJjbGVhclBpY2tEYXRlKClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5DbGVhcjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsb3NlXCIgKGNsaWNrKT1cImNhbmNlbERhdGVQaWNrZXIoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNsb3NlPC9zcGFuPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9waWNrZXItbW9kYWw+XG5gLFxuICBzdHlsZXM6IFtgKiw6OmFmdGVyLDo6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH0ucGlja2VyLXdyYXB7d2lkdGg6OTV2dzttYXgtd2lkdGg6NjY2cHh9LnBpY2tlci1ib3h7Zm9udC1mYW1pbHk6J09wZW4gU2Fucyc7bWluLXdpZHRoOjQwMHB4IWltcG9ydGFudDtwYWRkaW5nOi42MjVyZW0gMXJlbTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LnBpY2tlci1mb290ZXIsLnBpY2tlci1oZWFkZXJ7Zm9udC1zaXplOjEuMzMzcmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtkaXNwbGF5OmZsZXg7aGVpZ2h0OjIuNXJlbTt3aWR0aDoxMDAlfS5waWNrZXItaGVhZGVyLW5hdntwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjt3aWR0aDpjYWxjKDEwMCUgLyA4KX0ucGlja2VyLWhlYWRlci1uYXY+Kntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OmF1dG87Ym90dG9tOmF1dG87bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfS5waWNrZXItaGVhZGVyLW5hdiAubmF2LW5leHQ6OmJlZm9yZSwucGlja2VyLWhlYWRlci1uYXYgLm5hdi1wcmV2OjpiZWZvcmV7Y29udGVudDpcIiBcIjtib3JkZXItdG9wOi41ZW0gc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTouNWVtIHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDouNzVlbSBzb2xpZCAjMDAwO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTpibG9jazttYXJnaW46MCBhdXRvfS5waWNrZXItaGVhZGVyLW5hdiAubmF2LW5leHQ6OmJlZm9yZXtib3JkZXItcmlnaHQ6MDtib3JkZXItbGVmdDouNzVlbSBzb2xpZCAjMDAwfS5waWNrZXItaGVhZGVyLWNvbnRlbnR7d2lkdGg6Y2FsYygxMDAlICogNiAvIDgpO3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItaGVhZGVyLWNvbnRlbnQgLm1vbnRoe2ZvbnQtc2l6ZToxLjc3OHJlbTtsaW5lLWhlaWdodDoyLjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtO2ZvbnQtd2VpZ2h0OjcwMH0ucGlja2VyLWhlYWRlci1jb250ZW50IC55ZWFye2ZvbnQtc3R5bGU6aXRhbGljO2NvbG9yOiM5OTl9LnBpY2tlci1jYWxlbmRhcnt3aWR0aDoxMDAlfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1jYWxlbmRhci1yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO3dpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTouNjI1cmVtfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci13ZWVrZGF5e2ZvbnQtd2VpZ2h0OjcwMDt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6Izk5OTt3aWR0aDpjYWxjKDEwMCUgLyA3KX0ucGlja2VyLWNhbGVuZGFyIC5waWNrZXItZGF5LC5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1tb250aCwucGlja2VyLWNhbGVuZGFyIC5waWNrZXIteWVhcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoyLjVyZW07dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6Y2FsYygxMDAlIC8gNyl9LnBpY2tlci1jYWxlbmRhciAucGlja2VyLWRheTpob3ZlciwucGlja2VyLWNhbGVuZGFyIC5waWNrZXItbW9udGg6aG92ZXIsLnBpY2tlci1jYWxlbmRhciAucGlja2VyLXllYXI6aG92ZXJ7YmFja2dyb3VuZDojYjFkY2ZifS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1c3tjb2xvcjojZGRkfS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1czpob3Zlcntjb2xvcjojMDAwfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVke2JhY2tncm91bmQ6IzAwODllYztjb2xvcjojZmZmfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVkOmhvdmVye2JhY2tncm91bmQ6IzAwODllY30ucGlja2VyLWNhbGVuZGFyIC50b2RheTo6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtyaWdodDoycHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOi41ZW0gc29saWQgIzAwNTliYztib3JkZXItbGVmdDouNWVtIHNvbGlkIHRyYW5zcGFyZW50fS5waWNrZXItZm9vdGVye2N1cnNvcjpwb2ludGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9ue3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOmNhbGMoMTAwJSAvIDMpfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2IxZGNmYn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbiAudGV4dHtwYWRkaW5nLWxlZnQ6LjhyZW19LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLXRvZGF5OjpiZWZvcmV7Y29udGVudDpcIiBcIjtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MDt3aWR0aDowfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tdG9kYXk6OmJlZm9yZXtib3JkZXItdG9wOi42NmVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjY2ZW0gc29saWQgdHJhbnNwYXJlbnR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3Jle3RvcDotLjVyZW07d2lkdGg6MXJlbTtib3JkZXItdG9wOjNweCBzb2xpZCAjZTIwfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZXt3aWR0aDoxcmVtO2hlaWdodDoxcmVtO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKSxsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX1gXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZGF5TmFtZXM6IEFycmF5PHN0cmluZz47XG5cbiAgQElucHV0KCkgcHVibGljIGluaXREYXRlOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBsb2NhbGUgPSAnZW4nO1xuICBASW5wdXQoKSBwdWJsaWMgdmlld0Zvcm1hdCA9ICdsbCc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXR1cm5PYmplY3QgPSAnanMnO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRGF0ZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNlbGVjdERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgY2FsZW5kYXJEYXRlOiBNb21lbnQ7XG4gIHB1YmxpYyBzZWxlY3RlZERhdGU6IE1vbWVudDtcbiAgcHVibGljIGN1cnJlbnRNb250aDogYW55IDtcbiAgcHVibGljIHRvZGF5OiBNb21lbnQ7XG4gIHB1YmxpYyBjdXJyZW50WWVhcjogbnVtYmVyO1xuICBwdWJsaWMgb25EaXNwbGF5TW9udGhzID0gZmFsc2U7XG4gIHB1YmxpYyBvbkRpc3BsYXlZZWFycyA9IGZhbHNlO1xuICBwdWJsaWMgZGlzcGxheVllYXJzSW5kZXggPSAwO1xuICBwdWJsaWMgZGlzcGxheVllYXJSYW5nZTogQXJyYXk8bnVtYmVyPjtcbiAgcHVibGljIGZ1bGxZZWFyUmFuZ2U6IEFycmF5PGFueT47XG4gIHB1YmxpYyBtb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPiA9IG1vbWVudC5tb250aHNTaG9ydCgpO1xuICBwdWJsaWMgY2FsZW5kYXJEYXlzOiBBcnJheTxNb21lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdFZhbHVlKCk7XG4gICAgLy8gZGVmYXVsdCB0byBjdXJyZW50IHllYXIgcmFuZ2VcbiAgICBfLmVhY2godGhpcy5mdWxsWWVhclJhbmdlLCAodiwgaSkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZigneWVhcicpLnllYXIoKTtcbiAgICAgIGlmICh2LmluZGV4T2YodGhpcy5jdXJyZW50WWVhcikgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSBpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4XTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uRGlzcGxheVllYXJzKSB7XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4LS07XG4gICAgICBpZiAodGhpcy5kaXNwbGF5WWVhcnNJbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyUmFuZ2UgPSB0aGlzLmZ1bGxZZWFyUmFuZ2VbdGhpcy5kaXNwbGF5WWVhcnNJbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnTScpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TW9udGhTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSB0cnVlO1xuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93WWVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gdHJ1ZTtcbiAgICB0aGlzLm9uRGlzcGxheU1vbnRocyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub25EaXNwbGF5WWVhcnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXgrKztcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID49IHRoaXMuZnVsbFllYXJSYW5nZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCA9IHRoaXMuZnVsbFllYXJSYW5nZS5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXgrK107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoMSwgJ00nKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0RGF5KGRheTogTW9tZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGF5c0RpZmZlcmVuY2UgPSBkYXkuZGlmZih0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RhdGUnKSwgJ2RheXMnKTtcbiAgICBkYXkgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZChkYXlzRGlmZmVyZW5jZSwgJ2QnKTtcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUoZGF5KTtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KHNlbGVjdGVkRGF5KTtcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0TW9udGgobW9udGg6IHN0cmluZykge1xuICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5tb250aChtb250aCk7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RZZWFyKHllYXI6IG51bWJlcikge1xuICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS55ZWFyKHllYXIpO1xuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RUb2RheSgpOiB2b2lkIHtcbiAgICBjb25zdCB0b2RheSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUobW9tZW50KCkpO1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQodG9kYXkpO1xuICAgIHRoaXMuY2FuY2VsRGF0ZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclBpY2tEYXRlKCk6IHZvaWQge1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobnVsbCk7XG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbERhdGVQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkRhdGVQaWNrZXJDYW5jZWwuZW1pdChmYWxzZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlWWVhcnMoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XG4gICAgY29uc3Qgc3RhcnRZciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3VidHJhY3QoMTAwLCAneScpLnllYXIoKTtcbiAgICAvLyBjb25zdCBlbmRZciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKDEwLCAneScpLnllYXIoKTtcbiAgICBjb25zdCB5ZWFycyA9IFtdO1xuICAgIGZvciAobGV0IHllYXIgPSBzdGFydFlyOyB5ZWFyIDw9IGN1cnJlbnRZZWFyOyB5ZWFyKyspIHtcbiAgICAgIHllYXJzLnB1c2goeWVhcik7XG4gICAgfVxuXG4gICAgdGhpcy5mdWxsWWVhclJhbmdlID0gXy5jaHVuayh5ZWFycywgMTQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRWYWx1ZSgpIHtcblxuICAgIC8vIHNldCBtb21lbnQgbG9jYWxlIChkZWZhdWx0IGlzIGVuKVxuICAgIG1vbWVudC5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIC8vIHNldCB0b2RheSB2YWx1ZVxuICAgIHRoaXMudG9kYXkgPSBtb21lbnQoKS5zdGFydE9mKCdkYXRlJyk7XG4gICAgdGhpcy5jdXJyZW50TW9udGggPSB0aGlzLm1vbnRoc1Nob3J0W21vbWVudCgpLm1vbnRoKCldO1xuICAgIHRoaXMuY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XG5cbiAgICAvLyBzZXQgd2VlayBkYXlzIG5hbWUgYXJyYXlcbiAgICB0aGlzLmRheU5hbWVzID0gbW9tZW50LndlZWtkYXlzU2hvcnQodHJ1ZSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgaW5pdERhdGUgaGFzIHZhbHVlXG4gICAgaWYgKHRoaXMuaW5pdERhdGUpIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnID8gbW9tZW50KHRoaXMuaW5pdERhdGUsIHRoaXMudmlld0Zvcm1hdCkgOlxuICAgICAgICBtb21lbnQodGhpcy5pbml0RGF0ZSk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignZGF0ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlWWVhcnMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJEYXlzID0gW107XG4gICAgY29uc3Qgc3RhcnQgPSAwIC0gKHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5kYXkoKSArXG4gICAgICg3IC0gbW9tZW50LmxvY2FsZURhdGEoKS5maXJzdERheU9mV2VlaygpKSkgJSA3O1xuICAgIGNvbnN0IGVuZCA9IDQxICsgc3RhcnQ7IC8vIGl0ZXJhdG9yIGVuZGluZyBwb2ludFxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBkYXkgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuYWRkKGksICdkYXlzJyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF5cy5wdXNoKGRheSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKGRheTogTW9tZW50KTogYW55IHtcbiAgICBzd2l0Y2ggKHRoaXMucmV0dXJuT2JqZWN0KSB7XG4gICAgICBjYXNlICdqcyc6XG4gICAgICAgIHJldHVybiBkYXkudG9EYXRlKCk7XG5cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBkYXkuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XG5cbiAgICAgIGNhc2UgJ21vbWVudCc6XG4gICAgICAgIHJldHVybiBkYXk7XG5cbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICByZXR1cm4gZGF5LnRvSlNPTigpO1xuXG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgIHJldHVybiBkYXkudG9BcnJheSgpO1xuXG4gICAgICBjYXNlICdpc28nOlxuICAgICAgICByZXR1cm4gZGF5LnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiBkYXkudG9PYmplY3QoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRheTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==