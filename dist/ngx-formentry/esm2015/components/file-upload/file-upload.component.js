import { Component, Input, forwardRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class FileUploadComponent {
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
}
FileUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-file-upload',
                template: `<lib-file-uploader
  [srcUrl]="pdfUrl"
  [formEntry]="formEntryMode"
  [(ngModel)]="fileUuid"
  (_onClear)="clearValue()"
  (uploadData)="onFileChange($event)"
>
</lib-file-uploader>
<div *ngIf="fileUuid">
  <img
    *ngIf="!pdfUploaded"
    class="img-responsive"
    [src]="fileUuid | secure: this.dataSource.fetchFile"
    alt=""
  />
</div>
`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => FileUploadComponent),
                        multi: true
                    }
                ],
                styles: [
                    `
      img {
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
    `
                ]
            },] },
];
/** @nocollapse */
FileUploadComponent.ctorParameters = () => [
    { type: Renderer2 }
];
FileUploadComponent.propDecorators = {
    dataSource: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXdDekUsTUFBTTtJQWVKLFlBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBK0RyQixpREFBaUQ7UUFDakQsdURBQXVEO1FBQ3ZELDZDQUE2QztRQUNyQyxvQkFBZSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7SUF2REMsQ0FBQztJQVIzQyxJQUNXLFVBQVU7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQVcsVUFBVSxDQUFDLENBQWE7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUlELFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFDTSxZQUFZLENBQUMsUUFBUTtRQUMxQixHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElB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QUU7b0JBQ047Ozs7OztLQU1DO2lCQUNGO2FBQ0Y7Ozs7WUExQ0MsU0FBUzs7O3lCQWtEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBmb3J3YXJkUmVmLFxuICBSZW5kZXJlcjIsXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9zZWN1cmUucGlwZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZmlsZS11cGxvYWQnLFxuICB0ZW1wbGF0ZTogYDxsaWItZmlsZS11cGxvYWRlclxuICBbc3JjVXJsXT1cInBkZlVybFwiXG4gIFtmb3JtRW50cnldPVwiZm9ybUVudHJ5TW9kZVwiXG4gIFsobmdNb2RlbCldPVwiZmlsZVV1aWRcIlxuICAoX29uQ2xlYXIpPVwiY2xlYXJWYWx1ZSgpXCJcbiAgKHVwbG9hZERhdGEpPVwib25GaWxlQ2hhbmdlKCRldmVudClcIlxuPlxuPC9saWItZmlsZS11cGxvYWRlcj5cbjxkaXYgKm5nSWY9XCJmaWxlVXVpZFwiPlxuICA8aW1nXG4gICAgKm5nSWY9XCIhcGRmVXBsb2FkZWRcIlxuICAgIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIlxuICAgIFtzcmNdPVwiZmlsZVV1aWQgfCBzZWN1cmU6IHRoaXMuZGF0YVNvdXJjZS5mZXRjaEZpbGVcIlxuICAgIGFsdD1cIlwiXG4gIC8+XG48L2Rpdj5cbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZVVwbG9hZENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgaW1nIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgdXBsb2FkaW5nID0gZmFsc2U7XG4gIGZpbGVVdWlkID0gbnVsbDtcbiAgcGRmVXBsb2FkZWQgPSBmYWxzZTtcbiAgZm9ybUVudHJ5TW9kZSA9IHRydWU7XG4gIHBkZlVybDogc3RyaW5nO1xuICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhU291cmNlKHY6IERhdGFTb3VyY2UpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlID0gdjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5maWxlVXVpZCkge1xuICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBvbkZpbGVDaGFuZ2UoZmlsZUxpc3QpIHtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUxpc3QpIHtcbiAgICAgIHRoaXMudXBsb2FkKGZpbGUpO1xuICAgIH1cbiAgfVxuICB1cGxvYWQoZGF0YSkge1xuICAgIGlmICh0aGlzLmRhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWxlVXBsb2FkKGRhdGEpLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsZVV1aWQgPSByZXN1bHQuaW1hZ2U7XG4gICAgICAgICAgdGhpcy5jaGVja0ZpbGVUeXBlKCk7XG4gICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5maWxlVXVpZCk7XG4gICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyB0aGlzIGlzIHRoZSBpbml0aWFsIHZhbHVlIHNldCB0byB0aGUgY29tcG9uZW50XG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuZmlsZVV1aWQpIHtcbiAgICAgIHRoaXMuZmlsZVV1aWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hlY2tGaWxlVHlwZSgpO1xuICAgIH1cbiAgfVxuICAvLyByZWdpc3RlcnMgJ2ZuJyB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBjaGFuZ2VzIGFyZSBtYWRlXG4gIC8vIHRoaXMgaXMgaG93IHdlIGVtaXQgdGhlIGNoYW5nZXMgYmFjayB0byB0aGUgZm9ybVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIG5vdCB1c2VkLCB1c2VkIGZvciB0b3VjaCBpbnB1dFxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoKSB7fVxuICAvLyBjaGFuZ2UgZXZlbnRzIGZyb20gdGhlIHRleHRhcmVhXG4gIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQuaWQpO1xuICAgIC8vIC4uLi4uXG4gICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgLy8gdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5kYXRhKTtcbiAgfVxuXG4gIC8vIHRoZSBtZXRob2Qgc2V0IGluIHJlZ2lzdGVyT25DaGFuZ2UsIGl0IGlzIGp1c3RcbiAgLy8gYSBwbGFjZWhvbGRlciBmb3IgYSBtZXRob2QgdGhhdCB0YWtlcyBvbmUgcGFyYW1ldGVyLFxuICAvLyB3ZSB1c2UgaXQgdG8gZW1pdCBjaGFuZ2VzIGJhY2sgdG8gdGhlIGZvcm1cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuICBwdWJsaWMgY2xlYXJWYWx1ZSgpIHtcbiAgICB0aGlzLmZpbGVVdWlkID0gbnVsbDtcbiAgICB0aGlzLnBkZlVwbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5wZGZVcmwgPSBudWxsO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuZmlsZVV1aWQpO1xuICB9XG5cbiAgcHVibGljIGdldFBkZlVybChmaWxlVXVpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRhU291cmNlLmZldGNoRmlsZShmaWxlVXVpZCwgJ3BkZicpLnN1YnNjcmliZSgoZmlsZSkgPT4ge1xuICAgICAgdGhpcy5wZGZVcGxvYWRlZCA9IHRydWU7XG4gICAgICB0aGlzLnBkZlVybCA9IGZpbGUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgY2hlY2tGaWxlVHlwZSgpIHtcbiAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgaWYgKHRoaXMuZmlsZVV1aWQuc2VhcmNoKHJlKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZ2V0UGRmVXJsKHRoaXMuZmlsZVV1aWQpO1xuICAgIH1cbiAgfVxufVxuIl19