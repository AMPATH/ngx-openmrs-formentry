/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            getValue: function () {
                return 20;
            }
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
        arrayNode.addChildNodeCreatedListener(function (node) {
            Validations.JSExpressionValidatorsEnabled = false;
            _this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        });
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
        question.questions.forEach(function (element) {
            /** @type {?} */
            var child = _this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVksTUFBTSxhQUFhLENBQUM7QUFDdkUsT0FBTyxFQUFnQixjQUFjLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUN0RSxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQWdCLGNBQWMsRUFBRSxZQUFZLEVBQ2xELE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUI7SUFRSSxxQkFBbUIsY0FBa0MsRUFDMUMsZUFBZ0MsRUFBUyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFQN0YsT0FBRSxHQUFRO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDZCxDQUFDO1NBQ0osQ0FBQztJQUlGLENBQUM7Ozs7OztJQUVELGdDQUFVOzs7OztJQUFWLFVBQVcsTUFBVyxFQUFFLFVBQWdCOztZQUM5QixJQUFJLEdBQVMsSUFBSSxJQUFJLENB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QyxDQUFDO29CQUM1QixPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQzNDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7O2dCQXpJSixVQUFVOzs7Z0JBVEYsa0JBQWtCO2dCQUNsQixlQUFlO2dCQUdmLHVCQUF1Qjs7SUErSWhDLGtCQUFDO0NBQUEsQUExSUQsSUEwSUM7U0F6SVksV0FBVzs7O0lBQ3BCLHlCQUlFOztJQUVVLHFDQUF5Qzs7SUFDakQsc0NBQXVDOztJQUFFLDhDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSwgQXJyYXlOb2RlLCBOb2RlQmFzZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgTmVzdGVkUXVlc3Rpb24sIFJlcGVhdGluZ1F1ZXN0aW9uLCBRdWVzdGlvbkdyb3VwXG59IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwLCBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5XG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9ucyB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvdmFsaWRhdGlvbnMnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1GYWN0b3J5IHtcbiAgICBwdWJsaWMgaGQ6IGFueSA9IHtcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAyMDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbFNlcnZpY2U6IEZvcm1Db250cm9sU2VydmljZSxcbiAgICAgICAgcHVibGljIHF1ZXN0aW9uRmFjdHJveTogUXVlc3Rpb25GYWN0b3J5LCBwdWJsaWMgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KSB7XG4gICAgfVxuXG4gICAgY3JlYXRlRm9ybShzY2hlbWE6IGFueSwgZGF0YVNvdXJjZT86IGFueSk6IEZvcm0ge1xuICAgICAgICBjb25zdCBmb3JtOiBGb3JtID0gbmV3IEZvcm0oc2NoZW1hLCB0aGlzLCB0aGlzLnF1ZXN0aW9uRmFjdHJveSk7XG4gICAgICAgIGlmIChkYXRhU291cmNlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFTb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLnJlZ2lzdGVyRGF0YVNvdXJjZShrZXksIGRhdGFTb3VyY2Vba2V5XSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25GYWN0cm95LmNyZWF0ZVF1ZXN0aW9uTW9kZWwoc2NoZW1hLCBmb3JtKTtcbiAgICAgICAgZm9ybS5yb290Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShxdWVzdGlvbiwgbnVsbCwgbnVsbCwgZm9ybSkgYXMgR3JvdXBOb2RlO1xuXG4gICAgICAgIHRoaXMuYnVpbGRSZWxhdGlvbnMoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIGZvcm0udXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKCk7XG4gICAgICAgIGZvcm0udXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKTtcbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuYnVpbGRSZWxhdGlvbnMocm9vdE5vZGUpO1xuXG4gICAgICAgIC8vIGVuYWJsZSBqcyBleHByZXNzaW9uIHZhbGlkYXRpb25zXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbixcbiAgICAgICAgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBOb2RlQmFzZSB7XG4gICAgICAgIGxldCBub2RlOiBOb2RlQmFzZSA9IG51bGw7XG4gICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIE5lc3RlZFF1ZXN0aW9uKSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb24gaW5zdGFuY2VvZiBSZXBlYXRpbmdRdWVzdGlvbikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUFycmF5Tm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUdyb3VwTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVMZWFmTm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgY3JlYXRlTGVhZk5vZGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgcGFyZW50Tm9kZTogR3JvdXBOb2RlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IExlYWZOb2RlIHtcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pO1xuICAgICAgICByZXR1cm4gbmV3IExlYWZOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIG51bGwsIGZvcm0sXG4gICAgICAgICAgICBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cE5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEdyb3VwTm9kZSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5ldyBHcm91cE5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgbnVsbCxcbiAgICAgICAgICAgIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmNyZWF0ZU5vZGVDaGlsZHJlbihxdWVzdGlvbiwgZ3JvdXBOb2RlLCAoY29udHJvbE1vZGVsIHx8IHBhcmVudENvbnRyb2wpLCBmb3JtKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwTm9kZTtcbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheU5vZGUocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBwYXJlbnROb2RlPzogR3JvdXBOb2RlLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEFycmF5Tm9kZSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5ldyBBcnJheU5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgcGFyZW50Q29udHJvbCxcbiAgICAgICAgICAgIHRoaXMsIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICBhcnJheU5vZGUuY3JlYXRlQ2hpbGRGdW5jID0gdGhpcy5jcmVhdGVBcnJheU5vZGVDaGlsZDtcbiAgICAgICAgYXJyYXlOb2RlLnJlbW92ZUNoaWxkRnVuYyA9IHRoaXMucmVtb3ZlQXJyYXlOb2RlQ2hpbGQ7XG5cbiAgICAgICAgYXJyYXlOb2RlLmFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcigobm9kZTogR3JvdXBOb2RlKSA9PiB7XG5cbiAgICAgICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGUpO1xuICAgICAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5Tm9kZTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlQ2hpbGRyZW4ocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBub2RlOiBHcm91cE5vZGUsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogYW55IHtcbiAgICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY3JlYXRlTm9kZShlbGVtZW50LCBub2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIG5vZGUuc2V0Q2hpbGQoZWxlbWVudC5rZXksIGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuO1xuICAgIH1cblxuXG4gICAgY3JlYXRlQXJyYXlOb2RlQ2hpbGQocXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLFxuICAgICAgICBub2RlOiBBcnJheU5vZGUsIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeSk6IEdyb3VwTm9kZSB7XG5cbiAgICAgICAgaWYgKGZhY3RvcnkgPT09IG51bGwgfHwgZmFjdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmYWN0b3J5ID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBRdWVzdGlvbkdyb3VwID1cbiAgICAgICAgICAgIG5ldyBRdWVzdGlvbkdyb3VwKHtcbiAgICAgICAgICAgICAgICBrZXk6IG5vZGUucGF0aCArICcuJyArIG5vZGUuY2hpbGRyZW4ubGVuZ3RoICsgJycsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJywgZXh0cmFzOiBxdWVzdGlvbi5leHRyYXMsIGxhYmVsOiAnJywgcXVlc3Rpb25zOiBxdWVzdGlvbi5xdWVzdGlvbnNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChxdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuTm9uZSkge1xuICAgICAgICAgICAgZ3JvdXBRdWVzdGlvbi5jb250cm9sVHlwZSA9IHF1ZXN0aW9uLmNvbnRyb2xUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSBmYWN0b3J5LmNyZWF0ZUdyb3VwTm9kZShncm91cFF1ZXN0aW9uLCBudWxsLCBudWxsLCBub2RlLmZvcm0pO1xuICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goZ3JvdXApO1xuXG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVDb250cm9sID0gbm9kZS5jb250cm9sIGFzIEFmZUZvcm1BcnJheTtcbiAgICAgICAgICAgIG5vZGVDb250cm9sLnNldENvbnRyb2wobm9kZUNvbnRyb2wuY29udHJvbHMubGVuZ3RoLCBncm91cC5jb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICByZW1vdmVBcnJheU5vZGVDaGlsZChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZVRvUmVtb3ZlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgbm9kZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAobm9kZS5jb250cm9sICE9PSBudWxsIHx8IG5vZGUuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQXJyYXk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbEluZGV4VG9SZW1vdmUgPSBjb250cm9sLmNvbnRyb2xzLmluZGV4T2Yobm9kZVRvUmVtb3ZlLmNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sSW5kZXhUb1JlbW92ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucmVtb3ZlQXQoY29udHJvbEluZGV4VG9SZW1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==