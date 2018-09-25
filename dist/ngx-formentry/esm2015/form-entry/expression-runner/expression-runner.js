/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
export class ExpressionRunner {
    /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    getRunnable(expression, control, helper, dataDependencies, form) {
        const /** @type {?} */ runner = this;
        const /** @type {?} */ runnable = {
            run: () => {
                /* tslint:disable */
                let /** @type {?} */ scope = {};
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
                let /** @type {?} */ paramList = '';
                let /** @type {?} */ argList = '';
                for (let /** @type {?} */ o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                let /** @type {?} */ funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                let /** @type {?} */ funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (/** @type {?} */ e) {
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
    /**
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    getControlRelationValueString(control, scope) {
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {
                if (relation.relatedTo) {
                    const /** @type {?} */ related = /** @type {?} */ (relation.relatedTo);
                    const /** @type {?} */ relatedAsControl = /** @type {?} */ (relation.relatedTo);
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
                    const /** @type {?} */ arrayNode = /** @type {?} */ (node);
                    const /** @type {?} */ uuid = control.uuid;
                    const /** @type {?} */ controlRelationsFactory = new ControlRelationsFactory();
                    let /** @type {?} */ relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach(child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    });
                    this.setControlArrayValues(/** @type {?} */ (control), relationsForControl, scope);
                }
            });
        }
    }
    /**
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    setControlArrayValues(control, relationsForControl, scope) {
        const /** @type {?} */ keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(key => {
            const /** @type {?} */ values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }
    /**
     * @param {?} array
     * @return {?}
     */
    _getFormControlKeys(array) {
        const /** @type {?} */ keys = [];
        array.forEach(control => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    }
    /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    _getValuesForKey(key, array) {
        const /** @type {?} */ values = [];
        array.forEach(control => {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    }
    /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getHelperMethods(obj, scope) {
        for (const /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
    /**
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getDataDependencies(obj, scope) {
        for (const /** @type {?} */ key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
}
/**
 * @record
 */
export function Runnable() { }
function Runnable_tsickle_Closure_declarations() {
    /** @type {?} */
    Runnable.prototype.run;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN2QixNQUFNOzs7Ozs7Ozs7SUFDRixXQUFXLENBQUMsVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVztRQUUvQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHVCQUFNLFFBQVEsR0FBYTtZQUN2QixHQUFHLEVBQUUsR0FBRyxFQUFFOztnQkFHTixxQkFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDZixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ3ZDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7O2dCQUUxQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FB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O1FBQzFDLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7Ozs7Ozs7SUFHRyxtQkFBbUIsQ0FBQyxHQUFRLEVBQUUsS0FBVztRQUM3QyxHQUFHLENBQUMsQ0FBQyx1QkFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNKOztDQUVSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vY29udHJvbC1leHRlbnNpb25zJztcclxuaW1wb3J0IHsgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5leHBvcnQgY2xhc3MgRXhwcmVzc2lvblJ1bm5lciB7XHJcbiAgICBnZXRSdW5uYWJsZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLFxyXG4gICAgICAgIGhlbHBlcjogYW55LCBkYXRhRGVwZW5kZW5jaWVzOiBhbnksIGZvcm0/OiBGb3JtKTpcclxuICAgICAgICBSdW5uYWJsZSB7XHJcbiAgICAgICAgY29uc3QgcnVubmVyID0gdGhpcztcclxuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSB7XHJcbiAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlW2NvbnRyb2wudXVpZF0gPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcclxuICAgICAgICAgICAgICAgIC8vIHNjb3BlLm1vbWVudCA9IG1vbWVudDtcclxuICAgICAgICAgICAgICAgIHNjb3BlWydteVZhbHVlJ10gPSBjb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcnVubmVyLmdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2wsIHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRIZWxwZXJNZXRob2RzKGhlbHBlciwgc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZGF0YURlcGVuZGVuY2llcywgc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRm9ybSBkZWZpbmVkJywgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcywgc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbUxpc3QgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCBhcmdMaXN0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvIGluIHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1MaXN0ID0gcGFyYW1MaXN0ID09PSBcIlwiID8gcGFyYW1MaXN0ICsgbyA6IHBhcmFtTGlzdCArICcsJyArIG87XHJcbiAgICAgICAgICAgICAgICAgICAgYXJnTGlzdCA9IGFyZ0xpc3QgPT09IFwiXCIgPyBhcmdMaXN0ICsgXCJzY29wZVsnXCIgKyBvICsgXCInXVwiIDogYXJnTGlzdCArIFwiLHNjb3BlWydcIiArIG8gKyBcIiddXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBtb3JlIHRoYW4gb25lIHJldHVybiBzdGF0ZW1lbnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdyZXR1cm4nKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gJ1wicmV0dXJuICcgKyBleHByZXNzaW9uICsgJ1wiJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY0RlY2xhcmF0aW9uQ29kZSA9ICd2YXIgYWZlRHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oXCInICsgcGFyYW1MaXN0ICsgJ1wiLCAnICsgZXhwcmVzc2lvbiArICcpOyc7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY0NhbGxDb2RlID0gJ2FmZUR5bmFtaWNGdW5jLmNhbGwodGhpcyAnICsgKGFyZ0xpc3QgPT09ICcnID8gJycgOiAnLCcgKyBhcmdMaXN0KSArICcpOyc7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNjb3BlKS5pbmRleE9mKCd1bmRlZmluZWQnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWlzc2luZyByZWZlcmVuY2UgZm91bmQnLCBleHByZXNzaW9uLCBzY29wZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3Jlc3VsdHM6ICcsIGV4cHJlc3Npb24sIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh3aW5kb3dbJ2Vycm9yX2NvdW50J10pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gd2luZG93WydlcnJvcl9jb3VudCddICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB3aW5kb3dbJ2Vycm9yX2NvdW50J10gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKHdpbmRvd1snZXJyb3JfY291bnQnXSArICcgRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24gKyAnLiAnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLCBjb250cm9sLCAnRWZmZWN0aXZlIEV4cHJlc3Npb24nLCAoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYWJvdmUgZHVyaW5nIGRlYnVnZ2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiwgc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBydW5uYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLCBzY29wZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMpIHtcclxuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKHJlbGF0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5yZWxhdGVkVG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIEFic3RyYWN0Q29udHJvbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbCAmJiBBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlIDogcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zXHJcbiAgICAgICAgICAgICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlOiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1dWlkID0gY29udHJvbC51dWlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sUmVsYXRpb25zRmFjdG9yeTogQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgPSBuZXcgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCByZWxhdGVkIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbnNGb3JDb250cm9sID0gcmVsYXRpb25zRm9yQ29udHJvbC5jb25jYXQoY29udHJvbFJlbGF0aW9uc0ZhY3RvcnkuZ2V0UmVsYXRpb25zRm9yQ29udHJvbCh1dWlkLCBjaGlsZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRpb25zRm9yQ29udHJvbCwgc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXHJcbiAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+LCBzY29wZTogYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IHRoaXMuX2dldEZvcm1Db250cm9sS2V5cyhyZWxhdGlvbnNGb3JDb250cm9sKTtcclxuXHJcbiAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gdGhpcy5fZ2V0VmFsdWVzRm9yS2V5KGtleSwgcmVsYXRpb25zRm9yQ29udHJvbCk7XHJcbiAgICAgICAgICAgIHNjb3BlW2tleV0gPSB2YWx1ZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9ybUNvbnRyb2xLZXlzKGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBBcnJheTxzdHJpbmc+IHtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoa2V5cy5pbmRleE9mKGNvbnRyb2wudXVpZCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goY29udHJvbC51dWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ga2V5cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRWYWx1ZXNGb3JLZXkoa2V5OiBzdHJpbmcsIGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gW107XHJcblxyXG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udHJvbC51dWlkID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRIZWxwZXJNZXRob2RzKG9iajogYW55LCBzY29wZT86IGFueSkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGFEZXBlbmRlbmNpZXMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJ1bm5hYmxlIHtcclxuICAgIHJ1bigpO1xyXG59XHJcbiJdfQ==