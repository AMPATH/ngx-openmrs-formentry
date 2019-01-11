/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
export class JsExpressionHelper {
    /**
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    calcBMI(height, weight) {
        /** @type {?} */
        let r;
        if (height && weight) {
            r = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        return height && weight ? parseFloat(r) : null;
    }
    /**
     * @param {?} bmiForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    calcBMIForAgeZscore(bmiForAgeRef, height, weight) {
        /** @type {?} */
        let bmi;
        /** @type {?} */
        const maxAgeInDays = 1856;
        if (height && weight) {
            bmi = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        /** @type {?} */
        const refSectionObject = _.first(bmiForAgeRef);
        /** @type {?} */
        let formattedSDValue;
        if (refSectionObject) {
            /** @type {?} */
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            /** @type {?} */
            const refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            const minimumValue = refObjectValues[1];
            /** @type {?} */
            const minReferencePoint = [];
            if (bmi < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, (value) => {
                    if (value <= bmi) {
                        minReferencePoint.push(value);
                    }
                });
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            /** @type {?} */
            const SDValue = refObjectKeys[lastValueIndex];
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
    }
    /**
     * @param {?} weightForHeightRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    calcWeightForHeightZscore(weightForHeightRef, height, weight) {
        /** @type {?} */
        let refSection;
        /** @type {?} */
        let formattedSDValue;
        if (height && weight) {
            height = parseFloat(height).toFixed(1);
        }
        /** @type {?} */
        const standardHeightMin = 45;
        /** @type {?} */
        const standardMaxHeight = 110;
        if (height < standardHeightMin || height > standardMaxHeight) {
            formattedSDValue = -4;
        }
        else {
            refSection = _.filter(weightForHeightRef, (refObject) => {
                return parseFloat(refObject['Length']).toFixed(1) === height;
            });
        }
        /** @type {?} */
        const refSectionObject = _.first(refSection);
        if (refSectionObject) {
            /** @type {?} */
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            /** @type {?} */
            const refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            const minimumValue = refObjectValues[1];
            /** @type {?} */
            const minReferencePoint = [];
            if (weight < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, (value) => {
                    if (value <= weight) {
                        minReferencePoint.push(value);
                    }
                });
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            /** @type {?} */
            const SDValue = refObjectKeys[lastValueIndex];
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
    }
    /**
     * @param {?} heightForAgeRef
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    calcHeightForAgeZscore(heightForAgeRef, height, weight) {
        /** @type {?} */
        const refSectionObject = _.first(heightForAgeRef);
        /** @type {?} */
        let formattedSDValue;
        if (refSectionObject) {
            /** @type {?} */
            const refObjectValues = Object.keys(refSectionObject).map((key) => refSectionObject[key]).map((x) => x);
            /** @type {?} */
            const refObjectKeys = Object.keys(refSectionObject);
            /** @type {?} */
            const minimumValue = refObjectValues[1];
            /** @type {?} */
            const minReferencePoint = [];
            if (height < minimumValue) {
                minReferencePoint.push(minimumValue);
            }
            else {
                _.forEach(refObjectValues, (value) => {
                    if (value <= height) {
                        minReferencePoint.push(value);
                    }
                });
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (o) => {
                return o === lastReferenceValue;
            });
            /** @type {?} */
            const SDValue = refObjectKeys[lastValueIndex];
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isEmpty(val) {
        if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
            return true;
        }
        if (Array.isArray(val) && val.length === 0) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    arrayContains(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            /** @type {?} */
            let contains = true;
            for (let i = 0; i < members.length; i++) {
                /** @type {?} */
                const val = members[i];
                if (array.indexOf(val) === -1) {
                    contains = false;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    extractRepeatingGroupValues(key, array) {
        /** @type {?} */
        const values = array.map(function (item) {
            return item[key];
        });
        return values;
    }
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} offset
     * @return {?}
     */
    formatDate(value, format, offset) {
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
    }
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    arrayContainsAny(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            /** @type {?} */
            let contains = false;
            for (let i = 0; i < members.length; i++) {
                /** @type {?} */
                const val = members[i];
                if (array.indexOf(val) !== -1) {
                    contains = true;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    /**
     * @return {?}
     */
    get helperFunctions() {
        /** @type {?} */
        const helper = this;
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQUU3QixPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU07O1lBRWhCLENBQUM7UUFDTCxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDcEIsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU07O1lBQzNDLEdBQUc7O2NBQ0QsWUFBWSxHQUFHLElBQUk7UUFDeEIsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3BCLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEOztjQUNLLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOztZQUMxQyxnQkFBZ0I7UUFDcEIsSUFBSSxnQkFBZ0IsRUFBRTs7a0JBQ2QsZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQ3ZE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WUFDdkIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1lBQ25DLDJCQUEyQixFQUFFLE1BQU0sQ0FBQywyQkFBMkI7U0FDaEUsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuZXhwb3J0IGNsYXNzIEpzRXhwcmVzc2lvbkhlbHBlciB7XG5cbiAgY2FsY0JNSShoZWlnaHQsIHdlaWdodCkge1xuXG4gICAgbGV0IHI7XG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcbiAgICAgIHIgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XG4gICAgfVxuICAgIHJldHVybiBoZWlnaHQgJiYgd2VpZ2h0ID8gcGFyc2VGbG9hdChyKSA6IG51bGw7XG4gIH1cblxuICBjYWxjQk1JRm9yQWdlWnNjb3JlKGJtaUZvckFnZVJlZiwgaGVpZ2h0LCB3ZWlnaHQpIHtcbiAgIGxldCBibWk7XG4gICBjb25zdCBtYXhBZ2VJbkRheXMgPSAxODU2O1xuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XG4gICAgICBibWkgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XG4gICAgfVxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KGJtaUZvckFnZVJlZik7XG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgaWYgKHJlZlNlY3Rpb25PYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcbiAgICAgICAgY29uc3QgcmVmT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpO1xuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XG4gICAgICAgIGlmIChibWkgPCBtaW5pbXVtVmFsdWUpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgXy5mb3JFYWNoKHJlZk9iamVjdFZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlIDw9IGJtaSkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ1MnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdMJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTScgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLTQnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gIGJtaSAmJiByZWZTZWN0aW9uT2JqZWN0ID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xuICB9XG4gIGNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmUod2VpZ2h0Rm9ySGVpZ2h0UmVmLCBoZWlnaHQsIHdlaWdodCkge1xuICAgIGxldCByZWZTZWN0aW9uIDtcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xuICAgICAgaGVpZ2h0ID0gcGFyc2VGbG9hdChoZWlnaHQpLnRvRml4ZWQoMSk7XG4gICAgfVxuICAgIGNvbnN0IHN0YW5kYXJkSGVpZ2h0TWluID0gNDU7XG4gICAgY29uc3Qgc3RhbmRhcmRNYXhIZWlnaHQgPSAxMTA7XG4gICAgaWYgKCBoZWlnaHQgPCBzdGFuZGFyZEhlaWdodE1pbiB8fCBoZWlnaHQgPiBzdGFuZGFyZE1heEhlaWdodCkge1xuICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IC00O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZlNlY3Rpb24gPSBfLmZpbHRlcih3ZWlnaHRGb3JIZWlnaHRSZWYsIChyZWZPYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocmVmT2JqZWN0WydMZW5ndGgnXSkudG9GaXhlZCgxKSA9PT0gaGVpZ2h0O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVmU2VjdGlvbk9iamVjdCA9IF8uZmlyc3QocmVmU2VjdGlvbik7XG4gICAgaWYgKHJlZlNlY3Rpb25PYmplY3QpIHtcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcbiAgICAgICAgY29uc3QgcmVmT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpO1xuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XG4gICAgICAgIGlmICh3ZWlnaHQgPCBtaW5pbXVtVmFsdWUpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgXy5mb3JFYWNoKHJlZk9iamVjdFZhbHVlcywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlIDw9IHdlaWdodCkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ1MnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdMJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTScgIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICctNScpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy00JztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuICBoZWlnaHQgJiYgd2VpZ2h0ICA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcbiAgfVxuXG4gIGNhbGNIZWlnaHRGb3JBZ2Vac2NvcmUoaGVpZ2h0Rm9yQWdlUmVmLCBoZWlnaHQsIHdlaWdodCkge1xuXG4gICAgY29uc3QgcmVmU2VjdGlvbk9iamVjdCA9IF8uZmlyc3QoaGVpZ2h0Rm9yQWdlUmVmKTtcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xuICAgICAgY29uc3QgcmVmT2JqZWN0VmFsdWVzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCkubWFwKFxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XG4gICAgICAgIGNvbnN0IG1pbmltdW1WYWx1ZSA9IHJlZk9iamVjdFZhbHVlc1sxXTtcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcbiAgICAgICAgaWYgKGhlaWdodCA8IG1pbmltdW1WYWx1ZSkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2gobWluaW11bVZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodmFsdWUgPD0gaGVpZ2h0KSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyAgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLTQnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gIGhlaWdodCAmJiB3ZWlnaHQgJiYgcmVmU2VjdGlvbk9iamVjdCA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcbiAgfVxuXG4gIGlzRW1wdHkodmFsKSB7XG5cbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycgfHwgdmFsID09PSAnbnVsbCcgfHwgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJyYXlDb250YWlucyhhcnJheSwgbWVtYmVycykge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVtYmVycykpIHtcblxuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29udGFpbnMgPSB0cnVlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICBjb250YWlucyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xuICAgIH1cbiAgfVxuICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXMoa2V5LCBhcnJheSkge1xuICAgIGNvbnN0IHZhbHVlcyA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW1ba2V5XTtcbiAgICB9KTtcbiAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICBmb3JtYXREYXRlKHZhbHVlLCBmb3JtYXQsIG9mZnNldCkge1xuXG4gICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkJztcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgJyswMzAwJztcblxuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcblxuICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVGb3JtYXRFeGNlcHRpb246IHZhbHVlIHBhc3NlZCAnICtcbiAgICAgICAgICAnaXMgbm90IGEgdmFsaWQgZGF0ZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTsgLy8gVE9ETyBpbXBsZW1lbnQgdGhpc1xuICAgIC8vIHJldHVybiAkZmlsdGVyKCdkYXRlJykodmFsdWUsIGZvcm1hdCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGFycmF5Q29udGFpbnNBbnkoYXJyYXksIG1lbWJlcnMpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XG4gICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSAhPT0gLTEpIHtcbiAgICAgICAgICBjb250YWlucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xuICAgIH1cbiAgfVxuXG4gIGdldCBoZWxwZXJGdW5jdGlvbnMoKSB7XG4gICAgY29uc3QgaGVscGVyID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgYXJyYXlDb250YWluc0FueTogaGVscGVyLmFycmF5Q29udGFpbnNBbnksXG4gICAgICBjYWxjQk1JOiBoZWxwZXIuY2FsY0JNSSxcbiAgICAgIGNhbGNCTUlGb3JBZ2Vac2NvcmU6IGhlbHBlci5jYWxjQk1JRm9yQWdlWnNjb3JlLFxuICAgICAgY2FsY1dlaWdodEZvckhlaWdodFpzY29yZTogaGVscGVyLmNhbGNXZWlnaHRGb3JIZWlnaHRac2NvcmUsXG4gICAgICBjYWxjSGVpZ2h0Rm9yQWdlWnNjb3JlOiBoZWxwZXIuY2FsY0hlaWdodEZvckFnZVpzY29yZSxcbiAgICAgIGlzRW1wdHk6IGhlbHBlci5pc0VtcHR5LFxuICAgICAgYXJyYXlDb250YWluczogaGVscGVyLmFycmF5Q29udGFpbnMsXG4gICAgICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXM6IGhlbHBlci5leHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXNcbiAgICB9O1xuICB9XG59XG4iXX0=