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
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                let funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
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
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {
                if (relation.relatedTo) {
                    const related = relation.relatedTo;
                    const relatedAsControl = relation.relatedTo;
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
            control.controlRelations.otherRelations.forEach(node => {
                if (node instanceof ArrayNode) {
                    const arrayNode = node;
                    const uuid = control.uuid;
                    const controlRelationsFactory = new ControlRelationsFactory();
                    let relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach(child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    });
                    this.setControlArrayValues(control, relationsForControl, scope);
                }
            });
        }
    }
    setControlArrayValues(control, relationsForControl, scope) {
        const keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(key => {
            const values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }
    _getFormControlKeys(array) {
        const keys = [];
        array.forEach(control => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    }
    _getValuesForKey(key, array) {
        const values = [];
        array.forEach(control => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVwRixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDdkIsTUFBTSxPQUFPLGdCQUFnQjtJQUN6QixXQUFXLENBQUMsVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVztRQUUvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxRQUFRLEdBQWE7WUFDdkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFFTixvQkFBb0I7Z0JBQ3BCLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUNkLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFDdkM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDMUIseUJBQXlCO2dCQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLEtBQUss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LEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsR0FBUSxFQUFFLEtBQVc7UUFDN0MsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vY29udHJvbC1leHRlbnNpb25zJztcbmltcG9ydCB7IEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvY29udHJvbC1yZWxhdGlvbnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25SdW5uZXIge1xuICAgIGdldFJ1bm5hYmxlKGV4cHJlc3Npb246IHN0cmluZywgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsXG4gICAgICAgIGhlbHBlcjogYW55LCBkYXRhRGVwZW5kZW5jaWVzOiBhbnksIGZvcm0/OiBGb3JtKTpcbiAgICAgICAgUnVubmFibGUge1xuICAgICAgICBjb25zdCBydW5uZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB7XG4gICAgICAgICAgICBydW46ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbC51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlW2NvbnRyb2wudXVpZF0gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3dbJ21vbWVudCddID0gbW9tZW50O1xuICAgICAgICAgICAgICAgIC8vIHNjb3BlLm1vbWVudCA9IG1vbWVudDtcbiAgICAgICAgICAgICAgICBzY29wZVsnbXlWYWx1ZSddID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0Q29udHJvbFJlbGF0aW9uVmFsdWVTdHJpbmcoY29udHJvbCwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRIZWxwZXJNZXRob2RzKGhlbHBlciwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGRhdGFEZXBlbmRlbmNpZXMsIHNjb3BlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gZGVmaW5lZCcsIGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICBydW5uZXIuZ2V0RGF0YURlcGVuZGVuY2llcyhmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgIGxldCBhcmdMaXN0ID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbyBpbiBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbUxpc3QgPSBwYXJhbUxpc3QgPT09IFwiXCIgPyBwYXJhbUxpc3QgKyBvIDogcGFyYW1MaXN0ICsgJywnICsgbztcbiAgICAgICAgICAgICAgICAgICAgYXJnTGlzdCA9IGFyZ0xpc3QgPT09IFwiXCIgPyBhcmdMaXN0ICsgXCJzY29wZVsnXCIgKyBvICsgXCInXVwiIDogYXJnTGlzdCArIFwiLHNjb3BlWydcIiArIG8gKyBcIiddXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBtb3JlIHRoYW4gb25lIHJldHVybiBzdGF0ZW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZigncmV0dXJuJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSAnXCJyZXR1cm4gJyArIGV4cHJlc3Npb24gKyAnXCInO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBmdW5jRGVjbGFyYXRpb25Db2RlID0gJ3ZhciBhZmVEeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbihcIicgKyBwYXJhbUxpc3QgKyAnXCIsICcgKyBleHByZXNzaW9uICsgJyk7JztcbiAgICAgICAgICAgICAgICBsZXQgZnVuY0NhbGxDb2RlID0gJ2FmZUR5bmFtaWNGdW5jLmNhbGwodGhpcyAnICsgKGFyZ0xpc3QgPT09ICcnID8gJycgOiAnLCcgKyBhcmdMaXN0KSArICcpOyc7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzY29wZSkuaW5kZXhPZigndW5kZWZpbmVkJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXNzaW5nIHJlZmVyZW5jZSBmb3VuZCcsIGV4cHJlc3Npb24sIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbygncmVzdWx0czogJywgZXhwcmVzc2lvbiwgZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHdpbmRvd1snZXJyb3JfY291bnQnXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gd2luZG93WydlcnJvcl9jb3VudCddICsgMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcih3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAnIEVycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLCBjb250cm9sLCAnRWZmZWN0aXZlIEV4cHJlc3Npb24nLCAoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24gKyAnLiAnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYWJvdmUgZHVyaW5nIGRlYnVnZ2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24sIHNjb3BlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJ1bm5hYmxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29udHJvbFJlbGF0aW9uVmFsdWVTdHJpbmcoY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIHNjb3BlOiBhbnkpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uLnJlbGF0ZWRUbykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBBYnN0cmFjdENvbnRyb2w7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGVkQXNDb250cm9sICYmIEFycmF5LmlzQXJyYXkocmVsYXRlZEFzQ29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtyZWxhdGVkLnV1aWRdID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlICYmIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zXG4gICAgICAgICAgICAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheU5vZGU6IEFycmF5Tm9kZSA9IG5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1dWlkID0gY29udHJvbC51dWlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5OiBDb250cm9sUmVsYXRpb25zRmFjdG9yeSA9IG5ldyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgcmVsYXRlZCBjb250cm9sc1xuICAgICAgICAgICAgICAgICAgICBhcnJheU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sID0gcmVsYXRpb25zRm9yQ29udHJvbC5jb25jYXQoY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuZ2V0UmVsYXRpb25zRm9yQ29udHJvbCh1dWlkLCBjaGlsZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIHJlbGF0aW9uc0ZvckNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxuICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4sIHNjb3BlOiBhbnkpIHtcbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IHRoaXMuX2dldEZvcm1Db250cm9sS2V5cyhyZWxhdGlvbnNGb3JDb250cm9sKTtcblxuICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gdGhpcy5fZ2V0VmFsdWVzRm9yS2V5KGtleSwgcmVsYXRpb25zRm9yQ29udHJvbCk7XG4gICAgICAgICAgICBzY29wZVtrZXldID0gdmFsdWVzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRGb3JtQ29udHJvbEtleXMoYXJyYXk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Pik6IEFycmF5PHN0cmluZz4ge1xuXG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgYXJyYXkuZm9yRWFjaChjb250cm9sID0+IHtcblxuICAgICAgICAgICAgaWYgKGtleXMuaW5kZXhPZihjb250cm9sLnV1aWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChjb250cm9sLnV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRWYWx1ZXNGb3JLZXkoa2V5OiBzdHJpbmcsIGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBhbnkge1xuICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IFtdO1xuXG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb250cm9sLnV1aWQgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGVscGVyTWV0aG9kcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGFEZXBlbmRlbmNpZXMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bm5hYmxlIHtcbiAgICBydW4oKTtcbn1cbiJdfQ==