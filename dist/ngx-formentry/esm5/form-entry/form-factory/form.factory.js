/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
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
        var /** @type {?} */ form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (var /** @type {?} */ key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        var /** @type {?} */ question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = /** @type {?} */ (this.createNode(question, null, null, form));
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
        var /** @type {?} */ node = null;
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
        var /** @type {?} */ controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
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
        var /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        var /** @type {?} */ groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
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
        var /** @type {?} */ controlModel = /** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form));
        var /** @type {?} */ arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
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
            var /** @type {?} */ child = _this.createNode(element, node, parentControl, form);
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
        var /** @type {?} */ groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        var /** @type {?} */ group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            var /** @type {?} */ nodeControl = /** @type {?} */ (node.control);
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
        var /** @type {?} */ nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                var /** @type {?} */ control = /** @type {?} */ (node.control);
                var /** @type {?} */ controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    };
    FormFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormFactory.ctorParameters = function () { return [
        { type: FormControlService, },
        { type: QuestionFactory, },
        { type: ControlRelationsFactory, },
    ]; };
    return FormFactory;
}());
export { FormFactory };
function FormFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormFactory.ctorParameters;
    /** @type {?} */
    FormFactory.prototype.hd;
    /** @type {?} */
    FormFactory.prototype.controlService;
    /** @type {?} */
    FormFactory.prototype.questionFactroy;
    /** @type {?} */
    FormFactory.prototype.controlRelationsFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBWSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQ3RFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBZ0IsY0FBYyxFQUFFLFlBQVksRUFDbEQsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQzs7SUFVMUIscUJBQW1CLGNBQWtDLEVBQzFDLGlCQUF5Qyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZTtRQUEwQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO2tCQVBuRjtZQUNiLFFBQVEsRUFBRTtnQkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ2I7U0FDSjtLQUlBOzs7Ozs7SUFFRCxnQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQVcsRUFBRSxVQUFnQjtRQUNwQyxxQkFBTSxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzdFO2FBQ0o7U0FDSjtRQUNELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxxQkFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBYyxDQUFBLENBQUM7UUFFekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7OztJQUVELG9DQUFjOzs7O0lBQWQsVUFBZSxRQUFtQjtRQUU5QixXQUFXLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBR3RELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7S0FDcEQ7Ozs7Ozs7O0lBRUQsZ0NBQVU7Ozs7Ozs7SUFBVixVQUFXLFFBQXVDLEVBQzlDLFVBQXNCLEVBQUUsYUFBNEIsRUFBRSxJQUFXO1FBQ2pFLHFCQUFJLElBQUksR0FBYSxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxRTtTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7SUFFRCxvQ0FBYzs7Ozs7OztJQUFkLFVBQWUsUUFBc0IsRUFDakMsVUFBcUIsRUFBRSxhQUE0QixFQUFFLElBQVc7UUFDaEUscUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFDbEQsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDs7Ozs7Ozs7SUFFRCxxQ0FBZTs7Ozs7OztJQUFmLFVBQWdCLFFBQXdCLEVBQUUsVUFBc0IsRUFDNUQsYUFBNEIsRUFBRSxJQUFXO1FBQ3pDLHFCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCxxQkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQ3hELElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDcEI7Ozs7Ozs7O0lBRUQscUNBQWU7Ozs7Ozs7SUFBZixVQUFnQixRQUF3QixFQUFFLFVBQXNCLEVBQzVELGFBQTRCLEVBQUUsSUFBVztRQUQ3QyxpQkFlQztRQWJHLHFCQUFNLFlBQVkscUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQWlCLENBQUEsQ0FBQztRQUNwSCxxQkFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQ2pFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxTQUFTLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUV0RCxTQUFTLENBQUMsMkJBQTJCLENBQUMsVUFBQyxJQUFlO1lBRWxELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUM7WUFDbEQsS0FBSSxDQUFDLHVCQUF1QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELFdBQVcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjs7Ozs7Ozs7SUFFRCx3Q0FBa0I7Ozs7Ozs7SUFBbEIsVUFBbUIsUUFBd0IsRUFBRSxJQUFlLEVBQ3hELGFBQTRCLEVBQUUsSUFBVztRQUQ3QyxpQkFPQztRQUxHLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUM5QixxQkFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7Ozs7SUFHRCwwQ0FBb0I7Ozs7OztJQUFwQixVQUFxQixRQUEyQixFQUM1QyxJQUFlLEVBQUUsT0FBcUI7UUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QscUJBQU0sYUFBYSxHQUNmLElBQUksYUFBYSxDQUFDO1lBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUU7WUFDaEQsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztTQUNuRixDQUFDLENBQUM7UUFFUCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUNwRDtRQUVELHFCQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMscUJBQU0sV0FBVyxxQkFBRyxJQUFJLENBQUMsT0FBdUIsQ0FBQSxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7O0lBRUQsMENBQW9COzs7OztJQUFwQixVQUFxQixLQUFhLEVBQUUsSUFBZTtRQUMvQyxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdkMscUJBQU0sT0FBTyxxQkFBRyxJQUFJLENBQUMsT0FBdUIsQ0FBQSxDQUFDO2dCQUM3QyxxQkFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVFLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKO0tBQ0o7O2dCQXpJSixVQUFVOzs7O2dCQVRGLGtCQUFrQjtnQkFDbEIsZUFBZTtnQkFHZix1QkFBdUI7O3NCQVZoQzs7U0FnQmEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSwgQXJyYXlOb2RlLCBOb2RlQmFzZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBOZXN0ZWRRdWVzdGlvbiwgUmVwZWF0aW5nUXVlc3Rpb24sIFF1ZXN0aW9uR3JvdXBcclxufSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wuc2VydmljZSc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vcXVlc3Rpb24uZmFjdG9yeSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheVxyXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbnMgfSBmcm9tICcuLi92YWxpZGF0b3JzL3ZhbGlkYXRpb25zJztcclxuXHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybUZhY3Rvcnkge1xyXG4gICAgcHVibGljIGhkOiBhbnkgPSB7XHJcbiAgICAgICAgZ2V0VmFsdWU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDIwO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbnRyb2xTZXJ2aWNlOiBGb3JtQ29udHJvbFNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHF1ZXN0aW9uRmFjdHJveTogUXVlc3Rpb25GYWN0b3J5LCBwdWJsaWMgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KSB7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRm9ybShzY2hlbWE6IGFueSwgZGF0YVNvdXJjZT86IGFueSk6IEZvcm0ge1xyXG4gICAgICAgIGNvbnN0IGZvcm06IEZvcm0gPSBuZXcgRm9ybShzY2hlbWEsIHRoaXMsIHRoaXMucXVlc3Rpb25GYWN0cm95KTtcclxuICAgICAgICBpZiAoZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5yZWdpc3RlckRhdGFTb3VyY2Uoa2V5LCBkYXRhU291cmNlW2tleV0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25GYWN0cm95LmNyZWF0ZVF1ZXN0aW9uTW9kZWwoc2NoZW1hLCBmb3JtKTtcclxuICAgICAgICBmb3JtLnJvb3ROb2RlID0gdGhpcy5jcmVhdGVOb2RlKHF1ZXN0aW9uLCBudWxsLCBudWxsLCBmb3JtKSBhcyBHcm91cE5vZGU7XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRSZWxhdGlvbnMoZm9ybS5yb290Tm9kZSk7XHJcbiAgICAgICAgZm9ybS51cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKTtcclxuICAgICAgICBmb3JtLnVwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKCk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuYnVpbGRSZWxhdGlvbnMocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICAvLyBlbmFibGUganMgZXhwcmVzc2lvbiB2YWxpZGF0aW9uc1xyXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb2RlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbixcclxuICAgICAgICBwYXJlbnROb2RlPzogR3JvdXBOb2RlLCBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IE5vZGVCYXNlIHtcclxuICAgICAgICBsZXQgbm9kZTogTm9kZUJhc2UgPSBudWxsO1xyXG4gICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIE5lc3RlZFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIFJlcGVhdGluZ1F1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVBcnJheU5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlR3JvdXBOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUxlYWZOb2RlKHF1ZXN0aW9uLCBwYXJlbnROb2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGVhZk5vZGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcclxuICAgICAgICBwYXJlbnROb2RlOiBHcm91cE5vZGUsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogTGVhZk5vZGUge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKTtcclxuICAgICAgICByZXR1cm4gbmV3IExlYWZOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIG51bGwsIGZvcm0sXHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUdyb3VwTm9kZShxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBHcm91cE5vZGUge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbmV3IEdyb3VwTm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBudWxsLFxyXG4gICAgICAgICAgICBmb3JtLCBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5vZGVDaGlsZHJlbihxdWVzdGlvbiwgZ3JvdXBOb2RlLCAoY29udHJvbE1vZGVsIHx8IHBhcmVudENvbnRyb2wpLCBmb3JtKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXBOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUFycmF5Tm9kZShxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBcnJheU5vZGUge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xNb2RlbCA9IHRoaXMuY29udHJvbFNlcnZpY2UuZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb24sIHBhcmVudENvbnRyb2wsIGZhbHNlLCBmb3JtKSBhcyBBZmVGb3JtR3JvdXA7XHJcbiAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbmV3IEFycmF5Tm9kZShxdWVzdGlvbiwgY29udHJvbE1vZGVsLCBwYXJlbnRDb250cm9sLFxyXG4gICAgICAgICAgICB0aGlzLCBmb3JtLCBwYXJlbnROb2RlID8gcGFyZW50Tm9kZS5wYXRoIDogdW5kZWZpbmVkKTtcclxuICAgICAgICBhcnJheU5vZGUuY3JlYXRlQ2hpbGRGdW5jID0gdGhpcy5jcmVhdGVBcnJheU5vZGVDaGlsZDtcclxuICAgICAgICBhcnJheU5vZGUucmVtb3ZlQ2hpbGRGdW5jID0gdGhpcy5yZW1vdmVBcnJheU5vZGVDaGlsZDtcclxuXHJcbiAgICAgICAgYXJyYXlOb2RlLmFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcigobm9kZTogR3JvdXBOb2RlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGUpO1xyXG4gICAgICAgICAgICBWYWxpZGF0aW9ucy5KU0V4cHJlc3Npb25WYWxpZGF0b3JzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb2RlQ2hpbGRyZW4ocXVlc3Rpb246IE5lc3RlZFF1ZXN0aW9uLCBub2RlOiBHcm91cE5vZGUsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBhbnkge1xyXG4gICAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY3JlYXRlTm9kZShlbGVtZW50LCBub2RlLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcclxuICAgICAgICAgICAgbm9kZS5zZXRDaGlsZChlbGVtZW50LmtleSwgY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjcmVhdGVBcnJheU5vZGVDaGlsZChxdWVzdGlvbjogUmVwZWF0aW5nUXVlc3Rpb24sXHJcbiAgICAgICAgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpOiBHcm91cE5vZGUge1xyXG5cclxuICAgICAgICBpZiAoZmFjdG9yeSA9PT0gbnVsbCB8fCBmYWN0b3J5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZmFjdG9yeSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGdyb3VwUXVlc3Rpb246IFF1ZXN0aW9uR3JvdXAgPVxyXG4gICAgICAgICAgICBuZXcgUXVlc3Rpb25Hcm91cCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IG5vZGUucGF0aCArICcuJyArIG5vZGUuY2hpbGRyZW4ubGVuZ3RoICsgJycsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLCBleHRyYXM6IHF1ZXN0aW9uLmV4dHJhcywgbGFiZWw6ICcnLCBxdWVzdGlvbnM6IHF1ZXN0aW9uLnF1ZXN0aW9uc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5Ob25lKSB7XHJcbiAgICAgICAgICAgIGdyb3VwUXVlc3Rpb24uY29udHJvbFR5cGUgPSBxdWVzdGlvbi5jb250cm9sVHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZmFjdG9yeS5jcmVhdGVHcm91cE5vZGUoZ3JvdXBRdWVzdGlvbiwgbnVsbCwgbnVsbCwgbm9kZS5mb3JtKTtcclxuICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goZ3JvdXApO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5jb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUFycmF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVDb250cm9sID0gbm9kZS5jb250cm9sIGFzIEFmZUZvcm1BcnJheTtcclxuICAgICAgICAgICAgbm9kZUNvbnRyb2wuc2V0Q29udHJvbChub2RlQ29udHJvbC5jb250cm9scy5sZW5ndGgsIGdyb3VwLmNvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFycmF5Tm9kZUNoaWxkKGluZGV4OiBudW1iZXIsIG5vZGU6IEFycmF5Tm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVUb1JlbW92ZSA9IG5vZGUuY2hpbGRyZW5baW5kZXhdO1xyXG5cclxuICAgICAgICBub2RlLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKG5vZGUuY29udHJvbCAhPT0gbnVsbCB8fCBub2RlLmNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gbm9kZS5jb250cm9sIGFzIEFmZUZvcm1BcnJheTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xJbmRleFRvUmVtb3ZlID0gY29udHJvbC5jb250cm9scy5pbmRleE9mKG5vZGVUb1JlbW92ZS5jb250cm9sKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sSW5kZXhUb1JlbW92ZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5yZW1vdmVBdChjb250cm9sSW5kZXhUb1JlbW92ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19