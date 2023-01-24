import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EncounterViewerService } from '../encounter-viewer.service';
const noop = () => { };
const ɵ0 = noop;
export class FilePreviewComponent {
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
}
FilePreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-preview',
                styles: [``],
                template: `<div *ngIf="fileUuid">
      <img
        *ngIf="!resultsIsPdf"
        class="img-responsive"
        [src]="fileUuid | secure: this._dataSource.fetchFile"
        alt="image"
      />
    </div>
    <a *ngIf="resultsIsPdf" (click)="getUrl()" style="cursor: pointer"
      ><u>Open PDF</u></a
    > `,
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
    { type: EncounterViewerService }
];
FilePreviewComponent.propDecorators = {
    source: [{ type: Input }],
    dataSource: [{ type: Input }]
};
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7O0FBeUJ0QixNQUFNO0lBaUJKLFlBQW9CLGdCQUF3QztRQUF4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBZnJELGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTNUIsMkRBQTJEO1FBQzNELGdDQUFnQztRQUN4QixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUNhLENBQUM7SUFYaEUsSUFDVyxVQUFVO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFXLFVBQVUsQ0FBQyxDQUFhO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFNRCxRQUFRLEtBQUksQ0FBQztJQUNiLGVBQWU7SUFDZixJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksS0FBSyxDQUFDLENBQU07UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDRCx1QkFBdUI7SUFFaEIsVUFBVSxDQUFDLENBQU07UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUNNLGFBQWE7UUFDbEIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELHNDQUFzQztJQUMvQixnQkFBZ0IsQ0FBQyxFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNDQUFzQztJQUMvQixpQkFBaUIsQ0FBQyxFQUFPO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQVU7UUFDeEIsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQix1Q0FBdUM7UUFDdkMsNkNBQTZDO1FBQzdDLG9DQUFvQztRQUNwQyxvRkFBb0Y7UUFDcEYsc0JBQXNCO1FBQ3RCLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsT0FBTztRQUNQLEtBQUs7UUFDTCx3Q0FBd0M7SUFDMUMsQ0FBQztJQUNNLE1BQU07UUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBcEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLFFBQVEsRUFBRTs7Ozs7Ozs7OztPQVVMO2dCQUVMLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUNuRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjthQUNGOzs7O1lBMUJRLHNCQUFzQjs7O3FCQTRCNUIsS0FBSzt5QkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBmb3J3YXJkUmVmLFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZpbGUtcHJldmlldycsXG4gIHN0eWxlczogW2BgXSxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZmlsZVV1aWRcIj5cbiAgICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCIhcmVzdWx0c0lzUGRmXCJcbiAgICAgICAgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiXG4gICAgICAgIFtzcmNdPVwiZmlsZVV1aWQgfCBzZWN1cmU6IHRoaXMuX2RhdGFTb3VyY2UuZmV0Y2hGaWxlXCJcbiAgICAgICAgYWx0PVwiaW1hZ2VcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgICA8YSAqbmdJZj1cInJlc3VsdHNJc1BkZlwiIChjbGljayk9XCJnZXRVcmwoKVwiIHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCJcbiAgICAgID48dT5PcGVuIFBERjwvdT48L2FcbiAgICA+IGAsXG5cbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlUHJldmlld0NvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gIHB1YmxpYyBmaWxlVXVpZCA9IG51bGw7XG4gIHB1YmxpYyBwZGZVcmw6IGFueTtcbiAgcHVibGljIHJlc3VsdHNJc1BkZiA9IGZhbHNlO1xuICBwdWJsaWMgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICB9XG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVuY291bnRlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UpIHt9XG4gIG5nT25Jbml0KCkge31cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmZpbGVVdWlkO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgIHRoaXMuZmlsZVV1aWQgPSB2O1xuICAgIH1cbiAgfVxuICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICB0aGlzLmZpbGVVdWlkID0gdjtcbiAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgY2hlY2tGaWxlVHlwZSgpIHtcbiAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgaWYgKHRoaXMuZmlsZVV1aWQuc2VhcmNoKHJlKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMucmVzdWx0c0lzUGRmID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAvLyBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgLy8gY29uc3QgZmlsZVRvTG9hZCA9IGZpbGVzWzBdO1xuICAgIC8vIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIC8vIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudCkgPT4ge1xuICAgIC8vICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgIC8vICAgY29uc3QgZmlsZVR5cGUgPSBkYXRhLnN1YnN0cmluZygnZGF0YTppbWFnZS8nLmxlbmd0aCwgZGF0YS5pbmRleE9mKCc7YmFzZTY0JykpO1xuICAgIC8vICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAvLyAgICAgZGF0YSxcbiAgICAvLyAgICAgZXh0ZW5zaW9uOiBmaWxlVHlwZVxuICAgIC8vICAgfTtcbiAgICAvLyB9O1xuICAgIC8vIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlVG9Mb2FkKTtcbiAgfVxuICBwdWJsaWMgZ2V0VXJsKCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5mZXRjaEZpbGUodGhpcy5maWxlVXVpZCwgJ3BkZicpLnN1YnNjcmliZSgoZmlsZSkgPT4ge1xuICAgICAgd2luZG93Lm9wZW4oZmlsZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5LCAnX2JsYW5rJyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==