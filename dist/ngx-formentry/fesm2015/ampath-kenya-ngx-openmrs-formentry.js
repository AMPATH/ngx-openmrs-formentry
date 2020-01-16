import { __decorate, __metadata, __param } from 'tslib';
import { Injectable, Inject, Input, Component, EventEmitter, Output, HostListener, Directive, ViewChild, ViewEncapsulation, forwardRef, NgModule, WrappedValue, ChangeDetectorRef, Pipe, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { MatNativeDateModule, MatInputModule, MatIconModule, MatTabsModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { DOCUMENT, CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormArray, Validators, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Subject, BehaviorSubject, of } from 'rxjs';
import * as moment_ from 'moment';
import { first, forEach, last, findIndex, filter, isArray, each, isUndefined, chunk, isEmpty, includes, sortBy, isNil, extend, has, find, intersection, isEqual, map, clone, uniqBy, isNumber } from 'lodash';
import 'hammerjs';
import { NgxFileUploaderModule } from 'ngx-file-uploader';
import { DomSanitizer } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { TimeAgoPipe } from 'time-ago-pipe';

/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
let DebugModeService = class DebugModeService {
    constructor() {
        this.cookieKey = 'formDebug';
    }
    debugEnabled() {
        // check if the hidefield
        return false;
    }
};
DebugModeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DebugModeService);

let FormErrorsService = class FormErrorsService {
    constructor() {
        this.announceErrorFieldSource = new Subject();
        this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
    }
    announceErrorField(error) {
        this.announceErrorFieldSource.next(error);
    }
};
// Observable string sources
FormErrorsService.control = null;
FormErrorsService.tab = null;
FormErrorsService = __decorate([
    Injectable()
], FormErrorsService);

// import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
// import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
class ControlRelation {
    constructor(control, relatedTo) {
        this._control = control;
        this._relatedTo = relatedTo;
        this._registerForChangesFromRelatedControl();
    }
    get control() {
        return this._control;
    }
    get relatedTo() {
        return this._relatedTo;
    }
    get lastUpdateValue() {
        return this._lastUpdateValue;
    }
    updateControlBasedOnRelation(newValue) {
        if (newValue !== this._lastUpdateValue) {
            this._lastUpdateValue = newValue;
            if (this._control.updateCalculatedValue) {
                this._control.updateCalculatedValue();
            }
            this._control.updateValueAndValidity();
            if (this._control.updateHiddenState) {
                this._control.updateHiddenState();
            }
            if (this._control.updateDisabledState) {
                this._control.updateDisabledState();
            }
            if (this._control.updateAlert) {
                this._control.updateAlert();
            }
            return true;
        }
        return false;
    }
    _registerForChangesFromRelatedControl() {
        this._relatedTo.valueChanges.subscribe((value) => {
            this.updateControlBasedOnRelation(value);
        });
    }
}

class ControlRelations {
    constructor(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    get relationsFor() {
        return this._relationFor;
    }
    get relations() {
        return this._relations;
    }
    get otherRelations() {
        return this._otherRelations;
    }
    addRelatedControls(relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (let i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    }
}

class HiderHelper {
    hideControl(control) {
        control.hidden = true;
        if (control.disable) {
            control.disable();
        }
    }
    showControl(control) {
        control.hidden = false;
    }
    setHiderForControl(control, hider) {
        control.hiders.push(hider);
    }
    clearHidersForControl(control) {
        control.hiders.splice(0);
        control.hidden = false;
    }
    evaluateControlHiders(control) {
        let hiddenValue = false;
        control.hiders.forEach(hider => {
            hider.reEvaluateHidingExpression();
            if (hider.toHide === true) {
                hiddenValue = true;
            }
        });
        control.hidden = hiddenValue;
        if (control.hidden && control.disable) {
            control.disable();
            // control.setValue(null);
        }
    }
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateHiddenState) {
            control.valueChanges.subscribe((val) => {
                control.updateHiddenState();
            });
        }
    }
}

class AlertHelper {
    hideAlert(control) {
        control.shown = false;
    }
    showAlert(control) {
        control.shown = true;
    }
    setAlertsForControl(control, alert) {
        control.alerts.push(alert);
    }
    clearAlertsForControl(control) {
        control.alerts.splice(0);
        control.alert = '';
    }
    evaluateControlAlerts(control) {
        let messageValue = '';
        control.alerts.forEach(message => {
            message.reEvaluateAlertExpression();
            if (message.shown === true) {
                messageValue = message.alertMessage;
            }
            else {
                messageValue = '';
            }
        });
        control.alert = messageValue;
        // if (control.message && control.disable) {
        //     control.disable();
        //     // control.setValue(null);
        // }
    }
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe((val) => {
                control.updateAlert();
            });
        }
    }
}

class DisablerHelper {
    setDisablerForControl(control, disabler) {
        control.disablers.push(disabler);
    }
    clearDisablersForControl(control) {
        control.disablers.splice(0);
        control.disable();
    }
    evaluateControlDisablers(control) {
        let toDisable = false;
        control.disablers.forEach(hider => {
            hider.reEvaluateDisablingExpression();
            if (hider.toDisable === true) {
                toDisable = true;
            }
        });
        // console.log('Control', control);
        if (toDisable) {
            control.disable();
        }
        else {
            control.enable();
        }
    }
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe((val) => {
                control.updateDisabledState();
            });
        }
    }
}

class NodeBase {
    constructor(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    get question() {
        return this._questionModel;
    }
    get control() {
        return this._control;
    }
    get form() {
        return this._form;
    }
    get path() {
        return this._path;
    }
    removeAt(index) { }
    createChildNode() { }
    removeChildNode() { }
}
class LeafNode extends NodeBase {
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
    }
}
class GroupNode extends NodeBase {
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
        this._children = {};
    }
    get children() {
        return this._children;
    }
    setChild(key, node) {
        this.children[key] = node;
    }
}
class ArrayNode extends NodeBase {
    constructor(question, control, parentControl, formFactory, form, parentPath) {
        super(question, control, form, parentPath);
        this.formFactory = formFactory;
        this.childNodeCreatedEvents = [];
        this._children = [];
        this.childNodeCreatedEvents = [];
    }
    get children() {
        return this._children;
    }
    createChildNode() {
        if (this.createChildFunc) {
            const g = this.createChildFunc(this.question, this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    }
    removeAt(index) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    }
    addChildNodeCreatedListener(func) {
        this.childNodeCreatedEvents.push(func);
    }
    fireChildNodeCreatedListener(node) {
        for (let i = 0; i < this.childNodeCreatedEvents.length; i++) {
            const func = this.childNodeCreatedEvents[i];
            func(node);
        }
    }
}

class ValidationModel {
    constructor(validations) {
        this.type = validations.type;
        this.message = validations.message || null;
    }
}

class JsExpressionValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        this.failsWhenExpression = validations.failsWhenExpression;
    }
}

class ConditionalValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        this.referenceQuestionId = validations.referenceQuestionId;
        this.referenceQuestionAnswers = validations.referenceQuestionAnswers;
    }
}

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
ControlRelationsFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ControlRelationsFactory);

const moment = moment_;
class ExpressionRunner {
    getRunnable(expression, control, helper, dataDependencies, form) {
        const runner = this;
        const runnable = {
            run: () => {
                /* tslint:disable */
                let scope = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                if (form) {
                    // console.error('Form defined', form);
                    runner.getDataDependencies(form.dataSourcesContainer.dataSources, scope);
                }
                let paramList = '';
                let argList = '';
                for (let o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                let funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression, scope);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    }
    getControlRelationValueString(control, scope) {
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {
                if (relation.relatedTo) {
                    const related = relation.relatedTo;
                    const relatedAsControl = relation.relatedTo;
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(node => {
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    const uuid = control.uuid;
                    const controlRelationsFactory = new ControlRelationsFactory();
                    let relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach(child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    });
                    this.setControlArrayValues(control, relationsForControl, scope);
                }
            });
        }
    }
    setControlArrayValues(control, relationsForControl, scope) {
        const keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(key => {
            const values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }
    _getFormControlKeys(array) {
        const keys = [];
        array.forEach(control => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    }
    _getValuesForKey(key, array) {
        const values = [];
        array.forEach(control => {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    }
    getHelperMethods(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
    getDataDependencies(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
}

class AfeFormControl extends FormControl {
    constructor(formState, validator, asyncValidator) {
        super(formState, validator, asyncValidator);
        this.hidden = false;
        this.hiderHelper = new HiderHelper();
        this.disablerHelper = new DisablerHelper();
        this.AlertHelper = new AlertHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];
        this.valueChanges.subscribe((value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        });
    }
    get controlRelations() {
        return this._controlRelations;
    }
    disable(param) {
        super.disable(param);
        super.setValue('');
    }
    hide() {
        this.hiderHelper.hideControl(this);
    }
    show() {
        this.hiderHelper.showControl(this);
    }
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    setCalculatorFn(newCalculator) {
        this.calculator = newCalculator;
    }
    updateCalculatedValue() {
        if (this.calculator) {
            const _val = this.calculator.call(ExpressionRunner, {});
            this.setValue(_val);
        }
    }
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    addValueChangeListener(func) {
        this._valueChangeListener = func;
    }
    fireValueChangeListener(value) {
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    }
    setValue(value) {
        super.setValue(value);
    }
}

class AfeFormGroup extends FormGroup {
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
        this.hiderHelper = new HiderHelper();
        this.disablerHelper = new DisablerHelper();
        this.AlertHelper = new AlertHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.disablers = [];
        this.alerts = [];
    }
    get controlRelations() {
        return this._controlRelations;
    }
    hide() {
        this.hiderHelper.hideControl(this);
    }
    show() {
        this.hiderHelper.showControl(this);
    }
    disable(param) {
        super.disable(param);
        super.setValue({});
    }
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    setValue(value) {
        super.setValue(value);
    }
}

class AfeFormArray extends FormArray {
    constructor(controls, validator, asyncValidator) {
        super(controls, validator, asyncValidator);
        this.hiderHelper = new HiderHelper();
        this.AlertHelper = new AlertHelper();
        this.disablerHelper = new DisablerHelper();
        this._controlRelations = new ControlRelations(this);
        this.hiders = [];
        this.alerts = [];
        this.disablers = [];
        this.valueChanges.subscribe((value) => {
            if (this._previousValue !== value) {
                this.fireValueChangeListener(value);
                this._previousValue = value;
            }
        });
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(val) {
        this._uuid = val;
    }
    get controlRelations() {
        return this._controlRelations;
    }
    hide() {
        this.hiderHelper.hideControl(this);
    }
    show() {
        this.hiderHelper.showControl(this);
    }
    disable(param) {
        super.disable(param);
        super.setValue([]);
    }
    setHidingFn(newHider) {
        this.hiderHelper.setHiderForControl(this, newHider);
    }
    clearHidingFns() {
        this.hiderHelper.clearHidersForControl(this);
    }
    updateHiddenState() {
        this.hiderHelper.evaluateControlHiders(this);
    }
    setDisablingFn(newDisabler) {
        this.disablerHelper.setDisablerForControl(this, newDisabler);
    }
    clearDisablingFns() {
        this.disablerHelper.clearDisablersForControl(this);
    }
    updateDisabledState() {
        this.disablerHelper.evaluateControlDisablers(this);
    }
    setAlertFn(newHider) {
        this.AlertHelper.setAlertsForControl(this, newHider);
    }
    clearMessageFns() {
        this.AlertHelper.clearAlertsForControl(this);
    }
    updateAlert() {
        this.AlertHelper.evaluateControlAlerts(this);
    }
    addValueChangeListener(func) {
        this._valueChangeListener = func;
    }
    fireValueChangeListener(value) {
        if (this.alerts.length > 0) {
            this.updateAlert();
        }
        if (this._valueChangeListener && typeof this._valueChangeListener === 'function') {
            this._valueChangeListener(value);
        }
    }
    setValue(value) {
        super.setValue(value);
    }
}

var AfeControlType;
(function (AfeControlType) {
    AfeControlType[AfeControlType["AfeFormControl"] = 0] = "AfeFormControl";
    AfeControlType[AfeControlType["AfeFormArray"] = 1] = "AfeFormArray";
    AfeControlType[AfeControlType["AfeFormGroup"] = 2] = "AfeFormGroup";
    AfeControlType[AfeControlType["None"] = 3] = "None";
})(AfeControlType || (AfeControlType = {}));

class QuestionBase {
    constructor(options) {
        this.defaultValue = options.defaultValue;
        this.originalValue = options.originalValue;
        this.extras = options.extras;
        this.renderingType = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
        this.hide = options.hide;
        this.disable = options.disable;
        this.alert = options.alert;
        this.historicalDataValue = options.historicalDataValue;
        this.calculateExpression = options.calculateExpression;
    }
    setHistoricalValue(v) {
        this.enableHistoricalValue = v;
    }
    showHistoricalEncounterDate(v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    }
}

class ConditionalRequiredValidator {
    constructor() { }
    validate(model) {
        // convert helper functions to string
        return (control) => {
            const value = control.value;
            let relationValue = null;
            const referenceQuestionId = model.referenceQuestionId;
            const referenceQuestionAnswers = model.referenceQuestionAnswers;
            let isRequired;
            if (control && control.controlRelations && control.controlRelations.relations) {
                control.controlRelations.relations.forEach(relation => {
                    const relatedAsControl = relation.relatedTo;
                    if (relatedAsControl.uuid === referenceQuestionId) {
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            relationValue = relation.relatedTo.value;
                        }
                        else {
                            relationValue = relation.relatedTo.value && relation.relatedTo.value.value ?
                                relation.relatedTo.value.value : relation.relatedTo.value;
                        }
                    }
                });
            }
            if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                isRequired = true;
            }
            if (isRequired && !value) {
                return { 'conditional_required': { message: model.message } };
            }
            return null;
        };
    }
}

class ConditionalAnsweredValidator {
    constructor() { }
    validate(model) {
        return (control) => {
            const value = control.value;
            let relationValue = null;
            const referenceQuestionId = model.referenceQuestionId;
            const referenceQuestionAnswers = model.referenceQuestionAnswers;
            let successCondition = true;
            if (value) {
                if (control && control.controlRelations && control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(relation => {
                        const relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (Array.isArray(relatedAsControl.value)) {
                                relationValue = relatedAsControl.value;
                            }
                            else {
                                relationValue = relatedAsControl.value && typeof relatedAsControl.value === 'object' && relatedAsControl.value.value ?
                                    relatedAsControl.value.value : relatedAsControl.value;
                            }
                        }
                        if (!relationValue) {
                            successCondition = false;
                        }
                        else if (typeof referenceQuestionAnswers === 'object' && referenceQuestionAnswers.indexOf(relationValue) === -1) {
                            successCondition = false;
                        }
                    });
                }
            }
            if (!successCondition) {
                return { 'conditional_answered': { message: model.message } };
            }
            return null;
        };
    }
}

class RequiredValidator {
    validate(control) {
        if (control.hidden) {
            return null;
        }
        const value = control.value;
        const isEmpty = value == null || typeof value === 'string' && value.length === 0;
        return isEmpty ? { 'required': true } : null;
    }
}

class DateValidator {
    constructor() { }
    validate(control) {
        if (control.hidden) {
            return null;
        }
        const value = control.value;
        if (value && value.length !== 0) {
            // YYYY-MM-DD or DD-MM-YYYY
            const test = !/Invalid|NaN/.test(new Date(value).toString());
            return test ? null : { 'date': true };
        }
        else {
            return null;
        }
    }
}

class MinValidator {
    validate(min) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                const v = control.value;
                return v >= min ? null : { 'min': { requiredValue: min, actualValue: v } };
            }
            return null;
        };
    }
}

class MaxValidator {
    validate(max) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                const v = control.value;
                return v <= max ? null : { 'max': { requiredValue: max, actualValue: v } };
            }
            return null;
        };
    }
}

class MinDateValidator {
    validate(min) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    const newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        };
    }
}

class MaxDateValidator {
    validate(max) {
        return (control) => {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    const newDate = new Date(control.value);
                    return newDate.getTime() > max.getTime() ? { 'maxdate': { 'requiredDate': max, actualDate: newDate } } : null;
                }
                else {
                    return { 'maxdate': { 'requiredDate': max } };
                }
            }
            return null;
        };
    }
}

class FutureDateRestrictionValidator {
    constructor() { }
    validate(control) {
        if (control.hidden) {
            return null;
        }
        const value = control.value;
        const now = new Date();
        if (value && value.length !== 0) {
            if (!new DateValidator().validate(value)) {
                const d = new Date(value);
                return d.getTime() > now.getTime() ? { 'futureDateRestriction': true } : null;
            }
        }
        return null;
    }
}

class JsExpressionHelper {
    calcBMI(height, weight) {
        let r;
        if (height && weight) {
            r = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        return height && weight ? parseFloat(r) : null;
    }
    calcBMIForAgeZscore(bmiForAgeRef, height, weight) {
        let bmi;
        const maxAgeInDays = 1856;
        if (height && weight) {
            bmi = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        const refSectionObject = first(bmiForAgeRef);
        let formattedSDValue;
        if (refSectionObject) {
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            const refObjectKeys = Object.keys(refSectionObject);
            const minimumValue = refObjectValues[1];
            const minReferencePoint = [];
            if (bmi < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                forEach(refObjectValues, (value) => {
                    if (value <= bmi) {
                        minReferencePoint.push(value);
                    }
                });
            }
            const lastReferenceValue = last(minReferencePoint);
            const lastValueIndex = findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            const SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return bmi && refSectionObject ? formattedSDValue : null;
    }
    calcWeightForHeightZscore(weightForHeightRef, height, weight) {
        let refSection;
        let formattedSDValue;
        if (height && weight) {
            height = parseFloat(height).toFixed(1);
        }
        const standardHeightMin = 45;
        const standardMaxHeight = 110;
        if (height < standardHeightMin || height > standardMaxHeight) {
            formattedSDValue = -4;
        }
        else {
            refSection = filter(weightForHeightRef, (refObject) => {
                return parseFloat(refObject['Length']).toFixed(1) === height;
            });
        }
        const refSectionObject = first(refSection);
        if (refSectionObject) {
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            const refObjectKeys = Object.keys(refSectionObject);
            const minimumValue = refObjectValues[1];
            const minReferencePoint = [];
            if (weight < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                forEach(refObjectValues, (value) => {
                    if (value <= weight) {
                        minReferencePoint.push(value);
                    }
                });
            }
            const lastReferenceValue = last(minReferencePoint);
            const lastValueIndex = findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            const SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return height && weight ? formattedSDValue : null;
    }
    calcHeightForAgeZscore(heightForAgeRef, height, weight) {
        const refSectionObject = first(heightForAgeRef);
        let formattedSDValue;
        if (refSectionObject) {
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            const refObjectKeys = Object.keys(refSectionObject);
            const minimumValue = refObjectValues[1];
            const minReferencePoint = [];
            if (height < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                forEach(refObjectValues, (value) => {
                    if (value <= height) {
                        minReferencePoint.push(value);
                    }
                });
            }
            const lastReferenceValue = last(minReferencePoint);
            const lastValueIndex = findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            const SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return height && weight && refSectionObject ? formattedSDValue : null;
    }
    isEmpty(val) {
        if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
            return true;
        }
        if (Array.isArray(val) && val.length === 0) {
            return true;
        }
        return false;
    }
    arrayContains(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            let contains = true;
            for (let i = 0; i < members.length; i++) {
                const val = members[i];
                if (array.indexOf(val) === -1) {
                    contains = false;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    extractRepeatingGroupValues(key, array) {
        const values = array.map(function (item) {
            return item[key];
        });
        return values;
    }
    formatDate(value, format, offset) {
        format = format || 'yyyy-MM-dd';
        offset = offset || '+0300';
        if (!(value instanceof Date)) {
            value = new Date(value);
            if (value === null || value === undefined) {
                throw new Error('DateFormatException: value passed ' +
                    'is not a valid date');
            }
        }
        return value; // TODO implement this
        // return $filter('date')(value, format, offset);
    }
    arrayContainsAny(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            let contains = false;
            for (let i = 0; i < members.length; i++) {
                const val = members[i];
                if (array.indexOf(val) !== -1) {
                    contains = true;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    get helperFunctions() {
        const helper = this;
        return {
            arrayContainsAny: helper.arrayContainsAny,
            calcBMI: helper.calcBMI,
            calcBMIForAgeZscore: helper.calcBMIForAgeZscore,
            calcWeightForHeightZscore: helper.calcWeightForHeightZscore,
            calcHeightForAgeZscore: helper.calcHeightForAgeZscore,
            isEmpty: helper.isEmpty,
            arrayContains: helper.arrayContains,
            extractRepeatingGroupValues: helper.extractRepeatingGroupValues
        };
    }
}

class Validations {
    constructor() { }
}
Validations.JSExpressionValidatorsEnabled = false;

class JsExpressionValidator {
    constructor() { }
    validate(model, form) {
        // convert helper functions to string
        return (control) => {
            if (!Validations.JSExpressionValidatorsEnabled) {
                return null;
            }
            const expression = model.failsWhenExpression;
            const helper = new JsExpressionHelper();
            const dataDependencies = {};
            const helperFunctions = helper.helperFunctions;
            const runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies, form);
            if (runnable.run()) {
                return { 'js_expression': { 'expression': expression, message: model.message } };
            }
            return null;
        };
    }
}

class Messages {
}
Messages.REQUIRED_FIELD_MSG = 'This field is required!';
Messages.INVALID_DATE_MSG = 'Provided date is invalid!';
Messages.FUTURE_DATE_RESTRICTION_MSG = 'Future date is not allowed!';
Messages.MIN_LENGTH_MSG = 'Min Length should be {minLength}';
Messages.MAX_LENGTH_MSG = 'Max Length should be {maxLength}';
Messages.MAX_DATE_MSG = 'Max Date should be {maxDate}';
Messages.MIN_DATE_MSG = 'Min Date should be {minDate}';
Messages.MAX_MSG = 'Max value should be {max}';
Messages.MIN_MSG = 'Min value should be {min}';

let ValidationFactory = class ValidationFactory {
    constructor() { }
    getValidators(question, form) {
        const list = [];
        if (question.validators) {
            forEach(question.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        list.push(this.dateValidator);
                        const allowFutureDates = validator.allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(this.jsExpressionValidator.validate(validator, form));
                        break;
                    case 'max':
                        list.push(this.getMaxValueValidator(validator.max));
                        break;
                    case 'min':
                        list.push(this.getMinValueValidator(validator.min));
                        break;
                    case 'conditionalRequired':
                        list.push(this.conditionalRequiredValidator.validate(validator));
                        break;
                    case 'conditionalAnswered':
                        list.push(this.conditionalAnsweredValidator.validate(validator));
                        break;
                }
            });
        }
        if (question.required && typeof (question.required) === 'string' && question.required === 'true') {
            list.push(this.requiredValidator);
        }
        else {
            // TODO - handle custom required validator
        }
        return list;
    }
    get conditionalRequiredValidator() {
        return new ConditionalRequiredValidator();
    }
    get conditionalAnsweredValidator() {
        return new ConditionalAnsweredValidator();
    }
    get requiredValidator() {
        return new RequiredValidator().validate;
    }
    get dateValidator() {
        return new DateValidator().validate;
    }
    get futureDateRestrictionValidator() {
        return new FutureDateRestrictionValidator().validate;
    }
    get maxDateValidator() {
        return new MaxDateValidator().validate;
    }
    get minDateValidator() {
        return new MinDateValidator().validate;
    }
    get minLengthValidator() {
        return Validators.minLength;
    }
    get maxLengthValidator() {
        return Validators.maxLength;
    }
    getMinValueValidator(min) {
        return new MinValidator().validate(min);
    }
    getMaxValueValidator(max) {
        return new MaxValidator().validate(max);
    }
    get jsExpressionValidator() {
        return new JsExpressionValidator();
    }
    errors(errors, question) {
        const messages = [];
        for (const property in errors) {
            if (errors.hasOwnProperty(property)) {
                switch (property) {
                    case 'required':
                        messages.push(Messages.REQUIRED_FIELD_MSG);
                        break;
                    case 'date':
                        messages.push(Messages.INVALID_DATE_MSG);
                        break;
                    case 'futureDateRestriction':
                        messages.push(Messages.FUTURE_DATE_RESTRICTION_MSG);
                        break;
                    case 'minlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{minLength}', errors.minlength.requiredLength));
                        break;
                    case 'maxlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{maxLength}', errors.maxlength.requiredLength));
                        break;
                    case 'maxdate':
                        messages.push(Messages.MAX_DATE_MSG.replace('{maxDate}', errors.maxdate.requiredDate));
                        break;
                    case 'mindate':
                        messages.push(Messages.MIN_DATE_MSG.replace('{minDate}', errors.mindate.requiredDate));
                        break;
                    case 'max':
                        messages.push(Messages.MAX_MSG.replace('{max}', errors.max.requiredValue));
                        break;
                    case 'min':
                        messages.push(Messages.MIN_MSG.replace('{min}', errors.min.requiredValue));
                        break;
                    case 'js_expression':
                        messages.push(errors['js_expression'].message);
                        break;
                    case 'conditional_required':
                        messages.push(errors['conditional_required'].message);
                        break;
                    case 'conditional_answered':
                        messages.push(errors['conditional_answered'].message);
                        break;
                }
            }
        }
        return messages;
    }
};
ValidationFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ValidationFactory);

let HidersDisablersFactory = class HidersDisablersFactory {
    constructor(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    getJsExpressionDisabler(question, control, form) {
        const runnable = this.expressionRunner.getRunnable(question.disable, control, this.expressionHelper.helperFunctions, {}, form);
        const disabler = {
            toDisable: false,
            disableWhenExpression: question.disable,
            reEvaluateDisablingExpression: () => {
                const result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    }
    getJsExpressionHider(question, control, form) {
        const hide = question.hide;
        const value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : question.hide;
        // check if debugging has been enabled
        const debugEnabled = this._debugModeService.debugEnabled();
        const runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        const hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: () => {
                /* if debug is enabled then hiders to be false
                else run the normal eveluator i.e runnable.run()
                */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            }
        };
        return hider;
    }
    convertHideObjectToString(hide) {
        if (hide.value instanceof Array) {
            const arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            const exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    }
};
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];
HidersDisablersFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExpressionRunner,
        JsExpressionHelper,
        DebugModeService])
], HidersDisablersFactory);

let AlertsFactory = class AlertsFactory {
    constructor(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    getJsExpressionshowAlert(question, control, form) {
        const runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        const showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: () => {
                const result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    }
};
AlertsFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper }
];
AlertsFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExpressionRunner, JsExpressionHelper])
], AlertsFactory);

let FormControlService = class FormControlService {
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    generateControlModel(questionModel, parentControl, generateChildren, form) {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    }
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        const asGroup = question;
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach(element => {
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }
    generateFormArray(question, parentControl, form) {
        const validators = this.validationFactory.getValidators(question, form);
        let formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
            formArray = new AfeFormArray([]);
        }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }
        return formArray;
    }
    generateFormControl(question, parentControl, form) {
        const value = question.defaultValue || '';
        const validators = this.validationFactory.getValidators(question, form);
        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            const disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            const helper = new JsExpressionHelper();
            const runner = new ExpressionRunner();
            const runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
};
FormControlService.ctorParameters = () => [
    { type: ValidationFactory },
    { type: HidersDisablersFactory },
    { type: AlertsFactory }
];
FormControlService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ValidationFactory,
        HidersDisablersFactory, AlertsFactory])
], FormControlService);

const DEFAULT_STYLES = `a {
      color: white;
      text-decoration: none;
      font-size: 12px;
      text-transform: uppercase;
    }

    ul {
      list-style-type: none;
      margin: 2px auto;
      position: relative;
    }

    li {
      display: block;
      padding: 10px 20px;
      white-space: nowrap;
      transition: all 0.3s ease-in;
      border-bottom: 4px solid transparent;
    }

    li:hover {
      border-bottom: 4px solid white;
      opacity: 0.7;
      cursor: pointer;
    }

    .owl-theme .owl-controls .owl-nav {
      position: absolute;
      width: 100%;
      top: 0;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"] {
      position: absolute;
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"]:hover {
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav .owl-next {
      right: 0;
      transform: translate(120%);
    }

    .owl-theme .owl-controls .owl-nav .owl-prev {
      left: 0;
      transform: translate(-120%);
    }

    .slick-initialized .swipe-tab-content {
      position: relative;
      min-height: 365px;
    }
    @media screen and (min-width: 767px) {
      .slick-initialized .swipe-tab-content {
        min-height: 500px;
      }
    }
    .slick-initialized .swipe-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: none;
      border: 0;
      color: #757575;
      cursor: pointer;
      text-align: center;
      border-bottom: 2px solid rgba(51, 122, 183, 0);
      transition: all 0.5s;
    }
    .slick-initialized .swipe-tab:hover {
      color: #337AB7;
    }
    .slick-initialized .swipe-tab.active-tab {
      border-bottom-color: #337AB7;
      color: #337AB7;
      font-weight: bold;
    }

    .disabled {
      opacity: .5;
      pointer-events: none;
    }

    .select2-container {
      margin-top: -5px;
    }

    .btn {
      padding: 0px 12px !important;
    }

    .form-tooltip{
      color:rgb(51, 122, 183);
      display: inline-block;
    }
    .question-info{
          opacity:0;
          height:0px;
          display: none;
          transition-duration: opacity 1s ease-out;
          transtion-delay: 0.5s;
          padding-top: 2px;
          padding-bottom: 2px;
          color: #696969;
          border-style: ridge;
          border-width: 1px;
          border-color: #337ab7;
          margin-top: 2px;
    }
    .hide-info{
      display:none;
      height:0px;
    }
    .form-tooltip:hover ~ .question-info {
          display:block;
          opacity:1;
          height:auto;
     }
    .form-tooltip .tooltipcontent::after {
          content: " ";
          position: absolute;
          bottom: 100%;  /* At the top of the tooltip */
          right: 0%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: #337ab7;
          border-left-color: transparent;
 }

    ng-select.form-control {
      padding-top: 0;
      height: auto;
      padding-bottom: 0;
    }

 .forms-dropdown-menu {
     max-height: 450px;
     overflow-y: scroll;
 }
 .no-border {
  border: 0;
  box-shadow: none;
}

    `;

let DataSources = class DataSources {
    constructor() {
        this._dataSources = {};
    }
    get dataSources() {
        return this._dataSources;
    }
    registerDataSource(key, dataSource, unWrap = false) {
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (const o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    }
    clearDataSource(key) {
        delete this._dataSources[key];
    }
};
DataSources = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DataSources);

// import { concat, of, Observable, Subject, BehaviorSubject } from 'rxjs';
// import * as _ from 'lodash';
// import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
// import { QuestionBase } from '../question-models';
let FormRendererComponent = class FormRendererComponent {
    // items$: Observable<any[]>;
    // itemsLoading = false;
    // itemsInput$ = new Subject<string>();
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            const tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((error) => {
                this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !this.node.question.isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    }
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    setUpRemoteSelect() {
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            // let selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /*
             let defaltValues = of([]);
             if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
               defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value).pipe(
                 catchError(() => of([])), // empty list on error
               );
             }
             this.items$ = concat(
               defaltValues,
               this.itemsInput$.pipe(
                 debounceTime(200),
                 distinctUntilChanged(),
                 tap(() => this.itemsLoading = true),
                 switchMap(term => this.dataSource.searchOptions(term).pipe(
                   catchError(() => of([])), // empty list on error
                   tap(() => {
                     this.itemsLoading = false
                   })
                 ))
               )
             );
             */
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    }
    checkSection(node) {
        if (node.question.renderingType === 'section') {
            let groupChildrenHidden = false;
            const allSectionControlsHidden = Object.keys(node.children).every((k) => {
                const innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden = Object.keys(innerNode.children).every((i) => innerNode.children[i].control.hidden);
                }
                return node.children[k].control.hidden || groupChildrenHidden;
            });
            return !allSectionControlsHidden;
        }
        return true;
    }
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    tabSelected($event) {
        this.activeTab = $event;
        this.setPreviousTab();
    }
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    errors() {
        return this.getErrors(this.node);
    }
    scrollToControl(error) {
        const tab = +error.split(',')[0];
        const elSelector = error.split(',')[1] + 'id';
        // the tab components
        const tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    const element = this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    }
    onDateChanged(node) {
        // console.log('Node', node);
        this.node = node;
    }
    upload(event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    }
    toggleInformation(infoId) {
        const e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    getErrors(node) {
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
};
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: DataSources },
    { type: FormErrorsService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
__decorate([
    Input(),
    __metadata("design:type", FormRendererComponent)
], FormRendererComponent.prototype, "parentComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", NodeBase)
], FormRendererComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", AfeFormGroup)
], FormRendererComponent.prototype, "parentGroup", void 0);
FormRendererComponent = __decorate([
    Component({
        selector: 'form-renderer',
        template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <!-- <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div> -->\n  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\">\n        </form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\"\n      [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\"\n    [node]=\"node.children[question.key]\" [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\">\n  <!-- <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div> -->\n  <mat-expansion-panel style=\"border: 1px solid lightgray; margin-top: 5px; border-radius: 1px;\"\n    [expanded]=\"!isCollapsed\">\n    <mat-expansion-panel-header style=\"font-size: 18px; font-weight: bolder; background-color: aliceblue; height: 40px;\">\n      {{node.question.label}}\n    </mat-expansion-panel-header>\n    <ng-template matExpansionPanelContent>\n      <div style=\"padding-top: 15px; padding-left: 5px;\">\n        <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\"\n          [node]=\"node.children[question.key]\" [parentGroup]=\"parentGroup\"></form-renderer>\n      </div>\n    </ng-template>\n  </mat-expansion-panel>\n\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\"\n      [attr.for]=\"node.question.key\">\n      {{node.question.required ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <app-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" (fileChanged)=\"upload($event)\">\n      </app-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n      <!--\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"items$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"{{node.question.placeholder}}\"\n        [hideSelected]=\"true\" [loading]=\"itemsLoading\"  [typeahead]=\"itemsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n    -->\n      <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></remote-select>\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" [style.height]=\"'auto'\" [style.overflow-x]=\"'hidden'\" tabindex=\"0\"\n        [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\"\n        [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" [style.height]='auto' tabindex=\"0\"\n        [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\"\n        [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \"\n        [attr.placeholder]=\"node.question.placeholder \" [type]=\"'number'\" [id]=\"node.question.key + 'id' \"\n        [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \"\n        [attr.placeholder]=\"node.question.placeholder \" [type]=\"node.question.renderingType\"\n        [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\"\n          [options]=\"node.question.options\" [selected]=\"node.control.value\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\" style=\"margin-top: 2px;\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}} </strong>\n                <span class=\"text-primary\"\n                  *ngIf=\"node.question.historicalDisplay && node.question.historicalDisplay._date \">\n                  ({{node.question.historicalDisplay._date | timeAgo}})</span>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \" [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \" [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
        styles: ['../../style/app.css', DEFAULT_STYLES]
    }),
    __param(3, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [ValidationFactory,
        DataSources,
        FormErrorsService, Object])
], FormRendererComponent);

class Form {
    constructor(schema, formFactory, questionFactory) {
        this.schema = schema;
        this.formFactory = formFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    get dataSourcesContainer() {
        return this._dataSourcesContainer;
    }
    searchNodeByPath(node, path, found) {
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                const child = children[key];
                if (child instanceof GroupNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    this.searchNodeByPath(child, path, found);
                }
                else if (child instanceof LeafNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                }
                else if (child instanceof ArrayNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    const aChild = child;
                    aChild.children.forEach(aChildNode => {
                        this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    }
    searchNodeByQuestionId(questionId, questionType) {
        const found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    }
    searchNodeByQuestionType(rootNode, questionType, found) {
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            const questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    }
    findNodesByQuestionId(rootNode, questionId, results) {
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this.findNodesByQuestionId(node, questionId, results);
            });
        }
    }
    get valid() {
        return this.rootNode.control.valid;
    }
    set showErrors(show) {
        this._showErrors = show;
    }
    get showErrors() {
        return this._showErrors;
    }
    markInvalidControls(node, invalidControlNodes) {
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                const child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    const questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        const c = child.control;
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    const arrayNode = child;
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        forEach(arrayNode.children, (groupNode) => {
                            this.markInvalidControls(groupNode, invalidControlNodes);
                        });
                    }
                }
            }
        }
        return invalidControlNodes;
    }
    updateHiddenDisabledStateForAllControls() {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    }
    updateAlertsForAllControls() {
        this._updateAlertsForAllControls(this.rootNode);
    }
    _updateAlertsForAllControls(rootNode) {
        if (rootNode.control) {
            if (rootNode.control.updateAlert) {
                rootNode.control.updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this._updateAlertsForAllControls(node);
            });
        }
    }
    _updateHiddenDisabledStateForAllControls(rootNode) {
        if (rootNode.control) {
            if (rootNode.control.updateDisabledState) {
                rootNode.control.updateDisabledState();
            }
            if (rootNode.control.updateHiddenState) {
                rootNode.control.updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    }
}

let ErrorRendererComponent = class ErrorRendererComponent {
    constructor(validationFactory, formErrorsService) {
        this.validationFactory = validationFactory;
        this.formErrorsService = formErrorsService;
    }
    ngOnInit() {
    }
    showErrors() {
        return !this.form.valid && this.form.showErrors;
    }
    get errorNodes() {
        const invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
        return invalidControls;
    }
    getControlError(node) {
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
    announceErrorField(errorNode) {
        const nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
        forEach(nodes, (node) => {
            if (node.question.renderingType === 'page') {
                const pageIndex = this.getPageIndex(node);
                this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
            }
        });
    }
    getPageIndex(node) {
        const questionGroup = this.form.rootNode.question;
        return questionGroup.questions.indexOf(node.question);
    }
};
ErrorRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: FormErrorsService }
];
__decorate([
    Input(),
    __metadata("design:type", Form)
], ErrorRendererComponent.prototype, "form", void 0);
ErrorRendererComponent = __decorate([
    Component({
        selector: 'error-renderer',
        template: "<div *ngIf=\"showErrors()\" class=\"container\">\n<ul class=\"list-group\">\n  <li class=\"list-group-item list-group-item-warning\" *ngFor=\"let errorNode of errorNodes\" (click)=announceErrorField(errorNode)>\n    <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n      <h4>{{errorNode.question.label}}</h4>\n      <span class=\"text-danger\"> {{getControlError(errorNode)}}</span>\n    </div>\n  </li>\n</ul>\n</div>\n",
        styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
    }),
    __metadata("design:paramtypes", [ValidationFactory, FormErrorsService])
], ErrorRendererComponent);

class HistoricalFieldHelperService {
    getDisplayTextFromOptions(question, valueProperty, displayProperty) {
        let displayText = '';
        const historicalValue = question.historicalDataValue;
        if (isArray(historicalValue.value)) {
            let valueConverted = 0;
            each(historicalValue.value, (val) => {
                each(question.options, (option) => {
                    if (option[valueProperty] === val) {
                        if (valueConverted === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted++;
                    }
                });
            });
        }
        else {
            each(question.options, (option) => {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            });
        }
        return displayText;
    }
}

let HistoricalValueDirective = class HistoricalValueDirective {
    constructor(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    setValue(e) {
        if (e.target.name === 'historyValue') {
            if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
                || !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    }
    compareString(a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    }
    set node(node) {
        if (node) {
            this._node = node;
            if (this._node.question.enableHistoricalValue && !isUndefined(this._node.question.historicalDataValue)) {
                const display = { text: '', _date: '' };
                if ((this._node.question.renderingType === 'select'
                    || this._node.question.renderingType === 'multi-select'
                    || this._node.question.renderingType === 'single-select')) {
                    display.text = this.historicalFieldHelper.getDisplayTextFromOptions(this._node.question, 'value', 'label');
                    display._date = this._node.question.historicalDataValue.valueDate;
                    this._node.question['historicalDisplay'] = display;
                }
                else if (!isUndefined(this._node.question.historicalDataValue)) {
                    display.text = this._node.question.historicalDataValue.value;
                    display._date = this._node.question.historicalDataValue.valueDate;
                    this._node.question['historicalDisplay'] = display;
                }
            }
        }
    }
};
HistoricalValueDirective.ctorParameters = () => [
    { type: HistoricalFieldHelperService }
];
__decorate([
    Input(),
    __metadata("design:type", NodeBase)
], HistoricalValueDirective.prototype, "_node", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], HistoricalValueDirective.prototype, "_nodeChange", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HistoricalValueDirective.prototype, "setValue", null);
__decorate([
    Input(),
    __metadata("design:type", NodeBase),
    __metadata("design:paramtypes", [NodeBase])
], HistoricalValueDirective.prototype, "node", null);
HistoricalValueDirective = __decorate([
    Directive({
        selector: `[node]`
    }),
    __metadata("design:paramtypes", [HistoricalFieldHelperService])
], HistoricalValueDirective);

const STYLE = `
ng-select {
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
  width: 100%;
}
ng-select * {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
ng-select > div {
  border: 1px solid #ddd;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  width: 100%;
}
ng-select > div.disabled {
  background-color: #eee;
  color: #aaa;
  cursor: default;
  pointer-events: none;
}
ng-select > div > div.single {
  display: flex;
  height: 30px;
  width: 100%;
}
ng-select > div > div.single > div.value,
ng-select > div > div.single > div.placeholder {
  flex: 1;
  line-height: 30px;
  overflow: hidden;
  padding: 0 10px;
  white-space: nowrap;
}
ng-select > div > div.single > div.placeholder {
  color: #a9a9a9;
}
ng-select > div > div.single > div.clear,
ng-select > div > div.single > div.toggle {
  color: #aaa;
  line-height: 30px;
  text-align: center;
  width: 30px;
}
ng-select > div > div.single > div.clear:hover,
ng-select > div > div.single > div.toggle:hover {
  background-color: #ececec;
}
ng-select > div > div.single > div.clear {
  font-size: 18px;
}
ng-select > div > div.single > div.toggle {
  font-size: 14px;
}
ng-select > div > div.multiple {
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  min-height: 30px;
  padding: 0 10px;
  width: 100%;
}
ng-select > div > div.multiple > div.option {
  background-color: #eee;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: #333;
  cursor: default;
  display: inline-block;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 22px;
  margin: 3px 5px 3px 0;
  padding: 0 4px;
}
ng-select > div > div.multiple > div.option span.deselect-option {
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
ng-select > div > div.multiple > div.option span.deselect-option:hover {
  color: #555;
}
ng-select > div > div.multiple input {
  background-color: transparent;
  border: none;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
ng-select > div > div.multiple input:focus {
  outline: none;
}
`;

const STYLE$1 = `select-dropdown {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
select-dropdown * {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
select-dropdown > div {
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
}
select-dropdown > div .filter {
  padding: 3px;
  width: 100%;
}
select-dropdown > div .filter input {
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 4px;
  width: 100%;
}
select-dropdown > div .options {
  max-height: 200px;
  overflow-y: auto;
}
select-dropdown > div .options ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
select-dropdown > div .options ul li {
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
}
select-dropdown .selected {
  background-color: #e0e0e0;
}
select-dropdown .selected.highlighted {
  background-color: #2196F3;
  color: #fff;
}
select-dropdown .highlighted {
  background-color: #2196F3;
  color: #fff;
}
select-dropdown .disabled {
  background-color: #fff;
  color: #9e9e9e;
  cursor: default;
  pointer-events: none;
}`;

class Option {
    constructor(value, label) {
        this.value = value;
        this.label = label;
        this.disabled = false;
        this.highlighted = false;
        this.selected = false;
        this.shown = true;
    }
    show() {
        this.shown = true;
    }
    hide() {
        this.shown = false;
    }
    disable() {
        this.disabled = true;
    }
    enable() {
        this.disabled = false;
    }
    undecoratedCopy() {
        return {
            label: this.label,
            value: this.value
        };
    }
}

class Diacritics {
    static strip(text) {
        const match = (a) => {
            return this.DIACRITICS[a] || a;
        };
        if (text) {
            return text.replace(/[^\u0000-\u007E]/g, match);
        }
        else {
            return '';
        }
    }
}
Diacritics.DIACRITICS = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
};

class OptionList {
    constructor(options) {
        /* Consider using these for performance improvement. */
        // private _selection: Array<Option>;
        // private _filtered: Array<Option>;
        // private _value: Array<string>;
        this._highlightedOption = null;
        if (typeof options === 'undefined' || options === null) {
            options = [];
        }
        this._options = options.map((option) => {
            const o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });
        this.highlight();
    }
    // v0 and v1 are assumed not to be undefined or null.
    static equalValues(v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        const a = v0.slice().sort();
        const b = v1.slice().sort();
        return a.every((v, i) => {
            return v === b[i];
        });
    }
    /** Options. **/
    get options() {
        return this._options;
    }
    getOptionsByValue(value) {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }
    /** Value. **/
    get value() {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }
    set value(v) {
        v = typeof v === 'undefined' || v === null ? [] : v;
        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }
    /** Selection. **/
    get selection() {
        return this.options.filter((option) => {
            return option.selected;
        });
    }
    select(option, multiple) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    }
    deselect(option) {
        option.selected = false;
    }
    clearSelection() {
        this.options.forEach((option) => {
            option.selected = false;
        });
    }
    /** Filter. **/
    get filtered() {
        return this.options.filter((option) => {
            return option.shown;
        });
    }
    filter(term) {
        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this.options.forEach((option) => {
                const l = Diacritics.strip(option.label).toUpperCase();
                const t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
            });
        }
        this.highlight();
    }
    resetFilter() {
        this.options.forEach((option) => {
            option.shown = true;
        });
    }
    /** Highlight. **/
    get highlightedOption() {
        return this._highlightedOption;
    }
    highlight() {
        const option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    }
    highlightOption(option) {
        this.clearHighlightedOption();
        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    }
    highlightNextOption() {
        const shownOptions = this.filtered;
        const index = this.getHighlightedIndexFromList(shownOptions);
        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    }
    highlightPreviousOption() {
        const shownOptions = this.filtered;
        const index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    }
    clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    }
    getHighlightedIndexFromList(options) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    }
    getHighlightedIndex() {
        return this.getHighlightedIndexFromList(this.filtered);
    }
    /** Util. **/
    hasShown() {
        return this.options.some((option) => {
            return option.shown;
        });
    }
    hasSelected() {
        return this.options.some((option) => {
            return option.selected;
        });
    }
    hasShownSelected() {
        return this.options.some((option) => {
            return option.shown && option.selected;
        });
    }
    getFirstShown() {
        for (const option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }
    getFirstShownSelected() {
        for (const option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }
}

let SelectDropdownComponent = class SelectDropdownComponent {
    constructor() {
        this.close = new EventEmitter();
        this.optionClicked = new EventEmitter();
        this.singleFilterClick = new EventEmitter();
        this.singleFilterInput = new EventEmitter();
        this.singleFilterKeydown = new EventEmitter();
        this.disabledColor = '#fff';
        this.disabledTextColor = '9e9e9e';
    }
    /** Event handlers. **/
    // Angular life cycle hooks.
    ngOnInit() {
        this.optionsReset();
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }
    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }
    // Filter input (single select).
    onSingleFilterClick(event) {
        this.singleFilterClick.emit(null);
    }
    onSingleFilterInput(event) {
        this.singleFilterInput.emit(event.target.value);
    }
    onSingleFilterKeydown(event) {
        this.singleFilterKeydown.emit(event);
    }
    // Options list.
    onOptionsWheel(event) {
        this.handleOptionsWheel(event);
    }
    onOptionMouseover(option) {
        this.optionList.highlightOption(option);
    }
    onOptionClick(option) {
        this.optionClicked.emit(option);
    }
    /** Initialization. **/
    optionsReset() {
        this.optionList.resetFilter();
        this.optionList.highlight();
    }
    /** View. **/
    getOptionStyle(option) {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                'color': this.highlightTextColor
            };
        }
        else {
            return {};
        }
    }
    clearFilterInput() {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    }
    moveHighlightedIntoView() {
        const list = this.optionsList.nativeElement;
        const listHeight = list.offsetHeight;
        const itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            const item = list.children[0].children[itemIndex];
            const itemHeight = item.offsetHeight;
            const itemTop = itemIndex * itemHeight;
            const itemBottom = itemTop + itemHeight;
            const viewTop = list.scrollTop;
            const viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }
    handleOptionsWheel(e) {
        const div = this.optionsList.nativeElement;
        const atTop = div.scrollTop === 0;
        const atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectDropdownComponent.prototype, "filterEnabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "highlightColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "highlightTextColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "left", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectDropdownComponent.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "notFoundMsg", void 0);
__decorate([
    Input(),
    __metadata("design:type", OptionList)
], SelectDropdownComponent.prototype, "optionList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "top", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "width", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "close", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "optionClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterInput", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterKeydown", void 0);
__decorate([
    ViewChild('filterInput', { static: false }),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "filterInput", void 0);
__decorate([
    ViewChild('optionsList', { static: false }),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "optionsList", void 0);
SelectDropdownComponent = __decorate([
    Component({
        selector: 'select-dropdown',
        template: "<div\n    [ngStyle]=\"{'top.px': top, 'left.px': left, 'width.px': width}\">\n\n    <div class=\"filter\"\n        *ngIf=\"!multiple\">\n        <input\n            *ngIf=\"filterEnabled\"\n            #filterInput\n            (click)=\"onSingleFilterClick($event)\"\n            (input)=\"onSingleFilterInput($event)\"\n            (keydown)=\"onSingleFilterKeydown($event)\">\n    </div>\n\n    <div class=\"options\"\n        #optionsList>\n        <ul\n            (wheel)=\"onOptionsWheel($event)\">\n            <li *ngFor=\"let option of optionList.filtered\"\n                [ngClass]=\"{'highlighted': option.highlighted, 'selected': option.selected, 'disabled': option.disabled}\"\n                [ngStyle]=\"getOptionStyle(option)\"\n                (click)=\"onOptionClick(option)\"\n                (mouseover)=\"onOptionMouseover(option)\">\n                {{option.label}}\n            </li>\n            <li\n                *ngIf=\"!optionList.hasShown()\"\n                class=\"message\">\n                {{notFoundMsg}}\n            </li>\n        </ul>\n    </div>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        styles: [STYLE$1]
    })
], SelectDropdownComponent);

// tslint:disable-block
const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
let SelectComponent = class SelectComponent {
    constructor() {
        /** Keys. **/
        this.KEYS = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            UP: 38,
            DOWN: 40
        };
        this.allowClear = false;
        this.disabled = false;
        this.highlightColor = '#2196f3';
        this.highlightTextColor = '#fff';
        this.multiple = false;
        this.noFilter = 0;
        this.notFoundMsg = 'No results found';
        this.placeholder = '';
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.selected = new EventEmitter();
        this.deselected = new EventEmitter();
        this.typed = new EventEmitter();
        this._value = [];
        // Selection state variables.
        this.hasSelected = false;
        // View state variables.
        this.filterEnabled = true;
        this.filterInputWidth = 1;
        this.hasFocus = false;
        this.isBelow = true;
        this.isDisabled = false;
        this.isOpen = false;
        this.placeholderView = '';
        this.clearClicked = false;
        this.selectContainerClicked = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /** Event handlers. **/
    // Angular lifecycle hooks.
    ngOnInit() {
        this.placeholderView = this.placeholder;
    }
    ngAfterViewInit() {
        this.updateFilterWidth();
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
        if (changes.hasOwnProperty('noFilter')) {
            const numOptions = this.optionList.options.length;
            const minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
    }
    // Window.
    onWindowClick() {
        if (!this.selectContainerClicked) {
            this.closeDropdown();
        }
        this.clearClicked = false;
        this.selectContainerClicked = false;
    }
    onWindowResize() {
        this.updateWidth();
    }
    // Select container.
    onSelectContainerClick(event) {
        this.selectContainerClicked = true;
        if (!this.clearClicked) {
            this.toggleDropdown();
        }
    }
    onSelectContainerFocus() {
        this.onTouched();
    }
    onSelectContainerKeydown(event) {
        this.handleSelectContainerKeydown(event);
    }
    // Dropdown container.
    onDropdownOptionClicked(option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    }
    onDropdownClose(focus) {
        this.closeDropdown(focus);
    }
    // Single filter input.
    onSingleFilterClick() {
        this.selectContainerClicked = true;
    }
    onSingleFilterInput(term) {
        setTimeout(() => {
            if (term.length > 2) {
                this.typed.emit(term);
            }
        }, 500);
        this.optionList.filter(term);
    }
    onSingleFilterKeydown(event) {
        this.handleSingleFilterKeydown(event);
    }
    // Multiple filter input.
    onMultipleFilterInput(event) {
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout(() => {
            this.optionList.filter(event.target.value);
        });
    }
    onMultipleFilterKeydown(event) {
        this.handleMultipleFilterKeydown(event);
    }
    // Single clear select.
    onClearSelectionClick(event) {
        this.clearClicked = true;
        this.clearSelection();
        this.closeDropdown(true);
    }
    // Multiple deselect option.
    onDeselectOptionClick(option) {
        this.clearClicked = true;
        this.deselectOption(option);
    }
    /** API. **/
    // TODO fix issues with global click/key handler that closes the dropdown.
    open() {
        this.openDropdown();
    }
    close() {
        this.closeDropdown();
    }
    clear() {
        this.clearSelection();
    }
    select(value) {
        this.optionList.getOptionsByValue(value).forEach((option) => {
            this.selectOption(option);
        });
        this.valueChanged();
    }
    /** ControlValueAccessor interface methods. **/
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Value. **/
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this.multiple ? this._value : this._value[0];
        }
    }
    set value(v) {
        if (typeof v === 'undefined' || v === null || v === '') {
            v = [];
        }
        else if (typeof v === 'string') {
            v = [v];
        }
        else if (!Array.isArray(v)) {
            throw new TypeError('Value must be a string or an array.');
        }
        if (!OptionList.equalValues(v, this._value)) {
            this.optionList.value = v;
            this.valueChanged();
        }
    }
    valueChanged() {
        this._value = this.optionList.value;
        this.hasSelected = this._value.length > 0;
        this.placeholderView = this.hasSelected ? '' : this.placeholder;
        this.updateFilterWidth();
        this.onChange(this.value);
    }
    /** Initialization. **/
    updateOptionsList(firstTime) {
        let v;
        if (!firstTime) {
            v = this.optionList.value;
        }
        this.optionList = new OptionList(this.options);
        if (!firstTime) {
            this.optionList.value = v;
            this.valueChanged();
        }
    }
    /** Dropdown. **/
    toggleDropdown() {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    }
    openDropdown() {
        if (!this.isOpen) {
            this.updateWidth();
            this.updatePosition();
            this.isOpen = true;
            if (this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
            this.opened.emit(null);
        }
    }
    /* tslint:disable */
    closeDropdown(focus = false) {
        if (this.isOpen) {
            this.clearFilterInput();
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(null);
        }
    }
    /* tslint:enable */
    /** Select. **/
    selectOption(option) {
        if (!option.selected) {
            this.optionList.select(option, this.multiple);
            this.valueChanged();
            this.selected.emit(option.undecoratedCopy());
            // Is this not allready done when setting the value??
            /*setTimeout(() => {
                if (this.multiple) {
                    this.updateFilterWidth();
                }
            });*/
        }
    }
    deselectOption(option) {
        if (option.selected) {
            this.optionList.deselect(option);
            this.valueChanged();
            this.deselected.emit(option.undecoratedCopy());
            setTimeout(() => {
                if (this.multiple) {
                    // this.updateFilterWidth();
                    this.updatePosition();
                    this.optionList.highlight();
                    if (this.isOpen) {
                        this.dropdown.moveHighlightedIntoView();
                    }
                }
            });
        }
    }
    clearSelection() {
        const selection = this.optionList.selection;
        if (selection.length > 0) {
            this.optionList.clearSelection();
            this.valueChanged();
            if (selection.length === 1) {
                this.deselected.emit(selection[0].undecoratedCopy());
            }
            else {
                this.deselected.emit(selection.map((option) => {
                    return option.undecoratedCopy();
                }));
            }
        }
    }
    toggleSelectOption(option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
    }
    selectHighlightedOption() {
        const option = this.optionList.highlightedOption;
        if (option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    }
    deselectLast() {
        const sel = this.optionList.selection;
        if (sel.length > 0) {
            const option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    }
    /** Filter. **/
    clearFilterInput() {
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    }
    setMultipleFilterInput(value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    }
    handleSelectContainerKeydown(event) {
        const key = event.which;
        if (this.isOpen) {
            if (key === this.KEYS.ESC ||
                (key === this.KEYS.UP && event.altKey)) {
                this.closeDropdown(true);
            }
            else if (key === this.KEYS.TAB) {
                this.closeDropdown();
            }
            else if (key === this.KEYS.ENTER) {
                this.selectHighlightedOption();
            }
            else if (key === this.KEYS.UP) {
                this.optionList.highlightPreviousOption();
                this.dropdown.moveHighlightedIntoView();
                if (!this.filterEnabled) {
                    event.preventDefault();
                }
            }
            else if (key === this.KEYS.DOWN) {
                this.optionList.highlightNextOption();
                this.dropdown.moveHighlightedIntoView();
                if (!this.filterEnabled) {
                    event.preventDefault();
                }
            }
        }
        else {
            if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
                (key === this.KEYS.DOWN && event.altKey)) {
                /* FIREFOX HACK:
                 *
                 * The setTimeout is added to prevent the enter keydown event
                 * to be triggered for the filter input field, which causes
                 * the dropdown to be closed again.
                 */
                setTimeout(() => { this.openDropdown(); });
            }
        }
    }
    handleMultipleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled &&
                this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    }
    handleSingleFilterKeydown(event) {
        const key = event.which;
        if (key === this.KEYS.ESC || key === this.KEYS.TAB
            || key === this.KEYS.UP || key === this.KEYS.DOWN
            || key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    }
    /** View. **/
    focus() {
        this.hasFocus = true;
        if (this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
    }
    blur() {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    }
    updateWidth() {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    }
    updatePosition() {
        const e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    }
    updateFilterWidth() {
        if (typeof this.filterInput !== 'undefined') {
            const value = this.filterInput.nativeElement.value;
            this.filterInputWidth = value.length === 0 ?
                1 + this.placeholderView.length * 10 : 1 + value.length * 10;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], SelectComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "allowClear", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "highlightColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "highlightTextColor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "noFilter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "notFoundMsg", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "placeholder", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "opened", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "closed", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "deselected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "typed", void 0);
__decorate([
    ViewChild('selection', { static: false }),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selectionSpan", void 0);
__decorate([
    ViewChild('dropdown', { static: false }),
    __metadata("design:type", SelectDropdownComponent)
], SelectComponent.prototype, "dropdown", void 0);
__decorate([
    ViewChild('filterInput', { static: false }),
    __metadata("design:type", Object)
], SelectComponent.prototype, "filterInput", void 0);
SelectComponent = __decorate([
    Component({
        selector: 'ng-select',
        template: "<div\n    #selection\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [ngClass]=\"{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}\"\n    (click)=\"onSelectContainerClick($event)\"\n    (focus)=\"onSelectContainerFocus()\"\n    (keydown)=\"onSelectContainerKeydown($event)\"\n    (window:click)=\"onWindowClick()\"\n    (window:resize)=\"onWindowResize()\">\n\n    <div class=\"single\"\n        *ngIf=\"!multiple\">\n        <div class=\"value\"\n            *ngIf=\"optionList.hasSelected()\">\n            {{optionList.selection[0].label}}\n        </div>\n        <div class=\"placeholder\"\n            *ngIf=\"!optionList.hasSelected()\">\n            {{placeholderView}}\n        </div>\n        <div class=\"clear\"\n            *ngIf=\"allowClear\"\n            (click)=\"onClearSelectionClick($event)\">\n            &#x2715;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"isOpen\">\n            &#x25B2;\n        </div>\n        <div class=\"toggle\"\n            *ngIf=\"!isOpen\">\n            &#x25BC;\n        </div>\n    </div>\n\n    <div class=\"multiple\"\n        *ngIf=\"multiple\">\n        <div class=\"option\"\n            *ngFor=\"let option of optionList.selection\">\n            <span class=\"deselect-option\"\n                (click)=onDeselectOptionClick(option)>\n                &#x2715;\n            </span>\n            {{option.label}}\n        </div>\n        <input\n            *ngIf=\"filterEnabled\"\n            filterInput\n            tabindex=\"-1\"\n            [placeholder]=\"placeholderView\"\n            [ngStyle]=\"{'width.px': filterInputWidth}\"\n            (input)=\"onMultipleFilterInput($event)\"\n            (keydown)=\"onMultipleFilterKeydown($event)\"/>\n    </div>\n\n</div>\n<select-dropdown\n    *ngIf=\"isOpen\"\n    #dropdown\n    [multiple]=\"multiple\"\n    [optionList]=\"optionList\"\n    [notFoundMsg]=\"notFoundMsg\"\n    [highlightColor]=\"highlightColor\"\n    [highlightTextColor]=\"highlightTextColor\"\n    [filterEnabled]=\"filterEnabled\"\n    [width]=\"width\"\n    [top]=\"top\"\n    [left]=\"left\"\n    (close)=\"onDropdownClose($event)\"\n    (optionClicked)=\"onDropdownOptionClicked($event)\"\n    (singleFilterClick)=\"onSingleFilterClick()\"\n    (singleFilterInput)=\"onSingleFilterInput($event)\"\n    (singleFilterKeydown)=\"onSingleFilterKeydown($event)\">\n</select-dropdown>\n",
        providers: [SELECT_VALUE_ACCESSOR],
        encapsulation: ViewEncapsulation.None,
        styles: [STYLE]
    })
], SelectComponent);

let SelectModule = class SelectModule {
};
SelectModule = __decorate([
    NgModule({
        declarations: [
            SelectComponent,
            SelectDropdownComponent
        ],
        exports: [
            SelectComponent
        ],
        imports: [
            CommonModule,
            FormsModule
        ]
    })
], SelectModule);

// import { FileUploadResourceService } from '../../etl-api/file-upload-resource.service';
// Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
// tslint:disable-next-line:use-pipe-transform-interface
let SecurePipe = class SecurePipe {
    constructor(_ref, sanitizer) {
        this._ref = _ref;
        this.sanitizer = sanitizer;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._result = new BehaviorSubject(null);
        this.result = this._result.asObservable();
        this._internalSubscription = null;
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._dispose();
        }
    }
    transform(url, getfile) {
        this.getfile = getfile;
        const obj = this.internalTransform(url);
        return this.asyncTrasnform(obj);
    }
    internalTransform(url) {
        if (!url) {
            return this.result;
        }
        if (this.previousUrl !== url) {
            this.previousUrl = url;
            this._internalSubscription = this.getfile(url)
                .subscribe(m => {
                const sanitized = this.sanitizer.bypassSecurityTrustUrl(m);
                this._result.next(sanitized);
            });
        }
        return this.result;
    }
    asyncTrasnform(obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.asyncTrasnform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return WrappedValue.wrap(this._latestValue);
    }
    _subscribe(obj) {
        const _this = this;
        this._obj = obj;
        this._subscription = obj.subscribe({
            next: function (value) {
                return _this._updateLatestValue(obj, value);
            }, error: (e) => { throw e; }
        });
    }
    _dispose() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        if (this._internalSubscription) {
            this._internalSubscription.unsubscribe();
        }
        this._internalSubscription = null;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    }
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    }
};
SecurePipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
SecurePipe = __decorate([
    Pipe({
        name: 'secure',
        pure: false
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        DomSanitizer])
], SecurePipe);

let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            SecurePipe
        ],
        imports: [CommonModule],
        exports: [
            SecurePipe
        ],
        providers: [
            DataSources
        ],
    })
], SharedModule);

var FileUploadComponent_1;
let FileUploadComponent = FileUploadComponent_1 = class FileUploadComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.uploading = false;
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.formEntryMode = true;
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = (_) => { };
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
    }
    ngOnInit() {
        if (this.fileUuid) {
            this.checkFileType();
        }
    }
    onFileChange(fileList) {
        for (const file of fileList) {
            this.upload(file);
        }
    }
    upload(data) {
        if (this.dataSource) {
            this.uploading = true;
            this.dataSource.fileUpload(data).subscribe((result) => {
                this.fileUuid = result.image;
                this.checkFileType();
                this.propagateChange(this.fileUuid);
                this.uploading = false;
            }, (error) => {
                this.uploading = false;
            });
        }
    }
    // this is the initial value set to the component
    writeValue(value) {
        if (value !== this.fileUuid) {
            this.fileUuid = value;
            this.checkFileType();
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    clearValue() {
        this.fileUuid = null;
        this.pdfUploaded = false;
        this.pdfUrl = null;
        this.propagateChange(this.fileUuid);
    }
    getPdfUrl(fileUuid) {
        this.dataSource.fetchFile(fileUuid, 'pdf').subscribe((file) => {
            this.pdfUploaded = true;
            this.pdfUrl = file.changingThisBreaksApplicationSecurity;
        });
    }
    checkFileType() {
        const re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.getPdfUrl(this.fileUuid);
        }
    }
};
FileUploadComponent.ctorParameters = () => [
    { type: Renderer2 }
];
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FileUploadComponent.prototype, "dataSource", null);
FileUploadComponent = FileUploadComponent_1 = __decorate([
    Component({
        selector: 'app-file-upload',
        template: "<lib-file-uploader [srcUrl]=\"pdfUrl\" [formEntry]=\"formEntryMode\" [(ngModel)]=\"fileUuid\" (_onClear)=\"clearValue()\" (uploadData)=\"onFileChange($event)\">\n</lib-file-uploader>\n<div *ngIf=\"fileUuid\">\n    <img *ngIf=\"!pdfUploaded\" class=\"img-responsive\" [src]=\"fileUuid | secure:this.dataSource.fetchFile\" alt=\"\" />\n</div>",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FileUploadComponent_1),
                multi: true,
            }
        ],
        styles: [`img {
        margin-left: auto;margin-right: auto;display: block;
    }`]
    }),
    __metadata("design:paramtypes", [Renderer2])
], FileUploadComponent);

let RemoteFileUploadModule = class RemoteFileUploadModule {
};
RemoteFileUploadModule = __decorate([
    NgModule({
        imports: [CommonModule, SelectModule, FormsModule, SharedModule, WebcamModule, NgxFileUploaderModule],
        exports: [FileUploadComponent],
        declarations: [FileUploadComponent],
        providers: [],
    })
], RemoteFileUploadModule);

/**
 * date-picker.component
 */
const moment$1 = moment_;
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_
let DatePickerComponent = class DatePickerComponent {
    constructor() {
        this.locale = 'en';
        this.viewFormat = 'll';
        this.returnObject = 'js';
        this.onDatePickerCancel = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onDisplayMonths = false;
        this.onDisplayYears = false;
        this.displayYearsIndex = 0;
        this.monthsShort = moment$1.monthsShort();
    }
    ngOnInit() {
        this.initValue();
        // default to current year range
        each(this.fullYearRange, (v, i) => {
            this.currentYear = this.calendarDate.clone().startOf('year').year();
            if (v.indexOf(this.currentYear) !== -1) {
                this.displayYearsIndex = i;
            }
        });
        this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        this.generateCalendar();
    }
    prev() {
        if (this.onDisplayYears) {
            this.displayYearsIndex--;
            if (this.displayYearsIndex < 0) {
                this.displayYearsIndex = 0;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        }
        else {
            this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
        }
        this.generateCalendar();
    }
    showMonthSelection() {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    }
    showYearSelection() {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    }
    next() {
        if (this.onDisplayYears) {
            this.displayYearsIndex++;
            if (this.displayYearsIndex >= this.fullYearRange.length) {
                this.displayYearsIndex = this.fullYearRange.length - 1;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
        }
        else {
            this.calendarDate = this.calendarDate.clone().add(1, 'M');
        }
        this.generateCalendar();
    }
    selectDay(day) {
        const daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        const selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    }
    selectMonth(month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    }
    selectYear(year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    }
    selectToday() {
        const today = this.parseToReturnObjectType(moment$1());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    }
    clearPickDate() {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    }
    cancelDatePicker() {
        this.onDatePickerCancel.emit(false);
        return;
    }
    generateYears() {
        const currentYear = moment$1().year();
        const startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        const years = [];
        for (let year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = chunk(years, 14);
    }
    initValue() {
        // set moment locale (default is en)
        moment$1.locale(this.locale);
        // set today value
        this.today = moment$1().startOf('date');
        this.currentMonth = this.monthsShort[moment$1().month()];
        this.currentYear = moment$1().year();
        // set week days name array
        this.dayNames = moment$1.weekdaysShort(true);
        // check if the input initDate has value
        if (this.initDate) {
            this.calendarDate = this.returnObject === 'string' ? moment$1(this.initDate, this.viewFormat) :
                moment$1(this.initDate);
            this.selectedDate = this.calendarDate.clone().startOf('date');
        }
        else {
            this.calendarDate = moment$1();
        }
        this.generateYears();
    }
    generateCalendar() {
        this.calendarDays = [];
        const start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment$1.localeData().firstDayOfWeek())) % 7;
        const end = 41 + start; // iterator ending point
        for (let i = start; i <= end; i += 1) {
            const day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    }
    parseToReturnObjectType(day) {
        switch (this.returnObject) {
            case 'js':
                return day.toDate();
            case 'string':
                return day.format(this.viewFormat);
            case 'moment':
                return day;
            case 'json':
                return day.toJSON();
            case 'array':
                return day.toArray();
            case 'iso':
                return day.toISOString();
            case 'object':
                return day.toObject();
            default:
                return day;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "initDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "viewFormat", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "returnObject", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "onDatePickerCancel", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "onSelectDate", void 0);
DatePickerComponent = __decorate([
    Component({
        selector: 'date-picker',
        template: "<picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-prev\" (click)=\"prev()\"></span>\n        </div>\n        <div class=\"picker-header-content\">\n          <div class=\"content\">\n            <span (click)=\"showMonthSelection()\" class=\"month\">{{calendarDate | moment: \"MMMM\"}}</span>\n            <span class=\"seperator\">|</span>\n            <span (click)=\"showYearSelection()\" class=\"year\">{{calendarDate | moment: \"YYYY\"}}</span>\n          </div>\n        </div>\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-next\" (click)=\"next()\"></span>\n        </div>\n      </div>\n      <div class=\"picker-calendar\">\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n          <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{ day }}</span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n                    <span class=\"picker-day\" (click)=\"selectDay(day)\" [ngClass]=\"{\n                       'out-focus': day.month() != calendarDate.month(),\n                       'today': day.isSame(today),\n                       'selected': day.isSame(selectedDate)\n                      }\" *ngFor=\"let day of calendarDays\">\n                    {{ day | moment: 'D'}}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n                    <span class=\"picker-month\" *ngFor=\"let month of monthsShort\"\n                          (click)=\"selectMonth(month)\"\n                          [ngClass]=\"{\n                       'selected': month === currentMonth\n                      }\">\n                    {{ month }}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n                    <span class=\"picker-year\" *ngFor=\"let year of displayYearRange\"\n                          (click)=\"selectYear(year)\"\n                          [ngClass]=\"{\n                       'selected': year === currentYear\n                      }\">\n                    {{ year }}\n                </span>\n        </div>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-today\" (click)=\"selectToday()\"><span class=\"text\">Today</span></div>\n        <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\"><span class=\"text\">Clear</span></div>\n        <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\"><span class=\"text\">Close</span></div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
        styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:-webkit-box;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:-webkit-box;display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:\" \";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent)),-webkit-gradient(linear,left top,right top,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent));background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
    }),
    __metadata("design:paramtypes", [])
], DatePickerComponent);

/**
 * time-picker.component
 */
const moment$2 = moment_;
// const myDpStyles: string = require('./time-picker.component.css');
// const myDpTpl: string = require('./time-picker.component.html');
// webpack2_
let TimePickerComponent = class TimePickerComponent {
    constructor() {
        this.showSecond = true;
        this.viewFormat = 'hh:mm A';
        this.use12Hour = false;
        this.returnObject = 'js';
        this.onSelectTime = new EventEmitter();
        this.onTimePickerCancel = new EventEmitter();
        this.hourFormat = 'HH';
    }
    ngOnInit() {
        if (this.use12Hour) {
            this.hourFormat = 'hh';
        }
        this.time = this.initTime ? moment$2(this.initTime, this.viewFormat) : moment$2();
        // check if the input initDate has value
        if (this.initTime) {
            this.time = this.returnObject === 'string' ? moment$2(this.initTime, this.viewFormat) :
                moment$2(this.initTime);
        }
        else {
            this.time = moment$2();
        }
    }
    increaseHour() {
        this.time = this.time.clone().add(1, 'h');
    }
    decreaseHour() {
        this.time = this.time.clone().subtract(1, 'h');
    }
    increaseMinute() {
        this.time = this.time.clone().add(1, 'm');
    }
    decreaseMinute() {
        this.time = this.time.clone().subtract(1, 'm');
    }
    increaseSecond() {
        this.time = this.time.clone().add(1, 's');
    }
    decreaseSecond() {
        this.time = this.time.clone().subtract(1, 's');
    }
    selectTime() {
        const selectTime = this.parseToReturnObjectType(this.time);
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    selectNow() {
        const selectTime = this.parseToReturnObjectType(moment$2());
        this.onSelectTime.emit(selectTime);
        this.cancelTimePicker();
        return;
    }
    clearTime() {
        this.onSelectTime.emit(null);
        this.cancelTimePicker();
        return;
    }
    cancelTimePicker() {
        this.onTimePickerCancel.emit(false);
        return;
    }
    parseToReturnObjectType(time) {
        switch (this.returnObject) {
            case 'js':
                return time.toDate();
            case 'string':
                return time.format(this.viewFormat);
            case 'moment':
                return time;
            case 'json':
                return time.toJSON();
            case 'array':
                return time.toArray();
            case 'iso':
                return time.toISOString();
            case 'object':
                return time.toObject();
            default:
                return time;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "initTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "showSecond", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "viewFormat", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "use12Hour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "returnObject", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "onSelectTime", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TimePickerComponent.prototype, "onTimePickerCancel", void 0);
TimePickerComponent = __decorate([
    Component({
        selector: 'time-picker',
        template: "<picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n    <div class=\"picker-wrap\">\n        <div class=\"picker-box\">\n            <div class=\"picker-header\">Time Picker</div>\n            <div class=\"picker-table\">\n                <ul class=\"picker-table-time\">\n                    <li class=\"picker-table-number hour\">\n                        <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n                        {{time | moment: hourFormat}}\n                        <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n                    </li>\n                    <li class=\"picker-table-separator\">:</li>\n                    <li class=\"picker-table-number minute\">\n                        <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n                        {{time | moment: 'mm'}}\n                        <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n                    </li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n                    <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n                        <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n                        {{time | moment: 'ss'}}\n                        <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n                    </li>\n                    <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n                        {{time | moment: 'A'}}\n                    </li>\n                </ul>\n            </div>\n            <div class=\"picker-footer\">\n                <div class=\"picker-action action-now\" (click)=\"selectNow()\"><span class=\"text\">Now</span></div>\n                <div class=\"picker-action action-confirm\" (click)=\"selectTime()\"><span class=\"text\">Confirm</span></div>\n                <div class=\"picker-action action-clear\" (click)=\"clearTime()\"><span class=\"text\">Clear</span></div>\n                <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\"><span class=\"text\">Close</span></div>\n            </div>\n        </div>\n    </div>\n</picker-modal>\n",
        styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent)),-webkit-gradient(linear,left top,right top,color-stop(35%,transparent),color-stop(35%,#777),color-stop(65%,#777),color-stop(65%,transparent));background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
    }),
    __metadata("design:paramtypes", [])
], TimePickerComponent);

/**
 * modal.component
 */
// const myDpStyles: string = require('./modal.component.css');
// const myDpTpl: string = require('./modal.component.html');
// webpack2_
let ModalComponent = class ModalComponent {
    constructor() {
        this.onOverlayClick = new EventEmitter();
    }
    ngOnInit() {
    }
    closeModal() {
        this.onOverlayClick.emit(false);
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "onOverlayClick", void 0);
ModalComponent = __decorate([
    Component({
        selector: 'picker-modal',
        template: "<section class=\"x-modal\">\n    <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n    <section class=\"modal-main\" id=\"section-modal-main\">\n        <ng-content></ng-content>\n    </section>\n</section>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [],
        styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"]
    }),
    __metadata("design:paramtypes", [])
], ModalComponent);

/**
 * moment.pipe
 */
let MomentPipe = class MomentPipe {
    transform(moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    }
};
MomentPipe = __decorate([
    Pipe({ name: 'moment' })
], MomentPipe);

var DateTimePickerComponent_1;
const Moment = moment_;
let DateTimePickerComponent = DateTimePickerComponent_1 = class DateTimePickerComponent {
    constructor() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngOnInit() { }
    weeksSelected(count) {
        const now = new Date();
        const nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    }
    setDate(date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    }
    setTime(time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    }
    toggleDatePicker(status) {
        this.showDatePicker = status;
        /*setTimeout(function() {
          let _body = document.getElementById('content-wrapper').getBoundingClientRect(),
            elem = document.getElementById('section-modal-main');
          if (elem) {
            let elemBox = elem.getBoundingClientRect();
            if (elemBox.bottom > _body.bottom) {
              elem.style.bottom = '36px';
            }
          }
        }, 0);*/
        return;
    }
    toggleTimePicker(status) {
        this.showTimePicker = status;
        return;
    }
    get value() {
        return this.modelValue;
    }
    set value(val) {
        this.modelValue = val;
        this.onDateChange.emit(val);
        this.onChange(val);
        this.onTouched();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    writeValue(value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateTimePickerComponent.prototype, "modelValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateTimePickerComponent.prototype, "showWeeks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DateTimePickerComponent.prototype, "weeks", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DateTimePickerComponent.prototype, "onDateChange", void 0);
DateTimePickerComponent = DateTimePickerComponent_1 = __decorate([
    Component({
        selector: 'date-time-picker',
        template: "<div class='row'>\n    <div *ngIf=\"!showTime\" class='col-xs-12 col-md-12'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-8 col-md-8'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-4 col-md-4'>\n        <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n        />\n    </div>\n</div>\n<date-picker *ngIf=\"showDatePicker\" [initDate]=\"value\" (onSelectDate)=\"setDate($event)\" (onDatePickerCancel)=\"toggleDatePicker($event)\"></date-picker>\n\n<time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"setTime($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DateTimePickerComponent_1),
                multi: true
            }
        ],
        styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"]
    }),
    __metadata("design:paramtypes", [])
], DateTimePickerComponent);

/**
 * date-time-picker.module
 */
let DateTimePickerModule = class DateTimePickerModule {
};
DateTimePickerModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule],
        declarations: [
            DatePickerComponent,
            TimePickerComponent,
            ModalComponent,
            MomentPipe,
            DateTimePickerComponent
        ],
        exports: [
            DatePickerComponent,
            TimePickerComponent,
            ModalComponent,
            MomentPipe,
            DateTimePickerComponent
        ],
        providers: []
    })
], DateTimePickerModule);

var NgxDateTimePickerComponent_1;
const moment$3 = moment_;
const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
let NgxDateTimePickerComponent = NgxDateTimePickerComponent_1 = class NgxDateTimePickerComponent {
    constructor() {
        // public date = new FormControl(moment());
        this.selectedTime = moment$3().format();
        this.selectedDate = moment$3().format();
        this.loadInitial = false;
        this.showTimePicker = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
    }
    onTimeSelect($event) {
        const setDate = moment$3(this.selectedDate);
        const setTime = $event;
        this.setDateTime(setDate, setTime);
    }
    onDateSelect($event) {
        const setDate = moment$3($event.value);
        const setTime = this.selectedTime;
        const dateString = this.setDateTime(setDate, setTime);
        const selectedDate = $event.value;
        this.value = dateString;
    }
    toggleTimePicker(status) {
        this.showTimePicker = status;
        return;
    }
    setCurrentTime() {
        const setDate = moment$3(this.selectedDate);
        const currentTime = moment$3().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    }
    weekSelect($event) {
        const dateToUse = moment$3().format();
        const nextWeekDate = moment$3(dateToUse).add($event.value, 'weeks');
        const nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    }
    selectionChange($event) {
        console.log('Week selected', $event);
    }
    getWeekPickerCssClass() {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    }
    getDatePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        if (this.showTime === true) {
            return 'col-sm-8 form-group';
        }
        return 'col-sm-12 form-group';
    }
    getTimePickerCssClass() {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    }
    setDateTime(setDate, setTime) {
        const newDate = moment$3(setDate).format('DD-MM-YYYY');
        let newTime;
        if (this.showTime) {
            newTime = moment$3(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        const newDateTime = moment$3(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        const dateTimeString = moment$3(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxDateTimePickerComponent.prototype, "weeks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxDateTimePickerComponent.prototype, "modelValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxDateTimePickerComponent.prototype, "showTime", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxDateTimePickerComponent.prototype, "showWeeks", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NgxDateTimePickerComponent.prototype, "onDateChange", void 0);
NgxDateTimePickerComponent = NgxDateTimePickerComponent_1 = __decorate([
    Component({
        selector: 'ngx-date-time-picker',
        template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput \n              [matDatepicker]=\"picker\" \n              class=\"form-control\" \n              [value]=\"value\" \n              placeholder=\"Choose a date\" \n              (dateChange)=\"onDateSelect($event)\"\n              (click)=\"picker.open()\"\n              readonly\n        >\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"input-group-btn\"></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\"  class=\"form-control\" name=\"weeks\" (selectionChange) =\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n          <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n          />\n          <time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"onTimeSelect($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n    </div>\n  </div>\n</div>\n\n",
        providers: [
            { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
            { provide: DateAdapter, useClass: MomentDateAdapter },
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxDateTimePickerComponent_1),
                multi: true
            }
        ],
        styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"]
    })
], NgxDateTimePickerComponent);

/**
 * date-time-picker.module
 */
let NgxDateTimePickerModule = class NgxDateTimePickerModule {
};
NgxDateTimePickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule,
            MatInputModule,
            DateTimePickerModule,
            // AmazingTimePickerModule,
            MatSelectModule
        ],
        declarations: [
            NgxDateTimePickerComponent
        ],
        exports: [
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule,
            MatInputModule,
            NgxDateTimePickerComponent
        ],
        providers: []
    })
], NgxDateTimePickerModule);

class Option$1 {
    constructor(options) {
        this.label = options.label;
        this.value = options.value;
    }
}

var AfeNgSelectComponent_1;
let AfeNgSelectComponent = AfeNgSelectComponent_1 = class AfeNgSelectComponent {
    constructor() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = (_) => { };
    }
    getChangingText(event) {
        // console.log(event);
        this.getData(event).subscribe((options) => {
            this.question_options = options;
        });
    }
    writeValue(obj) {
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) { }
    ngOnChanges(changes) { }
    ngOnInit() {
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe((option) => {
                    this.selected_question_option = option;
                });
            }
        }
    }
    getData(searchText) {
        this.subject = new BehaviorSubject([]);
        const OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe((options) => {
            // console.log('options', options);
            const mappedOptions = new Array();
            for (let i = 0; i < options.length; i++) {
                mappedOptions.push(new Option$1(options[i]));
            }
            this.subject.next(mappedOptions);
        }, (error) => {
            this.subject.error(error);
        });
        return this.subject.asObservable();
    }
    onValueChange(event) { }
    resolveSelectedOption(value) {
        this.subjectOption = new BehaviorSubject(null);
        const OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe((option) => {
            // console.log('option', option);
            this.subjectOption.next(option);
        }, (error) => {
            this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    }
    resetOptions() {
        this.subject.next(new Array());
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], AfeNgSelectComponent.prototype, "dataSource", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AfeNgSelectComponent.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AfeNgSelectComponent.prototype, "extras", void 0);
AfeNgSelectComponent = AfeNgSelectComponent_1 = __decorate([
    Component({
        selector: 'afe-ng-select',
        template: `<ng-select
                   (searchInputText)="getChangingText($event)"
                    (ngModelChange)="onValueChange($event)"
                    [options]="question_options"
                    [multiple]="multiple" >
            </ng-select>
  `,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AfeNgSelectComponent_1),
                multi: true
            }
        ]
    })
], AfeNgSelectComponent);

let FormSchemaCompiler = class FormSchemaCompiler {
    constructor() {
    }
    compileFormSchema(formSchema, referencedComponents) {
        // get all referenced forms
        const refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        const placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    }
    findSchemaByName(schemaArray, nameOfSchema) {
        if (isEmpty(schemaArray) || isEmpty(nameOfSchema)) {
            return;
        }
        let foundSchema = {};
        each(schemaArray, (schema) => {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    }
    getPageInSchemaByLabel(schema, pageLabel) {
        if (isEmpty(schema) || isEmpty(pageLabel)) {
            return;
        }
        let foundPage = {};
        each(schema.pages, (page) => {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    }
    getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel) {
        if (isEmpty(schema) || isEmpty(pageLabel) || isEmpty(sectionLabel)) {
            return;
        }
        const foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (isEmpty(foundPage)) {
            return;
        }
        let foundSection = {};
        each(foundPage.sections, (section) => {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    }
    getQuestionByIdInSchema(schema, questionId) {
        if (isEmpty(schema) || isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            let question;
            for (let i = 0; i < schema.length; i++) {
                if (!isEmpty(schema[i])) {
                    question = this.getQuestionByIdInSchema(schema[i], questionId);
                }
                if (!isEmpty(question)) {
                    break;
                }
            }
            return question;
        }
        else if (typeof schema === 'object') {
            if (this.isQuestionObjectWithId(schema, questionId)) {
                return schema;
            }
            else if (this.isSchemaSubObjectExpandable(schema)) {
                const toExpand = (schema.pages || schema.sections || schema.questions);
                return this.getQuestionByIdInSchema(toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    getQuestionsArrayByQuestionIdInSchema(schema, questionId) {
        if (isEmpty(schema) || isEmpty(questionId)) {
            return;
        }
        return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
    }
    getQuestionsArrayByQuestionId(parent, object, questionId) {
        if (Array.isArray(object)) {
            let returnedValue;
            for (let i = 0; i < object.length; i++) {
                if (!isEmpty(object[i])) {
                    returnedValue = this.getQuestionsArrayByQuestionId(object, object[i], questionId);
                }
                if (!isEmpty(returnedValue)) {
                    break;
                }
            }
            return returnedValue;
        }
        else if (typeof object === 'object') {
            if (this.isQuestionObjectWithId(object, questionId)) {
                return parent;
            }
            else if (this.isSchemaSubObjectExpandable(object)) {
                const toExpand = (object.pages || object.sections || object.questions);
                return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    // object is page or section or question
    isSchemaSubObjectExpandable(object) {
        if (typeof object === 'object') {
            const objectKeys = Object.keys(object);
            if (includes(objectKeys, 'pages') ||
                includes(objectKeys, 'sections') ||
                includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    }
    isQuestionObjectWithId(object, id) {
        return object['id'] === id;
    }
    getAllPlaceholderObjects(schema) {
        const referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    }
    extractPlaceholderObjects(subSchema, objectsArray) {
        if (isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (let i = 0; i < subSchema.length; i++) {
                if (!isEmpty(subSchema[i])) {
                    this.extractPlaceholderObjects(subSchema[i], objectsArray);
                }
            }
        }
        else if (typeof subSchema === 'object') {
            if (!isEmpty(subSchema.reference)) {
                objectsArray.push(subSchema);
            }
            else if (this.isSchemaSubObjectExpandable(subSchema)) {
                const toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    }
    fillPlaceholderObject(placeHolderObject, referenceObject) {
        for (const member in referenceObject) {
            if (isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    }
    replaceAllPlaceholdersWithActualObjects(keyValReferencedForms, placeHoldersArray) {
        each(placeHoldersArray, (placeHolder) => {
            const referencedObject = this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        });
        return placeHoldersArray;
    }
    removeObjectFromArray(array, object) {
        const indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    }
    removeExcludedQuestionsFromPlaceholder(placeHolder) {
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            each(placeHolder.reference.excludeQuestions, (excludedQuestionId) => {
                const questionsArray = this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                const question = this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    }
    getReferencedObject(referenceData, keyValReferencedForms) {
        if (isEmpty(referenceData.form)) {
            console.error('Form compile: reference missing form attribute', referenceData);
            return;
        }
        if (isEmpty(keyValReferencedForms[referenceData.form])) {
            console.error('Form compile: referenced form alias not found', referenceData);
            return;
        }
        if (!isEmpty(referenceData.questionId)) {
            return this.getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
        }
        if (!isEmpty(referenceData.page) && !isEmpty(referenceData.section)) {
            return this.getSectionInSchemaByPageLabelBySectionLabel(keyValReferencedForms[referenceData.form], referenceData.page, referenceData.section);
        }
        if (!isEmpty(referenceData.page)) {
            return this.getPageInSchemaByLabel(keyValReferencedForms[referenceData.form], referenceData.page);
        }
        console.error('Form compile: Unsupported reference type', referenceData.reference);
    }
    getReferencedForms(formSchema, formSchemasLookupArray) {
        const referencedForms = formSchema.referencedForms;
        if (isEmpty(referencedForms)) {
            return;
        }
        const keyValReferencedForms = {};
        each(referencedForms, (reference) => {
            keyValReferencedForms[reference.alias] =
                this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    }
};
FormSchemaCompiler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], FormSchemaCompiler);

class TextInputQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.placeholder = options.placeholder || '';
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class TextAreaInputQuestion extends TextInputQuestion {
    constructor(options) {
        super(options);
        this.placeholder = options.placeholder || '';
        this.isExpanded = options.isExpanded || false;
        this.rows = options.rows || 18;
        this.renderingType = 'textarea';
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class SelectQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
        this.dataSource = options.dataSource || '';
    }
}

class UiSelectQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.renderingType = 'ui-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class DateQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.showTime = true;
        this.showWeeksAdder = false;
        this.renderingType = 'date';
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class MultiSelectQuestion extends SelectQuestion {
    constructor(options) {
        super(options);
        this.renderingType = 'multi-select' || 'single-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class NestedQuestion extends QuestionBase {
    constructor(options) {
        super(options);
    }
}

class QuestionGroup extends NestedQuestion {
    constructor(options) {
        super(options);
        this.isExpanded = true;
        this.renderingType = 'group';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormGroup;
    }
}

class RepeatingQuestion extends NestedQuestion {
    constructor(options) {
        super(options);
        this.renderingType = 'repeating';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormArray;
    }
}

class CheckBoxQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.renderingType = 'checkbox' || 'radio';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class FileUploadQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.showTime = true;
        this.showWeeksAdder = false;
        this.renderingType = 'file';
        this.dataSource = options.dataSource;
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class TestOrderQuestion extends QuestionBase {
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}

class DateValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        this.allowFutureDates = false;
        this.allowFutureDates = validations.allowFutureDates === 'true' ? true : false;
    }
}

class MaxValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        const max = validations.max;
        this.max = +max;
    }
}

class MinValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        const min = validations.min;
        this.min = +min;
    }
}

class DummyDataSource {
    constructor() {
        this.returnErrorOnNext = false;
    }
    resolveSelectedValue(value) {
        let selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            const option = new Option$1({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(option => option.value === value);
        const test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions[0]);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    fileUpload(url) {
        return of({ image: '' });
    }
    fetchFile(url) {
        return of({ image: '' });
    }
    searchOptions(searchText) {
        let selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            const option = new Option$1({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(option => option.label.indexOf(searchText) !== -1);
        const test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    sampleData() {
        return [
            {
                concept: 'a899e0ac-1350-11df-a1f1-0026b9348838',
                label: 'None'
            },
            {
                concept: 'a8ad1276-1350-11df-a1f1-0026b9348838',
                label: 'Breathlessness'
            },
            {
                concept: 'a892e4b4-1350-11df-a1f1-0026b9348838',
                label: 'Chest pain'
            },
            {
                concept: 'a8afc8b8-1350-11df-a1f1-0026b9348838',
                label: 'Cough = 2 weeks'
            },
            {
                concept: 'd7adae14-c386-49cc-8f7c-765d8ceec566',
                label: 'Fever for = 2 weeks'
            },
            {
                concept: '3f57aafc-7162-41da-a51b-6a804cb6f5e8',
                label: 'New exposure to household contact with TB'
            },
            {
                concept: 'a89807f0-1350-11df-a1f1-0026b9348838',
                label: 'Noticeable Weight loss'
            },
            {
                concept: 'e1862fef-68ed-4df4-90dd-a00152f719aa',
                label: 'Night sweats = 2 weeks'
            },
            {
                concept: 'a8ad462e-1350-11df-a1f1-0026b9348838',
                label: 'Abdomen'
            },
            {
                concept: 'f218c60e-4b54-475a-a4fa-facab9216da8',
                label: 'Groin'
            },
            {
                concept: 'a8a774b0-1350-11df-a1f1-0026b9348838',
                label: 'Joints'
            },
            {
                concept: '4639388c-ee31-4dcf-abb4-ad71253493bb',
                label: 'Neck Kw'
            }
        ];
    }
}

const moment$4 = moment_;
let HistoricalEncounterDataService = class HistoricalEncounterDataService {
    constructor() {
        this.dataSources = {};
    }
    registerEncounters(name, encounters) {
        const encStore = {
            data: [],
            getValue: (key, index = 0) => {
                const pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            },
            getAllObjects: () => {
                return encStore.data;
            },
            getSingleObject: (index = 0) => {
                return encStore.data[index];
            }
        };
        if (isArray(encounters)) {
            const group = [];
            each(encounters, (encounter) => {
                group.push(this._transformEncounter(encounter));
            });
            // Sort them in reverse chronological order
            encStore.data = sortBy(group, 'encounterDatetime').reverse();
        }
        else {
            // Assume a single openmrs rest encounter object.
            encStore.data.push(this._transformEncounter(encounters));
        }
        this.putObject(name, encStore);
    }
    putObject(name, object) {
        this.dataSources[name] = object;
    }
    getObject(name) {
        return this.dataSources[name] || null;
    }
    getFirstValue(path, object) {
        const answers = [];
        this.getAllValues(path, object, answers);
        if (answers.length > 0) {
            return {
                value: answers[0],
                valueDate: moment$4(object.encounterDatetime).format('ll')
            };
        }
    }
    getAllValues(path, object, answers) {
        if (isNil(object)) {
            return;
        }
        if (path.length <= 1) {
            if (!isNil(object[path[0]])) {
                answers.push(object[path[0]]);
            }
            return;
        }
        const newpath = path.splice(1);
        const key = path[0];
        if (isArray(object[key]) && object[key].length > 0) {
            each(object[key], (childObject) => {
                this.getAllValues(newpath.slice(0), childObject, answers);
            });
        }
        else {
            this.getAllValues(newpath.slice(0), object[key], answers);
        }
    }
    _transformEncounter(encounter) {
        if (isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        const prevEncounter = {
            encounterDatetime: encounter.encounterDatetime
        };
        if (encounter.location && encounter.location.uuid) {
            prevEncounter.location = encounter.location.uuid;
        }
        if (encounter.patient && encounter.patient.uuid) {
            prevEncounter.patient = encounter.patient.uuid;
        }
        if (encounter.form && encounter.form.uuid) {
            prevEncounter.form = encounter.form.uuid;
        }
        if (encounter.encounterType && encounter.encounterType.uuid) {
            prevEncounter.encounterType = encounter.encounterType.uuid;
        }
        if (encounter.provider) {
            const provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            const processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    }
    _transformObs(obs) {
        if (!obs) {
            return null;
        }
        const obsRep = {};
        if (isArray(obs)) {
            each(obs, (singleObs) => {
                this._augumentObs(obsRep, this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            const group = {};
            each(obs.groupMembers, (member) => {
                this._augumentObs(group, this._transformObs(member));
            });
            // Handle already existing data
            if (obsRep[obs.concept.uuid] && isArray(obsRep[obs.concept.uuid])) {
                obsRep[obs.concept.uuid].push(group);
            }
            else {
                obsRep[obs.concept.uuid] = [group];
            }
            return obsRep;
        }
        else {
            if (obs.value instanceof Object) {
                obsRep[obs.concept.uuid] = obs.value.uuid;
            }
            else {
                obsRep[obs.concept.uuid] = obs.value;
            }
            return obsRep;
        }
    }
    _augumentObs(existing, toAdd) {
        for (const key in toAdd) {
            if (has(existing, key)) {
                // check if not an array yet
                if (!isArray(existing[key])) {
                    const temp = existing[key];
                    existing[key] = [temp];
                }
                // Check whether the incoming is array (for group members)
                if (isArray(toAdd[key])) {
                    Array.prototype.push.apply(existing[key], toAdd[key]);
                }
                else {
                    existing[key].push(toAdd[key]);
                }
            }
            else {
                existing[key] = toAdd[key];
            }
        }
        return existing;
    }
};
HistoricalEncounterDataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], HistoricalEncounterDataService);

let HistoricalHelperService = class HistoricalHelperService {
    constructor() {
    }
    evaluate(expr, dataSources, additionalScopevalues) {
        const HD = new HistoricalEncounterDataService();
        HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
        const deps = {
            HD: HD
        };
        if (additionalScopevalues) {
            for (const o in additionalScopevalues) {
                if (additionalScopevalues[o]) {
                    deps[o] = additionalScopevalues[o];
                }
            }
        }
        const helper = new JsExpressionHelper();
        const control = new AfeFormControl();
        const runner = new ExpressionRunner();
        const runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
        return runnable.run();
    }
    evaluatePrecondition(expr, dataSources, historicalValue) {
        const additionalScope = {
            histValue: historicalValue
        };
        return this.evaluate(expr, dataSources, additionalScope);
    }
};
HistoricalHelperService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], HistoricalHelperService);

const moment$5 = moment_;
class QuestionFactory {
    constructor() {
        this.dataSources = {};
        this.historicalHelperService = new HistoricalHelperService();
    }
    createQuestionModel(formSchema, form) {
        if (form) {
            const dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    }
    toSelectQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        const options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toNumericQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toNumberQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        question.validators = this.addValidators(schemaQuestion);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toDateQuestion(schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        const question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = schemaQuestion.questionOptions.showTime;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toEncounterDatetimeQuestion(schemaQuestion) {
        const question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        question.showTime = true;
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toCheckBoxQuestion(schemaQuestion) {
        const question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map((obj) => {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        const mappings = {
            label: 'label',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toMultiCheckboxQuestion(schemaQuestion) {
        const question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.validators = this.addValidators(schemaQuestion);
        question.dataSource = new DummyDataSource();
        question.extras = schemaQuestion;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toTextAreaQuestion(schemaQuestion) {
        const question = new TextAreaInputQuestion({
            isExpanded: false, rows: 18,
            placeholder: '', type: '', key: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.isExpanded = schemaQuestion.isExpanded;
        question.rows = schemaQuestion.questionOptions.rows;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toTextQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toFileUploadQuestion(schemaQuestion) {
        const question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toDrugQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toProblemQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toConceptAnswerSelect(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toRepeatingQuestion(schemaQuestion) {
        const question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            const testOrder = this.toTestOrderQuestion(schemaQuestion);
            const orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toGroupQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toPageQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach(element => {
            question.questions.push(this.toSectionQuestion(element));
        });
        return question;
    }
    toFormQuestionModel(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach(element => {
            question.questions.push(this.toPageQuestion(element));
        });
        return question;
    }
    toSectionQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    }
    toPersonAttributeQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'personAttribute';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toEncounterProviderQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'provider';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toFieldSetQuestion(schemaQuestion) {
        const toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    }
    toEncounterLocationQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = schemaQuestion.type;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'location';
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    toTestOrderQuestion(schemaQuestion) {
        const question = new TestOrderQuestion({
            type: '', key: '', orderType: '', selectableOrders: [],
            orderSettingUuid: '', label: '', rendering: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.selectableOrders.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    }
    getSchemaQuestions(schema) {
        const listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    }
    getQuestions(schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (const property in schema) {
                if (schema.hasOwnProperty(property)) {
                    this.getQuestions(schema[property], foundArray);
                }
            }
        }
        if (schema && !Array.isArray(schema) && typeof schema === 'object') {
            if (schema.questionOptions) {
                if (schema.questionOptions.rendering === 'group' ||
                    schema.questionOptions.rendering === 'repeating') {
                    // schema.questions = this.getGroupMembers(schema.questions);
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
                else if (schema.questionOptions.rendering === 'field-set') {
                }
                else {
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
            }
            else {
                for (const o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    }
    getChildrenQuestionModels(schema) {
        const children = [];
        this.getQuestions(schema, children);
        return children;
    }
    toModel(schema, renderType) {
        if (renderType === 'ui-select-extended') {
            renderType = schema.type;
        }
        if (!schema.id) {
            schema['id'] = this.generateId(10);
        }
        if (schema.questionOptions &&
            (schema.questionOptions.showDate === true ||
                schema.questionOptions.showDate === 'true')) {
            schema = this.convertOldVersionComplexObsQuestionToNewVersion(schema);
            renderType = 'field-set';
        }
        switch (renderType) {
            case 'select':
                return this.toSelectQuestion(schema);
            case 'single-select':
                return this.toSelectQuestion(schema);
            case 'multi-select':
                return this.toSelectQuestion(schema);
            case 'numeric':
                return this.toNumericQuestion(schema);
            case 'number':
                return this.toNumberQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'date':
                return this.toDateQuestion(schema);
            case 'multiCheckbox':
                return this.toMultiCheckboxQuestion(schema);
            case 'drug':
                return this.toDrugQuestion(schema);
            case 'problem':
                return this.toProblemQuestion(schema);
            case 'group':
                return this.toGroupQuestion(schema);
            case 'field-set':
                return this.toFieldSetQuestion(schema);
            case 'repeating':
                return this.toRepeatingQuestion(schema);
            case 'personAttribute':
                return this.toPersonAttributeQuestion(schema);
            case 'text':
                return this.toTextQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'select-concept-answers':
                return this.toConceptAnswerSelect(schema);
            case 'encounterLocation':
                return this.toEncounterLocationQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'radio':
                return this.toCheckBoxQuestion(schema);
            case 'checkbox':
                return this.toCheckBoxQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'file':
                return this.toFileUploadQuestion(schema);
            default:
                console.warn('New Schema Question Type found.........' + renderType);
                return this.toTextQuestion(schema);
        }
    }
    convertOldVersionComplexObsQuestionToNewVersion(schemaQuestion) {
        const converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        const mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        const dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        const dateOptions = Object.assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    }
    copyProperties(mappings, source, destination) {
        for (const property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    }
    addValidators(schemaQuestion) {
        const validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            forEach(schemaQuestion.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        validators.push(new DateValidationModel(validator));
                        break;
                    case 'js_expression':
                        validators.push(new JsExpressionValidationModel(validator));
                        break;
                    case 'conditionalAnswered':
                        validators.push(new ConditionalValidationModel(validator));
                        break;
                    default:
                        validators.push(new ValidationModel(validator));
                        break;
                }
            });
        }
        const questionOptions = schemaQuestion.questionOptions;
        const renderingType = questionOptions ? questionOptions.rendering : '';
        switch (renderingType) {
            case 'number':
                if (questionOptions.max && questionOptions.min) {
                    validators.push(new MaxValidationModel({
                        type: 'max',
                        max: questionOptions.max
                    }));
                    validators.push(new MinValidationModel({
                        type: 'min',
                        min: questionOptions.min
                    }));
                }
                break;
            default:
                break;
        }
        // add conditional required validators
        if (typeof schemaQuestion.required === 'object') {
            const required = schemaQuestion.required;
            if (required.type === 'conditionalRequired') {
                validators.push(new ConditionalValidationModel({
                    referenceQuestionId: required.referenceQuestionId,
                    referenceQuestionAnswers: required.referenceQuestionAnswers,
                    type: required.type,
                    message: required.message,
                }));
            }
        }
        return validators;
    }
    addHistoricalExpressions(schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            const origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources, undefined);
            question.historicalDataValue = origValue;
            // console.info('historical value', origValue);
            // console.info('historical data question :::', question);
            // console.info('schema data question :::', schemaQuestion);
            if (schemaQuestion.historicalPrepopulateCondition && origValue) {
                const toPopulate = this.historicalHelperService.evaluatePrecondition(schemaQuestion.historicalPrepopulateCondition, this.dataSources, origValue);
                if (toPopulate) {
                    question.defaultValue = origValue.value;
                }
                return; // don't try to evaluate the other option
            }
            if (schemaQuestion.historicalPrepopulate && origValue) {
                // sample schema options for this branch
                // "historicalPrepopulate":true,
                // "allowedHistoricalValueAgeInDays": 40000,
                const valDate = moment$5(origValue.valueDate);
                const differenceInDays = moment$5().diff(valDate, 'days');
                if (Number.isInteger(schemaQuestion.allowedHistoricalValueAgeInDays)) {
                    if (differenceInDays <= schemaQuestion.allowedHistoricalValueAgeInDays) {
                        question.defaultValue = origValue.value;
                    }
                }
                else {
                    question.defaultValue = origValue.value;
                }
            }
        }
    }
    addCalculatorProperty(schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    }
    addAlertProperty(schemaQuestion, question) {
        if (schemaQuestion.alert) {
            question.alert = schemaQuestion.alert;
        }
        // if (typeof schemaQuestion.message === 'object') {
        //   if (schemaQuestion.message.alertWhenExpression) {
        //     question.message = schemaQuestion.message.alertWhenExpression;
        //   }
        // }
    }
    addDisableOrHideProperty(schemaQuestion, question) {
        if (!!schemaQuestion.disable) {
            question.disable = schemaQuestion.disable;
        }
        if (typeof schemaQuestion.disable === 'object') {
            question.disable = schemaQuestion.disable.disableWhenExpression;
        }
        if (!!schemaQuestion.hide) {
            question.hide = schemaQuestion.hide;
        }
        if (typeof schemaQuestion.hide === 'object') {
            if (schemaQuestion.hide.hideWhenExpression) {
                question.hide = schemaQuestion.hide.hideWhenExpression;
            }
        }
    }
    generateId(x) {
        let s = '_';
        while (s.length < x && x > 0) {
            const r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    }
}

let FormFactory = class FormFactory {
    constructor(controlService, questionFactroy, controlRelationsFactory) {
        this.controlService = controlService;
        this.questionFactroy = questionFactroy;
        this.controlRelationsFactory = controlRelationsFactory;
        this.hd = {
            getValue: () => {
                return 20;
            }
        };
    }
    createForm(schema, dataSource) {
        const form = new Form(schema, this, this.questionFactroy);
        if (dataSource) {
            for (const key in dataSource) {
                if (dataSource.hasOwnProperty(key)) {
                    form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                }
            }
        }
        const question = this.questionFactroy.createQuestionModel(schema, form);
        form.rootNode = this.createNode(question, null, null, form);
        this.buildRelations(form.rootNode);
        form.updateHiddenDisabledStateForAllControls();
        form.updateAlertsForAllControls();
        return form;
    }
    buildRelations(rootNode) {
        Validations.JSExpressionValidatorsEnabled = false;
        this.controlRelationsFactory.buildRelations(rootNode);
        // enable js expression validations
        Validations.JSExpressionValidatorsEnabled = true;
    }
    createNode(question, parentNode, parentControl, form) {
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
    createLeafNode(question, parentNode, parentControl, form) {
        const controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
    }
    createGroupNode(question, parentNode, parentControl, form) {
        const controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        const groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        this.createNodeChildren(question, groupNode, (controlModel || parentControl), form);
        return groupNode;
    }
    createArrayNode(question, parentNode, parentControl, form) {
        const controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
        const arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
        arrayNode.createChildFunc = this.createArrayNodeChild;
        arrayNode.removeChildFunc = this.removeArrayNodeChild;
        arrayNode.addChildNodeCreatedListener((node) => {
            Validations.JSExpressionValidatorsEnabled = false;
            this.controlRelationsFactory.buildArrayNodeRelations(node);
            Validations.JSExpressionValidatorsEnabled = true;
        });
        return arrayNode;
    }
    createNodeChildren(question, node, parentControl, form) {
        question.questions.forEach(element => {
            const child = this.createNode(element, node, parentControl, form);
            node.setChild(element.key, child);
        });
        return node.children;
    }
    createArrayNodeChild(question, node, factory) {
        if (factory === null || factory === undefined) {
            factory = this;
        }
        const groupQuestion = new QuestionGroup({
            key: node.path + '.' + node.children.length + '',
            type: 'group', extras: question.extras, label: '', questions: question.questions
        });
        if (question.controlType === AfeControlType.None) {
            groupQuestion.controlType = question.controlType;
        }
        const group = factory.createGroupNode(groupQuestion, null, null, node.form);
        node.children.push(group);
        if (node.control instanceof AfeFormArray) {
            const nodeControl = node.control;
            nodeControl.setControl(nodeControl.controls.length, group.control);
        }
        return group;
    }
    removeArrayNodeChild(index, node) {
        const nodeToRemove = node.children[index];
        node.children.splice(index, 1);
        if (node.control !== null || node.control !== undefined) {
            if (node.control instanceof AfeFormArray) {
                const control = node.control;
                const controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                if (controlIndexToRemove >= 0) {
                    control.removeAt(controlIndexToRemove);
                }
            }
        }
    }
};
FormFactory.ctorParameters = () => [
    { type: FormControlService },
    { type: QuestionFactory },
    { type: ControlRelationsFactory }
];
FormFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FormControlService,
        QuestionFactory, ControlRelationsFactory])
], FormFactory);

const moment$6 = moment_;
class ObsAdapterHelper {
    constructor() {
    }
    findObsAnswerToQuestion(node, obsArray) {
        const found = [];
        if (!this.isObsNode(node)) {
            return found;
        }
        if (node instanceof LeafNode ||
            (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs')) {
            each(obsArray, (item) => {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            });
            return found;
        }
        // At this point the node is either a group or a repeating node
        const childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
        if (childQuestionsUuids.length > 0) {
            each(obsArray, (obs) => {
                if (obs.concept &&
                    obs.concept.uuid === node.question.extras.questionOptions.concept &&
                    Array.isArray(obs.groupMembers) &&
                    this.isSubsetOf(childQuestionsUuids, this.getGroupMembersConceptUuids(obs))) {
                    found.push(obs);
                }
            });
        }
        return found;
    }
    getChildQuestionsConceptUuids(node) {
        const found = [];
        if (node.question.extras && node.question.extras.questions) {
            each(node.question.extras.questions, (question) => {
                if (question.questionOptions &&
                    question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            });
        }
        return found;
    }
    getGroupMembersConceptUuids(obsWithGroupMembers) {
        const found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            each(obsWithGroupMembers.groupMembers, (member) => {
                found.push(member.concept.uuid);
            });
        }
        return found;
    }
    isObsNode(node) {
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
    }
    isSubsetOf(supersetArray, subsetArray) {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every((element) => {
            return supersetArray.indexOf(element) >= 0;
        });
    }
    setSimpleObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const obsToUse = obs[0];
            // set initial value
            node.initialValue = obsToUse;
            if (!this.isEmpty(obsToUse.value) && obsToUse.value.uuid) {
                // answer to the obs is a concept, use uuid value
                this.setNodeFormControlValue(node, obsToUse.value.uuid);
            }
            else if (!this.isEmpty(obsToUse.value)) {
                this.setNodeFormControlValue(node, obsToUse.value);
            }
        }
    }
    setMultiselectObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            node.initialValue = obs;
            const obsUuids = [];
            for (const m of obs) {
                obsUuids.push(m.value.uuid);
            }
            this.setNodeFormControlValue(node, obsUuids);
        }
    }
    setComplexObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            let valueField; // essential memmber
            let dateField; // other member to be manipulated by user
            const nodeAsGroup = node;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }
                if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                    dateField = nodeAsGroup.children[o];
                }
            }
            // set the obs value here
            this.setNodeValue(valueField, obs);
            node.initialValue = valueField.initialValue;
            // set the date value here
            dateField.initialValue = valueField.initialValue;
            this.setNodeFormControlValue(dateField, valueField.initialValue.obsDatetime);
        }
    }
    setGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const groupNode = node;
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (const o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    }
    setRepeatingGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const arrayNode = node;
            arrayNode.initialValue = obs;
            for (let i = 0; i < obs.length; i++) {
                const createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    }
    setNodeValue(node, obs) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                const answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                const multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                const complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                const groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                const repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);
                if (repeatingGroupObs.length > 0) {
                    this.setRepeatingGroupObsNodeValue(node, repeatingGroupObs);
                }
                break;
            default:
                console.error('Unknown obs node', node);
                break;
        }
    }
    setNodeFormControlValue(node, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();
        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    }
    getObsNodeType(node) {
        if (this.isObsNode(node)) {
            if (node instanceof LeafNode &&
                (node.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                    node.question.extras.questionOptions.rendering === 'checkbox' ||
                    node.question.extras.questionOptions.rendering === 'multi-select')) {
                return 'multiselect';
            }
            if (node instanceof LeafNode) {
                return 'simple';
            }
            if (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs') {
                return 'complex';
            }
            if (node instanceof ArrayNode &&
                node.question.extras.type === 'obsGroup' &&
                node.question.extras.questionOptions.rendering === 'repeating') {
                return 'repeatingGroup';
            }
            if (node instanceof GroupNode &&
                node.question.extras.type === 'obsGroup') {
                return 'group';
            }
            return 'unknownObs';
        }
        return 'unknown';
    }
    // PAYLOAD GENERATION FUNCTIONS
    getSimpleObsPayload(node) {
        // check for empty values first
        if (this.isEmpty(node.control.value)) {
            if (node.initialValue) {
                // Handle case for existing voided obs
                return {
                    uuid: node.initialValue.uuid,
                    voided: true
                };
            }
            return null;
        }
        // check for exisiting, unchanged values
        if (node.initialValue && !this.simpleNodeValueChanged(node)) {
            return null;
        }
        // all numbers, text, concepts answers are handled in the same way
        // no need for further formatting in this case
        const obs = {
            concept: node.question.extras.questionOptions.concept,
            value: node.control.value
        };
        // handle date fields
        if (node.question.extras.questionOptions.rendering === 'date') {
            obs.value = this.toOpenMrsDateTimeString(node.control.value);
        }
        if (node.initialValue) {
            // for existing cases, delete concept property, and add uuid
            delete obs.concept;
            obs.uuid = node.initialValue.uuid;
        }
        return obs;
    }
    getComplexObsPayload(node) {
        let valueField; // essential memmber
        let dateField; // other member to be manipulated by user
        const nodeAsGroup = node;
        // tslint:disable-next-line:forin
        for (const o in nodeAsGroup.children) {
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        const valuePayload = this.getObsNodePayload(valueField);
        console.log('valuePayload', valuePayload);
        // set obs datetime for the generated payload
        if (valuePayload.length > 0) {
            valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
            return valuePayload[0];
        }
        else if (valuePayload.length === 0 && node.initialValue) {
            // determine if date changed
            if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                const payload = {
                    uuid: node.initialValue.uuid,
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    }
    getMultiselectObsPayload(node) {
        const payload = [];
        const existingUuids = [];
        // add voided obs i.e. deleted options
        if (Array.isArray(node.initialValue)) {
            each(node.initialValue, (item) => {
                existingUuids.push(item.value.uuid);
                if (Array.isArray(node.control.value)) {
                    if (node.control.value.indexOf(item.value.uuid) < 0) {
                        payload.push({
                            uuid: item.uuid,
                            voided: true
                        });
                    }
                }
                else {
                    // every value was deleted
                    payload.push({
                        uuid: item.uuid,
                        voided: true
                    });
                }
            });
        }
        // add new obs i.e they didn't exisit originally
        if (Array.isArray(node.control.value)) {
            each(node.control.value, (item) => {
                if (existingUuids.indexOf(item) < 0) {
                    payload.push({
                        concept: node.question.extras.questionOptions.concept,
                        value: item
                    });
                }
            });
        }
        return payload;
    }
    getGroupPayload(node) {
        const nodeAsGroup = node;
        let childrenPayload = [];
        each(nodeAsGroup.children, (child) => {
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        const groupPayload = {
            groupMembers: childrenPayload
        };
        if (nodeAsGroup.initialValue) {
            groupPayload.uuid = nodeAsGroup.initialValue.uuid;
        }
        else {
            groupPayload.concept = nodeAsGroup.question.extras.questionOptions.concept;
        }
        return groupPayload;
    }
    getRepeatingGroupPayload(node) {
        const nodeAsArray = node;
        let childrenPayload = [];
        const groupsUuidsAfterEditting = [];
        each(nodeAsArray.children, (child) => {
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
            if (child.initialValue && child.initialValue.uuid) {
                groupsUuidsAfterEditting.push(child.initialValue.uuid);
            }
        });
        // void deleted groups
        // console.log('groupsUuidsAfterEditting', groupsUuidsAfterEditting);
        if (nodeAsArray.initialValue && Array.isArray(nodeAsArray.initialValue)) {
            each(nodeAsArray.initialValue, (obs) => {
                if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                    const voidedGroup = {
                        uuid: obs.uuid,
                        voided: true
                    };
                    childrenPayload.push(voidedGroup);
                }
            });
        }
        if (childrenPayload.length <= 0) {
            return null;
        }
        return childrenPayload;
    }
    getObsNodePayload(node) {
        let payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        const groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        const arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                const simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                const multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                const complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                const groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                const repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                if (Array.isArray(repeatingGroupedObs) && repeatingGroupedObs.length > 0) {
                    payload = payload.concat(repeatingGroupedObs);
                }
                break;
            default:
                break;
        }
        return payload;
    }
    simpleNodeValueChanged(node) {
        if (node.initialValue) {
            if (node.initialValue.value && node.initialValue.value.uuid) {
                // question whose answer is a concept
                return node.control.value !== node.initialValue.value.uuid;
            }
            if (node.question.extras.questionOptions.rendering === 'date') {
                return !this.areDatesEqual(node.control.value, node.initialValue.value);
            }
            return node.control.value !== node.initialValue.value;
        }
        return false;
    }
    areDatesEqual(date1, date2) {
        return moment$6(date1).isSame(date2);
    }
    isEmpty(value) {
        if (value === '' ||
            value === null ||
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
            return true;
        }
        return false;
    }
    toOpenMrsDateTimeString(datetime) {
        if (this.isEmpty(datetime)) {
            return undefined;
        }
        else {
            // transform value to memoent value to avoid error
            const formattedVal = moment$6(datetime).format();
            const val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    }
}

let ObsValueAdapter = class ObsValueAdapter {
    constructor(helper) {
        this.helper = helper;
    }
    generateFormPayload(form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    }
    populateForm(form, payload) {
        this.helper.setNodeValue(form.rootNode, payload);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Extract set obs
        // this.setValues(questionNodes, payload);
    }
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    setValues(nodes, payload, forcegroup) {
        if (nodes) {
            for (const node of nodes) {
                if (node instanceof LeafNode) {
                    this.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    const groupObs = find(payload, (o) => {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }
                        this.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup && node.payload) {
                        this.setValues(node.groupMembers, node.payload.groupMembers);
                    }
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this.setComplexObsValue(node, payload);
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                }
                else {
                    throw new Error('not implemented');
                }
            }
        }
    }
    setObsValue(node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox' ||
            node.question.extras.questionOptions.rendering !== 'multi-select') {
            const obs = find(payload, (o) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (obs) {
                if (obs.value instanceof Object) {
                    node.control.setValue(obs.value.uuid);
                    node.control.updateValueAndValidity();
                }
                else {
                    node.control.setValue(obs.value);
                    node.control.updateValueAndValidity();
                }
                node['initialValue'] = { obsUuid: obs.uuid, value: obs.value };
            }
        }
        else {
            const multiObs = filter(payload, (o) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    }
    setComplexObsValue(node, payload) {
        let valueField;
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
            if (node.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (node.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        // set the usual obs value
        this.setObsValue(valueField, payload);
        // set the obs date
        const obs = find(payload, (o) => {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            dateField.control.setValue(obs.obsDatetime);
            dateField.control.updateValueAndValidity();
        }
    }
    getMultiselectValues(multiObs) {
        const values = [];
        for (const m of multiObs) {
            values.push(m.value.uuid);
        }
        return values;
    }
    setRepeatingGroupValues(node, payload) {
        const groupRepeatingObs = filter(payload, (o) => {
            const found = o.concept.uuid === node.question.extras.questionOptions.concept;
            let intersect = false;
            if (found && o.groupMembers) {
                const obs = o.groupMembers.map((a) => {
                    return a.concept.uuid;
                });
                const schemaQuestions = node.question.questions.map((a) => {
                    return a.extras.questionOptions.concept;
                });
                intersect = (intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (let i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        const groups = [];
        let index = 0;
        for (const child of node.node.children) {
            const children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            const groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        }
        this.setValues(groups, groupRepeatingObs, true);
    }
    getQuestionNodes(pages) {
        const merged = [];
        const arrays = [];
        for (const page of pages) {
            for (const section of page.page) {
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    }
    repeatingGroup(nodes) {
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }
    processGroup(obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            const members = filter(this.getObsPayload(obs.groupMembers), (o) => {
                return o.value !== '';
            });
            const mappedMembers = members.map((a) => {
                return a.voided;
            });
            if (members.length > 0 && mappedMembers.every(Boolean)) {
                obsPayload.push({
                    uuid: obs.node.initialValue.uuid,
                    voided: true
                });
            }
            else if (members.length > 0) {
                if (obs.node.initialValue) {
                    obsPayload.push({
                        uuid: obs.node.initialValue.uuid,
                        groupMembers: members
                    });
                }
                else {
                    obsPayload.push({
                        concept: obs.question.extras.questionOptions.concept,
                        groupMembers: members
                    });
                }
            }
        }
    }
    mapInitialGroup(group) {
        let current = {};
        for (const member of group.groupMembers) {
            let value = '';
            if (member.value instanceof Object) {
                value = member.value.uuid;
            }
            else if (member.value) {
                value = member.value;
            }
            else if (member.groupMembers && member.groupMembers.length > 0) {
                current = this.mapInitialGroup(group);
            }
            current[member.concept.uuid + ':' + value] = value;
        }
        return current;
    }
    mapModelGroup(node, value) {
        const current = {};
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const groupQuestion = find(node.question.questions, { key: key });
                const modelValue = value[key];
                if (modelValue instanceof Object) {
                }
                else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }
        }
        return current;
    }
    processRepeatingGroups(node, obsPayload) {
        const initialValues = [];
        if (node.node.initialValue) {
            for (const group of node.node.initialValue) {
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        const repeatingModel = [];
        for (const value of node.node.control.value) {
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        const deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        const newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        const groupConcept = node.question.extras.questionOptions.concept;
        let newObsPayload = [];
        if (deleted.length > 0) {
            const deletedObs = this.createGroupDeletedObs(deleted);
            for (const d of deletedObs) {
                obsPayload.push(d);
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
        }
        else {
            newObsPayload = this.createGroupNewObs(newObs, groupConcept);
        }
        if (newObsPayload.length > 0) {
            for (const p of newObsPayload) {
                obsPayload.push(p);
            }
        }
    }
    leftOuterJoinArrays(first, second) {
        const unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    }
    createGroupNewObs(payload, groupConcept) {
        const newPayload = [];
        for (const obs of payload) {
            const groupPayload = [];
            /* tslint:disable */
            for (let key in obs.value) {
                let concept = key.split(':')[0];
                let value = key.split(':')[1];
                groupPayload.push({ concept: concept, value: value });
            }
            newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
            /* tslint:enable */
        }
        return newPayload;
    }
    createGroupDeletedObs(payload) {
        const deletedObs = [];
        for (const d of payload) {
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    }
    getExactTime(datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    }
    processObs(obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            const obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox' ||
                obs.question.extras.questionOptions.rendering === 'multi-select') {
                const multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    const mappedInitial = obs.initialValue.map((a) => {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    const mappedCurrent = multis.map((a) => {
                        return { value: a };
                    });
                    const deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    const newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
                    this.processDeletedMultiSelectObs(deletedObs, obsPayload);
                    this.processNewMultiSelectObs(newObs, obsPayload);
                }
                else {
                    this.processNewMultiSelectObs(multis, obsPayload);
                }
            }
            else {
                if (obs.initialValue && obs.initialValue.value && obsValue) {
                    this.updateOrVoidObs(obsValue, obs.initialValue, obsPayload);
                }
                else if (obsValue.value !== '' && obsValue.value !== null) {
                    obsPayload.push(obsValue);
                }
            }
        }
    }
    processComplexObs(node, obsPayload) {
        let valueField;
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
            if (node.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (node.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        if (valueField) {
            // process obs as usual
            this.processObs(valueField, obsPayload);
            // obtain the last inserted obs and set the obsDatetime
            const createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    }
    processDeletedMultiSelectObs(values, obsPayload) {
        for (const value of values) {
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    }
    processNewMultiSelectObs(values, obsPayload) {
        for (const multi of values) {
            if (multi.value instanceof Object) {
                obsPayload.push(multi.value);
            }
            else {
                obsPayload.push(multi);
            }
        }
    }
    updateOrVoidObs(obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    }
    isEmpty(value) {
        if (value === '' ||
            value === null ||
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
            return true;
        }
        return false;
    }
    traverse(o, type) {
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page, label: o.children[key].question.label });
                                break;
                            case 'section':
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section, node: o.children[key], label: o.children[key].question.label });
                                break;
                            case 'group':
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                const rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;
                        }
                    }
                }
            }
        }
        return questions;
    }
    processMultiSelect(concept, values) {
        const multiSelectObs = [];
        if (values && values !== null) {
            for (const value of values) {
                const obs = {
                    concept: concept,
                    value: value
                };
                multiSelectObs.push(obs);
            }
        }
        return multiSelectObs;
    }
    isObs(node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    }
    getObsPayload(nodes) {
        const obsPayload = [];
        for (const node of nodes) {
            if (this.isObs(node)) {
                if (node.groupMembers, node.question.extras.questionOptions.rendering === 'group') {
                    this.processGroup(node, obsPayload);
                }
                else if (node.groupMembers, node.question.extras.questionOptions.rendering === 'repeating') {
                    this.processRepeatingGroups(node, obsPayload);
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this.processComplexObs(node, obsPayload);
                }
                else {
                    this.processObs(node, obsPayload);
                }
            }
        }
        return obsPayload;
    }
};
ObsValueAdapter.ctorParameters = () => [
    { type: ObsAdapterHelper }
];
ObsValueAdapter = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ObsAdapterHelper])
], ObsValueAdapter);

let OrderValueAdapter = class OrderValueAdapter {
    constructor() {
        this.formOrderNodes = [];
        this.provider = '';
    }
    generateFormPayload(form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    }
    populateForm(form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        const existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }
    _setOrderProvider(form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }
    _createOrdersPayload(orderNodes, form) {
        const payload = [];
        const selectedOrders = [];
        let deletedOrders = [];
        const existingOrders = this._getExistingOrders(form);
        for (const orderNode of orderNodes) {
            const orderNodeValues = orderNode.control.value;
            const orders = [];
            if (existingOrders) {
                existingOrders.map(function (obj) {
                    orders[obj.concept] = obj.concept;
                });
            }
            for (const order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    const orderValue = orderNodeValues[order][orderNode.question.key];
                    const payloadOrder = this._createPayloadOrder(orderValue, orderNode.question.extras);
                    if (orders[orderValue] !== orderValue && payloadOrder.concept !== '') {
                        payload.push(payloadOrder);
                    }
                    selectedOrders[orderValue] = orderValue;
                    if (payloadOrder.orderNumber === '') {
                        delete payloadOrder.orderNumber;
                    }
                    if (payloadOrder.uuid === '') {
                        delete payloadOrder.uuid;
                    }
                }
            }
        }
        deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
        return this._addDeletedOrdersToPayload(deletedOrders, payload);
    }
    _getExistingOrders(form) {
        if (form.existingOrders && form.existingOrders.orders) {
            let existingOrders = form.existingOrders.orders.map((o) => {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            });
            return existingOrders = filter(existingOrders, (order) => {
                if (order.voided === true || order.dateVoided) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        else {
            return;
        }
    }
    _setOrderValues(node, existingOrders) {
        this._findTestOrderQuestionNodes(node);
        const orderNodes = this.formOrderNodes;
        for (const orderNode of orderNodes) {
            this._setOrderNodeValues(orderNode, existingOrders);
        }
    }
    _addDeletedOrdersToPayload(deletedOrders, payload) {
        for (const order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    }
    _createPayloadOrder(orderConcept, quesitonExtras) {
        const order = {
            concept: '',
            type: '',
            orderer: '',
            careSetting: ''
        };
        order.concept = orderConcept;
        order.type = quesitonExtras.questionOptions.orderType;
        order.orderer = this.provider;
        order.careSetting = quesitonExtras.questionOptions.orderSettingUuid;
        // delete orderer if provider not provided
        if (order.orderer === '') {
            delete order.orderer;
        }
        return order;
    }
    _getDeletedOrders(selectedOrders, existingOrders) {
        const deleteOrders = [];
        if (selectedOrders) {
            for (const order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    const existingOrderConcept = existingOrders[order].concept;
                    const selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        // console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }
    _setOrderNodeValues(node, orders) {
        let index = 0;
        node['initialValue'] = orders;
        for (const order of orders) {
            node.createChildNode();
            const value = {};
            value[node.question.key] = order.concept;
            const childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
            childNode['orderNumber'] = order.orderNumber;
            // console.log('Set Value', node.children[index].control.value, node, childNode);
            index++;
        }
    }
    _findTestOrderQuestionNodes(formNode) {
        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (const key in formNode.children) {
                    if (formNode.children.hasOwnProperty(key)) {
                        switch (formNode.children[key].question.renderingType) {
                            case 'page':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'section':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'group':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'repeating':
                                if (formNode.children) {
                                    // tslint:disable-next-line:forin
                                    for (const node in formNode.children) {
                                        const question = formNode.children[node].question;
                                        if (question.extras && question.extras.type === 'testOrder') {
                                            this.formOrderNodes.push(formNode.children[node]);
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
};
OrderValueAdapter = __decorate([
    Injectable()
], OrderValueAdapter);

const moment$7 = moment_;
let EncounterAdapter = class EncounterAdapter {
    constructor(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    populateForm(form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    }
    populateNode(rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }
        const nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(node => {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        // console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment$7(payload['encounterDatetime']).toDate());
                        node.initialValue = moment$7(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) && payload['encounterProviders'].length > 0) {
                        const firstProvider = payload['encounterProviders'][0].provider;
                        if (firstProvider && firstProvider.uuid) {
                            // Very weird work around for an issue with setting the value
                            node.control.setValue(firstProvider.uuid);
                            setTimeout(() => {
                                node.control.setValue(firstProvider.uuid);
                            });
                            node.initialValue = firstProvider.uuid;
                        }
                    }
                    break;
                case 'encounterLocation':
                    if (payload['location'] && payload['location'].uuid) {
                        node.control.setValue(payload['location'].uuid);
                        node.initialValue = payload['location'].uuid;
                    }
                    break;
                default:
                    break;
            }
        });
    }
    generateFormPayload(form) {
        const payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    }
    generateNodePayload(rootNode) {
        const nodes = this.getEncounterNodes(rootNode);
        const payload = {};
        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        const dateValue = moment$7(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            const providers = [];
                            providers.push({
                                provider: node.control.value,
                                encounterRole: 'a0b03050-c99b-11e0-9572-0800200c9a66' // unknown provider role in the encounter as default
                            });
                            payload['encounterProviders'] = providers;
                        }
                        break;
                    case 'encounterLocation':
                        payload['location'] = node.control.value;
                        break;
                    default:
                        break;
                }
            }
        });
        return payload;
    }
    getEncounterNodes(rootNode) {
        const results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    }
    setNonFilledPayloadMembers(form, payload) {
        if (form.valueProcessingInfo.patientUuid) {
            this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
        }
        if (form.valueProcessingInfo.visitUuid) {
            this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
        }
        if (form.valueProcessingInfo.encounterTypeUuid) {
            this.setPayloadEncounterTypeUuid(payload, form.valueProcessingInfo.encounterTypeUuid);
        }
        if (form.valueProcessingInfo.formUuid) {
            this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
        }
        if (form.valueProcessingInfo.encounterUuid) {
            this.setPayloadEncounterUuid(payload, form.valueProcessingInfo.encounterUuid);
        }
    }
    setPayloadPatientUuid(payload, patientUuid) {
        payload['patient'] = patientUuid;
    }
    setPayloadVisitUuid(payload, visitUuid) {
        payload['visit'] = visitUuid;
    }
    setPayloadEncounterTypeUuid(payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    }
    setPayloadFormUuid(payload, formUuid) {
        payload['form'] = formUuid;
    }
    setPayloadEncounterUuid(payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    }
    _getEncounterNodes(rootNode, array) {
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const node = rootNode;
            // tslint:disable-next-line:forin
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            const node = rootNode;
            node.children.forEach(child => {
                this._getEncounterNodes(child, array);
            });
        }
    }
    _isEncounterNode(node) {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    }
};
EncounterAdapter.ctorParameters = () => [
    { type: OrderValueAdapter },
    { type: ObsValueAdapter }
];
EncounterAdapter = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [OrderValueAdapter, ObsValueAdapter])
], EncounterAdapter);

let PersonAttribuAdapter = class PersonAttribuAdapter {
    constructor() { }
    generateFormPayload(form) {
        return this.generateNodePayload(form.rootNode);
    }
    generateNodePayload(rootNode) {
        const nodes = this.getPersonAttributeNodes(rootNode);
        const payload = [];
        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '' &&
                node.initialValue !== node.control.value) {
                if (node.question.extras.questionOptions.isSimpleValue === true) {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        value: node.control.value
                    });
                }
                else {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        hydratedObject: node.control.value
                    });
                }
            }
        });
        return payload;
    }
    populateForm(form, payload) {
        this.populateNode(form.rootNode, payload);
    }
    populateNode(rootNode, payload) {
        if (!Array.isArray(payload)) {
            throw new Error('Expected an array of attributes');
        }
        const nodes = this.getPersonAttributeNodes(rootNode);
        nodes.forEach(node => {
            payload.forEach(element => {
                if (element.attributeType.uuid
                    === node.question.extras.questionOptions.attributeType) {
                    if (element.value.uuid) {
                        node.control.setValue(element.value.uuid);
                        node.initialValue = element.value.uuid;
                    }
                    else {
                        node.control.setValue(element.value);
                        node.initialValue = element.value;
                    }
                }
            });
        });
    }
    getPersonAttributeNodes(rootNode) {
        const results = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    }
    _getPersonAttributesNodes(rootNode, array) {
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const node = rootNode;
            // tslint:disable-next-line:forin
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            const node = rootNode;
            node.children.forEach(child => {
                this._getPersonAttributesNodes(child, array);
            });
        }
    }
};
PersonAttribuAdapter = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PersonAttribuAdapter);

var RemoteSelectComponent_1;
let RemoteSelectComponent = RemoteSelectComponent_1 = class RemoteSelectComponent {
    constructor(renderer) {
        this.renderer = renderer;
        // @Input() dataSource: DataSource;
        this.placeholder = 'Search...';
        this.items = [];
        this.value = [];
        this.loading = false;
        this.searchText = '';
        this.notFoundMsg = 'match no found';
        this.done = new EventEmitter();
        this.characters = [];
        // the method set in registerOnChange, it is just
        // a placeholder for a method that takes one parameter,
        // we use it to emit changes back to the form
        this.propagateChange = (change) => { };
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
        if (this._dataSource && this._dataSource.dataFromSourceChanged) {
            this.subscribeToDataSourceDataChanges();
        }
    }
    ngOnInit() {
    }
    subscribeToDataSourceDataChanges() {
        this._dataSource.dataFromSourceChanged.subscribe((results) => {
            if (results.length > 0) {
                this.items = results;
                this.notFoundMsg = '';
                // console.log('updating items', results, this.selectC.value);
                this.restoreSelectedValue(this.selectC.value, results);
            }
            else {
                this.notFoundMsg = 'Not found';
                this.items = [];
            }
        });
    }
    typed(value) {
        this.search(value);
    }
    search(value) {
        if (this.dataSource) {
            this.searchText = value;
            this.notFoundMsg = 'Loading.........';
            this.dataSource.searchOptions(value)
                .subscribe((result) => {
                if (result.length > 0) {
                    const existing = map(this.value, clone);
                    const concat = existing.concat(result);
                    this.items = uniqBy(concat, 'value');
                }
                this.notFoundMsg = '';
            }, (error) => {
                this.notFoundMsg = 'Errored';
            });
        }
    }
    restoreSelectedValue(value, results) {
        let found = false;
        each(results, (item) => {
            if (item.value === value) {
                setTimeout(() => {
                    this.selectC.select(value);
                    this.selectC.value = value;
                });
                found = true;
            }
        });
        if (!found) {
            // console.log('not found after loading items', value, results);
            setTimeout(() => {
                this.selectC.select('');
                this.selectC.value = '';
            });
        }
    }
    canSearch(searchText) {
        return (searchText.length - this.searchText.length >= 2 ||
            (searchText.length - this.searchText.length <= 2 && searchText !== '')) && this.loading === false;
    }
    // this is the initial value set to the component
    writeValue(value) {
        if (value && value !== '') {
            if (this.dataSource) {
                this.loading = true;
                this.dataSource.resolveSelectedValue(value).subscribe((result) => {
                    this.items = [result];
                    setTimeout(() => {
                        this.selectC.select(result.value);
                        this.selectC.value = result.value;
                    });
                    this.loading = false;
                }, (error) => {
                    this.loading = false;
                });
            }
        }
    }
    // registers 'fn' that will be fired when changes are made
    // this is how we emit the changes back to the form
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    // not used, used for touch input
    registerOnTouched() { }
    // change events from the textarea
    onChange(event) {
        this.propagateChange(event.id);
        // .....
        // update the form
        // this.propagateChange(this.data);
    }
    removed(event) {
        console.log('Removed');
        this.propagateChange('');
    }
    selected(event) {
        this.propagateChange(event.value);
    }
};
RemoteSelectComponent.ctorParameters = () => [
    { type: Renderer2 }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], RemoteSelectComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RemoteSelectComponent.prototype, "componentID", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], RemoteSelectComponent.prototype, "done", void 0);
__decorate([
    ViewChild(SelectComponent, { static: false }),
    __metadata("design:type", SelectComponent)
], RemoteSelectComponent.prototype, "selectC", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RemoteSelectComponent.prototype, "dataSource", null);
RemoteSelectComponent = RemoteSelectComponent_1 = __decorate([
    Component({
        selector: 'remote-select',
        template: "<div>\n    <ng-select [id]=\"componentID\" [noFilter]=\"0\" (selected)=\"selected($event)\" (deselected)=\"removed($event)\" [options]=\"items\" [allowClear]=\"true\"\n        [placeholder]=\"placeholder\" [notFoundMsg]=\"notFoundMsg\" (typed)=\"typed($event)\" tabindex=\"0\">\n    </ng-select>\n    <div *ngIf=\"loading\">\n        resolving....\n    </div>\n</div>\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => RemoteSelectComponent_1),
                multi: true,
            }
        ]
    }),
    __metadata("design:paramtypes", [Renderer2])
], RemoteSelectComponent);

let RemoteSelectModule = class RemoteSelectModule {
};
RemoteSelectModule = __decorate([
    NgModule({
        imports: [CommonModule, SelectModule, FormsModule],
        exports: [RemoteSelectComponent],
        declarations: [RemoteSelectComponent],
        providers: [],
    })
], RemoteSelectModule);

const moment$8 = moment_;
let AppointmentsOverviewComponent = class AppointmentsOverviewComponent {
    constructor() {
        this.showAppointments = false;
        this.loadingAppointments = false;
        this.errorLoadingAppointments = false;
        this.appointmentsLoaded = false;
        this.appointments = [];
        this.today = '';
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this.node.control.valueChanges.subscribe((v) => {
            this.resetProperties();
            const node = this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!this.showAppointments) {
                    this.loadingAppointments = true;
                    this.showAppointments = true;
                    let dataSource;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    const locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        const startDate = moment$8(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        const endDate = moment$8(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        this.today = moment$8(v).format('DD-MM-YYYY');
                        // create 5 week days
                        const _data = [];
                        const programTypes = ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                            '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                            '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838'];
                        const programTypeParams = programTypes.join();
                        for (let i = 1; i <= 5; i++) {
                            _data.push({
                                date: moment$8(v).startOf('week').add(i, 'day').format('DD-MM-YYYY'),
                                count: 0
                            });
                        }
                        dataSource.getMonthlySchedule({
                            startDate: startDate,
                            endDate: endDate,
                            limit: 5,
                            locationUuids: locationUuid,
                            programType: programTypeParams
                        }).subscribe((data) => {
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
                            _data.map((appointment, index) => {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            });
                            this.appointments = _data;
                        }, (error) => {
                            this.loadingAppointments = false;
                            this.errorLoadingAppointments = true;
                            this.showAppointments = false;
                            console.error(error);
                        });
                    }
                    else {
                        this.showAppointments = false;
                        this.errorLoadingAppointments = true;
                    }
                }
            }
        });
    }
    resetProperties() {
        this.loadingAppointments = false;
        this.appointmentsLoaded = false;
        this.errorLoadingAppointments = false;
        this.showAppointments = false;
        this.appointments = [];
        this.today = '';
    }
};
__decorate([
    Input(),
    __metadata("design:type", LeafNode)
], AppointmentsOverviewComponent.prototype, "node", void 0);
AppointmentsOverviewComponent = __decorate([
    Component({
        selector: 'appointments-overview',
        template: "<div *ngIf=\"showAppointments\" class=\"appointments\">\n  <p *ngIf=\"loadingAppointments\">\n    <span *ngIf=\"!appointmentsLoaded && errorLoadingAppointments\">Error checking appointments</span>\n    <span *ngIf=\"loadingAppointments\"><span\n      class=\"fa fa-spinner fa-spin\"></span>Checking appointments...</span>\n  </p>\n  <div *ngIf=\"appointmentsLoaded && !errorLoadingAppointments\">\n    <table *ngIf=\"appointments.length>0\" class=\"table table-stripped table-bordered\">\n      <thead>\n      <tr>\n        <th *ngFor=\"let appointment of appointments\" [ngClass]=\"{'active': appointment.date === today}\">\n          <span>{{appointment.date}}</span>\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{'active': appointment.date === today}\">\n          <span><strong><em>{{appointment.count}}</em></strong></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n",
        styles: [".appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}"]
    }),
    __metadata("design:paramtypes", [])
], AppointmentsOverviewComponent);

const comma = ', ';
const newLine = '\n';
let EncounterViewerService = class EncounterViewerService {
    constructor() { }
    resolveSelectedValue(value) {
        return;
    }
    searchOptions(searchText) {
        return;
    }
    fileUpload(data) {
        return;
    }
    fetchFile(url) {
        return;
    }
    resolveSelectedValueFromSchema(answerUuid, schema) {
        let label;
        if (schema.pages) {
            forEach(schema.pages, (page) => {
                const l = this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            forEach(schema.sections, (section) => {
                const l = this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            forEach(schema.questions, (question) => {
                if (question.questions) {
                    const l = this.resolveSelectedValueFromSchema(answerUuid, question);
                    if (l) {
                        label = l;
                    }
                }
                else {
                    if (question.questionOptions.answers) {
                        forEach(question.questionOptions.answers, (answer) => {
                            if (answer.concept === answerUuid) {
                                label = answer.label;
                            }
                        });
                    }
                    else if (question.questionOptions.selectableOrders) {
                        forEach(question.questionOptions.selectableOrders, (order) => {
                            if (order.concept === answerUuid) {
                                label = order.label;
                            }
                        });
                    }
                }
            });
        }
        return label;
    }
    hasAnswer(node) {
        let answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    }
    questionsAnswered(node, answered) {
        const $answered = answered || [];
        if (node.question.renderingType === 'page') {
            forEach(node.children, (childNode) => {
                this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            forEach(node.children, (childNode) => {
                if (childNode.question.renderingType === 'group') {
                    forEach(childNode.children, (child) => {
                        const ans = this.questionsAnswered(child, $answered);
                        if (ans) {
                            $answered.push(ans);
                        }
                    });
                }
                else if (this.hasAnswer(childNode)) {
                    $answered.push(true);
                }
            });
        }
        else {
            return this.hasAnswer(node);
        }
        if ($answered.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    isDate(val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    convertTime(unixTimestamp) {
        const a = new Date(unixTimestamp);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const suffix = hour < 12 ? 'AM' : 'PM';
        let time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        }
        else {
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;
    }
};
EncounterViewerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EncounterViewerService);

let EncounterViewerComponent = class EncounterViewerComponent {
    constructor(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    set node(rootNode) {
        this.rootNode = rootNode;
    }
    set schema(schema) {
        this._schema = schema;
    }
    set encounter(enc) {
        this.enc = enc;
    }
    set form(form) {
        this.rootNode = form.rootNode;
        this._schema = form.schema;
        console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
    }
    getQuestionNodes(pages) {
        const merged = [];
        const arrays = [];
        for (const page of pages) {
            arrays.push(page.page);
        }
        return merged.concat.apply([], arrays);
    }
    ngOnInit() {
        if (this.rootNode) {
        }
        if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'file') {
            this.fileDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'remote-select') {
            this.remoteDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else {
            this.customDataSource = this.encounterViewerService;
        }
    }
    questionsAnswered(node) {
        const $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    }
    questionAnswered(node) {
        const answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    }
    checkForColon(questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    traverse(o, type) {
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                const rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;
                        }
                    }
                }
            }
            else {
                console.log('Console.log', o);
            }
        }
        return questions;
    }
    repeatingGroup(nodes) {
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }
};
EncounterViewerComponent.ctorParameters = () => [
    { type: EncounterViewerService },
    { type: DataSources }
];
__decorate([
    Input(),
    __metadata("design:type", AfeFormGroup)
], EncounterViewerComponent.prototype, "parentGroup", void 0);
__decorate([
    Input(),
    __metadata("design:type", EncounterViewerComponent)
], EncounterViewerComponent.prototype, "parentComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", NodeBase),
    __metadata("design:paramtypes", [NodeBase])
], EncounterViewerComponent.prototype, "node", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EncounterViewerComponent.prototype, "schema", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EncounterViewerComponent.prototype, "encounter", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EncounterViewerComponent.prototype, "form", null);
EncounterViewerComponent = __decorate([
    Component({
        selector: 'encounter-viewer',
        template: "<div class=\"viewer\">\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
        styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
    }),
    __metadata("design:paramtypes", [EncounterViewerService,
        DataSources])
], EncounterViewerComponent);

let EncounterContainerComponent = class EncounterContainerComponent {
    constructor(encAdapter) {
        this.encAdapter = encAdapter;
    }
    set form(form) {
        this.$form = form;
    }
    set encounter(enc) {
        this.$enc = enc;
    }
    ngOnInit() {
    }
    displayPdf() {
        console.warn('Functionality removed from this repository during angular 8 upgrade!');
    }
};
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter }
];
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EncounterContainerComponent.prototype, "form", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], EncounterContainerComponent.prototype, "encounter", null);
EncounterContainerComponent = __decorate([
    Component({
        selector: 'encounter-renderer',
        template: "<a type=\"button\" style=\"display: block; font-size: 28px; cursor: pointer\" class=\"text-right\" (click)=\"displayPdf()\">\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>",
        styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
    }),
    __metadata("design:paramtypes", [EncounterAdapter])
], EncounterContainerComponent);

let QuestionControlComponent = class QuestionControlComponent {
    constructor() {
        // The internal data model
        this.innerValue = '';
    }
    set schema(schema) {
        this._schema = schema;
    }
    set value(value) {
        this._value = value;
    }
    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }
    ngOnInit() {
        this.writeValue(this._value);
    }
    isUuid(value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Current time string.
    writeValue(v, arrayElement) {
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    const val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                    if (val) {
                        this.innerValue = val.toUpperCase();
                    }
                    else {
                        this.innerValue = v;
                    }
                }
                else {
                    return this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                }
            }
            else if (isArray(v)) {
                const arr = [];
                forEach(v, (el) => {
                    arr.push(this.writeValue(el, true));
                });
                this.innerValue = arr;
            }
            else if (this.isDate(v)) {
                if (!arrayElement) {
                    this.innerValue = this._dataSource.convertTime(v);
                }
                else {
                    return this._dataSource.convertTime(v);
                }
            }
            else {
                if (!arrayElement) {
                    this.innerValue = v;
                }
                else {
                    return v;
                }
            }
        }
    }
    isDate(str) {
        return this._dataSource.isDate(str) && !isNumber(str);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "schema", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], QuestionControlComponent.prototype, "dataSource", null);
QuestionControlComponent = __decorate([
    Component({
        selector: 'question-control',
        template: "<div>\n    {{innerValue}}\n</div>",
        styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"]
    }),
    __metadata("design:paramtypes", [])
], QuestionControlComponent);

var FilePreviewComponent_1;
const noop = () => { };
const ɵ0 = noop;
let FilePreviewComponent = FilePreviewComponent_1 = class FilePreviewComponent {
    constructor(encounterService) {
        this.encounterService = encounterService;
        this.fileUuid = null;
        this.resultsIsPdf = false;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
    }
    ngOnInit() { }
    // get accessor
    get value() {
        return this.fileUuid;
    }
    // set accessor including call the onchange callback
    set value(v) {
        if (v !== this.fileUuid) {
            this.fileUuid = v;
        }
    }
    // Current time string.
    writeValue(v) {
        if (v !== this.fileUuid) {
            this.fileUuid = v;
            this.checkFileType();
        }
    }
    checkFileType() {
        const re = /pdf/gi;
        if (this.fileUuid.search(re) !== -1) {
            this.resultsIsPdf = true;
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    onBlur() {
        this.onTouchedCallback();
    }
    onChange(event) {
        // const files = event.srcElement.files;
        // const fileToLoad = files[0];
        // const fileReader = new FileReader();
        // fileReader.onload = (fileLoadedEvent) => {
        //   const data = fileReader.result;
        //   const fileType = data.substring('data:image/'.length, data.indexOf(';base64'));
        //   const payload = {
        //     data,
        //     extension: fileType
        //   };
        // };
        // fileReader.readAsDataURL(fileToLoad);
    }
    getUrl() {
        this.dataSource.fetchFile(this.fileUuid, 'pdf').subscribe((file) => {
            window.open(file.changingThisBreaksApplicationSecurity, '_blank');
        });
    }
};
FilePreviewComponent.ctorParameters = () => [
    { type: EncounterViewerService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FilePreviewComponent.prototype, "source", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FilePreviewComponent.prototype, "dataSource", null);
FilePreviewComponent = FilePreviewComponent_1 = __decorate([
    Component({
        selector: 'file-preview',
        template: `<div *ngIf="fileUuid">
              <img *ngIf="!resultsIsPdf" class="img-responsive"
                [src]="fileUuid | secure:this._dataSource.fetchFile" alt="image" />
                </div>
                <a *ngIf="resultsIsPdf" (click)="getUrl()" style="cursor: pointer"><u>Open PDF</u></a>
                `,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FilePreviewComponent_1),
                multi: true
            }
        ],
        styles: [``]
    }),
    __metadata("design:paramtypes", [EncounterViewerService])
], FilePreviewComponent);

var RemoteAnswerComponent_1;
const noop$1 = () => { };
const ɵ0$1 = noop$1;
let RemoteAnswerComponent = RemoteAnswerComponent_1 = class RemoteAnswerComponent {
    constructor() {
        this.innerValue = null;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(v) {
        this._dataSource = v;
    }
    // get accessor
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    // Current time string.
    writeValue(v) {
        if (v !== this.innerValue) {
            if (this._dataSource) {
                this._dataSource.resolveSelectedValue(v).subscribe((ans) => {
                    this.innerValue = ans.label;
                });
            }
            else {
                this.innerValue = v;
            }
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    onBlur() {
        this.onTouchedCallback();
    }
    onChange(event) {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RemoteAnswerComponent.prototype, "source", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RemoteAnswerComponent.prototype, "dataSource", null);
RemoteAnswerComponent = RemoteAnswerComponent_1 = __decorate([
    Component({
        selector: 'remote-answer',
        template: `
    <div *ngIf="innerValue">
      {{innerValue}}
      </div>
`,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => RemoteAnswerComponent_1),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], RemoteAnswerComponent);

let EncounterViewerModule = class EncounterViewerModule {
};
EncounterViewerModule = __decorate([
    NgModule({
        declarations: [
            EncounterViewerComponent,
            EncounterContainerComponent,
            QuestionControlComponent,
            FilePreviewComponent,
            RemoteAnswerComponent
        ],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            // HttpModule,
            SharedModule
        ],
        providers: [
            EncounterViewerService
        ],
        exports: [
            EncounterContainerComponent
            // HttpModule
        ],
    })
], EncounterViewerModule);

var CheckboxControlComponent_1;
let CheckboxControlComponent = CheckboxControlComponent_1 = class CheckboxControlComponent {
    constructor() {
        this._value = [];
        this.onChange = (change) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.options = this.options.map((option) => {
            if (this.selected.indexOf(option.value) !== -1) {
                Object.assign(option, { checked: true });
            }
            return option;
        });
    }
    ngAfterViewInit() { }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    get value() {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this._value || this._value[0];
        }
    }
    set value(v) {
        if (typeof v === 'undefined' || v === null || v === '') {
            v = [];
        }
        else if (typeof v === 'string') {
            v = [v];
        }
        else if (!Array.isArray(v)) {
            throw new TypeError('Value must be a string or an array.');
        }
    }
    selectOpt(option, event) {
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach((o) => {
                if (o.value === option.value) {
                    this._value.splice(o, 1);
                }
            });
        }
        this.onChange(this.value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], CheckboxControlComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CheckboxControlComponent.prototype, "selected", void 0);
CheckboxControlComponent = CheckboxControlComponent_1 = __decorate([
    Component({
        selector: 'checkbox',
        template: "<div *ngFor=\"let option of options; let i = index;\">\n    <label class=\"form-control no-border\">\n        <input type=\"checkbox\" id=\"i + 'id'\" (change)=\"selectOpt(option, $event)\" value=\"option.value\" [checked]=\"option.checked\">\n        {{ option.label }}\n    </label>\n</div>\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CheckboxControlComponent_1),
                multi: true,
            }
        ],
        styles: [`
    .no-border {
      border: 0;
      box-shadow: none;
    }`]
    })
], CheckboxControlComponent);

let CheckboxModule = class CheckboxModule {
};
CheckboxModule = __decorate([
    NgModule({
        declarations: [
            CheckboxControlComponent
        ],
        exports: [
            CheckboxControlComponent
        ],
        imports: [CommonModule, FormsModule]
    })
], CheckboxModule);

let FormEntryModule = class FormEntryModule {
};
FormEntryModule = __decorate([
    NgModule({
        imports: [CommonModule,
            ReactiveFormsModule,
            CollapseModule,
            // NgSelectModule,
            SelectModule,
            DateTimePickerModule,
            RemoteSelectModule,
            // NoopAnimationsModule,
            RemoteFileUploadModule,
            EncounterViewerModule,
            CheckboxModule,
            MatIconModule,
            MatTabsModule,
            MatCardModule,
            MatExpansionModule,
            NgxDateTimePickerModule,
            SharedModule
        ],
        declarations: [
            FormRendererComponent,
            AfeNgSelectComponent,
            AppointmentsOverviewComponent,
            HistoricalValueDirective,
            ErrorRendererComponent,
            TimeAgoPipe
        ],
        providers: [
            FormBuilder,
            FormControlService,
            FormErrorsService,
            ValidationFactory,
            HidersDisablersFactory,
            AlertsFactory,
            ExpressionRunner,
            JsExpressionHelper,
            HistoricalFieldHelperService,
            FormSchemaCompiler,
            FormFactory,
            QuestionFactory,
            ValidationFactory,
            ControlRelationsFactory,
            ObsAdapterHelper,
            ObsValueAdapter,
            EncounterAdapter,
            PersonAttribuAdapter,
            OrderValueAdapter,
            DebugModeService
        ],
        exports: [FormRendererComponent, AfeNgSelectComponent,
            ErrorRendererComponent, DateTimePickerModule, EncounterViewerModule, NgxDateTimePickerModule]
    })
], FormEntryModule);

class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

var RenderingType;
(function (RenderingType) {
    RenderingType[RenderingType["Form"] = 0] = "Form";
    RenderingType[RenderingType["Page"] = 1] = "Page";
    RenderingType[RenderingType["Section"] = 2] = "Section";
    RenderingType[RenderingType["Select"] = 3] = "Select";
    RenderingType[RenderingType["DropDown"] = 4] = "DropDown";
})(RenderingType || (RenderingType = {}));

/*
 * Public API Surface of ngx-formentry
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AfeControlType, AfeFormArray, AfeFormControl, AfeFormGroup, CheckBoxQuestion, ConditionalValidationModel, ControlRelationsFactory, DataSources, DateQuestion, DateTimePickerModule, DateValidationModel, EncounterAdapter, FileUploadQuestion, Form, FormControlService, FormEntryModule, FormErrorsService, FormFactory, FormSchemaCompiler, HistoricalEncounterDataService, JsExpressionHelper, JsExpressionValidationModel, MaxValidationModel, MinValidationModel, MultiSelectQuestion, NestedQuestion, NgxDateTimePickerModule, ObsAdapterHelper, ObsValueAdapter, Option$1 as Option, OrderValueAdapter, Pair, PersonAttribuAdapter, QuestionBase, QuestionFactory, QuestionGroup, RenderingType, RepeatingQuestion, SelectQuestion, TestOrderQuestion, TextAreaInputQuestion, TextInputQuestion, UiSelectQuestion, ValidationFactory, ValidationModel, SelectModule as ɵa, SELECT_VALUE_ACCESSOR as ɵb, MY_FORMATS as ɵba, NgxDateTimePickerComponent as ɵbb, FormRendererComponent as ɵbc, DEFAULT_STYLES as ɵbd, AfeNgSelectComponent as ɵbe, AppointmentsOverviewComponent as ɵbf, HistoricalValueDirective as ɵbg, HistoricalFieldHelperService as ɵbh, ErrorRendererComponent as ɵbi, HidersDisablersFactory as ɵbj, ExpressionRunner as ɵbk, DebugModeService as ɵbl, AlertsFactory as ɵbm, SelectComponent as ɵc, STYLE as ɵd, SelectDropdownComponent as ɵe, STYLE$1 as ɵf, DatePickerComponent as ɵg, TimePickerComponent as ɵh, ModalComponent as ɵi, MomentPipe as ɵj, DateTimePickerComponent as ɵk, RemoteSelectModule as ɵl, RemoteSelectComponent as ɵm, RemoteFileUploadModule as ɵn, SharedModule as ɵo, SecurePipe as ɵp, FileUploadComponent as ɵq, EncounterViewerModule as ɵr, EncounterViewerComponent as ɵs, EncounterViewerService as ɵt, EncounterContainerComponent as ɵu, QuestionControlComponent as ɵv, FilePreviewComponent as ɵw, RemoteAnswerComponent as ɵx, CheckboxModule as ɵy, CheckboxControlComponent as ɵz };
//# sourceMappingURL=ampath-kenya-ngx-openmrs-formentry.js.map
