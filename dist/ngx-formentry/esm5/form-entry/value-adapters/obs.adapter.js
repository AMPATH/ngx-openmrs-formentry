/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    var groupObs = _.find(payload, (/**
                     * @param {?} o
                     * @return {?}
                     */
                    function (o) {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    }));
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
            var obs = _.find(payload, (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            }));
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
            var multiObs = _.filter(payload, (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            }));
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
        var obs = _.find(payload, (/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        }));
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
        var groupRepeatingObs = _.filter(payload, (/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            /** @type {?} */
            var found = o.concept.uuid === node.question.extras.questionOptions.concept;
            /** @type {?} */
            var intersect = false;
            if (found && o.groupMembers) {
                /** @type {?} */
                var obs = o.groupMembers.map((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    return a.concept.uuid;
                }));
                /** @type {?} */
                var schemaQuestions = node.question.questions.map((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    return a.extras.questionOptions.concept;
                }));
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        }));
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
            var children = Object.keys(child.children).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return child.children[key]; }));
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
            var members = _.filter(this.getObsPayload(obs.groupMembers), (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o.value !== '';
            }));
            /** @type {?} */
            var mappedMembers = members.map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) {
                return a.voided;
            }));
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
        var unique = first.filter((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return !second.some((/**
             * @param {?} obj2
             * @return {?}
             */
            function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            }));
        }));
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
                    var mappedInitial = obs.initialValue.map((/**
                     * @param {?} a
                     * @return {?}
                     */
                    function (a) {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    }));
                    /** @type {?} */
                    var mappedCurrent = multis.map((/**
                     * @param {?} a
                     * @return {?}
                     */
                    function (a) {
                        return { value: a };
                    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sQ0FBQztBQUVkLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFHSSx5QkFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDOzs7OztJQUVqRCw2Q0FBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBVTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsNENBQTRDO0lBQ2hELENBQUM7Ozs7OztJQUVELHNDQUFZOzs7OztJQUFaLFVBQWEsSUFBVSxFQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiwwQ0FBMEM7SUFDOUMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSw0QkFBNEI7Ozs7Ozs7OztJQUU1QixtQ0FBUzs7Ozs7Ozs7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OGZ6QixzQkFBQztDQUFBLEFBNWZELElBNGZDO1NBM2ZZLGVBQWU7Ozs7OztJQUVaLGlDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi9vYnMtYWRhcHRlci1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2JzVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaGVscGVyOiBPYnNBZGFwdGVySGVscGVyKSB7IH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWxwZXIuZ2V0T2JzTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAgICAgLy8gLy8gVHJhdmVyc2UgIHRvIGdldCBhbGwgbm9kZXNcbiAgICAgICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAgICAgLy8gbGV0IHF1ZXN0aW9uTm9kZXMgPSB0aGlzLmdldFF1ZXN0aW9uTm9kZXMocGFnZXMpO1xuICAgICAgICAvLyAvLyBHZXQgb2JzIFBheWxvYWRcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuZ2V0T2JzUGF5bG9hZChxdWVzdGlvbk5vZGVzKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLmhlbHBlci5zZXROb2RlVmFsdWUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG5cbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgICAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgICAgICAvLyBsZXQgcGFnZXMgPSB0aGlzLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgICAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3Qgc2V0IG9ic1xuICAgICAgICAvLyB0aGlzLnNldFZhbHVlcyhxdWVzdGlvbk5vZGVzLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIGFsbCB0aGUgZnVuY3Rpb25zIGJlbG93IGFzIHRoZXkgd2lsbCBub3QgYmUgbmVlZGVkXG4gICAgLy8gb25jZSB0aGUgaGVscGVyIGlzIHN0YWJsZVxuXG4gICAgc2V0VmFsdWVzKG5vZGVzLCBwYXlsb2FkPywgZm9yY2Vncm91cD8pIHtcbiAgICAgICAgaWYgKG5vZGVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcgfHwgZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmIG8uZ3JvdXBNZW1iZXJzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwT2JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlWydpbml0aWFsVmFsdWUnXSA9IGdyb3VwT2JzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlcyhub2RlLmdyb3VwTWVtYmVycywgZ3JvdXBPYnMuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2Vncm91cCAmJiBub2RlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzKG5vZGUuZ3JvdXBNZW1iZXJzLCBub2RlLnBheWxvYWQuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVwZWF0aW5nJyAmJiAhZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPYnNWYWx1ZShub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpKSAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnbXVsdGktc2VsZWN0Jykge1xuICAgICAgICAgICAgY29uc3Qgb2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAob2JzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IHsgb2JzVXVpZDogb2JzLnV1aWQsIHZhbHVlOiBvYnMudmFsdWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpT2JzID0gXy5maWx0ZXIocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtdWx0aU9icyAmJiBtdWx0aU9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpKTtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gbXVsdGlPYnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogYW55O1xuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdGhlIHVzdWFsIG9icyB2YWx1ZVxuICAgICAgICB0aGlzLnNldE9ic1ZhbHVlKHZhbHVlRmllbGQsIHBheWxvYWQpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgb2JzIGRhdGVcbiAgICAgICAgY29uc3Qgb2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgICAgIGRhdGVGaWVsZFsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLm9ic0RhdGV0aW1lIH07XG4gICAgICAgICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnNldFZhbHVlKG9icy5vYnNEYXRldGltZSk7XG4gICAgICAgICAgICAoZGF0ZUZpZWxkIGFzIExlYWZOb2RlKS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE11bHRpc2VsZWN0VmFsdWVzKG11bHRpT2JzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG0gb2YgbXVsdGlPYnMpIHtcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG0udmFsdWUudXVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICBzZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwUmVwZWF0aW5nT2JzID0gXy5maWx0ZXIocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICBsZXQgaW50ZXJzZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZm91bmQgJiYgby5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSBvLmdyb3VwTWVtYmVycy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuY29uY2VwdC51dWlkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hUXVlc3Rpb25zID0gbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGludGVyc2VjdCA9IChfLmludGVyc2VjdGlvbihvYnMsIHNjaGVtYVF1ZXN0aW9ucykubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm91bmQgJiYgaW50ZXJzZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cFJlcGVhdGluZ09icztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBzID0gW107XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IE9iamVjdC5rZXlzKGNoaWxkLmNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY2hpbGQuY2hpbGRyZW5ba2V5XTsgfSk7XG4gICAgICAgICAgICBjb25zdCBncm91cFBheWxvYWQgPSBncm91cFJlcGVhdGluZ09ic1tpbmRleF07XG4gICAgICAgICAgICBncm91cHMucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IGNoaWxkcmVuLCBwYXlsb2FkOiBncm91cFBheWxvYWQgfSk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0VmFsdWVzKGdyb3VwcywgZ3JvdXBSZXBlYXRpbmdPYnMsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFF1ZXN0aW9uTm9kZXMocGFnZXMpIHtcbiAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgIGNvbnN0IGFycmF5cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBwYWdlLnBhZ2UpIHtcbiAgICAgICAgICAgICAgICBhcnJheXMucHVzaChzZWN0aW9uLnNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xuICAgIH1cblxuICAgIHJlcGVhdGluZ0dyb3VwKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IHRvUmV0dXJuID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgdG9SZXR1cm4ucHVzaCh7IHF1ZXN0aW9uOiBub2RlLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHRoaXMudHJhdmVyc2Uobm9kZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cblxuICAgIHByb2Nlc3NHcm91cChvYnMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKG9icy5xdWVzdGlvbiAmJiBvYnMucXVlc3Rpb24uZXh0cmFzICYmIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgY29uc3QgbWVtYmVycyA9IF8uZmlsdGVyKHRoaXMuZ2V0T2JzUGF5bG9hZChvYnMuZ3JvdXBNZW1iZXJzKSwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnZhbHVlICE9PSAnJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtYXBwZWRNZW1iZXJzID0gbWVtYmVycy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS52b2lkZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA+IDAgJiYgbWFwcGVkTWVtYmVycy5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy5ub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1lbWJlcnM6IG1lbWJlcnNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1lbWJlcnM6IG1lbWJlcnNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFwSW5pdGlhbEdyb3VwKGdyb3VwKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgbWVtYmVyIG9mIGdyb3VwLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSAnJztcbiAgICAgICAgICAgIGlmIChtZW1iZXIudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lbWJlci52YWx1ZS51dWlkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lbWJlci52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyLmdyb3VwTWVtYmVycyAmJiBtZW1iZXIuZ3JvdXBNZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFttZW1iZXIuY29uY2VwdC51dWlkICsgJzonICsgdmFsdWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgbWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwUXVlc3Rpb246IGFueSA9IF8uZmluZChub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucywgeyBrZXk6IGtleSB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbFZhbHVlID0gdmFsdWVba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWxWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFtncm91cFF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCArICc6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBtb2RlbFZhbHVlXSA9IG1vZGVsVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2Ygbm9kZS5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZXMucHVzaCh7IHV1aWQ6IGdyb3VwLnV1aWQsIHZhbHVlOiB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVwZWF0aW5nTW9kZWwgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBub2RlLm5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgcmVwZWF0aW5nTW9kZWwucHVzaCh7IHZhbHVlOiB0aGlzLm1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMoaW5pdGlhbFZhbHVlcywgcmVwZWF0aW5nTW9kZWwpO1xuICAgICAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMocmVwZWF0aW5nTW9kZWwsIGluaXRpYWxWYWx1ZXMpO1xuICAgICAgICBjb25zdCBncm91cENvbmNlcHQgPSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgbGV0IG5ld09ic1BheWxvYWQgPSBbXTtcbiAgICAgICAgaWYgKGRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMuY3JlYXRlR3JvdXBEZWxldGVkT2JzKGRlbGV0ZWQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkIG9mIGRlbGV0ZWRPYnMpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3T2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBuZXdPYnNQYXlsb2FkID0gdGhpcy5jcmVhdGVHcm91cE5ld09icyhuZXdPYnMsIGdyb3VwQ29uY2VwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdPYnNQYXlsb2FkID0gdGhpcy5jcmVhdGVHcm91cE5ld09icyhuZXdPYnMsIGdyb3VwQ29uY2VwdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3T2JzUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgbmV3T2JzUGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxlZnRPdXRlckpvaW5BcnJheXMoZmlyc3QsIHNlY29uZCkge1xuICAgICAgICBjb25zdCB1bmlxdWUgPSBmaXJzdC5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuICFzZWNvbmQuc29tZShmdW5jdGlvbiAob2JqMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzRXF1YWwob2JqLnZhbHVlLCBvYmoyLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cE5ld09icyhwYXlsb2FkLCBncm91cENvbmNlcHQpIHtcbiAgICAgICAgY29uc3QgbmV3UGF5bG9hZCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG9icyBvZiBwYXlsb2FkKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cFBheWxvYWQgPSBbXTtcbiAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmNlcHQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBrZXkuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgICAgICAgICBncm91cFBheWxvYWQucHVzaCh7IGNvbmNlcHQ6IGNvbmNlcHQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1BheWxvYWQucHVzaCh7IGNvbmNlcHQ6IGdyb3VwQ29uY2VwdCwgZ3JvdXBNZW1iZXJzOiBncm91cFBheWxvYWQgfSlcbiAgICAgICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3UGF5bG9hZDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cERlbGV0ZWRPYnMocGF5bG9hZCkge1xuICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZCBvZiBwYXlsb2FkKSB7XG4gICAgICAgICAgICBkZWxldGVkT2JzLnB1c2goeyB1dWlkOiBkLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVsZXRlZE9icztcbiAgICB9XG5cbiAgICBnZXRFeGFjdFRpbWUoZGF0ZXRpbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGF0ZXRpbWUuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzT2JzKG9icywgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAob2JzLmNvbnRyb2wgJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcykge1xuICAgICAgICAgICAgY29uc3Qgb2JzVmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgY29uY2VwdDogb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogKG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnICYmICF0aGlzLmlzRW1wdHkob2JzLmNvbnRyb2wudmFsdWUpKSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RXhhY3RUaW1lKG9icy5jb250cm9sLnZhbHVlKSA6IG9icy5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpcyA9IHRoaXMucHJvY2Vzc011bHRpU2VsZWN0KG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsIG9icy5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRJbml0aWFsID0gb2JzLmluaXRpYWxWYWx1ZS5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHV1aWQ6IGEudXVpZCwgdmFsdWU6IHsgY29uY2VwdDogYS5jb25jZXB0LnV1aWQsIHZhbHVlOiBhLnZhbHVlLnV1aWQgfSB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQ3VycmVudCA9IG11bHRpcy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBhIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKG1hcHBlZEluaXRpYWwsIG1hcHBlZEN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMobWFwcGVkQ3VycmVudCwgbWFwcGVkSW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RlbGV0ZWRNdWx0aVNlbGVjdE9icyhkZWxldGVkT2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobmV3T2JzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhtdWx0aXMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUgJiYgb2JzLmluaXRpYWxWYWx1ZS52YWx1ZSAmJiBvYnNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9yVm9pZE9icyhvYnNWYWx1ZSwgb2JzLmluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYnNWYWx1ZS52YWx1ZSAhPT0gJycgJiYgb2JzVmFsdWUudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG9ic1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgICAgIGxldCBkYXRlRmllbGQ6IGFueTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlRmllbGQpIHtcbiAgICAgICAgICAgIC8vIHByb2Nlc3Mgb2JzIGFzIHVzdWFsXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NPYnModmFsdWVGaWVsZCwgb2JzUGF5bG9hZCk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiB0aGUgbGFzdCBpbnNlcnRlZCBvYnMgYW5kIHNldCB0aGUgb2JzRGF0ZXRpbWVcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWRQYXlsb2FkID0gb2JzUGF5bG9hZC5sZW5ndGggPiAwID8gb2JzUGF5bG9hZFtvYnNQYXlsb2FkLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGNyZWF0ZWRQYXlsb2FkICYmXG4gICAgICAgICAgICAgICAgKChjcmVhdGVkUGF5bG9hZC5jb25jZXB0ICYmIGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsdWVGaWVsZC5pbml0aWFsVmFsdWUgJiYgY3JlYXRlZFBheWxvYWQudXVpZCA9PT0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWUub2JzVXVpZCkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVGaWVsZC5pbml0aWFsVmFsdWUgJiYgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUgIT09IGRhdGVGaWVsZC5pbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZFBheWxvYWQub2JzRGF0ZXRpbWUgPSBkYXRlRmllbGQuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzRGVsZXRlZE11bHRpU2VsZWN0T2JzKHZhbHVlcywgb2JzUGF5bG9hZCkge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogdmFsdWUudXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKHZhbHVlcywgb2JzUGF5bG9hZCkge1xuICAgICAgICBmb3IgKGNvbnN0IG11bHRpIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKG11bHRpLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKG11bHRpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU9yVm9pZE9icyhvYnNWYWx1ZSwgaW5pdGlhbFZhbHVlLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1ZhbHVlLnZhbHVlKSAmJiBpbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IGluaXRpYWxWYWx1ZS5vYnNVdWlkLCB2YWx1ZTogb2JzVmFsdWUudmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSA9PT0gW10gfHxcbiAgICAgICAgICAgIC8vIHZhbHVlID09PSB7fVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShvLCB0eXBlPykge1xuICAgICAgICBjb25zdCBxdWVzdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBwYWdlOiBwYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBzZWN0aW9uOiBzZWN0aW9uIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IG5vZGU6IG8uY2hpbGRyZW5ba2V5XSwgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiBxcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVwID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuW2tleV0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IG5vZGU6IG8uY2hpbGRyZW5ba2V5XSwgcXVlc3Rpb246IG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiByZXAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlc3Rpb25zO1xuICAgIH1cblxuICAgIHByb2Nlc3NNdWx0aVNlbGVjdChjb25jZXB0LCB2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgbXVsdGlTZWxlY3RPYnMgPSBbXTtcbiAgICAgICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0ge1xuICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBjb25jZXB0LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0T2JzLnB1c2gob2JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXVsdGlTZWxlY3RPYnM7XG4gICAgfVxuXG5cbiAgICBpc09icyhub2RlKSB7XG4gICAgICAgIHJldHVybiAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgfHxcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpO1xuICAgIH1cblxuICAgIGdldE9ic1BheWxvYWQobm9kZXMpIHtcbiAgICAgICAgY29uc3Qgb2JzUGF5bG9hZCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT2JzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzLCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzR3JvdXAobm9kZSwgb2JzUGF5bG9hZCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzLCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmIChub2RlIGFzIEdyb3VwTm9kZSkucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ29tcGxleE9icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYnNQYXlsb2FkO1xuICAgIH1cbn1cbiJdfQ==