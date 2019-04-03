/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
export class ObsAdapterHelper {
    constructor() {
    }
    /**
     * @param {?} node
     * @param {?} obsArray
     * @return {?}
     */
    findObsAnswerToQuestion(node, obsArray) {
        /** @type {?} */
        const found = [];
        if (!this.isObsNode(node)) {
            return found;
        }
        if (node instanceof LeafNode ||
            (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs')) {
            _.each(obsArray, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            }));
            return found;
        }
        // At this point the node is either a group or a repeating node
        /** @type {?} */
        const childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
        if (childQuestionsUuids.length > 0) {
            _.each(obsArray, (/**
             * @param {?} obs
             * @return {?}
             */
            (obs) => {
                if (obs.concept &&
                    obs.concept.uuid === node.question.extras.questionOptions.concept &&
                    Array.isArray(obs.groupMembers) &&
                    this.isSubsetOf(childQuestionsUuids, this.getGroupMembersConceptUuids(obs))) {
                    found.push(obs);
                }
            }));
        }
        return found;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getChildQuestionsConceptUuids(node) {
        /** @type {?} */
        const found = [];
        if (node.question.extras && node.question.extras.questions) {
            _.each(node.question.extras.questions, (/**
             * @param {?} question
             * @return {?}
             */
            (question) => {
                if (question.questionOptions &&
                    question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            }));
        }
        return found;
    }
    /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    getGroupMembersConceptUuids(obsWithGroupMembers) {
        /** @type {?} */
        const found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers, (/**
             * @param {?} member
             * @return {?}
             */
            (member) => {
                found.push(member.concept.uuid);
            }));
        }
        return found;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isObsNode(node) {
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
    }
    /**
     * @param {?} supersetArray
     * @param {?} subsetArray
     * @return {?}
     */
    isSubsetOf(supersetArray, subsetArray) {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            return supersetArray.indexOf(element) >= 0;
        }));
    }
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setSimpleObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setMultiselectObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            node.initialValue = obs;
            /** @type {?} */
            const obsUuids = [];
            for (const m of obs) {
                obsUuids.push(m.value.uuid);
            }
            this.setNodeFormControlValue(node, obsUuids);
        }
    }
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setComplexObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            /** @type {?} */
            let valueField;
            // essential memmber
            /** @type {?} */
            let dateField;
            // other member to be manipulated by user
            /** @type {?} */
            const nodeAsGroup = ((/** @type {?} */ (node)));
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }
                if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
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
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            /** @type {?} */
            const groupNode = (/** @type {?} */ (node));
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (const o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setRepeatingGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            /** @type {?} */
            const arrayNode = (/** @type {?} */ (node));
            arrayNode.initialValue = obs;
            for (let i = 0; i < obs.length; i++) {
                /** @type {?} */
                const createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setNodeValue(node, obs) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    /** @type {?} */
                    const groupNode = (/** @type {?} */ (node));
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    const arrayNode = (/** @type {?} */ (node));
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                /** @type {?} */
                const answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                /** @type {?} */
                const multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                /** @type {?} */
                const complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                /** @type {?} */
                const groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setNodeFormControlValue(node, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();
        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
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
    /**
     * @param {?} node
     * @return {?}
     */
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
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    getComplexObsPayload(node) {
        /** @type {?} */
        let valueField;
        // essential memmber
        /** @type {?} */
        let dateField;
        // other member to be manipulated by user
        /** @type {?} */
        const nodeAsGroup = ((/** @type {?} */ (node)));
        // tslint:disable-next-line:forin
        for (const o in nodeAsGroup.children) {
            if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        /** @type {?} */
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
                /** @type {?} */
                const payload = {
                    uuid: node.initialValue.uuid,
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getMultiselectObsPayload(node) {
        /** @type {?} */
        const payload = [];
        /** @type {?} */
        const existingUuids = [];
        // add voided obs i.e. deleted options
        if (Array.isArray(node.initialValue)) {
            _.each(node.initialValue, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
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
            }));
        }
        // add new obs i.e they didn't exisit originally
        if (Array.isArray(node.control.value)) {
            _.each(node.control.value, (/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (existingUuids.indexOf(item) < 0) {
                    payload.push({
                        concept: node.question.extras.questionOptions.concept,
                        value: item
                    });
                }
            }));
        }
        return payload;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getGroupPayload(node) {
        /** @type {?} */
        const nodeAsGroup = (/** @type {?} */ (node));
        /** @type {?} */
        let childrenPayload = [];
        _.each(nodeAsGroup.children, (/**
         * @param {?} child
         * @return {?}
         */
        (child) => {
            /** @type {?} */
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        }));
        if (childrenPayload.length === 0) {
            return null;
        }
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    getRepeatingGroupPayload(node) {
        /** @type {?} */
        const nodeAsArray = (/** @type {?} */ (node));
        /** @type {?} */
        let childrenPayload = [];
        /** @type {?} */
        const groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, (/**
         * @param {?} child
         * @return {?}
         */
        (child) => {
            /** @type {?} */
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
            if (child.initialValue && child.initialValue.uuid) {
                groupsUuidsAfterEditting.push(child.initialValue.uuid);
            }
        }));
        // void deleted groups
        // console.log('groupsUuidsAfterEditting', groupsUuidsAfterEditting);
        if (nodeAsArray.initialValue && Array.isArray(nodeAsArray.initialValue)) {
            _.each(nodeAsArray.initialValue, (/**
             * @param {?} obs
             * @return {?}
             */
            (obs) => {
                if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                    /** @type {?} */
                    const voidedGroup = {
                        uuid: obs.uuid,
                        voided: true
                    };
                    childrenPayload.push(voidedGroup);
                }
            }));
        }
        if (childrenPayload.length <= 0) {
            return null;
        }
        return childrenPayload;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getObsNodePayload(node) {
        /** @type {?} */
        let payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    /** @type {?} */
                    const groupNode = (/** @type {?} */ (node));
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        /** @type {?} */
                        const groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    const arrayNode = (/** @type {?} */ (node));
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        /** @type {?} */
                        const arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                /** @type {?} */
                const simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                /** @type {?} */
                const multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                /** @type {?} */
                const complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                /** @type {?} */
                const groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
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
    /**
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    areDatesEqual(date1, date2) {
        return moment(date1).isSame(date2);
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
     * @param {?} datetime
     * @return {?}
     */
    toOpenMrsDateTimeString(datetime) {
        if (this.isEmpty(datetime)) {
            return undefined;
        }
        else {
            // transform value to memoent value to avoid error
            /** @type {?} */
            const formattedVal = moment(datetime).format();
            /** @type {?} */
            const val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOztNQUU1QixNQUFNLEdBQUcsT0FBTztBQUV0QixPQUFPLEVBQVksU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixNQUFNO0lBQ0Y7SUFFQSxDQUFDOzs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxJQUFjLEVBQUUsUUFBb0I7O2NBQ2xELEtBQUssR0FBRyxFQUFFO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFFBQVE7WUFDeEIsQ0FBQyxJQUFJLFlBQVksU0FBUztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVE7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDckUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIs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WixLQUFLLEtBQUssSUFBSTtZQUNkLEtBQUssS0FBSyxTQUdkLENBQUMsQ0FBQyxDQUFDO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLFFBQWdCO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDOzs7a0JBRUUsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7O2tCQUN4QyxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRS9DLENBQUM7SUFDTCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5pbXBvcnQgeyBOb2RlQmFzZSwgQXJyYXlOb2RlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgT2JzQWRhcHRlckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZTogTm9kZUJhc2UsIG9ic0FycmF5OiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzT2JzTm9kZShub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlIHx8XHJcbiAgICAgICAgICAgIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSkge1xyXG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb25jZXB0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBub2RlIGlzIGVpdGhlciBhIGdyb3VwIG9yIGEgcmVwZWF0aW5nIG5vZGVcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRRdWVzdGlvbnNVdWlkcyA9IHRoaXMuZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZSk7XHJcbiAgICAgICAgaWYgKGNoaWxkUXVlc3Rpb25zVXVpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChvYnMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvYnMuY29uY2VwdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9icy5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvYnMuZ3JvdXBNZW1iZXJzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdWJzZXRPZihjaGlsZFF1ZXN0aW9uc1V1aWRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gob2JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZTogTm9kZUJhc2UpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnNXaXRoR3JvdXBNZW1iZXJzKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JzV2l0aEdyb3VwTWVtYmVycy5ncm91cE1lbWJlcnMpKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycyxcclxuICAgICAgICAgICAgICAgIChtZW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKG1lbWJlci5jb25jZXB0LnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYnNOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXHJcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdWJzZXRPZihzdXBlcnNldEFycmF5OiBBcnJheTxhbnk+LCBzdWJzZXRBcnJheTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzdWJzZXRBcnJheS5sZW5ndGggPT09IDAgJiYgc3VwZXJzZXRBcnJheS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJzZXRBcnJheS5ldmVyeSgoZWxlbWVudCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXJzZXRBcnJheS5pbmRleE9mKGVsZW1lbnQpID49IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2ltcGxlT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYnNUb1VzZSA9IG9ic1swXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlXHJcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzVG9Vc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkgJiYgb2JzVG9Vc2UudmFsdWUudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYW5zd2VyIHRvIHRoZSBvYnMgaXMgYSBjb25jZXB0LCB1c2UgdXVpZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZS51dWlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JzVXVpZHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtIG9mIG9icykge1xyXG4gICAgICAgICAgICAgICAgb2JzVXVpZHMucHVzaChtLnZhbHVlLnV1aWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1V1aWRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxyXG4gICAgICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gKG5vZGUgYXMgR3JvdXBOb2RlKTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgb2JzIHZhbHVlIGhlcmVcclxuICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUodmFsdWVGaWVsZCwgb2JzKTtcclxuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZGF0ZSB2YWx1ZSBoZXJlXHJcbiAgICAgICAgICAgIGRhdGVGaWVsZC5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShkYXRlRmllbGQsIHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAgICAgICBncm91cE5vZGUuaW5pdGlhbFZhbHVlID0gb2JzWzBdO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnNbMF0uZ3JvdXBNZW1iZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XHJcbiAgICAgICAgICAgIGFycmF5Tm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9icy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3JlYXRlZE5vZGUgPSBhcnJheU5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKGNyZWF0ZWROb2RlLCBbb2JzW2ldXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcclxuICAgICAgICAgICAgY2FzZSAndW5rbm93bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoYXJyYXlOb2RlLmNoaWxkcmVuW2ldLCBvYnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5zd2VyaW5nT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZSwgYW5zd2VyaW5nT2JzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlzZWxlY3RPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE11bHRpc2VsZWN0T2JzTm9kZVZhbHVlKG5vZGUsIG11bHRpc2VsZWN0T2JzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2NvbXBsZXgnOlxyXG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlLCBjb21wbGV4T2JzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwT2JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIGdyb3VwT2JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcGVhdGluZ0dyb3VwT2JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIHJlcGVhdGluZ0dyb3VwT2JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vua25vd24gb2JzIG5vZGUnLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlOiBOb2RlQmFzZSwgdmFsdWUpIHtcclxuICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgIC8vIFRPRE86IERldGVybWluZSBpZiB3ZSBuZWVkIHRoaXMgY2FsbFxyXG4gICAgICAgIC8vIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGhhY2sgYW5kIHB1dCBpdCBpbiBhcHByb3ByaWF0ZSBwbGFjZVxyXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2JzTm9kZVR5cGUobm9kZTogTm9kZUJhc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT2JzTm9kZShub2RlKSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlICYmXHJcbiAgICAgICAgICAgICAgICAoIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxyXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdtdWx0aXNlbGVjdCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnc2ltcGxlJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcclxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnY29tcGxleCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZXBlYXRpbmdHcm91cCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2dyb3VwJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duT2JzJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQQVlMT0FEIEdFTkVSQVRJT04gRlVOQ1RJT05TXHJcbiAgICBnZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogYW55IHtcclxuICAgICAgICAvLyBjaGVjayBmb3IgZW1wdHkgdmFsdWVzIGZpcnN0XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShub2RlLmNvbnRyb2wudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGNhc2UgZm9yIGV4aXN0aW5nIHZvaWRlZCBvYnNcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcclxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgZXhpc2l0aW5nLCB1bmNoYW5nZWQgdmFsdWVzXHJcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlICYmICF0aGlzLnNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhbGwgbnVtYmVycywgdGV4dCwgY29uY2VwdHMgYW5zd2VycyBhcmUgaGFuZGxlZCBpbiB0aGUgc2FtZSB3YXlcclxuICAgICAgICAvLyBubyBuZWVkIGZvciBmdXJ0aGVyIGZvcm1hdHRpbmcgaW4gdGhpcyBjYXNlXHJcbiAgICAgICAgY29uc3Qgb2JzOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxyXG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIGRhdGUgZmllbGRzXHJcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xyXG4gICAgICAgICAgICBvYnMudmFsdWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKG5vZGUuY29udHJvbC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gZm9yIGV4aXN0aW5nIGNhc2VzLCBkZWxldGUgY29uY2VwdCBwcm9wZXJ0eSwgYW5kIGFkZCB1dWlkXHJcbiAgICAgICAgICAgIGRlbGV0ZSBvYnMuY29uY2VwdDtcclxuICAgICAgICAgICAgb2JzLnV1aWQgPSBub2RlLmluaXRpYWxWYWx1ZS51dWlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9icztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21wbGV4T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBMZWFmTm9kZTsgLy8gZXNzZW50aWFsIG1lbW1iZXJcclxuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSAobm9kZSBhcyBHcm91cE5vZGUpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcclxuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKHZhbHVlRmllbGQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2YWx1ZVBheWxvYWQnLCB2YWx1ZVBheWxvYWQpO1xyXG5cclxuICAgICAgICAvLyBzZXQgb2JzIGRhdGV0aW1lIGZvciB0aGUgZ2VuZXJhdGVkIHBheWxvYWRcclxuICAgICAgICBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFsdWVQYXlsb2FkWzBdLm9ic0RhdGV0aW1lID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRlRmllbGQuY29udHJvbC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVBheWxvYWRbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID09PSAwICYmIG5vZGUuaW5pdGlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSBpZiBkYXRlIGNoYW5nZWRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUsIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZC5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZDogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBleGlzdGluZ1V1aWRzID0gW107XHJcblxyXG4gICAgICAgIC8vIGFkZCB2b2lkZWQgb2JzIGkuZS4gZGVsZXRlZCBvcHRpb25zXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5pbml0aWFsVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChub2RlLmluaXRpYWxWYWx1ZSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nVXVpZHMucHVzaChpdGVtLnZhbHVlLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUuaW5kZXhPZihpdGVtLnZhbHVlLnV1aWQpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogaXRlbS51dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnkgdmFsdWUgd2FzIGRlbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBuZXcgb2JzIGkuZSB0aGV5IGRpZG4ndCBleGlzaXQgb3JpZ2luYWxseVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgXy5lYWNoKG5vZGUuY29udHJvbC52YWx1ZSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1V1aWRzLmluZGV4T2YoaXRlbSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXA6IEdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xyXG5cclxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XHJcbiAgICAgICAgXy5lYWNoKG5vZGVBc0dyb3VwLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xyXG4gICAgICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogY2hpbGRyZW5QYXlsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZSkge1xyXG4gICAgICAgICAgICBncm91cFBheWxvYWQudXVpZCA9IG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZS51dWlkO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBncm91cFBheWxvYWQuY29uY2VwdCA9IG5vZGVBc0dyb3VwLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBncm91cFBheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZUFzQXJyYXk6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyA9IFtdO1xyXG4gICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcclxuICAgICAgICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQuaW5pdGlhbFZhbHVlICYmIGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcucHVzaChjaGlsZC5pbml0aWFsVmFsdWUudXVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdm9pZCBkZWxldGVkIGdyb3Vwc1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcnLCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcpO1xyXG4gICAgICAgIGlmIChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheShub2RlQXNBcnJheS5pbml0aWFsVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUsIChvYnMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcuaW5kZXhPZihvYnMudXVpZCkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgdm9pZGVkR3JvdXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy51dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZC5wdXNoKHZvaWRlZEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hpbGRyZW5QYXlsb2FkO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRPYnNOb2RlUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGxldCBwYXlsb2FkID0gW107XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xyXG4gICAgICAgICAgICBjYXNlICd1bmtub3duJzpcclxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGVQYXlvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGdyb3VwTm9kZS5jaGlsZHJlbltvXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGdyb3VwTm9kZVBheW9hZCkgJiYgZ3JvdXBOb2RlUGF5b2FkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChncm91cE5vZGVQYXlvYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChhcnJheU5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheU5vZGVQYXlsb2FkKSAmJiBhcnJheU5vZGVQYXlsb2FkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChhcnJheU5vZGVQYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2ltcGxlT2JzID0gdGhpcy5nZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNpbXBsZU9icyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChzaW1wbGVPYnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG11bHRpc2VsZWN0T2JzKSAmJiBtdWx0aXNlbGVjdE9icy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KG11bHRpc2VsZWN0T2JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnY29tcGxleCc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5nZXRDb21wbGV4T2JzUGF5bG9hZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV4T2JzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKGNvbXBsZXhPYnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdncm91cCc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkT2JzID0gdGhpcy5nZXRHcm91cFBheWxvYWQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBlZE9icyAmJiBncm91cGVkT2JzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKGdyb3VwZWRPYnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwZWRPYnMgPSB0aGlzLmdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcGVhdGluZ0dyb3VwZWRPYnMpICYmIHJlcGVhdGluZ0dyb3VwZWRPYnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChyZXBlYXRpbmdHcm91cGVkT2JzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBzaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBxdWVzdGlvbiB3aG9zZSBhbnN3ZXIgaXMgYSBjb25jZXB0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuYXJlRGF0ZXNFcXVhbChub2RlLmNvbnRyb2wudmFsdWUsIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFyZURhdGVzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlMSkuaXNTYW1lKGRhdGUyKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fFxyXG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxyXG4gICAgICAgICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIC8vIHx8IHZhbHVlID09PSBbXSB8fFxyXG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRldGltZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KGRhdGV0aW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSB2YWx1ZSB0byBtZW1vZW50IHZhbHVlIHRvIGF2b2lkIGVycm9yXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IG1vbWVudChkYXRldGltZSkuZm9ybWF0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGZvcm1hdHRlZFZhbC5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0VtcHR5KHZhbCkgPyB1bmRlZmluZWQgOiB2YWw7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19