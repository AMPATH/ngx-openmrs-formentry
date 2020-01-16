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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQWtCeEIsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBZ0I1QixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBZnZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQStEckIsaURBQWlEO1FBQ2pELHVEQUF1RDtRQUN2RCw2Q0FBNkM7UUFDckMsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBdERDLENBQUM7SUFSNUMsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsQ0FBYTtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBS0QsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUVMLENBQUM7SUFDTSxZQUFZLENBQUMsUUFBUTtRQUN4QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJ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M0ZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IFNlY3VyZVBpcGUgfSBmcm9tICcuL3NlY3VyZS5waXBlJztcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWZpbGUtdXBsb2FkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlVXBsb2FkQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9XSxcbiAgICBzdHlsZXM6IFtgaW1nIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87bWFyZ2luLXJpZ2h0OiBhdXRvO2Rpc3BsYXk6IGJsb2NrO1xuICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgdXBsb2FkaW5nID0gZmFsc2U7XG4gICAgZmlsZVV1aWQgPSBudWxsO1xuICAgIHBkZlVwbG9hZGVkID0gZmFsc2U7XG4gICAgZm9ybUVudHJ5TW9kZSA9IHRydWU7XG4gICAgcGRmVXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5maWxlVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgb25GaWxlQ2hhbmdlKGZpbGVMaXN0KSB7XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlTGlzdCkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWQoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBsb2FkKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmZpbGVVcGxvYWQoZGF0YSkuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVVdWlkID0gcmVzdWx0LmltYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZmlsZVV1aWQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIHZhbHVlIHNldCB0byB0aGUgY29tcG9uZW50XG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVV1aWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlZ2lzdGVycyAnZm4nIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGNoYW5nZXMgYXJlIG1hZGVcbiAgICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLy8gbm90IHVzZWQsIHVzZWQgZm9yIHRvdWNoIGlucHV0XG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG4gICAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAgICAgLy8gLi4uLi5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvLyB0aGUgbWV0aG9kIHNldCBpbiByZWdpc3Rlck9uQ2hhbmdlLCBpdCBpcyBqdXN0XG4gICAgLy8gYSBwbGFjZWhvbGRlciBmb3IgYSBtZXRob2QgdGhhdCB0YWtlcyBvbmUgcGFyYW1ldGVyLFxuICAgIC8vIHdlIHVzZSBpdCB0byBlbWl0IGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICAgIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG4gICAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgICAgIHRoaXMuZmlsZVV1aWQgPSBudWxsO1xuICAgICAgICB0aGlzLnBkZlVwbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGRmVXJsID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5maWxlVXVpZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBkZlVybChmaWxlVXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5mZXRjaEZpbGUoZmlsZVV1aWQsICdwZGYnKS5zdWJzY3JpYmUoKGZpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGRmVXBsb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wZGZVcmwgPSBmaWxlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgY2hlY2tGaWxlVHlwZSgpIHtcbiAgICAgICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgICAgICBpZiAodGhpcy5maWxlVXVpZC5zZWFyY2gocmUpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5nZXRQZGZVcmwodGhpcy5maWxlVXVpZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=