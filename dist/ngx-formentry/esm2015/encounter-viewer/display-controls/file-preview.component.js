/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
const /** @type {?} */ noop = () => { };
const ɵ0 = noop;
export class FilePreviewComponent {
    /**
     * @param {?} encounterService
     */
    constructor(encounterService) {
        this.encounterService = encounterService;
        this.innerValue = null;
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
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
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
                styles: [``],
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
                ]
            },] },
];
/** @nocollapse */
FilePreviewComponent.ctorParameters = () => [
    { type: EncounterViewerService, },
];
FilePreviewComponent.propDecorators = {
    "source": [{ type: Input },],
    "dataSource": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSx1QkFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUcsQ0FBQzs7QUFpQnRCLE1BQU07Ozs7SUFlRixZQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjswQkFieEMsSUFBSTtpQ0FXZ0IsSUFBSTtnQ0FDQyxJQUFJO0tBQ2U7Ozs7UUFWckQsVUFBVTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7O1FBRWpCLFVBQVUsQ0FBQyxDQUFhO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7OztJQVF6QixJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4Qjs7Ozs7SUFHRCxJQUFJLEtBQUssQ0FBQyxDQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7O0lBR00sVUFBVSxDQUFDLENBQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCOzs7Ozs7SUFJSSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Ozs7OztJQUl0QixpQkFBaUIsQ0FBQyxFQUFPO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7Ozs7O0lBR3ZCLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7O0lBR3BCLFFBQVEsQ0FBQyxLQUFVOzs7Ozs7Ozs7Ozs7Ozs7O1lBaEU3QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixRQUFRLEVBQUU7Ozt1QkFHUztnQkFDbkIsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7d0JBQ25ELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7Ozs7WUFsQk0sc0JBQXNCOzs7dUJBb0IxQixLQUFLOzJCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxyXG4gICAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxyXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2ZpbGUtcHJldmlldycsXHJcbiAgICBzdHlsZXM6IFtgYF0sXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJpbm5lclZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCJcclxuICAgICAgICAgICAgICAgIFtzcmNdPVwiaW5uZXJWYWx1ZSB8IHNlY3VyZTp0aGlzLl9kYXRhU291cmNlLmZldGNoRmlsZVwiIGFsdD1cImltYWdlXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmAsXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVQcmV2aWV3Q29tcG9uZW50KSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIEZpbGVQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xyXG4gICAgcHVibGljIGlubmVyVmFsdWUgPSBudWxsO1xyXG4gICAgcHVibGljIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XHJcbiAgICB9XHJcbiAgICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxyXG4gICAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZW5jb3VudGVyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSkge31cclxuICAgIC8vIGdldCBhY2Nlc3NvclxyXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xyXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xyXG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cclxuXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnkpIHtcclxuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQmx1cigpIHtcclxuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICAgIC8vIGNvbnN0IGZpbGVzID0gZXZlbnQuc3JjRWxlbWVudC5maWxlcztcclxuICAgICAgLy8gY29uc3QgZmlsZVRvTG9hZCA9IGZpbGVzWzBdO1xyXG5cclxuICAgICAgLy8gY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICAvLyBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcclxuICAgICAgLy8gICBjb25zdCBkYXRhID0gZmlsZVJlYWRlci5yZXN1bHQ7XHJcbiAgICAgIC8vICAgY29uc3QgZmlsZVR5cGUgPSBkYXRhLnN1YnN0cmluZygnZGF0YTppbWFnZS8nLmxlbmd0aCwgZGF0YS5pbmRleE9mKCc7YmFzZTY0JykpO1xyXG4gICAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgIC8vICAgICBkYXRhLFxyXG4gICAgICAvLyAgICAgZXh0ZW5zaW9uOiBmaWxlVHlwZVxyXG4gICAgICAvLyAgIH07XHJcbiAgICAgIC8vIH07XHJcblxyXG4gICAgICAvLyBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=