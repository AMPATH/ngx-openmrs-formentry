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
export class EncounterViewerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFtQmhELE1BQU07OztZQWxCTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHdCQUF3QjtvQkFDeEIsMkJBQTJCO29CQUMzQix3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEIscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixZQUFZO2lCQUNiO2dCQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDO2dCQUM5RCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxnQkFBZ0IsQ0FBQzthQUN6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItdmlldy9lbmNvdW50ZXItdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsZVByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvZmlsZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZW1vdGVBbnN3ZXJDb21wb25lbnQgfSBmcm9tICcuL2Rpc3BsYXktY29udHJvbHMvcmVtb3RlLWFuc3dlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50LFxuICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQsXG4gICAgRmlsZVByZXZpZXdDb21wb25lbnQsXG4gICAgUmVtb3RlQW5zd2VyQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLCBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW0VuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCwgSHR0cENsaWVudE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyTW9kdWxlIHt9XG4iXX0=