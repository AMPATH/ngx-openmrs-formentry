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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQ7SUFBQTtJQWtCb0MsQ0FBQzs7Z0JBbEJwQyxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsMkJBQTJCO3dCQUMzQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixZQUFZO3FCQUNiO29CQUNELFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLHlCQUF5QixDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDekQ7O0lBQ21DLDRCQUFDO0NBQUEsQUFsQnJDLElBa0JxQztTQUF4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItY29udGFpbmVyL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItcGRmLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVtb3RlQW5zd2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL3JlbW90ZS1hbnN3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEVuY291bnRlclZpZXdlckNvbXBvbmVudCxcbiAgICBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50LFxuICAgIEZpbGVQcmV2aWV3Q29tcG9uZW50LFxuICAgIFJlbW90ZUFuc3dlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbRW5jb3VudGVyVmlld2VyU2VydmljZSwgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZV0sXG4gIGV4cG9ydHM6IFtFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQsIEh0dHBDbGllbnRNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlck1vZHVsZSB7fVxuIl19