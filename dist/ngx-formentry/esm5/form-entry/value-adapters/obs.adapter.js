/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import 'rxjs';
import * as _ from 'lodash';
import { LeafNode, GroupNode } from '../form-factory/form-node';
import { ObsAdapterHelper } from './obs-adapter-helper';
var ObsValueAdapter = /** @class */ (function () {
    function ObsValueAdapter(helper) {
        this.helper = helper;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    ObsValueAdapter.prototype.generateFormPayload = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    };
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.populateForm = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
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
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
    ObsValueAdapter.prototype.setValues = 
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
    function (nodes, payload, forcegroup) {
        if (nodes) {
            var _loop_1 = function (node) {
                if (node instanceof LeafNode) {
                    this_1.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    /** @type {?} */
                    var groupObs = _.find(payload, function (o) {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
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
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this_1.setComplexObsValue(node, payload);
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this_1.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                }
                else {
                    throw new Error('not implemented');
                }
            };
            var this_1 = this;
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    _loop_1(node);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _a;
    };
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setObsValue = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox' ||
            node.question.extras.questionOptions.rendering !== 'multi-select') {
            /** @type {?} */
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
            /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setComplexObsValue = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        /** @type {?} */
        var valueField;
        /** @type {?} */
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        // set the usual obs value
        this.setObsValue(valueField, payload);
        // set the obs date
        /** @type {?} */
        var obs = _.find(payload, function (o) {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            ((/** @type {?} */ (dateField))).control.setValue(obs.obsDatetime);
            ((/** @type {?} */ (dateField))).control.updateValueAndValidity();
        }
    };
    /**
     * @param {?} multiObs
     * @return {?}
     */
    ObsValueAdapter.prototype.getMultiselectValues = /**
     * @param {?} multiObs
     * @return {?}
     */
    function (multiObs) {
        /** @type {?} */
        var values = [];
        try {
            for (var multiObs_1 = tslib_1.__values(multiObs), multiObs_1_1 = multiObs_1.next(); !multiObs_1_1.done; multiObs_1_1 = multiObs_1.next()) {
                var m = multiObs_1_1.value;
                values.push(m.value.uuid);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (multiObs_1_1 && !multiObs_1_1.done && (_a = multiObs_1.return)) _a.call(multiObs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return values;
        var e_2, _a;
    };
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setRepeatingGroupValues = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        /** @type {?} */
        var groupRepeatingObs = _.filter(payload, function (o) {
            /** @type {?} */
            var found = o.concept.uuid === node.question.extras.questionOptions.concept;
            /** @type {?} */
            var intersect = false;
            if (found && o.groupMembers) {
                /** @type {?} */
                var obs = o.groupMembers.map(function (a) {
                    return a.concept.uuid;
                });
                /** @type {?} */
                var schemaQuestions = node.question.questions.map(function (a) {
                    return a.extras.questionOptions.concept;
                });
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (var i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        /** @type {?} */
        var groups = [];
        /** @type {?} */
        var index = 0;
        var _loop_2 = function (child) {
            /** @type {?} */
            var children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            /** @type {?} */
            var groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        };
        try {
            for (var _a = tslib_1.__values(node.node.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
                _loop_2(child);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.setValues(groups, groupRepeatingObs, true);
        var e_3, _c;
    };
    /**
     * @param {?} pages
     * @return {?}
     */
    ObsValueAdapter.prototype.getQuestionNodes = /**
     * @param {?} pages
     * @return {?}
     */
    function (pages) {
        /** @type {?} */
        var merged = [];
        /** @type {?} */
        var arrays = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                try {
                    for (var _a = tslib_1.__values(page.page), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var section = _b.value;
                        arrays.push(section.section);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_d = pages_1.return)) _d.call(pages_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return merged.concat.apply([], arrays);
        var e_5, _d, e_4, _c;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    ObsValueAdapter.prototype.repeatingGroup = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        /** @type {?} */
        var toReturn = [];
        try {
            for (var nodes_2 = tslib_1.__values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                var node = nodes_2_1.value;
                toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return toReturn;
        var e_6, _a;
    };
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processGroup = /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    function (obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            /** @type {?} */
            var members = _.filter(this.getObsPayload(obs.groupMembers), function (o) {
                return o.value !== '';
            });
            /** @type {?} */
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
    /**
     * @param {?} group
     * @return {?}
     */
    ObsValueAdapter.prototype.mapInitialGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var current = {};
        try {
            for (var _a = tslib_1.__values(group.groupMembers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var member = _b.value;
                /** @type {?} */
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return current;
        var e_7, _c;
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    ObsValueAdapter.prototype.mapModelGroup = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) {
        /** @type {?} */
        var current = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                /** @type {?} */
                var groupQuestion = _.find(node.question.questions, { key: key });
                /** @type {?} */
                var modelValue = value[key];
                if (modelValue instanceof Object) {
                }
                else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }
        }
        return current;
    };
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processRepeatingGroups = /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    function (node, obsPayload) {
        /** @type {?} */
        var initialValues = [];
        if (node.node.initialValue) {
            try {
                for (var _a = tslib_1.__values(node.node.initialValue), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var group = _b.value;
                    initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        /** @type {?} */
        var repeatingModel = [];
        try {
            for (var _d = tslib_1.__values(node.node.control.value), _e = _d.next(); !_e.done; _e = _d.next()) {
                var value = _e.value;
                repeatingModel.push({ value: this.mapModelGroup(node, value) });
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_9) throw e_9.error; }
        }
        /** @type {?} */
        var deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        /** @type {?} */
        var newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        /** @type {?} */
        var groupConcept = node.question.extras.questionOptions.concept;
        /** @type {?} */
        var newObsPayload = [];
        if (deleted.length > 0) {
            /** @type {?} */
            var deletedObs = this.createGroupDeletedObs(deleted);
            try {
                for (var deletedObs_1 = tslib_1.__values(deletedObs), deletedObs_1_1 = deletedObs_1.next(); !deletedObs_1_1.done; deletedObs_1_1 = deletedObs_1.next()) {
                    var d = deletedObs_1_1.value;
                    obsPayload.push(d);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (deletedObs_1_1 && !deletedObs_1_1.done && (_g = deletedObs_1.return)) _g.call(deletedObs_1);
                }
                finally { if (e_10) throw e_10.error; }
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
                for (var newObsPayload_1 = tslib_1.__values(newObsPayload), newObsPayload_1_1 = newObsPayload_1.next(); !newObsPayload_1_1.done; newObsPayload_1_1 = newObsPayload_1.next()) {
                    var p = newObsPayload_1_1.value;
                    obsPayload.push(p);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (newObsPayload_1_1 && !newObsPayload_1_1.done && (_h = newObsPayload_1.return)) _h.call(newObsPayload_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        var e_8, _c, e_9, _f, e_10, _g, e_11, _h;
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    ObsValueAdapter.prototype.leftOuterJoinArrays = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        /** @type {?} */
        var unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    };
    /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    ObsValueAdapter.prototype.createGroupNewObs = /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    function (payload, groupConcept) {
        /** @type {?} */
        var newPayload = [];
        try {
            for (var payload_1 = tslib_1.__values(payload), payload_1_1 = payload_1.next(); !payload_1_1.done; payload_1_1 = payload_1.next()) {
                var obs = payload_1_1.value;
                /** @type {?} */
                var groupPayload = [];
                /* tslint:disable */
                for (var key in obs.value) {
                    /** @type {?} */
                    var concept = key.split(':')[0];
                    /** @type {?} */
                    var value = key.split(':')[1];
                    groupPayload.push({ concept: concept, value: value });
                }
                newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
                /* tslint:enable */
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (payload_1_1 && !payload_1_1.done && (_a = payload_1.return)) _a.call(payload_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return newPayload;
        var e_12, _a;
    };
    /**
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.createGroupDeletedObs = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        /** @type {?} */
        var deletedObs = [];
        try {
            for (var payload_2 = tslib_1.__values(payload), payload_2_1 = payload_2.next(); !payload_2_1.done; payload_2_1 = payload_2.next()) {
                var d = payload_2_1.value;
                deletedObs.push({ uuid: d.uuid, voided: true });
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (payload_2_1 && !payload_2_1.done && (_a = payload_2.return)) _a.call(payload_2);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return deletedObs;
        var e_13, _a;
    };
    /**
     * @param {?} datetime
     * @return {?}
     */
    ObsValueAdapter.prototype.getExactTime = /**
     * @param {?} datetime
     * @return {?}
     */
    function (datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    };
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processObs = /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    function (obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            /** @type {?} */
            var obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox' ||
                obs.question.extras.questionOptions.rendering === 'multi-select') {
                /** @type {?} */
                var multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    /** @type {?} */
                    var mappedInitial = obs.initialValue.map(function (a) {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    /** @type {?} */
                    var mappedCurrent = multis.map(function (a) {
                        return { value: a };
                    });
                    /** @type {?} */
                    var deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processComplexObs = /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    function (node, obsPayload) {
        /** @type {?} */
        var valueField;
        /** @type {?} */
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        if (valueField) {
            // process obs as usual
            this.processObs(valueField, obsPayload);
            // obtain the last inserted obs and set the obsDatetime
            /** @type {?} */
            var createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    };
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processDeletedMultiSelectObs = /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    function (values, obsPayload) {
        try {
            for (var values_1 = tslib_1.__values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var value = values_1_1.value;
                obsPayload.push({ uuid: value.uuid, voided: true });
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var e_14, _a;
    };
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processNewMultiSelectObs = /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    function (values, obsPayload) {
        try {
            for (var values_2 = tslib_1.__values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                var multi = values_2_1.value;
                if (multi.value instanceof Object) {
                    obsPayload.push(multi.value);
                }
                else {
                    obsPayload.push(multi);
                }
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
        var e_15, _a;
    };
    /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.updateOrVoidObs = /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    function (obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ObsValueAdapter.prototype.isEmpty = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === '' ||
            value === null ||
            value === undefined) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    ObsValueAdapter.prototype.traverse = /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    function (o, type) {
        /** @type {?} */
        var questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                var returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (var key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                var page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                var qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
                                var rep = this.repeatingGroup(o.children[key].children);
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
    };
    /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    ObsValueAdapter.prototype.processMultiSelect = /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    function (concept, values) {
        /** @type {?} */
        var multiSelectObs = [];
        if (values && values !== null) {
            try {
                for (var values_3 = tslib_1.__values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                    var value = values_3_1.value;
                    /** @type {?} */
                    var obs = {
                        concept: concept,
                        value: value
                    };
                    multiSelectObs.push(obs);
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (values_3_1 && !values_3_1.done && (_a = values_3.return)) _a.call(values_3);
                }
                finally { if (e_16) throw e_16.error; }
            }
        }
        return multiSelectObs;
        var e_16, _a;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsValueAdapter.prototype.isObs = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    ObsValueAdapter.prototype.getObsPayload = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        /** @type {?} */
        var obsPayload = [];
        try {
            for (var nodes_3 = tslib_1.__values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                var node = nodes_3_1.value;
                if (this.isObs(node)) {
                    if (node.groupMembers, node.question.extras.questionOptions.rendering === 'group') {
                        this.processGroup(node, obsPayload);
                    }
                    else if (node.groupMembers, node.question.extras.questionOptions.rendering === 'repeating') {
                        this.processRepeatingGroups(node, obsPayload);
                    }
                    else if (node instanceof GroupNode && ((/** @type {?} */ (node))).question.extras.type === 'complex-obs') {
                        this.processComplexObs(node, obsPayload);
                    }
                    else {
                        this.processObs(node, obsPayload);
                    }
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return obsPayload;
        var e_17, _a;
    };
    ObsValueAdapter.decorators = [
        { type: Injectable },
    ];
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper }
    ]; };
    return ObsValueAdapter;
}());
export { ObsValueAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ObsValueAdapter.prototype.helper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sQ0FBQztBQUVkLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFHSSx5QkFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDOzs7OztJQUVqRCw2Q0FBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBVTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsNENBQTRDO0lBQ2hELENBQUM7Ozs7OztJQUVELHNDQUFZOzs7OztJQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSw0QkFBNEI7Ozs7Ozs7OztJQUU1QixtQ0FBUzs7Ozs7Ozs7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WixpQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IExlYWZOb2RlLCBHcm91cE5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzQWRhcHRlckhlbHBlciB9IGZyb20gJy4vb2JzLWFkYXB0ZXItaGVscGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9ic1ZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhlbHBlcjogT2JzQWRhcHRlckhlbHBlcikgeyB9XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVscGVyLmdldE9ic05vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoZSBzZWN0aW9uIGJlbG93IHdoZW4gdGhlIGhlbHBlciBpcyBzdGFibGUuXG4gICAgICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3QgYWN0dWFsIHF1ZXN0aW9uIG5vZGVzXG4gICAgICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAgICAgLy8gLy8gR2V0IG9icyBQYXlsb2FkXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmdldE9ic1BheWxvYWQocXVlc3Rpb25Ob2Rlcyk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5oZWxwZXIuc2V0Tm9kZVZhbHVlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAgICAgLy8gLy8gVHJhdmVyc2UgIHRvIGdldCBhbGwgbm9kZXNcbiAgICAgICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAgICAgLy8gbGV0IHF1ZXN0aW9uTm9kZXMgPSB0aGlzLmdldFF1ZXN0aW9uTm9kZXMocGFnZXMpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IHNldCBvYnNcbiAgICAgICAgLy8gdGhpcy5zZXRWYWx1ZXMocXVlc3Rpb25Ob2RlcywgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogR2V0IHJpZCBvZiBhbGwgdGhlIGZ1bmN0aW9ucyBiZWxvdyBhcyB0aGV5IHdpbGwgbm90IGJlIG5lZWRlZFxuICAgIC8vIG9uY2UgdGhlIGhlbHBlciBpcyBzdGFibGVcblxuICAgIHNldFZhbHVlcyhub2RlcywgcGF5bG9hZD8sIGZvcmNlZ3JvdXA/KSB7XG4gICAgICAgIGlmIChub2Rlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZ3JvdXAnIHx8IGZvcmNlZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJiBvLmdyb3VwTWVtYmVycztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cE9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cE9icztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIGdyb3VwT2JzLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlZ3JvdXAgJiYgbm9kZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlcyhub2RlLmdyb3VwTWVtYmVycywgbm9kZS5wYXlsb2FkLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlcGVhdGluZycgJiYgIWZvcmNlZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSkgJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgIT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpLXNlbGVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9icykge1xuICAgICAgICAgICAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG9icy52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLnZhbHVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtdWx0aU9icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobXVsdGlPYnMgJiYgbXVsdGlPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLmdldE11bHRpc2VsZWN0VmFsdWVzKG11bHRpT2JzKSk7XG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG11bHRpT2JzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tcGxleE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHRoZSB1c3VhbCBvYnMgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRPYnNWYWx1ZSh2YWx1ZUZpZWxkLCBwYXlsb2FkKTtcblxuICAgICAgICAvLyBzZXQgdGhlIG9icyBkYXRlXG4gICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JzKSB7XG4gICAgICAgICAgICBkYXRlRmllbGRbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy5vYnNEYXRldGltZSB9O1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC5zZXRWYWx1ZShvYnMub2JzRGF0ZXRpbWUpO1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIG11bHRpT2JzKSB7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgc2V0UmVwZWF0aW5nR3JvdXBWYWx1ZXMobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBjb25zdCBncm91cFJlcGVhdGluZ09icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgbGV0IGludGVyc2VjdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZvdW5kICYmIG8uZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0gby5ncm91cE1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmNvbmNlcHQudXVpZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVF1ZXN0aW9ucyA9IG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QgPSAoXy5pbnRlcnNlY3Rpb24ob2JzLCBzY2hlbWFRdWVzdGlvbnMpLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kICYmIGludGVyc2VjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChncm91cFJlcGVhdGluZ09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLm5vZGVbJ2luaXRpYWxWYWx1ZSddID0gZ3JvdXBSZXBlYXRpbmdPYnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3Qua2V5cyhjaGlsZC5jaGlsZHJlbikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNoaWxkLmNoaWxkcmVuW2tleV07IH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gZ3JvdXBSZXBlYXRpbmdPYnNbaW5kZXhdO1xuICAgICAgICAgICAgZ3JvdXBzLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlbiwgcGF5bG9hZDogZ3JvdXBQYXlsb2FkIH0pO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFZhbHVlcyhncm91cHMsIGdyb3VwUmVwZWF0aW5nT2JzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICBjb25zdCBhcnJheXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgcGFnZS5wYWdlKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlzLnB1c2goc2VjdGlvbi5zZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgICB9XG5cbiAgICByZXBlYXRpbmdHcm91cChub2Rlcykge1xuICAgICAgICBjb25zdCB0b1JldHVybiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICB9XG5cbiAgICBwcm9jZXNzR3JvdXAob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmIChvYnMucXVlc3Rpb24gJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcyAmJiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnMgPSBfLmZpbHRlcih0aGlzLmdldE9ic1BheWxvYWQob2JzLmdyb3VwTWVtYmVycyksIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby52YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWFwcGVkTWVtYmVycyA9IG1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudm9pZGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobWVtYmVycy5sZW5ndGggPiAwICYmIG1hcHBlZE1lbWJlcnMuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChvYnMubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy5ub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcEluaXRpYWxHcm91cChncm91cCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IG1lbWJlciBvZiBncm91cC5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJyc7XG4gICAgICAgICAgICBpZiAobWVtYmVyLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWUudXVpZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlci5ncm91cE1lbWJlcnMgJiYgbWVtYmVyLmdyb3VwTWVtYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXMubWFwSW5pdGlhbEdyb3VwKGdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRbbWVtYmVyLmNvbmNlcHQudXVpZCArICc6JyArIHZhbHVlXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIG1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBhbnkgPSBfLmZpbmQobm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMsIHsga2V5OiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbZ3JvdXBRdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgKyAnOidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbW9kZWxWYWx1ZV0gPSBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIHByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWVzID0gW107XG4gICAgICAgIGlmIChub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzLnB1c2goeyB1dWlkOiBncm91cC51dWlkLCB2YWx1ZTogdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcGVhdGluZ01vZGVsID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygbm9kZS5ub2RlLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIHJlcGVhdGluZ01vZGVsLnB1c2goeyB2YWx1ZTogdGhpcy5tYXBNb2RlbEdyb3VwKG5vZGUsIHZhbHVlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWxldGVkID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKGluaXRpYWxWYWx1ZXMsIHJlcGVhdGluZ01vZGVsKTtcbiAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKHJlcGVhdGluZ01vZGVsLCBpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgY29uc3QgZ3JvdXBDb25jZXB0ID0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIGxldCBuZXdPYnNQYXlsb2FkID0gW107XG4gICAgICAgIGlmIChkZWxldGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSB0aGlzLmNyZWF0ZUdyb3VwRGVsZXRlZE9icyhkZWxldGVkKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZCBvZiBkZWxldGVkT2JzKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld09ic1BheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIG5ld09ic1BheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZWZ0T3V0ZXJKb2luQXJyYXlzKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgY29uc3QgdW5pcXVlID0gZmlyc3QuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAhc2Vjb25kLnNvbWUoZnVuY3Rpb24gKG9iajIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc0VxdWFsKG9iai52YWx1ZSwgb2JqMi52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1bmlxdWU7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBOZXdPYnMocGF5bG9hZCwgZ3JvdXBDb25jZXB0KSB7XG4gICAgICAgIGNvbnN0IG5ld1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBvYnMgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gW107XG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9icy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25jZXB0ID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICAgICAgZ3JvdXBQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBjb25jZXB0LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBncm91cENvbmNlcHQsIGdyb3VwTWVtYmVyczogZ3JvdXBQYXlsb2FkIH0pXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1BheWxvYWQ7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBEZWxldGVkT2JzKHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGQgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgZGVsZXRlZE9icy5wdXNoKHsgdXVpZDogZC51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWRPYnM7XG4gICAgfVxuXG4gICAgZ2V0RXhhY3RUaW1lKGRhdGV0aW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGV0aW1lLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc09icyhvYnMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKG9icy5jb250cm9sICYmIG9icy5xdWVzdGlvbi5leHRyYXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9ic1ZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJyAmJiAhdGhpcy5pc0VtcHR5KG9icy5jb250cm9sLnZhbHVlKSkgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEV4YWN0VGltZShvYnMuY29udHJvbC52YWx1ZSkgOiBvYnMuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXMgPSB0aGlzLnByb2Nlc3NNdWx0aVNlbGVjdChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LCBvYnMuY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkSW5pdGlhbCA9IG9icy5pbml0aWFsVmFsdWUubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB1dWlkOiBhLnV1aWQsIHZhbHVlOiB7IGNvbmNlcHQ6IGEuY29uY2VwdC51dWlkLCB2YWx1ZTogYS52YWx1ZS51dWlkIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEN1cnJlbnQgPSBtdWx0aXMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogYSB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRJbml0aWFsLCBtYXBwZWRDdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKG1hcHBlZEN1cnJlbnQsIG1hcHBlZEluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnMoZGVsZXRlZE9icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKG5ld09icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobXVsdGlzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvYnMuaW5pdGlhbFZhbHVlICYmIG9icy5pbml0aWFsVmFsdWUudmFsdWUgJiYgb2JzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIG9icy5pbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JzVmFsdWUudmFsdWUgIT09ICcnICYmIG9ic1ZhbHVlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChvYnNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogYW55O1xuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZUZpZWxkKSB7XG4gICAgICAgICAgICAvLyBwcm9jZXNzIG9icyBhcyB1c3VhbFxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKHZhbHVlRmllbGQsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gdGhlIGxhc3QgaW5zZXJ0ZWQgb2JzIGFuZCBzZXQgdGhlIG9ic0RhdGV0aW1lXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkUGF5bG9hZCA9IG9ic1BheWxvYWQubGVuZ3RoID4gMCA/IG9ic1BheWxvYWRbb2JzUGF5bG9hZC5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChjcmVhdGVkUGF5bG9hZCAmJlxuICAgICAgICAgICAgICAgICgoY3JlYXRlZFBheWxvYWQuY29uY2VwdCAmJiBjcmVhdGVkUGF5bG9hZC5jb25jZXB0ID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlICYmIGNyZWF0ZWRQYXlsb2FkLnV1aWQgPT09IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic1V1aWQpKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlRmllbGQuaW5pdGlhbFZhbHVlICYmIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlICE9PSBkYXRlRmllbGQuaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLm9ic0RhdGV0aW1lID0gZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0RlbGV0ZWRNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IHZhbHVlLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChtdWx0aS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIGluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG9ic1ZhbHVlLnZhbHVlKSAmJiBpbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IGluaXRpYWxWYWx1ZS5vYnNVdWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbXB0eShvYnNWYWx1ZS52YWx1ZSkgJiYgaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiBpbml0aWFsVmFsdWUub2JzVXVpZCwgdmFsdWU6IG9ic1ZhbHVlLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UobywgdHlwZT8pIHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zID0gW107XG4gICAgICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWQgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgcGFnZTogcGFnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgc2VjdGlvbjogc2VjdGlvbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcmVwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBwcm9jZXNzTXVsdGlTZWxlY3QoY29uY2VwdCwgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IG11bHRpU2VsZWN0T2JzID0gW107XG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdE9icy5wdXNoKG9icyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG11bHRpU2VsZWN0T2JzO1xuICAgIH1cblxuXG4gICAgaXNPYnMobm9kZSkge1xuICAgICAgICByZXR1cm4gKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKTtcbiAgICB9XG5cbiAgICBnZXRPYnNQYXlsb2FkKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IG9ic1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc09icyhub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0dyb3VwKG5vZGUsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVwZWF0aW5nR3JvdXBzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiAobm9kZSBhcyBHcm91cE5vZGUpLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzUGF5bG9hZDtcbiAgICB9XG59XG4iXX0=