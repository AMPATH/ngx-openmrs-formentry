import * as tslib_1 from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';
var AfeNgSelectComponent = /** @class */ (function () {
    function AfeNgSelectComponent() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = function (_) { };
    }
    AfeNgSelectComponent_1 = AfeNgSelectComponent;
    AfeNgSelectComponent.prototype.getChangingText = function (event) {
        var _this = this;
        // console.log(event);
        this.getData(event).subscribe(function (options) {
            _this.question_options = options;
        });
    };
    AfeNgSelectComponent.prototype.writeValue = function (obj) {
    };
    AfeNgSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    AfeNgSelectComponent.prototype.registerOnTouched = function (fn) { };
    AfeNgSelectComponent.prototype.ngOnChanges = function (changes) { };
    AfeNgSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe(function (option) {
                    _this.selected_question_option = option;
                });
            }
        }
    };
    AfeNgSelectComponent.prototype.getData = function (searchText) {
        var _this = this;
        this.subject = new BehaviorSubject([]);
        var OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe(function (options) {
            // console.log('options', options);
            var mappedOptions = new Array();
            for (var i = 0; i < options.length; i++) {
                mappedOptions.push(new Option(options[i]));
            }
            _this.subject.next(mappedOptions);
        }, function (error) {
            _this.subject.error(error);
        });
        return this.subject.asObservable();
    };
    AfeNgSelectComponent.prototype.onValueChange = function (event) { };
    AfeNgSelectComponent.prototype.resolveSelectedOption = function (value) {
        var _this = this;
        this.subjectOption = new BehaviorSubject(null);
        var OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe(function (option) {
            // console.log('option', option);
            _this.subjectOption.next(option);
        }, function (error) {
            _this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    };
    AfeNgSelectComponent.prototype.resetOptions = function () {
        this.subject.next(new Array());
    };
    var AfeNgSelectComponent_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AfeNgSelectComponent.prototype, "dataSource", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AfeNgSelectComponent.prototype, "multiple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AfeNgSelectComponent.prototype, "extras", void 0);
    AfeNgSelectComponent = AfeNgSelectComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'afe-ng-select',
            template: "<ng-select\n                   (searchInputText)=\"getChangingText($event)\"\n                    (ngModelChange)=\"onValueChange($event)\"\n                    [options]=\"question_options\"\n                    [multiple]=\"multiple\" >\n            </ng-select>\n  ",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return AfeNgSelectComponent_1; }),
                    multi: true
                }
            ]
        })
    ], AfeNgSelectComponent);
    return AfeNgSelectComponent;
}());
export { AfeNgSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWZlLW5nLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFDN0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBcUJyRTtJQWhCQTtRQXNCRSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFFM0IsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUNqQixvQkFBZSxHQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsQ0FBQztJQWlGcEMsQ0FBQzs2QkExRlksb0JBQW9CO0lBVy9CLDhDQUFlLEdBQWYsVUFBZ0IsS0FBSztRQUFyQixpQkFLQztRQUpDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQU87WUFDcEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsR0FBUTtJQUVuQixDQUFDO0lBQ0QsK0NBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixFQUFPLElBQVUsQ0FBQztJQUVwQywwQ0FBVyxHQUFYLFVBQVksT0FBWSxJQUFJLENBQUM7SUFFN0IsdUNBQVEsR0FBUjtRQUFB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b3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1vcHRpb24nO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWZlLW5nLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPG5nLXNlbGVjdFxuICAgICAgICAgICAgICAgICAgIChzZWFyY2hJbnB1dFRleHQpPVwiZ2V0Q2hhbmdpbmdUZXh0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJxdWVzdGlvbl9vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCIgPlxuICAgICAgICAgICAgPC9uZy1zZWxlY3Q+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWZlTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBBZmVOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT47XG4gIHN1YmplY3RPcHRpb246IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+O1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgZXh0cmFzOiBhbnk7XG4gIHF1ZXN0aW9uX29wdGlvbnM6IGFueSA9IFtdO1xuICBzZWxlY3RlZF9xdWVzdGlvbl9vcHRpb246IGFueTtcbiAgZXJyb3JzOiBhbnkgPSBbXTtcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG4gIGdldENoYW5naW5nVGV4dChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLmdldERhdGEoZXZlbnQpLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcblxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBpZiAodGhpcy5leHRyYXMub3JpZ2luYWxWYWx1ZSkge1xuICAgICAgICB0aGlzLnJlc29sdmVTZWxlY3RlZE9wdGlvbih0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKS5zdWJzY3JpYmUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uID0gb3B0aW9uO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZ2V0RGF0YShzZWFyY2hUZXh0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9wdGlvbltdPiB7XG5cbiAgICB0aGlzLnN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPihbXSk7XG5cbiAgICBjb25zdCBPcHRpb25zT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHNlYXJjaFRleHQpO1xuXG4gICAgT3B0aW9uc09ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgKG9wdGlvbnMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9uczogT3B0aW9uW10gPSBuZXcgQXJyYXk8T3B0aW9uPigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1hcHBlZE9wdGlvbnMucHVzaChuZXcgT3B0aW9uKG9wdGlvbnNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChtYXBwZWRPcHRpb25zKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zdWJqZWN0LmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2UoZXZlbnQpIHsgfVxuICByZXNvbHZlU2VsZWN0ZWRPcHRpb24odmFsdWU6IGFueSk6IE9ic2VydmFibGU8T3B0aW9uPiB7XG5cbiAgICB0aGlzLnN1YmplY3RPcHRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj4obnVsbCk7XG4gICAgY29uc3QgT3B0aW9uT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk7XG5cbiAgICBPcHRpb25PYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgIChvcHRpb24pID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbicsIG9wdGlvbik7XG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5uZXh0KG9wdGlvbik7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLnN1YmplY3RPcHRpb24uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZXNldE9wdGlvbnMoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQobmV3IEFycmF5PE9wdGlvbj4oKSk7XG5cbiAgfVxuXG59XG4iXX0=