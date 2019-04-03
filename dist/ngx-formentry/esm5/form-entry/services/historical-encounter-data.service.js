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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBSUU7UUFEQSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQUV0QixDQUFDOzs7Ozs7SUFFRCwyREFBa0I7Ozs7O0lBQWxCLFVBQW1CLElBQVksRUFBRSxVQUFlO1FBQWhELGlCQWlDQzs7WUFoQ08sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUTs7Ozs7WUFBRSxVQUFDLEdBQVcsRUFBRSxLQUFTO2dCQUFULHNCQUFBLEVBQUEsU0FBUzs7b0JBQ3pCLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUNELGFBQWE7OztZQUFFO2dCQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FB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QUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDOztnQkExTEYsVUFBVTs7O0lBNkxYLHFDQUFDO0NBQUEsQUE3TEQsSUE2TEM7U0E1TFksOEJBQThCOzs7SUFFekMscURBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2Uge1xyXG5cclxuICBkYXRhU291cmNlczogYW55ID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlckVuY291bnRlcnMobmFtZTogc3RyaW5nLCBlbmNvdW50ZXJzOiBhbnkpIHtcclxuICAgIGNvbnN0IGVuY1N0b3JlOiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IFtdLFxyXG4gICAgICBnZXRWYWx1ZTogKGtleTogc3RyaW5nLCBpbmRleCA9IDApOiBhbnkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RWYWx1ZShwYXRoQXJyYXksIGVuY1N0b3JlLmRhdGFbaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEFsbE9iamVjdHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U2luZ2xlT2JqZWN0OiAoaW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChfLmlzQXJyYXkoZW5jb3VudGVycykpIHtcclxuICAgICAgY29uc3QgZ3JvdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcclxuICAgICAgICBncm91cC5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXIpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBTb3J0IHRoZW0gaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyXHJcbiAgICAgIGVuY1N0b3JlLmRhdGEgPSBfLnNvcnRCeShncm91cCwgJ2VuY291bnRlckRhdGV0aW1lJykucmV2ZXJzZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQXNzdW1lIGEgc2luZ2xlIG9wZW5tcnMgcmVzdCBlbmNvdW50ZXIgb2JqZWN0LlxyXG4gICAgICBlbmNTdG9yZS5kYXRhLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcnMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1dE9iamVjdChuYW1lLCBlbmNTdG9yZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHV0T2JqZWN0KG5hbWUsIG9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhU291cmNlc1tuYW1lXSA9IG9iamVjdDtcclxuICB9XHJcblxyXG4gIGdldE9iamVjdChuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIGdldEZpcnN0VmFsdWUocGF0aDogQXJyYXk8c3RyaW5nPiwgb2JqZWN0OiBhbnkpOiBhbnkge1xyXG5cclxuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpO1xyXG5cclxuICAgIGlmIChhbnN3ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcclxuICAgICAgICB2YWx1ZURhdGU6IG1vbWVudChvYmplY3QuZW5jb3VudGVyRGF0ZXRpbWUpLmZvcm1hdCgnbGwnKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpIHtcclxuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIGlmICghXy5pc05pbChvYmplY3RbcGF0aFswXV0pKSB7XHJcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld3BhdGggPSBwYXRoLnNwbGljZSgxKTtcclxuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XHJcblxyXG4gICAgaWYgKF8uaXNBcnJheShvYmplY3Rba2V5XSkgJiYgb2JqZWN0W2tleV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIGNoaWxkT2JqZWN0LCBhbnN3ZXJzKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBvYmplY3Rba2V5XSwgYW5zd2Vycyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyOiBhbnkpIHtcclxuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cclxuICAgIGNvbnN0IHByZXZFbmNvdW50ZXI6IGFueSA9IHtcclxuICAgICAgZW5jb3VudGVyRGF0ZXRpbWU6IGVuY291bnRlci5lbmNvdW50ZXJEYXRldGltZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLmxvY2F0aW9uICYmIGVuY291bnRlci5sb2NhdGlvbi51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnBhdGllbnQgPSBlbmNvdW50ZXIucGF0aWVudC51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmNvdW50ZXIuZm9ybSAmJiBlbmNvdW50ZXIuZm9ybS51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIuZm9ybSA9IGVuY291bnRlci5mb3JtLnV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVuY291bnRlci5lbmNvdW50ZXJUeXBlICYmIGVuY291bnRlci5lbmNvdW50ZXJUeXBlLnV1aWQpIHtcclxuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XHJcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZW5jb3VudGVyLnByb3ZpZGVyO1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnByb3ZpZGVyID0gcHJvdmlkZXIudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWFsIHdpdGggb2JzLlxyXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcclxuICAgICAgY29uc3QgcHJvY2Vzc2VkT2JzOiBhbnkgPSB0aGlzLl90cmFuc2Zvcm1PYnMoZW5jb3VudGVyLm9icyk7XHJcblxyXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcclxuICAgICAgXy5leHRlbmQocHJldkVuY291bnRlciwgcHJvY2Vzc2VkT2JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJldkVuY291bnRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3RyYW5zZm9ybU9icyhvYnM6IGFueSk6IGFueSB7XHJcblxyXG4gICAgaWYgKCFvYnMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzUmVwOiBhbnkgPSB7fTtcclxuICAgIGlmIChfLmlzQXJyYXkob2JzKSkge1xyXG4gICAgICBfLmVhY2gob2JzLCAoc2luZ2xlT2JzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMob2JzUmVwLCB0aGlzLl90cmFuc2Zvcm1PYnMoc2luZ2xlT2JzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb2JzUmVwO1xyXG4gICAgfSBlbHNlIGlmIChvYnMuZ3JvdXBNZW1iZXJzKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcclxuICAgICAgXy5lYWNoKG9icy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhncm91cCwgdGhpcy5fdHJhbnNmb3JtT2JzKG1lbWJlcikpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEhhbmRsZSBhbHJlYWR5IGV4aXN0aW5nIGRhdGFcclxuICAgICAgaWYgKG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSAmJiBfLmlzQXJyYXkob2JzUmVwW29icy5jb25jZXB0LnV1aWRdKSkge1xyXG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBbZ3JvdXBdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlLnV1aWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b0FkZCkge1xyXG4gICAgICBpZiAoXy5oYXMoZXhpc3RpbmcsIGtleSkpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XHJcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcclxuICAgICAgICAgIGNvbnN0IHRlbXAgPSBleGlzdGluZ1trZXldO1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcclxuICAgICAgICBpZiAoXy5pc0FycmF5KHRvQWRkW2tleV0pKSB7XHJcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShleGlzdGluZ1trZXldLCB0b0FkZFtrZXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XS5wdXNoKHRvQWRkW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBleGlzdGluZ1trZXldID0gdG9BZGRba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4aXN0aW5nO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==