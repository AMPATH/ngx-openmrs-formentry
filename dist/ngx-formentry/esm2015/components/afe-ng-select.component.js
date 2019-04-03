/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';
export class AfeNgSelectComponent {
    constructor() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getChangingText(event) {
        // console.log(event);
        this.getData(event).subscribe((/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            this.question_options = options;
        }));
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
                this.resolveSelectedOption(this.extras.originalValue).subscribe((/**
                 * @param {?} option
                 * @return {?}
                 */
                (option) => {
                    this.selected_question_option = option;
                }));
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
        OptionsObservable.subscribe((/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            // console.log('options', options);
            /** @type {?} */
            const mappedOptions = new Array();
            for (let i = 0; i < options.length; i++) {
                mappedOptions.push(new Option(options[i]));
            }
            this.subject.next(mappedOptions);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.subject.error(error);
        }));
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
        OptionObservable.subscribe((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            // console.log('option', option);
            this.subjectOption.next(option);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            this.subjectOption.error(error);
        }));
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
                template: `<ng-select
                   (searchInputText)="getChangingText($event)"
                    (ngModelChange)="onValueChange($event)"
                    [options]="question_options"
                    [multiple]="multiple" >
            </ng-select>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AfeNgSelectComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQXFCckUsTUFBTTtJQWhCTjtRQXNCRSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFFM0IsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUNqQixvQkFBZTs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFpRnBDLENBQUM7Ozs7O0lBL0VDLGVBQWUsQ0FBQyxLQUFLO1FBQ25CLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRO0lBRW5CLENBQUM7Ozs7O0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU1QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU8sSUFBVSxDQUFDOzs7OztJQUVwQyxXQUFXLENBQUMsT0FBWSxJQUFJLENBQUM7Ozs7SUFFN0IsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUks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LHNDQUFpQjs7SUFDakIsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9zZWxlY3Qtb3B0aW9uJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FmZS1uZy1zZWxlY3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgKHNlYXJjaElucHV0VGV4dCk9XCJnZXRDaGFuZ2luZ1RleHQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJxdWVzdGlvbl9vcHRpb25zXCJcclxuICAgICAgICAgICAgICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiA+XHJcbiAgICAgICAgICAgIDwvbmctc2VsZWN0PlxyXG4gIGAsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZmVOZ1NlbGVjdENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWZlTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT47XHJcbiAgc3ViamVjdE9wdGlvbjogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj47XHJcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBleHRyYXM6IGFueTtcclxuICBxdWVzdGlvbl9vcHRpb25zOiBhbnkgPSBbXTtcclxuICBzZWxlY3RlZF9xdWVzdGlvbl9vcHRpb246IGFueTtcclxuICBlcnJvcnM6IGFueSA9IFtdO1xyXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgZ2V0Q2hhbmdpbmdUZXh0KGV2ZW50KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICB0aGlzLmdldERhdGEoZXZlbnQpLnN1YnNjcmliZSgob3B0aW9ucykgPT4ge1xyXG4gICAgICB0aGlzLnF1ZXN0aW9uX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcblxyXG4gIH1cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcblxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XHJcbiAgICAgIGlmICh0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlU2VsZWN0ZWRPcHRpb24odGhpcy5leHRyYXMub3JpZ2luYWxWYWx1ZSkuc3Vic2NyaWJlKChvcHRpb24pID0+IHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uID0gb3B0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldERhdGEoc2VhcmNoVGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcHRpb25bXT4ge1xyXG5cclxuICAgIHRoaXMuc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+KFtdKTtcclxuXHJcbiAgICBjb25zdCBPcHRpb25zT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHNlYXJjaFRleHQpO1xyXG5cclxuICAgIE9wdGlvbnNPYnNlcnZhYmxlLnN1YnNjcmliZShcclxuICAgICAgKG9wdGlvbnMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9ucycsIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnM6IE9wdGlvbltdID0gbmV3IEFycmF5PE9wdGlvbj4oKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBtYXBwZWRPcHRpb25zLnB1c2gobmV3IE9wdGlvbihvcHRpb25zW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KG1hcHBlZE9wdGlvbnMpO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICB0aGlzLnN1YmplY3QuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBvblZhbHVlQ2hhbmdlKGV2ZW50KSB7IH1cclxuICByZXNvbHZlU2VsZWN0ZWRPcHRpb24odmFsdWU6IGFueSk6IE9ic2VydmFibGU8T3B0aW9uPiB7XHJcblxyXG4gICAgdGhpcy5zdWJqZWN0T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+KG51bGwpO1xyXG4gICAgY29uc3QgT3B0aW9uT2JzZXJ2YWJsZSA9IHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgT3B0aW9uT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXHJcbiAgICAgIChvcHRpb24pID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9uJywgb3B0aW9uKTtcclxuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24ubmV4dChvcHRpb24pO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24uZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnN1YmplY3RPcHRpb24uYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldE9wdGlvbnMoKSB7XHJcbiAgICB0aGlzLnN1YmplY3QubmV4dChuZXcgQXJyYXk8T3B0aW9uPigpKTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=