/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            getValue: function (key, index) {
                if (index === void 0) { index = 0; }
                /** @type {?} */
                var pathArray = key.split('.');
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
            /** @type {?} */
            var group_1 = [];
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
            _.each(object[key], function (childObject) {
                _this.getAllValues(newpath.slice(0), childObject, answers);
            });
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
            _.each(obs, function (singleObs) {
                _this._augumentObs(obsRep, _this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            /** @type {?} */
            var group_2 = {};
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
        { type: Injectable }
    ];
    /** @nocollapse */
    HistoricalEncounterDataService.ctorParameters = function () { return []; };
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
if (false) {
    /** @type {?} */
    HistoricalEncounterDataService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBSUU7UUFEQSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQUV0QixDQUFDOzs7Ozs7SUFFRCwyREFBa0I7Ozs7O0lBQWxCLFVBQW1CLElBQVksRUFBRSxVQUFlO1FBQWhELGlCQWlDQzs7WUFoQ08sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLFVBQUMsR0FBVyxFQUFFLEtBQVM7Z0JBQVQsc0JBQUEsRUFBQSxTQUFTOztvQkFDekIsU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNoQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxlQUFlLEVBQUUsVUFBQyxLQUFTO2dCQUFULHNCQUFBLEVBQUEsU0FBUztnQkFDekIs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QUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNGO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Z0JBMUxGLFVBQVU7Ozs7SUE2TFgscUNBQUM7Q0FBQSxBQTdMRCxJQTZMQztTQTVMWSw4QkFBOEI7OztJQUV6QyxxREFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2Uge1xuXG4gIGRhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICByZWdpc3RlckVuY291bnRlcnMobmFtZTogc3RyaW5nLCBlbmNvdW50ZXJzOiBhbnkpIHtcbiAgICBjb25zdCBlbmNTdG9yZTogYW55ID0ge1xuICAgICAgZGF0YTogW10sXG4gICAgICBnZXRWYWx1ZTogKGtleTogc3RyaW5nLCBpbmRleCA9IDApOiBhbnkgPT4ge1xuICAgICAgICBjb25zdCBwYXRoQXJyYXkgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHBhdGhBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RWYWx1ZShwYXRoQXJyYXksIGVuY1N0b3JlLmRhdGFbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF1ba2V5XTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxPYmplY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmNTdG9yZS5kYXRhO1xuICAgICAgfSxcbiAgICAgIGdldFNpbmdsZU9iamVjdDogKGluZGV4ID0gMCkgPT4ge1xuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChfLmlzQXJyYXkoZW5jb3VudGVycykpIHtcbiAgICAgIGNvbnN0IGdyb3VwOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBfLmVhY2goZW5jb3VudGVycywgKGVuY291bnRlcikgPT4ge1xuICAgICAgICBncm91cC5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXIpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTb3J0IHRoZW0gaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyXG4gICAgICBlbmNTdG9yZS5kYXRhID0gXy5zb3J0QnkoZ3JvdXAsICdlbmNvdW50ZXJEYXRldGltZScpLnJldmVyc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXNzdW1lIGEgc2luZ2xlIG9wZW5tcnMgcmVzdCBlbmNvdW50ZXIgb2JqZWN0LlxuICAgICAgZW5jU3RvcmUuZGF0YS5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXJzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wdXRPYmplY3QobmFtZSwgZW5jU3RvcmUpO1xuXG4gIH1cblxuICBwdXRPYmplY3QobmFtZSwgb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlc1tuYW1lXSA9IG9iamVjdDtcbiAgfVxuXG4gIGdldE9iamVjdChuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VzW25hbWVdIHx8IG51bGw7XG4gIH1cblxuICBnZXRGaXJzdFZhbHVlKHBhdGg6IEFycmF5PHN0cmluZz4sIG9iamVjdDogYW55KTogYW55IHtcblxuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcblxuICAgIHRoaXMuZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycyk7XG5cbiAgICBpZiAoYW5zd2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcbiAgICAgICAgdmFsdWVEYXRlOiBtb21lbnQob2JqZWN0LmVuY291bnRlckRhdGV0aW1lKS5mb3JtYXQoJ2xsJylcbiAgICAgIH07XG4gICAgfVxuXG4gIH1cblxuICBnZXRBbGxWYWx1ZXMocGF0aCwgb2JqZWN0LCBhbnN3ZXJzKSB7XG4gICAgaWYgKF8uaXNOaWwob2JqZWN0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwYXRoLmxlbmd0aCA8PSAxKSB7XG4gICAgICBpZiAoIV8uaXNOaWwob2JqZWN0W3BhdGhbMF1dKSkge1xuICAgICAgICBhbnN3ZXJzLnB1c2gob2JqZWN0W3BhdGhbMF1dKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdwYXRoID0gcGF0aC5zcGxpY2UoMSk7XG4gICAgY29uc3Qga2V5ID0gcGF0aFswXTtcblxuICAgIGlmIChfLmlzQXJyYXkob2JqZWN0W2tleV0pICYmIG9iamVjdFtrZXldLmxlbmd0aCA+IDApIHtcbiAgICAgIF8uZWFjaChvYmplY3Rba2V5XSwgKGNoaWxkT2JqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIGNoaWxkT2JqZWN0LCBhbnN3ZXJzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBvYmplY3Rba2V5XSwgYW5zd2Vycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcjogYW55KSB7XG4gICAgaWYgKF8uaXNOaWwoZW5jb3VudGVyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUcmFuc2Zvcm0gZW5jb3VudGVyIExldmVsIGRldGFpbHMgdG8ga2V5IHZhbHVlIHBhaXJzLlxuICAgIGNvbnN0IHByZXZFbmNvdW50ZXI6IGFueSA9IHtcbiAgICAgIGVuY291bnRlckRhdGV0aW1lOiBlbmNvdW50ZXIuZW5jb3VudGVyRGF0ZXRpbWVcbiAgICB9O1xuXG4gICAgaWYgKGVuY291bnRlci5sb2NhdGlvbiAmJiBlbmNvdW50ZXIubG9jYXRpb24udXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5sb2NhdGlvbiA9IGVuY291bnRlci5sb2NhdGlvbi51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIucGF0aWVudCAmJiBlbmNvdW50ZXIucGF0aWVudC51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLnBhdGllbnQgPSBlbmNvdW50ZXIucGF0aWVudC51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIuZm9ybSAmJiBlbmNvdW50ZXIuZm9ybS51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLmZvcm0gPSBlbmNvdW50ZXIuZm9ybS51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIuZW5jb3VudGVyVHlwZSAmJiBlbmNvdW50ZXIuZW5jb3VudGVyVHlwZS51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLmVuY291bnRlclR5cGUgPSBlbmNvdW50ZXIuZW5jb3VudGVyVHlwZS51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIucHJvdmlkZXIpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZW5jb3VudGVyLnByb3ZpZGVyO1xuICAgICAgcHJldkVuY291bnRlci5wcm92aWRlciA9IHByb3ZpZGVyLnV1aWQ7XG4gICAgfVxuXG4gICAgLy8gRGVhbCB3aXRoIG9icy5cbiAgICBpZiAoZW5jb3VudGVyLm9icykge1xuICAgICAgY29uc3QgcHJvY2Vzc2VkT2JzOiBhbnkgPSB0aGlzLl90cmFuc2Zvcm1PYnMoZW5jb3VudGVyLm9icyk7XG5cbiAgICAgIC8vIGFkZCBpbiBpbmRpdmlkdWFsIHByb2Nlc3NlZCBvYnMgdG8gcHJldkVuY291bnRlclxuICAgICAgXy5leHRlbmQocHJldkVuY291bnRlciwgcHJvY2Vzc2VkT2JzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldkVuY291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybU9icyhvYnM6IGFueSk6IGFueSB7XG5cbiAgICBpZiAoIW9icykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JzUmVwOiBhbnkgPSB7fTtcbiAgICBpZiAoXy5pc0FycmF5KG9icykpIHtcbiAgICAgIF8uZWFjaChvYnMsIChzaW5nbGVPYnMpID0+IHtcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMob2JzUmVwLCB0aGlzLl90cmFuc2Zvcm1PYnMoc2luZ2xlT2JzKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfSBlbHNlIGlmIChvYnMuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICBjb25zdCBncm91cDogYW55ID0ge307XG4gICAgICBfLmVhY2gob2JzLmdyb3VwTWVtYmVycywgKG1lbWJlcikgPT4ge1xuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhncm91cCwgdGhpcy5fdHJhbnNmb3JtT2JzKG1lbWJlcikpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEhhbmRsZSBhbHJlYWR5IGV4aXN0aW5nIGRhdGFcbiAgICAgIGlmIChvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gJiYgXy5pc0FycmF5KG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSkpIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdLnB1c2goZ3JvdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gW2dyb3VwXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlLnV1aWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9BZGQpIHtcbiAgICAgIGlmIChfLmhhcyhleGlzdGluZywga2V5KSkge1xuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XG4gICAgICAgIGlmICghXy5pc0FycmF5KGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgICAgY29uc3QgdGVtcCA9IGV4aXN0aW5nW2tleV07XG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcbiAgICAgICAgaWYgKF8uaXNBcnJheSh0b0FkZFtrZXldKSkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGV4aXN0aW5nW2tleV0sIHRvQWRkW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXN0aW5nW2tleV0ucHVzaCh0b0FkZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3Rpbmdba2V5XSA9IHRvQWRkW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGlzdGluZztcbiAgfVxuXG5cbn1cbiJdfQ==