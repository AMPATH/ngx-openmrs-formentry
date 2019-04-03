/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                                    ((/** @type {?} */ (aChild.control))).addValueChangeListener((/**
                                     * @param {?} value
                                     * @return {?}
                                     */
                                    function (value) {
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
                                    }));
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
            questionBase.validators.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
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
            }));
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
        { type: Injectable },
    ];
    ControlRelationsFactory.ctorParameters = function () { return []; };
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS3ZFO0lBR0U7SUFBZ0IsQ0FBQzs7Ozs7SUFFakIsZ0RBQWM7Ozs7SUFBZCxVQUFlLFFBQW1COztZQUUxQixhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBRTNELEdBQUcsQ0FBQyxDQUFDLElBQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUNoQyxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7OztJQUVELHlEQUF1Qjs7OztJQUF2QixVQUF3QixJQUFlOztZQUUvQixJQUFJLEdBQVMsSUFBSSxDQUFDLElBQUk7UUFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDO1FBQ1QsQ0FBQzs7WUFDSyxRQUFRLEdBQWMsSUFBSSxDQUFD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Q0FBQyxPQUFPLEVBQVU7Z0JBRXRELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLG1CQUFtQixJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUM5RixZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUVELHNEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsT0FBc0MsRUFBRSxPQUFzQztRQUVqRyx1REFBdUQ7UUFDdkQsRUFBRTtRQUNGLDRCQUE0QjtRQUM1QixFQUFFO1FBQ0YsbUNBQW1DO1FBQ25DLEVBQUU7UUFDRix5RUFBeUU7UUFDekUsRUFBRTtRQUNGLDhHQUE4RztRQUM5RyxFQUFFO1FBQ0YsNEVBQTRFO1FBQzVFLDRCQUE0QjtRQUM1QixRQUFRO1FBQ1IsUUFBUTtRQUVSLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSTtJQUNOLENBQUM7O2dCQW5URixVQUFVOzs7SUFvVFgsOEJBQUM7Q0FBQSxBQXBURCxJQW9UQztTQW5UWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyBpbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICAnLi4vLi4vY2hhbmdlLXRyYWNraW5nL2NvbnRyb2wtcmVsYXRpb24nO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XHJcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uc0ZhY3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XHJcblxyXG4gICAgY29uc3QgY29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xyXG4gICAgICBpZiAoY29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xyXG5cclxuICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlLCBub2RlQmFzZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGU6IEdyb3VwTm9kZSkge1xyXG5cclxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XHJcblxyXG4gICAgaWYgKCFmb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHJvb3ROb2RlOiBHcm91cE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xyXG5cclxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgaW4gdGhlIHNhbWUgYXJyYXlcclxuICAgIHRoaXMuYnVpbGRSZWxhdGlvbnMobm9kZSk7XHJcblxyXG4gICAgLy8gYnVpbGQgcmVsYXRpb25zIGZvciBjb250cm9sIG91dHNpZGUgdGhlIGFycmF5XHJcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XHJcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByb290Q29udHJvbHNTdG9yZSkge1xyXG5cclxuICAgICAgaWYgKHJvb3RDb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XHJcblxyXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGFycmF5Q29udHJvbFN0b3JlLCBjaGlsZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmaW5lIHJlbGF0aW9ucyBmb3IgY29udHJvbHMgb3V0c2lkZSB0aGUgZ3JvdXAgdG8gY29udHJvbHMgaW4gdGhpcyBncm91cFxyXG4gICAgdGhpcy5jcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZSk7XHJcblxyXG4gICAgLy8gZmlyZSByZWxhdGlvbnNcclxuICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcclxuICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XHJcbiAgICAgICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xyXG4gICAgICAgIGNvbnRyb2wudXBkYXRlSGlkZGVuU3RhdGUoKTtcclxuICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlOiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xyXG5cclxuICAgIGNvbnN0IHJvb3ROb2RlOiBHcm91cE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xyXG5cclxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxyXG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xyXG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XHJcblxyXG4gICAgLy8gbG9vcCB0aHJvdWdoIGZvcm0gY29udHJvbHNcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XHJcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJDaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJlbnROb2RlUGF0aCA9IG5vZGUucGF0aC5zdWJzdHJpbmcoMCwgbm9kZS5wYXRoLmxhc3RJbmRleE9mKCcuJykpO1xyXG5cclxuICAgICAgICBpZiAockNoaWxkLnBhdGguaW5kZXhPZihwYXJlbnROb2RlUGF0aCArICcuJykgPT09IC0xKSB7XHJcblxyXG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNvbnRyb2xzIGluIHRoZSBhcnJheSBncm91cFxyXG4gICAgICAgICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XHJcbiAgICAgICAgICAgICAgY29uc3QgYUNoaWxkSWQgPSBhQ2hpbGQucXVlc3Rpb24ua2V5O1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGFDaGlsZElkLCByQ2hpbGQucXVlc3Rpb24pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IEFycmF5PE5vZGVCYXNlPiA9IG5vZGUuZm9ybS5zZWFyY2hOb2RlQnlQYXRoKHJvb3ROb2RlLCBwYXJlbnROb2RlUGF0aCwgW10pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgYW4gPSBub2Rlc1swXSBhcyBBcnJheU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RDb250cm9sID0gKHJDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChyb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmluZGV4T2YoYW4pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMucHVzaChhbik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIChhQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSkuYWRkVmFsdWVDaGFuZ2VMaXN0ZW5lcigodmFsdWUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UmVsYXRpb25zRm9yQ29udHJvbChpZCwgbm9kZTogR3JvdXBOb2RlKTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+IHtcclxuXHJcbiAgICBjb25zdCByZWxhdGlvbnM6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiA9IG5ldyBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4oKTtcclxuXHJcbiAgICBjb25zdCBub2RlQmFzZUFycmF5OiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChpZCk7XHJcblxyXG4gICAgaWYgKG5vZGVCYXNlQXJyYXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gbm9kZUJhc2VBcnJheVswXTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2xMaXN0OiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbExpc3QpIHtcclxuICAgICAgICBpZiAoY29udHJvbExpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGNvbnRyb2xMaXN0W2tleV0ucXVlc3Rpb24ua2V5LCBub2RlQmFzZS5xdWVzdGlvbikpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zLnB1c2goY29udHJvbExpc3Rba2V5XS5jb250cm9sKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZWxhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBtYXBDb250cm9sSWRzKG5vZGU6IEdyb3VwTm9kZSwgY29udHJvbHNTdG9yZTogYW55KSB7XHJcblxyXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xyXG5cclxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcblxyXG4gICAgICAgICAgdGhpcy5tYXBDb250cm9sSWRzKGNoaWxkLCBjb250cm9sc1N0b3JlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuXHJcbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XHJcblxyXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgQXJyYXlOb2RlKS5xdWVzdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250cm9sc1N0b3JlO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmU6IGFueSwgbm9kZUJhc2U6IE5vZGVCYXNlKSB7XHJcblxyXG4gICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSBub2RlQmFzZS5xdWVzdGlvbjtcclxuXHJcbiAgICBjb25zdCBpZCA9IHF1ZXN0aW9uQmFzZS5rZXk7XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xyXG4gICAgICBpZiAoY29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSAhPT0gaWQpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSA9IG5vZGUucXVlc3Rpb247XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGlkLCBxdWVzdGlvbiwgbm9kZUJhc2UpKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgbm9kZUJhc2UuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgYW5kIGNvbmRpdGlvbmFsIGFuc3dlcmVkIHJlbGF0aW9uc1xyXG4gICAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVxdWlyZWQ6IGFueSA9IHF1ZXN0aW9uLnJlcXVpcmVkO1xyXG5cclxuICAgICAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxyXG4gICAgICAgICAgICAgICAgbm9kZUJhc2UuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhc1JlbGF0aW9uKGlkOiBzdHJpbmcsIHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlLCBub2RlQmFzZT86IE5vZGVCYXNlKSB7XHJcblxyXG4gICAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzICYmIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgIHF1ZXN0aW9uQmFzZS52YWxpZGF0b3JzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgbW9kZWw6IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCA9IGVsZW1lbnQgYXMgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGZhaWxzV2hlbkV4cHJlc3Npb246IHN0cmluZyA9IG1vZGVsLmZhaWxzV2hlbkV4cHJlc3Npb247XHJcbiAgICAgICAgICBpZiAoZmFpbHNXaGVuRXhwcmVzc2lvbiAmJiBmYWlsc1doZW5FeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgJiYgZWxlbWVudC50eXBlID09PSAnY29uZGl0aW9uYWxBbnN3ZXJlZCdcclxuICAgICAgICAgICYmIGVsZW1lbnQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcclxuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBoaWRlcnMgYW5kIGRpc2FibGVycyByZWxhdGlvbnNcclxuICAgIGlmICghaGFzUmVsYXRpb24pIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5oaWRlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGhpZGUubGVuZ3RoID4gMCAmJiBoaWRlLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGVPYmo6IGFueSA9IHF1ZXN0aW9uQmFzZS5oaWRlO1xyXG5cclxuICAgICAgICBpZiAoaGlkZU9iai5maWVsZCA9PT0gaWQpIHtcclxuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgaWYgKCBxdWVzdGlvbkJhc2UuYWxlcnQgJiYgdHlwZW9mIHF1ZXN0aW9uQmFzZS5hbGVydCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmRpc2FibGUgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGRpc2FibGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5kaXNhYmxlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGRpc2FibGUubGVuZ3RoID4gMCAmJiBkaXNhYmxlLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBjYWxjdWxhdGUgZXhwcmVzc2lvbnMgcmVsYXRpb25zXHJcbiAgICBpZiAoIWhhc1JlbGF0aW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmxlbmd0aCA+IDBcclxuICAgICAgJiYgcXVlc3Rpb25CYXNlLmNhbGN1bGF0ZUV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XHJcbiAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGFzUmVsYXRpb247XHJcbiAgfVxyXG5cclxuICBhZGRSZWxhdGlvblRvQ29udHJvbChjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRlZDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpIHtcclxuXHJcbiAgICAvLyAgbGV0IHJlbGF0aW9ucyA9IGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnM7XHJcbiAgICAvL1xyXG4gICAgLy8gIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xyXG4gICAgLy9cclxuICAgIC8vICAgcmVsYXRpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGxldCBjb250cm9sUmVsYXRpb246IENvbnRyb2xSZWxhdGlvbiA9IGVsZW1lbnQgYXMgQ29udHJvbFJlbGF0aW9uO1xyXG4gICAgLy9cclxuICAgIC8vICAgICBsZXQgcmVsYXRpb246IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY29udHJvbFJlbGF0aW9uLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGlmICggY29udHJvbC51dWlkICE9PSB1bmRlZmluZWQgJiYgY29udHJvbC51dWlkID09PSByZWxhdGlvbi51dWlkICkge1xyXG4gICAgLy8gICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSk7XHJcblxyXG4gICAgLy8gaWYgKCAhaGFzUmVsYXRpb24gKSB7XHJcbiAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWQpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxufVxyXG4iXX0=