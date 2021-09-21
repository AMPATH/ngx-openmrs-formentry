import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';
export class RemoteFileUploadModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCx3REFBd0Q7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFlMUMsTUFBTTs7O1lBYkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxZQUFZO29CQUNaLFlBQVk7b0JBQ1oscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQ25DLFNBQVMsRUFBRSxFQUFFO2FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUgfSBmcm9tICduZ3gtZmlsZS11cGxvYWRlcic7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC5tb2R1bGUnO1xuLy8gaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnbmcyLXNlbGVjdC9uZzItc2VsZWN0JztcbmltcG9ydCB7IFNlbGVjdE1vZHVsZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vZmlsZS11cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFdlYmNhbU1vZHVsZSB9IGZyb20gJ25neC13ZWJjYW0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNlbGVjdE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgV2ViY2FtTW9kdWxlLFxuICAgIE5neEZpbGVVcGxvYWRlck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRmlsZVVwbG9hZENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0ZpbGVVcGxvYWRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFJlbW90ZUZpbGVVcGxvYWRNb2R1bGUge31cbiJdfQ==