import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';
var RemoteFileUploadModule = /** @class */ (function () {
    function RemoteFileUploadModule() {
    }
    RemoteFileUploadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SelectModule,
                        FormsModule,
                        SharedModule,
                        WebcamModule,
                        NgxFileUploaderModule
                    ],
                    exports: [FileUploadComponent],
                    declarations: [FileUploadComponent],
                    providers: []
                },] },
    ];
    return RemoteFileUploadModule;
}());
export { RemoteFileUploadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUM7SUFBQTtJQWFxQyxDQUFDOztnQkFickMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1oscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLFNBQVMsRUFBRSxFQUFFO2lCQUNkOztJQUNvQyw2QkFBQztDQUFBLEFBYnRDLElBYXNDO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlck1vZHVsZSB9IGZyb20gJ25neC1maWxlLXVwbG9hZGVyJztcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkLm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBTZWxlY3RNb2R1bGUgfSBmcm9tICduZzItc2VsZWN0L25nMi1zZWxlY3QnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2ViY2FtTW9kdWxlIH0gZnJvbSAnbmd4LXdlYmNhbSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2VsZWN0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBXZWJjYW1Nb2R1bGUsXG4gICAgTmd4RmlsZVVwbG9hZGVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtGaWxlVXBsb2FkQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbRmlsZVVwbG9hZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSB7fVxuIl19