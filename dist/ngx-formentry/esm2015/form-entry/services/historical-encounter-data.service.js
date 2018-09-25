/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
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
        const /** @type {?} */ encStore = {
            data: [],
            getValue: (key, index = 0) => {
                const /** @type {?} */ pathArray = key.split('.');
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
            const /** @type {?} */ group = [];
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
        const /** @type {?} */ answers = [];
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
        const /** @type {?} */ newpath = path.splice(1);
        const /** @type {?} */ key = path[0];
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
     * @param {?} encounter
     * @return {?}
     */
    _transformEncounter(encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        const /** @type {?} */ prevEncounter = {
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
            const /** @type {?} */ provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            const /** @type {?} */ processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    _transformObs(obs) {
        if (!obs) {
            return null;
        }
        const /** @type {?} */ obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, (singleObs) => {
                this._augumentObs(obsRep, this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            const /** @type {?} */ group = {};
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
     * @param {?} existing
     * @param {?} toAdd
     * @return {?}
     */
    _augumentObs(existing, toAdd) {
        for (const /** @type {?} */ key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
                    const /** @type {?} */ temp = existing[key];
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
    { type: Injectable },
];
/** @nocollapse */
HistoricalEncounterDataService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUd2QixNQUFNO0lBR0o7MkJBRG1CLEVBQUU7S0FFcEI7Ozs7OztJQUVELGtCQUFrQixDQUFDLElBQVksRUFBRSxVQUFlO1FBQzlDLHVCQUFNLFFBQVEsR0FBUTtZQUNwQixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxDQUFDLEdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFPLEVBQUU7Z0JBQ3hDLHVCQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzVEO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDdEI7WUFDRCxlQUFlLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLHVCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4Qjs7Z0JBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDOzs7O1lBekxuQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2Uge1xyXG5cclxuICBkYXRhU291cmNlczogYW55ID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlckVuY291bnRlcnMobmFtZTogc3RyaW5nLCBlbmNvdW50ZXJzOiBhbnkpIHtcclxuICAgIGNvbnN0IGVuY1N0b3JlOiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IFtdLFxyXG4gICAgICBnZXRWYWx1ZTogKGtleTogc3RyaW5nLCBpbmRleCA9IDApOiBhbnkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RWYWx1ZShwYXRoQXJyYXksIGVuY1N0b3JlLmRhdGFbaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEFsbE9iamVjdHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U2luZ2xlT2JqZWN0OiAoaW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChfLmlzQXJyYXkoZW5jb3VudGVycykpIHtcclxuICAgICAgY29uc3QgZ3JvdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcclxuICAgICAgICBncm91cC5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXIpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBTb3J0IHRoZW0gaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyXHJcbiAgICAgIGVuY1N0b3JlLmRhdGEgPSBfLnNvcnRCeShncm91cCwgJ2VuY291bnRlckRhdGV0aW1lJykucmV2ZXJzZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQXNzdW1lIGEgc2luZ2xlIG9wZW5tcnMgcmVzdCBlbmNvdW50ZXIgb2JqZWN0LlxyXG4gICAgICBlbmNTdG9yZS5kYXRhLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcnMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1dE9iamVjdChuYW1lLCBlbmNTdG9yZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHV0T2JqZWN0KG5hbWUsIG9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhU291cmNlc1tuYW1lXSA9IG9iamVjdDtcclxuICB9XHJcblxyXG4gIGdldE9iamVjdChuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIGdldEZpcnN0VmFsdWUocGF0aDogQXJyYXk8c3RyaW5nPiwgb2JqZWN0OiBhbnkpOiBhbnkge1xyXG5cclxuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpO1xyXG5cclxuICAgIGlmIChhbnN3ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcclxuICAgICAgICB2YWx1ZURhdGU6IG1vbWVudChvYmplY3QuZW5jb3VudGVyRGF0ZXRpbWUpLmZvcm1hdCgnbGwnKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpIHtcclxuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIGlmICghXy5pc05pbChvYmplY3RbcGF0aFswXV0pKSB7XHJcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld3BhdGggPSBwYXRoLnNwbGljZSgxKTtcclxuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XHJcblxyXG4gICAgaWYgKF8uaXNBcnJheShvYmplY3Rba2V5XSkgJiYgb2JqZWN0W2tleV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIGNoaWxkT2JqZWN0LCBhbnN3ZXJzKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBvYmplY3Rba2V5XSwgYW5zd2Vycyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyOiBhbnkpIHtcclxuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cclxuICAgIGNvbnN0IHByZXZFbmNvdW50ZXI6IGFueSA9IHtcclxuICAgICAgZW5jb3VudGVyRGF0ZXRpbWU6IGVuY291bnRlci5lbmNvdW50ZXJEYXRldGltZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLmxvY2F0aW9uICYmIGVuY291bnRlci5sb2NhdGlvbi51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnBhdGllbnQgPSBlbmNvdW50ZXIucGF0aWVudC51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmNvdW50ZXIuZm9ybSAmJiBlbmNvdW50ZXIuZm9ybS51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIuZm9ybSA9IGVuY291bnRlci5mb3JtLnV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVuY291bnRlci5lbmNvdW50ZXJUeXBlICYmIGVuY291bnRlci5lbmNvdW50ZXJUeXBlLnV1aWQpIHtcclxuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XHJcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZW5jb3VudGVyLnByb3ZpZGVyO1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnByb3ZpZGVyID0gcHJvdmlkZXIudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWFsIHdpdGggb2JzLlxyXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcclxuICAgICAgY29uc3QgcHJvY2Vzc2VkT2JzOiBhbnkgPSB0aGlzLl90cmFuc2Zvcm1PYnMoZW5jb3VudGVyLm9icyk7XHJcblxyXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcclxuICAgICAgXy5leHRlbmQocHJldkVuY291bnRlciwgcHJvY2Vzc2VkT2JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJldkVuY291bnRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3RyYW5zZm9ybU9icyhvYnM6IGFueSk6IGFueSB7XHJcblxyXG4gICAgaWYgKCFvYnMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzUmVwOiBhbnkgPSB7fTtcclxuICAgIGlmIChfLmlzQXJyYXkob2JzKSkge1xyXG4gICAgICBfLmVhY2gob2JzLCAoc2luZ2xlT2JzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMob2JzUmVwLCB0aGlzLl90cmFuc2Zvcm1PYnMoc2luZ2xlT2JzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb2JzUmVwO1xyXG4gICAgfSBlbHNlIGlmIChvYnMuZ3JvdXBNZW1iZXJzKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcclxuICAgICAgXy5lYWNoKG9icy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhncm91cCwgdGhpcy5fdHJhbnNmb3JtT2JzKG1lbWJlcikpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEhhbmRsZSBhbHJlYWR5IGV4aXN0aW5nIGRhdGFcclxuICAgICAgaWYgKG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSAmJiBfLmlzQXJyYXkob2JzUmVwW29icy5jb25jZXB0LnV1aWRdKSkge1xyXG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBbZ3JvdXBdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlLnV1aWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b0FkZCkge1xyXG4gICAgICBpZiAoXy5oYXMoZXhpc3RpbmcsIGtleSkpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XHJcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcclxuICAgICAgICAgIGNvbnN0IHRlbXAgPSBleGlzdGluZ1trZXldO1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcclxuICAgICAgICBpZiAoXy5pc0FycmF5KHRvQWRkW2tleV0pKSB7XHJcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShleGlzdGluZ1trZXldLCB0b0FkZFtrZXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XS5wdXNoKHRvQWRkW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBleGlzdGluZ1trZXldID0gdG9BZGRba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4aXN0aW5nO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==