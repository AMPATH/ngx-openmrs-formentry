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
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper }
    ]; };
    return ObsValueAdapter;
}());
export { ObsValueAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxDQUFDO0FBRWQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RDtJQUVFLHlCQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7SUFFaEQsNkNBQW1CLEdBQW5CLFVBQW9CLElBQVU7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELGdFQUFnRTtRQUNoRSxnQ0FBZ0M7UUFDaEMsNENBQTRDO1FBQzVDLG1DQUFtQztRQUNuQyxvREFBb0Q7UUFDcEQscUJBQXFCO1FBQ3JCLDRDQUE0QztJQUM5QyxDQUFDO0lBRUQsc0NBQVksR0FBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzVDLENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsNEJBQTRCO0lBRTVCLG1DQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsT0FBUSxFQUFFLFVBQVc7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LENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixJQUFJLFlBQVksU0FBUzt3QkFDeEIsSUFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO2dCQUNILENBQUM7YUFDRjs7Ozs7Ozs7O1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7SUFDcEIsQ0FBQzs7Z0JBNWxCRixVQUFVOzs7Z0JBRkYsZ0JBQWdCOztJQStsQnpCLHNCQUFDO0NBQUEsQUE3bEJELElBNmxCQztTQTVsQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi9vYnMtYWRhcHRlci1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2JzVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwZXI6IE9ic0FkYXB0ZXJIZWxwZXIpIHt9XG5cbiAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVyLmdldE9ic05vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgLy8gLy8gR2V0IG9icyBQYXlsb2FkXG4gICAgLy8gcmV0dXJuIHRoaXMuZ2V0T2JzUGF5bG9hZChxdWVzdGlvbk5vZGVzKTtcbiAgfVxuXG4gIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgdGhpcy5oZWxwZXIuc2V0Tm9kZVZhbHVlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAvLyAvLyBFeHRyYWN0IHNldCBvYnNcbiAgICAvLyB0aGlzLnNldFZhbHVlcyhxdWVzdGlvbk5vZGVzLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8vIFRPRE86IEdldCByaWQgb2YgYWxsIHRoZSBmdW5jdGlvbnMgYmVsb3cgYXMgdGhleSB3aWxsIG5vdCBiZSBuZWVkZWRcbiAgLy8gb25jZSB0aGUgaGVscGVyIGlzIHN0YWJsZVxuXG4gIHNldFZhbHVlcyhub2RlcywgcGF5bG9hZD8sIGZvcmNlZ3JvdXA/KSB7XG4gICAgaWYgKG5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgIHRoaXMuc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiZcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgKG5vZGUucXVlc3Rpb24gJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHx8XG4gICAgICAgICAgZm9yY2Vncm91cFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBncm91cE9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgby5ncm91cE1lbWJlcnNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGdyb3VwT2JzKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlKSB7XG4gICAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cE9icztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIGdyb3VwT2JzLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmb3JjZWdyb3VwICYmIG5vZGUucGF5bG9hZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucGF5bG9hZC5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uICYmXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZXBlYXRpbmcnICYmXG4gICAgICAgICAgIWZvcmNlZ3JvdXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICBub2RlLm5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICBpZiAoXG4gICAgICAobm9kZS5xdWVzdGlvbiAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSkgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpQ2hlY2tib3gnKSB8fFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ2NoZWNrYm94JyB8fFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpLXNlbGVjdCdcbiAgICApIHtcbiAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICB9KTtcbiAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUudXVpZCk7XG4gICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlKTtcbiAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy52YWx1ZSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtdWx0aU9icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG11bHRpT2JzICYmIG11bHRpT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpKTtcbiAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBtdWx0aU9icztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAub2JzRmllbGQgPT09ICd2YWx1ZSdcbiAgICAgICkge1xuICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHNldCB0aGUgdXN1YWwgb2JzIHZhbHVlXG4gICAgdGhpcy5zZXRPYnNWYWx1ZSh2YWx1ZUZpZWxkLCBwYXlsb2FkKTtcblxuICAgIC8vIHNldCB0aGUgb2JzIGRhdGVcbiAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICB9KTtcblxuICAgIGlmIChvYnMpIHtcbiAgICAgIGRhdGVGaWVsZFsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLm9ic0RhdGV0aW1lIH07XG4gICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnNldFZhbHVlKG9icy5vYnNEYXRldGltZSk7XG4gICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBnZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbSBvZiBtdWx0aU9icykge1xuICAgICAgdmFsdWVzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpIHtcbiAgICBjb25zdCBncm91cFJlcGVhdGluZ09icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kID1cbiAgICAgICAgby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgbGV0IGludGVyc2VjdCA9IGZhbHNlO1xuICAgICAgaWYgKGZvdW5kICYmIG8uZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgIGNvbnN0IG9icyA9IG8uZ3JvdXBNZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhLmNvbmNlcHQudXVpZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2NoZW1hUXVlc3Rpb25zID0gbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGEuZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBpbnRlcnNlY3QgPSBfLmludGVyc2VjdGlvbihvYnMsIHNjaGVtYVF1ZXN0aW9ucykubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3VuZCAmJiBpbnRlcnNlY3Q7XG4gICAgfSk7XG4gICAgaWYgKGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cFJlcGVhdGluZ09icztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5ub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IE9iamVjdC5rZXlzKGNoaWxkLmNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gY2hpbGQuY2hpbGRyZW5ba2V5XTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gZ3JvdXBSZXBlYXRpbmdPYnNbaW5kZXhdO1xuICAgICAgZ3JvdXBzLnB1c2goe1xuICAgICAgICBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbixcbiAgICAgICAgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlbixcbiAgICAgICAgcGF5bG9hZDogZ3JvdXBQYXlsb2FkXG4gICAgICB9KTtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHRoaXMuc2V0VmFsdWVzKGdyb3VwcywgZ3JvdXBSZXBlYXRpbmdPYnMsIHRydWUpO1xuICB9XG5cbiAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHBhZ2UucGFnZSkge1xuICAgICAgICBhcnJheXMucHVzaChzZWN0aW9uLnNlY3Rpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgfVxuXG4gIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHRvUmV0dXJuLnB1c2goe1xuICAgICAgICBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbixcbiAgICAgICAgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuICB9XG5cbiAgcHJvY2Vzc0dyb3VwKG9icywgb2JzUGF5bG9hZCkge1xuICAgIGlmIChcbiAgICAgIG9icy5xdWVzdGlvbiAmJlxuICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnXG4gICAgKSB7XG4gICAgICBjb25zdCBtZW1iZXJzID0gXy5maWx0ZXIoXG4gICAgICAgIHRoaXMuZ2V0T2JzUGF5bG9hZChvYnMuZ3JvdXBNZW1iZXJzKSxcbiAgICAgICAgKG86IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlICE9PSAnJztcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWFwcGVkTWVtYmVycyA9IG1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgIHJldHVybiBhLnZvaWRlZDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCAmJiBtYXBwZWRNZW1iZXJzLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9icy5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXBJbml0aWFsR3JvdXAoZ3JvdXApIHtcbiAgICBsZXQgY3VycmVudCA9IHt9O1xuICAgIGZvciAoY29uc3QgbWVtYmVyIG9mIGdyb3VwLmdyb3VwTWVtYmVycykge1xuICAgICAgbGV0IHZhbHVlOiBhbnkgPSAnJztcbiAgICAgIGlmIChtZW1iZXIudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWUudXVpZDtcbiAgICAgIH0gZWxzZSBpZiAobWVtYmVyLnZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChtZW1iZXIuZ3JvdXBNZW1iZXJzICYmIG1lbWJlci5ncm91cE1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjdXJyZW50ID0gdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApO1xuICAgICAgfVxuICAgICAgY3VycmVudFttZW1iZXIuY29uY2VwdC51dWlkICsgJzonICsgdmFsdWVdID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgbWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogYW55ID0gXy5maW5kKG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLCB7XG4gICAgICAgICAga2V5OiBrZXlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICBpZiAobW9kZWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGVsVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgY3VycmVudFtcbiAgICAgICAgICAgIGdyb3VwUXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICsgJzonICsgbW9kZWxWYWx1ZVxuICAgICAgICAgIF0gPSBtb2RlbFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgcHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IFtdO1xuICAgIGlmIChub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgaW5pdGlhbFZhbHVlcy5wdXNoKHtcbiAgICAgICAgICB1dWlkOiBncm91cC51dWlkLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlcGVhdGluZ01vZGVsID0gW107XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub2RlLm5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgcmVwZWF0aW5nTW9kZWwucHVzaCh7IHZhbHVlOiB0aGlzLm1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIH0pO1xuICAgIH1cbiAgICBjb25zdCBkZWxldGVkID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKGluaXRpYWxWYWx1ZXMsIHJlcGVhdGluZ01vZGVsKTtcbiAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMocmVwZWF0aW5nTW9kZWwsIGluaXRpYWxWYWx1ZXMpO1xuICAgIGNvbnN0IGdyb3VwQ29uY2VwdCA9IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIGxldCBuZXdPYnNQYXlsb2FkID0gW107XG4gICAgaWYgKGRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMuY3JlYXRlR3JvdXBEZWxldGVkT2JzKGRlbGV0ZWQpO1xuICAgICAgZm9yIChjb25zdCBkIG9mIGRlbGV0ZWRPYnMpIHtcbiAgICAgICAgb2JzUGF5bG9hZC5wdXNoKGQpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgIH1cblxuICAgIGlmIChuZXdPYnNQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgcCBvZiBuZXdPYnNQYXlsb2FkKSB7XG4gICAgICAgIG9ic1BheWxvYWQucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZWZ0T3V0ZXJKb2luQXJyYXlzKGZpcnN0LCBzZWNvbmQpIHtcbiAgICBjb25zdCB1bmlxdWUgPSBmaXJzdC5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuICFzZWNvbmQuc29tZShmdW5jdGlvbiAob2JqMikge1xuICAgICAgICByZXR1cm4gXy5pc0VxdWFsKG9iai52YWx1ZSwgb2JqMi52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5pcXVlO1xuICB9XG5cbiAgY3JlYXRlR3JvdXBOZXdPYnMocGF5bG9hZCwgZ3JvdXBDb25jZXB0KSB7XG4gICAgY29uc3QgbmV3UGF5bG9hZCA9IFtdO1xuICAgIGZvciAoY29uc3Qgb2JzIG9mIHBheWxvYWQpIHtcbiAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IFtdO1xuICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgIGZvciAobGV0IGtleSBpbiBvYnMudmFsdWUpIHtcbiAgICAgICAgbGV0IGNvbmNlcHQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICAgIGdyb3VwUGF5bG9hZC5wdXNoKHsgY29uY2VwdDogY29uY2VwdCwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgfVxuICAgICAgbmV3UGF5bG9hZC5wdXNoKHsgY29uY2VwdDogZ3JvdXBDb25jZXB0LCBncm91cE1lbWJlcnM6IGdyb3VwUGF5bG9hZCB9KTtcbiAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICB9XG4gICAgcmV0dXJuIG5ld1BheWxvYWQ7XG4gIH1cblxuICBjcmVhdGVHcm91cERlbGV0ZWRPYnMocGF5bG9hZCkge1xuICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGQgb2YgcGF5bG9hZCkge1xuICAgICAgZGVsZXRlZE9icy5wdXNoKHsgdXVpZDogZC51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWxldGVkT2JzO1xuICB9XG5cbiAgZ2V0RXhhY3RUaW1lKGRhdGV0aW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGF0ZXRpbWUuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgfVxuXG4gIHByb2Nlc3NPYnMob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgaWYgKG9icy5jb250cm9sICYmIG9icy5xdWVzdGlvbi5leHRyYXMpIHtcbiAgICAgIGNvbnN0IG9ic1ZhbHVlID0ge1xuICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICB2YWx1ZTpcbiAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJyAmJlxuICAgICAgICAgICF0aGlzLmlzRW1wdHkob2JzLmNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICA/IHRoaXMuZ2V0RXhhY3RUaW1lKG9icy5jb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgOiBvYnMuY29udHJvbC52YWx1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKFxuICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG11bHRpcyA9IHRoaXMucHJvY2Vzc011bHRpU2VsZWN0KFxuICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgb2JzLmNvbnRyb2wudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBtYXBwZWRJbml0aWFsID0gb2JzLmluaXRpYWxWYWx1ZS5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHV1aWQ6IGEudXVpZCxcbiAgICAgICAgICAgICAgdmFsdWU6IHsgY29uY2VwdDogYS5jb25jZXB0LnV1aWQsIHZhbHVlOiBhLnZhbHVlLnV1aWQgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBtYXBwZWRDdXJyZW50ID0gbXVsdGlzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGEgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKFxuICAgICAgICAgICAgbWFwcGVkSW5pdGlhbCxcbiAgICAgICAgICAgIG1hcHBlZEN1cnJlbnRcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRDdXJyZW50LCBtYXBwZWRJbml0aWFsKTtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnMoZGVsZXRlZE9icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobmV3T2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhtdWx0aXMsIG9ic1BheWxvYWQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSAmJiBvYnMuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG9ic1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIG9icy5pbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9ic1ZhbHVlLnZhbHVlICE9PSAnJyAmJiBvYnNWYWx1ZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIG9ic1BheWxvYWQucHVzaChvYnNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgaWYgKFxuICAgICAgICAobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ3ZhbHVlJ1xuICAgICAgKSB7XG4gICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnXG4gICAgICApIHtcbiAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgLy8gcHJvY2VzcyBvYnMgYXMgdXN1YWxcbiAgICAgIHRoaXMucHJvY2Vzc09icyh2YWx1ZUZpZWxkLCBvYnNQYXlsb2FkKTtcblxuICAgICAgLy8gb2J0YWluIHRoZSBsYXN0IGluc2VydGVkIG9icyBhbmQgc2V0IHRoZSBvYnNEYXRldGltZVxuICAgICAgY29uc3QgY3JlYXRlZFBheWxvYWQgPVxuICAgICAgICBvYnNQYXlsb2FkLmxlbmd0aCA+IDAgPyBvYnNQYXlsb2FkW29ic1BheWxvYWQubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoXG4gICAgICAgIGNyZWF0ZWRQYXlsb2FkICYmXG4gICAgICAgICgoY3JlYXRlZFBheWxvYWQuY29uY2VwdCAmJlxuICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgPT09XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkgfHxcbiAgICAgICAgICAodmFsdWVGaWVsZC5pbml0aWFsVmFsdWUgJiZcbiAgICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLnV1aWQgPT09IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic1V1aWQpKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBkYXRlRmllbGQuaW5pdGlhbFZhbHVlICYmXG4gICAgICAgICAgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUgIT09IGRhdGVGaWVsZC5pbml0aWFsVmFsdWUudmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY3JlYXRlZFBheWxvYWQub2JzRGF0ZXRpbWUgPSBkYXRlRmllbGQuY29udHJvbC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IHZhbHVlLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgZm9yIChjb25zdCBtdWx0aSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmIChtdWx0aS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIGluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCkge1xuICAgIGlmICh0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZhbHVlOiBvYnNWYWx1ZS52YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgPT09ICcnIHx8XG4gICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgfVxuICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5sYWJlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBsYWJlbDogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLmxhYmVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBxc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBub2RlOiBvLmNoaWxkcmVuW2tleV0sXG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiByZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgcHJvY2Vzc011bHRpU2VsZWN0KGNvbmNlcHQsIHZhbHVlcykge1xuICAgIGNvbnN0IG11bHRpU2VsZWN0T2JzID0gW107XG4gICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IG9icyA9IHtcbiAgICAgICAgICBjb25jZXB0OiBjb25jZXB0LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBtdWx0aVNlbGVjdE9icy5wdXNoKG9icyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtdWx0aVNlbGVjdE9icztcbiAgfVxuXG4gIGlzT2JzKG5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgfHxcbiAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icydcbiAgICApO1xuICB9XG5cbiAgZ2V0T2JzUGF5bG9hZChub2Rlcykge1xuICAgIGNvbnN0IG9ic1BheWxvYWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGlmICh0aGlzLmlzT2JzKG5vZGUpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobm9kZS5ncm91cE1lbWJlcnMsXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzR3JvdXAobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgKG5vZGUuZ3JvdXBNZW1iZXJzLFxuICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgIChub2RlIGFzIEdyb3VwTm9kZSkucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icydcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ic1BheWxvYWQ7XG4gIH1cbn1cbiJdfQ==