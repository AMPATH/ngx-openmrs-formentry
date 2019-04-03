/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class RemoteFileUploadComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.innerValue = null;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
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
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    upload(data) {
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                // console.log('Result', result);
                this.innerValue = result.image;
                this.propagateChange(this.innerValue);
                this.uploading = false;
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                this.uploading = false;
            }));
        }
    }
    // this is the initial value set to the component
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    /**
     * @return {?}
     */
    registerOnTouched() { }
    // change events from the textarea
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    /**
     * @return {?}
     */
    clearValue() {
        this.innerValue = null;
        this.propagateChange(this.innerValue);
    }
}
RemoteFileUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'remote-file-upload',
                template: `<div>
    <file-uploader [(ngModel)]="innerValue" (onClear)="clearValue()" (fileChanged)="upload($event)">
    </file-uploader>
    <img *ngIf="innerValue" class="img-responsive" [src]="innerValue | secure:this.dataSource.fetchFile" alt="" />
</div>`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => RemoteFileUploadComponent)),
                        multi: true,
                    }
                ],
                styles: [`img {
        margin-left: auto;margin-right: auto;display: block;
    }`
                ]
            },] },
];
RemoteFileUploadComponent.ctorParameters = () => [
    { type: Renderer2 }
];
RemoteFileUploadComponent.propDecorators = {
    dataSource: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUVILGlCQUFpQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBb0J4QixNQUFNOzs7O0lBYUYsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVp2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFxRGxCLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQ3JDLG9CQUFlOzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQztJQTdDQyxDQUFDOzs7O0lBVDVDLElBQ1csVUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7OztJQUtELFFBQVE7SUFFUixDQUFDOzs7OztJQUNELE1BQU0sQ0FBQyxJQUFJO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xELGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBR00sVUFBVSxDQUFDLEtBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBR00sZ0JBQWdCLENBQUMsRUFBTztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUdNLGlCQUFpQixLQUFLLENBQUM7Ozs7OztJQUU5QixRQUFRLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLFFBQVE7UUFDUixrQkFBa0I7UUFDbEIsbUNBQW1DO0lBQ3ZDLENBQUM7Ozs7SUFRTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7O1lBakZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7T0FJUDtnQkFDSCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQzt3QkFDeEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQUM7Z0JBQ04sTUFBTSxFQUFFLENBQUM7O01BRVA7aUJBQ0Q7YUFDSjs7O1lBdkI4QyxTQUFTOzs7eUJBNEJuRCxLQUFLOzs7O0lBSE4sOENBQWtCOztJQUNsQiwrQ0FBa0I7Ozs7O0lBQ2xCLGdEQUFnQzs7Ozs7SUF1RGhDLG9EQUEwQzs7Ozs7SUE3QzlCLDZDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdyZW1vdGUtZmlsZS11cGxvYWQnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gICAgPGZpbGUtdXBsb2FkZXIgWyhuZ01vZGVsKV09XCJpbm5lclZhbHVlXCIgKG9uQ2xlYXIpPVwiY2xlYXJWYWx1ZSgpXCIgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCI+XHJcbiAgICA8L2ZpbGUtdXBsb2FkZXI+XHJcbiAgICA8aW1nICpuZ0lmPVwiaW5uZXJWYWx1ZVwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBbc3JjXT1cImlubmVyVmFsdWUgfCBzZWN1cmU6dGhpcy5kYXRhU291cmNlLmZldGNoRmlsZVwiIGFsdD1cIlwiIC8+XHJcbjwvZGl2PmAsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgfV0sXHJcbiAgICBzdHlsZXM6IFtgaW1nIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bzttYXJnaW4tcmlnaHQ6IGF1dG87ZGlzcGxheTogYmxvY2s7XHJcbiAgICB9YFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgdXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBpbm5lclZhbHVlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICB1cGxvYWQoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsZVVwbG9hZChkYXRhKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdCcsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSByZXN1bHQuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmlubmVyVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcclxuICAgIC8vIHRoaXMgaXMgaG93IHdlIGVtaXQgdGhlIGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cclxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcclxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQuaWQpO1xyXG4gICAgICAgIC8vIC4uLi4uXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmb3JtXHJcbiAgICAgICAgLy8gdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxyXG4gICAgLy8gYSBwbGFjZWhvbGRlciBmb3IgYSBtZXRob2QgdGhhdCB0YWtlcyBvbmUgcGFyYW1ldGVyLFxyXG4gICAgLy8gd2UgdXNlIGl0IHRvIGVtaXQgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXHJcbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcclxuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuaW5uZXJWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19