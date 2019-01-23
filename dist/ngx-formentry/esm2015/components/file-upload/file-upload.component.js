/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.propagateChange = (_) => { };
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
            this.dataSource.fileUpload(data).subscribe((result) => {
                // console.log('Result', result);
                this.innerValue = result.image;
                this.propagateChange(this.innerValue);
                this.uploading = false;
            }, (error) => {
                this.uploading = false;
            });
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
                        useExisting: forwardRef(() => RemoteFileUploadComponent),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUVILGlCQUFpQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBb0J4QixNQUFNOzs7O0lBYUYsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVp2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFxRGxCLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQ3JDLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQTdDQyxDQUFDOzs7O0lBVDVDLElBQ1csVUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7OztJQUtELFFBQVE7SUFFUixDQUFDOzs7OztJQUNELE1BQU0sQ0FBQyxJQUFJO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xELGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBR00sVUFBVSxDQUFDLEtBQVU7UUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBR00sZ0JBQWdCLENBQUMsRUFBTztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUdNLGlCQUFpQixLQUFLLENBQUM7Ozs7OztJQUU5QixRQUFRLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLFFBQVE7UUFDUixrQkFBa0I7UUFDbEIsbUNBQW1DO0lBQ3ZDLENBQUM7Ozs7SUFRTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7O1lBakZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7T0FJUDtnQkFDSCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQzt3QkFDeEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQUM7Z0JBQ04sTUFBTSxFQUFFLENBQUM7O01BRVA7aUJBQ0Q7YUFDSjs7O1lBdkI4QyxTQUFTOzs7eUJBNEJuRCxLQUFLOzs7O0lBSE4sOENBQWtCOztJQUNsQiwrQ0FBa0I7Ozs7O0lBQ2xCLGdEQUFnQzs7Ozs7SUF1RGhDLG9EQUEwQzs7Ozs7SUE3QzlCLDZDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncmVtb3RlLWZpbGUtdXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGZpbGUtdXBsb2FkZXIgWyhuZ01vZGVsKV09XCJpbm5lclZhbHVlXCIgKG9uQ2xlYXIpPVwiY2xlYXJWYWx1ZSgpXCIgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCI+XG4gICAgPC9maWxlLXVwbG9hZGVyPlxuICAgIDxpbWcgKm5nSWY9XCJpbm5lclZhbHVlXCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIFtzcmNdPVwiaW5uZXJWYWx1ZSB8IHNlY3VyZTp0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlXCIgYWx0PVwiXCIgLz5cbjwvZGl2PmAsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfV0sXG4gICAgc3R5bGVzOiBbYGltZyB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO21hcmdpbi1yaWdodDogYXV0bztkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIGlubmVyVmFsdWUgPSBudWxsO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cbiAgICB1cGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsZVVwbG9hZChkYXRhKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHJlc3VsdC5pbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmlubmVyVmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIHZhbHVlIHNldCB0byB0aGUgY29tcG9uZW50XG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVnaXN0ZXJzICdmbicgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gY2hhbmdlcyBhcmUgbWFkZVxuICAgIC8vIHRoaXMgaXMgaG93IHdlIGVtaXQgdGhlIGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBub3QgdXNlZCwgdXNlZCBmb3IgdG91Y2ggaW5wdXRcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cbiAgICAvLyBjaGFuZ2UgZXZlbnRzIGZyb20gdGhlIHRleHRhcmVhXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQuaWQpO1xuICAgICAgICAvLyAuLi4uLlxuICAgICAgICAvLyB1cGRhdGUgdGhlIGZvcm1cbiAgICAgICAgLy8gdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5kYXRhKTtcbiAgICB9XG5cblxuICAgIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcbiAgICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXG4gICAgLy8gd2UgdXNlIGl0IHRvIGVtaXQgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5pbm5lclZhbHVlKTtcbiAgICB9XG59XG4iXX0=