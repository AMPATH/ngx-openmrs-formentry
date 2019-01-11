/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
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
        /** @type {?} */
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
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getChildQuestionsConceptUuids = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
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
    /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    ObsAdapterHelper.prototype.getGroupMembersConceptUuids = /**
     * @param {?} obsWithGroupMembers
     * @return {?}
     */
    function (obsWithGroupMembers) {
        /** @type {?} */
        var found = [];
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
            /** @type {?} */
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
        var e_1, _a;
        if (node && obs.length > 0) {
            node.initialValue = obs;
            /** @type {?} */
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
            /** @type {?} */
            var valueField = void 0;
            // essential memmber
            /** @type {?} */
            var dateField = void 0;
            // other member to be manipulated by user
            /** @type {?} */
            var nodeAsGroup = ((/** @type {?} */ (node)));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
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
            /** @type {?} */
            var groupNode = (/** @type {?} */ (node));
            groupNode.initialValue = obs[0];
            // tslint:disable-next-line:forin
            for (var o in groupNode.children) {
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
            /** @type {?} */
            var arrayNode = (/** @type {?} */ (node));
            arrayNode.initialValue = obs;
            for (var i = 0; i < obs.length; i++) {
                /** @type {?} */
                var createdNode = arrayNode.createChildNode();
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
                    /** @type {?} */
                    var groupNode = (/** @type {?} */ (node));
                    // tslint:disable-next-line:forin
                    for (var o in groupNode.children) {
                        this.setNodeValue(groupNode.children[o], obs);
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    var arrayNode = (/** @type {?} */ (node));
                    for (var i = 0; i < arrayNode.children.length; i++) {
                        this.setNodeValue(arrayNode.children[i], obs);
                    }
                    break;
                }
                break;
            case 'simple':
                // search asnwering obs at this point
                /** @type {?} */
                var answeringObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setSimpleObsNodeValue(node, answeringObs);
                break;
            case 'multiselect':
                // search asnwering obs at this point
                /** @type {?} */
                var multiselectObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setMultiselectObsNodeValue(node, multiselectObs);
                break;
            case 'complex':
                // search asnwering obs at this point
                /** @type {?} */
                var complexObs = this.findObsAnswerToQuestion(node, obs);
                // set answer here
                this.setComplexObsNodeValue(node, complexObs);
                break;
            case 'group':
                /** @type {?} */
                var groupObs = this.findObsAnswerToQuestion(node, obs);
                if (groupObs.length > 0) {
                    this.setGroupObsNodeValue(node, groupObs);
                }
                break;
            case 'repeatingGroup':
                /** @type {?} */
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
    // PAYLOAD GENERATION FUNCTIONS
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getSimpleObsPayload = 
    // PAYLOAD GENERATION FUNCTIONS
    /**
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
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getComplexObsPayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var valueField;
        // essential memmber
        /** @type {?} */
        var dateField;
        // other member to be manipulated by user
        /** @type {?} */
        var nodeAsGroup = ((/** @type {?} */ (node)));
        // tslint:disable-next-line:forin
        for (var o in nodeAsGroup.children) {
            if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = nodeAsGroup.children[o];
            }
            if (((/** @type {?} */ (nodeAsGroup.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = nodeAsGroup.children[o];
            }
        }
        /** @type {?} */
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
                /** @type {?} */
                var payload = {
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
        /** @type {?} */
        var payload = [];
        /** @type {?} */
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
        /** @type {?} */
        var nodeAsGroup = (/** @type {?} */ (node));
        /** @type {?} */
        var childrenPayload = [];
        _.each(nodeAsGroup.children, function (child) {
            /** @type {?} */
            var payload = _this.getObsNodePayload(child);
            if (payload.length > 0) {
                childrenPayload = childrenPayload.concat(payload);
            }
        });
        if (childrenPayload.length === 0) {
            return null;
        }
        /** @type {?} */
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
        /** @type {?} */
        var nodeAsArray = (/** @type {?} */ (node));
        /** @type {?} */
        var childrenPayload = [];
        /** @type {?} */
        var groupsUuidsAfterEditting = [];
        _.each(nodeAsArray.children, function (child) {
            /** @type {?} */
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
                    /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    ObsAdapterHelper.prototype.getObsNodePayload = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var payload = [];
        switch (this.getObsNodeType(node)) {
            case 'unknown':
                if (node instanceof GroupNode) {
                    /** @type {?} */
                    var groupNode = (/** @type {?} */ (node));
                    // tslint:disable-next-line:forin
                    for (var o in groupNode.children) {
                        /** @type {?} */
                        var groupNodePayoad = this.getObsNodePayload(groupNode.children[o]);
                        if (Array.isArray(groupNodePayoad) && groupNodePayoad.length > 0) {
                            payload = payload.concat(groupNodePayoad);
                        }
                    }
                    break;
                }
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    var arrayNode = (/** @type {?} */ (node));
                    for (var i = 0; i < arrayNode.children.length; i++) {
                        /** @type {?} */
                        var arrayNodePayload = this.getObsNodePayload(arrayNode.children[i]);
                        if (Array.isArray(arrayNodePayload) && arrayNodePayload.length > 0) {
                            payload = payload.concat(arrayNodePayload);
                        }
                    }
                    break;
                }
                break;
            case 'simple':
                /** @type {?} */
                var simpleObs = this.getSimpleObsPayload(node);
                if (simpleObs !== null) {
                    payload.push(simpleObs);
                }
                break;
            case 'multiselect':
                /** @type {?} */
                var multiselectObs = this.getMultiselectObsPayload(node);
                if (Array.isArray(multiselectObs) && multiselectObs.length > 0) {
                    payload = payload.concat(multiselectObs);
                }
                break;
            case 'complex':
                /** @type {?} */
                var complexObs = this.getComplexObsPayload(node);
                if (complexObs !== null) {
                    payload.push(complexObs);
                }
                break;
            case 'group':
                /** @type {?} */
                var groupedObs = this.getGroupPayload(node);
                if (groupedObs && groupedObs !== null) {
                    payload.push(groupedObs);
                }
                break;
            case 'repeatingGroup':
                /** @type {?} */
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
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
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
        else {
            // transform value to memoent value to avoid error
            /** @type {?} */
            var formattedVal = moment(datetime).format();
            /** @type {?} */
            var val = formattedVal.substring(0, 19).replace('T', ' ');
            return this.isEmpty(val) ? undefined : val;
        }
    };
    return ObsAdapterHelper;
}());
export { ObsAdapterHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLWFkYXB0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87QUFFdEIsT0FBTyxFQUFZLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckY7SUFDSTtJQUVBLENBQUM7Ozs7OztJQUVELGtEQUF1Qjs7Ozs7SUFBdkIsVUFBd0IsSUFBYyxFQUFFLFFBQW9CO1FBQTVELGlCQW9DQzs7WUFuQ1MsS0FBSyxHQUFHLEVBQUU7UUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksWUFBWSxRQUFRO1lBQ3hCLENBQUMsSUFBSSxZQUFZLFNBQVM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsRUFBRTtZQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQUk7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDcEUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEI7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sS0FBSyxDQUFDO1NBQ2hCOzs7WUFJSyxtQkFBbUIsR0FB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USxDQUFDLEVBQUU7WUFDeEIsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTTs7O2dCQUVHLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFOztnQkFDeEMsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FFOUM7SUFDTCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBNWpCRCxJQTRqQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBBcnJheU5vZGUsIEdyb3VwTm9kZSwgTGVhZk5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcblxuZXhwb3J0IGNsYXNzIE9ic0FkYXB0ZXJIZWxwZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZTogTm9kZUJhc2UsIG9ic0FycmF5OiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSB8fFxuICAgICAgICAgICAgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSkge1xuICAgICAgICAgICAgXy5lYWNoKG9ic0FycmF5LCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIG5vZGUgaXMgZWl0aGVyIGEgZ3JvdXAgb3IgYSByZXBlYXRpbmcgbm9kZVxuXG4gICAgICAgIGNvbnN0IGNoaWxkUXVlc3Rpb25zVXVpZHMgPSB0aGlzLmdldENoaWxkUXVlc3Rpb25zQ29uY2VwdFV1aWRzKG5vZGUpO1xuICAgICAgICBpZiAoY2hpbGRRdWVzdGlvbnNVdWlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBfLmVhY2gob2JzQXJyYXksIChvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgb2JzLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvYnMuZ3JvdXBNZW1iZXJzKSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3Vic2V0T2YoY2hpbGRRdWVzdGlvbnNVdWlkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9icykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gob2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBnZXRDaGlsZFF1ZXN0aW9uc0NvbmNlcHRVdWlkcyhub2RlOiBOb2RlQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMgJiZcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQucHVzaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXBNZW1iZXJzQ29uY2VwdFV1aWRzKG9ic1dpdGhHcm91cE1lbWJlcnMpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycykpIHtcbiAgICAgICAgICAgIF8uZWFjaChvYnNXaXRoR3JvdXBNZW1iZXJzLmdyb3VwTWVtYmVycyxcbiAgICAgICAgICAgICAgICAobWVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gobWVtYmVyLmNvbmNlcHQudXVpZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgaXNPYnNOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icycgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnKTtcbiAgICB9XG5cbiAgICBpc1N1YnNldE9mKHN1cGVyc2V0QXJyYXk6IEFycmF5PGFueT4sIHN1YnNldEFycmF5OiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChzdWJzZXRBcnJheS5sZW5ndGggPT09IDAgJiYgc3VwZXJzZXRBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzZXRBcnJheS5ldmVyeSgoZWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyc2V0QXJyYXkuaW5kZXhPZihlbGVtZW50KSA+PSAwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgb2JzVG9Vc2UgPSBvYnNbMF07XG5cbiAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlXG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG9ic1RvVXNlO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eShvYnNUb1VzZS52YWx1ZSkgJiYgb2JzVG9Vc2UudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIC8vIGFuc3dlciB0byB0aGUgb2JzIGlzIGEgY29uY2VwdCwgdXNlIHV1aWQgdmFsdWVcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1RvVXNlLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VtcHR5KG9ic1RvVXNlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZUZvcm1Db250cm9sVmFsdWUobm9kZSwgb2JzVG9Vc2UudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgICAgICAgIGNvbnN0IG9ic1V1aWRzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG0gb2Ygb2JzKSB7XG4gICAgICAgICAgICAgICAgb2JzVXVpZHMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVGb3JtQ29udHJvbFZhbHVlKG5vZGUsIG9ic1V1aWRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbXBsZXhPYnNOb2RlVmFsdWUobm9kZTogTm9kZUJhc2UsIG9iczogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAobm9kZSAmJiBvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgICAgICAgICAgbGV0IGRhdGVGaWVsZDogTGVhZk5vZGU7IC8vIG90aGVyIG1lbWJlciB0byBiZSBtYW5pcHVsYXRlZCBieSB1c2VyXG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gKG5vZGUgYXMgR3JvdXBOb2RlKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChub2RlQXNHcm91cC5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgb2JzIHZhbHVlIGhlcmVcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKHZhbHVlRmllbGQsIG9icyk7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGRhdGUgdmFsdWUgaGVyZVxuICAgICAgICAgICAgZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZSA9IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShkYXRlRmllbGQsIHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic0RhdGV0aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTm9kZSA9IG5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgZ3JvdXBOb2RlLmluaXRpYWxWYWx1ZSA9IG9ic1swXTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIGdyb3VwTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzWzBdLmdyb3VwTWVtYmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSZXBlYXRpbmdHcm91cE9ic05vZGVWYWx1ZShub2RlOiBOb2RlQmFzZSwgb2JzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChub2RlICYmIG9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgIGFycmF5Tm9kZS5pbml0aWFsVmFsdWUgPSBvYnM7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3JlYXRlZE5vZGUgPSBhcnJheU5vZGUuY3JlYXRlQ2hpbGROb2RlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHcm91cE9ic05vZGVWYWx1ZShjcmVhdGVkTm9kZSwgW29ic1tpXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Tm9kZVZhbHVlKG5vZGU6IE5vZGVCYXNlLCBvYnM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldE9ic05vZGVUeXBlKG5vZGUpKSB7XG4gICAgICAgICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBncm91cE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm9kZVZhbHVlKGdyb3VwTm9kZS5jaGlsZHJlbltvXSwgb2JzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vZGVWYWx1ZShhcnJheU5vZGUuY2hpbGRyZW5baV0sIG9icyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggYXNud2VyaW5nIG9icyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICAgICAgY29uc3QgYW5zd2VyaW5nT2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTaW1wbGVPYnNOb2RlVmFsdWUobm9kZSwgYW5zd2VyaW5nT2JzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXNlbGVjdE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBhbnN3ZXIgaGVyZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TXVsdGlzZWxlY3RPYnNOb2RlVmFsdWUobm9kZSwgbXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbXBsZXgnOlxuICAgICAgICAgICAgICAgIC8vIHNlYXJjaCBhc253ZXJpbmcgb2JzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV4T2JzID0gdGhpcy5maW5kT2JzQW5zd2VyVG9RdWVzdGlvbihub2RlLCBvYnMpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGFuc3dlciBoZXJlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb21wbGV4T2JzTm9kZVZhbHVlKG5vZGUsIGNvbXBsZXhPYnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBPYnMgPSB0aGlzLmZpbmRPYnNBbnN3ZXJUb1F1ZXN0aW9uKG5vZGUsIG9icyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VwT2JzTm9kZVZhbHVlKG5vZGUsIGdyb3VwT2JzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZ0dyb3VwJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZXBlYXRpbmdHcm91cE9icyA9IHRoaXMuZmluZE9ic0Fuc3dlclRvUXVlc3Rpb24obm9kZSwgb2JzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXBlYXRpbmdHcm91cE9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVwZWF0aW5nR3JvdXBPYnNOb2RlVmFsdWUobm9kZSwgcmVwZWF0aW5nR3JvdXBPYnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmtub3duIG9icyBub2RlJywgbm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROb2RlRm9ybUNvbnRyb2xWYWx1ZShub2RlOiBOb2RlQmFzZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdGhpcyBjYWxsXG4gICAgICAgIC8vIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG5cbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgaGFjayBhbmQgcHV0IGl0IGluIGFwcHJvcHJpYXRlIHBsYWNlXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPYnNOb2RlVHlwZShub2RlOiBOb2RlQmFzZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzT2JzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSAmJlxuICAgICAgICAgICAgICAgICggbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2NoZWNrYm94JyB8fFxuICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aS1zZWxlY3QnKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ211bHRpc2VsZWN0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnc2ltcGxlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjb21wbGV4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnICYmXG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JlcGVhdGluZ0dyb3VwJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiZcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdncm91cCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bk9icyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICB9XG5cbiAgICAvLyBQQVlMT0FEIEdFTkVSQVRJT04gRlVOQ1RJT05TXG4gICAgZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IGFueSB7XG4gICAgICAgIC8vIGNoZWNrIGZvciBlbXB0eSB2YWx1ZXMgZmlyc3RcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY2FzZSBmb3IgZXhpc3Rpbmcgdm9pZGVkIG9ic1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IG5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBleGlzaXRpbmcsIHVuY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlICYmICF0aGlzLnNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWxsIG51bWJlcnMsIHRleHQsIGNvbmNlcHRzIGFuc3dlcnMgYXJlIGhhbmRsZWQgaW4gdGhlIHNhbWUgd2F5XG4gICAgICAgIC8vIG5vIG5lZWQgZm9yIGZ1cnRoZXIgZm9ybWF0dGluZyBpbiB0aGlzIGNhc2VcbiAgICAgICAgY29uc3Qgb2JzOiBhbnkgPSB7XG4gICAgICAgICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBoYW5kbGUgZGF0ZSBmaWVsZHNcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgb2JzLnZhbHVlID0gdGhpcy50b09wZW5NcnNEYXRlVGltZVN0cmluZyhub2RlLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBmb3IgZXhpc3RpbmcgY2FzZXMsIGRlbGV0ZSBjb25jZXB0IHByb3BlcnR5LCBhbmQgYWRkIHV1aWRcbiAgICAgICAgICAgIGRlbGV0ZSBvYnMuY29uY2VwdDtcbiAgICAgICAgICAgIG9icy51dWlkID0gbm9kZS5pbml0aWFsVmFsdWUudXVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYnM7XG4gICAgfVxuXG4gICAgZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IExlYWZOb2RlOyAvLyBlc3NlbnRpYWwgbWVtbWJlclxuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBMZWFmTm9kZTsgLy8gb3RoZXIgbWVtYmVyIHRvIGJlIG1hbmlwdWxhdGVkIGJ5IHVzZXJcblxuICAgICAgICBjb25zdCBub2RlQXNHcm91cCA9IChub2RlIGFzIEdyb3VwTm9kZSk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZUFzR3JvdXAuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlQXNHcm91cC5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbHVlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQodmFsdWVGaWVsZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2YWx1ZVBheWxvYWQnLCB2YWx1ZVBheWxvYWQpO1xuXG4gICAgICAgIC8vIHNldCBvYnMgZGF0ZXRpbWUgZm9yIHRoZSBnZW5lcmF0ZWQgcGF5bG9hZFxuICAgICAgICBpZiAodmFsdWVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlUGF5bG9hZFswXS5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlUGF5bG9hZFswXTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVBheWxvYWQubGVuZ3RoID09PSAwICYmIG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgaWYgZGF0ZSBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXJlRGF0ZXNFcXVhbChub2RlLmluaXRpYWxWYWx1ZS5vYnNEYXRldGltZSwgZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5vYnNEYXRldGltZSA9IHRoaXMudG9PcGVuTXJzRGF0ZVRpbWVTdHJpbmcoZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldE11bHRpc2VsZWN0T2JzUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICAgICAgY29uc3QgZXhpc3RpbmdVdWlkcyA9IFtdO1xuXG4gICAgICAgIC8vIGFkZCB2b2lkZWQgb2JzIGkuZS4gZGVsZXRlZCBvcHRpb25zXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgICAgXy5lYWNoKG5vZGUuaW5pdGlhbFZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nVXVpZHMucHVzaChpdGVtLnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUuY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZS5pbmRleE9mKGl0ZW0udmFsdWUudXVpZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnkgdmFsdWUgd2FzIGRlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBuZXcgb2JzIGkuZSB0aGV5IGRpZG4ndCBleGlzaXQgb3JpZ2luYWxseVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICBfLmVhY2gobm9kZS5jb250cm9sLnZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1V1aWRzLmluZGV4T2YoaXRlbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0R3JvdXBQYXlsb2FkKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVBc0dyb3VwOiBHcm91cE5vZGUgPSBub2RlIGFzIEdyb3VwTm9kZTtcblxuICAgICAgICBsZXQgY2hpbGRyZW5QYXlsb2FkID0gW107XG4gICAgICAgIF8uZWFjaChub2RlQXNHcm91cC5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRPYnNOb2RlUGF5bG9hZChjaGlsZCk7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5QYXlsb2FkID0gY2hpbGRyZW5QYXlsb2FkLmNvbmNhdChwYXlsb2FkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuUGF5bG9hZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgICBncm91cE1lbWJlcnM6IGNoaWxkcmVuUGF5bG9hZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChub2RlQXNHcm91cC5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGdyb3VwUGF5bG9hZC51dWlkID0gbm9kZUFzR3JvdXAuaW5pdGlhbFZhbHVlLnV1aWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwUGF5bG9hZC5jb25jZXB0ID0gbm9kZUFzR3JvdXAucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwUGF5bG9hZDtcbiAgICB9XG5cbiAgICBnZXRSZXBlYXRpbmdHcm91cFBheWxvYWQobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZUFzQXJyYXk6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgIGxldCBjaGlsZHJlblBheWxvYWQgPSBbXTtcblxuICAgICAgICBjb25zdCBncm91cHNVdWlkc0FmdGVyRWRpdHRpbmcgPSBbXTtcbiAgICAgICAgXy5lYWNoKG5vZGVBc0FycmF5LmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlblBheWxvYWQgPSBjaGlsZHJlblBheWxvYWQuY29uY2F0KHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoaWxkLmluaXRpYWxWYWx1ZSAmJiBjaGlsZC5pbml0aWFsVmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwc1V1aWRzQWZ0ZXJFZGl0dGluZy5wdXNoKGNoaWxkLmluaXRpYWxWYWx1ZS51dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdm9pZCBkZWxldGVkIGdyb3Vwc1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nJywgZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nKTtcbiAgICAgICAgaWYgKG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSAmJiBBcnJheS5pc0FycmF5KG5vZGVBc0FycmF5LmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIF8uZWFjaChub2RlQXNBcnJheS5pbml0aWFsVmFsdWUsIChvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBzVXVpZHNBZnRlckVkaXR0aW5nLmluZGV4T2Yob2JzLnV1aWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2b2lkZWRHcm91cCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuUGF5bG9hZC5wdXNoKHZvaWRlZEdyb3VwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlblBheWxvYWQubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZHJlblBheWxvYWQ7XG5cbiAgICB9XG5cbiAgICBnZXRPYnNOb2RlUGF5bG9hZChub2RlOiBOb2RlQmFzZSk6IEFycmF5PGFueT4ge1xuICAgICAgICBsZXQgcGF5bG9hZCA9IFtdO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRPYnNOb2RlVHlwZShub2RlKSkge1xuICAgICAgICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOb2RlID0gbm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gZ3JvdXBOb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE5vZGVQYXlvYWQgPSB0aGlzLmdldE9ic05vZGVQYXlsb2FkKGdyb3VwTm9kZS5jaGlsZHJlbltvXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShncm91cE5vZGVQYXlvYWQpICYmIGdyb3VwTm9kZVBheW9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQuY29uY2F0KGdyb3VwTm9kZVBheW9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlUGF5bG9hZCA9IHRoaXMuZ2V0T2JzTm9kZVBheWxvYWQoYXJyYXlOb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5Tm9kZVBheWxvYWQpICYmIGFycmF5Tm9kZVBheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBwYXlsb2FkLmNvbmNhdChhcnJheU5vZGVQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzaW1wbGUnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHNpbXBsZU9icyA9IHRoaXMuZ2V0U2ltcGxlT2JzUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2ltcGxlT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChzaW1wbGVPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpc2VsZWN0T2JzID0gdGhpcy5nZXRNdWx0aXNlbGVjdE9ic1BheWxvYWQobm9kZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtdWx0aXNlbGVjdE9icykgJiYgbXVsdGlzZWxlY3RPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQobXVsdGlzZWxlY3RPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnY29tcGxleCc6XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGxleE9icyA9IHRoaXMuZ2V0Q29tcGxleE9ic1BheWxvYWQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXhPYnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKGNvbXBsZXhPYnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwZWRPYnMgPSB0aGlzLmdldEdyb3VwUGF5bG9hZChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBlZE9icyAmJiBncm91cGVkT2JzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaChncm91cGVkT2JzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXBlYXRpbmdHcm91cCc6XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwZWF0aW5nR3JvdXBlZE9icyA9IHRoaXMuZ2V0UmVwZWF0aW5nR3JvdXBQYXlsb2FkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcGVhdGluZ0dyb3VwZWRPYnMpICYmIHJlcGVhdGluZ0dyb3VwZWRPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gcGF5bG9hZC5jb25jYXQocmVwZWF0aW5nR3JvdXBlZE9icyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHNpbXBsZU5vZGVWYWx1ZUNoYW5nZWQobm9kZTogTm9kZUJhc2UpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUudmFsdWUgJiYgbm9kZS5pbml0aWFsVmFsdWUudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgIC8vIHF1ZXN0aW9uIHdob3NlIGFuc3dlciBpcyBhIGNvbmNlcHRcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZS51dWlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmFyZURhdGVzRXF1YWwobm9kZS5jb250cm9sLnZhbHVlLCBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5jb250cm9sLnZhbHVlICE9PSBub2RlLmluaXRpYWxWYWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXJlRGF0ZXNFcXVhbChkYXRlMSwgZGF0ZTIpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlMSkuaXNTYW1lKGRhdGUyKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KHZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyB8fCB2YWx1ZSA9PT0gW10gfHxcbiAgICAgICAgICAgIC8vIHZhbHVlID09PSB7fVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0b09wZW5NcnNEYXRlVGltZVN0cmluZyhkYXRldGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShkYXRldGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm0gdmFsdWUgdG8gbWVtb2VudCB2YWx1ZSB0byBhdm9pZCBlcnJvclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gbW9tZW50KGRhdGV0aW1lKS5mb3JtYXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGZvcm1hdHRlZFZhbC5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNFbXB0eSh2YWwpID8gdW5kZWZpbmVkIDogdmFsO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==