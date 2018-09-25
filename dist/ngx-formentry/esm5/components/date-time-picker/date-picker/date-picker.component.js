/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
import * as _ from 'lodash';
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
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
    DatePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initValue();
        // default to current year range
        _.each(this.fullYearRange, function (v, i) {
            _this.currentYear = _this.calendarDate.clone().startOf('year').year();
            if (v.indexOf(_this.currentYear) !== -1) {
                _this.displayYearsIndex = i;
            }
        });
        this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        this.generateCalendar();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showMonthSelection = /**
     * @return {?}
     */
    function () {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showYearSelection = /**
     * @return {?}
     */
    function () {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.next = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DatePickerComponent.prototype.selectDay = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        var /** @type {?} */ daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        var /** @type {?} */ selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DatePickerComponent.prototype.selectMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DatePickerComponent.prototype.selectYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.selectToday = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.clearPickDate = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.cancelDatePicker = /**
     * @return {?}
     */
    function () {
        this.onDatePickerCancel.emit(false);
        return;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.generateYears = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ currentYear = moment().year();
        var /** @type {?} */ startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        var /** @type {?} */ years = [];
        for (var /** @type {?} */ year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.initValue = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.generateCalendar = /**
     * @return {?}
     */
    function () {
        this.calendarDays = [];
        var /** @type {?} */ start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment.localeData().firstDayOfWeek())) % 7;
        var /** @type {?} */ end = 41 + start; // iterator ending point
        for (var /** @type {?} */ i = start; i <= end; i += 1) {
            var /** @type {?} */ day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DatePickerComponent.prototype.parseToReturnObjectType = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
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
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-picker',
                    template: "<picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-prev\" (click)=\"prev()\"></span>\n        </div>\n        <div class=\"picker-header-content\">\n          <div class=\"content\">\n            <span (click)=\"showMonthSelection()\" class=\"month\">{{calendarDate | moment: \"MMMM\"}}</span>\n            <span class=\"seperator\">|</span>\n            <span (click)=\"showYearSelection()\" class=\"year\">{{calendarDate | moment: \"YYYY\"}}</span>\n          </div>\n        </div>\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-next\" (click)=\"next()\"></span>\n        </div>\n      </div>\n      <div class=\"picker-calendar\">\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n          <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{ day }}</span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n                    <span class=\"picker-day\" (click)=\"selectDay(day)\" [ngClass]=\"{\n                       'out-focus': day.month() != calendarDate.month(),\n                       'today': day.isSame(today),\n                       'selected': day.isSame(selectedDate)\n                      }\" *ngFor=\"let day of calendarDays\">\n                    {{ day | moment: 'D'}}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n                    <span class=\"picker-month\" *ngFor=\"let month of monthsShort\"\n                          (click)=\"selectMonth(month)\"\n                          [ngClass]=\"{\n                       'selected': month === currentMonth\n                      }\">\n                    {{ month }}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n                    <span class=\"picker-year\" *ngFor=\"let year of displayYearRange\"\n                          (click)=\"selectYear(year)\"\n                          [ngClass]=\"{\n                       'selected': year === currentYear\n                      }\">\n                    {{ year }}\n                </span>\n        </div>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-today\" (click)=\"selectToday()\"><span class=\"text\">Today</span></div>\n        <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\"><span class=\"text\">Clear</span></div>\n        <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\"><span class=\"text\">Close</span></div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                    styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:\" \";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"],
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return []; };
    DatePickerComponent.propDecorators = {
        "initDate": [{ type: Input },],
        "locale": [{ type: Input },],
        "viewFormat": [{ type: Input },],
        "returnObject": [{ type: Input },],
        "onDatePickerCancel": [{ type: Output },],
        "onSelectDate": [{ type: Output },],
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
function DatePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DatePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DatePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DatePickerComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxxQkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOztJQWlHMUI7c0JBbkJ5QixJQUFJOzBCQUNBLElBQUk7NEJBQ0YsSUFBSTtrQ0FDRyxJQUFJLFlBQVksRUFBVzs0QkFDakMsSUFBSSxZQUFZLEVBQU87K0JBTzlCLEtBQUs7OEJBQ04sS0FBSztpQ0FDRixDQUFDOzJCQUdRLE1BQU0sQ0FBQyxXQUFXLEVBQUU7S0FJdkQ7Ozs7SUFFTSxzQ0FBUTs7Ozs7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O1FBRWpCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFB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SztnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTNCLEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXhCO2dCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDZDtLQUNGOztnQkE1UEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsNHhGQTBEWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0MUZBQXMxRixDQUFDO2lCQUNqMkY7Ozs7OzZCQU1FLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7dUNBQ0wsTUFBTTtpQ0FDTixNQUFNOzs4QkExRlQ7O1NBaUZhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXBpY2tlci5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XHJcblxyXG4vLyB3ZWJwYWNrMV9cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5jc3MnKTtcclxuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xyXG4vLyB3ZWJwYWNrMl9cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0ZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlOiBgPHBpY2tlci1tb2RhbCAob25PdmVybGF5Q2xpY2spPVwiY2FuY2VsRGF0ZVBpY2tlcigpXCI+XHJcbiAgPGRpdiBjbGFzcz1cInBpY2tlci13cmFwXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWJveFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyLW5hdlwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXYtcHJldlwiIChjbGljayk9XCJwcmV2KClcIj48L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXItY29udGVudFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInNob3dNb250aFNlbGVjdGlvbigpXCIgY2xhc3M9XCJtb250aFwiPnt7Y2FsZW5kYXJEYXRlIHwgbW9tZW50OiBcIk1NTU1cIn19PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlcGVyYXRvclwiPnw8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIChjbGljayk9XCJzaG93WWVhclNlbGVjdGlvbigpXCIgY2xhc3M9XCJ5ZWFyXCI+e3tjYWxlbmRhckRhdGUgfCBtb21lbnQ6IFwiWVlZWVwifX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlci1uYXZcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2LW5leHRcIiAoY2xpY2spPVwibmV4dCgpXCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jYWxlbmRhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY2FsZW5kYXItcm93XCIgKm5nSWY9XCIhb25EaXNwbGF5TW9udGhzICYmICFvbkRpc3BsYXlZZWFyc1wiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItd2Vla2RheVwiICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5TmFtZXNcIj57eyBkYXkgfX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jYWxlbmRhci1yb3dcIiAqbmdJZj1cIiFvbkRpc3BsYXlNb250aHMgJiYgIW9uRGlzcGxheVllYXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItZGF5XCIgKGNsaWNrKT1cInNlbGVjdERheShkYXkpXCIgW25nQ2xhc3NdPVwie1xyXG4gICAgICAgICAgICAgICAgICAgICAgICdvdXQtZm9jdXMnOiBkYXkubW9udGgoKSAhPSBjYWxlbmRhckRhdGUubW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAndG9kYXknOiBkYXkuaXNTYW1lKHRvZGF5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiBkYXkuaXNTYW1lKHNlbGVjdGVkRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgIH1cIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGNhbGVuZGFyRGF5c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGRheSB8IG1vbWVudDogJ0QnfX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwib25EaXNwbGF5TW9udGhzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaWNrZXItbW9udGhcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzU2hvcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RNb250aChtb250aClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiBtb250aCA9PT0gY3VycmVudE1vbnRoXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbW9udGggfX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNhbGVuZGFyLXJvd1wiICpuZ0lmPVwib25EaXNwbGF5WWVhcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpY2tlci15ZWFyXCIgKm5nRm9yPVwibGV0IHllYXIgb2YgZGlzcGxheVllYXJSYW5nZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFllYXIoeWVhcilcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0ZWQnOiB5ZWFyID09PSBjdXJyZW50WWVhclxyXG4gICAgICAgICAgICAgICAgICAgICAgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IHllYXIgfX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItZm9vdGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLXRvZGF5XCIgKGNsaWNrKT1cInNlbGVjdFRvZGF5KClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5Ub2RheTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY2xlYXJcIiAoY2xpY2spPVwiY2xlYXJQaWNrRGF0ZSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q2xlYXI8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsb3NlXCIgKGNsaWNrKT1cImNhbmNlbERhdGVQaWNrZXIoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNsb3NlPC9zcGFuPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3BpY2tlci1tb2RhbD5cclxuYCxcclxuICBzdHlsZXM6IFtgKiw6OmFmdGVyLDo6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH0ucGlja2VyLXdyYXB7d2lkdGg6OTV2dzttYXgtd2lkdGg6NjY2cHh9LnBpY2tlci1ib3h7Zm9udC1mYW1pbHk6J09wZW4gU2Fucyc7bWluLXdpZHRoOjQwMHB4IWltcG9ydGFudDtwYWRkaW5nOi42MjVyZW0gMXJlbTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LnBpY2tlci1mb290ZXIsLnBpY2tlci1oZWFkZXJ7Zm9udC1zaXplOjEuMzMzcmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtkaXNwbGF5OmZsZXg7aGVpZ2h0OjIuNXJlbTt3aWR0aDoxMDAlfS5waWNrZXItaGVhZGVyLW5hdntwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjt3aWR0aDpjYWxjKDEwMCUgLyA4KX0ucGlja2VyLWhlYWRlci1uYXY+Kntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OmF1dG87Ym90dG9tOmF1dG87bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfS5waWNrZXItaGVhZGVyLW5hdiAubmF2LW5leHQ6OmJlZm9yZSwucGlja2VyLWhlYWRlci1uYXYgLm5hdi1wcmV2OjpiZWZvcmV7Y29udGVudDpcIiBcIjtib3JkZXItdG9wOi41ZW0gc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWJvdHRvbTouNWVtIHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDouNzVlbSBzb2xpZCAjMDAwO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTpibG9jazttYXJnaW46MCBhdXRvfS5waWNrZXItaGVhZGVyLW5hdiAubmF2LW5leHQ6OmJlZm9yZXtib3JkZXItcmlnaHQ6MDtib3JkZXItbGVmdDouNzVlbSBzb2xpZCAjMDAwfS5waWNrZXItaGVhZGVyLWNvbnRlbnR7d2lkdGg6Y2FsYygxMDAlICogNiAvIDgpO3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItaGVhZGVyLWNvbnRlbnQgLm1vbnRoe2ZvbnQtc2l6ZToxLjc3OHJlbTtsaW5lLWhlaWdodDoyLjVyZW07bWFyZ2luLXJpZ2h0Oi41cmVtO2ZvbnQtd2VpZ2h0OjcwMH0ucGlja2VyLWhlYWRlci1jb250ZW50IC55ZWFye2ZvbnQtc3R5bGU6aXRhbGljO2NvbG9yOiM5OTl9LnBpY2tlci1jYWxlbmRhcnt3aWR0aDoxMDAlfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1jYWxlbmRhci1yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO3dpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTouNjI1cmVtfS5waWNrZXItY2FsZW5kYXIgLnBpY2tlci13ZWVrZGF5e2ZvbnQtd2VpZ2h0OjcwMDt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6Izk5OTt3aWR0aDpjYWxjKDEwMCUgLyA3KX0ucGlja2VyLWNhbGVuZGFyIC5waWNrZXItZGF5LC5waWNrZXItY2FsZW5kYXIgLnBpY2tlci1tb250aCwucGlja2VyLWNhbGVuZGFyIC5waWNrZXIteWVhcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoyLjVyZW07dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6Y2FsYygxMDAlIC8gNyl9LnBpY2tlci1jYWxlbmRhciAucGlja2VyLWRheTpob3ZlciwucGlja2VyLWNhbGVuZGFyIC5waWNrZXItbW9udGg6aG92ZXIsLnBpY2tlci1jYWxlbmRhciAucGlja2VyLXllYXI6aG92ZXJ7YmFja2dyb3VuZDojYjFkY2ZifS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1c3tjb2xvcjojZGRkfS5waWNrZXItY2FsZW5kYXIgLm91dC1mb2N1czpob3Zlcntjb2xvcjojMDAwfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVke2JhY2tncm91bmQ6IzAwODllYztjb2xvcjojZmZmfS5waWNrZXItY2FsZW5kYXIgLnNlbGVjdGVkOmhvdmVye2JhY2tncm91bmQ6IzAwODllY30ucGlja2VyLWNhbGVuZGFyIC50b2RheTo6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtyaWdodDoycHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOi41ZW0gc29saWQgIzAwNTliYztib3JkZXItbGVmdDouNWVtIHNvbGlkIHRyYW5zcGFyZW50fS5waWNrZXItZm9vdGVye2N1cnNvcjpwb2ludGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9ue3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOmNhbGMoMTAwJSAvIDMpfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2IxZGNmYn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbiAudGV4dHtwYWRkaW5nLWxlZnQ6LjhyZW19LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLXRvZGF5OjpiZWZvcmV7Y29udGVudDpcIiBcIjtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MDt3aWR0aDowfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tdG9kYXk6OmJlZm9yZXtib3JkZXItdG9wOi42NmVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjY2ZW0gc29saWQgdHJhbnNwYXJlbnR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3Jle3RvcDotLjVyZW07d2lkdGg6MXJlbTtib3JkZXItdG9wOjNweCBzb2xpZCAjZTIwfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZXt3aWR0aDoxcmVtO2hlaWdodDoxcmVtO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKSxsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX1gXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIGRheU5hbWVzOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgaW5pdERhdGU6IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgbG9jYWxlID0gJ2VuJztcclxuICBASW5wdXQoKSBwdWJsaWMgdmlld0Zvcm1hdCA9ICdsbCc7XHJcbiAgQElucHV0KCkgcHVibGljIHJldHVybk9iamVjdCA9ICdqcyc7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkRhdGVQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNlbGVjdERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHVibGljIGNhbGVuZGFyRGF0ZTogTW9tZW50O1xyXG4gIHB1YmxpYyBzZWxlY3RlZERhdGU6IE1vbWVudDtcclxuICBwdWJsaWMgY3VycmVudE1vbnRoOiBhbnkgO1xyXG4gIHB1YmxpYyB0b2RheTogTW9tZW50O1xyXG4gIHB1YmxpYyBjdXJyZW50WWVhcjogbnVtYmVyO1xyXG4gIHB1YmxpYyBvbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcclxuICBwdWJsaWMgb25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcclxuICBwdWJsaWMgZGlzcGxheVllYXJzSW5kZXggPSAwO1xyXG4gIHB1YmxpYyBkaXNwbGF5WWVhclJhbmdlOiBBcnJheTxudW1iZXI+O1xyXG4gIHB1YmxpYyBmdWxsWWVhclJhbmdlOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBtb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPiA9IG1vbWVudC5tb250aHNTaG9ydCgpO1xyXG4gIHB1YmxpYyBjYWxlbmRhckRheXM6IEFycmF5PE1vbWVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0VmFsdWUoKTtcclxuICAgIC8vIGRlZmF1bHQgdG8gY3VycmVudCB5ZWFyIHJhbmdlXHJcbiAgICBfLmVhY2godGhpcy5mdWxsWWVhclJhbmdlLCAodiwgaSkgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykueWVhcigpO1xyXG4gICAgICBpZiAodi5pbmRleE9mKHRoaXMuY3VycmVudFllYXIpICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSBpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4XTtcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXYoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vbkRpc3BsYXlZZWFycykge1xyXG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4LS07XHJcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlZZWFyc0luZGV4IDwgMCkge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnTScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd01vbnRoU2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSB0cnVlO1xyXG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dZZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkRpc3BsYXlZZWFycyA9IHRydWU7XHJcbiAgICB0aGlzLm9uRGlzcGxheU1vbnRocyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vbkRpc3BsYXlZZWFycykge1xyXG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4Kys7XHJcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID49IHRoaXMuZnVsbFllYXJSYW5nZS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID0gdGhpcy5mdWxsWWVhclJhbmdlLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXgrK107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKDEsICdNJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3REYXkoZGF5OiBNb21lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRheXNEaWZmZXJlbmNlID0gZGF5LmRpZmYodGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdGFydE9mKCdkYXRlJyksICdkYXlzJyk7XHJcbiAgICBkYXkgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZChkYXlzRGlmZmVyZW5jZSwgJ2QnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShkYXkpO1xyXG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChzZWxlY3RlZERheSk7XHJcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RNb250aChtb250aDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkubW9udGgobW9udGgpO1xyXG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdFllYXIoeWVhcjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkueWVhcih5ZWFyKTtcclxuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdFRvZGF5KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdG9kYXkgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKG1vbWVudCgpKTtcclxuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQodG9kYXkpO1xyXG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJQaWNrRGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobnVsbCk7XHJcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjYW5jZWxEYXRlUGlja2VyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkRhdGVQaWNrZXJDYW5jZWwuZW1pdChmYWxzZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVZZWFycygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgY29uc3Qgc3RhcnRZciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3VidHJhY3QoMTAwLCAneScpLnllYXIoKTtcclxuICAgIC8vIGNvbnN0IGVuZFlyID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoMTAsICd5JykueWVhcigpO1xyXG4gICAgY29uc3QgeWVhcnMgPSBbXTtcclxuICAgIGZvciAobGV0IHllYXIgPSBzdGFydFlyOyB5ZWFyIDw9IGN1cnJlbnRZZWFyOyB5ZWFyKyspIHtcclxuICAgICAgeWVhcnMucHVzaCh5ZWFyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZ1bGxZZWFyUmFuZ2UgPSBfLmNodW5rKHllYXJzLCAxNCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdFZhbHVlKCkge1xyXG5cclxuICAgIC8vIHNldCBtb21lbnQgbG9jYWxlIChkZWZhdWx0IGlzIGVuKVxyXG4gICAgbW9tZW50LmxvY2FsZSh0aGlzLmxvY2FsZSk7XHJcbiAgICAvLyBzZXQgdG9kYXkgdmFsdWVcclxuICAgIHRoaXMudG9kYXkgPSBtb21lbnQoKS5zdGFydE9mKCdkYXRlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnRNb250aCA9IHRoaXMubW9udGhzU2hvcnRbbW9tZW50KCkubW9udGgoKV07XHJcbiAgICB0aGlzLmN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xyXG5cclxuICAgIC8vIHNldCB3ZWVrIGRheXMgbmFtZSBhcnJheVxyXG4gICAgdGhpcy5kYXlOYW1lcyA9IG1vbWVudC53ZWVrZGF5c1Nob3J0KHRydWUpO1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCBpbml0RGF0ZSBoYXMgdmFsdWVcclxuICAgIGlmICh0aGlzLmluaXREYXRlKSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnID8gbW9tZW50KHRoaXMuaW5pdERhdGUsIHRoaXMudmlld0Zvcm1hdCkgOlxyXG4gICAgICAgIG1vbWVudCh0aGlzLmluaXREYXRlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RhdGUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gbW9tZW50KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdlbmVyYXRlWWVhcnMoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYWxlbmRhckRheXMgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gMCAtICh0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuZGF5KCkgK1xyXG4gICAgICg3IC0gbW9tZW50LmxvY2FsZURhdGEoKS5maXJzdERheU9mV2VlaygpKSkgJSA3O1xyXG4gICAgY29uc3QgZW5kID0gNDEgKyBzdGFydDsgLy8gaXRlcmF0b3IgZW5kaW5nIHBvaW50XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGRheSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5hZGQoaSwgJ2RheXMnKTtcclxuICAgICAgdGhpcy5jYWxlbmRhckRheXMucHVzaChkYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKGRheTogTW9tZW50KTogYW55IHtcclxuICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcclxuICAgICAgY2FzZSAnanMnOlxyXG4gICAgICAgIHJldHVybiBkYXkudG9EYXRlKCk7XHJcblxyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIHJldHVybiBkYXkuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XHJcblxyXG4gICAgICBjYXNlICdtb21lbnQnOlxyXG4gICAgICAgIHJldHVybiBkYXk7XHJcblxyXG4gICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICByZXR1cm4gZGF5LnRvSlNPTigpO1xyXG5cclxuICAgICAgY2FzZSAnYXJyYXknOlxyXG4gICAgICAgIHJldHVybiBkYXkudG9BcnJheSgpO1xyXG5cclxuICAgICAgY2FzZSAnaXNvJzpcclxuICAgICAgICByZXR1cm4gZGF5LnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIHJldHVybiBkYXkudG9PYmplY3QoKTtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGRheTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19