import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
export class ErrorRendererComponent {
    constructor(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    ngOnInit() { }
    showErrors() {
        return !this.form.valid && this.form.showErrors;
    }
    get errorNodes() {
        const invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
        return invalidControls;
    }
    getControlError(node) {
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
    announceErrorField(errorNode) {
        const nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, (node) => {
            if (node.question.renderingType === 'page') {
                const pageIndex = this.getPageIndex(node);
                this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    }
    getPageIndex(node) {
        const questionGroup = this.form.rootNode
            .question;
        return questionGroup.questions.indexOf(node.question);
    }
}
ErrorRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'error-renderer',
                template: `<div *ngIf="showErrors()" class="container">
  <ul class="list-group">
    <li
      class="list-group-item list-group-item-warning"
      *ngFor="let errorNode of errorNodes"
      (click)="announceErrorField(errorNode)"
    >
      <div class="error" *ngIf="errorNode.control.valid == false">
        <h4>{{ errorNode.question.label }}</h4>
        <span class="text-danger"> {{ getControlError(errorNode) }}</span>
      </div>
    </li>
  </ul>
</div>
`,
                styles: [`ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}`]
            },] },
];
ErrorRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: FormErrorsService }
];
ErrorRendererComponent.propDecorators = {
    form: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBR3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBcUJwRSxNQUFNO0lBR0osWUFDVSxpQkFBb0MsRUFDcEMsaUJBQW9DO1FBRHBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMzQyxDQUFDO0lBRUosUUFBUSxLQUFJLENBQUM7SUFFYixVQUFVO1FBQ1IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNsQixFQUFFLENBQ0gsQ0FBQztRQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFjO1FBQzVCLE1BQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGtCQUFrQixDQUFDLFNBQW1CO1FBQ3BDLE1BQU0sS0FBSyxHQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUM3RCxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDekQsQ0FBQztRQUVGLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBYyxFQUFFLEVBQUU7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUN2QyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN6QyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3pCLE1BQU0sYUFBYSxHQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDcEQsUUFBeUIsQ0FBQztRQUM3QixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7OztZQXRFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDRJQUE0SSxDQUFDO2FBQ3ZKOzs7WUF2QlEsaUJBQWlCO1lBR2pCLGlCQUFpQjs7O21CQXNCdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IE5vZGVCYXNlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlcnJvci1yZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dFcnJvcnMoKVwiIGNsYXNzPVwiY29udGFpbmVyXCI+XG4gIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cbiAgICA8bGlcbiAgICAgIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nXCJcbiAgICAgICpuZ0Zvcj1cImxldCBlcnJvck5vZGUgb2YgZXJyb3JOb2Rlc1wiXG4gICAgICAoY2xpY2spPVwiYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZSlcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZXJyb3JOb2RlLmNvbnRyb2wudmFsaWQgPT0gZmFsc2VcIj5cbiAgICAgICAgPGg0Pnt7IGVycm9yTm9kZS5xdWVzdGlvbi5sYWJlbCB9fTwvaDQ+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4ge3sgZ2V0Q29udHJvbEVycm9yKGVycm9yTm9kZSkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICA8L3VsPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgdWx7bGlzdC1zdHlsZTpub25lfS5saXN0LWdyb3VwLWl0ZW17cGFkZGluZzoycHggMTVweDtjdXJzb3I6cG9pbnRlcn11bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9aDR7bWFyZ2luLXRvcDo3cHg7bWFyZ2luLWJvdHRvbTo3cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiAhdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS5zaG93RXJyb3JzO1xuICB9XG5cbiAgZ2V0IGVycm9yTm9kZXMoKSB7XG4gICAgY29uc3QgaW52YWxpZENvbnRyb2xzID0gdGhpcy5mb3JtLm1hcmtJbnZhbGlkQ29udHJvbHMoXG4gICAgICB0aGlzLmZvcm0ucm9vdE5vZGUsXG4gICAgICBbXVxuICAgICk7XG4gICAgcmV0dXJuIGludmFsaWRDb250cm9scztcbiAgfVxuXG4gIGdldENvbnRyb2xFcnJvcihub2RlOiBMZWFmTm9kZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGU6IExlYWZOb2RlKSB7XG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IHRoaXMuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKFxuICAgICAgZXJyb3JOb2RlLnBhdGguc3Vic3RyaW5nKDAsIGVycm9yTm9kZS5wYXRoLmluZGV4T2YoJy4nKSlcbiAgICApO1xuXG4gICAgXy5mb3JFYWNoKG5vZGVzLCAobm9kZTogTm9kZUJhc2UpID0+IHtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICBjb25zdCBwYWdlSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0UGFnZUluZGV4KG5vZGUpO1xuICAgICAgICB0aGlzLmZvcm1FcnJvcnNTZXJ2aWNlLmFubm91bmNlRXJyb3JGaWVsZChcbiAgICAgICAgICBwYWdlSW5kZXggKyAnLCcgKyBlcnJvck5vZGUucXVlc3Rpb24ua2V5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYWdlSW5kZXgobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBxdWVzdGlvbkdyb3VwOiBRdWVzdGlvbkdyb3VwID0gdGhpcy5mb3JtLnJvb3ROb2RlXG4gICAgICAucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcbiAgICByZXR1cm4gcXVlc3Rpb25Hcm91cC5xdWVzdGlvbnMuaW5kZXhPZihub2RlLnF1ZXN0aW9uKTtcbiAgfVxufVxuIl19