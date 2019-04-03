/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
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
        /** @type {?} */
        const runner = this;
        /** @type {?} */
        const runnable = {
            run: (/**
             * @return {?}
             */
            () => {
                /* tslint:disable */
                /** @type {?} */
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
                /** @type {?} */
                let paramList = '';
                /** @type {?} */
                let argList = '';
                for (let o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                /** @type {?} */
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                /** @type {?} */
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
            })
        };
        return runnable;
    }
    /**
     * @private
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    getControlRelationValueString(control, scope) {
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach((/**
             * @param {?} relation
             * @return {?}
             */
            relation => {
                if (relation.relatedTo) {
                    /** @type {?} */
                    const related = (/** @type {?} */ (relation.relatedTo));
                    /** @type {?} */
                    const relatedAsControl = (/** @type {?} */ (relation.relatedTo));
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            }));
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach((/**
             * @param {?} node
             * @return {?}
             */
            node => {
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    const arrayNode = (/** @type {?} */ (node));
                    /** @type {?} */
                    const uuid = control.uuid;
                    /** @type {?} */
                    const controlRelationsFactory = new ControlRelationsFactory();
                    /** @type {?} */
                    let relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    }));
                    this.setControlArrayValues((/** @type {?} */ (control)), relationsForControl, scope);
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    setControlArrayValues(control, relationsForControl, scope) {
        /** @type {?} */
        const keys = this._getFormControlKeys(relationsForControl);
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            /** @type {?} */
            const values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        }));
    }
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    _getFormControlKeys(array) {
        /** @type {?} */
        const keys = [];
        array.forEach((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        }));
        return keys;
    }
    /**
     * @private
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    _getValuesForKey(key, array) {
        /** @type {?} */
        const values = [];
        array.forEach((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            if (control.uuid === key) {
                values.push(control.value);
            }
        }));
        return values;
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getHelperMethods(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getDataDependencies(obj, scope) {
        for (const key in obj) {
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
if (false) {
    /**
     * @return {?}
     */
    Runnable.prototype.run = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU07Ozs7Ozs7OztJQUNGLFdBQVcsQ0FBQyxVQUFrQixFQUFFLE9BQXFELEVBQ2pGLE1BQVcsRUFBRSxnQkFBcUIsRUFBRSxJQUFXOztjQUV6QyxNQUFNLEdBQUcsSUFBSTs7Y0FDYixRQUFRLEdBQWE7WUFDdkIsR0FBRzs7O1lBQUUsR0FBRyxFQUFFOzs7b0JBR0YsS0FBSyxHQUFRLEVBQUU7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDeEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXBELEVB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O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFFcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxHQUFRLEVBQUUsS0FBVztRQUMxQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLG1CQUFtQixDQUFDLEdBQVEsRUFBRSxLQUFXO1FBQzdDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0NBQ0o7Ozs7QUFFRCw4QkFFQzs7Ozs7SUFERyx5Q0FBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2NvbnRyb2wtZXh0ZW5zaW9ucyc7XHJcbmltcG9ydCB7IEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuZXhwb3J0IGNsYXNzIEV4cHJlc3Npb25SdW5uZXIge1xyXG4gICAgZ2V0UnVubmFibGUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCxcclxuICAgICAgICBoZWxwZXI6IGFueSwgZGF0YURlcGVuZGVuY2llczogYW55LCBmb3JtPzogRm9ybSk6XHJcbiAgICAgICAgUnVubmFibGUge1xyXG4gICAgICAgIGNvbnN0IHJ1bm5lciA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0ge1xyXG4gICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZVtjb250cm9sLnV1aWRdID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdpbmRvd1snbW9tZW50J10gPSBtb21lbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBzY29wZS5tb21lbnQgPSBtb21lbnQ7XHJcbiAgICAgICAgICAgICAgICBzY29wZVsnbXlWYWx1ZSddID0gY29udHJvbC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sLCBzY29wZSk7XHJcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0SGVscGVyTWV0aG9kcyhoZWxwZXIsIHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGRhdGFEZXBlbmRlbmNpZXMsIHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gZGVmaW5lZCcsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMsIHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1MaXN0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJnTGlzdCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbyBpbiBzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTGlzdCA9IHBhcmFtTGlzdCA9PT0gXCJcIiA/IHBhcmFtTGlzdCArIG8gOiBwYXJhbUxpc3QgKyAnLCcgKyBvO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ0xpc3QgPSBhcmdMaXN0ID09PSBcIlwiID8gYXJnTGlzdCArIFwic2NvcGVbJ1wiICsgbyArIFwiJ11cIiA6IGFyZ0xpc3QgKyBcIixzY29wZVsnXCIgKyBvICsgXCInXVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgbW9yZSB0aGFuIG9uZSByZXR1cm4gc3RhdGVtZW50c1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZigncmV0dXJuJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdcInJldHVybiAnICsgZXhwcmVzc2lvbiArICdcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNEZWNsYXJhdGlvbkNvZGUgPSAndmFyIGFmZUR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKFwiJyArIHBhcmFtTGlzdCArICdcIiwgJyArIGV4cHJlc3Npb24gKyAnKTsnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNDYWxsQ29kZSA9ICdhZmVEeW5hbWljRnVuYy5jYWxsKHRoaXMgJyArIChhcmdMaXN0ID09PSAnJyA/ICcnIDogJywnICsgYXJnTGlzdCkgKyAnKTsnO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzY29wZSkuaW5kZXhPZigndW5kZWZpbmVkJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgcmVmZXJlbmNlIGZvdW5kJywgZXhwcmVzc2lvbiwgc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdyZXN1bHRzOiAnLCBleHByZXNzaW9uLCBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAod2luZG93WydlcnJvcl9jb3VudCddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IHdpbmRvd1snZXJyb3JfY291bnQnXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcih3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAnIEVycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGFib3ZlIGR1cmluZyBkZWJ1Z2dpbmdcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24sIHNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcnVubmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5yZWxhdGlvbnMuZm9yRWFjaChyZWxhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24ucmVsYXRlZFRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZEFzQ29udHJvbCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBBYnN0cmFjdENvbnRyb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtyZWxhdGVkLnV1aWRdID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUgJiYgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9uc1xyXG4gICAgICAgICAgICAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXVpZCA9IGNvbnRyb2wudXVpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5ID0gbmV3IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgcmVsYXRlZCBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbCA9IHJlbGF0aW9uc0ZvckNvbnRyb2wuY29uY2F0KGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmdldFJlbGF0aW9uc0ZvckNvbnRyb2wodXVpZCwgY2hpbGQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksIHJlbGF0aW9uc0ZvckNvbnRyb2wsIHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q29udHJvbEFycmF5VmFsdWVzKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LFxyXG4gICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Piwgc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLl9nZXRGb3JtQ29udHJvbEtleXMocmVsYXRpb25zRm9yQ29udHJvbCk7XHJcblxyXG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IHRoaXMuX2dldFZhbHVlc0ZvcktleShrZXksIHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xyXG4gICAgICAgICAgICBzY29wZVtrZXldID0gdmFsdWVzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEZvcm1Db250cm9sS2V5cyhhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogQXJyYXk8c3RyaW5nPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGtleXMuaW5kZXhPZihjb250cm9sLnV1aWQpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGNvbnRyb2wudXVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0VmFsdWVzRm9yS2V5KGtleTogc3RyaW5nLCBhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogYW55IHtcclxuICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChjb250cm9sLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SGVscGVyTWV0aG9kcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREYXRhRGVwZW5kZW5jaWVzKG9iajogYW55LCBzY29wZT86IGFueSkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSdW5uYWJsZSB7XHJcbiAgICBydW4oKTtcclxufVxyXG4iXX0=