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
            value === undefined) {
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
    { type: Injectable },
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxDQUFDO0FBRWQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxNQUFNOzs7O0lBRUYsWUFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDOzs7OztJQUVqRCxtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiw0Q0FBNEM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzlDLENBQUM7Ozs7Ozs7OztJQUtELFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBUSxFQUFFLFVBQVc7UUFDbEMsRUFBRSxDQUFDLENB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QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7OztZQTNmSixVQUFVOzs7WUFGRixnQkFBZ0I7Ozs7Ozs7SUFLVCxpQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ3J4anMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IExlYWZOb2RlLCBHcm91cE5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzQWRhcHRlckhlbHBlciB9IGZyb20gJy4vb2JzLWFkYXB0ZXItaGVscGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9ic1ZhbHVlQWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhlbHBlcjogT2JzQWRhcHRlckhlbHBlcikgeyB9XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVscGVyLmdldE9ic05vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoZSBzZWN0aW9uIGJlbG93IHdoZW4gdGhlIGhlbHBlciBpcyBzdGFibGUuXG4gICAgICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3QgYWN0dWFsIHF1ZXN0aW9uIG5vZGVzXG4gICAgICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAgICAgLy8gLy8gR2V0IG9icyBQYXlsb2FkXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmdldE9ic1BheWxvYWQocXVlc3Rpb25Ob2Rlcyk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5oZWxwZXIuc2V0Tm9kZVZhbHVlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAgICAgLy8gLy8gVHJhdmVyc2UgIHRvIGdldCBhbGwgbm9kZXNcbiAgICAgICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAgICAgLy8gbGV0IHF1ZXN0aW9uTm9kZXMgPSB0aGlzLmdldFF1ZXN0aW9uTm9kZXMocGFnZXMpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IHNldCBvYnNcbiAgICAgICAgLy8gdGhpcy5zZXRWYWx1ZXMocXVlc3Rpb25Ob2RlcywgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogR2V0IHJpZCBvZiBhbGwgdGhlIGZ1bmN0aW9ucyBiZWxvdyBhcyB0aGV5IHdpbGwgbm90IGJlIG5lZWRlZFxuICAgIC8vIG9uY2UgdGhlIGhlbHBlciBpcyBzdGFibGVcblxuICAgIHNldFZhbHVlcyhub2RlcywgcGF5bG9hZD8sIGZvcmNlZ3JvdXA/KSB7XG4gICAgICAgIGlmIChub2Rlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZ3JvdXAnIHx8IGZvcmNlZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJiBvLmdyb3VwTWVtYmVycztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cE9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBncm91cE9icztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIGdyb3VwT2JzLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlZ3JvdXAgJiYgbm9kZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlcyhub2RlLmdyb3VwTWVtYmVycywgbm9kZS5wYXlsb2FkLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb21wbGV4T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlcGVhdGluZycgJiYgIWZvcmNlZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cFZhbHVlcyhub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSkgJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgIT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpLXNlbGVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9icykge1xuICAgICAgICAgICAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG9icy52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLnZhbHVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtdWx0aU9icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobXVsdGlPYnMgJiYgbXVsdGlPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLmdldE11bHRpc2VsZWN0VmFsdWVzKG11bHRpT2JzKSk7XG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG11bHRpT2JzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tcGxleE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHRoZSB1c3VhbCBvYnMgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRPYnNWYWx1ZSh2YWx1ZUZpZWxkLCBwYXlsb2FkKTtcblxuICAgICAgICAvLyBzZXQgdGhlIG9icyBkYXRlXG4gICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JzKSB7XG4gICAgICAgICAgICBkYXRlRmllbGRbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy5vYnNEYXRldGltZSB9O1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC5zZXRWYWx1ZShvYnMub2JzRGF0ZXRpbWUpO1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIG11bHRpT2JzKSB7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgc2V0UmVwZWF0aW5nR3JvdXBWYWx1ZXMobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBjb25zdCBncm91cFJlcGVhdGluZ09icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgbGV0IGludGVyc2VjdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZvdW5kICYmIG8uZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0gby5ncm91cE1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmNvbmNlcHQudXVpZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVF1ZXN0aW9ucyA9IG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QgPSAoXy5pbnRlcnNlY3Rpb24ob2JzLCBzY2hlbWFRdWVzdGlvbnMpLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kICYmIGludGVyc2VjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChncm91cFJlcGVhdGluZ09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLm5vZGVbJ2luaXRpYWxWYWx1ZSddID0gZ3JvdXBSZXBlYXRpbmdPYnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3Qua2V5cyhjaGlsZC5jaGlsZHJlbikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNoaWxkLmNoaWxkcmVuW2tleV07IH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gZ3JvdXBSZXBlYXRpbmdPYnNbaW5kZXhdO1xuICAgICAgICAgICAgZ3JvdXBzLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlbiwgcGF5bG9hZDogZ3JvdXBQYXlsb2FkIH0pO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFZhbHVlcyhncm91cHMsIGdyb3VwUmVwZWF0aW5nT2JzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICBjb25zdCBhcnJheXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgcGFnZS5wYWdlKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlzLnB1c2goc2VjdGlvbi5zZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgICB9XG5cbiAgICByZXBlYXRpbmdHcm91cChub2Rlcykge1xuICAgICAgICBjb25zdCB0b1JldHVybiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICB9XG5cbiAgICBwcm9jZXNzR3JvdXAob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmIChvYnMucXVlc3Rpb24gJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcyAmJiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnMgPSBfLmZpbHRlcih0aGlzLmdldE9ic1BheWxvYWQob2JzLmdyb3VwTWVtYmVycyksIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby52YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWFwcGVkTWVtYmVycyA9IG1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudm9pZGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobWVtYmVycy5sZW5ndGggPiAwICYmIG1hcHBlZE1lbWJlcnMuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChvYnMubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy5ub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcEluaXRpYWxHcm91cChncm91cCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IG1lbWJlciBvZiBncm91cC5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJyc7XG4gICAgICAgICAgICBpZiAobWVtYmVyLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWUudXVpZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlci5ncm91cE1lbWJlcnMgJiYgbWVtYmVyLmdyb3VwTWVtYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXMubWFwSW5pdGlhbEdyb3VwKGdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRbbWVtYmVyLmNvbmNlcHQudXVpZCArICc6JyArIHZhbHVlXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIG1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBhbnkgPSBfLmZpbmQobm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMsIHsga2V5OiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbZ3JvdXBRdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgKyAnOidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbW9kZWxWYWx1ZV0gPSBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIHByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWVzID0gW107XG4gICAgICAgIGlmIChub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzLnB1c2goeyB1dWlkOiBncm91cC51dWlkLCB2YWx1ZTogdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcGVhdGluZ01vZGVsID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygbm9kZS5ub2RlLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIHJlcGVhdGluZ01vZGVsLnB1c2goeyB2YWx1ZTogdGhpcy5tYXBNb2RlbEdyb3VwKG5vZGUsIHZhbHVlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWxldGVkID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKGluaXRpYWxWYWx1ZXMsIHJlcGVhdGluZ01vZGVsKTtcbiAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKHJlcGVhdGluZ01vZGVsLCBpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgY29uc3QgZ3JvdXBDb25jZXB0ID0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIGxldCBuZXdPYnNQYXlsb2FkID0gW107XG4gICAgICAgIGlmIChkZWxldGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSB0aGlzLmNyZWF0ZUdyb3VwRGVsZXRlZE9icyhkZWxldGVkKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZCBvZiBkZWxldGVkT2JzKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld09ic1BheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIG5ld09ic1BheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZWZ0T3V0ZXJKb2luQXJyYXlzKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgY29uc3QgdW5pcXVlID0gZmlyc3QuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAhc2Vjb25kLnNvbWUoZnVuY3Rpb24gKG9iajIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc0VxdWFsKG9iai52YWx1ZSwgb2JqMi52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1bmlxdWU7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBOZXdPYnMocGF5bG9hZCwgZ3JvdXBDb25jZXB0KSB7XG4gICAgICAgIGNvbnN0IG5ld1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBvYnMgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gW107XG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9icy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25jZXB0ID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICAgICAgZ3JvdXBQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBjb25jZXB0LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBncm91cENvbmNlcHQsIGdyb3VwTWVtYmVyczogZ3JvdXBQYXlsb2FkIH0pXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1BheWxvYWQ7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBEZWxldGVkT2JzKHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGQgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgZGVsZXRlZE9icy5wdXNoKHsgdXVpZDogZC51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWRPYnM7XG4gICAgfVxuXG4gICAgZ2V0RXhhY3RUaW1lKGRhdGV0aW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGV0aW1lLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc09icyhvYnMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKG9icy5jb250cm9sICYmIG9icy5xdWVzdGlvbi5leHRyYXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9ic1ZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJyAmJiAhdGhpcy5pc0VtcHR5KG9icy5jb250cm9sLnZhbHVlKSkgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEV4YWN0VGltZShvYnMuY29udHJvbC52YWx1ZSkgOiBvYnMuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICAgIG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXMgPSB0aGlzLnByb2Nlc3NNdWx0aVNlbGVjdChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LCBvYnMuY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkSW5pdGlhbCA9IG9icy5pbml0aWFsVmFsdWUubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB1dWlkOiBhLnV1aWQsIHZhbHVlOiB7IGNvbmNlcHQ6IGEuY29uY2VwdC51dWlkLCB2YWx1ZTogYS52YWx1ZS51dWlkIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEN1cnJlbnQgPSBtdWx0aXMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogYSB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRJbml0aWFsLCBtYXBwZWRDdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKG1hcHBlZEN1cnJlbnQsIG1hcHBlZEluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnMoZGVsZXRlZE9icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKG5ld09icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobXVsdGlzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvYnMuaW5pdGlhbFZhbHVlICYmIG9icy5pbml0aWFsVmFsdWUudmFsdWUgJiYgb2JzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIG9icy5pbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JzVmFsdWUudmFsdWUgIT09ICcnICYmIG9ic1ZhbHVlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChvYnNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogYW55O1xuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZUZpZWxkKSB7XG4gICAgICAgICAgICAvLyBwcm9jZXNzIG9icyBhcyB1c3VhbFxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKHZhbHVlRmllbGQsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gdGhlIGxhc3QgaW5zZXJ0ZWQgb2JzIGFuZCBzZXQgdGhlIG9ic0RhdGV0aW1lXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkUGF5bG9hZCA9IG9ic1BheWxvYWQubGVuZ3RoID4gMCA/IG9ic1BheWxvYWRbb2JzUGF5bG9hZC5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChjcmVhdGVkUGF5bG9hZCAmJlxuICAgICAgICAgICAgICAgICgoY3JlYXRlZFBheWxvYWQuY29uY2VwdCAmJiBjcmVhdGVkUGF5bG9hZC5jb25jZXB0ID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlICYmIGNyZWF0ZWRQYXlsb2FkLnV1aWQgPT09IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic1V1aWQpKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlRmllbGQuaW5pdGlhbFZhbHVlICYmIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlICE9PSBkYXRlRmllbGQuaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLm9ic0RhdGV0aW1lID0gZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0RlbGV0ZWRNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IHZhbHVlLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChtdWx0aS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIGluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG9ic1ZhbHVlLnZhbHVlKSAmJiBpbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IGluaXRpYWxWYWx1ZS5vYnNVdWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbXB0eShvYnNWYWx1ZS52YWx1ZSkgJiYgaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiBpbml0aWFsVmFsdWUub2JzVXVpZCwgdmFsdWU6IG9ic1ZhbHVlLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UobywgdHlwZT8pIHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zID0gW107XG4gICAgICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWQgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgcGFnZTogcGFnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgc2VjdGlvbjogc2VjdGlvbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcmVwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBwcm9jZXNzTXVsdGlTZWxlY3QoY29uY2VwdCwgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IG11bHRpU2VsZWN0T2JzID0gW107XG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdE9icy5wdXNoKG9icyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG11bHRpU2VsZWN0T2JzO1xuICAgIH1cblxuXG4gICAgaXNPYnMobm9kZSkge1xuICAgICAgICByZXR1cm4gKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKTtcbiAgICB9XG5cbiAgICBnZXRPYnNQYXlsb2FkKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IG9ic1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc09icyhub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0dyb3VwKG5vZGUsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVwZWF0aW5nR3JvdXBzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiAobm9kZSBhcyBHcm91cE5vZGUpLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzUGF5bG9hZDtcbiAgICB9XG59XG4iXX0=