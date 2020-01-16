import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
var moment = moment_;
export var MY_FORMATS = {
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
    NgxDateTimePickerComponent_1 = NgxDateTimePickerComponent;
    NgxDateTimePickerComponent.prototype.ngOnInit = function () {
    };
    NgxDateTimePickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    NgxDateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NgxDateTimePickerComponent.prototype.registerOnTouched = function (fn) {
    };
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
    var NgxDateTimePickerComponent_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NgxDateTimePickerComponent.prototype, "weeks", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgxDateTimePickerComponent.prototype, "modelValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgxDateTimePickerComponent.prototype, "showTime", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgxDateTimePickerComponent.prototype, "showWeeks", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgxDateTimePickerComponent.prototype, "onDateChange", void 0);
    NgxDateTimePickerComponent = NgxDateTimePickerComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'ngx-date-time-picker',
            template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput \n              [matDatepicker]=\"picker\" \n              class=\"form-control\" \n              [value]=\"value\" \n              placeholder=\"Choose a date\" \n              (dateChange)=\"onDateSelect($event)\"\n              (click)=\"picker.open()\"\n              readonly\n        >\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"input-group-btn\"></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\"  class=\"form-control\" name=\"weeks\" (selectionChange) =\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n          <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n          />\n          <time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"onTimeSelect($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n    </div>\n  </div>\n</div>\n\n",
            providers: [
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                { provide: DateAdapter, useClass: MomentDateAdapter },
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NgxDateTimePickerComponent_1; }),
                    multi: true
                }
            ],
            styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"]
        })
    ], NgxDateTimePickerComponent);
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25neC1kYXRlLXRpbWUtcGlja2VyL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF3QixpQkFBaUIsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0osQ0FBQztBQWdCRjtJQWRBO1FBZ0JJLDJDQUEyQztRQUNwQyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDckIsVUFBSyxHQUFhLENBQUMsQ0FBQyxFQUFF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O1FBRTFCLE9BQU8sY0FBYyxDQUFDO0lBRzFCLENBQUM7O0lBckhRO1FBQVIsS0FBSyxFQUFFOzs2REFBK0M7SUFDOUM7UUFBUixLQUFLLEVBQUU7O2tFQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7Z0VBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOztpRUFBa0I7SUFDaEI7UUFBVCxNQUFNLEVBQUU7O29FQUF3QztJQVp4QywwQkFBMEI7UUFkdEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyw4N0NBQW9EO1lBRXBELFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO2dCQUNuRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO2dCQUNyRDtvQkFDSSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSw0QkFBMEIsRUFBMUIsQ0FBMEIsQ0FBQztvQkFDekQsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjs7U0FDSixDQUFDO09BQ1csMEJBQTBCLENBOEh0QztJQUFELGlDQUFDO0NBQUEsQUE5SEQsSUE4SEM7U0E5SFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1tb21lbnQtYWRhcHRlcic7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5leHBvcnQgY29uc3QgTVlfRk9STUFUUyA9IHtcbiAgICBwYXJzZToge1xuICAgICAgICBkYXRlSW5wdXQ6ICdMTCcsXG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyTGFiZWw6ICdNTU0gWVlZWScsXG4gICAgICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXG4gICAgICAgIG1vbnRoWWVhckExMXlMYWJlbDogJ01NTU0gWVlZWScsXG4gICAgfSxcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmNzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNWV9GT1JNQVRTIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlciB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICAvLyBwdWJsaWMgZGF0ZSA9IG5ldyBGb3JtQ29udHJvbChtb21lbnQoKSk7XG4gICAgcHVibGljIHNlbGVjdGVkVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgICBwdWJsaWMgdmFsdWU7XG4gICAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzAsIDIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IHRydWU7XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xuXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50LnZhbHVlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGUgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlU3RyaW5nO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1RpbWVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXRDdXJyZW50VGltZSgpIHtcblxuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3ZWVrU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBkYXRlVG9Vc2UgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWtEYXRlID0gbW9tZW50KGRhdGVUb1VzZSkuYWRkKCRldmVudC52YWx1ZSwgJ3dlZWtzJyk7XG4gICAgICAgIGNvbnN0IG5leHRXZWVrVGltZSA9IGRhdGVUb1VzZTtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShuZXh0V2Vla0RhdGUsIG5leHRXZWVrVGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlZWsgc2VsZWN0ZWQnLCAkZXZlbnQpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGdldFdlZWtQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTIgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tMyBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS04IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTEyIGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTQgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudChzZXREYXRlKS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICAgICAgbGV0IG5ld1RpbWU7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gbW9tZW50KHNldFRpbWUpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSAnMDA6MDA6MDAnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUsICdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBkYXRlVGltZVN0cmluZztcblxuXG4gICAgfVxufVxuIl19