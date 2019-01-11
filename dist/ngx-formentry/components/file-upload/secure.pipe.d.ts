import { PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class SecurePipe implements PipeTransform, OnDestroy {
    private _ref;
    private sanitizer;
    private _latestValue;
    private _latestReturnedValue;
    private _subscription;
    private _obj;
    private getfile;
    private previousUrl;
    private _result;
    private result;
    private _internalSubscription;
    constructor(_ref: ChangeDetectorRef, sanitizer: DomSanitizer);
    ngOnDestroy(): void;
    transform(url: string, getfile: any): any;
    private internalTransform;
    private asyncTrasnform;
    private _subscribe;
    private _dispose;
    private _updateLatestValue;
}
