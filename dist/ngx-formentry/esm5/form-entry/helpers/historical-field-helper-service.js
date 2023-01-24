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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHNUI7SUFBQTtJQStCQSxDQUFDO0lBOUJRLGdFQUF5QixHQUFoQyxVQUNFLFFBQXNCLEVBQ3RCLGFBQXFCLEVBQ3JCLGVBQXVCO1FBRXZCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksZ0JBQWMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQUMsR0FBRztnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtvQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLGdCQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ3RELENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUM3RCxDQUFDO3dCQUNELGdCQUFjLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0gsbUNBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgSGlzdG9yaWNhbEZpZWxkSGVscGVyU2VydmljZSB7XG4gIHB1YmxpYyBnZXREaXNwbGF5VGV4dEZyb21PcHRpb25zKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgdmFsdWVQcm9wZXJ0eTogc3RyaW5nLFxuICAgIGRpc3BsYXlQcm9wZXJ0eTogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGRpc3BsYXlUZXh0ID0gJyc7XG4gICAgY29uc3QgaGlzdG9yaWNhbFZhbHVlID0gcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZTtcbiAgICBpZiAoXy5pc0FycmF5KGhpc3RvcmljYWxWYWx1ZS52YWx1ZSkpIHtcbiAgICAgIGxldCB2YWx1ZUNvbnZlcnRlZCA9IDA7XG4gICAgICBfLmVhY2goaGlzdG9yaWNhbFZhbHVlLnZhbHVlLCAodmFsKSA9PiB7XG4gICAgICAgIF8uZWFjaChxdWVzdGlvbi5vcHRpb25zLCAob3B0aW9uKSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvblt2YWx1ZVByb3BlcnR5XSA9PT0gdmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDb252ZXJ0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArIG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheVRleHQgPSBkaXNwbGF5VGV4dCArICcsICcgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVkKys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSBoaXN0b3JpY2FsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXlUZXh0O1xuICB9XG59XG4iXX0=