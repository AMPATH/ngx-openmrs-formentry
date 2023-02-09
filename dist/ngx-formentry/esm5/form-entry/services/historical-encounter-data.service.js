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
    HistoricalEncounterDataService.decorators = [
        { type: Injectable },
    ];
    HistoricalEncounterDataService.ctorParameters = function () { return []; };
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkI7SUFHRTtRQURBLGdCQUFXLEdBQVEsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVoQiwyREFBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLFVBQWU7UUFBaEQsaUJBZ0NDO1FBL0JDLElBQU0sUUFBUSxHQUFRO1lBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLFVBQUMsR0FBVyxFQUFFLEtBQVM7Z0JBQVQsc0JBQUEsRUFBQSxTQUFTO2dCQUMvQixJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELGFBQWEsRUFBRTtnQkFDYixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDO1lBQ0Qs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QkFDTixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDOztnQkFuTEYsVUFBVTs7O0lBb0xYLHFDQUFDO0NBQUEsQUFwTEQsSUFvTEM7U0FuTFksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEVuY291bnRlckRhdGFTZXJ2aWNlIHtcbiAgZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVnaXN0ZXJFbmNvdW50ZXJzKG5hbWU6IHN0cmluZywgZW5jb3VudGVyczogYW55KSB7XG4gICAgY29uc3QgZW5jU3RvcmU6IGFueSA9IHtcbiAgICAgIGRhdGE6IFtdLFxuICAgICAgZ2V0VmFsdWU6IChrZXk6IHN0cmluZywgaW5kZXggPSAwKTogYW55ID0+IHtcbiAgICAgICAgY29uc3QgcGF0aEFycmF5ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0VmFsdWUocGF0aEFycmF5LCBlbmNTdG9yZS5kYXRhW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdW2tleV07XG4gICAgICB9LFxuICAgICAgZ2V0QWxsT2JqZWN0czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YTtcbiAgICAgIH0sXG4gICAgICBnZXRTaW5nbGVPYmplY3Q6IChpbmRleCA9IDApID0+IHtcbiAgICAgICAgcmV0dXJuIGVuY1N0b3JlLmRhdGFbaW5kZXhdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoXy5pc0FycmF5KGVuY291bnRlcnMpKSB7XG4gICAgICBjb25zdCBncm91cDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgXy5lYWNoKGVuY291bnRlcnMsIChlbmNvdW50ZXIpID0+IHtcbiAgICAgICAgZ3JvdXAucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU29ydCB0aGVtIGluIHJldmVyc2UgY2hyb25vbG9naWNhbCBvcmRlclxuICAgICAgZW5jU3RvcmUuZGF0YSA9IF8uc29ydEJ5KGdyb3VwLCAnZW5jb3VudGVyRGF0ZXRpbWUnKS5yZXZlcnNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFzc3VtZSBhIHNpbmdsZSBvcGVubXJzIHJlc3QgZW5jb3VudGVyIG9iamVjdC5cbiAgICAgIGVuY1N0b3JlLmRhdGEucHVzaCh0aGlzLl90cmFuc2Zvcm1FbmNvdW50ZXIoZW5jb3VudGVycykpO1xuICAgIH1cblxuICAgIHRoaXMucHV0T2JqZWN0KG5hbWUsIGVuY1N0b3JlKTtcbiAgfVxuXG4gIHB1dE9iamVjdChuYW1lLCBvYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2VzW25hbWVdID0gb2JqZWN0O1xuICB9XG5cbiAgZ2V0T2JqZWN0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZXNbbmFtZV0gfHwgbnVsbDtcbiAgfVxuXG4gIGdldEZpcnN0VmFsdWUocGF0aDogQXJyYXk8c3RyaW5nPiwgb2JqZWN0OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcblxuICAgIHRoaXMuZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycyk7XG5cbiAgICBpZiAoYW5zd2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcbiAgICAgICAgdmFsdWVEYXRlOiBtb21lbnQob2JqZWN0LmVuY291bnRlckRhdGV0aW1lKS5mb3JtYXQoJ2xsJylcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycykge1xuICAgIGlmIChfLmlzTmlsKG9iamVjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPD0gMSkge1xuICAgICAgaWYgKCFfLmlzTmlsKG9iamVjdFtwYXRoWzBdXSkpIHtcbiAgICAgICAgYW5zd2Vycy5wdXNoKG9iamVjdFtwYXRoWzBdXSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3cGF0aCA9IHBhdGguc3BsaWNlKDEpO1xuICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG5cbiAgICBpZiAoXy5pc0FycmF5KG9iamVjdFtrZXldKSAmJiBvYmplY3Rba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICBfLmVhY2gob2JqZWN0W2tleV0sIChjaGlsZE9iamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBjaGlsZE9iamVjdCwgYW5zd2Vycyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRBbGxWYWx1ZXMobmV3cGF0aC5zbGljZSgwKSwgb2JqZWN0W2tleV0sIGFuc3dlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXI6IGFueSkge1xuICAgIGlmIChfLmlzTmlsKGVuY291bnRlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVHJhbnNmb3JtIGVuY291bnRlciBMZXZlbCBkZXRhaWxzIHRvIGtleSB2YWx1ZSBwYWlycy5cbiAgICBjb25zdCBwcmV2RW5jb3VudGVyOiBhbnkgPSB7XG4gICAgICBlbmNvdW50ZXJEYXRldGltZTogZW5jb3VudGVyLmVuY291bnRlckRhdGV0aW1lXG4gICAgfTtcblxuICAgIGlmIChlbmNvdW50ZXIubG9jYXRpb24gJiYgZW5jb3VudGVyLmxvY2F0aW9uLnV1aWQpIHtcbiAgICAgIHByZXZFbmNvdW50ZXIubG9jYXRpb24gPSBlbmNvdW50ZXIubG9jYXRpb24udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnBhdGllbnQgJiYgZW5jb3VudGVyLnBhdGllbnQudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5wYXRpZW50ID0gZW5jb3VudGVyLnBhdGllbnQudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmZvcm0gJiYgZW5jb3VudGVyLmZvcm0udXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5mb3JtID0gZW5jb3VudGVyLmZvcm0udXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLmVuY291bnRlclR5cGUgJiYgZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5lbmNvdW50ZXJUeXBlID0gZW5jb3VudGVyLmVuY291bnRlclR5cGUudXVpZDtcbiAgICB9XG5cbiAgICBpZiAoZW5jb3VudGVyLnByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IGVuY291bnRlci5wcm92aWRlcjtcbiAgICAgIHByZXZFbmNvdW50ZXIucHJvdmlkZXIgPSBwcm92aWRlci51dWlkO1xuICAgIH1cblxuICAgIC8vIERlYWwgd2l0aCBvYnMuXG4gICAgaWYgKGVuY291bnRlci5vYnMpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZE9iczogYW55ID0gdGhpcy5fdHJhbnNmb3JtT2JzKGVuY291bnRlci5vYnMpO1xuXG4gICAgICAvLyBhZGQgaW4gaW5kaXZpZHVhbCBwcm9jZXNzZWQgb2JzIHRvIHByZXZFbmNvdW50ZXJcbiAgICAgIF8uZXh0ZW5kKHByZXZFbmNvdW50ZXIsIHByb2Nlc3NlZE9icyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZFbmNvdW50ZXI7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1PYnMob2JzOiBhbnkpOiBhbnkge1xuICAgIGlmICghb2JzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNSZXA6IGFueSA9IHt9O1xuICAgIGlmIChfLmlzQXJyYXkob2JzKSkge1xuICAgICAgXy5lYWNoKG9icywgKHNpbmdsZU9icykgPT4ge1xuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhvYnNSZXAsIHRoaXMuX3RyYW5zZm9ybU9icyhzaW5nbGVPYnMpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9IGVsc2UgaWYgKG9icy5ncm91cE1lbWJlcnMpIHtcbiAgICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcbiAgICAgIF8uZWFjaChvYnMuZ3JvdXBNZW1iZXJzLCAobWVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuX2F1Z3VtZW50T2JzKGdyb3VwLCB0aGlzLl90cmFuc2Zvcm1PYnMobWVtYmVyKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSGFuZGxlIGFscmVhZHkgZXhpc3RpbmcgZGF0YVxuICAgICAgaWYgKG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSAmJiBfLmlzQXJyYXkob2JzUmVwW29icy5jb25jZXB0LnV1aWRdKSkge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0ucHVzaChncm91cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBbZ3JvdXBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic1JlcDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9icy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWUudXVpZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSA9IG9icy52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9BZGQpIHtcbiAgICAgIGlmIChfLmhhcyhleGlzdGluZywga2V5KSkge1xuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XG4gICAgICAgIGlmICghXy5pc0FycmF5KGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgICAgY29uc3QgdGVtcCA9IGV4aXN0aW5nW2tleV07XG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcbiAgICAgICAgaWYgKF8uaXNBcnJheSh0b0FkZFtrZXldKSkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGV4aXN0aW5nW2tleV0sIHRvQWRkW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXN0aW5nW2tleV0ucHVzaCh0b0FkZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3Rpbmdba2V5XSA9IHRvQWRkW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGlzdGluZztcbiAgfVxufVxuIl19