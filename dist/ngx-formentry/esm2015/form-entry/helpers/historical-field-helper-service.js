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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNOzs7Ozs7O0lBRUcseUJBQXlCLENBQUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCOztZQUVsRyxXQUFXLEdBQUcsRUFBRTs7Y0FDZCxlQUFlLEdBQUcsUUFBUSxDQUFDLG1CQUFtQjtRQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxjQUFjLEdBQUcsQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLOzs7O1lBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN0RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFDRCxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDSCxDQUFDLEVBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUU7SUFDdEIsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB7XHJcblxyXG4gIHB1YmxpYyBnZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgLCB2YWx1ZVByb3BlcnR5OiBzdHJpbmcsIGRpc3BsYXlQcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICBsZXQgZGlzcGxheVRleHQgPSAnJztcclxuICAgIGNvbnN0IGhpc3RvcmljYWxWYWx1ZSA9IHF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XHJcbiAgICBpZiAoXy5pc0FycmF5KGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkpIHtcclxuICAgICAgbGV0IHZhbHVlQ29udmVydGVkID0gMDtcclxuICAgICAgXy5lYWNoKGhpc3RvcmljYWxWYWx1ZS52YWx1ZSwgKHZhbCkgPT4ge1xyXG4gICAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gdmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZUNvbnZlcnRlZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgJywgJyArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVkKys7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSB7XHJcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlzcGxheVRleHQgO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==