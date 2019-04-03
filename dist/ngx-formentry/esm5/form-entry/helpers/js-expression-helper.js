/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            var refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return refSectionObject[key]; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x; }));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    if (value <= bmi) {
                        minReferencePoint_1.push(value);
                    }
                }));
            }
            /** @type {?} */
            var lastReferenceValue_1 = _.last(minReferencePoint_1);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o === lastReferenceValue_1;
            }));
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
            refSection = _.filter(weightForHeightRef, (/**
             * @param {?} refObject
             * @return {?}
             */
            function (refObject) {
                return parseFloat(refObject['Length']).toFixed(1) === height;
            }));
        }
        /** @type {?} */
        var refSectionObject = _.first(refSection);
        if (refSectionObject) {
            /** @type {?} */
            var refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return refSectionObject[key]; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x; }));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    if (value <= weight) {
                        minReferencePoint_2.push(value);
                    }
                }));
            }
            /** @type {?} */
            var lastReferenceValue_2 = _.last(minReferencePoint_2);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o === lastReferenceValue_2;
            }));
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
            var refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return refSectionObject[key]; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x; }));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    if (value <= height) {
                        minReferencePoint_3.push(value);
                    }
                }));
            }
            /** @type {?} */
            var lastReferenceValue_3 = _.last(minReferencePoint_3);
            /** @type {?} */
            var lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                return o === lastReferenceValue_3;
            }));
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
        var values = array.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return item[key];
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCO0lBQUE7SUE0T0EsQ0FBQzs7Ozs7O0lBMU9DLG9DQUFPOzs7OztJQUFQLFVBQVEsTUFBTSxFQUFFLE1BQU07O1lBRWhCLENBQUM7UUFDTCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFFRCxnREFBbUI7Ozs7OztJQUFuQixVQUFvQixZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU07O1lBQzNDLEdBQUc7O1lBQ0QsWUFBWSxHQUFHLElBQUk7UUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQzs7WUFDSyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQzs7WUFDMUMsZ0JBQWdCO1FBQ3BCLEVBQUUs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QUM7Z0JBQ0wsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtnQkFDekMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO2dCQUN2QixtQkFBbUIsRUFBRSxNQUFNLENBQUMsbUJBQW1CO2dCQUMvQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMseUJBQXlCO2dCQUMzRCxzQkFBc0IsRUFBRSxNQUFNLENBQUMsc0JBQXNCO2dCQUNyRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQ3ZCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtnQkFDbkMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLDJCQUEyQjthQUNoRSxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFDSCx5QkFBQztBQUFELENBQUMsQUE1T0QsSUE0T0MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uSGVscGVyIHtcclxuXHJcbiAgY2FsY0JNSShoZWlnaHQsIHdlaWdodCkge1xyXG5cclxuICAgIGxldCByO1xyXG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcclxuICAgICAgciA9ICh3ZWlnaHQgLyAoaGVpZ2h0IC8gMTAwICogaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWlnaHQgJiYgd2VpZ2h0ID8gcGFyc2VGbG9hdChyKSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBjYWxjQk1JRm9yQWdlWnNjb3JlKGJtaUZvckFnZVJlZiwgaGVpZ2h0LCB3ZWlnaHQpIHtcclxuICAgbGV0IGJtaTtcclxuICAgY29uc3QgbWF4QWdlSW5EYXlzID0gMTg1NjtcclxuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XHJcbiAgICAgIGJtaSA9ICh3ZWlnaHQgLyAoaGVpZ2h0IC8gMTAwICogaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgxKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KGJtaUZvckFnZVJlZik7XHJcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcclxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xyXG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcclxuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XHJcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcclxuICAgICAgICBpZiAoYm1pIDwgbWluaW11bVZhbHVlKSB7XHJcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDw9IGJtaSkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcclxuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcclxuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcclxuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcclxuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnLTUnKSB7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy00JztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAgYm1pICYmIHJlZlNlY3Rpb25PYmplY3QgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XHJcbiAgfVxyXG4gIGNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmUod2VpZ2h0Rm9ySGVpZ2h0UmVmLCBoZWlnaHQsIHdlaWdodCkge1xyXG4gICAgbGV0IHJlZlNlY3Rpb24gO1xyXG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xyXG4gICAgICBoZWlnaHQgPSBwYXJzZUZsb2F0KGhlaWdodCkudG9GaXhlZCgxKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YW5kYXJkSGVpZ2h0TWluID0gNDU7XHJcbiAgICBjb25zdCBzdGFuZGFyZE1heEhlaWdodCA9IDExMDtcclxuICAgIGlmICggaGVpZ2h0IDwgc3RhbmRhcmRIZWlnaHRNaW4gfHwgaGVpZ2h0ID4gc3RhbmRhcmRNYXhIZWlnaHQpIHtcclxuICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IC00O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZWZTZWN0aW9uID0gXy5maWx0ZXIod2VpZ2h0Rm9ySGVpZ2h0UmVmLCAocmVmT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocmVmT2JqZWN0WydMZW5ndGgnXSkudG9GaXhlZCgxKSA9PT0gaGVpZ2h0O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChyZWZTZWN0aW9uKTtcclxuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcclxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xyXG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcclxuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XHJcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcclxuICAgICAgICBpZiAod2VpZ2h0IDwgbWluaW11bVZhbHVlKSB7XHJcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDw9IHdlaWdodCkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XHJcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XHJcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyAgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGhlaWdodCAmJiB3ZWlnaHQgID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2FsY0hlaWdodEZvckFnZVpzY29yZShoZWlnaHRGb3JBZ2VSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XHJcblxyXG4gICAgY29uc3QgcmVmU2VjdGlvbk9iamVjdCA9IF8uZmlyc3QoaGVpZ2h0Rm9yQWdlUmVmKTtcclxuICAgIGxldCBmb3JtYXR0ZWRTRFZhbHVlO1xyXG4gICAgaWYgKHJlZlNlY3Rpb25PYmplY3QpIHtcclxuICAgICAgY29uc3QgcmVmT2JqZWN0VmFsdWVzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCkubWFwKFxyXG4gICAgICAgIChrZXkpID0+IHJlZlNlY3Rpb25PYmplY3Rba2V5XSkubWFwKCAoeCkgPT4geCk7XHJcbiAgICAgICAgY29uc3QgcmVmT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpO1xyXG4gICAgICAgIGNvbnN0IG1pbmltdW1WYWx1ZSA9IHJlZk9iamVjdFZhbHVlc1sxXTtcclxuICAgICAgICBjb25zdCBtaW5SZWZlcmVuY2VQb2ludCA9IFtdO1xyXG4gICAgICAgIGlmIChoZWlnaHQgPCBtaW5pbXVtVmFsdWUpIHtcclxuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2gobWluaW11bVZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgXy5mb3JFYWNoKHJlZk9iamVjdFZhbHVlcywgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPD0gaGVpZ2h0KSB7XHJcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xyXG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xyXG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGZvcm1hdHRlZFNEVmFsdWUgPT09ICdTJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTCcgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ00nICB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnLTUnKSB7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy00JztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAgaGVpZ2h0ICYmIHdlaWdodCAmJiByZWZTZWN0aW9uT2JqZWN0ID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaXNFbXB0eSh2YWwpIHtcclxuXHJcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycgfHwgdmFsID09PSAnbnVsbCcgfHwgdmFsID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpICYmIHZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhcnJheUNvbnRhaW5zKGFycmF5LCBtZW1iZXJzKSB7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVtYmVycykpIHtcclxuXHJcbiAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgY29udGFpbnMgPSB0cnVlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcclxuICAgICAgICBpZiAoYXJyYXkuaW5kZXhPZih2YWwpID09PSAtMSkge1xyXG4gICAgICAgICAgY29udGFpbnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjb250YWlucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKG1lbWJlcnMpICE9PSAtMTtcclxuICAgIH1cclxuICB9XHJcbiAgZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzKGtleSwgYXJyYXkpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbVtrZXldO1xyXG4gICAgfSk7XHJcbiAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcbiAgZm9ybWF0RGF0ZSh2YWx1ZSwgZm9ybWF0LCBvZmZzZXQpIHtcclxuXHJcbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQnO1xyXG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8ICcrMDMwMCc7XHJcblxyXG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xyXG5cclxuICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRlRm9ybWF0RXhjZXB0aW9uOiB2YWx1ZSBwYXNzZWQgJyArXHJcbiAgICAgICAgICAnaXMgbm90IGEgdmFsaWQgZGF0ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlOyAvLyBUT0RPIGltcGxlbWVudCB0aGlzXHJcbiAgICAvLyByZXR1cm4gJGZpbHRlcignZGF0ZScpKHZhbHVlLCBmb3JtYXQsIG9mZnNldCk7XHJcbiAgfVxyXG5cclxuICBhcnJheUNvbnRhaW5zQW55KGFycmF5LCBtZW1iZXJzKSB7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVtYmVycykpIHtcclxuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGNvbnRhaW5zID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcclxuICAgICAgICBpZiAoYXJyYXkuaW5kZXhPZih2YWwpICE9PSAtMSkge1xyXG4gICAgICAgICAgY29udGFpbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29udGFpbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihtZW1iZXJzKSAhPT0gLTE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaGVscGVyRnVuY3Rpb25zKCkge1xyXG4gICAgY29uc3QgaGVscGVyID0gdGhpcztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFycmF5Q29udGFpbnNBbnk6IGhlbHBlci5hcnJheUNvbnRhaW5zQW55LFxyXG4gICAgICBjYWxjQk1JOiBoZWxwZXIuY2FsY0JNSSxcclxuICAgICAgY2FsY0JNSUZvckFnZVpzY29yZTogaGVscGVyLmNhbGNCTUlGb3JBZ2Vac2NvcmUsXHJcbiAgICAgIGNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmU6IGhlbHBlci5jYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlLFxyXG4gICAgICBjYWxjSGVpZ2h0Rm9yQWdlWnNjb3JlOiBoZWxwZXIuY2FsY0hlaWdodEZvckFnZVpzY29yZSxcclxuICAgICAgaXNFbXB0eTogaGVscGVyLmlzRW1wdHksXHJcbiAgICAgIGFycmF5Q29udGFpbnM6IGhlbHBlci5hcnJheUNvbnRhaW5zLFxyXG4gICAgICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXM6IGhlbHBlci5leHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXNcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==