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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE1BQU07Ozs7OztJQUVKLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTs7WUFFaEIsQ0FBQztRQUNMLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQzs7Ozs7OztJQUVELG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTTs7WUFDM0MsR0FBRzs7Y0FDRCxZQUFZLEdBQUcsSUFBSTtRQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDOztjQUNLLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOztZQUMxQyxnQkFBZ0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOztr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LE1BQU0sQ0FBQyxtQkFBbUI7WUFDL0MseUJBQXlCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QjtZQUMzRCxzQkFBc0IsRUFBRSxNQUFNLENBQUMsc0JBQXNCO1lBQ3JELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDbkMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLDJCQUEyQjtTQUNoRSxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuZXhwb3J0IGNsYXNzIEpzRXhwcmVzc2lvbkhlbHBlciB7XHJcblxyXG4gIGNhbGNCTUkoaGVpZ2h0LCB3ZWlnaHQpIHtcclxuXHJcbiAgICBsZXQgcjtcclxuICAgIGlmIChoZWlnaHQgJiYgd2VpZ2h0KSB7XHJcbiAgICAgIHIgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVpZ2h0ICYmIHdlaWdodCA/IHBhcnNlRmxvYXQocikgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2FsY0JNSUZvckFnZVpzY29yZShibWlGb3JBZ2VSZWYsIGhlaWdodCwgd2VpZ2h0KSB7XHJcbiAgIGxldCBibWk7XHJcbiAgIGNvbnN0IG1heEFnZUluRGF5cyA9IDE4NTY7XHJcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xyXG4gICAgICBibWkgPSAod2VpZ2h0IC8gKGhlaWdodCAvIDEwMCAqIGhlaWdodCAvIDEwMCkpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWZTZWN0aW9uT2JqZWN0ID0gXy5maXJzdChibWlGb3JBZ2VSZWYpO1xyXG4gICAgbGV0IGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xyXG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXHJcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcclxuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XHJcbiAgICAgICAgaWYgKGJtaSA8IG1pbmltdW1WYWx1ZSkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSBibWkpIHtcclxuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3RSZWZlcmVuY2VWYWx1ZSA9IF8ubGFzdChtaW5SZWZlcmVuY2VQb2ludCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlSW5kZXggPSBfLmZpbmRJbmRleChyZWZPYmplY3RWYWx1ZXMsIChvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG8gPT09IGxhc3RSZWZlcmVuY2VWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBTRFZhbHVlID0gcmVmT2JqZWN0S2V5c1tsYXN0VmFsdWVJbmRleF07XHJcbiAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IFNEVmFsdWUucmVwbGFjZSgnU0QnLCAnJyk7XHJcbiAgICAgICAgaWYgKGZvcm1hdHRlZFNEVmFsdWUuaW5jbHVkZXMoJ25lZycpKSB7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gZm9ybWF0dGVkU0RWYWx1ZS5zdWJzdHJpbmcoMSwgMCk7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gJy0nICsgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ1MnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdMJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTScgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGJtaSAmJiByZWZTZWN0aW9uT2JqZWN0ID8gIGZvcm1hdHRlZFNEVmFsdWUgOiBudWxsO1xyXG4gIH1cclxuICBjYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlKHdlaWdodEZvckhlaWdodFJlZiwgaGVpZ2h0LCB3ZWlnaHQpIHtcclxuICAgIGxldCByZWZTZWN0aW9uIDtcclxuICAgIGxldCBmb3JtYXR0ZWRTRFZhbHVlO1xyXG4gICAgaWYgKGhlaWdodCAmJiB3ZWlnaHQpIHtcclxuICAgICAgaGVpZ2h0ID0gcGFyc2VGbG9hdChoZWlnaHQpLnRvRml4ZWQoMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFuZGFyZEhlaWdodE1pbiA9IDQ1O1xyXG4gICAgY29uc3Qgc3RhbmRhcmRNYXhIZWlnaHQgPSAxMTA7XHJcbiAgICBpZiAoIGhlaWdodCA8IHN0YW5kYXJkSGVpZ2h0TWluIHx8IGhlaWdodCA+IHN0YW5kYXJkTWF4SGVpZ2h0KSB7XHJcbiAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAtNDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVmU2VjdGlvbiA9IF8uZmlsdGVyKHdlaWdodEZvckhlaWdodFJlZiwgKHJlZk9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJlZk9iamVjdFsnTGVuZ3RoJ10pLnRvRml4ZWQoMSkgPT09IGhlaWdodDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVmU2VjdGlvbk9iamVjdCA9IF8uZmlyc3QocmVmU2VjdGlvbik7XHJcbiAgICBpZiAocmVmU2VjdGlvbk9iamVjdCkge1xyXG4gICAgICBjb25zdCByZWZPYmplY3RWYWx1ZXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KS5tYXAoXHJcbiAgICAgICAgKGtleSkgPT4gcmVmU2VjdGlvbk9iamVjdFtrZXldKS5tYXAoICh4KSA9PiB4KTtcclxuICAgICAgICBjb25zdCByZWZPYmplY3RLZXlzID0gT2JqZWN0LmtleXMocmVmU2VjdGlvbk9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbWluaW11bVZhbHVlID0gcmVmT2JqZWN0VmFsdWVzWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblJlZmVyZW5jZVBvaW50ID0gW107XHJcbiAgICAgICAgaWYgKHdlaWdodCA8IG1pbmltdW1WYWx1ZSkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaChtaW5pbXVtVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBfLmZvckVhY2gocmVmT2JqZWN0VmFsdWVzLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSB3ZWlnaHQpIHtcclxuICAgICAgICAgIG1pblJlZmVyZW5jZVBvaW50LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYXN0UmVmZXJlbmNlVmFsdWUgPSBfLmxhc3QobWluUmVmZXJlbmNlUG9pbnQpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gXy5maW5kSW5kZXgocmVmT2JqZWN0VmFsdWVzLCAobykgPT4ge1xyXG4gICAgICAgIHJldHVybiBvID09PSBsYXN0UmVmZXJlbmNlVmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgU0RWYWx1ZSA9IHJlZk9iamVjdEtleXNbbGFzdFZhbHVlSW5kZXhdO1xyXG4gICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBTRFZhbHVlLnJlcGxhY2UoJ1NEJywgJycpO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWRTRFZhbHVlLmluY2x1ZGVzKCduZWcnKSkge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9IGZvcm1hdHRlZFNEVmFsdWUuc3Vic3RyaW5nKDEsIDApO1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctJyArIGZvcm1hdHRlZFNEVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ1MnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdMJyB8fCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnTScgIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICctNScpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLTQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICBoZWlnaHQgJiYgd2VpZ2h0ICA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNhbGNIZWlnaHRGb3JBZ2Vac2NvcmUoaGVpZ2h0Rm9yQWdlUmVmLCBoZWlnaHQsIHdlaWdodCkge1xyXG5cclxuICAgIGNvbnN0IHJlZlNlY3Rpb25PYmplY3QgPSBfLmZpcnN0KGhlaWdodEZvckFnZVJlZik7XHJcbiAgICBsZXQgZm9ybWF0dGVkU0RWYWx1ZTtcclxuICAgIGlmIChyZWZTZWN0aW9uT2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHJlZk9iamVjdFZhbHVlcyA9IE9iamVjdC5rZXlzKHJlZlNlY3Rpb25PYmplY3QpLm1hcChcclxuICAgICAgICAoa2V5KSA9PiByZWZTZWN0aW9uT2JqZWN0W2tleV0pLm1hcCggKHgpID0+IHgpO1xyXG4gICAgICAgIGNvbnN0IHJlZk9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhyZWZTZWN0aW9uT2JqZWN0KTtcclxuICAgICAgICBjb25zdCBtaW5pbXVtVmFsdWUgPSByZWZPYmplY3RWYWx1ZXNbMV07XHJcbiAgICAgICAgY29uc3QgbWluUmVmZXJlbmNlUG9pbnQgPSBbXTtcclxuICAgICAgICBpZiAoaGVpZ2h0IDwgbWluaW11bVZhbHVlKSB7XHJcbiAgICAgICAgICBtaW5SZWZlcmVuY2VQb2ludC5wdXNoKG1pbmltdW1WYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIF8uZm9yRWFjaChyZWZPYmplY3RWYWx1ZXMsICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDw9IGhlaWdodCkge1xyXG4gICAgICAgICAgbWluUmVmZXJlbmNlUG9pbnQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFzdFJlZmVyZW5jZVZhbHVlID0gXy5sYXN0KG1pblJlZmVyZW5jZVBvaW50KTtcclxuICAgICAgICBjb25zdCBsYXN0VmFsdWVJbmRleCA9IF8uZmluZEluZGV4KHJlZk9iamVjdFZhbHVlcywgKG8pID0+IHtcclxuICAgICAgICByZXR1cm4gbyA9PT0gbGFzdFJlZmVyZW5jZVZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IFNEVmFsdWUgPSByZWZPYmplY3RLZXlzW2xhc3RWYWx1ZUluZGV4XTtcclxuICAgICAgICBmb3JtYXR0ZWRTRFZhbHVlID0gU0RWYWx1ZS5yZXBsYWNlKCdTRCcsICcnKTtcclxuICAgICAgICBpZiAoZm9ybWF0dGVkU0RWYWx1ZS5pbmNsdWRlcygnbmVnJykpIHtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSBmb3JtYXR0ZWRTRFZhbHVlLnN1YnN0cmluZygxLCAwKTtcclxuICAgICAgICAgIGZvcm1hdHRlZFNEVmFsdWUgPSAnLScgKyBmb3JtYXR0ZWRTRFZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBmb3JtYXR0ZWRTRFZhbHVlID09PSAnUycgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJ0wnIHx8IGZvcm1hdHRlZFNEVmFsdWUgPT09ICdNJyAgfHwgZm9ybWF0dGVkU0RWYWx1ZSA9PT0gJy01Jykge1xyXG4gICAgICAgICAgZm9ybWF0dGVkU0RWYWx1ZSA9ICctNCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGhlaWdodCAmJiB3ZWlnaHQgJiYgcmVmU2VjdGlvbk9iamVjdCA/ICBmb3JtYXR0ZWRTRFZhbHVlIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGlzRW1wdHkodmFsKSB7XHJcblxyXG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ251bGwnIHx8IHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXJyYXlDb250YWlucyhhcnJheSwgbWVtYmVycykge1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XHJcblxyXG4gICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGNvbnRhaW5zID0gdHJ1ZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IG1lbWJlcnNbaV07XHJcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSA9PT0gLTEpIHtcclxuICAgICAgICAgIGNvbnRhaW5zID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gY29udGFpbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihtZW1iZXJzKSAhPT0gLTE7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4dHJhY3RSZXBlYXRpbmdHcm91cFZhbHVlcyhrZXksIGFycmF5KSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW1ba2V5XTtcclxuICAgIH0pO1xyXG4gIHJldHVybiB2YWx1ZXM7XHJcbiAgfVxyXG4gIGZvcm1hdERhdGUodmFsdWUsIGZvcm1hdCwgb2Zmc2V0KSB7XHJcblxyXG4gICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkJztcclxuICAgIG9mZnNldCA9IG9mZnNldCB8fCAnKzAzMDAnO1xyXG5cclxuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcclxuXHJcbiAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0ZUZvcm1hdEV4Y2VwdGlvbjogdmFsdWUgcGFzc2VkICcgK1xyXG4gICAgICAgICAgJ2lzIG5vdCBhIHZhbGlkIGRhdGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTsgLy8gVE9ETyBpbXBsZW1lbnQgdGhpc1xyXG4gICAgLy8gcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKSh2YWx1ZSwgZm9ybWF0LCBvZmZzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXJyYXlDb250YWluc0FueShhcnJheSwgbWVtYmVycykge1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XHJcbiAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBjb250YWlucyA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbCA9IG1lbWJlcnNbaV07XHJcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSAhPT0gLTEpIHtcclxuICAgICAgICAgIGNvbnRhaW5zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGhlbHBlckZ1bmN0aW9ucygpIHtcclxuICAgIGNvbnN0IGhlbHBlciA9IHRoaXM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcnJheUNvbnRhaW5zQW55OiBoZWxwZXIuYXJyYXlDb250YWluc0FueSxcclxuICAgICAgY2FsY0JNSTogaGVscGVyLmNhbGNCTUksXHJcbiAgICAgIGNhbGNCTUlGb3JBZ2Vac2NvcmU6IGhlbHBlci5jYWxjQk1JRm9yQWdlWnNjb3JlLFxyXG4gICAgICBjYWxjV2VpZ2h0Rm9ySGVpZ2h0WnNjb3JlOiBoZWxwZXIuY2FsY1dlaWdodEZvckhlaWdodFpzY29yZSxcclxuICAgICAgY2FsY0hlaWdodEZvckFnZVpzY29yZTogaGVscGVyLmNhbGNIZWlnaHRGb3JBZ2Vac2NvcmUsXHJcbiAgICAgIGlzRW1wdHk6IGhlbHBlci5pc0VtcHR5LFxyXG4gICAgICBhcnJheUNvbnRhaW5zOiBoZWxwZXIuYXJyYXlDb250YWlucyxcclxuICAgICAgZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzOiBoZWxwZXIuZXh0cmFjdFJlcGVhdGluZ0dyb3VwVmFsdWVzXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=