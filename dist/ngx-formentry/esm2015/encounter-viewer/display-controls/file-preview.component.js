/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
export class FilePreviewComponent {
    /**
     * @param {?} encounterService
     */
    constructor(encounterService) {
        this.encounterService = encounterService;
        this.innerValue = null;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    get dataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dataSource(v) {
        this._dataSource = v;
    }
    // get accessor
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    // Current time string.
    /**
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        // const files = event.srcElement.files;
        // const fileToLoad = files[0];
        // const fileReader = new FileReader();
        // fileReader.onload = (fileLoadedEvent) => {
        //   const data = fileReader.result;
        //   const fileType = data.substring('data:image/'.length, data.indexOf(';base64'));
        //   const payload = {
        //     data,
        //     extension: fileType
        //   };
        // };
        // fileReader.readAsDataURL(fileToLoad);
    }
}
FilePreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-preview',
                template: `<div *ngIf="innerValue">
              <img class="img-responsive"
                [src]="innerValue | secure:this._dataSource.fetchFile" alt="image" />
                </div>`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => FilePreviewComponent),
                        multi: true
                    }
                ],
                styles: [``]
            }] }
];
/** @nocollapse */
FilePreviewComponent.ctorParameters = () => [
    { type: EncounterViewerService }
];
FilePreviewComponent.propDecorators = {
    source: [{ type: Input }],
    dataSource: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FilePreviewComponent.prototype.source;
    /** @type {?} */
    FilePreviewComponent.prototype.innerValue;
    /** @type {?} */
    FilePreviewComponent.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    FilePreviewComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    FilePreviewComponent.prototype.onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    FilePreviewComponent.prototype.encounterService;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7TUFFL0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUM7O0FBaUJyQixNQUFNLE9BQU8sb0JBQW9COzs7O0lBZTdCLFlBQW9CLGdCQUF3QztRQUF4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBYnJELGVBQVUsR0FBRyxJQUFJLENBQUM7OztRQVdqQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUNhLENBQUM7Ozs7SUFYaEUsSUFDVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFPRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBR0QsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7Ozs7SUFHTSxVQUFVLENBQUMsQ0FBTTtRQUN0QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7O0lBR00sZ0JBQWdCLENBQUMsRUFBTztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUdNLGlCQUFpQixDQUFDLEVBQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0sUUFBUSxDQUFDLEtBQVU7UUFDeEIsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUUvQix1Q0FBdUM7UUFFdkMsNkNBQTZDO1FBQzdDLG9DQUFvQztRQUNwQyxvRkFBb0Y7UUFDcEYsc0JBQXNCO1FBQ3RCLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsT0FBTztRQUNQLEtBQUs7UUFFTCx3Q0FBd0M7SUFDMUMsQ0FBQzs7O1lBaEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFFeEIsUUFBUSxFQUFFOzs7dUJBR1M7Z0JBQ25CLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUNuRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjt5QkFYUSxFQUFFO2FBWVo7Ozs7WUFsQk0sc0JBQXNCOzs7cUJBb0IxQixLQUFLO3lCQUdMLEtBQUs7Ozs7SUFITixzQ0FBNEI7O0lBQzVCLDBDQUF5Qjs7SUFDekIsMkNBQStCOzs7OztJQVUvQixpREFBNkM7Ozs7O0lBQzdDLGdEQUFrRDs7Ozs7SUFDdEMsZ0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gICAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmlsZS1wcmV2aWV3JyxcbiAgICBzdHlsZXM6IFtgYF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiaW5uZXJWYWx1ZVwiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgICAgIFtzcmNdPVwiaW5uZXJWYWx1ZSB8IHNlY3VyZTp0aGlzLl9kYXRhU291cmNlLmZldGNoRmlsZVwiIGFsdD1cImltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAge1xuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVByZXZpZXdDb21wb25lbnQpLFxuICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfSlcbmV4cG9ydCBjbGFzcyBGaWxlUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gICAgcHVibGljIGlubmVyVmFsdWUgPSBudWxsO1xuICAgIHB1YmxpYyBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAgIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVuY291bnRlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UpIHt9XG4gICAgLy8gZ2V0IGFjY2Vzc29yXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICAgIH1cblxuICAgIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnkpIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgIC8vIGNvbnN0IGZpbGVzID0gZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlc1swXTtcblxuICAgICAgLy8gY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIC8vIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xuICAgICAgLy8gICBjb25zdCBkYXRhID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICAvLyAgIGNvbnN0IGZpbGVUeXBlID0gZGF0YS5zdWJzdHJpbmcoJ2RhdGE6aW1hZ2UvJy5sZW5ndGgsIGRhdGEuaW5kZXhPZignO2Jhc2U2NCcpKTtcbiAgICAgIC8vICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIC8vICAgICBkYXRhLFxuICAgICAgLy8gICAgIGV4dGVuc2lvbjogZmlsZVR5cGVcbiAgICAgIC8vICAgfTtcbiAgICAgIC8vIH07XG5cbiAgICAgIC8vIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcbiAgICB9XG4gIH1cbiJdfQ==