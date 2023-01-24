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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmd4LXRpbWUtcGlja2VyL25neC10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QjtJQUFBO1FBbUJTLFVBQUssR0FBVyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsYUFBUSxHQUFRLGNBQU8sQ0FBQyxDQUFDO1FBQ3pCLGNBQVMsR0FBUSxjQUFPLENBQUMsQ0FBQztJQW9EbkMsQ0FBQztJQWxEUSx5Q0FBUSxHQUFmLGNBQW1CLENBQUM7SUFFYiwyQ0FBVSxHQUFqQixVQUFrQixLQUFVO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0saURBQWdCLEdBQXZCLFVBQXdCLEVBQU87UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGtEQUFpQixHQUF4QixVQUF5QixFQUFPLElBQVMsQ0FBQztJQUVuQyw2Q0FBWSxHQUFuQixVQUFvQixNQUFjO1FBQ2hDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0RBQWUsR0FBdEIsVUFBdUIsZUFBdUI7UUFDNUM7Ozs7VUFJRTtRQUNGLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBZSxLQUFLLFdBQVcsSUFBSSxlQUFlLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixTQUFTLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxTQUFTLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUM5RCxVQUFVLENBQ1gsQ0FBQztRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQzlELFVBQVUsQ0FDWCxDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Z0JBeEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsNEhBTVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixLQUFLLEVBQUUsSUFBSTs0QkFDWCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQzt5QkFDdEQ7cUJBQ0Y7aUJBQ0Y7O0lBd0RELDZCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F2RFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPGlucHV0XG4gIHR5cGU9XCJ0aW1lXCJcbiAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICBbbmdNb2RlbF09XCJ2YWx1ZVwiXG4gIChuZ01vZGVsQ2hhbmdlKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCJcbi8+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hUaW1lUGlja2VyQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyB2YWx1ZTogc3RyaW5nID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRUaW1lVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7fVxuXG4gIHB1YmxpYyBvblRpbWVTZWxlY3QoJGV2ZW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB0aW1lVmFsdWUgPSB0aGlzLmZvcm1hdFRpbWVWYWx1ZSgkZXZlbnQpO1xuICAgIHRoaXMudmFsdWUgPSB0aW1lVmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh0aW1lVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdFRpbWVWYWx1ZSh0aW1lSW5wdXRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLypcbiAgICAgIEFsbG93cyBwcm9jZXNzaW5nIG9mIGRhdGEgdGhhdCBjb21lcyBpbiBhcyBkYXRlLXRpbWVcbiAgICAgIG9yIGp1c3QgdGltZSBpLmUgJzE5NzAtMDMtMDEgMTI6MzI6MjEnIG9yICcxMjozMjoyMSdcbiAgICAgIG9yICcxMjozMicgb3IgJzE5NzAtMDEtMDFUMTM6MDM6MDAuMDAwKzAzMDAnXG4gICAgKi9cbiAgICBsZXQgdGltZUFycmF5ID0gW107XG4gICAgbGV0IGRhdGVBcnJheSA9IFtdO1xuICAgIGxldCB0aW1lVmFsdWUgPSAnJztcblxuICAgIGlmICh0eXBlb2YgdGltZUlucHV0U3RyaW5nID09PSAndW5kZWZpbmVkJyB8fCB0aW1lSW5wdXRTdHJpbmcgPT09IG51bGwpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZUFycmF5ID0gdGltZUlucHV0U3RyaW5nLnNwbGl0KCc6Jyk7XG4gICAgICBkYXRlQXJyYXkgPSB0aW1lSW5wdXRTdHJpbmcuc3BsaXQoJy0nKTtcbiAgICB9XG4gICAgaWYgKHRpbWVBcnJheS5sZW5ndGggPT09IDEgJiYgbW9tZW50KHRpbWVJbnB1dFN0cmluZykuaXNWYWxpZCgpKSB7XG4gICAgICB0aW1lVmFsdWUgPSBtb21lbnQodGltZUlucHV0U3RyaW5nKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgfSBlbHNlIGlmICh0aW1lQXJyYXkubGVuZ3RoID4gMSAmJiB0aW1lQXJyYXkubGVuZ3RoIDwgMikge1xuICAgICAgdGltZVZhbHVlID0gbW9tZW50KHRpbWVJbnB1dFN0cmluZywgbW9tZW50LmRlZmF1bHRGb3JtYXQpLmZvcm1hdChcbiAgICAgICAgJ0hIOm1tOnNzJ1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRpbWVBcnJheS5sZW5ndGggPj0gMiAmJiBkYXRlQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdGltZVZhbHVlID0gbW9tZW50KHRpbWVJbnB1dFN0cmluZywgbW9tZW50LmRlZmF1bHRGb3JtYXQpLmZvcm1hdChcbiAgICAgICAgJ0hIOm1tOnNzJ1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRpbWVBcnJheS5sZW5ndGggPj0gMiAmJiBkYXRlQXJyYXkubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHRpbWVWYWx1ZSA9IG1vbWVudCh0aW1lSW5wdXRTdHJpbmcsICdISDptbTpzcycpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGltZVZhbHVlID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgIH1cbiAgICByZXR1cm4gdGltZVZhbHVlO1xuICB9XG59XG4iXX0=