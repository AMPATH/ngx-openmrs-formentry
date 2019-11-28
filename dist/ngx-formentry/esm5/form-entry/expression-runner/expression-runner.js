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
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                var funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
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
    ExpressionRunner.prototype.getControlRelationValueString = function (control, scope) {
        var _this = this;
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(function (relation) {
                if (relation.relatedTo) {
                    var related = relation.relatedTo;
                    var relatedAsControl = relation.relatedTo;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVwRixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDdkI7SUFBQTtJQStKQSxDQUFDO0lBOUpHLHNDQUFXLEdBQVgsVUFBWSxVQUFrQixFQUFFLE9BQXFELEVBQ2pGLE1BQVcsRUFBRSxnQkFBcUIsRUFBRSxJQUFXO1FBRS9DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFNLFFBQVEsR0FBYTtZQUN2QixHQUFHLEVBQUU7Z0JBRUQsb0JBQW9CO2dCQUNwQixJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtvQkFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ3ZDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQzFCLHlCQUF5QjtnQkFDekIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMs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SUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sOENBQW1CLEdBQTNCLFVBQTRCLEdBQVEsRUFBRSxLQUFXO1FBQzdDLEtBQUssSUFBTSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQS9KRCxJQStKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9jb250cm9sLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHsgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5leHBvcnQgY2xhc3MgRXhwcmVzc2lvblJ1bm5lciB7XG4gICAgZ2V0UnVubmFibGUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCxcbiAgICAgICAgaGVscGVyOiBhbnksIGRhdGFEZXBlbmRlbmNpZXM6IGFueSwgZm9ybT86IEZvcm0pOlxuICAgICAgICBSdW5uYWJsZSB7XG4gICAgICAgIGNvbnN0IHJ1bm5lciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHtcbiAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVbY29udHJvbC51dWlkXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvd1snbW9tZW50J10gPSBtb21lbnQ7XG4gICAgICAgICAgICAgICAgLy8gc2NvcGUubW9tZW50ID0gbW9tZW50O1xuICAgICAgICAgICAgICAgIHNjb3BlWydteVZhbHVlJ10gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldEhlbHBlck1ldGhvZHMoaGVscGVyLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZGF0YURlcGVuZGVuY2llcywgc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRm9ybSBkZWZpbmVkJywgZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1MaXN0ID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ0xpc3QgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvIGluIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTGlzdCA9IHBhcmFtTGlzdCA9PT0gXCJcIiA/IHBhcmFtTGlzdCArIG8gOiBwYXJhbUxpc3QgKyAnLCcgKyBvO1xuICAgICAgICAgICAgICAgICAgICBhcmdMaXN0ID0gYXJnTGlzdCA9PT0gXCJcIiA/IGFyZ0xpc3QgKyBcInNjb3BlWydcIiArIG8gKyBcIiddXCIgOiBhcmdMaXN0ICsgXCIsc2NvcGVbJ1wiICsgbyArIFwiJ11cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IG1vcmUgdGhhbiBvbmUgcmV0dXJuIHN0YXRlbWVudHNcbiAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdyZXR1cm4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdcInJldHVybiAnICsgZXhwcmVzc2lvbiArICdcIic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNEZWNsYXJhdGlvbkNvZGUgPSAndmFyIGFmZUR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKFwiJyArIHBhcmFtTGlzdCArICdcIiwgJyArIGV4cHJlc3Npb24gKyAnKTsnO1xuICAgICAgICAgICAgICAgIGxldCBmdW5jQ2FsbENvZGUgPSAnYWZlRHluYW1pY0Z1bmMuY2FsbCh0aGlzICcgKyAoYXJnTGlzdCA9PT0gJycgPyAnJyA6ICcsJyArIGFyZ0xpc3QpICsgJyk7JztcblxuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNjb3BlKS5pbmRleE9mKCd1bmRlZmluZWQnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgcmVmZXJlbmNlIGZvdW5kJywgZXhwcmVzc2lvbiwgc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdyZXN1bHRzOiAnLCBleHByZXNzaW9uLCBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAod2luZG93WydlcnJvcl9jb3VudCddKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB3aW5kb3dbJ2Vycm9yX2NvdW50J10gPSB3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAxO1xuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKHdpbmRvd1snZXJyb3JfY291bnQnXSArICcgRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLCBjb250cm9sLCAnRWZmZWN0aXZlIEV4cHJlc3Npb24nLCAoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVuY29tbWVudCB0aGUgbGluZSBhYm92ZSBkdXJpbmcgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiwgc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcnVubmFibGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgc2NvcGU6IGFueSkge1xuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucykge1xuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKHJlbGF0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24ucmVsYXRlZFRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWQgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIEFic3RyYWN0Q29udHJvbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUgJiYgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgOiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnNcbiAgICAgICAgICAgICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHV1aWQgPSBjb250cm9sLnV1aWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5ID0gbmV3IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCByZWxhdGVkIGNvbnRyb2xzXG4gICAgICAgICAgICAgICAgICAgIGFycmF5Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2wgPSByZWxhdGlvbnNGb3JDb250cm9sLmNvbmNhdChjb250cm9sUmVsYXRpb25zRmFjdG9yeS5nZXRSZWxhdGlvbnNGb3JDb250cm9sKHV1aWQsIGNoaWxkKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRpb25zRm9yQ29udHJvbCwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXG4gICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Piwgc2NvcGU6IGFueSkge1xuICAgICAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5fZ2V0Rm9ybUNvbnRyb2xLZXlzKHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuXG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSB0aGlzLl9nZXRWYWx1ZXNGb3JLZXkoa2V5LCByZWxhdGlvbnNGb3JDb250cm9sKTtcbiAgICAgICAgICAgIHNjb3BlW2tleV0gPSB2YWx1ZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEZvcm1Db250cm9sS2V5cyhhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogQXJyYXk8c3RyaW5nPiB7XG5cbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXG4gICAgICAgICAgICBpZiAoa2V5cy5pbmRleE9mKGNvbnRyb2wudXVpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGNvbnRyb2wudXVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFZhbHVlc0ZvcktleShrZXk6IHN0cmluZywgYXJyYXk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Pik6IGFueSB7XG4gICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gW107XG5cbiAgICAgICAgYXJyYXkuZm9yRWFjaChjb250cm9sID0+IHtcblxuICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIZWxwZXJNZXRob2RzKG9iajogYW55LCBzY29wZT86IGFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YURlcGVuZGVuY2llcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVubmFibGUge1xuICAgIHJ1bigpO1xufVxuIl19