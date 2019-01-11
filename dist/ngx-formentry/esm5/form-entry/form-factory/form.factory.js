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
        { type: Injectable }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVksTUFBTSxhQUFhLENBQUM7QUFDdkUsT0FBTyxFQUFnQixjQUFjLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUN0RSxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQWdCLGNBQWMsRUFBRSxZQUFZLEVBQ2xELE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUI7SUFRSSxxQkFBbUIsY0FBa0MsRUFDMUMsZUFBZ0MsRUFBUyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFQN0YsT0FBRSxHQUFRO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztTQUNKLENBQUM7SUFJRixDQUFDOzs7Ozs7SUFFRCxnQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQVcsRUFBRSxVQUFnQjs7WUFDOUIsSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLE1B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LEdBQUcsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBZ0I7WUFDaEQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCwwQ0FBb0I7Ozs7O0lBQXBCLFVBQXFCLEtBQWEsRUFBRSxJQUFlOztZQUN6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksRUFBRTs7b0JBQ2hDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFnQjs7b0JBQ3RDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQzNFLElBQUksb0JBQW9CLElBQUksQ0FBQyxFQUFFO29CQUMzQixPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQzFDO2FBQ0o7U0FDSjtJQUNMLENBQUM7O2dCQXpJSixVQUFVOzs7O2dCQVRGLGtCQUFrQjtnQkFDbEIsZUFBZTtnQkFHZix1QkFBdUI7O0lBK0loQyxrQkFBQztDQUFBLEFBMUlELElBMElDO1NBeklZLFdBQVc7OztJQUNwQix5QkFJRTs7SUFFVSxxQ0FBeUM7O0lBQ2pELHNDQUF1Qzs7SUFBRSw4Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IExlYWZOb2RlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UsIE5lc3RlZFF1ZXN0aW9uLCBSZXBlYXRpbmdRdWVzdGlvbiwgUXVlc3Rpb25Hcm91cFxufSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcbmltcG9ydCB7IEZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheVxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgVmFsaWRhdGlvbnMgfSBmcm9tICcuLi92YWxpZGF0b3JzL3ZhbGlkYXRpb25zJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtRmFjdG9yeSB7XG4gICAgcHVibGljIGhkOiBhbnkgPSB7XG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gMjA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbnRyb2xTZXJ2aWNlOiBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBxdWVzdGlvbkZhY3Ryb3k6IFF1ZXN0aW9uRmFjdG9yeSwgcHVibGljIGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSkge1xuICAgIH1cblxuICAgIGNyZWF0ZUZvcm0oc2NoZW1hOiBhbnksIGRhdGFTb3VyY2U/OiBhbnkpOiBGb3JtIHtcbiAgICAgICAgY29uc3QgZm9ybTogRm9ybSA9IG5ldyBGb3JtKHNjaGVtYSwgdGhpcywgdGhpcy5xdWVzdGlvbkZhY3Ryb3kpO1xuICAgICAgICBpZiAoZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhU291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5yZWdpc3RlckRhdGFTb3VyY2Uoa2V5LCBkYXRhU291cmNlW2tleV0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uRmFjdHJveS5jcmVhdGVRdWVzdGlvbk1vZGVsKHNjaGVtYSwgZm9ybSk7XG4gICAgICAgIGZvcm0ucm9vdE5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUocXVlc3Rpb24sIG51bGwsIG51bGwsIGZvcm0pIGFzIEdyb3VwTm9kZTtcblxuICAgICAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICBmb3JtLnVwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scygpO1xuICAgICAgICBmb3JtLnVwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKCk7XG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcblxuICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlKTtcblxuICAgICAgICAvLyBlbmFibGUganMgZXhwcmVzc2lvbiB2YWxpZGF0aW9uc1xuICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlTm9kZShxdWVzdGlvbjogUXVlc3Rpb25CYXNlIHwgTmVzdGVkUXVlc3Rpb24sXG4gICAgICAgIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogTm9kZUJhc2Uge1xuICAgICAgICBsZXQgbm9kZTogTm9kZUJhc2UgPSBudWxsO1xuICAgICAgICBpZiAocXVlc3Rpb24gaW5zdGFuY2VvZiBOZXN0ZWRRdWVzdGlvbikge1xuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgUmVwZWF0aW5nUXVlc3Rpb24pIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVBcnJheU5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVHcm91cE5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTGVhZk5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGNyZWF0ZUxlYWZOb2RlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgICAgIHBhcmVudE5vZGU6IEdyb3VwTm9kZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBMZWFmTm9kZSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKTtcbiAgICAgICAgcmV0dXJuIG5ldyBMZWFmTm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBudWxsLCBmb3JtLFxuICAgICAgICAgICAgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBOb2RlKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBHcm91cE5vZGUge1xuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSkgYXMgQWZlRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBncm91cE5vZGUgPSBuZXcgR3JvdXBOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIG51bGwsXG4gICAgICAgICAgICBmb3JtLCBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5jcmVhdGVOb2RlQ2hpbGRyZW4ocXVlc3Rpb24sIGdyb3VwTm9kZSwgKGNvbnRyb2xNb2RlbCB8fCBwYXJlbnRDb250cm9sKSwgZm9ybSk7XG4gICAgICAgIHJldHVybiBncm91cE5vZGU7XG4gICAgfVxuXG4gICAgY3JlYXRlQXJyYXlOb2RlKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBcnJheU5vZGUge1xuICAgICAgICBjb25zdCBjb250cm9sTW9kZWwgPSB0aGlzLmNvbnRyb2xTZXJ2aWNlLmdlbmVyYXRlQ29udHJvbE1vZGVsKHF1ZXN0aW9uLCBwYXJlbnRDb250cm9sLCBmYWxzZSwgZm9ybSkgYXMgQWZlRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBuZXcgQXJyYXlOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIHBhcmVudENvbnRyb2wsXG4gICAgICAgICAgICB0aGlzLCBmb3JtLCBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgYXJyYXlOb2RlLmNyZWF0ZUNoaWxkRnVuYyA9IHRoaXMuY3JlYXRlQXJyYXlOb2RlQ2hpbGQ7XG4gICAgICAgIGFycmF5Tm9kZS5yZW1vdmVDaGlsZEZ1bmMgPSB0aGlzLnJlbW92ZUFycmF5Tm9kZUNoaWxkO1xuXG4gICAgICAgIGFycmF5Tm9kZS5hZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoKG5vZGU6IEdyb3VwTm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sUmVsYXRpb25zRmFjdG9yeS5idWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlKTtcbiAgICAgICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheU5vZGU7XG4gICAgfVxuXG4gICAgY3JlYXRlTm9kZUNoaWxkcmVuKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgbm9kZTogR3JvdXBOb2RlLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IGFueSB7XG4gICAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNyZWF0ZU5vZGUoZWxlbWVudCwgbm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBub2RlLnNldENoaWxkKGVsZW1lbnQua2V5LCBjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9kZS5jaGlsZHJlbjtcbiAgICB9XG5cblxuICAgIGNyZWF0ZUFycmF5Tm9kZUNoaWxkKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbixcbiAgICAgICAgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpOiBHcm91cE5vZGUge1xuXG4gICAgICAgIGlmIChmYWN0b3J5ID09PSBudWxsIHx8IGZhY3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZmFjdG9yeSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogUXVlc3Rpb25Hcm91cCA9XG4gICAgICAgICAgICBuZXcgUXVlc3Rpb25Hcm91cCh7XG4gICAgICAgICAgICAgICAga2V5OiBub2RlLnBhdGggKyAnLicgKyBub2RlLmNoaWxkcmVuLmxlbmd0aCArICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsIGV4dHJhczogcXVlc3Rpb24uZXh0cmFzLCBsYWJlbDogJycsIHF1ZXN0aW9uczogcXVlc3Rpb24ucXVlc3Rpb25zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocXVlc3Rpb24uY29udHJvbFR5cGUgPT09IEFmZUNvbnRyb2xUeXBlLk5vbmUpIHtcbiAgICAgICAgICAgIGdyb3VwUXVlc3Rpb24uY29udHJvbFR5cGUgPSBxdWVzdGlvbi5jb250cm9sVHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZmFjdG9yeS5jcmVhdGVHcm91cE5vZGUoZ3JvdXBRdWVzdGlvbiwgbnVsbCwgbnVsbCwgbm9kZS5mb3JtKTtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGdyb3VwKTtcblxuICAgICAgICBpZiAobm9kZS5jb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlQ29udHJvbCA9IG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQXJyYXk7XG4gICAgICAgICAgICBub2RlQ29udHJvbC5zZXRDb250cm9sKG5vZGVDb250cm9sLmNvbnRyb2xzLmxlbmd0aCwgZ3JvdXAuY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXJyYXlOb2RlQ2hpbGQoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVUb1JlbW92ZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIG5vZGUuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKG5vZGUuY29udHJvbCAhPT0gbnVsbCB8fCBub2RlLmNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1BcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUFycmF5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xJbmRleFRvUmVtb3ZlID0gY29udHJvbC5jb250cm9scy5pbmRleE9mKG5vZGVUb1JlbW92ZS5jb250cm9sKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbEluZGV4VG9SZW1vdmUgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnJlbW92ZUF0KGNvbnRyb2xJbmRleFRvUmVtb3ZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=