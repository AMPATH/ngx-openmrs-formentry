/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var RemoteFileUploadComponent = /** @class */ (function () {
    function RemoteFileUploadComponent(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.innerValue = null;
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
                // console.log('Result', result);
                _this.innerValue = result.image;
                _this.propagateChange(_this.innerValue);
                _this.uploading = false;
            }, function (error) {
                _this.uploading = false;
            });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.registerOnTouched = /**
     * @return {?}
     */
    function () { };
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    RemoteFileUploadComponent.prototype.onChange = /**
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
                    styles: ["img {\n        margin-left: auto;margin-right: auto;display: block;\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    RemoteFileUploadComponent.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    RemoteFileUploadComponent.propDecorators = {
        "dataSource": [{ type: Input },],
    };
    return RemoteFileUploadComponent;
}());
export { RemoteFileUploadComponent };
function RemoteFileUploadComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RemoteFileUploadComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RemoteFileUploadComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    RemoteFileUploadComponent.propDecorators;
    /** @type {?} */
    RemoteFileUploadComponent.prototype.uploading;
    /** @type {?} */
    RemoteFileUploadComponent.prototype.innerValue;
    /** @type {?} */
    RemoteFileUploadComponent.prototype._dataSource;
    /** @type {?} */
    RemoteFileUploadComponent.prototype.propagateChange;
    /** @type {?} */
    RemoteFileUploadComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUVILGlCQUFpQixFQUNwQixNQUFNLGdCQUFnQixDQUFDOztJQWlDcEIsbUNBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7eUJBWjNCLEtBQUs7MEJBQ0osSUFBSTsrQkF3RFMsVUFBQyxDQUFNLEtBQVE7S0E3Q0c7MEJBUmpDLGlEQUFVOzs7OztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7O2tCQUVOLENBQWE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O0lBTXpCLDRDQUFROzs7SUFBUjtLQUVDOzs7OztJQUNELDBDQUFNOzs7O0lBQU4sVUFBTyxJQUFJO1FBQVgsaUJBWUM7UUFYRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNOztnQkFFOUMsQUFEQSxpQ0FBaUM7Z0JBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDL0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQzFCLEVBQUUsVUFBQyxLQUFLO2dCQUNMLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQzFCLENBQUMsQ0FBQztTQUNOO0tBQ0o7Ozs7O0lBR00sOENBQVU7Ozs7Y0FBQyxLQUFVO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUMzQjs7Ozs7O0lBSUUsb0RBQWdCOzs7O2NBQUMsRUFBTztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFJdkIscURBQWlCOzs7O0lBQ3hCLGtDQUFrQzs7Ozs7SUFDbEMsNENBQVE7Ozs7SUFBUixVQUFTLEtBQUs7UUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztLQUlsQzs7OztJQVFNLDhDQUFVOzs7O1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7OztnQkFoRjdDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsNlFBSVA7b0JBQ0gsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDOzRCQUN4RCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFBQztvQkFDTixNQUFNLEVBQUUsQ0FBQyw0RUFFUDtxQkFDRDtpQkFDSjs7OztnQkF2QjhDLFNBQVM7OzsrQkE0Qm5ELEtBQUs7O29DQTVCVjs7U0F3QmEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdyZW1vdGUtZmlsZS11cGxvYWQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8ZmlsZS11cGxvYWRlciBbKG5nTW9kZWwpXT1cImlubmVyVmFsdWVcIiAob25DbGVhcik9XCJjbGVhclZhbHVlKClcIiAoZmlsZUNoYW5nZWQpPVwidXBsb2FkKCRldmVudClcIj5cbiAgICA8L2ZpbGUtdXBsb2FkZXI+XG4gICAgPGltZyAqbmdJZj1cImlubmVyVmFsdWVcIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgW3NyY109XCJpbm5lclZhbHVlIHwgc2VjdXJlOnRoaXMuZGF0YVNvdXJjZS5mZXRjaEZpbGVcIiBhbHQ9XCJcIiAvPlxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9XSxcbiAgICBzdHlsZXM6IFtgaW1nIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87bWFyZ2luLXJpZ2h0OiBhdXRvO2Rpc3BsYXk6IGJsb2NrO1xuICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgdXBsb2FkaW5nID0gZmFsc2U7XG4gICAgaW5uZXJWYWx1ZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuICAgIHVwbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWxlVXBsb2FkKGRhdGEpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gcmVzdWx0LmltYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gICAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgICAgIC8vIC4uLi4uXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgICAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICAgIHB1YmxpYyBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmlubmVyVmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==