import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, Renderer2 } from '@angular/core';
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
        var e_1, _a;
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
    FileUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-file-upload',
                    template: "<lib-file-uploader\n  [srcUrl]=\"pdfUrl\"\n  [formEntry]=\"formEntryMode\"\n  [(ngModel)]=\"fileUuid\"\n  (_onClear)=\"clearValue()\"\n  (uploadData)=\"onFileChange($event)\"\n>\n</lib-file-uploader>\n<div *ngIf=\"fileUuid\">\n  <img\n    *ngIf=\"!pdfUploaded\"\n    class=\"img-responsive\"\n    [src]=\"fileUuid | secure: this.dataSource.fetchFile\"\n    alt=\"\"\n  />\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return FileUploadComponent; }),
                            multi: true
                        }
                    ],
                    styles: [
                        "\n      img {\n        margin-left: auto;\n        margin-right: auto;\n        display: block;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    FileUploadComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    FileUploadComponent.propDecorators = {
        dataSource: [{ type: Input }]
    };
    return FileUploadComponent;
}());
export { FileUploadComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekU7SUFtREUsNkJBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBK0RyQixpREFBaUQ7UUFDakQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUNyQyxvQkFBZSxHQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsQ0FBQztJQXZEQyxDQUFDO0lBUjNDLHNCQUNXLDJDQUFVO2FBRHJCO1lBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzthQUNELFVBQXNCLENBQWE7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQzs7O09BSEE7SUFPRCxzQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBQ00sMENBQVksR0FBbkIsVUFBb0IsUUFBUTs7WUFDMUIsR0FBRyxDQUFDLENBQWUsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQTtnQkFB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bUJBQW1CLEVBQW5CLENBQW1CLENBQUM7NEJBQ2xELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO29CQUNELE1BQU0sRUFBRTt3QkFDTixnSEFNQztxQkFDRjtpQkFDRjs7OztnQkExQ0MsU0FBUzs7OzZCQWtEUixLQUFLOztJQW9GUiwwQkFBQztDQUFBLEFBL0hELElBK0hDO1NBM0ZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgUmVuZGVyZXIyLFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgU2VjdXJlUGlwZSB9IGZyb20gJy4vc2VjdXJlLnBpcGUnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWZpbGUtdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8bGliLWZpbGUtdXBsb2FkZXJcbiAgW3NyY1VybF09XCJwZGZVcmxcIlxuICBbZm9ybUVudHJ5XT1cImZvcm1FbnRyeU1vZGVcIlxuICBbKG5nTW9kZWwpXT1cImZpbGVVdWlkXCJcbiAgKF9vbkNsZWFyKT1cImNsZWFyVmFsdWUoKVwiXG4gICh1cGxvYWREYXRhKT1cIm9uRmlsZUNoYW5nZSgkZXZlbnQpXCJcbj5cbjwvbGliLWZpbGUtdXBsb2FkZXI+XG48ZGl2ICpuZ0lmPVwiZmlsZVV1aWRcIj5cbiAgPGltZ1xuICAgICpuZ0lmPVwiIXBkZlVwbG9hZGVkXCJcbiAgICBjbGFzcz1cImltZy1yZXNwb25zaXZlXCJcbiAgICBbc3JjXT1cImZpbGVVdWlkIHwgc2VjdXJlOiB0aGlzLmRhdGFTb3VyY2UuZmV0Y2hGaWxlXCJcbiAgICBhbHQ9XCJcIlxuICAvPlxuPC9kaXY+XG5gLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVVcGxvYWRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIGltZyB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHVwbG9hZGluZyA9IGZhbHNlO1xuICBmaWxlVXVpZCA9IG51bGw7XG4gIHBkZlVwbG9hZGVkID0gZmFsc2U7XG4gIGZvcm1FbnRyeU1vZGUgPSB0cnVlO1xuICBwZGZVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICB9XG4gIHB1YmxpYyBzZXQgZGF0YVNvdXJjZSh2OiBEYXRhU291cmNlKSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IHY7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgb25GaWxlQ2hhbmdlKGZpbGVMaXN0KSB7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVMaXN0KSB7XG4gICAgICB0aGlzLnVwbG9hZChmaWxlKTtcbiAgICB9XG4gIH1cbiAgdXBsb2FkKGRhdGEpIHtcbiAgICBpZiAodGhpcy5kYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZmlsZVVwbG9hZChkYXRhKS5zdWJzY3JpYmUoXG4gICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbGVVdWlkID0gcmVzdWx0LmltYWdlO1xuICAgICAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZmlsZVV1aWQpO1xuICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gdGhpcyBpcyB0aGUgaW5pdGlhbCB2YWx1ZSBzZXQgdG8gdGhlIGNvbXBvbmVudFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbGVVdWlkKSB7XG4gICAgICB0aGlzLmZpbGVVdWlkID0gdmFsdWU7XG4gICAgICB0aGlzLmNoZWNrRmlsZVR5cGUoKTtcbiAgICB9XG4gIH1cbiAgLy8gcmVnaXN0ZXJzICdmbicgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gY2hhbmdlcyBhcmUgbWFkZVxuICAvLyB0aGlzIGlzIGhvdyB3ZSBlbWl0IHRoZSBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICAvLyBub3QgdXNlZCwgdXNlZCBmb3IgdG91Y2ggaW5wdXRcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cbiAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICBvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGV2ZW50LmlkKTtcbiAgICAvLyAuLi4uLlxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIC8vIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZGF0YSk7XG4gIH1cblxuICAvLyB0aGUgbWV0aG9kIHNldCBpbiByZWdpc3Rlck9uQ2hhbmdlLCBpdCBpcyBqdXN0XG4gIC8vIGEgcGxhY2Vob2xkZXIgZm9yIGEgbWV0aG9kIHRoYXQgdGFrZXMgb25lIHBhcmFtZXRlcixcbiAgLy8gd2UgdXNlIGl0IHRvIGVtaXQgY2hhbmdlcyBiYWNrIHRvIHRoZSBmb3JtXG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgcHVibGljIGNsZWFyVmFsdWUoKSB7XG4gICAgdGhpcy5maWxlVXVpZCA9IG51bGw7XG4gICAgdGhpcy5wZGZVcGxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMucGRmVXJsID0gbnVsbDtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLmZpbGVVdWlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQZGZVcmwoZmlsZVV1aWQ6IHN0cmluZykge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5mZXRjaEZpbGUoZmlsZVV1aWQsICdwZGYnKS5zdWJzY3JpYmUoKGZpbGUpID0+IHtcbiAgICAgIHRoaXMucGRmVXBsb2FkZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wZGZVcmwgPSBmaWxlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGNoZWNrRmlsZVR5cGUoKSB7XG4gICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgIGlmICh0aGlzLmZpbGVVdWlkLnNlYXJjaChyZSkgIT09IC0xKSB7XG4gICAgICB0aGlzLmdldFBkZlVybCh0aGlzLmZpbGVVdWlkKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==