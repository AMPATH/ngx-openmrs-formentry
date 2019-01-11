/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} event
     * @return {?}
     */
    AfeNgSelectComponent.prototype.getChangingText = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // console.log(event);
        this.getData(event).subscribe(function (options) {
            _this.question_options = options;
        });
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AfeNgSelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AfeNgSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AfeNgSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} changes
     * @return {?}
     */
    AfeNgSelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { };
    /**
     * @return {?}
     */
    AfeNgSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.extras) {
            if (this.extras.originalValue) {
                this.resolveSelectedOption(this.extras.originalValue).subscribe(function (option) {
                    _this.selected_question_option = option;
                });
            }
        }
    };
    /**
     * @param {?} searchText
     * @return {?}
     */
    AfeNgSelectComponent.prototype.getData = /**
     * @param {?} searchText
     * @return {?}
     */
    function (searchText) {
        var _this = this;
        this.subject = new BehaviorSubject([]);
        /** @type {?} */
        var OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe(function (options) {
            // console.log('options', options);
            /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    AfeNgSelectComponent.prototype.onValueChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { };
    /**
     * @param {?} value
     * @return {?}
     */
    AfeNgSelectComponent.prototype.resolveSelectedOption = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.subjectOption = new BehaviorSubject(null);
        /** @type {?} */
        var OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe(function (option) {
            // console.log('option', option);
            _this.subjectOption.next(option);
        }, function (error) {
            _this.subjectOption.error(error);
        });
        return this.subjectOption.asObservable();
    };
    /**
     * @return {?}
     */
    AfeNgSelectComponent.prototype.resetOptions = /**
     * @return {?}
     */
    function () {
        this.subject.next(new Array());
    };
    AfeNgSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'afe-ng-select',
                    template: "\n  ",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AfeNgSelectComponent; }),
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
    return AfeNgSelectComponent;
}());
export { AfeNgSelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUtyRTtJQUFBO1FBaUJFLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxDQUFDO0lBaUZwQyxDQUFDOzs7OztJQS9FQyw4Q0FBZTs7OztJQUFmLFVBQWdCLEtBQUs7UUFBckIsaUJBS0M7UUFKQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFPO1lBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHlDQUFVOzs7O0lBQVYsVUFBVyxHQUFRO0lBRW5CLENBQUM7Ozs7O0lBQ0QsK0NBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFNUIsQ0FBQzs7Ozs7SUFFRCxnREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTyxJQUFVLENBQUM7Ozs7O0lBRXBDLDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFZLElBQUksQ0FBQzs7OztJQUU3Qix1Q0FB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OUIsc0NBQWlCOztJQUNqQiwrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LW9wdGlvbic7XG5cbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZmUtbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZmVOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIEFmZU5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPjtcbiAgc3ViamVjdE9wdGlvbjogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj47XG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuICBASW5wdXQoKSBleHRyYXM6IGFueTtcbiAgcXVlc3Rpb25fb3B0aW9uczogYW55ID0gW107XG4gIHNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbjogYW55O1xuICBlcnJvcnM6IGFueSA9IFtdO1xuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgZ2V0Q2hhbmdpbmdUZXh0KGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHRoaXMuZ2V0RGF0YShldmVudCkuc3Vic2NyaWJlKChvcHRpb25zKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9uX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuXG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblxuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGlmICh0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpLnN1YnNjcmliZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZF9xdWVzdGlvbl9vcHRpb24gPSBvcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBnZXREYXRhKHNlYXJjaFRleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3B0aW9uW10+IHtcblxuICAgIHRoaXMuc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+KFtdKTtcblxuICAgIGNvbnN0IE9wdGlvbnNPYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dCk7XG5cbiAgICBPcHRpb25zT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAob3B0aW9ucykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9ucycsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zOiBPcHRpb25bXSA9IG5ldyBBcnJheTxPcHRpb24+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbWFwcGVkT3B0aW9ucy5wdXNoKG5ldyBPcHRpb24ob3B0aW9uc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KG1hcHBlZE9wdGlvbnMpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnN1YmplY3QuZXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZShldmVudCkgeyB9XG4gIHJlc29sdmVTZWxlY3RlZE9wdGlvbih2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxPcHRpb24+IHtcblxuICAgIHRoaXMuc3ViamVjdE9wdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPihudWxsKTtcbiAgICBjb25zdCBPcHRpb25PYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKTtcblxuICAgIE9wdGlvbk9ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgKG9wdGlvbikgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9uJywgb3B0aW9uKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLm5leHQob3B0aW9uKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdE9wdGlvbi5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHJlc2V0T3B0aW9ucygpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dChuZXcgQXJyYXk8T3B0aW9uPigpKTtcblxuICB9XG5cbn1cbiJdfQ==