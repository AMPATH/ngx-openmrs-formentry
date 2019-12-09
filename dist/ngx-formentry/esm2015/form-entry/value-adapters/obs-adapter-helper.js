import * as _ from 'lodash';
import * as moment_ from 'moment';
const moment = moment_;
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
export class ObsAdapterHelper {
    constructor() {
    }
    findObsAnswerToQuestion(node, obsArray) {
        const found = [];
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
                if (question.questionOptions &&
                    question.questionOptions.concept) {
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
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
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
                if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'value') {
                    valueField = nodeAsGroup.children[o];
                }
                if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
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
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
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
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
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
                    uuid: node.initialValue.uuid,
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
            groupPayload.concept = nodeAsGroup.question.extras.questionOptions.concept;
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
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
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
                if (Array.isArray(repeatingGroupedObs) && repeatingGroupedObs.length > 0) {
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
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCLE9BQU8sRUFBWSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE1BQU0sT0FBTyxnQkFBZ0I7SUFDekI7SUFFQSxDQUFDO0lBRUQsdUJBQXVCLENBQUMsSUFBYyxFQUFFLFFBQW9CO1FBQ3hELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxZQUFZLFFBQVE7WUFDeEIsQ0FBQyxJQUFJLFlBQVksU0FBUztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxFQUFFO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDcEUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEI7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQs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TyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO2FBQU07WUFDSCxrREFBa0Q7WUFDbEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9DLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUU5QztJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEFycmF5Tm9kZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuXG5leHBvcnQgY2xhc3MgT2JzQWRhcHRlckhlbHBlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBmaW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlOiBOb2RlQmFzZSwgb2JzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlIHx8XG4gICAgICAgICAgICAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpKSB7XG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgbm9kZSBpcyBlaXRoZXIgYSBncm91cCBvciBhIHJlcGVhdGluZyBub2RlXG5cbiAgICAgICAgY29uc3QgY2hpbGRRdWVzdGlvbnNVdWlkcyA9IHRoaXMuZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZSk7XG4gICAgICAgIGlmIChjaGlsZFF1ZXN0aW9uc1V1aWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF8uZWFjaChvYnNBcnJheSwgKG9icykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnMuY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBvYnMuY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KG9icy5ncm91cE1lbWJlcnMpICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdWJzZXRPZihjaGlsZFF1ZXN0aW9uc1V1aWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChvYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBnZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzV2l0aEdyb3VwTWVtYmVycyk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzKSkge1xuICAgICAgICAgICAgXy5lYWNoKG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzLFxuICAgICAgICAgICAgICAgIChtZW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChtZW1iZXIuY29uY2VwdC51dWlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBpc09ic05vZGUobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icy1jaGlsZCcpO1xuICAgIH1cblxuICAgIGlzU3Vic2V0T2Yoc3VwZXJzZXRBcnJheTogQXJyYXk8YW55Piwgc3Vic2V0QXJyYXk6IEFycmF5PGFueT4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHN1YnNldEFycmF5Lmxlbmd0aCA9PT0gMCAmJiBzdXBlcnNldEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnNldEFycmF5LmV2ZXJ5KChlbGVtZW50KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXJzZXRBcnJheS5pbmRleE9mKGVsZW1lbnQpID49IDA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNUb1VzZSA9IG9ic1swXTtcblxuICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzVG9Vc2U7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSAmJiBvYnNUb1VzZS52YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5zd2VyIHRvIHRoZSBvYnMgaXMgYSBjb25jZXB0LCB1c2UgdXVpZCB2YWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVG9Vc2UudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgICAgICAgY29uc3Qgb2JzVXVpZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbSBvZiBvYnMpIHtcbiAgICAgICAgICAgICAgICBvYnNVdWlkcy5wdXNoKG0udmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVXVpZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgICAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSAobm9kZSBhcyBHcm91cE5vZGUpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBvYnMgdmFsdWUgaGVyZVxuICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUodmFsdWVGaWVsZCwgb2JzKTtcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgZGF0ZSB2YWx1ZSBoZXJlXG4gICAgICAgICAgICBkYXRlRmllbGQuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKGRhdGVGaWVsZCwgdmFsdWVGaWVsZC5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICBncm91cE5vZGUuaW5pdGlhbFZhbHVlID0gb2JzWzBdO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnNbMF0uZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgYXJyYXlOb2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVkTm9kZSA9IGFycmF5Tm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKGNyZWF0ZWROb2RlLCBbb2JzW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGFycmF5Tm9kZS5jaGlsZHJlbltpXSwgb2JzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBhbnN3ZXJpbmdPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlLCBhbnN3ZXJpbmdPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlLCBtdWx0aXNlbGVjdE9icyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZSwgY29tcGxleE9icyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIGlmIChncm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgZ3JvdXBPYnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGVhdGluZ0dyb3VwT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlLCByZXBlYXRpbmdHcm91cE9icyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vua25vd24gb2JzIG5vZGUnLCBub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGU6IE5vZGVCYXNlLCB2YWx1ZSkge1xuICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAvLyBUT0RPOiBEZXRlcm1pbmUgaWYgd2UgbmVlZCB0aGlzIGNhbGxcbiAgICAgICAgLy8gbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcblxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBoYWNrIGFuZCBwdXQgaXQgaW4gYXBwcm9wcmlhdGUgcGxhY2VcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE9ic05vZGVUeXBlKG5vZGU6IE5vZGVCYXNlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlICYmXG4gICAgICAgICAgICAgICAgKCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbXVsdGlzZWxlY3QnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzaW1wbGUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbXBsZXgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmVwZWF0aW5nR3JvdXAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2dyb3VwJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duT2JzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxuICAgIC8vIFBBWUxPQUQgR0VORVJBVElPTiBGVU5DVElPTlNcbiAgICBnZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogYW55IHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGVtcHR5IHZhbHVlcyBmaXJzdFxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBjYXNlIGZvciBleGlzdGluZyB2b2lkZWQgb2JzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGV4aXNpdGluZywgdW5jaGFuZ2VkIHZhbHVlc1xuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUgJiYgIXRoaXMuc2ltcGxlTm9kZVZhbHVlQ2hhbmdlZChub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGwgbnVtYmVycywgdGV4dCwgY29uY2VwdHMgYW5zd2VycyBhcmUgaGFuZGxlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZnVydGhlciBmb3JtYXR0aW5nIGluIHRoaXMgY2FzZVxuICAgICAgICBjb25zdCBvYnM6IGFueSA9IHtcbiAgICAgICAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGhhbmRsZSBkYXRlIGZpZWxkc1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBvYnMudmFsdWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKG5vZGUuY29udHJvbC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGZvciBleGlzdGluZyBjYXNlcywgZGVsZXRlIGNvbmNlcHQgcHJvcGVydHksIGFuZCBhZGQgdXVpZFxuICAgICAgICAgICAgZGVsZXRlIG9icy5jb25jZXB0O1xuICAgICAgICAgICAgb2JzLnV1aWQgPSBub2RlLmluaXRpYWxWYWx1ZS51dWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9icztcbiAgICB9XG5cbiAgICBnZXRDb21wbGV4T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgICAgIGxldCBkYXRlRmllbGQ6IExlYWZOb2RlOyAvLyBvdGhlciBtZW1iZXIgdG8gYmUgbWFuaXB1bGF0ZWQgYnkgdXNlclxuXG4gICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gKG5vZGUgYXMgR3JvdXBOb2RlKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZCh2YWx1ZUZpZWxkKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbHVlUGF5bG9hZCcsIHZhbHVlUGF5bG9hZCk7XG5cbiAgICAgICAgLy8gc2V0IG9icyBkYXRldGltZSBmb3IgdGhlIGdlbmVyYXRlZCBwYXlsb2FkXG4gICAgICAgIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVQYXlsb2FkWzBdLm9ic0RhdGV0aW1lID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRlRmllbGQuY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVQYXlsb2FkWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlUGF5bG9hZC5sZW5ndGggPT09IDAgJiYgbm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGRldGVybWluZSBpZiBkYXRlIGNoYW5nZWRcbiAgICAgICAgICAgIGlmICghdGhpcy5hcmVEYXRlc0VxdWFsKG5vZGUuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lLCBkYXRlRmllbGQuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLm9ic0RhdGV0aW1lID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRlRmllbGQuY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IEFycmF5PGFueT4gPSBbXTtcblxuICAgICAgICBjb25zdCBleGlzdGluZ1V1aWRzID0gW107XG5cbiAgICAgICAgLy8gYWRkIHZvaWRlZCBvYnMgaS5lLiBkZWxldGVkIG9wdGlvbnNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5pbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZS5pbml0aWFsVmFsdWUsIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdVdWlkcy5wdXNoKGl0ZW0udmFsdWUudXVpZCk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlLmluZGV4T2YoaXRlbS52YWx1ZS51dWlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogaXRlbS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBldmVyeSB2YWx1ZSB3YXMgZGVsZXRlZFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogaXRlbS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIG5ldyBvYnMgaS5lIHRoZXkgZGlkbid0IGV4aXNpdCBvcmlnaW5hbGx5XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlLmNvbnRyb2wudmFsdWUsIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVXVpZHMuaW5kZXhPZihpdGVtKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBnZXRHcm91cFBheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXA6IEdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuXG4gICAgICAgIGxldCBjaGlsZHJlblBheWxvYWQgPSBbXTtcbiAgICAgICAgXy5lYWNoKG5vZGVBc0dyb3VwLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBncm91cFBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICAgIGdyb3VwTWVtYmVyczogY2hpbGRyZW5QYXlsb2FkXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgZ3JvdXBQYXlsb2FkLnV1aWQgPSBub2RlQXNHcm91cC5pbml0aWFsVmFsdWUudXVpZDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXBQYXlsb2FkLmNvbmNlcHQgPSBub2RlQXNHcm91cC5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXBQYXlsb2FkO1xuICAgIH1cblxuICAgIGdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBub2RlQXNBcnJheTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuUGF5bG9hZCA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyA9IFtdO1xuICAgICAgICBfLmVhY2gobm9kZUFzQXJyYXkuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZCA9IGNoaWxkcmVuUGF5bG9hZC5jb25jYXQocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGQuaW5pdGlhbFZhbHVlICYmIGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nLnB1c2goY2hpbGQuaW5pdGlhbFZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB2b2lkIGRlbGV0ZWQgZ3JvdXBzXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcnLCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcpO1xuICAgICAgICBpZiAobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlICYmIEFycmF5LmlzQXJyYXkobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSwgKG9icykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcuaW5kZXhPZihvYnMudXVpZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZvaWRlZEdyb3VwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogb2JzLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkLnB1c2godm9pZGVkR3JvdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuUGF5bG9hZC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuUGF5bG9hZDtcblxuICAgIH1cblxuICAgIGdldE9ic05vZGVQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGxldCBwYXlsb2FkID0gW107XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmdldE9ic05vZGVUeXBlKG5vZGUpKSB7XG4gICAgICAgICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZVBheW9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoZ3JvdXBOb2RlLmNoaWxkcmVuW29dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGdyb3VwTm9kZVBheW9hZCkgJiYgZ3JvdXBOb2RlUGF5b2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQoZ3JvdXBOb2RlUGF5b2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChhcnJheU5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXlOb2RlUGF5bG9hZCkgJiYgYXJyYXlOb2RlUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KGFycmF5Tm9kZVBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NpbXBsZSc6XG4gICAgICAgICAgICAgICAgY29uc3Qgc2ltcGxlT2JzID0gdGhpcy5nZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzaW1wbGVPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHNpbXBsZU9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlzZWxlY3RPYnMgPSB0aGlzLmdldE11bHRpc2VsZWN0T2JzUGF5bG9hZChub2RlKTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG11bHRpc2VsZWN0T2JzKSAmJiBtdWx0aXNlbGVjdE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChtdWx0aXNlbGVjdE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdjb21wbGV4JzpcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5nZXRDb21wbGV4T2JzUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxleE9icyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goY29tcGxleE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBlZE9icyA9IHRoaXMuZ2V0R3JvdXBQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChncm91cGVkT2JzICYmIGdyb3VwZWRPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKGdyb3VwZWRPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZXBlYXRpbmdHcm91cGVkT2JzID0gdGhpcy5nZXRSZXBlYXRpbmdHcm91cFBheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVwZWF0aW5nR3JvdXBlZE9icykgJiYgcmVwZWF0aW5nR3JvdXBlZE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChyZXBlYXRpbmdHcm91cGVkT2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgc2ltcGxlTm9kZVZhbHVlQ2hhbmdlZChub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgLy8gcXVlc3Rpb24gd2hvc2UgYW5zd2VyIGlzIGEgY29uY2VwdFxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmNvbnRyb2wudmFsdWUgIT09IG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlLnV1aWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuYXJlRGF0ZXNFcXVhbChub2RlLmNvbnRyb2wudmFsdWUsIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlLmNvbnRyb2wudmFsdWUgIT09IG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhcmVEYXRlc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUxKS5pc1NhbWUoZGF0ZTIpO1xuICAgIH1cblxuICAgIGlzRW1wdHkodmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgIC8vIHx8IHZhbHVlID09PSBbXSB8fFxuICAgICAgICAgICAgLy8gdmFsdWUgPT09IHt9XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGV0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KGRhdGV0aW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSB2YWx1ZSB0byBtZW1vZW50IHZhbHVlIHRvIGF2b2lkIGVycm9yXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRWYWwgPSBtb21lbnQoZGF0ZXRpbWUpLmZvcm1hdCgpO1xuICAgICAgICAgICAgY29uc3QgdmFsID0gZm9ybWF0dGVkVmFsLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0VtcHR5KHZhbCkgPyB1bmRlZmluZWQgOiB2YWw7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19