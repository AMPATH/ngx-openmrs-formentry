import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
var noop = function () { };
var ɵ0 = noop;
var FilePreviewComponent = /** @class */ (function () {
    function FilePreviewComponent(encounterService) {
        this.encounterService = encounterService;
        this.fileUuid = null;
        this.resultsIsPdf = false;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(FilePreviewComponent.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
        },
        enumerable: true,
        configurable: true
    });
    FilePreviewComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(FilePreviewComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.fileUuid;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.fileUuid) {
                this.fileUuid = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    // Current time string.
    FilePreviewComponent.prototype.writeValue = function (v) {
        if (v !== this.fileUuid) {
            this.fileUuid = v;
            this.checkFileType();
        }
    };
    FilePreviewComponent.prototype.checkFileType = function () {
        var re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.resultsIsPdf = true;
        }
    };
    // From ControlValueAccessor interface
    FilePreviewComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    FilePreviewComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    FilePreviewComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    FilePreviewComponent.prototype.onChange = function (event) {
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
    FilePreviewComponent.prototype.getUrl = function () {
        this.dataSource.fetchFile(this.fileUuid, 'pdf').subscribe(function (file) {
            window.open(file.changingThisBreaksApplicationSecurity, '_blank');
        });
    };
    FilePreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'file-preview',
                    styles: [""],
                    template: "<div *ngIf=\"fileUuid\">\n      <img\n        *ngIf=\"!resultsIsPdf\"\n        class=\"img-responsive\"\n        [src]=\"fileUuid | secure: this._dataSource.fetchFile\"\n        alt=\"image\"\n      />\n    </div>\n    <a *ngIf=\"resultsIsPdf\" (click)=\"getUrl()\" style=\"cursor: pointer\"\n      ><u>Open PDF</u></a\n    > ",
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
        { type: EncounterViewerService }
    ]; };
    FilePreviewComponent.propDecorators = {
        source: [{ type: Input }],
        dataSource: [{ type: Input }]
    };
    return FilePreviewComponent;
}());
export { FilePreviewComponent };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxJQUFNLElBQUksR0FBRyxjQUFPLENBQUMsQ0FBQzs7QUFFdEI7SUF3Q0UsOEJBQW9CLGdCQUF3QztRQUF4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBZnJELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTNUIsMkRBQTJEO1FBQzNELGdDQUFnQztRQUN4QixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUNhLENBQUM7SUFYaEUsc0JBQ1csNENBQVU7YUFEckI7WUFFRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO2FBQ0QsVUFBc0IsQ0FBYTtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDOzs7T0FIQTtJQVNELHVDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsc0JBQUksdUNBQUs7UUFEVCxlQUFlO2FBQ2Y7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO1FBRUQsb0RBQW9EO2FBQ3BELFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7OztPQVBBO0lBUUQsdUJBQXVCO0lBRWhCLHlDQUFVLEdBQWpCLFVBQWtCLENBQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUNNLDRDQUFhLEdBQXBCO1FBQ0UsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELHNDQUFzQztJQUMvQiwrQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBTztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0IsZ0RBQWlCLEdBQXhCLFVBQXlCLEVBQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0scUNBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSx1Q0FBUSxHQUFmLFVBQWdCLEtBQVU7UUFDeEIsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQix1Q0FBdUM7UUFDdkMsNkNBQTZDO1FBQzdDLG9DQUFvQztRQUNwQyxvRkFBb0Y7UUFDcEYsc0JBQXNCO1FBQ3RCLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsT0FBTztRQUNQLEtBQUs7UUFDTCx3Q0FBd0M7SUFDMUMsQ0FBQztJQUNNLHFDQUFNLEdBQWI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFwR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osUUFBUSxFQUFFLHdVQVVMO29CQUVMLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQzs0QkFDbkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBMUJRLHNCQUFzQjs7O3lCQTRCNUIsS0FBSzs2QkFLTCxLQUFLOztJQXdFUiwyQkFBQztDQUFBLEFBckdELElBcUdDO1NBOUVZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaWxlLXByZXZpZXcnLFxuICBzdHlsZXM6IFtgYF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImZpbGVVdWlkXCI+XG4gICAgICA8aW1nXG4gICAgICAgICpuZ0lmPVwiIXJlc3VsdHNJc1BkZlwiXG4gICAgICAgIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxuICAgICAgICBbc3JjXT1cImZpbGVVdWlkIHwgc2VjdXJlOiB0aGlzLl9kYXRhU291cmNlLmZldGNoRmlsZVwiXG4gICAgICAgIGFsdD1cImltYWdlXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPGEgKm5nSWY9XCJyZXN1bHRzSXNQZGZcIiAoY2xpY2spPVwiZ2V0VXJsKClcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiXG4gICAgICA+PHU+T3BlbiBQREY8L3U+PC9hXG4gICAgPiBgLFxuXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVByZXZpZXdDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICBwdWJsaWMgZmlsZVV1aWQgPSBudWxsO1xuICBwdWJsaWMgcGRmVXJsOiBhbnk7XG4gIHB1YmxpYyByZXN1bHRzSXNQZGYgPSBmYWxzZTtcbiAgcHVibGljIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgfVxuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlKSB7fVxuICBuZ09uSW5pdCgpIHt9XG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5maWxlVXVpZDtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICB0aGlzLmZpbGVVdWlkID0gdjtcbiAgICB9XG4gIH1cbiAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5maWxlVXVpZCkge1xuICAgICAgdGhpcy5maWxlVXVpZCA9IHY7XG4gICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGNoZWNrRmlsZVR5cGUoKSB7XG4gICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgIGlmICh0aGlzLmZpbGVVdWlkLnNlYXJjaChyZSkgIT09IC0xKSB7XG4gICAgICB0aGlzLnJlc3VsdHNJc1BkZiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgLy8gY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlc1swXTtcbiAgICAvLyBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAvLyBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcbiAgICAvLyAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAvLyAgIGNvbnN0IGZpbGVUeXBlID0gZGF0YS5zdWJzdHJpbmcoJ2RhdGE6aW1hZ2UvJy5sZW5ndGgsIGRhdGEuaW5kZXhPZignO2Jhc2U2NCcpKTtcbiAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgLy8gICAgIGRhdGEsXG4gICAgLy8gICAgIGV4dGVuc2lvbjogZmlsZVR5cGVcbiAgICAvLyAgIH07XG4gICAgLy8gfTtcbiAgICAvLyBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XG4gIH1cbiAgcHVibGljIGdldFVybCgpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlKHRoaXMuZmlsZVV1aWQsICdwZGYnKS5zdWJzY3JpYmUoKGZpbGUpID0+IHtcbiAgICAgIHdpbmRvdy5vcGVuKGZpbGUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSwgJ19ibGFuaycpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=