import * as _ from 'lodash';
import * as moment_ from 'moment';
const moment = moment_;
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
export class ObsAdapterHelper {
    constructor() { }
    findObsAnswerToQuestion(node, obsArray) {
        const found = [];
        if (!this.isObsNode(node)) {
            return found;
        }
        if (node instanceof LeafNode ||
            (node instanceof GroupNode && node.question.extras.type === 'complex-obs')) {
            _.each(obsArray, (item) => {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            });
            return found;
        }
        // At this point the node is either a group or a repeating node
        const childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
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
    getChildQuestionsConceptUuids(node) {
        const found = [];
        if (node.question.extras && node.question.extras.questions) {
            _.each(node.question.extras.questions, (question) => {
                if (question.questionOptions && question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            });
        }
        return found;
    }
    getGroupMembersConceptUuids(obsWithGroupMembers) {
        const found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers, (member) => {
                found.push(member.concept.uuid);
            });
        }
        return found;
    }
    isObsNode(node) {
        return (node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child'));
    }
    isSubsetOf(supersetArray, subsetArray) {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every((element) => {
            return supersetArray.indexOf(element) >= 0;
        });
    }
    setSimpleObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
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
    setMultiselectObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            node.initialValue = obs;
            const obsUuids = [];
            for (const m of obs) {
                obsUuids.push(m.value.uuid);
            }
            this.setNodeFormControlValue(node, obsUuids);
        }
    }
    setComplexObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            let valueField; // essential memmber
            let dateField; // other member to be manipulated by user
            const nodeAsGroup = node;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
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
    }
    setGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const groupNode = node;
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (const o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    }
    setRepeatingGroupObsNodeValue(node, obs) {
        if (node && obs.length > 0) {
            const arrayNode = node;
            arrayNode.initialValue = obs;
            for (let i = 0; i < obs.length; i++) {
                const createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    }
    setNodeValue(node, obs) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                const answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                const multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                const complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                const groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
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
    setNodeFormControlValue(node, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();
        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue &&
            node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    }
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
    getComplexObsPayload(node) {
        let valueField; // essential memmber
        let dateField; // other member to be manipulated by user
        const nodeAsGroup = node;
        // tslint:disable-next-line:forin
        for (const o in nodeAsGroup.children) {
            if (nodeAsGroup.children[o].question.extras.questionOptions
                .obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (nodeAsGroup.children[o].question.extras.questionOptions
                .obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
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
                const payload = {
                    uuid: node.initialValue.uuid
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    }
    getMultiselectObsPayload(node) {
        const payload = [];
        const existingUuids = [];
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
    getGroupPayload(node) {
        const nodeAsGroup = node;
        let childrenPayload = [];
        _.each(nodeAsGroup.children, (child) => {
            const payload = this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        const groupPayload = {
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
    }
    getRepeatingGroupPayload(node) {
        const nodeAsArray = node;
        let childrenPayload = [];
        const groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, (child) => {
            const payload = this.getObsNodePayload(child);
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
                    const voidedGroup = {
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
    getObsNodePayload(node) {
        let payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    const groupNode = node;
                    // tslint:disable-next-line:forin
                    for (const o in groupNode.children) {
                        const groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    for (let i = 0; i < arrayNode.children.length; i++) {
                        const arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) &&
                            arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                const simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                const multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                const complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                const groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                const repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                if (Array.isArray(repeatingGroupedObs) &&
                    repeatingGroupedObs.length > 0) {
                    payload = payload.concat(repeatingGroupedObs);
                }
                break;
            default:
                break;
        }
        return payload;
    }
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
    areDatesEqual(date1, date2) {
        return moment(date1).isSame(date2);
    }
    isEmpty(value) {
        if (value === '' ||
            value === null ||
            value === undefined) {
            return true;
        }
        return false;
    }
    toOpenMrsDateTimeString(datetime) {
        if (this.isEmpty(datetime)) {
            return undefined;
        }
        else {
            // transform value to memoent value to avoid error
            const formattedVal = moment(datetime).format();
            const val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCLE9BQU8sRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDVCxNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE1BQU07SUFDSixnQkFBZSxDQUFDO0lBRWhCLHVCQUF1QixDQUFDLElBQWMsRUFBRSxRQUFvQjtRQUMxRCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUNELElBQUksWUFBWSxRQUFRO1lBQ3hCLENBQUMsSUFBSSxZQUFZLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUMzRSxDQUFDLENBQUMsQ0FBQztZQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxPQUFPO29CQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUM3RCxDQUFDLENBQUMsQ0FBQztvQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dC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WUFBWSxDQUFDLEtBQUssQ0FBQztRQUN4RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLO1FBQ1gsRUFBRSxDQUFDLENBQ0QsS0FBSyxLQUFLLEVBQUU7WUFDWixLQUFLLEtBQUssSUFBSTtZQUNkLEtBQUssS0FBSyxTQUdaLENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQWdCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sa0RBQWtEO1lBQ2xELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5pbXBvcnQge1xuICBOb2RlQmFzZSxcbiAgQXJyYXlOb2RlLFxuICBHcm91cE5vZGUsXG4gIExlYWZOb2RlXG59IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuXG5leHBvcnQgY2xhc3MgT2JzQWRhcHRlckhlbHBlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBmaW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlOiBOb2RlQmFzZSwgb2JzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSB8fFxuICAgICAgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJylcbiAgICApIHtcbiAgICAgIF8uZWFjaChvYnNBcnJheSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGl0ZW0uY29uY2VwdCAmJlxuICAgICAgICAgIGl0ZW0uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxuICAgICAgICApIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIG5vZGUgaXMgZWl0aGVyIGEgZ3JvdXAgb3IgYSByZXBlYXRpbmcgbm9kZVxuXG4gICAgY29uc3QgY2hpbGRRdWVzdGlvbnNVdWlkcyA9IHRoaXMuZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZSk7XG4gICAgaWYgKGNoaWxkUXVlc3Rpb25zVXVpZHMubGVuZ3RoID4gMCkge1xuICAgICAgXy5lYWNoKG9ic0FycmF5LCAob2JzKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBvYnMuY29uY2VwdCAmJlxuICAgICAgICAgIG9icy5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShvYnMuZ3JvdXBNZW1iZXJzKSAmJlxuICAgICAgICAgIHRoaXMuaXNTdWJzZXRPZihcbiAgICAgICAgICAgIGNoaWxkUXVlc3Rpb25zVXVpZHMsXG4gICAgICAgICAgICB0aGlzLmdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnMpXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG9icyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIGdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMpIHtcbiAgICAgIF8uZWFjaChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xuICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zICYmIHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XG4gICAgICAgICAgZm91bmQucHVzaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIGdldEdyb3VwTWVtYmVyc0NvbmNlcHRVdWlkcyhvYnNXaXRoR3JvdXBNZW1iZXJzKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzKSkge1xuICAgICAgXy5lYWNoKG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzLCAobWVtYmVyKSA9PiB7XG4gICAgICAgIGZvdW5kLnB1c2gobWVtYmVyLmNvbmNlcHQudXVpZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBpc09ic05vZGUobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycgfHxcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzLWNoaWxkJylcbiAgICApO1xuICB9XG5cbiAgaXNTdWJzZXRPZihzdXBlcnNldEFycmF5OiBBcnJheTxhbnk+LCBzdWJzZXRBcnJheTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xuICAgIGlmIChzdWJzZXRBcnJheS5sZW5ndGggPT09IDAgJiYgc3VwZXJzZXRBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic2V0QXJyYXkuZXZlcnkoKGVsZW1lbnQpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiBzdXBlcnNldEFycmF5LmluZGV4T2YoZWxlbWVudCkgPj0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG9ic1RvVXNlID0gb2JzWzBdO1xuXG4gICAgICAvLyBzZXQgaW5pdGlhbCB2YWx1ZVxuICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBvYnNUb1VzZTtcblxuICAgICAgaWYgKCF0aGlzLmlzRW1wdHkob2JzVG9Vc2UudmFsdWUpICYmIG9ic1RvVXNlLnZhbHVlLnV1aWQpIHtcbiAgICAgICAgLy8gYW5zd2VyIHRvIHRoZSBvYnMgaXMgYSBjb25jZXB0LCB1c2UgdXVpZCB2YWx1ZVxuICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1RvVXNlLnZhbHVlLnV1aWQpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSkge1xuICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1RvVXNlLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzO1xuXG4gICAgICBjb25zdCBvYnNVdWlkcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBtIG9mIG9icykge1xuICAgICAgICBvYnNVdWlkcy5wdXNoKG0udmFsdWUudXVpZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVXVpZHMpO1xuICAgIH1cbiAgfVxuXG4gIHNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ3ZhbHVlJ1xuICAgICAgICApIHtcbiAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgICAub2JzRmllbGQgPT09ICdvYnNEYXRldGltZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBvYnMgdmFsdWUgaGVyZVxuICAgICAgdGhpcy5zZXROb2RlVmFsdWUodmFsdWVGaWVsZCwgb2JzKTtcbiAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG5cbiAgICAgIC8vIHNldCB0aGUgZGF0ZSB2YWx1ZSBoZXJlXG4gICAgICBkYXRlRmllbGQuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG4gICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKFxuICAgICAgICBkYXRlRmllbGQsXG4gICAgICAgIHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICBncm91cE5vZGUuaW5pdGlhbFZhbHVlID0gb2JzWzBdO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzWzBdLmdyb3VwTWVtYmVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0UmVwZWF0aW5nR3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgIGFycmF5Tm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZWROb2RlID0gYXJyYXlOb2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKGNyZWF0ZWROb2RlLCBbb2JzW2ldXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Tm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoYXJyYXlOb2RlLmNoaWxkcmVuW2ldLCBvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NpbXBsZSc6XG4gICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgY29uc3QgYW5zd2VyaW5nT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICB0aGlzLnNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlLCBhbnN3ZXJpbmdPYnMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICB0aGlzLnNldE11bHRpc2VsZWN0T2JzTm9kZVZhbHVlKG5vZGUsIG11bHRpc2VsZWN0T2JzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgIHRoaXMuc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlLCBjb21wbGV4T2JzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgaWYgKGdyb3VwT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIGdyb3VwT2JzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICBjb25zdCByZXBlYXRpbmdHcm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICBpZiAocmVwZWF0aW5nR3JvdXBPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0UmVwZWF0aW5nR3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgcmVwZWF0aW5nR3JvdXBPYnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKCdVbmtub3duIG9icyBub2RlJywgbm9kZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGU6IE5vZGVCYXNlLCB2YWx1ZSkge1xuICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdGhpcyBjYWxsXG4gICAgLy8gbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcblxuICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGhhY2sgYW5kIHB1dCBpdCBpbiBhcHByb3ByaWF0ZSBwbGFjZVxuICAgIGlmIChcbiAgICAgIG5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmXG4gICAgICBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0T2JzTm9kZVR5cGUobm9kZTogTm9kZUJhc2UpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgaWYgKFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUgJiZcbiAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcgfHxcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGktc2VsZWN0JylcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ211bHRpc2VsZWN0JztcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICByZXR1cm4gJ3NpbXBsZSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdjb21wbGV4JztcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlICYmXG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZydcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ3JlcGVhdGluZ0dyb3VwJztcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCdcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ2dyb3VwJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICd1bmtub3duT2JzJztcbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbiAgfVxuXG4gIC8vIFBBWUxPQUQgR0VORVJBVElPTiBGVU5DVElPTlNcbiAgZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IGFueSB7XG4gICAgLy8gY2hlY2sgZm9yIGVtcHR5IHZhbHVlcyBmaXJzdFxuICAgIGlmICh0aGlzLmlzRW1wdHkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIC8vIEhhbmRsZSBjYXNlIGZvciBleGlzdGluZyB2b2lkZWQgb2JzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGZvciBleGlzaXRpbmcsIHVuY2hhbmdlZCB2YWx1ZXNcbiAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUgJiYgIXRoaXMuc2ltcGxlTm9kZVZhbHVlQ2hhbmdlZChub2RlKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gYWxsIG51bWJlcnMsIHRleHQsIGNvbmNlcHRzIGFuc3dlcnMgYXJlIGhhbmRsZWQgaW4gdGhlIHNhbWUgd2F5XG4gICAgLy8gbm8gbmVlZCBmb3IgZnVydGhlciBmb3JtYXR0aW5nIGluIHRoaXMgY2FzZVxuICAgIGNvbnN0IG9iczogYW55ID0ge1xuICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgfTtcblxuICAgIC8vIGhhbmRsZSBkYXRlIGZpZWxkc1xuICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScpIHtcbiAgICAgIG9icy52YWx1ZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcobm9kZS5jb250cm9sLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgIC8vIGZvciBleGlzdGluZyBjYXNlcywgZGVsZXRlIGNvbmNlcHQgcHJvcGVydHksIGFuZCBhZGQgdXVpZFxuICAgICAgZGVsZXRlIG9icy5jb25jZXB0O1xuICAgICAgb2JzLnV1aWQgPSBub2RlLmluaXRpYWxWYWx1ZS51dWlkO1xuICAgIH1cblxuICAgIHJldHVybiBvYnM7XG4gIH1cblxuICBnZXRDb21wbGV4T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgIGxldCB2YWx1ZUZpZWxkOiBMZWFmTm9kZTsgLy8gZXNzZW50aWFsIG1lbW1iZXJcbiAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ3ZhbHVlJ1xuICAgICAgKSB7XG4gICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAub2JzRmllbGQgPT09ICdvYnNEYXRldGltZSdcbiAgICAgICkge1xuICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKHZhbHVlRmllbGQpO1xuICAgIGNvbnNvbGUubG9nKCd2YWx1ZVBheWxvYWQnLCB2YWx1ZVBheWxvYWQpO1xuXG4gICAgLy8gc2V0IG9icyBkYXRldGltZSBmb3IgdGhlIGdlbmVyYXRlZCBwYXlsb2FkXG4gICAgaWYgKHZhbHVlUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICB2YWx1ZVBheWxvYWRbMF0ub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICBkYXRlRmllbGQuY29udHJvbC52YWx1ZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWx1ZVBheWxvYWRbMF07XG4gICAgfSBlbHNlIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID09PSAwICYmIG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAvLyBkZXRlcm1pbmUgaWYgZGF0ZSBjaGFuZ2VkXG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLmFyZURhdGVzRXF1YWwoXG4gICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUsXG4gICAgICAgICAgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICB1dWlkOiBub2RlLmluaXRpYWxWYWx1ZS51dWlkXG4gICAgICAgIH07XG4gICAgICAgIHBheWxvYWQub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldE11bHRpc2VsZWN0T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgIGNvbnN0IHBheWxvYWQ6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIGNvbnN0IGV4aXN0aW5nVXVpZHMgPSBbXTtcblxuICAgIC8vIGFkZCB2b2lkZWQgb2JzIGkuZS4gZGVsZXRlZCBvcHRpb25zXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5pbml0aWFsVmFsdWUpKSB7XG4gICAgICBfLmVhY2gobm9kZS5pbml0aWFsVmFsdWUsIChpdGVtKSA9PiB7XG4gICAgICAgIGV4aXN0aW5nVXVpZHMucHVzaChpdGVtLnZhbHVlLnV1aWQpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZS5pbmRleE9mKGl0ZW0udmFsdWUudXVpZCkgPCAwKSB7XG4gICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGV2ZXJ5IHZhbHVlIHdhcyBkZWxldGVkXG4gICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgbmV3IG9icyBpLmUgdGhleSBkaWRuJ3QgZXhpc2l0IG9yaWdpbmFsbHlcbiAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICBfLmVhY2gobm9kZS5jb250cm9sLnZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoZXhpc3RpbmdVdWlkcy5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkO1xuICB9XG5cbiAgZ2V0R3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgY29uc3Qgbm9kZUFzR3JvdXA6IEdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuXG4gICAgbGV0IGNoaWxkcmVuUGF5bG9hZCA9IFtdO1xuICAgIF8uZWFjaChub2RlQXNHcm91cC5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNoaWxkcmVuUGF5bG9hZCA9IGNoaWxkcmVuUGF5bG9hZC5jb25jYXQocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXBQYXlsb2FkOiBhbnkgPSB7XG4gICAgICBncm91cE1lbWJlcnM6IGNoaWxkcmVuUGF5bG9hZFxuICAgIH07XG5cbiAgICBpZiAobm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlKSB7XG4gICAgICBncm91cFBheWxvYWQudXVpZCA9IG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZS51dWlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cFBheWxvYWQuY29uY2VwdCA9XG4gICAgICAgIG5vZGVBc0dyb3VwLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXBQYXlsb2FkO1xuICB9XG5cbiAgZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgY29uc3Qgbm9kZUFzQXJyYXk6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgbGV0IGNoaWxkcmVuUGF5bG9hZCA9IFtdO1xuXG4gICAgY29uc3QgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nID0gW107XG4gICAgXy5lYWNoKG5vZGVBc0FycmF5LmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcbiAgICAgIGlmIChwYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGlsZC5pbml0aWFsVmFsdWUgJiYgY2hpbGQuaW5pdGlhbFZhbHVlLnV1aWQpIHtcbiAgICAgICAgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nLnB1c2goY2hpbGQuaW5pdGlhbFZhbHVlLnV1aWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdm9pZCBkZWxldGVkIGdyb3Vwc1xuICAgIC8vIGNvbnNvbGUubG9nKCdncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcnLCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcpO1xuICAgIGlmIChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheShub2RlQXNBcnJheS5pbml0aWFsVmFsdWUpKSB7XG4gICAgICBfLmVhY2gobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlLCAob2JzKSA9PiB7XG4gICAgICAgIGlmIChncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcuaW5kZXhPZihvYnMudXVpZCkgPCAwKSB7XG4gICAgICAgICAgY29uc3Qgdm9pZGVkR3JvdXAgPSB7XG4gICAgICAgICAgICB1dWlkOiBvYnMudXVpZCxcbiAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgICAgY2hpbGRyZW5QYXlsb2FkLnB1c2godm9pZGVkR3JvdXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA8PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuUGF5bG9hZDtcbiAgfVxuXG4gIGdldE9ic05vZGVQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8YW55PiB7XG4gICAgbGV0IHBheWxvYWQgPSBbXTtcblxuICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xuICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlUGF5b2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChcbiAgICAgICAgICAgICAgZ3JvdXBOb2RlLmNoaWxkcmVuW29dXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZ3JvdXBOb2RlUGF5b2FkKSAmJiBncm91cE5vZGVQYXlvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQoZ3JvdXBOb2RlUGF5b2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoXG4gICAgICAgICAgICAgIGFycmF5Tm9kZS5jaGlsZHJlbltpXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShhcnJheU5vZGVQYXlsb2FkKSAmJlxuICAgICAgICAgICAgICBhcnJheU5vZGVQYXlsb2FkLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQoYXJyYXlOb2RlUGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgY29uc3Qgc2ltcGxlT2JzID0gdGhpcy5nZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGUpO1xuICAgICAgICBpZiAoc2ltcGxlT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgcGF5bG9hZC5wdXNoKHNpbXBsZU9icyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY29uc3QgbXVsdGlzZWxlY3RPYnMgPSB0aGlzLmdldE11bHRpc2VsZWN0T2JzUGF5bG9hZChub2RlKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtdWx0aXNlbGVjdE9icykgJiYgbXVsdGlzZWxlY3RPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChtdWx0aXNlbGVjdE9icyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5nZXRDb21wbGV4T2JzUGF5bG9hZChub2RlKTtcbiAgICAgICAgaWYgKGNvbXBsZXhPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICBwYXlsb2FkLnB1c2goY29tcGxleE9icyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgY29uc3QgZ3JvdXBlZE9icyA9IHRoaXMuZ2V0R3JvdXBQYXlsb2FkKG5vZGUpO1xuICAgICAgICBpZiAoZ3JvdXBlZE9icyAmJiBncm91cGVkT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgcGF5bG9hZC5wdXNoKGdyb3VwZWRPYnMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICBjb25zdCByZXBlYXRpbmdHcm91cGVkT2JzID0gdGhpcy5nZXRSZXBlYXRpbmdHcm91cFBheWxvYWQobm9kZSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHJlcGVhdGluZ0dyb3VwZWRPYnMpICYmXG4gICAgICAgICAgcmVwZWF0aW5nR3JvdXBlZE9icy5sZW5ndGggPiAwXG4gICAgICAgICkge1xuICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChyZXBlYXRpbmdHcm91cGVkT2JzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkO1xuICB9XG5cbiAgc2ltcGxlTm9kZVZhbHVlQ2hhbmdlZChub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xuICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlLnV1aWQpIHtcbiAgICAgICAgLy8gcXVlc3Rpb24gd2hvc2UgYW5zd2VyIGlzIGEgY29uY2VwdFxuICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hcmVEYXRlc0VxdWFsKG5vZGUuY29udHJvbC52YWx1ZSwgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFyZURhdGVzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gICAgcmV0dXJuIG1vbWVudChkYXRlMSkuaXNTYW1lKGRhdGUyKTtcbiAgfVxuXG4gIGlzRW1wdHkodmFsdWUpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICB2YWx1ZSA9PT0gJycgfHxcbiAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAvLyB8fCB2YWx1ZSA9PT0gW10gfHxcbiAgICAgIC8vIHZhbHVlID09PSB7fVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGV0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzRW1wdHkoZGF0ZXRpbWUpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0cmFuc2Zvcm0gdmFsdWUgdG8gbWVtb2VudCB2YWx1ZSB0byBhdm9pZCBlcnJvclxuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gbW9tZW50KGRhdGV0aW1lKS5mb3JtYXQoKTtcbiAgICAgIGNvbnN0IHZhbCA9IGZvcm1hdHRlZFZhbC5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFbXB0eSh2YWwpID8gdW5kZWZpbmVkIDogdmFsO1xuICAgIH1cbiAgfVxufVxuIl19