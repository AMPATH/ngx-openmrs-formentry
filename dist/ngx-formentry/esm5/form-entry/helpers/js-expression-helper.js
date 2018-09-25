/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ r;
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
        var /** @type {?} */ bmi;
        var /** @type {?} */ maxAgeInDays = 1856;
        if (height && weight) {
            bmi = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        var /** @type {?} */ refSectionObject = _.first(bmiForAgeRef);
        var /** @type {?} */ formattedSDValue;
        if (refSectionObject) {
            var /** @type {?} */ refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            var /** @type {?} */ refObjectKeys = Object.keys(refSectionObject);
            var /** @type {?} */ minimumValue = refObjectValues[1];
            var /** @type {?} */ minReferencePoint_1 = [];
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
            var /** @type {?} */ lastReferenceValue_1 = _.last(minReferencePoint_1);
            var /** @type {?} */ lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_1;
            });
            var /** @type {?} */ SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
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
        if (height && weight) {
            height = parseFloat(height).toFixed(1);
        }
        var /** @type {?} */ refSection = _.filter(weightForHeightRef, function (refObject) {
            return parseFloat(refObject['Length']).toFixed(1) === height;
        });
        var /** @type {?} */ refSectionObject = _.first(refSection);
        var /** @type {?} */ formattedSDValue;
        if (refSectionObject) {
            var /** @type {?} */ refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            var /** @type {?} */ refObjectKeys = Object.keys(refSectionObject);
            var /** @type {?} */ minimumValue = refObjectValues[1];
            var /** @type {?} */ minReferencePoint_2 = [];
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
            var /** @type {?} */ lastReferenceValue_2 = _.last(minReferencePoint_2);
            var /** @type {?} */ lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_2;
            });
            var /** @type {?} */ SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
            }
        }
        return height && weight && refSectionObject ? formattedSDValue : null;
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
        var /** @type {?} */ refSectionObject = _.first(heightForAgeRef);
        var /** @type {?} */ formattedSDValue;
        if (refSectionObject) {
            var /** @type {?} */ refObjectValues = Object.keys(refSectionObject).map(function (key) { return refSectionObject[key]; }).map(function (x) { return x; });
            var /** @type {?} */ refObjectKeys = Object.keys(refSectionObject);
            var /** @type {?} */ minimumValue = refObjectValues[1];
            var /** @type {?} */ minReferencePoint_3 = [];
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
            var /** @type {?} */ lastReferenceValue_3 = _.last(minReferencePoint_3);
            var /** @type {?} */ lastValueIndex = _.findIndex(refObjectValues, function (o) {
                return o === lastReferenceValue_3;
            });
            var /** @type {?} */ SDValue = refObjectKeys[lastValueIndex];
            formattedSDValue = SDValue.replace('SD', '');
            if (formattedSDValue.includes('neg')) {
                formattedSDValue = formattedSDValue.substring(1, 0);
                formattedSDValue = '-' + formattedSDValue;
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
            var /** @type {?} */ contains = true;
            for (var /** @type {?} */ i = 0; i < members.length; i++) {
                var /** @type {?} */ val = members[i];
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
        var /** @type {?} */ values = array.map(function (item) {
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
            var /** @type {?} */ contains = false;
            for (var /** @type {?} */ i = 0; i < members.length; i++) {
                var /** @type {?} */ val = members[i];
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
            var /** @type {?} */ helper = this;
            return {
                arrayContainsAny: helper.arrayContainsAny,
                calcBMI: helper.calcBMI,
                calcBMIForAgeZscore: helper.calcBMIForAgeZscore,
                calcWeightForHeightZscore: helper.calcWeightForHeightZscore,
                calcHeightForAgeZscore: helper.calcHeightForAgeZscore,
                isEmpty: helper.isEmpty,
                arrayContains: helper.arrayContains,
                extractRepeatingGroupValues: helper.extractRepeatingGroupValues,
            };
        },
        enumerable: true,
        configurable: true
    });
    return JsExpressionHelper;
}());
export { JsExpressionHelper };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLElBQUE7Ozs7Ozs7O0lBRUUsb0NBQU87Ozs7O0lBQVAsVUFBUSxNQUFNLEVBQUUsTUFBTTtRQUVwQixxQkFBSSxDQUFDLENBQUM7UUFDTixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RDtRQUNELE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNoRDs7Ozs7OztJQUVELGdEQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTTtRQUMvQyxxQkFBSSxHQUFHLENBQUM7UUFDUixxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QscUJBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxxQkFB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LENBQUMsQ0FBQyxDQUFDO29CQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDO2lCQUNqQjthQUNGO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdEM7S0FDRjtJQUVELHNCQUFJLCtDQUFlOzs7O1FBQW5CO1lBQ0UscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQztZQUNwQixNQUFNLENBQUM7Z0JBQ0wsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtnQkFDekMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO2dCQUN2QixtQkFBbUIsRUFBRSxNQUFNLENBQUMsbUJBQW1CO2dCQUMvQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMseUJBQXlCO2dCQUMzRCxzQkFBc0IsRUFBRSxNQUFNLENBQUMsc0JBQXNCO2dCQUNyRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0JBQ3ZCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtnQkFDbkMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLDJCQUEyQjthQUNoRSxDQUFDO1NBQ0g7OztPQUFBOzZCQTVOSDtJQTZOQyxDQUFBO0FBMU5ELDhCQTBOQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7TW9tZW50fSBmcm9tICdtb21lbnQvbW9tZW50JztcclxuZXhwb3J0IGNsYXNzIEpzRXhwcmVzc2lvbkhlbHBlciB7XHJcblxyXG4gIGNhbGNCTUkoaGVpZ2h0LCB3ZWlnaHQpIHtcclxuXHJcbiAgICBsZXQgcjtcclxuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XHJcbiAgICAgIHIgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVpZ2h0ICYmIHdlaWdodCA/IHBhcnNlRmxvYXQocikgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2FsY0JNSUZvckFnZVpzY29yZShibWlGb3JBZ2VSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XHJcbiAgIGxldCBibWk7XHJcbiAgIGNvbnN0IG1heEFnZUluRGF5cyA9IDE4NTY7XHJcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xyXG4gICAgICBibWkgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChibWlGb3JBZ2VSZWYpO1xyXG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xyXG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXHJcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcclxuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XHJcbiAgICAgICAgaWYgKGJtaSA8IG1pbmltdW1WYWx1ZSkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSBibWkpIHtcclxuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XHJcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XHJcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAgYm1pICYmIHJlZlNlY3Rpb25PYmplY3QgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XHJcbiAgfVxyXG4gIGNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmUod2VpZ2h0Rm9ySGVpZ2h0UmVmLCBoZWlnaHQsIHdlaWdodCkge1xyXG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcclxuICAgICAgaGVpZ2h0ID0gcGFyc2VGbG9hdChoZWlnaHQpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWZTZWN0aW9uID0gXy5maWx0ZXIod2VpZ2h0Rm9ySGVpZ2h0UmVmLCAocmVmT2JqZWN0KSA9PiB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJlZk9iamVjdFsnTGVuZ3RoJ10pLnRvRml4ZWQoMSkgPT09IGhlaWdodDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KHJlZlNlY3Rpb24pO1xyXG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xyXG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXHJcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcclxuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XHJcbiAgICAgICAgaWYgKHdlaWdodCA8IG1pbmltdW1WYWx1ZSkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSB3ZWlnaHQpIHtcclxuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xyXG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xyXG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGhlaWdodCAmJiB3ZWlnaHQgJiYgcmVmU2VjdGlvbk9iamVjdCA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNhbGNIZWlnaHRGb3JBZ2Vac2NvcmUoaGVpZ2h0Rm9yQWdlUmVmLCBoZWlnaHQsIHdlaWdodCkge1xyXG5cclxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KGhlaWdodEZvckFnZVJlZik7XHJcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcclxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xyXG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcclxuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XHJcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcclxuICAgICAgICBpZiAoaGVpZ2h0IDwgbWluaW11bVZhbHVlKSB7XHJcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDw9IGhlaWdodCkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcclxuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcclxuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcclxuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcclxuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICBoZWlnaHQgJiYgd2VpZ2h0ICYmIHJlZlNlY3Rpb25PYmplY3QgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBpc0VtcHR5KHZhbCkge1xyXG5cclxuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSAnJyB8fCB2YWwgPT09ICdudWxsJyB8fCB2YWwgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFycmF5Q29udGFpbnMoYXJyYXksIG1lbWJlcnMpIHtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZW1iZXJzKSkge1xyXG5cclxuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBjb250YWlucyA9IHRydWU7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB2YWwgPSBtZW1iZXJzW2ldO1xyXG4gICAgICAgIGlmIChhcnJheS5pbmRleE9mKHZhbCkgPT09IC0xKSB7XHJcbiAgICAgICAgICBjb250YWlucyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXMoa2V5LCBhcnJheSkge1xyXG4gICAgY29uc3QgdmFsdWVzID0gYXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtW2tleV07XHJcbiAgICB9KTtcclxuICByZXR1cm4gdmFsdWVzO1xyXG4gIH1cclxuICBmb3JtYXREYXRlKHZhbHVlLCBmb3JtYXQsIG9mZnNldCkge1xyXG5cclxuICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCc7XHJcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgJyswMzAwJztcclxuXHJcbiAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XHJcblxyXG4gICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVGb3JtYXRFeGNlcHRpb246IHZhbHVlIHBhc3NlZCAnICtcclxuICAgICAgICAgICdpcyBub3QgYSB2YWxpZCBkYXRlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7IC8vIFRPRE8gaW1wbGVtZW50IHRoaXNcclxuICAgIC8vIHJldHVybiAkZmlsdGVyKCdkYXRlJykodmFsdWUsIGZvcm1hdCwgb2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIGFycmF5Q29udGFpbnNBbnkoYXJyYXksIG1lbWJlcnMpIHtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZW1iZXJzKSkge1xyXG4gICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICBjb25zdCB2YWwgPSBtZW1iZXJzW2ldO1xyXG4gICAgICAgIGlmIChhcnJheS5pbmRleE9mKHZhbCkgIT09IC0xKSB7XHJcbiAgICAgICAgICBjb250YWlucyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250YWlucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKG1lbWJlcnMpICE9PSAtMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBoZWxwZXJGdW5jdGlvbnMoKSB7XHJcbiAgICBjb25zdCBoZWxwZXIgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXJyYXlDb250YWluc0FueTogaGVscGVyLmFycmF5Q29udGFpbnNBbnksXHJcbiAgICAgIGNhbGNCTUk6IGhlbHBlci5jYWxjQk1JLFxyXG4gICAgICBjYWxjQk1JRm9yQWdlWnNjb3JlOiBoZWxwZXIuY2FsY0JNSUZvckFnZVpzY29yZSxcclxuICAgICAgY2FsY1dlaWdodEZvckhlaWdodFpzY29yZTogaGVscGVyLmNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmUsXHJcbiAgICAgIGNhbGNIZWlnaHRGb3JBZ2Vac2NvcmU6IGhlbHBlci5jYWxjSGVpZ2h0Rm9yQWdlWnNjb3JlLFxyXG4gICAgICBpc0VtcHR5OiBoZWxwZXIuaXNFbXB0eSxcclxuICAgICAgYXJyYXlDb250YWluczogaGVscGVyLmFycmF5Q29udGFpbnMsXHJcbiAgICAgIGV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlczogaGVscGVyLmV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlcyxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==