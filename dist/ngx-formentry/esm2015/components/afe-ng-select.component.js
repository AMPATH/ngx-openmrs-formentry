import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';
export class AfeNgSelectComponent {
    constructor() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = (_) => { };
    }
    getChangingText(event) {
        // console.log(event);
        this.getData(event).subscribe((options) => {
            this.question_options = options;
        });
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) { }
    ngOnChanges(changes) { }
    ngOnInit() {
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe((option) => {
                    this.selected_question_option = option;
                });
            }
        }
    }
    getData(searchText) {
        this.subject = new BehaviorSubject([]);
        const OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe((options) => {
            // console.log('options', options);
            const mappedOptions = new Array();
            for (let i = 0; i < options.length; i++) {
                mappedOptions.push(new Option(options[i]));
            }
            this.subject.next(mappedOptions);
        }, (error) => {
            this.subject.error(error);
        });
        return this.subject.asObservable();
    }
    onValueChange(event) { }
    resolveSelectedOption(value) {
        this.subjectOption = new BehaviorSubject(null);
        const OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe((option) => {
            // console.log('option', option);
            this.subjectOption.next(option);
        }, (error) => {
            this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    }
    resetOptions() {
        this.subject.next(new Array());
    }
}
AfeNgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'afe-ng-select',
                template: `<ng-select
    (searchInputText)="getChangingText($event)"
    (ngModelChange)="onValueChange($event)"
    [options]="question_options"
    [multiple]="multiple"
  >
  </ng-select> `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfeNgSelectComponent),
                        multi: true
                    }
                ]
            },] },
];
AfeNgSelectComponent.propDecorators = {
    dataSource: [{ type: Input }],
    multiple: [{ type: Input }],
    extras: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBcUJyRSxNQUFNO0lBakJOO1FBd0JFLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztJQTBFbkMsQ0FBQztJQXhFQyxlQUFlLENBQUMsS0FBSztRQUNuQixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRLElBQVMsQ0FBQztJQUM3QixnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPLElBQVMsQ0FBQztJQUVuQyxXQUFXLENBQUMsT0FBWSxJQUFHLENBQUM7SUFFNUIsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUM3RCxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNULElBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLENBQUMsQ0FDRixDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQWtCO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFFakQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVwRSxpQkFBaUIsQ0FBQyxTQUFTLENBQ3pCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVixtQ0FBbUM7WUFDbkMsTUFBTSxhQUFhLEdBQWEsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUVwRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFLLElBQUcsQ0FBQztJQUN2QixxQkFBcUIsQ0FBQyxLQUFVO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJFLGdCQUFnQixDQUFDLFNBQVMsQ0FDeEIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNULGlDQUFpQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7O1lBcEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Z0JBTUk7Z0JBQ2QsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7d0JBQ25ELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7Ozt5QkFLRSxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1vcHRpb24nO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FmZS1uZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxuZy1zZWxlY3RcbiAgICAoc2VhcmNoSW5wdXRUZXh0KT1cImdldENoYW5naW5nVGV4dCgkZXZlbnQpXCJcbiAgICAobmdNb2RlbENoYW5nZSk9XCJvblZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgIFtvcHRpb25zXT1cInF1ZXN0aW9uX29wdGlvbnNcIlxuICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gID5cbiAgPC9uZy1zZWxlY3Q+IGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWZlTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQWZlTmdTZWxlY3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuICBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+O1xuICBzdWJqZWN0T3B0aW9uOiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPjtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGV4dHJhczogYW55O1xuICBxdWVzdGlvbl9vcHRpb25zOiBhbnkgPSBbXTtcbiAgc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uOiBhbnk7XG4gIGVycm9yczogYW55ID0gW107XG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIGdldENoYW5naW5nVGV4dChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLmdldERhdGEoZXZlbnQpLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHt9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGlmICh0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpLnN1YnNjcmliZShcbiAgICAgICAgICAob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YShzZWFyY2hUZXh0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9wdGlvbltdPiB7XG4gICAgdGhpcy5zdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT4oW10pO1xuXG4gICAgY29uc3QgT3B0aW9uc09ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0KTtcblxuICAgIE9wdGlvbnNPYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgIChvcHRpb25zKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcHRpb25zJywgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnM6IE9wdGlvbltdID0gbmV3IEFycmF5PE9wdGlvbj4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtYXBwZWRPcHRpb25zLnB1c2gobmV3IE9wdGlvbihvcHRpb25zW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQobWFwcGVkT3B0aW9ucyk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc3ViamVjdC5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlKGV2ZW50KSB7fVxuICByZXNvbHZlU2VsZWN0ZWRPcHRpb24odmFsdWU6IGFueSk6IE9ic2VydmFibGU8T3B0aW9uPiB7XG4gICAgdGhpcy5zdWJqZWN0T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+KG51bGwpO1xuICAgIGNvbnN0IE9wdGlvbk9ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpO1xuXG4gICAgT3B0aW9uT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAob3B0aW9uKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcHRpb24nLCBvcHRpb24pO1xuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24ubmV4dChvcHRpb24pO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24uZXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0T3B0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVzZXRPcHRpb25zKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KG5ldyBBcnJheTxPcHRpb24+KCkpO1xuICB9XG59XG4iXX0=