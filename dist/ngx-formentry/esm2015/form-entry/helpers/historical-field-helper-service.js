import * as _ from 'lodash';
export class HistoricalFieldHelperService {
    getDisplayTextFromOptions(question, valueProperty, displayProperty) {
        let displayText = '';
        const historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            let valueConverted = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHNUIsTUFBTSxPQUFPLDRCQUE0QjtJQUVoQyx5QkFBeUIsQ0FBQyxRQUFzQixFQUFHLGFBQXFCLEVBQUUsZUFBdUI7UUFFdEcsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBRWxDLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDakMsSUFBSSxjQUFjLEtBQUssQ0FBQyxFQUFFOzRCQUN4QixXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDckQ7NkJBQU07NEJBQ0wsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUM1RDt3QkFDRCxjQUFjLEVBQUUsQ0FBQztxQkFDbEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUVKO2FBQU07WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssZUFBZSxDQUFDLEtBQUssRUFBRTtvQkFDbkQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxXQUFXLENBQUU7SUFDdEIsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB7XG5cbiAgcHVibGljIGdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSAsIHZhbHVlUHJvcGVydHk6IHN0cmluZywgZGlzcGxheVByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gJyc7XG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICBpZiAoXy5pc0FycmF5KGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkpIHtcbiAgICAgIGxldCB2YWx1ZUNvbnZlcnRlZCA9IDA7XG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XG4gICAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG5cbiAgICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSB2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNvbnZlcnRlZCA9PT0gMCkge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaXNwbGF5VGV4dCA9IGRpc3BsYXlUZXh0ICsgJywgJyArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZWQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgZGlzcGxheVRleHQgPSBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkaXNwbGF5VGV4dCA7XG4gIH1cblxuXG59XG4iXX0=