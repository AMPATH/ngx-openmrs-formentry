/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
// import { AbstractControl } from '@angular/forms';
import { LeafNode, GroupNode, ArrayNode } from './form-node';
import { NestedQuestion, RepeatingQuestion, QuestionGroup } from '../question-models/models';
import { FormControlService } from './form-control.service';
import { QuestionFactory } from './question.factory';
import { AfeControlType, AfeFormArray } from '../../abstract-controls-extension';
import { ControlRelationsFactory } from './control-relations.factory';
import { Validations } from '../validators/validations';
import { Form } from './form';
var FormFactory = /** @class */ (function () {
    function FormFactory(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: (/**
             * @return {?}
             */
            function () {
                return 20;
            })
        };
    }
    /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    FormFactory.prototype.createForm = /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    function (schema, dataSource) {
        /** @type {?} */
        var form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (var key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        /** @type {?} */
        var question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = (/** @type {?} */ (this.createNode(question, null, null, form)));
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    FormFactory.prototype.buildRelations = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        /** @type {?} */
        var node = null;
        if (question instanceof NestedQuestion) {
            if (question instanceof RepeatingQuestion) {
                node = this.createArrayNode(question, parentNode, parentControl, form);
            }
            else {
                node = this.createGroupNode(question, parentNode, parentControl, form);
            }
        }
        else {
            node = this.createLeafNode(question, parentNode, parentControl, form);
        }
        return node;
    };
    /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createLeafNode = /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        /** @type {?} */
        var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createGroupNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        /** @type {?} */
        var controlModel = (/** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form)));
        /** @type {?} */
        var groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    };
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createArrayNode = /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, parentNode, parentControl, form) {
        var _this = this;
        /** @type {?} */
        var controlModel = (/** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form)));
        /** @type {?} */
        var arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            Validations.JSExpressionValidatorsEnabled = false;
            _this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        }));
        return arrayNode;
    };
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    FormFactory.prototype.createNodeChildren = /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    function (question, node, parentControl, form) {
        var _this = this;
        question.questions.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var child = _this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        }));
        return node.children;
    };
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    FormFactory.prototype.createArrayNodeChild = /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    function (question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        /** @type {?} */
        var groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        /** @type {?} */
        var group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            /** @type {?} */
            var nodeControl = (/** @type {?} */ (node.control));
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    };
    /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    FormFactory.prototype.removeArrayNodeChild = /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    function (index, node) {
        /** @type {?} */
        var nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                /** @type {?} */
                var control = (/** @type {?} */ (node.control));
                /** @type {?} */
                var controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    };
    FormFactory.decorators = [
        { type: Injectable },
    ];
    FormFactory.ctorParameters = function () { return [
        { type: FormControlService },
        { type: QuestionFactory },
        { type: ControlRelationsFactory }
    ]; };
    return FormFactory;
}());
export { FormFactory };
if (false) {
    /** @type {?} */
    FormFactory.prototype.hd;
    /** @type {?} */
    FormFactory.prototype.controlService;
    /** @type {?} */
    FormFactory.prototype.questionFactroy;
    /** @type {?} */
    FormFactory.prototype.controlRelationsFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVksTUFBTSxhQUFhLENBQUM7QUFDdkUsT0FBTyxFQUFnQixjQUFjLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUN0RSxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQWdCLGNBQWMsRUFBRSxZQUFZLEVBQ2xELE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUI7SUFRSSxxQkFBbUIsY0FBa0MsRUFDMUMsZUFBZ0MsRUFBUyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFQN0YsT0FBRSxHQUFRO1lBQ2IsUUFBUTs7O1lBQUU7Z0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQTtTQUNKLENBQUM7SUFJRixDQUFDOzs7Ozs7SUFFRCxnQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQVcsRUFBRSxVQUFnQjs7WUFDOUIsSUFBSSxHQUFTLElBQUks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Q0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDOztnQkF6SUosVUFBVTs7O2dCQVRGLGtCQUFrQjtnQkFDbEIsZUFBZTtnQkFHZix1QkFBdUI7O0lBK0loQyxrQkFBQztDQUFBLEFBMUlELElBMElDO1NBeklZLFdBQVc7OztJQUNwQix5QkFJRTs7SUFFVSxxQ0FBeUM7O0lBQ2pELHNDQUF1Qzs7SUFBRSw4Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IExlYWZOb2RlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgTmVzdGVkUXVlc3Rpb24sIFJlcGVhdGluZ1F1ZXN0aW9uLCBRdWVzdGlvbkdyb3VwXHJcbn0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1jb250cm9sLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAsIEFmZUNvbnRyb2xUeXBlLCBBZmVGb3JtQXJyYXlcclxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25zIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy92YWxpZGF0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1GYWN0b3J5IHtcclxuICAgIHB1YmxpYyBoZDogYW55ID0ge1xyXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAyMDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sU2VydmljZTogRm9ybUNvbnRyb2xTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBxdWVzdGlvbkZhY3Ryb3k6IFF1ZXN0aW9uRmFjdG9yeSwgcHVibGljIGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSkge1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUZvcm0oc2NoZW1hOiBhbnksIGRhdGFTb3VyY2U/OiBhbnkpOiBGb3JtIHtcclxuICAgICAgICBjb25zdCBmb3JtOiBGb3JtID0gbmV3IEZvcm0oc2NoZW1hLCB0aGlzLCB0aGlzLnF1ZXN0aW9uRmFjdHJveSk7XHJcbiAgICAgICAgaWYgKGRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFTb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIucmVnaXN0ZXJEYXRhU291cmNlKGtleSwgZGF0YVNvdXJjZVtrZXldLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uRmFjdHJveS5jcmVhdGVRdWVzdGlvbk1vZGVsKHNjaGVtYSwgZm9ybSk7XHJcbiAgICAgICAgZm9ybS5yb290Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShxdWVzdGlvbiwgbnVsbCwgbnVsbCwgZm9ybSkgYXMgR3JvdXBOb2RlO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKGZvcm0ucm9vdE5vZGUpO1xyXG4gICAgICAgIGZvcm0udXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKCk7XHJcbiAgICAgICAgZm9ybS51cGRhdGVBbGVydHNGb3JBbGxDb250cm9scygpO1xyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgLy8gZW5hYmxlIGpzIGV4cHJlc3Npb24gdmFsaWRhdGlvbnNcclxuICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTm9kZShxdWVzdGlvbjogUXVlc3Rpb25CYXNlIHwgTmVzdGVkUXVlc3Rpb24sXHJcbiAgICAgICAgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBOb2RlQmFzZSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IE5vZGVCYXNlID0gbnVsbDtcclxuICAgICAgICBpZiAocXVlc3Rpb24gaW5zdGFuY2VvZiBOZXN0ZWRRdWVzdGlvbikge1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb24gaW5zdGFuY2VvZiBSZXBlYXRpbmdRdWVzdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlQXJyYXlOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUdyb3VwTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVMZWFmTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxlYWZOb2RlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXHJcbiAgICAgICAgcGFyZW50Tm9kZTogR3JvdXBOb2RlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IExlYWZOb2RlIHtcclxuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMZWFmTm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBudWxsLCBmb3JtLFxyXG4gICAgICAgICAgICBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHcm91cE5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxyXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogR3JvdXBOb2RlIHtcclxuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSkgYXMgQWZlRm9ybUdyb3VwO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5ldyBHcm91cE5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgbnVsbCxcclxuICAgICAgICAgICAgZm9ybSwgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOb2RlQ2hpbGRyZW4ocXVlc3Rpb24sIGdyb3VwTm9kZSwgKGNvbnRyb2xNb2RlbCB8fCBwYXJlbnRDb250cm9sKSwgZm9ybSk7XHJcbiAgICAgICAgcmV0dXJuIGdyb3VwTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBcnJheU5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxyXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQXJyYXlOb2RlIHtcclxuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSkgYXMgQWZlRm9ybUdyb3VwO1xyXG4gICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5ldyBBcnJheU5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgcGFyZW50Q29udHJvbCxcclxuICAgICAgICAgICAgdGhpcywgZm9ybSwgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgYXJyYXlOb2RlLmNyZWF0ZUNoaWxkRnVuYyA9IHRoaXMuY3JlYXRlQXJyYXlOb2RlQ2hpbGQ7XHJcbiAgICAgICAgYXJyYXlOb2RlLnJlbW92ZUNoaWxkRnVuYyA9IHRoaXMucmVtb3ZlQXJyYXlOb2RlQ2hpbGQ7XHJcblxyXG4gICAgICAgIGFycmF5Tm9kZS5hZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoKG5vZGU6IEdyb3VwTm9kZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sUmVsYXRpb25zRmFjdG9yeS5idWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlKTtcclxuICAgICAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnJheU5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTm9kZUNoaWxkcmVuKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgbm9kZTogR3JvdXBOb2RlLFxyXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogYW55IHtcclxuICAgICAgICBxdWVzdGlvbi5xdWVzdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNyZWF0ZU5vZGUoZWxlbWVudCwgbm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0Q2hpbGQoZWxlbWVudC5rZXksIGNoaWxkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbm9kZS5jaGlsZHJlbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY3JlYXRlQXJyYXlOb2RlQ2hpbGQocXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLFxyXG4gICAgICAgIG5vZGU6IEFycmF5Tm9kZSwgZmFjdG9yeT86IEZvcm1GYWN0b3J5KTogR3JvdXBOb2RlIHtcclxuXHJcbiAgICAgICAgaWYgKGZhY3RvcnkgPT09IG51bGwgfHwgZmFjdG9yeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZhY3RvcnkgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBRdWVzdGlvbkdyb3VwID1cclxuICAgICAgICAgICAgbmV3IFF1ZXN0aW9uR3JvdXAoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBub2RlLnBhdGggKyAnLicgKyBub2RlLmNoaWxkcmVuLmxlbmd0aCArICcnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJywgZXh0cmFzOiBxdWVzdGlvbi5leHRyYXMsIGxhYmVsOiAnJywgcXVlc3Rpb25zOiBxdWVzdGlvbi5xdWVzdGlvbnNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChxdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuTm9uZSkge1xyXG4gICAgICAgICAgICBncm91cFF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gcXVlc3Rpb24uY29udHJvbFR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBncm91cCA9IGZhY3RvcnkuY3JlYXRlR3JvdXBOb2RlKGdyb3VwUXVlc3Rpb24sIG51bGwsIG51bGwsIG5vZGUuZm9ybSk7XHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGdyb3VwKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuY29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1BcnJheSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlQ29udHJvbCA9IG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQXJyYXk7XHJcbiAgICAgICAgICAgIG5vZGVDb250cm9sLnNldENvbnRyb2wobm9kZUNvbnRyb2wuY29udHJvbHMubGVuZ3RoLCBncm91cC5jb250cm9sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBcnJheU5vZGVDaGlsZChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpIHtcclxuICAgICAgICBjb25zdCBub2RlVG9SZW1vdmUgPSBub2RlLmNoaWxkcmVuW2luZGV4XTtcclxuXHJcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wgIT09IG51bGwgfHwgbm9kZS5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1BcnJheSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQXJyYXk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sSW5kZXhUb1JlbW92ZSA9IGNvbnRyb2wuY29udHJvbHMuaW5kZXhPZihub2RlVG9SZW1vdmUuY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbEluZGV4VG9SZW1vdmUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucmVtb3ZlQXQoY29udHJvbEluZGV4VG9SZW1vdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==