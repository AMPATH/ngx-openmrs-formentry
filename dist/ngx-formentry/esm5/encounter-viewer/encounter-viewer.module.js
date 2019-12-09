import * as tslib_1 from "tslib";
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
// import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared.module';
var EncounterViewerModule = /** @class */ (function () {
    function EncounterViewerModule() {
    }
    EncounterViewerModule = tslib_1.__decorate([
        NgModule({
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
                // HttpModule,
                SharedModule
            ],
            providers: [
                EncounterViewerService,
                EncounterPdfViewerService
            ],
            exports: [
                EncounterContainerComponent
                // HttpModule
            ],
        })
    ], EncounterViewerModule);
    return EncounterViewerModule;
}());
export { EncounterViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXlCaEQ7SUFBQTtJQUFvQyxDQUFDO0lBQXhCLHFCQUFxQjtRQXhCakMsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLHdCQUF3QjtnQkFDeEIsMkJBQTJCO2dCQUMzQix3QkFBd0I7Z0JBQ3hCLG9CQUFvQjtnQkFDcEIscUJBQXFCO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVc7Z0JBQ1gsbUJBQW1CO2dCQUNuQixZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsWUFBWTthQUNmO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHNCQUFzQjtnQkFDdEIseUJBQXlCO2FBQzVCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDJCQUEyQjtnQkFDM0IsYUFBYTthQUNoQjtTQUNKLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0NBQUEsQUFBckMsSUFBcUM7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLWNvbnRhaW5lci9lbmNvdW50ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWxlUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9maWxlLXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFJlbW90ZUFuc3dlckNvbXBvbmVudCB9IGZyb20gJy4vZGlzcGxheS1jb250cm9scy9yZW1vdGUtYW5zd2VyLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQubW9kdWxlJztcbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEVuY291bnRlclZpZXdlckNvbXBvbmVudCxcbiAgICAgICAgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgIEZpbGVQcmV2aWV3Q29tcG9uZW50LFxuICAgICAgICBSZW1vdGVBbnN3ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgLy8gSHR0cE1vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICAgICAgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnRcbiAgICAgICAgLy8gSHR0cE1vZHVsZVxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlck1vZHVsZSB7fVxuIl19