import { OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class FileUploadComponent implements OnInit, ControlValueAccessor {
    private renderer;
    uploading: boolean;
    fileUuid: any;
    pdfUploaded: boolean;
    formEntryMode: boolean;
    pdfUrl: string;
    private _dataSource;
    dataSource: DataSource;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    onFileChange(fileList: any): void;
    upload(data: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(): void;
    onChange(event: any): void;
    private propagateChange;
    clearValue(): void;
    getPdfUrl(fileUuid: string): void;
    checkFileType(): void;
}
