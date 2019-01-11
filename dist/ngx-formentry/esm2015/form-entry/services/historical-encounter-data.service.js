/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
export class HistoricalEncounterDataService {
    constructor() {
        this.dataSources = {};
    }
    /**
     * @param {?} name
     * @param {?} encounters
     * @return {?}
     */
    registerEncounters(name, encounters) {
        /** @type {?} */
        const encStore = {
            data: [],
            getValue: (key, index = 0) => {
                /** @type {?} */
                const pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            },
            getAllObjects: () => {
                return encStore.data;
            },
            getSingleObject: (index = 0) => {
                return encStore.data[index];
            }
        };
        if (_.isArray(encounters)) {
            /** @type {?} */
            const group = [];
            _.each(encounters, (encounter) => {
                group.push(this._transformEncounter(encounter));
            });
            // Sort them in reverse chronological order
            encStore.data = _.sortBy(group, 'encounterDatetime').reverse();
        }
        else {
            // Assume a single openmrs rest encounter object.
            encStore.data.push(this._transformEncounter(encounters));
        }
        this.putObject(name, encStore);
    }
    /**
     * @param {?} name
     * @param {?} object
     * @return {?}
     */
    putObject(name, object) {
        this.dataSources[name] = object;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getObject(name) {
        return this.dataSources[name] || null;
    }
    /**
     * @param {?} path
     * @param {?} object
     * @return {?}
     */
    getFirstValue(path, object) {
        /** @type {?} */
        const answers = [];
        this.getAllValues(path, object, answers);
        if (answers.length > 0) {
            return {
                value: answers[0],
                valueDate: moment(object.encounterDatetime).format('ll')
            };
        }
    }
    /**
     * @param {?} path
     * @param {?} object
     * @param {?} answers
     * @return {?}
     */
    getAllValues(path, object, answers) {
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
        const newpath = path.splice(1);
        /** @type {?} */
        const key = path[0];
        if (_.isArray(object[key]) && object[key].length > 0) {
            _.each(object[key], (childObject) => {
                this.getAllValues(newpath.slice(0), childObject, answers);
            });
        }
        else {
            this.getAllValues(newpath.slice(0), object[key], answers);
        }
    }
    /**
     * @private
     * @param {?} encounter
     * @return {?}
     */
    _transformEncounter(encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        /** @type {?} */
        const prevEncounter = {
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
            const provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            /** @type {?} */
            const processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    }
    /**
     * @private
     * @param {?} obs
     * @return {?}
     */
    _transformObs(obs) {
        if (!obs) {
            return null;
        }
        /** @type {?} */
        const obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, (singleObs) => {
                this._augumentObs(obsRep, this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            /** @type {?} */
            const group = {};
            _.each(obs.groupMembers, (member) => {
                this._augumentObs(group, this._transformObs(member));
            });
            // Handle already existing data
            if (obsRep[obs.concept.uuid] && _.isArray(obsRep[obs.concept.uuid])) {
                obsRep[obs.concept.uuid].push(group);
            }
            else {
                obsRep[obs.concept.uuid] = [group];
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
    }
    /**
     * @private
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    _augumentObs(existing, toAdd) {
        for (const key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
                    /** @type {?} */
                    const temp = existing[key];
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
    }
}
HistoricalEncounterDataService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HistoricalEncounterDataService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    HistoricalEncounterDataService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU0sT0FBTyw4QkFBOEI7SUFHekM7UUFEQSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQUV0QixDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsVUFBZTs7Y0FDeEMsUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLENBQUMsR0FBVyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQU8sRUFBRTs7c0JBQ2xDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzVEO2dCQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDbEIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxlQUFlLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdC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QkFBTTtnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7WUExTEYsVUFBVTs7Ozs7O0lBR1QscURBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIHtcblxuICBkYXRhU291cmNlczogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcmVnaXN0ZXJFbmNvdW50ZXJzKG5hbWU6IHN0cmluZywgZW5jb3VudGVyczogYW55KSB7XG4gICAgY29uc3QgZW5jU3RvcmU6IGFueSA9IHtcbiAgICAgIGRhdGE6IFtdLFxuICAgICAgZ2V0VmFsdWU6IChrZXk6IHN0cmluZywgaW5kZXggPSAwKTogYW55ID0+IHtcbiAgICAgICAgY29uc3QgcGF0aEFycmF5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0VmFsdWUocGF0aEFycmF5LCBlbmNTdG9yZS5kYXRhW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XG4gICAgICB9LFxuICAgICAgZ2V0QWxsT2JqZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcbiAgICAgIH0sXG4gICAgICBnZXRTaW5nbGVPYmplY3Q6IChpbmRleCA9IDApID0+IHtcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoXy5pc0FycmF5KGVuY291bnRlcnMpKSB7XG4gICAgICBjb25zdCBncm91cDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcbiAgICAgICAgZ3JvdXAucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU29ydCB0aGVtIGluIHJldmVyc2UgY2hyb25vbG9naWNhbCBvcmRlclxuICAgICAgZW5jU3RvcmUuZGF0YSA9IF8uc29ydEJ5KGdyb3VwLCAnZW5jb3VudGVyRGF0ZXRpbWUnKS5yZXZlcnNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFzc3VtZSBhIHNpbmdsZSBvcGVubXJzIHJlc3QgZW5jb3VudGVyIG9iamVjdC5cbiAgICAgIGVuY1N0b3JlLmRhdGEucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVycykpO1xuICAgIH1cblxuICAgIHRoaXMucHV0T2JqZWN0KG5hbWUsIGVuY1N0b3JlKTtcblxuICB9XG5cbiAgcHV0T2JqZWN0KG5hbWUsIG9iamVjdCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gPSBvYmplY3Q7XG4gIH1cblxuICBnZXRPYmplY3QobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlc1tuYW1lXSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Rmlyc3RWYWx1ZShwYXRoOiBBcnJheTxzdHJpbmc+LCBvYmplY3Q6IGFueSk6IGFueSB7XG5cbiAgICBjb25zdCBhbnN3ZXJzID0gW107XG5cbiAgICB0aGlzLmdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpO1xuXG4gICAgaWYgKGFuc3dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGFuc3dlcnNbMF0sXG4gICAgICAgIHZhbHVlRGF0ZTogbW9tZW50KG9iamVjdC5lbmNvdW50ZXJEYXRldGltZSkuZm9ybWF0KCdsbCcpXG4gICAgICB9O1xuICAgIH1cblxuICB9XG5cbiAgZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycykge1xuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPD0gMSkge1xuICAgICAgaWYgKCFfLmlzTmlsKG9iamVjdFtwYXRoWzBdXSkpIHtcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3cGF0aCA9IHBhdGguc3BsaWNlKDEpO1xuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG5cbiAgICBpZiAoXy5pc0FycmF5KG9iamVjdFtrZXldKSAmJiBvYmplY3Rba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBjaGlsZE9iamVjdCwgYW5zd2Vycyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRBbGxWYWx1ZXMobmV3cGF0aC5zbGljZSgwKSwgb2JqZWN0W2tleV0sIGFuc3dlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXI6IGFueSkge1xuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cbiAgICBjb25zdCBwcmV2RW5jb3VudGVyOiBhbnkgPSB7XG4gICAgICBlbmNvdW50ZXJEYXRldGltZTogZW5jb3VudGVyLmVuY291bnRlckRhdGV0aW1lXG4gICAgfTtcblxuICAgIGlmIChlbmNvdW50ZXIubG9jYXRpb24gJiYgZW5jb3VudGVyLmxvY2F0aW9uLnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5wYXRpZW50ID0gZW5jb3VudGVyLnBhdGllbnQudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmZvcm0gJiYgZW5jb3VudGVyLmZvcm0udXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5mb3JtID0gZW5jb3VudGVyLmZvcm0udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmVuY291bnRlclR5cGUgJiYgZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IGVuY291bnRlci5wcm92aWRlcjtcbiAgICAgIHByZXZFbmNvdW50ZXIucHJvdmlkZXIgPSBwcm92aWRlci51dWlkO1xuICAgIH1cblxuICAgIC8vIERlYWwgd2l0aCBvYnMuXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZE9iczogYW55ID0gdGhpcy5fdHJhbnNmb3JtT2JzKGVuY291bnRlci5vYnMpO1xuXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcbiAgICAgIF8uZXh0ZW5kKHByZXZFbmNvdW50ZXIsIHByb2Nlc3NlZE9icyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZFbmNvdW50ZXI7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1PYnMob2JzOiBhbnkpOiBhbnkge1xuXG4gICAgaWYgKCFvYnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG9ic1JlcDogYW55ID0ge307XG4gICAgaWYgKF8uaXNBcnJheShvYnMpKSB7XG4gICAgICBfLmVhY2gob2JzLCAoc2luZ2xlT2JzKSA9PiB7XG4gICAgICAgIHRoaXMuX2F1Z3VtZW50T2JzKG9ic1JlcCwgdGhpcy5fdHJhbnNmb3JtT2JzKHNpbmdsZU9icykpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH0gZWxzZSBpZiAob2JzLmdyb3VwTWVtYmVycykge1xuICAgICAgY29uc3QgZ3JvdXA6IGFueSA9IHt9O1xuICAgICAgXy5lYWNoKG9icy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMoZ3JvdXAsIHRoaXMuX3RyYW5zZm9ybU9icyhtZW1iZXIpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBIYW5kbGUgYWxyZWFkeSBleGlzdGluZyBkYXRhXG4gICAgICBpZiAob2JzUmVwW29icy5jb25jZXB0LnV1aWRdICYmIF8uaXNBcnJheShvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0pKSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXS5wdXNoKGdyb3VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IFtncm91cF07XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IG9icy52YWx1ZS51dWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgX2F1Z3VtZW50T2JzKGV4aXN0aW5nOiBhbnksIHRvQWRkOiBhbnkpOiBhbnkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHRvQWRkKSB7XG4gICAgICBpZiAoXy5oYXMoZXhpc3RpbmcsIGtleSkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgbm90IGFuIGFycmF5IHlldFxuICAgICAgICBpZiAoIV8uaXNBcnJheShleGlzdGluZ1trZXldKSkge1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSBleGlzdGluZ1trZXldO1xuICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBbdGVtcF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBpbmNvbWluZyBpcyBhcnJheSAoZm9yIGdyb3VwIG1lbWJlcnMpXG4gICAgICAgIGlmIChfLmlzQXJyYXkodG9BZGRba2V5XSkpIHtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShleGlzdGluZ1trZXldLCB0b0FkZFtrZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGlzdGluZ1trZXldLnB1c2godG9BZGRba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4aXN0aW5nW2tleV0gPSB0b0FkZFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhpc3Rpbmc7XG4gIH1cblxuXG59XG4iXX0=