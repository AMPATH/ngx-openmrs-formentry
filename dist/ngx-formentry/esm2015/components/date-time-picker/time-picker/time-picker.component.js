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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFFNUIsTUFBTSxHQUFHLE9BQU87Ozs7QUFvRHRCLE1BQU07SUFZRjtRQVRTLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQzNELGVBQVUsR0FBRyxJQUFJLENBQUM7SUFJbEIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlFLHdDQUF3QztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElB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QUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV6QixLQUFLLE9BQU87Z0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUxQixLQUFLLEtBQUs7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUU5QixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUzQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDOzs7WUFwSkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQ2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsdXRFQUF1dEUsQ0FBQzthQUNwdUU7Ozs7dUJBSUksS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLE1BQU07aUNBQ04sTUFBTTs7OztJQU5QLHVDQUF1Qjs7SUFDdkIseUNBQTJCOztJQUMzQix5Q0FBZ0M7O0lBQ2hDLHdDQUEyQjs7SUFDM0IsMkNBQTZCOztJQUM3QiwyQ0FBaUQ7O0lBQ2pELGlEQUEyRDs7SUFDM0QseUNBQWtCOztJQUNsQixtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHRpbWUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgPHBpY2tlci1tb2RhbCAob25PdmVybGF5Q2xpY2spPVwiY2FuY2VsVGltZVBpY2tlcigpXCI+XG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci13cmFwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYm94XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlclwiPlRpbWUgUGlja2VyPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGlja2VyLXRhYmxlLXRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBob3VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlSG91cigpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiBob3VyRm9ybWF0fX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZUhvdXIoKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLXNlcGFyYXRvclwiPjo8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIG1pbnV0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyB1cFwiIChjbGljayk9XCJpbmNyZWFzZU1pbnV0ZSgpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3t0aW1lIHwgbW9tZW50OiAnbW0nfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZU1pbnV0ZSgpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJzaG93U2Vjb25kXCIgY2xhc3M9XCJwaWNrZXItdGFibGUtc2VwYXJhdG9yXCI+OjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInNob3dTZWNvbmRcIiBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgc2Vjb25kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6ICdzcyd9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInVzZTEySG91clwiIGNsYXNzPVwicGlja2VyLXRhYmxlLW1lcmlkaWVtIG1lcmlkaWVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RpbWUgfCBtb21lbnQ6ICdBJ319XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tbm93XCIgKGNsaWNrKT1cInNlbGVjdE5vdygpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Tm93PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jb25maXJtXCIgKGNsaWNrKT1cInNlbGVjdFRpbWUoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNvbmZpcm08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsZWFyXCIgKGNsaWNrKT1cImNsZWFyVGltZSgpXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q2xlYXI8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsb3NlXCIgKGNsaWNrKT1cImNhbmNlbFRpbWVQaWNrZXIoKVwiPjxzcGFuIGNsYXNzPVwidGV4dFwiPkNsb3NlPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9waWNrZXItbW9kYWw+XG5gLFxuICAgIHN0eWxlczogW2AqLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5waWNrZXItd3JhcHt3aWR0aDo5NXZ3O21heC13aWR0aDo0MHJlbTtmb250LWZhbWlseTonT3BlbiBTYW5zJ30ucGlja2VyLWJveHt3aWR0aDoxMDAlO3BhZGRpbmc6LjYyNXJlbSAxcmVtOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLWZvb3RlciwucGlja2VyLWhlYWRlcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO2hlaWdodDoyLjVyZW07d2lkdGg6MTAwJX0ucGlja2VyLWhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLXRhYmxle3dpZHRoOjEwMCU7bWFyZ2luOjIuNXJlbSAwfS5waWNrZXItdGFibGUtdGltZXtmb250LXNpemU6Mi4zN3JlbTtsaW5lLWhlaWdodDoyLjVyZW07bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLXRhYmxlLW1lcmlkaWVtLC5waWNrZXItdGFibGUtbnVtYmVyLC5waWNrZXItdGFibGUtc2VwYXJhdG9ye3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItdGFibGUtbWVyaWRpZW0sLnBpY2tlci10YWJsZS1udW1iZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjAlfS5hcnJvd3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtib3JkZXI6c29saWQgIzc3Nztib3JkZXItd2lkdGg6MCAuMnJlbSAuMnJlbSAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6LjI1cmVtO2N1cnNvcjpwb2ludGVyfS5hcnJvdy51cHt0b3A6LTFyZW07LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEzNWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xMzVkZWcpfS5hcnJvdy5kb3due2JvdHRvbTotMXJlbTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKX0uYXJyb3c6aG92ZXJ7Ym9yZGVyLWNvbG9yOiMxOTc1ZDJ9LnBpY2tlci10YWJsZS1zZXBhcmF0b3J7d2lkdGg6Y2FsYygyMCUgLyAzKX0ucGlja2VyLWZvb3RlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9ue3dpZHRoOjI1JTt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiMWRjZmJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb24gLnRleHR7cGFkZGluZy1sZWZ0Oi44cmVtfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtjb250ZW50OlwiIFwiO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDowO3dpZHRoOjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtib3JkZXItdG9wOi42NmVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjY2ZW0gc29saWQgdHJhbnNwYXJlbnR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtib3JkZXItcmFkaXVzOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDBiNWFkfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZXt0b3A6LS41cmVtO3dpZHRoOjFyZW07Ym9yZGVyLXRvcDozcHggc29saWQgI2UyMH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20sdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSksbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyl9YF0sXG59KVxuXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBpbml0VGltZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dTZWNvbmQgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHZpZXdGb3JtYXQgPSAnaGg6bW0gQSc7XG4gICAgQElucHV0KCkgdXNlMTJIb3VyID0gZmFsc2U7XG4gICAgQElucHV0KCkgcmV0dXJuT2JqZWN0ID0gJ2pzJztcbiAgICBAT3V0cHV0KCkgb25TZWxlY3RUaW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uVGltZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBob3VyRm9ybWF0ID0gJ0hIJztcbiAgICBwdWJsaWMgdGltZTogTW9tZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnVzZTEySG91cikge1xuICAgICAgICAgICAgdGhpcy5ob3VyRm9ybWF0ID0gJ2hoJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmluaXRUaW1lID8gbW9tZW50KHRoaXMuaW5pdFRpbWUsIHRoaXMudmlld0Zvcm1hdCkgOiBtb21lbnQoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgaW5pdERhdGUgaGFzIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmluaXRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZycgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KSA6XG4gICAgICAgICAgICAgICAgbW9tZW50KHRoaXMuaW5pdFRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gbW9tZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnaCcpO1xuICAgIH1cblxuICAgIGRlY3JlYXNlSG91cigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ2gnKTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZU1pbnV0ZSgpIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdtJyk7XG4gICAgfVxuXG4gICAgZGVjcmVhc2VNaW51dGUoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdtJyk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VTZWNvbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAncycpO1xuICAgIH1cblxuICAgIGRlY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAncycpO1xuICAgIH1cblxuICAgIHNlbGVjdFRpbWUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRpbWUgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRoaXMudGltZSk7XG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2VsZWN0Tm93KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShtb21lbnQoKSk7XG4gICAgICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XG4gICAgICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KG51bGwpO1xuICAgICAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhbmNlbFRpbWVQaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UaW1lUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRpbWU6IE1vbWVudCk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcbiAgICAgICAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0RhdGUoKTtcblxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS5mb3JtYXQodGhpcy52aWV3Rm9ybWF0KTtcblxuICAgICAgICAgICAgY2FzZSAnbW9tZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcblxuICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9KU09OKCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIGNhc2UgJ2lzbyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWUudG9JU09TdHJpbmcoKTtcblxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZS50b09iamVjdCgpO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=