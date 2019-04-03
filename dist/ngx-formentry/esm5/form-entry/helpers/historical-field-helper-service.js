/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
var HistoricalFieldHelperService = /** @class */ (function () {
    function HistoricalFieldHelperService() {
    }
    /**
     * @param {?} question
     * @param {?} valueProperty
     * @param {?} displayProperty
     * @return {?}
     */
    HistoricalFieldHelperService.prototype.getDisplayTextFromOptions = /**
     * @param {?} question
     * @param {?} valueProperty
     * @param {?} displayProperty
     * @return {?}
     */
    function (question, valueProperty, displayProperty) {
        /** @type {?} */
        var displayText = '';
        /** @type {?} */
        var historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            /** @type {?} */
            var valueConverted_1 = 0;
            _.each(historicalValue.value, (/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                _.each(question.options, (/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    if (option[valueProperty] === val) {
                        if (valueConverted_1 === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted_1++;
                    }
                }));
            }));
        }
        else {
            _.each(question.options, (/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            }));
        }
        return displayText;
    };
    return HistoricalFieldHelperService;
}());
export { HistoricalFieldHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QjtJQUFBO0lBaUNBLENBQUM7Ozs7Ozs7SUEvQlEsZ0VBQXlCOzs7Ozs7SUFBaEMsVUFBaUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7WUFDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxnQkFBYyxHQUFHLENBQUM7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSzs7OztZQUFFLFVBQUMsR0FBRztnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBRSxVQUFDLE1BQU07b0JBRTlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxFQUFFLENBQUMsQ0FBQyxnQkFBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN0RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFDRCxnQkFBYyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBRSxVQUFDLE1BQU07Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUU7SUFDdEIsQ0FBQztJQUdILG1DQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2Uge1xyXG5cclxuICBwdWJsaWMgZ2V0RGlzcGxheVRleHRGcm9tT3B0aW9ucyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlICwgdmFsdWVQcm9wZXJ0eTogc3RyaW5nLCBkaXNwbGF5UHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gJyc7XHJcbiAgICBjb25zdCBoaXN0b3JpY2FsVmFsdWUgPSBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xyXG4gICAgaWYgKF8uaXNBcnJheShoaXN0b3JpY2FsVmFsdWUudmFsdWUpKSB7XHJcbiAgICAgIGxldCB2YWx1ZUNvbnZlcnRlZCA9IDA7XHJcbiAgICAgIF8uZWFjaChoaXN0b3JpY2FsVmFsdWUudmFsdWUsICh2YWwpID0+IHtcclxuICAgICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xyXG5cclxuICAgICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWVDb252ZXJ0ZWQgPT09IDApIHtcclxuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArICcsICcgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlZCsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkge1xyXG4gICAgICAgICAgZGlzcGxheVRleHQgPSBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpc3BsYXlUZXh0IDtcclxuICB9XHJcblxyXG5cclxufVxyXG4iXX0=