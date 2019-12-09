import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            SecurePipe
        ],
        imports: [CommonModule],
        exports: [
            SecurePipe
        ],
        providers: [
            DataSources
        ],
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsic2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQWFyRSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUcsQ0FBQTtBQUFmLFlBQVk7SUFaeEIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1YsVUFBVTtTQUNiO1FBQ0QsT0FBTyxFQUFFLENBQUUsWUFBWSxDQUFFO1FBQ3pCLE9BQU8sRUFBRTtZQUNMLFVBQVU7U0FDYjtRQUNELFNBQVMsRUFBRTtZQUNQLFdBQVc7U0FDZDtLQUNKLENBQUM7R0FDVyxZQUFZLENBQUc7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU2VjdXJlUGlwZVxuICAgIF0sXG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNlY3VyZVBpcGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEYXRhU291cmNlc1xuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19