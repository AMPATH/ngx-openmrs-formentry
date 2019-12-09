import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class FilePreviewComponent implements ControlValueAccessor, OnInit {
    private encounterService;
    source: any;
    fileUuid: any;
    pdfUrl: any;
    resultsIsPdf: boolean;
    _dataSource: DataSource;
    dataSource: DataSource;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(encounterService: EncounterViewerService);
    ngOnInit(): void;
    value: any;
    writeValue(v: any): void;
    checkFileType(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onBlur(): void;
    onChange(event: any): void;
    getUrl(): void;
}
