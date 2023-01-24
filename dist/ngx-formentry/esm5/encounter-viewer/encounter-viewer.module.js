import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlComponent } from './display-controls/question-control.component';
import { FilePreviewComponent } from './display-controls/file-preview.component';
import { RemoteAnswerComponent } from './display-controls/remote-answer.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared.module';
var EncounterViewerModule = /** @class */ (function () {
    function EncounterViewerModule() {
    }
    EncounterViewerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        EncounterViewerComponent,
                        EncounterContainerComponent,
                        QuestionControlComponent,
                        FilePreviewComponent,
                        RemoteAnswerComponent
                    ],
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        HttpClientModule,
                        SharedModule
                    ],
                    providers: [EncounterViewerService, EncounterPdfViewerService],
                    exports: [EncounterContainerComponent, HttpClientModule]
                },] },
    ];
    return EncounterViewerModule;
}());
export { EncounterViewerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdkYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDbEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRDtJQUFBO0lBa0JvQyxDQUFDOztnQkFsQnBDLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3dCQUN4QiwyQkFBMkI7d0JBQzNCLHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFlBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLENBQUM7b0JBQzlELE9BQU8sRUFBRSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDO2lCQUN6RDs7SUFDbUMsNEJBQUM7Q0FBQSxBQWxCckMsSUFrQnFDO1NBQXhCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItdmlldy9lbmNvdW50ZXItdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvZmlsZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZW1vdGVBbnN3ZXJDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50LFxuICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQsXG4gICAgRmlsZVByZXZpZXdDb21wb25lbnQsXG4gICAgUmVtb3RlQW5zd2VyQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLCBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW0VuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCwgSHR0cENsaWVudE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyTW9kdWxlIHt9XG4iXX0=