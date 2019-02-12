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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QjtJQUFBO0lBaUNBLENBQUM7Ozs7Ozs7SUEvQlEsZ0VBQXlCOzs7Ozs7SUFBaEMsVUFBaUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7WUFDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxnQkFBYyxHQUFHLENBQUM7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSzs7OztZQUFFLFVBQUMsR0FBRztnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBRSxVQUFDLE1BQU07b0JBRTlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxFQUFFLENBQUMsQ0FBQyxnQkFBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN0RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFDRCxnQkFBYyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBRSxVQUFDLE1BQU07Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUU7SUFDdEIsQ0FBQztJQUdILG1DQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcblxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2Uge1xuXG4gIHB1YmxpYyBnZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgLCB2YWx1ZVByb3BlcnR5OiBzdHJpbmcsIGRpc3BsYXlQcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGxldCBkaXNwbGF5VGV4dCA9ICcnO1xuICAgIGNvbnN0IGhpc3RvcmljYWxWYWx1ZSA9IHF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgaWYgKF8uaXNBcnJheShoaXN0b3JpY2FsVmFsdWUudmFsdWUpKSB7XG4gICAgICBsZXQgdmFsdWVDb252ZXJ0ZWQgPSAwO1xuICAgICAgXy5lYWNoKGhpc3RvcmljYWxWYWx1ZS52YWx1ZSwgKHZhbCkgPT4ge1xuICAgICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gdmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDb252ZXJ0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArICcsICcgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVkKys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgIGRpc3BsYXlUZXh0ID0gb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGlzcGxheVRleHQgO1xuICB9XG5cblxufVxuIl19