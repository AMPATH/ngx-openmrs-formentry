var FilePreviewComponent_1;
import * as tslib_1 from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
const noop = () => { };
const ɵ0 = noop;
let FilePreviewComponent = FilePreviewComponent_1 = class FilePreviewComponent {
    constructor(encounterService) {
        this.encounterService = encounterService;
        this.fileUuid = null;
        this.resultsIsPdf = false;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
    }
    ngOnInit() { }
    // get accessor
    get value() {
        return this.fileUuid;
    }
    // set accessor including call the onchange callback
    set value(v) {
        if (v !== this.fileUuid) {
            this.fileUuid = v;
        }
    }
    // Current time string.
    writeValue(v) {
        if (v !== this.fileUuid) {
            this.fileUuid = v;
            this.checkFileType();
        }
    }
    checkFileType() {
        const re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.resultsIsPdf = true;
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    onBlur() {
        this.onTouchedCallback();
    }
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
    getUrl() {
        this.dataSource.fetchFile(this.fileUuid, 'pdf').subscribe((file) => {
            window.open(file.changingThisBreaksApplicationSecurity, '_blank');
        });
    }
};
FilePreviewComponent.ctorParameters = () => [
    { type: EncounterViewerService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FilePreviewComponent.prototype, "source", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], FilePreviewComponent.prototype, "dataSource", null);
FilePreviewComponent = FilePreviewComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'file-preview',
        template: `<div *ngIf="fileUuid">
              <img *ngIf="!resultsIsPdf" class="img-responsive"
                [src]="fileUuid | secure:this._dataSource.fetchFile" alt="image" />
                </div>
                <a *ngIf="resultsIsPdf" (click)="getUrl()" style="cursor: pointer"><u>Open PDF</u></a>
                `,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FilePreviewComponent_1),
                multi: true
            }
        ],
        styles: [``]
    }),
    tslib_1.__metadata("design:paramtypes", [EncounterViewerService])
], FilePreviewComponent);
export { FilePreviewComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7O0FBb0J0QixJQUFhLG9CQUFvQiw0QkFBakMsTUFBYSxvQkFBb0I7SUFpQjdCLFlBQW9CLGdCQUF3QztRQUF4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBZnJELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTNUIsMkRBQTJEO1FBQzNELGdDQUFnQztRQUN4QixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUNhLENBQUM7SUFWaEUsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsQ0FBYTtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBTUQsUUFBUSxLQUFNLENBQUM7SUFDZixlQUFlO0lBQ2YsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsSUFBSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBQ0QsdUJBQXVCO0lBRWhCLFVBQVUsQ0FBQyxDQUFNO1FBQ3RCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUNNLGFBQWE7UUFDbEIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtJQUNULENBQUM7SUFFQyxzQ0FBc0M7SUFDL0IsZ0JBQWdCLENBQUMsRUFBTztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0IsaUJBQWlCLENBQUMsRUFBTztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFVO1FBQ3hCLHdDQUF3QztRQUN4QywrQkFBK0I7UUFFL0IsdUNBQXVDO1FBRXZDLDZDQUE2QztRQUM3QyxvQ0FBb0M7UUFDcEMsb0ZBQW9GO1FBQ3BGLHNCQUFzQjtRQUN0QixZQUFZO1FBQ1osMEJBQTBCO1FBQzFCLE9BQU87UUFDUCxLQUFLO1FBRUwsd0NBQXdDO0lBQzFDLENBQUM7SUFDSSxNQUFNO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRyxRQUFRLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRixDQUFBOztZQWhFeUMsc0JBQXNCOztBQWhCbkQ7SUFBUixLQUFLLEVBQUU7O29EQUFvQjtBQU01QjtJQURDLEtBQUssRUFBRTs7O3NEQUdQO0FBVFEsb0JBQW9CO0lBbEJoQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUV4QixRQUFRLEVBQUU7Ozs7O2lCQUtHO1FBRWIsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBb0IsQ0FBQztnQkFDbkQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGO2lCQWRRLEVBQUU7S0FlWixDQUFDOzZDQWtCc0Msc0JBQXNCO0dBakJuRCxvQkFBb0IsQ0FpRmhDO1NBakZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxuICAgIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbiAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZpbGUtcHJldmlldycsXG4gICAgc3R5bGVzOiBbYGBdLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImZpbGVVdWlkXCI+XG4gICAgICAgICAgICAgIDxpbWcgKm5nSWY9XCIhcmVzdWx0c0lzUGRmXCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiXG4gICAgICAgICAgICAgICAgW3NyY109XCJmaWxlVXVpZCB8IHNlY3VyZTp0aGlzLl9kYXRhU291cmNlLmZldGNoRmlsZVwiIGFsdD1cImltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YSAqbmdJZj1cInJlc3VsdHNJc1BkZlwiIChjbGljayk9XCJnZXRVcmwoKVwiIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCI+PHU+T3BlbiBQREY8L3U+PC9hPlxuICAgICAgICAgICAgICAgIGAsXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVQcmV2aWV3Q29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gIH0pXG5leHBvcnQgY2xhc3MgRmlsZVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gICAgcHVibGljIGZpbGVVdWlkID0gbnVsbDtcbiAgICBwdWJsaWMgcGRmVXJsOiBhbnk7XG4gICAgcHVibGljIHJlc3VsdHNJc1BkZiA9IGZhbHNlO1xuICAgIHB1YmxpYyBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAgIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVuY291bnRlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UpIHt9XG4gICAgbmdPbkluaXQoKSB7ICB9XG4gICAgLy8gZ2V0IGFjY2Vzc29yXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxlVXVpZDtcbiAgICB9XG5cbiAgICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gICAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgICAgaWYgKHYgIT09IHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgICAgdGhpcy5maWxlVXVpZCA9IHY7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnkpIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgICAgdGhpcy5maWxlVXVpZCA9IHY7XG4gICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNoZWNrRmlsZVR5cGUoKSB7XG4gICAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgICAgICAgaWYgKHRoaXMuZmlsZVV1aWQuc2VhcmNoKHJlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c0lzUGRmID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gIH1cblxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgIC8vIGNvbnN0IGZpbGVzID0gZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlc1swXTtcblxuICAgICAgLy8gY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIC8vIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xuICAgICAgLy8gICBjb25zdCBkYXRhID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICAvLyAgIGNvbnN0IGZpbGVUeXBlID0gZGF0YS5zdWJzdHJpbmcoJ2RhdGE6aW1hZ2UvJy5sZW5ndGgsIGRhdGEuaW5kZXhPZignO2Jhc2U2NCcpKTtcbiAgICAgIC8vICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIC8vICAgICBkYXRhLFxuICAgICAgLy8gICAgIGV4dGVuc2lvbjogZmlsZVR5cGVcbiAgICAgIC8vICAgfTtcbiAgICAgIC8vIH07XG5cbiAgICAgIC8vIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcbiAgICB9XG4gIHB1YmxpYyBnZXRVcmwoKSB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlKHRoaXMuZmlsZVV1aWQsICdwZGYnKS5zdWJzY3JpYmUoKGZpbGUpID0+IHtcbiAgICAgICAgd2luZG93Lm9wZW4oZmlsZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5ICwgJ19ibGFuaycpO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==