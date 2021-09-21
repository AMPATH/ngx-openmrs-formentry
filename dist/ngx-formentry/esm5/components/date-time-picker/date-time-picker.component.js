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
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-time-picker',
                    template: "<div class=\"row\">\n  <div *ngIf=\"!showTime\" class=\"col-xs-12 col-md-12\">\n    <input\n      *ngIf=\"!showWeeks\"\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'mediumDate'\"\n      (focus)=\"toggleDatePicker(true)\"\n      readonly\n      placeholder=\"Select Date\"\n    />\n    <div *ngIf=\"showWeeks\" class=\"input-group\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        class=\"form-control\"\n        [value]=\"value | date: 'mediumDate'\"\n        (focus)=\"toggleDatePicker(true)\"\n        readonly\n        placeholder=\"Select Date\"\n      />\n      <div class=\"input-group-btn\">\n        <button\n          type=\"button\"\n          class=\"btn btn-default dropdown-toggle\"\n          data-toggle=\"dropdown\"\n          aria-haspopup=\"true\"\n          aria-expanded=\"false\"\n        >\n          Weeks <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu up\">\n          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\">\n            <span> {{ count }} Weeks</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"showTime\" class=\"col-xs-8 col-md-8\">\n    <input\n      *ngIf=\"!showWeeks\"\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'mediumDate'\"\n      (focus)=\"toggleDatePicker(true)\"\n      readonly\n      placeholder=\"Select Date\"\n    />\n    <div *ngIf=\"showWeeks\" class=\"input-group\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        class=\"form-control\"\n        [value]=\"value | date: 'mediumDate'\"\n        (focus)=\"toggleDatePicker(true)\"\n        readonly\n        placeholder=\"Select Date\"\n      />\n      <div class=\"input-group-btn\">\n        <button\n          type=\"button\"\n          class=\"btn btn-default dropdown-toggle\"\n          data-toggle=\"dropdown\"\n          aria-haspopup=\"true\"\n          aria-expanded=\"false\"\n        >\n          Weeks <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu up\">\n          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\">\n            <span> {{ count }} Weeks</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"showTime\" class=\"col-xs-4 col-md-4\">\n    <input\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'shortTime'\"\n      (focus)=\"toggleTimePicker(true)\"\n      readonly\n      placeholder=\"Select Time\"\n    />\n  </div>\n</div>\n<date-picker\n  *ngIf=\"showDatePicker\"\n  [initDate]=\"value\"\n  (onSelectDate)=\"setDate($event)\"\n  (onDatePickerCancel)=\"toggleDatePicker($event)\"\n></date-picker>\n\n<time-picker\n  *ngIf=\"showTimePicker\"\n  [initTime]=\"value\"\n  [use12Hour]=\"true\"\n  (onSelectTime)=\"setTime($event)\"\n  (onTimePickerCancel)=\"toggleTimePicker($event)\"\n></time-picker>\n",
                    styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    DateTimePickerComponent.ctorParameters = function () { return []; };
    DateTimePickerComponent.propDecorators = {
        modelValue: [{ type: Input }],
        showDate: [{ type: Input }],
        showTime: [{ type: Input }],
        showWeeks: [{ type: Input }],
        weeks: [{ type: Input }],
        onDateChange: [{ type: Output }]
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QjtJQThIRTtRQVZTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxQyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVEsY0FBTyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFRLGNBQU8sQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUVoQiwwQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLCtDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2pCLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxHQUFH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dCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBNb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRlLXRpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm93XCI+XG4gIDxkaXYgKm5nSWY9XCIhc2hvd1RpbWVcIiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtMTJcIj5cbiAgICA8aW5wdXRcbiAgICAgICpuZ0lmPVwiIXNob3dXZWVrc1wiXG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIlxuICAgICAgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgcmVhZG9ubHlcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIlxuICAgIC8+XG4gICAgPGRpdiAqbmdJZj1cInNob3dXZWVrc1wiIGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbdmFsdWVdPVwidmFsdWUgfCBkYXRlOiAnbWVkaXVtRGF0ZSdcIlxuICAgICAgICAoZm9jdXMpPVwidG9nZ2xlRGF0ZVBpY2tlcih0cnVlKVwiXG4gICAgICAgIHJlYWRvbmx5XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiXG4gICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgID5cbiAgICAgICAgICBXZWVrcyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSB1cFwiPlxuICAgICAgICAgIDxsaSAoY2xpY2spPVwid2Vla3NTZWxlY3RlZChjb3VudClcIiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIj5cbiAgICAgICAgICAgIDxzcGFuPiB7eyBjb3VudCB9fSBXZWVrczwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwic2hvd1RpbWVcIiBjbGFzcz1cImNvbC14cy04IGNvbC1tZC04XCI+XG4gICAgPGlucHV0XG4gICAgICAqbmdJZj1cIiFzaG93V2Vla3NcIlxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCJcbiAgICAgIChmb2N1cyk9XCJ0b2dnbGVEYXRlUGlja2VyKHRydWUpXCJcbiAgICAgIHJlYWRvbmx5XG4gICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCJcbiAgICAvPlxuICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla3NcIiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCJcbiAgICAgICAgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICByZWFkb25seVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBEYXRlXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIlxuICAgICAgICAgIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICA+XG4gICAgICAgICAgV2Vla3MgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgdXBcIj5cbiAgICAgICAgICA8bGkgKGNsaWNrKT1cIndlZWtzU2VsZWN0ZWQoY291bnQpXCIgKm5nRm9yPVwibGV0IGNvdW50IG9mIHdlZWtzXCI+XG4gICAgICAgICAgICA8c3Bhbj4ge3sgY291bnQgfX0gV2Vla3M8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInNob3dUaW1lXCIgY2xhc3M9XCJjb2wteHMtNCBjb2wtbWQtNFwiPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ3Nob3J0VGltZSdcIlxuICAgICAgKGZvY3VzKT1cInRvZ2dsZVRpbWVQaWNrZXIodHJ1ZSlcIlxuICAgICAgcmVhZG9ubHlcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFRpbWVcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGF0ZS1waWNrZXJcbiAgKm5nSWY9XCJzaG93RGF0ZVBpY2tlclwiXG4gIFtpbml0RGF0ZV09XCJ2YWx1ZVwiXG4gIChvblNlbGVjdERhdGUpPVwic2V0RGF0ZSgkZXZlbnQpXCJcbiAgKG9uRGF0ZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVEYXRlUGlja2VyKCRldmVudClcIlxuPjwvZGF0ZS1waWNrZXI+XG5cbjx0aW1lLXBpY2tlclxuICAqbmdJZj1cInNob3dUaW1lUGlja2VyXCJcbiAgW2luaXRUaW1lXT1cInZhbHVlXCJcbiAgW3VzZTEySG91cl09XCJ0cnVlXCJcbiAgKG9uU2VsZWN0VGltZSk9XCJzZXRUaW1lKCRldmVudClcIlxuICAob25UaW1lUGlja2VyQ2FuY2VsKT1cInRvZ2dsZVRpbWVQaWNrZXIoJGV2ZW50KVwiXG4+PC90aW1lLXBpY2tlcj5cbmAsXG4gIHN0eWxlczogW2BpbnB1dFtyZWFkb25seV17YmFja2dyb3VuZC1jb2xvcjojZmZmfS51cHtib3R0b206MTAwJSFpbXBvcnRhbnQ7dG9wOmF1dG8haW1wb3J0YW50fS5nbHlwaGljb257dG9wOjFweH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHNob3dEYXRlID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1dlZWtzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFsyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgc2hvd0RhdGVQaWNrZXIgPSBmYWxzZTtcbiAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XG4gIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcbiAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIHdlZWtzU2VsZWN0ZWQoY291bnQpIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG5leHREYXRlID0gbm93LnNldERhdGUobm93LmdldERhdGUoKSArIGNvdW50ICogNyk7XG4gICAgdGhpcy52YWx1ZSA9IE1vbWVudChuZXh0RGF0ZSkuZm9ybWF0KCk7XG4gIH1cbiAgc2V0RGF0ZShkYXRlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZGF0ZSAmJiBkYXRlICE9PSAnJykge1xuICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudChkYXRlKS5mb3JtYXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZSh0aW1lOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGltZSAmJiB0aW1lICE9PSAnJykge1xuICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh0aW1lKS5mb3JtYXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHRpbWU7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZURhdGVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IHN0YXR1cztcbiAgICAvKnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBfYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LXdyYXBwZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb24tbW9kYWwtbWFpbicpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgIGxldCBlbGVtQm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoZWxlbUJveC5ib3R0b20gPiBfYm9keS5ib3R0b20pIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gJzM2cHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMCk7Ki9cbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2hvd1RpbWVQaWNrZXIgPSBzdGF0dXM7XG4gICAgcmV0dXJuO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbCkge1xuICAgIHRoaXMubW9kZWxWYWx1ZSA9IHZhbDtcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHZhbCk7XG4gICAgdGhpcy5vbkNoYW5nZSh2YWwpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQodmFsdWUpLmZvcm1hdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=