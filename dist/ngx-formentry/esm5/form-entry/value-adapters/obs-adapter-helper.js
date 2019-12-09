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
            (node instanceof GroupNode &&
                node.question.extras.type === 'complex-obs')) {
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
                if (question.questionOptions &&
                    question.questionOptions.concept) {
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
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
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
        var e_1, _a;
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
    };
    ObsAdapterHelper.prototype.setComplexObsNodeValue = function (node, obs) {
        if (node && obs.length > 0) {
            var valueField = void 0; // essential memmber
            var dateField = void 0; // other member to be manipulated by user
            var nodeAsGroup = node;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
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
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
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
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (nodeAsGroup.children[o].question.extras.questionOptions.obsField === 'obsDatetime') {
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
                    uuid: node.initialValue.uuid,
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
            groupPayload.concept = nodeAsGroup.question.extras.questionOptions.concept;
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
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
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
                if (Array.isArray(repeatingGroupedObs) && repeatingGroupedObs.length > 0) {
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
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixPQUFPLEVBQVksU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRjtJQUNJO0lBRUEsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixJQUFjLEVBQUUsUUFBb0I7UUFBNUQsaUJBb0NDO1FBbkNHLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxZQUFZLFFBQVE7WUFDeEIsQ0FBQyxJQUFJLFlBQVksU0FBUztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxFQUFFO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtnQkFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTztvQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFO29CQUNwRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCwrREFBK0Q7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QkFBcUI7UUFDckIsZUFBZTtVQUNqQjtZQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsa0RBQXVCLEdBQXZCLFVBQXdCLFFBQWdCO1FBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QixPQUFPLFNBQVMsQ0FBQztTQUNwQjthQUFNO1lBQ0gsa0RBQWtEO1lBQ2xELElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQyxJQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FFOUM7SUFDTCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBNWpCRCxJQTRqQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBBcnJheU5vZGUsIEdyb3VwTm9kZSwgTGVhZk5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcblxuZXhwb3J0IGNsYXNzIE9ic0FkYXB0ZXJIZWxwZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZTogTm9kZUJhc2UsIG9ic0FycmF5OiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSB8fFxuICAgICAgICAgICAgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSkge1xuICAgICAgICAgICAgXy5lYWNoKG9ic0FycmF5LCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIG5vZGUgaXMgZWl0aGVyIGEgZ3JvdXAgb3IgYSByZXBlYXRpbmcgbm9kZVxuXG4gICAgICAgIGNvbnN0IGNoaWxkUXVlc3Rpb25zVXVpZHMgPSB0aGlzLmdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGUpO1xuICAgICAgICBpZiAoY2hpbGRRdWVzdGlvbnNVdWlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgb2JzLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvYnMuZ3JvdXBNZW1iZXJzKSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3Vic2V0T2YoY2hpbGRRdWVzdGlvbnNVdWlkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9icykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gob2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBnZXRDaGlsZFF1ZXN0aW9uc0NvbmNlcHRVdWlkcyhub2RlOiBOb2RlQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMgJiZcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9ic1dpdGhHcm91cE1lbWJlcnMpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycykpIHtcbiAgICAgICAgICAgIF8uZWFjaChvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycyxcbiAgICAgICAgICAgICAgICAobWVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gobWVtYmVyLmNvbmNlcHQudXVpZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgaXNPYnNOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnKTtcbiAgICB9XG5cbiAgICBpc1N1YnNldE9mKHN1cGVyc2V0QXJyYXk6IEFycmF5PGFueT4sIHN1YnNldEFycmF5OiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChzdWJzZXRBcnJheS5sZW5ndGggPT09IDAgJiYgc3VwZXJzZXRBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzZXRBcnJheS5ldmVyeSgoZWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyc2V0QXJyYXkuaW5kZXhPZihlbGVtZW50KSA+PSAwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgb2JzVG9Vc2UgPSBvYnNbMF07XG5cbiAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlXG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9ic1RvVXNlO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkgJiYgb2JzVG9Vc2UudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIC8vIGFuc3dlciB0byB0aGUgb2JzIGlzIGEgY29uY2VwdCwgdXNlIHV1aWQgdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1RvVXNlLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgICAgICAgIGNvbnN0IG9ic1V1aWRzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG0gb2Ygb2JzKSB7XG4gICAgICAgICAgICAgICAgb2JzVXVpZHMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1V1aWRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgICAgICAgICAgbGV0IGRhdGVGaWVsZDogTGVhZk5vZGU7IC8vIG90aGVyIG1lbWJlciB0byBiZSBtYW5pcHVsYXRlZCBieSB1c2VyXG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gKG5vZGUgYXMgR3JvdXBOb2RlKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgb2JzIHZhbHVlIGhlcmVcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKHZhbHVlRmllbGQsIG9icyk7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGRhdGUgdmFsdWUgaGVyZVxuICAgICAgICAgICAgZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShkYXRlRmllbGQsIHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgZ3JvdXBOb2RlLmluaXRpYWxWYWx1ZSA9IG9ic1swXTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzWzBdLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgIGFycmF5Tm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3JlYXRlZE5vZGUgPSBhcnJheU5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHcm91cE9ic05vZGVWYWx1ZShjcmVhdGVkTm9kZSwgW29ic1tpXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Tm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldE9ic05vZGVUeXBlKG5vZGUpKSB7XG4gICAgICAgICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShhcnJheU5vZGUuY2hpbGRyZW5baV0sIG9icyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICAgICAgY29uc3QgYW5zd2VyaW5nT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZSwgYW5zd2VyaW5nT2JzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZSwgbXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb21wbGV4T2JzTm9kZVZhbHVlKG5vZGUsIGNvbXBsZXhPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIGdyb3VwT2JzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZXBlYXRpbmdHcm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXBlYXRpbmdHcm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVwZWF0aW5nR3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgcmVwZWF0aW5nR3JvdXBPYnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmtub3duIG9icyBub2RlJywgbm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlOiBOb2RlQmFzZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdGhpcyBjYWxsXG4gICAgICAgIC8vIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG5cbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgaGFjayBhbmQgcHV0IGl0IGluIGFwcHJvcHJpYXRlIHBsYWNlXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPYnNOb2RlVHlwZShub2RlOiBOb2RlQmFzZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSAmJlxuICAgICAgICAgICAgICAgICggbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aS1zZWxlY3QnKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ211bHRpc2VsZWN0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnc2ltcGxlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjb21wbGV4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JlcGVhdGluZ0dyb3VwJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdncm91cCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bk9icyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICB9XG5cbiAgICAvLyBQQVlMT0FEIEdFTkVSQVRJT04gRlVOQ1RJT05TXG4gICAgZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IGFueSB7XG4gICAgICAgIC8vIGNoZWNrIGZvciBlbXB0eSB2YWx1ZXMgZmlyc3RcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY2FzZSBmb3IgZXhpc3Rpbmcgdm9pZGVkIG9ic1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBleGlzaXRpbmcsIHVuY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlICYmICF0aGlzLnNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWxsIG51bWJlcnMsIHRleHQsIGNvbmNlcHRzIGFuc3dlcnMgYXJlIGhhbmRsZWQgaW4gdGhlIHNhbWUgd2F5XG4gICAgICAgIC8vIG5vIG5lZWQgZm9yIGZ1cnRoZXIgZm9ybWF0dGluZyBpbiB0aGlzIGNhc2VcbiAgICAgICAgY29uc3Qgb2JzOiBhbnkgPSB7XG4gICAgICAgICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBoYW5kbGUgZGF0ZSBmaWVsZHNcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgb2JzLnZhbHVlID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhub2RlLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBmb3IgZXhpc3RpbmcgY2FzZXMsIGRlbGV0ZSBjb25jZXB0IHByb3BlcnR5LCBhbmQgYWRkIHV1aWRcbiAgICAgICAgICAgIGRlbGV0ZSBvYnMuY29uY2VwdDtcbiAgICAgICAgICAgIG9icy51dWlkID0gbm9kZS5pbml0aWFsVmFsdWUudXVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYnM7XG4gICAgfVxuXG4gICAgZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgICAgICBjb25zdCBub2RlQXNHcm91cCA9IChub2RlIGFzIEdyb3VwTm9kZSk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbHVlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQodmFsdWVGaWVsZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2YWx1ZVBheWxvYWQnLCB2YWx1ZVBheWxvYWQpO1xuXG4gICAgICAgIC8vIHNldCBvYnMgZGF0ZXRpbWUgZm9yIHRoZSBnZW5lcmF0ZWQgcGF5bG9hZFxuICAgICAgICBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlUGF5bG9hZFswXS5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGF5bG9hZFswXTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID09PSAwICYmIG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgZGF0ZSBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXJlRGF0ZXNFcXVhbChub2RlLmluaXRpYWxWYWx1ZS5vYnNEYXRldGltZSwgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldE11bHRpc2VsZWN0T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICAgICAgY29uc3QgZXhpc3RpbmdVdWlkcyA9IFtdO1xuXG4gICAgICAgIC8vIGFkZCB2b2lkZWQgb2JzIGkuZS4gZGVsZXRlZCBvcHRpb25zXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUuaW5pdGlhbFZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nVXVpZHMucHVzaChpdGVtLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZS5pbmRleE9mKGl0ZW0udmFsdWUudXVpZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnkgdmFsdWUgd2FzIGRlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBuZXcgb2JzIGkuZSB0aGV5IGRpZG4ndCBleGlzaXQgb3JpZ2luYWxseVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZS5jb250cm9sLnZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1V1aWRzLmluZGV4T2YoaXRlbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwOiBHcm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcblxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG4gICAgICAgIF8uZWFjaChub2RlQXNHcm91cC5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuUGF5bG9hZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgICBncm91cE1lbWJlcnM6IGNoaWxkcmVuUGF5bG9hZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChub2RlQXNHcm91cC5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGdyb3VwUGF5bG9hZC51dWlkID0gbm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlLnV1aWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwUGF5bG9hZC5jb25jZXB0ID0gbm9kZUFzR3JvdXAucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwUGF5bG9hZDtcbiAgICB9XG5cbiAgICBnZXRSZXBlYXRpbmdHcm91cFBheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZUFzQXJyYXk6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgIGxldCBjaGlsZHJlblBheWxvYWQgPSBbXTtcblxuICAgICAgICBjb25zdCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcgPSBbXTtcbiAgICAgICAgXy5lYWNoKG5vZGVBc0FycmF5LmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoaWxkLmluaXRpYWxWYWx1ZSAmJiBjaGlsZC5pbml0aWFsVmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5wdXNoKGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdm9pZCBkZWxldGVkIGdyb3Vwc1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nJywgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nKTtcbiAgICAgICAgaWYgKG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSAmJiBBcnJheS5pc0FycmF5KG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUsIChvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nLmluZGV4T2Yob2JzLnV1aWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2b2lkZWRHcm91cCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZC5wdXNoKHZvaWRlZEdyb3VwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZHJlblBheWxvYWQ7XG5cbiAgICB9XG5cbiAgICBnZXRPYnNOb2RlUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgICAgICBsZXQgcGF5bG9hZCA9IFtdO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xuICAgICAgICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGVQYXlvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGdyb3VwTm9kZS5jaGlsZHJlbltvXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShncm91cE5vZGVQYXlvYWQpICYmIGdyb3VwTm9kZVBheW9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KGdyb3VwTm9kZVBheW9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoYXJyYXlOb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5Tm9kZVBheWxvYWQpICYmIGFycmF5Tm9kZVBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChhcnJheU5vZGVQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHNpbXBsZU9icyA9IHRoaXMuZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2ltcGxlT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChzaW1wbGVPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5nZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtdWx0aXNlbGVjdE9icykgJiYgbXVsdGlzZWxlY3RPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQobXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXhPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKGNvbXBsZXhPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwZWRPYnMgPSB0aGlzLmdldEdyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBlZE9icyAmJiBncm91cGVkT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChncm91cGVkT2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXBlYXRpbmdHcm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBlZE9icyA9IHRoaXMuZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcGVhdGluZ0dyb3VwZWRPYnMpICYmIHJlcGVhdGluZ0dyb3VwZWRPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQocmVwZWF0aW5nR3JvdXBlZE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUudmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIC8vIHF1ZXN0aW9uIHdob3NlIGFuc3dlciBpcyBhIGNvbmNlcHRcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5jb250cm9sLnZhbHVlLCBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXJlRGF0ZXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlMSkuaXNTYW1lKGRhdGUyKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSA9PT0gW10gfHxcbiAgICAgICAgICAgIC8vIHZhbHVlID09PSB7fVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRldGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShkYXRldGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm0gdmFsdWUgdG8gbWVtb2VudCB2YWx1ZSB0byBhdm9pZCBlcnJvclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gbW9tZW50KGRhdGV0aW1lKS5mb3JtYXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGZvcm1hdHRlZFZhbC5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNFbXB0eSh2YWwpID8gdW5kZWZpbmVkIDogdmFsO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==