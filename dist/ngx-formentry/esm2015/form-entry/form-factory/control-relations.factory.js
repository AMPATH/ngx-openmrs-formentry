/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                                    ((/** @type {?} */ (aChild.control))).addValueChangeListener((/**
                                     * @param {?} value
                                     * @return {?}
                                     */
                                    (value) => {
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
                                    }));
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
            questionBase.validators.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
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
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXZFLE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsY0FBYyxDQUFDLFFBQW1COztjQUUxQixhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBRTNELEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUNoQyxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLElBQWU7O2NBRS9CLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSTtRQUU1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUM7UUFDVCxDQUFDOztjQUNLLFFBQVEsR0FBYyxJQUFJLENBQUMsUUFBUTtRQUV6Qyxp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LE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLG1CQUFtQixJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUM5RixZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUVELG9CQUFvQixDQUFDLE9BQXNDLEVBQUUsT0FBc0M7UUFFakcsdURBQXVEO1FBQ3ZELEVBQUU7UUFDRiw0QkFBNEI7UUFDNUIsRUFBRTtRQUNGLG1DQUFtQztRQUNuQyxFQUFFO1FBQ0YseUVBQXlFO1FBQ3pFLEVBQUU7UUFDRiw4R0FBOEc7UUFDOUcsRUFBRTtRQUNGLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsUUFBUTtRQUNSLFFBQVE7UUFFUix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUk7SUFDTixDQUFDOzs7WUFuVEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAgJy4uLy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBjb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmUsIG5vZGVCYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBpZiAoIWZvcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIGluIHRoZSBzYW1lIGFycmF5XG4gICAgdGhpcy5idWlsZFJlbGF0aW9ucyhub2RlKTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG5cbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhhcnJheUNvbnRyb2xTdG9yZSwgY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIG91dHNpZGUgdGhlIGdyb3VwIHRvIGNvbnRyb2xzIGluIHRoaXMgZ3JvdXBcbiAgICB0aGlzLmNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlKTtcblxuICAgIC8vIGZpcmUgcmVsYXRpb25zXG4gICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcbiAgICAgICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xuXG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZm9ybSBjb250cm9sc1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IHJDaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVQYXRoID0gbm9kZS5wYXRoLnN1YnN0cmluZygwLCBub2RlLnBhdGgubGFzdEluZGV4T2YoJy4nKSk7XG5cbiAgICAgICAgaWYgKHJDaGlsZC5wYXRoLmluZGV4T2YocGFyZW50Tm9kZVBhdGggKyAnLicpID09PSAtMSkge1xuXG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNvbnRyb2xzIGluIHRoZSBhcnJheSBncm91cFxuICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcbiAgICAgICAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblxuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGRJZCA9IGFDaGlsZC5xdWVzdGlvbi5rZXk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGFDaGlsZElkLCByQ2hpbGQucXVlc3Rpb24pKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVBhdGgocm9vdE5vZGUsIHBhcmVudE5vZGVQYXRoLCBbXSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFuID0gbm9kZXNbMF0gYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdENvbnRyb2wgPSAockNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAocm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5pbmRleE9mKGFuKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5wdXNoKGFuKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgKGFDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KS5hZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKCh2YWx1ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVsYXRpb25zRm9yQ29udHJvbChpZCwgbm9kZTogR3JvdXBOb2RlKTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+IHtcblxuICAgIGNvbnN0IHJlbGF0aW9uczogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gbmV3IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PigpO1xuXG4gICAgY29uc3Qgbm9kZUJhc2VBcnJheTogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoaWQpO1xuXG4gICAgaWYgKG5vZGVCYXNlQXJyYXkubGVuZ3RoID4gMCkge1xuXG4gICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBub2RlQmFzZUFycmF5WzBdO1xuXG4gICAgICBjb25zdCBjb250cm9sTGlzdDogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbExpc3QpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xMaXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGNvbnRyb2xMaXN0W2tleV0ucXVlc3Rpb24ua2V5LCBub2RlQmFzZS5xdWVzdGlvbikpIHtcbiAgICAgICAgICAgIHJlbGF0aW9ucy5wdXNoKGNvbnRyb2xMaXN0W2tleV0uY29udHJvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZWxhdGlvbnM7XG4gIH1cblxuICBtYXBDb250cm9sSWRzKG5vZGU6IEdyb3VwTm9kZSwgY29udHJvbHNTdG9yZTogYW55KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgdGhpcy5tYXBDb250cm9sSWRzKGNoaWxkLCBjb250cm9sc1N0b3JlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIEFycmF5Tm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udHJvbHNTdG9yZTtcbiAgfVxuXG4gIHNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlOiBhbnksIG5vZGVCYXNlOiBOb2RlQmFzZSkge1xuXG4gICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSBub2RlQmFzZS5xdWVzdGlvbjtcblxuICAgIGNvbnN0IGlkID0gcXVlc3Rpb25CYXNlLmtleTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSBpZCkge1xuXG4gICAgICAgIGNvbnN0IG5vZGU6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuICAgICAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlID0gbm9kZS5xdWVzdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihpZCwgcXVlc3Rpb24sIG5vZGVCYXNlKSkge1xuICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBjb25kaXRpb25hbCByZXF1aXJlZCBhbmQgY29uZGl0aW9uYWwgYW5zd2VyZWQgcmVsYXRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gcXVlc3Rpb24ucmVxdWlyZWQ7XG5cbiAgICAgICAgICBpZiAocmVxdWlyZWQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsUmVxdWlyZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChyZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgICAgICAgICBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNSZWxhdGlvbihpZDogc3RyaW5nLCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSwgbm9kZUJhc2U/OiBOb2RlQmFzZSkge1xuXG4gICAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAocXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMgJiYgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICAgICAgICBjb25zdCBtb2RlbDogSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsID0gZWxlbWVudCBhcyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw7XG5cbiAgICAgICAgICBjb25zdCBmYWlsc1doZW5FeHByZXNzaW9uOiBzdHJpbmcgPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xuICAgICAgICAgIGlmIChmYWlsc1doZW5FeHByZXNzaW9uICYmIGZhaWxzV2hlbkV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCAmJiBlbGVtZW50LnR5cGUgPT09ICdjb25kaXRpb25hbEFuc3dlcmVkJ1xuICAgICAgICAgICYmIGVsZW1lbnQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBoaWRlcnMgYW5kIGRpc2FibGVycyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmIChoaWRlLmxlbmd0aCA+IDAgJiYgaGlkZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGNvbnN0IGhpZGVPYmo6IGFueSA9IHF1ZXN0aW9uQmFzZS5oaWRlO1xuXG4gICAgICAgIGlmIChoaWRlT2JqLmZpZWxkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgIGlmICggcXVlc3Rpb25CYXNlLmFsZXJ0ICYmIHR5cGVvZiBxdWVzdGlvbkJhc2UuYWxlcnQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuZGlzYWJsZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBkaXNhYmxlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuZGlzYWJsZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGRpc2FibGUubGVuZ3RoID4gMCAmJiBkaXNhYmxlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjYWxjdWxhdGUgZXhwcmVzc2lvbnMgcmVsYXRpb25zXG4gICAgaWYgKCFoYXNSZWxhdGlvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5sZW5ndGggPiAwXG4gICAgICAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzUmVsYXRpb247XG4gIH1cblxuICBhZGRSZWxhdGlvblRvQ29udHJvbChjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRlZDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpIHtcblxuICAgIC8vICBsZXQgcmVsYXRpb25zID0gY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucztcbiAgICAvL1xuICAgIC8vICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcbiAgICAvL1xuICAgIC8vICAgcmVsYXRpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IGNvbnRyb2xSZWxhdGlvbjogQ29udHJvbFJlbGF0aW9uID0gZWxlbWVudCBhcyBDb250cm9sUmVsYXRpb247XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IHJlbGF0aW9uOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNvbnRyb2xSZWxhdGlvbi5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgIC8vXG4gICAgLy8gICAgIGlmICggY29udHJvbC51dWlkICE9PSB1bmRlZmluZWQgJiYgY29udHJvbC51dWlkID09PSByZWxhdGlvbi51dWlkICkge1xuICAgIC8vICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSk7XG5cbiAgICAvLyBpZiAoICFoYXNSZWxhdGlvbiApIHtcbiAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWQpO1xuICAgIC8vIH1cbiAgfVxufVxuIl19