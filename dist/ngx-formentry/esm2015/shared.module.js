import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SecurePipe],
                imports: [CommonModule],
                exports: [SecurePipe],
                providers: [DataSources]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQU9yRSxNQUFNOzs7WUFOTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTZWN1cmVQaXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL3NlY3VyZS5waXBlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbU2VjdXJlUGlwZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbU2VjdXJlUGlwZV0sXG4gIHByb3ZpZGVyczogW0RhdGFTb3VyY2VzXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==