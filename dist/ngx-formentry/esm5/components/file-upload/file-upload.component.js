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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFFSCxpQkFBaUIsRUFDcEIsTUFBTSxnQkFBZ0IsQ0FBQztBQWtCeEI7SUFnQkksNkJBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFmdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBK0RyQixpREFBaUQ7UUFDakQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUNyQyxvQkFBZSxHQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsQ0FBQztJQXREQyxDQUFDOzRCQWhCbkMsbUJBQW1CO0lBUTVCLHNCQUFXLDJDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7YUFDRCxVQUFzQixDQUFhO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUhBO0lBUUQsc0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUVMLENBQUM7SUFDTSwwQ0FBWSxHQUFuQixVQUFvQixRQUFROzs7WUFDeEIsS0FBbUIsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtnQkFBeEIsSUFBTSxJ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QUFJO2lCQUNkO2FBQUM7cUJBQ0csNEVBRVA7U0FFTCxDQUFDO2lEQWlCZ0MsU0FBUztPQWhCOUIsbUJBQW1CLENBMkYvQjtJQUFELDBCQUFDO0NBQUEsQUEzRkQsSUEyRkM7U0EzRlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgU2VjdXJlUGlwZSB9IGZyb20gJy4vc2VjdXJlLnBpcGUnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZmlsZS11cGxvYWQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVVcGxvYWRDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH1dLFxuICAgIHN0eWxlczogW2BpbWcge1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bzttYXJnaW4tcmlnaHQ6IGF1dG87ZGlzcGxheTogYmxvY2s7XG4gICAgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgICBmaWxlVXVpZCA9IG51bGw7XG4gICAgcGRmVXBsb2FkZWQgPSBmYWxzZTtcbiAgICBmb3JtRW50cnlNb2RlID0gdHJ1ZTtcbiAgICBwZGZVcmw6IHN0cmluZztcbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBvbkZpbGVDaGFuZ2UoZmlsZUxpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZChmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGxvYWQoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsZVVwbG9hZChkYXRhKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVV1aWQgPSByZXN1bHQuaW1hZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5maWxlVXVpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgdGhlIGluaXRpYWwgdmFsdWUgc2V0IHRvIHRoZSBjb21wb25lbnRcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5maWxlVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5maWxlVXVpZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVnaXN0ZXJzICdmbicgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gY2hhbmdlcyBhcmUgbWFkZVxuICAgIC8vIHRoaXMgaXMgaG93IHdlIGVtaXQgdGhlIGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvLyBub3QgdXNlZCwgdXNlZCBmb3IgdG91Y2ggaW5wdXRcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cbiAgICAvLyBjaGFuZ2UgZXZlbnRzIGZyb20gdGhlIHRleHRhcmVhXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQuaWQpO1xuICAgICAgICAvLyAuLi4uLlxuICAgICAgICAvLyB1cGRhdGUgdGhlIGZvcm1cbiAgICAgICAgLy8gdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5kYXRhKTtcbiAgICB9XG5cblxuICAgIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcbiAgICAvLyBhIHBsYWNlaG9sZGVyIGZvciBhIG1ldGhvZCB0aGF0IHRha2VzIG9uZSBwYXJhbWV0ZXIsXG4gICAgLy8gd2UgdXNlIGl0IHRvIGVtaXQgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gICAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5maWxlVXVpZCA9IG51bGw7XG4gICAgICAgIHRoaXMucGRmVXBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wZGZVcmwgPSBudWxsO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmZpbGVVdWlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGRmVXJsKGZpbGVVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZldGNoRmlsZShmaWxlVXVpZCwgJ3BkZicpLnN1YnNjcmliZSgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZGZVcGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBkZlVybCA9IGZpbGUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBjaGVja0ZpbGVUeXBlKCkge1xuICAgICAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVdWlkLnNlYXJjaChyZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmdldFBkZlVybCh0aGlzLmZpbGVVdWlkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==