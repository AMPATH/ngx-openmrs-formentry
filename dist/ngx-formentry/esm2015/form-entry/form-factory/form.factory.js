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
export class FormFactory {
    /**
     * @param {?} controlService
     * @param {?} questionFactroy
     * @param {?} controlRelationsFactory
     */
    constructor(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: (/**
             * @return {?}
             */
            () => {
                return 20;
            })
        };
    }
    /**
     * @param {?} schema
     * @param {?=} dataSource
     * @return {?}
     */
    createForm(schema, dataSource) {
        /** @type {?} */
        const form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (const key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        /** @type {?} */
        const question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = (/** @type {?} */ (this.createNode(question, null, null, form)));
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    buildRelations(rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createNode(question, parentNode, parentControl, form) {
        /** @type {?} */
        let node = null;
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
    }
    /**
     * @param {?} question
     * @param {?} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createLeafNode(question, parentNode, parentControl, form) {
        /** @type {?} */
        const controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createGroupNode(question, parentNode, parentControl, form) {
        /** @type {?} */
        const controlModel = (/** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form)));
        /** @type {?} */
        const groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    }
    /**
     * @param {?} question
     * @param {?=} parentNode
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createArrayNode(question, parentNode, parentControl, form) {
        /** @type {?} */
        const controlModel = (/** @type {?} */ (this.controlService.generateControlModel(question, parentControl, false, form)));
        /** @type {?} */
        const arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            Validations.JSExpressionValidatorsEnabled = false;
            this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        }));
        return arrayNode;
    }
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    createNodeChildren(question, node, parentControl, form) {
        question.questions.forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            /** @type {?} */
            const child = this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        }));
        return node.children;
    }
    /**
     * @param {?} question
     * @param {?} node
     * @param {?=} factory
     * @return {?}
     */
    createArrayNodeChild(question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        /** @type {?} */
        const groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        /** @type {?} */
        const group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            /** @type {?} */
            const nodeControl = (/** @type {?} */ (node.control));
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    }
    /**
     * @param {?} index
     * @param {?} node
     * @return {?}
     */
    removeArrayNodeChild(index, node) {
        /** @type {?} */
        const nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                /** @type {?} */
                const control = (/** @type {?} */ (node.control));
                /** @type {?} */
                const controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    }
}
FormFactory.decorators = [
    { type: Injectable },
];
FormFactory.ctorParameters = () => [
    { type: FormControlService },
    { type: QuestionFactory },
    { type: ControlRelationsFactory }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVksTUFBTSxhQUFhLENBQUM7QUFDdkUsT0FBTyxFQUFnQixjQUFjLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUN0RSxNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQWdCLGNBQWMsRUFBRSxZQUFZLEVBQ2xELE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHOUIsTUFBTTs7Ozs7O0lBT0YsWUFBbUIsY0FBa0MsRUFDMUMsZUFBZ0MsRUFBUyx1QkFBZ0Q7UUFEakYsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBQzFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFTLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFQN0YsT0FBRSxHQUFRO1lBQ2IsUUFBUTs7O1lBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUE7U0FDSixDQUFDO0lBSUYsQ0FBQzs7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQVcsRUFBRSxVQUFnQjs7Y0FDOUIsSUFBSSxH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QUM7SUFDTCxDQUFDOzs7WUF6SUosVUFBVTs7O1lBVEYsa0JBQWtCO1lBQ2xCLGVBQWU7WUFHZix1QkFBdUI7Ozs7SUFPNUIseUJBSUU7O0lBRVUscUNBQXlDOztJQUNqRCxzQ0FBdUM7O0lBQUUsOENBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBMZWFmTm9kZSwgR3JvdXBOb2RlLCBBcnJheU5vZGUsIE5vZGVCYXNlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UsIE5lc3RlZFF1ZXN0aW9uLCBSZXBlYXRpbmdRdWVzdGlvbiwgUXVlc3Rpb25Hcm91cFxyXG59IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdWVzdGlvbi5mYWN0b3J5JztcclxuaW1wb3J0IHsgQWZlRm9ybUdyb3VwLCBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5XHJcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9ucyB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvdmFsaWRhdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtRmFjdG9yeSB7XHJcbiAgICBwdWJsaWMgaGQ6IGFueSA9IHtcclxuICAgICAgICBnZXRWYWx1ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gMjA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbFNlcnZpY2U6IEZvcm1Db250cm9sU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcXVlc3Rpb25GYWN0cm95OiBRdWVzdGlvbkZhY3RvcnksIHB1YmxpYyBjb250cm9sUmVsYXRpb25zRmFjdG9yeTogQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGb3JtKHNjaGVtYTogYW55LCBkYXRhU291cmNlPzogYW55KTogRm9ybSB7XHJcbiAgICAgICAgY29uc3QgZm9ybTogRm9ybSA9IG5ldyBGb3JtKHNjaGVtYSwgdGhpcywgdGhpcy5xdWVzdGlvbkZhY3Ryb3kpO1xyXG4gICAgICAgIGlmIChkYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhU291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLnJlZ2lzdGVyRGF0YVNvdXJjZShrZXksIGRhdGFTb3VyY2Vba2V5XSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbkZhY3Ryb3kuY3JlYXRlUXVlc3Rpb25Nb2RlbChzY2hlbWEsIGZvcm0pO1xyXG4gICAgICAgIGZvcm0ucm9vdE5vZGUgPSB0aGlzLmNyZWF0ZU5vZGUocXVlc3Rpb24sIG51bGwsIG51bGwsIGZvcm0pIGFzIEdyb3VwTm9kZTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFJlbGF0aW9ucyhmb3JtLnJvb3ROb2RlKTtcclxuICAgICAgICBmb3JtLnVwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scygpO1xyXG4gICAgICAgIGZvcm0udXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKTtcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XHJcblxyXG4gICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250cm9sUmVsYXRpb25zRmFjdG9yeS5idWlsZFJlbGF0aW9ucyhyb290Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIGVuYWJsZSBqcyBleHByZXNzaW9uIHZhbGlkYXRpb25zXHJcbiAgICAgICAgVmFsaWRhdGlvbnMuSlNFeHByZXNzaW9uVmFsaWRhdG9yc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU5vZGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSB8IE5lc3RlZFF1ZXN0aW9uLFxyXG4gICAgICAgIHBhcmVudE5vZGU/OiBHcm91cE5vZGUsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogTm9kZUJhc2Uge1xyXG4gICAgICAgIGxldCBub2RlOiBOb2RlQmFzZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgTmVzdGVkUXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgUmVwZWF0aW5nUXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUFycmF5Tm9kZShxdWVzdGlvbiwgcGFyZW50Tm9kZSwgcGFyZW50Q29udHJvbCwgZm9ybSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVHcm91cE5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTGVhZk5vZGUocXVlc3Rpb24sIHBhcmVudE5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMZWFmTm9kZShxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxyXG4gICAgICAgIHBhcmVudE5vZGU6IEdyb3VwTm9kZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBMZWFmTm9kZSB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgTGVhZk5vZGUocXVlc3Rpb24sIGNvbnRyb2xNb2RlbCwgbnVsbCwgZm9ybSxcclxuICAgICAgICAgICAgcGFyZW50Tm9kZSA/IHBhcmVudE5vZGUucGF0aCA6IHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlR3JvdXBOb2RlKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSxcclxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEdyb3VwTm9kZSB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pIGFzIEFmZUZvcm1Hcm91cDtcclxuICAgICAgICBjb25zdCBncm91cE5vZGUgPSBuZXcgR3JvdXBOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIG51bGwsXHJcbiAgICAgICAgICAgIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTm9kZUNoaWxkcmVuKHF1ZXN0aW9uLCBncm91cE5vZGUsIChjb250cm9sTW9kZWwgfHwgcGFyZW50Q29udHJvbCksIGZvcm0pO1xyXG4gICAgICAgIHJldHVybiBncm91cE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQXJyYXlOb2RlKHF1ZXN0aW9uOiBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Tm9kZT86IEdyb3VwTm9kZSxcclxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IEFycmF5Tm9kZSB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbE1vZGVsID0gdGhpcy5jb250cm9sU2VydmljZS5nZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbiwgcGFyZW50Q29udHJvbCwgZmFsc2UsIGZvcm0pIGFzIEFmZUZvcm1Hcm91cDtcclxuICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBuZXcgQXJyYXlOb2RlKHF1ZXN0aW9uLCBjb250cm9sTW9kZWwsIHBhcmVudENvbnRyb2wsXHJcbiAgICAgICAgICAgIHRoaXMsIGZvcm0sIHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLnBhdGggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIGFycmF5Tm9kZS5jcmVhdGVDaGlsZEZ1bmMgPSB0aGlzLmNyZWF0ZUFycmF5Tm9kZUNoaWxkO1xyXG4gICAgICAgIGFycmF5Tm9kZS5yZW1vdmVDaGlsZEZ1bmMgPSB0aGlzLnJlbW92ZUFycmF5Tm9kZUNoaWxkO1xyXG5cclxuICAgICAgICBhcnJheU5vZGUuYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKChub2RlOiBHcm91cE5vZGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuYnVpbGRBcnJheU5vZGVSZWxhdGlvbnMobm9kZSk7XHJcbiAgICAgICAgICAgIFZhbGlkYXRpb25zLkpTRXhwcmVzc2lvblZhbGlkYXRvcnNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyYXlOb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU5vZGVDaGlsZHJlbihxdWVzdGlvbjogTmVzdGVkUXVlc3Rpb24sIG5vZGU6IEdyb3VwTm9kZSxcclxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSk6IGFueSB7XHJcbiAgICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jcmVhdGVOb2RlKGVsZW1lbnQsIG5vZGUsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xyXG4gICAgICAgICAgICBub2RlLnNldENoaWxkKGVsZW1lbnQua2V5LCBjaGlsZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNyZWF0ZUFycmF5Tm9kZUNoaWxkKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbixcclxuICAgICAgICBub2RlOiBBcnJheU5vZGUsIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeSk6IEdyb3VwTm9kZSB7XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3J5ID09PSBudWxsIHx8IGZhY3RvcnkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmYWN0b3J5ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogUXVlc3Rpb25Hcm91cCA9XHJcbiAgICAgICAgICAgIG5ldyBRdWVzdGlvbkdyb3VwKHtcclxuICAgICAgICAgICAgICAgIGtleTogbm9kZS5wYXRoICsgJy4nICsgbm9kZS5jaGlsZHJlbi5sZW5ndGggKyAnJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsIGV4dHJhczogcXVlc3Rpb24uZXh0cmFzLCBsYWJlbDogJycsIHF1ZXN0aW9uczogcXVlc3Rpb24ucXVlc3Rpb25zXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocXVlc3Rpb24uY29udHJvbFR5cGUgPT09IEFmZUNvbnRyb2xUeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgZ3JvdXBRdWVzdGlvbi5jb250cm9sVHlwZSA9IHF1ZXN0aW9uLmNvbnRyb2xUeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBmYWN0b3J5LmNyZWF0ZUdyb3VwTm9kZShncm91cFF1ZXN0aW9uLCBudWxsLCBudWxsLCBub2RlLmZvcm0pO1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChncm91cCk7XHJcblxyXG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtQXJyYXkpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZUNvbnRyb2wgPSBub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUFycmF5O1xyXG4gICAgICAgICAgICBub2RlQ29udHJvbC5zZXRDb250cm9sKG5vZGVDb250cm9sLmNvbnRyb2xzLmxlbmd0aCwgZ3JvdXAuY29udHJvbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQXJyYXlOb2RlQ2hpbGQoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZVRvUmVtb3ZlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XHJcblxyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAobm9kZS5jb250cm9sICE9PSBudWxsIHx8IG5vZGUuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUFycmF5O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbEluZGV4VG9SZW1vdmUgPSBjb250cm9sLmNvbnRyb2xzLmluZGV4T2Yobm9kZVRvUmVtb3ZlLmNvbnRyb2wpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xJbmRleFRvUmVtb3ZlID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnJlbW92ZUF0KGNvbnRyb2xJbmRleFRvUmVtb3ZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=