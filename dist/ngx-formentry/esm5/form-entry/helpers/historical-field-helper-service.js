import * as _ from 'lodash';
var HistoricalFieldHelperService = /** @class */ (function () {
    function HistoricalFieldHelperService() {
    }
    HistoricalFieldHelperService.prototype.getDisplayTextFromOptions = function (question, valueProperty, displayProperty) {
        var displayText = '';
        var historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHNUI7SUFBQTtJQWlDQSxDQUFDO0lBL0JRLGdFQUF5QixHQUFoQyxVQUFpQyxRQUFzQixFQUFHLGFBQXFCLEVBQUUsZUFBdUI7UUFFdEcsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLElBQUksZ0JBQWMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQUMsR0FBRztnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtvQkFFOUIsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNqQyxJQUFJLGdCQUFjLEtBQUssQ0FBQyxFQUFFOzRCQUN4QixXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDckQ7NkJBQU07NEJBQ0wsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3lCQUM1RDt3QkFDRCxnQkFBYyxFQUFFLENBQUM7cUJBQ2xCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FFSjthQUFNO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtnQkFDOUIsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssZUFBZSxDQUFDLEtBQUssRUFBRTtvQkFDbkQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxXQUFXLENBQUU7SUFDdEIsQ0FBQztJQUdILG1DQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcblxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2Uge1xuXG4gIHB1YmxpYyBnZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UgLCB2YWx1ZVByb3BlcnR5OiBzdHJpbmcsIGRpc3BsYXlQcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGxldCBkaXNwbGF5VGV4dCA9ICcnO1xuICAgIGNvbnN0IGhpc3RvcmljYWxWYWx1ZSA9IHF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgaWYgKF8uaXNBcnJheShoaXN0b3JpY2FsVmFsdWUudmFsdWUpKSB7XG4gICAgICBsZXQgdmFsdWVDb252ZXJ0ZWQgPSAwO1xuICAgICAgXy5lYWNoKGhpc3RvcmljYWxWYWx1ZS52YWx1ZSwgKHZhbCkgPT4ge1xuICAgICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuXG4gICAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gdmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDb252ZXJ0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArICcsICcgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVkKys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgIGRpc3BsYXlUZXh0ID0gb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGlzcGxheVRleHQgO1xuICB9XG5cblxufVxuIl19