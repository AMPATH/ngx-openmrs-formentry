import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
var moment = moment_;
var ExpressionRunner = /** @class */ (function () {
    function ExpressionRunner() {
    }
    ExpressionRunner.prototype.getRunnable = function (expression, control, helper, dataDependencies, form) {
        var runner = this;
        var runnable = {
            run: function () {
                /* tslint:disable */
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
                var paramList = '';
                var argList = '';
                for (var o in scope) {
                    paramList = paramList === '' ? paramList + o : paramList + ',' + o;
                    argList =
                        argList === ''
                            ? argList + "scope['" + o + "']"
                            : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                var funcDeclarationCode = 'var afeDynamicFunc = new Function("' +
                    paramList +
                    '", ' +
                    expression +
                    ');';
                var funcCallCode = 'afeDynamicFunc.call(this ' +
                    (argList === '' ? '' : ',' + argList) +
                    ');';
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
    ExpressionRunner.prototype.getControlRelationValueString = function (control, scope) {
        var _this = this;
        if (control &&
            control.controlRelations &&
            control.controlRelations.relations) {
            control.controlRelations.relations.forEach(function (relation) {
                if (relation.relatedTo) {
                    var related = relation.relatedTo;
                    var relatedAsControl = relation.relatedTo;
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] =
                            relation.relatedTo.value && relation.relatedTo.value.value
                                ? relation.relatedTo.value.value
                                : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control &&
            control.controlRelations &&
            control.controlRelations.otherRelations &&
            control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(function (node) {
                if (node instanceof ArrayNode) {
                    var arrayNode = node;
                    var uuid_1 = control.uuid;
                    var controlRelationsFactory_1 = new ControlRelationsFactory();
                    var relationsForControl_1 = [];
                    // get all related controls
                    arrayNode.children.forEach(function (child) {
                        relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                    });
                    _this.setControlArrayValues(control, relationsForControl_1, scope);
                }
            });
        }
    };
    ExpressionRunner.prototype.setControlArrayValues = function (control, relationsForControl, scope) {
        var _this = this;
        var keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(function (key) {
            var values = _this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    };
    ExpressionRunner.prototype._getFormControlKeys = function (array) {
        var keys = [];
        array.forEach(function (control) {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    };
    ExpressionRunner.prototype._getValuesForKey = function (key, array) {
        var values = [];
        array.forEach(function (control) {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    };
    ExpressionRunner.prototype.getHelperMethods = function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    ExpressionRunner.prototype.getDataDependencies = function (obj, scope) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    };
    return ExpressionRunner;
}());
export { ExpressionRunner };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXBGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN2QjtJQUFBO0lBcU1BLENBQUM7SUFwTUMsc0NBQVcsR0FBWCxVQUNFLFVBQWtCLEVBQ2xCLE9BQXFELEVBQ3JELE1BQVcsRUFDWCxnQkFBcUIsRUFDckIsSUFBVztRQUVYLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFNLFFBQVEsR0FBYTtZQUN6QixHQUFHLEVBQUU7Z0JBQ0gsb0JBQW9CO2dCQUNwQixJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDMUIseUJBQXlCO2dCQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsTUFB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YWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFmZUZvcm1Db250cm9sLFxuICBBZmVGb3JtQXJyYXksXG4gIEFmZUZvcm1Hcm91cFxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vY29udHJvbC1leHRlbnNpb25zJztcbmltcG9ydCB7IEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25SdW5uZXIge1xuICBnZXRSdW5uYWJsZShcbiAgICBleHByZXNzaW9uOiBzdHJpbmcsXG4gICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsXG4gICAgaGVscGVyOiBhbnksXG4gICAgZGF0YURlcGVuZGVuY2llczogYW55LFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IFJ1bm5hYmxlIHtcbiAgICBjb25zdCBydW5uZXIgPSB0aGlzO1xuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHtcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHt9O1xuICAgICAgICBpZiAoY29udHJvbC51dWlkKSB7XG4gICAgICAgICAgc2NvcGVbY29udHJvbC51dWlkXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcbiAgICAgICAgLy8gc2NvcGUubW9tZW50ID0gbW9tZW50O1xuICAgICAgICBzY29wZVsnbXlWYWx1ZSddID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgcnVubmVyLmdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgcnVubmVyLmdldEhlbHBlck1ldGhvZHMoaGVscGVyLCBzY29wZSk7XG4gICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGRhdGFEZXBlbmRlbmNpZXMsIHNjb3BlKTtcblxuICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gZGVmaW5lZCcsIGZvcm0pO1xuICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKFxuICAgICAgICAgICAgZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyxcbiAgICAgICAgICAgIHNjb3BlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbUxpc3QgPSAnJztcbiAgICAgICAgbGV0IGFyZ0xpc3QgPSAnJztcbiAgICAgICAgZm9yIChsZXQgbyBpbiBzY29wZSkge1xuICAgICAgICAgIHBhcmFtTGlzdCA9IHBhcmFtTGlzdCA9PT0gJycgPyBwYXJhbUxpc3QgKyBvIDogcGFyYW1MaXN0ICsgJywnICsgbztcbiAgICAgICAgICBhcmdMaXN0ID1cbiAgICAgICAgICAgIGFyZ0xpc3QgPT09ICcnXG4gICAgICAgICAgICAgID8gYXJnTGlzdCArIFwic2NvcGVbJ1wiICsgbyArIFwiJ11cIlxuICAgICAgICAgICAgICA6IGFyZ0xpc3QgKyBcIixzY29wZVsnXCIgKyBvICsgXCInXVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudCBtb3JlIHRoYW4gb25lIHJldHVybiBzdGF0ZW1lbnRzXG4gICAgICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3JldHVybicpID09PSAtMSkge1xuICAgICAgICAgIGV4cHJlc3Npb24gPSAnXCJyZXR1cm4gJyArIGV4cHJlc3Npb24gKyAnXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZ1bmNEZWNsYXJhdGlvbkNvZGUgPVxuICAgICAgICAgICd2YXIgYWZlRHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oXCInICtcbiAgICAgICAgICBwYXJhbUxpc3QgK1xuICAgICAgICAgICdcIiwgJyArXG4gICAgICAgICAgZXhwcmVzc2lvbiArXG4gICAgICAgICAgJyk7JztcbiAgICAgICAgbGV0IGZ1bmNDYWxsQ29kZSA9XG4gICAgICAgICAgJ2FmZUR5bmFtaWNGdW5jLmNhbGwodGhpcyAnICtcbiAgICAgICAgICAoYXJnTGlzdCA9PT0gJycgPyAnJyA6ICcsJyArIGFyZ0xpc3QpICtcbiAgICAgICAgICAnKTsnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNjb3BlKS5pbmRleE9mKCd1bmRlZmluZWQnKSA+PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgcmVmZXJlbmNlIGZvdW5kJywgZXhwcmVzc2lvbiwgc2NvcGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL2NvbnNvbGUuaW5mbygncmVzdWx0czogJywgZXhwcmVzc2lvbiwgZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgcmV0dXJuIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZiAod2luZG93WydlcnJvcl9jb3VudCddKSB7XG4gICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IHdpbmRvd1snZXJyb3JfY291bnQnXSArIDE7XG4gICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gMTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcih3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAnIEVycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcblxuICAgICAgICAgIC8vIFVuY29tbWVudCB0aGUgbGluZSBhYm92ZSBkdXJpbmcgZGVidWdnaW5nXG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uLCBzY29wZSk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJ1bm5hYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhcbiAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCxcbiAgICBzY29wZTogYW55XG4gICkge1xuICAgIGlmIChcbiAgICAgIGNvbnRyb2wgJiZcbiAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJlxuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9uc1xuICAgICkge1xuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKChyZWxhdGlvbikgPT4ge1xuICAgICAgICBpZiAocmVsYXRpb24ucmVsYXRlZFRvKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBBYnN0cmFjdENvbnRyb2w7XG4gICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9XG4gICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWVcbiAgICAgICAgICAgICAgICA/IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZVxuICAgICAgICAgICAgICAgIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY29udHJvbCAmJlxuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmXG4gICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMgJiZcbiAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgY29uc3QgdXVpZCA9IGNvbnRyb2wudXVpZDtcblxuICAgICAgICAgIGNvbnN0IGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSA9IG5ldyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSgpO1xuICAgICAgICAgIGxldCByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBbXTtcbiAgICAgICAgICAvLyBnZXQgYWxsIHJlbGF0ZWQgY29udHJvbHNcbiAgICAgICAgICBhcnJheU5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2wgPSByZWxhdGlvbnNGb3JDb250cm9sLmNvbmNhdChcbiAgICAgICAgICAgICAgY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuZ2V0UmVsYXRpb25zRm9yQ29udHJvbCh1dWlkLCBjaGlsZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldENvbnRyb2xBcnJheVZhbHVlcyhcbiAgICAgICAgICAgIGNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXG4gICAgICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sLFxuICAgICAgICAgICAgc2NvcGVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENvbnRyb2xBcnJheVZhbHVlcyhcbiAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4sXG4gICAgc2NvcGU6IGFueVxuICApIHtcbiAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5fZ2V0Rm9ybUNvbnRyb2xLZXlzKHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gdGhpcy5fZ2V0VmFsdWVzRm9yS2V5KGtleSwgcmVsYXRpb25zRm9yQ29udHJvbCk7XG4gICAgICBzY29wZVtrZXldID0gdmFsdWVzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Rm9ybUNvbnRyb2xLZXlzKFxuICAgIGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT5cbiAgKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGFycmF5LmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGlmIChrZXlzLmluZGV4T2YoY29udHJvbC51dWlkKSA9PT0gLTEpIHtcbiAgICAgICAga2V5cy5wdXNoKGNvbnRyb2wudXVpZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIHByaXZhdGUgX2dldFZhbHVlc0ZvcktleShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+XG4gICk6IGFueSB7XG4gICAgY29uc3QgdmFsdWVzOiBhbnkgPSBbXTtcblxuICAgIGFycmF5LmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGlmIChjb250cm9sLnV1aWQgPT09IGtleSkge1xuICAgICAgICB2YWx1ZXMucHVzaChjb250cm9sLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICBwcml2YXRlIGdldEhlbHBlck1ldGhvZHMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YURlcGVuZGVuY2llcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVubmFibGUge1xuICBydW4oKTtcbn1cbiJdfQ==