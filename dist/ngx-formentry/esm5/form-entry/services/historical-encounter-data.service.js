/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
var HistoricalEncounterDataService = /** @class */ (function () {
    function HistoricalEncounterDataService() {
        this.dataSources = {};
    }
    /**
     * @param {?} name
     * @param {?} encounters
     * @return {?}
     */
    HistoricalEncounterDataService.prototype.registerEncounters = /**
     * @param {?} name
     * @param {?} encounters
     * @return {?}
     */
    function (name, encounters) {
        var _this = this;
        /** @type {?} */
        var encStore = {
            data: [],
            getValue: (/**
             * @param {?} key
             * @param {?=} index
             * @return {?}
             */
            function (key, index) {
                if (index === void 0) { index = 0; }
                /** @type {?} */
                var pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return _this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            }),
            getAllObjects: (/**
             * @return {?}
             */
            function () {
                return encStore.data;
            }),
            getSingleObject: (/**
             * @param {?=} index
             * @return {?}
             */
            function (index) {
                if (index === void 0) { index = 0; }
                return encStore.data[index];
            })
        };
        if (_.isArray(encounters)) {
            /** @type {?} */
            var group_1 = [];
            _.each(encounters, (/**
             * @param {?} encounter
             * @return {?}
             */
            function (encounter) {
                group_1.push(_this._transformEncounter(encounter));
            }));
            // Sort them in reverse chronological order
            encStore.data = _.sortBy(group_1, 'encounterDatetime').reverse();
        }
        else {
            // Assume a single openmrs rest encounter object.
            encStore.data.push(this._transformEncounter(encounters));
        }
        this.putObject(name, encStore);
    };
    /**
     * @param {?} name
     * @param {?} object
     * @return {?}
     */
    HistoricalEncounterDataService.prototype.putObject = /**
     * @param {?} name
     * @param {?} object
     * @return {?}
     */
    function (name, object) {
        this.dataSources[name] = object;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    HistoricalEncounterDataService.prototype.getObject = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.dataSources[name] || null;
    };
    /**
     * @param {?} path
     * @param {?} object
     * @return {?}
     */
    HistoricalEncounterDataService.prototype.getFirstValue = /**
     * @param {?} path
     * @param {?} object
     * @return {?}
     */
    function (path, object) {
        /** @type {?} */
        var answers = [];
        this.getAllValues(path, object, answers);
        if (answers.length > 0) {
            return {
                value: answers[0],
                valueDate: moment(object.encounterDatetime).format('ll')
            };
        }
    };
    /**
     * @param {?} path
     * @param {?} object
     * @param {?} answers
     * @return {?}
     */
    HistoricalEncounterDataService.prototype.getAllValues = /**
     * @param {?} path
     * @param {?} object
     * @param {?} answers
     * @return {?}
     */
    function (path, object, answers) {
        var _this = this;
        if (_.isNil(object)) {
            return;
        }
        if (path.length <= 1) {
            if (!_.isNil(object[path[0]])) {
                answers.push(object[path[0]]);
            }
            return;
        }
        /** @type {?} */
        var newpath = path.splice(1);
        /** @type {?} */
        var key = path[0];
        if (_.isArray(object[key]) && object[key].length > 0) {
            _.each(object[key], (/**
             * @param {?} childObject
             * @return {?}
             */
            function (childObject) {
                _this.getAllValues(newpath.slice(0), childObject, answers);
            }));
        }
        else {
            this.getAllValues(newpath.slice(0), object[key], answers);
        }
    };
    /**
     * @private
     * @param {?} encounter
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._transformEncounter = /**
     * @private
     * @param {?} encounter
     * @return {?}
     */
    function (encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        /** @type {?} */
        var prevEncounter = {
            encounterDatetime: encounter.encounterDatetime
        };
        if (encounter.location && encounter.location.uuid) {
            prevEncounter.location = encounter.location.uuid;
        }
        if (encounter.patient && encounter.patient.uuid) {
            prevEncounter.patient = encounter.patient.uuid;
        }
        if (encounter.form && encounter.form.uuid) {
            prevEncounter.form = encounter.form.uuid;
        }
        if (encounter.encounterType && encounter.encounterType.uuid) {
            prevEncounter.encounterType = encounter.encounterType.uuid;
        }
        if (encounter.provider) {
            /** @type {?} */
            var provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            /** @type {?} */
            var processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    };
    /**
     * @private
     * @param {?} obs
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._transformObs = /**
     * @private
     * @param {?} obs
     * @return {?}
     */
    function (obs) {
        var _this = this;
        if (!obs) {
            return null;
        }
        /** @type {?} */
        var obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, (/**
             * @param {?} singleObs
             * @return {?}
             */
            function (singleObs) {
                _this._augumentObs(obsRep, _this._transformObs(singleObs));
            }));
            return obsRep;
        }
        else if (obs.groupMembers) {
            /** @type {?} */
            var group_2 = {};
            _.each(obs.groupMembers, (/**
             * @param {?} member
             * @return {?}
             */
            function (member) {
                _this._augumentObs(group_2, _this._transformObs(member));
            }));
            // Handle already existing data
            if (obsRep[obs.concept.uuid] && _.isArray(obsRep[obs.concept.uuid])) {
                obsRep[obs.concept.uuid].push(group_2);
            }
            else {
                obsRep[obs.concept.uuid] = [group_2];
            }
            return obsRep;
        }
        else {
            if (obs.value instanceof Object) {
                obsRep[obs.concept.uuid] = obs.value.uuid;
            }
            else {
                obsRep[obs.concept.uuid] = obs.value;
            }
            return obsRep;
        }
    };
    /**
     * @private
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._augumentObs = /**
     * @private
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    function (existing, toAdd) {
        for (var key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
                    /** @type {?} */
                    var temp = existing[key];
                    existing[key] = [temp];
                }
                // Check whether the incoming is array (for group members)
                if (_.isArray(toAdd[key])) {
                    Array.prototype.push.apply(existing[key], toAdd[key]);
                }
                else {
                    existing[key].push(toAdd[key]);
                }
            }
            else {
                existing[key] = toAdd[key];
            }
        }
        return existing;
    };
    HistoricalEncounterDataService.decorators = [
        { type: Injectable },
    ];
    HistoricalEncounterDataService.ctorParameters = function () { return []; };
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
if (false) {
    /** @type {?} */
    HistoricalEncounterDataService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBSUU7UUFEQSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQUV0QixDQUFDOzs7Ozs7SUFFRCwyREFBa0I7Ozs7O0lBQWxCLFVBQW1CLElBQVksRUFBRSxVQUFlO1FBQWhELGlCQWlDQzs7WUFoQ08sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUTs7Ozs7WUFBRSxVQUFDLEdBQVcsRUFBRSxLQUFTO2dCQUFULHNCQUFBLEVBQUEsU0FBUzs7b0JBQ3pCLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUNELGFBQWE7OztZQUFFO2dCQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FB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QUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDOztnQkExTEYsVUFBVTs7O0lBNkxYLHFDQUFDO0NBQUEsQUE3TEQsSUE2TEM7U0E1TFksOEJBQThCOzs7SUFFekMscURBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIHtcblxuICBkYXRhU291cmNlczogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcmVnaXN0ZXJFbmNvdW50ZXJzKG5hbWU6IHN0cmluZywgZW5jb3VudGVyczogYW55KSB7XG4gICAgY29uc3QgZW5jU3RvcmU6IGFueSA9IHtcbiAgICAgIGRhdGE6IFtdLFxuICAgICAgZ2V0VmFsdWU6IChrZXk6IHN0cmluZywgaW5kZXggPSAwKTogYW55ID0+IHtcbiAgICAgICAgY29uc3QgcGF0aEFycmF5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0VmFsdWUocGF0aEFycmF5LCBlbmNTdG9yZS5kYXRhW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XG4gICAgICB9LFxuICAgICAgZ2V0QWxsT2JqZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcbiAgICAgIH0sXG4gICAgICBnZXRTaW5nbGVPYmplY3Q6IChpbmRleCA9IDApID0+IHtcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoXy5pc0FycmF5KGVuY291bnRlcnMpKSB7XG4gICAgICBjb25zdCBncm91cDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcbiAgICAgICAgZ3JvdXAucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU29ydCB0aGVtIGluIHJldmVyc2UgY2hyb25vbG9naWNhbCBvcmRlclxuICAgICAgZW5jU3RvcmUuZGF0YSA9IF8uc29ydEJ5KGdyb3VwLCAnZW5jb3VudGVyRGF0ZXRpbWUnKS5yZXZlcnNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFzc3VtZSBhIHNpbmdsZSBvcGVubXJzIHJlc3QgZW5jb3VudGVyIG9iamVjdC5cbiAgICAgIGVuY1N0b3JlLmRhdGEucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVycykpO1xuICAgIH1cblxuICAgIHRoaXMucHV0T2JqZWN0KG5hbWUsIGVuY1N0b3JlKTtcblxuICB9XG5cbiAgcHV0T2JqZWN0KG5hbWUsIG9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gPSBvYmplY3Q7XG4gIH1cblxuICBnZXRPYmplY3QobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlc1tuYW1lXSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Rmlyc3RWYWx1ZShwYXRoOiBBcnJheTxzdHJpbmc+LCBvYmplY3Q6IGFueSk6IGFueSB7XG5cbiAgICBjb25zdCBhbnN3ZXJzID0gW107XG5cbiAgICB0aGlzLmdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpO1xuXG4gICAgaWYgKGFuc3dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGFuc3dlcnNbMF0sXG4gICAgICAgIHZhbHVlRGF0ZTogbW9tZW50KG9iamVjdC5lbmNvdW50ZXJEYXRldGltZSkuZm9ybWF0KCdsbCcpXG4gICAgICB9O1xuICAgIH1cblxuICB9XG5cbiAgZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycykge1xuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPD0gMSkge1xuICAgICAgaWYgKCFfLmlzTmlsKG9iamVjdFtwYXRoWzBdXSkpIHtcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3cGF0aCA9IHBhdGguc3BsaWNlKDEpO1xuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG5cbiAgICBpZiAoXy5pc0FycmF5KG9iamVjdFtrZXldKSAmJiBvYmplY3Rba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBjaGlsZE9iamVjdCwgYW5zd2Vycyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRBbGxWYWx1ZXMobmV3cGF0aC5zbGljZSgwKSwgb2JqZWN0W2tleV0sIGFuc3dlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXI6IGFueSkge1xuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cbiAgICBjb25zdCBwcmV2RW5jb3VudGVyOiBhbnkgPSB7XG4gICAgICBlbmNvdW50ZXJEYXRldGltZTogZW5jb3VudGVyLmVuY291bnRlckRhdGV0aW1lXG4gICAgfTtcblxuICAgIGlmIChlbmNvdW50ZXIubG9jYXRpb24gJiYgZW5jb3VudGVyLmxvY2F0aW9uLnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5wYXRpZW50ID0gZW5jb3VudGVyLnBhdGllbnQudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmZvcm0gJiYgZW5jb3VudGVyLmZvcm0udXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5mb3JtID0gZW5jb3VudGVyLmZvcm0udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmVuY291bnRlclR5cGUgJiYgZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IGVuY291bnRlci5wcm92aWRlcjtcbiAgICAgIHByZXZFbmNvdW50ZXIucHJvdmlkZXIgPSBwcm92aWRlci51dWlkO1xuICAgIH1cblxuICAgIC8vIERlYWwgd2l0aCBvYnMuXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZE9iczogYW55ID0gdGhpcy5fdHJhbnNmb3JtT2JzKGVuY291bnRlci5vYnMpO1xuXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcbiAgICAgIF8uZXh0ZW5kKHByZXZFbmNvdW50ZXIsIHByb2Nlc3NlZE9icyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZFbmNvdW50ZXI7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1PYnMob2JzOiBhbnkpOiBhbnkge1xuXG4gICAgaWYgKCFvYnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG9ic1JlcDogYW55ID0ge307XG4gICAgaWYgKF8uaXNBcnJheShvYnMpKSB7XG4gICAgICBfLmVhY2gob2JzLCAoc2luZ2xlT2JzKSA9PiB7XG4gICAgICAgIHRoaXMuX2F1Z3VtZW50T2JzKG9ic1JlcCwgdGhpcy5fdHJhbnNmb3JtT2JzKHNpbmdsZU9icykpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH0gZWxzZSBpZiAob2JzLmdyb3VwTWVtYmVycykge1xuICAgICAgY29uc3QgZ3JvdXA6IGFueSA9IHt9O1xuICAgICAgXy5lYWNoKG9icy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMoZ3JvdXAsIHRoaXMuX3RyYW5zZm9ybU9icyhtZW1iZXIpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBIYW5kbGUgYWxyZWFkeSBleGlzdGluZyBkYXRhXG4gICAgICBpZiAob2JzUmVwW29icy5jb25jZXB0LnV1aWRdICYmIF8uaXNBcnJheShvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0pKSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXS5wdXNoKGdyb3VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IFtncm91cF07XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IG9icy52YWx1ZS51dWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgX2F1Z3VtZW50T2JzKGV4aXN0aW5nOiBhbnksIHRvQWRkOiBhbnkpOiBhbnkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHRvQWRkKSB7XG4gICAgICBpZiAoXy5oYXMoZXhpc3RpbmcsIGtleSkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgbm90IGFuIGFycmF5IHlldFxuICAgICAgICBpZiAoIV8uaXNBcnJheShleGlzdGluZ1trZXldKSkge1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSBleGlzdGluZ1trZXldO1xuICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBbdGVtcF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBpbmNvbWluZyBpcyBhcnJheSAoZm9yIGdyb3VwIG1lbWJlcnMpXG4gICAgICAgIGlmIChfLmlzQXJyYXkodG9BZGRba2V5XSkpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShleGlzdGluZ1trZXldLCB0b0FkZFtrZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGlzdGluZ1trZXldLnB1c2godG9BZGRba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4aXN0aW5nW2tleV0gPSB0b0FkZFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhpc3Rpbmc7XG4gIH1cblxuXG59XG4iXX0=