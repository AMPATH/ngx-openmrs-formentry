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
        var e_1, _a;
        if (nodes) {
            var _loop_1 = function (node) {
                if (node instanceof LeafNode) {
                    this_1.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
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
    };
    ObsValueAdapter.prototype.setObsValue = function (node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
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
        var e_2, _a;
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
    };
    ObsValueAdapter.prototype.setRepeatingGroupValues = function (node, payload) {
        var e_3, _a;
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
        var groups = [];
        var index = 0;
        var _loop_2 = function (child) {
            var children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            var groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        };
        try {
            for (var _b = tslib_1.__values(node.node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                _loop_2(child);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.setValues(groups, groupRepeatingObs, true);
    };
    ObsValueAdapter.prototype.getQuestionNodes = function (pages) {
        var e_4, _a, e_5, _b;
        var merged = [];
        var arrays = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                try {
                    for (var _c = (e_5 = void 0, tslib_1.__values(page.page)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var section = _d.value;
                        arrays.push(section.section);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return merged.concat.apply([], arrays);
    };
    ObsValueAdapter.prototype.repeatingGroup = function (nodes) {
        var e_6, _a;
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
    };
    ObsValueAdapter.prototype.processGroup = function (obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
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
        var e_7, _a;
        var current = {};
        try {
            for (var _b = tslib_1.__values(group.groupMembers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var member = _c.value;
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
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return current;
    };
    ObsValueAdapter.prototype.mapModelGroup = function (node, value) {
        var current = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                var groupQuestion = _.find(node.question.questions, { key: key });
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
    ObsValueAdapter.prototype.processRepeatingGroups = function (node, obsPayload) {
        var e_8, _a, e_9, _b, e_10, _c, e_11, _d;
        var initialValues = [];
        if (node.node.initialValue) {
            try {
                for (var _e = tslib_1.__values(node.node.initialValue), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var group = _f.value;
                    initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        var repeatingModel = [];
        try {
            for (var _g = tslib_1.__values(node.node.control.value), _h = _g.next(); !_h.done; _h = _g.next()) {
                var value = _h.value;
                repeatingModel.push({ value: this.mapModelGroup(node, value) });
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
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
                    if (deletedObs_1_1 && !deletedObs_1_1.done && (_c = deletedObs_1.return)) _c.call(deletedObs_1);
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
                    if (newObsPayload_1_1 && !newObsPayload_1_1.done && (_d = newObsPayload_1.return)) _d.call(newObsPayload_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
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
        var e_12, _a;
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
    };
    ObsValueAdapter.prototype.createGroupDeletedObs = function (payload) {
        var e_13, _a;
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
    };
    ObsValueAdapter.prototype.getExactTime = function (datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    };
    ObsValueAdapter.prototype.processObs = function (obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            var obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox' ||
                obs.question.extras.questionOptions.rendering === 'multi-select') {
                var multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    var mappedInitial = obs.initialValue.map(function (a) {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
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
    ObsValueAdapter.prototype.processDeletedMultiSelectObs = function (values, obsPayload) {
        var e_14, _a;
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
    };
    ObsValueAdapter.prototype.processNewMultiSelectObs = function (values, obsPayload) {
        var e_15, _a;
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
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
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
                                questions.push({ page: page, label: o.children[key].question.label });
                                break;
                            case 'section':
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section, node: o.children[key], label: o.children[key].question.label });
                                break;
                            case 'group':
                                var qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
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
    ObsValueAdapter.prototype.processMultiSelect = function (concept, values) {
        var e_16, _a;
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
    };
    ObsValueAdapter.prototype.isObs = function (node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    };
    ObsValueAdapter.prototype.getObsPayload = function (nodes) {
        var e_17, _a;
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
                    else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
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
    };
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper }
    ]; };
    ObsValueAdapter = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ObsAdapterHelper])
    ], ObsValueAdapter);
    return ObsValueAdapter;
}());
export { ObsValueAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLENBQUM7QUFFZCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hEO0lBRUkseUJBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUksQ0FBQztJQUVqRCw2Q0FBbUIsR0FBbkIsVUFBb0IsSUFBVTtRQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELGdFQUFnRTtRQUNoRSxnQ0FBZ0M7UUFDaEMsNENBQTRDO1FBQzVDLG1DQUFtQztRQUNuQyxvREFBb0Q7UUFDcEQscUJBQXFCO1FBQ3JCLDRDQUE0QztJQUNoRCxDQUFDO0lBRUQsc0NBQVksR0FBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzlDLENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsNEJBQTRCO0lBRTVCLG1DQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsT0FBUSxF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ZjJCLGdCQUFnQjs7SUFGbkMsZUFBZTtRQUQzQixVQUFVLEVBQUU7aURBR21CLGdCQUFnQjtPQUZuQyxlQUFlLENBMmYzQjtJQUFELHNCQUFDO0NBQUEsQUEzZkQsSUEyZkM7U0EzZlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi9vYnMtYWRhcHRlci1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2JzVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaGVscGVyOiBPYnNBZGFwdGVySGVscGVyKSB7IH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWxwZXIuZ2V0T2JzTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAgICAgLy8gLy8gVHJhdmVyc2UgIHRvIGdldCBhbGwgbm9kZXNcbiAgICAgICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAgICAgLy8gbGV0IHF1ZXN0aW9uTm9kZXMgPSB0aGlzLmdldFF1ZXN0aW9uTm9kZXMocGFnZXMpO1xuICAgICAgICAvLyAvLyBHZXQgb2JzIFBheWxvYWRcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuZ2V0T2JzUGF5bG9hZChxdWVzdGlvbk5vZGVzKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLmhlbHBlci5zZXROb2RlVmFsdWUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG5cbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgICAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgICAgICAvLyBsZXQgcGFnZXMgPSB0aGlzLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgICAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3Qgc2V0IG9ic1xuICAgICAgICAvLyB0aGlzLnNldFZhbHVlcyhxdWVzdGlvbk5vZGVzLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIGFsbCB0aGUgZnVuY3Rpb25zIGJlbG93IGFzIHRoZXkgd2lsbCBub3QgYmUgbmVlZGVkXG4gICAgLy8gb25jZSB0aGUgaGVscGVyIGlzIHN0YWJsZVxuXG4gICAgc2V0VmFsdWVzKG5vZGVzLCBwYXlsb2FkPywgZm9yY2Vncm91cD8pIHtcbiAgICAgICAgaWYgKG5vZGVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcgfHwgZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmIG8uZ3JvdXBNZW1iZXJzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwT2JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlWydpbml0aWFsVmFsdWUnXSA9IGdyb3VwT2JzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlcyhub2RlLmdyb3VwTWVtYmVycywgZ3JvdXBPYnMuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2Vncm91cCAmJiBub2RlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzKG5vZGUuZ3JvdXBNZW1iZXJzLCBub2RlLnBheWxvYWQuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVwZWF0aW5nJyAmJiAhZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPYnNWYWx1ZShub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpKSAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnbXVsdGktc2VsZWN0Jykge1xuICAgICAgICAgICAgY29uc3Qgb2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAob2JzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IHsgb2JzVXVpZDogb2JzLnV1aWQsIHZhbHVlOiBvYnMudmFsdWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpT2JzID0gXy5maWx0ZXIocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtdWx0aU9icyAmJiBtdWx0aU9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpKTtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gbXVsdGlPYnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogYW55O1xuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdGhlIHVzdWFsIG9icyB2YWx1ZVxuICAgICAgICB0aGlzLnNldE9ic1ZhbHVlKHZhbHVlRmllbGQsIHBheWxvYWQpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgb2JzIGRhdGVcbiAgICAgICAgY29uc3Qgb2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgICAgIGRhdGVGaWVsZFsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLm9ic0RhdGV0aW1lIH07XG4gICAgICAgICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnNldFZhbHVlKG9icy5vYnNEYXRldGltZSk7XG4gICAgICAgICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE11bHRpc2VsZWN0VmFsdWVzKG11bHRpT2JzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG0gb2YgbXVsdGlPYnMpIHtcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG0udmFsdWUudXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICBzZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwUmVwZWF0aW5nT2JzID0gXy5maWx0ZXIocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICBsZXQgaW50ZXJzZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZm91bmQgJiYgby5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSBvLmdyb3VwTWVtYmVycy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuY29uY2VwdC51dWlkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hUXVlc3Rpb25zID0gbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGludGVyc2VjdCA9IChfLmludGVyc2VjdGlvbihvYnMsIHNjaGVtYVF1ZXN0aW9ucykubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm91bmQgJiYgaW50ZXJzZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cFJlcGVhdGluZ09icztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBzID0gW107XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IE9iamVjdC5rZXlzKGNoaWxkLmNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY2hpbGQuY2hpbGRyZW5ba2V5XTsgfSk7XG4gICAgICAgICAgICBjb25zdCBncm91cFBheWxvYWQgPSBncm91cFJlcGVhdGluZ09ic1tpbmRleF07XG4gICAgICAgICAgICBncm91cHMucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IGNoaWxkcmVuLCBwYXlsb2FkOiBncm91cFBheWxvYWQgfSk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0VmFsdWVzKGdyb3VwcywgZ3JvdXBSZXBlYXRpbmdPYnMsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFF1ZXN0aW9uTm9kZXMocGFnZXMpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBwYWdlLnBhZ2UpIHtcbiAgICAgICAgICAgICAgICBhcnJheXMucHVzaChzZWN0aW9uLnNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xuICAgIH1cblxuICAgIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IHRvUmV0dXJuID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHRoaXMudHJhdmVyc2Uobm9kZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cblxuICAgIHByb2Nlc3NHcm91cChvYnMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKG9icy5xdWVzdGlvbiAmJiBvYnMucXVlc3Rpb24uZXh0cmFzICYmIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgY29uc3QgbWVtYmVycyA9IF8uZmlsdGVyKHRoaXMuZ2V0T2JzUGF5bG9hZChvYnMuZ3JvdXBNZW1iZXJzKSwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnZhbHVlICE9PSAnJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtYXBwZWRNZW1iZXJzID0gbWVtYmVycy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS52b2lkZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA+IDAgJiYgbWFwcGVkTWVtYmVycy5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy5ub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1lbWJlcnM6IG1lbWJlcnNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1lbWJlcnM6IG1lbWJlcnNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFwSW5pdGlhbEdyb3VwKGdyb3VwKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgbWVtYmVyIG9mIGdyb3VwLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSAnJztcbiAgICAgICAgICAgIGlmIChtZW1iZXIudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lbWJlci52YWx1ZS51dWlkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lbWJlci52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyLmdyb3VwTWVtYmVycyAmJiBtZW1iZXIuZ3JvdXBNZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFttZW1iZXIuY29uY2VwdC51dWlkICsgJzonICsgdmFsdWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgbWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwUXVlc3Rpb246IGFueSA9IF8uZmluZChub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucywgeyBrZXk6IGtleSB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbFZhbHVlID0gdmFsdWVba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFtncm91cFF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCArICc6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBtb2RlbFZhbHVlXSA9IG1vZGVsVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2Ygbm9kZS5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZXMucHVzaCh7IHV1aWQ6IGdyb3VwLnV1aWQsIHZhbHVlOiB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVwZWF0aW5nTW9kZWwgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub2RlLm5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgcmVwZWF0aW5nTW9kZWwucHVzaCh7IHZhbHVlOiB0aGlzLm1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMoaW5pdGlhbFZhbHVlcywgcmVwZWF0aW5nTW9kZWwpO1xuICAgICAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMocmVwZWF0aW5nTW9kZWwsIGluaXRpYWxWYWx1ZXMpO1xuICAgICAgICBjb25zdCBncm91cENvbmNlcHQgPSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgbGV0IG5ld09ic1BheWxvYWQgPSBbXTtcbiAgICAgICAgaWYgKGRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMuY3JlYXRlR3JvdXBEZWxldGVkT2JzKGRlbGV0ZWQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkIG9mIGRlbGV0ZWRPYnMpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3T2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBuZXdPYnNQYXlsb2FkID0gdGhpcy5jcmVhdGVHcm91cE5ld09icyhuZXdPYnMsIGdyb3VwQ29uY2VwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdPYnNQYXlsb2FkID0gdGhpcy5jcmVhdGVHcm91cE5ld09icyhuZXdPYnMsIGdyb3VwQ29uY2VwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3T2JzUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgbmV3T2JzUGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxlZnRPdXRlckpvaW5BcnJheXMoZmlyc3QsIHNlY29uZCkge1xuICAgICAgICBjb25zdCB1bmlxdWUgPSBmaXJzdC5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuICFzZWNvbmQuc29tZShmdW5jdGlvbiAob2JqMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzRXF1YWwob2JqLnZhbHVlLCBvYmoyLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cE5ld09icyhwYXlsb2FkLCBncm91cENvbmNlcHQpIHtcbiAgICAgICAgY29uc3QgbmV3UGF5bG9hZCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG9icyBvZiBwYXlsb2FkKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cFBheWxvYWQgPSBbXTtcbiAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmNlcHQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBrZXkuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgICAgICBncm91cFBheWxvYWQucHVzaCh7IGNvbmNlcHQ6IGNvbmNlcHQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1BheWxvYWQucHVzaCh7IGNvbmNlcHQ6IGdyb3VwQ29uY2VwdCwgZ3JvdXBNZW1iZXJzOiBncm91cFBheWxvYWQgfSlcbiAgICAgICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3UGF5bG9hZDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cERlbGV0ZWRPYnMocGF5bG9hZCkge1xuICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgICAgICBkZWxldGVkT2JzLnB1c2goeyB1dWlkOiBkLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVsZXRlZE9icztcbiAgICB9XG5cbiAgICBnZXRFeGFjdFRpbWUoZGF0ZXRpbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGF0ZXRpbWUuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzT2JzKG9icywgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAob2JzLmNvbnRyb2wgJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcykge1xuICAgICAgICAgICAgY29uc3Qgb2JzVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgY29uY2VwdDogb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogKG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnICYmICF0aGlzLmlzRW1wdHkob2JzLmNvbnRyb2wudmFsdWUpKSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RXhhY3RUaW1lKG9icy5jb250cm9sLnZhbHVlKSA6IG9icy5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpcyA9IHRoaXMucHJvY2Vzc011bHRpU2VsZWN0KG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsIG9icy5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRJbml0aWFsID0gb2JzLmluaXRpYWxWYWx1ZS5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHV1aWQ6IGEudXVpZCwgdmFsdWU6IHsgY29uY2VwdDogYS5jb25jZXB0LnV1aWQsIHZhbHVlOiBhLnZhbHVlLnV1aWQgfSB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQ3VycmVudCA9IG11bHRpcy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBhIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKG1hcHBlZEluaXRpYWwsIG1hcHBlZEN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMobWFwcGVkQ3VycmVudCwgbWFwcGVkSW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RlbGV0ZWRNdWx0aVNlbGVjdE9icyhkZWxldGVkT2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobmV3T2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhtdWx0aXMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUgJiYgb2JzLmluaXRpYWxWYWx1ZS52YWx1ZSAmJiBvYnNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9yVm9pZE9icyhvYnNWYWx1ZSwgb2JzLmluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYnNWYWx1ZS52YWx1ZSAhPT0gJycgJiYgb2JzVmFsdWUudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG9ic1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgICAgIGxldCBkYXRlRmllbGQ6IGFueTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlRmllbGQpIHtcbiAgICAgICAgICAgIC8vIHByb2Nlc3Mgb2JzIGFzIHVzdWFsXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NPYnModmFsdWVGaWVsZCwgb2JzUGF5bG9hZCk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiB0aGUgbGFzdCBpbnNlcnRlZCBvYnMgYW5kIHNldCB0aGUgb2JzRGF0ZXRpbWVcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRQYXlsb2FkID0gb2JzUGF5bG9hZC5sZW5ndGggPiAwID8gb2JzUGF5bG9hZFtvYnNQYXlsb2FkLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGNyZWF0ZWRQYXlsb2FkICYmXG4gICAgICAgICAgICAgICAgKChjcmVhdGVkUGF5bG9hZC5jb25jZXB0ICYmIGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsdWVGaWVsZC5pbml0aWFsVmFsdWUgJiYgY3JlYXRlZFBheWxvYWQudXVpZCA9PT0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWUub2JzVXVpZCkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVGaWVsZC5pbml0aWFsVmFsdWUgJiYgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUgIT09IGRhdGVGaWVsZC5pbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZFBheWxvYWQub2JzRGF0ZXRpbWUgPSBkYXRlRmllbGQuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzRGVsZXRlZE11bHRpU2VsZWN0T2JzKHZhbHVlcywgb2JzUGF5bG9hZCkge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogdmFsdWUudXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKHZhbHVlcywgb2JzUGF5bG9hZCkge1xuICAgICAgICBmb3IgKGNvbnN0IG11bHRpIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKG11bHRpLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU9yVm9pZE9icyhvYnNWYWx1ZSwgaW5pdGlhbFZhbHVlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1ZhbHVlLnZhbHVlKSAmJiBpbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IGluaXRpYWxWYWx1ZS5vYnNVdWlkLCB2YWx1ZTogb2JzVmFsdWUudmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSA9PT0gW10gfHxcbiAgICAgICAgICAgIC8vIHZhbHVlID09PSB7fVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgICAgICBjb25zdCBxdWVzdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBwYWdlOiBwYWdlLCBsYWJlbDogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLmxhYmVsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBzZWN0aW9uOiBzZWN0aW9uLCBub2RlOiBvLmNoaWxkcmVuW2tleV0sIGxhYmVsOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ubGFiZWwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHFzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHJlcCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgcHJvY2Vzc011bHRpU2VsZWN0KGNvbmNlcHQsIHZhbHVlcykge1xuICAgICAgICBjb25zdCBtdWx0aVNlbGVjdE9icyA9IFtdO1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IGNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbXVsdGlTZWxlY3RPYnMucHVzaChvYnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtdWx0aVNlbGVjdE9icztcbiAgICB9XG5cblxuICAgIGlzT2JzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyk7XG4gICAgfVxuXG4gICAgZ2V0T2JzUGF5bG9hZChub2Rlcykge1xuICAgICAgICBjb25zdCBvYnNQYXlsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NHcm91cChub2RlLCBvYnNQYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgKG5vZGUgYXMgR3JvdXBOb2RlKS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21wbGV4T2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc09icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic1BheWxvYWQ7XG4gICAgfVxufVxuIl19