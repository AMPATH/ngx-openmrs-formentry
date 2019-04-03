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
const moment = moment_;
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
export class TimePickerComponent {
    constructor() {
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
    /**
     * @return {?}
     */
    increaseHour() {
        this.time = this.time.clone().add(1, 'h');
    }
    /**
     * @return {?}
     */
    decreaseHour() {
        this.time = this.time.clone().subtract(1, 'h');
    }
    /**
     * @return {?}
     */
    increaseMinute() {
        this.time = this.time.clone().add(1, 'm');
    }
    /**
     * @return {?}
     */
    decreaseMinute() {
        this.time = this.time.clone().subtract(1, 'm');
    }
    /**
     * @return {?}
     */
    increaseSecond() {
        this.time = this.time.clone().add(1, 's');
    }
    /**
     * @return {?}
     */
    decreaseSecond() {
        this.time = this.time.clone().subtract(1, 's');
    }
    /**
     * @return {?}
     */
    selectTime() {
        /** @type {?} */
        const selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    /**
     * @return {?}
     */
    selectNow() {
        /** @type {?} */
        const selectTime = this.parseToReturnObjectType(moment());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    /**
     * @return {?}
     */
    clearTime() {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    }
    /**
     * @return {?}
     */
    cancelTimePicker() {
        this.onTimePickerCancel.emit(false);
        return;
    }
    /**
     * @protected
     * @param {?} time
     * @return {?}
     */
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
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker',
                template: `<picker-modal (onOverlayClick)="cancelTimePicker()">
    <div class="picker-wrap">
        <div class="picker-box">
            <div class="picker-header">Time Picker</div>
            <div class="picker-table">
                <ul class="picker-table-time">
                    <li class="picker-table-number hour">
                        <span class="arrow up" (click)="increaseHour()"></span>
                        {{time | moment: hourFormat}}
                        <span class="arrow down" (click)="decreaseHour()"></span>
                    </li>
                    <li class="picker-table-separator">:</li>
                    <li class="picker-table-number minute">
                        <span class="arrow up" (click)="increaseMinute()"></span>
                        {{time | moment: 'mm'}}
                        <span class="arrow down" (click)="decreaseMinute()"></span>
                    </li>
                    <li *ngIf="showSecond" class="picker-table-separator">:</li>
                    <li *ngIf="showSecond" class="picker-table-number second">
                        <span class="arrow up" (click)="increaseSecond()"></span>
                        {{time | moment: 'ss'}}
                        <span class="arrow down" (click)="decreaseSecond()"></span>
                    </li>
                    <li *ngIf="use12Hour" class="picker-table-meridiem meridiem">
                        {{time | moment: 'A'}}
                    </li>
                </ul>
            </div>
            <div class="picker-footer">
                <div class="picker-action action-now" (click)="selectNow()"><span class="text">Now</span></div>
                <div class="picker-action action-confirm" (click)="selectTime()"><span class="text">Confirm</span></div>
                <div class="picker-action action-clear" (click)="clearTime()"><span class="text">Clear</span></div>
                <div class="picker-action action-close" (click)="cancelTimePicker()"><span class="text">Close</span></div>
            </div>
        </div>
    </div>
</picker-modal>
`,
                styles: [`*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:" ";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}`],
            },] },
];
TimePickerComponent.ctorParameters = () => [];
TimePickerComponent.propDecorators = {
    initTime: [{ type: Input }],
    showSecond: [{ type: Input }],
    viewFormat: [{ type: Input }],
    use12Hour: [{ type: Input }],
    returnObject: [{ type: Input }],
    onSelectTime: [{ type: Output }],
    onTimePickerCancel: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87Ozs7QUFvRHRCLE1BQU07SUFZRjtRQVRTLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQzNELGVBQVUsR0FBRyxJQUFJLENBQUM7SUFJbEIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlFLHdDQUF3QztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElB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QUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV6QixLQUFLLE9BQU87Z0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUU5QixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUzQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDOzs7WUFwSkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQ2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsdXRFQUF1dEUsQ0FBQzthQUNwdUU7Ozs7dUJBSUksS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLE1BQU07aUNBQ04sTUFBTTs7OztJQU5QLHVDQUF1Qjs7SUFDdkIseUNBQTJCOztJQUMzQix5Q0FBZ0M7O0lBQ2hDLHdDQUEyQjs7SUFDM0IsMkNBQTZCOztJQUM3QiwyQ0FBaUQ7O0lBQ2pELGlEQUEyRDs7SUFDM0QseUNBQWtCOztJQUNsQixtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogdGltZS1waWNrZXIuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcclxuXHJcbi8vIHdlYnBhY2sxX1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xyXG4vLyBjb25zdCBteURwVHBsOiBzdHJpbmcgPSByZXF1aXJlKCcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyk7XHJcbi8vIHdlYnBhY2syX1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RpbWUtcGlja2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPHBpY2tlci1tb2RhbCAob25PdmVybGF5Q2xpY2spPVwiY2FuY2VsVGltZVBpY2tlcigpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLXdyYXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWJveFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlclwiPlRpbWUgUGlja2VyPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItdGFibGVcIj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBpY2tlci10YWJsZS10aW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBob3VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgdXBcIiAoY2xpY2spPVwiaW5jcmVhc2VIb3VyKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGltZSB8IG1vbWVudDogaG91ckZvcm1hdH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZUhvdXIoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBpY2tlci10YWJsZS1zZXBhcmF0b3JcIj46PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIG1pbnV0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlTWludXRlKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dGltZSB8IG1vbWVudDogJ21tJ319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZU1pbnV0ZSgpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwic2hvd1NlY29uZFwiIGNsYXNzPVwicGlja2VyLXRhYmxlLXNlcGFyYXRvclwiPjo8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInNob3dTZWNvbmRcIiBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgc2Vjb25kXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgdXBcIiAoY2xpY2spPVwiaW5jcmVhc2VTZWNvbmQoKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiAnc3MnfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJ1c2UxMkhvdXJcIiBjbGFzcz1cInBpY2tlci10YWJsZS1tZXJpZGllbSBtZXJpZGllbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6ICdBJ319XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLW5vd1wiIChjbGljayk9XCJzZWxlY3ROb3coKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPk5vdzwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jb25maXJtXCIgKGNsaWNrKT1cInNlbGVjdFRpbWUoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNvbmZpcm08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY2xlYXJcIiAoY2xpY2spPVwiY2xlYXJUaW1lKClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5DbGVhcjwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbG9zZVwiIChjbGljayk9XCJjYW5jZWxUaW1lUGlja2VyKClcIj48c3BhbiBjbGFzcz1cInRleHRcIj5DbG9zZTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9waWNrZXItbW9kYWw+XHJcbmAsXHJcbiAgICBzdHlsZXM6IFtgKiw6OmFmdGVyLDo6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH0ucGlja2VyLXdyYXB7d2lkdGg6OTV2dzttYXgtd2lkdGg6NDByZW07Zm9udC1mYW1pbHk6J09wZW4gU2Fucyd9LnBpY2tlci1ib3h7d2lkdGg6MTAwJTtwYWRkaW5nOi42MjVyZW0gMXJlbTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LnBpY2tlci1mb290ZXIsLnBpY2tlci1oZWFkZXJ7Zm9udC1zaXplOjEuMzMzcmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtoZWlnaHQ6Mi41cmVtO3dpZHRoOjEwMCV9LnBpY2tlci1oZWFkZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnBpY2tlci10YWJsZXt3aWR0aDoxMDAlO21hcmdpbjoyLjVyZW0gMH0ucGlja2VyLXRhYmxlLXRpbWV7Zm9udC1zaXplOjIuMzdyZW07bGluZS1oZWlnaHQ6Mi41cmVtO2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LnBpY2tlci10YWJsZS1tZXJpZGllbSwucGlja2VyLXRhYmxlLW51bWJlciwucGlja2VyLXRhYmxlLXNlcGFyYXRvcnt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLXRhYmxlLW1lcmlkaWVtLC5waWNrZXItdGFibGUtbnVtYmVye3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwJX0uYXJyb3d7cG9zaXRpb246YWJzb2x1dGU7bGVmdDo1MCU7Ym9yZGVyOnNvbGlkICM3Nzc7Ym9yZGVyLXdpZHRoOjAgLjJyZW0gLjJyZW0gMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOi4yNXJlbTtjdXJzb3I6cG9pbnRlcn0uYXJyb3cudXB7dG9wOi0xcmVtOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xMzVkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMTM1ZGVnKX0uYXJyb3cuZG93bntib3R0b206LTFyZW07LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSg0NWRlZyl9LmFycm93OmhvdmVye2JvcmRlci1jb2xvcjojMTk3NWQyfS5waWNrZXItdGFibGUtc2VwYXJhdG9ye3dpZHRoOmNhbGMoMjAlIC8gMyl9LnBpY2tlci1mb290ZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTAwJTtjdXJzb3I6cG9pbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbnt3aWR0aDoyNSU7dGV4dC1hbGlnbjpjZW50ZXJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYjFkY2ZifS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9uIC50ZXh0e3BhZGRpbmctbGVmdDouOHJlbX0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsZWFyOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbG9zZTo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tY29uZmlybTo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tbm93OjpiZWZvcmV7Y29udGVudDpcIiBcIjtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MDt3aWR0aDowfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tbm93OjpiZWZvcmV7Ym9yZGVyLXRvcDouNjZlbSBzb2xpZCAjMDA1OWJjO2JvcmRlci1sZWZ0Oi42NmVtIHNvbGlkIHRyYW5zcGFyZW50fS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY29uZmlybTo6YmVmb3Jle3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07Ym9yZGVyLXJhZGl1czoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwYjVhZH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsZWFyOjpiZWZvcmV7dG9wOi0uNXJlbTt3aWR0aDoxcmVtO2JvcmRlci10b3A6M3B4IHNvbGlkICNlMjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbG9zZTo6YmVmb3Jle3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpLGxpbmVhci1ncmFkaWVudCh0byByaWdodCx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfWBdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIGluaXRUaW1lOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzaG93U2Vjb25kID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHZpZXdGb3JtYXQgPSAnaGg6bW0gQSc7XHJcbiAgICBASW5wdXQoKSB1c2UxMkhvdXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHJldHVybk9iamVjdCA9ICdqcyc7XHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3RUaW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25UaW1lUGlja2VyQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gICAgaG91ckZvcm1hdCA9ICdISCc7XHJcbiAgICBwdWJsaWMgdGltZTogTW9tZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZTEySG91cikge1xyXG4gICAgICAgICAgICB0aGlzLmhvdXJGb3JtYXQgPSAnaGgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmluaXRUaW1lID8gbW9tZW50KHRoaXMuaW5pdFRpbWUsIHRoaXMudmlld0Zvcm1hdCkgOiBtb21lbnQoKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IGluaXREYXRlIGhhcyB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLmluaXRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMucmV0dXJuT2JqZWN0ID09PSAnc3RyaW5nJyA/IG1vbWVudCh0aGlzLmluaXRUaW1lLCB0aGlzLnZpZXdGb3JtYXQpIDpcclxuICAgICAgICAgICAgICAgIG1vbWVudCh0aGlzLmluaXRUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBtb21lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5jcmVhc2VIb3VyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnaCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY3JlYXNlSG91cigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnaCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGluY3JlYXNlTWludXRlKCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnbScpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY3JlYXNlTWludXRlKCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5jcmVhc2VTZWNvbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcmVhc2VTZWNvbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdFRpbWUgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRoaXMudGltZSk7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChzZWxlY3RUaW1lKTtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Tm93KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdFRpbWUgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKG1vbWVudCgpKTtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChudWxsKTtcclxuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsVGltZVBpY2tlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVGltZVBpY2tlckNhbmNlbC5lbWl0KGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRpbWU6IE1vbWVudCk6IGFueSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnJldHVybk9iamVjdCkge1xyXG4gICAgICAgICAgICBjYXNlICdqcyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS5mb3JtYXQodGhpcy52aWV3Rm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ21vbWVudCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9KU09OKCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdpc28nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b09iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19