/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
export class HistoricalFieldHelperService {
    /**
     * @param {?} question
     * @param {?} valueProperty
     * @param {?} displayProperty
     * @return {?}
     */
    getDisplayTextFromOptions(question, valueProperty, displayProperty) {
        /** @type {?} */
        let displayText = '';
        /** @type {?} */
        const historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            /** @type {?} */
            let valueConverted = 0;
            _.each(historicalValue.value, (/**
             * @param {?} val
             * @return {?}
             */
            (val) => {
                _.each(question.options, (/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => {
                    if (option[valueProperty] === val) {
                        if (valueConverted === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted++;
                    }
                }));
            }));
        }
        else {
            _.each(question.options, (/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            }));
        }
        return displayText;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNOzs7Ozs7O0lBRUcseUJBQXlCLENBQUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7Y0FDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxjQUFjLEdBQUcsQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN0RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFDRCxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDSCxDQUFDLEVBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUU7SUFDdEIsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB7XG5cbiAgcHVibGljIGdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSAsIHZhbHVlUHJvcGVydHk6IHN0cmluZywgZGlzcGxheVByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gJyc7XG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICBpZiAoXy5pc0FycmF5KGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkpIHtcbiAgICAgIGxldCB2YWx1ZUNvbnZlcnRlZCA9IDA7XG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XG4gICAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG5cbiAgICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSB2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNvbnZlcnRlZCA9PT0gMCkge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgJywgJyArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZWQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgZGlzcGxheVRleHQgPSBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkaXNwbGF5VGV4dCA7XG4gIH1cblxuXG59XG4iXX0=