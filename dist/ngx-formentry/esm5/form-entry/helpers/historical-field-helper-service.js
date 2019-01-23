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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QjtJQUFBO0lBaUNBLENBQUM7Ozs7Ozs7SUEvQlEsZ0VBQXlCOzs7Ozs7SUFBaEMsVUFBaUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7WUFDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxnQkFBYyxHQUFHLENBQUM7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQUMsR0FBRztnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtvQkFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLGdCQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ3RELENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUM3RCxDQUFDO3dCQUNELGdCQUFjLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBRTtJQUN0QixDQUFDO0lBR0gsbUNBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB7XG5cbiAgcHVibGljIGdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSAsIHZhbHVlUHJvcGVydHk6IHN0cmluZywgZGlzcGxheVByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gJyc7XG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICBpZiAoXy5pc0FycmF5KGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkpIHtcbiAgICAgIGxldCB2YWx1ZUNvbnZlcnRlZCA9IDA7XG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XG4gICAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG5cbiAgICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSB2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNvbnZlcnRlZCA9PT0gMCkge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgJywgJyArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZWQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgZGlzcGxheVRleHQgPSBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkaXNwbGF5VGV4dCA7XG4gIH1cblxuXG59XG4iXX0=