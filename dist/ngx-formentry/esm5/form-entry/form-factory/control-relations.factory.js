import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var ControlRelationsFactory = /** @class */ (function () {
    function ControlRelationsFactory() {
    }
    ControlRelationsFactory.prototype.buildRelations = function (rootNode) {
        var controlsStore = this.mapControlIds(rootNode, {});
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                var nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    };
    ControlRelationsFactory.prototype.buildArrayNodeRelations = function (node) {
        var form = node.form;
        if (!form) {
            return;
        }
        var rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    var questionBase = child.question;
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
                var child = arrayControlStore[id];
                var control = child.control;
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    };
    ControlRelationsFactory.prototype.createRelationsToArrayControls = function (node) {
        var form = node.form;
        var rootNode = form.rootNode;
        // build relations for control outside the array
        var rootControlsStore = this.mapControlIds(rootNode, {});
        var arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (var key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                var rChild = rootControlsStore[key];
                var parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    var _loop_1 = function (id) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            var aChild = arrayControlStore[id];
                            var aChildId = aChild.question.key;
                            if (this_1.hasRelation(aChildId, rChild.question)) {
                                var nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    var an = nodes[0];
                                    var rootControl_1 = rChild.control;
                                    if (rootControl_1.controlRelations.otherRelations.indexOf(an) ===
                                        -1) {
                                        rootControl_1.controlRelations.otherRelations.push(an);
                                    }
                                    aChild.control.addValueChangeListener(function (value) {
                                        if (rootControl_1.updateCalculatedValue) {
                                            rootControl_1.updateCalculatedValue();
                                        }
                                        rootControl_1.updateValueAndValidity();
                                        if (rootControl_1.updateHiddenState) {
                                            rootControl_1.updateHiddenState();
                                        }
                                        if (rootControl_1.updateAlert) {
                                            rootControl_1.updateAlert();
                                        }
                                        if (rootControl_1.updateDisabledState) {
                                            rootControl_1.updateDisabledState();
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
    ControlRelationsFactory.prototype.getRelationsForControl = function (id, node) {
        var relations = new Array();
        var nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            var nodeBase = nodeBaseArray[0];
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
    ControlRelationsFactory.prototype.mapControlIds = function (node, controlsStore) {
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    };
    ControlRelationsFactory.prototype.setRelations = function (controlsStore, nodeBase) {
        var questionBase = nodeBase.question;
        var id = questionBase.key;
        for (var key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                var node = controlsStore[key];
                var question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(node.control, nodeBase.control);
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    var required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(node.control, nodeBase.control);
                        }
                    }
                }
            }
        }
    };
    ControlRelationsFactory.prototype.hasRelation = function (id, questionBase, nodeBase) {
        var hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(function (element) {
                if (element instanceof JsExpressionValidationModel) {
                    var model = element;
                    var failsWhenExpression = model.failsWhenExpression;
                    if (failsWhenExpression && failsWhenExpression.indexOf(id) !== -1) {
                        hasRelation = true;
                    }
                }
                else if (element instanceof ConditionalValidationModel &&
                    element.type === 'conditionalAnswered' &&
                    element.referenceQuestionId === id) {
                    hasRelation = true;
                }
            });
        }
        // add hiders and disablers relations
        if (!hasRelation) {
            if (typeof questionBase.hide === 'string') {
                var hide = questionBase.hide;
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                var hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                var disable = questionBase.disable;
                if (disable.length > 0 && disable.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
        }
        // add calculate expressions relations
        if (!hasRelation &&
            questionBase.calculateExpression &&
            questionBase.calculateExpression.length > 0 &&
            questionBase.calculateExpression.indexOf(id) !== -1) {
            hasRelation = true;
        }
        return hasRelation;
    };
    ControlRelationsFactory.prototype.addRelationToControl = function (control, related) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzdGLE9BQU8sRUFBWSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUt2RTtJQUVFO0lBQWUsQ0FBQztJQUVoQixnREFBYyxHQUFkLFVBQWUsUUFBbUI7UUFDaEMsSUFBTSxhQUFhLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUQsR0FBRyxDQUFDLENBQUMsSUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBTSxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCx5REFBdUIsR0FBdkIsVUFBd0IsSUFBZTtRQUNyQyxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQztRQUNULENBQUM7UUFD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Q0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxDQUNELENBQUMsV0FBVztZQUNaLFlBQVksQ0FBQyxtQkFBbUI7WUFDaEMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzNDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNELFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELHNEQUFvQixHQUFwQixVQUNFLE9BQXNDLEVBQ3RDLE9BQXNDO1FBRXRDLHVEQUF1RDtRQUN2RCxFQUFFO1FBQ0YsNEJBQTRCO1FBQzVCLEVBQUU7UUFDRixtQ0FBbUM7UUFDbkMsRUFBRTtRQUNGLHlFQUF5RTtRQUN6RSxFQUFFO1FBQ0YsOEdBQThHO1FBQzlHLEVBQUU7UUFDRiw0RUFBNEU7UUFDNUUsNEJBQTRCO1FBQzVCLFFBQVE7UUFDUixRQUFRO1FBRVIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJO0lBQ04sQ0FBQzs7Z0JBdFRGLFVBQVU7Ozs7SUF1VFgsOEJBQUM7Q0FBQSxBQXZURCxJQXVUQztTQXRUWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIGltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gICcuLi8uLi9jaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQWZlRm9ybUFycmF5IH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWFycmF5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9uc0ZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgYnVpbGRSZWxhdGlvbnMocm9vdE5vZGU6IEdyb3VwTm9kZSkge1xuICAgIGNvbnN0IGNvbnRyb2xzU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhyb290Tm9kZSwge30pO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbHNTdG9yZSkge1xuICAgICAgaWYgKGNvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBjb250cm9sc1N0b3JlW2tleV07XG5cbiAgICAgICAgdGhpcy5zZXRSZWxhdGlvbnMoY29udHJvbHNTdG9yZSwgbm9kZUJhc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQXJyYXlOb2RlUmVsYXRpb25zKG5vZGU6IEdyb3VwTm9kZSkge1xuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBpZiAoIWZvcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIGluIHRoZSBzYW1lIGFycmF5XG4gICAgdGhpcy5idWlsZFJlbGF0aW9ucyhub2RlKTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhhcnJheUNvbnRyb2xTdG9yZSwgY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIG91dHNpZGUgdGhlIGdyb3VwIHRvIGNvbnRyb2xzIGluIHRoaXMgZ3JvdXBcbiAgICB0aGlzLmNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlKTtcblxuICAgIC8vIGZpcmUgcmVsYXRpb25zXG4gICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgIGNvbnN0IGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhc1xuICAgICAgICAgIHwgQWZlRm9ybUNvbnRyb2xcbiAgICAgICAgICB8IEFmZUZvcm1BcnJheTtcbiAgICAgICAgY29udHJvbC51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmVsYXRpb25zVG9BcnJheUNvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSkge1xuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBjb25zdCByb290Tm9kZTogR3JvdXBOb2RlID0gZm9ybS5yb290Tm9kZTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBmb3JtIGNvbnRyb2xzXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdENvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJDaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVQYXRoID0gbm9kZS5wYXRoLnN1YnN0cmluZyhcbiAgICAgICAgICAwLFxuICAgICAgICAgIG5vZGUucGF0aC5sYXN0SW5kZXhPZignLicpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHJDaGlsZC5wYXRoLmluZGV4T2YocGFyZW50Tm9kZVBhdGggKyAnLicpID09PSAtMSkge1xuICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBjb250cm9scyBpbiB0aGUgYXJyYXkgZ3JvdXBcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGFycmF5Q29udHJvbFN0b3JlKSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlDb250cm9sU3RvcmUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZDogTm9kZUJhc2UgPSBhcnJheUNvbnRyb2xTdG9yZVtpZF07XG4gICAgICAgICAgICAgIGNvbnN0IGFDaGlsZElkID0gYUNoaWxkLnF1ZXN0aW9uLmtleTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oYUNoaWxkSWQsIHJDaGlsZC5xdWVzdGlvbikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVBhdGgoXG4gICAgICAgICAgICAgICAgICByb290Tm9kZSxcbiAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVQYXRoLFxuICAgICAgICAgICAgICAgICAgW11cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhbiA9IG5vZGVzWzBdIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RDb250cm9sID0gckNoaWxkLmNvbnRyb2wgYXNcbiAgICAgICAgICAgICAgICAgICAgfCBBZmVGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB8IEFmZUZvcm1BcnJheTtcblxuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmluZGV4T2YoYW4pID09PVxuICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMucHVzaChhbik7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIChhQ2hpbGQuY29udHJvbCBhc1xuICAgICAgICAgICAgICAgICAgICB8IEFmZUZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHwgQWZlRm9ybUFycmF5KS5hZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQ2FsY3VsYXRlZFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByb290Q29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJlbGF0aW9uc0ZvckNvbnRyb2woXG4gICAgaWQsXG4gICAgbm9kZTogR3JvdXBOb2RlXG4gICk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiB7XG4gICAgY29uc3QgcmVsYXRpb25zOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBuZXcgQXJyYXk8XG4gICAgICBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheVxuICAgID4oKTtcblxuICAgIGNvbnN0IG5vZGVCYXNlQXJyYXk6IEFycmF5PE5vZGVCYXNlPiA9IG5vZGUuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKGlkKTtcblxuICAgIGlmIChub2RlQmFzZUFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vZGVCYXNlOiBOb2RlQmFzZSA9IG5vZGVCYXNlQXJyYXlbMF07XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xMaXN0OiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMobm9kZSwge30pO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sTGlzdCkge1xuICAgICAgICBpZiAoY29udHJvbExpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuaGFzUmVsYXRpb24oY29udHJvbExpc3Rba2V5XS5xdWVzdGlvbi5rZXksIG5vZGVCYXNlLnF1ZXN0aW9uKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmVsYXRpb25zLnB1c2goY29udHJvbExpc3Rba2V5XS5jb250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aW9ucztcbiAgfVxuXG4gIG1hcENvbnRyb2xJZHMobm9kZTogR3JvdXBOb2RlLCBjb250cm9sc1N0b3JlOiBhbnkpIHtcbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgdGhpcy5tYXBDb250cm9sSWRzKGNoaWxkLCBjb250cm9sc1N0b3JlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb250cm9sc1N0b3JlW3F1ZXN0aW9uQmFzZS5rZXldID0gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgQXJyYXlOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udHJvbHNTdG9yZVtxdWVzdGlvbkJhc2Uua2V5XSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sc1N0b3JlO1xuICB9XG5cbiAgc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmU6IGFueSwgbm9kZUJhc2U6IE5vZGVCYXNlKSB7XG4gICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSBub2RlQmFzZS5xdWVzdGlvbjtcblxuICAgIGNvbnN0IGlkID0gcXVlc3Rpb25CYXNlLmtleTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSBpZCkge1xuICAgICAgICBjb25zdCBub2RlOiBOb2RlQmFzZSA9IGNvbnRyb2xzU3RvcmVba2V5XTtcbiAgICAgICAgY29uc3QgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSA9IG5vZGUucXVlc3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzUmVsYXRpb24oaWQsIHF1ZXN0aW9uLCBub2RlQmFzZSkpIHtcbiAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKFxuICAgICAgICAgICAgbm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICAgICAgbm9kZUJhc2UuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgYW5kIGNvbmRpdGlvbmFsIGFuc3dlcmVkIHJlbGF0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBxdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcbiAgICAgICAgICAgIGlmIChyZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKFxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgICAgICAgICBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzUmVsYXRpb24oaWQ6IHN0cmluZywgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UsIG5vZGVCYXNlPzogTm9kZUJhc2UpIHtcbiAgICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcblxuICAgIGlmIChxdWVzdGlvbkJhc2UudmFsaWRhdG9ycyAmJiBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKSB7XG4gICAgICAgICAgY29uc3QgbW9kZWw6IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCA9IGVsZW1lbnQgYXMgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsO1xuXG4gICAgICAgICAgY29uc3QgZmFpbHNXaGVuRXhwcmVzc2lvbjogc3RyaW5nID0gbW9kZWwuZmFpbHNXaGVuRXhwcmVzc2lvbjtcbiAgICAgICAgICBpZiAoZmFpbHNXaGVuRXhwcmVzc2lvbiAmJiBmYWlsc1doZW5FeHByZXNzaW9uLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgJiZcbiAgICAgICAgICBlbGVtZW50LnR5cGUgPT09ICdjb25kaXRpb25hbEFuc3dlcmVkJyAmJlxuICAgICAgICAgIGVsZW1lbnQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaGlkZXJzIGFuZCBkaXNhYmxlcnMgcmVsYXRpb25zXG4gICAgaWYgKCFoYXNSZWxhdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuaGlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaGlkZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmIChoaWRlLmxlbmd0aCA+IDAgJiYgaGlkZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBoaWRlT2JqOiBhbnkgPSBxdWVzdGlvbkJhc2UuaGlkZTtcblxuICAgICAgICBpZiAoaGlkZU9iai5maWVsZCA9PT0gaWQpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5hbGVydCAmJiB0eXBlb2YgcXVlc3Rpb25CYXNlLmFsZXJ0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmRpc2FibGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGRpc2FibGU6IHN0cmluZyA9IHF1ZXN0aW9uQmFzZS5kaXNhYmxlIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoZGlzYWJsZS5sZW5ndGggPiAwICYmIGRpc2FibGUuaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgaGFzUmVsYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGNhbGN1bGF0ZSBleHByZXNzaW9ucyByZWxhdGlvbnNcbiAgICBpZiAoXG4gICAgICAhaGFzUmVsYXRpb24gJiZcbiAgICAgIHF1ZXN0aW9uQmFzZS5jYWxjdWxhdGVFeHByZXNzaW9uICYmXG4gICAgICBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5sZW5ndGggPiAwICYmXG4gICAgICBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzUmVsYXRpb247XG4gIH1cblxuICBhZGRSZWxhdGlvblRvQ29udHJvbChcbiAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICByZWxhdGVkOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheVxuICApIHtcbiAgICAvLyAgbGV0IHJlbGF0aW9ucyA9IGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnM7XG4gICAgLy9cbiAgICAvLyAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XG4gICAgLy9cbiAgICAvLyAgIHJlbGF0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIC8vXG4gICAgLy8gICAgIGxldCBjb250cm9sUmVsYXRpb246IENvbnRyb2xSZWxhdGlvbiA9IGVsZW1lbnQgYXMgQ29udHJvbFJlbGF0aW9uO1xuICAgIC8vXG4gICAgLy8gICAgIGxldCByZWxhdGlvbjogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjb250cm9sUmVsYXRpb24uY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAoIGNvbnRyb2wudXVpZCAhPT0gdW5kZWZpbmVkICYmIGNvbnRyb2wudXVpZCA9PT0gcmVsYXRpb24udXVpZCApIHtcbiAgICAvLyAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gaWYgKCAhaGFzUmVsYXRpb24gKSB7XG4gICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkKTtcbiAgICAvLyB9XG4gIH1cbn1cbiJdfQ==