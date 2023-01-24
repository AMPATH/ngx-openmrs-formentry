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
/** @nocollapse */
ErrorRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: FormErrorsService }
];
ErrorRendererComponent.propDecorators = {
    form: [{ type: Input }]
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Vycm9yLXJlbmRlcmVyL2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFxQnBFLE1BQU07SUFHSixZQUNVLGlCQUFvQyxFQUNwQyxpQkFBb0M7UUFEcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzNDLENBQUM7SUFFSixRQUFRLEtBQUksQ0FBQztJQUViLFVBQVU7UUFDUixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ2xCLEVBQUUsQ0FDSCxDQUFDO1FBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQWM7UUFDNUIsTUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsa0JBQWtCLENBQUMsU0FBbUI7UUFDcEMsTUFBTSxLQUFLLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQzdELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1FBRUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFjLEVBQUUsRUFBRTtZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQ3ZDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3pDLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQWM7UUFDekIsTUFBTSxhQUFhLEdBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTthQUNwRCxRQUF5QixDQUFDO1FBQzdCLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBdEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0NBY1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNElBQTRJLENBQUM7YUFDdko7Ozs7WUF2QlEsaUJBQWlCO1lBR2pCLGlCQUFpQjs7O21CQXNCdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IE5vZGVCYXNlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlcnJvci1yZW5kZXJlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dFcnJvcnMoKVwiIGNsYXNzPVwiY29udGFpbmVyXCI+XG4gIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cbiAgICA8bGlcbiAgICAgIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nXCJcbiAgICAgICpuZ0Zvcj1cImxldCBlcnJvck5vZGUgb2YgZXJyb3JOb2Rlc1wiXG4gICAgICAoY2xpY2spPVwiYW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZSlcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZXJyb3JOb2RlLmNvbnRyb2wudmFsaWQgPT0gZmFsc2VcIj5cbiAgICAgICAgPGg0Pnt7IGVycm9yTm9kZS5xdWVzdGlvbi5sYWJlbCB9fTwvaDQ+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4ge3sgZ2V0Q29udHJvbEVycm9yKGVycm9yTm9kZSkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICA8L3VsPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgdWx7bGlzdC1zdHlsZTpub25lfS5saXN0LWdyb3VwLWl0ZW17cGFkZGluZzoycHggMTVweDtjdXJzb3I6cG9pbnRlcn11bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9aDR7bWFyZ2luLXRvcDo3cHg7bWFyZ2luLWJvdHRvbTo3cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZvcm06IEZvcm07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiAhdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS5zaG93RXJyb3JzO1xuICB9XG5cbiAgZ2V0IGVycm9yTm9kZXMoKSB7XG4gICAgY29uc3QgaW52YWxpZENvbnRyb2xzID0gdGhpcy5mb3JtLm1hcmtJbnZhbGlkQ29udHJvbHMoXG4gICAgICB0aGlzLmZvcm0ucm9vdE5vZGUsXG4gICAgICBbXVxuICAgICk7XG4gICAgcmV0dXJuIGludmFsaWRDb250cm9scztcbiAgfVxuXG4gIGdldENvbnRyb2xFcnJvcihub2RlOiBMZWFmTm9kZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGU6IExlYWZOb2RlKSB7XG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IHRoaXMuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKFxuICAgICAgZXJyb3JOb2RlLnBhdGguc3Vic3RyaW5nKDAsIGVycm9yTm9kZS5wYXRoLmluZGV4T2YoJy4nKSlcbiAgICApO1xuXG4gICAgXy5mb3JFYWNoKG5vZGVzLCAobm9kZTogTm9kZUJhc2UpID0+IHtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICBjb25zdCBwYWdlSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0UGFnZUluZGV4KG5vZGUpO1xuICAgICAgICB0aGlzLmZvcm1FcnJvcnNTZXJ2aWNlLmFubm91bmNlRXJyb3JGaWVsZChcbiAgICAgICAgICBwYWdlSW5kZXggKyAnLCcgKyBlcnJvck5vZGUucXVlc3Rpb24ua2V5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYWdlSW5kZXgobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBxdWVzdGlvbkdyb3VwOiBRdWVzdGlvbkdyb3VwID0gdGhpcy5mb3JtLnJvb3ROb2RlXG4gICAgICAucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcbiAgICByZXR1cm4gcXVlc3Rpb25Hcm91cC5xdWVzdGlvbnMuaW5kZXhPZihub2RlLnF1ZXN0aW9uKTtcbiAgfVxufVxuIl19