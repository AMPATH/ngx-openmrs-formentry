/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
var /** @type {?} */ noop = function () { };
var ɵ0 = noop;
var FilePreviewComponent = /** @class */ (function () {
    function FilePreviewComponent(encounterService) {
        this.encounterService = encounterService;
        this.innerValue = null;
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
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: /**
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
    /**
     * @param {?} v
     * @return {?}
     */
    FilePreviewComponent.prototype.writeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FilePreviewComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FilePreviewComponent.prototype.registerOnTouched = /**
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
                            useExisting: forwardRef(function () { return FilePreviewComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FilePreviewComponent.ctorParameters = function () { return [
        { type: EncounterViewerService, },
    ]; };
    FilePreviewComponent.propDecorators = {
        "source": [{ type: Input },],
        "dataSource": [{ type: Input },],
    };
    return FilePreviewComponent;
}());
export { FilePreviewComponent };
function FilePreviewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilePreviewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilePreviewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilePreviewComponent.propDecorators;
    /** @type {?} */
    FilePreviewComponent.prototype.source;
    /** @type {?} */
    FilePreviewComponent.prototype.innerValue;
    /** @type {?} */
    FilePreviewComponent.prototype._dataSource;
    /** @type {?} */
    FilePreviewComponent.prototype.onTouchedCallback;
    /** @type {?} */
    FilePreviewComponent.prototype.onChangeCallback;
    /** @type {?} */
    FilePreviewComponent.prototype.encounterService;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxxQkFBTSxJQUFJLEdBQUcsZUFBUSxDQUFDOzs7SUFnQ2xCLDhCQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjswQkFieEMsSUFBSTtpQ0FXZ0IsSUFBSTtnQ0FDQyxJQUFJO0tBQ2U7MEJBVnJELDRDQUFVOzs7OztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7O2tCQUVOLENBQWE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Ozs7O0lBUXpCLHNCQUFJLHVDQUFLO1FBRFQsZUFBZTs7OztRQUNmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFFRCxvREFBb0Q7Ozs7O1FBQ3BELFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7YUFDckI7U0FDRjs7O09BUEE7Ozs7O0lBVU0seUNBQVU7Ozs7Y0FBQyxDQUFNO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2Qjs7Ozs7O0lBSUksK0NBQWdCOzs7O2NBQUMsRUFBTztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUFJdEIsZ0RBQWlCOzs7O2NBQUMsRUFBTztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDOzs7OztJQUd2QixxQ0FBTTs7OztRQUNYLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzs7Ozs7SUFHcEIsdUNBQVE7Ozs7Y0FBQyxLQUFVOzs7Ozs7Ozs7Ozs7Ozs7Z0JBaEU3QixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixRQUFRLEVBQUUsNExBR1M7b0JBQ25CLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQzs0QkFDbkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBbEJNLHNCQUFzQjs7OzJCQW9CMUIsS0FBSzsrQkFHTCxLQUFLOzsrQkE1QlY7O1NBd0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXHJcbiAgICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyXHJcbiAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5jb25zdCBub29wID0gKCkgPT4ge307XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZS1wcmV2aWV3JyxcclxuICAgIHN0eWxlczogW2BgXSxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImlubmVyVmFsdWVcIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxyXG4gICAgICAgICAgICAgICAgW3NyY109XCJpbm5lclZhbHVlIHwgc2VjdXJlOnRoaXMuX2RhdGFTb3VyY2UuZmV0Y2hGaWxlXCIgYWx0PVwiaW1hZ2VcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVByZXZpZXdDb21wb25lbnQpLFxyXG4gICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9KVxyXG5leHBvcnQgY2xhc3MgRmlsZVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XHJcbiAgICBwdWJsaWMgaW5uZXJWYWx1ZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcclxuICAgIH1cclxuICAgIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXHJcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxyXG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlKSB7fVxyXG4gICAgLy8gZ2V0IGFjY2Vzc29yXHJcbiAgICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXHJcbiAgICBzZXQgdmFsdWUodjogYW55KSB7XHJcbiAgICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSkge1xyXG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25CbHVyKCkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgLy8gY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xyXG4gICAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXNbMF07XHJcblxyXG4gICAgICAvLyBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgIC8vIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xyXG4gICAgICAvLyAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcclxuICAgICAgLy8gICBjb25zdCBmaWxlVHlwZSA9IGRhdGEuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLmluZGV4T2YoJztiYXNlNjQnKSk7XHJcbiAgICAgIC8vICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgLy8gICAgIGRhdGEsXHJcbiAgICAgIC8vICAgICBleHRlbnNpb246IGZpbGVUeXBlXHJcbiAgICAgIC8vICAgfTtcclxuICAgICAgLy8gfTtcclxuXHJcbiAgICAgIC8vIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==