import * as tslib_1 from "tslib";
import { Component, OnInit, Input, forwardRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.formEntryMode = true;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    FileUploadComponent_1 = FileUploadComponent;
    Object.defineProperty(FileUploadComponent.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        set: function (v) {
            this._dataSource = v;
        },
        enumerable: true,
        configurable: true
    });
    FileUploadComponent.prototype.ngOnInit = function () {
        if (this.fileUuid) {
            this.checkFileType();
        }
    };
    FileUploadComponent.prototype.onFileChange = function (fileList) {
        var e_1, _a;
        try {
            for (var fileList_1 = tslib_1.__values(fileList), fileList_1_1 = fileList_1.next(); !fileList_1_1.done; fileList_1_1 = fileList_1.next()) {
                var file = fileList_1_1.value;
                this.upload(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fileList_1_1 && !fileList_1_1.done && (_a = fileList_1.return)) _a.call(fileList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    FileUploadComponent.prototype.upload = function (data) {
        var _this = this;
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe(function (result) {
                _this.fileUuid = result.image;
                _this.checkFileType();
                _this.propagateChange(_this.fileUuid);
                _this.uploading = false;
            }, function (error) {
                _this.uploading = false;
            });
        }
    };
    // this is the initial value set to the component
    FileUploadComponent.prototype.writeValue = function (value) {
        if (value !== this.fileUuid) {
            this.fileUuid = value;
            this.checkFileType();
        }
    };
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // not used, used for touch input
    FileUploadComponent.prototype.registerOnTouched = function () { };
    // change events from the textarea
    FileUploadComponent.prototype.onChange = function (event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    };
    FileUploadComponent.prototype.clearValue = function () {
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.pdfUrl = null;
        this.propagateChange(this.fileUuid);
    };
    FileUploadComponent.prototype.getPdfUrl = function (fileUuid) {
        var _this = this;
        this.dataSource.fetchFile(fileUuid, 'pdf').subscribe(function (file) {
            _this.pdfUploaded = true;
            _this.pdfUrl = file.changingThisBreaksApplicationSecurity;
        });
    };
    FileUploadComponent.prototype.checkFileType = function () {
        var re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.getPdfUrl(this.fileUuid);
        }
    };
    var FileUploadComponent_1;
    FileUploadComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
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
                    useExisting: forwardRef(function () { return FileUploadComponent_1; }),
                    multi: true,
                }
            ],
            styles: ["img {\n        margin-left: auto;margin-right: auto;display: block;\n    }"]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
export { FileUploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUVILGlCQUFpQixFQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBa0J4QjtJQWdCSSw2QkFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWZ2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUErRHJCLGlEQUFpRDtRQUNqRCx1REFBdUQ7UUFDdkQsNkNBQTZDO1FBQ3JDLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxDQUFDO0lBdERDLENBQUM7NEJBaEJuQyxtQkFBbUI7SUFRNUIsc0JBQVcsMkNBQVU7YUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzthQUNELFVBQXNCLENBQWE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQzs7O09BSEE7SUFRRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBRUwsQ0FBQztJQUNNLDBDQUFZLEdBQW5CLFVBQW9CLFFBQVE7OztZQUN4QixLQUFtQixJQUFBLGFBQUEsaUJBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFF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bEQsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFBQztxQkFDRyw0RUFFUDtTQUVMLENBQUM7aURBaUJnQyxTQUFTO09BaEI5QixtQkFBbUIsQ0EyRi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTNGRCxJQTJGQztTQTNGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9zZWN1cmUucGlwZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1maWxlLXVwbG9hZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdmaWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVVwbG9hZENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfV0sXG4gICAgc3R5bGVzOiBbYGltZyB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO21hcmdpbi1yaWdodDogYXV0bztkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIHVwbG9hZGluZyA9IGZhbHNlO1xuICAgIGZpbGVVdWlkID0gbnVsbDtcbiAgICBwZGZVcGxvYWRlZCA9IGZhbHNlO1xuICAgIGZvcm1FbnRyeU1vZGUgPSB0cnVlO1xuICAgIHBkZlVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGRhdGFTb3VyY2UodjogRGF0YVNvdXJjZSkge1xuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgcHVibGljIG9uRmlsZUNoYW5nZShmaWxlTGlzdCkge1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwbG9hZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWxlVXBsb2FkKGRhdGEpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlVXVpZCA9IHJlc3VsdC5pbWFnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmZpbGVVdWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVVdWlkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gICAgLy8gdGhpcyBpcyBob3cgd2UgZW1pdCB0aGUgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuICAgIC8vIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdGV4dGFyZWFcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC5pZCk7XG4gICAgICAgIC8vIC4uLi4uXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgICAgICAvLyB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuXG4gICAgLy8gdGhlIG1ldGhvZCBzZXQgaW4gcmVnaXN0ZXJPbkNoYW5nZSwgaXQgaXMganVzdFxuICAgIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICAgIHB1YmxpYyBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLmZpbGVVdWlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZGZVcGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBkZlVybCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZmlsZVV1aWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQZGZVcmwoZmlsZVV1aWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlKGZpbGVVdWlkLCAncGRmJykuc3Vic2NyaWJlKChmaWxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBkZlVwbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGRmVXJsID0gZmlsZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIGNoZWNrRmlsZVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL3BkZi9naTtcbiAgICAgICAgaWYgKHRoaXMuZmlsZVV1aWQuc2VhcmNoKHJlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGRmVXJsKHRoaXMuZmlsZVV1aWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19