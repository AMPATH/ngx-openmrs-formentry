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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLEVBQ1QsTUFBTSwyQkFBMkIsQ0FBQztBQUVuQztJQUNFO0lBQWUsQ0FBQztJQUVoQixrREFBdUIsR0FBdkIsVUFBd0IsSUFBYyxFQUFFLFFBQW9CO1FBQTVELGlCQTJDQztRQTFDQyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUNELElBQUksWUFBWSxRQUFRO1lBQ3hCLENBQUMsSUFBSSxZQUFZLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUMzRSxDQUFDLENBQUMsQ0FBQztZQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtnQkFDcEIsRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQzdELENBQUMsQ0FBQyxDQUFDO29CQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENB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SCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBM21CRCxJQTJtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmltcG9ydCB7XG4gIE5vZGVCYXNlLFxuICBBcnJheU5vZGUsXG4gIEdyb3VwTm9kZSxcbiAgTGVhZk5vZGVcbn0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBPYnNBZGFwdGVySGVscGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGU6IE5vZGVCYXNlLCBvYnNBcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICBpZiAoIXRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgbm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlIHx8XG4gICAgICAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKVxuICAgICkge1xuICAgICAgXy5lYWNoKG9ic0FycmF5LCAoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXRlbS5jb25jZXB0ICYmXG4gICAgICAgICAgaXRlbS5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0XG4gICAgICAgICkge1xuICAgICAgICAgIGZvdW5kLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgbm9kZSBpcyBlaXRoZXIgYSBncm91cCBvciBhIHJlcGVhdGluZyBub2RlXG5cbiAgICBjb25zdCBjaGlsZFF1ZXN0aW9uc1V1aWRzID0gdGhpcy5nZXRDaGlsZFF1ZXN0aW9uc0NvbmNlcHRVdWlkcyhub2RlKTtcbiAgICBpZiAoY2hpbGRRdWVzdGlvbnNVdWlkcy5sZW5ndGggPiAwKSB7XG4gICAgICBfLmVhY2gob2JzQXJyYXksIChvYnMpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG9icy5jb25jZXB0ICYmXG4gICAgICAgICAgb2JzLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgICBBcnJheS5pc0FycmF5KG9icy5ncm91cE1lbWJlcnMpICYmXG4gICAgICAgICAgdGhpcy5pc1N1YnNldE9mKFxuICAgICAgICAgICAgY2hpbGRRdWVzdGlvbnNVdWlkcyxcbiAgICAgICAgICAgIHRoaXMuZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9icylcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGZvdW5kLnB1c2gob2JzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZTogTm9kZUJhc2UpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucykge1xuICAgICAgXy5lYWNoKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMgJiYgcXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9ic1dpdGhHcm91cE1lbWJlcnMpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JzV2l0aEdyb3VwTWVtYmVycy5ncm91cE1lbWJlcnMpKSB7XG4gICAgICBfLmVhY2gob2JzV2l0aEdyb3VwTWVtYmVycy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcbiAgICAgICAgZm91bmQucHVzaChtZW1iZXIuY29uY2VwdC51dWlkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIGlzT2JzTm9kZShub2RlOiBOb2RlQmFzZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgfHxcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyB8fFxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnKVxuICAgICk7XG4gIH1cblxuICBpc1N1YnNldE9mKHN1cGVyc2V0QXJyYXk6IEFycmF5PGFueT4sIHN1YnNldEFycmF5OiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XG4gICAgaWYgKHN1YnNldEFycmF5Lmxlbmd0aCA9PT0gMCAmJiBzdXBlcnNldEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzdWJzZXRBcnJheS5ldmVyeSgoZWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuICAgICAgcmV0dXJuIHN1cGVyc2V0QXJyYXkuaW5kZXhPZihlbGVtZW50KSA+PSAwO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0U2ltcGxlT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgb2JzVG9Vc2UgPSBvYnNbMF07XG5cbiAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlXG4gICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9ic1RvVXNlO1xuXG4gICAgICBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkgJiYgb2JzVG9Vc2UudmFsdWUudXVpZCkge1xuICAgICAgICAvLyBhbnN3ZXIgdG8gdGhlIG9icyBpcyBhIGNvbmNlcHQsIHVzZSB1dWlkIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUudXVpZCk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVG9Vc2UudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldE11bHRpc2VsZWN0T2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgIGNvbnN0IG9ic1V1aWRzID0gW107XG4gICAgICBmb3IgKGNvbnN0IG0gb2Ygb2JzKSB7XG4gICAgICAgIG9ic1V1aWRzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNVdWlkcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCB2YWx1ZUZpZWxkOiBMZWFmTm9kZTsgLy8gZXNzZW50aWFsIG1lbW1iZXJcbiAgICAgIGxldCBkYXRlRmllbGQ6IExlYWZOb2RlOyAvLyBvdGhlciBtZW1iZXIgdG8gYmUgbWFuaXB1bGF0ZWQgYnkgdXNlclxuXG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgICAgLm9ic0ZpZWxkID09PSAndmFsdWUnXG4gICAgICAgICkge1xuICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnNcbiAgICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJ1xuICAgICAgICApIHtcbiAgICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIG9icyB2YWx1ZSBoZXJlXG4gICAgICB0aGlzLnNldE5vZGVWYWx1ZSh2YWx1ZUZpZWxkLCBvYnMpO1xuICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcblxuICAgICAgLy8gc2V0IHRoZSBkYXRlIHZhbHVlIGhlcmVcbiAgICAgIGRhdGVGaWVsZC5pbml0aWFsVmFsdWUgPSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZTtcbiAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUoXG4gICAgICAgIGRhdGVGaWVsZCxcbiAgICAgICAgdmFsdWVGaWVsZC5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIGdyb3VwTm9kZS5pbml0aWFsVmFsdWUgPSBvYnNbMF07XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnNbMF0uZ3JvdXBNZW1iZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgYXJyYXlOb2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3JlYXRlZE5vZGUgPSBhcnJheU5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgIHRoaXMuc2V0R3JvdXBPYnNOb2RlVmFsdWUoY3JlYXRlZE5vZGUsIFtvYnNbaV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXROb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xuICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShhcnJheU5vZGUuY2hpbGRyZW5baV0sIG9icyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCBhbnN3ZXJpbmdPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgIHRoaXMuc2V0U2ltcGxlT2JzTm9kZVZhbHVlKG5vZGUsIGFuc3dlcmluZ09icyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgY29uc3QgbXVsdGlzZWxlY3RPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgIHRoaXMuc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZSwgbXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgdGhpcy5zZXRDb21wbGV4T2JzTm9kZVZhbHVlKG5vZGUsIGNvbXBsZXhPYnMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICBjb25zdCBncm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICBpZiAoZ3JvdXBPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgZ3JvdXBPYnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBlYXRpbmdHcm91cCc6XG4gICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgIGlmIChyZXBlYXRpbmdHcm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlLCByZXBlYXRpbmdHcm91cE9icyk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vua25vd24gb2JzIG5vZGUnLCBub2RlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZTogTm9kZUJhc2UsIHZhbHVlKSB7XG4gICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAvLyBUT0RPOiBEZXRlcm1pbmUgaWYgd2UgbmVlZCB0aGlzIGNhbGxcbiAgICAvLyBub2RlLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuXG4gICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgaGFjayBhbmQgcHV0IGl0IGluIGFwcHJvcHJpYXRlIHBsYWNlXG4gICAgaWYgKFxuICAgICAgbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiZcbiAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXRPYnNOb2RlVHlwZShub2RlOiBOb2RlQmFzZSk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSAmJlxuICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aS1zZWxlY3QnKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAnbXVsdGlzZWxlY3QnO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgIHJldHVybiAnc2ltcGxlJztcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlICYmXG4gICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icydcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ2NvbXBsZXgnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyAmJlxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAncmVwZWF0aW5nR3JvdXAnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAnZ3JvdXAnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJ3Vua25vd25PYnMnO1xuICAgIH1cbiAgICByZXR1cm4gJ3Vua25vd24nO1xuICB9XG5cbiAgLy8gUEFZTE9BRCBHRU5FUkFUSU9OIEZVTkNUSU9OU1xuICBnZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogYW55IHtcbiAgICAvLyBjaGVjayBmb3IgZW1wdHkgdmFsdWVzIGZpcnN0XG4gICAgaWYgKHRoaXMuaXNFbXB0eShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhc2UgZm9yIGV4aXN0aW5nIHZvaWRlZCBvYnNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1dWlkOiBub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZm9yIGV4aXNpdGluZywgdW5jaGFuZ2VkIHZhbHVlc1xuICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSAmJiAhdGhpcy5zaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBhbGwgbnVtYmVycywgdGV4dCwgY29uY2VwdHMgYW5zd2VycyBhcmUgaGFuZGxlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICAvLyBubyBuZWVkIGZvciBmdXJ0aGVyIGZvcm1hdHRpbmcgaW4gdGhpcyBjYXNlXG4gICAgY29uc3Qgb2JzOiBhbnkgPSB7XG4gICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgIHZhbHVlOiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICB9O1xuXG4gICAgLy8gaGFuZGxlIGRhdGUgZmllbGRzXG4gICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgb2JzLnZhbHVlID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhub2RlLmNvbnRyb2wudmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gZm9yIGV4aXN0aW5nIGNhc2VzLCBkZWxldGUgY29uY2VwdCBwcm9wZXJ0eSwgYW5kIGFkZCB1dWlkXG4gICAgICBkZWxldGUgb2JzLmNvbmNlcHQ7XG4gICAgICBvYnMudXVpZCA9IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIGdldENvbXBsZXhPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgIGxldCBkYXRlRmllbGQ6IExlYWZOb2RlOyAvLyBvdGhlciBtZW1iZXIgdG8gYmUgbWFuaXB1bGF0ZWQgYnkgdXNlclxuXG4gICAgY29uc3Qgbm9kZUFzR3JvdXAgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zXG4gICAgICAgICAgLm9ic0ZpZWxkID09PSAndmFsdWUnXG4gICAgICApIHtcbiAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9uc1xuICAgICAgICAgIC5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQodmFsdWVGaWVsZCk7XG4gICAgY29uc29sZS5sb2coJ3ZhbHVlUGF5bG9hZCcsIHZhbHVlUGF5bG9hZCk7XG5cbiAgICAvLyBzZXQgb2JzIGRhdGV0aW1lIGZvciB0aGUgZ2VuZXJhdGVkIHBheWxvYWRcbiAgICBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhbHVlUGF5bG9hZFswXS5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoXG4gICAgICAgIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHZhbHVlUGF5bG9hZFswXTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlUGF5bG9hZC5sZW5ndGggPT09IDAgJiYgbm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgIC8vIGRldGVybWluZSBpZiBkYXRlIGNoYW5nZWRcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMuYXJlRGF0ZXNFcXVhbChcbiAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZS5vYnNEYXRldGltZSxcbiAgICAgICAgICBkYXRlRmllbGQuY29udHJvbC52YWx1ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWRcbiAgICAgICAgfTtcbiAgICAgICAgcGF5bG9hZC5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoXG4gICAgICAgICAgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8YW55PiB7XG4gICAgY29uc3QgcGF5bG9hZDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgY29uc3QgZXhpc3RpbmdVdWlkcyA9IFtdO1xuXG4gICAgLy8gYWRkIHZvaWRlZCBvYnMgaS5lLiBkZWxldGVkIG9wdGlvbnNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgIF8uZWFjaChub2RlLmluaXRpYWxWYWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgZXhpc3RpbmdVdWlkcy5wdXNoKGl0ZW0udmFsdWUudXVpZCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlLmluZGV4T2YoaXRlbS52YWx1ZS51dWlkKSA8IDApIHtcbiAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXZlcnkgdmFsdWUgd2FzIGRlbGV0ZWRcbiAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgdXVpZDogaXRlbS51dWlkLFxuICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBuZXcgb2JzIGkuZSB0aGV5IGRpZG4ndCBleGlzaXQgb3JpZ2luYWxseVxuICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgIF8uZWFjaChub2RlLmNvbnRyb2wudmFsdWUsIChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChleGlzdGluZ1V1aWRzLmluZGV4T2YoaXRlbSkgPCAwKSB7XG4gICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgdmFsdWU6IGl0ZW1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBnZXRHcm91cFBheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBub2RlQXNHcm91cDogR3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG5cbiAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG4gICAgXy5lYWNoKG5vZGVBc0dyb3VwLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcbiAgICAgIGlmIChwYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cFBheWxvYWQ6IGFueSA9IHtcbiAgICAgIGdyb3VwTWVtYmVyczogY2hpbGRyZW5QYXlsb2FkXG4gICAgfTtcblxuICAgIGlmIChub2RlQXNHcm91cC5pbml0aWFsVmFsdWUpIHtcbiAgICAgIGdyb3VwUGF5bG9hZC51dWlkID0gbm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlLnV1aWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwUGF5bG9hZC5jb25jZXB0ID1cbiAgICAgICAgbm9kZUFzR3JvdXAucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIH1cblxuICAgIHJldHVybiBncm91cFBheWxvYWQ7XG4gIH1cblxuICBnZXRSZXBlYXRpbmdHcm91cFBheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBub2RlQXNBcnJheTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG5cbiAgICBjb25zdCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcgPSBbXTtcbiAgICBfLmVhY2gobm9kZUFzQXJyYXkuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xuICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xuICAgICAgfVxuICAgICAgaWYgKGNoaWxkLmluaXRpYWxWYWx1ZSAmJiBjaGlsZC5pbml0aWFsVmFsdWUudXVpZCkge1xuICAgICAgICBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcucHVzaChjaGlsZC5pbml0aWFsVmFsdWUudXVpZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB2b2lkIGRlbGV0ZWQgZ3JvdXBzXG4gICAgLy8gY29uc29sZS5sb2coJ2dyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZycsIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyk7XG4gICAgaWYgKG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSAmJiBBcnJheS5pc0FycmF5KG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgIF8uZWFjaChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUsIChvYnMpID0+IHtcbiAgICAgICAgaWYgKGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5pbmRleE9mKG9icy51dWlkKSA8IDApIHtcbiAgICAgICAgICBjb25zdCB2b2lkZWRHcm91cCA9IHtcbiAgICAgICAgICAgIHV1aWQ6IG9icy51dWlkLFxuICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjaGlsZHJlblBheWxvYWQucHVzaCh2b2lkZWRHcm91cCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5QYXlsb2FkO1xuICB9XG5cbiAgZ2V0T2JzTm9kZVBheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICBsZXQgcGF5bG9hZCA9IFtdO1xuXG4gICAgc3dpdGNoICh0aGlzLmdldE9ic05vZGVUeXBlKG5vZGUpKSB7XG4gICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cE5vZGVQYXlvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKFxuICAgICAgICAgICAgICBncm91cE5vZGUuY2hpbGRyZW5bb11cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShncm91cE5vZGVQYXlvYWQpICYmIGdyb3VwTm9kZVBheW9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChncm91cE5vZGVQYXlvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheU5vZGVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChcbiAgICAgICAgICAgICAgYXJyYXlOb2RlLmNoaWxkcmVuW2ldXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGFycmF5Tm9kZVBheWxvYWQpICYmXG4gICAgICAgICAgICAgIGFycmF5Tm9kZVBheWxvYWQubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChhcnJheU5vZGVQYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICBjb25zdCBzaW1wbGVPYnMgPSB0aGlzLmdldFNpbXBsZU9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgIGlmIChzaW1wbGVPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICBwYXlsb2FkLnB1c2goc2ltcGxlT2JzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGUpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG11bHRpc2VsZWN0T2JzKSAmJiBtdWx0aXNlbGVjdE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KG11bHRpc2VsZWN0T2JzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmdldENvbXBsZXhPYnNQYXlsb2FkKG5vZGUpO1xuICAgICAgICBpZiAoY29tcGxleE9icyAhPT0gbnVsbCkge1xuICAgICAgICAgIHBheWxvYWQucHVzaChjb21wbGV4T2JzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICBjb25zdCBncm91cGVkT2JzID0gdGhpcy5nZXRHcm91cFBheWxvYWQobm9kZSk7XG4gICAgICAgIGlmIChncm91cGVkT2JzICYmIGdyb3VwZWRPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICBwYXlsb2FkLnB1c2goZ3JvdXBlZE9icyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBlYXRpbmdHcm91cCc6XG4gICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwZWRPYnMgPSB0aGlzLmdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkocmVwZWF0aW5nR3JvdXBlZE9icykgJiZcbiAgICAgICAgICByZXBlYXRpbmdHcm91cGVkT2JzLmxlbmd0aCA+IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KHJlcGVhdGluZ0dyb3VwZWRPYnMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBzaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUudmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZCkge1xuICAgICAgICAvLyBxdWVzdGlvbiB3aG9zZSBhbnN3ZXIgaXMgYSBjb25jZXB0XG4gICAgICAgIHJldHVybiBub2RlLmNvbnRyb2wudmFsdWUgIT09IG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlLnV1aWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5jb250cm9sLnZhbHVlLCBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJlRGF0ZXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgICByZXR1cm4gbW9tZW50KGRhdGUxKS5pc1NhbWUoZGF0ZTIpO1xuICB9XG5cbiAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHZhbHVlID09PSAnJyB8fFxuICAgICAgdmFsdWUgPT09IG51bGwgfHxcbiAgICAgIHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgIC8vIHx8IHZhbHVlID09PSBbXSB8fFxuICAgICAgLy8gdmFsdWUgPT09IHt9XG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZXRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eShkYXRldGltZSkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRyYW5zZm9ybSB2YWx1ZSB0byBtZW1vZW50IHZhbHVlIHRvIGF2b2lkIGVycm9yXG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWwgPSBtb21lbnQoZGF0ZXRpbWUpLmZvcm1hdCgpO1xuICAgICAgY29uc3QgdmFsID0gZm9ybWF0dGVkVmFsLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgICByZXR1cm4gdGhpcy5pc0VtcHR5KHZhbCkgPyB1bmRlZmluZWQgOiB2YWw7XG4gICAgfVxuICB9XG59XG4iXX0=