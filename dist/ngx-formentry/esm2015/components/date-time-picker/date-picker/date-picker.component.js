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
                template: "<picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-prev\" (click)=\"prev()\"></span>\n        </div>\n        <div class=\"picker-header-content\">\n          <div class=\"content\">\n            <span (click)=\"showMonthSelection()\" class=\"month\">{{calendarDate | moment: \"MMMM\"}}</span>\n            <span class=\"seperator\">|</span>\n            <span (click)=\"showYearSelection()\" class=\"year\">{{calendarDate | moment: \"YYYY\"}}</span>\n          </div>\n        </div>\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-next\" (click)=\"next()\"></span>\n        </div>\n      </div>\n      <div class=\"picker-calendar\">\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n          <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{ day }}</span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n                    <span class=\"picker-day\" (click)=\"selectDay(day)\" [ngClass]=\"{\n                       'out-focus': day.month() != calendarDate.month(),\n                       'today': day.isSame(today),\n                       'selected': day.isSame(selectedDate)\n                      }\" *ngFor=\"let day of calendarDays\">\n                    {{ day | moment: 'D'}}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n                    <span class=\"picker-month\" *ngFor=\"let month of monthsShort\"\n                          (click)=\"selectMonth(month)\"\n                          [ngClass]=\"{\n                       'selected': month === currentMonth\n                      }\">\n                    {{ month }}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n                    <span class=\"picker-year\" *ngFor=\"let year of displayYearRange\"\n                          (click)=\"selectYear(year)\"\n                          [ngClass]=\"{\n                       'selected': year === currentYear\n                      }\">\n                    {{ year }}\n                </span>\n        </div>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-today\" (click)=\"selectToday()\"><span class=\"text\">Today</span></div>\n        <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\"><span class=\"text\">Clear</span></div>\n        <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\"><span class=\"text\">Close</span></div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:\" \";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
            }] }
];
/** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87QUFDdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFlNUIsTUFBTSxPQUFPLG1CQUFtQjtJQXdCOUI7UUFuQmdCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBT2pELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUd0QixnQkFBVyxHQUFrQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFJekQsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsZ0NBQWdDO1FBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxD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LFFBQVEsRUFBRSxDQUFDO1lBRXhCO2dCQUNFLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7WUFsTUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixzeUZBQTJDOzthQUU1Qzs7Ozs7dUJBTUUsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxNQUFNOzJCQUNOLE1BQU07Ozs7SUFQUCx1Q0FBK0I7O0lBRS9CLHVDQUE4Qjs7SUFDOUIscUNBQThCOztJQUM5Qix5Q0FBa0M7O0lBQ2xDLDJDQUFvQzs7SUFDcEMsaURBQWtFOztJQUNsRSwyQ0FBd0Q7O0lBRXhELDJDQUE0Qjs7SUFDNUIsMkNBQTRCOztJQUM1QiwyQ0FBMEI7O0lBQzFCLG9DQUFxQjs7SUFDckIsMENBQTJCOztJQUMzQiw4Q0FBK0I7O0lBQy9CLDZDQUE4Qjs7SUFDOUIsZ0RBQTZCOztJQUM3QiwrQ0FBdUM7O0lBQ3ZDLDRDQUFpQzs7SUFDakMsMENBQXlEOztJQUN6RCwyQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50LmNzcyddLFxufSlcblxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBkYXlOYW1lczogQXJyYXk8c3RyaW5nPjtcblxuICBASW5wdXQoKSBwdWJsaWMgaW5pdERhdGU6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGxvY2FsZSA9ICdlbic7XG4gIEBJbnB1dCgpIHB1YmxpYyB2aWV3Rm9ybWF0ID0gJ2xsJztcbiAgQElucHV0KCkgcHVibGljIHJldHVybk9iamVjdCA9ICdqcyc7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25EYXRlUGlja2VyQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uU2VsZWN0RGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBjYWxlbmRhckRhdGU6IE1vbWVudDtcbiAgcHVibGljIHNlbGVjdGVkRGF0ZTogTW9tZW50O1xuICBwdWJsaWMgY3VycmVudE1vbnRoOiBhbnkgO1xuICBwdWJsaWMgdG9kYXk6IE1vbWVudDtcbiAgcHVibGljIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gIHB1YmxpYyBvbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgcHVibGljIG9uRGlzcGxheVllYXJzID0gZmFsc2U7XG4gIHB1YmxpYyBkaXNwbGF5WWVhcnNJbmRleCA9IDA7XG4gIHB1YmxpYyBkaXNwbGF5WWVhclJhbmdlOiBBcnJheTxudW1iZXI+O1xuICBwdWJsaWMgZnVsbFllYXJSYW5nZTogQXJyYXk8YW55PjtcbiAgcHVibGljIG1vbnRoc1Nob3J0OiBBcnJheTxzdHJpbmc+ID0gbW9tZW50Lm1vbnRoc1Nob3J0KCk7XG4gIHB1YmxpYyBjYWxlbmRhckRheXM6IEFycmF5PE1vbWVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0VmFsdWUoKTtcbiAgICAvLyBkZWZhdWx0IHRvIGN1cnJlbnQgeWVhciByYW5nZVxuICAgIF8uZWFjaCh0aGlzLmZ1bGxZZWFyUmFuZ2UsICh2LCBpKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykueWVhcigpO1xuICAgICAgaWYgKHYuaW5kZXhPZih0aGlzLmN1cnJlbnRZZWFyKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXhdO1xuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub25EaXNwbGF5WWVhcnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXgtLTtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlZZWFyc0luZGV4IDwgMCkge1xuICAgICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdNJyk7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNob3dNb250aFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGlzcGxheU1vbnRocyA9IHRydWU7XG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNob3dZZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSB0cnVlO1xuICAgIHRoaXMub25EaXNwbGF5TW9udGhzID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vbkRpc3BsYXlZZWFycykge1xuICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCsrO1xuICAgICAgaWYgKHRoaXMuZGlzcGxheVllYXJzSW5kZXggPj0gdGhpcy5mdWxsWWVhclJhbmdlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID0gdGhpcy5mdWxsWWVhclJhbmdlLmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyUmFuZ2UgPSB0aGlzLmZ1bGxZZWFyUmFuZ2VbdGhpcy5kaXNwbGF5WWVhcnNJbmRleCsrXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZCgxLCAnTScpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3REYXkoZGF5OiBNb21lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkYXlzRGlmZmVyZW5jZSA9IGRheS5kaWZmKHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignZGF0ZScpLCAnZGF5cycpO1xuICAgIGRheSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKGRheXNEaWZmZXJlbmNlLCAnZCcpO1xuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShkYXkpO1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQoc2VsZWN0ZWREYXkpO1xuICAgIHRoaXMuY2FuY2VsRGF0ZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNb250aChtb250aDogc3RyaW5nKSB7XG4gICAgdGhpcy5jYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLm1vbnRoKG1vbnRoKTtcbiAgICB0aGlzLm9uRGlzcGxheU1vbnRocyA9IGZhbHNlO1xuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFllYXIoeWVhcjogbnVtYmVyKSB7XG4gICAgdGhpcy5jYWxlbmRhckRhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnllYXIoeWVhcik7XG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IGZhbHNlO1xuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFRvZGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHRvZGF5ID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShtb21lbnQoKSk7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdCh0b2RheSk7XG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUGlja0RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChudWxsKTtcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsRGF0ZVBpY2tlcigpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGF0ZVBpY2tlckNhbmNlbC5lbWl0KGZhbHNlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVZZWFycygpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IG1vbWVudCgpLnllYXIoKTtcbiAgICBjb25zdCBzdGFydFlyID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxMDAsICd5JykueWVhcigpO1xuICAgIC8vIGNvbnN0IGVuZFlyID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoMTAsICd5JykueWVhcigpO1xuICAgIGNvbnN0IHllYXJzID0gW107XG4gICAgZm9yIChsZXQgeWVhciA9IHN0YXJ0WXI7IHllYXIgPD0gY3VycmVudFllYXI7IHllYXIrKykge1xuICAgICAgeWVhcnMucHVzaCh5ZWFyKTtcbiAgICB9XG5cbiAgICB0aGlzLmZ1bGxZZWFyUmFuZ2UgPSBfLmNodW5rKHllYXJzLCAxNCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdFZhbHVlKCkge1xuXG4gICAgLy8gc2V0IG1vbWVudCBsb2NhbGUgKGRlZmF1bHQgaXMgZW4pXG4gICAgbW9tZW50LmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgLy8gc2V0IHRvZGF5IHZhbHVlXG4gICAgdGhpcy50b2RheSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RhdGUnKTtcbiAgICB0aGlzLmN1cnJlbnRNb250aCA9IHRoaXMubW9udGhzU2hvcnRbbW9tZW50KCkubW9udGgoKV07XG4gICAgdGhpcy5jdXJyZW50WWVhciA9IG1vbWVudCgpLnllYXIoKTtcblxuICAgIC8vIHNldCB3ZWVrIGRheXMgbmFtZSBhcnJheVxuICAgIHRoaXMuZGF5TmFtZXMgPSBtb21lbnQud2Vla2RheXNTaG9ydCh0cnVlKTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCBpbml0RGF0ZSBoYXMgdmFsdWVcbiAgICBpZiAodGhpcy5pbml0RGF0ZSkge1xuICAgICAgdGhpcy5jYWxlbmRhckRhdGUgPSB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZycgPyBtb21lbnQodGhpcy5pbml0RGF0ZSwgdGhpcy52aWV3Rm9ybWF0KSA6XG4gICAgICAgIG1vbWVudCh0aGlzLmluaXREYXRlKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdkYXRlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gbW9tZW50KCk7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVZZWFycygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxlbmRhckRheXMgPSBbXTtcbiAgICBjb25zdCBzdGFydCA9IDAgLSAodGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLmRheSgpICtcbiAgICAgKDcgLSBtb21lbnQubG9jYWxlRGF0YSgpLmZpcnN0RGF5T2ZXZWVrKCkpKSAlIDc7XG4gICAgY29uc3QgZW5kID0gNDEgKyBzdGFydDsgLy8gaXRlcmF0b3IgZW5kaW5nIHBvaW50XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGRheSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5hZGQoaSwgJ2RheXMnKTtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXlzLnB1c2goZGF5KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VUb1JldHVybk9iamVjdFR5cGUoZGF5OiBNb21lbnQpOiBhbnkge1xuICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcbiAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgcmV0dXJuIGRheS50b0RhdGUoKTtcblxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIGRheS5mb3JtYXQodGhpcy52aWV3Rm9ybWF0KTtcblxuICAgICAgY2FzZSAnbW9tZW50JzpcbiAgICAgICAgcmV0dXJuIGRheTtcblxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHJldHVybiBkYXkudG9KU09OKCk7XG5cbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgcmV0dXJuIGRheS50b0FycmF5KCk7XG5cbiAgICAgIGNhc2UgJ2lzbyc6XG4gICAgICAgIHJldHVybiBkYXkudG9JU09TdHJpbmcoKTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIGRheS50b09iamVjdCgpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cbiAgfVxufVxuIl19