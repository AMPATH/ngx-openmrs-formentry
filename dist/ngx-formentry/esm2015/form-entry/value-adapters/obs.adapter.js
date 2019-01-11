/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import 'rxjs';
import * as _ from 'lodash';
import { LeafNode, GroupNode } from '../form-factory/form-node';
import { ObsAdapterHelper } from './obs-adapter-helper';
export class ObsValueAdapter {
    /**
     * @param {?} helper
     */
    constructor(helper) {
        this.helper = helper;
    }
    /**
     * @param {?} form
     * @return {?}
     */
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
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
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
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
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
                    /** @type {?} */
                    const groupObs = _.find(payload, (o) => {
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
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setObsValue(node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox' ||
            node.question.extras.questionOptions.rendering !== 'multi-select') {
            /** @type {?} */
            const obs = _.find(payload, (o) => {
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
            const multiObs = _.filter(payload, (o) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setComplexObsValue(node, payload) {
        /** @type {?} */
        let valueField;
        /** @type {?} */
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
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
        const obs = _.find(payload, (o) => {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            ((/** @type {?} */ (dateField))).control.setValue(obs.obsDatetime);
            ((/** @type {?} */ (dateField))).control.updateValueAndValidity();
        }
    }
    /**
     * @param {?} multiObs
     * @return {?}
     */
    getMultiselectValues(multiObs) {
        /** @type {?} */
        const values = [];
        for (const m of multiObs) {
            values.push(m.value.uuid);
        }
        return values;
    }
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setRepeatingGroupValues(node, payload) {
        /** @type {?} */
        const groupRepeatingObs = _.filter(payload, (o) => {
            /** @type {?} */
            const found = o.concept.uuid === node.question.extras.questionOptions.concept;
            /** @type {?} */
            let intersect = false;
            if (found && o.groupMembers) {
                /** @type {?} */
                const obs = o.groupMembers.map((a) => {
                    return a.concept.uuid;
                });
                /** @type {?} */
                const schemaQuestions = node.question.questions.map((a) => {
                    return a.extras.questionOptions.concept;
                });
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (let i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        /** @type {?} */
        const groups = [];
        /** @type {?} */
        let index = 0;
        for (const child of node.node.children) {
            /** @type {?} */
            const children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            /** @type {?} */
            const groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        }
        this.setValues(groups, groupRepeatingObs, true);
    }
    /**
     * @param {?} pages
     * @return {?}
     */
    getQuestionNodes(pages) {
        /** @type {?} */
        const merged = [];
        /** @type {?} */
        const arrays = [];
        for (const page of pages) {
            for (const section of page.page) {
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    repeatingGroup(nodes) {
        /** @type {?} */
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    processGroup(obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            /** @type {?} */
            const members = _.filter(this.getObsPayload(obs.groupMembers), (o) => {
                return o.value !== '';
            });
            /** @type {?} */
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
    /**
     * @param {?} group
     * @return {?}
     */
    mapInitialGroup(group) {
        /** @type {?} */
        let current = {};
        for (const member of group.groupMembers) {
            /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    mapModelGroup(node, value) {
        /** @type {?} */
        const current = {};
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                /** @type {?} */
                const groupQuestion = _.find(node.question.questions, { key: key });
                /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    processRepeatingGroups(node, obsPayload) {
        /** @type {?} */
        const initialValues = [];
        if (node.node.initialValue) {
            for (const group of node.node.initialValue) {
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        /** @type {?} */
        const repeatingModel = [];
        for (const value of node.node.control.value) {
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        /** @type {?} */
        const deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        /** @type {?} */
        const newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        /** @type {?} */
        const groupConcept = node.question.extras.questionOptions.concept;
        /** @type {?} */
        let newObsPayload = [];
        if (deleted.length > 0) {
            /** @type {?} */
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
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    leftOuterJoinArrays(first, second) {
        /** @type {?} */
        const unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    }
    /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    createGroupNewObs(payload, groupConcept) {
        /** @type {?} */
        const newPayload = [];
        for (const obs of payload) {
            /** @type {?} */
            const groupPayload = [];
            /* tslint:disable */
            for (let key in obs.value) {
                /** @type {?} */
                let concept = key.split(':')[0];
                /** @type {?} */
                let value = key.split(':')[1];
                groupPayload.push({ concept: concept, value: value });
            }
            newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
            /* tslint:enable */
        }
        return newPayload;
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    createGroupDeletedObs(payload) {
        /** @type {?} */
        const deletedObs = [];
        for (const d of payload) {
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    }
    /**
     * @param {?} datetime
     * @return {?}
     */
    getExactTime(datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    }
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    processObs(obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            /** @type {?} */
            const obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox' ||
                obs.question.extras.questionOptions.rendering === 'multi-select') {
                /** @type {?} */
                const multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    /** @type {?} */
                    const mappedInitial = obs.initialValue.map((a) => {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    /** @type {?} */
                    const mappedCurrent = multis.map((a) => {
                        return { value: a };
                    });
                    /** @type {?} */
                    const deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    processComplexObs(node, obsPayload) {
        /** @type {?} */
        let valueField;
        /** @type {?} */
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
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
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    processDeletedMultiSelectObs(values, obsPayload) {
        for (const value of values) {
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    }
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
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
    /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    updateOrVoidObs(obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
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
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    traverse(o, type) {
        /** @type {?} */
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
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
    /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    processMultiSelect(concept, values) {
        /** @type {?} */
        const multiSelectObs = [];
        if (values && values !== null) {
            for (const value of values) {
                /** @type {?} */
                const obs = {
                    concept: concept,
                    value: value
                };
                multiSelectObs.push(obs);
            }
        }
        return multiSelectObs;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isObs(node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    getObsPayload(nodes) {
        /** @type {?} */
        const obsPayload = [];
        for (const node of nodes) {
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
        return obsPayload;
    }
}
ObsValueAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ObsValueAdapter.ctorParameters = () => [
    { type: ObsAdapterHelper }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ObsValueAdapter.prototype.helper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxDQUFDO0FBRWQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxNQUFNLE9BQU8sZUFBZTs7OztJQUV4QixZQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7Ozs7O0lBRWpELG1CQUFtQixDQUFDLElBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiw0Q0FBNEM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzlDLENBQUM7Ozs7Ozs7OztJQUtELFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBUSxFQUFFLFVBQVc7UUFDbEMsSUFBSSxL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RUFBRSxVQUFVLENBQUMsQ0FBQztpQkFFdkM7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEtBQUssV0FBVyxFQUFFO29CQUMxRixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTSxJQUFJLElBQUksWUFBWSxTQUFTLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDaEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7OztZQTNmSixVQUFVOzs7O1lBRkYsZ0JBQWdCOzs7Ozs7O0lBS1QsaUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdyeGpzJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSwgR3JvdXBOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9ic0FkYXB0ZXJIZWxwZXIgfSBmcm9tICcuL29icy1hZGFwdGVyLWhlbHBlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYnNWYWx1ZUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwZXI6IE9ic0FkYXB0ZXJIZWxwZXIpIHsgfVxuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlbHBlci5nZXRPYnNOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgICAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgICAgICAvLyBsZXQgcGFnZXMgPSB0aGlzLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgICAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgICAgIC8vIC8vIEdldCBvYnMgUGF5bG9hZFxuICAgICAgICAvLyByZXR1cm4gdGhpcy5nZXRPYnNQYXlsb2FkKHF1ZXN0aW9uTm9kZXMpO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuaGVscGVyLnNldE5vZGVWYWx1ZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcblxuICAgICAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoZSBzZWN0aW9uIGJlbG93IHdoZW4gdGhlIGhlbHBlciBpcyBzdGFibGUuXG4gICAgICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3QgYWN0dWFsIHF1ZXN0aW9uIG5vZGVzXG4gICAgICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBzZXQgb2JzXG4gICAgICAgIC8vIHRoaXMuc2V0VmFsdWVzKHF1ZXN0aW9uTm9kZXMsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IEdldCByaWQgb2YgYWxsIHRoZSBmdW5jdGlvbnMgYmVsb3cgYXMgdGhleSB3aWxsIG5vdCBiZSBuZWVkZWRcbiAgICAvLyBvbmNlIHRoZSBoZWxwZXIgaXMgc3RhYmxlXG5cbiAgICBzZXRWYWx1ZXMobm9kZXMsIHBheWxvYWQ/LCBmb3JjZWdyb3VwPykge1xuICAgICAgICBpZiAobm9kZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJyB8fCBmb3JjZWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiYgby5ncm91cE1lbWJlcnM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBPYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVbJ2luaXRpYWxWYWx1ZSddID0gZ3JvdXBPYnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzKG5vZGUuZ3JvdXBNZW1iZXJzLCBncm91cE9icy5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZWdyb3VwICYmIG5vZGUucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucGF5bG9hZC5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGxleE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZXBlYXRpbmcnICYmICFmb3JjZWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVwZWF0aW5nR3JvdXBWYWx1ZXMobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icy1jaGlsZCcgJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykpICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgIT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgIT09ICdtdWx0aS1zZWxlY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUudXVpZCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG9icy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy52YWx1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlPYnMgPSBfLmZpbHRlcihwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG11bHRpT2JzICYmIG11bHRpT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5nZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykpO1xuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBtdWx0aU9icztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgICAgIGxldCBkYXRlRmllbGQ6IGFueTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB0aGUgdXN1YWwgb2JzIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0T2JzVmFsdWUodmFsdWVGaWVsZCwgcGF5bG9hZCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBvYnMgZGF0ZVxuICAgICAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9icykge1xuICAgICAgICAgICAgZGF0ZUZpZWxkWydpbml0aWFsVmFsdWUnXSA9IHsgb2JzVXVpZDogb2JzLnV1aWQsIHZhbHVlOiBvYnMub2JzRGF0ZXRpbWUgfTtcbiAgICAgICAgICAgIChkYXRlRmllbGQgYXMgTGVhZk5vZGUpLmNvbnRyb2wuc2V0VmFsdWUob2JzLm9ic0RhdGV0aW1lKTtcbiAgICAgICAgICAgIChkYXRlRmllbGQgYXMgTGVhZk5vZGUpLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBtdWx0aU9icykge1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBSZXBlYXRpbmdPYnMgPSBfLmZpbHRlcihwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZCA9IG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChmb3VuZCAmJiBvLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IG8uZ3JvdXBNZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5jb25jZXB0LnV1aWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFRdWVzdGlvbnMgPSBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0ID0gKF8uaW50ZXJzZWN0aW9uKG9icywgc2NoZW1hUXVlc3Rpb25zKS5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZCAmJiBpbnRlcnNlY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZS5ub2RlWydpbml0aWFsVmFsdWUnXSA9IGdyb3VwUmVwZWF0aW5nT2JzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cFJlcGVhdGluZ09icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gT2JqZWN0LmtleXMoY2hpbGQuY2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjaGlsZC5jaGlsZHJlbltrZXldOyB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IGdyb3VwUmVwZWF0aW5nT2JzW2luZGV4XTtcbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHsgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogY2hpbGRyZW4sIHBheWxvYWQ6IGdyb3VwUGF5bG9hZCB9KTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRWYWx1ZXMoZ3JvdXBzLCBncm91cFJlcGVhdGluZ09icywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgY29uc3QgYXJyYXlzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHBhZ2UucGFnZSkge1xuICAgICAgICAgICAgICAgIGFycmF5cy5wdXNoKHNlY3Rpb24uc2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lcmdlZC5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG4gICAgfVxuXG4gICAgcmVwZWF0aW5nR3JvdXAobm9kZXMpIHtcbiAgICAgICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICB0b1JldHVybi5wdXNoKHsgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogdGhpcy50cmF2ZXJzZShub2RlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuXG4gICAgcHJvY2Vzc0dyb3VwKG9icywgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAob2JzLnF1ZXN0aW9uICYmIG9icy5xdWVzdGlvbi5leHRyYXMgJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICBjb25zdCBtZW1iZXJzID0gXy5maWx0ZXIodGhpcy5nZXRPYnNQYXlsb2FkKG9icy5ncm91cE1lbWJlcnMpLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8udmFsdWUgIT09ICcnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hcHBlZE1lbWJlcnMgPSBtZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnZvaWRlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCAmJiBtYXBwZWRNZW1iZXJzLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXBJbml0aWFsR3JvdXAoZ3JvdXApIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBtZW1iZXIgb2YgZ3JvdXAuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9ICcnO1xuICAgICAgICAgICAgaWYgKG1lbWJlci52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlLnV1aWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXIuZ3JvdXBNZW1iZXJzICYmIG1lbWJlci5ncm91cE1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50W21lbWJlci5jb25jZXB0LnV1aWQgKyAnOicgKyB2YWx1ZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBtYXBNb2RlbEdyb3VwKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogYW55ID0gXy5maW5kKG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLCB7IGtleToga2V5IH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RlbFZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50W2dyb3VwUXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICsgJzonXG4gICAgICAgICAgICAgICAgICAgICAgICArIG1vZGVsVmFsdWVdID0gbW9kZWxWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBwcm9jZXNzUmVwZWF0aW5nR3JvdXBzKG5vZGUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAobm9kZS5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcy5wdXNoKHsgdXVpZDogZ3JvdXAudXVpZCwgdmFsdWU6IHRoaXMubWFwSW5pdGlhbEdyb3VwKGdyb3VwKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXBlYXRpbmdNb2RlbCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG5vZGUubm9kZS5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICByZXBlYXRpbmdNb2RlbC5wdXNoKHsgdmFsdWU6IHRoaXMubWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhpbml0aWFsVmFsdWVzLCByZXBlYXRpbmdNb2RlbCk7XG4gICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhyZXBlYXRpbmdNb2RlbCwgaW5pdGlhbFZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGdyb3VwQ29uY2VwdCA9IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICBsZXQgbmV3T2JzUGF5bG9hZCA9IFtdO1xuICAgICAgICBpZiAoZGVsZXRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5jcmVhdGVHcm91cERlbGV0ZWRPYnMoZGVsZXRlZCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGQgb2YgZGVsZXRlZE9icykge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdPYnNQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBuZXdPYnNQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGVmdE91dGVySm9pbkFycmF5cyhmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IHVuaXF1ZSA9IGZpcnN0LmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gIXNlY29uZC5zb21lKGZ1bmN0aW9uIChvYmoyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNFcXVhbChvYmoudmFsdWUsIG9iajIudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdW5pcXVlO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwTmV3T2JzKHBheWxvYWQsIGdyb3VwQ29uY2VwdCkge1xuICAgICAgICBjb25zdCBuZXdQYXlsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgb2JzIG9mIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IFtdO1xuICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBvYnMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY2VwdCA9IGtleS5zcGxpdCgnOicpWzBdO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGtleS5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgICAgIGdyb3VwUGF5bG9hZC5wdXNoKHsgY29uY2VwdDogY29uY2VwdCwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UGF5bG9hZC5wdXNoKHsgY29uY2VwdDogZ3JvdXBDb25jZXB0LCBncm91cE1lbWJlcnM6IGdyb3VwUGF5bG9hZCB9KVxuICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdQYXlsb2FkO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwRGVsZXRlZE9icyhwYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZWRPYnMucHVzaCh7IHV1aWQ6IGQudXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWxldGVkT2JzO1xuICAgIH1cblxuICAgIGdldEV4YWN0VGltZShkYXRldGltZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBkYXRldGltZS5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xuICAgIH1cblxuICAgIHByb2Nlc3NPYnMob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmIChvYnMuY29udHJvbCAmJiBvYnMucXVlc3Rpb24uZXh0cmFzKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiAob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScgJiYgIXRoaXMuaXNFbXB0eShvYnMuY29udHJvbC52YWx1ZSkpID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFeGFjdFRpbWUob2JzLmNvbnRyb2wudmFsdWUpIDogb2JzLmNvbnRyb2wudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aS1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlzID0gdGhpcy5wcm9jZXNzTXVsdGlTZWxlY3Qob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCwgb2JzLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChvYnMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEluaXRpYWwgPSBvYnMuaW5pdGlhbFZhbHVlLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdXVpZDogYS51dWlkLCB2YWx1ZTogeyBjb25jZXB0OiBhLmNvbmNlcHQudXVpZCwgdmFsdWU6IGEudmFsdWUudXVpZCB9IH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRDdXJyZW50ID0gbXVsdGlzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGEgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMobWFwcGVkSW5pdGlhbCwgbWFwcGVkQ3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRDdXJyZW50LCBtYXBwZWRJbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGVsZXRlZE11bHRpU2VsZWN0T2JzKGRlbGV0ZWRPYnMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhuZXdPYnMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKG11bHRpcywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSAmJiBvYnMuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG9ic1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT3JWb2lkT2JzKG9ic1ZhbHVlLCBvYnMuaW5pdGlhbFZhbHVlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9ic1ZhbHVlLnZhbHVlICE9PSAnJyAmJiBvYnNWYWx1ZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gob2JzVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NDb21wbGV4T2JzKG5vZGUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgICAgICAgLy8gcHJvY2VzcyBvYnMgYXMgdXN1YWxcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09icyh2YWx1ZUZpZWxkLCBvYnNQYXlsb2FkKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIHRoZSBsYXN0IGluc2VydGVkIG9icyBhbmQgc2V0IHRoZSBvYnNEYXRldGltZVxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZFBheWxvYWQgPSBvYnNQYXlsb2FkLmxlbmd0aCA+IDAgPyBvYnNQYXlsb2FkW29ic1BheWxvYWQubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY3JlYXRlZFBheWxvYWQgJiZcbiAgICAgICAgICAgICAgICAoKGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgJiYgY3JlYXRlZFBheWxvYWQuY29uY2VwdCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHx8XG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZSAmJiBjcmVhdGVkUGF5bG9hZC51dWlkID09PSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZS5vYnNVdWlkKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZSAmJiBkYXRlRmllbGQuY29udHJvbC52YWx1ZSAhPT0gZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkUGF5bG9hZC5vYnNEYXRldGltZSA9IGRhdGVGaWVsZC5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiB2YWx1ZS51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGZvciAoY29uc3QgbXVsdGkgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAobXVsdGkudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3JWb2lkT2JzKG9ic1ZhbHVlLCBpbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShvYnNWYWx1ZS52YWx1ZSkgJiYgaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiBpbml0aWFsVmFsdWUub2JzVXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZhbHVlOiBvYnNWYWx1ZS52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW1wdHkodmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgIC8vIHx8IHZhbHVlID09PSBbXSB8fFxuICAgICAgICAgICAgLy8gdmFsdWUgPT09IHt9XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyYXZlcnNlKG8sIHR5cGU/KSB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoby5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHBhZ2U6IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHNlY3Rpb246IHNlY3Rpb24gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHFzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHJlcCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgcHJvY2Vzc011bHRpU2VsZWN0KGNvbmNlcHQsIHZhbHVlcykge1xuICAgICAgICBjb25zdCBtdWx0aVNlbGVjdE9icyA9IFtdO1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IGNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbXVsdGlTZWxlY3RPYnMucHVzaChvYnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtdWx0aVNlbGVjdE9icztcbiAgICB9XG5cblxuICAgIGlzT2JzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyk7XG4gICAgfVxuXG4gICAgZ2V0T2JzUGF5bG9hZChub2Rlcykge1xuICAgICAgICBjb25zdCBvYnNQYXlsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NHcm91cChub2RlLCBvYnNQYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgKG5vZGUgYXMgR3JvdXBOb2RlKS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21wbGV4T2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc09icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic1BheWxvYWQ7XG4gICAgfVxufVxuIl19