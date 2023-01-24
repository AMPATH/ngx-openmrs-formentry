import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import * as moment_ from 'moment';
var moment = moment_;
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
var ObsAdapterHelper = /** @class */ (function () {
    function ObsAdapterHelper() {
    }
    ObsAdapterHelper.prototype.findObsAnswerToQuestion = function (node, obsArray) {
        var _this = this;
        var found = [];
        if (!this.isObsNode(node)) {
            return found;
        }
        if (node instanceof LeafNode ||
            (node instanceof GroupNode && node.question.extras.type === 'complex-obs')) {
            _.each(obsArray, function (item) {
                if (item.concept &&
                    item.concept.uuid === node.question.extras.questionOptions.concept) {
                    found.push(item);
                }
            });
            return found;
        }
        // At this point the node is either a group or a repeating node
        var childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
        if (childQuestionsUuids.length > 0) {
            _.each(obsArray, function (obs) {
                if (obs.concept &&
                    obs.concept.uuid === node.question.extras.questionOptions.concept &&
                    Array.isArray(obs.groupMembers) &&
                    _this.isSubsetOf(childQuestionsUuids, _this.getGroupMembersConceptUuids(obs))) {
                    found.push(obs);
                }
            });
        }
        return found;
    };
    ObsAdapterHelper.prototype.getChildQuestionsConceptUuids = function (node) {
        var found = [];
        if (node.question.extras && node.question.extras.questions) {
            _.each(node.question.extras.questions, function (question) {
                if (question.questionOptions && question.questionOptions.concept) {
                    found.push(question.questionOptions.concept);
                }
            });
        }
        return found;
    };
    ObsAdapterHelper.prototype.getGroupMembersConceptUuids = function (obsWithGroupMembers) {
        var found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers, function (member) {
                found.push(member.concept.uuid);
            });
        }
        return found;
    };
    ObsAdapterHelper.prototype.isObsNode = function (node) {
        return (node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child'));
    };
    ObsAdapterHelper.prototype.isSubsetOf = function (supersetArray, subsetArray) {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every(function (element) {
            return supersetArray.indexOf(element) >= 0;
        });
    };
    ObsAdapterHelper.prototype.setSimpleObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            var obsToUse = obs[0];
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
    };
    ObsAdapterHelper.prototype.setMultiselectObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            node.initialValue = obs;
            var obsUuids = [];
            try {
                for (var obs_1 = tslib_1.__values(obs), obs_1_1 = obs_1.next(); !obs_1_1.done; obs_1_1 = obs_1.next()) {
                    var m = obs_1_1.value;
                    obsUuids.push(m.value.uuid);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (obs_1_1 && !obs_1_1.done && (_a = obs_1.return)) _a.call(obs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.setNodeFormControlValue(node, obsUuids);
        }
        var e_1, _a;
    };
    ObsAdapterHelper.prototype.setComplexObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            var valueField = void 0; // essential memmber
            var dateField = void 0; // other member to be manipulated by user
            var nodeAsGroup = node;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
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
    };
    ObsAdapterHelper.prototype.setGroupObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            var groupNode = node;
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (var o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    };
    ObsAdapterHelper.prototype.setRepeatingGroupObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            var arrayNode = node;
            arrayNode.initialValue = obs;
            for (var i = 0; i < obs.length; i++) {
                var createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    };
    ObsAdapterHelper.prototype.setNodeValue = function (node, obs) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    var groupNode = node;
                    // tslint:disable-next-line:forin
                    for (var o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    var arrayNode = node;
                    for (var i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                var answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                var multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                var complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                var groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                var repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);
                if (repeatingGroupObs.length > 0) {
                    this.setRepeatingGroupObsNodeValue(node, repeatingGroupObs);
                }
                break;
            default:
                console.error('Unknown obs node', node);
                break;
        }
    };
    ObsAdapterHelper.prototype.setNodeFormControlValue = function (node, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();
        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue &&
            node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    };
    ObsAdapterHelper.prototype.getObsNodeType = function (node) {
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
    };
    // PAYLOAD GENERATION FUNCTIONS
    ObsAdapterHelper.prototype.getSimpleObsPayload = function (node) {
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
        var obs = {
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
    };
    ObsAdapterHelper.prototype.getComplexObsPayload = function (node) {
        var valueField; // essential memmber
        var dateField; // other member to be manipulated by user
        var nodeAsGroup = node;
        // tslint:disable-next-line:forin
        for (var o in nodeAsGroup.children) {
            if (nodeAsGroup.children[o].question.extras.questionOptions
                .obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (nodeAsGroup.children[o].question.extras.questionOptions
                .obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        var valuePayload = this.getObsNodePayload(valueField);
        console.log('valuePayload', valuePayload);
        // set obs datetime for the generated payload
        if (valuePayload.length > 0) {
            valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
            return valuePayload[0];
        }
        else if (valuePayload.length === 0 && node.initialValue) {
            // determine if date changed
            if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                var payload = {
                    uuid: node.initialValue.uuid
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    };
    ObsAdapterHelper.prototype.getMultiselectObsPayload = function (node) {
        var payload = [];
        var existingUuids = [];
        // add voided obs i.e. deleted options
        if (Array.isArray(node.initialValue)) {
            _.each(node.initialValue, function (item) {
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
            _.each(node.control.value, function (item) {
                if (existingUuids.indexOf(item) < 0) {
                    payload.push({
                        concept: node.question.extras.questionOptions.concept,
                        value: item
                    });
                }
            });
        }
        return payload;
    };
    ObsAdapterHelper.prototype.getGroupPayload = function (node) {
        var _this = this;
        var nodeAsGroup = node;
        var childrenPayload = [];
        _.each(nodeAsGroup.children, function (child) {
            var payload = _this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        var groupPayload = {
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
    };
    ObsAdapterHelper.prototype.getRepeatingGroupPayload = function (node) {
        var _this = this;
        var nodeAsArray = node;
        var childrenPayload = [];
        var groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, function (child) {
            var payload = _this.getObsNodePayload(child);
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
            _.each(nodeAsArray.initialValue, function (obs) {
                if (groupsUuidsAfterEditting.indexOf(obs.uuid) < 0) {
                    var voidedGroup = {
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
    };
    ObsAdapterHelper.prototype.getObsNodePayload = function (node) {
        var payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    var groupNode = node;
                    // tslint:disable-next-line:forin
                    for (var o in groupNode.children) {
                        var groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    var arrayNode = node;
                    for (var i = 0; i < arrayNode.children.length; i++) {
                        var arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) &&
                            arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                var simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                var multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                var complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                var groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                var repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                if (Array.isArray(repeatingGroupedObs) &&
                    repeatingGroupedObs.length > 0) {
                    payload = payload.concat(repeatingGroupedObs);
                }
                break;
            default:
                break;
        }
        return payload;
    };
    ObsAdapterHelper.prototype.simpleNodeValueChanged = function (node) {
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
    };
    ObsAdapterHelper.prototype.areDatesEqual = function (date1, date2) {
        return moment(date1).isSame(date2);
    };
    ObsAdapterHelper.prototype.isEmpty = function (value) {
        if (value === '' ||
            value === null ||
            value === undefined) {
            return true;
        }
        return false;
    };
    ObsAdapterHelper.prototype.toOpenMrsDateTimeString = function (datetime) {
        if (this.isEmpty(datetime)) {
            return undefined;
        }
        else {
            // transform value to memoent value to avoid error
            var formattedVal = moment(datetime).format();
            var val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    };
    return ObsAdapterHelper;
}());
export { ObsAdapterHelper };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy1hZGFwdGVyLWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCLE9BQU8sRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDVCxNQUFNLDJCQUEyQixDQUFDO0FBRW5DO0lBQ0U7SUFBZSxDQUFDO0lBRWhCLGtEQUF1QixHQUF2QixVQUF3QixJQUFjLEVBQUUsUUFBb0I7UUFBNUQsaUJBMkNDO1FBMUNDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQ0QsSUFBSSxZQUFZLFFBQVE7WUFDeEIsQ0FBQyxJQUFJLFlBQVksU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUFhLENBQzNFLENBQUMsQ0FBQyxDQUFDO1lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxJQUFJO2dCQUNwQixFQUFFLENBQUMsQ0FDRCxJQUFJLENBQUMsT0FBTztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FDN0QsQ0FBQyxDQUFDLENBQUM7b0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCwrREFBK0Q7UUFFL0QsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFHO2dCQUNuQixFQUFFLENBQUMsQ0FDRCxHQUFHLENBQUMsT0FBTztvQkFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTztvQkFDakUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO29CQUMvQixLQUFJLENBQUMsVUFBVSxDQUNiLG1CQUFtQixFQUNuQixLQUFJLENBQUMsMkJBQTJCLENBQUMsR0FBRyxDQUFDLENBRXpDLENBQUMsQ0FBQyxDQUFDO29CQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHdEQUE2QixHQUE3QixVQUE4QixJQUFjO1FBQzFDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUMsUUFBUTtnQkFDOUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsc0RBQTJCLEdBQTNCLFVBQTRCLG1CQUFtQjtRQUM3QyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFNO2dCQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVUsSUFBYztRQUN0QixNQUFNLENBQUMsQ0FDTCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDcEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVU7Z0JBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUFhO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FDckQsQ0FBQztJQUNKLENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsYUFBeUIsRUFBRSxXQUF1QjtRQUMzRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFDLE9BQU87WUFDL0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdEQUFxQixHQUFyQixVQUFzQixJQUFjLEVBQUUsR0FBZTtRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELHFEQUEwQixHQUExQixVQUEyQixJQUFjLEVBQUUsR0FBZTtRQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBRXhCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ3BCLEdBQUcsQ0FBQyxDQUFZLElBQUEsUUFBQSxpQkFBQSxHQUFHLENBQUEsd0JBQUE7b0JBQWQsSUFBTSxDQUFDLGdCQUFBO29CQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7Ozs7Ozs7OztZQUVELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7SUFDSCxDQUFDO0lBRUQsaURBQXNCLEdBQXRCLFVBQXVCLElBQWMsRUFBRSxHQUFlO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxVQUFVLFNBQVUsQ0FBQyxDQUFDLG9CQUFvQjtZQUM5QyxJQUFJLFNBQVMsU0FBVSxDQUFDLENBQUMseUNBQXlDO1lBRWxFLElBQU0sV0FBVyxHQUFHLElBQWlCLENBQUM7WUFDdEMsaUNBQWlDO1lBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FDQSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZTtxQkFDbEUsUUFBUSxLQUFLLE9BQ2xCLENBQUMsQ0FBQyxDQUFDO29CQUNELFVBQVUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUNBLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlO3FCQUNsRSxRQUFRLEtBQUssYUFDbEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0QsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7WUFDSCxDQUFDO1lBRUQseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUU1QywwQkFBMEI7WUFDMUIsU0FBUyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ2pELElBQUksQ0FBQyx1QkFBdUIsQ0FDMUIsU0FBUyxFQUNULFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUNwQyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCwrQ0FBb0IsR0FBcEIsVUFBcUIsSUFBYyxFQUFFLEdBQWU7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFpQixDQUFDO1lBQ3BDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLGlDQUFpQztZQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCx3REFBNkIsR0FBN0IsVUFBOEIsSUFBYyxFQUFFLEdBQWU7UUFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFNLFNBQVMsR0FBRyxJQUFpQixDQUFDO1lBQ3BDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNwQyxJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELHVDQUFZLEdBQVosVUFBYSxJQUFjLEVBQUUsR0FBZTtRQUMxQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxLQUFLLFNBQVM7Z0JBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQU0sU0FBUyxHQUFHLElBQWlCLENBQUM7b0JBQ3BDLGlDQUFpQztvQkFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFDRCxLQUFLLENBQUM7Z0JBQ1IsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBTSxTQUFTLEdBQUcsSUFBaUIsQ0FBQztvQkFDcEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2hELENBQUM7b0JBQ0QsS0FBSyxDQUFDO2dCQUNSLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLHFDQUFxQztnQkFDckMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFN0Qsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLENBQUM7WUFFUixLQUFLLGFBQWE7Z0JBQ2hCLHFDQUFxQztnQkFDckMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFL0Qsa0JBQWtCO2dCQUNsQixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RCxLQUFLLENBQUM7WUFFUixLQUFLLFNBQVM7Z0JBQ1oscUNBQXFDO2dCQUNyQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUUzRCxrQkFBa0I7Z0JBQ2xCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLEtBQUssQ0FBQztZQUVSLEtBQUssT0FBTztnQkFDVixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUV6RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBRUQsS0FBSyxDQUFDO1lBQ1IsS0FBSyxnQkFBZ0I7Z0JBQ25CLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFbEUsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFFRCxLQUFLLENBQUM7WUFDUjtnQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixJQUFjLEVBQUUsS0FBSztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3Qix1Q0FBdUM7UUFDdkMseUNBQXlDO1FBRXpDLHlEQUF5RDtRQUN6RCxFQUFFLENBQUMsQ0FDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQjtZQUNuQyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUVELHlDQUFjLEdBQWQsVUFBZSxJQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUNELElBQUksWUFBWSxRQUFRO2dCQUN4QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEtBQUssZUFBZTtvQkFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyxVQUFVO29CQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FDckUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN2QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUNELElBQUksWUFBWSxTQUFTO2dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQ0QsSUFBSSxZQUFZLFNBQVM7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLFdBQ3JELENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQ0QsSUFBSSxZQUFZLFNBQVM7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLENBQUM7WUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQkFBK0I7SUFDL0IsOENBQW1CLEdBQW5CLFVBQW9CLElBQWM7UUFDaEMsK0JBQStCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLHNDQUFzQztnQkFDdEMsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUk7b0JBQzVCLE1BQU0sRUFBRSxJQUFJO2lCQUNiLENBQUM7WUFDSixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxrRUFBa0U7UUFDbEUsOENBQThDO1FBQzlDLElBQU0sR0FBRyxHQUFRO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPO1lBQ3JELEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDMUIsQ0FBQztRQUVGLHFCQUFxQjtRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsNERBQTREO1lBQzVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELCtDQUFvQixHQUFwQixVQUFxQixJQUFjO1FBQ2pDLElBQUksVUFBb0IsQ0FBQyxDQUFDLG9CQUFvQjtRQUM5QyxJQUFJLFNBQW1CLENBQUMsQ0FBQyx5Q0FBeUM7UUFFbEUsSUFBTSxXQUFXLEdBQUcsSUFBaUIsQ0FBQztRQUN0QyxpQ0FBaUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQ0EsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWU7aUJBQ2xFLFFBQVEsS0FBSyxPQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDRCxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQ0EsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWU7aUJBQ2xFLFFBQVEsS0FBSyxhQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDRCxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUxQyw2Q0FBNkM7UUFDN0MsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUN4RCxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDeEIsQ0FBQztZQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMxRCw0QkFBNEI7WUFDNUIsRUFBRSxDQUFDLENBQ0QsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFDN0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBRTNCLENBQUMsQ0FBQyxDQUFDO2dCQUNELElBQU0sT0FBTyxHQUFRO29CQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJO2lCQUM3QixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUNoRCxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDeEIsQ0FBQztnQkFDRixNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxtREFBd0IsR0FBeEIsVUFBeUIsSUFBYztRQUNyQyxJQUFNLE9BQU8sR0FBZSxFQUFFLENBQUM7UUFFL0IsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXpCLHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUMsSUFBSTtnQkFDN0IsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDOzRCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixNQUFNLEVBQUUsSUFBSTt5QkFDYixDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLDBCQUEwQjtvQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2YsTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxnREFBZ0Q7UUFDaEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTzt3QkFDckQsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLElBQWM7UUFBOUIsaUJBMkJDO1FBMUJDLElBQU0sV0FBVyxHQUFjLElBQWlCLENBQUM7UUFFakQsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUs7WUFDakMsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBTSxZQUFZLEdBQVE7WUFDeEIsWUFBWSxFQUFFLGVBQWU7U0FDOUIsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDcEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sWUFBWSxDQUFDLE9BQU87Z0JBQ2xCLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDeEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELG1EQUF3QixHQUF4QixVQUF5QixJQUFjO1FBQXZDLGlCQWtDQztRQWpDQyxJQUFNLFdBQVcsR0FBYyxJQUFpQixDQUFDO1FBRWpELElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUV6QixJQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLO1lBQ2pDLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLHFFQUFxRTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUFHO2dCQUNuQyxFQUFFLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELElBQU0sV0FBVyxHQUFHO3dCQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7d0JBQ2QsTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQztvQkFDRixlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsNENBQWlCLEdBQWpCLFVBQWtCLElBQWM7UUFDOUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssU0FBUztnQkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBTSxTQUFTLEdBQUcsSUFBaUIsQ0FBQztvQkFDcEMsaUNBQWlDO29CQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUM1QyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUN0QixDQUFDO3dCQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQztvQkFDSCxDQUFDO29CQUNELEtBQUssQ0FBQztnQkFDUixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFNLFNBQVMsR0FBRyxJQUFpQixDQUFDO29CQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25ELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUM3QyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUN0QixDQUFDO3dCQUNGLEVBQUUsQ0FBQyxDQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7NEJBQy9CLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUM1QixDQUFDLENBQUMsQ0FBQzs0QkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDO29CQUNILENBQUM7b0JBQ0QsS0FBSyxDQUFDO2dCQUNSLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBRVIsS0FBSyxhQUFhO2dCQUNoQixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFFUixLQUFLLFNBQVM7Z0JBQ1osSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFFUixLQUFLLE9BQU87Z0JBQ1YsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNSLEtBQUssZ0JBQWdCO2dCQUNuQixJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEUsRUFBRSxDQUFDLENBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbEMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQy9CLENBQUMsQ0FBQyxDQUFDO29CQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsS0FBSyxDQUFDO1FBQ1YsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELGlEQUFzQixHQUF0QixVQUF1QixJQUFjO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVELHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN4RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsS0FBSyxFQUFFLEtBQUs7UUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGtDQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1gsRUFBRSxDQUFDLENBQ0QsS0FBSyxLQUFLLEVBQUU7WUFDWixLQUFLLEtBQUssSUFBSTtZQUNkLEtBQUssS0FBSyxTQUdaLENBQUMsQ0FBQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixRQUFnQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGtEQUFrRDtZQUNsRCxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0MsSUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUEzbUJELElBMm1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuaW1wb3J0IHtcbiAgTm9kZUJhc2UsXG4gIEFycmF5Tm9kZSxcbiAgR3JvdXBOb2RlLFxuICBMZWFmTm9kZVxufSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcblxuZXhwb3J0IGNsYXNzIE9ic0FkYXB0ZXJIZWxwZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZTogTm9kZUJhc2UsIG9ic0FycmF5OiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XG4gICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgIGlmICghdGhpcy5pc09ic05vZGUobm9kZSkpIHtcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUgfHxcbiAgICAgIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpXG4gICAgKSB7XG4gICAgICBfLmVhY2gob2JzQXJyYXksIChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpdGVtLmNvbmNlcHQgJiZcbiAgICAgICAgICBpdGVtLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBub2RlIGlzIGVpdGhlciBhIGdyb3VwIG9yIGEgcmVwZWF0aW5nIG5vZGVcblxuICAgIGNvbnN0IGNoaWxkUXVlc3Rpb25zVXVpZHMgPSB0aGlzLmdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGUpO1xuICAgIGlmIChjaGlsZFF1ZXN0aW9uc1V1aWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIF8uZWFjaChvYnNBcnJheSwgKG9icykgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgb2JzLmNvbmNlcHQgJiZcbiAgICAgICAgICBvYnMuY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJlxuICAgICAgICAgIEFycmF5LmlzQXJyYXkob2JzLmdyb3VwTWVtYmVycykgJiZcbiAgICAgICAgICB0aGlzLmlzU3Vic2V0T2YoXG4gICAgICAgICAgICBjaGlsZFF1ZXN0aW9uc1V1aWRzLFxuICAgICAgICAgICAgdGhpcy5nZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzKVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm91bmQucHVzaChvYnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBnZXRDaGlsZFF1ZXN0aW9uc0NvbmNlcHRVdWlkcyhub2RlOiBOb2RlQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25zKSB7XG4gICAgICBfLmVhY2gobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJiBxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkge1xuICAgICAgICAgIGZvdW5kLnB1c2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBnZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzV2l0aEdyb3VwTWVtYmVycyk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycykpIHtcbiAgICAgIF8uZWFjaChvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycywgKG1lbWJlcikgPT4ge1xuICAgICAgICBmb3VuZC5wdXNoKG1lbWJlci5jb25jZXB0LnV1aWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgaXNPYnNOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnIHx8XG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icy1jaGlsZCcpXG4gICAgKTtcbiAgfVxuXG4gIGlzU3Vic2V0T2Yoc3VwZXJzZXRBcnJheTogQXJyYXk8YW55Piwgc3Vic2V0QXJyYXk6IEFycmF5PGFueT4pOiBib29sZWFuIHtcbiAgICBpZiAoc3Vic2V0QXJyYXkubGVuZ3RoID09PSAwICYmIHN1cGVyc2V0QXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnNldEFycmF5LmV2ZXJ5KChlbGVtZW50KTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gc3VwZXJzZXRBcnJheS5pbmRleE9mKGVsZW1lbnQpID49IDA7XG4gICAgfSk7XG4gIH1cblxuICBzZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBvYnNUb1VzZSA9IG9ic1swXTtcblxuICAgICAgLy8gc2V0IGluaXRpYWwgdmFsdWVcbiAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzVG9Vc2U7XG5cbiAgICAgIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSAmJiBvYnNUb1VzZS52YWx1ZS51dWlkKSB7XG4gICAgICAgIC8vIGFuc3dlciB0byB0aGUgb2JzIGlzIGEgY29uY2VwdCwgdXNlIHV1aWQgdmFsdWVcbiAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZS51dWlkKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgY29uc3Qgb2JzVXVpZHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgbSBvZiBvYnMpIHtcbiAgICAgICAgb2JzVXVpZHMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1V1aWRzKTtcbiAgICB9XG4gIH1cblxuICBzZXRDb21wbGV4T2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgICAgbGV0IGRhdGVGaWVsZDogTGVhZk5vZGU7IC8vIG90aGVyIG1lbWJlciB0byBiZSBtYW5pcHVsYXRlZCBieSB1c2VyXG5cbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgICAub2JzRmllbGQgPT09ICd2YWx1ZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgICAgLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnXG4gICAgICAgICkge1xuICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgb2JzIHZhbHVlIGhlcmVcbiAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKHZhbHVlRmllbGQsIG9icyk7XG4gICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuXG4gICAgICAvLyBzZXQgdGhlIGRhdGUgdmFsdWUgaGVyZVxuICAgICAgZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShcbiAgICAgICAgZGF0ZUZpZWxkLFxuICAgICAgICB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZS5vYnNEYXRldGltZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgZ3JvdXBOb2RlLmluaXRpYWxWYWx1ZSA9IG9ic1swXTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShncm91cE5vZGUuY2hpbGRyZW5bb10sIG9ic1swXS5ncm91cE1lbWJlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICBhcnJheU5vZGUuaW5pdGlhbFZhbHVlID0gb2JzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9icy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjcmVhdGVkTm9kZSA9IGFycmF5Tm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgdGhpcy5zZXRHcm91cE9ic05vZGVWYWx1ZShjcmVhdGVkTm9kZSwgW29ic1tpXV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldE5vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgc3dpdGNoICh0aGlzLmdldE9ic05vZGVUeXBlKG5vZGUpKSB7XG4gICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShncm91cE5vZGUuY2hpbGRyZW5bb10sIG9icyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGFycmF5Tm9kZS5jaGlsZHJlbltpXSwgb2JzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgIGNvbnN0IGFuc3dlcmluZ09icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgdGhpcy5zZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZSwgYW5zd2VyaW5nT2JzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgdGhpcy5zZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlLCBtdWx0aXNlbGVjdE9icyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjb21wbGV4JzpcbiAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZSwgY29tcGxleE9icyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIGNvbnN0IGdyb3VwT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgIGlmIChncm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRHcm91cE9ic05vZGVWYWx1ZShub2RlLCBncm91cE9icyk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcbiAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgaWYgKHJlcGVhdGluZ0dyb3VwT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIHJlcGVhdGluZ0dyb3VwT2JzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBvYnMgbm9kZScsIG5vZGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlOiBOb2RlQmFzZSwgdmFsdWUpIHtcbiAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIC8vIFRPRE86IERldGVybWluZSBpZiB3ZSBuZWVkIHRoaXMgY2FsbFxuICAgIC8vIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG5cbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBoYWNrIGFuZCBwdXQgaXQgaW4gYXBwcm9wcmlhdGUgcGxhY2VcbiAgICBpZiAoXG4gICAgICBub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJlxuICAgICAgbm9kZS5pbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgbm9kZS5xdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldE9ic05vZGVUeXBlKG5vZGU6IE5vZGVCYXNlKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc09ic05vZGUobm9kZSkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlICYmXG4gICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdtdWx0aXNlbGVjdCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgICAgcmV0dXJuICdzaW1wbGUnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAnY29tcGxleCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnICYmXG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdyZXBlYXRpbmdHcm91cCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdncm91cCc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAndW5rbm93bk9icyc7XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG4gIH1cblxuICAvLyBQQVlMT0FEIEdFTkVSQVRJT04gRlVOQ1RJT05TXG4gIGdldFNpbXBsZU9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpOiBhbnkge1xuICAgIC8vIGNoZWNrIGZvciBlbXB0eSB2YWx1ZXMgZmlyc3RcbiAgICBpZiAodGhpcy5pc0VtcHR5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAvLyBIYW5kbGUgY2FzZSBmb3IgZXhpc3Rpbmcgdm9pZGVkIG9ic1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBmb3IgZXhpc2l0aW5nLCB1bmNoYW5nZWQgdmFsdWVzXG4gICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlICYmICF0aGlzLnNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGFsbCBudW1iZXJzLCB0ZXh0LCBjb25jZXB0cyBhbnN3ZXJzIGFyZSBoYW5kbGVkIGluIHRoZSBzYW1lIHdheVxuICAgIC8vIG5vIG5lZWQgZm9yIGZ1cnRoZXIgZm9ybWF0dGluZyBpbiB0aGlzIGNhc2VcbiAgICBjb25zdCBvYnM6IGFueSA9IHtcbiAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgdmFsdWU6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgIH07XG5cbiAgICAvLyBoYW5kbGUgZGF0ZSBmaWVsZHNcbiAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICBvYnMudmFsdWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKG5vZGUuY29udHJvbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAvLyBmb3IgZXhpc3RpbmcgY2FzZXMsIGRlbGV0ZSBjb25jZXB0IHByb3BlcnR5LCBhbmQgYWRkIHV1aWRcbiAgICAgIGRlbGV0ZSBvYnMuY29uY2VwdDtcbiAgICAgIG9icy51dWlkID0gbm9kZS5pbml0aWFsVmFsdWUudXVpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgbGV0IGRhdGVGaWVsZDogTGVhZk5vZGU7IC8vIG90aGVyIG1lbWJlciB0byBiZSBtYW5pcHVsYXRlZCBieSB1c2VyXG5cbiAgICBjb25zdCBub2RlQXNHcm91cCA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgaWYgKFxuICAgICAgICAobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAub2JzRmllbGQgPT09ICd2YWx1ZSdcbiAgICAgICkge1xuICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnXG4gICAgICApIHtcbiAgICAgICAgZGF0ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZCh2YWx1ZUZpZWxkKTtcbiAgICBjb25zb2xlLmxvZygndmFsdWVQYXlsb2FkJywgdmFsdWVQYXlsb2FkKTtcblxuICAgIC8vIHNldCBvYnMgZGF0ZXRpbWUgZm9yIHRoZSBnZW5lcmF0ZWQgcGF5bG9hZFxuICAgIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgdmFsdWVQYXlsb2FkWzBdLm9ic0RhdGV0aW1lID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhcbiAgICAgICAgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWVcbiAgICAgICk7XG4gICAgICByZXR1cm4gdmFsdWVQYXlsb2FkWzBdO1xuICAgIH0gZWxzZSBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA9PT0gMCAmJiBub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gZGV0ZXJtaW5lIGlmIGRhdGUgY2hhbmdlZFxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5hcmVEYXRlc0VxdWFsKFxuICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lLFxuICAgICAgICAgIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBjb25zdCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZFxuICAgICAgICB9O1xuICAgICAgICBwYXlsb2FkLm9ic0RhdGV0aW1lID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhcbiAgICAgICAgICBkYXRlRmllbGQuY29udHJvbC52YWx1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICBjb25zdCBwYXlsb2FkOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBjb25zdCBleGlzdGluZ1V1aWRzID0gW107XG5cbiAgICAvLyBhZGQgdm9pZGVkIG9icyBpLmUuIGRlbGV0ZWQgb3B0aW9uc1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgXy5lYWNoKG5vZGUuaW5pdGlhbFZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICBleGlzdGluZ1V1aWRzLnB1c2goaXRlbS52YWx1ZS51dWlkKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUuaW5kZXhPZihpdGVtLnZhbHVlLnV1aWQpIDwgMCkge1xuICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgdXVpZDogaXRlbS51dWlkLFxuICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBldmVyeSB2YWx1ZSB3YXMgZGVsZXRlZFxuICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIG5ldyBvYnMgaS5lIHRoZXkgZGlkbid0IGV4aXNpdCBvcmlnaW5hbGx5XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgXy5lYWNoKG5vZGUuY29udHJvbC52YWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGV4aXN0aW5nVXVpZHMuaW5kZXhPZihpdGVtKSA8IDApIHtcbiAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGdldEdyb3VwUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IG5vZGVBc0dyb3VwOiBHcm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcblxuICAgIGxldCBjaGlsZHJlblBheWxvYWQgPSBbXTtcbiAgICBfLmVhY2gobm9kZUFzR3JvdXAuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xuICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNoaWxkcmVuUGF5bG9hZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwUGF5bG9hZDogYW55ID0ge1xuICAgICAgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlblBheWxvYWRcbiAgICB9O1xuXG4gICAgaWYgKG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZSkge1xuICAgICAgZ3JvdXBQYXlsb2FkLnV1aWQgPSBub2RlQXNHcm91cC5pbml0aWFsVmFsdWUudXVpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXBQYXlsb2FkLmNvbmNlcHQgPVxuICAgICAgICBub2RlQXNHcm91cC5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwUGF5bG9hZDtcbiAgfVxuXG4gIGdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IG5vZGVBc0FycmF5OiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcblxuICAgIGxldCBjaGlsZHJlblBheWxvYWQgPSBbXTtcblxuICAgIGNvbnN0IGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyA9IFtdO1xuICAgIF8uZWFjaChub2RlQXNBcnJheS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNoaWxkcmVuUGF5bG9hZCA9IGNoaWxkcmVuUGF5bG9hZC5jb25jYXQocGF5bG9hZCk7XG4gICAgICB9XG4gICAgICBpZiAoY2hpbGQuaW5pdGlhbFZhbHVlICYmIGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKSB7XG4gICAgICAgIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5wdXNoKGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHZvaWQgZGVsZXRlZCBncm91cHNcbiAgICAvLyBjb25zb2xlLmxvZygnZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nJywgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nKTtcbiAgICBpZiAobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlICYmIEFycmF5LmlzQXJyYXkobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgXy5lYWNoKG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSwgKG9icykgPT4ge1xuICAgICAgICBpZiAoZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nLmluZGV4T2Yob2JzLnV1aWQpIDwgMCkge1xuICAgICAgICAgIGNvbnN0IHZvaWRlZEdyb3VwID0ge1xuICAgICAgICAgICAgdXVpZDogb2JzLnV1aWQsXG4gICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZC5wdXNoKHZvaWRlZEdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkcmVuUGF5bG9hZC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlblBheWxvYWQ7XG4gIH1cblxuICBnZXRPYnNOb2RlUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgIGxldCBwYXlsb2FkID0gW107XG5cbiAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZVBheW9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoXG4gICAgICAgICAgICAgIGdyb3VwTm9kZS5jaGlsZHJlbltvXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGdyb3VwTm9kZVBheW9hZCkgJiYgZ3JvdXBOb2RlUGF5b2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KGdyb3VwTm9kZVBheW9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKFxuICAgICAgICAgICAgICBhcnJheU5vZGUuY2hpbGRyZW5baV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoYXJyYXlOb2RlUGF5bG9hZCkgJiZcbiAgICAgICAgICAgICAgYXJyYXlOb2RlUGF5bG9hZC5sZW5ndGggPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KGFycmF5Tm9kZVBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NpbXBsZSc6XG4gICAgICAgIGNvbnN0IHNpbXBsZU9icyA9IHRoaXMuZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlKTtcbiAgICAgICAgaWYgKHNpbXBsZU9icyAhPT0gbnVsbCkge1xuICAgICAgICAgIHBheWxvYWQucHVzaChzaW1wbGVPYnMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5nZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZSk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobXVsdGlzZWxlY3RPYnMpICYmIG11bHRpc2VsZWN0T2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQobXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjb21wbGV4JzpcbiAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgIGlmIChjb21wbGV4T2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgcGF5bG9hZC5wdXNoKGNvbXBsZXhPYnMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIGNvbnN0IGdyb3VwZWRPYnMgPSB0aGlzLmdldEdyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgaWYgKGdyb3VwZWRPYnMgJiYgZ3JvdXBlZE9icyAhPT0gbnVsbCkge1xuICAgICAgICAgIHBheWxvYWQucHVzaChncm91cGVkT2JzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcbiAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBlZE9icyA9IHRoaXMuZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGUpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShyZXBlYXRpbmdHcm91cGVkT2JzKSAmJlxuICAgICAgICAgIHJlcGVhdGluZ0dyb3VwZWRPYnMubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQocmVwZWF0aW5nR3JvdXBlZE9icyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIHNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkKSB7XG4gICAgICAgIC8vIHF1ZXN0aW9uIHdob3NlIGFuc3dlciBpcyBhIGNvbmNlcHRcbiAgICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgICByZXR1cm4gIXRoaXMuYXJlRGF0ZXNFcXVhbChub2RlLmNvbnRyb2wudmFsdWUsIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLmNvbnRyb2wudmFsdWUgIT09IG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhcmVEYXRlc0VxdWFsKGRhdGUxLCBkYXRlMikge1xuICAgIHJldHVybiBtb21lbnQoZGF0ZTEpLmlzU2FtZShkYXRlMik7XG4gIH1cblxuICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgPT09ICcnIHx8XG4gICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRldGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0VtcHR5KGRhdGV0aW1lKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHJhbnNmb3JtIHZhbHVlIHRvIG1lbW9lbnQgdmFsdWUgdG8gYXZvaWQgZXJyb3JcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IG1vbWVudChkYXRldGltZSkuZm9ybWF0KCk7XG4gICAgICBjb25zdCB2YWwgPSBmb3JtYXR0ZWRWYWwuc3Vic3RyaW5nKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTtcbiAgICAgIHJldHVybiB0aGlzLmlzRW1wdHkodmFsKSA/IHVuZGVmaW5lZCA6IHZhbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==