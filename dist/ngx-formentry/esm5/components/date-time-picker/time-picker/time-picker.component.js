/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent() {
        this.showSecond = true;
        this.viewFormat = 'hh:mm A';
        this.use12Hour = false;
        this.returnObject = 'js';
        this.onSelectTime = new EventEmitter();
        this.onTimePickerCancel = new EventEmitter();
        this.hourFormat = 'HH';
    }
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.use12Hour) {
            this.hourFormat = 'hh';
        }
        this.time = this.initTime ? moment(this.initTime, this.viewFormat) : moment();
        // check if the input initDate has value
        if (this.initTime) {
            this.time = this.returnObject === 'string' ? moment(this.initTime, this.viewFormat) :
                moment(this.initTime);
        }
        else {
            this.time = moment();
        }
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.increaseHour = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().add(1, 'h');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.decreaseHour = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().subtract(1, 'h');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.increaseMinute = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().add(1, 'm');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.decreaseMinute = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().subtract(1, 'm');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.increaseSecond = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().add(1, 's');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.decreaseSecond = /**
     * @return {?}
     */
    function () {
        this.time = this.time.clone().subtract(1, 's');
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.selectTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.selectNow = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectTime = this.parseToReturnObjectType(moment());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.clearTime = /**
     * @return {?}
     */
    function () {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.cancelTimePicker = /**
     * @return {?}
     */
    function () {
        this.onTimePickerCancel.emit(false);
        return;
    };
    /**
     * @protected
     * @param {?} time
     * @return {?}
     */
    TimePickerComponent.prototype.parseToReturnObjectType = /**
     * @protected
     * @param {?} time
     * @return {?}
     */
    function (time) {
        switch (this.returnObject) {
            case 'js':
                return time.toDate();
            case 'string':
                return time.format(this.viewFormat);
            case 'moment':
                return time;
            case 'json':
                return time.toJSON();
            case 'array':
                return time.toArray();
            case 'iso':
                return time.toISOString();
            case 'object':
                return time.toObject();
            default:
                return time;
        }
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-picker',
                    template: "<picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n    <div class=\"picker-wrap\">\n        <div class=\"picker-box\">\n            <div class=\"picker-header\">Time Picker</div>\n            <div class=\"picker-table\">\n                <ul class=\"picker-table-time\">\n                    <li class=\"picker-table-number hour\">\n                        <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n                        {{time | moment: hourFormat}}\n                        <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n                    </li>\n                    <li class=\"picker-table-separator\">:</li>\n                    <li class=\"picker-table-number minute\">\n                        <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n                        {{time | moment: 'mm'}}\n                        <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n                    </li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n                        <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n                        {{time | moment: 'ss'}}\n                        <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n                    </li>\n                    <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n                        {{time | moment: 'A'}}\n                    </li>\n                </ul>\n            </div>\n            <div class=\"picker-footer\">\n                <div class=\"picker-action action-now\" (click)=\"selectNow()\"><span class=\"text\">Now</span></div>\n                <div class=\"picker-action action-confirm\" (click)=\"selectTime()\"><span class=\"text\">Confirm</span></div>\n                <div class=\"picker-action action-clear\" (click)=\"clearTime()\"><span class=\"text\">Clear</span></div>\n                <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\"><span class=\"text\">Close</span></div>\n            </div>\n        </div>\n    </div>\n</picker-modal>\n",
                    styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"],
                },] },
    ];
    TimePickerComponent.ctorParameters = function () { return []; };
    TimePickerComponent.propDecorators = {
        initTime: [{ type: Input }],
        showSecond: [{ type: Input }],
        viewFormat: [{ type: Input }],
        use12Hour: [{ type: Input }],
        returnObject: [{ type: Input }],
        onSelectTime: [{ type: Output }],
        onTimePickerCancel: [{ type: Output }]
    };
    return TimePickerComponent;
}());
export { TimePickerComponent };
if (false) {
    /** @type {?} */
    TimePickerComponent.prototype.initTime;
    /** @type {?} */
    TimePickerComponent.prototype.showSecond;
    /** @type {?} */
    TimePickerComponent.prototype.viewFormat;
    /** @type {?} */
    TimePickerComponent.prototype.use12Hour;
    /** @type {?} */
    TimePickerComponent.prototype.returnObject;
    /** @type {?} */
    TimePickerComponent.prototype.onSelectTime;
    /** @type {?} */
    TimePickerComponent.prototype.onTimePickerCancel;
    /** @type {?} */
    TimePickerComponent.prototype.hourFormat;
    /** @type {?} */
    TimePickerComponent.prototype.time;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87Ozs7QUFTdEI7SUF1REk7UUFUUyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUMzRCxlQUFVLEdBQUcsSUFBSSxDQUFDO0lBSWxCLENBQUM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlFLHdDQUF3QztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFH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QUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEMsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFaEIsS0FBSyxNQUFNO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFekIsS0FBSyxPQUFPO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFOUIsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFM0I7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztRQUNwQixDQUFDO0lBQ0wsQ0FBQzs7Z0JBcEpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGlxRUFxQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMseXRFQUF1dEUsQ0FBQztpQkFDcHVFOzs7OzJCQUlJLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxNQUFNO3FDQUNOLE1BQU07O0lBbUdYLDBCQUFDO0NBQUEsQUF0SkQsSUFzSkM7U0EzR1ksbUJBQW1COzs7SUFFNUIsdUNBQXVCOztJQUN2Qix5Q0FBMkI7O0lBQzNCLHlDQUFnQzs7SUFDaEMsd0NBQTJCOztJQUMzQiwyQ0FBNkI7O0lBQzdCLDJDQUFpRDs7SUFDakQsaURBQTJEOztJQUMzRCx5Q0FBa0I7O0lBQ2xCLG1DQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiB0aW1lLXBpY2tlci5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xyXG5cclxuLy8gd2VicGFjazFfXHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJyk7XHJcbi8vIGNvbnN0IG15RHBUcGw6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnKTtcclxuLy8gd2VicGFjazJfXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGltZS1waWNrZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8cGlja2VyLW1vZGFsIChvbk92ZXJsYXlDbGljayk9XCJjYW5jZWxUaW1lUGlja2VyKClcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItd3JhcFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYm94XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyXCI+VGltZSBQaWNrZXI8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGlja2VyLXRhYmxlLXRpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIGhvdXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyB1cFwiIChjbGljayk9XCJpbmNyZWFzZUhvdXIoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiBob3VyRm9ybWF0fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlSG91cigpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLXNlcGFyYXRvclwiPjo8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgbWludXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgdXBcIiAoY2xpY2spPVwiaW5jcmVhc2VNaW51dGUoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiAnbW0nfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlTWludXRlKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJzaG93U2Vjb25kXCIgY2xhc3M9XCJwaWNrZXItdGFibGUtc2VwYXJhdG9yXCI+OjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwic2hvd1NlY29uZFwiIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBzZWNvbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyB1cFwiIChjbGljayk9XCJpbmNyZWFzZVNlY29uZCgpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6ICdzcyd9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VTZWNvbmQoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInVzZTEySG91clwiIGNsYXNzPVwicGlja2VyLXRhYmxlLW1lcmlkaWVtIG1lcmlkaWVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGltZSB8IG1vbWVudDogJ0EnfX1cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tbm93XCIgKGNsaWNrKT1cInNlbGVjdE5vdygpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Tm93PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNvbmZpcm1cIiAoY2xpY2spPVwic2VsZWN0VGltZSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q29uZmlybTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbGVhclwiIChjbGljayk9XCJjbGVhclRpbWUoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNsZWFyPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsb3NlXCIgKGNsaWNrKT1cImNhbmNlbFRpbWVQaWNrZXIoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNsb3NlPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3BpY2tlci1tb2RhbD5cclxuYCxcclxuICAgIHN0eWxlczogW2AqLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5waWNrZXItd3JhcHt3aWR0aDo5NXZ3O21heC13aWR0aDo0MHJlbTtmb250LWZhbWlseTonT3BlbiBTYW5zJ30ucGlja2VyLWJveHt3aWR0aDoxMDAlO3BhZGRpbmc6LjYyNXJlbSAxcmVtOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLWZvb3RlciwucGlja2VyLWhlYWRlcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO2hlaWdodDoyLjVyZW07d2lkdGg6MTAwJX0ucGlja2VyLWhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLXRhYmxle3dpZHRoOjEwMCU7bWFyZ2luOjIuNXJlbSAwfS5waWNrZXItdGFibGUtdGltZXtmb250LXNpemU6Mi4zN3JlbTtsaW5lLWhlaWdodDoyLjVyZW07bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLXRhYmxlLW1lcmlkaWVtLC5waWNrZXItdGFibGUtbnVtYmVyLC5waWNrZXItdGFibGUtc2VwYXJhdG9ye3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItdGFibGUtbWVyaWRpZW0sLnBpY2tlci10YWJsZS1udW1iZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjAlfS5hcnJvd3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtib3JkZXI6c29saWQgIzc3Nztib3JkZXItd2lkdGg6MCAuMnJlbSAuMnJlbSAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6LjI1cmVtO2N1cnNvcjpwb2ludGVyfS5hcnJvdy51cHt0b3A6LTFyZW07LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEzNWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xMzVkZWcpfS5hcnJvdy5kb3due2JvdHRvbTotMXJlbTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKX0uYXJyb3c6aG92ZXJ7Ym9yZGVyLWNvbG9yOiMxOTc1ZDJ9LnBpY2tlci10YWJsZS1zZXBhcmF0b3J7d2lkdGg6Y2FsYygyMCUgLyAzKX0ucGlja2VyLWZvb3RlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9ue3dpZHRoOjI1JTt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiMWRjZmJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb24gLnRleHR7cGFkZGluZy1sZWZ0Oi44cmVtfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtjb250ZW50OlwiIFwiO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDowO3dpZHRoOjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtib3JkZXItdG9wOi42NmVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjY2ZW0gc29saWQgdHJhbnNwYXJlbnR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtib3JkZXItcmFkaXVzOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDBiNWFkfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZXt0b3A6LS41cmVtO3dpZHRoOjFyZW07Ym9yZGVyLXRvcDozcHggc29saWQgI2UyMH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20sdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSksbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyl9YF0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQElucHV0KCkgaW5pdFRpbWU6IGFueTtcclxuICAgIEBJbnB1dCgpIHNob3dTZWNvbmQgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgdmlld0Zvcm1hdCA9ICdoaDptbSBBJztcclxuICAgIEBJbnB1dCgpIHVzZTEySG91ciA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcmV0dXJuT2JqZWN0ID0gJ2pzJztcclxuICAgIEBPdXRwdXQoKSBvblNlbGVjdFRpbWUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblRpbWVQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgICBob3VyRm9ybWF0ID0gJ0hIJztcclxuICAgIHB1YmxpYyB0aW1lOiBNb21lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlMTJIb3VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG91ckZvcm1hdCA9ICdoaCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMuaW5pdFRpbWUgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KSA6IG1vbWVudCgpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgaW5pdERhdGUgaGFzIHZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnID8gbW9tZW50KHRoaXMuaW5pdFRpbWUsIHRoaXMudmlld0Zvcm1hdCkgOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50KHRoaXMuaW5pdFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IG1vbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbmNyZWFzZUhvdXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdoJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcmVhc2VIb3VyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdoJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5jcmVhc2VNaW51dGUoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcmVhc2VNaW51dGUoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ20nKTtcclxuICAgIH1cclxuXHJcbiAgICBpbmNyZWFzZVNlY29uZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWNyZWFzZVNlY29uZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAncycpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0VGltZSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUodGhpcy50aW1lKTtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROb3coKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0VGltZSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUobW9tZW50KCkpO1xyXG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lUGlja2VyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyVGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KG51bGwpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWxUaW1lUGlja2VyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25UaW1lUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcGFyc2VUb1JldHVybk9iamVjdFR5cGUodGltZTogTW9tZW50KTogYW55IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucmV0dXJuT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2pzJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLmZvcm1hdCh0aGlzLnZpZXdGb3JtYXQpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnbW9tZW50JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0pTT04oKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2lzbyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvT2JqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=