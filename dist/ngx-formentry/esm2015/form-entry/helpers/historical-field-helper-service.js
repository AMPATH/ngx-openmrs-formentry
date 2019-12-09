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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE1BQU0sT0FBTyw0QkFBNEI7SUFFaEMseUJBQXlCLENBQUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCO1FBRXRHLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUVsQyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUU7d0JBQ2pDLElBQUksY0FBYyxLQUFLLENBQUMsRUFBRTs0QkFDeEIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ3JEOzZCQUFNOzRCQUNMLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDNUQ7d0JBQ0QsY0FBYyxFQUFFLENBQUM7cUJBQ2xCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FFSjthQUFNO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLEVBQUU7b0JBQ25ELFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sV0FBVyxDQUFFO0lBQ3RCLENBQUM7Q0FHRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcblxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2Uge1xuXG4gIHB1YmxpYyBnZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgLCB2YWx1ZVByb3BlcnR5OiBzdHJpbmcsIGRpc3BsYXlQcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGxldCBkaXNwbGF5VGV4dCA9ICcnO1xuICAgIGNvbnN0IGhpc3RvcmljYWxWYWx1ZSA9IHF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgaWYgKF8uaXNBcnJheShoaXN0b3JpY2FsVmFsdWUudmFsdWUpKSB7XG4gICAgICBsZXQgdmFsdWVDb252ZXJ0ZWQgPSAwO1xuICAgICAgXy5lYWNoKGhpc3RvcmljYWxWYWx1ZS52YWx1ZSwgKHZhbCkgPT4ge1xuICAgICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gdmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDb252ZXJ0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArICcsICcgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVkKys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgIGRpc3BsYXlUZXh0ID0gb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGlzcGxheVRleHQgO1xuICB9XG5cblxufVxuIl19