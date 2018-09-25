/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ controlsStore = this.mapControlIds(rootNode, {});
        for (var /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ nodeBase = controlsStore[key];
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
        var /** @type {?} */ form = node.form;
        if (!form) {
            return;
        }
        var /** @type {?} */ rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        var /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        var /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        for (var /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        this.setRelations(arrayControlStore, child);
                    }
                }
            }
        }
        // define relations for controls outside the group to controls in this group
        this.createRelationsToArrayControls(node);
        // fire relations
        for (var /** @type {?} */ id in arrayControlStore) {
            if (arrayControlStore.hasOwnProperty(id)) {
                var /** @type {?} */ child = arrayControlStore[id];
                var /** @type {?} */ control = /** @type {?} */ (child.control);
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
        var /** @type {?} */ form = node.form;
        var /** @type {?} */ rootNode = form.rootNode;
        // build relations for control outside the array
        var /** @type {?} */ rootControlsStore = this.mapControlIds(rootNode, {});
        var /** @type {?} */ arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var /** @type {?} */ key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var /** @type {?} */ rChild = rootControlsStore[key];
                var /** @type {?} */ parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            var /** @type {?} */ aChild = arrayControlStore[id];
                            var /** @type {?} */ aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                var /** @type {?} */ nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    var /** @type {?} */ an = /** @type {?} */ (nodes[0]);
                                    var /** @type {?} */ rootControl_1 = (/** @type {?} */ (rChild.control));
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    (/** @type {?} */ (aChild.control)).addValueChangeListener(function (value) {
                                        if ((/** @type {?} */ (rootControl_1)).updateCalculatedValue) {
                                            (/** @type {?} */ (rootControl_1)).updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if ((/** @type {?} */ (rootControl_1)).updateHiddenState) {
                                            (/** @type {?} */ (rootControl_1)).updateHiddenState();
                                        }
                                        if ((/** @type {?} */ (rootControl_1)).updateAlert) {
                                            (/** @type {?} */ (rootControl_1)).updateAlert();
                                        }
                                        if ((/** @type {?} */ (rootControl_1)).updateDisabledState) {
                                            (/** @type {?} */ (rootControl_1)).updateDisabledState();
                                        }
                                    });
                                }
                            }
                        }
                    };
                    var this_1 = this;
                    // loop through controls in the array group
                    for (var /** @type {?} */ id in arrayControlStore) {
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
        var /** @type {?} */ relations = new Array();
        var /** @type {?} */ nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            var /** @type {?} */ nodeBase = nodeBaseArray[0];
            var /** @type {?} */ controlList = this.mapControlIds(node, {});
            for (var /** @type {?} */ key in controlList) {
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
        var /** @type {?} */ children = node.children;
        for (var /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                var /** @type {?} */ child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
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
        var /** @type {?} */ questionBase = nodeBase.question;
        var /** @type {?} */ id = questionBase.key;
        for (var /** @type {?} */ key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                var /** @type {?} */ node = controlsStore[key];
                var /** @type {?} */ question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    var /** @type {?} */ required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(/** @type {?} */ (node.control), /** @type {?} */ (nodeBase.control));
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
        var /** @type {?} */ hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    var /** @type {?} */ model = /** @type {?} */ (element);
                    var /** @type {?} */ failsWhenExpression = model.failsWhenExpression;
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
                var /** @type {?} */ hide = /** @type {?} */ (questionBase.hide);
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                var /** @type {?} */ hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                var /** @type {?} */ disable = /** @type {?} */ (questionBase.disable);
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
    /** @nocollapse */
    ControlRelationsFactory.ctorParameters = function () { return []; };
    return ControlRelationsFactory;
}());
export { ControlRelationsFactory };
function ControlRelationsFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ControlRelationsFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ControlRelationsFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDN0YsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDOztJQVFyRTtLQUFpQjs7Ozs7SUFFakIsZ0RBQWM7Ozs7SUFBZCxVQUFlLFFBQW1CO1FBRWhDLHFCQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1RCxHQUFHLENBQUMsQ0FBQyxxQkFBTSxHQUFHLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMscUJBQU0sUUFBUSxHQUFhLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDNUM7U0FDRjtLQUNGOzs7OztJQUVELHlEQUF1Qjs7OztJQUF2QixVQUF3QixJQUFlO1FBRXJDLHFCQUFNLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQztTQUNSO1FBQ0QscUJBQU0sUUFBUSxHQUFjLElB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cEI7YUFDRjtTQUNGOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDOUYsWUFBWSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDcEI7Ozs7OztJQUVELHNEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsT0FBc0MsRUFBRSxPQUFzQzs7Ozs7Ozs7Ozs7Ozs7OztRQWtCakcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztLQUV0RDs7Z0JBblRGLFVBQVU7Ozs7a0NBWFg7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAgJy4uLy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcclxuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IGNvbnRyb2xzU3RvcmVba2V5XTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZSwgbm9kZUJhc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBidWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlOiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xyXG5cclxuICAgIGlmICghZm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcclxuXHJcbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIGluIHRoZSBzYW1lIGFycmF5XHJcbiAgICB0aGlzLmJ1aWxkUmVsYXRpb25zKG5vZGUpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxyXG4gICAgY29uc3Qgcm9vdENvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xyXG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcclxuXHJcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IHJvb3RDb250cm9sc1N0b3JlW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhhcnJheUNvbnRyb2xTdG9yZSwgY2hpbGQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmluZSByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIG91dHNpZGUgdGhlIGdyb3VwIHRvIGNvbnRyb2xzIGluIHRoaXMgZ3JvdXBcclxuICAgIHRoaXMuY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGUpO1xyXG5cclxuICAgIC8vIGZpcmUgcmVsYXRpb25zXHJcbiAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XHJcbiAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcclxuICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgICAgY29udHJvbC51cGRhdGVBbGVydCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZTogR3JvdXBOb2RlKSB7XHJcblxyXG4gICAgY29uc3QgZm9ybTogRm9ybSA9IG5vZGUuZm9ybTtcclxuXHJcbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcclxuXHJcbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcclxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcclxuICAgIGNvbnN0IGFycmF5Q29udHJvbFN0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBmb3JtIGNvbnRyb2xzXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByb290Q29udHJvbHNTdG9yZSkge1xyXG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICBjb25zdCByQ2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZVBhdGggPSBub2RlLnBhdGguc3Vic3RyaW5nKDAsIG5vZGUucGF0aC5sYXN0SW5kZXhPZignLicpKTtcclxuXHJcbiAgICAgICAgaWYgKHJDaGlsZC5wYXRoLmluZGV4T2YocGFyZW50Tm9kZVBhdGggKyAnLicpID09PSAtMSkge1xyXG5cclxuICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBjb250cm9scyBpbiB0aGUgYXJyYXkgZ3JvdXBcclxuICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xyXG5cclxuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZElkID0gYUNoaWxkLnF1ZXN0aW9uLmtleTtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihhQ2hpbGRJZCwgckNoaWxkLnF1ZXN0aW9uKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlQmFzZT4gPSBub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UGF0aChyb290Tm9kZSwgcGFyZW50Tm9kZVBhdGgsIFtdKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFuID0gbm9kZXNbMF0gYXMgQXJyYXlOb2RlO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCByb290Q29udHJvbCA9IChyQ2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAocm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5pbmRleE9mKGFuKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLnB1c2goYW4pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAoYUNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpLmFkZFZhbHVlQ2hhbmdlTGlzdGVuZXIoKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUNhbGN1bGF0ZWRWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJlbGF0aW9uc0ZvckNvbnRyb2woaWQsIG5vZGU6IEdyb3VwTm9kZSk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiB7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpb25zOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBuZXcgQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KCk7XHJcblxyXG4gICAgY29uc3Qgbm9kZUJhc2VBcnJheTogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoaWQpO1xyXG5cclxuICAgIGlmIChub2RlQmFzZUFycmF5Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IG5vZGVCYXNlQXJyYXlbMF07XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sTGlzdDogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcclxuXHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xMaXN0KSB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2xMaXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihjb250cm9sTGlzdFtrZXldLnF1ZXN0aW9uLmtleSwgbm9kZUJhc2UucXVlc3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9ucy5wdXNoKGNvbnRyb2xMaXN0W2tleV0uY29udHJvbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVsYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgbWFwQ29udHJvbElkcyhub2RlOiBHcm91cE5vZGUsIGNvbnRyb2xzU3RvcmU6IGFueSkge1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIHRoaXMubWFwQ29udHJvbElkcyhjaGlsZCwgY29udHJvbHNTdG9yZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb250cm9sc1N0b3JlW3F1ZXN0aW9uQmFzZS5rZXldID0gY2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIEFycmF5Tm9kZSkucXVlc3Rpb247XHJcblxyXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udHJvbHNTdG9yZTtcclxuICB9XHJcblxyXG4gIHNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlOiBhbnksIG5vZGVCYXNlOiBOb2RlQmFzZSkge1xyXG5cclxuICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gbm9kZUJhc2UucXVlc3Rpb247XHJcblxyXG4gICAgY29uc3QgaWQgPSBxdWVzdGlvbkJhc2Uua2V5O1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcclxuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkgIT09IGlkKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGU6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgPSBub2RlLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihpZCwgcXVlc3Rpb24sIG5vZGVCYXNlKSkge1xyXG4gICAgICAgICAgdGhpcy5hZGRSZWxhdGlvblRvQ29udHJvbChub2RlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIGFuZCBjb25kaXRpb25hbCBhbnN3ZXJlZCByZWxhdGlvbnNcclxuICAgICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBxdWVzdGlvbi5yZXF1aXJlZDtcclxuXHJcbiAgICAgICAgICBpZiAocmVxdWlyZWQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsUmVxdWlyZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVxdWlyZWQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcclxuICAgICAgICAgICAgICAgIG5vZGVCYXNlLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYXNSZWxhdGlvbihpZDogc3RyaW5nLCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSwgbm9kZUJhc2U/OiBOb2RlQmFzZSkge1xyXG5cclxuICAgIGxldCBoYXNSZWxhdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChxdWVzdGlvbkJhc2UudmFsaWRhdG9ycyAmJiBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IG1vZGVsOiBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgPSBlbGVtZW50IGFzIEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbDtcclxuXHJcbiAgICAgICAgICBjb25zdCBmYWlsc1doZW5FeHByZXNzaW9uOiBzdHJpbmcgPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xyXG4gICAgICAgICAgaWYgKGZhaWxzV2hlbkV4cHJlc3Npb24gJiYgZmFpbHNXaGVuRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsICYmIGVsZW1lbnQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsQW5zd2VyZWQnXHJcbiAgICAgICAgICAmJiBlbGVtZW50LnJlZmVyZW5jZVF1ZXN0aW9uSWQgPT09IGlkKSB7XHJcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgaGlkZXJzIGFuZCBkaXNhYmxlcnMgcmVsYXRpb25zXHJcbiAgICBpZiAoIWhhc1JlbGF0aW9uKSB7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb25zdCBoaWRlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuaGlkZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChoaWRlLmxlbmd0aCA+IDAgJiYgaGlkZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICBjb25zdCBoaWRlT2JqOiBhbnkgPSBxdWVzdGlvbkJhc2UuaGlkZTtcclxuXHJcbiAgICAgICAgaWYgKGhpZGVPYmouZmllbGQgPT09IGlkKSB7XHJcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgIGlmICggcXVlc3Rpb25CYXNlLmFsZXJ0ICYmIHR5cGVvZiBxdWVzdGlvbkJhc2UuYWxlcnQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5kaXNhYmxlID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb25zdCBkaXNhYmxlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuZGlzYWJsZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChkaXNhYmxlLmxlbmd0aCA+IDAgJiYgZGlzYWJsZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcclxuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgY2FsY3VsYXRlIGV4cHJlc3Npb25zIHJlbGF0aW9uc1xyXG4gICAgaWYgKCFoYXNSZWxhdGlvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5sZW5ndGggPiAwXHJcbiAgICAgICYmIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xyXG4gICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhhc1JlbGF0aW9uO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVsYXRpb25Ub0NvbnRyb2woY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIHJlbGF0ZWQ6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KSB7XHJcblxyXG4gICAgLy8gIGxldCByZWxhdGlvbnMgPSBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zO1xyXG4gICAgLy9cclxuICAgIC8vICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcclxuICAgIC8vXHJcbiAgICAvLyAgIHJlbGF0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgLy9cclxuICAgIC8vICAgICBsZXQgY29udHJvbFJlbGF0aW9uOiBDb250cm9sUmVsYXRpb24gPSBlbGVtZW50IGFzIENvbnRyb2xSZWxhdGlvbjtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgbGV0IHJlbGF0aW9uOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNvbnRyb2xSZWxhdGlvbi5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xyXG4gICAgLy9cclxuICAgIC8vICAgICBpZiAoIGNvbnRyb2wudXVpZCAhPT0gdW5kZWZpbmVkICYmIGNvbnRyb2wudXVpZCA9PT0gcmVsYXRpb24udXVpZCApIHtcclxuICAgIC8vICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH0pO1xyXG5cclxuICAgIC8vIGlmICggIWhhc1JlbGF0aW9uICkge1xyXG4gICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkKTtcclxuICAgIC8vIH1cclxuICB9XHJcbn1cclxuIl19