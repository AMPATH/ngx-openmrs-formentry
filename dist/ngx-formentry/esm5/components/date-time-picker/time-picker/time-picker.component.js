/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
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
        var /** @type {?} */ selectTime = this.parseToReturnObjectType(this.time);
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
        var /** @type {?} */ selectTime = this.parseToReturnObjectType(moment());
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
     * @param {?} time
     * @return {?}
     */
    TimePickerComponent.prototype.parseToReturnObjectType = /**
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
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return []; };
    TimePickerComponent.propDecorators = {
        "initTime": [{ type: Input },],
        "showSecond": [{ type: Input },],
        "viewFormat": [{ type: Input },],
        "use12Hour": [{ type: Input },],
        "returnObject": [{ type: Input },],
        "onSelectTime": [{ type: Output },],
        "onTimePickerCancel": [{ type: Output },],
    };
    return TimePickerComponent;
}());
export { TimePickerComponent };
function TimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TimePickerComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxxQkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDOztJQWdFbkI7MEJBVHNCLElBQUk7MEJBQ0osU0FBUzt5QkFDVixLQUFLOzRCQUNGLElBQUk7NEJBQ0gsSUFBSSxZQUFZLEVBQU87a0NBQ2pCLElBQUksWUFBWSxFQUFXOzBCQUM3QyxJQUFJO0tBSWhCOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBRzlFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsSUFBSSxD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QUFFLENBQUM7WUFFMUIsS0FBSyxLQUFLO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFOUIsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFM0I7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztTQUNuQjtLQUNKOztnQkFwSkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsaXFFQXFDYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyx5dEVBQXV0RSxDQUFDO2lCQUNwdUU7Ozs7OzZCQUlJLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxNQUFNO3VDQUNOLE1BQU07OzhCQW5FWDs7U0EyRGEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIHRpbWUtcGlja2VyLmNvbXBvbmVudFxyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50L21vbWVudCc7XHJcblxyXG4vLyB3ZWJwYWNrMV9cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5jc3MnKTtcclxuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xyXG4vLyB3ZWJwYWNrMl9cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0aW1lLXBpY2tlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxwaWNrZXItbW9kYWwgKG9uT3ZlcmxheUNsaWNrKT1cImNhbmNlbFRpbWVQaWNrZXIoKVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci13cmFwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1ib3hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1oZWFkZXJcIj5UaW1lIFBpY2tlcjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwaWNrZXItdGFibGUtdGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgaG91clwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlSG91cigpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6IGhvdXJGb3JtYXR9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VIb3VyKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtc2VwYXJhdG9yXCI+OjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBtaW51dGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyB1cFwiIChjbGljayk9XCJpbmNyZWFzZU1pbnV0ZSgpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6ICdtbSd9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VNaW51dGUoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInNob3dTZWNvbmRcIiBjbGFzcz1cInBpY2tlci10YWJsZS1zZXBhcmF0b3JcIj46PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJzaG93U2Vjb25kXCIgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIHNlY29uZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGltZSB8IG1vbWVudDogJ3NzJ319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZVNlY29uZCgpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwidXNlMTJIb3VyXCIgY2xhc3M9XCJwaWNrZXItdGFibGUtbWVyaWRpZW0gbWVyaWRpZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiAnQSd9fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1ub3dcIiAoY2xpY2spPVwic2VsZWN0Tm93KClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5Ob3c8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY29uZmlybVwiIChjbGljayk9XCJzZWxlY3RUaW1lKClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5Db25maXJtPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsZWFyXCIgKGNsaWNrKT1cImNsZWFyVGltZSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q2xlYXI8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY2xvc2VcIiAoY2xpY2spPVwiY2FuY2VsVGltZVBpY2tlcigpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q2xvc2U8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvcGlja2VyLW1vZGFsPlxyXG5gLFxyXG4gICAgc3R5bGVzOiBbYCosOjphZnRlciw6OmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnBpY2tlci13cmFwe3dpZHRoOjk1dnc7bWF4LXdpZHRoOjQwcmVtO2ZvbnQtZmFtaWx5OidPcGVuIFNhbnMnfS5waWNrZXItYm94e3dpZHRoOjEwMCU7cGFkZGluZzouNjI1cmVtIDFyZW07LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5waWNrZXItZm9vdGVyLC5waWNrZXItaGVhZGVye2ZvbnQtc2l6ZToxLjMzM3JlbTtsaW5lLWhlaWdodDoyLjVyZW07aGVpZ2h0OjIuNXJlbTt3aWR0aDoxMDAlfS5waWNrZXItaGVhZGVye3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItdGFibGV7d2lkdGg6MTAwJTttYXJnaW46Mi41cmVtIDB9LnBpY2tlci10YWJsZS10aW1le2ZvbnQtc2l6ZToyLjM3cmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5waWNrZXItdGFibGUtbWVyaWRpZW0sLnBpY2tlci10YWJsZS1udW1iZXIsLnBpY2tlci10YWJsZS1zZXBhcmF0b3J7dGV4dC1hbGlnbjpjZW50ZXJ9LnBpY2tlci10YWJsZS1tZXJpZGllbSwucGlja2VyLXRhYmxlLW51bWJlcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyMCV9LmFycm93e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO2JvcmRlcjpzb2xpZCAjNzc3O2JvcmRlci13aWR0aDowIC4ycmVtIC4ycmVtIDA7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzouMjVyZW07Y3Vyc29yOnBvaW50ZXJ9LmFycm93LnVwe3RvcDotMXJlbTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMTM1ZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEzNWRlZyl9LmFycm93LmRvd257Ym90dG9tOi0xcmVtOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoNDVkZWcpfS5hcnJvdzpob3Zlcntib3JkZXItY29sb3I6IzE5NzVkMn0ucGlja2VyLXRhYmxlLXNlcGFyYXRvcnt3aWR0aDpjYWxjKDIwJSAvIDMpfS5waWNrZXItZm9vdGVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7Y3Vyc29yOnBvaW50ZXJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb257d2lkdGg6MjUlO3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2IxZGNmYn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbiAudGV4dHtwYWRkaW5nLWxlZnQ6LjhyZW19LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNvbmZpcm06OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLW5vdzo6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjA7d2lkdGg6MH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLW5vdzo6YmVmb3Jle2JvcmRlci10b3A6LjY2ZW0gc29saWQgIzAwNTliYztib3JkZXItbGVmdDouNjZlbSBzb2xpZCB0cmFuc3BhcmVudH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNvbmZpcm06OmJlZm9yZXt3aWR0aDoxcmVtO2hlaWdodDoxcmVtO2JvcmRlci1yYWRpdXM6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwMGI1YWR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3Jle3RvcDotLjVyZW07d2lkdGg6MXJlbTtib3JkZXItdG9wOjNweCBzb2xpZCAjZTIwfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZXt3aWR0aDoxcmVtO2hlaWdodDoxcmVtO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKSxsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX1gXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBpbml0VGltZTogYW55O1xyXG4gICAgQElucHV0KCkgc2hvd1NlY29uZCA9IHRydWU7XHJcbiAgICBASW5wdXQoKSB2aWV3Rm9ybWF0ID0gJ2hoOm1tIEEnO1xyXG4gICAgQElucHV0KCkgdXNlMTJIb3VyID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSByZXR1cm5PYmplY3QgPSAnanMnO1xyXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0VGltZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uVGltZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIGhvdXJGb3JtYXQgPSAnSEgnO1xyXG4gICAgcHVibGljIHRpbWU6IE1vbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy51c2UxMkhvdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3VyRm9ybWF0ID0gJ2hoJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy5pbml0VGltZSA/IG1vbWVudCh0aGlzLmluaXRUaW1lLCB0aGlzLnZpZXdGb3JtYXQpIDogbW9tZW50KCk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCBpbml0RGF0ZSBoYXMgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5pbml0VGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZycgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KSA6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQodGhpcy5pbml0VGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbW9tZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluY3JlYXNlSG91cigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ2gnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWNyZWFzZUhvdXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ2gnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbmNyZWFzZU1pbnV0ZSgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ20nKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWNyZWFzZU1pbnV0ZSgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbScpO1xyXG4gICAgfVxyXG5cclxuICAgIGluY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAncycpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aGlzLnRpbWUpO1xyXG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lUGlja2VyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdE5vdygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShtb21lbnQoKSk7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChzZWxlY3RUaW1lKTtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQobnVsbCk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxUaW1lUGlja2VyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbFRpbWVQaWNrZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRpbWVQaWNrZXJDYW5jZWwuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aW1lOiBNb21lbnQpOiBhbnkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcclxuICAgICAgICAgICAgY2FzZSAnanMnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9EYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtb21lbnQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvSlNPTigpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnaXNvJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9PYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==