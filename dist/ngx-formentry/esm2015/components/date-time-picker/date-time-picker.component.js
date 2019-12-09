var DateTimePickerComponent_1;
import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
const Moment = moment_;
let DateTimePickerComponent = DateTimePickerComponent_1 = class DateTimePickerComponent {
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateTimePickerComponent.prototype, "modelValue", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showWeeks", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], DateTimePickerComponent.prototype, "weeks", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], DateTimePickerComponent.prototype, "onDateChange", void 0);
DateTimePickerComponent = DateTimePickerComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'date-time-picker',
        template: "<div class='row'>\n    <div *ngIf=\"!showTime\" class='col-xs-12 col-md-12'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-8 col-md-8'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-4 col-md-4'>\n        <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n        />\n    </div>\n</div>\n<date-picker *ngIf=\"showDatePicker\" [initDate]=\"value\" (onSelectDate)=\"setDate($event)\" (onDatePickerCancel)=\"toggleDatePicker($event)\"></date-picker>\n\n<time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"setTime($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DateTimePickerComponent_1),
                multi: true
            }
        ],
        styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DateTimePickerComponent);
export { DateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBY3ZCLElBQWEsdUJBQXVCLCtCQUFwQyxNQUFhLHVCQUF1QjtJQVloQztRQVZTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFHM0IsQ0FBQztJQUVELFFBQVEsS0FBSyxDQUFDO0lBRWQsYUFBYSxDQUFDLEtBQUs7UUFDZixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQVM7UUFDYixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RDO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUVMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBUztRQUNiLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEM7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFlO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQzdCOzs7Ozs7Ozs7Z0JBU1E7UUFDUixPQUFPO0lBQ1QsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWU7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDN0IsT0FBTztJQUNYLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEdBQUc7UUFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNaLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN2QzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXBGWTtJQUFSLEtBQUssRUFBRTs7MkRBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzt5REFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7O3lEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs7MERBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztzREFBNEM7QUFDMUM7SUFBVCxNQUFNLEVBQUU7OzZEQUF3QztBQU54Qyx1QkFBdUI7SUFabkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QiwwbEZBQWdEO1FBRWhELFNBQVMsRUFBRTtZQUNQO2dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXVCLENBQUM7Z0JBQ3RELEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSjs7S0FDSixDQUFDOztHQUNXLHVCQUF1QixDQXFGbkM7U0FyRlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBNb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5jc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93RGF0ZSA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBzaG93RGF0ZVBpY2tlciA9IGZhbHNlO1xuICAgIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgd2Vla3NTZWxlY3RlZChjb3VudCkge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBuZXh0RGF0ZSA9IG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgKyBjb3VudCAqIDcpO1xuICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KG5leHREYXRlKS5mb3JtYXQoKTtcbiAgICB9XG4gICAgc2V0RGF0ZShkYXRlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQoZGF0ZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZSh0aW1lOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRpbWUgJiYgdGltZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodGltZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlRGF0ZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAvKnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBfYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LXdyYXBwZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24tbW9kYWwtbWFpbicpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGxldCBlbGVtQm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoZWxlbUJveC5ib3R0b20gPiBfYm9keS5ib3R0b20pIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gJzM2cHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMCk7Ki9cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh2YWwpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodmFsdWUpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19