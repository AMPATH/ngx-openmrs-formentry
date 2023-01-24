import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
const moment = moment_;
export class ExpressionRunner {
    getRunnable(expression, control, helper, dataDependencies, form) {
        const runner = this;
        const runnable = {
            run: () => {
                /* tslint:disable */
                let scope = {};
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
                let paramList = '';
                let argList = '';
                for (let o in scope) {
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
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' +
                    paramList +
                    '", ' +
                    expression +
                    ');';
                let funcCallCode = 'afeDynamicFunc.call(this ' +
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
    }
    getControlRelationValueString(control, scope) {
        if (control &&
            control.controlRelations &&
            control.controlRelations.relations) {
            control.controlRelations.relations.forEach((relation) => {
                if (relation.relatedTo) {
                    const related = relation.relatedTo;
                    const relatedAsControl = relation.relatedTo;
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
            control.controlRelations.otherRelations.forEach((node) => {
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    const uuid = control.uuid;
                    const controlRelationsFactory = new ControlRelationsFactory();
                    let relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach((child) => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    });
                    this.setControlArrayValues(control, relationsForControl, scope);
                }
            });
        }
    }
    setControlArrayValues(control, relationsForControl, scope) {
        const keys = this._getFormControlKeys(relationsForControl);
        keys.forEach((key) => {
            const values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }
    _getFormControlKeys(array) {
        const keys = [];
        array.forEach((control) => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    }
    _getValuesForKey(key, array) {
        const values = [];
        array.forEach((control) => {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    }
    getHelperMethods(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
    getDataDependencies(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXBGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN2QixNQUFNO0lBQ0osV0FBVyxDQUNULFVBQWtCLEVBQ2xCLE9BQXFELEVBQ3JELE1BQVcsRUFDWCxnQkFBcUIsRUFDckIsSUFBVztRQUVYLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLFFBQVEsR0FBYTtZQUN6QixHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUNSLG9CQUFvQjtnQkFDcEIsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQzFCLHlCQUF5QjtnQkFDekIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxt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JztcbmltcG9ydCB7XG4gIEFmZUZvcm1Db250cm9sLFxuICBBZmVGb3JtQXJyYXksXG4gIEFmZUZvcm1Hcm91cFxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vY29udHJvbC1leHRlbnNpb25zJztcbmltcG9ydCB7IEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25SdW5uZXIge1xuICBnZXRSdW5uYWJsZShcbiAgICBleHByZXNzaW9uOiBzdHJpbmcsXG4gICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsXG4gICAgaGVscGVyOiBhbnksXG4gICAgZGF0YURlcGVuZGVuY2llczogYW55LFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IFJ1bm5hYmxlIHtcbiAgICBjb25zdCBydW5uZXIgPSB0aGlzO1xuICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHtcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHt9O1xuICAgICAgICBpZiAoY29udHJvbC51dWlkKSB7XG4gICAgICAgICAgc2NvcGVbY29udHJvbC51dWlkXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcbiAgICAgICAgLy8gc2NvcGUubW9tZW50ID0gbW9tZW50O1xuICAgICAgICBzY29wZVsnbXlWYWx1ZSddID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgcnVubmVyLmdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgcnVubmVyLmdldEhlbHBlck1ldGhvZHMoaGVscGVyLCBzY29wZSk7XG4gICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGRhdGFEZXBlbmRlbmNpZXMsIHNjb3BlKTtcblxuICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gZGVmaW5lZCcsIGZvcm0pO1xuICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKFxuICAgICAgICAgICAgZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyxcbiAgICAgICAgICAgIHNjb3BlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJhbUxpc3QgPSAnJztcbiAgICAgICAgbGV0IGFyZ0xpc3QgPSAnJztcbiAgICAgICAgZm9yIChsZXQgbyBpbiBzY29wZSkge1xuICAgICAgICAgIHBhcmFtTGlzdCA9IHBhcmFtTGlzdCA9PT0gJycgPyBwYXJhbUxpc3QgKyBvIDogcGFyYW1MaXN0ICsgJywnICsgbztcbiAgICAgICAgICBhcmdMaXN0ID1cbiAgICAgICAgICAgIGFyZ0xpc3QgPT09ICcnXG4gICAgICAgICAgICAgID8gYXJnTGlzdCArIFwic2NvcGVbJ1wiICsgbyArIFwiJ11cIlxuICAgICAgICAgICAgICA6IGFyZ0xpc3QgKyBcIixzY29wZVsnXCIgKyBvICsgXCInXVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudCBtb3JlIHRoYW4gb25lIHJldHVybiBzdGF0ZW1lbnRzXG4gICAgICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3JldHVybicpID09PSAtMSkge1xuICAgICAgICAgIGV4cHJlc3Npb24gPSAnXCJyZXR1cm4gJyArIGV4cHJlc3Npb24gKyAnXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZ1bmNEZWNsYXJhdGlvbkNvZGUgPVxuICAgICAgICAgICd2YXIgYWZlRHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oXCInICtcbiAgICAgICAgICBwYXJhbUxpc3QgK1xuICAgICAgICAgICdcIiwgJyArXG4gICAgICAgICAgZXhwcmVzc2lvbiArXG4gICAgICAgICAgJyk7JztcbiAgICAgICAgbGV0IGZ1bmNDYWxsQ29kZSA9XG4gICAgICAgICAgJ2FmZUR5bmFtaWNGdW5jLmNhbGwodGhpcyAnICtcbiAgICAgICAgICAoYXJnTGlzdCA9PT0gJycgPyAnJyA6ICcsJyArIGFyZ0xpc3QpICtcbiAgICAgICAgICAnKTsnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNjb3BlKS5pbmRleE9mKCd1bmRlZmluZWQnKSA+PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgcmVmZXJlbmNlIGZvdW5kJywgZXhwcmVzc2lvbiwgc2NvcGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL2NvbnNvbGUuaW5mbygncmVzdWx0czogJywgZXhwcmVzc2lvbiwgZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgcmV0dXJuIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZiAod2luZG93WydlcnJvcl9jb3VudCddKSB7XG4gICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IHdpbmRvd1snZXJyb3JfY291bnQnXSArIDE7XG4gICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gMTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcih3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAnIEVycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcblxuICAgICAgICAgIC8vIFVuY29tbWVudCB0aGUgbGluZSBhYm92ZSBkdXJpbmcgZGVidWdnaW5nXG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uLCBzY29wZSk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJ1bm5hYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhcbiAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCxcbiAgICBzY29wZTogYW55XG4gICkge1xuICAgIGlmIChcbiAgICAgIGNvbnRyb2wgJiZcbiAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJlxuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9uc1xuICAgICkge1xuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKChyZWxhdGlvbikgPT4ge1xuICAgICAgICBpZiAocmVsYXRpb24ucmVsYXRlZFRvKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBBYnN0cmFjdENvbnRyb2w7XG4gICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9XG4gICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWVcbiAgICAgICAgICAgICAgICA/IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZVxuICAgICAgICAgICAgICAgIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY29udHJvbCAmJlxuICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmXG4gICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMgJiZcbiAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgY29uc3QgdXVpZCA9IGNvbnRyb2wudXVpZDtcblxuICAgICAgICAgIGNvbnN0IGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSA9IG5ldyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSgpO1xuICAgICAgICAgIGxldCByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBbXTtcbiAgICAgICAgICAvLyBnZXQgYWxsIHJlbGF0ZWQgY29udHJvbHNcbiAgICAgICAgICBhcnJheU5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2wgPSByZWxhdGlvbnNGb3JDb250cm9sLmNvbmNhdChcbiAgICAgICAgICAgICAgY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuZ2V0UmVsYXRpb25zRm9yQ29udHJvbCh1dWlkLCBjaGlsZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnNldENvbnRyb2xBcnJheVZhbHVlcyhcbiAgICAgICAgICAgIGNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXG4gICAgICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sLFxuICAgICAgICAgICAgc2NvcGVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENvbnRyb2xBcnJheVZhbHVlcyhcbiAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4sXG4gICAgc2NvcGU6IGFueVxuICApIHtcbiAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5fZ2V0Rm9ybUNvbnRyb2xLZXlzKHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gdGhpcy5fZ2V0VmFsdWVzRm9yS2V5KGtleSwgcmVsYXRpb25zRm9yQ29udHJvbCk7XG4gICAgICBzY29wZVtrZXldID0gdmFsdWVzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Rm9ybUNvbnRyb2xLZXlzKFxuICAgIGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT5cbiAgKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGFycmF5LmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGlmIChrZXlzLmluZGV4T2YoY29udHJvbC51dWlkKSA9PT0gLTEpIHtcbiAgICAgICAga2V5cy5wdXNoKGNvbnRyb2wudXVpZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIHByaXZhdGUgX2dldFZhbHVlc0ZvcktleShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+XG4gICk6IGFueSB7XG4gICAgY29uc3QgdmFsdWVzOiBhbnkgPSBbXTtcblxuICAgIGFycmF5LmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgIGlmIChjb250cm9sLnV1aWQgPT09IGtleSkge1xuICAgICAgICB2YWx1ZXMucHVzaChjb250cm9sLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICBwcml2YXRlIGdldEhlbHBlck1ldGhvZHMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YURlcGVuZGVuY2llcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVubmFibGUge1xuICBydW4oKTtcbn1cbiJdfQ==