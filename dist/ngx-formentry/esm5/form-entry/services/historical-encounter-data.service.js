import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment_ from 'moment';
var moment = moment_;
var HistoricalEncounterDataService = /** @class */ (function () {
    function HistoricalEncounterDataService() {
        this.dataSources = {};
    }
    HistoricalEncounterDataService.prototype.registerEncounters = function (name, encounters) {
        var _this = this;
        var encStore = {
            data: [],
            getValue: function (key, index) {
                if (index === void 0) { index = 0; }
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
    HistoricalEncounterDataService.prototype.putObject = function (name, object) {
        this.dataSources[name] = object;
    };
    HistoricalEncounterDataService.prototype.getObject = function (name) {
        return this.dataSources[name] || null;
    };
    HistoricalEncounterDataService.prototype.getFirstValue = function (path, object) {
        var answers = [];
        this.getAllValues(path, object, answers);
        if (answers.length > 0) {
            return {
                value: answers[0],
                valueDate: moment(object.encounterDatetime).format('ll')
            };
        }
    };
    HistoricalEncounterDataService.prototype.getAllValues = function (path, object, answers) {
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
        var newpath = path.splice(1);
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
    HistoricalEncounterDataService.prototype._transformEncounter = function (encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
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
            var provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            var processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    };
    HistoricalEncounterDataService.prototype._transformObs = function (obs) {
        var _this = this;
        if (!obs) {
            return null;
        }
        var obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, function (singleObs) {
                _this._augumentObs(obsRep, _this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
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
    HistoricalEncounterDataService.prototype._augumentObs = function (existing, toAdd) {
        for (var key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
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
    HistoricalEncounterDataService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HistoricalEncounterDataService);
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3NlcnZpY2VzL2hpc3RvcmljYWwtZW5jb3VudGVyLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFHdkI7SUFHRTtRQURBLGdCQUFXLEdBQVEsRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFFRCwyREFBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLFVBQWU7UUFBaEQsaUJBaUNDO1FBaENDLElBQU0sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLFVBQUMsR0FBVyxFQUFFLEtBQVM7Z0JBQVQsc0JBQUEsRUFBQSxTQUFTO2dCQUMvQixJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxlQUFlLEVBQUUsVUFBQyxLQUFTO2dCQUFU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SyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZEO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNGO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQXpMVSw4QkFBOEI7UUFEMUMsVUFBVSxFQUFFOztPQUNBLDhCQUE4QixDQTRMMUM7SUFBRCxxQ0FBQztDQUFBLEFBNUxELElBNExDO1NBNUxZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxFbmNvdW50ZXJEYXRhU2VydmljZSB7XG5cbiAgZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHJlZ2lzdGVyRW5jb3VudGVycyhuYW1lOiBzdHJpbmcsIGVuY291bnRlcnM6IGFueSkge1xuICAgIGNvbnN0IGVuY1N0b3JlOiBhbnkgPSB7XG4gICAgICBkYXRhOiBbXSxcbiAgICAgIGdldFZhbHVlOiAoa2V5OiBzdHJpbmcsIGluZGV4ID0gMCk6IGFueSA9PiB7XG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBpZiAocGF0aEFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJzdFZhbHVlKHBhdGhBcnJheSwgZW5jU3RvcmUuZGF0YVtpbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbmNTdG9yZS5kYXRhW2luZGV4XVtrZXldO1xuICAgICAgfSxcbiAgICAgIGdldEFsbE9iamVjdHM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGE7XG4gICAgICB9LFxuICAgICAgZ2V0U2luZ2xlT2JqZWN0OiAoaW5kZXggPSAwKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmNTdG9yZS5kYXRhW2luZGV4XTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKF8uaXNBcnJheShlbmNvdW50ZXJzKSkge1xuICAgICAgY29uc3QgZ3JvdXA6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIF8uZWFjaChlbmNvdW50ZXJzLCAoZW5jb3VudGVyKSA9PiB7XG4gICAgICAgIGdyb3VwLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcikpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNvcnQgdGhlbSBpbiByZXZlcnNlIGNocm9ub2xvZ2ljYWwgb3JkZXJcbiAgICAgIGVuY1N0b3JlLmRhdGEgPSBfLnNvcnRCeShncm91cCwgJ2VuY291bnRlckRhdGV0aW1lJykucmV2ZXJzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBc3N1bWUgYSBzaW5nbGUgb3Blbm1ycyByZXN0IGVuY291bnRlciBvYmplY3QuXG4gICAgICBlbmNTdG9yZS5kYXRhLnB1c2godGhpcy5fdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcnMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnB1dE9iamVjdChuYW1lLCBlbmNTdG9yZSk7XG5cbiAgfVxuXG4gIHB1dE9iamVjdChuYW1lLCBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2VzW25hbWVdID0gb2JqZWN0O1xuICB9XG5cbiAgZ2V0T2JqZWN0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gfHwgbnVsbDtcbiAgfVxuXG4gIGdldEZpcnN0VmFsdWUocGF0aDogQXJyYXk8c3RyaW5nPiwgb2JqZWN0OiBhbnkpOiBhbnkge1xuXG4gICAgY29uc3QgYW5zd2VycyA9IFtdO1xuXG4gICAgdGhpcy5nZXRBbGxWYWx1ZXMocGF0aCwgb2JqZWN0LCBhbnN3ZXJzKTtcblxuICAgIGlmIChhbnN3ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBhbnN3ZXJzWzBdLFxuICAgICAgICB2YWx1ZURhdGU6IG1vbWVudChvYmplY3QuZW5jb3VudGVyRGF0ZXRpbWUpLmZvcm1hdCgnbGwnKVxuICAgICAgfTtcbiAgICB9XG5cbiAgfVxuXG4gIGdldEFsbFZhbHVlcyhwYXRoLCBvYmplY3QsIGFuc3dlcnMpIHtcbiAgICBpZiAoXy5pc05pbChvYmplY3QpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHBhdGgubGVuZ3RoIDw9IDEpIHtcbiAgICAgIGlmICghXy5pc05pbChvYmplY3RbcGF0aFswXV0pKSB7XG4gICAgICAgIGFuc3dlcnMucHVzaChvYmplY3RbcGF0aFswXV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld3BhdGggPSBwYXRoLnNwbGljZSgxKTtcbiAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuXG4gICAgaWYgKF8uaXNBcnJheShvYmplY3Rba2V5XSkgJiYgb2JqZWN0W2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgXy5lYWNoKG9iamVjdFtrZXldLCAoY2hpbGRPYmplY3QpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGxWYWx1ZXMobmV3cGF0aC5zbGljZSgwKSwgY2hpbGRPYmplY3QsIGFuc3dlcnMpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIG9iamVjdFtrZXldLCBhbnN3ZXJzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyOiBhbnkpIHtcbiAgICBpZiAoXy5pc05pbChlbmNvdW50ZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRyYW5zZm9ybSBlbmNvdW50ZXIgTGV2ZWwgZGV0YWlscyB0byBrZXkgdmFsdWUgcGFpcnMuXG4gICAgY29uc3QgcHJldkVuY291bnRlcjogYW55ID0ge1xuICAgICAgZW5jb3VudGVyRGF0ZXRpbWU6IGVuY291bnRlci5lbmNvdW50ZXJEYXRldGltZVxuICAgIH07XG5cbiAgICBpZiAoZW5jb3VudGVyLmxvY2F0aW9uICYmIGVuY291bnRlci5sb2NhdGlvbi51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLmxvY2F0aW9uID0gZW5jb3VudGVyLmxvY2F0aW9uLnV1aWQ7XG4gICAgfVxuXG4gICAgaWYgKGVuY291bnRlci5wYXRpZW50ICYmIGVuY291bnRlci5wYXRpZW50LnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIucGF0aWVudCA9IGVuY291bnRlci5wYXRpZW50LnV1aWQ7XG4gICAgfVxuXG4gICAgaWYgKGVuY291bnRlci5mb3JtICYmIGVuY291bnRlci5mb3JtLnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIuZm9ybSA9IGVuY291bnRlci5mb3JtLnV1aWQ7XG4gICAgfVxuXG4gICAgaWYgKGVuY291bnRlci5lbmNvdW50ZXJUeXBlICYmIGVuY291bnRlci5lbmNvdW50ZXJUeXBlLnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIuZW5jb3VudGVyVHlwZSA9IGVuY291bnRlci5lbmNvdW50ZXJUeXBlLnV1aWQ7XG4gICAgfVxuXG4gICAgaWYgKGVuY291bnRlci5wcm92aWRlcikge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBlbmNvdW50ZXIucHJvdmlkZXI7XG4gICAgICBwcmV2RW5jb3VudGVyLnByb3ZpZGVyID0gcHJvdmlkZXIudXVpZDtcbiAgICB9XG5cbiAgICAvLyBEZWFsIHdpdGggb2JzLlxuICAgIGlmIChlbmNvdW50ZXIub2JzKSB7XG4gICAgICBjb25zdCBwcm9jZXNzZWRPYnM6IGFueSA9IHRoaXMuX3RyYW5zZm9ybU9icyhlbmNvdW50ZXIub2JzKTtcblxuICAgICAgLy8gYWRkIGluIGluZGl2aWR1YWwgcHJvY2Vzc2VkIG9icyB0byBwcmV2RW5jb3VudGVyXG4gICAgICBfLmV4dGVuZChwcmV2RW5jb3VudGVyLCBwcm9jZXNzZWRPYnMpO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2RW5jb3VudGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtT2JzKG9iczogYW55KTogYW55IHtcblxuICAgIGlmICghb2JzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNSZXA6IGFueSA9IHt9O1xuICAgIGlmIChfLmlzQXJyYXkob2JzKSkge1xuICAgICAgXy5lYWNoKG9icywgKHNpbmdsZU9icykgPT4ge1xuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhvYnNSZXAsIHRoaXMuX3RyYW5zZm9ybU9icyhzaW5nbGVPYnMpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9IGVsc2UgaWYgKG9icy5ncm91cE1lbWJlcnMpIHtcbiAgICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcbiAgICAgIF8uZWFjaChvYnMuZ3JvdXBNZW1iZXJzLCAobWVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuX2F1Z3VtZW50T2JzKGdyb3VwLCB0aGlzLl90cmFuc2Zvcm1PYnMobWVtYmVyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGFuZGxlIGFscmVhZHkgZXhpc3RpbmcgZGF0YVxuICAgICAgaWYgKG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSAmJiBfLmlzQXJyYXkob2JzUmVwW29icy5jb25jZXB0LnV1aWRdKSkge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0ucHVzaChncm91cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBbZ3JvdXBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWUudXVpZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IG9icy52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIF9hdWd1bWVudE9icyhleGlzdGluZzogYW55LCB0b0FkZDogYW55KTogYW55IHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b0FkZCkge1xuICAgICAgaWYgKF8uaGFzKGV4aXN0aW5nLCBrZXkpKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIG5vdCBhbiBhcnJheSB5ZXRcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgICBjb25zdCB0ZW1wID0gZXhpc3Rpbmdba2V5XTtcbiAgICAgICAgICBleGlzdGluZ1trZXldID0gW3RlbXBdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgaW5jb21pbmcgaXMgYXJyYXkgKGZvciBncm91cCBtZW1iZXJzKVxuICAgICAgICBpZiAoXy5pc0FycmF5KHRvQWRkW2tleV0pKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZXhpc3Rpbmdba2V5XSwgdG9BZGRba2V5XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhpc3Rpbmdba2V5XS5wdXNoKHRvQWRkW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGlzdGluZ1trZXldID0gdG9BZGRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0aW5nO1xuICB9XG5cblxufVxuIl19