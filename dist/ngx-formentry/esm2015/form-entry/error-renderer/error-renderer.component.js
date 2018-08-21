/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services';
export class ErrorRendererComponent {
    /**
     * @param {?} validationFactory
     * @param {?} formErrorsService
     */
    constructor(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    showErrors() {
        return !this.form.valid && this.form.showErrors;
    }
    /**
     * @return {?}
     */
    get errorNodes() {
        const /** @type {?} */ invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
        return invalidControls;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getControlError(node) {
        const /** @type {?} */ errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
    /**
     * @param {?} errorNode
     * @return {?}
     */
    announceErrorField(errorNode) {
        const /** @type {?} */ nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, (node) => {
            if (node.question.renderingType === 'page') {
                const /** @type {?} */ pageIndex = this.getPageIndex(node);
                this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getPageIndex(node) {
        const /** @type {?} */ questionGroup = /** @type {?} */ (this.form.rootNode.question);
        return questionGroup.questions.indexOf(node.question);
    }
}
ErrorRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'error-renderer',
                template: `<div *ngIf="showErrors()" class="container">
<ul class="list-group">
  <li class="list-group-item list-group-item-warning" *ngFor="let errorNode of errorNodes" (click)=announceErrorField(errorNode)>
    <div class="error" *ngIf="errorNode.control.valid == false">
      <h4>{{errorNode.question.label}}</h4>
      <span class="text-danger"> {{getControlError(errorNode)}}</span>
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
    { type: ValidationFactory, },
    { type: FormErrorsService, },
];
ErrorRendererComponent.propDecorators = {
    "form": [{ type: Input },],
};
function ErrorRendererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ErrorRendererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ErrorRendererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ErrorRendererComponent.propDecorators;
    /** @type {?} */
    ErrorRendererComponent.prototype.form;
    /** @type {?} */
    ErrorRendererComponent.prototype.validationFactory;
    /** @type {?} */
    ErrorRendererComponent.prototype.formErrorsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBaUJoRCxNQUFNOzs7OztJQUlKLFlBQW9CLGlCQUFvQyxFQUFVLGlCQUFvQztRQUFsRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtLQUFJOzs7O0lBRTFHLFFBQVE7S0FDUDs7OztJQUVELFVBQVU7UUFDUixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUNqRDs7OztJQUVELElBQUksVUFBVTtRQUVaLHVCQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDeEI7Ozs7O0lBRUQsZUFBZSxDQUFDLElBQWM7UUFDMUIsdUJBQU0sTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFVCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNiOzs7OztJQUVELGtCQUFrQixDQUFDLFNBQW1CO1FBRXBDLHVCQUFNLEtBQUssR0FBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFILENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBYyxFQUFFLEVBQUU7WUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsdUJBQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckY7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBYztRQUN4Qix1QkFBTSxhQUFhLHFCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUF5QixDQUFBLENBQUM7UUFDbEYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4RDs7O1lBN0RGLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FVYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyw0SUFBNEksQ0FBQzthQUN6Sjs7OztZQW5CUSxpQkFBaUI7WUFHakIsaUJBQWlCOzs7cUJBbUJ2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vycm9yLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJzaG93RXJyb3JzKClcIiBjbGFzcz1cImNvbnRhaW5lclwiPlxuPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXdhcm5pbmdcIiAqbmdGb3I9XCJsZXQgZXJyb3JOb2RlIG9mIGVycm9yTm9kZXNcIiAoY2xpY2spPWFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGUpPlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZXJyb3JOb2RlLmNvbnRyb2wudmFsaWQgPT0gZmFsc2VcIj5cbiAgICAgIDxoND57e2Vycm9yTm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oND5cbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4ge3tnZXRDb250cm9sRXJyb3IoZXJyb3JOb2RlKX19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2xpPlxuPC91bD5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgdWx7bGlzdC1zdHlsZTpub25lfS5saXN0LWdyb3VwLWl0ZW17cGFkZGluZzoycHggMTVweDtjdXJzb3I6cG9pbnRlcn11bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9aDR7bWFyZ2luLXRvcDo3cHg7bWFyZ2luLWJvdHRvbTo3cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZm9ybTogRm9ybTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSwgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiAhdGhpcy5mb3JtLnZhbGlkICYmIHRoaXMuZm9ybS5zaG93RXJyb3JzO1xuICB9XG5cbiAgZ2V0IGVycm9yTm9kZXMoKSB7XG5cbiAgICBjb25zdCBpbnZhbGlkQ29udHJvbHMgPSB0aGlzLmZvcm0ubWFya0ludmFsaWRDb250cm9scyh0aGlzLmZvcm0ucm9vdE5vZGUsIFtdKTtcbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xzO1xuICB9XG5cbiAgZ2V0Q29udHJvbEVycm9yKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgICBjb25zdCBlcnJvcnM6IGFueSA9IG5vZGUuY29udHJvbC5lcnJvcnM7XG5cbiAgICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW107XG4gIH1cblxuICBhbm5vdW5jZUVycm9yRmllbGQoZXJyb3JOb2RlOiBMZWFmTm9kZSkge1xuXG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IHRoaXMuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKGVycm9yTm9kZS5wYXRoLnN1YnN0cmluZygwLCBlcnJvck5vZGUucGF0aC5pbmRleE9mKCcuJykpKTtcblxuICAgIF8uZm9yRWFjaChub2RlcywgKG5vZGU6IE5vZGVCYXNlKSA9PiB7XG5cbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICBjb25zdCBwYWdlSW5kZXg6IG51bWJlciA9IHRoaXMuZ2V0UGFnZUluZGV4KG5vZGUpO1xuICAgICAgICB0aGlzLmZvcm1FcnJvcnNTZXJ2aWNlLmFubm91bmNlRXJyb3JGaWVsZChwYWdlSW5kZXggKyAnLCcgKyBlcnJvck5vZGUucXVlc3Rpb24ua2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFBhZ2VJbmRleChub2RlOiBOb2RlQmFzZSkge1xuICAgICBjb25zdCBxdWVzdGlvbkdyb3VwOiBRdWVzdGlvbkdyb3VwID0gdGhpcy5mb3JtLnJvb3ROb2RlLnF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXA7XG4gICAgIHJldHVybiBxdWVzdGlvbkdyb3VwLnF1ZXN0aW9ucy5pbmRleE9mKG5vZGUucXVlc3Rpb24pO1xuICB9XG59XG4iXX0=