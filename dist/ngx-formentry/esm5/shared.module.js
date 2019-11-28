import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
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
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFhckU7SUFBQTtJQUEyQixDQUFDO0lBQWYsWUFBWTtRQVp4QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YsVUFBVTthQUNiO1lBQ0QsT0FBTyxFQUFFLENBQUUsWUFBWSxDQUFFO1lBQ3pCLE9BQU8sRUFBRTtnQkFDTCxVQUFVO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVzthQUNkO1NBQ0osQ0FBQztPQUNXLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBNUIsSUFBNEI7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU2VjdXJlUGlwZVxuICAgIF0sXG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNlY3VyZVBpcGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEYXRhU291cmNlc1xuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7fVxuIl19