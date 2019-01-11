/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
var ExpressionRunner = /** @class */ (function () {
    function ExpressionRunner() {
    }
    /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    ExpressionRunner.prototype.getRunnable = /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    function (expression, control, helper, dataDependencies, form) {
        /** @type {?} */
        var runner = this;
        /** @type {?} */
        var runnable = {
            run: function () {
                /* tslint:disable */
                /** @type {?} */
                var scope = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                if (form) {
                    // console.error('Form defined', form);
                    runner.getDataDependencies(form.dataSourcesContainer.dataSources, scope);
                }
                /** @type {?} */
                var paramList = '';
                /** @type {?} */
                var argList = '';
                for (var o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                /** @type {?} */
                var funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                /** @type {?} */
                var funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression, scope);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    };
    /**
     * @private
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getControlRelationValueString = /**
     * @private
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    function (control, scope) {
        var _this = this;
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(function (relation) {
                if (relation.relatedTo) {
                    /** @type {?} */
                    var related = (/** @type {?} */ (relation.relatedTo));
                    /** @type {?} */
                    var relatedAsControl = (/** @type {?} */ (relation.relatedTo));
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(function (node) {
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    var arrayNode = (/** @type {?} */ (node));
                    /** @type {?} */
                    var uuid_1 = control.uuid;
                    /** @type {?} */
                    var controlRelationsFactory_1 = new ControlRelationsFactory();
                    /** @type {?} */
                    var relationsForControl_1 = [];
                    // get all related controls
                    arrayNode.children.forEach(function (child) {
                        relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                    });
                    _this.setControlArrayValues((/** @type {?} */ (control)), relationsForControl_1, scope);
                }
            });
        }
    };
    /**
     * @private
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    ExpressionRunner.prototype.setControlArrayValues = /**
     * @private
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    function (control, relationsForControl, scope) {
        var _this = this;
        /** @type {?} */
        var keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(function (key) {
            /** @type {?} */
            var values = _this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    };
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    ExpressionRunner.prototype._getFormControlKeys = /**
     * @private
     * @param {?} array
     * @return {?}
     */
    function (array) {
        /** @type {?} */
        var keys = [];
        array.forEach(function (control) {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    };
    /**
     * @private
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    ExpressionRunner.prototype._getValuesForKey = /**
     * @private
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    function (key, array) {
        /** @type {?} */
        var values = [];
        array.forEach(function (control) {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    };
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getHelperMethods = /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    ExpressionRunner.prototype.getDataDependencies = /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    return ExpressionRunner;
}());
export { ExpressionRunner };
/**
 * @record
 */
export function Runnable() { }
if (false) {
    /**
     * @return {?}
     */
    Runnable.prototype.run = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCO0lBQUE7SUErSkEsQ0FBQzs7Ozs7Ozs7O0lBOUpHLHNDQUFXOzs7Ozs7OztJQUFYLFVBQVksVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVzs7WUFFekMsTUFBTSxHQUFHLElBQUk7O1lBQ2IsUUFBUSxHQUFhO1lBQ3ZCLEdBQUcsRUFBRTs7O29CQUdHLEtBQUssR0FBUSxFQUFFO2dCQUNuQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUN2QztnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXBELElBQUksSUFBSSxFQUFF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LENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7Ozs7Ozs7SUFFTyw4Q0FBbUI7Ozs7OztJQUEzQixVQUE0QixHQUFRLEVBQUUsS0FBVztRQUM3QyxLQUFLLElBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNuQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUEvSkQsSUErSkM7Ozs7O0FBRUQsOEJBRUM7Ozs7O0lBREcseUNBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vY29udHJvbC1leHRlbnNpb25zJztcbmltcG9ydCB7IEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25SdW5uZXIge1xuICAgIGdldFJ1bm5hYmxlKGV4cHJlc3Npb246IHN0cmluZywgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsXG4gICAgICAgIGhlbHBlcjogYW55LCBkYXRhRGVwZW5kZW5jaWVzOiBhbnksIGZvcm0/OiBGb3JtKTpcbiAgICAgICAgUnVubmFibGUge1xuICAgICAgICBjb25zdCBydW5uZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB7XG4gICAgICAgICAgICBydW46ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbC51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlW2NvbnRyb2wudXVpZF0gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3dbJ21vbWVudCddID0gbW9tZW50O1xuICAgICAgICAgICAgICAgIC8vIHNjb3BlLm1vbWVudCA9IG1vbWVudDtcbiAgICAgICAgICAgICAgICBzY29wZVsnbXlWYWx1ZSddID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0Q29udHJvbFJlbGF0aW9uVmFsdWVTdHJpbmcoY29udHJvbCwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRIZWxwZXJNZXRob2RzKGhlbHBlciwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGRhdGFEZXBlbmRlbmNpZXMsIHNjb3BlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gZGVmaW5lZCcsIGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICBydW5uZXIuZ2V0RGF0YURlcGVuZGVuY2llcyhmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgIGxldCBhcmdMaXN0ID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbyBpbiBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbUxpc3QgPSBwYXJhbUxpc3QgPT09IFwiXCIgPyBwYXJhbUxpc3QgKyBvIDogcGFyYW1MaXN0ICsgJywnICsgbztcbiAgICAgICAgICAgICAgICAgICAgYXJnTGlzdCA9IGFyZ0xpc3QgPT09IFwiXCIgPyBhcmdMaXN0ICsgXCJzY29wZVsnXCIgKyBvICsgXCInXVwiIDogYXJnTGlzdCArIFwiLHNjb3BlWydcIiArIG8gKyBcIiddXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBtb3JlIHRoYW4gb25lIHJldHVybiBzdGF0ZW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZigncmV0dXJuJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSAnXCJyZXR1cm4gJyArIGV4cHJlc3Npb24gKyAnXCInO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBmdW5jRGVjbGFyYXRpb25Db2RlID0gJ3ZhciBhZmVEeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbihcIicgKyBwYXJhbUxpc3QgKyAnXCIsICcgKyBleHByZXNzaW9uICsgJyk7JztcbiAgICAgICAgICAgICAgICBsZXQgZnVuY0NhbGxDb2RlID0gJ2FmZUR5bmFtaWNGdW5jLmNhbGwodGhpcyAnICsgKGFyZ0xpc3QgPT09ICcnID8gJycgOiAnLCcgKyBhcmdMaXN0KSArICcpOyc7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzY29wZSkuaW5kZXhPZigndW5kZWZpbmVkJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXNzaW5nIHJlZmVyZW5jZSBmb3VuZCcsIGV4cHJlc3Npb24sIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygncmVzdWx0czogJywgZXhwcmVzc2lvbiwgZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHdpbmRvd1snZXJyb3JfY291bnQnXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gd2luZG93WydlcnJvcl9jb3VudCddICsgMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcih3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAnIEVycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLCBjb250cm9sLCAnRWZmZWN0aXZlIEV4cHJlc3Npb24nLCAoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24gKyAnLiAnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYWJvdmUgZHVyaW5nIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24sIHNjb3BlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJ1bm5hYmxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29udHJvbFJlbGF0aW9uVmFsdWVTdHJpbmcoY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIHNjb3BlOiBhbnkpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLnJlbGF0ZWRUbykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBBYnN0cmFjdENvbnRyb2w7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sICYmIEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtyZWxhdGVkLnV1aWRdID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlICYmIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zXG4gICAgICAgICAgICAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGU6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1dWlkID0gY29udHJvbC51dWlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSA9IG5ldyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgcmVsYXRlZCBjb250cm9sc1xuICAgICAgICAgICAgICAgICAgICBhcnJheU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sID0gcmVsYXRpb25zRm9yQ29udHJvbC5jb25jYXQoY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuZ2V0UmVsYXRpb25zRm9yQ29udHJvbCh1dWlkLCBjaGlsZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIHJlbGF0aW9uc0ZvckNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4sIHNjb3BlOiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IHRoaXMuX2dldEZvcm1Db250cm9sS2V5cyhyZWxhdGlvbnNGb3JDb250cm9sKTtcblxuICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gdGhpcy5fZ2V0VmFsdWVzRm9yS2V5KGtleSwgcmVsYXRpb25zRm9yQ29udHJvbCk7XG4gICAgICAgICAgICBzY29wZVtrZXldID0gdmFsdWVzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRGb3JtQ29udHJvbEtleXMoYXJyYXk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Pik6IEFycmF5PHN0cmluZz4ge1xuXG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgYXJyYXkuZm9yRWFjaChjb250cm9sID0+IHtcblxuICAgICAgICAgICAgaWYgKGtleXMuaW5kZXhPZihjb250cm9sLnV1aWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChjb250cm9sLnV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRWYWx1ZXNGb3JLZXkoa2V5OiBzdHJpbmcsIGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBhbnkge1xuICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IFtdO1xuXG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnV1aWQgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVscGVyTWV0aG9kcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGFEZXBlbmRlbmNpZXMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bm5hYmxlIHtcbiAgICBydW4oKTtcbn1cbiJdfQ==