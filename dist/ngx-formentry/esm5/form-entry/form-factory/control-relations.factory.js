/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var ControlRelationsFactory = /** @class */ (function () {
    function ControlRelationsFactory() {
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    ControlRelationsFactory.prototype.buildRelations = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        /** @type {?} */
        var controlsStore = this.mapControlIds(rootNode, {});
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                var nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.buildArrayNodeRelations = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var form = node.form;
        if (!form) {
            return;
        }
        /** @type {?} */
        var rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        /** @type {?} */
        var rootControlsStore = this.mapControlIds(rootNode, {});
        /** @type {?} */
        var arrayControlStore = this.mapControlIds(node, {});
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                var child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    /** @type {?} */
                    var questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (var id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                /** @type {?} */
                var child = arrayControlStore[id];
                /** @type {?} */
                var control = (/** @type {?} */ (child.control));
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.createRelationsToArrayControls = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var form = node.form;
        /** @type {?} */
        var rootNode = form.rootNode;
        // build relations for control outside the array
        /** @type {?} */
        var rootControlsStore = this.mapControlIds(rootNode, {});
        /** @type {?} */
        var arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                /** @type {?} */
                var rChild = rootControlsStore[key];
                /** @type {?} */
                var parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            /** @type {?} */
                            var aChild = arrayControlStore[id];
                            /** @type {?} */
                            var aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                /** @type {?} */
                                var nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    /** @type {?} */
                                    var an = (/** @type {?} */ (nodes[0]));
                                    /** @type {?} */
                                    var rootControl_1 = ((/** @type {?} */ (rChild.control)));
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    ((/** @type {?} */ (aChild.control))).addValueChangeListener(function (value) {
                                        if (((/** @type {?} */ (rootControl_1))).updateCalculatedValue) {
                                            ((/** @type {?} */ (rootControl_1))).updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if (((/** @type {?} */ (rootControl_1))).updateHiddenState) {
                                            ((/** @type {?} */ (rootControl_1))).updateHiddenState();
                                        }
                                        if (((/** @type {?} */ (rootControl_1))).updateAlert) {
                                            ((/** @type {?} */ (rootControl_1))).updateAlert();
                                        }
                                        if (((/** @type {?} */ (rootControl_1))).updateDisabledState) {
                                            ((/** @type {?} */ (rootControl_1))).updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    // loop through controls in the array group
                    for (var id in arrayControlStore) {
                        _loop_1(id);
                    }
                }
            }
        }
    };
    /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    ControlRelationsFactory.prototype.getRelationsForControl = /**
     * @param {?} id
     * @param {?} node
     * @return {?}
     */
    function (id, node) {
        /** @type {?} */
        var relations = new Array();
        /** @type {?} */
        var nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            /** @type {?} */
            var nodeBase = nodeBaseArray[0];
            /** @type {?} */
            var controlList = this.mapControlIds(node, {});
            for (var key in controlList) {
                if (controlList.hasOwnProperty(key)) {
                    if (this.hasRelation(controlList[key].question.key, nodeBase.question)) {
                        relations.push(controlList[key].control);
                    }
                }
            }
        }
        return relations;
    };
    /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    ControlRelationsFactory.prototype.mapControlIds = /**
     * @param {?} node
     * @param {?} controlsStore
     * @return {?}
     */
    function (node, controlsStore) {
        /** @type {?} */
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    /** @type {?} */
                    var questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    /** @type {?} */
                    var questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    };
    /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    ControlRelationsFactory.prototype.setRelations = /**
     * @param {?} controlsStore
     * @param {?} nodeBase
     * @return {?}
     */
    function (controlsStore, nodeBase) {
        /** @type {?} */
        var questionBase = nodeBase.question;
        /** @type {?} */
        var id = questionBase.key;
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                /** @type {?} */
                var node = controlsStore[key];
                /** @type {?} */
                var question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl((/** @type {?} */ (node.control)), (/** @type {?} */ (nodeBase.control)));
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    /** @type {?} */
                    var required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl((/** @type {?} */ (node.control)), (/** @type {?} */ (nodeBase.control)));
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    ControlRelationsFactory.prototype.hasRelation = /**
     * @param {?} id
     * @param {?} questionBase
     * @param {?=} nodeBase
     * @return {?}
     */
    function (id, questionBase, nodeBase) {
        /** @type {?} */
        var hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    /** @type {?} */
                    var model = (/** @type {?} */ (element));
                    /** @type {?} */
                    var failsWhenExpression = model.failsWhenExpression;
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
                var hide = (/** @type {?} */ (questionBase.hide));
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                /** @type {?} */
                var hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                /** @type {?} */
                var disable = (/** @type {?} */ (questionBase.disable));
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
    };
    /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    ControlRelationsFactory.prototype.addRelationToControl = /**
     * @param {?} control
     * @param {?} related
     * @return {?}
     */
    function (control, related) {
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
    };
    ControlRelationsFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ControlRelationsFactory.ctorParameters = function () { return []; };
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS3ZFO0lBR0U7SUFBZ0IsQ0FBQzs7Ozs7SUFFakIsZ0RBQWM7Ozs7SUFBZCxVQUFlLFFBQW1COztZQUUxQixhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBRTNELEtBQUssSUFBTSxHQUFHLElBQUksYUFBYSxFQUFFO1lBQy9CLElBQUksYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7b0JBQy9CLFFBQVEsR0FBYSxhQUFhLENBQUMsR0FBRyxDQUFDO2dCQUU3QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCx5REFBdUI7Ozs7SUFBdkIsVUFBd0IsSUFBZTs7WUFFL0IsSUFBSSxHQUFTLElBQUksQ0FBQyxJQUFJO1FBRTVCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPO1NBQ1I7O1lBQ0ssUUFBUSxHQUFjLElBQUksQ0FBQyxRQUFRO1FBRXpDLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7WUFHcEIsaUJBQWlCLEdBQVEs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QztJQUNyQixDQUFDOzs7Ozs7SUFFRCxzREFBb0I7Ozs7O0lBQXBCLFVBQXFCLE9BQXNDLEVBQUUsT0FBc0M7UUFFakcsdURBQXVEO1FBQ3ZELEVBQUU7UUFDRiw0QkFBNEI7UUFDNUIsRUFBRTtRQUNGLG1DQUFtQztRQUNuQyxFQUFFO1FBQ0YseUVBQXlFO1FBQ3pFLEVBQUU7UUFDRiw4R0FBOEc7UUFDOUcsRUFBRTtRQUNGLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsUUFBUTtRQUNSLFFBQVE7UUFFUix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUk7SUFDTixDQUFDOztnQkFuVEYsVUFBVTs7OztJQW9UWCw4QkFBQztDQUFBLEFBcFRELElBb1RDO1NBblRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAgJy4uLy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBjb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmUsIG5vZGVCYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBpZiAoIWZvcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIGluIHRoZSBzYW1lIGFycmF5XG4gICAgdGhpcy5idWlsZFJlbGF0aW9ucyhub2RlKTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG5cbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhhcnJheUNvbnRyb2xTdG9yZSwgY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIG91dHNpZGUgdGhlIGdyb3VwIHRvIGNvbnRyb2xzIGluIHRoaXMgZ3JvdXBcbiAgICB0aGlzLmNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlKTtcblxuICAgIC8vIGZpcmUgcmVsYXRpb25zXG4gICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcbiAgICAgICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xuXG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZm9ybSBjb250cm9sc1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IHJDaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVQYXRoID0gbm9kZS5wYXRoLnN1YnN0cmluZygwLCBub2RlLnBhdGgubGFzdEluZGV4T2YoJy4nKSk7XG5cbiAgICAgICAgaWYgKHJDaGlsZC5wYXRoLmluZGV4T2YocGFyZW50Tm9kZVBhdGggKyAnLicpID09PSAtMSkge1xuXG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNvbnRyb2xzIGluIHRoZSBhcnJheSBncm91cFxuICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcbiAgICAgICAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblxuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGRJZCA9IGFDaGlsZC5xdWVzdGlvbi5rZXk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGFDaGlsZElkLCByQ2hpbGQucXVlc3Rpb24pKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVBhdGgocm9vdE5vZGUsIHBhcmVudE5vZGVQYXRoLCBbXSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFuID0gbm9kZXNbMF0gYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdENvbnRyb2wgPSAockNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAocm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5pbmRleE9mKGFuKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5wdXNoKGFuKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgKGFDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KS5hZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKCh2YWx1ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVsYXRpb25zRm9yQ29udHJvbChpZCwgbm9kZTogR3JvdXBOb2RlKTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+IHtcblxuICAgIGNvbnN0IHJlbGF0aW9uczogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gbmV3IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PigpO1xuXG4gICAgY29uc3Qgbm9kZUJhc2VBcnJheTogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoaWQpO1xuXG4gICAgaWYgKG5vZGVCYXNlQXJyYXkubGVuZ3RoID4gMCkge1xuXG4gICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBub2RlQmFzZUFycmF5WzBdO1xuXG4gICAgICBjb25zdCBjb250cm9sTGlzdDogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbExpc3QpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xMaXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGNvbnRyb2xMaXN0W2tleV0ucXVlc3Rpb24ua2V5LCBub2RlQmFzZS5xdWVzdGlvbikpIHtcbiAgICAgICAgICAgIHJlbGF0aW9ucy5wdXNoKGNvbnRyb2xMaXN0W2tleV0uY29udHJvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZWxhdGlvbnM7XG4gIH1cblxuICBtYXBDb250cm9sSWRzKG5vZGU6IEdyb3VwTm9kZSwgY29udHJvbHNTdG9yZTogYW55KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgdGhpcy5tYXBDb250cm9sSWRzKGNoaWxkLCBjb250cm9sc1N0b3JlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIEFycmF5Tm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udHJvbHNTdG9yZTtcbiAgfVxuXG4gIHNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlOiBhbnksIG5vZGVCYXNlOiBOb2RlQmFzZSkge1xuXG4gICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSBub2RlQmFzZS5xdWVzdGlvbjtcblxuICAgIGNvbnN0IGlkID0gcXVlc3Rpb25CYXNlLmtleTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSBpZCkge1xuXG4gICAgICAgIGNvbnN0IG5vZGU6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuICAgICAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlID0gbm9kZS5xdWVzdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihpZCwgcXVlc3Rpb24sIG5vZGVCYXNlKSkge1xuICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBjb25kaXRpb25hbCByZXF1aXJlZCBhbmQgY29uZGl0aW9uYWwgYW5zd2VyZWQgcmVsYXRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gcXVlc3Rpb24ucmVxdWlyZWQ7XG5cbiAgICAgICAgICBpZiAocmVxdWlyZWQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsUmVxdWlyZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChyZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgICAgICAgICBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNSZWxhdGlvbihpZDogc3RyaW5nLCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSwgbm9kZUJhc2U/OiBOb2RlQmFzZSkge1xuXG4gICAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAocXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMgJiYgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICAgICAgICBjb25zdCBtb2RlbDogSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsID0gZWxlbWVudCBhcyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw7XG5cbiAgICAgICAgICBjb25zdCBmYWlsc1doZW5FeHByZXNzaW9uOiBzdHJpbmcgPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xuICAgICAgICAgIGlmIChmYWlsc1doZW5FeHByZXNzaW9uICYmIGZhaWxzV2hlbkV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCAmJiBlbGVtZW50LnR5cGUgPT09ICdjb25kaXRpb25hbEFuc3dlcmVkJ1xuICAgICAgICAgICYmIGVsZW1lbnQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBoaWRlcnMgYW5kIGRpc2FibGVycyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmIChoaWRlLmxlbmd0aCA+IDAgJiYgaGlkZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGNvbnN0IGhpZGVPYmo6IGFueSA9IHF1ZXN0aW9uQmFzZS5oaWRlO1xuXG4gICAgICAgIGlmIChoaWRlT2JqLmZpZWxkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgIGlmICggcXVlc3Rpb25CYXNlLmFsZXJ0ICYmIHR5cGVvZiBxdWVzdGlvbkJhc2UuYWxlcnQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuZGlzYWJsZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBkaXNhYmxlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuZGlzYWJsZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGRpc2FibGUubGVuZ3RoID4gMCAmJiBkaXNhYmxlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjYWxjdWxhdGUgZXhwcmVzc2lvbnMgcmVsYXRpb25zXG4gICAgaWYgKCFoYXNSZWxhdGlvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5sZW5ndGggPiAwXG4gICAgICAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzUmVsYXRpb247XG4gIH1cblxuICBhZGRSZWxhdGlvblRvQ29udHJvbChjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRlZDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpIHtcblxuICAgIC8vICBsZXQgcmVsYXRpb25zID0gY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucztcbiAgICAvL1xuICAgIC8vICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcbiAgICAvL1xuICAgIC8vICAgcmVsYXRpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IGNvbnRyb2xSZWxhdGlvbjogQ29udHJvbFJlbGF0aW9uID0gZWxlbWVudCBhcyBDb250cm9sUmVsYXRpb247XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IHJlbGF0aW9uOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNvbnRyb2xSZWxhdGlvbi5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgIC8vXG4gICAgLy8gICAgIGlmICggY29udHJvbC51dWlkICE9PSB1bmRlZmluZWQgJiYgY29udHJvbC51dWlkID09PSByZWxhdGlvbi51dWlkICkge1xuICAgIC8vICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSk7XG5cbiAgICAvLyBpZiAoICFoYXNSZWxhdGlvbiApIHtcbiAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWQpO1xuICAgIC8vIH1cbiAgfVxufVxuIl19