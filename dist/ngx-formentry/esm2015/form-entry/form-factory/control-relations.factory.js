/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
export class ControlRelationsFactory {
    constructor() { }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    buildRelations(rootNode) {
        /** @type {?} */
        const controlsStore = this.mapControlIds(rootNode, {});
        for (const key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                const nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    buildArrayNodeRelations(node) {
        /** @type {?} */
        const form = node.form;
        if (!form) {
            return;
        }
        /** @type {?} */
        const rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        /** @type {?} */
        const rootControlsStore = this.mapControlIds(rootNode, {});
        /** @type {?} */
        const arrayControlStore = this.mapControlIds(node, {});
        for (const key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                const child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    /** @type {?} */
                    const questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (const id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                /** @type {?} */
                const child = arrayControlStore[id];
                /** @type {?} */
                const control = (/** @type {?} */ (child.control));
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    createRelationsToArrayControls(node) {
        /** @type {?} */
        const form = node.form;
        /** @type {?} */
        const rootNode = form.rootNode;
        // build relations for control outside the array
        /** @type {?} */
        const rootControlsStore = this.mapControlIds(rootNode, {});
        /** @type {?} */
        const arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (const key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                const rChild = rootControlsStore[key];
                /** @type {?} */
                const parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    // loop through controls in the array group
                    for (const id in arrayControlStore) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            /** @type {?} */
                            const aChild = arrayControlStore[id];
                            /** @type {?} */
                            const aChildId = aChild.question.key;
                            if (this.hasRelation(aChildId, rChild.question)) {
                                /** @type {?} */
                                const nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    /** @type {?} */
                                    const an = (/** @type {?} */ (nodes[0]));
                                    /** @type {?} */
                                    const rootControl = ((/** @type {?} */ (rChild.control)));
                                    if (rootControl.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl.controlRelations.otherRelations.push(an);
                                    }
                                    ((/** @type {?} */ (aChild.control))).addValueChangeListener((value) => {
                                        if (((/** @type {?} */ (rootControl))).updateCalculatedValue) {
                                            ((/** @type {?} */ (rootControl))).updateCalculatedValue();
                                        }
                                        rootControl.updateValueAndValidity();
                                        if (((/** @type {?} */ (rootControl))).updateHiddenState) {
                                            ((/** @type {?} */ (rootControl))).updateHiddenState();
                                        }
                                        if (((/** @type {?} */ (rootControl))).updateAlert) {
                                            ((/** @type {?} */ (rootControl))).updateAlert();
                                        }
                                        if (((/** @type {?} */ (rootControl))).updateDisabledState) {
                                            ((/** @type {?} */ (rootControl))).updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    getRelationsForControl(id, node) {
        /** @type {?} */
        const relations = new Array();
        /** @type {?} */
        const nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            /** @type {?} */
            const nodeBase = nodeBaseArray[0];
            /** @type {?} */
            const controlList = this.mapControlIds(node, {});
            for (const key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    }
    /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    mapControlIds(node, controlsStore) {
        /** @type {?} */
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                const child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    /** @type {?} */
                    const questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    /** @type {?} */
                    const questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    }
    /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    setRelations(controlsStore, nodeBase) {
        /** @type {?} */
        const questionBase = nodeBase.question;
        /** @type {?} */
        const id = questionBase.key;
        for (const key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                /** @type {?} */
                const node = controlsStore[key];
                /** @type {?} */
                const question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl((/** @type {?} */ (node.control)), (/** @type {?} */ (nodeBase.control)));
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    /** @type {?} */
                    const required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl((/** @type {?} */ (node.control)), (/** @type {?} */ (nodeBase.control)));
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    hasRelation(id, questionBase, nodeBase) {
        /** @type {?} */
        let hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(element => {
                if (element instanceof JsExpressionValidationModel) {
                    /** @type {?} */
                    const model = (/** @type {?} */ (element));
                    /** @type {?} */
                    const failsWhenExpression = model.failsWhenExpression;
                    if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
                        hasRelation = true;
                    }
                }
                else if (element instanceof ConditionalValidationModel && element.type === 'conditionalAnswered'
                    && element.referenceQuestionId === id) {
                    hasRelation = true;
                }
            });
        }
        // add hiders and disablers relations
        if (!hasRelation) {
            if (typeof questionBase.hide === 'string') {
                /** @type {?} */
                const hide = (/** @type {?} */ (questionBase.hide));
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                /** @type {?} */
                const hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                /** @type {?} */
                const disable = (/** @type {?} */ (questionBase.disable));
                if (disable.length > 0 && disable.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
        }
        // add calculate expressions relations
        if (!hasRelation && questionBase.calculateExpression && questionBase.calculateExpression.length > 0
            && questionBase.calculateExpression.indexOf(id) !== -1) {
            hasRelation = true;
        }
        return hasRelation;
    }
    /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    addRelationToControl(control, related) {
        //  let relations = control.controlRelations.relations;
        //
        //  let hasRelation = false;
        //
        //   relations.forEach(element => {
        //
        //     let controlRelation: ControlRelation = element as ControlRelation;
        //
        //     let relation: AfeFormControl | AfeFormArray = controlRelation.control as AfeFormControl | AfeFormArray;
        //
        //     if ( control.uuid !== undefined && control.uuid === relation.uuid ) {
        //       hasRelation = true;
        //     }
        //   });
        // if ( !hasRelation ) {
        control.controlRelations.addRelatedControls(related);
        // }
    }
}
ControlRelationsFactory.decorators = [
    { type: Injectable },
];
ControlRelationsFactory.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXZFLE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsY0FBYyxDQUFDLFFBQW1COztjQUUxQixhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBRTNELEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUNoQyxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLElBQWU7O2NBRS9CLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSTtRQUU1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUM7UUFDVCxDQUFDOztjQUNLLFFBQVEsR0FBYyxJQUFJLENBQUMsUUFBUTtRQUV6Qyxp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QUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsbUJBQW1CLElBQUksWUFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDO2VBQzlGLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsT0FBc0MsRUFBRSxPQUFzQztRQUVqRyx1REFBdUQ7UUFDdkQsRUFBRTtRQUNGLDRCQUE0QjtRQUM1QixFQUFFO1FBQ0YsbUNBQW1DO1FBQ25DLEVBQUU7UUFDRix5RUFBeUU7UUFDekUsRUFBRTtRQUNGLDhHQUE4RztRQUM5RyxFQUFFO1FBQ0YsNEVBQTRFO1FBQzVFLDRCQUE0QjtRQUM1QixRQUFRO1FBQ1IsUUFBUTtRQUVSLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSTtJQUNOLENBQUM7OztZQW5URixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICAnLi4vLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZSwgbm9kZUJhc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGU6IEdyb3VwTm9kZSkge1xuXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcblxuICAgIGlmICghZm9ybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgaW4gdGhlIHNhbWUgYXJyYXlcbiAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKG5vZGUpO1xuXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcblxuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGFycmF5Q29udHJvbFN0b3JlLCBjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgb3V0c2lkZSB0aGUgZ3JvdXAgdG8gY29udHJvbHMgaW4gdGhpcyBncm91cFxuICAgIHRoaXMuY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGUpO1xuXG4gICAgLy8gZmlyZSByZWxhdGlvbnNcbiAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XG4gICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBmb3JtIGNvbnRyb2xzXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgckNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZVBhdGggPSBub2RlLnBhdGguc3Vic3RyaW5nKDAsIG5vZGUucGF0aC5sYXN0SW5kZXhPZignLicpKTtcblxuICAgICAgICBpZiAockNoaWxkLnBhdGguaW5kZXhPZihwYXJlbnROb2RlUGF0aCArICcuJykgPT09IC0xKSB7XG5cbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggY29udHJvbHMgaW4gdGhlIGFycmF5IGdyb3VwXG4gICAgICAgICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZElkID0gYUNoaWxkLnF1ZXN0aW9uLmtleTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oYUNoaWxkSWQsIHJDaGlsZC5xdWVzdGlvbikpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UGF0aChyb290Tm9kZSwgcGFyZW50Tm9kZVBhdGgsIFtdKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgYW4gPSBub2Rlc1swXSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICBjb25zdCByb290Q29udHJvbCA9IChyQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChyb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmluZGV4T2YoYW4pID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLnB1c2goYW4pO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAoYUNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpLmFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoKHZhbHVlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSZWxhdGlvbnNGb3JDb250cm9sKGlkLCBub2RlOiBHcm91cE5vZGUpOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4ge1xuXG4gICAgY29uc3QgcmVsYXRpb25zOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBuZXcgQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KCk7XG5cbiAgICBjb25zdCBub2RlQmFzZUFycmF5OiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChpZCk7XG5cbiAgICBpZiAobm9kZUJhc2VBcnJheS5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IG5vZGVCYXNlQXJyYXlbMF07XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xMaXN0OiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sTGlzdCkge1xuICAgICAgICBpZiAoY29udHJvbExpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oY29udHJvbExpc3Rba2V5XS5xdWVzdGlvbi5rZXksIG5vZGVCYXNlLnF1ZXN0aW9uKSkge1xuICAgICAgICAgICAgcmVsYXRpb25zLnB1c2goY29udHJvbExpc3Rba2V5XS5jb250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aW9ucztcbiAgfVxuXG4gIG1hcENvbnRyb2xJZHMobm9kZTogR3JvdXBOb2RlLCBjb250cm9sc1N0b3JlOiBhbnkpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICB0aGlzLm1hcENvbnRyb2xJZHMoY2hpbGQsIGNvbnRyb2xzU3RvcmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgQXJyYXlOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sc1N0b3JlO1xuICB9XG5cbiAgc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmU6IGFueSwgbm9kZUJhc2U6IE5vZGVCYXNlKSB7XG5cbiAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IG5vZGVCYXNlLnF1ZXN0aW9uO1xuXG4gICAgY29uc3QgaWQgPSBxdWVzdGlvbkJhc2Uua2V5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09IGlkKSB7XG5cbiAgICAgICAgY29uc3Qgbm9kZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgPSBub2RlLnF1ZXN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGlkLCBxdWVzdGlvbiwgbm9kZUJhc2UpKSB7XG4gICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIGFuZCBjb25kaXRpb25hbCBhbnN3ZXJlZCByZWxhdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBxdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcblxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICAgICAgICAgIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc1JlbGF0aW9uKGlkOiBzdHJpbmcsIHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlLCBub2RlQmFzZT86IE5vZGVCYXNlKSB7XG5cbiAgICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcblxuICAgIGlmIChxdWVzdGlvbkJhc2UudmFsaWRhdG9ycyAmJiBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwpIHtcblxuICAgICAgICAgIGNvbnN0IG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgPSBlbGVtZW50IGFzIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbDtcblxuICAgICAgICAgIGNvbnN0IGZhaWxzV2hlbkV4cHJlc3Npb246IHN0cmluZyA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGZhaWxzV2hlbkV4cHJlc3Npb24gJiYgZmFpbHNXaGVuRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsICYmIGVsZW1lbnQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsQW5zd2VyZWQnXG4gICAgICAgICAgJiYgZWxlbWVudC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGhpZGVycyBhbmQgZGlzYWJsZXJzIHJlbGF0aW9uc1xuICAgIGlmICghaGFzUmVsYXRpb24pIHtcblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBoaWRlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuaGlkZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGhpZGUubGVuZ3RoID4gMCAmJiBoaWRlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZU9iajogYW55ID0gcXVlc3Rpb25CYXNlLmhpZGU7XG5cbiAgICAgICAgaWYgKGhpZGVPYmouZmllbGQgPT09IGlkKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgaWYgKCBxdWVzdGlvbkJhc2UuYWxlcnQgJiYgdHlwZW9mIHF1ZXN0aW9uQmFzZS5hbGVydCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5kaXNhYmxlID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnN0IGRpc2FibGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5kaXNhYmxlIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoZGlzYWJsZS5sZW5ndGggPiAwICYmIGRpc2FibGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGNhbGN1bGF0ZSBleHByZXNzaW9ucyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmxlbmd0aCA+IDBcbiAgICAgICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNSZWxhdGlvbjtcbiAgfVxuXG4gIGFkZFJlbGF0aW9uVG9Db250cm9sKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGVkOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkge1xuXG4gICAgLy8gIGxldCByZWxhdGlvbnMgPSBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zO1xuICAgIC8vXG4gICAgLy8gIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xuICAgIC8vXG4gICAgLy8gICByZWxhdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgY29udHJvbFJlbGF0aW9uOiBDb250cm9sUmVsYXRpb24gPSBlbGVtZW50IGFzIENvbnRyb2xSZWxhdGlvbjtcbiAgICAvL1xuICAgIC8vICAgICBsZXQgcmVsYXRpb246IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY29udHJvbFJlbGF0aW9uLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKCBjb250cm9sLnV1aWQgIT09IHVuZGVmaW5lZCAmJiBjb250cm9sLnV1aWQgPT09IHJlbGF0aW9uLnV1aWQgKSB7XG4gICAgLy8gICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9KTtcblxuICAgIC8vIGlmICggIWhhc1JlbGF0aW9uICkge1xuICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZCk7XG4gICAgLy8gfVxuICB9XG59XG4iXX0=