import { ControlValueAccessor } from '@angular/forms';
import { OnInit } from '@angular/core';
export declare class NgxTimePickerComponent implements OnInit, ControlValueAccessor {
    value: string;
    onChange: any;
    onTouched: any;
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onTimeSelect($event: string): void;
    formatTimeValue(timeInputString: string): string;
}
