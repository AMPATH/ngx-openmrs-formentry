import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
let ControlRelationsFactory = class ControlRelationsFactory {
    constructor() { }
    buildRelations(rootNode) {
        const controlsStore = this.mapControlIds(rootNode, {});
        for (const key in controlsStore) {
            if (controlsStore.hasOwnProperty(key)) {
                const nodeBase = controlsStore[key];
                this.setRelations(controlsStore, nodeBase);
            }
        }
    }
    buildArrayNodeRelations(node) {
        const form = node.form;
        if (!form) {
            return;
        }
        const rootNode = form.rootNode;
        // build relations for controls in the same array
        this.buildRelations(node);
        // build relations for control outside the array
        const rootControlsStore = this.mapControlIds(rootNode, {});
        const arrayControlStore = this.mapControlIds(node, {});
        for (const key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                const child = rootControlsStore[key];
                if (child instanceof LeafNode) {
                    const questionBase = child.question;
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
                const child = arrayControlStore[id];
                const control = child.control;
                control.updateHiddenState();
                control.updateAlert();
            }
        }
    }
    createRelationsToArrayControls(node) {
        const form = node.form;
        const rootNode = form.rootNode;
        // build relations for control outside the array
        const rootControlsStore = this.mapControlIds(rootNode, {});
        const arrayControlStore = this.mapControlIds(node, {});
        // loop through form controls
        for (const key in rootControlsStore) {
            if (rootControlsStore.hasOwnProperty(key)) {
                const rChild = rootControlsStore[key];
                const parentNodePath = node.path.substring(0, node.path.lastIndexOf('.'));
                if (rChild.path.indexOf(parentNodePath + '.') === -1) {
                    // loop through controls in the array group
                    for (const id in arrayControlStore) {
                        if (arrayControlStore.hasOwnProperty(id)) {
                            const aChild = arrayControlStore[id];
                            const aChildId = aChild.question.key;
                            if (this.hasRelation(aChildId, rChild.question)) {
                                const nodes = node.form.searchNodeByPath(rootNode, parentNodePath, []);
                                if (nodes.length > 0) {
                                    const an = nodes[0];
                                    const rootControl = rChild.control;
                                    if (rootControl.controlRelations.otherRelations.indexOf(an) === -1) {
                                        rootControl.controlRelations.otherRelations.push(an);
                                    }
                                    aChild.control.addValueChangeListener((value) => {
                                        if (rootControl.updateCalculatedValue) {
                                            rootControl.updateCalculatedValue();
                                        }
                                        rootControl.updateValueAndValidity();
                                        if (rootControl.updateHiddenState) {
                                            rootControl.updateHiddenState();
                                        }
                                        if (rootControl.updateAlert) {
                                            rootControl.updateAlert();
                                        }
                                        if (rootControl.updateDisabledState) {
                                            rootControl.updateDisabledState();
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
    getRelationsForControl(id, node) {
        const relations = new Array();
        const nodeBaseArray = node.form.searchNodeByQuestionId(id);
        if (nodeBaseArray.length > 0) {
            const nodeBase = nodeBaseArray[0];
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
    mapControlIds(node, controlsStore) {
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                const child = children[key];
                if (child instanceof GroupNode) {
                    this.mapControlIds(child, controlsStore);
                }
                else if (child instanceof LeafNode) {
                    const questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
                else if (child instanceof ArrayNode) {
                    const questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        controlsStore[questionBase.key] = child;
                    }
                }
            }
        }
        return controlsStore;
    }
    setRelations(controlsStore, nodeBase) {
        const questionBase = nodeBase.question;
        const id = questionBase.key;
        for (const key in controlsStore) {
            if (controlsStore.hasOwnProperty(key) && key !== id) {
                const node = controlsStore[key];
                const question = node.question;
                if (this.hasRelation(id, question, nodeBase)) {
                    this.addRelationToControl(node.control, nodeBase.control);
                }
                // add conditional required and conditional answered relations
                if (typeof question.required === 'object') {
                    const required = question.required;
                    if (required.type === 'conditionalRequired') {
                        if (required.referenceQuestionId === id) {
                            this.addRelationToControl(node.control, nodeBase.control);
                        }
                    }
                }
            }
        }
    }
    hasRelation(id, questionBase, nodeBase) {
        let hasRelation = false;
        if (questionBase.validators && questionBase.validators.length > 0) {
            questionBase.validators.forEach(element => {
                if (element instanceof JsExpressionValidationModel) {
                    const model = element;
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
                const hide = questionBase.hide;
                if (hide.length > 0 && hide.indexOf(id) !== -1) {
                    hasRelation = true;
                }
            }
            else if (typeof questionBase.hide === 'object') {
                const hideObj = questionBase.hide;
                if (hideObj.field === id) {
                    hasRelation = true;
                }
            }
            if (questionBase.alert && typeof questionBase.alert === 'object') {
                hasRelation = true;
            }
            if (typeof questionBase.disable === 'string') {
                const disable = questionBase.disable;
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
};
ControlRelationsFactory = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ControlRelationsFactory);
export { ControlRelationsFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUM3RixPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNdkUsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFFbEMsZ0JBQWdCLENBQUM7SUFFakIsY0FBYyxDQUFDLFFBQW1CO1FBRWhDLE1BQU0sYUFBYSxHQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTVELEtBQUssTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFO1lBQy9CLElBQUksYUFBYSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDckMsTUFBTSxRQUFRLEdBQWEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUVELHVCQUF1QixDQUFDLElBQWU7UUFFckMsTUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUUxQyxpREFBaUQ7UUFDakQsSUFB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RWpHLHVEQUF1RDtRQUN2RCxFQUFFO1FBQ0YsNEJBQTRCO1FBQzVCLEVBQUU7UUFDRixtQ0FBbUM7UUFDbkMsRUFBRTtRQUNGLHlFQUF5RTtRQUN6RSxFQUFFO1FBQ0YsOEdBQThHO1FBQzlHLEVBQUU7UUFDRiw0RUFBNEU7UUFDNUUsNEJBQTRCO1FBQzVCLFFBQVE7UUFDUixRQUFRO1FBRVIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJO0lBQ04sQ0FBQztDQUNGLENBQUE7QUFuVFksdUJBQXVCO0lBRG5DLFVBQVUsRUFBRTs7R0FDQSx1QkFBdUIsQ0FtVG5DO1NBblRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAgJy4uLy4uL2NoYW5nZS10cmFja2luZy9jb250cm9sLXJlbGF0aW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBidWlsZFJlbGF0aW9ucyhyb290Tm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBjb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgbm9kZUJhc2U6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIHRoaXMuc2V0UmVsYXRpb25zKGNvbnRyb2xzU3RvcmUsIG5vZGVCYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEFycmF5Tm9kZVJlbGF0aW9ucyhub2RlOiBHcm91cE5vZGUpIHtcblxuICAgIGNvbnN0IGZvcm06IEZvcm0gPSBub2RlLmZvcm07XG5cbiAgICBpZiAoIWZvcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIGluIHRoZSBzYW1lIGFycmF5XG4gICAgdGhpcy5idWlsZFJlbGF0aW9ucyhub2RlKTtcblxuICAgIC8vIGJ1aWxkIHJlbGF0aW9ucyBmb3IgY29udHJvbCBvdXRzaWRlIHRoZSBhcnJheVxuICAgIGNvbnN0IHJvb3RDb250cm9sc1N0b3JlOiBhbnkgPSB0aGlzLm1hcENvbnRyb2xJZHMocm9vdE5vZGUsIHt9KTtcbiAgICBjb25zdCBhcnJheUNvbnRyb2xTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG5cbiAgICAgIGlmIChyb290Q29udHJvbHNTdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gcm9vdENvbnRyb2xzU3RvcmVba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aW9ucyhhcnJheUNvbnRyb2xTdG9yZSwgY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSByZWxhdGlvbnMgZm9yIGNvbnRyb2xzIG91dHNpZGUgdGhlIGdyb3VwIHRvIGNvbnRyb2xzIGluIHRoaXMgZ3JvdXBcbiAgICB0aGlzLmNyZWF0ZVJlbGF0aW9uc1RvQXJyYXlDb250cm9scyhub2RlKTtcblxuICAgIC8vIGZpcmUgcmVsYXRpb25zXG4gICAgZm9yIChjb25zdCBpZCBpbiBhcnJheUNvbnRyb2xTdG9yZSkge1xuICAgICAgaWYgKGFycmF5Q29udHJvbFN0b3JlLmhhc093blByb3BlcnR5KGlkKSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGFycmF5Q29udHJvbFN0b3JlW2lkXTtcbiAgICAgICAgY29uc3QgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgICAgICBjb250cm9sLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICAgIGNvbnRyb2wudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVSZWxhdGlvbnNUb0FycmF5Q29udHJvbHMobm9kZTogR3JvdXBOb2RlKSB7XG5cbiAgICBjb25zdCBmb3JtOiBGb3JtID0gbm9kZS5mb3JtO1xuXG4gICAgY29uc3Qgcm9vdE5vZGU6IEdyb3VwTm9kZSA9IGZvcm0ucm9vdE5vZGU7XG5cbiAgICAvLyBidWlsZCByZWxhdGlvbnMgZm9yIGNvbnRyb2wgb3V0c2lkZSB0aGUgYXJyYXlcbiAgICBjb25zdCByb290Q29udHJvbHNTdG9yZTogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKHJvb3ROb2RlLCB7fSk7XG4gICAgY29uc3QgYXJyYXlDb250cm9sU3RvcmU6IGFueSA9IHRoaXMubWFwQ29udHJvbElkcyhub2RlLCB7fSk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZm9ybSBjb250cm9sc1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3RDb250cm9sc1N0b3JlKSB7XG4gICAgICBpZiAocm9vdENvbnRyb2xzU3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IHJDaGlsZDogTm9kZUJhc2UgPSByb290Q29udHJvbHNTdG9yZVtrZXldO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVQYXRoID0gbm9kZS5wYXRoLnN1YnN0cmluZygwLCBub2RlLnBhdGgubGFzdEluZGV4T2YoJy4nKSk7XG5cbiAgICAgICAgaWYgKHJDaGlsZC5wYXRoLmluZGV4T2YocGFyZW50Tm9kZVBhdGggKyAnLicpID09PSAtMSkge1xuXG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNvbnRyb2xzIGluIHRoZSBhcnJheSBncm91cFxuICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gYXJyYXlDb250cm9sU3RvcmUpIHtcbiAgICAgICAgICAgIGlmIChhcnJheUNvbnRyb2xTdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblxuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGQ6IE5vZGVCYXNlID0gYXJyYXlDb250cm9sU3RvcmVbaWRdO1xuICAgICAgICAgICAgICBjb25zdCBhQ2hpbGRJZCA9IGFDaGlsZC5xdWVzdGlvbi5rZXk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGFDaGlsZElkLCByQ2hpbGQucXVlc3Rpb24pKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVBhdGgocm9vdE5vZGUsIHBhcmVudE5vZGVQYXRoLCBbXSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFuID0gbm9kZXNbMF0gYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdENvbnRyb2wgPSAockNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAocm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5pbmRleE9mKGFuKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdENvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5wdXNoKGFuKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgKGFDaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KS5hZGRWYWx1ZUNoYW5nZUxpc3RlbmVyKCh2YWx1ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVDYWxjdWxhdGVkVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvb3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgocm9vdENvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvb3RDb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIChyb290Q29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVsYXRpb25zRm9yQ29udHJvbChpZCwgbm9kZTogR3JvdXBOb2RlKTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+IHtcblxuICAgIGNvbnN0IHJlbGF0aW9uczogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gbmV3IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PigpO1xuXG4gICAgY29uc3Qgbm9kZUJhc2VBcnJheTogQXJyYXk8Tm9kZUJhc2U+ID0gbm9kZS5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQoaWQpO1xuXG4gICAgaWYgKG5vZGVCYXNlQXJyYXkubGVuZ3RoID4gMCkge1xuXG4gICAgICBjb25zdCBub2RlQmFzZTogTm9kZUJhc2UgPSBub2RlQmFzZUFycmF5WzBdO1xuXG4gICAgICBjb25zdCBjb250cm9sTGlzdDogYW55ID0gdGhpcy5tYXBDb250cm9sSWRzKG5vZGUsIHt9KTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udHJvbExpc3QpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xMaXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKGNvbnRyb2xMaXN0W2tleV0ucXVlc3Rpb24ua2V5LCBub2RlQmFzZS5xdWVzdGlvbikpIHtcbiAgICAgICAgICAgIHJlbGF0aW9ucy5wdXNoKGNvbnRyb2xMaXN0W2tleV0uY29udHJvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZWxhdGlvbnM7XG4gIH1cblxuICBtYXBDb250cm9sSWRzKG5vZGU6IEdyb3VwTm9kZSwgY29udHJvbHNTdG9yZTogYW55KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgdGhpcy5tYXBDb250cm9sSWRzKGNoaWxkLCBjb250cm9sc1N0b3JlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIEFycmF5Tm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzU3RvcmVbcXVlc3Rpb25CYXNlLmtleV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udHJvbHNTdG9yZTtcbiAgfVxuXG4gIHNldFJlbGF0aW9ucyhjb250cm9sc1N0b3JlOiBhbnksIG5vZGVCYXNlOiBOb2RlQmFzZSkge1xuXG4gICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSBub2RlQmFzZS5xdWVzdGlvbjtcblxuICAgIGNvbnN0IGlkID0gcXVlc3Rpb25CYXNlLmtleTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzU3RvcmUpIHtcbiAgICAgIGlmIChjb250cm9sc1N0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5ICE9PSBpZCkge1xuXG4gICAgICAgIGNvbnN0IG5vZGU6IE5vZGVCYXNlID0gY29udHJvbHNTdG9yZVtrZXldO1xuICAgICAgICBjb25zdCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlID0gbm9kZS5xdWVzdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5oYXNSZWxhdGlvbihpZCwgcXVlc3Rpb24sIG5vZGVCYXNlKSkge1xuICAgICAgICAgIHRoaXMuYWRkUmVsYXRpb25Ub0NvbnRyb2wobm9kZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBjb25kaXRpb25hbCByZXF1aXJlZCBhbmQgY29uZGl0aW9uYWwgYW5zd2VyZWQgcmVsYXRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gcXVlc3Rpb24ucmVxdWlyZWQ7XG5cbiAgICAgICAgICBpZiAocmVxdWlyZWQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsUmVxdWlyZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChyZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkID09PSBpZCkge1xuICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0aW9uVG9Db250cm9sKG5vZGUuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgICAgICAgICBub2RlQmFzZS5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNSZWxhdGlvbihpZDogc3RyaW5nLCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSwgbm9kZUJhc2U/OiBOb2RlQmFzZSkge1xuXG4gICAgbGV0IGhhc1JlbGF0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAocXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMgJiYgcXVlc3Rpb25CYXNlLnZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICBxdWVzdGlvbkJhc2UudmFsaWRhdG9ycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKSB7XG5cbiAgICAgICAgICBjb25zdCBtb2RlbDogSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsID0gZWxlbWVudCBhcyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw7XG5cbiAgICAgICAgICBjb25zdCBmYWlsc1doZW5FeHByZXNzaW9uOiBzdHJpbmcgPSBtb2RlbC5mYWlsc1doZW5FeHByZXNzaW9uO1xuICAgICAgICAgIGlmIChmYWlsc1doZW5FeHByZXNzaW9uICYmIGZhaWxzV2hlbkV4cHJlc3Npb24uaW5kZXhPZihpZCkgIT09IC0xKSB7XG4gICAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCAmJiBlbGVtZW50LnR5cGUgPT09ICdjb25kaXRpb25hbEFuc3dlcmVkJ1xuICAgICAgICAgICYmIGVsZW1lbnQucmVmZXJlbmNlUXVlc3Rpb25JZCA9PT0gaWQpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBoaWRlcnMgYW5kIGRpc2FibGVycyByZWxhdGlvbnNcbiAgICBpZiAoIWhhc1JlbGF0aW9uKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgcXVlc3Rpb25CYXNlLmhpZGUgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29uc3QgaGlkZTogc3RyaW5nID0gcXVlc3Rpb25CYXNlLmhpZGUgYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmIChoaWRlLmxlbmd0aCA+IDAgJiYgaGlkZS5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgICAgICBoYXNSZWxhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXN0aW9uQmFzZS5oaWRlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIGNvbnN0IGhpZGVPYmo6IGFueSA9IHF1ZXN0aW9uQmFzZS5oaWRlO1xuXG4gICAgICAgIGlmIChoaWRlT2JqLmZpZWxkID09PSBpZCkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgIGlmICggcXVlc3Rpb25CYXNlLmFsZXJ0ICYmIHR5cGVvZiBxdWVzdGlvbkJhc2UuYWxlcnQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBxdWVzdGlvbkJhc2UuZGlzYWJsZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb25zdCBkaXNhYmxlOiBzdHJpbmcgPSBxdWVzdGlvbkJhc2UuZGlzYWJsZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGRpc2FibGUubGVuZ3RoID4gMCAmJiBkaXNhYmxlLmluZGV4T2YoaWQpICE9PSAtMSkge1xuICAgICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBjYWxjdWxhdGUgZXhwcmVzc2lvbnMgcmVsYXRpb25zXG4gICAgaWYgKCFoYXNSZWxhdGlvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5sZW5ndGggPiAwXG4gICAgICAmJiBxdWVzdGlvbkJhc2UuY2FsY3VsYXRlRXhwcmVzc2lvbi5pbmRleE9mKGlkKSAhPT0gLTEpIHtcbiAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzUmVsYXRpb247XG4gIH1cblxuICBhZGRSZWxhdGlvblRvQ29udHJvbChjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRlZDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkpIHtcblxuICAgIC8vICBsZXQgcmVsYXRpb25zID0gY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucztcbiAgICAvL1xuICAgIC8vICBsZXQgaGFzUmVsYXRpb24gPSBmYWxzZTtcbiAgICAvL1xuICAgIC8vICAgcmVsYXRpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IGNvbnRyb2xSZWxhdGlvbjogQ29udHJvbFJlbGF0aW9uID0gZWxlbWVudCBhcyBDb250cm9sUmVsYXRpb247XG4gICAgLy9cbiAgICAvLyAgICAgbGV0IHJlbGF0aW9uOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNvbnRyb2xSZWxhdGlvbi5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuICAgIC8vXG4gICAgLy8gICAgIGlmICggY29udHJvbC51dWlkICE9PSB1bmRlZmluZWQgJiYgY29udHJvbC51dWlkID09PSByZWxhdGlvbi51dWlkICkge1xuICAgIC8vICAgICAgIGhhc1JlbGF0aW9uID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSk7XG5cbiAgICAvLyBpZiAoICFoYXNSZWxhdGlvbiApIHtcbiAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWQpO1xuICAgIC8vIH1cbiAgfVxufVxuIl19