/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
export var /** @type {?} */ MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var NgxDateTimePickerComponent = /** @class */ (function () {
    function NgxDateTimePickerComponent() {
        this.selectedTime = moment().format('HH:mm');
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(NgxDateTimePickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modelValue;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            setTimeout(function () {
                _this.onDateChange.emit(val);
            }, 100);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.loadInitial) {
            this.setFormValues(value);
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setFormValues = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.loadInitial = true;
        this.selectedDate = moment(val).format();
        this.selectedTime = moment(val).format('HH:mm');
        if (val instanceof Date) {
            this.value = moment(val).format();
        }
        else {
            this.value = val;
        }
        this.modelValue = this.value;
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getDatePickerCssClass = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getTimePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onDateSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment($event);
        var /** @type {?} */ setTime = this.selectedTime;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onTimeSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ setTime = $event;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentTime = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(setDate, currentTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.weekSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ nextWeekDate = moment(this.selectedDate).add($event, 'weeks');
        var /** @type {?} */ nextWeekTime = this.selectedTime;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentDate = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ currentDay = moment();
        var /** @type {?} */ currentTime = moment().format('HH:mm');
        this.setDateTime(currentDay, currentTime);
    };
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setDateTime = /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    function (setDate, setTime) {
        var /** @type {?} */ newDate = moment(setDate).format('DD-MM-YYYY');
        var /** @type {?} */ newTime = setTime;
        var /** @type {?} */ newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm');
        var /** @type {?} */ dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = newTime;
        this.modelValue = dateTimeString;
        this.value = dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div class=\"form\">\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput [matDatepicker]=\"picker\" class=\"form-control\" [(ngModel)]=\"selectedDate\" placeholder=\"Choose a date\" (ngModelChange)=\"onDateSelect($event)\">\n        <mat-datepicker #picker touchUi=\"true\" disabled=\"false\"></mat-datepicker>\n        <div class=\"input-group-btn\">\n          <button class=\"btn btn-default\" (click)=\"picker.open()\">\n            <i class=\"glyphicon glyphicon-calendar\"></i>\n          </button>\n          <button class=\"btn btn-default\" (click)=\"setCurrentDate()\">\n            Set Current Date\n          </button>\n        </div>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\" class=\"form-control\" name=\"weeks\" [(ngModel)]=\"modelValue\" (ngModelChange)=\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n      <div class=\"input-group\">\n        <input type=\"time\" class=\"form-control\" atp-time-picker [(ngModel)]=\"selectedTime\" (ngModelChange)=\"onTimeSelect($event)\"\n          id=\"ngx-atp-time-picker\" />\n        <div class=\"input-group-btn\">\n          <button mat-raised-button class=\"btn btn-default\" (click)=\"setCurrentTime()\">\n            Set Current Time\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
                    styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                        { provide: DateAdapter, useClass: MomentDateAdapter },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxDateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxDateTimePickerComponent.propDecorators = {
        "weeks": [{ type: Input },],
        "modelValue": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showWeeks": [{ type: Input },],
        "onDateChange": [{ type: Output },],
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
function NgxDateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxDateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxDateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxDateTimePickerComponent.propDecorators;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedDate;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.loadInitial;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMscUJBQU0sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0osQ0FBQzs7OzRCQXNEd0IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDeEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFOzJCQUNsQixLQUFLO3FCQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzt3QkFFbEMsS0FBSzt5QkFDSixJQUFJOzRCQUNBLElB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QU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxxQkFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLHFCQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN2RSxxQkFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDOzs7Z0JBcExuQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG1uREFtQ1A7b0JBQ0gsTUFBTSxFQUFFLENBQUMsaUtBQWlLLENBQUM7b0JBQzNLLFNBQVMsRUFBRTt3QkFDUCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO3dCQUNuRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO3dCQUNyRDs0QkFDSSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBMEIsRUFBMUIsQ0FBMEIsQ0FBQzs0QkFDekQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0o7aUJBQ0o7Ozs7MEJBT0ksS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FDTCxNQUFNOztxQ0EvRVg7O1NBcUVhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICAgIHBhcnNlOiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgICAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJyxcbiAgICB9LFxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZm9ybVwiPlxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRGF0ZVwiIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIGEgZGF0ZVwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIHRvdWNoVWk9XCJ0cnVlXCIgZGlzYWJsZWQ9XCJmYWxzZVwiPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInBpY2tlci5vcGVuKClcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhclwiPjwvaT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cInNldEN1cnJlbnREYXRlKClcIj5cbiAgICAgICAgICAgIFNldCBDdXJyZW50IERhdGVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XG4gICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIlNlbGVjdCBXZWVrc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIndlZWtzXCIgWyhuZ01vZGVsKV09XCJtb2RlbFZhbHVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwid2Vla1NlbGVjdCgkZXZlbnQpXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiIFt2YWx1ZV09XCJjb3VudFwiPlxuICAgICAgICAgIHt7Y291bnR9fSBXZWVrc1xuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0VGltZVBpY2tlckNzc0NsYXNzKClcIiAqbmdJZj1cInNob3dUaW1lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0aW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdHAtdGltZS1waWNrZXIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRpbWVcIiAobmdNb2RlbENoYW5nZSk9XCJvblRpbWVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgaWQ9XCJuZ3gtYXRwLXRpbWUtcGlja2VyXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwic2V0Q3VycmVudFRpbWUoKVwiPlxuICAgICAgICAgICAgU2V0IEN1cnJlbnQgVGltZVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYCN0aW1lLXNlY3Rpb257ZGlzcGxheTppbmxpbmUtYmxvY2t9I25neC1hdHAtdGltZS1waWNrZXIsI25neC1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS50aW1lLWJ0bnttYXJnaW4tdG9wOi0yMHB4fWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNWV9GT1JNQVRTIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlciB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICAvLyBwdWJsaWMgZGF0ZSA9IG5ldyBGb3JtQ29udHJvbChtb21lbnQoKSk7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgcHVibGljIGxvYWRJbml0aWFsID0gZmFsc2U7XG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzAsIDIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IHRydWU7XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh2YWwpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRJbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvcm1WYWx1ZXModmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcm1WYWx1ZXModmFsKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkSW5pdGlhbCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBtb21lbnQodmFsKS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBtb21lbnQodmFsKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbW9tZW50KHZhbCkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2Vla1BpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tMiBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0zIGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTggZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tMTIgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tNCBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCgkZXZlbnQpO1xuICAgICAgICBjb25zdCBzZXRUaW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG5cbiAgICB9XG4gICAgcHVibGljIG9uVGltZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSAkZXZlbnQ7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEN1cnJlbnRUaW1lKCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3ZWVrU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpLmFkZCgkZXZlbnQsICd3ZWVrcycpO1xuICAgICAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShuZXh0V2Vla0RhdGUsIG5leHRXZWVrVGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEN1cnJlbnREYXRlKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gbW9tZW50KCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKGN1cnJlbnREYXksIGN1cnJlbnRUaW1lKTtcblxuXG4gICAgfVxuXG4gICAgcHVibGljIHNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudChzZXREYXRlKS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICAgICAgY29uc3QgbmV3VGltZSA9IHNldFRpbWU7XG4gICAgICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUsICdERC1NTS1ZWVlZIEhIOm1tJyk7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBuZXdUaW1lO1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuXG5cbiAgICB9XG59XG4iXX0=