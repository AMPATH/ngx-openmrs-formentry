import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MY_FORMATS: {
    parse: {
        dateInput: string;
    };
    display: {
        dateInput: string;
        monthYearLabel: string;
        dateA11yLabel: string;
        monthYearA11yLabel: string;
    };
};
export declare class NgxDateTimePickerComponent implements OnInit, ControlValueAccessor {
    selectedTime: string;
    selectedDate: string;
    loadInitial: boolean;
    value: any;
    showTimePicker: boolean;
    weeks: number[];
    modelValue: any;
    showTime: boolean;
    showWeeks: boolean;
    onDateChange: EventEmitter<any>;
    onChange: any;
    onTouched: any;
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onTimeSelect($event: any): void;
    onDateSelect($event: any): void;
    toggleTimePicker(status: boolean): void;
    setCurrentTime(): void;
    weekSelect($event: any): void;
    selectionChange($event: any): void;
    getWeekPickerCssClass(): "col-sm-2 form-group" | "col-sm-3 form-group";
    getDatePickerCssClass(): "col-sm-5 form-group" | "col-sm-9 form-group" | "col-sm-8 form-group" | "col-sm-12 form-group";
    getTimePickerCssClass(): "col-sm-5 form-group" | "col-sm-9 form-group" | "col-sm-4 form-group";
    setDateTime(setDate: any, setTime: any): string;
}
