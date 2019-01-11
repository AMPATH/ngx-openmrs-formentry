/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var RemoteFileUploadComponent = /** @class */ (function () {
    function RemoteFileUploadComponent(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.innerValue = null;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(RemoteFileUploadComponent.prototype, "dataSource", {
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
    /**
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} data
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.upload = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe(function (result) {
                // console.log('Result', result);
                _this.innerValue = result.image;
                _this.propagateChange(_this.innerValue);
                _this.uploading = false;
            }, function (error) {
                _this.uploading = false;
            });
        }
    };
    // this is the initial value set to the component
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.writeValue = 
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.registerOnChange = 
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    // not used, used for touch input
    /**
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.registerOnTouched = 
    // not used, used for touch input
    /**
     * @return {?}
     */
    function () { };
    // change events from the textarea
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.onChange = 
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    /**
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.clearValue = /**
     * @return {?}
     */
    function () {
        this.innerValue = null;
        this.propagateChange(this.innerValue);
    };
    RemoteFileUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'remote-file-upload',
                    template: "<div>\n    <file-uploader [(ngModel)]=\"innerValue\" (onClear)=\"clearValue()\" (fileChanged)=\"upload($event)\">\n    </file-uploader>\n    <img *ngIf=\"innerValue\" class=\"img-responsive\" [src]=\"innerValue | secure:this.dataSource.fetchFile\" alt=\"\" />\n</div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return RemoteFileUploadComponent; }),
                            multi: true,
                        }
                    ],
                    styles: ["img {\n        margin-left: auto;margin-right: auto;display: block;\n    }"]
                }] }
    ];
    /** @nocollapse */
    RemoteFileUploadComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    RemoteFileUploadComponent.propDecorators = {
        dataSource: [{ type: Input }]
    };
    return RemoteFileUploadComponent;
}());
export { RemoteFileUploadComponent };
if (false) {
    /** @type {?} */
    RemoteFileUploadComponent.prototype.uploading;
    /** @type {?} */
    RemoteFileUploadComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    RemoteFileUploadComponent.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    RemoteFileUploadComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    RemoteFileUploadComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUVILGlCQUFpQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBRXhCO0lBMkJJLG1DQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWnZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLElBQUksQ0FBQzs7OztRQXdEVixvQkFBZSxHQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsQ0FBQztJQTdDQyxDQUFDO0lBVDVDLHNCQUNXLGlEQUFVOzs7O1FBRHJCO1lBRUksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7Ozs7O1FBQ0QsVUFBc0IsQ0FBYTtZQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDOzs7T0FIQTs7OztJQVFELDRDQUFROzs7SUFBUjtJQUVBLENBQUM7Ozs7O0lBQ0QsMENBQU07Ozs7SUFBTixVQUFPLElBQUk7UUFBWCxpQkFZQztRQVhHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO2dCQUM5QyxpQ0FBaUM7Z0JBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDL0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQzNCLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxpREFBaUQ7Ozs7OztJQUMxQyw4Q0FBVTs7Ozs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDeEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFDRCwwREFBMEQ7SUFDMUQsbURBQW1EOzs7Ozs7O0lBQzVDLG9EQUFnQjs7Ozs7OztJQUF2QixVQUF3QixFQUFPO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBaUM7Ozs7O0lBQzFCLHFEQUFpQjs7Ozs7SUFBeEIsY0FBNkIsQ0FBQztJQUM5QixrQ0FBa0M7Ozs7OztJQUNsQyw0Q0FBUTs7Ozs7O0lBQVIsVUFBUyxLQUFLO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixtQ0FBbUM7SUFDdkMsQ0FBQzs7OztJQVFNLDhDQUFVOzs7SUFBakI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDOztnQkE3RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLHVSQUF5QztvQkFDekMsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDOzRCQUN4RCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFBQzs2QkFDRyw0RUFFUDtpQkFFTDs7OztnQkFuQjhDLFNBQVM7Ozs2QkF3Qm5ELEtBQUs7O0lBNERWLGdDQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0FoRVkseUJBQXlCOzs7SUFDbEMsOENBQWtCOztJQUNsQiwrQ0FBa0I7Ozs7O0lBQ2xCLGdEQUFnQzs7Ozs7SUF1RGhDLG9EQUEwQzs7Ozs7SUE3QzlCLDZDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncmVtb3RlLWZpbGUtdXBsb2FkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9XSxcbiAgICBzdHlsZXM6IFtgaW1nIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87bWFyZ2luLXJpZ2h0OiBhdXRvO2Rpc3BsYXk6IGJsb2NrO1xuICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgdXBsb2FkaW5nID0gZmFsc2U7XG4gICAgaW5uZXJWYWx1ZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuICAgIHVwbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWxlVXBsb2FkKGRhdGEpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gcmVzdWx0LmltYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gICAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgICAgIC8vIC4uLi4uXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgICAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICAgIHB1YmxpYyBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmlubmVyVmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==