/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader-ampath';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { RemoteFileUploadComponent } from './file-upload.component';
var RemoteFileUploadModule = /** @class */ (function () {
    function RemoteFileUploadModule() {
    }
    RemoteFileUploadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, SelectModule, FormsModule, NgxFileUploaderModule, SharedModule],
                    exports: [RemoteFileUploadComponent],
                    declarations: [RemoteFileUploadComponent],
                    providers: [],
                },] },
    ];
    return RemoteFileUploadModule;
}());
export { RemoteFileUploadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRTtJQUFBO0lBTXNDLENBQUM7O2dCQU50QyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxDQUFDO29CQUN2RixPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDcEMsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLFNBQVMsRUFBRSxFQUFFO2lCQUNoQjs7SUFDcUMsNkJBQUM7Q0FBQSxBQU52QyxJQU11QztTQUExQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlck1vZHVsZSB9IGZyb20gJ25neC1maWxlLXVwbG9hZGVyLWFtcGF0aCc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC5tb2R1bGUnO1xyXG4vLyBpbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICduZzItc2VsZWN0L25nMi1zZWxlY3QnO1xyXG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcclxuaW1wb3J0IHsgUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vZmlsZS11cGxvYWQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTZWxlY3RNb2R1bGUsIEZvcm1zTW9kdWxlLCBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUsIFNoYXJlZE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbUmVtb3RlRmlsZVVwbG9hZENvbXBvbmVudF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlIHsgfVxyXG4iXX0=