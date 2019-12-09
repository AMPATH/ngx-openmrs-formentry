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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1lbmNvdW50ZXItZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9oaXN0b3JpY2FsLWVuY291bnRlci1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBR3ZCO0lBR0U7UUFEQSxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQUV0QixDQUFDO0lBRUQsMkRBQWtCLEdBQWxCLFVBQW1CLElBQVksRUFBRSxVQUFlO1FBQWhELGlCQWlDQztRQWhDQyxJQUFNLFFBQVEsR0FBUTtZQUNwQixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxVQUFDLEdBQVcsRUFBRSxLQUFTO2dCQUFULHNCQUFBLEVBQUEsU0FBUztnQkFDL0IsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzVEO2dCQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDO1lBQ0QsZUFBZSxFQUFFLFVBQUMsS0FBUztnQkFBVCxzQkFBQSxFQUFBLFNB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QUMsQ0FBQyxDQUFDO2lCQUN2RDtxQkFBTTtvQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoQzthQUNGO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUF6TFUsOEJBQThCO1FBRDFDLFVBQVUsRUFBRTs7T0FDQSw4QkFBOEIsQ0E0TDFDO0lBQUQscUNBQUM7Q0FBQSxBQTVMRCxJQTRMQztTQTVMWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRW5jb3VudGVyRGF0YVNlcnZpY2Uge1xuXG4gIGRhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICByZWdpc3RlckVuY291bnRlcnMobmFtZTogc3RyaW5nLCBlbmNvdW50ZXJzOiBhbnkpIHtcbiAgICBjb25zdCBlbmNTdG9yZTogYW55ID0ge1xuICAgICAgZGF0YTogW10sXG4gICAgICBnZXRWYWx1ZTogKGtleTogc3RyaW5nLCBpbmRleCA9IDApOiBhbnkgPT4ge1xuICAgICAgICBjb25zdCBwYXRoQXJyYXkgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHBhdGhBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RWYWx1ZShwYXRoQXJyYXksIGVuY1N0b3JlLmRhdGFbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF1ba2V5XTtcbiAgICAgIH0sXG4gICAgICBnZXRBbGxPYmplY3RzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmNTdG9yZS5kYXRhO1xuICAgICAgfSxcbiAgICAgIGdldFNpbmdsZU9iamVjdDogKGluZGV4ID0gMCkgPT4ge1xuICAgICAgICByZXR1cm4gZW5jU3RvcmUuZGF0YVtpbmRleF07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChfLmlzQXJyYXkoZW5jb3VudGVycykpIHtcbiAgICAgIGNvbnN0IGdyb3VwOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBfLmVhY2goZW5jb3VudGVycywgKGVuY291bnRlcikgPT4ge1xuICAgICAgICBncm91cC5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXIpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTb3J0IHRoZW0gaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyXG4gICAgICBlbmNTdG9yZS5kYXRhID0gXy5zb3J0QnkoZ3JvdXAsICdlbmNvdW50ZXJEYXRldGltZScpLnJldmVyc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXNzdW1lIGEgc2luZ2xlIG9wZW5tcnMgcmVzdCBlbmNvdW50ZXIgb2JqZWN0LlxuICAgICAgZW5jU3RvcmUuZGF0YS5wdXNoKHRoaXMuX3RyYW5zZm9ybUVuY291bnRlcihlbmNvdW50ZXJzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wdXRPYmplY3QobmFtZSwgZW5jU3RvcmUpO1xuXG4gIH1cblxuICBwdXRPYmplY3QobmFtZSwgb2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlc1tuYW1lXSA9IG9iamVjdDtcbiAgfVxuXG4gIGdldE9iamVjdChuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2VzW25hbWVdIHx8IG51bGw7XG4gIH1cblxuICBnZXRGaXJzdFZhbHVlKHBhdGg6IEFycmF5PHN0cmluZz4sIG9iamVjdDogYW55KTogYW55IHtcblxuICAgIGNvbnN0IGFuc3dlcnMgPSBbXTtcblxuICAgIHRoaXMuZ2V0QWxsVmFsdWVzKHBhdGgsIG9iamVjdCwgYW5zd2Vycyk7XG5cbiAgICBpZiAoYW5zd2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogYW5zd2Vyc1swXSxcbiAgICAgICAgdmFsdWVEYXRlOiBtb21lbnQob2JqZWN0LmVuY291bnRlckRhdGV0aW1lKS5mb3JtYXQoJ2xsJylcbiAgICAgIH07XG4gICAgfVxuXG4gIH1cblxuICBnZXRBbGxWYWx1ZXMocGF0aCwgb2JqZWN0LCBhbnN3ZXJzKSB7XG4gICAgaWYgKF8uaXNOaWwob2JqZWN0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwYXRoLmxlbmd0aCA8PSAxKSB7XG4gICAgICBpZiAoIV8uaXNOaWwob2JqZWN0W3BhdGhbMF1dKSkge1xuICAgICAgICBhbnN3ZXJzLnB1c2gob2JqZWN0W3BhdGhbMF1dKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdwYXRoID0gcGF0aC5zcGxpY2UoMSk7XG4gICAgY29uc3Qga2V5ID0gcGF0aFswXTtcblxuICAgIGlmIChfLmlzQXJyYXkob2JqZWN0W2tleV0pICYmIG9iamVjdFtrZXldLmxlbmd0aCA+IDApIHtcbiAgICAgIF8uZWFjaChvYmplY3Rba2V5XSwgKGNoaWxkT2JqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0QWxsVmFsdWVzKG5ld3BhdGguc2xpY2UoMCksIGNoaWxkT2JqZWN0LCBhbnN3ZXJzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldEFsbFZhbHVlcyhuZXdwYXRoLnNsaWNlKDApLCBvYmplY3Rba2V5XSwgYW5zd2Vycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtRW5jb3VudGVyKGVuY291bnRlcjogYW55KSB7XG4gICAgaWYgKF8uaXNOaWwoZW5jb3VudGVyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUcmFuc2Zvcm0gZW5jb3VudGVyIExldmVsIGRldGFpbHMgdG8ga2V5IHZhbHVlIHBhaXJzLlxuICAgIGNvbnN0IHByZXZFbmNvdW50ZXI6IGFueSA9IHtcbiAgICAgIGVuY291bnRlckRhdGV0aW1lOiBlbmNvdW50ZXIuZW5jb3VudGVyRGF0ZXRpbWVcbiAgICB9O1xuXG4gICAgaWYgKGVuY291bnRlci5sb2NhdGlvbiAmJiBlbmNvdW50ZXIubG9jYXRpb24udXVpZCkge1xuICAgICAgcHJldkVuY291bnRlci5sb2NhdGlvbiA9IGVuY291bnRlci5sb2NhdGlvbi51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIucGF0aWVudCAmJiBlbmNvdW50ZXIucGF0aWVudC51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLnBhdGllbnQgPSBlbmNvdW50ZXIucGF0aWVudC51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIuZm9ybSAmJiBlbmNvdW50ZXIuZm9ybS51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLmZvcm0gPSBlbmNvdW50ZXIuZm9ybS51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIuZW5jb3VudGVyVHlwZSAmJiBlbmNvdW50ZXIuZW5jb3VudGVyVHlwZS51dWlkKSB7XG4gICAgICBwcmV2RW5jb3VudGVyLmVuY291bnRlclR5cGUgPSBlbmNvdW50ZXIuZW5jb3VudGVyVHlwZS51dWlkO1xuICAgIH1cblxuICAgIGlmIChlbmNvdW50ZXIucHJvdmlkZXIpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gZW5jb3VudGVyLnByb3ZpZGVyO1xuICAgICAgcHJldkVuY291bnRlci5wcm92aWRlciA9IHByb3ZpZGVyLnV1aWQ7XG4gICAgfVxuXG4gICAgLy8gRGVhbCB3aXRoIG9icy5cbiAgICBpZiAoZW5jb3VudGVyLm9icykge1xuICAgICAgY29uc3QgcHJvY2Vzc2VkT2JzOiBhbnkgPSB0aGlzLl90cmFuc2Zvcm1PYnMoZW5jb3VudGVyLm9icyk7XG5cbiAgICAgIC8vIGFkZCBpbiBpbmRpdmlkdWFsIHByb2Nlc3NlZCBvYnMgdG8gcHJldkVuY291bnRlclxuICAgICAgXy5leHRlbmQocHJldkVuY291bnRlciwgcHJvY2Vzc2VkT2JzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldkVuY291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybU9icyhvYnM6IGFueSk6IGFueSB7XG5cbiAgICBpZiAoIW9icykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JzUmVwOiBhbnkgPSB7fTtcbiAgICBpZiAoXy5pc0FycmF5KG9icykpIHtcbiAgICAgIF8uZWFjaChvYnMsIChzaW5nbGVPYnMpID0+IHtcbiAgICAgICAgdGhpcy5fYXVndW1lbnRPYnMob2JzUmVwLCB0aGlzLl90cmFuc2Zvcm1PYnMoc2luZ2xlT2JzKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfSBlbHNlIGlmIChvYnMuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICBjb25zdCBncm91cDogYW55ID0ge307XG4gICAgICBfLmVhY2gob2JzLmdyb3VwTWVtYmVycywgKG1lbWJlcikgPT4ge1xuICAgICAgICB0aGlzLl9hdWd1bWVudE9icyhncm91cCwgdGhpcy5fdHJhbnNmb3JtT2JzKG1lbWJlcikpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEhhbmRsZSBhbHJlYWR5IGV4aXN0aW5nIGRhdGFcbiAgICAgIGlmIChvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gJiYgXy5pc0FycmF5KG9ic1JlcFtvYnMuY29uY2VwdC51dWlkXSkpIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdLnB1c2goZ3JvdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gW2dyb3VwXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNSZXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgb2JzUmVwW29icy5jb25jZXB0LnV1aWRdID0gb2JzLnZhbHVlLnV1aWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNSZXBbb2JzLmNvbmNlcHQudXVpZF0gPSBvYnMudmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzUmVwO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBfYXVndW1lbnRPYnMoZXhpc3Rpbmc6IGFueSwgdG9BZGQ6IGFueSk6IGFueSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9BZGQpIHtcbiAgICAgIGlmIChfLmhhcyhleGlzdGluZywga2V5KSkge1xuICAgICAgICAvLyBjaGVjayBpZiBub3QgYW4gYXJyYXkgeWV0XG4gICAgICAgIGlmICghXy5pc0FycmF5KGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgICAgY29uc3QgdGVtcCA9IGV4aXN0aW5nW2tleV07XG4gICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IFt0ZW1wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGluY29taW5nIGlzIGFycmF5IChmb3IgZ3JvdXAgbWVtYmVycylcbiAgICAgICAgaWYgKF8uaXNBcnJheSh0b0FkZFtrZXldKSkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGV4aXN0aW5nW2tleV0sIHRvQWRkW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXN0aW5nW2tleV0ucHVzaCh0b0FkZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3Rpbmdba2V5XSA9IHRvQWRkW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleGlzdGluZztcbiAgfVxuXG5cbn1cbiJdfQ==