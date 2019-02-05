/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            run: (/**
             * @return {?}
             */
            function () {
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
            })
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
            control.controlRelations.relations.forEach((/**
             * @param {?} relation
             * @return {?}
             */
            function (relation) {
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
            }));
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
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
                    arrayNode.children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) {
                        relationsForControl_1 = relationsForControl_1.concat(controlRelationsFactory_1.getRelationsForControl(uuid_1, child));
                    }));
                    _this.setControlArrayValues((/** @type {?} */ (control)), relationsForControl_1, scope);
                }
            }));
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
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var values = _this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        }));
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
        array.forEach((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        }));
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
        array.forEach((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (control.uuid === key) {
                values.push(control.value);
            }
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCO0lBQUE7SUErSkEsQ0FBQzs7Ozs7Ozs7O0lBOUpHLHNDQUFXOzs7Ozs7OztJQUFYLFVBQVksVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVzs7WUFFekMsTUFBTSxHQUFHLElBQUk7O1lBQ2IsUUFBUSxHQUFhO1lBQ3ZCLEdBQUc7OztZQUFFOzs7b0JBR0csS0FBSyxHQUFRLEVBQUU7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDeEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFD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YXIvZm9ybXMnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2NvbnRyb2wtZXh0ZW5zaW9ucyc7XG5pbXBvcnQgeyBBcnJheU5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmV4cG9ydCBjbGFzcyBFeHByZXNzaW9uUnVubmVyIHtcbiAgICBnZXRSdW5uYWJsZShleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLFxuICAgICAgICBoZWxwZXI6IGFueSwgZGF0YURlcGVuZGVuY2llczogYW55LCBmb3JtPzogRm9ybSk6XG4gICAgICAgIFJ1bm5hYmxlIHtcbiAgICAgICAgY29uc3QgcnVubmVyID0gdGhpcztcbiAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0ge1xuICAgICAgICAgICAgcnVuOiAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICAgICAgICAgIGxldCBzY29wZTogYW55ID0ge307XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZVtjb250cm9sLnV1aWRdID0gY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcbiAgICAgICAgICAgICAgICAvLyBzY29wZS5tb21lbnQgPSBtb21lbnQ7XG4gICAgICAgICAgICAgICAgc2NvcGVbJ215VmFsdWUnXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2wsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0SGVscGVyTWV0aG9kcyhoZWxwZXIsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBydW5uZXIuZ2V0RGF0YURlcGVuZGVuY2llcyhkYXRhRGVwZW5kZW5jaWVzLCBzY29wZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdGb3JtIGRlZmluZWQnLCBmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcywgc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBwYXJhbUxpc3QgPSAnJztcbiAgICAgICAgICAgICAgICBsZXQgYXJnTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG8gaW4gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1MaXN0ID0gcGFyYW1MaXN0ID09PSBcIlwiID8gcGFyYW1MaXN0ICsgbyA6IHBhcmFtTGlzdCArICcsJyArIG87XG4gICAgICAgICAgICAgICAgICAgIGFyZ0xpc3QgPSBhcmdMaXN0ID09PSBcIlwiID8gYXJnTGlzdCArIFwic2NvcGVbJ1wiICsgbyArIFwiJ11cIiA6IGFyZ0xpc3QgKyBcIixzY29wZVsnXCIgKyBvICsgXCInXVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgbW9yZSB0aGFuIG9uZSByZXR1cm4gc3RhdGVtZW50c1xuICAgICAgICAgICAgICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3JldHVybicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gJ1wicmV0dXJuICcgKyBleHByZXNzaW9uICsgJ1wiJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZnVuY0RlY2xhcmF0aW9uQ29kZSA9ICd2YXIgYWZlRHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oXCInICsgcGFyYW1MaXN0ICsgJ1wiLCAnICsgZXhwcmVzc2lvbiArICcpOyc7XG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNDYWxsQ29kZSA9ICdhZmVEeW5hbWljRnVuYy5jYWxsKHRoaXMgJyArIChhcmdMaXN0ID09PSAnJyA/ICcnIDogJywnICsgYXJnTGlzdCkgKyAnKTsnO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2NvcGUpLmluZGV4T2YoJ3VuZGVmaW5lZCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWlzc2luZyByZWZlcmVuY2UgZm91bmQnLCBleHByZXNzaW9uLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oJ3Jlc3VsdHM6ICcsIGV4cHJlc3Npb24sIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh3aW5kb3dbJ2Vycm9yX2NvdW50J10pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHdpbmRvd1snZXJyb3JfY291bnQnXSA9IHdpbmRvd1snZXJyb3JfY291bnQnXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB3aW5kb3dbJ2Vycm9yX2NvdW50J10gPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3Iod2luZG93WydlcnJvcl9jb3VudCddICsgJyBFcnJvciBydW5uaW5nIGV4cHJlc3Npb246JyArIGV4cHJlc3Npb24gKyAnLiAnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZSwgY29udHJvbCwgJ0VmZmVjdGl2ZSBFeHByZXNzaW9uJywgKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGFib3ZlIGR1cmluZyBkZWJ1Z2dpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uLCBzY29wZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBydW5uYWJsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbnRyb2xSZWxhdGlvblZhbHVlU3RyaW5nKGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLCBzY29wZTogYW55KSB7XG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zKSB7XG4gICAgICAgICAgICBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMucmVsYXRpb25zLmZvckVhY2gocmVsYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbi5yZWxhdGVkVG8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0aW9uLnJlbGF0ZWRUbyBhcyBhbnk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWRBc0NvbnRyb2wgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgQWJzdHJhY3RDb250cm9sO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRlZEFzQ29udHJvbCAmJiBBcnJheS5pc0FycmF5KHJlbGF0ZWRBc0NvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtyZWxhdGVkLnV1aWRdID0gcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZSAmJiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZS52YWx1ZSA6IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9uc1xuICAgICAgICAgICAgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLm90aGVyUmVsYXRpb25zLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlOb2RlOiBBcnJheU5vZGUgPSBub2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXVpZCA9IGNvbnRyb2wudXVpZDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sUmVsYXRpb25zRmFjdG9yeTogQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkgPSBuZXcgQ29udHJvbFJlbGF0aW9uc0ZhY3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5PiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIHJlbGF0ZWQgY29udHJvbHNcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbCA9IHJlbGF0aW9uc0ZvckNvbnRyb2wuY29uY2F0KGNvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LmdldFJlbGF0aW9uc0ZvckNvbnRyb2wodXVpZCwgY2hpbGQpKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRyb2xBcnJheVZhbHVlcyhjb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5LCByZWxhdGlvbnNGb3JDb250cm9sLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbnRyb2xBcnJheVZhbHVlcyhjb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSxcbiAgICAgICAgcmVsYXRpb25zRm9yQ29udHJvbDogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+LCBzY29wZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLl9nZXRGb3JtQ29udHJvbEtleXMocmVsYXRpb25zRm9yQ29udHJvbCk7XG5cbiAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXM6IGFueSA9IHRoaXMuX2dldFZhbHVlc0ZvcktleShrZXksIHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuICAgICAgICAgICAgc2NvcGVba2V5XSA9IHZhbHVlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Rm9ybUNvbnRyb2xLZXlzKGFycmF5OiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4pOiBBcnJheTxzdHJpbmc+IHtcblxuICAgICAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgIGFycmF5LmZvckVhY2goY29udHJvbCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChrZXlzLmluZGV4T2YoY29udHJvbC51dWlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goY29udHJvbC51dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0VmFsdWVzRm9yS2V5KGtleTogc3RyaW5nLCBhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogYW55IHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSBbXTtcblxuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXG4gICAgICAgICAgICBpZiAoY29udHJvbC51dWlkID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhlbHBlck1ldGhvZHMob2JqOiBhbnksIHNjb3BlPzogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhRGVwZW5kZW5jaWVzKG9iajogYW55LCBzY29wZT86IGFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSdW5uYWJsZSB7XG4gICAgcnVuKCk7XG59XG4iXX0=