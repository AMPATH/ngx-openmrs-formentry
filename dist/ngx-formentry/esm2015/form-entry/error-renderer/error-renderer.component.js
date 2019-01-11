/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
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
        /** @type {?} */
        const invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
        return invalidControls;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getControlError(node) {
        /** @type {?} */
        const errors = node.control.errors;
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
        /** @type {?} */
        const nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, (node) => {
            if (node.question.renderingType === 'page') {
                /** @type {?} */
                const pageIndex = this.getPageIndex(node);
                this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getPageIndex(node) {
        /** @type {?} */
        const questionGroup = (/** @type {?} */ (this.form.rootNode.question));
        return questionGroup.questions.indexOf(node.question);
    }
}
ErrorRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'error-renderer',
                template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
                styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
            }] }
];
/** @nocollapse */
ErrorRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: FormErrorsService }
];
ErrorRendererComponent.propDecorators = {
    form: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ErrorRendererComponent.prototype.form;
    /**
     * @type {?}
     * @private
     */
    ErrorRendererComponent.prototype.validationFactory;
    /**
     * @type {?}
     * @private
     */
    ErrorRendererComponent.prototype.formErrorsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPcEUsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFJakMsWUFBb0IsaUJBQW9DLEVBQVUsaUJBQW9DO1FBQWxGLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQUcsQ0FBQzs7OztJQUUxRyxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELElBQUksVUFBVTs7Y0FFTixlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDN0UsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBYzs7Y0FDcEIsTUFBTSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUV2QyxJQUFJLE1BQU0sRUFBRTtZQUVSLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLFNBQW1COztjQUU5QixLQUFLLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekgsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFjLEVBQUUsRUFBRTtZQUVsQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE1BQU0sRUFBRTs7c0JBQ3BDLFNBQVMsR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBYzs7Y0FDbEIsYUFBYSxHQUFrQixtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQWlCO1FBQ2pGLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsaWNBQTRDOzthQUUvQzs7OztZQVRRLGlCQUFpQjtZQUdqQixpQkFBaUI7OzttQkFTdkIsS0FBSzs7OztJQUFOLHNDQUFvQjs7Ozs7SUFFUixtREFBNEM7Ozs7O0lBQUUsbURBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IEZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZXJyb3ItcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Vycm9yLXJlbmRlcmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmb3JtOiBGb3JtO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LCBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQgJiYgdGhpcy5mb3JtLnNob3dFcnJvcnM7XG4gIH1cblxuICBnZXQgZXJyb3JOb2RlcygpIHtcblxuICAgIGNvbnN0IGludmFsaWRDb250cm9scyA9IHRoaXMuZm9ybS5tYXJrSW52YWxpZENvbnRyb2xzKHRoaXMuZm9ybS5yb290Tm9kZSwgW10pO1xuICAgIHJldHVybiBpbnZhbGlkQ29udHJvbHM7XG4gIH1cblxuICBnZXRDb250cm9sRXJyb3Iobm9kZTogTGVhZk5vZGUpIHtcbiAgICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgICAgaWYgKGVycm9ycykge1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGU6IExlYWZOb2RlKSB7XG5cbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gdGhpcy5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoZXJyb3JOb2RlLnBhdGguc3Vic3RyaW5nKDAsIGVycm9yTm9kZS5wYXRoLmluZGV4T2YoJy4nKSkpO1xuXG4gICAgXy5mb3JFYWNoKG5vZGVzLCAobm9kZTogTm9kZUJhc2UpID0+IHtcblxuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJbmRleDogbnVtYmVyID0gdGhpcy5nZXRQYWdlSW5kZXgobm9kZSk7XG4gICAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkKHBhZ2VJbmRleCArICcsJyArIGVycm9yTm9kZS5xdWVzdGlvbi5rZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGFnZUluZGV4KG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgIGNvbnN0IHF1ZXN0aW9uR3JvdXA6IFF1ZXN0aW9uR3JvdXAgPSB0aGlzLmZvcm0ucm9vdE5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcbiAgICAgcmV0dXJuIHF1ZXN0aW9uR3JvdXAucXVlc3Rpb25zLmluZGV4T2Yobm9kZS5xdWVzdGlvbik7XG4gIH1cbn1cbiJdfQ==