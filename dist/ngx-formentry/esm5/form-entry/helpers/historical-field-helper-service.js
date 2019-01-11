/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            _.each(historicalValue.value, function (val) {
                _.each(question.options, function (option) {
                    if (option[valueProperty] === val) {
                        if (valueConverted_1 === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted_1++;
                    }
                });
            });
        }
        else {
            _.each(question.options, function (option) {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            });
        }
        return displayText;
    };
    return HistoricalFieldHelperService;
}());
export { HistoricalFieldHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QjtJQUFBO0lBaUNBLENBQUM7Ozs7Ozs7SUEvQlEsZ0VBQXlCOzs7Ozs7SUFBaEMsVUFBaUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7WUFDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFOztnQkFDaEMsZ0JBQWMsR0FBRyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFDLEdBQUc7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07b0JBRTlCLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDakMsSUFBSSxnQkFBYyxLQUFLLENBQUMsRUFBRTs0QkFDeEIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ3JEOzZCQUFNOzRCQUNMLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDNUQ7d0JBQ0QsZ0JBQWMsRUFBRSxDQUFDO3FCQUNsQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBRUo7YUFBTTtZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07Z0JBQzlCLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLEVBQUU7b0JBQ25ELFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sV0FBVyxDQUFFO0lBQ3RCLENBQUM7SUFHSCxtQ0FBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgZ2V0RGlzcGxheVRleHRGcm9tT3B0aW9ucyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlICwgdmFsdWVQcm9wZXJ0eTogc3RyaW5nLCBkaXNwbGF5UHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBsZXQgZGlzcGxheVRleHQgPSAnJztcbiAgICBjb25zdCBoaXN0b3JpY2FsVmFsdWUgPSBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgIGlmIChfLmlzQXJyYXkoaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSkge1xuICAgICAgbGV0IHZhbHVlQ29udmVydGVkID0gMDtcbiAgICAgIF8uZWFjaChoaXN0b3JpY2FsVmFsdWUudmFsdWUsICh2YWwpID0+IHtcbiAgICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcblxuICAgICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlQ29udmVydGVkID09PSAwKSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyAnLCAnICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlZCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSBoaXN0b3JpY2FsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXlUZXh0IDtcbiAgfVxuXG5cbn1cbiJdfQ==