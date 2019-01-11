/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader-ampath';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { RemoteFileUploadComponent } from './file-upload.component';
export class RemoteFileUploadModule {
}
RemoteFileUploadModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SelectModule, FormsModule, NgxFileUploaderModule, SharedModule],
                exports: [RemoteFileUploadComponent],
                declarations: [RemoteFileUploadComponent],
                providers: [],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRW5ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVFwRSxNQUFNLE9BQU8sc0JBQXNCOzs7WUFObEMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLFlBQVksQ0FBQztnQkFDdkYsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3BDLFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN6QyxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlck1vZHVsZSB9IGZyb20gJ25neC1maWxlLXVwbG9hZGVyLWFtcGF0aCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQubW9kdWxlJztcbi8vIGltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gJ25nMi1zZWxlY3QvbmcyLXNlbGVjdCc7XG5pbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IFJlbW90ZUZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2VsZWN0TW9kdWxlLCBGb3Jtc01vZHVsZSwgTmd4RmlsZVVwbG9hZGVyTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSZW1vdGVGaWxlVXBsb2FkQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlIHsgfVxuIl19