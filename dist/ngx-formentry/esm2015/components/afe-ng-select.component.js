/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} event
     * @return {?}
     */
    getChangingText(event) {
        // console.log(event);
        this.getData(event).subscribe((options) => {
            this.question_options = options;
        });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe((option) => {
                    this.selected_question_option = option;
                });
            }
        }
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    getData(searchText) {
        this.subject = new BehaviorSubject([]);
        /** @type {?} */
        const OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe((options) => {
            // console.log('options', options);
            /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChange(event) { }
    /**
     * @param {?} value
     * @return {?}
     */
    resolveSelectedOption(value) {
        this.subjectOption = new BehaviorSubject(null);
        /** @type {?} */
        const OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe((option) => {
            // console.log('option', option);
            this.subjectOption.next(option);
        }, (error) => {
            this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    }
    /**
     * @return {?}
     */
    resetOptions() {
        this.subject.next(new Array());
    }
}
AfeNgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'afe-ng-select',
                template: `
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfeNgSelectComponent),
                        multi: true
                    }
                ]
            }] }
];
AfeNgSelectComponent.propDecorators = {
    dataSource: [{ type: Input }],
    multiple: [{ type: Input }],
    extras: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AfeNgSelectComponent.prototype.subject;
    /** @type {?} */
    AfeNgSelectComponent.prototype.subjectOption;
    /** @type {?} */
    AfeNgSelectComponent.prototype.dataSource;
    /** @type {?} */
    AfeNgSelectComponent.prototype.multiple;
    /** @type {?} */
    AfeNgSelectComponent.prototype.extras;
    /** @type {?} */
    AfeNgSelectComponent.prototype.question_options;
    /** @type {?} */
    AfeNgSelectComponent.prototype.selected_question_option;
    /** @type {?} */
    AfeNgSelectComponent.prototype.errors;
    /** @type {?} */
    AfeNgSelectComponent.prototype.propagateChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQWdCckUsTUFBTSxPQUFPLG9CQUFvQjtJQVhqQztRQWlCRSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFFM0IsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUNqQixvQkFBZSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFpRnBDLENBQUM7Ozs7O0lBL0VDLGVBQWUsQ0FBQyxLQUFLO1FBQ25CLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRO0lBRW5CLENBQUM7Ozs7O0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU1QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU8sSUFBVSxDQUFDOzs7OztJQUVwQyxXQUFXLENBQUMsT0FBWSxJQUFJLENBQUM7Ozs7SUFFN0IsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN6RSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQzthQUNKO1NBRUY7SUFFSCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxVQUFrQjtRQUV4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDOztjQUUzQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsU0FBUyxDQUN6QixDQUFDLE9BQU8sRUFBRSxFQUFFOzs7a0JBRUosYUFBYSxHQUFhLElBQUksS0FBSyxFQUFVO1lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FDRixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDOzs7OztJQUN4QixxQkFBcUIsQ0FBQyxLQUFVO1FBRTlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7O2NBQ2pELGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1FBRXBFLGdCQUFnQixDQUFDLFNBQVMsQ0FDeEIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNULGlDQUFpQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FDRixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO0lBRXpDLENBQUM7OztZQW5HRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTtHQUNUO2dCQUNELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO3dCQUNuRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFBQzthQUNMOzs7eUJBSUUsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7Ozs7SUFKTix1Q0FBbUM7O0lBQ25DLDZDQUF1Qzs7SUFDdkMsMENBQWdDOztJQUNoQyx3Q0FBMkI7O0lBQzNCLHNDQUFxQjs7SUFDckIsZ0RBQTJCOztJQUMzQix3REFBOEI7O0lBQzlCLHNDQUFpQjs7SUFDakIsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1vcHRpb24nO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWZlLW5nLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWZlTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBBZmVOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT47XG4gIHN1YmplY3RPcHRpb246IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+O1xuICBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgZXh0cmFzOiBhbnk7XG4gIHF1ZXN0aW9uX29wdGlvbnM6IGFueSA9IFtdO1xuICBzZWxlY3RlZF9xdWVzdGlvbl9vcHRpb246IGFueTtcbiAgZXJyb3JzOiBhbnkgPSBbXTtcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG4gIGdldENoYW5naW5nVGV4dChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLmdldERhdGEoZXZlbnQpLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcblxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBpZiAodGhpcy5leHRyYXMub3JpZ2luYWxWYWx1ZSkge1xuICAgICAgICB0aGlzLnJlc29sdmVTZWxlY3RlZE9wdGlvbih0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKS5zdWJzY3JpYmUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uID0gb3B0aW9uO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZ2V0RGF0YShzZWFyY2hUZXh0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9wdGlvbltdPiB7XG5cbiAgICB0aGlzLnN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPihbXSk7XG5cbiAgICBjb25zdCBPcHRpb25zT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHNlYXJjaFRleHQpO1xuXG4gICAgT3B0aW9uc09ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgKG9wdGlvbnMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9uczogT3B0aW9uW10gPSBuZXcgQXJyYXk8T3B0aW9uPigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1hcHBlZE9wdGlvbnMucHVzaChuZXcgT3B0aW9uKG9wdGlvbnNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChtYXBwZWRPcHRpb25zKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zdWJqZWN0LmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2UoZXZlbnQpIHsgfVxuICByZXNvbHZlU2VsZWN0ZWRPcHRpb24odmFsdWU6IGFueSk6IE9ic2VydmFibGU8T3B0aW9uPiB7XG5cbiAgICB0aGlzLnN1YmplY3RPcHRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj4obnVsbCk7XG4gICAgY29uc3QgT3B0aW9uT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk7XG5cbiAgICBPcHRpb25PYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgIChvcHRpb24pID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbicsIG9wdGlvbik7XG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5uZXh0KG9wdGlvbik7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLnN1YmplY3RPcHRpb24uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZXNldE9wdGlvbnMoKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQobmV3IEFycmF5PE9wdGlvbj4oKSk7XG5cbiAgfVxuXG59XG4iXX0=