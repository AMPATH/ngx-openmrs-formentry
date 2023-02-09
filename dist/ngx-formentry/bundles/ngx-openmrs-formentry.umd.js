(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/forms'), require('moment'), require('lodash'), require('hammerjs'), require('@angular/common'), require('@angular/platform-browser'), require('ngx-file-uploader'), require('ngx-webcam'), require('@angular/material/core'), require('@angular/material-moment-adapter'), require('@angular/material/datepicker'), require('@angular/material/form-field'), require('@angular/material'), require('@angular/material/select'), require('pdfmake/build/pdfmake.js'), require('pdfmake/build/vfs_fonts.js'), require('@angular/common/http'), require('ngx-bootstrap/collapse'), require('time-ago-pipe')) :
    typeof define === 'function' && define.amd ? define('ngx-openmrs-formentry', ['exports', '@angular/core', 'rxjs', '@angular/forms', 'moment', 'lodash', 'hammerjs', '@angular/common', '@angular/platform-browser', 'ngx-file-uploader', 'ngx-webcam', '@angular/material/core', '@angular/material-moment-adapter', '@angular/material/datepicker', '@angular/material/form-field', '@angular/material', '@angular/material/select', 'pdfmake/build/pdfmake.js', 'pdfmake/build/vfs_fonts.js', '@angular/common/http', 'ngx-bootstrap/collapse', 'time-ago-pipe'], factory) :
    (factory((global['ngx-openmrs-formentry'] = {}),global.ng.core,global.rxjs,global.ng.forms,null,null,null,global.ng.common,global.ng.platformBrowser,null,null,global.ng.material.core,global.ng['material-moment-adapter'],global.ng.material.datepicker,global.ng.material['form-field'],global.ng.material,global.ng.material.select,null,null,global.ng.common.http,null,null));
}(this, (function (exports,i0,rxjs,forms,moment_,_,hammerjs,common,platformBrowser,ngxFileUploader,ngxWebcam,core,materialMomentAdapter,datepicker,formField,material,select,pdfMake,vfs_fonts_js,http,collapse,timeAgoPipe) { 'use strict';

    /*
    This service checks if the debug mode on ng2-amrs
    has been enabled by checking cookies.
    If the debug mode has been enabled then
    it returns true and all fields are displayed
    for use by testers
    */
    var DebugModeService = (function () {
        function DebugModeService() {
            this.cookieKey = 'formDebug';
        }
        DebugModeService.prototype.debugEnabled = function () {
            // check if the hidefield
            return false;
        };
        DebugModeService.decorators = [
            { type: i0.Injectable },
        ];
        DebugModeService.ctorParameters = function () { return []; };
        return DebugModeService;
    }());

    var FormErrorsService = (function () {
        function FormErrorsService() {
            this.announceErrorFieldSource = new rxjs.Subject();
            this.announceErrorField$ = this.announceErrorFieldSource.asObservable();
        }
        FormErrorsService.prototype.announceErrorField = function (error) {
            this.announceErrorFieldSource.next(error);
        };
        // Observable string sources
        FormErrorsService.control = null;
        FormErrorsService.tab = null;
        FormErrorsService.decorators = [
            { type: i0.Injectable },
        ];
        return FormErrorsService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    // import { CanHide } from '../form-entry/control-hiders-disablers/can-hide';
    // import { CanDisable } from '../form-entry/control-hiders-disablers/can-disable';
    var ControlRelation = (function () {
        function ControlRelation(control, relatedTo) {
            this._control = control;
            this._relatedTo = relatedTo;
            this._registerForChangesFromRelatedControl();
        }
        Object.defineProperty(ControlRelation.prototype, "control", {
            get: function () {
                return this._control;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlRelation.prototype, "relatedTo", {
            get: function () {
                return this._relatedTo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlRelation.prototype, "lastUpdateValue", {
            get: function () {
                return this._lastUpdateValue;
            },
            enumerable: true,
            configurable: true
        });
        ControlRelation.prototype.updateControlBasedOnRelation = function (newValue) {
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
        };
        ControlRelation.prototype._registerForChangesFromRelatedControl = function () {
            var _this = this;
            this._relatedTo.valueChanges.subscribe(function (value) {
                _this.updateControlBasedOnRelation(value);
            });
        };
        return ControlRelation;
    }());

    var ControlRelations = (function () {
        function ControlRelations(relationFor, relatedTo) {
            this._otherRelations = [];
            this._relationFor = relationFor;
            this._relations = [];
            if (relatedTo) {
                this.addRelatedControls(relatedTo);
            }
        }
        Object.defineProperty(ControlRelations.prototype, "relationsFor", {
            get: function () {
                return this._relationFor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlRelations.prototype, "relations", {
            get: function () {
                return this._relations;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControlRelations.prototype, "otherRelations", {
            get: function () {
                return this._otherRelations;
            },
            enumerable: true,
            configurable: true
        });
        ControlRelations.prototype.addRelatedControls = function (relatedTo) {
            if (relatedTo instanceof forms.AbstractControl) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo));
            }
            if (relatedTo instanceof Array) {
                for (var i = 0; i < relatedTo.length; i++) {
                    this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
                }
            }
        };
        return ControlRelations;
    }());

    var HiderHelper = (function () {
        function HiderHelper() {
        }
        HiderHelper.prototype.hideControl = function (control) {
            control.hidden = true;
            if (control.disable) {
                control.disable();
            }
        };
        HiderHelper.prototype.showControl = function (control) {
            control.hidden = false;
        };
        HiderHelper.prototype.setHiderForControl = function (control, hider) {
            control.hiders.push(hider);
        };
        HiderHelper.prototype.clearHidersForControl = function (control) {
            control.hiders.splice(0);
            control.hidden = false;
        };
        HiderHelper.prototype.evaluateControlHiders = function (control) {
            var hiddenValue = false;
            control.hiders.forEach(function (hider) {
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
        };
        HiderHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
            if (control.updateHiddenState) {
                control.valueChanges.subscribe(function (val) {
                    control.updateHiddenState();
                });
            }
        };
        return HiderHelper;
    }());

    var AlertHelper = (function () {
        function AlertHelper() {
        }
        AlertHelper.prototype.hideAlert = function (control) {
            control.shown = false;
        };
        AlertHelper.prototype.showAlert = function (control) {
            control.shown = true;
        };
        AlertHelper.prototype.setAlertsForControl = function (control, alert) {
            control.alerts.push(alert);
        };
        AlertHelper.prototype.clearAlertsForControl = function (control) {
            control.alerts.splice(0);
            control.alert = '';
        };
        AlertHelper.prototype.evaluateControlAlerts = function (control) {
            var messageValue = '';
            control.alerts.forEach(function (message) {
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
        };
        AlertHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
            if (control.updateAlert) {
                control.valueChanges.subscribe(function (val) {
                    control.updateAlert();
                });
            }
        };
        return AlertHelper;
    }());

    var DisablerHelper = (function () {
        function DisablerHelper() {
        }
        DisablerHelper.prototype.setDisablerForControl = function (control, disabler) {
            control.disablers.push(disabler);
        };
        DisablerHelper.prototype.clearDisablersForControl = function (control) {
            control.disablers.splice(0);
            control.disable();
        };
        DisablerHelper.prototype.evaluateControlDisablers = function (control) {
            var toDisable = false;
            control.disablers.forEach(function (hider) {
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
        };
        DisablerHelper.prototype.setUpReEvaluationWhenValueChanges = function (control) {
            if (control.updateDisabledState) {
                control.valueChanges.subscribe(function (val) {
                    control.updateDisabledState();
                });
            }
        };
        return DisablerHelper;
    }());

    var NodeBase = (function () {
        function NodeBase(question, control, form, parentPath) {
            this._control = control;
            this._questionModel = question;
            this._form = form;
            this._path = parentPath ? parentPath + '.' + question.key : question.key;
        }
        Object.defineProperty(NodeBase.prototype, "question", {
            get: function () {
                return this._questionModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeBase.prototype, "control", {
            get: function () {
                return this._control;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeBase.prototype, "form", {
            get: function () {
                return this._form;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeBase.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        NodeBase.prototype.removeAt = function (index) { };
        NodeBase.prototype.createChildNode = function () { };
        NodeBase.prototype.removeChildNode = function () { };
        return NodeBase;
    }());
    var LeafNode = (function (_super) {
        __extends(LeafNode, _super);
        function LeafNode(question, control, parentControl, form, parentPath) {
            return _super.call(this, question, control, form, parentPath) || this;
        }
        return LeafNode;
    }(NodeBase));
    var GroupNode = (function (_super) {
        __extends(GroupNode, _super);
        function GroupNode(question, control, parentControl, form, parentPath) {
            var _this = _super.call(this, question, control, form, parentPath) || this;
            _this._children = {};
            return _this;
        }
        Object.defineProperty(GroupNode.prototype, "children", {
            get: function () {
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        GroupNode.prototype.setChild = function (key, node) {
            this.children[key] = node;
        };
        return GroupNode;
    }(NodeBase));
    var ArrayNode = (function (_super) {
        __extends(ArrayNode, _super);
        function ArrayNode(question, control, parentControl, formFactory, form, parentPath) {
            var _this = _super.call(this, question, control, form, parentPath) || this;
            _this.formFactory = formFactory;
            _this.childNodeCreatedEvents = [];
            _this._children = [];
            _this.childNodeCreatedEvents = [];
            return _this;
        }
        Object.defineProperty(ArrayNode.prototype, "children", {
            get: function () {
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        ArrayNode.prototype.createChildNode = function () {
            if (this.createChildFunc) {
                var g = this.createChildFunc(this.question, this, this.formFactory);
                this.fireChildNodeCreatedListener(g);
                return g;
            }
            return null;
        };
        ArrayNode.prototype.removeAt = function (index) {
            var removePrompt = confirm('Are you sure you want to remove?');
            if (removePrompt) {
                if (this.removeChildFunc) {
                    this.removeChildFunc(index, this);
                }
            }
        };
        ArrayNode.prototype.addChildNodeCreatedListener = function (func) {
            this.childNodeCreatedEvents.push(func);
        };
        ArrayNode.prototype.fireChildNodeCreatedListener = function (node) {
            for (var i = 0; i < this.childNodeCreatedEvents.length; i++) {
                var func = this.childNodeCreatedEvents[i];
                func(node);
            }
        };
        return ArrayNode;
    }(NodeBase));

    var ValidationModel = (function () {
        function ValidationModel(validations) {
            this.type = validations.type;
            this.message = validations.message || null;
        }
        return ValidationModel;
    }());

    var JsExpressionValidationModel = (function (_super) {
        __extends(JsExpressionValidationModel, _super);
        function JsExpressionValidationModel(validations) {
            var _this = _super.call(this, validations) || this;
            _this.failsWhenExpression = validations.failsWhenExpression;
            return _this;
        }
        return JsExpressionValidationModel;
    }(ValidationModel));

    var ConditionalValidationModel = (function (_super) {
        __extends(ConditionalValidationModel, _super);
        function ConditionalValidationModel(validations) {
            var _this = _super.call(this, validations) || this;
            _this.referenceQuestionId = validations.referenceQuestionId;
            _this.referenceQuestionAnswers = validations.referenceQuestionAnswers;
            return _this;
        }
        return ConditionalValidationModel;
    }(ValidationModel));

    var ControlRelationsFactory = (function () {
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
            { type: i0.Injectable },
        ];
        ControlRelationsFactory.ctorParameters = function () { return []; };
        return ControlRelationsFactory;
    }());

    var moment = moment_;
    var ExpressionRunner = (function () {
        function ExpressionRunner() {
        }
        ExpressionRunner.prototype.getRunnable = function (expression, control, helper, dataDependencies, form) {
            var runner = this;
            var runnable = {
                run: function () {
                    /* tslint:disable */
                    var scope = {};
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
                    var paramList = '';
                    var argList = '';
                    for (var o in scope) {
                        paramList = paramList === '' ? paramList + o : paramList + ',' + o;
                        argList =
                            argList === ''
                                ? argList + "scope['" + o + "']"
                                : argList + ",scope['" + o + "']";
                    }
                    // prevent more than one return statements
                    if (expression.indexOf('return') === -1) {
                        expression = '"return ' + expression + '"';
                    }
                    var funcDeclarationCode = 'var afeDynamicFunc = new Function("' +
                        paramList +
                        '", ' +
                        expression +
                        ');';
                    var funcCallCode = 'afeDynamicFunc.call(this ' +
                        (argList === '' ? '' : ',' + argList) +
                        ');';
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
        };
        ExpressionRunner.prototype.getControlRelationValueString = function (control, scope) {
            var _this = this;
            if (control &&
                control.controlRelations &&
                control.controlRelations.relations) {
                control.controlRelations.relations.forEach(function (relation) {
                    if (relation.relatedTo) {
                        var related = relation.relatedTo;
                        var relatedAsControl = relation.relatedTo;
                        if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                            scope[related.uuid] = relation.relatedTo.value;
                        }
                        else {
                            scope[related.uuid] =
                                relation.relatedTo.value && relation.relatedTo.value.value
                                    ? relation.relatedTo.value.value
                                    : relation.relatedTo.value;
                        }
                    }
                });
            }
            if (control &&
                control.controlRelations &&
                control.controlRelations.otherRelations &&
                control.controlRelations.otherRelations.length > 0) {
                control.controlRelations.otherRelations.forEach(function (node) {
                    if (node instanceof ArrayNode) {
                        var arrayNode = node;
                        var uuid_1 = control.uuid;
                        var controlRelationsFactory_1 = new ControlRelationsFactory();
                        var relationsForControl_1 = [];
                        // get all related controls
                        arrayNode.children.forEach(function (child) {
                            relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                        });
                        _this.setControlArrayValues(control, relationsForControl_1, scope);
                    }
                });
            }
        };
        ExpressionRunner.prototype.setControlArrayValues = function (control, relationsForControl, scope) {
            var _this = this;
            var keys = this._getFormControlKeys(relationsForControl);
            keys.forEach(function (key) {
                var values = _this._getValuesForKey(key, relationsForControl);
                scope[key] = values;
            });
        };
        ExpressionRunner.prototype._getFormControlKeys = function (array) {
            var keys = [];
            array.forEach(function (control) {
                if (keys.indexOf(control.uuid) === -1) {
                    keys.push(control.uuid);
                }
            });
            return keys;
        };
        ExpressionRunner.prototype._getValuesForKey = function (key, array) {
            var values = [];
            array.forEach(function (control) {
                if (control.uuid === key) {
                    values.push(control.value);
                }
            });
            return values;
        };
        ExpressionRunner.prototype.getHelperMethods = function (obj, scope) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    scope[key] = obj[key];
                }
            }
        };
        ExpressionRunner.prototype.getDataDependencies = function (obj, scope) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    scope[key] = obj[key];
                }
            }
        };
        return ExpressionRunner;
    }());

    var AfeFormControl = (function (_super) {
        __extends(AfeFormControl, _super);
        function AfeFormControl(formState, validator, asyncValidator) {
            var _this = _super.call(this, formState, validator, asyncValidator) || this;
            _this.hidden = false;
            _this.hiderHelper = new HiderHelper();
            _this.disablerHelper = new DisablerHelper();
            _this.AlertHelper = new AlertHelper();
            _this._controlRelations = new ControlRelations(_this);
            _this.hiders = [];
            _this.disablers = [];
            _this.alerts = [];
            _this.valueChanges.subscribe(function (value) {
                if (_this._previousValue !== value) {
                    _this.fireValueChangeListener(value);
                    _this._previousValue = value;
                }
            });
            return _this;
        }
        Object.defineProperty(AfeFormControl.prototype, "controlRelations", {
            get: function () {
                return this._controlRelations;
            },
            enumerable: true,
            configurable: true
        });
        AfeFormControl.prototype.disable = function (param) {
            _super.prototype.disable.call(this, param);
            _super.prototype.setValue.call(this, '');
        };
        AfeFormControl.prototype.hide = function () {
            this.hiderHelper.hideControl(this);
        };
        AfeFormControl.prototype.show = function () {
            this.hiderHelper.showControl(this);
        };
        AfeFormControl.prototype.setHidingFn = function (newHider) {
            this.hiderHelper.setHiderForControl(this, newHider);
        };
        AfeFormControl.prototype.setCalculatorFn = function (newCalculator) {
            this.calculator = newCalculator;
        };
        AfeFormControl.prototype.updateCalculatedValue = function () {
            if (this.calculator) {
                var _val = this.calculator.call(ExpressionRunner, {});
                this.setValue(_val);
            }
        };
        AfeFormControl.prototype.clearHidingFns = function () {
            this.hiderHelper.clearHidersForControl(this);
        };
        AfeFormControl.prototype.updateHiddenState = function () {
            this.hiderHelper.evaluateControlHiders(this);
        };
        AfeFormControl.prototype.setDisablingFn = function (newDisabler) {
            this.disablerHelper.setDisablerForControl(this, newDisabler);
        };
        AfeFormControl.prototype.clearDisablingFns = function () {
            this.disablerHelper.clearDisablersForControl(this);
        };
        AfeFormControl.prototype.updateDisabledState = function () {
            this.disablerHelper.evaluateControlDisablers(this);
        };
        AfeFormControl.prototype.setAlertFn = function (newHider) {
            this.AlertHelper.setAlertsForControl(this, newHider);
        };
        AfeFormControl.prototype.clearMessageFns = function () {
            this.AlertHelper.clearAlertsForControl(this);
        };
        AfeFormControl.prototype.updateAlert = function () {
            this.AlertHelper.evaluateControlAlerts(this);
        };
        AfeFormControl.prototype.addValueChangeListener = function (func) {
            this._valueChangeListener = func;
        };
        AfeFormControl.prototype.fireValueChangeListener = function (value) {
            if (this._valueChangeListener &&
                typeof this._valueChangeListener === 'function') {
                this._valueChangeListener(value);
            }
        };
        AfeFormControl.prototype.setValue = function (value) {
            _super.prototype.setValue.call(this, value);
        };
        return AfeFormControl;
    }(forms.FormControl));

    var AfeFormGroup = (function (_super) {
        __extends(AfeFormGroup, _super);
        function AfeFormGroup(controls, validator, asyncValidator) {
            var _this = _super.call(this, controls, validator, asyncValidator) || this;
            _this.hiderHelper = new HiderHelper();
            _this.disablerHelper = new DisablerHelper();
            _this.AlertHelper = new AlertHelper();
            _this._controlRelations = new ControlRelations(_this);
            _this.hiders = [];
            _this.disablers = [];
            _this.alerts = [];
            return _this;
        }
        Object.defineProperty(AfeFormGroup.prototype, "controlRelations", {
            get: function () {
                return this._controlRelations;
            },
            enumerable: true,
            configurable: true
        });
        AfeFormGroup.prototype.hide = function () {
            this.hiderHelper.hideControl(this);
        };
        AfeFormGroup.prototype.show = function () {
            this.hiderHelper.showControl(this);
        };
        AfeFormGroup.prototype.disable = function (param) {
            _super.prototype.disable.call(this, param);
            _super.prototype.setValue.call(this, {});
        };
        AfeFormGroup.prototype.setHidingFn = function (newHider) {
            this.hiderHelper.setHiderForControl(this, newHider);
        };
        AfeFormGroup.prototype.clearHidingFns = function () {
            this.hiderHelper.clearHidersForControl(this);
        };
        AfeFormGroup.prototype.updateHiddenState = function () {
            this.hiderHelper.evaluateControlHiders(this);
        };
        AfeFormGroup.prototype.setDisablingFn = function (newDisabler) {
            this.disablerHelper.setDisablerForControl(this, newDisabler);
        };
        AfeFormGroup.prototype.clearDisablingFns = function () {
            this.disablerHelper.clearDisablersForControl(this);
        };
        AfeFormGroup.prototype.updateDisabledState = function () {
            this.disablerHelper.evaluateControlDisablers(this);
        };
        AfeFormGroup.prototype.setAlertFn = function (newHider) {
            this.AlertHelper.setAlertsForControl(this, newHider);
        };
        AfeFormGroup.prototype.clearMessageFns = function () {
            this.AlertHelper.clearAlertsForControl(this);
        };
        AfeFormGroup.prototype.updateAlert = function () {
            this.AlertHelper.evaluateControlAlerts(this);
        };
        AfeFormGroup.prototype.setValue = function (value) {
            _super.prototype.setValue.call(this, value);
        };
        return AfeFormGroup;
    }(forms.FormGroup));

    var AfeFormArray = (function (_super) {
        __extends(AfeFormArray, _super);
        function AfeFormArray(controls, validator, asyncValidator) {
            var _this = _super.call(this, controls, validator, asyncValidator) || this;
            _this.hiderHelper = new HiderHelper();
            _this.AlertHelper = new AlertHelper();
            _this.disablerHelper = new DisablerHelper();
            _this._controlRelations = new ControlRelations(_this);
            _this.hiders = [];
            _this.alerts = [];
            _this.disablers = [];
            _this.valueChanges.subscribe(function (value) {
                if (_this._previousValue !== value) {
                    _this.fireValueChangeListener(value);
                    _this._previousValue = value;
                }
            });
            return _this;
        }
        Object.defineProperty(AfeFormArray.prototype, "uuid", {
            get: function () {
                return this._uuid;
            },
            set: function (val) {
                this._uuid = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AfeFormArray.prototype, "controlRelations", {
            get: function () {
                return this._controlRelations;
            },
            enumerable: true,
            configurable: true
        });
        AfeFormArray.prototype.hide = function () {
            this.hiderHelper.hideControl(this);
        };
        AfeFormArray.prototype.show = function () {
            this.hiderHelper.showControl(this);
        };
        AfeFormArray.prototype.disable = function (param) {
            _super.prototype.disable.call(this, param);
            _super.prototype.setValue.call(this, []);
        };
        AfeFormArray.prototype.setHidingFn = function (newHider) {
            this.hiderHelper.setHiderForControl(this, newHider);
        };
        AfeFormArray.prototype.clearHidingFns = function () {
            this.hiderHelper.clearHidersForControl(this);
        };
        AfeFormArray.prototype.updateHiddenState = function () {
            this.hiderHelper.evaluateControlHiders(this);
        };
        AfeFormArray.prototype.setDisablingFn = function (newDisabler) {
            this.disablerHelper.setDisablerForControl(this, newDisabler);
        };
        AfeFormArray.prototype.clearDisablingFns = function () {
            this.disablerHelper.clearDisablersForControl(this);
        };
        AfeFormArray.prototype.updateDisabledState = function () {
            this.disablerHelper.evaluateControlDisablers(this);
        };
        AfeFormArray.prototype.setAlertFn = function (newHider) {
            this.AlertHelper.setAlertsForControl(this, newHider);
        };
        AfeFormArray.prototype.clearMessageFns = function () {
            this.AlertHelper.clearAlertsForControl(this);
        };
        AfeFormArray.prototype.updateAlert = function () {
            this.AlertHelper.evaluateControlAlerts(this);
        };
        AfeFormArray.prototype.addValueChangeListener = function (func) {
            this._valueChangeListener = func;
        };
        AfeFormArray.prototype.fireValueChangeListener = function (value) {
            if (this.alerts.length > 0) {
                this.updateAlert();
            }
            if (this._valueChangeListener &&
                typeof this._valueChangeListener === 'function') {
                this._valueChangeListener(value);
            }
        };
        AfeFormArray.prototype.setValue = function (value) {
            _super.prototype.setValue.call(this, value);
        };
        return AfeFormArray;
    }(forms.FormArray));

    (function (AfeControlType) {
        AfeControlType[AfeControlType["AfeFormControl"] = 0] = "AfeFormControl";
        AfeControlType[AfeControlType["AfeFormArray"] = 1] = "AfeFormArray";
        AfeControlType[AfeControlType["AfeFormGroup"] = 2] = "AfeFormGroup";
        AfeControlType[AfeControlType["None"] = 3] = "None";
    })(exports.AfeControlType || (exports.AfeControlType = {}));

    var QuestionBase = (function () {
        function QuestionBase(options) {
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
        QuestionBase.prototype.setHistoricalValue = function (v) {
            this.enableHistoricalValue = v;
        };
        QuestionBase.prototype.showHistoricalEncounterDate = function (v) {
            this.showHistoricalValueDate = v === undefined ? true : v;
        };
        return QuestionBase;
    }());

    var ConditionalRequiredValidator = (function () {
        function ConditionalRequiredValidator() {
        }
        ConditionalRequiredValidator.prototype.validate = function (model) {
            // convert helper functions to string
            return function (control) {
                var value = control.value;
                var relationValue = null;
                var referenceQuestionId = model.referenceQuestionId;
                var referenceQuestionAnswers = model.referenceQuestionAnswers;
                var isRequired;
                if (control &&
                    control.controlRelations &&
                    control.controlRelations.relations) {
                    control.controlRelations.relations.forEach(function (relation) {
                        var relatedAsControl = relation.relatedTo;
                        if (relatedAsControl.uuid === referenceQuestionId) {
                            if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                                relationValue = relation.relatedTo.value;
                            }
                            else {
                                relationValue =
                                    relation.relatedTo.value && relation.relatedTo.value.value
                                        ? relation.relatedTo.value.value
                                        : relation.relatedTo.value;
                            }
                        }
                    });
                }
                if (typeof referenceQuestionAnswers === 'object' &&
                    referenceQuestionAnswers.indexOf(relationValue) !== -1) {
                    isRequired = true;
                }
                if (isRequired && !value) {
                    return { conditional_required: { message: model.message } };
                }
                return null;
            };
        };
        return ConditionalRequiredValidator;
    }());

    var ConditionalAnsweredValidator = (function () {
        function ConditionalAnsweredValidator() {
        }
        ConditionalAnsweredValidator.prototype.validate = function (model) {
            return function (control) {
                var value = control.value;
                var relationValue = null;
                var referenceQuestionId = model.referenceQuestionId;
                var referenceQuestionAnswers = model.referenceQuestionAnswers;
                var successCondition = true;
                if (value) {
                    if (control &&
                        control.controlRelations &&
                        control.controlRelations.relations) {
                        control.controlRelations.relations.forEach(function (relation) {
                            var relatedAsControl = relation.relatedTo;
                            if (relatedAsControl.uuid === referenceQuestionId) {
                                if (Array.isArray(relatedAsControl.value)) {
                                    relationValue = relatedAsControl.value;
                                }
                                else {
                                    relationValue =
                                        relatedAsControl.value &&
                                            typeof relatedAsControl.value === 'object' &&
                                            relatedAsControl.value.value
                                            ? relatedAsControl.value.value
                                            : relatedAsControl.value;
                                }
                            }
                            if (!relationValue) {
                                successCondition = false;
                            }
                            else if (typeof referenceQuestionAnswers === 'object' &&
                                referenceQuestionAnswers.indexOf(relationValue) === -1) {
                                successCondition = false;
                            }
                        });
                    }
                }
                if (!successCondition) {
                    return { conditional_answered: { message: model.message } };
                }
                return null;
            };
        };
        return ConditionalAnsweredValidator;
    }());

    var RequiredValidator = (function () {
        function RequiredValidator() {
        }
        RequiredValidator.prototype.validate = function (control) {
            if (control.hidden) {
                return null;
            }
            var value = control.value;
            var isEmpty = value == null || (typeof value === 'string' && value.length === 0);
            return isEmpty ? { required: true } : null;
        };
        return RequiredValidator;
    }());

    var DateValidator = (function () {
        function DateValidator() {
        }
        DateValidator.prototype.validate = function (control) {
            if (control.hidden) {
                return null;
            }
            var value = control.value;
            if (value && value.length !== 0) {
                // YYYY-MM-DD or DD-MM-YYYY
                var test = !/Invalid|NaN/.test(new Date(value).toString());
                return test ? null : { date: true };
            }
            else {
                return null;
            }
        };
        return DateValidator;
    }());

    var MinValidator = (function () {
        function MinValidator() {
        }
        MinValidator.prototype.validate = function (min) {
            return function (control) {
                if (control.hidden) {
                    return null;
                }
                if (control.value && control.value.length !== 0) {
                    var v = control.value;
                    return v >= min
                        ? null
                        : { min: { requiredValue: min, actualValue: v } };
                }
                return null;
            };
        };
        return MinValidator;
    }());

    var MaxValidator = (function () {
        function MaxValidator() {
        }
        MaxValidator.prototype.validate = function (max) {
            return function (control) {
                if (control.hidden) {
                    return null;
                }
                if (control.value && control.value.length !== 0) {
                    var v = control.value;
                    return v <= max
                        ? null
                        : { max: { requiredValue: max, actualValue: v } };
                }
                return null;
            };
        };
        return MaxValidator;
    }());

    var MinDateValidator = (function () {
        function MinDateValidator() {
        }
        MinDateValidator.prototype.validate = function (min) {
            return function (control) {
                if (control.hidden) {
                    return null;
                }
                if (control.value && control.value.length !== 0) {
                    if (!new DateValidator().validate(control.value)) {
                        var newDate = new Date(control.value);
                        return newDate.getTime() < min.getTime()
                            ? { mindate: { requiredDate: min, actualDate: newDate } }
                            : null;
                    }
                    else {
                        return { mindate: { requiredDate: min } };
                    }
                }
                return null;
            };
        };
        return MinDateValidator;
    }());

    var MaxDateValidator = (function () {
        function MaxDateValidator() {
        }
        MaxDateValidator.prototype.validate = function (max) {
            return function (control) {
                if (control.hidden) {
                    return null;
                }
                if (control.value && control.value.length !== 0) {
                    if (!new DateValidator().validate(control.value)) {
                        var newDate = new Date(control.value);
                        return newDate.getTime() > max.getTime()
                            ? { maxdate: { requiredDate: max, actualDate: newDate } }
                            : null;
                    }
                    else {
                        return { maxdate: { requiredDate: max } };
                    }
                }
                return null;
            };
        };
        return MaxDateValidator;
    }());

    var FutureDateRestrictionValidator = (function () {
        function FutureDateRestrictionValidator() {
        }
        FutureDateRestrictionValidator.prototype.validate = function (control) {
            if (control.hidden) {
                return null;
            }
            var value = control.value;
            var now = new Date();
            if (value && value.length !== 0) {
                if (!new DateValidator().validate(value)) {
                    var d = new Date(value);
                    return d.getTime() > now.getTime()
                        ? { futureDateRestriction: true }
                        : null;
                }
            }
            return null;
        };
        return FutureDateRestrictionValidator;
    }());

    var JsExpressionHelper = (function () {
        function JsExpressionHelper() {
        }
        JsExpressionHelper.prototype.calcBMI = function (height, weight) {
            var r;
            if (height && weight) {
                r = (weight / (((height / 100) * height) / 100)).toFixed(1);
            }
            return height && weight ? parseFloat(r) : null;
        };
        JsExpressionHelper.prototype.calcBSA = function (height, weight) {
            var result;
            if (height && weight) {
                result = Math.sqrt((height * weight) / 3600).toFixed(2);
            }
            return height && weight ? parseFloat(result) : null;
        };
        JsExpressionHelper.prototype.calcBMIForAgeZscore = function (bmiForAgeRef, height, weight) {
            var bmi;
            if (height && weight) {
                bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);
            }
            var refSectionObject = _.first(bmiForAgeRef);
            var formattedSDValue;
            if (refSectionObject) {
                var refObjectValues = Object.keys(refSectionObject)
                    .map(function (key) { return refSectionObject[key]; })
                    .map(function (x) { return x; });
                var refObjectKeys = Object.keys(refSectionObject);
                var minimumValue = refObjectValues[1];
                var minReferencePoint_1 = [];
                if (bmi < minimumValue) {
                    minReferencePoint_1.push(minimumValue);
                }
                else {
                    _.forEach(refObjectValues, function (value) {
                        if (value <= bmi) {
                            minReferencePoint_1.push(value);
                        }
                    });
                }
                var lastReferenceValue_1 = _.last(minReferencePoint_1);
                var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                    return o === lastReferenceValue_1;
                });
                var SDValue = refObjectKeys[lastValueIndex];
                formattedSDValue = SDValue.replace('SD', '');
                if (formattedSDValue.includes('neg')) {
                    formattedSDValue = formattedSDValue.substring(1, 0);
                    formattedSDValue = '-' + formattedSDValue;
                }
                if (formattedSDValue === 'S' ||
                    formattedSDValue === 'L' ||
                    formattedSDValue === 'M' ||
                    formattedSDValue === '-5') {
                    formattedSDValue = '-4';
                }
            }
            return bmi && refSectionObject ? formattedSDValue : null;
        };
        JsExpressionHelper.prototype.calcWeightForHeightZscore = function (weightForHeightRef, height, weight) {
            var refSection;
            var formattedSDValue;
            if (height && weight) {
                height = parseFloat(height).toFixed(1);
            }
            var standardHeightMin = 45;
            var standardMaxHeight = 110;
            if (height < standardHeightMin || height > standardMaxHeight) {
                formattedSDValue = -4;
            }
            else {
                refSection = _.filter(weightForHeightRef, function (refObject) {
                    return parseFloat(refObject['Length']).toFixed(1) === height;
                });
            }
            var refSectionObject = _.first(refSection);
            if (refSectionObject) {
                var refObjectValues = Object.keys(refSectionObject)
                    .map(function (key) { return refSectionObject[key]; })
                    .map(function (x) { return x; });
                var refObjectKeys = Object.keys(refSectionObject);
                var minimumValue = refObjectValues[1];
                var minReferencePoint_2 = [];
                if (weight < minimumValue) {
                    minReferencePoint_2.push(minimumValue);
                }
                else {
                    _.forEach(refObjectValues, function (value) {
                        if (value <= weight) {
                            minReferencePoint_2.push(value);
                        }
                    });
                }
                var lastReferenceValue_2 = _.last(minReferencePoint_2);
                var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                    return o === lastReferenceValue_2;
                });
                var SDValue = refObjectKeys[lastValueIndex];
                formattedSDValue = SDValue.replace('SD', '');
                if (formattedSDValue.includes('neg')) {
                    formattedSDValue = formattedSDValue.substring(1, 0);
                    formattedSDValue = '-' + formattedSDValue;
                }
                if (formattedSDValue === 'S' ||
                    formattedSDValue === 'L' ||
                    formattedSDValue === 'M' ||
                    formattedSDValue === '-5') {
                    formattedSDValue = '-4';
                }
            }
            return height && weight ? formattedSDValue : null;
        };
        JsExpressionHelper.prototype.calcHeightForAgeZscore = function (heightForAgeRef, height, weight) {
            var refSectionObject = _.first(heightForAgeRef);
            var formattedSDValue;
            if (refSectionObject) {
                var refObjectValues = Object.keys(refSectionObject)
                    .map(function (key) { return refSectionObject[key]; })
                    .map(function (x) { return x; });
                var refObjectKeys = Object.keys(refSectionObject);
                var minimumValue = refObjectValues[1];
                var minReferencePoint_3 = [];
                if (height < minimumValue) {
                    minReferencePoint_3.push(minimumValue);
                }
                else {
                    _.forEach(refObjectValues, function (value) {
                        if (value <= height) {
                            minReferencePoint_3.push(value);
                        }
                    });
                }
                var lastReferenceValue_3 = _.last(minReferencePoint_3);
                var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                    return o === lastReferenceValue_3;
                });
                var SDValue = refObjectKeys[lastValueIndex];
                formattedSDValue = SDValue.replace('SD', '');
                if (formattedSDValue.includes('neg')) {
                    formattedSDValue = formattedSDValue.substring(1, 0);
                    formattedSDValue = '-' + formattedSDValue;
                }
                if (formattedSDValue === 'S' ||
                    formattedSDValue === 'L' ||
                    formattedSDValue === 'M' ||
                    formattedSDValue === '-5') {
                    formattedSDValue = '-4';
                }
            }
            return height && weight && refSectionObject ? formattedSDValue : null;
        };
        JsExpressionHelper.prototype.isEmpty = function (val) {
            if (val === undefined ||
                val === null ||
                val === '' ||
                val === 'null' ||
                val === 'undefined') {
                return true;
            }
            if (Array.isArray(val) && val.length === 0) {
                return true;
            }
            return false;
        };
        JsExpressionHelper.prototype.arrayContains = function (array, members) {
            if (Array.isArray(members)) {
                if (members.length === 0) {
                    return true;
                }
                var contains = true;
                for (var i = 0; i < members.length; i++) {
                    var val = members[i];
                    if (array.indexOf(val) === -1) {
                        contains = false;
                    }
                }
                return contains;
            }
            else {
                return array.indexOf(members) !== -1;
            }
        };
        JsExpressionHelper.prototype.extractRepeatingGroupValues = function (key, array) {
            var values = array.map(function (item) {
                return item[key];
            });
            return values;
        };
        JsExpressionHelper.prototype.formatDate = function (value, format, offset) {
            format = format || 'yyyy-MM-dd';
            offset = offset || '+0300';
            if (!(value instanceof Date)) {
                value = new Date(value);
                if (value === null || value === undefined) {
                    throw new Error('DateFormatException: value passed ' + 'is not a valid date');
                }
            }
            return value; // TODO implement this
            // return $filter('date')(value, format, offset);
        };
        JsExpressionHelper.prototype.arrayContainsAny = function (array, members) {
            if (Array.isArray(members)) {
                if (members.length === 0) {
                    return true;
                }
                var contains = false;
                for (var i = 0; i < members.length; i++) {
                    var val = members[i];
                    if (array.indexOf(val) !== -1) {
                        contains = true;
                    }
                }
                return contains;
            }
            else {
                return array.indexOf(members) !== -1;
            }
        };
        Object.defineProperty(JsExpressionHelper.prototype, "helperFunctions", {
            get: function () {
                var helper = this;
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
            },
            enumerable: true,
            configurable: true
        });
        return JsExpressionHelper;
    }());

    var Validations = (function () {
        function Validations() {
        }
        Validations.JSExpressionValidatorsEnabled = false;
        return Validations;
    }());

    var JsExpressionValidator = (function () {
        function JsExpressionValidator() {
        }
        JsExpressionValidator.prototype.validate = function (model, form) {
            // convert helper functions to string
            return function (control) {
                if (!Validations.JSExpressionValidatorsEnabled) {
                    return null;
                }
                var expression = model.failsWhenExpression;
                var helper = new JsExpressionHelper();
                var dataDependencies = {};
                var helperFunctions = helper.helperFunctions;
                var runnable = new ExpressionRunner().getRunnable(expression, control, helperFunctions, dataDependencies, form);
                if (runnable.run()) {
                    return {
                        js_expression: { expression: expression, message: model.message }
                    };
                }
                return null;
            };
        };
        return JsExpressionValidator;
    }());

    var Messages = (function () {
        function Messages() {
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
        return Messages;
    }());

    var ValidationFactory = (function () {
        function ValidationFactory() {
        }
        ValidationFactory.prototype.getValidators = function (question, form) {
            var _this = this;
            var list = [];
            if (question.validators) {
                _.forEach(question.validators, function (validator) {
                    switch (validator.type) {
                        case 'date':
                            list.push(_this.dateValidator);
                            var allowFutureDates = validator
                                .allowFutureDates;
                            if (!allowFutureDates) {
                                list.push(_this.futureDateRestrictionValidator);
                            }
                            break;
                        case 'js_expression':
                            list.push(_this.jsExpressionValidator.validate(validator, form));
                            break;
                        case 'max':
                            list.push(_this.getMaxValueValidator(validator.max));
                            break;
                        case 'min':
                            list.push(_this.getMinValueValidator(validator.min));
                            break;
                        case 'conditionalRequired':
                            list.push(_this.conditionalRequiredValidator.validate(validator));
                            break;
                        case 'conditionalAnswered':
                            list.push(_this.conditionalAnsweredValidator.validate(validator));
                            break;
                    }
                });
            }
            if (question.required &&
                typeof question.required === 'string' &&
                question.required === 'true') {
                list.push(this.requiredValidator);
            }
            return list;
        };
        Object.defineProperty(ValidationFactory.prototype, "conditionalRequiredValidator", {
            get: function () {
                return new ConditionalRequiredValidator();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "conditionalAnsweredValidator", {
            get: function () {
                return new ConditionalAnsweredValidator();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "requiredValidator", {
            get: function () {
                return new RequiredValidator().validate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "dateValidator", {
            get: function () {
                return new DateValidator().validate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "futureDateRestrictionValidator", {
            get: function () {
                return new FutureDateRestrictionValidator().validate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "maxDateValidator", {
            get: function () {
                return new MaxDateValidator().validate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "minDateValidator", {
            get: function () {
                return new MinDateValidator().validate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "minLengthValidator", {
            get: function () {
                return forms.Validators.minLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationFactory.prototype, "maxLengthValidator", {
            get: function () {
                return forms.Validators.maxLength;
            },
            enumerable: true,
            configurable: true
        });
        ValidationFactory.prototype.getMinValueValidator = function (min) {
            return new MinValidator().validate(min);
        };
        ValidationFactory.prototype.getMaxValueValidator = function (max) {
            return new MaxValidator().validate(max);
        };
        Object.defineProperty(ValidationFactory.prototype, "jsExpressionValidator", {
            get: function () {
                return new JsExpressionValidator();
            },
            enumerable: true,
            configurable: true
        });
        ValidationFactory.prototype.errors = function (errors, question) {
            var messages = [];
            for (var property in errors) {
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
        };
        ValidationFactory.decorators = [
            { type: i0.Injectable },
        ];
        ValidationFactory.ctorParameters = function () { return []; };
        return ValidationFactory;
    }());

    var HidersDisablersFactory = (function () {
        function HidersDisablersFactory(expressionRunner, expressionHelper, _debugModeService) {
            this.expressionRunner = expressionRunner;
            this.expressionHelper = expressionHelper;
            this._debugModeService = _debugModeService;
        }
        HidersDisablersFactory.prototype.getJsExpressionDisabler = function (question, control, form) {
            var runnable = this.expressionRunner.getRunnable(question.disable, control, this.expressionHelper.helperFunctions, {}, form);
            var disabler = {
                toDisable: false,
                disableWhenExpression: question.disable,
                reEvaluateDisablingExpression: function () {
                    var result = runnable.run();
                    disabler.toDisable = result;
                }
            };
            return disabler;
        };
        HidersDisablersFactory.prototype.getJsExpressionHider = function (question, control, form) {
            var hide = question.hide;
            var value = typeof hide === 'object'
                ? this.convertHideObjectToString(hide)
                : question.hide;
            // check if debugging has been enabled
            var debugEnabled = this._debugModeService.debugEnabled();
            var runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
            var hider = {
                toHide: false,
                hideWhenExpression: value,
                reEvaluateHidingExpression: function () {
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
        };
        HidersDisablersFactory.prototype.convertHideObjectToString = function (hide) {
            if (hide.value instanceof Array) {
                var arrayStr = "'" + hide.value.join("','") + "'";
                var exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
                return exp;
            }
            return '';
        };
        HidersDisablersFactory.decorators = [
            { type: i0.Injectable },
        ];
        HidersDisablersFactory.ctorParameters = function () {
            return [
                { type: ExpressionRunner },
                { type: JsExpressionHelper },
                { type: DebugModeService }
            ];
        };
        return HidersDisablersFactory;
    }());

    var AlertsFactory = (function () {
        function AlertsFactory(expressionRunner, expressionHelper) {
            this.expressionRunner = expressionRunner;
            this.expressionHelper = expressionHelper;
        }
        AlertsFactory.prototype.getJsExpressionshowAlert = function (question, control, form) {
            var runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
            var showAlert = {
                shown: false,
                alertWhenExpression: question.alert.alertWhenExpression,
                alertMessage: question.alert.message,
                reEvaluateAlertExpression: function () {
                    var result = runnable.run();
                    showAlert.shown = result;
                }
            };
            return showAlert;
        };
        AlertsFactory.decorators = [
            { type: i0.Injectable },
        ];
        AlertsFactory.ctorParameters = function () {
            return [
                { type: ExpressionRunner },
                { type: JsExpressionHelper }
            ];
        };
        return AlertsFactory;
    }());

    var FormControlService = (function () {
        function FormControlService(validationFactory, hidersDisablersFactory, alertsFactory) {
            this.alertsFactory = alertsFactory;
            this.controls = [];
            this.validationFactory = validationFactory;
            this.hidersDisablersFactory = hidersDisablersFactory;
        }
        FormControlService.prototype.generateControlModel = function (questionModel, parentControl, generateChildren, form) {
            if (questionModel instanceof QuestionBase) {
                if (questionModel.controlType === exports.AfeControlType.AfeFormArray) {
                    return this.generateFormArray(questionModel, parentControl, form);
                }
                if (questionModel.controlType === exports.AfeControlType.AfeFormGroup) {
                    return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
                }
                if (questionModel.controlType === exports.AfeControlType.AfeFormControl) {
                    return this.generateFormControl(questionModel, parentControl, form);
                }
            }
            return null;
        };
        FormControlService.prototype.generateFormGroupModel = function (question, generateChildren, parentControl, form) {
            var formGroup = new AfeFormGroup({});
            this.wireHidersDisablers(question, formGroup, form);
            this.wireAlerts(question, formGroup, form);
            if (parentControl instanceof AfeFormGroup) {
                parentControl.setControl(question.key, formGroup);
            }
            var asGroup = question;
            if (generateChildren && asGroup && asGroup.questions.length > 0) {
                this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
            }
            return formGroup;
        };
        FormControlService.prototype._generateFormGroupChildrenModel = function (questions, parentControl, form) {
            var _this = this;
            if (questions.length > 0) {
                questions.forEach(function (element) {
                    var generated = _this.generateControlModel(element, parentControl, true, form);
                    if (generated !== null) {
                        parentControl.addControl(element.key, generated);
                    }
                });
            }
        };
        FormControlService.prototype.generateFormArray = function (question, parentControl, form) {
            var validators = this.validationFactory.getValidators(question, form);
            var formArray;
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
        };
        FormControlService.prototype.generateFormControl = function (question, parentControl, form) {
            var value = question.defaultValue || '';
            var validators = this.validationFactory.getValidators(question, form);
            var control = new AfeFormControl(value, validators);
            control.uuid = question.key;
            this.wireHidersDisablers(question, control, form);
            this.wireAlerts(question, control, form);
            this.wireCalculator(question, control, form ? form.dataSourcesContainer.dataSources : null);
            if (parentControl instanceof AfeFormGroup) {
                parentControl.setControl(question.key, control);
            }
            return control;
        };
        FormControlService.prototype.wireAlerts = function (question, control, form) {
            if (question.alert && question.alert !== '') {
                var alert_1 = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
                control.setAlertFn(alert_1);
            }
        };
        FormControlService.prototype.wireHidersDisablers = function (question, control, form) {
            if (question.hide && question.hide !== '') {
                var hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
                control.setHidingFn(hider);
            }
            if (question.disable && question.disable !== '') {
                var disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
                control.setDisablingFn(disable);
            }
        };
        FormControlService.prototype.wireCalculator = function (question, control, dataSource) {
            if (question.calculateExpression && question.calculateExpression !== '') {
                var helper = new JsExpressionHelper();
                var runner = new ExpressionRunner();
                var runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
                // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
                control.setCalculatorFn(runnable.run);
            }
        };
        FormControlService.decorators = [
            { type: i0.Injectable },
        ];
        FormControlService.ctorParameters = function () {
            return [
                { type: ValidationFactory },
                { type: HidersDisablersFactory },
                { type: AlertsFactory }
            ];
        };
        return FormControlService;
    }());

    var DEFAULT_STYLES = "a {\n      color: white;\n      text-decoration: none;\n      font-size: 12px;\n      text-transform: uppercase;\n    }\n\n    ul {\n      list-style-type: none;\n      margin: 2px auto;\n      position: relative;\n    }\n\n    li {\n      display: block;\n      padding: 10px 20px;\n      white-space: nowrap;\n      transition: all 0.3s ease-in;\n      border-bottom: 4px solid transparent;\n    }\n\n    li:hover {\n      border-bottom: 4px solid white;\n      opacity: 0.7;\n      cursor: pointer;\n    }\n\n    .owl-theme .owl-controls .owl-nav {\n      position: absolute;\n      width: 100%;\n      top: 0;\n    }\n\n    .owl-theme .owl-controls .owl-nav [class*=\"owl-\"] {\n      position: absolute;\n      background: none;\n      color: black;\n    }\n\n    .owl-theme .owl-controls .owl-nav [class*=\"owl-\"]:hover {\n      background: none;\n      color: black;\n    }\n\n    .owl-theme .owl-controls .owl-nav .owl-next {\n      right: 0;\n      transform: translate(120%);\n    }\n\n    .owl-theme .owl-controls .owl-nav .owl-prev {\n      left: 0;\n      transform: translate(-120%);\n    }\n\n    .slick-initialized .swipe-tab-content {\n      position: relative;\n      min-height: 365px;\n    }\n    @media screen and (min-width: 767px) {\n      .slick-initialized .swipe-tab-content {\n        min-height: 500px;\n      }\n      .time-control{\n        width:50%;\n      }\n    }\n    .slick-initialized .swipe-tab {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 50px;\n      background: none;\n      border: 0;\n      color: #757575;\n      cursor: pointer;\n      text-align: center;\n      border-bottom: 2px solid rgba(51, 122, 183, 0);\n      transition: all 0.5s;\n    }\n    .slick-initialized .swipe-tab:hover {\n      color: #337AB7;\n    }\n    .slick-initialized .swipe-tab.active-tab {\n      border-bottom-color: #337AB7;\n      color: #337AB7;\n      font-weight: bold;\n    }\n\n    .disabled {\n      opacity: .5;\n      pointer-events: none;\n    }\n\n    .select2-container {\n      margin-top: -5px;\n    }\n\n    .btn {\n      padding: 0px 12px !important;\n    }\n\n    .form-tooltip{\n      color:rgb(51, 122, 183);\n      display: inline-block;\n    }\n    .question-info{\n          opacity:0;\n          height:0px;\n          display: none;\n          transition-duration: opacity 1s ease-out;\n          transtion-delay: 0.5s;\n          padding-top: 2px;\n          padding-bottom: 2px;\n          color: #696969;\n          border-style: ridge;\n          border-width: 1px;\n          border-color: #337ab7;\n          margin-top: 2px;\n    }\n    .hide-info{\n      display:none;\n      height:0px;\n    }\n    .form-tooltip:hover ~ .question-info {\n          display:block;\n          opacity:1;\n          height:auto;\n     }\n    .form-tooltip .tooltipcontent::after {\n          content: \" \";\n          position: absolute;\n          bottom: 100%;  /* At the top of the tooltip */\n          right: 0%;\n          margin-left: -5px;\n          border-width: 5px;\n          border-style: solid;\n          border-top-color: transparent;\n          border-right-color: transparent;\n          border-bottom-color: #337ab7;\n          border-left-color: transparent;\n }\n\n    ng-select.form-control {\n      padding-top: 0;\n      height: auto;\n      padding-bottom: 0;\n    }\n\n .forms-dropdown-menu {\n     max-height: 450px;\n     overflow-y: scroll;\n }\n .no-border {\n  border: 0;\n  box-shadow: none;\n}\n.time-control{\n  width:100%;\n}\n\n    ";

    var DataSources = (function () {
        function DataSources() {
            this._dataSources = {};
        }
        Object.defineProperty(DataSources.prototype, "dataSources", {
            get: function () {
                return this._dataSources;
            },
            enumerable: true,
            configurable: true
        });
        DataSources.prototype.registerDataSource = function (key, dataSource, unWrap) {
            if (unWrap === void 0) {
                unWrap = false;
            }
            if (unWrap) {
                // tslint:disable-next-line:forin
                for (var o in dataSource) {
                    console.log('registering', o, dataSource[o]);
                    this.registerDataSource(o, dataSource[o], false);
                }
            }
            if (this.dataSources[key]) {
                console.warn('Overriding registered data source', key);
            }
            this._dataSources[key] = dataSource;
        };
        DataSources.prototype.clearDataSource = function (key) {
            delete this._dataSources[key];
        };
        DataSources.decorators = [
            { type: i0.Injectable },
        ];
        DataSources.ctorParameters = function () { return []; };
        return DataSources;
    }());

    // import { concat, of, Observable, Subject, BehaviorSubject } from 'rxjs';
    // import * as _ from 'lodash';
    // import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
    // import { QuestionBase } from '../question-models';
    var FormRendererComponent = (function () {
        // items$: Observable<any[]>;
        // itemsLoading = false;
        // itemsInput$ = new Subject<string>();
        function FormRendererComponent(validationFactory, dataSources, formErrorsService, document) {
            this.validationFactory = validationFactory;
            this.dataSources = dataSources;
            this.formErrorsService = formErrorsService;
            this.document = document;
            this.childComponents = [];
            this.isCollapsed = false;
            this.activeTab = 0;
        }
        FormRendererComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.setUpRemoteSelect();
            this.setUpFileUpload();
            if (this.node && this.node.form) {
                var tab = this.node.form.valueProcessingInfo.lastFormTab;
                if (tab && tab !== this.activeTab) {
                    this.activeTab = tab;
                }
            }
            if (this.node && this.node.question.renderingType === 'form') {
                this.formErrorsService.announceErrorField$.subscribe(function (error) {
                    _this.scrollToControl(error);
                });
            }
            if (this.node && this.node.question.renderingType === 'section') {
                this.isCollapsed = !this.node.question.isExpanded;
            }
            if (this.parentComponent) {
                this.parentComponent.addChildComponent(this);
            }
        };
        FormRendererComponent.prototype.addChildComponent = function (child) {
            this.childComponents.push(child);
        };
        FormRendererComponent.prototype.setUpRemoteSelect = function () {
            if (this.node &&
                this.node.question.extras &&
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
        };
        FormRendererComponent.prototype.setUpFileUpload = function () {
            if (this.node &&
                this.node.question.extras &&
                this.node.question.renderingType === 'file') {
                this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
                // console.log('Key', this.node.question);
                // console.log('Data source', this.dataSource);
            }
        };
        FormRendererComponent.prototype.checkSection = function (node) {
            if (node.question.renderingType === 'section') {
                var groupChildrenHidden_1 = false;
                var allSectionControlsHidden = Object.keys(node.children).every(function (k) {
                    var innerNode = node.children[k];
                    if (innerNode instanceof GroupNode) {
                        groupChildrenHidden_1 = Object.keys(innerNode.children).every(function (i) { return innerNode.children[i].control.hidden; });
                    }
                    return node.children[k].control.hidden || groupChildrenHidden_1;
                });
                return !allSectionControlsHidden;
            }
            return true;
        };
        FormRendererComponent.prototype.clickTab = function (tabNumber) {
            this.activeTab = tabNumber;
        };
        FormRendererComponent.prototype.loadPreviousTab = function () {
            if (!this.isCurrentTabFirst()) {
                this.clickTab(this.activeTab - 1);
                document.body.scrollTop = 0;
            }
        };
        FormRendererComponent.prototype.isCurrentTabFirst = function () {
            return this.activeTab === 0;
        };
        FormRendererComponent.prototype.isCurrentTabLast = function () {
            return this.activeTab === this.node.question['questions'].length - 1;
        };
        FormRendererComponent.prototype.loadNextTab = function () {
            if (!this.isCurrentTabLast()) {
                this.clickTab(this.activeTab + 1);
                document.body.scrollTop = 0;
            }
        };
        FormRendererComponent.prototype.tabSelected = function ($event) {
            this.activeTab = $event;
            this.setPreviousTab();
        };
        FormRendererComponent.prototype.setPreviousTab = function () {
            if (this.node && this.node.form) {
                this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
            }
        };
        FormRendererComponent.prototype.hasErrors = function () {
            return this.node.control.touched && !this.node.control.valid;
        };
        FormRendererComponent.prototype.errors = function () {
            return this.getErrors(this.node);
        };
        FormRendererComponent.prototype.scrollToControl = function (error) {
            var _this = this;
            var tab = +error.split(',')[0];
            var elSelector = error.split(',')[1] + 'id';
            // the tab components
            var tabComponent = this.childComponents[tab];
            this.clickTab(tab);
            setTimeout(function () {
                // expand all sections
                tabComponent.childComponents.forEach(function (section) {
                    section.isCollapsed = false;
                    setTimeout(function () {
                        var element = _this.document.getElementById(elSelector);
                        if (element !== null && element.focus) {
                            element.focus();
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                });
            }, 200);
        };
        FormRendererComponent.prototype.onDateChanged = function (node) {
            // console.log('Node', node);
            this.node = node;
        };
        FormRendererComponent.prototype.upload = function (event) {
            // console.log('Event', event);
            // console.log('Data', this.dataSource);
        };
        FormRendererComponent.prototype.toggleInformation = function (infoId) {
            var e = document.getElementById(infoId);
            if (e.style.display === 'block') {
                e.style.display = 'none';
            }
            else {
                e.style.display = 'block';
            }
            console.log('InfoId', infoId);
        };
        FormRendererComponent.prototype.getErrors = function (node) {
            var errors = node.control.errors;
            if (errors) {
                return this.validationFactory.errors(errors, node.question);
            }
            return [];
        };
        FormRendererComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'form-renderer',
                        template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul\n      class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\"\n      role=\"menu\"\n      aria-labelledby=\"dropdownMenu\"\n    >\n      <li\n        *ngFor=\"let question of node.question.questions; let i = index\"\n        (click)=\"clickTab(i)\"\n      >\n        {{ question.label }}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group\n    (selectedIndexChange)=\"tabSelected($event)\"\n    [selectedIndex]=\"activeTab\"\n  >\n    <mat-tab\n      [label]=\"question.label\"\n      *ngFor=\"let question of node.question.questions; let i = index\"\n    >\n      <div (swipeLeft)=\"loadNextTab()\" (swipeRight)=\"loadPreviousTab()\">\n        <form-renderer\n          [node]=\"node.children[question.key]\"\n          [parentComponent]=\"this\"\n          [parentGroup]=\"node.control\"\n        ></form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center\">\n    <button\n      type=\"button\"\n      class=\"btn btn-default\"\n      (click)=\"loadPreviousTab()\"\n      [ngClass]=\"{ disabled: isCurrentTabFirst() }\"\n    >\n      &lt;&lt;\n    </button>\n    <button\n      type=\"button\"\n      class=\"btn btn-default\"\n      (click)=\"loadNextTab()\"\n      [ngClass]=\"{ disabled: isCurrentTabLast() }\"\n    >\n      &gt;&gt;\n    </button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer\n    *ngFor=\"let question of node.question.questions\"\n    [parentComponent]=\"this\"\n    [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"\n  ></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\">\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <button\n        type=\"button\"\n        class=\"btn btn-primary pull-right\"\n        (click)=\"isCollapsed = !isCollapsed\"\n      >\n        {{ isCollapsed ? 'Show' : 'Hide' }}\n      </button>\n      {{ node.question.label }}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer\n        *ngFor=\"let question of node.question.questions\"\n        [parentComponent]=\"this\"\n        [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"\n      ></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div\n  *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\"\n  class=\"alert alert-warning\"\n>\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{ node.control.alert }}\n</div>\n\n<!--CONTROLS-->\n\n<div\n  *ngIf=\"node.question.controlType === 0\"\n  class=\"form-group\"\n  [formGroup]=\"parentGroup\"\n  [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{ disabled: node.control.disabled }\"\n>\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a\n      class=\"form-tooltip pull-right\"\n      (click)=\"toggleInformation(node.question.extras.id)\"\n      data-placement=\"right\"\n      *ngIf=\"\n        node.question &&\n        node.question.extras.questionInfo &&\n        node.question.extras.questionInfo !== '' &&\n        node.question.extras.questionInfo !== ' '\n      \"\n    >\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label\n      *ngIf=\"node.question.label\"\n      [style.color]=\"hasErrors() ? 'red' : ''\"\n      class=\"control-label\"\n      [attr.for]=\"node.question.key\"\n    >\n      {{ node.question.required ? '*' : '' }} {{ node.question.label }}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select\n        class=\"form-control\"\n        *ngSwitchCase=\"'select'\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n      >\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">\n          {{ o.label }}\n        </option>\n      </select>\n\n      <app-file-upload\n        *ngSwitchCase=\"'file'\"\n        [dataSource]=\"dataSource\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\"\n      >\n      </app-file-upload>\n      <textarea\n        [placeholder]=\"node.question.placeholder\"\n        [rows]=\"node.question.rows\"\n        class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n      >\n      </textarea>\n      <!--\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"items$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"{{node.question.placeholder}}\"\n        [hideSelected]=\"true\" [loading]=\"itemsLoading\"  [typeahead]=\"itemsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n    -->\n      <remote-select\n        *ngSwitchCase=\"'remote-select'\"\n        [placeholder]=\"node.question.placeholder\"\n        tabindex=\"0\"\n        [dataSource]=\"dataSource\"\n        [componentID]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n      ></remote-select>\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker\n        *ngSwitchCase=\"'date'\"\n        [showTime]=\"node.question.showTime\"\n        [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\"\n        [weeks]=\"node.question.extras.questionOptions.weeksList\"\n        (onDateChange)=\"onDateChanged(node)\"\n        [showWeeks]=\"node.question.showWeeksAdder\"\n      ></ngx-date-time-picker>\n      <ngx-time-picker  \n      *ngSwitchCase=\"'time'\"  \n      id=\"node.question.key + 'id'\"  \n      [formControlName]=\"node.question.key\"\n      ></ngx-time-picker>\n      <ng-select\n        *ngSwitchCase=\"'multi-select'\"\n        [style.height]=\"'auto'\"\n        [style.overflow-x]=\"'hidden'\"\n        tabindex=\"0\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n        [options]=\"node.question.options\"\n        [multiple]=\"true\"\n      >\n      </ng-select>\n      <ng-select\n        *ngSwitchCase=\"'single-select'\"\n        [style.height]=\"auto\"\n        tabindex=\"0\"\n        [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"\n        [options]=\"node.question.options\"\n        [multiple]=\"false\"\n      >\n      </ng-select>\n      <input\n        class=\"form-control\"\n        *ngSwitchCase=\"'number'\"\n        [formControlName]=\"node.question.key\"\n        [attr.placeholder]=\"node.question.placeholder\"\n        [type]=\"'number'\"\n        [id]=\"node.question.key + 'id'\"\n        [step]=\"'any'\"\n        [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\"\n      />\n      <input\n        class=\"form-control\"\n        *ngSwitchCase=\"'decimal'\"\n        [formControlName]=\"node.question.key\"\n        [attr.placeholder]=\"node.question.placeholder\"\n        [type]=\"'text'\"\n        [id]=\"node.question.key + 'id'\"\n        [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\"\n      />\n      <input\n        class=\"form-control\"\n        *ngSwitchDefault\n        [formControlName]=\"node.question.key\"\n        [attr.placeholder]=\"node.question.placeholder\"\n        [type]=\"node.question.renderingType\"\n        [id]=\"node.question.key + 'id'\"\n      />\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input\n              type=\"radio\"\n              [formControlName]=\"node.question.key\"\n              [id]=\"node.question.key + 'id'\"\n              [value]=\"o.value\"\n            />\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox\n          [id]=\"node.question.key + 'id'\"\n          [formControlName]=\"node.question.key\"\n          [options]=\"node.question.options\"\n          [selected]=\"node.control.value\"\n        ></checkbox>\n      </div>\n\n      <div\n        *ngIf=\"\n          node.question.enableHistoricalValue && node.question.historicalDisplay\n        \"\n        style=\"margin-top: 2px\"\n      >\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{ node.question.historicalDisplay?.text }}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\"\n                  >{{ node.question.historicalDisplay?._date }}\n                </strong>\n                <span\n                  class=\"text-primary\"\n                  *ngIf=\"\n                    node.question.historicalDisplay &&\n                    node.question.historicalDisplay._date\n                  \"\n                >\n                  ({{ node.question.historicalDisplay._date | timeAgo }})</span\n                >\n              </span>\n            </div>\n            <button\n              type=\"button\"\n              [node]=\"node\"\n              [name]=\"'historyValue'\"\n              class=\"btn btn-primary btn-small col-xs-3\"\n            >\n              Use Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors()\">\n        <p *ngFor=\"let e of errors()\">\n          <span class=\"text-danger\">{{ e }}</span>\n        </p>\n      </div>\n    </div>\n\n    <div\n      class=\"question-info col-md-12 col-lg-12 col-sm-12\"\n      id=\"{{ node.question.extras.id }}\"\n      *ngIf=\"\n        node.question &&\n        node.question.extras.questionInfo &&\n        node.question.extras.questionInfo !== '' &&\n        node.question.extras.questionInfo !== ' '\n      \"\n    >\n      {{ node.question.extras.questionInfo }}\n    </div>\n  </div>\n</div>\n<div\n  *ngIf=\"node.question.controlType === 1\"\n  [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{ disabled: node.control.disabled }\"\n>\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType\">\n    <div class=\"well\" style=\"padding: 2px\" *ngSwitchCase=\"'repeating'\">\n      <h4 style=\"margin: 2px; font-weight: bold\">{{ node.question.label }}</h4>\n      <hr\n        style=\"\n          margin-left: -2px;\n          margin-right: -2px;\n          margin-bottom: 4px;\n          margin-top: 8px;\n          border-width: 2px;\n        \"\n      />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i = index\">\n            <form-renderer\n              *ngFor=\"let question of child.question.questions\"\n              [parentComponent]=\"this\"\n              [node]=\"child.children[question.key]\"\n              [parentGroup]=\"child.control\"\n            ></form-renderer>\n            <div>{{ child.orderNumber }}</div>\n            <button\n              type=\"button \"\n              class=\"btn btn-sm btn-danger\"\n              (click)=\"node.removeAt(i)\"\n            >\n              Remove\n            </button>\n            <br />\n            <hr\n              style=\"\n                margin-left: -2px;\n                margin-right: -2px;\n                margin-bottom: 4px;\n                margin-top: 8px;\n                border-width: 1px;\n              \"\n            />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom: 20px\">\n          <div *ngFor=\"let child of node.children; let i = index\">\n            <form-renderer\n              *ngFor=\"let question of child.question.questions\"\n              [parentComponent]=\"this\"\n              [node]=\"child.children[question.key]\"\n              [parentGroup]=\"child.control\"\n            ></form-renderer>\n            <button\n              type=\"button \"\n              class=\"btn btn-sm btn-danger\"\n              (click)=\"node.removeAt(i)\"\n            >\n              Remove\n            </button>\n            <br />\n            <hr\n              style=\"\n                margin-left: -2px;\n                margin-right: -2px;\n                margin-bottom: 4px;\n                margin-top: 8px;\n                border-width: 1px;\n              \"\n            />\n          </div>\n        </div>\n      </div>\n      <button\n        type=\"button \"\n        class=\"btn btn-primary\"\n        (click)=\"node.createChildNode()\"\n      >\n        Add\n      </button>\n    </div>\n  </div>\n</div>\n<div\n  *ngIf=\"node.question.controlType === 2\"\n  [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{ disabled: node.control.disabled }\"\n>\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType\">\n    <div *ngSwitchCase=\"'group'\">\n      <form-renderer\n        *ngFor=\"let question of node.question.questions\"\n        [parentComponent]=\"this\"\n        [node]=\"node.children[question.key]\"\n        [parentGroup]=\"node.control\"\n      ></form-renderer>\n    </div>\n    <div\n      *ngSwitchCase=\"'field-set'\"\n      style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px\"\n    >\n      <form-renderer\n        *ngFor=\"let question of node.question.questions\"\n        [parentComponent]=\"this\"\n        [node]=\"node.children[question.key]\"\n        [parentGroup]=\"node.control\"\n      ></form-renderer>\n    </div>\n  </div>\n</div>\n",
                        styles: ['../../style/app.css', DEFAULT_STYLES]
                    },] },
        ];
        FormRendererComponent.ctorParameters = function () {
            return [
                { type: ValidationFactory },
                { type: DataSources },
                { type: FormErrorsService },
                { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
            ];
        };
        FormRendererComponent.propDecorators = {
            parentComponent: [{ type: i0.Input }],
            node: [{ type: i0.Input }],
            parentGroup: [{ type: i0.Input }]
        };
        return FormRendererComponent;
    }());

    var ErrorRendererComponent = (function () {
        function ErrorRendererComponent(validationFactory, formErrorsService) {
            this.validationFactory = validationFactory;
            this.formErrorsService = formErrorsService;
        }
        ErrorRendererComponent.prototype.ngOnInit = function () { };
        ErrorRendererComponent.prototype.showErrors = function () {
            return !this.form.valid && this.form.showErrors;
        };
        Object.defineProperty(ErrorRendererComponent.prototype, "errorNodes", {
            get: function () {
                var invalidControls = this.form.markInvalidControls(this.form.rootNode, []);
                return invalidControls;
            },
            enumerable: true,
            configurable: true
        });
        ErrorRendererComponent.prototype.getControlError = function (node) {
            var errors = node.control.errors;
            if (errors) {
                return this.validationFactory.errors(errors, node.question);
            }
            return [];
        };
        ErrorRendererComponent.prototype.announceErrorField = function (errorNode) {
            var _this = this;
            var nodes = this.form.searchNodeByQuestionId(errorNode.path.substring(0, errorNode.path.indexOf('.')));
            _.forEach(nodes, function (node) {
                if (node.question.renderingType === 'page') {
                    var pageIndex = _this.getPageIndex(node);
                    _this.formErrorsService.announceErrorField(pageIndex + ',' + errorNode.question.key);
                }
            });
        };
        ErrorRendererComponent.prototype.getPageIndex = function (node) {
            var questionGroup = this.form.rootNode
                .question;
            return questionGroup.questions.indexOf(node.question);
        };
        ErrorRendererComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'error-renderer',
                        template: "<div *ngIf=\"showErrors()\" class=\"container\">\n  <ul class=\"list-group\">\n    <li\n      class=\"list-group-item list-group-item-warning\"\n      *ngFor=\"let errorNode of errorNodes\"\n      (click)=\"announceErrorField(errorNode)\"\n    >\n      <div class=\"error\" *ngIf=\"errorNode.control.valid == false\">\n        <h4>{{ errorNode.question.label }}</h4>\n        <span class=\"text-danger\"> {{ getControlError(errorNode) }}</span>\n      </div>\n    </li>\n  </ul>\n</div>\n",
                        styles: ["ul{list-style:none}.list-group-item{padding:2px 15px;cursor:pointer}ul li:hover{background-color:#fff}h4{margin-top:7px;margin-bottom:7px}"]
                    },] },
        ];
        ErrorRendererComponent.ctorParameters = function () {
            return [
                { type: ValidationFactory },
                { type: FormErrorsService }
            ];
        };
        ErrorRendererComponent.propDecorators = {
            form: [{ type: i0.Input }]
        };
        return ErrorRendererComponent;
    }());

    var HistoricalFieldHelperService = (function () {
        function HistoricalFieldHelperService() {
        }
        HistoricalFieldHelperService.prototype.getDisplayTextFromOptions = function (question, valueProperty, displayProperty) {
            var displayText = '';
            var historicalValue = question.historicalDataValue;
            if (_.isArray(historicalValue.value)) {
                var valueConverted_1 = 0;
                _.each(historicalValue.value, function (val) {
                    _.each(question.options, function (option) {
                        if (option[valueProperty] === val) {
                            if (valueConverted_1 === 0) {
                                displayText = displayText + option[displayProperty];
                            }
                            else {
                                displayText = displayText + ', ' + option[displayProperty];
                            }
                            valueConverted_1++;
                        }
                    });
                });
            }
            else {
                _.each(question.options, function (option) {
                    if (option[valueProperty] === historicalValue.value) {
                        displayText = option[displayProperty];
                    }
                });
            }
            return displayText;
        };
        return HistoricalFieldHelperService;
    }());

    var HistoricalValueDirective = (function () {
        function HistoricalValueDirective(historicalFieldHelper) {
            this.historicalFieldHelper = historicalFieldHelper;
            this._nodeChange = new i0.EventEmitter();
        }
        HistoricalValueDirective.prototype.setValue = function (e) {
            if (e.target.name === 'historyValue') {
                if (this._node &&
                    (!this.compareString(this._node.question.renderingType, 'page') ||
                        !this.compareString(this._node.question.renderingType, 'section'))) {
                    this._node.control.setValue(this._node.question.historicalDataValue.value);
                    this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                    e.stopPropagation();
                    this._nodeChange.emit(this._node);
                }
            }
        };
        HistoricalValueDirective.prototype.compareString = function (a, b) {
            if (a === b) {
                return true;
            }
            else {
                return false;
            }
        };
        Object.defineProperty(HistoricalValueDirective.prototype, "node", {
            set: function (node) {
                if (node) {
                    this._node = node;
                    if (this._node.question.enableHistoricalValue &&
                        !_.isUndefined(this._node.question.historicalDataValue)) {
                        var display = { text: '', _date: '' };
                        if (this._node.question.renderingType === 'select' ||
                            this._node.question.renderingType === 'multi-select' ||
                            this._node.question.renderingType === 'single-select') {
                            display.text = this.historicalFieldHelper.getDisplayTextFromOptions(this._node.question, 'value', 'label');
                            display._date = this._node.question.historicalDataValue.valueDate;
                            this._node.question['historicalDisplay'] = display;
                        }
                        else if (!_.isUndefined(this._node.question.historicalDataValue)) {
                            display.text = this._node.question.historicalDataValue.value;
                            display._date = this._node.question.historicalDataValue.valueDate;
                            this._node.question['historicalDisplay'] = display;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        HistoricalValueDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: "[node]"
                    },] },
        ];
        HistoricalValueDirective.ctorParameters = function () {
            return [
                { type: HistoricalFieldHelperService }
            ];
        };
        HistoricalValueDirective.propDecorators = {
            _node: [{ type: i0.Input }],
            _nodeChange: [{ type: i0.Output }],
            setValue: [{ type: i0.HostListener, args: ['click', ['$event'],] }],
            node: [{ type: i0.Input }]
        };
        return HistoricalValueDirective;
    }());

    var STYLE = "\nng-select {\n  display: inline-block;\n  margin: 0;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n}\nng-select * {\n  box-sizing: border-box;\n  font-family: Sans-Serif;\n}\nng-select > div {\n  border: 1px solid #ddd;\n  box-sizing: border-box;\n  cursor: pointer;\n  user-select: none;\n  width: 100%;\n}\nng-select > div.disabled {\n  background-color: #eee;\n  color: #aaa;\n  cursor: default;\n  pointer-events: none;\n}\nng-select > div > div.single {\n  display: flex;\n  height: 30px;\n  width: 100%;\n}\nng-select > div > div.single > div.value,\nng-select > div > div.single > div.placeholder {\n  flex: 1;\n  line-height: 30px;\n  overflow: hidden;\n  padding: 0 10px;\n  white-space: nowrap;\n}\nng-select > div > div.single > div.placeholder {\n  color: #a9a9a9;\n}\nng-select > div > div.single > div.clear,\nng-select > div > div.single > div.toggle {\n  color: #aaa;\n  line-height: 30px;\n  text-align: center;\n  width: 30px;\n}\nng-select > div > div.single > div.clear:hover,\nng-select > div > div.single > div.toggle:hover {\n  background-color: #ececec;\n}\nng-select > div > div.single > div.clear {\n  font-size: 18px;\n}\nng-select > div > div.single > div.toggle {\n  font-size: 14px;\n}\nng-select > div > div.multiple {\n  display: flex;\n  flex-flow: row wrap;\n  height: 100%;\n  min-height: 30px;\n  padding: 0 10px;\n  width: 100%;\n}\nng-select > div > div.multiple > div.option {\n  background-color: #eee;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  color: #333;\n  cursor: default;\n  display: inline-block;\n  flex-shrink: 0;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 3px 5px 3px 0;\n  padding: 0 4px;\n}\nng-select > div > div.multiple > div.option span.deselect-option {\n  color: #aaa;\n  cursor: pointer;\n  font-size: 14px;\n  height: 20px;\n  line-height: 20px;\n}\nng-select > div > div.multiple > div.option span.deselect-option:hover {\n  color: #555;\n}\nng-select > div > div.multiple input {\n  background-color: transparent;\n  border: none;\n  height: 30px;\n  line-height: 30px;\n  padding: 0;\n}\nng-select > div > div.multiple input:focus {\n  outline: none;\n}\n";

    var Option = (function () {
        function Option(value, label) {
            this.value = value;
            this.label = label;
            this.disabled = false;
            this.highlighted = false;
            this.selected = false;
            this.shown = true;
        }
        Option.prototype.show = function () {
            this.shown = true;
        };
        Option.prototype.hide = function () {
            this.shown = false;
        };
        Option.prototype.disable = function () {
            this.disabled = true;
        };
        Option.prototype.enable = function () {
            this.disabled = false;
        };
        Option.prototype.undecoratedCopy = function () {
            return {
                label: this.label,
                value: this.value
            };
        };
        return Option;
    }());

    var Diacritics = (function () {
        function Diacritics() {
        }
        Diacritics.strip = function (text) {
            var _this = this;
            var match = function (a) {
                return _this.DIACRITICS[a] || a;
            };
            if (text) {
                return text.replace(/[^\u0000-\u007E]/g, match);
            }
            else {
                return '';
            }
        };
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
        return Diacritics;
    }());

    var OptionList = (function () {
        function OptionList(options) {
            /* Consider using these for performance improvement. */
            // private _selection: Array<Option>;
            // private _filtered: Array<Option>;
            // private _value: Array<string>;
            this._highlightedOption = null;
            if (typeof options === 'undefined' || options === null) {
                options = [];
            }
            this._options = options.map(function (option) {
                var o = new Option(option.value, option.label);
                if (option.disabled) {
                    o.disable();
                }
                return o;
            });
            this.highlight();
        }
        // v0 and v1 are assumed not to be undefined or null.
        OptionList.equalValues = function (v0, v1) {
            if (v0.length !== v1.length) {
                return false;
            }
            var a = v0.slice().sort();
            var b = v1.slice().sort();
            return a.every(function (v, i) {
                return v === b[i];
            });
        };
        Object.defineProperty(OptionList.prototype, "options", {
            /** Options. **/
            get: function () {
                return this._options;
            },
            enumerable: true,
            configurable: true
        });
        OptionList.prototype.getOptionsByValue = function (value) {
            return this.options.filter(function (option) {
                return option.value === value;
            });
        };
        Object.defineProperty(OptionList.prototype, "value", {
            /** Value. **/
            get: function () {
                return this.selection.map(function (selectedOption) {
                    return selectedOption.value;
                });
            },
            set: function (v) {
                v = typeof v === 'undefined' || v === null ? [] : v;
                this.options.forEach(function (option) {
                    option.selected = v.indexOf(option.value) > -1;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OptionList.prototype, "selection", {
            /** Selection. **/
            get: function () {
                return this.options.filter(function (option) {
                    return option.selected;
                });
            },
            enumerable: true,
            configurable: true
        });
        OptionList.prototype.select = function (option, multiple) {
            if (!multiple) {
                this.clearSelection();
            }
            option.selected = true;
        };
        OptionList.prototype.deselect = function (option) {
            option.selected = false;
        };
        OptionList.prototype.clearSelection = function () {
            this.options.forEach(function (option) {
                option.selected = false;
            });
        };
        Object.defineProperty(OptionList.prototype, "filtered", {
            /** Filter. **/
            get: function () {
                return this.options.filter(function (option) {
                    return option.shown;
                });
            },
            enumerable: true,
            configurable: true
        });
        OptionList.prototype.filter = function (term) {
            if (term.trim() === '') {
                this.resetFilter();
            }
            else {
                this.options.forEach(function (option) {
                    var l = Diacritics.strip(option.label).toUpperCase();
                    var t = Diacritics.strip(term).toUpperCase();
                    option.shown = l.indexOf(t) > -1;
                });
            }
            this.highlight();
        };
        OptionList.prototype.resetFilter = function () {
            this.options.forEach(function (option) {
                option.shown = true;
            });
        };
        Object.defineProperty(OptionList.prototype, "highlightedOption", {
            /** Highlight. **/
            get: function () {
                return this._highlightedOption;
            },
            enumerable: true,
            configurable: true
        });
        OptionList.prototype.highlight = function () {
            var option = this.hasShownSelected()
                ? this.getFirstShownSelected()
                : this.getFirstShown();
            this.highlightOption(option);
        };
        OptionList.prototype.highlightOption = function (option) {
            this.clearHighlightedOption();
            if (option !== null) {
                option.highlighted = true;
                this._highlightedOption = option;
            }
        };
        OptionList.prototype.highlightNextOption = function () {
            var shownOptions = this.filtered;
            var index = this.getHighlightedIndexFromList(shownOptions);
            if (index > -1 && index < shownOptions.length - 1) {
                this.highlightOption(shownOptions[index + 1]);
            }
        };
        OptionList.prototype.highlightPreviousOption = function () {
            var shownOptions = this.filtered;
            var index = this.getHighlightedIndexFromList(shownOptions);
            if (index > 0) {
                this.highlightOption(shownOptions[index - 1]);
            }
        };
        OptionList.prototype.clearHighlightedOption = function () {
            if (this.highlightedOption !== null) {
                this.highlightedOption.highlighted = false;
                this._highlightedOption = null;
            }
        };
        OptionList.prototype.getHighlightedIndexFromList = function (options) {
            for (var i = 0; i < options.length; i++) {
                if (options[i].highlighted) {
                    return i;
                }
            }
            return -1;
        };
        OptionList.prototype.getHighlightedIndex = function () {
            return this.getHighlightedIndexFromList(this.filtered);
        };
        /** Util. **/
        OptionList.prototype.hasShown = function () {
            return this.options.some(function (option) {
                return option.shown;
            });
        };
        OptionList.prototype.hasSelected = function () {
            return this.options.some(function (option) {
                return option.selected;
            });
        };
        OptionList.prototype.hasShownSelected = function () {
            return this.options.some(function (option) {
                return option.shown && option.selected;
            });
        };
        OptionList.prototype.getFirstShown = function () {
            try {
                for (var _a = __values(this.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var option = _b.value;
                    if (option.shown) {
                        return option;
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return null;
            var e_1, _c;
        };
        OptionList.prototype.getFirstShownSelected = function () {
            try {
                for (var _a = __values(this.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var option = _b.value;
                    if (option.shown && option.selected) {
                        return option;
                    }
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return null;
            var e_2, _c;
        };
        return OptionList;
    }());

    var SELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        // tslint:disable:no-use-before-declare
        useExisting: i0.forwardRef(function () { return SelectComponent; }),
        multi: true
    };
    var SelectComponent = (function () {
        function SelectComponent() {
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
            this.opened = new i0.EventEmitter();
            this.closed = new i0.EventEmitter();
            this.selected = new i0.EventEmitter();
            this.deselected = new i0.EventEmitter();
            this.typed = new i0.EventEmitter();
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
            this.onChange = function (_$$1) { };
            this.onTouched = function () { };
        }
        /** Event handlers. **/
        // Angular lifecycle hooks.
        SelectComponent.prototype.ngOnInit = function () {
            this.placeholderView = this.placeholder;
        };
        SelectComponent.prototype.ngAfterViewInit = function () {
            this.updateFilterWidth();
        };
        SelectComponent.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty('options')) {
                this.updateOptionsList(changes['options'].isFirstChange());
            }
            if (changes.hasOwnProperty('noFilter')) {
                var numOptions = this.optionList.options.length;
                var minNumOptions = changes['noFilter'].currentValue;
                this.filterEnabled = numOptions >= minNumOptions;
            }
        };
        // Window.
        SelectComponent.prototype.onWindowClick = function () {
            if (!this.selectContainerClicked) {
                this.closeDropdown();
            }
            this.clearClicked = false;
            this.selectContainerClicked = false;
        };
        SelectComponent.prototype.onWindowResize = function () {
            this.updateWidth();
        };
        // Select container.
        SelectComponent.prototype.onSelectContainerClick = function (event) {
            this.selectContainerClicked = true;
            if (!this.clearClicked) {
                this.toggleDropdown();
            }
        };
        SelectComponent.prototype.onSelectContainerFocus = function () {
            this.onTouched();
        };
        SelectComponent.prototype.onSelectContainerKeydown = function (event) {
            this.handleSelectContainerKeydown(event);
        };
        // Dropdown container.
        SelectComponent.prototype.onDropdownOptionClicked = function (option) {
            this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
        };
        SelectComponent.prototype.onDropdownClose = function (focus) {
            this.closeDropdown(focus);
        };
        // Single filter input.
        SelectComponent.prototype.onSingleFilterClick = function () {
            this.selectContainerClicked = true;
        };
        SelectComponent.prototype.onSingleFilterInput = function (term) {
            var _this = this;
            setTimeout(function () {
                if (term.length > 2) {
                    _this.typed.emit(term);
                }
            }, 500);
            this.optionList.filter(term);
        };
        SelectComponent.prototype.onSingleFilterKeydown = function (event) {
            this.handleSingleFilterKeydown(event);
        };
        // Multiple filter input.
        SelectComponent.prototype.onMultipleFilterInput = function (event) {
            var _this = this;
            if (!this.isOpen) {
                this.openDropdown();
            }
            this.updateFilterWidth();
            setTimeout(function () {
                _this.optionList.filter(event.target.value);
            });
        };
        SelectComponent.prototype.onMultipleFilterKeydown = function (event) {
            this.handleMultipleFilterKeydown(event);
        };
        // Single clear select.
        SelectComponent.prototype.onClearSelectionClick = function (event) {
            this.clearClicked = true;
            this.clearSelection();
            this.closeDropdown(true);
        };
        // Multiple deselect option.
        SelectComponent.prototype.onDeselectOptionClick = function (option) {
            this.clearClicked = true;
            this.deselectOption(option);
        };
        /** API. **/
        // TODO fix issues with global click/key handler that closes the dropdown.
        SelectComponent.prototype.open = function () {
            this.openDropdown();
        };
        SelectComponent.prototype.close = function () {
            this.closeDropdown();
        };
        SelectComponent.prototype.clear = function () {
            this.clearSelection();
        };
        SelectComponent.prototype.select = function (value) {
            var _this = this;
            this.optionList.getOptionsByValue(value).forEach(function (option) {
                _this.selectOption(option);
            });
            this.valueChanged();
        };
        /** ControlValueAccessor interface methods. **/
        SelectComponent.prototype.writeValue = function (value) {
            this.value = value;
        };
        SelectComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        SelectComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        SelectComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        Object.defineProperty(SelectComponent.prototype, "value", {
            /** Value. **/
            get: function () {
                if (this._value.length === 0) {
                    return '';
                }
                else {
                    return this.multiple ? this._value : this._value[0];
                }
            },
            set: function (v) {
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
            },
            enumerable: true,
            configurable: true
        });
        SelectComponent.prototype.valueChanged = function () {
            this._value = this.optionList.value;
            this.hasSelected = this._value.length > 0;
            this.placeholderView = this.hasSelected ? '' : this.placeholder;
            this.updateFilterWidth();
            this.onChange(this.value);
        };
        /** Initialization. **/
        SelectComponent.prototype.updateOptionsList = function (firstTime) {
            var v;
            if (!firstTime) {
                v = this.optionList.value;
            }
            this.optionList = new OptionList(this.options);
            if (!firstTime) {
                this.optionList.value = v;
                this.valueChanged();
            }
        };
        /** Dropdown. **/
        SelectComponent.prototype.toggleDropdown = function () {
            if (!this.isDisabled) {
                this.isOpen ? this.closeDropdown(true) : this.openDropdown();
            }
        };
        SelectComponent.prototype.openDropdown = function () {
            if (!this.isOpen) {
                this.updateWidth();
                this.updatePosition();
                this.isOpen = true;
                if (this.multiple && this.filterEnabled) {
                    this.filterInput.nativeElement.focus();
                }
                this.opened.emit(null);
            }
        };
        /* tslint:disable */
        SelectComponent.prototype.closeDropdown = function (focus) {
            if (focus === void 0) {
                focus = false;
            }
            if (this.isOpen) {
                this.clearFilterInput();
                this.isOpen = false;
                if (focus) {
                    this.focus();
                }
                this.closed.emit(null);
            }
        };
        /* tslint:enable */
        /** Select. **/
        SelectComponent.prototype.selectOption = function (option) {
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
        };
        SelectComponent.prototype.deselectOption = function (option) {
            var _this = this;
            if (option.selected) {
                this.optionList.deselect(option);
                this.valueChanged();
                this.deselected.emit(option.undecoratedCopy());
                setTimeout(function () {
                    if (_this.multiple) {
                        // this.updateFilterWidth();
                        _this.updatePosition();
                        _this.optionList.highlight();
                        if (_this.isOpen) {
                            _this.dropdown.moveHighlightedIntoView();
                        }
                    }
                });
            }
        };
        SelectComponent.prototype.clearSelection = function () {
            var selection = this.optionList.selection;
            if (selection.length > 0) {
                this.optionList.clearSelection();
                this.valueChanged();
                if (selection.length === 1) {
                    this.deselected.emit(selection[0].undecoratedCopy());
                }
                else {
                    this.deselected.emit(selection.map(function (option) {
                        return option.undecoratedCopy();
                    }));
                }
            }
        };
        SelectComponent.prototype.toggleSelectOption = function (option) {
            option.selected ? this.deselectOption(option) : this.selectOption(option);
        };
        SelectComponent.prototype.selectHighlightedOption = function () {
            var option = this.optionList.highlightedOption;
            if (option !== null) {
                this.selectOption(option);
                this.closeDropdown(true);
            }
        };
        SelectComponent.prototype.deselectLast = function () {
            var sel = this.optionList.selection;
            if (sel.length > 0) {
                var option = sel[sel.length - 1];
                this.deselectOption(option);
                this.setMultipleFilterInput(option.label + ' ');
            }
        };
        /** Filter. **/
        SelectComponent.prototype.clearFilterInput = function () {
            if (this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.value = '';
            }
            else {
                this.dropdown.clearFilterInput();
            }
        };
        SelectComponent.prototype.setMultipleFilterInput = function (value) {
            if (this.filterEnabled) {
                this.filterInput.nativeElement.value = value;
            }
        };
        SelectComponent.prototype.handleSelectContainerKeydown = function (event) {
            var _this = this;
            var key = event.which;
            if (this.isOpen) {
                if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {
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
                if (key === this.KEYS.ENTER ||
                    key === this.KEYS.SPACE ||
                    (key === this.KEYS.DOWN && event.altKey)) {
                    /* FIREFOX HACK:
                     *
                     * The setTimeout is added to prevent the enter keydown event
                     * to be triggered for the filter input field, which causes
                     * the dropdown to be closed again.
                     */
                    setTimeout(function () {
                        _this.openDropdown();
                    });
                }
            }
        };
        SelectComponent.prototype.handleMultipleFilterKeydown = function (event) {
            var key = event.which;
            if (key === this.KEYS.BACKSPACE) {
                if (this.hasSelected &&
                    this.filterEnabled &&
                    this.filterInput.nativeElement.value === '') {
                    this.deselectLast();
                }
            }
        };
        SelectComponent.prototype.handleSingleFilterKeydown = function (event) {
            var key = event.which;
            if (key === this.KEYS.ESC ||
                key === this.KEYS.TAB ||
                key === this.KEYS.UP ||
                key === this.KEYS.DOWN ||
                key === this.KEYS.ENTER) {
                this.handleSelectContainerKeydown(event);
            }
        };
        /** View. **/
        SelectComponent.prototype.focus = function () {
            this.hasFocus = true;
            if (this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
            else {
                this.selectionSpan.nativeElement.focus();
            }
        };
        SelectComponent.prototype.blur = function () {
            this.hasFocus = false;
            this.selectionSpan.nativeElement.blur();
        };
        SelectComponent.prototype.updateWidth = function () {
            this.width = this.selectionSpan.nativeElement.offsetWidth;
        };
        SelectComponent.prototype.updatePosition = function () {
            var e = this.selectionSpan.nativeElement;
            this.left = e.offsetLeft;
            this.top = e.offsetTop + e.offsetHeight;
        };
        SelectComponent.prototype.updateFilterWidth = function () {
            if (typeof this.filterInput !== 'undefined') {
                var value = this.filterInput.nativeElement.value;
                this.filterInputWidth =
                    value.length === 0
                        ? 1 + this.placeholderView.length * 10
                        : 1 + value.length * 10;
            }
        };
        SelectComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-select',
                        template: "<div\n  #selection\n  [attr.tabindex]=\"disabled ? null : 0\"\n  [ngClass]=\"{\n    open: isOpen,\n    focus: hasFocus,\n    below: isBelow,\n    disabled: disabled\n  }\"\n  (click)=\"onSelectContainerClick($event)\"\n  (focus)=\"onSelectContainerFocus()\"\n  (keydown)=\"onSelectContainerKeydown($event)\"\n  (window:click)=\"onWindowClick()\"\n  (window:resize)=\"onWindowResize()\"\n>\n  <div class=\"single\" *ngIf=\"!multiple\">\n    <div class=\"value\" *ngIf=\"optionList.hasSelected()\">\n      {{ optionList.selection[0].label }}\n    </div>\n    <div class=\"placeholder\" *ngIf=\"!optionList.hasSelected()\">\n      {{ placeholderView }}\n    </div>\n    <div\n      class=\"clear\"\n      *ngIf=\"allowClear\"\n      (click)=\"onClearSelectionClick($event)\"\n    >\n      &#x2715;\n    </div>\n    <div class=\"toggle\" *ngIf=\"isOpen\">&#x25B2;</div>\n    <div class=\"toggle\" *ngIf=\"!isOpen\">&#x25BC;</div>\n  </div>\n\n  <div class=\"multiple\" *ngIf=\"multiple\">\n    <div class=\"option\" *ngFor=\"let option of optionList.selection\">\n      <span class=\"deselect-option\" (click)=\"onDeselectOptionClick(option)\">\n        &#x2715;\n      </span>\n      {{ option.label }}\n    </div>\n    <input\n      *ngIf=\"filterEnabled\"\n      #filterInput\n      tabindex=\"-1\"\n      [placeholder]=\"placeholderView\"\n      [ngStyle]=\"{ 'width.px': filterInputWidth }\"\n      (input)=\"onMultipleFilterInput($event)\"\n      (keydown)=\"onMultipleFilterKeydown($event)\"\n    />\n  </div>\n</div>\n<select-dropdown\n  *ngIf=\"isOpen\"\n  #dropdown\n  [multiple]=\"multiple\"\n  [optionList]=\"optionList\"\n  [notFoundMsg]=\"notFoundMsg\"\n  [highlightColor]=\"highlightColor\"\n  [highlightTextColor]=\"highlightTextColor\"\n  [filterEnabled]=\"filterEnabled\"\n  [width]=\"width\"\n  [top]=\"top\"\n  [left]=\"left\"\n  (close)=\"onDropdownClose($event)\"\n  (optionClicked)=\"onDropdownOptionClicked($event)\"\n  (singleFilterClick)=\"onSingleFilterClick()\"\n  (singleFilterInput)=\"onSingleFilterInput($event)\"\n  (singleFilterKeydown)=\"onSingleFilterKeydown($event)\"\n>\n</select-dropdown>\n",
                        styles: [STYLE],
                        providers: [SELECT_VALUE_ACCESSOR],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        SelectComponent.propDecorators = {
            options: [{ type: i0.Input }],
            allowClear: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            highlightColor: [{ type: i0.Input }],
            highlightTextColor: [{ type: i0.Input }],
            multiple: [{ type: i0.Input }],
            noFilter: [{ type: i0.Input }],
            notFoundMsg: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            opened: [{ type: i0.Output }],
            closed: [{ type: i0.Output }],
            selected: [{ type: i0.Output }],
            deselected: [{ type: i0.Output }],
            typed: [{ type: i0.Output }],
            selectionSpan: [{ type: i0.ViewChild, args: ['selection',] }],
            dropdown: [{ type: i0.ViewChild, args: ['dropdown',] }],
            filterInput: [{ type: i0.ViewChild, args: ['filterInput',] }]
        };
        return SelectComponent;
    }());

    var STYLE$1 = "select-dropdown {\n  box-sizing: border-box;\n  font-family: Sans-Serif;\n}\nselect-dropdown * {\n  box-sizing: border-box;\n  font-family: Sans-Serif;\n}\nselect-dropdown > div {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top: none;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 1;\n}\nselect-dropdown > div .filter {\n  padding: 3px;\n  width: 100%;\n}\nselect-dropdown > div .filter input {\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  padding: 4px;\n  width: 100%;\n}\nselect-dropdown > div .options {\n  max-height: 200px;\n  overflow-y: auto;\n}\nselect-dropdown > div .options ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nselect-dropdown > div .options ul li {\n  padding: 4px 8px;\n  cursor: pointer;\n  user-select: none;\n}\nselect-dropdown .selected {\n  background-color: #e0e0e0;\n}\nselect-dropdown .selected.highlighted {\n  background-color: #2196F3;\n  color: #fff;\n}\nselect-dropdown .highlighted {\n  background-color: #2196F3;\n  color: #fff;\n}\nselect-dropdown .disabled {\n  background-color: #fff;\n  color: #9e9e9e;\n  cursor: default;\n  pointer-events: none;\n}";

    var SelectDropdownComponent = (function () {
        function SelectDropdownComponent() {
            this.close = new i0.EventEmitter();
            this.optionClicked = new i0.EventEmitter();
            this.singleFilterClick = new i0.EventEmitter();
            this.singleFilterInput = new i0.EventEmitter();
            this.singleFilterKeydown = new i0.EventEmitter();
            this.disabledColor = '#fff';
            this.disabledTextColor = '9e9e9e';
        }
        /** Event handlers. **/
        // Angular life cycle hooks.
        SelectDropdownComponent.prototype.ngOnInit = function () {
            this.optionsReset();
        };
        SelectDropdownComponent.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty('optionList')) {
                this.optionsReset();
            }
        };
        SelectDropdownComponent.prototype.ngAfterViewInit = function () {
            this.moveHighlightedIntoView();
            if (!this.multiple && this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
        };
        // Filter input (single select).
        SelectDropdownComponent.prototype.onSingleFilterClick = function (event) {
            this.singleFilterClick.emit(null);
        };
        SelectDropdownComponent.prototype.onSingleFilterInput = function (event) {
            this.singleFilterInput.emit(event.target.value);
        };
        SelectDropdownComponent.prototype.onSingleFilterKeydown = function (event) {
            this.singleFilterKeydown.emit(event);
        };
        // Options list.
        SelectDropdownComponent.prototype.onOptionsWheel = function (event) {
            this.handleOptionsWheel(event);
        };
        SelectDropdownComponent.prototype.onOptionMouseover = function (option) {
            this.optionList.highlightOption(option);
        };
        SelectDropdownComponent.prototype.onOptionClick = function (option) {
            this.optionClicked.emit(option);
        };
        /** Initialization. **/
        SelectDropdownComponent.prototype.optionsReset = function () {
            this.optionList.resetFilter();
            this.optionList.highlight();
        };
        /** View. **/
        SelectDropdownComponent.prototype.getOptionStyle = function (option) {
            if (option.highlighted) {
                return {
                    'background-color': this.highlightColor,
                    color: this.highlightTextColor
                };
            }
            else {
                return {};
            }
        };
        SelectDropdownComponent.prototype.clearFilterInput = function () {
            if (this.filterEnabled) {
                this.filterInput.nativeElement.value = '';
            }
        };
        SelectDropdownComponent.prototype.moveHighlightedIntoView = function () {
            var list = this.optionsList.nativeElement;
            var listHeight = list.offsetHeight;
            var itemIndex = this.optionList.getHighlightedIndex();
            if (itemIndex > -1) {
                var item = list.children[0].children[itemIndex];
                var itemHeight = item.offsetHeight;
                var itemTop = itemIndex * itemHeight;
                var itemBottom = itemTop + itemHeight;
                var viewTop = list.scrollTop;
                var viewBottom = viewTop + listHeight;
                if (itemBottom > viewBottom) {
                    list.scrollTop = itemBottom - listHeight;
                }
                else if (itemTop < viewTop) {
                    list.scrollTop = itemTop;
                }
            }
        };
        SelectDropdownComponent.prototype.handleOptionsWheel = function (e) {
            var div = this.optionsList.nativeElement;
            var atTop = div.scrollTop === 0;
            var atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
            if (atTop && e.deltaY < 0) {
                e.preventDefault();
            }
            else if (atBottom && e.deltaY > 0) {
                e.preventDefault();
            }
        };
        SelectDropdownComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'select-dropdown',
                        template: "<div [ngStyle]=\"{ 'top.px': top, 'left.px': left, 'width.px': width }\">\n  <div class=\"filter\" *ngIf=\"!multiple\">\n    <input\n      *ngIf=\"filterEnabled\"\n      #filterInput\n      (click)=\"onSingleFilterClick($event)\"\n      (input)=\"onSingleFilterInput($event)\"\n      (keydown)=\"onSingleFilterKeydown($event)\"\n    />\n  </div>\n\n  <div class=\"options\" #optionsList>\n    <ul (wheel)=\"onOptionsWheel($event)\">\n      <li\n        *ngFor=\"let option of optionList.filtered\"\n        [ngClass]=\"{\n          highlighted: option.highlighted,\n          selected: option.selected,\n          disabled: option.disabled\n        }\"\n        [ngStyle]=\"getOptionStyle(option)\"\n        (click)=\"onOptionClick(option)\"\n        (mouseover)=\"onOptionMouseover(option)\"\n      >\n        {{ option.label }}\n      </li>\n      <li *ngIf=\"!optionList.hasShown()\" class=\"message\">\n        {{ notFoundMsg }}\n      </li>\n    </ul>\n  </div>\n</div>\n",
                        styles: [STYLE$1],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        SelectDropdownComponent.propDecorators = {
            filterEnabled: [{ type: i0.Input }],
            highlightColor: [{ type: i0.Input }],
            highlightTextColor: [{ type: i0.Input }],
            left: [{ type: i0.Input }],
            multiple: [{ type: i0.Input }],
            notFoundMsg: [{ type: i0.Input }],
            optionList: [{ type: i0.Input }],
            top: [{ type: i0.Input }],
            width: [{ type: i0.Input }],
            close: [{ type: i0.Output }],
            optionClicked: [{ type: i0.Output }],
            singleFilterClick: [{ type: i0.Output }],
            singleFilterInput: [{ type: i0.Output }],
            singleFilterKeydown: [{ type: i0.Output }],
            filterInput: [{ type: i0.ViewChild, args: ['filterInput',] }],
            optionsList: [{ type: i0.ViewChild, args: ['optionsList',] }]
        };
        return SelectDropdownComponent;
    }());

    var SelectModule = (function () {
        function SelectModule() {
        }
        SelectModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [SelectComponent, SelectDropdownComponent],
                        exports: [SelectComponent],
                        imports: [common.CommonModule, forms.FormsModule]
                    },] },
        ];
        return SelectModule;
    }());

    // import { FileUploadResourceService } from '../../etl-api/file-upload-resource.service';
    // Using similarity from AsyncPipe to avoid having to pipe |secure|async in HTML.
    // tslint:disable-next-line:use-pipe-transform-interface
    var SecurePipe = (function () {
        function SecurePipe(_ref, sanitizer) {
            this._ref = _ref;
            this.sanitizer = sanitizer;
            this._latestValue = null;
            this._latestReturnedValue = null;
            this._subscription = null;
            this._obj = null;
            this._result = new rxjs.BehaviorSubject(null);
            this.result = this._result.asObservable();
            this._internalSubscription = null;
        }
        SecurePipe.prototype.ngOnDestroy = function () {
            if (this._subscription) {
                this._dispose();
            }
        };
        SecurePipe.prototype.transform = function (url, getfile) {
            this.getfile = getfile;
            var obj = this.internalTransform(url);
            return this.asyncTrasnform(obj);
        };
        SecurePipe.prototype.internalTransform = function (url) {
            var _this = this;
            if (!url) {
                return this.result;
            }
            if (this.previousUrl !== url) {
                this.previousUrl = url;
                this._internalSubscription = this.getfile(url).subscribe(function (m) {
                    var sanitized = _this.sanitizer.bypassSecurityTrustUrl(m);
                    _this._result.next(sanitized);
                });
            }
            return this.result;
        };
        SecurePipe.prototype.asyncTrasnform = function (obj) {
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
            return i0.WrappedValue.wrap(this._latestValue);
        };
        SecurePipe.prototype._subscribe = function (obj) {
            var _this = this;
            this._obj = obj;
            this._subscription = obj.subscribe({
                next: function (value) {
                    return _this._updateLatestValue(obj, value);
                },
                error: function (e) {
                    throw e;
                }
            });
        };
        SecurePipe.prototype._dispose = function () {
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
        };
        SecurePipe.prototype._updateLatestValue = function (async, value) {
            if (async === this._obj) {
                this._latestValue = value;
                this._ref.markForCheck();
            }
        };
        SecurePipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'secure',
                        pure: false
                    },] },
        ];
        SecurePipe.ctorParameters = function () {
            return [
                { type: i0.ChangeDetectorRef },
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return SecurePipe;
    }());

    var SharedModule = (function () {
        function SharedModule() {
        }
        SharedModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [SecurePipe],
                        imports: [common.CommonModule],
                        exports: [SecurePipe],
                        providers: [DataSources]
                    },] },
        ];
        return SharedModule;
    }());

    var FileUploadComponent = (function () {
        function FileUploadComponent(renderer) {
            this.renderer = renderer;
            this.uploading = false;
            this.fileUuid = null;
            this.pdfUploaded = false;
            this.formEntryMode = true;
            // the method set in registerOnChange, it is just
            // a placeholder for a method that takes one parameter,
            // we use it to emit changes back to the form
            this.propagateChange = function (_$$1) { };
        }
        Object.defineProperty(FileUploadComponent.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
            },
            enumerable: true,
            configurable: true
        });
        FileUploadComponent.prototype.ngOnInit = function () {
            if (this.fileUuid) {
                this.checkFileType();
            }
        };
        FileUploadComponent.prototype.onFileChange = function (fileList) {
            try {
                for (var fileList_1 = __values(fileList), fileList_1_1 = fileList_1.next(); !fileList_1_1.done; fileList_1_1 = fileList_1.next()) {
                    var file = fileList_1_1.value;
                    this.upload(file);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (fileList_1_1 && !fileList_1_1.done && (_a = fileList_1.return))
                        _a.call(fileList_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            var e_1, _a;
        };
        FileUploadComponent.prototype.upload = function (data) {
            var _this = this;
            if (this.dataSource) {
                this.uploading = true;
                this.dataSource.fileUpload(data).subscribe(function (result) {
                    _this.fileUuid = result.image;
                    _this.checkFileType();
                    _this.propagateChange(_this.fileUuid);
                    _this.uploading = false;
                }, function (error) {
                    _this.uploading = false;
                });
            }
        };
        // this is the initial value set to the component
        FileUploadComponent.prototype.writeValue = function (value) {
            if (value !== this.fileUuid) {
                this.fileUuid = value;
                this.checkFileType();
            }
        };
        // registers 'fn' that will be fired when changes are made
        // this is how we emit the changes back to the form
        FileUploadComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        // not used, used for touch input
        FileUploadComponent.prototype.registerOnTouched = function () { };
        // change events from the textarea
        FileUploadComponent.prototype.onChange = function (event) {
            this.propagateChange(event.id);
            // .....
            // update the form
            // this.propagateChange(this.data);
        };
        FileUploadComponent.prototype.clearValue = function () {
            this.fileUuid = null;
            this.pdfUploaded = false;
            this.pdfUrl = null;
            this.propagateChange(this.fileUuid);
        };
        FileUploadComponent.prototype.getPdfUrl = function (fileUuid) {
            var _this = this;
            this.dataSource.fetchFile(fileUuid, 'pdf').subscribe(function (file) {
                _this.pdfUploaded = true;
                _this.pdfUrl = file.changingThisBreaksApplicationSecurity;
            });
        };
        FileUploadComponent.prototype.checkFileType = function () {
            var re = /pdf/gi;
            if (this.fileUuid.search(re) !== -1) {
                this.getPdfUrl(this.fileUuid);
            }
        };
        FileUploadComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'app-file-upload',
                        template: "<lib-file-uploader\n  [srcUrl]=\"pdfUrl\"\n  [formEntry]=\"formEntryMode\"\n  [(ngModel)]=\"fileUuid\"\n  (_onClear)=\"clearValue()\"\n  (uploadData)=\"onFileChange($event)\"\n>\n</lib-file-uploader>\n<div *ngIf=\"fileUuid\">\n  <img\n    *ngIf=\"!pdfUploaded\"\n    class=\"img-responsive\"\n    [src]=\"fileUuid | secure: this.dataSource.fetchFile\"\n    alt=\"\"\n  />\n</div>\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return FileUploadComponent; }),
                                multi: true
                            }
                        ],
                        styles: [
                            "\n      img {\n        margin-left: auto;\n        margin-right: auto;\n        display: block;\n      }\n    "
                        ]
                    },] },
        ];
        FileUploadComponent.ctorParameters = function () {
            return [
                { type: i0.Renderer2 }
            ];
        };
        FileUploadComponent.propDecorators = {
            dataSource: [{ type: i0.Input }]
        };
        return FileUploadComponent;
    }());

    var RemoteFileUploadModule = (function () {
        function RemoteFileUploadModule() {
        }
        RemoteFileUploadModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            SelectModule,
                            forms.FormsModule,
                            SharedModule,
                            ngxWebcam.WebcamModule,
                            ngxFileUploader.NgxFileUploaderModule
                        ],
                        exports: [FileUploadComponent],
                        declarations: [FileUploadComponent],
                        providers: []
                    },] },
        ];
        return RemoteFileUploadModule;
    }());

    /**
     * date-picker.component
     */
    var moment$1 = moment_;
    // const myDpStyles: string = require('./date-picker.component.css');
    // const myDpTpl: string = require('./date-picker.component.html');
    // webpack2_
    var DatePickerComponent = (function () {
        function DatePickerComponent() {
            this.locale = 'en';
            this.viewFormat = 'll';
            this.returnObject = 'js';
            this.onDatePickerCancel = new i0.EventEmitter();
            this.onSelectDate = new i0.EventEmitter();
            this.onDisplayMonths = false;
            this.onDisplayYears = false;
            this.displayYearsIndex = 0;
            this.monthsShort = moment$1.monthsShort();
        }
        DatePickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.initValue();
            // default to current year range
            _.each(this.fullYearRange, function (v, i) {
                _this.currentYear = _this.calendarDate.clone().startOf('year').year();
                if (v.indexOf(_this.currentYear) !== -1) {
                    _this.displayYearsIndex = i;
                }
            });
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
            this.generateCalendar();
        };
        DatePickerComponent.prototype.prev = function () {
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
        };
        DatePickerComponent.prototype.showMonthSelection = function () {
            this.onDisplayMonths = true;
            this.onDisplayYears = false;
        };
        DatePickerComponent.prototype.showYearSelection = function () {
            this.onDisplayYears = true;
            this.onDisplayMonths = false;
        };
        DatePickerComponent.prototype.next = function () {
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
        };
        DatePickerComponent.prototype.selectDay = function (day) {
            var daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
            day = this.calendarDate.clone().add(daysDifference, 'd');
            var selectedDay = this.parseToReturnObjectType(day);
            this.onSelectDate.emit(selectedDay);
            this.cancelDatePicker();
            return;
        };
        DatePickerComponent.prototype.selectMonth = function (month) {
            this.calendarDate = this.calendarDate.clone().month(month);
            this.onDisplayMonths = false;
            this.generateCalendar();
        };
        DatePickerComponent.prototype.selectYear = function (year) {
            this.calendarDate = this.calendarDate.clone().year(year);
            this.onDisplayYears = false;
            this.generateCalendar();
        };
        DatePickerComponent.prototype.selectToday = function () {
            var today = this.parseToReturnObjectType(moment$1());
            this.onSelectDate.emit(today);
            this.cancelDatePicker();
            return;
        };
        DatePickerComponent.prototype.clearPickDate = function () {
            this.onSelectDate.emit(null);
            this.cancelDatePicker();
            return;
        };
        DatePickerComponent.prototype.cancelDatePicker = function () {
            this.onDatePickerCancel.emit(false);
            return;
        };
        DatePickerComponent.prototype.generateYears = function () {
            var currentYear = moment$1().year();
            var startYr = this.calendarDate.clone().subtract(100, 'y').year();
            // const endYr = this.calendarDate.clone().add(10, 'y').year();
            var years = [];
            for (var year = startYr; year <= currentYear; year++) {
                years.push(year);
            }
            this.fullYearRange = _.chunk(years, 14);
        };
        DatePickerComponent.prototype.initValue = function () {
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
                this.calendarDate =
                    this.returnObject === 'string'
                        ? moment$1(this.initDate, this.viewFormat)
                        : moment$1(this.initDate);
                this.selectedDate = this.calendarDate.clone().startOf('date');
            }
            else {
                this.calendarDate = moment$1();
            }
            this.generateYears();
        };
        DatePickerComponent.prototype.generateCalendar = function () {
            this.calendarDays = [];
            var start = 0 -
                ((this.calendarDate.clone().startOf('month').day() +
                    (7 - moment$1.localeData().firstDayOfWeek())) %
                    7);
            var end = 41 + start; // iterator ending point
            for (var i = start; i <= end; i += 1) {
                var day = this.calendarDate.clone().startOf('month').add(i, 'days');
                this.calendarDays.push(day);
            }
        };
        DatePickerComponent.prototype.parseToReturnObjectType = function (day) {
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
        };
        DatePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'date-picker',
                        template: "<picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-prev\" (click)=\"prev()\"></span>\n        </div>\n        <div class=\"picker-header-content\">\n          <div class=\"content\">\n            <span (click)=\"showMonthSelection()\" class=\"month\">{{\n              calendarDate | moment: 'MMMM'\n            }}</span>\n            <span class=\"seperator\">|</span>\n            <span (click)=\"showYearSelection()\" class=\"year\">{{\n              calendarDate | moment: 'YYYY'\n            }}</span>\n          </div>\n        </div>\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-next\" (click)=\"next()\"></span>\n        </div>\n      </div>\n      <div class=\"picker-calendar\">\n        <div\n          class=\"picker-calendar-row\"\n          *ngIf=\"!onDisplayMonths && !onDisplayYears\"\n        >\n          <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{\n            day\n          }}</span>\n        </div>\n        <div\n          class=\"picker-calendar-row\"\n          *ngIf=\"!onDisplayMonths && !onDisplayYears\"\n        >\n          <span\n            class=\"picker-day\"\n            (click)=\"selectDay(day)\"\n            [ngClass]=\"{\n              'out-focus': day.month() != calendarDate.month(),\n              today: day.isSame(today),\n              selected: day.isSame(selectedDate)\n            }\"\n            *ngFor=\"let day of calendarDays\"\n          >\n            {{ day | moment: 'D' }}\n          </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n          <span\n            class=\"picker-month\"\n            *ngFor=\"let month of monthsShort\"\n            (click)=\"selectMonth(month)\"\n            [ngClass]=\"{\n              selected: month === currentMonth\n            }\"\n          >\n            {{ month }}\n          </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n          <span\n            class=\"picker-year\"\n            *ngFor=\"let year of displayYearRange\"\n            (click)=\"selectYear(year)\"\n            [ngClass]=\"{\n              selected: year === currentYear\n            }\"\n          >\n            {{ year }}\n          </span>\n        </div>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-today\" (click)=\"selectToday()\">\n          <span class=\"text\">Today</span>\n        </div>\n        <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\">\n          <span class=\"text\">Clear</span>\n        </div>\n        <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\">\n          <span class=\"text\">Close</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                        styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:' ';border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:' ';position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:' ';position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                    },] },
        ];
        DatePickerComponent.ctorParameters = function () { return []; };
        DatePickerComponent.propDecorators = {
            initDate: [{ type: i0.Input }],
            locale: [{ type: i0.Input }],
            viewFormat: [{ type: i0.Input }],
            returnObject: [{ type: i0.Input }],
            onDatePickerCancel: [{ type: i0.Output }],
            onSelectDate: [{ type: i0.Output }]
        };
        return DatePickerComponent;
    }());

    /**
     * time-picker.component
     */
    var moment$2 = moment_;
    // const myDpStyles: string = require('./time-picker.component.css');
    // const myDpTpl: string = require('./time-picker.component.html');
    // webpack2_
    var TimePickerComponent = (function () {
        function TimePickerComponent() {
            this.showSecond = true;
            this.viewFormat = 'hh:mm A';
            this.use12Hour = false;
            this.returnObject = 'js';
            this.onSelectTime = new i0.EventEmitter();
            this.onTimePickerCancel = new i0.EventEmitter();
            this.hourFormat = 'HH';
        }
        TimePickerComponent.prototype.ngOnInit = function () {
            if (this.use12Hour) {
                this.hourFormat = 'hh';
            }
            this.time = this.initTime
                ? moment$2(this.initTime, this.viewFormat)
                : moment$2();
            // check if the input initDate has value
            if (this.initTime) {
                this.time =
                    this.returnObject === 'string'
                        ? moment$2(this.initTime, this.viewFormat)
                        : moment$2(this.initTime);
            }
            else {
                this.time = moment$2();
            }
        };
        TimePickerComponent.prototype.increaseHour = function () {
            this.time = this.time.clone().add(1, 'h');
        };
        TimePickerComponent.prototype.decreaseHour = function () {
            this.time = this.time.clone().subtract(1, 'h');
        };
        TimePickerComponent.prototype.increaseMinute = function () {
            this.time = this.time.clone().add(1, 'm');
        };
        TimePickerComponent.prototype.decreaseMinute = function () {
            this.time = this.time.clone().subtract(1, 'm');
        };
        TimePickerComponent.prototype.increaseSecond = function () {
            this.time = this.time.clone().add(1, 's');
        };
        TimePickerComponent.prototype.decreaseSecond = function () {
            this.time = this.time.clone().subtract(1, 's');
        };
        TimePickerComponent.prototype.selectTime = function () {
            var selectTime = this.parseToReturnObjectType(this.time);
            this.onSelectTime.emit(selectTime);
            this.cancelTimePicker();
            return;
        };
        TimePickerComponent.prototype.selectNow = function () {
            var selectTime = this.parseToReturnObjectType(moment$2());
            this.onSelectTime.emit(selectTime);
            this.cancelTimePicker();
            return;
        };
        TimePickerComponent.prototype.clearTime = function () {
            this.onSelectTime.emit(null);
            this.cancelTimePicker();
            return;
        };
        TimePickerComponent.prototype.cancelTimePicker = function () {
            this.onTimePickerCancel.emit(false);
            return;
        };
        TimePickerComponent.prototype.parseToReturnObjectType = function (time) {
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
        };
        TimePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'time-picker',
                        template: "<picker-modal (onOverlayClick)=\"cancelTimePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">Time Picker</div>\n      <div class=\"picker-table\">\n        <ul class=\"picker-table-time\">\n          <li class=\"picker-table-number hour\">\n            <span class=\"arrow up\" (click)=\"increaseHour()\"></span>\n            {{ time | moment: hourFormat }}\n            <span class=\"arrow down\" (click)=\"decreaseHour()\"></span>\n          </li>\n          <li class=\"picker-table-separator\">:</li>\n          <li class=\"picker-table-number minute\">\n            <span class=\"arrow up\" (click)=\"increaseMinute()\"></span>\n            {{ time | moment: 'mm' }}\n            <span class=\"arrow down\" (click)=\"decreaseMinute()\"></span>\n          </li>\n          <li *ngIf=\"showSecond\" class=\"picker-table-separator\">:</li>\n          <li *ngIf=\"showSecond\" class=\"picker-table-number second\">\n            <span class=\"arrow up\" (click)=\"increaseSecond()\"></span>\n            {{ time | moment: 'ss' }}\n            <span class=\"arrow down\" (click)=\"decreaseSecond()\"></span>\n          </li>\n          <li *ngIf=\"use12Hour\" class=\"picker-table-meridiem meridiem\">\n            {{ time | moment: 'A' }}\n          </li>\n        </ul>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-now\" (click)=\"selectNow()\">\n          <span class=\"text\">Now</span>\n        </div>\n        <div class=\"picker-action action-confirm\" (click)=\"selectTime()\">\n          <span class=\"text\">Confirm</span>\n        </div>\n        <div class=\"picker-action action-clear\" (click)=\"clearTime()\">\n          <span class=\"text\">Clear</span>\n        </div>\n        <div class=\"picker-action action-close\" (click)=\"cancelTimePicker()\">\n          <span class=\"text\">Close</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                        styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:40rem;font-family:'Open Sans'}.picker-box{width:100%;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;height:2.5rem;width:100%}.picker-header{text-align:center}.picker-table{width:100%;margin:2.5rem 0}.picker-table-time{font-size:2.37rem;line-height:2.5rem;list-style:none;margin:0;padding:0;display:flex;justify-content:center;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-table-meridiem,.picker-table-number,.picker-table-separator{text-align:center}.picker-table-meridiem,.picker-table-number{position:relative;width:20%}.arrow{position:absolute;left:50%;border:solid #777;border-width:0 .2rem .2rem 0;display:inline-block;padding:.25rem;cursor:pointer}.arrow.up{top:-1rem;-webkit-transform:translateX(-50%) rotate(-135deg);transform:translateX(-50%) rotate(-135deg)}.arrow.down{bottom:-1rem;-webkit-transform:translateX(-50%) rotate(45deg);transform:translateX(-50%) rotate(45deg)}.arrow:hover{border-color:#1975d2}.picker-table-separator{width:calc(20% / 3)}.picker-footer{display:flex;justify-content:center;width:100%;cursor:pointer}.picker-footer .picker-action{width:25%;text-align:center}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-confirm::before,.picker-footer .action-now::before{content:' ';position:relative;display:inline-block;height:0;width:0}.picker-footer .action-now::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-confirm::before{width:1rem;height:1rem;border-radius:100%;background-color:#00b5ad}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                    },] },
        ];
        TimePickerComponent.ctorParameters = function () { return []; };
        TimePickerComponent.propDecorators = {
            initTime: [{ type: i0.Input }],
            showSecond: [{ type: i0.Input }],
            viewFormat: [{ type: i0.Input }],
            use12Hour: [{ type: i0.Input }],
            returnObject: [{ type: i0.Input }],
            onSelectTime: [{ type: i0.Output }],
            onTimePickerCancel: [{ type: i0.Output }]
        };
        return TimePickerComponent;
    }());

    /**
     * modal.component
     */
    // const myDpStyles: string = require('./modal.component.css');
    // const myDpTpl: string = require('./modal.component.html');
    // webpack2_
    var ModalComponent = (function () {
        function ModalComponent() {
            this.onOverlayClick = new i0.EventEmitter();
        }
        ModalComponent.prototype.ngOnInit = function () { };
        ModalComponent.prototype.closeModal = function () {
            this.onOverlayClick.emit(false);
        };
        ModalComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'picker-modal',
                        template: "<section class=\"x-modal\">\n  <section class=\"modal-overlay\" (click)=\"closeModal()\"></section>\n  <section class=\"modal-main\" id=\"section-modal-main\">\n    <ng-content></ng-content>\n  </section>\n</section>\n",
                        styles: [":host{z-index:9999999999}*,::after,::before{box-sizing:border-box}.modal-main{position:absolute;left:19.6%;right:auto;top:auto;z-index:111;background-color:#fff;border:1px solid #d7dad7;border-radius:6px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);box-shadow:0 5px 15px rgba(0,0,0,.3)}"],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: []
                    },] },
        ];
        ModalComponent.ctorParameters = function () { return []; };
        ModalComponent.propDecorators = {
            onOverlayClick: [{ type: i0.Output }]
        };
        return ModalComponent;
    }());

    /**
     * moment.pipe
     */
    var MomentPipe = (function () {
        function MomentPipe() {
        }
        MomentPipe.prototype.transform = function (moment, format) {
            return format ? moment.format(format) : moment.format('MMM DD, YYYY');
        };
        MomentPipe.decorators = [
            { type: i0.Pipe, args: [{ name: 'moment' },] },
        ];
        return MomentPipe;
    }());

    var Moment = moment_;
    var DateTimePickerComponent = (function () {
        function DateTimePickerComponent() {
            this.showDate = true;
            this.showTime = false;
            this.showWeeks = false;
            this.weeks = [2, 4, 6, 8, 12, 16, 24];
            this.onDateChange = new i0.EventEmitter();
            this.showDatePicker = false;
            this.showTimePicker = false;
            this.onChange = function () { };
            this.onTouched = function () { };
        }
        DateTimePickerComponent.prototype.ngOnInit = function () { };
        DateTimePickerComponent.prototype.weeksSelected = function (count) {
            var now = new Date();
            var nextDate = now.setDate(now.getDate() + count * 7);
            this.value = Moment(nextDate).format();
        };
        DateTimePickerComponent.prototype.setDate = function (date) {
            if (date && date !== '') {
                this.value = Moment(date).format();
            }
            else {
                this.value = date;
            }
        };
        DateTimePickerComponent.prototype.setTime = function (time) {
            if (time && time !== '') {
                this.value = Moment(time).format();
            }
            else {
                this.value = time;
            }
            return;
        };
        DateTimePickerComponent.prototype.toggleDatePicker = function (status) {
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
        };
        DateTimePickerComponent.prototype.toggleTimePicker = function (status) {
            this.showTimePicker = status;
            return;
        };
        Object.defineProperty(DateTimePickerComponent.prototype, "value", {
            get: function () {
                return this.modelValue;
            },
            set: function (val) {
                this.modelValue = val;
                this.onDateChange.emit(val);
                this.onChange(val);
                this.onTouched();
            },
            enumerable: true,
            configurable: true
        });
        DateTimePickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        DateTimePickerComponent.prototype.writeValue = function (value) {
            if (value instanceof Date) {
                this.value = Moment(value).format();
            }
            else {
                this.value = value;
            }
        };
        DateTimePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'date-time-picker',
                        template: "<div class=\"row\">\n  <div *ngIf=\"!showTime\" class=\"col-xs-12 col-md-12\">\n    <input\n      *ngIf=\"!showWeeks\"\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'mediumDate'\"\n      (focus)=\"toggleDatePicker(true)\"\n      readonly\n      placeholder=\"Select Date\"\n    />\n    <div *ngIf=\"showWeeks\" class=\"input-group\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        class=\"form-control\"\n        [value]=\"value | date: 'mediumDate'\"\n        (focus)=\"toggleDatePicker(true)\"\n        readonly\n        placeholder=\"Select Date\"\n      />\n      <div class=\"input-group-btn\">\n        <button\n          type=\"button\"\n          class=\"btn btn-default dropdown-toggle\"\n          data-toggle=\"dropdown\"\n          aria-haspopup=\"true\"\n          aria-expanded=\"false\"\n        >\n          Weeks <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu up\">\n          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\">\n            <span> {{ count }} Weeks</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"showTime\" class=\"col-xs-8 col-md-8\">\n    <input\n      *ngIf=\"!showWeeks\"\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'mediumDate'\"\n      (focus)=\"toggleDatePicker(true)\"\n      readonly\n      placeholder=\"Select Date\"\n    />\n    <div *ngIf=\"showWeeks\" class=\"input-group\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        class=\"form-control\"\n        [value]=\"value | date: 'mediumDate'\"\n        (focus)=\"toggleDatePicker(true)\"\n        readonly\n        placeholder=\"Select Date\"\n      />\n      <div class=\"input-group-btn\">\n        <button\n          type=\"button\"\n          class=\"btn btn-default dropdown-toggle\"\n          data-toggle=\"dropdown\"\n          aria-haspopup=\"true\"\n          aria-expanded=\"false\"\n        >\n          Weeks <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu up\">\n          <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\">\n            <span> {{ count }} Weeks</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"showTime\" class=\"col-xs-4 col-md-4\">\n    <input\n      type=\"text\"\n      class=\"form-control\"\n      [value]=\"value | date: 'shortTime'\"\n      (focus)=\"toggleTimePicker(true)\"\n      readonly\n      placeholder=\"Select Time\"\n    />\n  </div>\n</div>\n<date-picker\n  *ngIf=\"showDatePicker\"\n  [initDate]=\"value\"\n  (onSelectDate)=\"setDate($event)\"\n  (onDatePickerCancel)=\"toggleDatePicker($event)\"\n></date-picker>\n\n<time-picker\n  *ngIf=\"showTimePicker\"\n  [initTime]=\"value\"\n  [use12Hour]=\"true\"\n  (onSelectTime)=\"setTime($event)\"\n  (onTimePickerCancel)=\"toggleTimePicker($event)\"\n></time-picker>\n",
                        styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return DateTimePickerComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        DateTimePickerComponent.ctorParameters = function () { return []; };
        DateTimePickerComponent.propDecorators = {
            modelValue: [{ type: i0.Input }],
            showDate: [{ type: i0.Input }],
            showTime: [{ type: i0.Input }],
            showWeeks: [{ type: i0.Input }],
            weeks: [{ type: i0.Input }],
            onDateChange: [{ type: i0.Output }]
        };
        return DateTimePickerComponent;
    }());

    /**
     * date-time-picker.module
     */
    var DateTimePickerModule = (function () {
        function DateTimePickerModule() {
        }
        DateTimePickerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule],
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
                    },] },
        ];
        return DateTimePickerModule;
    }());

    var moment$3 = moment_;
    var MY_FORMATS = {
        parse: {
            dateInput: 'LL'
        },
        display: {
            dateInput: 'LL',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY'
        }
    };
    var NgxDateTimePickerComponent = (function () {
        function NgxDateTimePickerComponent() {
            // public date = new FormControl(moment());
            this.selectedTime = moment$3().format();
            this.selectedDate = moment$3().format();
            this.loadInitial = false;
            this.showTimePicker = false;
            this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
            this.showTime = false;
            this.showWeeks = true;
            this.onDateChange = new i0.EventEmitter();
            this.onChange = function () { };
            this.onTouched = function () { };
        }
        NgxDateTimePickerComponent.prototype.ngOnInit = function () { };
        NgxDateTimePickerComponent.prototype.writeValue = function (value) {
            this.value = value;
        };
        NgxDateTimePickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxDateTimePickerComponent.prototype.registerOnTouched = function (fn) { };
        NgxDateTimePickerComponent.prototype.onTimeSelect = function ($event) {
            var setDate = moment$3(this.selectedDate);
            var setTime = $event;
            this.setDateTime(setDate, setTime);
        };
        NgxDateTimePickerComponent.prototype.onDateSelect = function ($event) {
            var setDate = moment$3($event.value);
            var setTime = this.selectedTime;
            var dateString = this.setDateTime(setDate, setTime);
            var selectedDate = $event.value;
            this.value = dateString;
        };
        NgxDateTimePickerComponent.prototype.toggleTimePicker = function (status) {
            this.showTimePicker = status;
            return;
        };
        NgxDateTimePickerComponent.prototype.setCurrentTime = function () {
            var setDate = moment$3(this.selectedDate);
            var currentTime = moment$3().format('HH:mm:ss');
            this.setDateTime(setDate, currentTime);
        };
        NgxDateTimePickerComponent.prototype.weekSelect = function ($event) {
            var dateToUse = moment$3().format();
            var nextWeekDate = moment$3(dateToUse).add($event.value, 'weeks');
            var nextWeekTime = dateToUse;
            this.setDateTime(nextWeekDate, nextWeekTime);
        };
        NgxDateTimePickerComponent.prototype.selectionChange = function ($event) {
            console.log('Week selected', $event);
        };
        NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = function () {
            if (this.showTime) {
                return 'col-sm-2 form-group';
            }
            return 'col-sm-3 form-group';
        };
        NgxDateTimePickerComponent.prototype.getDatePickerCssClass = function () {
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
        };
        NgxDateTimePickerComponent.prototype.getTimePickerCssClass = function () {
            if (this.showTime && this.showWeeks) {
                return 'col-sm-5 form-group';
            }
            if (this.showWeeks === true) {
                return 'col-sm-9 form-group';
            }
            return 'col-sm-4 form-group';
        };
        NgxDateTimePickerComponent.prototype.setDateTime = function (setDate, setTime) {
            var newDate = moment$3(setDate).format('DD-MM-YYYY');
            var newTime;
            if (this.showTime) {
                newTime = moment$3(setTime).format('HH:mm:ss');
            }
            else {
                newTime = '00:00:00';
            }
            var newDateTime = moment$3(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
            var dateTimeString = moment$3(newDateTime).format();
            this.selectedDate = dateTimeString;
            this.selectedTime = dateTimeString;
            this.value = dateTimeString;
            this.onChange(this.value);
            return dateTimeString;
        };
        NgxDateTimePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-date-time-picker',
                        template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input\n          matInput\n          [matDatepicker]=\"picker\"\n          class=\"form-control\"\n          [value]=\"value\"\n          placeholder=\"Choose a date\"\n          (dateChange)=\"onDateSelect($event)\"\n          (click)=\"picker.open()\"\n          readonly\n        />\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle\n          matSuffix\n          [for]=\"picker\"\n          class=\"input-group-btn\"\n        ></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select\n        placeholder=\"Select Weeks\"\n        class=\"form-control\"\n        name=\"weeks\"\n        (selectionChange)=\"weekSelect($event)\"\n      >\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{ count }} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        [value]=\"value | date: 'shortTime'\"\n        (focus)=\"toggleTimePicker(true)\"\n        readonly\n        placeholder=\"Select Time\"\n      />\n      <time-picker\n        *ngIf=\"showTimePicker\"\n        [initTime]=\"value\"\n        [use12Hour]=\"true\"\n        (onSelectTime)=\"onTimeSelect($event)\"\n        (onTimePickerCancel)=\"toggleTimePicker($event)\"\n      ></time-picker>\n    </div>\n  </div>\n</div>\n",
                        styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"],
                        providers: [
                            { provide: core.MAT_DATE_FORMATS, useValue: MY_FORMATS },
                            { provide: core.DateAdapter, useClass: materialMomentAdapter.MomentDateAdapter },
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return NgxDateTimePickerComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        NgxDateTimePickerComponent.propDecorators = {
            weeks: [{ type: i0.Input }],
            modelValue: [{ type: i0.Input }],
            showTime: [{ type: i0.Input }],
            showWeeks: [{ type: i0.Input }],
            onDateChange: [{ type: i0.Output }]
        };
        return NgxDateTimePickerComponent;
    }());

    /**
     * date-time-picker.module
     */
    var NgxDateTimePickerModule = (function () {
        function NgxDateTimePickerModule() {
        }
        NgxDateTimePickerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            datepicker.MatDatepickerModule,
                            formField.MatFormFieldModule,
                            material.MatNativeDateModule,
                            material.MatInputModule,
                            DateTimePickerModule,
                            // AmazingTimePickerModule,
                            select.MatSelectModule
                        ],
                        declarations: [NgxDateTimePickerComponent],
                        exports: [
                            datepicker.MatDatepickerModule,
                            formField.MatFormFieldModule,
                            material.MatNativeDateModule,
                            material.MatInputModule,
                            NgxDateTimePickerComponent
                        ],
                        providers: []
                    },] },
        ];
        return NgxDateTimePickerModule;
    }());

    var Option$1 = (function () {
        function Option(options) {
            this.label = options.label;
            this.value = options.value;
        }
        return Option;
    }());

    var AfeNgSelectComponent = (function () {
        function AfeNgSelectComponent() {
            this.question_options = [];
            this.errors = [];
            this.propagateChange = function (_$$1) { };
        }
        AfeNgSelectComponent.prototype.getChangingText = function (event) {
            var _this = this;
            // console.log(event);
            this.getData(event).subscribe(function (options) {
                _this.question_options = options;
            });
        };
        AfeNgSelectComponent.prototype.writeValue = function (obj) { };
        AfeNgSelectComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        AfeNgSelectComponent.prototype.registerOnTouched = function (fn) { };
        AfeNgSelectComponent.prototype.ngOnChanges = function (changes) { };
        AfeNgSelectComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.extras) {
                if (this.extras.originalValue) {
                    this.resolveSelectedOption(this.extras.originalValue).subscribe(function (option) {
                        _this.selected_question_option = option;
                    });
                }
            }
        };
        AfeNgSelectComponent.prototype.getData = function (searchText) {
            var _this = this;
            this.subject = new rxjs.BehaviorSubject([]);
            var OptionsObservable = this.dataSource.searchOptions(searchText);
            OptionsObservable.subscribe(function (options) {
                // console.log('options', options);
                var mappedOptions = new Array();
                for (var i = 0; i < options.length; i++) {
                    mappedOptions.push(new Option$1(options[i]));
                }
                _this.subject.next(mappedOptions);
            }, function (error) {
                _this.subject.error(error);
            });
            return this.subject.asObservable();
        };
        AfeNgSelectComponent.prototype.onValueChange = function (event) { };
        AfeNgSelectComponent.prototype.resolveSelectedOption = function (value) {
            var _this = this;
            this.subjectOption = new rxjs.BehaviorSubject(null);
            var OptionObservable = this.dataSource.resolveSelectedValue(value);
            OptionObservable.subscribe(function (option) {
                // console.log('option', option);
                _this.subjectOption.next(option);
            }, function (error) {
                _this.subjectOption.error(error);
            });
            return this.subjectOption.asObservable();
        };
        AfeNgSelectComponent.prototype.resetOptions = function () {
            this.subject.next(new Array());
        };
        AfeNgSelectComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'afe-ng-select',
                        template: "<ng-select\n    (searchInputText)=\"getChangingText($event)\"\n    (ngModelChange)=\"onValueChange($event)\"\n    [options]=\"question_options\"\n    [multiple]=\"multiple\"\n  >\n  </ng-select> ",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return AfeNgSelectComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        AfeNgSelectComponent.propDecorators = {
            dataSource: [{ type: i0.Input }],
            multiple: [{ type: i0.Input }],
            extras: [{ type: i0.Input }]
        };
        return AfeNgSelectComponent;
    }());

    var FormSchemaCompiler = (function () {
        function FormSchemaCompiler() {
        }
        FormSchemaCompiler.prototype.compileFormSchema = function (formSchema, referencedComponents) {
            // get all referenced forms
            var refForms = this.getReferencedForms(formSchema, referencedComponents);
            if (_.isEmpty(refForms)) {
                return formSchema;
            }
            // get all place-holders from the form schema
            var placeHolders = this.getAllPlaceholderObjects(formSchema);
            if (_.isEmpty(placeHolders)) {
                return formSchema;
            }
            // replace all placeHolders
            this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
            return formSchema;
        };
        FormSchemaCompiler.prototype.findSchemaByName = function (schemaArray, nameOfSchema) {
            if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
                return;
            }
            var foundSchema = {};
            _.each(schemaArray, function (schema) {
                if (schema.name === nameOfSchema) {
                    foundSchema = schema;
                }
            });
            return foundSchema;
        };
        FormSchemaCompiler.prototype.getPageInSchemaByLabel = function (schema, pageLabel) {
            if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
                return;
            }
            var foundPage = {};
            _.each(schema.pages, function (page) {
                if (page.label === pageLabel) {
                    foundPage = page;
                }
            });
            return foundPage;
        };
        FormSchemaCompiler.prototype.getSectionInSchemaByPageLabelBySectionLabel = function (schema, pageLabel, sectionLabel) {
            if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
                return;
            }
            var foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
            if (_.isEmpty(foundPage)) {
                return;
            }
            var foundSection = {};
            _.each(foundPage.sections, function (section) {
                if (section.label === sectionLabel) {
                    foundSection = section;
                }
            });
            return foundSection;
        };
        FormSchemaCompiler.prototype.getQuestionByIdInSchema = function (schema, questionId) {
            if (_.isEmpty(schema) || _.isEmpty(questionId)) {
                return;
            }
            if (Array.isArray(schema)) {
                var question = void 0;
                for (var i = 0; i < schema.length; i++) {
                    if (!_.isEmpty(schema[i])) {
                        question = this.getQuestionByIdInSchema(schema[i], questionId);
                    }
                    if (!_.isEmpty(question)) {
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
                    var toExpand = schema.pages || schema.sections || schema.questions;
                    return this.getQuestionByIdInSchema(toExpand, questionId);
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        };
        FormSchemaCompiler.prototype.getQuestionsArrayByQuestionIdInSchema = function (schema, questionId) {
            if (_.isEmpty(schema) || _.isEmpty(questionId)) {
                return;
            }
            return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
        };
        FormSchemaCompiler.prototype.getQuestionsArrayByQuestionId = function (parent, object, questionId) {
            if (Array.isArray(object)) {
                var returnedValue = void 0;
                for (var i = 0; i < object.length; i++) {
                    if (!_.isEmpty(object[i])) {
                        returnedValue = this.getQuestionsArrayByQuestionId(object, object[i], questionId);
                    }
                    if (!_.isEmpty(returnedValue)) {
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
                    var toExpand = object.pages || object.sections || object.questions;
                    return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        };
        // object is page or section or question
        FormSchemaCompiler.prototype.isSchemaSubObjectExpandable = function (object) {
            if (typeof object === 'object') {
                var objectKeys = Object.keys(object);
                if (_.includes(objectKeys, 'pages') ||
                    _.includes(objectKeys, 'sections') ||
                    _.includes(objectKeys, 'questions')) {
                    return true;
                }
            }
            return false;
        };
        FormSchemaCompiler.prototype.isQuestionObjectWithId = function (object, id) {
            return object['id'] === id;
        };
        FormSchemaCompiler.prototype.getAllPlaceholderObjects = function (schema) {
            var referencedObjects = [];
            this.extractPlaceholderObjects(schema, referencedObjects);
            return referencedObjects;
        };
        FormSchemaCompiler.prototype.extractPlaceholderObjects = function (subSchema, objectsArray) {
            if (_.isEmpty(subSchema)) {
                return;
            }
            if (Array.isArray(subSchema)) {
                for (var i = 0; i < subSchema.length; i++) {
                    if (!_.isEmpty(subSchema[i])) {
                        this.extractPlaceholderObjects(subSchema[i], objectsArray);
                    }
                }
            }
            else if (typeof subSchema === 'object') {
                if (!_.isEmpty(subSchema.reference)) {
                    objectsArray.push(subSchema);
                }
                else if (this.isSchemaSubObjectExpandable(subSchema)) {
                    var toExpand = subSchema.pages || subSchema.sections || subSchema.questions;
                    this.extractPlaceholderObjects(toExpand, objectsArray);
                }
            }
        };
        FormSchemaCompiler.prototype.fillPlaceholderObject = function (placeHolderObject, referenceObject) {
            for (var member in referenceObject) {
                if (_.isEmpty(placeHolderObject[member])) {
                    placeHolderObject[member] = referenceObject[member];
                }
            }
            return placeHolderObject;
        };
        FormSchemaCompiler.prototype.replaceAllPlaceholdersWithActualObjects = function (keyValReferencedForms, placeHoldersArray) {
            var _this = this;
            _.each(placeHoldersArray, function (placeHolder) {
                var referencedObject = _this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
                if (_.isEmpty(referencedObject)) {
                    console.error('Form compile: Error finding referenced object', placeHolder.reference);
                }
                else {
                    placeHolder = _this.fillPlaceholderObject(placeHolder, referencedObject);
                    placeHolder = _this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                    delete placeHolder['reference'];
                }
            });
            return placeHoldersArray;
        };
        FormSchemaCompiler.prototype.removeObjectFromArray = function (array, object) {
            var indexOfObject = array.indexOf(object);
            if (indexOfObject === -1) {
                return;
            }
            array.splice(indexOfObject, 1);
        };
        FormSchemaCompiler.prototype.removeExcludedQuestionsFromPlaceholder = function (placeHolder) {
            var _this = this;
            if (Array.isArray(placeHolder.reference.excludeQuestions)) {
                _.each(placeHolder.reference.excludeQuestions, function (excludedQuestionId) {
                    var questionsArray = _this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                    if (!Array.isArray(questionsArray)) {
                        return;
                    }
                    var question = _this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                    _this.removeObjectFromArray(questionsArray, question);
                });
            }
            return placeHolder;
        };
        FormSchemaCompiler.prototype.getReferencedObject = function (referenceData, keyValReferencedForms) {
            if (_.isEmpty(referenceData.form)) {
                console.error('Form compile: reference missing form attribute', referenceData);
                return;
            }
            if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
                console.error('Form compile: referenced form alias not found', referenceData);
                return;
            }
            if (!_.isEmpty(referenceData.questionId)) {
                return this.getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
            }
            if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
                return this.getSectionInSchemaByPageLabelBySectionLabel(keyValReferencedForms[referenceData.form], referenceData.page, referenceData.section);
            }
            if (!_.isEmpty(referenceData.page)) {
                return this.getPageInSchemaByLabel(keyValReferencedForms[referenceData.form], referenceData.page);
            }
            console.error('Form compile: Unsupported reference type', referenceData.reference);
        };
        FormSchemaCompiler.prototype.getReferencedForms = function (formSchema, formSchemasLookupArray) {
            var _this = this;
            var referencedForms = formSchema.referencedForms;
            if (_.isEmpty(referencedForms)) {
                return;
            }
            var keyValReferencedForms = {};
            _.each(referencedForms, function (reference) {
                keyValReferencedForms[reference.alias] = _this.findSchemaByName(formSchemasLookupArray, reference.formName);
            });
            return keyValReferencedForms;
        };
        FormSchemaCompiler.decorators = [
            { type: i0.Injectable },
        ];
        FormSchemaCompiler.ctorParameters = function () { return []; };
        return FormSchemaCompiler;
    }());

    var TextInputQuestion = (function (_super) {
        __extends(TextInputQuestion, _super);
        function TextInputQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.placeholder = options.placeholder || '';
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return TextInputQuestion;
    }(QuestionBase));

    var TextAreaInputQuestion = (function (_super) {
        __extends(TextAreaInputQuestion, _super);
        function TextAreaInputQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.placeholder = options.placeholder || '';
            _this.isExpanded = options.isExpanded || false;
            _this.rows = options.rows || 18;
            _this.renderingType = 'textarea';
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return TextAreaInputQuestion;
    }(TextInputQuestion));

    var SelectQuestion = (function (_super) {
        __extends(SelectQuestion, _super);
        function SelectQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'select';
            _this.options = options.options || [];
            _this.controlType = exports.AfeControlType.AfeFormControl;
            _this.dataSource = options.dataSource || '';
            return _this;
        }
        return SelectQuestion;
    }(QuestionBase));

    var UiSelectQuestion = (function (_super) {
        __extends(UiSelectQuestion, _super);
        function UiSelectQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'ui-select';
            _this.options = options.options || [];
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return UiSelectQuestion;
    }(QuestionBase));

    var DateQuestion = (function (_super) {
        __extends(DateQuestion, _super);
        function DateQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.showTime = true;
            _this.showWeeksAdder = false;
            _this.renderingType = 'date';
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return DateQuestion;
    }(QuestionBase));

    var MultiSelectQuestion = (function (_super) {
        __extends(MultiSelectQuestion, _super);
        function MultiSelectQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'multi-select';
            _this.options = options.options || [];
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return MultiSelectQuestion;
    }(SelectQuestion));

    var NestedQuestion = (function (_super) {
        __extends(NestedQuestion, _super);
        function NestedQuestion(options) {
            return _super.call(this, options) || this;
        }
        return NestedQuestion;
    }(QuestionBase));

    var QuestionGroup = (function (_super) {
        __extends(QuestionGroup, _super);
        function QuestionGroup(options) {
            var _this = _super.call(this, options) || this;
            _this.isExpanded = true;
            _this.renderingType = 'group';
            _this.questions = options.questions || [];
            _this.controlType = exports.AfeControlType.AfeFormGroup;
            return _this;
        }
        return QuestionGroup;
    }(NestedQuestion));

    var RepeatingQuestion = (function (_super) {
        __extends(RepeatingQuestion, _super);
        function RepeatingQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'repeating';
            _this.questions = options.questions || [];
            _this.controlType = exports.AfeControlType.AfeFormArray;
            return _this;
        }
        return RepeatingQuestion;
    }(NestedQuestion));

    var CheckBoxQuestion = (function (_super) {
        __extends(CheckBoxQuestion, _super);
        function CheckBoxQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'checkbox';
            _this.options = options.options || [];
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return CheckBoxQuestion;
    }(QuestionBase));

    var TimeQuestion = (function (_super) {
        __extends(TimeQuestion, _super);
        function TimeQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'time';
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return TimeQuestion;
    }(QuestionBase));

    var FileUploadQuestion = (function (_super) {
        __extends(FileUploadQuestion, _super);
        function FileUploadQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.showTime = true;
            _this.showWeeksAdder = false;
            _this.renderingType = 'file';
            _this.dataSource = options.dataSource;
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return FileUploadQuestion;
    }(QuestionBase));

    var TestOrderQuestion = (function (_super) {
        __extends(TestOrderQuestion, _super);
        function TestOrderQuestion(options) {
            var _this = _super.call(this, options) || this;
            _this.renderingType = 'select';
            _this.orderType = options.orderType;
            _this.selectableOrders = options.selectableOrders;
            _this.options = options.options;
            _this.orderSettingUuid = options.orderSettingUuid;
            _this.rendering = options.orderSettingUuid;
            _this.controlType = exports.AfeControlType.AfeFormControl;
            return _this;
        }
        return TestOrderQuestion;
    }(QuestionBase));

    var DateValidationModel = (function (_super) {
        __extends(DateValidationModel, _super);
        function DateValidationModel(validations) {
            var _this = _super.call(this, validations) || this;
            _this.allowFutureDates = false;
            _this.allowFutureDates =
                validations.allowFutureDates === 'true' ? true : false;
            return _this;
        }
        return DateValidationModel;
    }(ValidationModel));

    var MaxValidationModel = (function (_super) {
        __extends(MaxValidationModel, _super);
        function MaxValidationModel(validations) {
            var _this = _super.call(this, validations) || this;
            var max = validations.max;
            _this.max = +max;
            return _this;
        }
        return MaxValidationModel;
    }(ValidationModel));

    var MinValidationModel = (function (_super) {
        __extends(MinValidationModel, _super);
        function MinValidationModel(validations) {
            var _this = _super.call(this, validations) || this;
            var min = validations.min;
            _this.min = +min;
            return _this;
        }
        return MinValidationModel;
    }(ValidationModel));

    var DecimalPointValidationModel = (function () {
        function DecimalPointValidationModel(validations) {
            this.decimalPlace = 0;
            this.failsWhenExpression = '';
            this.type = 'js_expression';
            this.decimalPlace = validations.decimalPlace;
        }
        DecimalPointValidationModel.prototype.setFailExpression = function () {
            this.failsWhenExpression = "!isEmpty(myValue) && String(myValue).split('.')[1].length !== " + this.decimalPlace;
        };
        DecimalPointValidationModel.prototype.setMessage = function () {
            this.message = "Value must be to " + this.decimalPlace + " decimal places";
        };
        DecimalPointValidationModel.prototype.setValuesAndExpressions = function () {
            this.setMessage();
            this.setFailExpression();
        };
        return DecimalPointValidationModel;
    }());

    var DummyDataSource = (function () {
        function DummyDataSource() {
            this.returnErrorOnNext = false;
        }
        DummyDataSource.prototype.resolveSelectedValue = function (value) {
            var selectOptions = this.sampleData();
            selectOptions = selectOptions.map(function (obj) {
                var option = new Option$1({
                    label: obj.label,
                    value: obj.concept
                });
                return option;
            });
            selectOptions = selectOptions.filter(function (option) { return option.value === value; });
            var test = new rxjs.BehaviorSubject([]);
            if (!this.returnErrorOnNext) {
                test.next(selectOptions[0]);
            }
            else {
                test.error(new Error('Error loading Options'));
            }
            return test.asObservable();
        };
        DummyDataSource.prototype.fileUpload = function (url) {
            return rxjs.of({ image: '' });
        };
        DummyDataSource.prototype.fetchFile = function (url) {
            return rxjs.of({ image: '' });
        };
        DummyDataSource.prototype.searchOptions = function (searchText) {
            var selectOptions = this.sampleData();
            selectOptions = selectOptions.map(function (obj) {
                var option = new Option$1({
                    label: obj.label,
                    value: obj.concept
                });
                return option;
            });
            selectOptions = selectOptions.filter(function (option) { return option.label.indexOf(searchText) !== -1; });
            var test = new rxjs.BehaviorSubject([]);
            if (!this.returnErrorOnNext) {
                test.next(selectOptions);
            }
            else {
                test.error(new Error('Error loading Options'));
            }
            return test.asObservable();
        };
        DummyDataSource.prototype.sampleData = function () {
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
        };
        return DummyDataSource;
    }());

    var moment$4 = moment_;
    var HistoricalEncounterDataService = (function () {
        function HistoricalEncounterDataService() {
            this.dataSources = {};
        }
        HistoricalEncounterDataService.prototype.registerEncounters = function (name, encounters) {
            var _this = this;
            var encStore = {
                data: [],
                getValue: function (key, index) {
                    if (index === void 0) {
                        index = 0;
                    }
                    var pathArray = key.split('.');
                    if (pathArray.length > 0) {
                        return _this.getFirstValue(pathArray, encStore.data[index]);
                    }
                    return encStore.data[index][key];
                },
                getAllObjects: function () {
                    return encStore.data;
                },
                getSingleObject: function (index) {
                    if (index === void 0) {
                        index = 0;
                    }
                    return encStore.data[index];
                }
            };
            if (_.isArray(encounters)) {
                var group_1 = [];
                _.each(encounters, function (encounter) {
                    group_1.push(_this._transformEncounter(encounter));
                });
                // Sort them in reverse chronological order
                encStore.data = _.sortBy(group_1, 'encounterDatetime').reverse();
            }
            else {
                // Assume a single openmrs rest encounter object.
                encStore.data.push(this._transformEncounter(encounters));
            }
            this.putObject(name, encStore);
        };
        HistoricalEncounterDataService.prototype.putObject = function (name, object) {
            this.dataSources[name] = object;
        };
        HistoricalEncounterDataService.prototype.getObject = function (name) {
            return this.dataSources[name] || null;
        };
        HistoricalEncounterDataService.prototype.getFirstValue = function (path, object) {
            var answers = [];
            this.getAllValues(path, object, answers);
            if (answers.length > 0) {
                return {
                    value: answers[0],
                    valueDate: moment$4(object.encounterDatetime).format('ll')
                };
            }
        };
        HistoricalEncounterDataService.prototype.getAllValues = function (path, object, answers) {
            var _this = this;
            if (_.isNil(object)) {
                return;
            }
            if (path.length <= 1) {
                if (!_.isNil(object[path[0]])) {
                    answers.push(object[path[0]]);
                }
                return;
            }
            var newpath = path.splice(1);
            var key = path[0];
            if (_.isArray(object[key]) && object[key].length > 0) {
                _.each(object[key], function (childObject) {
                    _this.getAllValues(newpath.slice(0), childObject, answers);
                });
            }
            else {
                this.getAllValues(newpath.slice(0), object[key], answers);
            }
        };
        HistoricalEncounterDataService.prototype._transformEncounter = function (encounter) {
            if (_.isNil(encounter)) {
                return;
            }
            // Transform encounter Level details to key value pairs.
            var prevEncounter = {
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
                var provider = encounter.provider;
                prevEncounter.provider = provider.uuid;
            }
            // Deal with obs.
            if (encounter.obs) {
                var processedObs = this._transformObs(encounter.obs);
                // add in individual processed obs to prevEncounter
                _.extend(prevEncounter, processedObs);
            }
            return prevEncounter;
        };
        HistoricalEncounterDataService.prototype._transformObs = function (obs) {
            var _this = this;
            if (!obs) {
                return null;
            }
            var obsRep = {};
            if (_.isArray(obs)) {
                _.each(obs, function (singleObs) {
                    _this._augumentObs(obsRep, _this._transformObs(singleObs));
                });
                return obsRep;
            }
            else if (obs.groupMembers) {
                var group_2 = {};
                _.each(obs.groupMembers, function (member) {
                    _this._augumentObs(group_2, _this._transformObs(member));
                });
                // Handle already existing data
                if (obsRep[obs.concept.uuid] && _.isArray(obsRep[obs.concept.uuid])) {
                    obsRep[obs.concept.uuid].push(group_2);
                }
                else {
                    obsRep[obs.concept.uuid] = [group_2];
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
        };
        HistoricalEncounterDataService.prototype._augumentObs = function (existing, toAdd) {
            for (var key in toAdd) {
                if (_.has(existing, key)) {
                    // check if not an array yet
                    if (!_.isArray(existing[key])) {
                        var temp = existing[key];
                        existing[key] = [temp];
                    }
                    // Check whether the incoming is array (for group members)
                    if (_.isArray(toAdd[key])) {
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
        };
        HistoricalEncounterDataService.decorators = [
            { type: i0.Injectable },
        ];
        HistoricalEncounterDataService.ctorParameters = function () { return []; };
        return HistoricalEncounterDataService;
    }());

    var HistoricalHelperService = (function () {
        function HistoricalHelperService() {
        }
        HistoricalHelperService.prototype.evaluate = function (expr, dataSources, additionalScopevalues) {
            var HD = new HistoricalEncounterDataService();
            HD.registerEncounters('prevEnc', dataSources['rawPrevEnc']);
            var deps = {
                HD: HD
            };
            if (additionalScopevalues) {
                for (var o in additionalScopevalues) {
                    if (additionalScopevalues[o]) {
                        deps[o] = additionalScopevalues[o];
                    }
                }
            }
            var helper = new JsExpressionHelper();
            var control = new AfeFormControl();
            var runner = new ExpressionRunner();
            var runnable = runner.getRunnable(expr, control, helper.helperFunctions, deps);
            return runnable.run();
        };
        HistoricalHelperService.prototype.evaluatePrecondition = function (expr, dataSources, historicalValue) {
            var additionalScope = {
                histValue: historicalValue
            };
            return this.evaluate(expr, dataSources, additionalScope);
        };
        HistoricalHelperService.decorators = [
            { type: i0.Injectable },
        ];
        HistoricalHelperService.ctorParameters = function () { return []; };
        return HistoricalHelperService;
    }());

    var moment$5 = moment_;
    var QuestionFactory = (function () {
        function QuestionFactory() {
            this.dataSources = {};
            this.historicalHelperService = new HistoricalHelperService();
        }
        QuestionFactory.prototype.createQuestionModel = function (formSchema, form) {
            if (form) {
                var dataSources = form.dataSourcesContainer.dataSources;
                this.dataSources = dataSources;
            }
            return this.toFormQuestionModel(formSchema);
        };
        QuestionFactory.prototype.toSelectQuestion = function (schemaQuestion) {
            var question = new SelectQuestion({ options: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
                return {
                    label: obj.label,
                    value: obj.concept
                };
            });
            var options = question.options;
            options.splice(0, 0, {
                label: '',
                value: ''
            });
            question.renderingType = schemaQuestion.questionOptions.rendering;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toNumericQuestion = function (schemaQuestion) {
            var question = new TextInputQuestion({
                placeholder: '',
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'number';
            question.placeholder = schemaQuestion.questionOptions.placeholder;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.placeholder = schemaQuestion.questionOptions.placeholder || '';
            var mappings = {
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
        };
        QuestionFactory.prototype.toNumberQuestion = function (schemaQuestion) {
            var question = new TextInputQuestion({
                placeholder: '',
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'number';
            question.placeholder = schemaQuestion.questionOptions.placeholder || '';
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toDecimalQuestion = function (schemaQuestion) {
            var question = new TextInputQuestion({
                placeholder: '',
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'decimal';
            question.placeholder = schemaQuestion.questionOptions.placeholder || '';
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toDateQuestion = function (schemaQuestion) {
            if (schemaQuestion.type === 'encounterDatetime') {
                return this.toEncounterDatetimeQuestion(schemaQuestion);
            }
            var question = new DateQuestion({ type: '', key: '' });
            question.renderingType = 'date';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.showTime = schemaQuestion.questionOptions.showTime;
            question.showWeeksAdder = schemaQuestion.questionOptions.weeksList
                ? true
                : false;
            var mappings = {
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
        };
        QuestionFactory.prototype.toTimeQuestion = function (schemaQuestion) {
            var question = new TimeQuestion({ type: '', key: '' });
            question.renderingType = 'time';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toEncounterDatetimeQuestion = function (schemaQuestion) {
            var question = new DateQuestion({ type: '', key: '' });
            question.label = schemaQuestion.label;
            question.renderingType = 'date';
            question.key = schemaQuestion.id;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.showWeeksAdder = schemaQuestion.questionOptions.weeksList
                ? true
                : false;
            var mappings = {
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
        };
        QuestionFactory.prototype.toCheckBoxQuestion = function (schemaQuestion) {
            var question = new CheckBoxQuestion({ options: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.extras = schemaQuestion;
            question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
                return {
                    label: obj.label,
                    value: obj.concept
                };
            });
            question.options.splice(0, 0);
            question.renderingType = schemaQuestion.questionOptions.rendering;
            var mappings = {
                label: 'label',
                id: 'key'
            };
            this.copyProperties(mappings, schemaQuestion, question);
            this.addDisableOrHideProperty(schemaQuestion, question);
            this.addAlertProperty(schemaQuestion, question);
            this.addHistoricalExpressions(schemaQuestion, question);
            this.addCalculatorProperty(schemaQuestion, question);
            return question;
        };
        QuestionFactory.prototype.toMultiCheckboxQuestion = function (schemaQuestion) {
            var question = new MultiSelectQuestion({
                renderType: '',
                options: [],
                type: '',
                key: ''
            });
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
            var mappings = {
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
        };
        QuestionFactory.prototype.toTextAreaQuestion = function (schemaQuestion) {
            var question = new TextAreaInputQuestion({
                isExpanded: false,
                rows: 18,
                placeholder: '',
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.placeholder = schemaQuestion.questionOptions.placeholder;
            question.isExpanded = schemaQuestion.isExpanded;
            question.rows = schemaQuestion.questionOptions.rows;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.placeholder = schemaQuestion.questionOptions.placeholder || '';
            var mappings = {
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
        };
        QuestionFactory.prototype.toTextQuestion = function (schemaQuestion) {
            var question = new TextInputQuestion({
                placeholder: '',
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'text';
            question.placeholder = schemaQuestion.questionOptions.placeholder;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.placeholder = schemaQuestion.questionOptions.placeholder || '';
            var mappings = {
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
        };
        QuestionFactory.prototype.toFileUploadQuestion = function (schemaQuestion) {
            var question = new FileUploadQuestion({ type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'file';
            question.dataSource = 'file';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toDrugQuestion = function (schemaQuestion) {
            var question = new SelectQuestion({ options: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'drug';
            var mappings = {
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
        };
        QuestionFactory.prototype.toProblemQuestion = function (schemaQuestion) {
            var question = new SelectQuestion({ options: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'problem';
            var mappings = {
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
        };
        QuestionFactory.prototype.toConceptAnswerSelect = function (schemaQuestion) {
            var question = new SelectQuestion({ options: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource =
                schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
            question.dataSourceOptions = {
                concept: schemaQuestion.questionOptions.concept
            };
            var mappings = {
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
        };
        QuestionFactory.prototype.toRepeatingQuestion = function (schemaQuestion) {
            var question = new RepeatingQuestion({
                questions: [],
                type: '',
                key: ''
            });
            question.label = schemaQuestion.label;
            question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
            question.key = schemaQuestion.id;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            if (schemaQuestion.type === 'testOrder') {
                var testOrder = this.toTestOrderQuestion(schemaQuestion);
                var orders = [];
                orders.push(testOrder);
                question.questions = orders;
            }
            var mappings = {
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
        };
        QuestionFactory.prototype.toGroupQuestion = function (schemaQuestion) {
            var question = new QuestionGroup({ questions: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
            question.key = schemaQuestion.id;
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            var mappings = {
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
        };
        QuestionFactory.prototype.toPageQuestion = function (schemaQuestion) {
            var _this = this;
            var question = new QuestionGroup({ questions: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.label;
            question.renderingType = 'page';
            question.controlType = exports.AfeControlType.None;
            question.questions = [];
            schemaQuestion.sections.forEach(function (element) {
                question.questions.push(_this.toSectionQuestion(element));
            });
            return question;
        };
        QuestionFactory.prototype.toFormQuestionModel = function (schemaQuestion) {
            var _this = this;
            var question = new QuestionGroup({ questions: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.label;
            question.renderingType = 'form';
            question.controlType = exports.AfeControlType.AfeFormGroup;
            question.extras = schemaQuestion;
            question.questions = [];
            schemaQuestion.pages.forEach(function (element) {
                question.questions.push(_this.toPageQuestion(element));
            });
            return question;
        };
        QuestionFactory.prototype.toSectionQuestion = function (schemaQuestion) {
            var question = new QuestionGroup({ questions: [], type: '', key: '' });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.label;
            question.renderingType = 'section';
            question.controlType = exports.AfeControlType.None;
            question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
            question.questions = this.getSchemaQuestions(schemaQuestion.questions);
            return question;
        };
        QuestionFactory.prototype.toPersonAttributeQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'personAttribute';
            var mappings = {
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
        };
        QuestionFactory.prototype.toEncounterProviderQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'provider';
            var mappings = {
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
        };
        QuestionFactory.prototype.toFieldSetQuestion = function (schemaQuestion) {
            var toReturn = this.toGroupQuestion(schemaQuestion);
            toReturn.renderingType = 'field-set';
            return toReturn;
        };
        QuestionFactory.prototype.toEncounterLocationQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = schemaQuestion.type;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'location';
            var mappings = {
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
        };
        QuestionFactory.prototype.toAmrsLocationsQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = schemaQuestion.type;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'amrsLocations';
            var mappings = {
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
        };
        QuestionFactory.prototype.toSiblingLocationsQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = schemaQuestion.type;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'siblingLocations';
            var mappings = {
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
        };
        QuestionFactory.prototype.toNonAmrsLocationsQuestion = function (schemaQuestion) {
            var question = new UiSelectQuestion({
                options: [],
                type: '',
                key: '',
                searchFunction: function () { },
                resolveFunction: function () { }
            });
            question.label = schemaQuestion.label;
            question.key = schemaQuestion.id;
            question.renderingType = schemaQuestion.type;
            question.renderingType = 'remote-select';
            question.validators = this.addValidators(schemaQuestion);
            question.extras = schemaQuestion;
            question.dataSource = 'nonAmrsLocations';
            var mappings = {
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
        };
        QuestionFactory.prototype.toTestOrderQuestion = function (schemaQuestion) {
            var question = new TestOrderQuestion({
                type: '',
                key: '',
                orderType: '',
                selectableOrders: [],
                orderSettingUuid: '',
                label: '',
                rendering: ''
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
            var mappings = {
                label: 'label',
                required: 'required',
                id: 'key'
            };
            this.copyProperties(mappings, schemaQuestion, question);
            return question;
        };
        QuestionFactory.prototype.getSchemaQuestions = function (schema) {
            var listQuestions = new Array();
            this.getQuestions(schema, listQuestions);
            return listQuestions;
        };
        QuestionFactory.prototype.getQuestions = function (schema, foundArray) {
            if (!Array.isArray(foundArray)) {
                foundArray = [];
            }
            if (Array.isArray(schema)) {
                for (var property in schema) {
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
                    else if (schema.questionOptions.rendering === 'field-set') ;
                    else {
                        foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                    }
                }
                else {
                    for (var o in schema) {
                        if (schema.hasOwnProperty(o)) {
                            this.getQuestions(schema[o], foundArray);
                        }
                    }
                }
            }
        };
        QuestionFactory.prototype.getChildrenQuestionModels = function (schema) {
            var children = [];
            this.getQuestions(schema, children);
            return children;
        };
        QuestionFactory.prototype.toModel = function (schema, renderType) {
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
                case 'decimal':
                    return this.toDecimalQuestion(schema);
                case 'encounterDatetime':
                    return this.toEncounterDatetimeQuestion(schema);
                case 'date':
                    return this.toDateQuestion(schema);
                case 'time':
                    return this.toTimeQuestion(schema);
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
                case 'select-concept-answers':
                    return this.toConceptAnswerSelect(schema);
                case 'encounterLocation':
                    return this.toEncounterLocationQuestion(schema);
                case 'amrsLocations':
                    return this.toAmrsLocationsQuestion(schema);
                case 'nonAmrsLocations':
                    return this.toNonAmrsLocationsQuestion(schema);
                case 'siblingLocations':
                    return this.toSiblingLocationsQuestion(schema);
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
        };
        QuestionFactory.prototype.convertOldVersionComplexObsQuestionToNewVersion = function (schemaQuestion) {
            var converted = {};
            converted.type = 'complex-obs';
            converted.label = schemaQuestion.label;
            converted.id = 'complex_' + schemaQuestion.id;
            converted.questionOptions = {};
            converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
            converted.questionOptions.rendering = 'field-set';
            converted.questions = [];
            converted.validators = [];
            var mainField = JSON.parse(JSON.stringify(schemaQuestion));
            mainField.type = 'complex-obs-child';
            delete mainField.questionOptions.showDate;
            delete mainField.questionOptions.shownDateOptions;
            mainField.questionOptions.obsField = 'value';
            var dateField = {};
            dateField.type = 'complex-obs-child';
            dateField.label = 'Date of ' + mainField.label;
            dateField.id = 'date_' + mainField.id;
            dateField.questionOptions = {};
            dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
            dateField.questionOptions.rendering = 'date';
            dateField.questionOptions.obsField = 'obsDatetime';
            var dateOptions = Object.assign({}, schemaQuestion.questionOptions.shownDateOptions);
            dateField.validators = dateOptions.validators;
            dateField.hide = dateOptions.hide;
            converted.questions.push(mainField);
            converted.questions.push(dateField);
            return converted;
        };
        QuestionFactory.prototype.copyProperties = function (mappings, source, destination) {
            for (var property in source) {
                if (mappings.hasOwnProperty(property) &&
                    destination.hasOwnProperty(mappings[property])) {
                    destination[mappings[property]] = source[property];
                }
            }
        };
        QuestionFactory.prototype.addValidators = function (schemaQuestion) {
            var validators = [];
            if (schemaQuestion.validators) {
                // TODO - add more validator types
                _.forEach(schemaQuestion.validators, function (validator) {
                    switch (validator.type) {
                        case 'date':
                            validators.push(new DateValidationModel(validator));
                            break;
                        case 'js_expression':
                            validators.push(new JsExpressionValidationModel(validator));
                            break;
                        case 'decimal':
                            var decimalModel = new DecimalPointValidationModel(validator);
                            decimalModel.setValuesAndExpressions();
                            validators.push(decimalModel);
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
            var questionOptions = schemaQuestion.questionOptions;
            var renderingType = questionOptions ? questionOptions.rendering : '';
            if (renderingType === 'number' || renderingType === 'decimal') {
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
            }
            // add conditional required validators
            if (typeof schemaQuestion.required === 'object') {
                var required = schemaQuestion.required;
                if (required.type === 'conditionalRequired') {
                    validators.push(new ConditionalValidationModel({
                        referenceQuestionId: required.referenceQuestionId,
                        referenceQuestionAnswers: required.referenceQuestionAnswers,
                        type: required.type,
                        message: required.message
                    }));
                }
            }
            return validators;
        };
        QuestionFactory.prototype.addHistoricalExpressions = function (schemaQuestion, question) {
            if (schemaQuestion.historicalExpression &&
                schemaQuestion.historicalExpression.length > 0) {
                question.setHistoricalValue(true);
                if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                    question.showHistoricalEncounterDate(schemaQuestion.showHistoricalEncounterDate === 'true');
                }
                else {
                    question.showHistoricalEncounterDate();
                }
                var origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources, undefined);
                question.historicalDataValue = origValue;
                // console.info('historical value', origValue);
                // console.info('historical data question :::', question);
                // console.info('schema data question :::', schemaQuestion);
                if (schemaQuestion.historicalPrepopulateCondition && origValue) {
                    var toPopulate = this.historicalHelperService.evaluatePrecondition(schemaQuestion.historicalPrepopulateCondition, this.dataSources, origValue);
                    if (toPopulate) {
                        question.defaultValue = origValue.value;
                    }
                    return; // don't try to evaluate the other option
                }
                if (schemaQuestion.historicalPrepopulate && origValue) {
                    // sample schema options for this branch
                    // "historicalPrepopulate":true,
                    // "allowedHistoricalValueAgeInDays": 40000,
                    var valDate = moment$5(origValue.valueDate);
                    var differenceInDays = moment$5().diff(valDate, 'days');
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
        };
        QuestionFactory.prototype.addCalculatorProperty = function (schemaQuestion, question) {
            if (schemaQuestion.questionOptions &&
                typeof schemaQuestion.questionOptions.calculate === 'object') {
                question.calculateExpression =
                    schemaQuestion.questionOptions.calculate.calculateExpression;
            }
        };
        QuestionFactory.prototype.addAlertProperty = function (schemaQuestion, question) {
            if (schemaQuestion.alert) {
                question.alert = schemaQuestion.alert;
            }
            // if (typeof schemaQuestion.message === 'object') {
            //   if (schemaQuestion.message.alertWhenExpression) {
            //     question.message = schemaQuestion.message.alertWhenExpression;
            //   }
            // }
        };
        QuestionFactory.prototype.addDisableOrHideProperty = function (schemaQuestion, question) {
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
        };
        QuestionFactory.prototype.generateId = function (x) {
            var s = '_';
            while (s.length < x && x > 0) {
                var r = Math.random();
                s +=
                    r < 0.1
                        ? Math.floor(r * 100)
                        : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
            }
            return '_' + s;
        };
        return QuestionFactory;
    }());

    var Form = (function () {
        function Form(schema, formFactory, questionFactory) {
            this.schema = schema;
            this.formFactory = formFactory;
            this.questionFactory = questionFactory;
            this.valueProcessingInfo = {};
            this.existingOrders = {};
            this._showErrors = false;
            this._dataSourcesContainer = new DataSources();
        }
        Object.defineProperty(Form.prototype, "dataSourcesContainer", {
            get: function () {
                return this._dataSourcesContainer;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.searchNodeByPath = function (node, path, found) {
            var _this = this;
            var children = node.children;
            for (var key in children) {
                if (children.hasOwnProperty(key)) {
                    var child = children[key];
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
                        var aChild = child;
                        aChild.children.forEach(function (aChildNode) {
                            _this.searchNodeByPath(aChildNode, path, found);
                        });
                    }
                }
            }
            return found;
        };
        Form.prototype.searchNodeByQuestionId = function (questionId, questionType) {
            var found = [];
            if (questionType) {
                this.searchNodeByQuestionType(this.rootNode, questionType, found);
            }
            else {
                this.findNodesByQuestionId(this.rootNode, questionId, found);
            }
            return found;
        };
        Form.prototype.searchNodeByQuestionType = function (rootNode, questionType, found) {
            var _this = this;
            if (rootNode instanceof GroupNode) {
                var nodeAsGroup = rootNode;
                // tslint:disable-next-line:forin
                for (var o in nodeAsGroup.children) {
                    this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
                }
            }
            if (rootNode instanceof ArrayNode) {
                var nodeAsArray = rootNode;
                nodeAsArray.children.forEach(function (node) {
                    _this.searchNodeByQuestionType(node, questionType, found);
                });
            }
            if (rootNode instanceof LeafNode) {
                var questionBase = rootNode.question;
                if (questionBase.extras &&
                    questionBase.extras.type &&
                    questionBase.extras.type === questionType) {
                    found.push(rootNode);
                }
            }
        };
        Form.prototype.findNodesByQuestionId = function (rootNode, questionId, results) {
            var _this = this;
            if (rootNode.question.key === questionId) {
                results.push(rootNode);
            }
            if (rootNode instanceof GroupNode) {
                var nodeAsGroup = rootNode;
                // tslint:disable-next-line:forin
                for (var o in nodeAsGroup.children) {
                    this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
                }
            }
            if (rootNode instanceof ArrayNode) {
                var nodeAsArray = rootNode;
                nodeAsArray.children.forEach(function (node) {
                    _this.findNodesByQuestionId(node, questionId, results);
                });
            }
        };
        Object.defineProperty(Form.prototype, "valid", {
            get: function () {
                return this.rootNode.control.valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "showErrors", {
            get: function () {
                return this._showErrors;
            },
            set: function (show) {
                this._showErrors = show;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.markInvalidControls = function (node, invalidControlNodes) {
            var _this = this;
            var children = node.children;
            for (var key in children) {
                if (children.hasOwnProperty(key)) {
                    var child = children[key];
                    if (child instanceof GroupNode) {
                        this.markInvalidControls(child, invalidControlNodes);
                    }
                    else if (child instanceof LeafNode) {
                        var questionBase = child.question;
                        if (questionBase.key && questionBase.key.length > 0) {
                            var c = child.control;
                            if (!c.valid && !c.disabled) {
                                if (invalidControlNodes) {
                                    invalidControlNodes.push(child);
                                }
                                c.markAsTouched();
                            }
                        }
                    }
                    else if (child instanceof ArrayNode) {
                        var arrayNode = child;
                        if (arrayNode &&
                            arrayNode.children &&
                            arrayNode.children.length > 0) {
                            _.forEach(arrayNode.children, function (groupNode) {
                                _this.markInvalidControls(groupNode, invalidControlNodes);
                            });
                        }
                    }
                }
            }
            return invalidControlNodes;
        };
        Form.prototype.updateHiddenDisabledStateForAllControls = function () {
            this._updateHiddenDisabledStateForAllControls(this.rootNode);
        };
        Form.prototype.updateAlertsForAllControls = function () {
            this._updateAlertsForAllControls(this.rootNode);
        };
        Form.prototype._updateAlertsForAllControls = function (rootNode) {
            var _this = this;
            if (rootNode.control) {
                if (rootNode.control.updateAlert) {
                    rootNode.control.updateAlert();
                }
            }
            if (rootNode instanceof GroupNode) {
                var nodeAsGroup = rootNode;
                // tslint:disable-next-line:forin
                for (var o in nodeAsGroup.children) {
                    this._updateAlertsForAllControls(nodeAsGroup.children[o]);
                }
            }
            if (rootNode instanceof ArrayNode) {
                var nodeAsArray = rootNode;
                nodeAsArray.children.forEach(function (node) {
                    _this._updateAlertsForAllControls(node);
                });
            }
        };
        Form.prototype._updateHiddenDisabledStateForAllControls = function (rootNode) {
            var _this = this;
            if (rootNode.control) {
                if (rootNode.control.updateDisabledState) {
                    rootNode.control.updateDisabledState();
                }
                if (rootNode.control.updateHiddenState) {
                    rootNode.control.updateHiddenState();
                }
            }
            if (rootNode instanceof GroupNode) {
                var nodeAsGroup = rootNode;
                // tslint:disable-next-line:forin
                for (var o in nodeAsGroup.children) {
                    this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
                }
            }
            if (rootNode instanceof ArrayNode) {
                var nodeAsArray = rootNode;
                nodeAsArray.children.forEach(function (node) {
                    _this._updateHiddenDisabledStateForAllControls(node);
                });
            }
        };
        return Form;
    }());

    var FormFactory = (function () {
        function FormFactory(controlService, questionFactroy, controlRelationsFactory) {
            this.controlService = controlService;
            this.questionFactroy = questionFactroy;
            this.controlRelationsFactory = controlRelationsFactory;
            this.hd = {
                getValue: function () {
                    return 20;
                }
            };
        }
        FormFactory.prototype.createForm = function (schema, dataSource) {
            var form = new Form(schema, this, this.questionFactroy);
            if (dataSource) {
                for (var key in dataSource) {
                    if (dataSource.hasOwnProperty(key)) {
                        form.dataSourcesContainer.registerDataSource(key, dataSource[key], false);
                    }
                }
            }
            var question = this.questionFactroy.createQuestionModel(schema, form);
            form.rootNode = this.createNode(question, null, null, form);
            this.buildRelations(form.rootNode);
            form.updateHiddenDisabledStateForAllControls();
            form.updateAlertsForAllControls();
            return form;
        };
        FormFactory.prototype.buildRelations = function (rootNode) {
            Validations.JSExpressionValidatorsEnabled = false;
            this.controlRelationsFactory.buildRelations(rootNode);
            // enable js expression validations
            Validations.JSExpressionValidatorsEnabled = true;
        };
        FormFactory.prototype.createNode = function (question, parentNode, parentControl, form) {
            var node = null;
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
        };
        FormFactory.prototype.createLeafNode = function (question, parentNode, parentControl, form) {
            var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
            return new LeafNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
        };
        FormFactory.prototype.createGroupNode = function (question, parentNode, parentControl, form) {
            var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
            var groupNode = new GroupNode(question, controlModel, null, form, parentNode ? parentNode.path : undefined);
            this.createNodeChildren(question, groupNode, controlModel || parentControl, form);
            return groupNode;
        };
        FormFactory.prototype.createArrayNode = function (question, parentNode, parentControl, form) {
            var _this = this;
            var controlModel = this.controlService.generateControlModel(question, parentControl, false, form);
            var arrayNode = new ArrayNode(question, controlModel, parentControl, this, form, parentNode ? parentNode.path : undefined);
            arrayNode.createChildFunc = this.createArrayNodeChild;
            arrayNode.removeChildFunc = this.removeArrayNodeChild;
            arrayNode.addChildNodeCreatedListener(function (node) {
                Validations.JSExpressionValidatorsEnabled = false;
                _this.controlRelationsFactory.buildArrayNodeRelations(node);
                Validations.JSExpressionValidatorsEnabled = true;
            });
            return arrayNode;
        };
        FormFactory.prototype.createNodeChildren = function (question, node, parentControl, form) {
            var _this = this;
            question.questions.forEach(function (element) {
                var child = _this.createNode(element, node, parentControl, form);
                node.setChild(element.key, child);
            });
            return node.children;
        };
        FormFactory.prototype.createArrayNodeChild = function (question, node, factory) {
            if (factory === null || factory === undefined) {
                factory = this;
            }
            var groupQuestion = new QuestionGroup({
                key: node.path + '.' + node.children.length + '',
                type: 'group',
                extras: question.extras,
                label: '',
                questions: question.questions
            });
            if (question.controlType === exports.AfeControlType.None) {
                groupQuestion.controlType = question.controlType;
            }
            var group = factory.createGroupNode(groupQuestion, null, null, node.form);
            node.children.push(group);
            if (node.control instanceof AfeFormArray) {
                var nodeControl = node.control;
                nodeControl.setControl(nodeControl.controls.length, group.control);
            }
            return group;
        };
        FormFactory.prototype.removeArrayNodeChild = function (index, node) {
            var nodeToRemove = node.children[index];
            node.children.splice(index, 1);
            if (node.control !== null || node.control !== undefined) {
                if (node.control instanceof AfeFormArray) {
                    var control = node.control;
                    var controlIndexToRemove = control.controls.indexOf(nodeToRemove.control);
                    if (controlIndexToRemove >= 0) {
                        control.removeAt(controlIndexToRemove);
                    }
                }
            }
        };
        FormFactory.decorators = [
            { type: i0.Injectable },
        ];
        FormFactory.ctorParameters = function () {
            return [
                { type: FormControlService },
                { type: QuestionFactory },
                { type: ControlRelationsFactory }
            ];
        };
        return FormFactory;
    }());

    var moment$6 = moment_;
    var ObsAdapterHelper = (function () {
        function ObsAdapterHelper() {
        }
        ObsAdapterHelper.prototype.findObsAnswerToQuestion = function (node, obsArray) {
            var _this = this;
            var found = [];
            if (!this.isObsNode(node)) {
                return found;
            }
            if (node instanceof LeafNode ||
                (node instanceof GroupNode && node.question.extras.type === 'complex-obs')) {
                _.each(obsArray, function (item) {
                    if (item.concept &&
                        item.concept.uuid === node.question.extras.questionOptions.concept) {
                        found.push(item);
                    }
                });
                return found;
            }
            // At this point the node is either a group or a repeating node
            var childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
            if (childQuestionsUuids.length > 0) {
                _.each(obsArray, function (obs) {
                    if (obs.concept &&
                        obs.concept.uuid === node.question.extras.questionOptions.concept &&
                        Array.isArray(obs.groupMembers) &&
                        _this.isSubsetOf(childQuestionsUuids, _this.getGroupMembersConceptUuids(obs))) {
                        found.push(obs);
                    }
                });
            }
            return found;
        };
        ObsAdapterHelper.prototype.getChildQuestionsConceptUuids = function (node) {
            var found = [];
            if (node.question.extras && node.question.extras.questions) {
                _.each(node.question.extras.questions, function (question) {
                    if (question.questionOptions && question.questionOptions.concept) {
                        found.push(question.questionOptions.concept);
                    }
                });
            }
            return found;
        };
        ObsAdapterHelper.prototype.getGroupMembersConceptUuids = function (obsWithGroupMembers) {
            var found = [];
            if (Array.isArray(obsWithGroupMembers.groupMembers)) {
                _.each(obsWithGroupMembers.groupMembers, function (member) {
                    found.push(member.concept.uuid);
                });
            }
            return found;
        };
        ObsAdapterHelper.prototype.isObsNode = function (node) {
            return (node.question.extras &&
                (node.question.extras.type === 'obs' ||
                    node.question.extras.type === 'obsGroup' ||
                    node.question.extras.type === 'complex-obs' ||
                    node.question.extras.type === 'complex-obs-child'));
        };
        ObsAdapterHelper.prototype.isSubsetOf = function (supersetArray, subsetArray) {
            if (subsetArray.length === 0 && supersetArray.length === 0) {
                return true;
            }
            return subsetArray.every(function (element) {
                return supersetArray.indexOf(element) >= 0;
            });
        };
        ObsAdapterHelper.prototype.setSimpleObsNodeValue = function (node, obs) {
            if (node && obs.length > 0) {
                var obsToUse = obs[0];
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
        };
        ObsAdapterHelper.prototype.setMultiselectObsNodeValue = function (node, obs) {
            if (node && obs.length > 0) {
                node.initialValue = obs;
                var obsUuids = [];
                try {
                    for (var obs_1 = __values(obs), obs_1_1 = obs_1.next(); !obs_1_1.done; obs_1_1 = obs_1.next()) {
                        var m = obs_1_1.value;
                        obsUuids.push(m.value.uuid);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (obs_1_1 && !obs_1_1.done && (_a = obs_1.return))
                            _a.call(obs_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                this.setNodeFormControlValue(node, obsUuids);
            }
            var e_1, _a;
        };
        ObsAdapterHelper.prototype.setComplexObsNodeValue = function (node, obs) {
            if (node && obs.length > 0) {
                var valueField = void 0; // essential memmber
                var dateField = void 0; // other member to be manipulated by user
                var nodeAsGroup = node;
                // tslint:disable-next-line:forin
                for (var o in nodeAsGroup.children) {
                    if (nodeAsGroup.children[o].question.extras.questionOptions
                        .obsField === 'value') {
                        valueField = nodeAsGroup.children[o];
                    }
                    if (nodeAsGroup.children[o].question.extras.questionOptions
                        .obsField === 'obsDatetime') {
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
        };
        ObsAdapterHelper.prototype.setGroupObsNodeValue = function (node, obs) {
            if (node && obs.length > 0) {
                var groupNode = node;
                groupNode.initialValue = obs[0];
                // tslint:disable-next-line:forin
                for (var o in groupNode.children) {
                    this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
                }
            }
        };
        ObsAdapterHelper.prototype.setRepeatingGroupObsNodeValue = function (node, obs) {
            if (node && obs.length > 0) {
                var arrayNode = node;
                arrayNode.initialValue = obs;
                for (var i = 0; i < obs.length; i++) {
                    var createdNode = arrayNode.createChildNode();
                    this.setGroupObsNodeValue(createdNode, [obs[i]]);
                }
            }
        };
        ObsAdapterHelper.prototype.setNodeValue = function (node, obs) {
            switch (this.getObsNodeType(node)) {
                case 'unknown':
                    if (node instanceof GroupNode) {
                        var groupNode = node;
                        // tslint:disable-next-line:forin
                        for (var o in groupNode.children) {
                            this.setNodeValue(groupNode.children[o], obs);
                        }
                        break;
                    }
                    if (node instanceof ArrayNode) {
                        var arrayNode = node;
                        for (var i = 0; i < arrayNode.children.length; i++) {
                            this.setNodeValue(arrayNode.children[i], obs);
                        }
                        break;
                    }
                    break;
                case 'simple':
                    // search asnwering obs at this point
                    var answeringObs = this.findObsAnswerToQuestion(node, obs);
                    // set answer here
                    this.setSimpleObsNodeValue(node, answeringObs);
                    break;
                case 'multiselect':
                    // search asnwering obs at this point
                    var multiselectObs = this.findObsAnswerToQuestion(node, obs);
                    // set answer here
                    this.setMultiselectObsNodeValue(node, multiselectObs);
                    break;
                case 'complex':
                    // search asnwering obs at this point
                    var complexObs = this.findObsAnswerToQuestion(node, obs);
                    // set answer here
                    this.setComplexObsNodeValue(node, complexObs);
                    break;
                case 'group':
                    var groupObs = this.findObsAnswerToQuestion(node, obs);
                    if (groupObs.length > 0) {
                        this.setGroupObsNodeValue(node, groupObs);
                    }
                    break;
                case 'repeatingGroup':
                    var repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);
                    if (repeatingGroupObs.length > 0) {
                        this.setRepeatingGroupObsNodeValue(node, repeatingGroupObs);
                    }
                    break;
                default:
                    console.error('Unknown obs node', node);
                    break;
            }
        };
        ObsAdapterHelper.prototype.setNodeFormControlValue = function (node, value) {
            node.control.setValue(value);
            // TODO: Determine if we need this call
            // node.control.updateValueAndValidity();
            // TODO: Remove this hack and put it in appropriate place
            if (node.question.enableHistoricalValue &&
                node.initialValue !== undefined) {
                node.question.setHistoricalValue(false);
            }
        };
        ObsAdapterHelper.prototype.getObsNodeType = function (node) {
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
        };
        // PAYLOAD GENERATION FUNCTIONS
        ObsAdapterHelper.prototype.getSimpleObsPayload = function (node) {
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
            var obs = {
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
        };
        ObsAdapterHelper.prototype.getComplexObsPayload = function (node) {
            var valueField; // essential memmber
            var dateField; // other member to be manipulated by user
            var nodeAsGroup = node;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                if (nodeAsGroup.children[o].question.extras.questionOptions
                    .obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }
                if (nodeAsGroup.children[o].question.extras.questionOptions
                    .obsField === 'obsDatetime') {
                    dateField = nodeAsGroup.children[o];
                }
            }
            var valuePayload = this.getObsNodePayload(valueField);
            console.log('valuePayload', valuePayload);
            // set obs datetime for the generated payload
            if (valuePayload.length > 0) {
                valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return valuePayload[0];
            }
            else if (valuePayload.length === 0 && node.initialValue) {
                // determine if date changed
                if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                    var payload = {
                        uuid: node.initialValue.uuid
                    };
                    payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                    return payload;
                }
            }
            return null;
        };
        ObsAdapterHelper.prototype.getMultiselectObsPayload = function (node) {
            var payload = [];
            var existingUuids = [];
            // add voided obs i.e. deleted options
            if (Array.isArray(node.initialValue)) {
                _.each(node.initialValue, function (item) {
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
                _.each(node.control.value, function (item) {
                    if (existingUuids.indexOf(item) < 0) {
                        payload.push({
                            concept: node.question.extras.questionOptions.concept,
                            value: item
                        });
                    }
                });
            }
            return payload;
        };
        ObsAdapterHelper.prototype.getGroupPayload = function (node) {
            var _this = this;
            var nodeAsGroup = node;
            var childrenPayload = [];
            _.each(nodeAsGroup.children, function (child) {
                var payload = _this.getObsNodePayload(child);
                if (payload.length > 0) {
                    childrenPayload = childrenPayload.concat(payload);
                }
            });
            if (childrenPayload.length === 0) {
                return null;
            }
            var groupPayload = {
                groupMembers: childrenPayload
            };
            if (nodeAsGroup.initialValue) {
                groupPayload.uuid = nodeAsGroup.initialValue.uuid;
            }
            else {
                groupPayload.concept =
                    nodeAsGroup.question.extras.questionOptions.concept;
            }
            return groupPayload;
        };
        ObsAdapterHelper.prototype.getRepeatingGroupPayload = function (node) {
            var _this = this;
            var nodeAsArray = node;
            var childrenPayload = [];
            var groupsUuidsAfterEditting = [];
            _.each(nodeAsArray.children, function (child) {
                var payload = _this.getObsNodePayload(child);
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
                _.each(nodeAsArray.initialValue, function (obs) {
                    if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                        var voidedGroup = {
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
        };
        ObsAdapterHelper.prototype.getObsNodePayload = function (node) {
            var payload = [];
            switch (this.getObsNodeType(node)) {
                case 'unknown':
                    if (node instanceof GroupNode) {
                        var groupNode = node;
                        // tslint:disable-next-line:forin
                        for (var o in groupNode.children) {
                            var groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                            if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                                payload = payload.concat(groupNodePayoad);
                            }
                        }
                        break;
                    }
                    if (node instanceof ArrayNode) {
                        var arrayNode = node;
                        for (var i = 0; i < arrayNode.children.length; i++) {
                            var arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                            if (Array.isArray(arrayNodePayload) &&
                                arrayNodePayload.length > 0) {
                                payload = payload.concat(arrayNodePayload);
                            }
                        }
                        break;
                    }
                    break;
                case 'simple':
                    var simpleObs = this.getSimpleObsPayload(node);
                    if (simpleObs !== null) {
                        payload.push(simpleObs);
                    }
                    break;
                case 'multiselect':
                    var multiselectObs = this.getMultiselectObsPayload(node);
                    if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                        payload = payload.concat(multiselectObs);
                    }
                    break;
                case 'complex':
                    var complexObs = this.getComplexObsPayload(node);
                    if (complexObs !== null) {
                        payload.push(complexObs);
                    }
                    break;
                case 'group':
                    var groupedObs = this.getGroupPayload(node);
                    if (groupedObs && groupedObs !== null) {
                        payload.push(groupedObs);
                    }
                    break;
                case 'repeatingGroup':
                    var repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                    if (Array.isArray(repeatingGroupedObs) &&
                        repeatingGroupedObs.length > 0) {
                        payload = payload.concat(repeatingGroupedObs);
                    }
                    break;
                default:
                    break;
            }
            return payload;
        };
        ObsAdapterHelper.prototype.simpleNodeValueChanged = function (node) {
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
        };
        ObsAdapterHelper.prototype.areDatesEqual = function (date1, date2) {
            return moment$6(date1).isSame(date2);
        };
        ObsAdapterHelper.prototype.isEmpty = function (value) {
            if (value === '' ||
                value === null ||
                value === undefined) {
                return true;
            }
            return false;
        };
        ObsAdapterHelper.prototype.toOpenMrsDateTimeString = function (datetime) {
            if (this.isEmpty(datetime)) {
                return undefined;
            }
            else {
                // transform value to memoent value to avoid error
                var formattedVal = moment$6(datetime).format();
                var val = formattedVal.substring(0, 19).replace('T', ' ');
                return this.isEmpty(val) ? undefined : val;
            }
        };
        return ObsAdapterHelper;
    }());

    var ObsValueAdapter = (function () {
        function ObsValueAdapter(helper) {
            this.helper = helper;
        }
        ObsValueAdapter.prototype.generateFormPayload = function (form) {
            return this.helper.getObsNodePayload(form.rootNode);
            // TODO: Get rid of the section below when the helper is stable.
            // // Traverse  to get all nodes
            // let pages = this.traverse(form.rootNode);
            // // Extract actual question nodes
            // let questionNodes = this.getQuestionNodes(pages);
            // // Get obs Payload
            // return this.getObsPayload(questionNodes);
        };
        ObsValueAdapter.prototype.populateForm = function (form, payload) {
            this.helper.setNodeValue(form.rootNode, payload);
            // TODO: Get rid of the section below when the helper is stable.
            // // Traverse  to get all nodes
            // let pages = this.traverse(form.rootNode);
            // // Extract actual question nodes
            // let questionNodes = this.getQuestionNodes(pages);
            // // Extract set obs
            // this.setValues(questionNodes, payload);
        };
        // TODO: Get rid of all the functions below as they will not be needed
        // once the helper is stable
        ObsValueAdapter.prototype.setValues = function (nodes, payload, forcegroup) {
            if (nodes) {
                var _loop_1 = function (node) {
                    if (node instanceof LeafNode) {
                        this_1.setObsValue(node, payload);
                        if (node.question.enableHistoricalValue &&
                            node.initialValue !== undefined) {
                            node.question.setHistoricalValue(false);
                        }
                    }
                    else if ((node.question &&
                        node.question.extras &&
                        node.question.renderingType === 'group') ||
                        forcegroup) {
                        var groupObs = _.find(payload, function (o) {
                            return (o.concept.uuid === node.question.extras.questionOptions.concept &&
                                o.groupMembers);
                        });
                        if (groupObs) {
                            if (node.node) {
                                node.node['initialValue'] = groupObs;
                            }
                            this_1.setValues(node.groupMembers, groupObs.groupMembers);
                        }
                        if (forcegroup && node.payload) {
                            this_1.setValues(node.groupMembers, node.payload.groupMembers);
                        }
                    }
                    else if (node instanceof GroupNode &&
                        node.question.extras.type === 'complex-obs') {
                        this_1.setComplexObsValue(node, payload);
                    }
                    else if (node.question &&
                        node.question.extras &&
                        node.question.renderingType === 'repeating' &&
                        !forcegroup) {
                        this_1.setRepeatingGroupValues(node, payload);
                        node.node.control.updateValueAndValidity();
                    }
                    else {
                        throw new Error('not implemented');
                    }
                };
                var this_1 = this;
                try {
                    for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                        var node = nodes_1_1.value;
                        _loop_1(node);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return))
                            _a.call(nodes_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            var e_1, _a;
        };
        ObsValueAdapter.prototype.setObsValue = function (node, payload) {
            if ((node.question &&
                node.question.extras &&
                (node.question.extras.type === 'obs' ||
                    (node.question.extras.type === 'complex-obs-child' &&
                        node.question.extras.questionOptions.obsField === 'value')) &&
                node.question.extras.questionOptions.rendering !== 'multiCheckbox') ||
                node.question.extras.questionOptions.rendering !== 'checkbox' ||
                node.question.extras.questionOptions.rendering !== 'multi-select') {
                var obs = _.find(payload, function (o) {
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
                var multiObs = _.filter(payload, function (o) {
                    return o.concept.uuid === node.question.extras.questionOptions.concept;
                });
                if (multiObs && multiObs.length > 0) {
                    node.control.setValue(this.getMultiselectValues(multiObs));
                    node.control.updateValueAndValidity();
                    node['initialValue'] = multiObs;
                }
            }
        };
        ObsValueAdapter.prototype.setComplexObsValue = function (node, payload) {
            var valueField;
            var dateField;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o].question.extras.questionOptions
                    .obsField === 'value') {
                    valueField = node.children[o];
                }
                if (node.children[o].question.extras.questionOptions
                    .obsField === 'obsDatetime') {
                    dateField = node.children[o];
                }
            }
            // set the usual obs value
            this.setObsValue(valueField, payload);
            // set the obs date
            var obs = _.find(payload, function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (obs) {
                dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
                dateField.control.setValue(obs.obsDatetime);
                dateField.control.updateValueAndValidity();
            }
        };
        ObsValueAdapter.prototype.getMultiselectValues = function (multiObs) {
            var values = [];
            try {
                for (var multiObs_1 = __values(multiObs), multiObs_1_1 = multiObs_1.next(); !multiObs_1_1.done; multiObs_1_1 = multiObs_1.next()) {
                    var m = multiObs_1_1.value;
                    values.push(m.value.uuid);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (multiObs_1_1 && !multiObs_1_1.done && (_a = multiObs_1.return))
                        _a.call(multiObs_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return values;
            var e_2, _a;
        };
        ObsValueAdapter.prototype.setRepeatingGroupValues = function (node, payload) {
            var groupRepeatingObs = _.filter(payload, function (o) {
                var found = o.concept.uuid === node.question.extras.questionOptions.concept;
                var intersect = false;
                if (found && o.groupMembers) {
                    var obs = o.groupMembers.map(function (a) {
                        return a.concept.uuid;
                    });
                    var schemaQuestions = node.question.questions.map(function (a) {
                        return a.extras.questionOptions.concept;
                    });
                    intersect = _.intersection(obs, schemaQuestions).length > 0;
                }
                return found && intersect;
            });
            if (groupRepeatingObs.length > 0) {
                node.node['initialValue'] = groupRepeatingObs;
                for (var i = 0; i < groupRepeatingObs.length; i++) {
                    node.node.createChildNode();
                }
            }
            var groups = [];
            var index = 0;
            var _loop_2 = function (child) {
                var children = Object.keys(child.children).map(function (key) {
                    return child.children[key];
                });
                var groupPayload = groupRepeatingObs[index];
                groups.push({
                    question: node.question,
                    groupMembers: children,
                    payload: groupPayload
                });
                index++;
            };
            try {
                for (var _a = __values(node.node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var child = _b.value;
                    _loop_2(child);
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            this.setValues(groups, groupRepeatingObs, true);
            var e_3, _c;
        };
        ObsValueAdapter.prototype.getQuestionNodes = function (pages) {
            var merged = [];
            var arrays = [];
            try {
                for (var pages_1 = __values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                    var page = pages_1_1.value;
                    try {
                        for (var _a = __values(page.page), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var section = _b.value;
                            arrays.push(section.section);
                        }
                    }
                    catch (e_4_1) {
                        e_4 = { error: e_4_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_4)
                                throw e_4.error;
                        }
                    }
                }
            }
            catch (e_5_1) {
                e_5 = { error: e_5_1 };
            }
            finally {
                try {
                    if (pages_1_1 && !pages_1_1.done && (_d = pages_1.return))
                        _d.call(pages_1);
                }
                finally {
                    if (e_5)
                        throw e_5.error;
                }
            }
            return merged.concat.apply([], arrays);
            var e_5, _d, e_4, _c;
        };
        ObsValueAdapter.prototype.repeatingGroup = function (nodes) {
            var toReturn = [];
            try {
                for (var nodes_2 = __values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                    var node = nodes_2_1.value;
                    toReturn.push({
                        question: node.question,
                        groupMembers: this.traverse(node)
                    });
                }
            }
            catch (e_6_1) {
                e_6 = { error: e_6_1 };
            }
            finally {
                try {
                    if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return))
                        _a.call(nodes_2);
                }
                finally {
                    if (e_6)
                        throw e_6.error;
                }
            }
            return toReturn;
            var e_6, _a;
        };
        ObsValueAdapter.prototype.processGroup = function (obs, obsPayload) {
            if (obs.question &&
                obs.question.extras &&
                obs.question.extras.questionOptions.rendering === 'group') {
                var members = _.filter(this.getObsPayload(obs.groupMembers), function (o) {
                    return o.value !== '';
                });
                var mappedMembers = members.map(function (a) {
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
        };
        ObsValueAdapter.prototype.mapInitialGroup = function (group) {
            var current = {};
            try {
                for (var _a = __values(group.groupMembers), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var member = _b.value;
                    var value = '';
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
            }
            catch (e_7_1) {
                e_7 = { error: e_7_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_7)
                        throw e_7.error;
                }
            }
            return current;
            var e_7, _c;
        };
        ObsValueAdapter.prototype.mapModelGroup = function (node, value) {
            var current = {};
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    var groupQuestion = _.find(node.question.questions, {
                        key: key
                    });
                    var modelValue = value[key];
                    if (modelValue instanceof Object) ;
                    else if (modelValue !== '') {
                        current[groupQuestion.extras.questionOptions.concept + ':' + modelValue] = modelValue;
                    }
                }
            }
            return current;
        };
        ObsValueAdapter.prototype.processRepeatingGroups = function (node, obsPayload) {
            var initialValues = [];
            if (node.node.initialValue) {
                try {
                    for (var _a = __values(node.node.initialValue), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var group = _b.value;
                        initialValues.push({
                            uuid: group.uuid,
                            value: this.mapInitialGroup(group)
                        });
                    }
                }
                catch (e_8_1) {
                    e_8 = { error: e_8_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_8)
                            throw e_8.error;
                    }
                }
            }
            var repeatingModel = [];
            try {
                for (var _d = __values(node.node.control.value), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var value = _e.value;
                    repeatingModel.push({ value: this.mapModelGroup(node, value) });
                }
            }
            catch (e_9_1) {
                e_9 = { error: e_9_1 };
            }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return))
                        _f.call(_d);
                }
                finally {
                    if (e_9)
                        throw e_9.error;
                }
            }
            var deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
            var newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
            var groupConcept = node.question.extras.questionOptions.concept;
            var newObsPayload = [];
            if (deleted.length > 0) {
                var deletedObs = this.createGroupDeletedObs(deleted);
                try {
                    for (var deletedObs_1 = __values(deletedObs), deletedObs_1_1 = deletedObs_1.next(); !deletedObs_1_1.done; deletedObs_1_1 = deletedObs_1.next()) {
                        var d = deletedObs_1_1.value;
                        obsPayload.push(d);
                    }
                }
                catch (e_10_1) {
                    e_10 = { error: e_10_1 };
                }
                finally {
                    try {
                        if (deletedObs_1_1 && !deletedObs_1_1.done && (_g = deletedObs_1.return))
                            _g.call(deletedObs_1);
                    }
                    finally {
                        if (e_10)
                            throw e_10.error;
                    }
                }
                if (newObs.length > 0) {
                    newObsPayload = this.createGroupNewObs(newObs, groupConcept);
                }
            }
            else {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
            if (newObsPayload.length > 0) {
                try {
                    for (var newObsPayload_1 = __values(newObsPayload), newObsPayload_1_1 = newObsPayload_1.next(); !newObsPayload_1_1.done; newObsPayload_1_1 = newObsPayload_1.next()) {
                        var p = newObsPayload_1_1.value;
                        obsPayload.push(p);
                    }
                }
                catch (e_11_1) {
                    e_11 = { error: e_11_1 };
                }
                finally {
                    try {
                        if (newObsPayload_1_1 && !newObsPayload_1_1.done && (_h = newObsPayload_1.return))
                            _h.call(newObsPayload_1);
                    }
                    finally {
                        if (e_11)
                            throw e_11.error;
                    }
                }
            }
            var e_8, _c, e_9, _f, e_10, _g, e_11, _h;
        };
        ObsValueAdapter.prototype.leftOuterJoinArrays = function (first, second) {
            var unique = first.filter(function (obj) {
                return !second.some(function (obj2) {
                    return _.isEqual(obj.value, obj2.value);
                });
            });
            return unique;
        };
        ObsValueAdapter.prototype.createGroupNewObs = function (payload, groupConcept) {
            var newPayload = [];
            try {
                for (var payload_1 = __values(payload), payload_1_1 = payload_1.next(); !payload_1_1.done; payload_1_1 = payload_1.next()) {
                    var obs = payload_1_1.value;
                    var groupPayload = [];
                    /* tslint:disable */
                    for (var key in obs.value) {
                        var concept = key.split(':')[0];
                        var value = key.split(':')[1];
                        groupPayload.push({ concept: concept, value: value });
                    }
                    newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
                    /* tslint:enable */
                }
            }
            catch (e_12_1) {
                e_12 = { error: e_12_1 };
            }
            finally {
                try {
                    if (payload_1_1 && !payload_1_1.done && (_a = payload_1.return))
                        _a.call(payload_1);
                }
                finally {
                    if (e_12)
                        throw e_12.error;
                }
            }
            return newPayload;
            var e_12, _a;
        };
        ObsValueAdapter.prototype.createGroupDeletedObs = function (payload) {
            var deletedObs = [];
            try {
                for (var payload_2 = __values(payload), payload_2_1 = payload_2.next(); !payload_2_1.done; payload_2_1 = payload_2.next()) {
                    var d = payload_2_1.value;
                    deletedObs.push({ uuid: d.uuid, voided: true });
                }
            }
            catch (e_13_1) {
                e_13 = { error: e_13_1 };
            }
            finally {
                try {
                    if (payload_2_1 && !payload_2_1.done && (_a = payload_2.return))
                        _a.call(payload_2);
                }
                finally {
                    if (e_13)
                        throw e_13.error;
                }
            }
            return deletedObs;
            var e_13, _a;
        };
        ObsValueAdapter.prototype.getExactTime = function (datetime) {
            return datetime.substring(0, 19).replace('T', ' ');
        };
        ObsValueAdapter.prototype.processObs = function (obs, obsPayload) {
            if (obs.control && obs.question.extras) {
                var obsValue = {
                    concept: obs.question.extras.questionOptions.concept,
                    value: obs.question.extras.questionOptions.rendering === 'date' &&
                        !this.isEmpty(obs.control.value)
                        ? this.getExactTime(obs.control.value)
                        : obs.control.value
                };
                if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                    obs.question.extras.questionOptions.rendering === 'checkbox' ||
                    obs.question.extras.questionOptions.rendering === 'multi-select') {
                    var multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                    if (obs.initialValue) {
                        var mappedInitial = obs.initialValue.map(function (a) {
                            return {
                                uuid: a.uuid,
                                value: { concept: a.concept.uuid, value: a.value.uuid }
                            };
                        });
                        var mappedCurrent = multis.map(function (a) {
                            return { value: a };
                        });
                        var deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                        var newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
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
        };
        ObsValueAdapter.prototype.processComplexObs = function (node, obsPayload) {
            var valueField;
            var dateField;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o].question.extras.questionOptions
                    .obsField === 'value') {
                    valueField = node.children[o];
                }
                if (node.children[o].question.extras.questionOptions
                    .obsField === 'obsDatetime') {
                    dateField = node.children[o];
                }
            }
            if (valueField) {
                // process obs as usual
                this.processObs(valueField, obsPayload);
                // obtain the last inserted obs and set the obsDatetime
                var createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
                if (createdPayload &&
                    ((createdPayload.concept &&
                        createdPayload.concept ===
                            node.question.extras.questionOptions.concept) ||
                        (valueField.initialValue &&
                            createdPayload.uuid === valueField.initialValue.obsUuid))) {
                    if (dateField.initialValue &&
                        dateField.control.value !== dateField.initialValue.value) {
                        createdPayload.obsDatetime = dateField.control.value;
                    }
                }
            }
        };
        ObsValueAdapter.prototype.processDeletedMultiSelectObs = function (values, obsPayload) {
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    obsPayload.push({ uuid: value.uuid, voided: true });
                }
            }
            catch (e_14_1) {
                e_14 = { error: e_14_1 };
            }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return))
                        _a.call(values_1);
                }
                finally {
                    if (e_14)
                        throw e_14.error;
                }
            }
            var e_14, _a;
        };
        ObsValueAdapter.prototype.processNewMultiSelectObs = function (values, obsPayload) {
            try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                    var multi = values_2_1.value;
                    if (multi.value instanceof Object) {
                        obsPayload.push(multi.value);
                    }
                    else {
                        obsPayload.push(multi);
                    }
                }
            }
            catch (e_15_1) {
                e_15 = { error: e_15_1 };
            }
            finally {
                try {
                    if (values_2_1 && !values_2_1.done && (_a = values_2.return))
                        _a.call(values_2);
                }
                finally {
                    if (e_15)
                        throw e_15.error;
                }
            }
            var e_15, _a;
        };
        ObsValueAdapter.prototype.updateOrVoidObs = function (obsValue, initialValue, obsPayload) {
            if (this.isEmpty(obsValue.value) && initialValue.value) {
                obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
            }
            else if (!this.isEmpty(obsValue.value) && initialValue.value) {
                obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
            }
        };
        ObsValueAdapter.prototype.isEmpty = function (value) {
            if (value === '' ||
                value === null ||
                value === undefined) {
                return true;
            }
            return false;
        };
        ObsValueAdapter.prototype.traverse = function (o, type) {
            var questions = [];
            if (o.children) {
                if (o.children instanceof Array) {
                    var returned = this.repeatingGroup(o.children);
                    return returned;
                }
                if (o.children instanceof Object) {
                    for (var key in o.children) {
                        if (o.children.hasOwnProperty(key)) {
                            switch (o.children[key].question.renderingType) {
                                case 'page':
                                    var page = this.traverse(o.children[key]);
                                    questions.push({
                                        page: page,
                                        label: o.children[key].question.label
                                    });
                                    break;
                                case 'section':
                                    var section = this.traverse(o.children[key]);
                                    questions.push({
                                        section: section,
                                        node: o.children[key],
                                        label: o.children[key].question.label
                                    });
                                    break;
                                case 'group':
                                    var qs = this.traverse(o.children[key]);
                                    questions.push({
                                        node: o.children[key],
                                        question: o.children[key].question,
                                        groupMembers: qs
                                    });
                                    break;
                                case 'repeating':
                                    var rep = this.repeatingGroup(o.children[key].children);
                                    questions.push({
                                        node: o.children[key],
                                        question: o.children[key].question,
                                        groupMembers: rep
                                    });
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
        };
        ObsValueAdapter.prototype.processMultiSelect = function (concept, values) {
            var multiSelectObs = [];
            if (values && values !== null) {
                try {
                    for (var values_3 = __values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                        var value = values_3_1.value;
                        var obs = {
                            concept: concept,
                            value: value
                        };
                        multiSelectObs.push(obs);
                    }
                }
                catch (e_16_1) {
                    e_16 = { error: e_16_1 };
                }
                finally {
                    try {
                        if (values_3_1 && !values_3_1.done && (_a = values_3.return))
                            _a.call(values_3);
                    }
                    finally {
                        if (e_16)
                            throw e_16.error;
                    }
                }
            }
            return multiSelectObs;
            var e_16, _a;
        };
        ObsValueAdapter.prototype.isObs = function (node) {
            return (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs');
        };
        ObsValueAdapter.prototype.getObsPayload = function (nodes) {
            var obsPayload = [];
            try {
                for (var nodes_3 = __values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                    var node = nodes_3_1.value;
                    if (this.isObs(node)) {
                        if ((node.groupMembers,
                            node.question.extras.questionOptions.rendering === 'group')) {
                            this.processGroup(node, obsPayload);
                        }
                        else if ((node.groupMembers,
                            node.question.extras.questionOptions.rendering === 'repeating')) {
                            this.processRepeatingGroups(node, obsPayload);
                        }
                        else if (node instanceof GroupNode &&
                            node.question.extras.type === 'complex-obs') {
                            this.processComplexObs(node, obsPayload);
                        }
                        else {
                            this.processObs(node, obsPayload);
                        }
                    }
                }
            }
            catch (e_17_1) {
                e_17 = { error: e_17_1 };
            }
            finally {
                try {
                    if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return))
                        _a.call(nodes_3);
                }
                finally {
                    if (e_17)
                        throw e_17.error;
                }
            }
            return obsPayload;
            var e_17, _a;
        };
        ObsValueAdapter.decorators = [
            { type: i0.Injectable },
        ];
        ObsValueAdapter.ctorParameters = function () {
            return [
                { type: ObsAdapterHelper }
            ];
        };
        return ObsValueAdapter;
    }());

    var OrderValueAdapter = (function () {
        function OrderValueAdapter() {
            this.formOrderNodes = [];
            this.provider = '';
        }
        OrderValueAdapter.prototype.generateFormPayload = function (form) {
            this.formOrderNodes = [];
            this._setOrderProvider(form);
            this._findTestOrderQuestionNodes(form.rootNode);
            return this._createOrdersPayload(this.formOrderNodes, form);
        };
        OrderValueAdapter.prototype.populateForm = function (form, payload) {
            form.existingOrders = payload;
            this.formOrderNodes = [];
            this._findTestOrderQuestionNodes(form.rootNode);
            var existingOrders = this._getExistingOrders(form);
            this._setOrderValues(this.formOrderNodes, existingOrders);
        };
        OrderValueAdapter.prototype._setOrderProvider = function (form) {
            if (form.valueProcessingInfo.providerUuid) {
                this.provider = form.valueProcessingInfo.providerUuid;
            }
        };
        OrderValueAdapter.prototype._createOrdersPayload = function (orderNodes, form) {
            var payload = [];
            var selectedOrders = [];
            var deletedOrders = [];
            var existingOrders = this._getExistingOrders(form);
            var _loop_1 = function (orderNode) {
                var orderNodeValues = orderNode.control.value;
                var orders = [];
                if (existingOrders) {
                    existingOrders.map(function (obj) {
                        orders[obj.concept] = obj.concept;
                    });
                }
                for (var order in orderNodeValues) {
                    if (orderNodeValues.hasOwnProperty(order)) {
                        var orderValue = orderNodeValues[order][orderNode.question.key];
                        var payloadOrder = this_1._createPayloadOrder(orderValue, orderNode.question.extras);
                        if (orders[orderValue] !== orderValue &&
                            payloadOrder.concept !== '') {
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
            };
            var this_1 = this;
            try {
                for (var orderNodes_1 = __values(orderNodes), orderNodes_1_1 = orderNodes_1.next(); !orderNodes_1_1.done; orderNodes_1_1 = orderNodes_1.next()) {
                    var orderNode = orderNodes_1_1.value;
                    _loop_1(orderNode);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (orderNodes_1_1 && !orderNodes_1_1.done && (_a = orderNodes_1.return))
                        _a.call(orderNodes_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
            return this._addDeletedOrdersToPayload(deletedOrders, payload);
            var e_1, _a;
        };
        OrderValueAdapter.prototype._getExistingOrders = function (form) {
            if (form.existingOrders && form.existingOrders.orders) {
                var existingOrders = form.existingOrders.orders.map(function (o) {
                    return {
                        concept: o.concept.uuid,
                        orderNumber: o.orderNumber,
                        orderUuid: o.uuid,
                        voided: o.voided,
                        dateVoided: o.auditInfo.dateVoided
                    };
                });
                return (existingOrders = _.filter(existingOrders, function (order) {
                    if (order.voided === true || order.dateVoided) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }));
            }
            else {
                return;
            }
        };
        OrderValueAdapter.prototype._setOrderValues = function (node, existingOrders) {
            this._findTestOrderQuestionNodes(node);
            var orderNodes = this.formOrderNodes;
            try {
                for (var orderNodes_2 = __values(orderNodes), orderNodes_2_1 = orderNodes_2.next(); !orderNodes_2_1.done; orderNodes_2_1 = orderNodes_2.next()) {
                    var orderNode = orderNodes_2_1.value;
                    this._setOrderNodeValues(orderNode, existingOrders);
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (orderNodes_2_1 && !orderNodes_2_1.done && (_a = orderNodes_2.return))
                        _a.call(orderNodes_2);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            var e_2, _a;
        };
        OrderValueAdapter.prototype._addDeletedOrdersToPayload = function (deletedOrders, payload) {
            for (var order in deletedOrders) {
                if (deletedOrders.hasOwnProperty(order)) {
                    payload.push({ uuid: deletedOrders[order], voided: true });
                }
            }
            return payload;
        };
        OrderValueAdapter.prototype._createPayloadOrder = function (orderConcept, quesitonExtras) {
            var order = {
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
        };
        OrderValueAdapter.prototype._getDeletedOrders = function (selectedOrders, existingOrders) {
            var deleteOrders = [];
            if (selectedOrders) {
                for (var order in existingOrders) {
                    if (existingOrders.hasOwnProperty(order)) {
                        var existingOrderConcept = existingOrders[order].concept;
                        var selectedOrder = selectedOrders[existingOrderConcept];
                        if (selectedOrder !== existingOrderConcept) {
                            deleteOrders.push(existingOrders[order].orderUuid);
                        }
                    }
                }
            }
            // console.log('Deleted Orders ', deleteOrders);
            return deleteOrders;
        };
        OrderValueAdapter.prototype._setOrderNodeValues = function (node, orders) {
            var index = 0;
            node['initialValue'] = orders;
            try {
                for (var orders_1 = __values(orders), orders_1_1 = orders_1.next(); !orders_1_1.done; orders_1_1 = orders_1.next()) {
                    var order = orders_1_1.value;
                    node.createChildNode();
                    var value = {};
                    value[node.question.key] = order.concept;
                    var childNode = node.children[index];
                    childNode.control.setValue(value);
                    childNode['initialValue'] = value;
                    childNode['orderNumber'] = order.orderNumber;
                    // console.log('Set Value', node.children[index].control.value, node, childNode);
                    index++;
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (orders_1_1 && !orders_1_1.done && (_a = orders_1.return))
                        _a.call(orders_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            var e_3, _a;
        };
        OrderValueAdapter.prototype._findTestOrderQuestionNodes = function (formNode) {
            if (formNode.children) {
                if (formNode.children instanceof Object) {
                    for (var key in formNode.children) {
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
                                        for (var node in formNode.children) {
                                            var question = formNode.children[node].question;
                                            if (question.extras &&
                                                question.extras.type === 'testOrder') {
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
        };
        OrderValueAdapter.decorators = [
            { type: i0.Injectable },
        ];
        return OrderValueAdapter;
    }());

    var moment$7 = moment_;
    var EncounterAdapter = (function () {
        function EncounterAdapter(ordersAdapter, obsAdapter) {
            this.ordersAdapter = ordersAdapter;
            this.obsAdapter = obsAdapter;
        }
        EncounterAdapter.prototype.populateForm = function (form, payload) {
            this.populateNode(form.rootNode, payload);
            if (Array.isArray(payload.orders)) {
                this.ordersAdapter.populateForm(form, payload);
            }
            if (Array.isArray(payload.obs)) {
                this.obsAdapter.populateForm(form, payload.obs);
            }
        };
        EncounterAdapter.prototype.populateNode = function (rootNode, payload) {
            if (payload === undefined || payload === null) {
                throw new Error('Expected payload');
            }
            var nodes = this.getEncounterNodes(rootNode);
            nodes.forEach(function (node) {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        if (payload['encounterDatetime']) {
                            // console.log('date', payload['encounterDatetime']);
                            node.control.setValue(moment$7(payload['encounterDatetime']).toDate());
                            node.initialValue = moment$7(payload['encounterDatetime']).toDate();
                        }
                        break;
                    case 'encounterProvider':
                        if (Array.isArray(payload['encounterProviders']) &&
                            payload['encounterProviders'].length > 0) {
                            var firstProvider_1 = payload['encounterProviders'][0].provider;
                            if (firstProvider_1 && firstProvider_1.uuid) {
                                // Very weird work around for an issue with setting the value
                                node.control.setValue(firstProvider_1.uuid);
                                setTimeout(function () {
                                    node.control.setValue(firstProvider_1.uuid);
                                });
                                node.initialValue = firstProvider_1.uuid;
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
        };
        EncounterAdapter.prototype.generateFormPayload = function (form) {
            var payload = this.generateNodePayload(form.rootNode);
            this.setNonFilledPayloadMembers(form, payload);
            payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
            payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
            return payload;
        };
        EncounterAdapter.prototype.generateNodePayload = function (rootNode) {
            var nodes = this.getEncounterNodes(rootNode);
            var payload = {};
            nodes.forEach(function (node) {
                if (node.control.value !== null &&
                    node.control.value !== undefined &&
                    node.control.value !== '') {
                    switch (node.question.extras.type) {
                        case 'encounterDatetime':
                            var dateValue = moment$7(node.control.value).utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                            payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                            break;
                        case 'encounterProvider':
                            if (node.control.value && node.control.value !== '') {
                                var providers = [];
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
        };
        EncounterAdapter.prototype.getEncounterNodes = function (rootNode) {
            var results = [];
            this._getEncounterNodes(rootNode, results);
            return results;
        };
        EncounterAdapter.prototype.setNonFilledPayloadMembers = function (form, payload) {
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
        };
        EncounterAdapter.prototype.setPayloadPatientUuid = function (payload, patientUuid) {
            payload['patient'] = patientUuid;
        };
        EncounterAdapter.prototype.setPayloadVisitUuid = function (payload, visitUuid) {
            payload['visit'] = visitUuid;
        };
        EncounterAdapter.prototype.setPayloadEncounterTypeUuid = function (payload, encounterTypeUuid) {
            payload['encounterType'] = encounterTypeUuid;
        };
        EncounterAdapter.prototype.setPayloadFormUuid = function (payload, formUuid) {
            payload['form'] = formUuid;
        };
        EncounterAdapter.prototype.setPayloadEncounterUuid = function (payload, encounterUuid) {
            payload['uuid'] = encounterUuid;
        };
        EncounterAdapter.prototype._getEncounterNodes = function (rootNode, array) {
            var _this = this;
            if (this._isEncounterNode(rootNode)) {
                array.push(rootNode);
            }
            if (rootNode instanceof GroupNode) {
                var node = rootNode;
                // tslint:disable-next-line:forin
                for (var o in node.children) {
                    if (node.children[o] instanceof NodeBase) {
                        this._getEncounterNodes(node.children[o], array);
                    }
                }
            }
            if (rootNode instanceof ArrayNode) {
                var node = rootNode;
                node.children.forEach(function (child) {
                    _this._getEncounterNodes(child, array);
                });
            }
        };
        EncounterAdapter.prototype._isEncounterNode = function (node) {
            if (node.question.extras &&
                (node.question.extras.type === 'encounterDatetime' ||
                    node.question.extras.type === 'encounterProvider' ||
                    node.question.extras.type === 'encounterLocation')) {
                return true;
            }
            return false;
        };
        EncounterAdapter.decorators = [
            { type: i0.Injectable },
        ];
        EncounterAdapter.ctorParameters = function () {
            return [
                { type: OrderValueAdapter },
                { type: ObsValueAdapter }
            ];
        };
        return EncounterAdapter;
    }());

    var PersonAttribuAdapter = (function () {
        function PersonAttribuAdapter() {
        }
        PersonAttribuAdapter.prototype.generateFormPayload = function (form) {
            return this.generateNodePayload(form.rootNode);
        };
        PersonAttribuAdapter.prototype.generateNodePayload = function (rootNode) {
            var nodes = this.getPersonAttributeNodes(rootNode);
            var payload = [];
            nodes.forEach(function (node) {
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
        };
        PersonAttribuAdapter.prototype.populateForm = function (form, payload) {
            this.populateNode(form.rootNode, payload);
        };
        PersonAttribuAdapter.prototype.populateNode = function (rootNode, payload) {
            if (!Array.isArray(payload)) {
                throw new Error('Expected an array of attributes');
            }
            var nodes = this.getPersonAttributeNodes(rootNode);
            nodes.forEach(function (node) {
                payload.forEach(function (element) {
                    if (element.attributeType.uuid ===
                        node.question.extras.questionOptions.attributeType) {
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
        };
        PersonAttribuAdapter.prototype.getPersonAttributeNodes = function (rootNode) {
            var results = [];
            this._getPersonAttributesNodes(rootNode, results);
            return results;
        };
        PersonAttribuAdapter.prototype._getPersonAttributesNodes = function (rootNode, array) {
            var _this = this;
            if (rootNode.question.extras &&
                (rootNode.question.extras.type === 'personAttribute' ||
                    rootNode.question.extras.type === 'amrsLocations' ||
                    rootNode.question.extras.type === 'nonAmrsLocations' ||
                    rootNode.question.extras.type === 'siblingLocations')) {
                array.push(rootNode);
            }
            if (rootNode instanceof GroupNode) {
                var node = rootNode;
                // tslint:disable-next-line:forin
                for (var o in node.children) {
                    if (node.children[o] instanceof NodeBase) {
                        this._getPersonAttributesNodes(node.children[o], array);
                    }
                }
            }
            if (rootNode instanceof ArrayNode) {
                var node = rootNode;
                node.children.forEach(function (child) {
                    _this._getPersonAttributesNodes(child, array);
                });
            }
        };
        PersonAttribuAdapter.decorators = [
            { type: i0.Injectable },
        ];
        PersonAttribuAdapter.ctorParameters = function () { return []; };
        return PersonAttribuAdapter;
    }());

    var RemoteSelectComponent = (function () {
        function RemoteSelectComponent(renderer) {
            this.renderer = renderer;
            // @Input() dataSource: DataSource;
            this.placeholder = 'Search...';
            this.items = [];
            this.value = [];
            this.loading = false;
            this.searchText = '';
            this.notFoundMsg = 'match no found';
            this.done = new i0.EventEmitter();
            this.characters = [];
            // the method set in registerOnChange, it is just
            // a placeholder for a method that takes one parameter,
            // we use it to emit changes back to the form
            this.propagateChange = function (change) { };
        }
        Object.defineProperty(RemoteSelectComponent.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
                if (this._dataSource && this._dataSource.dataFromSourceChanged) {
                    this.subscribeToDataSourceDataChanges();
                }
            },
            enumerable: true,
            configurable: true
        });
        RemoteSelectComponent.prototype.ngOnInit = function () { };
        RemoteSelectComponent.prototype.subscribeToDataSourceDataChanges = function () {
            var _this = this;
            this._dataSource.dataFromSourceChanged.subscribe(function (results) {
                if (results.length > 0) {
                    _this.items = results;
                    _this.notFoundMsg = '';
                    // console.log('updating items', results, this.selectC.value);
                    _this.restoreSelectedValue(_this.selectC.value, results);
                }
                else {
                    _this.notFoundMsg = 'Not found';
                    _this.items = [];
                }
            });
        };
        RemoteSelectComponent.prototype.typed = function (value) {
            this.search(value);
        };
        RemoteSelectComponent.prototype.search = function (value) {
            var _this = this;
            if (this.dataSource) {
                this.searchText = value;
                this.notFoundMsg = 'Loading.........';
                this.dataSource.searchOptions(value).subscribe(function (result) {
                    if (result.length > 0) {
                        var existing = _.map(_this.value, _.clone);
                        var concat = existing.concat(result);
                        _this.items = _.uniqBy(concat, 'value');
                    }
                    _this.notFoundMsg = '';
                }, function (error) {
                    _this.notFoundMsg = 'Errored';
                });
            }
        };
        RemoteSelectComponent.prototype.restoreSelectedValue = function (value, results) {
            var _this = this;
            var found = false;
            _.each(results, function (item) {
                if (item.value === value) {
                    setTimeout(function () {
                        _this.selectC.select(value);
                        _this.selectC.value = value;
                    });
                    found = true;
                }
            });
            if (!found) {
                // console.log('not found after loading items', value, results);
                setTimeout(function () {
                    _this.selectC.select('');
                    _this.selectC.value = '';
                });
            }
        };
        RemoteSelectComponent.prototype.canSearch = function (searchText) {
            return ((searchText.length - this.searchText.length >= 2 ||
                (searchText.length - this.searchText.length <= 2 &&
                    searchText !== '')) &&
                this.loading === false);
        };
        // this is the initial value set to the component
        RemoteSelectComponent.prototype.writeValue = function (value) {
            var _this = this;
            if (value && value !== '') {
                if (this.dataSource) {
                    this.loading = true;
                    this.dataSource.resolveSelectedValue(value).subscribe(function (result) {
                        _this.items = [result];
                        setTimeout(function () {
                            _this.selectC.select(result.value);
                            _this.selectC.value = result.value;
                        });
                        _this.loading = false;
                    }, function (error) {
                        _this.loading = false;
                    });
                }
            }
        };
        // registers 'fn' that will be fired when changes are made
        // this is how we emit the changes back to the form
        RemoteSelectComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        // not used, used for touch input
        RemoteSelectComponent.prototype.registerOnTouched = function () { };
        // change events from the textarea
        RemoteSelectComponent.prototype.onChange = function (event) {
            this.propagateChange(event.id);
            // .....
            // update the form
            // this.propagateChange(this.data);
        };
        RemoteSelectComponent.prototype.removed = function (event) {
            console.log('Removed');
            this.propagateChange('');
        };
        RemoteSelectComponent.prototype.selected = function (event) {
            this.propagateChange(event.value);
        };
        RemoteSelectComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'remote-select',
                        template: "<div>\n  <ng-select\n    [id]=\"componentID\"\n    [noFilter]=\"0\"\n    (selected)=\"selected($event)\"\n    (deselected)=\"removed($event)\"\n    [options]=\"items\"\n    [allowClear]=\"true\"\n    [placeholder]=\"placeholder\"\n    [notFoundMsg]=\"notFoundMsg\"\n    (typed)=\"typed($event)\"\n    tabindex=\"0\"\n  >\n  </ng-select>\n  <div *ngIf=\"loading\">resolving....</div>\n</div>\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return RemoteSelectComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        RemoteSelectComponent.ctorParameters = function () {
            return [
                { type: i0.Renderer2 }
            ];
        };
        RemoteSelectComponent.propDecorators = {
            placeholder: [{ type: i0.Input }],
            componentID: [{ type: i0.Input }],
            done: [{ type: i0.Output }],
            selectC: [{ type: i0.ViewChild, args: [SelectComponent,] }],
            dataSource: [{ type: i0.Input }]
        };
        return RemoteSelectComponent;
    }());

    var RemoteSelectModule = (function () {
        function RemoteSelectModule() {
        }
        RemoteSelectModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, SelectModule, forms.FormsModule],
                        exports: [RemoteSelectComponent],
                        declarations: [RemoteSelectComponent],
                        providers: []
                    },] },
        ];
        return RemoteSelectModule;
    }());

    var moment$8 = moment_;
    var AppointmentsOverviewComponent = (function () {
        function AppointmentsOverviewComponent() {
            this.showAppointments = false;
            this.loadingAppointments = false;
            this.errorLoadingAppointments = false;
            this.appointmentsLoaded = false;
            this.appointments = [];
            this.today = '';
        }
        AppointmentsOverviewComponent.prototype.ngOnInit = function () { };
        AppointmentsOverviewComponent.prototype.ngOnChanges = function () {
            var _this = this;
            this.node.control.valueChanges.subscribe(function (v) {
                _this.resetProperties();
                var node = _this.node;
                if (node.question.extras.questionOptions.concept &&
                    (node.question.extras.questionOptions.concept ===
                        'a8a666ba-1350-11df-a1f1-0026b9348838' ||
                        node.question.extras.questionOptions.concept ===
                            'a89d2398-1350-11df-a1f1-0026b9348838')) {
                    // console.log('what change is here', this.showAppointments);
                    if (!_this.showAppointments) {
                        _this.loadingAppointments = true;
                        _this.showAppointments = true;
                        var dataSource = void 0;
                        if (node.form && node.form.dataSourcesContainer.dataSources) {
                            dataSource =
                                node.form.dataSourcesContainer.dataSources
                                    .monthlyScheduleResourceService;
                        }
                        var locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                        if (dataSource && locationUuid) {
                            var startDate = moment$8(v)
                                .startOf('week')
                                .add(1, 'day')
                                .format('YYYY-MM-DD');
                            var endDate = moment$8(v)
                                .endOf('week')
                                .subtract(1, 'day')
                                .format('YYYY-MM-DD');
                            _this.today = moment$8(v).format('DD-MM-YYYY');
                            dataSource
                                .getMonthlySchedule({
                                startDate: startDate,
                                endDate: endDate,
                                limit: 5,
                                locationUuids: locationUuid,
                                department: 'HIV',
                                groupBy: 'groupByPerson,groupByAttendedDate,groupByRtcDate'
                            })
                                .subscribe(function (data) {
                                var _data = [];
                                var weeklyMap = new Map();
                                // create the weeks schedule with zero appointments
                                for (var i = 0; i < 5; i++) {
                                    var scheduleDate = moment$8(v)
                                        .startOf('week')
                                        .add(i, 'day')
                                        .format('YYYY-MM-DD');
                                    var scheduledObj = {
                                        date: scheduleDate,
                                        count: {
                                            scheduled: 0
                                        }
                                    };
                                    weeklyMap.set(scheduleDate, scheduledObj);
                                }
                                var results = data.results || [];
                                // replace placeholder schedules with actual schedules in the map obj
                                results.forEach(function (scheduled) {
                                    weeklyMap.set(scheduled.date, scheduled);
                                });
                                // retrieve scheduled obj from map to data array
                                weeklyMap.forEach(function (value, key) {
                                    var dayCount = {
                                        date: key,
                                        count: value.count.scheduled || 0
                                    };
                                    _data.push(dayCount);
                                });
                                _this.appointmentsLoaded = true;
                                _this.loadingAppointments = false;
                                _this.appointments = _data;
                            }, function (error) {
                                _this.loadingAppointments = false;
                                _this.errorLoadingAppointments = true;
                                _this.showAppointments = false;
                                console.error(error);
                            });
                        }
                        else {
                            _this.showAppointments = false;
                            _this.errorLoadingAppointments = true;
                        }
                    }
                }
            });
        };
        AppointmentsOverviewComponent.prototype.resetProperties = function () {
            this.loadingAppointments = false;
            this.appointmentsLoaded = false;
            this.errorLoadingAppointments = false;
            this.showAppointments = false;
            this.appointments = [];
            this.today = '';
        };
        AppointmentsOverviewComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'appointments-overview',
                        template: "<div *ngIf=\"showAppointments\" class=\"appointments\">\n  <p *ngIf=\"loadingAppointments\">\n    <span *ngIf=\"!appointmentsLoaded && errorLoadingAppointments\"\n      >Error checking appointments</span\n    >\n    <span *ngIf=\"loadingAppointments\"\n      ><span class=\"fa fa-spinner fa-spin\"></span>Checking appointments...</span\n    >\n  </p>\n  <div *ngIf=\"appointmentsLoaded && !errorLoadingAppointments\">\n    <table\n      *ngIf=\"appointments.length > 0\"\n      class=\"table table-stripped table-bordered\"\n    >\n      <thead>\n        <tr>\n          <th\n            *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{ active: appointment.date === today }\"\n          >\n            <span>{{ appointment.date }}</span>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td\n            *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{ active: appointment.date === today }\"\n          >\n            <span\n              ><strong\n                ><em>{{ appointment.count }}</em></strong\n              ></span\n            >\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n",
                        styles: [".appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}"]
                    },] },
        ];
        AppointmentsOverviewComponent.ctorParameters = function () { return []; };
        AppointmentsOverviewComponent.propDecorators = {
            node: [{ type: i0.Input }]
        };
        return AppointmentsOverviewComponent;
    }());

    var EncounterViewerService = (function () {
        function EncounterViewerService() {
        }
        EncounterViewerService.prototype.resolveSelectedValue = function (value) {
            return;
        };
        EncounterViewerService.prototype.searchOptions = function (searchText) {
            return;
        };
        EncounterViewerService.prototype.fileUpload = function (data) {
            return;
        };
        EncounterViewerService.prototype.fetchFile = function (url) {
            return;
        };
        EncounterViewerService.prototype.resolveSelectedValueFromSchema = function (answerUuid, schema) {
            var _this = this;
            var label;
            if (schema.pages) {
                _.forEach(schema.pages, function (page) {
                    var l = _this.resolveSelectedValueFromSchema(answerUuid, page);
                    if (l) {
                        label = l;
                    }
                });
            }
            if (schema.sections) {
                _.forEach(schema.sections, function (section) {
                    var l = _this.resolveSelectedValueFromSchema(answerUuid, section);
                    if (l) {
                        label = l;
                    }
                });
            }
            if (schema.questions) {
                _.forEach(schema.questions, function (question) {
                    if (question.questions) {
                        var l = _this.resolveSelectedValueFromSchema(answerUuid, question);
                        if (l) {
                            label = l;
                        }
                    }
                    else {
                        if (question.questionOptions.answers) {
                            _.forEach(question.questionOptions.answers, function (answer) {
                                if (answer.concept === answerUuid) {
                                    label = answer.label;
                                }
                            });
                        }
                        else if (question.questionOptions.selectableOrders) {
                            _.forEach(question.questionOptions.selectableOrders, function (order) {
                                if (order.concept === answerUuid) {
                                    label = order.label;
                                }
                            });
                        }
                    }
                });
            }
            return label;
        };
        EncounterViewerService.prototype.hasAnswer = function (node) {
            var answered = false;
            if (node.initialValue) {
                answered = true;
            }
            return answered;
        };
        EncounterViewerService.prototype.questionsAnswered = function (node, answered) {
            var _this = this;
            var $answered = answered || [];
            if (node.question.renderingType === 'page') {
                _.forEach(node.children, function (childNode) {
                    _this.questionsAnswered(childNode, $answered);
                });
            }
            else if (node.question.renderingType === 'section') {
                _.forEach(node.children, function (childNode) {
                    if (childNode.question.renderingType === 'group') {
                        _.forEach(childNode.children, function (child) {
                            var ans = _this.questionsAnswered(child, $answered);
                            if (ans) {
                                $answered.push(ans);
                            }
                        });
                    }
                    else if (_this.hasAnswer(childNode)) {
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
        };
        EncounterViewerService.prototype.isDate = function (val) {
            if (Date.parse(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        EncounterViewerService.prototype.convertTime = function (unixTimestamp) {
            var a = new Date(unixTimestamp);
            var months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var suffix = hour < 12 ? 'AM' : 'PM';
            var time;
            if (hour === 0 && min === 0) {
                time = date + ' ' + month + ' ' + year;
            }
            else {
                time =
                    date +
                        ' ' +
                        month +
                        ' ' +
                        year +
                        ' ' +
                        hour +
                        ':' +
                        min +
                        suffix +
                        ' (EAT)';
            }
            return time;
        };
        EncounterViewerService.decorators = [
            { type: i0.Injectable },
        ];
        EncounterViewerService.ctorParameters = function () { return []; };
        return EncounterViewerService;
    }());

    var EncounterViewerComponent = (function () {
        function EncounterViewerComponent(encounterViewerService, dataSources) {
            this.encounterViewerService = encounterViewerService;
            this.dataSources = dataSources;
        }
        Object.defineProperty(EncounterViewerComponent.prototype, "node", {
            set: function (rootNode) {
                this.rootNode = rootNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncounterViewerComponent.prototype, "schema", {
            set: function (schema) {
                this._schema = schema;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncounterViewerComponent.prototype, "encounter", {
            set: function (enc) {
                this.enc = enc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncounterViewerComponent.prototype, "form", {
            set: function (form) {
                this.rootNode = form.rootNode;
                this._schema = form.schema;
                console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
            },
            enumerable: true,
            configurable: true
        });
        EncounterViewerComponent.prototype.getQuestionNodes = function (pages) {
            var merged = [];
            var arrays = [];
            try {
                for (var pages_1 = __values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                    var page = pages_1_1.value;
                    arrays.push(page.page);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return))
                        _a.call(pages_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return merged.concat.apply([], arrays);
            var e_1, _a;
        };
        EncounterViewerComponent.prototype.ngOnInit = function () {
            if (this.rootNode) ;
            if (this.rootNode &&
                this.rootNode.question.extras &&
                this.rootNode.question.renderingType === 'file') {
                this.fileDataSource = this.dataSources.dataSources[this.rootNode.question.dataSource];
            }
            else if (this.rootNode &&
                this.rootNode.question.extras &&
                this.rootNode.question.renderingType === 'remote-select') {
                this.remoteDataSource = this.dataSources.dataSources[this.rootNode.question.dataSource];
            }
            else {
                this.customDataSource = this.encounterViewerService;
            }
        };
        EncounterViewerComponent.prototype.questionsAnswered = function (node) {
            var $answered = this.encounterViewerService.questionsAnswered(node);
            return $answered;
        };
        EncounterViewerComponent.prototype.questionAnswered = function (node) {
            var answered = this.encounterViewerService.hasAnswer(node);
            return answered;
        };
        EncounterViewerComponent.prototype.checkForColon = function (questionLabel) {
            if (questionLabel.indexOf(':') === -1) {
                return true;
            }
            else {
                return false;
            }
        };
        EncounterViewerComponent.prototype.traverse = function (o, type) {
            var questions = [];
            if (o.children) {
                if (o.children instanceof Array) {
                    var returned = this.repeatingGroup(o.children);
                    return returned;
                }
                if (o.children instanceof Object) {
                    for (var key in o.children) {
                        if (o.children.hasOwnProperty(key)) {
                            switch (o.children[key].question.renderingType) {
                                case 'page':
                                    var page = this.traverse(o.children[key]);
                                    questions.push({ page: page });
                                    break;
                                case 'section':
                                    var section = this.traverse(o.children[key]);
                                    questions.push({ section: section });
                                    break;
                                case 'group':
                                    var qs = this.traverse(o.children[key]);
                                    questions.push({
                                        node: o.children[key],
                                        question: o.children[key].question,
                                        groupMembers: qs
                                    });
                                    break;
                                case 'repeating':
                                    var rep = this.repeatingGroup(o.children[key].children);
                                    questions.push({
                                        node: o.children[key],
                                        question: o.children[key].question,
                                        groupMembers: rep
                                    });
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
        };
        EncounterViewerComponent.prototype.repeatingGroup = function (nodes) {
            var toReturn = [];
            try {
                for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    toReturn.push({
                        question: node.question,
                        groupMembers: this.traverse(node)
                    });
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return))
                        _a.call(nodes_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return toReturn;
            var e_2, _a;
        };
        EncounterViewerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'encounter-viewer',
                        template: "<div class=\"viewer\">\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page' + i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">\n            {{ question.label }}\n          </p>\n          <div class=\"panel-body\">\n            <encounter-viewer\n              [node]=\"rootNode.children[question.key]\"\n              [schema]=\"_schema\"\n              [parentComponent]=\"this\"\n              [parentGroup]=\"rootNode.control\"\n            ></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer\n      *ngFor=\"let question of rootNode.question.questions\"\n      [parentComponent]=\"this\"\n      [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\"\n      [parentGroup]=\"parentGroup\"\n    ></encounter-viewer>\n  </div>\n\n  <div\n    *ngIf=\"\n      rootNode.question.renderingType === 'section' &&\n      questionsAnswered(rootNode)\n    \"\n    class=\"section\"\n  >\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer\n        [node]=\"rootNode.children[question.key]\"\n        [parentComponent]=\"this\"\n        [schema]=\"_schema\"\n        [parentGroup]=\"parentGroup\"\n      ></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left: 10px\">\n    <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n      <div *ngIf=\"rootNode.control.value\">\n        <div class=\"question-answer\">\n          <label\n            *ngIf=\"rootNode.question.label\"\n            [attr.for]=\"rootNode.question.key\"\n            style=\"font-weight: 400\"\n          >\n            {{ rootNode.question.label }}\n          </label>\n          <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n          <div\n            [ngSwitch]=\"rootNode.question.renderingType\"\n            style=\"display: inline-block; font-weight: bold\"\n          >\n            <div *ngSwitchCase=\"'file'\">\n              <file-preview\n                [formControlName]=\"rootNode.question.key\"\n                [id]=\"rootNode.question.key + 'id'\"\n                [dataSource]=\"fileDataSource\"\n              ></file-preview>\n            </div>\n            <div *ngSwitchCase=\"'remote-select'\">\n              <remote-answer\n                [formControlName]=\"rootNode.question.key\"\n                [id]=\"rootNode.question.key + 'id'\"\n                [dataSource]=\"remoteDataSource\"\n              ></remote-answer>\n            </div>\n            <div *ngSwitchDefault style=\"display: inline-block\">\n              <question-control\n                [schema]=\"_schema\"\n                [value]=\"rootNode.control.value\"\n                [dataSource]=\"customDataSource\"\n              ></question-control>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <!--Array Controls-->\n  <div\n    *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\"\n  >\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\"'repeating'\">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{ rootNode.question.label }}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i = index\">\n              <encounter-viewer\n                *ngFor=\"let question of child.question.questions\"\n                [parentComponent]=\"this\"\n                [node]=\"child.children[question.key]\"\n                [parentGroup]=\"child.control\"\n                [schema]=\"_schema\"\n              ></encounter-viewer>\n            </div>\n          </div>\n\n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i = index\">\n              <encounter-viewer\n                *ngFor=\"let question of child.question.questions\"\n                [parentComponent]=\"this\"\n                [node]=\"child.children[question.key]\"\n                [parentGroup]=\"child.control\"\n                [schema]=\"_schema\"\n              ></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\"'group'\">\n        <encounter-viewer\n          *ngFor=\"let question of rootNode.question.questions\"\n          [parentComponent]=\"this\"\n          [node]=\"rootNode.children[question.key]\"\n          [parentGroup]=\"rootNode.control\"\n          [schema]=\"_schema\"\n        ></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\"'field-set'\">\n        <encounter-viewer\n          *ngFor=\"let question of rootNode.question.questions\"\n          [parentComponent]=\"this\"\n          [node]=\"rootNode.children[question.key]\"\n          [parentGroup]=\"rootNode.control\"\n          [schema]=\"_schema\"\n        ></encounter-viewer>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
                    },] },
        ];
        EncounterViewerComponent.ctorParameters = function () {
            return [
                { type: EncounterViewerService },
                { type: DataSources }
            ];
        };
        EncounterViewerComponent.propDecorators = {
            parentGroup: [{ type: i0.Input }],
            parentComponent: [{ type: i0.Input }],
            node: [{ type: i0.Input }],
            schema: [{ type: i0.Input }],
            encounter: [{ type: i0.Input }],
            form: [{ type: i0.Input }]
        };
        return EncounterViewerComponent;
    }());

    var moment$9 = moment_;
    var EncounterPdfViewerService = (function () {
        function EncounterPdfViewerService(encounterViewerService, obsValueAdapter, dataSources) {
            this.encounterViewerService = encounterViewerService;
            this.obsValueAdapter = obsValueAdapter;
            this.dataSources = dataSources;
            this.subscribedAnswers = {
                questions: {
                    stack: []
                },
                answers: []
            };
        }
        EncounterPdfViewerService.prototype.getPages = function (pages, form, remoteSelectsOnly, remoteAns) {
            var content = [];
            var remoteQuestions = [];
            try {
                for (var pages_1 = __values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                    var page = pages_1_1.value;
                    if (remoteSelectsOnly) {
                        remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
                    }
                    else {
                        try {
                            for (var _a = __values(form.rootNode.question.questions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var question = _b.value;
                                if (page.label ===
                                    form.rootNode.children[question.key].question.label &&
                                    this.encounterViewerService.questionsAnswered(form.rootNode.children[question.key])) {
                                    content.push({
                                        style: 'tableExample',
                                        table: {
                                            widths: ['*'],
                                            headerRows: 1,
                                            keepWithHeaderRows: 1,
                                            body: [
                                                [{ text: page.label, style: 'tableHeader' }],
                                                [
                                                    {
                                                        style: 'tableExample',
                                                        table: {
                                                            widths: ['*'],
                                                            body: this.getSections(page.page, form, true, remoteAns)
                                                        },
                                                        layout: 'noBorders',
                                                        margin: [5, 0, 0, 0]
                                                    }
                                                ]
                                            ]
                                        },
                                        layout: {
                                            hLineWidth: function (i, node) {
                                                return i === 0 || i === node.table.body.length ? 0.5 : 0.5;
                                            },
                                            vLineWidth: function (i, node) {
                                                return i === 0 || i === node.table.widths.length ? 0.5 : 0.5;
                                            },
                                            hLineColor: function (i, node) {
                                                return i === 0 || i === node.table.body.length
                                                    ? '#ddd'
                                                    : '#ddd';
                                            },
                                            vLineColor: function (i, node) {
                                                return i === 0 || i === node.table.body.length
                                                    ? '#ddd'
                                                    : '#ddd';
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                    }
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (pages_1_1 && !pages_1_1.done && (_d = pages_1.return))
                        _d.call(pages_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            return remoteSelectsOnly ? remoteQuestions : content;
            var e_2, _d, e_1, _c;
        };
        EncounterPdfViewerService.prototype.getSections = function (sections, form, resolve, remoteAns) {
            var _this = this;
            var content = [];
            var answeredSections = [];
            var questions = [];
            sections.map(function (s) {
                if (_this.encounterViewerService.questionsAnswered(s.node)) {
                    answeredSections.push(s);
                }
            });
            try {
                for (var answeredSections_1 = __values(answeredSections), answeredSections_1_1 = answeredSections_1.next(); !answeredSections_1_1.done; answeredSections_1_1 = answeredSections_1.next()) {
                    var section = answeredSections_1_1.value;
                    questions = questions.concat(this.getRemoteSectionData(section.section));
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (answeredSections_1_1 && !answeredSections_1_1.done && (_a = answeredSections_1.return))
                        _a.call(answeredSections_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
            }
            if (resolve && remoteAns) {
                try {
                    for (var answeredSections_2 = __values(answeredSections), answeredSections_2_1 = answeredSections_2.next(); !answeredSections_2_1.done; answeredSections_2_1 = answeredSections_2.next()) {
                        var section = answeredSections_2_1.value;
                        content.push([
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [{ text: section.label, style: 'tableSubheader' }],
                                        [this.getSectionData(section.section, remoteAns, form)]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]);
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (answeredSections_2_1 && !answeredSections_2_1.done && (_b = answeredSections_2.return))
                            _b.call(answeredSections_2);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
                return content;
            }
            else {
                return questions;
            }
            var e_3, _a, e_4, _b;
        };
        EncounterPdfViewerService.prototype.appendResolvedAnswer = function (resolvedAnswer, questions, node) {
            if (resolvedAnswer) {
                questions.stack.push({
                    text: [
                        "" + (node ? node.question.label : 'Question label') + (node ? (node.question.label.indexOf(':') > 1 ? '' : ':') : '') + " ",
                        { text: "" + resolvedAnswer, bold: true }
                    ],
                    style: 'answers'
                });
            }
        };
        // get remote selects only
        EncounterPdfViewerService.prototype.getRemoteSectionData = function (section) {
            var questions = [];
            this.subscribedAnswers.questions.stack = [];
            try {
                for (var section_1 = __values(section), section_1_1 = section_1.next(); !section_1_1.done; section_1_1 = section_1.next()) {
                    var node = section_1_1.value;
                    if (node.question.renderingType === 'remote-select') {
                        this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                        if (node.control.value !== '') {
                            if (this.remoteDataSource) {
                                questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                            }
                        }
                    }
                }
            }
            catch (e_5_1) {
                e_5 = { error: e_5_1 };
            }
            finally {
                try {
                    if (section_1_1 && !section_1_1.done && (_a = section_1.return))
                        _a.call(section_1);
                }
                finally {
                    if (e_5)
                        throw e_5.error;
                }
            }
            return questions;
            var e_5, _a;
        };
        // merge remote selects
        EncounterPdfViewerService.prototype.getSectionData = function (section, remoteAns, form) {
            var questions = {
                stack: []
            };
            var resolvedAnswer = '';
            var _loop_1 = function (node) {
                switch (node.question.renderingType) {
                    case 'group':
                        if (node.groupMembers) {
                            questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                        }
                        break;
                    case 'field-set':
                        if (node.children) {
                            var groupMembers = [];
                            var result = Object.keys(node.children).map(function (key) { return node.children[key]; });
                            if (result) {
                                groupMembers.push(result);
                                questions.stack.push(this_1.getSectionData(groupMembers[0], remoteAns, form));
                            }
                        }
                        break;
                    case 'repeating':
                        if (node.groupMembers) {
                            questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                        }
                        break;
                    case 'remote-select':
                        this_1.remoteDataSource = this_1.dataSources.dataSources[node.question.dataSource];
                        try {
                            for (var remoteAns_1 = __values(remoteAns), remoteAns_1_1 = remoteAns_1.next(); !remoteAns_1_1.done; remoteAns_1_1 = remoteAns_1.next()) {
                                var ans = remoteAns_1_1.value;
                                if (ans.value === node.control.value) {
                                    this_1.appendResolvedAnswer(ans.label, questions, node);
                                }
                            }
                        }
                        catch (e_6_1) {
                            e_6 = { error: e_6_1 };
                        }
                        finally {
                            try {
                                if (remoteAns_1_1 && !remoteAns_1_1.done && (_a = remoteAns_1.return))
                                    _a.call(remoteAns_1);
                            }
                            finally {
                                if (e_6)
                                    throw e_6.error;
                            }
                        }
                        break;
                    default:
                        var answer = node.control.value;
                        if (answer) {
                            resolvedAnswer = this_1.resolveValue(answer, form);
                            this_1.appendResolvedAnswer(resolvedAnswer, questions, node);
                        }
                }
                var e_6, _a;
            };
            var this_1 = this;
            try {
                for (var section_2 = __values(section), section_2_1 = section_2.next(); !section_2_1.done; section_2_1 = section_2.next()) {
                    var node = section_2_1.value;
                    _loop_1(node);
                }
            }
            catch (e_7_1) {
                e_7 = { error: e_7_1 };
            }
            finally {
                try {
                    if (section_2_1 && !section_2_1.done && (_a = section_2.return))
                        _a.call(section_2);
                }
                finally {
                    if (e_7)
                        throw e_7.error;
                }
            }
            return questions;
            var e_7, _a;
        };
        EncounterPdfViewerService.prototype.resolveValue = function (answer, form, arrayElement) {
            var _this = this;
            if (answer !== '') {
                if (this.isUuid(answer)) {
                    var val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
                    if (!arrayElement) {
                        if (val) {
                            return val.toUpperCase();
                        }
                        else {
                            return answer;
                        }
                    }
                    else {
                        return val;
                    }
                }
                else if (_.isArray(answer)) {
                    var arr_1 = [];
                    _.forEach(answer, function (elem) {
                        arr_1.push(_this.resolveValue(elem, form, true));
                    });
                    return arr_1.toString();
                }
                else if (this.isDate(answer)) {
                    if (!arrayElement) {
                        return this.encounterViewerService.convertTime(answer);
                    }
                    else {
                        return this.encounterViewerService.convertTime(answer);
                    }
                }
                else if (typeof answer === 'object') {
                    var values = [];
                    var result = Object.keys(answer).map(function (key) { return [key, answer[key]]; });
                    values.push(result);
                    return values;
                }
                else {
                    return answer;
                }
            }
        };
        EncounterPdfViewerService.prototype.generatePdfDefinition = function (form) {
            var _this = this;
            var docDefinition$ = new rxjs.BehaviorSubject({});
            var remoteSelects = this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, true);
            rxjs.combineLatest(remoteSelects).subscribe(function (remoteAns) {
                if (remoteAns) {
                    var docDefinition = {
                        pageSize: 'A4',
                        content: _this.getPages(_this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
                        styles: {
                            answers: {
                                fontSize: 8
                            },
                            banner: {
                                fontSize: 9,
                                bold: true,
                                margin: [50, 15, 30, 0]
                            },
                            bannerItem: {
                                margin: [2, 2, 2, 2]
                            },
                            bannerLabel: {
                                color: '#2f4f4f'
                            },
                            confidential: {
                                color: 'red',
                                fontSize: 8,
                                bold: true,
                                margin: [60, 0, 0, 0]
                            },
                            footer: {
                                alignment: 'center',
                                fontSize: 8,
                                bold: true
                            },
                            header: {
                                fontSize: 9,
                                bold: true,
                                margin: [5, 5, 5, 5]
                            },
                            pageNumber: {
                                color: '#2f4f4f',
                                fontSize: 6
                            },
                            tableExample: {
                                fontSize: 10,
                                margin: [5, 0, 0, 5]
                            },
                            tableHeader: {
                                fillColor: '#f5f5f5',
                                width: ['100%'],
                                borderColor: '#333',
                                fontSize: 9,
                                bold: true,
                                margin: [5, 0, 5, 0]
                            },
                            tableSubheader: {
                                fillColor: '#337ab7',
                                width: ['100%'],
                                fontSize: 9,
                                color: 'white',
                                margin: [5, 0, 5, 0]
                            },
                            timestamp: {
                                bold: true,
                                color: '#2f4f4f'
                            }
                        },
                        defaultStyle: {
                            fontSize: 7
                        }
                    };
                    docDefinition$.next(docDefinition);
                }
            });
            return docDefinition$;
        };
        EncounterPdfViewerService.prototype.displayPdf = function (form) {
            var _this = this;
            var pdf = pdfMake;
            var patient;
            pdf.vfs = pdfMake.vfs;
            if (form.dataSourcesContainer.dataSources._dataSources) {
                patient =
                    form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
            }
            this.generatePdfDefinition(form).subscribe(function (docDefinition) {
                if (!_.isEmpty(docDefinition)) {
                    if (typeof patient !== 'undefined') {
                        var banner = [];
                        if (patient.name) {
                            banner.push({
                                text: [
                                    { text: 'Name: ', style: 'bannerLabel' },
                                    { text: "" + _this.titleize(patient.name) }
                                ],
                                style: 'bannerItem'
                            });
                        }
                        if (patient.nid) {
                            banner.push({
                                text: [
                                    { text: 'ID: ', style: 'bannerLabel' },
                                    { text: "" + patient.nid }
                                ],
                                style: 'bannerItem'
                            });
                        }
                        if (patient.birthdate) {
                            banner.push({
                                text: [
                                    { text: 'DOB: ', style: 'bannerLabel' },
                                    {
                                        text: moment$9(patient.birthdate).format('l') + " (" + patient.age + " yo)"
                                    }
                                ],
                                style: 'bannerItem'
                            });
                        }
                        if (patient.mui) {
                            banner.push({
                                text: [
                                    { text: 'MUI: ', style: 'bannerLabel' },
                                    { text: "" + patient.mui }
                                ],
                                style: 'bannerItem'
                            });
                        }
                        if (patient.mhn) {
                            banner.push({
                                text: [
                                    { text: 'MTRH No: ', style: 'bannerLabel' },
                                    { text: "" + patient.mhn }
                                ],
                                style: 'bannerItem'
                            });
                        }
                        docDefinition.header = {
                            style: 'banner',
                            table: {
                                body: [banner]
                            },
                            layout: 'noBorders'
                        };
                    }
                    docDefinition.footer = function (currentPage, pageCount) {
                        return {
                            style: 'footer',
                            widths: ['*', 'auto'],
                            table: {
                                body: [
                                    [
                                        {
                                            text: 'Note: Confidentiality is one of the core duties of all medical practitioners. ' +
                                                "Patients' personal health information should be kept private.",
                                            style: 'confidential'
                                        },
                                        ''
                                    ],
                                    [
                                        {
                                            text: "Generated on " + new Date().toUTCString(),
                                            style: 'timestamp'
                                        },
                                        {
                                            text: currentPage.toString() + " of " + pageCount,
                                            style: 'pageNumber'
                                        }
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        };
                    };
                    var win = window.open('', '_blank');
                    pdf.createPdf(docDefinition).open({}, win);
                }
            }, function (error) {
                console.log('Error: ', error);
            });
        };
        EncounterPdfViewerService.prototype.isDate = function (val) {
            return moment$9(val, moment$9.ISO_8601, true).isValid();
        };
        EncounterPdfViewerService.prototype.isUuid = function (value) {
            return (value.length === 36 &&
                value.indexOf(' ') === -1 &&
                value.indexOf('.') === -1);
        };
        EncounterPdfViewerService.prototype.titleize = function (str) {
            return str.replace(/\w\S*/g, function (s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });
        };
        EncounterPdfViewerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        EncounterPdfViewerService.ctorParameters = function () {
            return [
                { type: EncounterViewerService },
                { type: ObsValueAdapter },
                { type: DataSources }
            ];
        };
        EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(EncounterViewerService), i0.inject(ObsValueAdapter), i0.inject(DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
        return EncounterPdfViewerService;
    }());

    var EncounterContainerComponent = (function () {
        function EncounterContainerComponent(encAdapter, encounterPdfViewerService) {
            this.encAdapter = encAdapter;
            this.encounterPdfViewerService = encounterPdfViewerService;
        }
        Object.defineProperty(EncounterContainerComponent.prototype, "form", {
            set: function (form) {
                this.$form = form;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EncounterContainerComponent.prototype, "encounter", {
            set: function (enc) {
                this.$enc = enc;
            },
            enumerable: true,
            configurable: true
        });
        EncounterContainerComponent.prototype.ngOnInit = function () { };
        EncounterContainerComponent.prototype.displayPdf = function () {
            this.encounterPdfViewerService.displayPdf(this.$form);
        };
        EncounterContainerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'encounter-renderer',
                        template: "<a\n  type=\"button\"\n  style=\"display: block; font-size: 28px; cursor: pointer\"\n  class=\"text-right\"\n  (click)=\"displayPdf()\"\n>\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer\n  class=\"card\"\n  [form]=\"$form\"\n  [encounter]=\"$enc\"\n></encounter-viewer>\n",
                        styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
                    },] },
        ];
        EncounterContainerComponent.ctorParameters = function () {
            return [
                { type: EncounterAdapter },
                { type: EncounterPdfViewerService }
            ];
        };
        EncounterContainerComponent.propDecorators = {
            form: [{ type: i0.Input }],
            encounter: [{ type: i0.Input }]
        };
        return EncounterContainerComponent;
    }());

    var QuestionControlComponent = (function () {
        function QuestionControlComponent() {
            // The internal data model
            this.innerValue = '';
        }
        Object.defineProperty(QuestionControlComponent.prototype, "schema", {
            set: function (schema) {
                this._schema = schema;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuestionControlComponent.prototype, "value", {
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuestionControlComponent.prototype, "dataSource", {
            set: function (dataSource) {
                this._dataSource = dataSource;
            },
            enumerable: true,
            configurable: true
        });
        QuestionControlComponent.prototype.ngOnInit = function () {
            this.writeValue(this._value);
        };
        QuestionControlComponent.prototype.isUuid = function (value) {
            if (value.length === 36 &&
                value.indexOf(' ') === -1 &&
                value.indexOf('.') === -1) {
                return true;
            }
            else {
                return false;
            }
        };
        // Current time string.
        QuestionControlComponent.prototype.writeValue = function (v, arrayElement) {
            var _this = this;
            if (v !== this.innerValue) {
                if (this.isUuid(v)) {
                    if (!arrayElement) {
                        var val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
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
                else if (_.isArray(v)) {
                    var arr_1 = [];
                    _.forEach(v, function (el) {
                        arr_1.push(_this.writeValue(el, true));
                    });
                    this.innerValue = arr_1;
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
        };
        QuestionControlComponent.prototype.isDate = function (str) {
            return this._dataSource.isDate(str) && !_.isNumber(str);
        };
        QuestionControlComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'question-control',
                        styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"],
                        template: "<div>\n  {{ innerValue }}\n</div>\n"
                    },] },
        ];
        QuestionControlComponent.ctorParameters = function () { return []; };
        QuestionControlComponent.propDecorators = {
            schema: [{ type: i0.Input }],
            value: [{ type: i0.Input }],
            dataSource: [{ type: i0.Input }]
        };
        return QuestionControlComponent;
    }());

    var noop = function () { };
    var FilePreviewComponent = (function () {
        function FilePreviewComponent(encounterService) {
            this.encounterService = encounterService;
            this.fileUuid = null;
            this.resultsIsPdf = false;
            // Placeholders for the callbacks which are later providesd
            // by the Control Value Accessor
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(FilePreviewComponent.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
            },
            enumerable: true,
            configurable: true
        });
        FilePreviewComponent.prototype.ngOnInit = function () { };
        Object.defineProperty(FilePreviewComponent.prototype, "value", {
            // get accessor
            get: function () {
                return this.fileUuid;
            },
            // set accessor including call the onchange callback
            set: function (v) {
                if (v !== this.fileUuid) {
                    this.fileUuid = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        // Current time string.
        FilePreviewComponent.prototype.writeValue = function (v) {
            if (v !== this.fileUuid) {
                this.fileUuid = v;
                this.checkFileType();
            }
        };
        FilePreviewComponent.prototype.checkFileType = function () {
            var re = /pdf/gi;
            if (this.fileUuid.search(re) !== -1) {
                this.resultsIsPdf = true;
            }
        };
        // From ControlValueAccessor interface
        FilePreviewComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        // From ControlValueAccessor interface
        FilePreviewComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        FilePreviewComponent.prototype.onBlur = function () {
            this.onTouchedCallback();
        };
        FilePreviewComponent.prototype.onChange = function (event) {
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
        };
        FilePreviewComponent.prototype.getUrl = function () {
            this.dataSource.fetchFile(this.fileUuid, 'pdf').subscribe(function (file) {
                window.open(file.changingThisBreaksApplicationSecurity, '_blank');
            });
        };
        FilePreviewComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'file-preview',
                        styles: [""],
                        template: "<div *ngIf=\"fileUuid\">\n      <img\n        *ngIf=\"!resultsIsPdf\"\n        class=\"img-responsive\"\n        [src]=\"fileUuid | secure: this._dataSource.fetchFile\"\n        alt=\"image\"\n      />\n    </div>\n    <a *ngIf=\"resultsIsPdf\" (click)=\"getUrl()\" style=\"cursor: pointer\"\n      ><u>Open PDF</u></a\n    > ",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return FilePreviewComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        FilePreviewComponent.ctorParameters = function () {
            return [
                { type: EncounterViewerService }
            ];
        };
        FilePreviewComponent.propDecorators = {
            source: [{ type: i0.Input }],
            dataSource: [{ type: i0.Input }]
        };
        return FilePreviewComponent;
    }());

    var noop$1 = function () { };
    var RemoteAnswerComponent = (function () {
        function RemoteAnswerComponent() {
            this.innerValue = null;
            // Placeholders for the callbacks which are later providesd
            // by the Control Value Accessor
            this.onTouchedCallback = noop$1;
            this.onChangeCallback = noop$1;
        }
        Object.defineProperty(RemoteAnswerComponent.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (v) {
                this._dataSource = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteAnswerComponent.prototype, "value", {
            // get accessor
            get: function () {
                return this.innerValue;
            },
            // set accessor including call the onchange callback
            set: function (v) {
                if (v !== this.innerValue) {
                    this.innerValue = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        // Current time string.
        RemoteAnswerComponent.prototype.writeValue = function (v) {
            var _this = this;
            if (v !== this.innerValue) {
                if (this._dataSource) {
                    this._dataSource.resolveSelectedValue(v).subscribe(function (ans) {
                        _this.innerValue = ans.label;
                    });
                }
                else {
                    this.innerValue = v;
                }
            }
        };
        // From ControlValueAccessor interface
        RemoteAnswerComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        // From ControlValueAccessor interface
        RemoteAnswerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        RemoteAnswerComponent.prototype.onBlur = function () {
            this.onTouchedCallback();
        };
        RemoteAnswerComponent.prototype.onChange = function (event) { };
        RemoteAnswerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'remote-answer',
                        styles: [],
                        template: "\n    <div *ngIf=\"innerValue\">\n      {{ innerValue }}\n    </div>\n  ",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return RemoteAnswerComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        RemoteAnswerComponent.ctorParameters = function () { return []; };
        RemoteAnswerComponent.propDecorators = {
            source: [{ type: i0.Input }],
            dataSource: [{ type: i0.Input }]
        };
        return RemoteAnswerComponent;
    }());

    var EncounterViewerModule = (function () {
        function EncounterViewerModule() {
        }
        EncounterViewerModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            EncounterViewerComponent,
                            EncounterContainerComponent,
                            QuestionControlComponent,
                            FilePreviewComponent,
                            RemoteAnswerComponent
                        ],
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            http.HttpClientModule,
                            SharedModule
                        ],
                        providers: [EncounterViewerService, EncounterPdfViewerService],
                        exports: [EncounterContainerComponent, http.HttpClientModule]
                    },] },
        ];
        return EncounterViewerModule;
    }());

    var CheckboxControlComponent = (function () {
        function CheckboxControlComponent() {
            this._value = [];
            this.onChange = function (change) { };
            this.onTouched = function () { };
        }
        CheckboxControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.options = this.options.map(function (option) {
                if (_this.selected.indexOf(option.value) !== -1) {
                    Object.assign(option, { checked: true });
                }
                return option;
            });
        };
        CheckboxControlComponent.prototype.ngAfterViewInit = function () { };
        CheckboxControlComponent.prototype.writeValue = function (value) {
            this.value = value;
        };
        CheckboxControlComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        CheckboxControlComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        Object.defineProperty(CheckboxControlComponent.prototype, "value", {
            get: function () {
                if (this._value.length === 0) {
                    return '';
                }
                else {
                    return this._value || this._value[0];
                }
            },
            set: function (v) {
                if (typeof v === 'undefined' || v === null || v === '') {
                    v = [];
                }
                else if (typeof v === 'string') {
                    v = [v];
                }
                else if (!Array.isArray(v)) {
                    throw new TypeError('Value must be a string or an array.');
                }
            },
            enumerable: true,
            configurable: true
        });
        CheckboxControlComponent.prototype.selectOpt = function (option, event) {
            var _this = this;
            if (event.target.checked) {
                this._value.push(option.value);
            }
            else {
                this.options.forEach(function (o) {
                    if (o.value === option.value) {
                        _this._value.splice(o, 1);
                    }
                });
            }
            this.onChange(this.value);
        };
        CheckboxControlComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'checkbox',
                        template: "<div *ngFor=\"let option of options; let i = index\">\n  <label class=\"form-control no-border\">\n    <input\n      type=\"checkbox\"\n      id=\"i + 'id'\"\n      (change)=\"selectOpt(option, $event)\"\n      value=\"option.value\"\n      [checked]=\"option.checked\"\n    />\n    {{ option.label }}\n  </label>\n</div>\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return CheckboxControlComponent; }),
                                multi: true
                            }
                        ],
                        styles: [
                            "\n      .no-border {\n        border: 0;\n        box-shadow: none;\n      }\n    "
                        ]
                    },] },
        ];
        CheckboxControlComponent.propDecorators = {
            options: [{ type: i0.Input }],
            selected: [{ type: i0.Input }]
        };
        return CheckboxControlComponent;
    }());

    var CheckboxModule = (function () {
        function CheckboxModule() {
        }
        CheckboxModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [CheckboxControlComponent],
                        exports: [CheckboxControlComponent],
                        imports: [common.CommonModule, forms.FormsModule]
                    },] },
        ];
        return CheckboxModule;
    }());

    var moment$a = moment_;
    var NgxTimePickerComponent = (function () {
        function NgxTimePickerComponent() {
            this.value = moment$a().format('HH:mm:ss');
            this.onChange = function () { };
            this.onTouched = function () { };
        }
        NgxTimePickerComponent.prototype.ngOnInit = function () { };
        NgxTimePickerComponent.prototype.writeValue = function (value) {
            this.value = this.formatTimeValue(value);
        };
        NgxTimePickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NgxTimePickerComponent.prototype.registerOnTouched = function (fn) { };
        NgxTimePickerComponent.prototype.onTimeSelect = function ($event) {
            var timeValue = this.formatTimeValue($event);
            this.value = timeValue;
            this.onChange(timeValue);
        };
        NgxTimePickerComponent.prototype.formatTimeValue = function (timeInputString) {
            /*
              Allows processing of data that comes in as date-time
              or just time i.e '1970-03-01 12:32:21' or '12:32:21'
              or '12:32' or '1970-01-01T13:03:00.000+0300'
            */
            var timeArray = [];
            var dateArray = [];
            var timeValue = '';
            if (typeof timeInputString === 'undefined' || timeInputString === null) ;
            else {
                timeArray = timeInputString.split(':');
                dateArray = timeInputString.split('-');
            }
            if (timeArray.length === 1 && moment$a(timeInputString).isValid()) {
                timeValue = moment$a(timeInputString).format('HH:mm:ss');
            }
            else if (timeArray.length > 1 && timeArray.length < 2) {
                timeValue = moment$a(timeInputString, moment$a.defaultFormat).format('HH:mm:ss');
            }
            else if (timeArray.length >= 2 && dateArray.length > 1) {
                timeValue = moment$a(timeInputString, moment$a.defaultFormat).format('HH:mm:ss');
            }
            else if (timeArray.length >= 2 && dateArray.length <= 1) {
                timeValue = moment$a(timeInputString, 'HH:mm:ss').format('HH:mm:ss');
            }
            else {
                timeValue = moment$a().format('HH:mm:ss');
            }
            return timeValue;
        };
        NgxTimePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-time-picker',
                        template: "<input\n  type=\"time\"\n  class=\"form-control\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onTimeSelect($event)\"\n/>\n",
                        styles: [""],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                multi: true,
                                useExisting: i0.forwardRef(function () { return NgxTimePickerComponent; })
                            }
                        ]
                    },] },
        ];
        return NgxTimePickerComponent;
    }());

    var NgxTimePickerModule = (function () {
        function NgxTimePickerModule() {
        }
        NgxTimePickerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule],
                        declarations: [NgxTimePickerComponent],
                        exports: [NgxTimePickerComponent],
                        providers: []
                    },] },
        ];
        return NgxTimePickerModule;
    }());

    var FormEntryModule = (function () {
        function FormEntryModule() {
        }
        FormEntryModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            collapse.CollapseModule,
                            // NgSelectModule,
                            SelectModule,
                            DateTimePickerModule,
                            RemoteSelectModule,
                            // NoopAnimationsModule,
                            RemoteFileUploadModule,
                            EncounterViewerModule,
                            CheckboxModule,
                            material.MatIconModule,
                            material.MatTabsModule,
                            material.MatCardModule,
                            NgxDateTimePickerModule,
                            NgxTimePickerModule,
                            SharedModule
                        ],
                        declarations: [
                            FormRendererComponent,
                            AfeNgSelectComponent,
                            AppointmentsOverviewComponent,
                            HistoricalValueDirective,
                            ErrorRendererComponent,
                            timeAgoPipe.TimeAgoPipe
                        ],
                        providers: [
                            forms.FormBuilder,
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
                        exports: [
                            FormRendererComponent,
                            AfeNgSelectComponent,
                            ErrorRendererComponent,
                            DateTimePickerModule,
                            EncounterViewerModule,
                            NgxDateTimePickerModule,
                            NgxTimePickerModule
                        ]
                    },] },
        ];
        return FormEntryModule;
    }());

    var Pair = (function () {
        function Pair(key, value) {
            this.key = key;
            this.value = value;
        }
        return Pair;
    }());

    (function (RenderingType) {
        RenderingType[RenderingType["Form"] = 0] = "Form";
        RenderingType[RenderingType["Page"] = 1] = "Page";
        RenderingType[RenderingType["Section"] = 2] = "Section";
        RenderingType[RenderingType["Select"] = 3] = "Select";
        RenderingType[RenderingType["DropDown"] = 4] = "DropDown";
    })(exports.RenderingType || (exports.RenderingType = {}));

    /*
     * Public API Surface of ngx-formentry
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵbg = AfeNgSelectComponent;
    exports.ɵbh = AppointmentsOverviewComponent;
    exports.ɵz = CheckboxControlComponent;
    exports.ɵy = CheckboxModule;
    exports.ɵg = DatePickerComponent;
    exports.ɵk = DateTimePickerComponent;
    exports.ɵi = ModalComponent;
    exports.ɵj = MomentPipe;
    exports.ɵh = TimePickerComponent;
    exports.ɵq = FileUploadComponent;
    exports.ɵn = RemoteFileUploadModule;
    exports.ɵp = SecurePipe;
    exports.ɵba = MY_FORMATS;
    exports.ɵbb = NgxDateTimePickerComponent;
    exports.ɵbd = NgxTimePickerComponent;
    exports.ɵbc = NgxTimePickerModule;
    exports.ɵm = RemoteSelectComponent;
    exports.ɵl = RemoteSelectModule;
    exports.ɵe = SelectDropdownComponent;
    exports.ɵf = STYLE$1;
    exports.ɵb = SELECT_VALUE_ACCESSOR;
    exports.ɵc = SelectComponent;
    exports.ɵd = STYLE;
    exports.ɵa = SelectModule;
    exports.ɵw = FilePreviewComponent;
    exports.ɵv = QuestionControlComponent;
    exports.ɵx = RemoteAnswerComponent;
    exports.ɵu = EncounterContainerComponent;
    exports.ɵs = EncounterViewerComponent;
    exports.ɵr = EncounterViewerModule;
    exports.ɵt = EncounterViewerService;
    exports.ɵbi = HistoricalValueDirective;
    exports.ɵbk = ErrorRendererComponent;
    exports.ɵbm = ExpressionRunner;
    exports.ɵbl = HidersDisablersFactory;
    exports.ɵbo = AlertsFactory;
    exports.ɵbe = FormRendererComponent;
    exports.ɵbf = DEFAULT_STYLES;
    exports.ɵbj = HistoricalFieldHelperService;
    exports.ɵbn = DebugModeService;
    exports.ɵo = SharedModule;
    exports.FormEntryModule = FormEntryModule;
    exports.AfeFormControl = AfeFormControl;
    exports.AfeFormGroup = AfeFormGroup;
    exports.AfeFormArray = AfeFormArray;
    exports.EncounterPdfViewerService = EncounterPdfViewerService;
    exports.ControlRelationsFactory = ControlRelationsFactory;
    exports.FormControlService = FormControlService;
    exports.FormFactory = FormFactory;
    exports.Form = Form;
    exports.QuestionFactory = QuestionFactory;
    exports.ValidationFactory = ValidationFactory;
    exports.FormSchemaCompiler = FormSchemaCompiler;
    exports.HistoricalEncounterDataService = HistoricalEncounterDataService;
    exports.FormErrorsService = FormErrorsService;
    exports.EncounterAdapter = EncounterAdapter;
    exports.PersonAttribuAdapter = PersonAttribuAdapter;
    exports.OrderValueAdapter = OrderValueAdapter;
    exports.ObsValueAdapter = ObsValueAdapter;
    exports.ObsAdapterHelper = ObsAdapterHelper;
    exports.DataSources = DataSources;
    exports.CheckBoxQuestion = CheckBoxQuestion;
    exports.ConditionalValidationModel = ConditionalValidationModel;
    exports.DateQuestion = DateQuestion;
    exports.DateValidationModel = DateValidationModel;
    exports.FileUploadQuestion = FileUploadQuestion;
    exports.QuestionGroup = QuestionGroup;
    exports.JsExpressionValidationModel = JsExpressionValidationModel;
    exports.MaxValidationModel = MaxValidationModel;
    exports.MinValidationModel = MinValidationModel;
    exports.MultiSelectQuestion = MultiSelectQuestion;
    exports.Pair = Pair;
    exports.QuestionBase = QuestionBase;
    exports.RepeatingQuestion = RepeatingQuestion;
    exports.Option = Option$1;
    exports.SelectQuestion = SelectQuestion;
    exports.TestOrderQuestion = TestOrderQuestion;
    exports.TextAreaInputQuestion = TextAreaInputQuestion;
    exports.TextInputQuestion = TextInputQuestion;
    exports.UiSelectQuestion = UiSelectQuestion;
    exports.ValidationModel = ValidationModel;
    exports.NestedQuestion = NestedQuestion;
    exports.DateTimePickerModule = DateTimePickerModule;
    exports.NgxDateTimePickerModule = NgxDateTimePickerModule;
    exports.JsExpressionHelper = JsExpressionHelper;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
