/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            const refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            (key) => refSectionObject[key])).map((/**
             * @param {?} x
             * @return {?}
             */
            (x) => x));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    if (value <= bmi) {
                        minReferencePoint.push(value);
                    }
                }));
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
                return o === lastReferenceValue;
            }));
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
            refSection = _.filter(weightForHeightRef, (/**
             * @param {?} refObject
             * @return {?}
             */
            (refObject) => {
                return parseFloat(refObject['Length']).toFixed(1) === height;
            }));
        }
        /** @type {?} */
        const refSectionObject = _.first(refSection);
        if (refSectionObject) {
            /** @type {?} */
            const refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            (key) => refSectionObject[key])).map((/**
             * @param {?} x
             * @return {?}
             */
            (x) => x));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    if (value <= weight) {
                        minReferencePoint.push(value);
                    }
                }));
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
                return o === lastReferenceValue;
            }));
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
            const refObjectValues = Object.keys(refSectionObject).map((/**
             * @param {?} key
             * @return {?}
             */
            (key) => refSectionObject[key])).map((/**
             * @param {?} x
             * @return {?}
             */
            (x) => x));
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
                _.forEach(refObjectValues, (/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    if (value <= height) {
                        minReferencePoint.push(value);
                    }
                }));
            }
            /** @type {?} */
            const lastReferenceValue = _.last(minReferencePoint);
            /** @type {?} */
            const lastValueIndex = _.findIndex(refObjectValues, (/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
                return o === lastReferenceValue;
            }));
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
        const values = array.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return item[key];
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE1BQU07Ozs7OztJQUVKLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTs7WUFFaEIsQ0FBQztRQUNMLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQzs7Ozs7OztJQUVELG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTTs7WUFDM0MsR0FBRzs7Y0FDRCxZQUFZLEdBQUcsSUFBSTtRQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDOztjQUNLLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOztZQUMxQyxnQkFBZ0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOztr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LE1BQU0sQ0FBQyxtQkFBbUI7WUFDL0MseUJBQXlCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QjtZQUMzRCxzQkFBc0IsRUFBRSxNQUFNLENBQUMsc0JBQXNCO1lBQ3JELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDbkMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLDJCQUEyQjtTQUNoRSxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uSGVscGVyIHtcblxuICBjYWxjQk1JKGhlaWdodCwgd2VpZ2h0KSB7XG5cbiAgICBsZXQgcjtcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xuICAgICAgciA9ICh3ZWlnaHQgLyAoaGVpZ2h0IC8gMTAwICogaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgxKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlaWdodCAmJiB3ZWlnaHQgPyBwYXJzZUZsb2F0KHIpIDogbnVsbDtcbiAgfVxuXG4gIGNhbGNCTUlGb3JBZ2Vac2NvcmUoYm1pRm9yQWdlUmVmLCBoZWlnaHQsIHdlaWdodCkge1xuICAgbGV0IGJtaTtcbiAgIGNvbnN0IG1heEFnZUluRGF5cyA9IDE4NTY7XG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcbiAgICAgIGJtaSA9ICh3ZWlnaHQgLyAoaGVpZ2h0IC8gMTAwICogaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgxKTtcbiAgICB9XG4gICAgY29uc3QgcmVmU2VjdGlvbk9iamVjdCA9IF8uZmlyc3QoYm1pRm9yQWdlUmVmKTtcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xuICAgICAgY29uc3QgcmVmT2JqZWN0VmFsdWVzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCkubWFwKFxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XG4gICAgICAgIGNvbnN0IG1pbmltdW1WYWx1ZSA9IHJlZk9iamVjdFZhbHVlc1sxXTtcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcbiAgICAgICAgaWYgKGJtaSA8IG1pbmltdW1WYWx1ZSkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2gobWluaW11bVZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodmFsdWUgPD0gYm1pKSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnLTUnKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiAgYm1pICYmIHJlZlNlY3Rpb25PYmplY3QgPyAgZm9ybWF0dGVkU0RWYWx1ZSA6IG51bGw7XG4gIH1cbiAgY2FsY1dlaWdodEZvckhlaWdodFpzY29yZSh3ZWlnaHRGb3JIZWlnaHRSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XG4gICAgbGV0IHJlZlNlY3Rpb24gO1xuICAgIGxldCBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XG4gICAgICBoZWlnaHQgPSBwYXJzZUZsb2F0KGhlaWdodCkudG9GaXhlZCgxKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhbmRhcmRIZWlnaHRNaW4gPSA0NTtcbiAgICBjb25zdCBzdGFuZGFyZE1heEhlaWdodCA9IDExMDtcbiAgICBpZiAoIGhlaWdodCA8IHN0YW5kYXJkSGVpZ2h0TWluIHx8IGhlaWdodCA+IHN0YW5kYXJkTWF4SGVpZ2h0KSB7XG4gICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gLTQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVmU2VjdGlvbiA9IF8uZmlsdGVyKHdlaWdodEZvckhlaWdodFJlZiwgKHJlZk9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZWZPYmplY3RbJ0xlbmd0aCddKS50b0ZpeGVkKDEpID09PSBoZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChyZWZTZWN0aW9uKTtcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xuICAgICAgY29uc3QgcmVmT2JqZWN0VmFsdWVzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCkubWFwKFxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XG4gICAgICAgIGNvbnN0IG1pbmltdW1WYWx1ZSA9IHJlZk9iamVjdFZhbHVlc1sxXTtcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcbiAgICAgICAgaWYgKHdlaWdodCA8IG1pbmltdW1WYWx1ZSkge1xuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2gobWluaW11bVZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodmFsdWUgPD0gd2VpZ2h0KSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyAgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLTQnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gIGhlaWdodCAmJiB3ZWlnaHQgID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xuICB9XG5cbiAgY2FsY0hlaWdodEZvckFnZVpzY29yZShoZWlnaHRGb3JBZ2VSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XG5cbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChoZWlnaHRGb3JBZ2VSZWYpO1xuICAgIGxldCBmb3JtYXR0ZWRTRFZhbHVlO1xuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXG4gICAgICAgIChrZXkpID0+IHJlZlNlY3Rpb25PYmplY3Rba2V5XSkubWFwKCAoeCkgPT4geCk7XG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xuICAgICAgICBjb25zdCBtaW5SZWZlcmVuY2VQb2ludCA9IFtdO1xuICAgICAgICBpZiAoaGVpZ2h0IDwgbWluaW11bVZhbHVlKSB7XG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSA8PSBoZWlnaHQpIHtcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGZvcm1hdHRlZFNEVmFsdWUgPT09ICdTJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTCcgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ00nICB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnLTUnKSB7XG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiAgaGVpZ2h0ICYmIHdlaWdodCAmJiByZWZTZWN0aW9uT2JqZWN0ID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xuICB9XG5cbiAgaXNFbXB0eSh2YWwpIHtcblxuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSAnJyB8fCB2YWwgPT09ICdudWxsJyB8fCB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhcnJheUNvbnRhaW5zKGFycmF5LCBtZW1iZXJzKSB7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZW1iZXJzKSkge1xuXG4gICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb250YWlucyA9IHRydWU7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB2YWwgPSBtZW1iZXJzW2ldO1xuICAgICAgICBpZiAoYXJyYXkuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgIGNvbnRhaW5zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihtZW1iZXJzKSAhPT0gLTE7XG4gICAgfVxuICB9XG4gIGV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlcyhrZXksIGFycmF5KSB7XG4gICAgY29uc3QgdmFsdWVzID0gYXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH0pO1xuICByZXR1cm4gdmFsdWVzO1xuICB9XG4gIGZvcm1hdERhdGUodmFsdWUsIGZvcm1hdCwgb2Zmc2V0KSB7XG5cbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQnO1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAnKzAzMDAnO1xuXG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuXG4gICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZUZvcm1hdEV4Y2VwdGlvbjogdmFsdWUgcGFzc2VkICcgK1xuICAgICAgICAgICdpcyBub3QgYSB2YWxpZCBkYXRlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlOyAvLyBUT0RPIGltcGxlbWVudCB0aGlzXG4gICAgLy8gcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKSh2YWx1ZSwgZm9ybWF0LCBvZmZzZXQpO1xuICB9XG5cbiAgYXJyYXlDb250YWluc0FueShhcnJheSwgbWVtYmVycykge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVtYmVycykpIHtcbiAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWlucyA9IGZhbHNlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBjb25zdCB2YWwgPSBtZW1iZXJzW2ldO1xuICAgICAgICBpZiAoYXJyYXkuaW5kZXhPZih2YWwpICE9PSAtMSkge1xuICAgICAgICAgIGNvbnRhaW5zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihtZW1iZXJzKSAhPT0gLTE7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhlbHBlckZ1bmN0aW9ucygpIHtcbiAgICBjb25zdCBoZWxwZXIgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICBhcnJheUNvbnRhaW5zQW55OiBoZWxwZXIuYXJyYXlDb250YWluc0FueSxcbiAgICAgIGNhbGNCTUk6IGhlbHBlci5jYWxjQk1JLFxuICAgICAgY2FsY0JNSUZvckFnZVpzY29yZTogaGVscGVyLmNhbGNCTUlGb3JBZ2Vac2NvcmUsXG4gICAgICBjYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlOiBoZWxwZXIuY2FsY1dlaWdodEZvckhlaWdodFpzY29yZSxcbiAgICAgIGNhbGNIZWlnaHRGb3JBZ2Vac2NvcmU6IGhlbHBlci5jYWxjSGVpZ2h0Rm9yQWdlWnNjb3JlLFxuICAgICAgaXNFbXB0eTogaGVscGVyLmlzRW1wdHksXG4gICAgICBhcnJheUNvbnRhaW5zOiBoZWxwZXIuYXJyYXlDb250YWlucyxcbiAgICAgIGV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlczogaGVscGVyLmV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlc1xuICAgIH07XG4gIH1cbn1cbiJdfQ==