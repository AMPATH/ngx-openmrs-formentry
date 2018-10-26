/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';
var ObsAdapterHelper = /** @class */ (function () {
    function ObsAdapterHelper() {
    }
    /**
     * @param {?} node
     * @param {?} obsArray
     * @return {?}
     */
    ObsAdapterHelper.prototype.findObsAnswerToQuestion = /**
     * @param {?} node
     * @param {?} obsArray
     * @return {?}
     */
    function (node, obsArray) {
        var _this = this;
        var /** @type {?} */ found = [];
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
        var /** @type {?} */ childQuestionsUuids = this.getChildQuestionsConceptUuids(node);
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getChildQuestionsConceptUuids = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ found = [];
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
    /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    ObsAdapterHelper.prototype.getGroupMembersConceptUuids = /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    function (obsWithGroupMembers) {
        var /** @type {?} */ found = [];
        if (Array.isArray(obsWithGroupMembers.groupMembers)) {
            _.each(obsWithGroupMembers.groupMembers, function (member) {
                found.push(member.concept.uuid);
            });
        }
        return found;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.isObsNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node.question.extras &&
            (node.question.extras.type === 'obs' ||
                node.question.extras.type === 'obsGroup' ||
                node.question.extras.type === 'complex-obs' ||
                node.question.extras.type === 'complex-obs-child');
    };
    /**
     * @param {?} supersetArray
     * @param {?} subsetArray
     * @return {?}
     */
    ObsAdapterHelper.prototype.isSubsetOf = /**
     * @param {?} supersetArray
     * @param {?} subsetArray
     * @return {?}
     */
    function (supersetArray, subsetArray) {
        if (subsetArray.length === 0 && supersetArray.length === 0) {
            return true;
        }
        return subsetArray.every(function (element) {
            return supersetArray.indexOf(element) >= 0;
        });
    };
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setSimpleObsNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        if (node && obs.length > 0) {
            var /** @type {?} */ obsToUse = obs[0];
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
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setMultiselectObsNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        if (node && obs.length > 0) {
            node.initialValue = obs;
            var /** @type {?} */ obsUuids = [];
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
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setComplexObsNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        if (node && obs.length > 0) {
            var /** @type {?} */ valueField = void 0; // essential memmber
            var /** @type {?} */ dateField = void 0; // other member to be manipulated by user
            var /** @type {?} */ nodeAsGroup = (/** @type {?} */ (node));
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in nodeAsGroup.children) {
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
    };
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setGroupObsNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        if (node && obs.length > 0) {
            var /** @type {?} */ groupNode = /** @type {?} */ (node);
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in groupNode.children) {
                this.setNodeValue(groupNode.children[o], obs[0].groupMembers);
            }
        }
    };
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setRepeatingGroupObsNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        if (node && obs.length > 0) {
            var /** @type {?} */ arrayNode = /** @type {?} */ (node);
            arrayNode.initialValue = obs;
            for (var /** @type {?} */ i = 0; i < obs.length; i++) {
                var /** @type {?} */ createdNode = arrayNode.createChildNode();
                this.setGroupObsNodeValue(createdNode, [obs[i]]);
            }
        }
    };
    /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    ObsAdapterHelper.prototype.setNodeValue = /**
     * @param {?} node
     * @param {?} obs
     * @return {?}
     */
    function (node, obs) {
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    var /** @type {?} */ groupNode = /** @type {?} */ (node);
                    // tslint:disable-next-line:forin
                    for (var /** @type {?} */ o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    var /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    for (var /** @type {?} */ i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                var /** @type {?} */ answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                var /** @type {?} */ multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                var /** @type {?} */ complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                var /** @type {?} */ groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                var /** @type {?} */ repeatingGroupObs = this.findObsAnswerToQuestion(node, obs);
                if (repeatingGroupObs.length > 0) {
                    this.setRepeatingGroupObsNodeValue(node, repeatingGroupObs);
                }
                break;
            default:
                console.error('Unknown obs node', node);
                break;
        }
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    ObsAdapterHelper.prototype.setNodeFormControlValue = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) {
        node.control.setValue(value);
        // TODO: Determine if we need this call
        // node.control.updateValueAndValidity();
        // TODO: Remove this hack and put it in appropriate place
        if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
            node.question.setHistoricalValue(false);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getObsNodeType = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getSimpleObsPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
        var /** @type {?} */ obs = {
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getComplexObsPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ valueField; // essential memmber
        var /** @type {?} */ dateField; // other member to be manipulated by user
        var /** @type {?} */ nodeAsGroup = (/** @type {?} */ (node));
        // tslint:disable-next-line:forin
        for (var /** @type {?} */ o in nodeAsGroup.children) {
            if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if ((/** @type {?} */ (nodeAsGroup.children[o])).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        var /** @type {?} */ valuePayload = this.getObsNodePayload(valueField);
        // set obs datetime for the generated payload
        if (valuePayload.length > 0) {
            valuePayload[0].obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
            return valuePayload[0];
        }
        else if (valuePayload.length === 0 && node.initialValue) {
            // determine if date changed
            if (!this.areDatesEqual(node.initialValue.obsDatetime, dateField.control.value)) {
                var /** @type {?} */ payload = {
                    uuid: node.initialValue.uuid,
                };
                payload.obsDatetime = this.toOpenMrsDateTimeString(dateField.control.value);
                return payload;
            }
        }
        return null;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getMultiselectObsPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ payload = [];
        var /** @type {?} */ existingUuids = [];
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getGroupPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        var /** @type {?} */ nodeAsGroup = /** @type {?} */ (node);
        var /** @type {?} */ childrenPayload = [];
        _.each(nodeAsGroup.children, function (child) {
            var /** @type {?} */ payload = _this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        var /** @type {?} */ groupPayload = {
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getRepeatingGroupPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
        var /** @type {?} */ nodeAsArray = /** @type {?} */ (node);
        var /** @type {?} */ childrenPayload = [];
        var /** @type {?} */ groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, function (child) {
            var /** @type {?} */ payload = _this.getObsNodePayload(child);
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
                    var /** @type {?} */ voidedGroup = {
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getObsNodePayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var /** @type {?} */ payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    var /** @type {?} */ groupNode = /** @type {?} */ (node);
                    // tslint:disable-next-line:forin
                    for (var /** @type {?} */ o in groupNode.children) {
                        var /** @type {?} */ groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    var /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    for (var /** @type {?} */ i = 0; i < arrayNode.children.length; i++) {
                        var /** @type {?} */ arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                var /** @type {?} */ simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                var /** @type {?} */ multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                var /** @type {?} */ complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                var /** @type {?} */ groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                var /** @type {?} */ repeatingGroupedObs = this.getRepeatingGroupPayload(node);
                if (Array.isArray(repeatingGroupedObs) && repeatingGroupedObs.length > 0) {
                    payload = payload.concat(repeatingGroupedObs);
                }
                break;
            default:
                break;
        }
        return payload;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.simpleNodeValueChanged = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
    /**
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    ObsAdapterHelper.prototype.areDatesEqual = /**
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        return moment(date1).isSame(date2);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ObsAdapterHelper.prototype.isEmpty = /**
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
     * @param {?} datetime
     * @return {?}
     */
    ObsAdapterHelper.prototype.toOpenMrsDateTimeString = /**
     * @param {?} datetime
     * @return {?}
     */
    function (datetime) {
        if (this.isEmpty(datetime)) {
            return undefined;
        }
        var /** @type {?} */ val = datetime.substring(0, 19).replace('T', ' ');
        return this.isEmpty(val) ? undefined : val;
    };
    return ObsAdapterHelper;
}());
export { ObsAdapterHelper };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxxQkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCLE9BQU8sRUFBWSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLElBQUE7SUFDSTtLQUVDOzs7Ozs7SUFFRCxrREFBdUI7Ozs7O0lBQXZCLFVBQXdCLElBQWMsRUFBRSxRQUFvQjtRQUE1RCxpQkFvQ0M7UUFuQ0cscUJBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksUUFBUTtZQUN4QixDQUFDLElBQUksWUFBWSxTQUFTO2dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtnQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLEtBQUssQ0FBQyxJQUFJLENBQUMs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QUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDOUM7MkJBNWpCTDtJQThqQkMsQ0FBQTtBQXZqQkQsNEJBdWpCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEFycmF5Tm9kZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuXG5leHBvcnQgY2xhc3MgT2JzQWRhcHRlckhlbHBlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBmaW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlOiBOb2RlQmFzZSwgb2JzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlIHx8XG4gICAgICAgICAgICAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpKSB7XG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgbm9kZSBpcyBlaXRoZXIgYSBncm91cCBvciBhIHJlcGVhdGluZyBub2RlXG5cbiAgICAgICAgY29uc3QgY2hpbGRRdWVzdGlvbnNVdWlkcyA9IHRoaXMuZ2V0Q2hpbGRRdWVzdGlvbnNDb25jZXB0VXVpZHMobm9kZSk7XG4gICAgICAgIGlmIChjaGlsZFF1ZXN0aW9uc1V1aWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF8uZWFjaChvYnNBcnJheSwgKG9icykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnMuY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBvYnMuY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KG9icy5ncm91cE1lbWJlcnMpICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdWJzZXRPZihjaGlsZFF1ZXN0aW9uc1V1aWRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChvYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGU6IE5vZGVCYXNlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBnZXRHcm91cE1lbWJlcnNDb25jZXB0VXVpZHMob2JzV2l0aEdyb3VwTWVtYmVycyk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzKSkge1xuICAgICAgICAgICAgXy5lYWNoKG9ic1dpdGhHcm91cE1lbWJlcnMuZ3JvdXBNZW1iZXJzLFxuICAgICAgICAgICAgICAgIChtZW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChtZW1iZXIuY29uY2VwdC51dWlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBpc09ic05vZGUobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icy1jaGlsZCcpO1xuICAgIH1cblxuICAgIGlzU3Vic2V0T2Yoc3VwZXJzZXRBcnJheTogQXJyYXk8YW55Piwgc3Vic2V0QXJyYXk6IEFycmF5PGFueT4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHN1YnNldEFycmF5Lmxlbmd0aCA9PT0gMCAmJiBzdXBlcnNldEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnNldEFycmF5LmV2ZXJ5KChlbGVtZW50KTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXJzZXRBcnJheS5pbmRleE9mKGVsZW1lbnQpID49IDA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNUb1VzZSA9IG9ic1swXTtcblxuICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gb2JzVG9Vc2U7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSAmJiBvYnNUb1VzZS52YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5zd2VyIHRvIHRoZSBvYnMgaXMgYSBjb25jZXB0LCB1c2UgdXVpZCB2YWx1ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVG9Vc2UudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlLCBvYnNUb1VzZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgICAgICAgY29uc3Qgb2JzVXVpZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbSBvZiBvYnMpIHtcbiAgICAgICAgICAgICAgICBvYnNVdWlkcy5wdXNoKG0udmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVXVpZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tcGxleE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgICAgICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSAobm9kZSBhcyBHcm91cE5vZGUpO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBvYnMgdmFsdWUgaGVyZVxuICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUodmFsdWVGaWVsZCwgb2JzKTtcbiAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgZGF0ZSB2YWx1ZSBoZXJlXG4gICAgICAgICAgICBkYXRlRmllbGQuaW5pdGlhbFZhbHVlID0gdmFsdWVGaWVsZC5pbml0aWFsVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKGRhdGVGaWVsZCwgdmFsdWVGaWVsZC5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICBncm91cE5vZGUuaW5pdGlhbFZhbHVlID0gb2JzWzBdO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnNbMF0uZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlcGVhdGluZ0dyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgYXJyYXlOb2RlLmluaXRpYWxWYWx1ZSA9IG9icztcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVkTm9kZSA9IGFycmF5Tm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKGNyZWF0ZWROb2RlLCBbb2JzW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlVmFsdWUoZ3JvdXBOb2RlLmNoaWxkcmVuW29dLCBvYnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGFycmF5Tm9kZS5jaGlsZHJlbltpXSwgb2JzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBhbnN3ZXJpbmdPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNpbXBsZU9ic05vZGVWYWx1ZShub2RlLCBhbnN3ZXJpbmdPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNdWx0aXNlbGVjdE9ic05vZGVWYWx1ZShub2RlLCBtdWx0aXNlbGVjdE9icyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoIGFzbndlcmluZyBvYnMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgYW5zd2VyIGhlcmVcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZSwgY29tcGxleE9icyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIGlmIChncm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgZ3JvdXBPYnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGVhdGluZ0dyb3VwT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlLCByZXBlYXRpbmdHcm91cE9icyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vua25vd24gb2JzIG5vZGUnLCBub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGU6IE5vZGVCYXNlLCB2YWx1ZSkge1xuICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAvLyBUT0RPOiBEZXRlcm1pbmUgaWYgd2UgbmVlZCB0aGlzIGNhbGxcbiAgICAgICAgLy8gbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcblxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBoYWNrIGFuZCBwdXQgaXQgaW4gYXBwcm9wcmlhdGUgcGxhY2VcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE9ic05vZGVUeXBlKG5vZGU6IE5vZGVCYXNlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPYnNOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlICYmXG4gICAgICAgICAgICAgICAgKCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnY2hlY2tib3gnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpLXNlbGVjdCcpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbXVsdGlzZWxlY3QnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzaW1wbGUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbXBsZXgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmVwZWF0aW5nR3JvdXAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJlxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnNHcm91cCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2dyb3VwJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duT2JzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxuICAgIC8vIFBBWUxPQUQgR0VORVJBVElPTiBGVU5DVElPTlNcbiAgICBnZXRTaW1wbGVPYnNQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKTogYW55IHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGVtcHR5IHZhbHVlcyBmaXJzdFxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBjYXNlIGZvciBleGlzdGluZyB2b2lkZWQgb2JzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGV4aXNpdGluZywgdW5jaGFuZ2VkIHZhbHVlc1xuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUgJiYgIXRoaXMuc2ltcGxlTm9kZVZhbHVlQ2hhbmdlZChub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbGwgbnVtYmVycywgdGV4dCwgY29uY2VwdHMgYW5zd2VycyBhcmUgaGFuZGxlZCBpbiB0aGUgc2FtZSB3YXlcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZnVydGhlciBmb3JtYXR0aW5nIGluIHRoaXMgY2FzZVxuICAgICAgICBjb25zdCBvYnM6IGFueSA9IHtcbiAgICAgICAgICAgIGNvbmNlcHQ6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGhhbmRsZSBkYXRlIGZpZWxkc1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBvYnMudmFsdWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKG5vZGUuY29udHJvbC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGZvciBleGlzdGluZyBjYXNlcywgZGVsZXRlIGNvbmNlcHQgcHJvcGVydHksIGFuZCBhZGQgdXVpZFxuICAgICAgICAgICAgZGVsZXRlIG9icy5jb25jZXB0O1xuICAgICAgICAgICAgb2JzLnV1aWQgPSBub2RlLmluaXRpYWxWYWx1ZS51dWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9icztcbiAgICB9XG5cbiAgICBnZXRDb21wbGV4T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogTGVhZk5vZGU7IC8vIGVzc2VudGlhbCBtZW1tYmVyXG4gICAgICAgIGxldCBkYXRlRmllbGQ6IExlYWZOb2RlOyAvLyBvdGhlciBtZW1iZXIgdG8gYmUgbWFuaXB1bGF0ZWQgYnkgdXNlclxuXG4gICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gKG5vZGUgYXMgR3JvdXBOb2RlKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWVQYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZCh2YWx1ZUZpZWxkKTtcblxuICAgICAgICAvLyBzZXQgb2JzIGRhdGV0aW1lIGZvciB0aGUgZ2VuZXJhdGVkIHBheWxvYWRcbiAgICAgICAgaWYgKHZhbHVlUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZVBheWxvYWRbMF0ub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVBheWxvYWRbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA9PT0gMCAmJiBub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGRhdGUgY2hhbmdlZFxuICAgICAgICAgICAgaWYgKCF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5pbml0aWFsVmFsdWUub2JzRGF0ZXRpbWUsIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogbm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBheWxvYWQub2JzRGF0ZXRpbWUgPSB0aGlzLnRvT3Blbk1yc0RhdGVUaW1lU3RyaW5nKGRhdGVGaWVsZC5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXVpZHMgPSBbXTtcblxuICAgICAgICAvLyBhZGQgdm9pZGVkIG9icyBpLmUuIGRlbGV0ZWQgb3B0aW9uc1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlLmluaXRpYWxWYWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1V1aWRzLnB1c2goaXRlbS52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUuaW5kZXhPZihpdGVtLnZhbHVlLnV1aWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZXJ5IHZhbHVlIHdhcyBkZWxldGVkXG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBpdGVtLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgbmV3IG9icyBpLmUgdGhleSBkaWRuJ3QgZXhpc2l0IG9yaWdpbmFsbHlcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUuY29udHJvbC52YWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVdWlkcy5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIGdldEdyb3VwUGF5bG9hZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBub2RlQXNHcm91cDogR3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuUGF5bG9hZCA9IFtdO1xuICAgICAgICBfLmVhY2gobm9kZUFzR3JvdXAuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZCA9IGNoaWxkcmVuUGF5bG9hZC5jb25jYXQocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlblBheWxvYWRcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBncm91cFBheWxvYWQudXVpZCA9IG5vZGVBc0dyb3VwLmluaXRpYWxWYWx1ZS51dWlkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cFBheWxvYWQuY29uY2VwdCA9IG5vZGVBc0dyb3VwLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cFBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVBc0FycmF5OiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG5cbiAgICAgICAgY29uc3QgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nID0gW107XG4gICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGlsZC5pbml0aWFsVmFsdWUgJiYgY2hpbGQuaW5pdGlhbFZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcucHVzaChjaGlsZC5pbml0aWFsVmFsdWUudXVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHZvaWQgZGVsZXRlZCBncm91cHNcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2dyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZycsIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZyk7XG4gICAgICAgIGlmIChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheShub2RlQXNBcnJheS5pbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZUFzQXJyYXkuaW5pdGlhbFZhbHVlLCAob2JzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5pbmRleE9mKG9icy51dWlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgdm9pZGVkR3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQucHVzaCh2b2lkZWRHcm91cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW5QYXlsb2FkLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW5QYXlsb2FkO1xuXG4gICAgfVxuXG4gICAgZ2V0T2JzTm9kZVBheWxvYWQobm9kZTogTm9kZUJhc2UpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IHBheWxvYWQgPSBbXTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0T2JzTm9kZVR5cGUobm9kZSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Vua25vd24nOlxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlUGF5b2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChncm91cE5vZGUuY2hpbGRyZW5bb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZ3JvdXBOb2RlUGF5b2FkKSAmJiBncm91cE5vZGVQYXlvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChncm91cE5vZGVQYXlvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZVBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGFycmF5Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheU5vZGVQYXlsb2FkKSAmJiBhcnJheU5vZGVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQoYXJyYXlOb2RlUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICAgICAgICBjb25zdCBzaW1wbGVPYnMgPSB0aGlzLmdldFNpbXBsZU9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXBsZU9icyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goc2ltcGxlT2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZ2V0TXVsdGlzZWxlY3RPYnNQYXlsb2FkKG5vZGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobXVsdGlzZWxlY3RPYnMpICYmIG11bHRpc2VsZWN0T2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KG11bHRpc2VsZWN0T2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXhPYnMgPSB0aGlzLmdldENvbXBsZXhPYnNQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV4T2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChjb21wbGV4T2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkT2JzID0gdGhpcy5nZXRHcm91cFBheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwZWRPYnMgJiYgZ3JvdXBlZE9icyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goZ3JvdXBlZE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVwZWF0aW5nR3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGluZ0dyb3VwZWRPYnMgPSB0aGlzLmdldFJlcGVhdGluZ0dyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXBlYXRpbmdHcm91cGVkT2JzKSAmJiByZXBlYXRpbmdHcm91cGVkT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KHJlcGVhdGluZ0dyb3VwZWRPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBzaW1wbGVOb2RlVmFsdWVDaGFuZ2VkKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlLnZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAvLyBxdWVzdGlvbiB3aG9zZSBhbnN3ZXIgaXMgYSBjb25jZXB0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5hcmVEYXRlc0VxdWFsKG5vZGUuY29udHJvbC52YWx1ZSwgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbm9kZS5pbml0aWFsVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFyZURhdGVzRXF1YWwoZGF0ZTEsIGRhdGUyKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZTEpLmlzU2FtZShkYXRlMik7XG4gICAgfVxuXG4gICAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZXRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoZGF0ZXRpbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGV0aW1lLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRW1wdHkodmFsKSA/IHVuZGVmaW5lZCA6IHZhbDtcbiAgICB9XG5cbn1cbiJdfQ==