/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
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
        var /** @type {?} */ encStore = {
            data: [],
            getValue: function (key, index) {
                if (index === void 0) { index = 0; }
                var /** @type {?} */ pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return _this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            },
            getAllObjects: function () {
                return encStore.data;
            },
            getSingleObject: function (index) {
                if (index === void 0) { index = 0; }
                return encStore.data[index];
            }
        };
        if (_.isArray(encounters)) {
            var /** @type {?} */ group_1 = [];
            _.each(encounters, function (encounter) {
                group_1.push(_this._transformEncounter(encounter));
            });
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
        var /** @type {?} */ answers = [];
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
        var /** @type {?} */ newpath = path.splice(1);
        var /** @type {?} */ key = path[0];
        if (_.isArray(object[key]) && object[key].length > 0) {
            _.each(object[key], function (childObject) {
                _this.getAllValues(newpath.slice(0), childObject, answers);
            });
        }
        else {
            this.getAllValues(newpath.slice(0), object[key], answers);
        }
    };
    /**
     * @param {?} encounter
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._transformEncounter = /**
     * @param {?} encounter
     * @return {?}
     */
    function (encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        var /** @type {?} */ prevEncounter = {
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
            var /** @type {?} */ provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            var /** @type {?} */ processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    };
    /**
     * @param {?} obs
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._transformObs = /**
     * @param {?} obs
     * @return {?}
     */
    function (obs) {
        var _this = this;
        if (!obs) {
            return null;
        }
        var /** @type {?} */ obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, function (singleObs) {
                _this._augumentObs(obsRep, _this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            var /** @type {?} */ group_2 = {};
            _.each(obs.groupMembers, function (member) {
                _this._augumentObs(group_2, _this._transformObs(member));
            });
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
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    HistoricalEncounterDataService.prototype._augumentObs = /**
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    function (existing, toAdd) {
        for (var /** @type {?} */ key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
                    var /** @type {?} */ temp = existing[key];
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
    /** @nocollapse */
    HistoricalEncounterDataService.ctorParameters = function () { return []; };
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
function HistoricalEncounterDataService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HistoricalEncounterDataService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HistoricalEncounterDataService.ctorParameters;
    /** @type {?} */
    HistoricalEncounterDataService.prototype.dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQzs7SUFNckI7MkJBRG1CLEVBQUU7S0FFcEI7Ozs7OztJQUVELDJEQUFrQjs7Ozs7SUFBbEIsVUFBbUIsSUFBWSxFQUFFLFVBQWU7UUFBaEQsaUJBaUNDO1FBaENDLHFCQUFNLFFBQVEsR0FBUTtZQUNwQixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxVQUFDLEdBQVcsRUFBRSxLQUFTO2dCQUFULHNCQUFBLEVBQUEsU0FBUztnQkFDL0IscUJBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDdEI7WUFDRCxlQUFlLEVBQUUsVUFBQyxLQUFTO2dC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QUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUV6QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixxQkFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMzQixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEI7O2dCQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN2RDtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNGO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQXpMbkIsVUFBVTs7Ozt5Q0FOWDs7U0FPYSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSB7XHJcblxyXG4gIGRhdGFTb3VyY2VzOiBhbnkgPSB7fTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyRW5jb3VudGVycyhuYW1lOiBzdHJpbmcsIGVuY291bnRlcnM6IGFueSkge1xyXG4gICAgY29uc3QgZW5jU3RvcmU6IGFueSA9IHtcclxuICAgICAgZGF0YTogW10sXHJcbiAgICAgIGdldFZhbHVlOiAoa2V5OiBzdHJpbmcsIGluZGV4ID0gMCk6IGFueSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGF0aEFycmF5ID0ga2V5LnNwbGl0KCcuJyk7XHJcbiAgICAgICAgaWYgKHBhdGhBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJzdFZhbHVlKHBhdGhBcnJheSwgZW5jU3RvcmUuZGF0YVtpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF1ba2V5XTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0QWxsT2JqZWN0czogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbmNTdG9yZS5kYXRhO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRTaW5nbGVPYmplY3Q6IChpbmRleCA9IDApID0+IHtcclxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKF8uaXNBcnJheShlbmNvdW50ZXJzKSkge1xyXG4gICAgICBjb25zdCBncm91cDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBfLmVhY2goZW5jb3VudGVycywgKGVuY291bnRlcikgPT4ge1xyXG4gICAgICAgIGdyb3VwLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcikpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFNvcnQgdGhlbSBpbiByZXZlcnNlIGNocm9ub2xvZ2ljYWwgb3JkZXJcclxuICAgICAgZW5jU3RvcmUuZGF0YSA9IF8uc29ydEJ5KGdyb3VwLCAnZW5jb3VudGVyRGF0ZXRpbWUnKS5yZXZlcnNlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBBc3N1bWUgYSBzaW5nbGUgb3Blbm1ycyByZXN0IGVuY291bnRlciBvYmplY3QuXHJcbiAgICAgIGVuY1N0b3JlLmRhdGEucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVycykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHV0T2JqZWN0KG5hbWUsIGVuY1N0b3JlKTtcclxuXHJcbiAgfVxyXG5cclxuICBwdXRPYmplY3QobmFtZSwgb2JqZWN0KTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2VzW25hbWVdID0gb2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0T2JqZWN0KG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlc1tuYW1lXSB8fCBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0Rmlyc3RWYWx1ZShwYXRoOiBBcnJheTxzdHJpbmc+LCBvYmplY3Q6IGFueSk6IGFueSB7XHJcblxyXG4gICAgY29uc3QgYW5zd2VycyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycyk7XHJcblxyXG4gICAgaWYgKGFuc3dlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBhbnN3ZXJzWzBdLFxyXG4gICAgICAgIHZhbHVlRGF0ZTogbW9tZW50KG9iamVjdC5lbmNvdW50ZXJEYXRldGltZSkuZm9ybWF0KCdsbCcpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycykge1xyXG4gICAgaWYgKF8uaXNOaWwob2JqZWN0KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhdGgubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgaWYgKCFfLmlzTmlsKG9iamVjdFtwYXRoWzBdXSkpIHtcclxuICAgICAgICBhbnN3ZXJzLnB1c2gob2JqZWN0W3BhdGhbMF1dKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3cGF0aCA9IHBhdGguc3BsaWNlKDEpO1xyXG4gICAgY29uc3Qga2V5ID0gcGF0aFswXTtcclxuXHJcbiAgICBpZiAoXy5pc0FycmF5KG9iamVjdFtrZXldKSAmJiBvYmplY3Rba2V5XS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIF8uZWFjaChvYmplY3Rba2V5XSwgKGNoaWxkT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxWYWx1ZXMobmV3cGF0aC5zbGljZSgwKSwgY2hpbGRPYmplY3QsIGFuc3dlcnMpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIG9iamVjdFtrZXldLCBhbnN3ZXJzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXI6IGFueSkge1xyXG4gICAgaWYgKF8uaXNOaWwoZW5jb3VudGVyKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBUcmFuc2Zvcm0gZW5jb3VudGVyIExldmVsIGRldGFpbHMgdG8ga2V5IHZhbHVlIHBhaXJzLlxyXG4gICAgY29uc3QgcHJldkVuY291bnRlcjogYW55ID0ge1xyXG4gICAgICBlbmNvdW50ZXJEYXRldGltZTogZW5jb3VudGVyLmVuY291bnRlckRhdGV0aW1lXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChlbmNvdW50ZXIubG9jYXRpb24gJiYgZW5jb3VudGVyLmxvY2F0aW9uLnV1aWQpIHtcclxuICAgICAgcHJldkVuY291bnRlci5sb2NhdGlvbiA9IGVuY291bnRlci5sb2NhdGlvbi51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmNvdW50ZXIucGF0aWVudCAmJiBlbmNvdW50ZXIucGF0aWVudC51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIucGF0aWVudCA9IGVuY291bnRlci5wYXRpZW50LnV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVuY291bnRlci5mb3JtICYmIGVuY291bnRlci5mb3JtLnV1aWQpIHtcclxuICAgICAgcHJldkVuY291bnRlci5mb3JtID0gZW5jb3VudGVyLmZvcm0udXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLmVuY291bnRlclR5cGUgJiYgZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZCkge1xyXG4gICAgICBwcmV2RW5jb3VudGVyLmVuY291bnRlclR5cGUgPSBlbmNvdW50ZXIuZW5jb3VudGVyVHlwZS51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmNvdW50ZXIucHJvdmlkZXIpIHtcclxuICAgICAgY29uc3QgcHJvdmlkZXIgPSBlbmNvdW50ZXIucHJvdmlkZXI7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIucHJvdmlkZXIgPSBwcm92aWRlci51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlYWwgd2l0aCBvYnMuXHJcbiAgICBpZiAoZW5jb3VudGVyLm9icykge1xyXG4gICAgICBjb25zdCBwcm9jZXNzZWRPYnM6IGFueSA9IHRoaXMuX3RyYW5zZm9ybU9icyhlbmNvdW50ZXIub2JzKTtcclxuXHJcbiAgICAgIC8vIGFkZCBpbiBpbmRpdmlkdWFsIHByb2Nlc3NlZCBvYnMgdG8gcHJldkVuY291bnRlclxyXG4gICAgICBfLmV4dGVuZChwcmV2RW5jb3VudGVyLCBwcm9jZXNzZWRPYnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcmV2RW5jb3VudGVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdHJhbnNmb3JtT2JzKG9iczogYW55KTogYW55IHtcclxuXHJcbiAgICBpZiAoIW9icykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYnNSZXA6IGFueSA9IHt9O1xyXG4gICAgaWYgKF8uaXNBcnJheShvYnMpKSB7XHJcbiAgICAgIF8uZWFjaChvYnMsIChzaW5nbGVPYnMpID0+IHtcclxuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhvYnNSZXAsIHRoaXMuX3RyYW5zZm9ybU9icyhzaW5nbGVPYnMpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9IGVsc2UgaWYgKG9icy5ncm91cE1lbWJlcnMpIHtcclxuICAgICAgY29uc3QgZ3JvdXA6IGFueSA9IHt9O1xyXG4gICAgICBfLmVhY2gob2JzLmdyb3VwTWVtYmVycywgKG1lbWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuX2F1Z3VtZW50T2JzKGdyb3VwLCB0aGlzLl90cmFuc2Zvcm1PYnMobWVtYmVyKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSGFuZGxlIGFscmVhZHkgZXhpc3RpbmcgZGF0YVxyXG4gICAgICBpZiAob2JzUmVwW29icy5jb25jZXB0LnV1aWRdICYmIF8uaXNBcnJheShvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0pKSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdLnB1c2goZ3JvdXApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IFtncm91cF07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9ic1JlcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWUudXVpZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9ic1JlcDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hdWd1bWVudE9icyhleGlzdGluZzogYW55LCB0b0FkZDogYW55KTogYW55IHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvQWRkKSB7XHJcbiAgICAgIGlmIChfLmhhcyhleGlzdGluZywga2V5KSkge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIG5vdCBhbiBhcnJheSB5ZXRcclxuICAgICAgICBpZiAoIV8uaXNBcnJheShleGlzdGluZ1trZXldKSkge1xyXG4gICAgICAgICAgY29uc3QgdGVtcCA9IGV4aXN0aW5nW2tleV07XHJcbiAgICAgICAgICBleGlzdGluZ1trZXldID0gW3RlbXBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgaW5jb21pbmcgaXMgYXJyYXkgKGZvciBncm91cCBtZW1iZXJzKVxyXG4gICAgICAgIGlmIChfLmlzQXJyYXkodG9BZGRba2V5XSkpIHtcclxuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGV4aXN0aW5nW2tleV0sIHRvQWRkW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBleGlzdGluZ1trZXldLnB1c2godG9BZGRba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4aXN0aW5nW2tleV0gPSB0b0FkZFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhpc3Rpbmc7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19