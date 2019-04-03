/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            getValue: (/**
             * @param {?} key
             * @param {?=} index
             * @return {?}
             */
            (key, index = 0) => {
                /** @type {?} */
                const pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            }),
            getAllObjects: (/**
             * @return {?}
             */
            () => {
                return encStore.data;
            }),
            getSingleObject: (/**
             * @param {?=} index
             * @return {?}
             */
            (index = 0) => {
                return encStore.data[index];
            })
        };
        if (_.isArray(encounters)) {
            /** @type {?} */
            const group = [];
            _.each(encounters, (/**
             * @param {?} encounter
             * @return {?}
             */
            (encounter) => {
                group.push(this._transformEncounter(encounter));
            }));
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
            _.each(object[key], (/**
             * @param {?} childObject
             * @return {?}
             */
            (childObject) => {
                this.getAllValues(newpath.slice(0), childObject, answers);
            }));
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
            _.each(obs, (/**
             * @param {?} singleObs
             * @return {?}
             */
            (singleObs) => {
                this._augumentObs(obsRep, this._transformObs(singleObs));
            }));
            return obsRep;
        }
        else if (obs.groupMembers) {
            /** @type {?} */
            const group = {};
            _.each(obs.groupMembers, (/**
             * @param {?} member
             * @return {?}
             */
            (member) => {
                this._augumentObs(group, this._transformObs(member));
            }));
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
    { type: Injectable },
];
HistoricalEncounterDataService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    HistoricalEncounterDataService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU07SUFHSjtRQURBLGdCQUFXLEdBQVEsRUFBRSxDQUFDO0lBRXRCLENBQUM7Ozs7OztJQUVELGtCQUFrQixDQUFDLElBQVksRUFBRSxVQUFlOztjQUN4QyxRQUFRLEdBQVE7WUFDcEIsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFROzs7OztZQUFFLENBQUMsR0FBVyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQU8sRUFBRTs7c0JBQ2xDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUNELGFBQWE7OztZQUFFLEdBQUcsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFBO1lBQ0QsZUFB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Q0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7O1lBMUxGLFVBQVU7Ozs7O0lBR1QscURBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2Uge1xyXG5cclxuICBkYXRhU291cmNlczogYW55ID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlckVuY291bnRlcnMobmFtZTogc3RyaW5nLCBlbmNvdW50ZXJzOiBhbnkpIHtcclxuICAgIGNvbnN0IGVuY1N0b3JlOiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IFtdLFxyXG4gICAgICBnZXRWYWx1ZTogKGtleTogc3RyaW5nLCBpbmRleCA9IDApOiBhbnkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RWYWx1ZShwYXRoQXJyYXksIGVuY1N0b3JlLmRhdGFbaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEFsbE9iamVjdHM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U2luZ2xlT2JqZWN0OiAoaW5kZXggPSAwKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChfLmlzQXJyYXkoZW5jb3VudGVycykpIHtcclxuICAgICAgY29uc3QgZ3JvdXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcclxuICAgICAgICBncm91cC5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXIpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBTb3J0IHRoZW0gaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyXHJcbiAgICAgIGVuY1N0b3JlLmRhdGEgPSBfLnNvcnRCeShncm91cCwgJ2VuY291bnRlckRhdGV0aW1lJykucmV2ZXJzZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQXNzdW1lIGEgc2luZ2xlIG9wZW5tcnMgcmVzdCBlbmNvdW50ZXIgb2JqZWN0LlxyXG4gICAgICBlbmNTdG9yZS5kYXRhLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcnMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1dE9iamVjdChuYW1lLCBlbmNTdG9yZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHV0T2JqZWN0KG5hbWUsIG9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhU291cmNlc1tuYW1lXSA9IG9iamVjdDtcclxuICB9XHJcblxyXG4gIGdldE9iamVjdChuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIGdldEZpcnN0VmFsdWUocGF0aDogQXJyYXk8c3RyaW5nPiwgb2JqZWN0OiBhbnkpOiBhbnkge1xyXG5cclxuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpO1xyXG5cclxuICAgIGlmIChhbnN3ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcclxuICAgICAgICB2YWx1ZURhdGU6IG1vbWVudChvYmplY3QuZW5jb3VudGVyRGF0ZXRpbWUpLmZvcm1hdCgnbGwnKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpIHtcclxuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIGlmICghXy5pc05pbChvYmplY3RbcGF0aFswXV0pKSB7XHJcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld3BhdGggPSBwYXRoLnNwbGljZSgxKTtcclxuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XHJcblxyXG4gICAgaWYgKF8uaXNBcnJheShvYmplY3Rba2V5XSkgJiYgb2JqZWN0W2tleV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIGNoaWxkT2JqZWN0LCBhbnN3ZXJzKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBvYmplY3Rba2V5XSwgYW5zd2Vycyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyOiBhbnkpIHtcclxuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cclxuICAgIGNvbnN0IHByZXZFbmNvdW50ZXI6IGFueSA9IHtcclxuICAgICAgZW5jb3VudGVyRGF0ZXRpbWU6IGVuY291bnRlci5lbmNvdW50ZXJEYXRldGltZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLmxvY2F0aW9uICYmIGVuY291bnRlci5sb2NhdGlvbi51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnBhdGllbnQgPSBlbmNvdW50ZXIucGF0aWVudC51dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmNvdW50ZXIuZm9ybSAmJiBlbmNvdW50ZXIuZm9ybS51dWlkKSB7XHJcbiAgICAgIHByZXZFbmNvdW50ZXIuZm9ybSA9IGVuY291bnRlci5mb3JtLnV1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVuY291bnRlci5lbmNvdW50ZXJUeXBlICYmIGVuY291bnRlci5lbmNvdW50ZXJUeXBlLnV1aWQpIHtcclxuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XHJcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZW5jb3VudGVyLnByb3ZpZGVyO1xyXG4gICAgICBwcmV2RW5jb3VudGVyLnByb3ZpZGVyID0gcHJvdmlkZXIudXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWFsIHdpdGggb2JzLlxyXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcclxuICAgICAgY29uc3QgcHJvY2Vzc2VkT2JzOiBhbnkgPSB0aGlzLl90cmFuc2Zvcm1PYnMoZW5jb3VudGVyLm9icyk7XHJcblxyXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcclxuICAgICAgXy5leHRlbmQocHJldkVuY291bnRlciwgcHJvY2Vzc2VkT2JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJldkVuY291bnRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3RyYW5zZm9ybU9icyhvYnM6IGFueSk6IGFueSB7XHJcblxyXG4gICAgaWYgKCFvYnMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzUmVwOiBhbnkgPSB7fTtcclxuICAgIGlmIChfLmlzQXJyYXkob2JzKSkge1xyXG4gICAgICBfLmVhY2gob2JzLCAoc2luZ2xlT2JzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMob2JzUmVwLCB0aGlzLl90cmFuc2Zvcm1PYnMoc2luZ2xlT2JzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb2JzUmVwO1xyXG4gICAgfSBlbHNlIGlmIChvYnMuZ3JvdXBNZW1iZXJzKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcclxuICAgICAgXy5lYWNoKG9icy5ncm91cE1lbWJlcnMsIChtZW1iZXIpID0+IHtcclxuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhncm91cCwgdGhpcy5fdHJhbnNmb3JtT2JzKG1lbWJlcikpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEhhbmRsZSBhbHJlYWR5IGV4aXN0aW5nIGRhdGFcclxuICAgICAgaWYgKG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSAmJiBfLmlzQXJyYXkob2JzUmVwW29icy5jb25jZXB0LnV1aWRdKSkge1xyXG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBbZ3JvdXBdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlLnV1aWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvYnNSZXA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b0FkZCkge1xyXG4gICAgICBpZiAoXy5oYXMoZXhpc3RpbmcsIGtleSkpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XHJcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcclxuICAgICAgICAgIGNvbnN0IHRlbXAgPSBleGlzdGluZ1trZXldO1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcclxuICAgICAgICBpZiAoXy5pc0FycmF5KHRvQWRkW2tleV0pKSB7XHJcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShleGlzdGluZ1trZXldLCB0b0FkZFtrZXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXhpc3Rpbmdba2V5XS5wdXNoKHRvQWRkW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBleGlzdGluZ1trZXldID0gdG9BZGRba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4aXN0aW5nO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==