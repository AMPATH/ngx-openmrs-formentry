import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
var Moment = moment_;
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    DateTimePickerComponent_1 = DateTimePickerComponent;
    DateTimePickerComponent.prototype.ngOnInit = function () { };
    DateTimePickerComponent.prototype.weeksSelected = function (count) {
        var now = new Date();
        var nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    };
    DateTimePickerComponent.prototype.setDate = function (date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    };
    DateTimePickerComponent.prototype.setTime = function (time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    };
    DateTimePickerComponent.prototype.toggleDatePicker = function (status) {
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
    };
    DateTimePickerComponent.prototype.toggleTimePicker = function (status) {
        this.showTimePicker = status;
        return;
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: function () {
            return this.modelValue;
        },
        set: function (val) {
            this.modelValue = val;
            this.onDateChange.emit(val);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DateTimePickerComponent.prototype.writeValue = function (value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    };
    var DateTimePickerComponent_1;
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
                    useExisting: forwardRef(function () { return DateTimePickerComponent_1; }),
                    multi: true
                }
            ],
            styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFjdkI7SUFZSTtRQVZTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVEsY0FBUSxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFRLGNBQVEsQ0FBQyxDQUFDO0lBRzNCLENBQUM7Z0NBYlEsdUJBQXVCO0lBZWhDLDBDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsK0NBQWEsR0FBYixVQUFjLEtBQUs7UUFDZixJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxH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LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBNb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RhdGUtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5jc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93RGF0ZSA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3ZWVrczogbnVtYmVyW10gPSBbMiwgNCwgNiwgOCwgMTIsIDE2LCAyNF07XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBzaG93RGF0ZVBpY2tlciA9IGZhbHNlO1xuICAgIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgd2Vla3NTZWxlY3RlZChjb3VudCkge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBuZXh0RGF0ZSA9IG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgKyBjb3VudCAqIDcpO1xuICAgICAgICB0aGlzLnZhbHVlID0gTW9tZW50KG5leHREYXRlKS5mb3JtYXQoKTtcbiAgICB9XG4gICAgc2V0RGF0ZShkYXRlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQoZGF0ZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZSh0aW1lOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRpbWUgJiYgdGltZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodGltZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlRGF0ZVBpY2tlcihzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIHRoaXMuc2hvd0RhdGVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAvKnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBfYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LXdyYXBwZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24tbW9kYWwtbWFpbicpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGxldCBlbGVtQm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoZWxlbUJveC5ib3R0b20gPiBfYm9keS5ib3R0b20pIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gJzM2cHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMCk7Ki9cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsKSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZSA9IHZhbDtcbiAgICAgICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh2YWwpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodmFsdWUpLmZvcm1hdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19