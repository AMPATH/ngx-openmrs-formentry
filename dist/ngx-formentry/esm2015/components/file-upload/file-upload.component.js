var FileUploadComponent_1;
import * as tslib_1 from "tslib";
import { Component, OnInit, Input, forwardRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let FileUploadComponent = FileUploadComponent_1 = class FileUploadComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.formEntryMode = true;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = (_) => { };
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
    }
    ngOnInit() {
        if (this.fileUuid) {
            this.checkFileType();
        }
    }
    onFileChange(fileList) {
        for (const file of fileList) {
            this.upload(file);
        }
    }
    upload(data) {
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe((result) => {
                this.fileUuid = result.image;
                this.checkFileType();
                this.propagateChange(this.fileUuid);
                this.uploading = false;
            }, (error) => {
                this.uploading = false;
            });
        }
    }
    // this is the initial value set to the component
    writeValue(value) {
        if (value !== this.fileUuid) {
            this.fileUuid = value;
            this.checkFileType();
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    clearValue() {
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.pdfUrl = null;
        this.propagateChange(this.fileUuid);
    }
    getPdfUrl(fileUuid) {
        this.dataSource.fetchFile(fileUuid, 'pdf').subscribe((file) => {
            this.pdfUploaded = true;
            this.pdfUrl = file.changingThisBreaksApplicationSecurity;
        });
    }
    checkFileType() {
        const re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.getPdfUrl(this.fileUuid);
        }
    }
};
FileUploadComponent.ctorParameters = () => [
    { type: Renderer2 }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], FileUploadComponent.prototype, "dataSource", null);
FileUploadComponent = FileUploadComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-file-upload',
        template: "<lib-file-uploader [srcUrl]=\"pdfUrl\" [formEntry]=\"formEntryMode\" [(ngModel)]=\"fileUuid\" (_onClear)=\"clearValue()\" (uploadData)=\"onFileChange($event)\">\n</lib-file-uploader>\n<div *ngIf=\"fileUuid\">\n    <img *ngIf=\"!pdfUploaded\" class=\"img-responsive\" [src]=\"fileUuid | secure:this.dataSource.fetchFile\" alt=\"\" />\n</div>",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FileUploadComponent_1),
                multi: true,
            }
        ],
        styles: [`img {
        margin-left: auto;margin-right: auto;display: block;
    }`]
    }),
    tslib_1.__metadata("design:paramtypes", [Renderer2])
], FileUploadComponent);
export { FileUploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBRUgsaUJBQWlCLEVBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFrQnhCLElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFtQjtJQWdCNUIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWZ2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUErRHJCLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQ3JDLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQXREQyxDQUFDO0lBUjVDLElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUtELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFFTCxDQUFDO0lBQ00sWUFBWSxDQUFDLFFBQVE7UUFDeEIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0s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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9zZWN1cmUucGlwZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1maWxlLXVwbG9hZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmaWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVVwbG9hZENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfV0sXG4gICAgc3R5bGVzOiBbYGltZyB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO21hcmdpbi1yaWdodDogYXV0bztkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIGZpbGVVdWlkID0gbnVsbDtcbiAgICBwZGZVcGxvYWRlZCA9IGZhbHNlO1xuICAgIGZvcm1FbnRyeU1vZGUgPSB0cnVlO1xuICAgIHBkZlVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHVibGljIG9uRmlsZUNoYW5nZShmaWxlTGlzdCkge1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWxlVXBsb2FkKGRhdGEpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlVXVpZCA9IHJlc3VsdC5pbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmZpbGVVdWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVVdWlkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gICAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgICAgIC8vIC4uLi4uXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgICAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICAgIHB1YmxpYyBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLmZpbGVVdWlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZGZVcGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBkZlVybCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZmlsZVV1aWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQZGZVcmwoZmlsZVV1aWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlKGZpbGVVdWlkLCAncGRmJykuc3Vic2NyaWJlKChmaWxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBkZlVwbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGRmVXJsID0gZmlsZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIGNoZWNrRmlsZVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL3BkZi9naTtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVV1aWQuc2VhcmNoKHJlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGRmVXJsKHRoaXMuZmlsZVV1aWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19