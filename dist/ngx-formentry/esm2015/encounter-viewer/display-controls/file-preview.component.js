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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUVyQyxNQUFNLGVBQWUsQ0FBQztBQUN6QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFckUsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDOztBQW9CdEIsSUFBYSxvQkFBb0IsNEJBQWpDLE1BQWEsb0JBQW9CO0lBaUI3QixZQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtRQWZyRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBUzVCLDJEQUEyRDtRQUMzRCxnQ0FBZ0M7UUFDeEIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFDYSxDQUFDO0lBVmhFLElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQU1ELFFBQVEsS0FBTSxDQUFDO0lBQ2YsZUFBZTtJQUNmLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUNELHVCQUF1QjtJQUVoQixVQUFVLENBQUMsQ0FBTTtRQUN0QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFDTSxhQUFhO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDVCxDQUFDO0lBRUMsc0NBQXNDO0lBQy9CLGdCQUFnQixDQUFDLEVBQU87UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQXNDO0lBQy9CLGlCQUFpQixDQUFDLEVBQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBVTtRQUN4Qix3Q0FBd0M7UUFDeEMsK0JBQStCO1FBRS9CLHVDQUF1QztRQUV2Qyw2Q0FBNkM7UUFDN0Msb0NBQW9DO1FBQ3BDLG9GQUFvRjtRQUNwRixzQkFBc0I7UUFDdEIsWUFBWTtRQUNaLDBCQUEwQjtRQUMxQixPQUFPO1FBQ1AsS0FBSztRQUVMLHdDQUF3QztJQUMxQyxDQUFDO0lBQ0ksTUFBTTtRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUcsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTs7WUFoRXlDLHNCQUFzQjs7QUFoQm5EO0lBQVIsS0FBSyxFQUFFOztvREFBb0I7QUFNNUI7SUFEQyxLQUFLLEVBQUU7OztzREFHUDtBQVRRLG9CQUFvQjtJQWxCaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFFeEIsUUFBUSxFQUFFOzs7OztpQkFLRztRQUViLFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQW9CLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtpQkFkUSxFQUFFO0tBZVosQ0FBQzs2Q0FrQnNDLHNCQUFzQjtHQWpCbkQsb0JBQW9CLENBaUZoQztTQWpGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZixcbiAgICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmaWxlLXByZXZpZXcnLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJmaWxlVXVpZFwiPlxuICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiIXJlc3VsdHNJc1BkZlwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgICAgIFtzcmNdPVwiZmlsZVV1aWQgfCBzZWN1cmU6dGhpcy5fZGF0YVNvdXJjZS5mZXRjaEZpbGVcIiBhbHQ9XCJpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJyZXN1bHRzSXNQZGZcIiAoY2xpY2spPVwiZ2V0VXJsKClcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiPjx1Pk9wZW4gUERGPC91PjwvYT5cbiAgICAgICAgICAgICAgICBgLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlUHJldmlld0NvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9KVxuZXhwb3J0IGNsYXNzIEZpbGVQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICAgIHB1YmxpYyBmaWxlVXVpZCA9IG51bGw7XG4gICAgcHVibGljIHBkZlVybDogYW55O1xuICAgIHB1YmxpYyByZXN1bHRzSXNQZGYgPSBmYWxzZTtcbiAgICBwdWJsaWMgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlKSB7fVxuICAgIG5nT25Jbml0KCkgeyAgfVxuICAgIC8vIGdldCBhY2Nlc3NvclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZVV1aWQ7XG4gICAgfVxuXG4gICAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICAgIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgIHRoaXMuZmlsZVV1aWQgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5maWxlVXVpZCkge1xuICAgICAgICAgIHRoaXMuZmlsZVV1aWQgPSB2O1xuICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjaGVja0ZpbGVUeXBlKCkge1xuICAgICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgICAgICAgIGlmICh0aGlzLmZpbGVVdWlkLnNlYXJjaChyZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNJc1BkZiA9IHRydWU7XG4gICAgICAgICAgfVxuICB9XG5cbiAgICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CbHVyKCkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgICAvLyBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXNbMF07XG5cbiAgICAgIC8vIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgLy8gICBjb25zdCBmaWxlVHlwZSA9IGRhdGEuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLmluZGV4T2YoJztiYXNlNjQnKSk7XG4gICAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAvLyAgICAgZGF0YSxcbiAgICAgIC8vICAgICBleHRlbnNpb246IGZpbGVUeXBlXG4gICAgICAvLyAgIH07XG4gICAgICAvLyB9O1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XG4gICAgfVxuICBwdWJsaWMgZ2V0VXJsKCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmZldGNoRmlsZSh0aGlzLmZpbGVVdWlkLCAncGRmJykuc3Vic2NyaWJlKChmaWxlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKGZpbGUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSAsICdfYmxhbmsnKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=