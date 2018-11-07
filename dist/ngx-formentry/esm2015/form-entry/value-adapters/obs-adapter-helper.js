/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from 'lodash';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
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
        const /** @type {?} */ found = [];
        if (!this.isObsNode(node)) {
            return found;
        }
        if (node instanceof LeafNode ||
            (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs')) {
            _.each(obsArray, (item) => {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            });
            return found;
        }
        // At this point the node is either a group or a repeating node
        const /** @type {?} */ childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
        if (childQuestionsUuids.length > 0) {
            _.each(obsArray, (obs) => {
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
    /**
     * @param {?} node
     * @return {?}
     */
    getChildQuestionsConceptUuids(node) {
        const /** @type {?} */ found = [];
        if (node.question.extras && node.question.extras.questions) {
            _.each(node.question.extras.questions, (question) => {
                if (question.questionOptions &&
                    question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            });
        }
        return found;
    }
    /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    getGroupMembersConceptUuids(obsWithGroupMembers) {
        const /** @type {?} */ found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers, (member) => {
                found.push(member.concept.uuid);
            });
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
        return subsetArray.every((element) => {
            return supersetArray.indexOf(element) >= 0;
        });
    }
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    setSimpleObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const /** @type {?} */ obsToUse = obs[0];
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
            const /** @type {?} */ obsUuids = [];
            for (const /** @type {?} */ m of obs) {
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
            let /** @type {?} */ valueField; // essential memmber
            let /** @type {?} */ dateField; // other member to be manipulated by user
            const /** @type {?} */ nodeAsGroup = (/** @type {?} */ (node));
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in nodeAsGroup.children) {
                if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }
                if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'obsDatetime') {
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
            const /** @type {?} */ groupNode = /** @type {?} */ (node);
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in groupNode.children) {
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
            const /** @type {?} */ arrayNode = /** @type {?} */ (node);
            arrayNode.initialValue = obs;
            for (let /** @type {?} */ i = 0; i < obs.length; i++) {
                const /** @type {?} */ createdNode = arrayNode.createChildNode();
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
                    const /** @type {?} */ groupNode = /** @type {?} */ (node);
                    // tslint:disable-next-line:forin
                    for (const /** @type {?} */ o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    for (let /** @type {?} */ i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                const /** @type {?} */ answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                const /** @type {?} */ multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                const /** @type {?} */ complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                const /** @type {?} */ groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                const /** @type {?} */ repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);
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
        const /** @type {?} */ obs = {
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
        let /** @type {?} */ valueField; // essential memmber
        let /** @type {?} */ dateField; // other member to be manipulated by user
        const /** @type {?} */ nodeAsGroup = (/** @type {?} */ (node));
        // tslint:disable-next-line:forin
        for (const /** @type {?} */ o in nodeAsGroup.children) {
            if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        const /** @type {?} */ valuePayload = this.getObsNodePayload(valueField);
        console.log('valuePayload', valuePayload);
        // set obs datetime for the generated payload
        if (valuePayload.length > 0) {
            valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
            return valuePayload[0];
        }
        else if (valuePayload.length === 0 && node.initialValue) {
            // determine if date changed
            if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                const /** @type {?} */ payload = {
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
        const /** @type {?} */ payload = [];
        const /** @type {?} */ existingUuids = [];
        // add voided obs i.e. deleted options
        if (Array.isArray(node.initialValue)) {
            _.each(node.initialValue, (item) => {
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
            _.each(node.control.value, (item) => {
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
    /**
     * @param {?} node
     * @return {?}
     */
    getGroupPayload(node) {
        const /** @type {?} */ nodeAsGroup = /** @type {?} */ (node);
        let /** @type {?} */ childrenPayload = [];
        _.each(nodeAsGroup.children, (child) => {
            const /** @type {?} */ payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        const /** @type {?} */ groupPayload = {
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
        const /** @type {?} */ nodeAsArray = /** @type {?} */ (node);
        let /** @type {?} */ childrenPayload = [];
        const /** @type {?} */ groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, (child) => {
            const /** @type {?} */ payload = this.getObsNodePayload(child);
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
            _.each(nodeAsArray.initialValue, (obs) => {
                if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                    const /** @type {?} */ voidedGroup = {
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
    /**
     * @param {?} node
     * @return {?}
     */
    getObsNodePayload(node) {
        let /** @type {?} */ payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const /** @type {?} */ groupNode = /** @type {?} */ (node);
                    // tslint:disable-next-line:forin
                    for (const /** @type {?} */ o in groupNode.children) {
                        const /** @type {?} */ groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    for (let /** @type {?} */ i = 0; i < arrayNode.children.length; i++) {
                        const /** @type {?} */ arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                const /** @type {?} */ simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                const /** @type {?} */ multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                const /** @type {?} */ complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                const /** @type {?} */ groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                const /** @type {?} */ repeatingGroupedObs = this.getRepeatingGroupPayload(node);
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
            const /** @type {?} */ formattedVal = moment(datetime).format();
            const /** @type {?} */ val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLHVCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsT0FBTyxFQUFZLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsTUFBTTtJQUNGO0tBRUM7Ozs7OztJQUVELHVCQUF1QixDQUFDLElBQWMsRUFBRSxRQUFvQjtRQUN4RCx1QkFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxRQUFRO1lBQ3hCLENBQUMsSUFBSSxZQUFZLFNBQVM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7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aW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5pbXBvcnQgeyBOb2RlQmFzZSwgQXJyYXlOb2RlLCBHcm91cE5vZGUsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBPYnNBZGFwdGVySGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGU6IE5vZGVCYXNlLCBvYnNBcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgICAgIGlmICghdGhpcy5pc09ic05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUgfHxcbiAgICAgICAgICAgIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykpIHtcbiAgICAgICAgICAgIF8uZWFjaChvYnNBcnJheSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb25jZXB0ICYmXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBub2RlIGlzIGVpdGhlciBhIGdyb3VwIG9yIGEgcmVwZWF0aW5nIG5vZGVcblxuICAgICAgICBjb25zdCBjaGlsZFF1ZXN0aW9uc1V1aWRzID0gdGhpcy5nZXRDaGlsZFF1ZXN0aW9uc0NvbmNlcHRVdWlkcyhub2RlKTtcbiAgICAgICAgaWYgKGNoaWxkUXVlc3Rpb25zVXVpZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgXy5lYWNoKG9ic0FycmF5LCAob2JzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5jb25jZXB0ICYmXG4gICAgICAgICAgICAgICAgICAgIG9icy5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkob2JzLmdyb3VwTWVtYmVycykgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1N1YnNldE9mKGNoaWxkUXVlc3Rpb25zVXVpZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnMpKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKG9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZTogTm9kZUJhc2UpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25zKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zICYmXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnNXaXRoR3JvdXBNZW1iZXJzKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JzV2l0aEdyb3VwTWVtYmVycy5ncm91cE1lbWJlcnMpKSB7XG4gICAgICAgICAgICBfLmVhY2gob2JzV2l0aEdyb3VwTWVtYmVycy5ncm91cE1lbWJlcnMsXG4gICAgICAgICAgICAgICAgKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKG1lbWJlci5jb25jZXB0LnV1aWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGlzT2JzTm9kZShub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJyk7XG4gICAgfVxuXG4gICAgaXNTdWJzZXRPZihzdXBlcnNldEFycmF5OiBBcnJheTxhbnk+LCBzdWJzZXRBcnJheTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoc3Vic2V0QXJyYXkubGVuZ3RoID09PSAwICYmIHN1cGVyc2V0QXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic2V0QXJyYXkuZXZlcnkoKGVsZW1lbnQpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlcnNldEFycmF5LmluZGV4T2YoZWxlbWVudCkgPj0gMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2ltcGxlT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG9ic1RvVXNlID0gb2JzWzBdO1xuXG4gICAgICAgICAgICAvLyBzZXQgaW5pdGlhbCB2YWx1ZVxuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBvYnNUb1VzZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRW1wdHkob2JzVG9Vc2UudmFsdWUpICYmIG9ic1RvVXNlLnZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAvLyBhbnN3ZXIgdG8gdGhlIG9icyBpcyBhIGNvbmNlcHQsIHVzZSB1dWlkIHZhbHVlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1RvVXNlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE11bHRpc2VsZWN0T2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzO1xuXG4gICAgICAgICAgICBjb25zdCBvYnNVdWlkcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtIG9mIG9icykge1xuICAgICAgICAgICAgICAgIG9ic1V1aWRzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNVdWlkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb21wbGV4T2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZUZpZWxkOiBMZWFmTm9kZTsgLy8gZXNzZW50aWFsIG1lbW1iZXJcbiAgICAgICAgICAgIGxldCBkYXRlRmllbGQ6IExlYWZOb2RlOyAvLyBvdGhlciBtZW1iZXIgdG8gYmUgbWFuaXB1bGF0ZWQgYnkgdXNlclxuXG4gICAgICAgICAgICBjb25zdCBub2RlQXNHcm91cCA9IChub2RlIGFzIEdyb3VwTm9kZSk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIG9icyB2YWx1ZSBoZXJlXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZSh2YWx1ZUZpZWxkLCBvYnMpO1xuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBkYXRlIHZhbHVlIGhlcmVcbiAgICAgICAgICAgIGRhdGVGaWVsZC5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUoZGF0ZUZpZWxkLCB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZS5vYnNEYXRldGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgIGdyb3VwTm9kZS5pbml0aWFsVmFsdWUgPSBvYnNbMF07XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShncm91cE5vZGUuY2hpbGRyZW5bb10sIG9ic1swXS5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UmVwZWF0aW5nR3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICBhcnJheU5vZGUuaW5pdGlhbFZhbHVlID0gb2JzO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNyZWF0ZWROb2RlID0gYXJyYXlOb2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBPYnNOb2RlVmFsdWUoY3JlYXRlZE5vZGUsIFtvYnNbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xuICAgICAgICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShncm91cE5vZGUuY2hpbGRyZW5bb10sIG9icyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoYXJyYXlOb2RlLmNoaWxkcmVuW2ldLCBvYnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NpbXBsZSc6XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuc3dlcmluZ09icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2ltcGxlT2JzTm9kZVZhbHVlKG5vZGUsIGFuc3dlcmluZ09icyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlzZWxlY3RPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNldE11bHRpc2VsZWN0T2JzTm9kZVZhbHVlKG5vZGUsIG11bHRpc2VsZWN0T2JzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlICdjb21wbGV4JzpcbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlLCBjb21wbGV4T2JzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHcm91cE9ic05vZGVWYWx1ZShub2RlLCBncm91cE9icyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXBlYXRpbmdHcm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVwZWF0aW5nR3JvdXBPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIHJlcGVhdGluZ0dyb3VwT2JzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBvYnMgbm9kZScsIG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZTogTm9kZUJhc2UsIHZhbHVlKSB7XG4gICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIC8vIFRPRE86IERldGVybWluZSBpZiB3ZSBuZWVkIHRoaXMgY2FsbFxuICAgICAgICAvLyBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGhhY2sgYW5kIHB1dCBpdCBpbiBhcHByb3ByaWF0ZSBwbGFjZVxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T2JzTm9kZVR5cGUobm9kZTogTm9kZUJhc2UpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5pc09ic05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUgJiZcbiAgICAgICAgICAgICAgICAoIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0JykgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtdWx0aXNlbGVjdCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NpbXBsZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnY29tcGxleCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZXBlYXRpbmdHcm91cCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZ3JvdXAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd25PYnMnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgfVxuXG4gICAgLy8gUEFZTE9BRCBHRU5FUkFUSU9OIEZVTkNUSU9OU1xuICAgIGdldFNpbXBsZU9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpOiBhbnkge1xuICAgICAgICAvLyBjaGVjayBmb3IgZW1wdHkgdmFsdWVzIGZpcnN0XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGNhc2UgZm9yIGV4aXN0aW5nIHZvaWRlZCBvYnNcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgZXhpc2l0aW5nLCB1bmNoYW5nZWQgdmFsdWVzXG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSAmJiAhdGhpcy5zaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbCBudW1iZXJzLCB0ZXh0LCBjb25jZXB0cyBhbnN3ZXJzIGFyZSBoYW5kbGVkIGluIHRoZSBzYW1lIHdheVxuICAgICAgICAvLyBubyBuZWVkIGZvciBmdXJ0aGVyIGZvcm1hdHRpbmcgaW4gdGhpcyBjYXNlXG4gICAgICAgIGNvbnN0IG9iczogYW55ID0ge1xuICAgICAgICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaGFuZGxlIGRhdGUgZmllbGRzXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIG9icy52YWx1ZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcobm9kZS5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgLy8gZm9yIGV4aXN0aW5nIGNhc2VzLCBkZWxldGUgY29uY2VwdCBwcm9wZXJ0eSwgYW5kIGFkZCB1dWlkXG4gICAgICAgICAgICBkZWxldGUgb2JzLmNvbmNlcHQ7XG4gICAgICAgICAgICBvYnMudXVpZCA9IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JzO1xuICAgIH1cblxuICAgIGdldENvbXBsZXhPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBMZWFmTm9kZTsgLy8gZXNzZW50aWFsIG1lbW1iZXJcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogTGVhZk5vZGU7IC8vIG90aGVyIG1lbWJlciB0byBiZSBtYW5pcHVsYXRlZCBieSB1c2VyXG5cbiAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSAobm9kZSBhcyBHcm91cE5vZGUpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWx1ZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKHZhbHVlRmllbGQpO1xuICAgICAgICBjb25zb2xlLmxvZygndmFsdWVQYXlsb2FkJywgdmFsdWVQYXlsb2FkKTtcblxuICAgICAgICAvLyBzZXQgb2JzIGRhdGV0aW1lIGZvciB0aGUgZ2VuZXJhdGVkIHBheWxvYWRcbiAgICAgICAgaWYgKHZhbHVlUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZVBheWxvYWRbMF0ub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVBheWxvYWRbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA9PT0gMCAmJiBub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGRhdGUgY2hhbmdlZFxuICAgICAgICAgICAgaWYgKCF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUsIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBheWxvYWQub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXVpZHMgPSBbXTtcblxuICAgICAgICAvLyBhZGQgdm9pZGVkIG9icyBpLmUuIGRlbGV0ZWQgb3B0aW9uc1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlLmluaXRpYWxWYWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1V1aWRzLnB1c2goaXRlbS52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUuaW5kZXhPZihpdGVtLnZhbHVlLnV1aWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZXJ5IHZhbHVlIHdhcyBkZWxldGVkXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgbmV3IG9icyBpLmUgdGhleSBkaWRuJ3QgZXhpc2l0IG9yaWdpbmFsbHlcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUuY29udHJvbC52YWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVdWlkcy5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIGdldEdyb3VwUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBub2RlQXNHcm91cDogR3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuUGF5bG9hZCA9IFtdO1xuICAgICAgICBfLmVhY2gobm9kZUFzR3JvdXAuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZCA9IGNoaWxkcmVuUGF5bG9hZC5jb25jYXQocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlblBheWxvYWRcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBncm91cFBheWxvYWQudXVpZCA9IG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZS51dWlkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cFBheWxvYWQuY29uY2VwdCA9IG5vZGVBc0dyb3VwLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cFBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVBc0FycmF5OiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG5cbiAgICAgICAgY29uc3QgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nID0gW107XG4gICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGlsZC5pbml0aWFsVmFsdWUgJiYgY2hpbGQuaW5pdGlhbFZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcucHVzaChjaGlsZC5pbml0aWFsVmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHZvaWQgZGVsZXRlZCBncm91cHNcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2dyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZycsIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyk7XG4gICAgICAgIGlmIChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheShub2RlQXNBcnJheS5pbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlLCAob2JzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5pbmRleE9mKG9icy51dWlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgdm9pZGVkR3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQucHVzaCh2b2lkZWRHcm91cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW5QYXlsb2FkO1xuXG4gICAgfVxuXG4gICAgZ2V0T2JzTm9kZVBheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IHBheWxvYWQgPSBbXTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlUGF5b2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChncm91cE5vZGUuY2hpbGRyZW5bb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZ3JvdXBOb2RlUGF5b2FkKSAmJiBncm91cE5vZGVQYXlvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChncm91cE5vZGVQYXlvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGFycmF5Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheU5vZGVQYXlsb2FkKSAmJiBhcnJheU5vZGVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQoYXJyYXlOb2RlUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICAgICAgICBjb25zdCBzaW1wbGVPYnMgPSB0aGlzLmdldFNpbXBsZU9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXBsZU9icyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goc2ltcGxlT2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobXVsdGlzZWxlY3RPYnMpICYmIG11bHRpc2VsZWN0T2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KG11bHRpc2VsZWN0T2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmdldENvbXBsZXhPYnNQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV4T2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChjb21wbGV4T2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkT2JzID0gdGhpcy5nZXRHcm91cFBheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwZWRPYnMgJiYgZ3JvdXBlZE9icyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goZ3JvdXBlZE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwZWRPYnMgPSB0aGlzLmdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXBlYXRpbmdHcm91cGVkT2JzKSAmJiByZXBlYXRpbmdHcm91cGVkT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KHJlcGVhdGluZ0dyb3VwZWRPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBzaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAvLyBxdWVzdGlvbiB3aG9zZSBhbnN3ZXIgaXMgYSBjb25jZXB0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5hcmVEYXRlc0VxdWFsKG5vZGUuY29udHJvbC52YWx1ZSwgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFyZURhdGVzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZTEpLmlzU2FtZShkYXRlMik7XG4gICAgfVxuXG4gICAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZXRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoZGF0ZXRpbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdHJhbnNmb3JtIHZhbHVlIHRvIG1lbW9lbnQgdmFsdWUgdG8gYXZvaWQgZXJyb3JcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IG1vbWVudChkYXRldGltZSkuZm9ybWF0KCk7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSBmb3JtYXR0ZWRWYWwuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRW1wdHkodmFsKSA/IHVuZGVmaW5lZCA6IHZhbDtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=