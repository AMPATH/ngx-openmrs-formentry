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
    ObsValueAdapter.prototype.getQuestionNodes = function (pages) {
        var merged = [];
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
    ObsValueAdapter.prototype.repeatingGroup = function (nodes) {
        var toReturn = [];
        try {
            for (var nodes_2 = tslib_1.__values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                var node = nodes_2_1.value;
                toReturn.push({
                    question: node.question,
                    groupMembers: this.traverse(node)
                });
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
            for (var _a = tslib_1.__values(group.groupMembers), _b = _a.next(); !_b.done; _b = _a.next()) {
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
    ObsValueAdapter.prototype.mapModelGroup = function (node, value) {
        var current = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                var groupQuestion = _.find(node.question.questions, {
                    key: key
                });
                var modelValue = value[key];
                if (modelValue instanceof Object) {
                }
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
                for (var _a = tslib_1.__values(node.node.initialValue), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var group = _b.value;
                    initialValues.push({
                        uuid: group.uuid,
                        value: this.mapInitialGroup(group)
                    });
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
        var deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        var newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        var groupConcept = node.question.extras.questionOptions.concept;
        var newObsPayload = [];
        if (deleted.length > 0) {
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
            for (var payload_1 = tslib_1.__values(payload), payload_1_1 = payload_1.next(); !payload_1_1.done; payload_1_1 = payload_1.next()) {
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
    ObsValueAdapter.prototype.createGroupDeletedObs = function (payload) {
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
    ObsValueAdapter.prototype.processNewMultiSelectObs = function (values, obsPayload) {
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
                for (var values_3 = tslib_1.__values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                    var value = values_3_1.value;
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
    ObsValueAdapter.prototype.isObs = function (node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    };
    ObsValueAdapter.prototype.getObsPayload = function (nodes) {
        var obsPayload = [];
        try {
            for (var nodes_3 = tslib_1.__values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
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
    /** @nocollapse */
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper }
    ]; };
    return ObsValueAdapter;
}());
export { ObsValueAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLENBQUM7QUFFZCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhEO0lBRUUseUJBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVoRCw2Q0FBbUIsR0FBbkIsVUFBb0IsSUFBVTtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsNENBQTRDO0lBQzlDLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiwwQ0FBMEM7SUFDNUMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSw0QkFBNEI7SUFFNUIsbUNBQVMsR0FBVCxVQUFVLEtBQUssRUFBRSxP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QUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNSLElBQUksWUFBWSxTQUFTO3dCQUN4QixJQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQy9DLENBQUMsQ0FBQyxDQUFDO3dCQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3BDLENBQUM7Z0JBQ0gsQ0FBQzthQUNGOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDOztJQUNwQixDQUFDOztnQkE1bEJGLFVBQVU7Ozs7Z0JBRkYsZ0JBQWdCOztJQStsQnpCLHNCQUFDO0NBQUEsQUE3bEJELElBNmxCQztTQTVsQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi9vYnMtYWRhcHRlci1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2JzVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwZXI6IE9ic0FkYXB0ZXJIZWxwZXIpIHt9XG5cbiAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVyLmdldE9ic05vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgLy8gLy8gR2V0IG9icyBQYXlsb2FkXG4gICAgLy8gcmV0dXJuIHRoaXMuZ2V0T2JzUGF5bG9hZChxdWVzdGlvbk5vZGVzKTtcbiAgfVxuXG4gIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgdGhpcy5oZWxwZXIuc2V0Tm9kZVZhbHVlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAvLyAvLyBFeHRyYWN0IHNldCBvYnNcbiAgICAvLyB0aGlzLnNldFZhbHVlcyhxdWVzdGlvbk5vZGVzLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8vIFRPRE86IEdldCByaWQgb2YgYWxsIHRoZSBmdW5jdGlvbnMgYmVsb3cgYXMgdGhleSB3aWxsIG5vdCBiZSBuZWVkZWRcbiAgLy8gb25jZSB0aGUgaGVscGVyIGlzIHN0YWJsZVxuXG4gIHNldFZhbHVlcyhub2RlcywgcGF5bG9hZD8sIGZvcmNlZ3JvdXA/KSB7XG4gICAgaWYgKG5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgIHRoaXMuc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiZcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgKG5vZGUucXVlc3Rpb24gJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHx8XG4gICAgICAgICAgZm9yY2Vncm91cFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBncm91cE9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgby5ncm91cE1lbWJlcnNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGdyb3VwT2JzKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlKSB7XG4gICAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cE9icztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIGdyb3VwT2JzLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmb3JjZWdyb3VwICYmIG5vZGUucGF5bG9hZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucGF5bG9hZC5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uICYmXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZXBlYXRpbmcnICYmXG4gICAgICAgICAgIWZvcmNlZ3JvdXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICBub2RlLm5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICBpZiAoXG4gICAgICAobm9kZS5xdWVzdGlvbiAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSkgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpQ2hlY2tib3gnKSB8fFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ2NoZWNrYm94JyB8fFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpLXNlbGVjdCdcbiAgICApIHtcbiAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICB9KTtcbiAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUudXVpZCk7XG4gICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlKTtcbiAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy52YWx1ZSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtdWx0aU9icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG11bHRpT2JzICYmIG11bHRpT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpKTtcbiAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBtdWx0aU9icztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAub2JzRmllbGQgPT09ICd2YWx1ZSdcbiAgICAgICkge1xuICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHNldCB0aGUgdXN1YWwgb2JzIHZhbHVlXG4gICAgdGhpcy5zZXRPYnNWYWx1ZSh2YWx1ZUZpZWxkLCBwYXlsb2FkKTtcblxuICAgIC8vIHNldCB0aGUgb2JzIGRhdGVcbiAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICB9KTtcblxuICAgIGlmIChvYnMpIHtcbiAgICAgIGRhdGVGaWVsZFsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLm9ic0RhdGV0aW1lIH07XG4gICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnNldFZhbHVlKG9icy5vYnNEYXRldGltZSk7XG4gICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBnZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbSBvZiBtdWx0aU9icykge1xuICAgICAgdmFsdWVzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpIHtcbiAgICBjb25zdCBncm91cFJlcGVhdGluZ09icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kID1cbiAgICAgICAgby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgbGV0IGludGVyc2VjdCA9IGZhbHNlO1xuICAgICAgaWYgKGZvdW5kICYmIG8uZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgIGNvbnN0IG9icyA9IG8uZ3JvdXBNZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhLmNvbmNlcHQudXVpZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2NoZW1hUXVlc3Rpb25zID0gbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGEuZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBpbnRlcnNlY3QgPSBfLmludGVyc2VjdGlvbihvYnMsIHNjaGVtYVF1ZXN0aW9ucykubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3VuZCAmJiBpbnRlcnNlY3Q7XG4gICAgfSk7XG4gICAgaWYgKGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cFJlcGVhdGluZ09icztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5ub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IE9iamVjdC5rZXlzKGNoaWxkLmNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gY2hpbGQuY2hpbGRyZW5ba2V5XTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gZ3JvdXBSZXBlYXRpbmdPYnNbaW5kZXhdO1xuICAgICAgZ3JvdXBzLnB1c2goe1xuICAgICAgICBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbixcbiAgICAgICAgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlbixcbiAgICAgICAgcGF5bG9hZDogZ3JvdXBQYXlsb2FkXG4gICAgICB9KTtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHRoaXMuc2V0VmFsdWVzKGdyb3VwcywgZ3JvdXBSZXBlYXRpbmdPYnMsIHRydWUpO1xuICB9XG5cbiAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHBhZ2UucGFnZSkge1xuICAgICAgICBhcnJheXMucHVzaChzZWN0aW9uLnNlY3Rpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgfVxuXG4gIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHRvUmV0dXJuLnB1c2goe1xuICAgICAgICBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbixcbiAgICAgICAgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuICB9XG5cbiAgcHJvY2Vzc0dyb3VwKG9icywgb2JzUGF5bG9hZCkge1xuICAgIGlmIChcbiAgICAgIG9icy5xdWVzdGlvbiAmJlxuICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnXG4gICAgKSB7XG4gICAgICBjb25zdCBtZW1iZXJzID0gXy5maWx0ZXIoXG4gICAgICAgIHRoaXMuZ2V0T2JzUGF5bG9hZChvYnMuZ3JvdXBNZW1iZXJzKSxcbiAgICAgICAgKG86IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlICE9PSAnJztcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWFwcGVkTWVtYmVycyA9IG1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgIHJldHVybiBhLnZvaWRlZDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCAmJiBtYXBwZWRNZW1iZXJzLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9icy5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXBJbml0aWFsR3JvdXAoZ3JvdXApIHtcbiAgICBsZXQgY3VycmVudCA9IHt9O1xuICAgIGZvciAoY29uc3QgbWVtYmVyIG9mIGdyb3VwLmdyb3VwTWVtYmVycykge1xuICAgICAgbGV0IHZhbHVlOiBhbnkgPSAnJztcbiAgICAgIGlmIChtZW1iZXIudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWUudXVpZDtcbiAgICAgIH0gZWxzZSBpZiAobWVtYmVyLnZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChtZW1iZXIuZ3JvdXBNZW1iZXJzICYmIG1lbWJlci5ncm91cE1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjdXJyZW50ID0gdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApO1xuICAgICAgfVxuICAgICAgY3VycmVudFttZW1iZXIuY29uY2VwdC51dWlkICsgJzonICsgdmFsdWVdID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgbWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogYW55ID0gXy5maW5kKG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLCB7XG4gICAgICAgICAga2V5OiBrZXlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICBpZiAobW9kZWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGVsVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgY3VycmVudFtcbiAgICAgICAgICAgIGdyb3VwUXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICsgJzonICsgbW9kZWxWYWx1ZVxuICAgICAgICAgIF0gPSBtb2RlbFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgcHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IFtdO1xuICAgIGlmIChub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgaW5pdGlhbFZhbHVlcy5wdXNoKHtcbiAgICAgICAgICB1dWlkOiBncm91cC51dWlkLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlcGVhdGluZ01vZGVsID0gW107XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub2RlLm5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgcmVwZWF0aW5nTW9kZWwucHVzaCh7IHZhbHVlOiB0aGlzLm1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIH0pO1xuICAgIH1cbiAgICBjb25zdCBkZWxldGVkID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKGluaXRpYWxWYWx1ZXMsIHJlcGVhdGluZ01vZGVsKTtcbiAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMocmVwZWF0aW5nTW9kZWwsIGluaXRpYWxWYWx1ZXMpO1xuICAgIGNvbnN0IGdyb3VwQ29uY2VwdCA9IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIGxldCBuZXdPYnNQYXlsb2FkID0gW107XG4gICAgaWYgKGRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMuY3JlYXRlR3JvdXBEZWxldGVkT2JzKGRlbGV0ZWQpO1xuICAgICAgZm9yIChjb25zdCBkIG9mIGRlbGV0ZWRPYnMpIHtcbiAgICAgICAgb2JzUGF5bG9hZC5wdXNoKGQpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgIH1cblxuICAgIGlmIChuZXdPYnNQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgcCBvZiBuZXdPYnNQYXlsb2FkKSB7XG4gICAgICAgIG9ic1BheWxvYWQucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZWZ0T3V0ZXJKb2luQXJyYXlzKGZpcnN0LCBzZWNvbmQpIHtcbiAgICBjb25zdCB1bmlxdWUgPSBmaXJzdC5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuICFzZWNvbmQuc29tZShmdW5jdGlvbiAob2JqMikge1xuICAgICAgICByZXR1cm4gXy5pc0VxdWFsKG9iai52YWx1ZSwgb2JqMi52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5pcXVlO1xuICB9XG5cbiAgY3JlYXRlR3JvdXBOZXdPYnMocGF5bG9hZCwgZ3JvdXBDb25jZXB0KSB7XG4gICAgY29uc3QgbmV3UGF5bG9hZCA9IFtdO1xuICAgIGZvciAoY29uc3Qgb2JzIG9mIHBheWxvYWQpIHtcbiAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IFtdO1xuICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgIGZvciAobGV0IGtleSBpbiBvYnMudmFsdWUpIHtcbiAgICAgICAgbGV0IGNvbmNlcHQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICAgIGdyb3VwUGF5bG9hZC5wdXNoKHsgY29uY2VwdDogY29uY2VwdCwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgfVxuICAgICAgbmV3UGF5bG9hZC5wdXNoKHsgY29uY2VwdDogZ3JvdXBDb25jZXB0LCBncm91cE1lbWJlcnM6IGdyb3VwUGF5bG9hZCB9KTtcbiAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICB9XG4gICAgcmV0dXJuIG5ld1BheWxvYWQ7XG4gIH1cblxuICBjcmVhdGVHcm91cERlbGV0ZWRPYnMocGF5bG9hZCkge1xuICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGQgb2YgcGF5bG9hZCkge1xuICAgICAgZGVsZXRlZE9icy5wdXNoKHsgdXVpZDogZC51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWxldGVkT2JzO1xuICB9XG5cbiAgZ2V0RXhhY3RUaW1lKGRhdGV0aW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF0ZXRpbWUuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgfVxuXG4gIHByb2Nlc3NPYnMob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgaWYgKG9icy5jb250cm9sICYmIG9icy5xdWVzdGlvbi5leHRyYXMpIHtcbiAgICAgIGNvbnN0IG9ic1ZhbHVlID0ge1xuICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJyAmJlxuICAgICAgICAgICF0aGlzLmlzRW1wdHkob2JzLmNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICA/IHRoaXMuZ2V0RXhhY3RUaW1lKG9icy5jb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgOiBvYnMuY29udHJvbC52YWx1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKFxuICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG11bHRpcyA9IHRoaXMucHJvY2Vzc011bHRpU2VsZWN0KFxuICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgb2JzLmNvbnRyb2wudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBtYXBwZWRJbml0aWFsID0gb2JzLmluaXRpYWxWYWx1ZS5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHV1aWQ6IGEudXVpZCxcbiAgICAgICAgICAgICAgdmFsdWU6IHsgY29uY2VwdDogYS5jb25jZXB0LnV1aWQsIHZhbHVlOiBhLnZhbHVlLnV1aWQgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBtYXBwZWRDdXJyZW50ID0gbXVsdGlzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGEgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKFxuICAgICAgICAgICAgbWFwcGVkSW5pdGlhbCxcbiAgICAgICAgICAgIG1hcHBlZEN1cnJlbnRcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRDdXJyZW50LCBtYXBwZWRJbml0aWFsKTtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnMoZGVsZXRlZE9icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobmV3T2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhtdWx0aXMsIG9ic1BheWxvYWQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSAmJiBvYnMuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG9ic1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIG9icy5pbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9ic1ZhbHVlLnZhbHVlICE9PSAnJyAmJiBvYnNWYWx1ZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaChvYnNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgaWYgKFxuICAgICAgICAobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ3ZhbHVlJ1xuICAgICAgKSB7XG4gICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnXG4gICAgICApIHtcbiAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgLy8gcHJvY2VzcyBvYnMgYXMgdXN1YWxcbiAgICAgIHRoaXMucHJvY2Vzc09icyh2YWx1ZUZpZWxkLCBvYnNQYXlsb2FkKTtcblxuICAgICAgLy8gb2J0YWluIHRoZSBsYXN0IGluc2VydGVkIG9icyBhbmQgc2V0IHRoZSBvYnNEYXRldGltZVxuICAgICAgY29uc3QgY3JlYXRlZFBheWxvYWQgPVxuICAgICAgICBvYnNQYXlsb2FkLmxlbmd0aCA+IDAgPyBvYnNQYXlsb2FkW29ic1BheWxvYWQubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoXG4gICAgICAgIGNyZWF0ZWRQYXlsb2FkICYmXG4gICAgICAgICgoY3JlYXRlZFBheWxvYWQuY29uY2VwdCAmJlxuICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgPT09XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkgfHxcbiAgICAgICAgICAodmFsdWVGaWVsZC5pbml0aWFsVmFsdWUgJiZcbiAgICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLnV1aWQgPT09IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic1V1aWQpKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBkYXRlRmllbGQuaW5pdGlhbFZhbHVlICYmXG4gICAgICAgICAgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUgIT09IGRhdGVGaWVsZC5pbml0aWFsVmFsdWUudmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY3JlYXRlZFBheWxvYWQub2JzRGF0ZXRpbWUgPSBkYXRlRmllbGQuY29udHJvbC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IHZhbHVlLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgZm9yIChjb25zdCBtdWx0aSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmIChtdWx0aS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIGluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCkge1xuICAgIGlmICh0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZhbHVlOiBvYnNWYWx1ZS52YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgPT09ICcnIHx8XG4gICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgfVxuICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5sYWJlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBsYWJlbDogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLmxhYmVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBxc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiByZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgcHJvY2Vzc011bHRpU2VsZWN0KGNvbmNlcHQsIHZhbHVlcykge1xuICAgIGNvbnN0IG11bHRpU2VsZWN0T2JzID0gW107XG4gICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IG9icyA9IHtcbiAgICAgICAgICBjb25jZXB0OiBjb25jZXB0LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBtdWx0aVNlbGVjdE9icy5wdXNoKG9icyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtdWx0aVNlbGVjdE9icztcbiAgfVxuXG4gIGlzT2JzKG5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgfHxcbiAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icydcbiAgICApO1xuICB9XG5cbiAgZ2V0T2JzUGF5bG9hZChub2Rlcykge1xuICAgIGNvbnN0IG9ic1BheWxvYWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGlmICh0aGlzLmlzT2JzKG5vZGUpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobm9kZS5ncm91cE1lbWJlcnMsXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzR3JvdXAobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgKG5vZGUuZ3JvdXBNZW1iZXJzLFxuICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgIChub2RlIGFzIEdyb3VwTm9kZSkucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icydcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ic1BheWxvYWQ7XG4gIH1cbn1cbiJdfQ==