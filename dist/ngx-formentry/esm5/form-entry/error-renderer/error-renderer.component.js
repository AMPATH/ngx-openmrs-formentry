/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services';
var ErrorRendererComponent = /** @class */ (function () {
    function ErrorRendererComponent(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    /**
     * @return {?}
     */
    ErrorRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ErrorRendererComponent.prototype.showErrors = /**
     * @return {?}
     */
    function () {
        return !this.form.valid && this.form.showErrors;
    };
    Object.defineProperty(ErrorRendererComponent.prototype, "errorNodes", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
            return invalidControls;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @return {?}
     */
    ErrorRendererComponent.prototype.getControlError = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    /**
     * @param {?} errorNode
     * @return {?}
     */
    ErrorRendererComponent.prototype.announceErrorField = /**
     * @param {?} errorNode
     * @return {?}
     */
    function (errorNode) {
        var _this = this;
        var /** @type {?} */ nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        _.forEach(nodes, function (node) {
            if (node.question.renderingType === 'page') {
                var /** @type {?} */ pageIndex = _this.getPageIndex(node);
                _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ErrorRendererComponent.prototype.getPageIndex = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ questionGroup = /** @type {?} */ (this.form.rootNode.question);
        return questionGroup.questions.indexOf(node.question);
    };
    ErrorRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'error-renderer',
                    template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
                    styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
                },] },
    ];
    /** @nocollapse */
    ErrorRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory, },
        { type: FormErrorsService, },
    ]; };
    ErrorRendererComponent.propDecorators = {
        "form": [{ type: Input },],
    };
    return ErrorRendererComponent;
}());
export { ErrorRendererComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9lcnJvci1yZW5kZXJlci9lcnJvci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUMzQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDOztJQXFCOUMsZ0NBQW9CLGlCQUFvQyxFQUFVLGlCQUFvQztRQUFsRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtLQUFJOzs7O0lBRTFHLHlDQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsMkNBQVU7OztJQUFWO1FBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDakQ7SUFFRCxzQkFBSSw4Q0FBVTs7OztRQUFkO1lBRUUscUJBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUUsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUN4Qjs7O09BQUE7Ozs7O0lBRUQsZ0RBQWU7Ozs7SUFBZixVQUFnQixJQUFjO1FBQzFCLHFCQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRVQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRDtRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDYjs7Ozs7SUFFRCxtREFBa0I7Ozs7SUFBbEIsVUFBbUIsU0FBbUI7UUFBdEMsaUJBV0M7UUFUQyxxQkFBTSxLQUFLLEdBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxSCxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFDLElBQWM7WUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0MscUJBQU0sU0FBUyxHQUFXLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckY7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCw2Q0FBWTs7OztJQUFaLFVBQWEsSUFBYztRQUN4QixxQkFBTSxhQUFhLHFCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUF5QixDQUFBLENBQUM7UUFDbEYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4RDs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsdWJBVWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsNElBQTRJLENBQUM7aUJBQ3pKOzs7O2dCQW5CUSxpQkFBaUI7Z0JBR2pCLGlCQUFpQjs7O3lCQW1CdkIsS0FBSzs7aUNBNUJSOztTQTBCYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZXJyb3ItcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dFcnJvcnMoKVwiIGNsYXNzPVwiY29udGFpbmVyXCI+XG48dWwgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XG4gIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0td2FybmluZ1wiICpuZ0Zvcj1cImxldCBlcnJvck5vZGUgb2YgZXJyb3JOb2Rlc1wiIChjbGljayk9YW5ub3VuY2VFcnJvckZpZWxkKGVycm9yTm9kZSk+XG4gICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJlcnJvck5vZGUuY29udHJvbC52YWxpZCA9PSBmYWxzZVwiPlxuICAgICAgPGg0Pnt7ZXJyb3JOb2RlLnF1ZXN0aW9uLmxhYmVsfX08L2g0PlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPiB7e2dldENvbnRyb2xFcnJvcihlcnJvck5vZGUpfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvbGk+XG48L3VsPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2B1bHtsaXN0LXN0eWxlOm5vbmV9Lmxpc3QtZ3JvdXAtaXRlbXtwYWRkaW5nOjJweCAxNXB4O2N1cnNvcjpwb2ludGVyfXVsIGxpOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2ZmZn1oNHttYXJnaW4tdG9wOjdweDttYXJnaW4tYm90dG9tOjdweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBFcnJvclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmb3JtOiBGb3JtO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LCBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuICF0aGlzLmZvcm0udmFsaWQgJiYgdGhpcy5mb3JtLnNob3dFcnJvcnM7XG4gIH1cblxuICBnZXQgZXJyb3JOb2RlcygpIHtcblxuICAgIGNvbnN0IGludmFsaWRDb250cm9scyA9IHRoaXMuZm9ybS5tYXJrSW52YWxpZENvbnRyb2xzKHRoaXMuZm9ybS5yb290Tm9kZSwgW10pO1xuICAgIHJldHVybiBpbnZhbGlkQ29udHJvbHM7XG4gIH1cblxuICBnZXRDb250cm9sRXJyb3Iobm9kZTogTGVhZk5vZGUpIHtcbiAgICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgICAgaWYgKGVycm9ycykge1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFubm91bmNlRXJyb3JGaWVsZChlcnJvck5vZGU6IExlYWZOb2RlKSB7XG5cbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gdGhpcy5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoZXJyb3JOb2RlLnBhdGguc3Vic3RyaW5nKDAsIGVycm9yTm9kZS5wYXRoLmluZGV4T2YoJy4nKSkpO1xuXG4gICAgXy5mb3JFYWNoKG5vZGVzLCAobm9kZTogTm9kZUJhc2UpID0+IHtcblxuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJbmRleDogbnVtYmVyID0gdGhpcy5nZXRQYWdlSW5kZXgobm9kZSk7XG4gICAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkKHBhZ2VJbmRleCArICcsJyArIGVycm9yTm9kZS5xdWVzdGlvbi5rZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGFnZUluZGV4KG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgIGNvbnN0IHF1ZXN0aW9uR3JvdXA6IFF1ZXN0aW9uR3JvdXAgPSB0aGlzLmZvcm0ucm9vdE5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cDtcbiAgICAgcmV0dXJuIHF1ZXN0aW9uR3JvdXAucXVlc3Rpb25zLmluZGV4T2Yobm9kZS5xdWVzdGlvbik7XG4gIH1cbn1cbiJdfQ==