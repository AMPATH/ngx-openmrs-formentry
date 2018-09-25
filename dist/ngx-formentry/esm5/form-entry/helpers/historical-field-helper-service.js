/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ displayText = '';
        var /** @type {?} */ historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            var /** @type {?} */ valueConverted_1 = 0;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixJQUFBOzs7Ozs7Ozs7SUFFUyxnRUFBeUI7Ozs7OztjQUFDLFFBQXNCLEVBQUcsYUFBcUIsRUFBRSxlQUF1QjtRQUV0RyxxQkFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLHFCQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLHFCQUFJLGdCQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFDLEdBQUc7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07b0JBRTlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxFQUFFLENBQUMsQ0FBQyxnQkFBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUNyRDt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixXQUFXLEdBQUcsV0FBVyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQzVEO3dCQUNELGdCQUFjLEVBQUUsQ0FBQztxQkFDbEI7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBRUo7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDdkM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUU7O3VDQWhDeEI7SUFvQ0MsQ0FBQTtBQWpDRCx3Q0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIHtcclxuXHJcbiAgcHVibGljIGdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSAsIHZhbHVlUHJvcGVydHk6IHN0cmluZywgZGlzcGxheVByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgIGxldCBkaXNwbGF5VGV4dCA9ICcnO1xyXG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcclxuICAgIGlmIChfLmlzQXJyYXkoaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSkge1xyXG4gICAgICBsZXQgdmFsdWVDb252ZXJ0ZWQgPSAwO1xyXG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XHJcbiAgICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlQ29udmVydGVkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyAnLCAnICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZWQrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcclxuICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSBoaXN0b3JpY2FsVmFsdWUudmFsdWUpIHtcclxuICAgICAgICAgIGRpc3BsYXlUZXh0ID0gb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkaXNwbGF5VGV4dCA7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19