import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Component, OnInit, forwardRef } from "@angular/core";
import * as moment_ from "moment";
const moment = moment_;

@Component({
  selector: "ngx-time-picker",
  templateUrl: "./ngx-time-picker.component.html",
  styleUrls: ["./ngx-time-picker.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxTimePickerComponent),
    },
  ],
})
export class NgxTimePickerComponent implements OnInit, ControlValueAccessor {
  public value: string = moment().format("HH:mm:ss");
  public onChange: any = () => {};
  public onTouched: any = () => {};

  public ngOnInit() {
  }

  public writeValue(value: any): void {
    this.value = this.formatTimeValue(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public onTimeSelect($event: string): void {
    const timeValue = this.formatTimeValue($event);
    this.value = timeValue;
    this.onChange(timeValue);
  }

  public formatTimeValue(timeInputString: string): string {
    /*
      Allows processing of data that comes in as date-time
      or just time i.e '1970-03-01 12:32:21' or '12:32:21'
      or '12:32' or '1970-01-01T13:03:00.000+0300'
    */
    let timeArray = [];
    let dateArray = [];
    let timeValue = "";

    if (typeof timeInputString === "undefined" || timeInputString === null) {
    } else {
      timeArray = timeInputString.split(":");
      dateArray = timeInputString.split("-");
    }
    if (timeArray.length === 1 && moment(timeInputString).isValid()) {
      timeValue = moment(timeInputString).format("HH:mm:ss");
    } else if (timeArray.length > 1 && timeArray.length < 2) {
      timeValue = moment(timeInputString,moment.defaultFormat).format('HH:mm:ss');
    } else if(timeArray.length >= 2 && dateArray.length > 1){
        timeValue = moment(timeInputString,moment.defaultFormat).format('HH:mm:ss');;
    }else if(timeArray.length >= 2 && dateArray.length <= 1) {
      timeValue = moment(timeInputString,'HH:mm:ss').format('HH:mm:ss');
    }else {
      timeValue = moment().format("HH:mm:ss");
    }
    return timeValue;
  }
}
