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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXZFLE1BQU07SUFFSixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsY0FBYyxDQUFDLFFBQW1COztjQUUxQixhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBRTNELEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUNoQyxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLElBQWU7O2NBRS9CLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSTtRQUU1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUM7UUFDVCxDQUFDOztjQUNLLFFBQVEsR0FBYyxJQUFJLENBQUMsUUFBUTtRQUV6Qyxp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LE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLG1CQUFtQixJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUM5RixZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUVELG9CQUFvQixDQUFDLE9BQXNDLEVBQUUsT0FBc0M7UUFFakcsdURBQXVEO1FBQ3ZELEVBQUU7UUFDRiw0QkFBNEI7UUFDNUIsRUFBRTtRQUNGLG1DQUFtQztRQUNuQyxFQUFFO1FBQ0YseUVBQXlFO1FBQ3pFLEVBQUU7UUFDRiw4R0FBOEc7UUFDOUcsRUFBRTtRQUNGLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsUUFBUTtRQUNSLFFBQVE7UUFFUix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUk7SUFDTixDQUFDOzs7WUFuVEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIGltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gICcuLi8uLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuaW1wb3J0IHsgQWZlRm9ybUFycmF5IH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWFycmF5JztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIGJ1aWxkUmVsYXRpb25zKHJvb3ROb2RlOiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICBjb25zdCBjb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sc1N0b3JlKSB7XHJcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmUsIG5vZGVCYXNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRBcnJheU5vZGVSZWxhdGlvbnMobm9kZTogR3JvdXBOb2RlKSB7XHJcblxyXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcclxuXHJcbiAgICBpZiAoIWZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XHJcblxyXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9scyBpbiB0aGUgc2FtZSBhcnJheVxyXG4gICAgdGhpcy5idWlsZFJlbGF0aW9ucyhub2RlKTtcclxuXHJcbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcclxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcclxuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XHJcblxyXG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoYXJyYXlDb250cm9sU3RvcmUsIGNoaWxkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZpbmUgcmVsYXRpb25zIGZvciBjb250cm9scyBvdXRzaWRlIHRoZSBncm91cCB0byBjb250cm9scyBpbiB0aGlzIGdyb3VwXHJcbiAgICB0aGlzLmNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlKTtcclxuXHJcbiAgICAvLyBmaXJlIHJlbGF0aW9uc1xyXG4gICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xyXG4gICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcclxuICAgICAgICBjb25zdCBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XHJcbiAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xyXG4gICAgICAgIGNvbnRyb2wudXBkYXRlQWxlcnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSkge1xyXG5cclxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XHJcblxyXG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XHJcblxyXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XHJcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XHJcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggZm9ybSBjb250cm9sc1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcclxuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgckNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVQYXRoID0gbm9kZS5wYXRoLnN1YnN0cmluZygwLCBub2RlLnBhdGgubGFzdEluZGV4T2YoJy4nKSk7XHJcblxyXG4gICAgICAgIGlmIChyQ2hpbGQucGF0aC5pbmRleE9mKHBhcmVudE5vZGVQYXRoICsgJy4nKSA9PT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggY29udHJvbHMgaW4gdGhlIGFycmF5IGdyb3VwXHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgYUNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcclxuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGRJZCA9IGFDaGlsZC5xdWVzdGlvbi5rZXk7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oYUNoaWxkSWQsIHJDaGlsZC5xdWVzdGlvbikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVBhdGgocm9vdE5vZGUsIHBhcmVudE5vZGVQYXRoLCBbXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBhbiA9IG5vZGVzWzBdIGFzIEFycmF5Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdENvbnRyb2wgPSAockNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKHJvb3RDb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuaW5kZXhPZihhbikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5wdXNoKGFuKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgKGFDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KS5hZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKCh2YWx1ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSZWxhdGlvbnNGb3JDb250cm9sKGlkLCBub2RlOiBHcm91cE5vZGUpOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4ge1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aW9uczogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gbmV3IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PigpO1xyXG5cclxuICAgIGNvbnN0IG5vZGVCYXNlQXJyYXk6IEFycmF5PE5vZGVCYXNlPiA9IG5vZGUuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKGlkKTtcclxuXHJcbiAgICBpZiAobm9kZUJhc2VBcnJheS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBub2RlQmFzZUFycmF5WzBdO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbExpc3Q6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sTGlzdCkge1xyXG4gICAgICAgIGlmIChjb250cm9sTGlzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oY29udHJvbExpc3Rba2V5XS5xdWVzdGlvbi5rZXksIG5vZGVCYXNlLnF1ZXN0aW9uKSkge1xyXG4gICAgICAgICAgICByZWxhdGlvbnMucHVzaChjb250cm9sTGlzdFtrZXldLmNvbnRyb2wpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlbGF0aW9ucztcclxuICB9XHJcblxyXG4gIG1hcENvbnRyb2xJZHMobm9kZTogR3JvdXBOb2RlLCBjb250cm9sc1N0b3JlOiBhbnkpIHtcclxuXHJcbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XHJcblxyXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICAgICAgICB0aGlzLm1hcENvbnRyb2xJZHMoY2hpbGQsIGNvbnRyb2xzU3RvcmUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBBcnJheU5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb250cm9sc1N0b3JlW3F1ZXN0aW9uQmFzZS5rZXldID0gY2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRyb2xzU3RvcmU7XHJcbiAgfVxyXG5cclxuICBzZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZTogYW55LCBub2RlQmFzZTogTm9kZUJhc2UpIHtcclxuXHJcbiAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IG5vZGVCYXNlLnF1ZXN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGlkID0gcXVlc3Rpb25CYXNlLmtleTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sc1N0b3JlKSB7XHJcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSBpZCkge1xyXG5cclxuICAgICAgICBjb25zdCBub2RlOiBOb2RlQmFzZSA9IGNvbnRyb2xzU3RvcmVba2V5XTtcclxuICAgICAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlID0gbm9kZS5xdWVzdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oaWQsIHF1ZXN0aW9uLCBub2RlQmFzZSkpIHtcclxuICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBjb25kaXRpb25hbCByZXF1aXJlZCBhbmQgY29uZGl0aW9uYWwgYW5zd2VyZWQgcmVsYXRpb25zXHJcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gcXVlc3Rpb24ucmVxdWlyZWQ7XHJcblxyXG4gICAgICAgICAgaWYgKHJlcXVpcmVkLnR5cGUgPT09ICdjb25kaXRpb25hbFJlcXVpcmVkJykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXHJcbiAgICAgICAgICAgICAgICBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzUmVsYXRpb24oaWQ6IHN0cmluZywgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UsIG5vZGVCYXNlPzogTm9kZUJhc2UpIHtcclxuXHJcbiAgICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAocXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMgJiYgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBtb2RlbDogSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsID0gZWxlbWVudCBhcyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw7XHJcblxyXG4gICAgICAgICAgY29uc3QgZmFpbHNXaGVuRXhwcmVzc2lvbjogc3RyaW5nID0gbW9kZWwuZmFpbHNXaGVuRXhwcmVzc2lvbjtcclxuICAgICAgICAgIGlmIChmYWlsc1doZW5FeHByZXNzaW9uICYmIGZhaWxzV2hlbkV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCAmJiBlbGVtZW50LnR5cGUgPT09ICdjb25kaXRpb25hbEFuc3dlcmVkJ1xyXG4gICAgICAgICAgJiYgZWxlbWVudC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xyXG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGhpZGVycyBhbmQgZGlzYWJsZXJzIHJlbGF0aW9uc1xyXG4gICAgaWYgKCFoYXNSZWxhdGlvbikge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmhpZGUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoaGlkZS5sZW5ndGggPiAwICYmIGhpZGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZU9iajogYW55ID0gcXVlc3Rpb25CYXNlLmhpZGU7XHJcblxyXG4gICAgICAgIGlmIChoaWRlT2JqLmZpZWxkID09PSBpZCkge1xyXG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICBpZiAoIHF1ZXN0aW9uQmFzZS5hbGVydCAmJiB0eXBlb2YgcXVlc3Rpb25CYXNlLmFsZXJ0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuZGlzYWJsZSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29uc3QgZGlzYWJsZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmRpc2FibGUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoZGlzYWJsZS5sZW5ndGggPiAwICYmIGRpc2FibGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGNhbGN1bGF0ZSBleHByZXNzaW9ucyByZWxhdGlvbnNcclxuICAgIGlmICghaGFzUmVsYXRpb24gJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24gJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24ubGVuZ3RoID4gMFxyXG4gICAgICAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoYXNSZWxhdGlvbjtcclxuICB9XHJcblxyXG4gIGFkZFJlbGF0aW9uVG9Db250cm9sKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGVkOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkge1xyXG5cclxuICAgIC8vICBsZXQgcmVsYXRpb25zID0gY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucztcclxuICAgIC8vXHJcbiAgICAvLyAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XHJcbiAgICAvL1xyXG4gICAgLy8gICByZWxhdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgbGV0IGNvbnRyb2xSZWxhdGlvbjogQ29udHJvbFJlbGF0aW9uID0gZWxlbWVudCBhcyBDb250cm9sUmVsYXRpb247XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGxldCByZWxhdGlvbjogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjb250cm9sUmVsYXRpb24uY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKCBjb250cm9sLnV1aWQgIT09IHVuZGVmaW5lZCAmJiBjb250cm9sLnV1aWQgPT09IHJlbGF0aW9uLnV1aWQgKSB7XHJcbiAgICAvLyAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9KTtcclxuXHJcbiAgICAvLyBpZiAoICFoYXNSZWxhdGlvbiApIHtcclxuICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZCk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG59XHJcbiJdfQ==