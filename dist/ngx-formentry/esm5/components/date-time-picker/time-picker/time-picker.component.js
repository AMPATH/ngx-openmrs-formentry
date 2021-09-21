/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
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
    TimePickerComponent.prototype.ngOnInit = function () {
        if (this.use12Hour) {
            this.hourFormat = 'hh';
        }
        this.time = this.initTime
            ? moment(this.initTime, this.viewFormat)
            : moment();
        // check if the input initDate has value
        if (this.initTime) {
            this.time =
                this.returnObject === 'string'
                    ? moment(this.initTime, this.viewFormat)
                    : moment(this.initTime);
        }
        else {
            this.time = moment();
        }
    };
    TimePickerComponent.prototype.increaseHour = function () {
        this.time = this.time.clone().add(1, 'h');
    };
    TimePickerComponent.prototype.decreaseHour = function () {
        this.time = this.time.clone().subtract(1, 'h');
    };
    TimePickerComponent.prototype.increaseMinute = function () {
        this.time = this.time.clone().add(1, 'm');
    };
    TimePickerComponent.prototype.decreaseMinute = function () {
        this.time = this.time.clone().subtract(1, 'm');
    };
    TimePickerComponent.prototype.increaseSecond = function () {
        this.time = this.time.clone().add(1, 's');
    };
    TimePickerComponent.prototype.decreaseSecond = function () {
        this.time = this.time.clone().subtract(1, 's');
    };
    TimePickerComponent.prototype.selectTime = function () {
        var selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.selectNow = function () {
        var selectTime = this.parseToReturnObjectType(moment());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.clearTime = function () {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    };
    TimePickerComponent.prototype.cancelTimePicker = function () {
        this.onTimePickerCancel.emit(false);
        return;
    };
    TimePickerComponent.prototype.parseToReturnObjectType = function (time) {
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
                    template: "<picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">Time Picker</div>\n      <div class=\"picker-table\">\n        <ul class=\"picker-table-time\">\n          <li class=\"picker-table-number hour\">\n            <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n            {{ time | moment: hourFormat }}\n            <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n          </li>\n          <li class=\"picker-table-separator\">:</li>\n          <li class=\"picker-table-number minute\">\n            <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n            {{ time | moment: 'mm' }}\n            <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n          </li>\n          <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n          <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n            <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n            {{ time | moment: 'ss' }}\n            <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n          </li>\n          <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n            {{ time | moment: 'A' }}\n          </li>\n        </ul>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-now\" (click)=\"selectNow()\">\n          <span class=\"text\">Now</span>\n        </div>\n        <div class=\"picker-action action-confirm\" (click)=\"selectTime()\">\n          <span class=\"text\">Confirm</span>\n        </div>\n        <div class=\"picker-action action-clear\" (click)=\"clearTime()\">\n          <span class=\"text\">Clear</span>\n        </div>\n        <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\">\n          <span class=\"text\">Close</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                    styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:' ';position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBS3ZCLHFFQUFxRTtBQUNyRSxtRUFBbUU7QUFDbkUsWUFBWTtBQUVaO0lBNkRFO1FBVFMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDM0QsZUFBVSxHQUFHLElBQUksQ0FBQztJQUdILENBQUM7SUFFaEIsc0NBQVEsR0FBUjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLHdDQUF3QztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFB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QUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXRDLEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWQsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdkIsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEIsS0FBSyxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFNUIsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFekI7Z0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQzs7Z0JBN0pGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLDI4REE2Q1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsdXRFQUF1dEUsQ0FBQztpQkFDbHVFOzs7OzJCQUVFLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxNQUFNO3FDQUNOLE1BQU07O0lBcUdULDBCQUFDO0NBQUEsQUE5SkQsSUE4SkM7U0E1R1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiB0aW1lLXBpY2tlci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuLy8gd2VicGFjazFfXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5jc3MnKTtcbi8vIGNvbnN0IG15RHBUcGw6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnKTtcbi8vIHdlYnBhY2syX1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPHBpY2tlci1tb2RhbCAob25PdmVybGF5Q2xpY2spPVwiY2FuY2VsVGltZVBpY2tlcigpXCI+XG4gIDxkaXYgY2xhc3M9XCJwaWNrZXItd3JhcFwiPlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYm94XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWhlYWRlclwiPlRpbWUgUGlja2VyPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLXRhYmxlXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cInBpY2tlci10YWJsZS10aW1lXCI+XG4gICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBob3VyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlSG91cigpXCI+PC9zcGFuPlxuICAgICAgICAgICAge3sgdGltZSB8IG1vbWVudDogaG91ckZvcm1hdCB9fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlSG91cigpXCI+PC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLXNlcGFyYXRvclwiPjo8L2xpPlxuICAgICAgICAgIDxsaSBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgbWludXRlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlTWludXRlKClcIj48L3NwYW4+XG4gICAgICAgICAgICB7eyB0aW1lIHwgbW9tZW50OiAnbW0nIH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VNaW51dGUoKVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaSAqbmdJZj1cInNob3dTZWNvbmRcIiBjbGFzcz1cInBpY2tlci10YWJsZS1zZXBhcmF0b3JcIj46PC9saT5cbiAgICAgICAgICA8bGkgKm5nSWY9XCJzaG93U2Vjb25kXCIgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIHNlY29uZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyB1cFwiIChjbGljayk9XCJpbmNyZWFzZVNlY29uZCgpXCI+PC9zcGFuPlxuICAgICAgICAgICAge3sgdGltZSB8IG1vbWVudDogJ3NzJyB9fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdyBkb3duXCIgKGNsaWNrKT1cImRlY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgKm5nSWY9XCJ1c2UxMkhvdXJcIiBjbGFzcz1cInBpY2tlci10YWJsZS1tZXJpZGllbSBtZXJpZGllbVwiPlxuICAgICAgICAgICAge3sgdGltZSB8IG1vbWVudDogJ0EnIH19XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1mb290ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLW5vd1wiIChjbGljayk9XCJzZWxlY3ROb3coKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPk5vdzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jb25maXJtXCIgKGNsaWNrKT1cInNlbGVjdFRpbWUoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPkNvbmZpcm08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tY2xlYXJcIiAoY2xpY2spPVwiY2xlYXJUaW1lKClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5DbGVhcjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbG9zZVwiIChjbGljayk9XCJjYW5jZWxUaW1lUGlja2VyKClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5DbG9zZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3BpY2tlci1tb2RhbD5cbmAsXG4gIHN0eWxlczogW2AqLDo6YWZ0ZXIsOjpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fS5waWNrZXItd3JhcHt3aWR0aDo5NXZ3O21heC13aWR0aDo0MHJlbTtmb250LWZhbWlseTonT3BlbiBTYW5zJ30ucGlja2VyLWJveHt3aWR0aDoxMDAlO3BhZGRpbmc6LjYyNXJlbSAxcmVtOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLWZvb3RlciwucGlja2VyLWhlYWRlcntmb250LXNpemU6MS4zMzNyZW07bGluZS1oZWlnaHQ6Mi41cmVtO2hlaWdodDoyLjVyZW07d2lkdGg6MTAwJX0ucGlja2VyLWhlYWRlcnt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLXRhYmxle3dpZHRoOjEwMCU7bWFyZ2luOjIuNXJlbSAwfS5waWNrZXItdGFibGUtdGltZXtmb250LXNpemU6Mi4zN3JlbTtsaW5lLWhlaWdodDoyLjVyZW07bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ucGlja2VyLXRhYmxlLW1lcmlkaWVtLC5waWNrZXItdGFibGUtbnVtYmVyLC5waWNrZXItdGFibGUtc2VwYXJhdG9ye3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItdGFibGUtbWVyaWRpZW0sLnBpY2tlci10YWJsZS1udW1iZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjAlfS5hcnJvd3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtib3JkZXI6c29saWQgIzc3Nztib3JkZXItd2lkdGg6MCAuMnJlbSAuMnJlbSAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6LjI1cmVtO2N1cnNvcjpwb2ludGVyfS5hcnJvdy51cHt0b3A6LTFyZW07LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEzNWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xMzVkZWcpfS5hcnJvdy5kb3due2JvdHRvbTotMXJlbTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKX0uYXJyb3c6aG92ZXJ7Ym9yZGVyLWNvbG9yOiMxOTc1ZDJ9LnBpY2tlci10YWJsZS1zZXBhcmF0b3J7d2lkdGg6Y2FsYygyMCUgLyAzKX0ucGlja2VyLWZvb3RlcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9ue3dpZHRoOjI1JTt0ZXh0LWFsaWduOmNlbnRlcn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiMWRjZmJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb24gLnRleHR7cGFkZGluZy1sZWZ0Oi44cmVtfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmUsLnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtjb250ZW50OicgJztwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MDt3aWR0aDowfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tbm93OjpiZWZvcmV7Ym9yZGVyLXRvcDouNjZlbSBzb2xpZCAjMDA1OWJjO2JvcmRlci1sZWZ0Oi42NmVtIHNvbGlkIHRyYW5zcGFyZW50fS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY29uZmlybTo6YmVmb3Jle3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07Ym9yZGVyLXJhZGl1czoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwYjVhZH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsZWFyOjpiZWZvcmV7dG9wOi0uNXJlbTt3aWR0aDoxcmVtO2JvcmRlci10b3A6M3B4IHNvbGlkICNlMjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbG9zZTo6YmVmb3Jle3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpLGxpbmVhci1ncmFkaWVudCh0byByaWdodCx0cmFuc3BhcmVudCAzNSUsIzc3NyAzNSUsIzc3NyA2NSUsdHJhbnNwYXJlbnQgNjUlKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfWBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpbml0VGltZTogYW55O1xuICBASW5wdXQoKSBzaG93U2Vjb25kID0gdHJ1ZTtcbiAgQElucHV0KCkgdmlld0Zvcm1hdCA9ICdoaDptbSBBJztcbiAgQElucHV0KCkgdXNlMTJIb3VyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJldHVybk9iamVjdCA9ICdqcyc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdFRpbWUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG9uVGltZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgaG91ckZvcm1hdCA9ICdISCc7XG4gIHB1YmxpYyB0aW1lOiBNb21lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZTEySG91cikge1xuICAgICAgdGhpcy5ob3VyRm9ybWF0ID0gJ2hoJztcbiAgICB9XG4gICAgdGhpcy50aW1lID0gdGhpcy5pbml0VGltZVxuICAgICAgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KVxuICAgICAgOiBtb21lbnQoKTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCBpbml0RGF0ZSBoYXMgdmFsdWVcbiAgICBpZiAodGhpcy5pbml0VGltZSkge1xuICAgICAgdGhpcy50aW1lID1cbiAgICAgICAgdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBtb21lbnQodGhpcy5pbml0VGltZSwgdGhpcy52aWV3Rm9ybWF0KVxuICAgICAgICAgIDogbW9tZW50KHRoaXMuaW5pdFRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWUgPSBtb21lbnQoKTtcbiAgICB9XG4gIH1cblxuICBpbmNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdoJyk7XG4gIH1cblxuICBkZWNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ2gnKTtcbiAgfVxuXG4gIGluY3JlYXNlTWludXRlKCkge1xuICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAnbScpO1xuICB9XG5cbiAgZGVjcmVhc2VNaW51dGUoKSB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ20nKTtcbiAgfVxuXG4gIGluY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgIHRoaXMudGltZSA9IHRoaXMudGltZS5jbG9uZSgpLmFkZCgxLCAncycpO1xuICB9XG5cbiAgZGVjcmVhc2VTZWNvbmQoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuc3VidHJhY3QoMSwgJ3MnKTtcbiAgfVxuXG4gIHNlbGVjdFRpbWUoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0VGltZSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUodGhpcy50aW1lKTtcbiAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xuICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNlbGVjdE5vdygpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZShtb21lbnQoKSk7XG4gICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChzZWxlY3RUaW1lKTtcbiAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjbGVhclRpbWUoKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdFRpbWUuZW1pdChudWxsKTtcbiAgICB0aGlzLmNhbmNlbFRpbWVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjYW5jZWxUaW1lUGlja2VyKCk6IHZvaWQge1xuICAgIHRoaXMub25UaW1lUGlja2VyQ2FuY2VsLmVtaXQoZmFsc2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aW1lOiBNb21lbnQpOiBhbnkge1xuICAgIHN3aXRjaCAodGhpcy5yZXR1cm5PYmplY3QpIHtcbiAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9EYXRlKCk7XG5cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiB0aW1lLmZvcm1hdCh0aGlzLnZpZXdGb3JtYXQpO1xuXG4gICAgICBjYXNlICdtb21lbnQnOlxuICAgICAgICByZXR1cm4gdGltZTtcblxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHJldHVybiB0aW1lLnRvSlNPTigpO1xuXG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgIHJldHVybiB0aW1lLnRvQXJyYXkoKTtcblxuICAgICAgY2FzZSAnaXNvJzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9JU09TdHJpbmcoKTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9PYmplY3QoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuICB9XG59XG4iXX0=