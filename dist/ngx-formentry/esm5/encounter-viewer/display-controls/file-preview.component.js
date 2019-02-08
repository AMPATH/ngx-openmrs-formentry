/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () { });
var ɵ0 = noop;
var FilePreviewComponent = /** @class */ (function () {
    function FilePreviewComponent(encounterService) {
        this.encounterService = encounterService;
        this.innerValue = null;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(FilePreviewComponent.prototype, "dataSource", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSource;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._dataSource = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilePreviewComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: 
        // set accessor including call the onchange callback
        /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    // Current time string.
    // Current time string.
    /**
     * @param {?} v
     * @return {?}
     */
    FilePreviewComponent.prototype.writeValue = 
    // Current time string.
    /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    FilePreviewComponent.prototype.registerOnChange = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    FilePreviewComponent.prototype.registerOnTouched = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    FilePreviewComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.onTouchedCallback();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FilePreviewComponent.prototype.onChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    FilePreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-preview',
                    styles: [""],
                    template: "<div *ngIf=\"innerValue\">\n              <img class=\"img-responsive\"\n                [src]=\"innerValue | secure:this._dataSource.fetchFile\" alt=\"image\" />\n                </div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return FilePreviewComponent; })),
                            multi: true
                        }
                    ]
                },] },
    ];
    FilePreviewComponent.ctorParameters = function () { return [
        { type: EncounterViewerService }
    ]; };
    FilePreviewComponent.propDecorators = {
        source: [{ type: Input }],
        dataSource: [{ type: Input }]
    };
    return FilePreviewComponent;
}());
export { FilePreviewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFFL0QsSUFBSTs7O0FBQUcsY0FBTyxDQUFDLENBQUE7O0FBRXJCO0lBOEJJLDhCQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtRQWJyRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBU3pCLDJEQUEyRDtRQUMzRCxnQ0FBZ0M7UUFDeEIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFDYSxDQUFDO0lBWGhFLHNCQUNXLDRDQUFVOzs7O1FBRHJCO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFDRCxVQUFzQixDQUFhO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUhBO0lBVUQsc0JBQUksdUNBQUs7UUFEVCxlQUFlOzs7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7Ozs7Ozs7UUFDcEQsVUFBVSxDQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQzs7O09BUEE7SUFRRCx1QkFBdUI7Ozs7OztJQUVoQix5Q0FBVTs7Ozs7O0lBQWpCLFVBQWtCLENBQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBRUQsc0NBQXNDOzs7Ozs7SUFDL0IsK0NBQWdCOzs7Ozs7SUFBdkIsVUFBd0IsRUFBTztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxzQ0FBc0M7Ozs7OztJQUMvQixnREFBaUI7Ozs7OztJQUF4QixVQUF5QixFQUFPO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVNLHFDQUFNOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0sdUNBQVE7Ozs7SUFBZixVQUFnQixLQUFVO1FBQ3hCLHdDQUF3QztRQUN4QywrQkFBK0I7UUFFL0IsdUNBQXVDO1FBRXZDLDZDQUE2QztRQUM3QyxvQ0FBb0M7UUFDcEMsb0ZBQW9GO1FBQ3BGLHNCQUFzQjtRQUN0QixZQUFZO1FBQ1osMEJBQTBCO1FBQzFCLE9BQU87UUFDUCxLQUFLO1FBRUwsd0NBQXdDO0lBQzFDLENBQUM7O2dCQWhGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixRQUFRLEVBQUUsNExBR1M7b0JBQ25CLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsRUFBQzs0QkFDbkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7OztnQkFsQk0sc0JBQXNCOzs7eUJBb0IxQixLQUFLOzZCQUdMLEtBQUs7O0lBOERSLDJCQUFDO0NBQUEsQUFqRkgsSUFpRkc7U0FsRVUsb0JBQW9COzs7SUFDN0Isc0NBQTRCOztJQUM1QiwwQ0FBeUI7O0lBQ3pCLDJDQUErQjs7Ozs7SUFVL0IsaURBQTZDOzs7OztJQUM3QyxnREFBa0Q7Ozs7O0lBQ3RDLGdEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxuICAgIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbiAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZpbGUtcHJldmlldycsXG4gICAgc3R5bGVzOiBbYGBdLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImlubmVyVmFsdWVcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCJcbiAgICAgICAgICAgICAgICBbc3JjXT1cImlubmVyVmFsdWUgfCBzZWN1cmU6dGhpcy5fZGF0YVNvdXJjZS5mZXRjaEZpbGVcIiBhbHQ9XCJpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVQcmV2aWV3Q29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gIH0pXG5leHBvcnQgY2xhc3MgRmlsZVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICAgIHB1YmxpYyBpbm5lclZhbHVlID0gbnVsbDtcbiAgICBwdWJsaWMgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlKSB7fVxuICAgIC8vIGdldCBhY2Nlc3NvclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CbHVyKCkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgICAvLyBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXNbMF07XG5cbiAgICAgIC8vIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgLy8gICBjb25zdCBmaWxlVHlwZSA9IGRhdGEuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLmluZGV4T2YoJztiYXNlNjQnKSk7XG4gICAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAvLyAgICAgZGF0YSxcbiAgICAgIC8vICAgICBleHRlbnNpb246IGZpbGVUeXBlXG4gICAgICAvLyAgIH07XG4gICAgICAvLyB9O1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XG4gICAgfVxuICB9XG4iXX0=