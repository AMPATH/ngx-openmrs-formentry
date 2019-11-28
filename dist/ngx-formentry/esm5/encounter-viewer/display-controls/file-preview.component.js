import * as tslib_1 from "tslib";
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
    FilePreviewComponent_1 = FilePreviewComponent;
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
    var FilePreviewComponent_1;
    FilePreviewComponent.ctorParameters = function () { return [
        { type: EncounterViewerService }
    ]; };
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
            template: "<div *ngIf=\"fileUuid\">\n              <img *ngIf=\"!resultsIsPdf\" class=\"img-responsive\"\n                [src]=\"fileUuid | secure:this._dataSource.fetchFile\" alt=\"image\" />\n                </div>\n                <a *ngIf=\"resultsIsPdf\" (click)=\"getUrl()\" style=\"cursor: pointer\"><u>Open PDF</u></a>\n                ",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return FilePreviewComponent_1; }),
                    multi: true
                }
            ],
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [EncounterViewerService])
    ], FilePreviewComponent);
    return FilePreviewComponent;
}());
export { FilePreviewComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3pCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxJQUFNLElBQUksR0FBRyxjQUFPLENBQUMsQ0FBQzs7QUFvQnRCO0lBaUJJLDhCQUFvQixnQkFBd0M7UUFBeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtRQWZyRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBUzVCLDJEQUEyRDtRQUMzRCxnQ0FBZ0M7UUFDeEIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFDYSxDQUFDOzZCQWpCdkQsb0JBQW9CO0lBTzdCLHNCQUFXLDRDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7YUFDRCxVQUFzQixDQUFhO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUhBO0lBU0QsdUNBQVEsR0FBUixjQUFjLENBQUM7SUFFZixzQkFBSSx1Q0FBSztRQURULGVBQWU7YUFDZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO1FBRUQsb0RBQW9EO2FBQ3BELFVBQVUsQ0FBTTtZQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQzs7O09BUEE7SUFRRCx1QkFBdUI7SUFFaEIseUNBQVUsR0FBakIsVUFBa0IsQ0FBTTtRQUN0QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFDTSw0Q0FBYSxHQUFwQjtRQUNFLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDVCxDQUFDO0lBRUMsc0NBQXNDO0lBQy9CLCtDQUFnQixHQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNDQUFzQztJQUMvQixnREFBaUIsR0FBeEIsVUFBeUIsRUFBTztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxxQ0FBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHVDQUFRLEdBQWYsVUFBZ0IsS0FBVTtRQUN4Qix3Q0FBd0M7UUFDeEMsK0JBQStCO1FBRS9CLHVDQUF1QztRQUV2Qyw2Q0FBNkM7UUFDN0Msb0NBQW9DO1FBQ3BDLG9GQUFvRjtRQUNwRixzQkFBc0I7UUFDdEIsWUFBWTtRQUNaLDBCQUEwQjtRQUMxQixPQUFPO1FBQ1AsS0FBSztRQUVMLHdDQUF3QztJQUMxQyxDQUFDO0lBQ0kscUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRyxRQUFRLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztnQkEvRHVDLHNCQUFzQjs7SUFoQm5EO1FBQVIsS0FBSyxFQUFFOzt3REFBb0I7SUFNNUI7UUFEQyxLQUFLLEVBQUU7OzswREFHUDtJQVRRLG9CQUFvQjtRQWxCaEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFFeEIsUUFBUSxFQUFFLGdWQUtHO1lBRWIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHNCQUFvQixFQUFwQixDQUFvQixDQUFDO29CQUNuRCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO3FCQWRRLEVBQUU7U0FlWixDQUFDO2lEQWtCc0Msc0JBQXNCO09BakJuRCxvQkFBb0IsQ0FpRmhDO0lBQUQsMkJBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQWpGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZixcbiAgICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmaWxlLXByZXZpZXcnLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJmaWxlVXVpZFwiPlxuICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiIXJlc3VsdHNJc1BkZlwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxuICAgICAgICAgICAgICAgIFtzcmNdPVwiZmlsZVV1aWQgfCBzZWN1cmU6dGhpcy5fZGF0YVNvdXJjZS5mZXRjaEZpbGVcIiBhbHQ9XCJpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJyZXN1bHRzSXNQZGZcIiAoY2xpY2spPVwiZ2V0VXJsKClcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiPjx1Pk9wZW4gUERGPC91PjwvYT5cbiAgICAgICAgICAgICAgICBgLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlUHJldmlld0NvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9KVxuZXhwb3J0IGNsYXNzIEZpbGVQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICAgIHB1YmxpYyBmaWxlVXVpZCA9IG51bGw7XG4gICAgcHVibGljIHBkZlVybDogYW55O1xuICAgIHB1YmxpYyByZXN1bHRzSXNQZGYgPSBmYWxzZTtcbiAgICBwdWJsaWMgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmNvdW50ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlKSB7fVxuICAgIG5nT25Jbml0KCkgeyAgfVxuICAgIC8vIGdldCBhY2Nlc3NvclxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZVV1aWQ7XG4gICAgfVxuXG4gICAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICAgIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgIHRoaXMuZmlsZVV1aWQgPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5maWxlVXVpZCkge1xuICAgICAgICAgIHRoaXMuZmlsZVV1aWQgPSB2O1xuICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjaGVja0ZpbGVUeXBlKCkge1xuICAgICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgICAgICAgIGlmICh0aGlzLmZpbGVVdWlkLnNlYXJjaChyZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNJc1BkZiA9IHRydWU7XG4gICAgICAgICAgfVxuICB9XG5cbiAgICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CbHVyKCkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgICAvLyBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXNbMF07XG5cbiAgICAgIC8vIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQpID0+IHtcbiAgICAgIC8vICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgLy8gICBjb25zdCBmaWxlVHlwZSA9IGRhdGEuc3Vic3RyaW5nKCdkYXRhOmltYWdlLycubGVuZ3RoLCBkYXRhLmluZGV4T2YoJztiYXNlNjQnKSk7XG4gICAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAvLyAgICAgZGF0YSxcbiAgICAgIC8vICAgICBleHRlbnNpb246IGZpbGVUeXBlXG4gICAgICAvLyAgIH07XG4gICAgICAvLyB9O1xuXG4gICAgICAvLyBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZVRvTG9hZCk7XG4gICAgfVxuICBwdWJsaWMgZ2V0VXJsKCkge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmZldGNoRmlsZSh0aGlzLmZpbGVVdWlkLCAncGRmJykuc3Vic2NyaWJlKChmaWxlKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKGZpbGUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSAsICdfYmxhbmsnKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=