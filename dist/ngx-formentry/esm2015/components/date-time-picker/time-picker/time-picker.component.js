/**
 * time-picker.component
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
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
    ngOnInit() {
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
            {{ time | moment: hourFormat }}
            <span class="arrow down" (click)="decreaseHour()"></span>
          </li>
          <li class="picker-table-separator">:</li>
          <li class="picker-table-number minute">
            <span class="arrow up" (click)="increaseMinute()"></span>
            {{ time | moment: 'mm' }}
            <span class="arrow down" (click)="decreaseMinute()"></span>
          </li>
          <li *ngIf="showSecond" class="picker-table-separator">:</li>
          <li *ngIf="showSecond" class="picker-table-number second">
            <span class="arrow up" (click)="increaseSecond()"></span>
            {{ time | moment: 'ss' }}
            <span class="arrow down" (click)="decreaseSecond()"></span>
          </li>
          <li *ngIf="use12Hour" class="picker-table-meridiem meridiem">
            {{ time | moment: 'A' }}
          </li>
        </ul>
      </div>
      <div class="picker-footer">
        <div class="picker-action action-now" (click)="selectNow()">
          <span class="text">Now</span>
        </div>
        <div class="picker-action action-confirm" (click)="selectTime()">
          <span class="text">Confirm</span>
        </div>
        <div class="picker-action action-clear" (click)="clearTime()">
          <span class="text">Clear</span>
        </div>
        <div class="picker-action action-close" (click)="cancelTimePicker()">
          <span class="text">Close</span>
        </div>
      </div>
    </div>
  </div>
</picker-modal>
`,
                styles: [`*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:' ';position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}`]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBS3ZCLHFFQUFxRTtBQUNyRSxtRUFBbUU7QUFDbkUsWUFBWTtBQW9EWixNQUFNO0lBV0o7UUFUUyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNuQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUMzRCxlQUFVLEdBQUcsSUFBSSxDQUFDO0lBR0gsQ0FBQztJQUVoQixRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDeEMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsd0NBQXdDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFR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QztZQUVkLEtBQUssTUFBTTtnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXZCLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhCLEtBQUssS0FBSztnQkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTVCLEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXpCO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7OztZQTdKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNkNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHV0RUFBdXRFLENBQUM7YUFDbHVFOzs7O3VCQUVFLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxNQUFNO2lDQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHRpbWUtcGlja2VyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG4vLyB3ZWJwYWNrMV9cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbi8vIGNvbnN0IG15RHBTdHlsZXM6IHN0cmluZyA9IHJlcXVpcmUoJy4vdGltZS1waWNrZXIuY29tcG9uZW50LmNzcycpO1xuLy8gY29uc3QgbXlEcFRwbDogc3RyaW5nID0gcmVxdWlyZSgnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcpO1xuLy8gd2VicGFjazJfXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8cGlja2VyLW1vZGFsIChvbk92ZXJsYXlDbGljayk9XCJjYW5jZWxUaW1lUGlja2VyKClcIj5cbiAgPGRpdiBjbGFzcz1cInBpY2tlci13cmFwXCI+XG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1ib3hcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaGVhZGVyXCI+VGltZSBQaWNrZXI8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItdGFibGVcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwicGlja2VyLXRhYmxlLXRpbWVcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtbnVtYmVyIGhvdXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgdXBcIiAoY2xpY2spPVwiaW5jcmVhc2VIb3VyKClcIj48L3NwYW4+XG4gICAgICAgICAgICB7eyB0aW1lIHwgbW9tZW50OiBob3VyRm9ybWF0IH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VIb3VyKClcIj48L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJwaWNrZXItdGFibGUtc2VwYXJhdG9yXCI+OjwvbGk+XG4gICAgICAgICAgPGxpIGNsYXNzPVwicGlja2VyLXRhYmxlLW51bWJlciBtaW51dGVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgdXBcIiAoY2xpY2spPVwiaW5jcmVhc2VNaW51dGUoKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIHt7IHRpbWUgfCBtb21lbnQ6ICdtbScgfX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3cgZG93blwiIChjbGljayk9XCJkZWNyZWFzZU1pbnV0ZSgpXCI+PC9zcGFuPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpICpuZ0lmPVwic2hvd1NlY29uZFwiIGNsYXNzPVwicGlja2VyLXRhYmxlLXNlcGFyYXRvclwiPjo8L2xpPlxuICAgICAgICAgIDxsaSAqbmdJZj1cInNob3dTZWNvbmRcIiBjbGFzcz1cInBpY2tlci10YWJsZS1udW1iZXIgc2Vjb25kXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IHVwXCIgKGNsaWNrKT1cImluY3JlYXNlU2Vjb25kKClcIj48L3NwYW4+XG4gICAgICAgICAgICB7eyB0aW1lIHwgbW9tZW50OiAnc3MnIH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93IGRvd25cIiAoY2xpY2spPVwiZGVjcmVhc2VTZWNvbmQoKVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaSAqbmdJZj1cInVzZTEySG91clwiIGNsYXNzPVwicGlja2VyLXRhYmxlLW1lcmlkaWVtIG1lcmlkaWVtXCI+XG4gICAgICAgICAgICB7eyB0aW1lIHwgbW9tZW50OiAnQScgfX1cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWZvb3RlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWFjdGlvbiBhY3Rpb24tbm93XCIgKGNsaWNrKT1cInNlbGVjdE5vdygpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Tm93PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNvbmZpcm1cIiAoY2xpY2spPVwic2VsZWN0VGltZSgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Q29uZmlybTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItYWN0aW9uIGFjdGlvbi1jbGVhclwiIChjbGljayk9XCJjbGVhclRpbWUoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPkNsZWFyPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1hY3Rpb24gYWN0aW9uLWNsb3NlXCIgKGNsaWNrKT1cImNhbmNlbFRpbWVQaWNrZXIoKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPkNsb3NlPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvcGlja2VyLW1vZGFsPlxuYCxcbiAgc3R5bGVzOiBbYCosOjphZnRlciw6OmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9LnBpY2tlci13cmFwe3dpZHRoOjk1dnc7bWF4LXdpZHRoOjQwcmVtO2ZvbnQtZmFtaWx5OidPcGVuIFNhbnMnfS5waWNrZXItYm94e3dpZHRoOjEwMCU7cGFkZGluZzouNjI1cmVtIDFyZW07LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5waWNrZXItZm9vdGVyLC5waWNrZXItaGVhZGVye2ZvbnQtc2l6ZToxLjMzM3JlbTtsaW5lLWhlaWdodDoyLjVyZW07aGVpZ2h0OjIuNXJlbTt3aWR0aDoxMDAlfS5waWNrZXItaGVhZGVye3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItdGFibGV7d2lkdGg6MTAwJTttYXJnaW46Mi41cmVtIDB9LnBpY2tlci10YWJsZS10aW1le2ZvbnQtc2l6ZToyLjM3cmVtO2xpbmUtaGVpZ2h0OjIuNXJlbTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5waWNrZXItdGFibGUtbWVyaWRpZW0sLnBpY2tlci10YWJsZS1udW1iZXIsLnBpY2tlci10YWJsZS1zZXBhcmF0b3J7dGV4dC1hbGlnbjpjZW50ZXJ9LnBpY2tlci10YWJsZS1tZXJpZGllbSwucGlja2VyLXRhYmxlLW51bWJlcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyMCV9LmFycm93e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO2JvcmRlcjpzb2xpZCAjNzc3O2JvcmRlci13aWR0aDowIC4ycmVtIC4ycmVtIDA7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzouMjVyZW07Y3Vyc29yOnBvaW50ZXJ9LmFycm93LnVwe3RvcDotMXJlbTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMTM1ZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEzNWRlZyl9LmFycm93LmRvd257Ym90dG9tOi0xcmVtOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoNDVkZWcpfS5hcnJvdzpob3Zlcntib3JkZXItY29sb3I6IzE5NzVkMn0ucGlja2VyLXRhYmxlLXNlcGFyYXRvcnt3aWR0aDpjYWxjKDIwJSAvIDMpfS5waWNrZXItZm9vdGVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7Y3Vyc29yOnBvaW50ZXJ9LnBpY2tlci1mb290ZXIgLnBpY2tlci1hY3Rpb257d2lkdGg6MjUlO3RleHQtYWxpZ246Y2VudGVyfS5waWNrZXItZm9vdGVyIC5waWNrZXItYWN0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2IxZGNmYn0ucGlja2VyLWZvb3RlciAucGlja2VyLWFjdGlvbiAudGV4dHtwYWRkaW5nLWxlZnQ6LjhyZW19LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jbGVhcjo6YmVmb3JlLC5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xvc2U6OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLWNvbmZpcm06OmJlZm9yZSwucGlja2VyLWZvb3RlciAuYWN0aW9uLW5vdzo6YmVmb3Jle2NvbnRlbnQ6JyAnO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDowO3dpZHRoOjB9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1ub3c6OmJlZm9yZXtib3JkZXItdG9wOi42NmVtIHNvbGlkICMwMDU5YmM7Ym9yZGVyLWxlZnQ6LjY2ZW0gc29saWQgdHJhbnNwYXJlbnR9LnBpY2tlci1mb290ZXIgLmFjdGlvbi1jb25maXJtOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtib3JkZXItcmFkaXVzOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDBiNWFkfS5waWNrZXItZm9vdGVyIC5hY3Rpb24tY2xlYXI6OmJlZm9yZXt0b3A6LS41cmVtO3dpZHRoOjFyZW07Ym9yZGVyLXRvcDozcHggc29saWQgI2UyMH0ucGlja2VyLWZvb3RlciAuYWN0aW9uLWNsb3NlOjpiZWZvcmV7d2lkdGg6MXJlbTtoZWlnaHQ6MXJlbTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20sdHJhbnNwYXJlbnQgMzUlLCM3NzcgMzUlLCM3NzcgNjUlLHRyYW5zcGFyZW50IDY1JSksbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LHRyYW5zcGFyZW50IDM1JSwjNzc3IDM1JSwjNzc3IDY1JSx0cmFuc3BhcmVudCA2NSUpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyl9YF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGluaXRUaW1lOiBhbnk7XG4gIEBJbnB1dCgpIHNob3dTZWNvbmQgPSB0cnVlO1xuICBASW5wdXQoKSB2aWV3Rm9ybWF0ID0gJ2hoOm1tIEEnO1xuICBASW5wdXQoKSB1c2UxMkhvdXIgPSBmYWxzZTtcbiAgQElucHV0KCkgcmV0dXJuT2JqZWN0ID0gJ2pzJztcbiAgQE91dHB1dCgpIG9uU2VsZWN0VGltZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb25UaW1lUGlja2VyQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBob3VyRm9ybWF0ID0gJ0hIJztcbiAgcHVibGljIHRpbWU6IE1vbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXNlMTJIb3VyKSB7XG4gICAgICB0aGlzLmhvdXJGb3JtYXQgPSAnaGgnO1xuICAgIH1cbiAgICB0aGlzLnRpbWUgPSB0aGlzLmluaXRUaW1lXG4gICAgICA/IG1vbWVudCh0aGlzLmluaXRUaW1lLCB0aGlzLnZpZXdGb3JtYXQpXG4gICAgICA6IG1vbWVudCgpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IGluaXREYXRlIGhhcyB2YWx1ZVxuICAgIGlmICh0aGlzLmluaXRUaW1lKSB7XG4gICAgICB0aGlzLnRpbWUgPVxuICAgICAgICB0aGlzLnJldHVybk9iamVjdCA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG1vbWVudCh0aGlzLmluaXRUaW1lLCB0aGlzLnZpZXdGb3JtYXQpXG4gICAgICAgICAgOiBtb21lbnQodGhpcy5pbml0VGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZSA9IG1vbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIGluY3JlYXNlSG91cigpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5hZGQoMSwgJ2gnKTtcbiAgfVxuXG4gIGRlY3JlYXNlSG91cigpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnaCcpO1xuICB9XG5cbiAgaW5jcmVhc2VNaW51dGUoKSB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdtJyk7XG4gIH1cblxuICBkZWNyZWFzZU1pbnV0ZSgpIHtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbScpO1xuICB9XG5cbiAgaW5jcmVhc2VTZWNvbmQoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lID0gdGhpcy50aW1lLmNsb25lKCkuYWRkKDEsICdzJyk7XG4gIH1cblxuICBkZWNyZWFzZVNlY29uZCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAncycpO1xuICB9XG5cbiAgc2VsZWN0VGltZSgpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RUaW1lID0gdGhpcy5wYXJzZVRvUmV0dXJuT2JqZWN0VHlwZSh0aGlzLnRpbWUpO1xuICAgIHRoaXMub25TZWxlY3RUaW1lLmVtaXQoc2VsZWN0VGltZSk7XG4gICAgdGhpcy5jYW5jZWxUaW1lUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2VsZWN0Tm93KCk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdFRpbWUgPSB0aGlzLnBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKG1vbWVudCgpKTtcbiAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KHNlbGVjdFRpbWUpO1xuICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNsZWFyVGltZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VsZWN0VGltZS5lbWl0KG51bGwpO1xuICAgIHRoaXMuY2FuY2VsVGltZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNhbmNlbFRpbWVQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5vblRpbWVQaWNrZXJDYW5jZWwuZW1pdChmYWxzZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKHRpbWU6IE1vbWVudCk6IGFueSB7XG4gICAgc3dpdGNoICh0aGlzLnJldHVybk9iamVjdCkge1xuICAgICAgY2FzZSAnanMnOlxuICAgICAgICByZXR1cm4gdGltZS50b0RhdGUoKTtcblxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIHRpbWUuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XG5cbiAgICAgIGNhc2UgJ21vbWVudCc6XG4gICAgICAgIHJldHVybiB0aW1lO1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9KU09OKCk7XG5cbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9BcnJheSgpO1xuXG4gICAgICBjYXNlICdpc28nOlxuICAgICAgICByZXR1cm4gdGltZS50b0lTT1N0cmluZygpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gdGltZS50b09iamVjdCgpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==