/**
 * time-picker.component
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
let TimePickerComponent = class TimePickerComponent {
    constructor() {
        this.showSecond = true;
        this.viewFormat = 'hh:mm A';
        this.use12Hour = false;
        this.returnObject = 'js';
        this.onSelectTime = new EventEmitter();
        this.onTimePickerCancel = new EventEmitter();
        this.hourFormat = 'HH';
    }
    ngOnInit() {
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
    }
    increaseHour() {
        this.time = this.time.clone().add(1, 'h');
    }
    decreaseHour() {
        this.time = this.time.clone().subtract(1, 'h');
    }
    increaseMinute() {
        this.time = this.time.clone().add(1, 'm');
    }
    decreaseMinute() {
        this.time = this.time.clone().subtract(1, 'm');
    }
    increaseSecond() {
        this.time = this.time.clone().add(1, 's');
    }
    decreaseSecond() {
        this.time = this.time.clone().subtract(1, 's');
    }
    selectTime() {
        const selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    selectNow() {
        const selectTime = this.parseToReturnObjectType(moment());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    clearTime() {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    }
    cancelTimePicker() {
        this.onTimePickerCancel.emit(false);
        return;
    }
    parseToReturnObjectType(time) {
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
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "initTime", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "showSecond", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "viewFormat", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "use12Hour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "returnObject", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "onSelectTime", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], TimePickerComponent.prototype, "onTimePickerCancel", void 0);
TimePickerComponent = tslib_1.__decorate([
    Component({
        selector: 'time-picker',
        template: "<picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n    <div class=\"picker-wrap\">\n        <div class=\"picker-box\">\n            <div class=\"picker-header\">Time Picker</div>\n            <div class=\"picker-table\">\n                <ul class=\"picker-table-time\">\n                    <li class=\"picker-table-number hour\">\n                        <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n                        {{time | moment: hourFormat}}\n                        <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n                    </li>\n                    <li class=\"picker-table-separator\">:</li>\n                    <li class=\"picker-table-number minute\">\n                        <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n                        {{time | moment: 'mm'}}\n                        <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n                    </li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n                        <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n                        {{time | moment: 'ss'}}\n                        <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n                    </li>\n                    <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n                        {{time | moment: 'A'}}\n                    </li>\n                </ul>\n            </div>\n            <div class=\"picker-footer\">\n                <div class=\"picker-action action-now\" (click)=\"selectNow()\"><span class=\"text\">Now</span></div>\n                <div class=\"picker-action action-confirm\" (click)=\"selectTime()\"><span class=\"text\">Confirm</span></div>\n                <div class=\"picker-action action-clear\" (click)=\"clearTime()\"><span class=\"text\">Clear</span></div>\n                <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\"><span class=\"text\">Close</span></div>\n            </div>\n        </div>\n    </div>\n</picker-modal>\n",
        styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent)),-webkit-gradient(linear,left top,right top,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent));background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TimePickerComponent);
export { TimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBS3ZCLHFFQUFxRTtBQUNyRSxtRUFBbUU7QUFDbkUsWUFBWTtBQVFaLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBWTVCO1FBVFMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDM0QsZUFBVSxHQUFHLElBQUksQ0FBQztJQUlsQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU5RSx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMs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LE9BQU8sRUFBRSxDQUFDO1lBRTFCLEtBQUssS0FBSztnQkFDTixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUU5QixLQUFLLFFBQVE7Z0JBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7U0FDbkI7SUFDTCxDQUFDO0NBRUosQ0FBQTtBQXpHWTtJQUFSLEtBQUssRUFBRTs7cURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7dURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt1REFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7O3NEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7eURBQXFCO0FBQ25CO0lBQVQsTUFBTSxFQUFFOzt5REFBd0M7QUFDdkM7SUFBVCxNQUFNLEVBQUU7OytEQUFrRDtBQVJsRCxtQkFBbUI7SUFOL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGFBQWE7UUFDdkIsMnFFQUEyQzs7S0FFOUMsQ0FBQzs7R0FFVyxtQkFBbUIsQ0EyRy9CO1NBM0dZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZS1waWNrZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5cbi8vIHdlYnBhY2sxX1xuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuLy8gY29uc3QgbXlEcFN0eWxlczogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJyk7XG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyk7XG4vLyB3ZWJwYWNrMl9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBpbml0VGltZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dTZWNvbmQgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHZpZXdGb3JtYXQgPSAnaGg6bW0gQSc7XG4gICAgQElucHV0KCkgdXNlMTJIb3VyID0gZmFsc2U7XG4gICAgQElucHV0KCkgcmV0dXJuT2JqZWN0ID0gJ2pzJztcbiAgICBAT3V0cHV0KCkgb25TZWxlY3RUaW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uVGltZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBob3VyRm9ybWF0ID0gJ0hIJztcbiAgICBwdWJsaWMgdGltZTogTW9tZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnVzZTEySG91cikge1xuICAgICAgICAgICAgdGhpcy5ob3VyRm9ybWF0ID0gJ2hoJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmluaXRUaW1lID8gbW9tZW50KHRoaXMuaW5pdFRpbWUsIHRoaXMudmlld0Zvcm1hdCkgOiBtb21lbnQoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgaW5pdERhdGUgaGFzIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmluaXRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZycgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KSA6XG4gICAgICAgICAgICAgICAgbW9tZW50KHRoaXMuaW5pdFRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gbW9tZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnaCcpO1xuICAgIH1cblxuICAgIGRlY3JlYXNlSG91cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ2gnKTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZU1pbnV0ZSgpIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdtJyk7XG4gICAgfVxuXG4gICAgZGVjcmVhc2VNaW51dGUoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdtJyk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VTZWNvbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAncycpO1xuICAgIH1cblxuICAgIGRlY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAncycpO1xuICAgIH1cblxuICAgIHNlbGVjdFRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRpbWUgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRoaXMudGltZSk7XG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2VsZWN0Tm93KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShtb21lbnQoKSk7XG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KG51bGwpO1xuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhbmNlbFRpbWVQaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UaW1lUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRpbWU6IE1vbWVudCk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcbiAgICAgICAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0RhdGUoKTtcblxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS5mb3JtYXQodGhpcy52aWV3Rm9ybWF0KTtcblxuICAgICAgICAgICAgY2FzZSAnbW9tZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcblxuICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9KU09OKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2lzbyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9JU09TdHJpbmcoKTtcblxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b09iamVjdCgpO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=