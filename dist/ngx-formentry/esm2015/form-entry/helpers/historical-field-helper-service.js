/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ displayText = '';
        const /** @type {?} */ historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            let /** @type {?} */ valueConverted = 0;
            _.each(historicalValue.value, (val) => {
                _.each(question.options, (option) => {
                    if (option[valueProperty] === val) {
                        if (valueConverted === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted++;
                    }
                });
            });
        }
        else {
            _.each(question.options, (option) => {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            });
        }
        return displayText;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNOzs7Ozs7O0lBRUcseUJBQXlCLENBQUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCO1FBRXRHLHFCQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsdUJBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMscUJBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBRWxDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ3JEO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDNUQ7d0JBQ0QsY0FBYyxFQUFFLENBQUM7cUJBQ2xCO2lCQUNGLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUVKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2QzthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBRTs7Q0FJdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIHtcclxuXHJcbiAgcHVibGljIGdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSAsIHZhbHVlUHJvcGVydHk6IHN0cmluZywgZGlzcGxheVByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgIGxldCBkaXNwbGF5VGV4dCA9ICcnO1xyXG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcclxuICAgIGlmIChfLmlzQXJyYXkoaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSkge1xyXG4gICAgICBsZXQgdmFsdWVDb252ZXJ0ZWQgPSAwO1xyXG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XHJcbiAgICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlQ29udmVydGVkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyAnLCAnICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZWQrKztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcclxuICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSBoaXN0b3JpY2FsVmFsdWUudmFsdWUpIHtcclxuICAgICAgICAgIGRpc3BsYXlUZXh0ID0gb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkaXNwbGF5VGV4dCA7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19