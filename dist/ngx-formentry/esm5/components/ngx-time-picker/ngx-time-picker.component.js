import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import * as moment_ from 'moment';
var moment = moment_;
var NgxTimePickerComponent = /** @class */ (function () {
    function NgxTimePickerComponent() {
        this.value = moment().format('HH:mm:ss');
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    NgxTimePickerComponent.prototype.ngOnInit = function () { };
    NgxTimePickerComponent.prototype.writeValue = function (value) {
        this.value = this.formatTimeValue(value);
    };
    NgxTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NgxTimePickerComponent.prototype.registerOnTouched = function (fn) { };
    NgxTimePickerComponent.prototype.onTimeSelect = function ($event) {
        var timeValue = this.formatTimeValue($event);
        this.value = timeValue;
        this.onChange(timeValue);
    };
    NgxTimePickerComponent.prototype.formatTimeValue = function (timeInputString) {
        /*
          Allows processing of data that comes in as date-time
          or just time i.e '1970-03-01 12:32:21' or '12:32:21'
          or '12:32' or '1970-01-01T13:03:00.000+0300'
        */
        var timeArray = [];
        var dateArray = [];
        var timeValue = '';
        if (typeof timeInputString === 'undefined' || timeInputString === null) {
        }
        else {
            timeArray = timeInputString.split(':');
            dateArray = timeInputString.split('-');
        }
        if (timeArray.length === 1 && moment(timeInputString).isValid()) {
            timeValue = moment(timeInputString).format('HH:mm:ss');
        }
        else if (timeArray.length > 1 && timeArray.length < 2) {
            timeValue = moment(timeInputString, moment.defaultFormat).format('HH:mm:ss');
        }
        else if (timeArray.length >= 2 && dateArray.length > 1) {
            timeValue = moment(timeInputString, moment.defaultFormat).format('HH:mm:ss');
        }
        else if (timeArray.length >= 2 && dateArray.length <= 1) {
            timeValue = moment(timeInputString, 'HH:mm:ss').format('HH:mm:ss');
        }
        else {
            timeValue = moment().format('HH:mm:ss');
        }
        return timeValue;
    };
    NgxTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-time-picker',
                    template: "<input\n  type=\"time\"\n  class=\"form-control\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onTimeSelect($event)\"\n/>\n",
                    styles: [""],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(function () { return NgxTimePickerComponent; })
                        }
                    ]
                },] },
    ];
    return NgxTimePickerComponent;
}());
export { NgxTimePickerComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtdGltZS1waWNrZXIvbmd4LXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBVSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCO0lBQUE7UUFtQlMsVUFBSyxHQUFXLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQVEsY0FBTyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFRLGNBQU8sQ0FBQyxDQUFDO0lBb0RuQyxDQUFDO0lBbERRLHlDQUFRLEdBQWYsY0FBbUIsQ0FBQztJQUViLDJDQUFVLEdBQWpCLFVBQWtCLEtBQVU7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxpREFBZ0IsR0FBdkIsVUFBd0IsRUFBTztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sa0RBQWlCLEdBQXhCLFVBQXlCLEVBQU8sSUFBUyxDQUFDO0lBRW5DLDZDQUFZLEdBQW5CLFVBQW9CLE1BQWM7UUFDaEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxnREFBZSxHQUF0QixVQUF1QixlQUF1QjtRQUM1Qzs7OztVQUlFO1FBQ0YsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFlLEtBQUssV0FBVyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFNBQVMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQzlELFVBQVUsQ0FDWCxDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FDOUQsVUFBVSxDQUNYLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDOztnQkF4RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw0SEFNWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLEtBQUssRUFBRSxJQUFJOzRCQUNYLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixDQUFDO3lCQUN0RDtxQkFDRjtpQkFDRjs7SUF3REQsNkJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXZEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWUtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8aW5wdXRcbiAgdHlwZT1cInRpbWVcIlxuICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgKG5nTW9kZWxDaGFuZ2UpPVwib25UaW1lU2VsZWN0KCRldmVudClcIlxuLz5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neFRpbWVQaWNrZXJDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIHZhbHVlOiBzdHJpbmcgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFRpbWVWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XG5cbiAgcHVibGljIG9uVGltZVNlbGVjdCgkZXZlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHRpbWVWYWx1ZSA9IHRoaXMuZm9ybWF0VGltZVZhbHVlKCRldmVudCk7XG4gICAgdGhpcy52YWx1ZSA9IHRpbWVWYWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlKHRpbWVWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZm9ybWF0VGltZVZhbHVlKHRpbWVJbnB1dFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvKlxuICAgICAgQWxsb3dzIHByb2Nlc3Npbmcgb2YgZGF0YSB0aGF0IGNvbWVzIGluIGFzIGRhdGUtdGltZVxuICAgICAgb3IganVzdCB0aW1lIGkuZSAnMTk3MC0wMy0wMSAxMjozMjoyMScgb3IgJzEyOjMyOjIxJ1xuICAgICAgb3IgJzEyOjMyJyBvciAnMTk3MC0wMS0wMVQxMzowMzowMC4wMDArMDMwMCdcbiAgICAqL1xuICAgIGxldCB0aW1lQXJyYXkgPSBbXTtcbiAgICBsZXQgZGF0ZUFycmF5ID0gW107XG4gICAgbGV0IHRpbWVWYWx1ZSA9ICcnO1xuXG4gICAgaWYgKHR5cGVvZiB0aW1lSW5wdXRTdHJpbmcgPT09ICd1bmRlZmluZWQnIHx8IHRpbWVJbnB1dFN0cmluZyA9PT0gbnVsbCkge1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lQXJyYXkgPSB0aW1lSW5wdXRTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgIGRhdGVBcnJheSA9IHRpbWVJbnB1dFN0cmluZy5zcGxpdCgnLScpO1xuICAgIH1cbiAgICBpZiAodGltZUFycmF5Lmxlbmd0aCA9PT0gMSAmJiBtb21lbnQodGltZUlucHV0U3RyaW5nKS5pc1ZhbGlkKCkpIHtcbiAgICAgIHRpbWVWYWx1ZSA9IG1vbWVudCh0aW1lSW5wdXRTdHJpbmcpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICB9IGVsc2UgaWYgKHRpbWVBcnJheS5sZW5ndGggPiAxICYmIHRpbWVBcnJheS5sZW5ndGggPCAyKSB7XG4gICAgICB0aW1lVmFsdWUgPSBtb21lbnQodGltZUlucHV0U3RyaW5nLCBtb21lbnQuZGVmYXVsdEZvcm1hdCkuZm9ybWF0KFxuICAgICAgICAnSEg6bW06c3MnXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGltZUFycmF5Lmxlbmd0aCA+PSAyICYmIGRhdGVBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB0aW1lVmFsdWUgPSBtb21lbnQodGltZUlucHV0U3RyaW5nLCBtb21lbnQuZGVmYXVsdEZvcm1hdCkuZm9ybWF0KFxuICAgICAgICAnSEg6bW06c3MnXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGltZUFycmF5Lmxlbmd0aCA+PSAyICYmIGRhdGVBcnJheS5sZW5ndGggPD0gMSkge1xuICAgICAgdGltZVZhbHVlID0gbW9tZW50KHRpbWVJbnB1dFN0cmluZywgJ0hIOm1tOnNzJykuZm9ybWF0KCdISDptbTpzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lVmFsdWUgPSBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgfVxuICAgIHJldHVybiB0aW1lVmFsdWU7XG4gIH1cbn1cbiJdfQ==