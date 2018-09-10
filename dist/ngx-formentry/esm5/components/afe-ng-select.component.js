/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ OptionsObservable = this.dataSource.searchOptions(searchText);
        OptionsObservable.subscribe(function (options) {
            // console.log('options', options);
            var /** @type {?} */ mappedOptions = new Array();
            for (var /** @type {?} */ i = 0; i < options.length; i++) {
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
        var /** @type {?} */ OptionObservable = this.dataSource.resolveSelectedValue(value);
        OptionObservable.subscribe(function (option) {
            // console.log('option', option);
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
                    template: "<ng-select\n                   (searchInputText)=\"getChangingText($event)\"\n                    (ngModelChange)=\"onValueChange($event)\"\n                    [options]=\"question_options\"\n                    [multiple]=\"multiple\" >\n            </ng-select>\n  ",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AfeNgSelectComponent; }),
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
    return AfeNgSelectComponent;
}());
export { AfeNgSelectComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O2dDQTJCM0MsRUFBRTtzQkFFWixFQUFFOytCQUNFLFVBQUMsQ0FBTSxLQUFROzs7Ozs7SUFFakMsOENBQWU7Ozs7SUFBZixVQUFnQixLQUFLO1FBQXJCLGlCQUtDOztRQUhDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBTztZQUNwQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELHlDQUFVOzs7O0lBQVYsVUFBVyxHQUFRO0tBRWxCOzs7OztJQUNELCtDQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0tBRTNCOzs7OztJQUVELGdEQUFpQjs7OztJQUFqQixVQUFrQixFQUFPLEtBQVc7Ozs7O0lBRXBDLDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFZLEtBQUs7Ozs7SUFFN0IsdUNBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFUQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07b0JBQ3JFLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7aUJBQ3hDLENBQUMsQ0FBQzthQUNKO1NBRUY7S0FFRjs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsVUFBa0I7UUFBMUIsaUJBc0JDO1FBcEJDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFFakQscUJBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsaUJBQWlCLENBQUMsU0FBUyxDQUN6QixVQUFDLE9BQU87O1lBRU4scUJBQU0sYUFBYSxHQUFhLElBQUksS0FBSyxFQUFVLENBQUM7WUFFcEQsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFDRCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCLENBQ0YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxLQUFLLEtBQUs7Ozs7O0lBQ3hCLG9EQUFxQjs7OztJQUFyQixVQUFzQixLQUFVO1FBQWhDLGlCQWdCQztRQWRDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDdkQscUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQ3hCLFVBQUMsTUFBTTs7WUFFTCxBQURBLGlDQUFpQztZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDLENBQ0YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzFDOzs7O0lBRUQsMkNBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO0tBRXhDOztnQkF4R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsOFFBTVQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDOzRCQUNuRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFBQztpQkFDTDs7OzsrQkFJRSxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs7K0JBL0JSOztTQTBCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LW9wdGlvbic7XG5cbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhZmUtbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8bmctc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgKHNlYXJjaElucHV0VGV4dCk9XCJnZXRDaGFuZ2luZ1RleHQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInF1ZXN0aW9uX29wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiA+XG4gICAgICAgICAgICA8L25nLXNlbGVjdD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZmVOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIEFmZU5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPjtcbiAgc3ViamVjdE9wdGlvbjogQmVoYXZpb3JTdWJqZWN0PE9wdGlvbj47XG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuICBASW5wdXQoKSBleHRyYXM6IGFueTtcbiAgcXVlc3Rpb25fb3B0aW9uczogYW55ID0gW107XG4gIHNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbjogYW55O1xuICBlcnJvcnM6IGFueSA9IFtdO1xuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cbiAgZ2V0Q2hhbmdpbmdUZXh0KGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHRoaXMuZ2V0RGF0YShldmVudCkuc3Vic2NyaWJlKChvcHRpb25zKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9uX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuXG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblxuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGlmICh0aGlzLmV4dHJhcy5vcmlnaW5hbFZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpLnN1YnNjcmliZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZF9xdWVzdGlvbl9vcHRpb24gPSBvcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBnZXREYXRhKHNlYXJjaFRleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3B0aW9uW10+IHtcblxuICAgIHRoaXMuc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+KFtdKTtcblxuICAgIGNvbnN0IE9wdGlvbnNPYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dCk7XG5cbiAgICBPcHRpb25zT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAob3B0aW9ucykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9ucycsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zOiBPcHRpb25bXSA9IG5ldyBBcnJheTxPcHRpb24+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbWFwcGVkT3B0aW9ucy5wdXNoKG5ldyBPcHRpb24ob3B0aW9uc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KG1hcHBlZE9wdGlvbnMpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnN1YmplY3QuZXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZShldmVudCkgeyB9XG4gIHJlc29sdmVTZWxlY3RlZE9wdGlvbih2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxPcHRpb24+IHtcblxuICAgIHRoaXMuc3ViamVjdE9wdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPihudWxsKTtcbiAgICBjb25zdCBPcHRpb25PYnNlcnZhYmxlID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKTtcblxuICAgIE9wdGlvbk9ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgKG9wdGlvbikgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0aW9uJywgb3B0aW9uKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLm5leHQob3B0aW9uKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLmVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdE9wdGlvbi5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHJlc2V0T3B0aW9ucygpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dChuZXcgQXJyYXk8T3B0aW9uPigpKTtcblxuICB9XG5cbn1cbiJdfQ==