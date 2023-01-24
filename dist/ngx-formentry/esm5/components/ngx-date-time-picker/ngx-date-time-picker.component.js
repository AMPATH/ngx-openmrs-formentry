import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
var moment = moment_;
export var MY_FORMATS = {
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
var NgxDateTimePickerComponent = /** @class */ (function () {
    function NgxDateTimePickerComponent() {
        // public date = new FormControl(moment());
        this.selectedTime = moment().format();
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.showTimePicker = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    NgxDateTimePickerComponent.prototype.ngOnInit = function () { };
    NgxDateTimePickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    NgxDateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NgxDateTimePickerComponent.prototype.registerOnTouched = function (fn) { };
    NgxDateTimePickerComponent.prototype.onTimeSelect = function ($event) {
        var setDate = moment(this.selectedDate);
        var setTime = $event;
        this.setDateTime(setDate, setTime);
    };
    NgxDateTimePickerComponent.prototype.onDateSelect = function ($event) {
        var setDate = moment($event.value);
        var setTime = this.selectedTime;
        var dateString = this.setDateTime(setDate, setTime);
        var selectedDate = $event.value;
        this.value = dateString;
    };
    NgxDateTimePickerComponent.prototype.toggleTimePicker = function (status) {
        this.showTimePicker = status;
        return;
    };
    NgxDateTimePickerComponent.prototype.setCurrentTime = function () {
        var setDate = moment(this.selectedDate);
        var currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    };
    NgxDateTimePickerComponent.prototype.weekSelect = function ($event) {
        var dateToUse = moment().format();
        var nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        var nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    NgxDateTimePickerComponent.prototype.selectionChange = function ($event) {
        console.log('Week selected', $event);
    };
    NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = function () {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    };
    NgxDateTimePickerComponent.prototype.getDatePickerCssClass = function () {
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
    NgxDateTimePickerComponent.prototype.getTimePickerCssClass = function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    };
    NgxDateTimePickerComponent.prototype.setDateTime = function (setDate, setTime) {
        var newDate = moment(setDate).format('DD-MM-YYYY');
        var newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        var newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        var dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input\n          matInput\n          [matDatepicker]=\"picker\"\n          class=\"form-control\"\n          [value]=\"value\"\n          placeholder=\"Choose a date\"\n          (dateChange)=\"onDateSelect($event)\"\n          (click)=\"picker.open()\"\n          readonly\n        />\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle\n          matSuffix\n          [for]=\"picker\"\n          class=\"input-group-btn\"\n        ></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select\n        placeholder=\"Select Weeks\"\n        class=\"form-control\"\n        name=\"weeks\"\n        (selectionChange)=\"weekSelect($event)\"\n      >\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{ count }} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        [value]=\"value | date: 'shortTime'\"\n        (focus)=\"toggleTimePicker(true)\"\n        readonly\n        placeholder=\"Select Time\"\n      />\n      <time-picker\n        *ngIf=\"showTimePicker\"\n        [initTime]=\"value\"\n        [use12Hour]=\"true\"\n        (onSelectTime)=\"onTimeSelect($event)\"\n        (onTimePickerCancel)=\"toggleTimePicker($event)\"\n      ></time-picker>\n    </div>\n  </div>\n</div>\n",
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
    NgxDateTimePickerComponent.propDecorators = {
        weeks: [{ type: Input }],
        modelValue: [{ type: Input }],
        showTime: [{ type: Input }],
        showWeeks: [{ type: Input }],
        onDateChange: [{ type: Output }]
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25neC1kYXRlLXRpbWUtcGlja2VyL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUc7SUFDeEIsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7S0FDaEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsSUFBSTtRQUNmLGNBQWMsRUFBRSxVQUFVO1FBQzFCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGtCQUFrQixFQUFFLFdBQVc7S0FDaEM7Q0FDRixDQUFDO0FBRUY7SUFBQTtRQXFFRSwyQ0FBMkM7UUFDcEMsaUJBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxD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cUIsQ0FBQyxDQUFDO1FBQzFFLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7O2dCQXBMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG1sREFxRFg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsaUtBQWlLLENBQUM7b0JBQzNLLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO3dCQUNuRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO3dCQUNyRDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBMEIsRUFBMUIsQ0FBMEIsQ0FBQzs0QkFDekQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7Ozt3QkFTRSxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLE1BQU07O0lBc0dULGlDQUFDO0NBQUEsQUFyTEQsSUFxTEM7U0FsSFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIEZvcm1Db250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICBwYXJzZToge1xuICAgIGRhdGVJbnB1dDogJ0xMJ1xuICB9LFxuICBkaXNwbGF5OiB7XG4gICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgIG1vbnRoWWVhckxhYmVsOiAnTU1NIFlZWVknLFxuICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXG4gICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJ1xuICB9XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgW2NsYXNzXT1cImdldERhdGVQaWNrZXJDc3NDbGFzcygpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIGEgZGF0ZVwiXG4gICAgICAgICAgKGRhdGVDaGFuZ2UpPVwib25EYXRlU2VsZWN0KCRldmVudClcIlxuICAgICAgICAgIChjbGljayk9XCJwaWNrZXIub3BlbigpXCJcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICAvPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlciBkaXNhYmxlZD1cImZhbHNlXCI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZVxuICAgICAgICAgIG1hdFN1ZmZpeFxuICAgICAgICAgIFtmb3JdPVwicGlja2VyXCJcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiXG4gICAgICAgID48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFdlZWtQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93V2Vla3NcIj5cbiAgICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFdlZWtzXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBuYW1lPVwid2Vla3NcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIndlZWtTZWxlY3QoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiIFt2YWx1ZV09XCJjb3VudFwiPlxuICAgICAgICAgIHt7IGNvdW50IH19IFdlZWtzXG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1RpbWVcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ3Nob3J0VGltZSdcIlxuICAgICAgICAoZm9jdXMpPVwidG9nZ2xlVGltZVBpY2tlcih0cnVlKVwiXG4gICAgICAgIHJlYWRvbmx5XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFRpbWVcIlxuICAgICAgLz5cbiAgICAgIDx0aW1lLXBpY2tlclxuICAgICAgICAqbmdJZj1cInNob3dUaW1lUGlja2VyXCJcbiAgICAgICAgW2luaXRUaW1lXT1cInZhbHVlXCJcbiAgICAgICAgW3VzZTEySG91cl09XCJ0cnVlXCJcbiAgICAgICAgKG9uU2VsZWN0VGltZSk9XCJvblRpbWVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgIChvblRpbWVQaWNrZXJDYW5jZWwpPVwidG9nZ2xlVGltZVBpY2tlcigkZXZlbnQpXCJcbiAgICAgID48L3RpbWUtcGlja2VyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYCN0aW1lLXNlY3Rpb257ZGlzcGxheTppbmxpbmUtYmxvY2t9I25neC1hdHAtdGltZS1waWNrZXIsI25neC1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS50aW1lLWJ0bnttYXJnaW4tdG9wOi0yMHB4fWBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNWV9GT1JNQVRTIH0sXG4gICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBwdWJsaWMgZGF0ZSA9IG5ldyBGb3JtQ29udHJvbChtb21lbnQoKSk7XG4gIHB1YmxpYyBzZWxlY3RlZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgcHVibGljIHNlbGVjdGVkRGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgcHVibGljIHZhbHVlO1xuICBwdWJsaWMgc2hvd1RpbWVQaWNrZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzAsIDIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHNob3dUaW1lID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dXZWVrcyA9IHRydWU7XG4gIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcbiAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbikge31cblxuICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xuICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgIGNvbnN0IHNldFRpbWUgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCgkZXZlbnQudmFsdWUpO1xuICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9ICRldmVudC52YWx1ZTtcbiAgICB0aGlzLnZhbHVlID0gZGF0ZVN0cmluZztcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2hvd1RpbWVQaWNrZXIgPSBzdGF0dXM7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIHNldEN1cnJlbnRUaW1lKCkge1xuICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgY3VycmVudFRpbWUpO1xuICB9XG5cbiAgcHVibGljIHdlZWtTZWxlY3QoJGV2ZW50KSB7XG4gICAgY29uc3QgZGF0ZVRvVXNlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgY29uc3QgbmV4dFdlZWtEYXRlID0gbW9tZW50KGRhdGVUb1VzZSkuYWRkKCRldmVudC52YWx1ZSwgJ3dlZWtzJyk7XG4gICAgY29uc3QgbmV4dFdlZWtUaW1lID0gZGF0ZVRvVXNlO1xuICAgIHRoaXMuc2V0RGF0ZVRpbWUobmV4dFdlZWtEYXRlLCBuZXh0V2Vla1RpbWUpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnV2VlayBzZWxlY3RlZCcsICRldmVudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0V2Vla1BpY2tlckNzc0NsYXNzKCkge1xuICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICByZXR1cm4gJ2NvbC1zbS0yIGZvcm0tZ3JvdXAnO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbC1zbS0zIGZvcm0tZ3JvdXAnO1xuICB9XG5cbiAgcHVibGljIGdldERhdGVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvd1RpbWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTggZm9ybS1ncm91cCc7XG4gICAgfVxuICAgIHJldHVybiAnY29sLXNtLTEyIGZvcm0tZ3JvdXAnO1xuICB9XG5cbiAgcHVibGljIGdldFRpbWVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgfVxuICAgIHJldHVybiAnY29sLXNtLTQgZm9ybS1ncm91cCc7XG4gIH1cblxuICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xuICAgIGNvbnN0IG5ld0RhdGUgPSBtb21lbnQoc2V0RGF0ZSkuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgbGV0IG5ld1RpbWU7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgIG5ld1RpbWUgPSBtb21lbnQoc2V0VGltZSkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUaW1lID0gJzAwOjAwOjAwJztcbiAgICB9XG4gICAgY29uc3QgbmV3RGF0ZVRpbWUgPSBtb21lbnQobmV3RGF0ZSArICcnICsgbmV3VGltZSwgJ0RELU1NLVlZWVkgSEg6bW06c3MnKTtcbiAgICBjb25zdCBkYXRlVGltZVN0cmluZyA9IG1vbWVudChuZXdEYXRlVGltZSkuZm9ybWF0KCk7XG4gICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcbiAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgIHRoaXMudmFsdWUgPSBkYXRlVGltZVN0cmluZztcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgcmV0dXJuIGRhdGVUaW1lU3RyaW5nO1xuICB9XG59XG4iXX0=