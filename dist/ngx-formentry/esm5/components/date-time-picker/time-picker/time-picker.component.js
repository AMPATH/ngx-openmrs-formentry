/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                }] }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87Ozs7QUFTdEI7SUFrQkk7UUFUUyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUMzRCxlQUFVLEdBQUcsSUFBSSxDQUFDO0lBSWxCLENBQUM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUUsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0s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QUssT0FBTztnQkFDUixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUxQixLQUFLLEtBQUs7Z0JBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFOUIsS0FBSyxRQUFRO2dCQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRTNCO2dCQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7Z0JBL0dKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsMnFFQUEyQzs7aUJBRTlDOzs7OzsyQkFJSSxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7K0JBQ0wsTUFBTTtxQ0FDTixNQUFNOztJQW1HWCwwQkFBQztDQUFBLEFBakhELElBaUhDO1NBM0dZLG1CQUFtQjs7O0lBRTVCLHVDQUF1Qjs7SUFDdkIseUNBQTJCOztJQUMzQix5Q0FBZ0M7O0lBQ2hDLHdDQUEyQjs7SUFDM0IsMkNBQTZCOztJQUM3QiwyQ0FBaUQ7O0lBQ2pELGlEQUEyRDs7SUFDM0QseUNBQWtCOztJQUNsQixtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHRpbWUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXIuY29tcG9uZW50LmNzcyddLFxufSlcblxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgaW5pdFRpbWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93U2Vjb25kID0gdHJ1ZTtcbiAgICBASW5wdXQoKSB2aWV3Rm9ybWF0ID0gJ2hoOm1tIEEnO1xuICAgIEBJbnB1dCgpIHVzZTEySG91ciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHJldHVybk9iamVjdCA9ICdqcyc7XG4gICAgQE91dHB1dCgpIG9uU2VsZWN0VGltZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvblRpbWVQaWNrZXJDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgaG91ckZvcm1hdCA9ICdISCc7XG4gICAgcHVibGljIHRpbWU6IE1vbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy51c2UxMkhvdXIpIHtcbiAgICAgICAgICAgIHRoaXMuaG91ckZvcm1hdCA9ICdoaCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy5pbml0VGltZSA/IG1vbWVudCh0aGlzLmluaXRUaW1lLCB0aGlzLnZpZXdGb3JtYXQpIDogbW9tZW50KCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IGluaXREYXRlIGhhcyB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5pbml0VGltZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnID8gbW9tZW50KHRoaXMuaW5pdFRpbWUsIHRoaXMudmlld0Zvcm1hdCkgOlxuICAgICAgICAgICAgICAgIG1vbWVudCh0aGlzLmluaXRUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IG1vbWVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jcmVhc2VIb3VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ2gnKTtcbiAgICB9XG5cbiAgICBkZWNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdoJyk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VNaW51dGUoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnbScpO1xuICAgIH1cblxuICAgIGRlY3JlYXNlTWludXRlKCkge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbScpO1xuICAgIH1cblxuICAgIGluY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ3MnKTtcbiAgICB9XG5cbiAgICBkZWNyZWFzZVNlY29uZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ3MnKTtcbiAgICB9XG5cbiAgICBzZWxlY3RUaW1lKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aGlzLnRpbWUpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGVjdE5vdygpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0VGltZSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUobW9tZW50KCkpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNsZWFyVGltZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChudWxsKTtcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lUGlja2VyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYW5jZWxUaW1lUGlja2VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVGltZVBpY2tlckNhbmNlbC5lbWl0KGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aW1lOiBNb21lbnQpOiBhbnkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucmV0dXJuT2JqZWN0KSB7XG4gICAgICAgICAgICBjYXNlICdqcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9EYXRlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ21vbWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XG5cbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvSlNPTigpO1xuXG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9BcnJheSgpO1xuXG4gICAgICAgICAgICBjYXNlICdpc28nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9PYmplY3QoKTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19