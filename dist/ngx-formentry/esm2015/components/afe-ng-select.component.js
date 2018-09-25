/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe((options) => {
            console.log('options', options);
            const /** @type {?} */ mappedOptions = new Array();
            for (let /** @type {?} */ i = 0; i < options.length; i++) {
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
        const /** @type {?} */ OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe((option) => {
            console.log('option', option);
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
                        useExisting: forwardRef(() => AfeNgSelectComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
AfeNgSelectComponent.propDecorators = {
    "dataSource": [{ type: Input },],
    "multiple": [{ type: Input },],
    "extras": [{ type: Input },],
};
function AfeNgSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AfeNgSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AfeNgSelectComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AfeNgSelectComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQXFCckUsTUFBTTs7Z0NBTW9CLEVBQUU7c0JBRVosRUFBRTsrQkFDRSxDQUFDLENBQU0sRUFBRSxFQUFFLElBQUk7Ozs7OztJQUVqQyxlQUFlLENBQUMsS0FBSzs7UUFFbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRO0tBRWxCOzs7OztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FFM0I7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTyxLQUFXOzs7OztJQUVwQyxXQUFXLENBQUMsT0FBWSxLQUFLOzs7O0lBRTdCLFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN6RSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDO2lCQUN4QyxDQUFDLENBQUM7YUFDSjtTQUVGO0tBRUY7Ozs7O0lBRUQsT0FBTyxDQUFDLFVBQWtCO1FBRXhCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFFakQsdUJBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsaUJBQWlCLENBQUMsU0FBUyxDQUN6QixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEMsdUJBQU0sYUFBYSxHQUFhLElBQUksS0FBSyxFQUFVLENBQUM7WUFFcEQsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQixDQUNGLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNwQzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBSyxLQUFLOzs7OztJQUN4QixxQkFBcUIsQ0FBQyxLQUFVO1FBRTlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdkQsdUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQ3hCLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQyxDQUNGLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMxQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBVSxDQUFDLENBQUM7S0FFeEM7OztZQXhHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7Z0JBQ0QsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7d0JBQ25ELEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUFDO2FBQ0w7Ozs7MkJBSUUsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1vcHRpb24nO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWZlLW5nLXNlbGVjdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAoc2VhcmNoSW5wdXRUZXh0KT1cImdldENoYW5naW5nVGV4dCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblZhbHVlQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInF1ZXN0aW9uX29wdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiID5cclxuICAgICAgICAgICAgPC9uZy1zZWxlY3Q+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFmZU5nU2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZmVOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPjtcclxuICBzdWJqZWN0T3B0aW9uOiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPjtcclxuICBASW5wdXQoKSBkYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGV4dHJhczogYW55O1xyXG4gIHF1ZXN0aW9uX29wdGlvbnM6IGFueSA9IFtdO1xyXG4gIHNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbjogYW55O1xyXG4gIGVycm9yczogYW55ID0gW107XHJcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG5cclxuICBnZXRDaGFuZ2luZ1RleHQoZXZlbnQpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgIHRoaXMuZ2V0RGF0YShldmVudCkuc3Vic2NyaWJlKChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHRoaXMucXVlc3Rpb25fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuXHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcclxuICAgICAgaWYgKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnJlc29sdmVTZWxlY3RlZE9wdGlvbih0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKS5zdWJzY3JpYmUoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZF9xdWVzdGlvbl9vcHRpb24gPSBvcHRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YShzZWFyY2hUZXh0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9wdGlvbltdPiB7XHJcblxyXG4gICAgdGhpcy5zdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT4oW10pO1xyXG5cclxuICAgIGNvbnN0IE9wdGlvbnNPYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dCk7XHJcblxyXG4gICAgT3B0aW9uc09ic2VydmFibGUuc3Vic2NyaWJlKFxyXG4gICAgICAob3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zJywgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9uczogT3B0aW9uW10gPSBuZXcgQXJyYXk8T3B0aW9uPigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIG1hcHBlZE9wdGlvbnMucHVzaChuZXcgT3B0aW9uKG9wdGlvbnNbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQobWFwcGVkT3B0aW9ucyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdC5lcnJvcihlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIG9uVmFsdWVDaGFuZ2UoZXZlbnQpIHsgfVxyXG4gIHJlc29sdmVTZWxlY3RlZE9wdGlvbih2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxPcHRpb24+IHtcclxuXHJcbiAgICB0aGlzLnN1YmplY3RPcHRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj4obnVsbCk7XHJcbiAgICBjb25zdCBPcHRpb25PYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICBPcHRpb25PYnNlcnZhYmxlLnN1YnNjcmliZShcclxuICAgICAgKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb24nLCBvcHRpb24pO1xyXG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5uZXh0KG9wdGlvbik7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdE9wdGlvbi5lcnJvcihlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdE9wdGlvbi5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0T3B0aW9ucygpIHtcclxuICAgIHRoaXMuc3ViamVjdC5uZXh0KG5ldyBBcnJheTxPcHRpb24+KCkpO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==