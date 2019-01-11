/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
var JsExpressionHelper = /** @class */ (function () {
    function JsExpressionHelper() {
    }
    /**
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    JsExpressionHelper.prototype.calcBMI = /**
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    function (height, weight) {
        /** @type {?} */
        var r;
        if (height && weight) {
            r = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        return height && weight ? parseFloat(r) : null;
    };
    /**
     * @param {?} bmiForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    JsExpressionHelper.prototype.calcBMIForAgeZscore = /**
     * @param {?} bmiForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    function (bmiForAgeRef, height, weight) {
        /** @type {?} */
        var bmi;
        /** @type {?} */
        var maxAgeInDays = 1856;
        if (height && weight) {
            bmi = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        /** @type {?} */
        var refSectionObject = _.first(bmiForAgeRef);
        /** @type {?} */
        var formattedSDValue;
        if (refSectionObject) {
            /** @type {?} */
            var refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            /** @type {?} */
            var refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            var minimumValue = refObjectValues[1];
            /** @type {?} */
            var minReferencePoint_1 = [];
            if (bmi < minimumValue) {
                minReferencePoint_1.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, function (value) {
                    if (value <= bmi) {
                        minReferencePoint_1.push(value);
                    }
                });
            }
            /** @type {?} */
            var lastReferenceValue_1 = _.last(minReferencePoint_1);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_1;
            });
            /** @type {?} */
            var SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return bmi && refSectionObject ? formattedSDValue : null;
    };
    /**
     * @param {?} weightForHeightRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    JsExpressionHelper.prototype.calcWeightForHeightZscore = /**
     * @param {?} weightForHeightRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    function (weightForHeightRef, height, weight) {
        /** @type {?} */
        var refSection;
        /** @type {?} */
        var formattedSDValue;
        if (height && weight) {
            height = parseFloat(height).toFixed(1);
        }
        /** @type {?} */
        var standardHeightMin = 45;
        /** @type {?} */
        var standardMaxHeight = 110;
        if (height < standardHeightMin || height > standardMaxHeight) {
            formattedSDValue = -4;
        }
        else {
            refSection = _.filter(weightForHeightRef, function (refObject) {
                return parseFloat(refObject['Length']).toFixed(1) === height;
            });
        }
        /** @type {?} */
        var refSectionObject = _.first(refSection);
        if (refSectionObject) {
            /** @type {?} */
            var refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            /** @type {?} */
            var refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            var minimumValue = refObjectValues[1];
            /** @type {?} */
            var minReferencePoint_2 = [];
            if (weight < minimumValue) {
                minReferencePoint_2.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, function (value) {
                    if (value <= weight) {
                        minReferencePoint_2.push(value);
                    }
                });
            }
            /** @type {?} */
            var lastReferenceValue_2 = _.last(minReferencePoint_2);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_2;
            });
            /** @type {?} */
            var SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return height && weight ? formattedSDValue : null;
    };
    /**
     * @param {?} heightForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    JsExpressionHelper.prototype.calcHeightForAgeZscore = /**
     * @param {?} heightForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    function (heightForAgeRef, height, weight) {
        /** @type {?} */
        var refSectionObject = _.first(heightForAgeRef);
        /** @type {?} */
        var formattedSDValue;
        if (refSectionObject) {
            /** @type {?} */
            var refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            /** @type {?} */
            var refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            var minimumValue = refObjectValues[1];
            /** @type {?} */
            var minReferencePoint_3 = [];
            if (height < minimumValue) {
                minReferencePoint_3.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, function (value) {
                    if (value <= height) {
                        minReferencePoint_3.push(value);
                    }
                });
            }
            /** @type {?} */
            var lastReferenceValue_3 = _.last(minReferencePoint_3);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_3;
            });
            /** @type {?} */
            var SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
            if (formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
                formattedSDValue = '-4';
            }
        }
        return height && weight && refSectionObject ? formattedSDValue : null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JsExpressionHelper.prototype.isEmpty = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
            return true;
        }
        if (Array.isArray(val) && val.length === 0) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    JsExpressionHelper.prototype.arrayContains = /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    function (array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            /** @type {?} */
            var contains = true;
            for (var i = 0; i < members.length; i++) {
                /** @type {?} */
                var val = members[i];
                if (array.indexOf(val) === -1) {
                    contains = false;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    };
    /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    JsExpressionHelper.prototype.extractRepeatingGroupValues = /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    function (key, array) {
        /** @type {?} */
        var values = array.map(function (item) {
            return item[key];
        });
        return values;
    };
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} offset
     * @return {?}
     */
    JsExpressionHelper.prototype.formatDate = /**
     * @param {?} value
     * @param {?} format
     * @param {?} offset
     * @return {?}
     */
    function (value, format, offset) {
        format = format || 'yyyy-MM-dd';
        offset = offset || '+0300';
        if (!(value instanceof Date)) {
            value = new Date(value);
            if (value === null || value === undefined) {
                throw new Error('DateFormatException: value passed ' +
                    'is not a valid date');
            }
        }
        return value; // TODO implement this
        // return $filter('date')(value, format, offset);
    };
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    JsExpressionHelper.prototype.arrayContainsAny = /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    function (array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            /** @type {?} */
            var contains = false;
            for (var i = 0; i < members.length; i++) {
                /** @type {?} */
                var val = members[i];
                if (array.indexOf(val) !== -1) {
                    contains = true;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    };
    Object.defineProperty(JsExpressionHelper.prototype, "helperFunctions", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var helper = this;
            return {
                arrayContainsAny: helper.arrayContainsAny,
                calcBMI: helper.calcBMI,
                calcBMIForAgeZscore: helper.calcBMIForAgeZscore,
                calcWeightForHeightZscore: helper.calcWeightForHeightZscore,
                calcHeightForAgeZscore: helper.calcHeightForAgeZscore,
                isEmpty: helper.isEmpty,
                arrayContains: helper.arrayContains,
                extractRepeatingGroupValues: helper.extractRepeatingGroupValues
            };
        },
        enumerable: true,
        configurable: true
    });
    return JsExpressionHelper;
}());
export { JsExpressionHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCO0lBQUE7SUE0T0EsQ0FBQzs7Ozs7O0lBMU9DLG9DQUFPOzs7OztJQUFQLFVBQVEsTUFBTSxFQUFFLE1BQU07O1lBRWhCLENBQUM7UUFDTCxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDcEIsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFFRCxnREFBbUI7Ozs7OztJQUFuQixVQUFvQixZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU07O1lBQzNDLEdBQUc7O1lBQ0QsWUFBWSxHQUFHLElBQUk7UUFDeEIsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3BCLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEOztZQUNLLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOztZQUMxQyxnQkFBZ0I7UUFDcEIsSUFBSSxnQkFBZ0IsRUFBRTs7Z0JBQ2QsZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdC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QUMseUJBQXlCO2dCQUMzRCxzQkFBc0IsRUFBRSxNQUFNLENBQUMsc0JBQXNCO2dCQUNyRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQ3ZCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtnQkFDbkMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLDJCQUEyQjthQUNoRSxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFDSCx5QkFBQztBQUFELENBQUMsQUE1T0QsSUE0T0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmV4cG9ydCBjbGFzcyBKc0V4cHJlc3Npb25IZWxwZXIge1xuXG4gIGNhbGNCTUkoaGVpZ2h0LCB3ZWlnaHQpIHtcblxuICAgIGxldCByO1xuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XG4gICAgICByID0gKHdlaWdodCAvIChoZWlnaHQgLyAxMDAgKiBoZWlnaHQgLyAxMDApKS50b0ZpeGVkKDEpO1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0ICYmIHdlaWdodCA/IHBhcnNlRmxvYXQocikgOiBudWxsO1xuICB9XG5cbiAgY2FsY0JNSUZvckFnZVpzY29yZShibWlGb3JBZ2VSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XG4gICBsZXQgYm1pO1xuICAgY29uc3QgbWF4QWdlSW5EYXlzID0gMTg1NjtcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xuICAgICAgYm1pID0gKHdlaWdodCAvIChoZWlnaHQgLyAxMDAgKiBoZWlnaHQgLyAxMDApKS50b0ZpeGVkKDEpO1xuICAgIH1cbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChibWlGb3JBZ2VSZWYpO1xuICAgIGxldCBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXG4gICAgICAgIChrZXkpID0+IHJlZlNlY3Rpb25PYmplY3Rba2V5XSkubWFwKCAoeCkgPT4geCk7XG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xuICAgICAgICBjb25zdCBtaW5SZWZlcmVuY2VQb2ludCA9IFtdO1xuICAgICAgICBpZiAoYm1pIDwgbWluaW11bVZhbHVlKSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSA8PSBibWkpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGZvcm1hdHRlZFNEVmFsdWUgPT09ICdTJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTCcgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ00nIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICctNScpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy00JztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuICBibWkgJiYgcmVmU2VjdGlvbk9iamVjdCA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcbiAgfVxuICBjYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlKHdlaWdodEZvckhlaWdodFJlZiwgaGVpZ2h0LCB3ZWlnaHQpIHtcbiAgICBsZXQgcmVmU2VjdGlvbiA7XG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcbiAgICAgIGhlaWdodCA9IHBhcnNlRmxvYXQoaGVpZ2h0KS50b0ZpeGVkKDEpO1xuICAgIH1cbiAgICBjb25zdCBzdGFuZGFyZEhlaWdodE1pbiA9IDQ1O1xuICAgIGNvbnN0IHN0YW5kYXJkTWF4SGVpZ2h0ID0gMTEwO1xuICAgIGlmICggaGVpZ2h0IDwgc3RhbmRhcmRIZWlnaHRNaW4gfHwgaGVpZ2h0ID4gc3RhbmRhcmRNYXhIZWlnaHQpIHtcbiAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAtNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZWZTZWN0aW9uID0gXy5maWx0ZXIod2VpZ2h0Rm9ySGVpZ2h0UmVmLCAocmVmT2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJlZk9iamVjdFsnTGVuZ3RoJ10pLnRvRml4ZWQoMSkgPT09IGhlaWdodDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KHJlZlNlY3Rpb24pO1xuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXG4gICAgICAgIChrZXkpID0+IHJlZlNlY3Rpb25PYmplY3Rba2V5XSkubWFwKCAoeCkgPT4geCk7XG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xuICAgICAgICBjb25zdCBtaW5SZWZlcmVuY2VQb2ludCA9IFtdO1xuICAgICAgICBpZiAod2VpZ2h0IDwgbWluaW11bVZhbHVlKSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSA8PSB3ZWlnaHQpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIGZvcm1hdHRlZFNEVmFsdWUgPT09ICdTJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTCcgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ00nICB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnLTUnKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiAgaGVpZ2h0ICYmIHdlaWdodCAgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XG4gIH1cblxuICBjYWxjSGVpZ2h0Rm9yQWdlWnNjb3JlKGhlaWdodEZvckFnZVJlZiwgaGVpZ2h0LCB3ZWlnaHQpIHtcblxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KGhlaWdodEZvckFnZVJlZik7XG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgaWYgKHJlZlNlY3Rpb25PYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcbiAgICAgICAgY29uc3QgcmVmT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpO1xuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XG4gICAgICAgIGlmIChoZWlnaHQgPCBtaW5pbXVtVmFsdWUpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgXy5mb3JFYWNoKHJlZk9iamVjdFZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlIDw9IGhlaWdodCkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ1MnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdMJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTScgIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICctNScpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy00JztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuICBoZWlnaHQgJiYgd2VpZ2h0ICYmIHJlZlNlY3Rpb25PYmplY3QgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XG4gIH1cblxuICBpc0VtcHR5KHZhbCkge1xuXG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ251bGwnIHx8IHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFycmF5Q29udGFpbnMoYXJyYXksIG1lbWJlcnMpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XG5cbiAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvbnRhaW5zID0gdHJ1ZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IG1lbWJlcnNbaV07XG4gICAgICAgIGlmIChhcnJheS5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgY29udGFpbnMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKG1lbWJlcnMpICE9PSAtMTtcbiAgICB9XG4gIH1cbiAgZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzKGtleSwgYXJyYXkpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiBpdGVtW2tleV07XG4gICAgfSk7XG4gIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgZm9ybWF0RGF0ZSh2YWx1ZSwgZm9ybWF0LCBvZmZzZXQpIHtcblxuICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCc7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8ICcrMDMwMCc7XG5cbiAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG5cbiAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRlRm9ybWF0RXhjZXB0aW9uOiB2YWx1ZSBwYXNzZWQgJyArXG4gICAgICAgICAgJ2lzIG5vdCBhIHZhbGlkIGRhdGUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7IC8vIFRPRE8gaW1wbGVtZW50IHRoaXNcbiAgICAvLyByZXR1cm4gJGZpbHRlcignZGF0ZScpKHZhbHVlLCBmb3JtYXQsIG9mZnNldCk7XG4gIH1cblxuICBhcnJheUNvbnRhaW5zQW55KGFycmF5LCBtZW1iZXJzKSB7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZW1iZXJzKSkge1xuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbGV0IGNvbnRhaW5zID0gZmFsc2U7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGNvbnN0IHZhbCA9IG1lbWJlcnNbaV07XG4gICAgICAgIGlmIChhcnJheS5pbmRleE9mKHZhbCkgIT09IC0xKSB7XG4gICAgICAgICAgY29udGFpbnMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKG1lbWJlcnMpICE9PSAtMTtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVscGVyRnVuY3Rpb25zKCkge1xuICAgIGNvbnN0IGhlbHBlciA9IHRoaXM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFycmF5Q29udGFpbnNBbnk6IGhlbHBlci5hcnJheUNvbnRhaW5zQW55LFxuICAgICAgY2FsY0JNSTogaGVscGVyLmNhbGNCTUksXG4gICAgICBjYWxjQk1JRm9yQWdlWnNjb3JlOiBoZWxwZXIuY2FsY0JNSUZvckFnZVpzY29yZSxcbiAgICAgIGNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmU6IGhlbHBlci5jYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlLFxuICAgICAgY2FsY0hlaWdodEZvckFnZVpzY29yZTogaGVscGVyLmNhbGNIZWlnaHRGb3JBZ2Vac2NvcmUsXG4gICAgICBpc0VtcHR5OiBoZWxwZXIuaXNFbXB0eSxcbiAgICAgIGFycmF5Q29udGFpbnM6IGhlbHBlci5hcnJheUNvbnRhaW5zLFxuICAgICAgZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzOiBoZWxwZXIuZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzXG4gICAgfTtcbiAgfVxufVxuIl19