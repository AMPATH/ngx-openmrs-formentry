/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';
var AfeNgSelectComponent = /** @class */ (function () {
    function AfeNgSelectComponent() {
        this.question_options = [];
        this.errors = [];
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
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
        this.getData(event).subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            _this.question_options = options;
        }));
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
                this.resolveSelectedOption(this.extras.originalValue).subscribe((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    _this.selected_question_option = option;
                }));
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
        OptionsObservable.subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            // console.log('options', options);
            /** @type {?} */
            var mappedOptions = new Array();
            for (var i = 0; i < options.length; i++) {
                mappedOptions.push(new Option(options[i]));
            }
            _this.subject.next(mappedOptions);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.subject.error(error);
        }));
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
        OptionObservable.subscribe((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            // console.log('option', option);
            _this.subjectOption.next(option);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.subjectOption.error(error);
        }));
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
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return AfeNgSelectComponent; })),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUtyRTtJQUFBO1FBc0JFLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlOzs7O1FBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxFQUFDO0lBaUZwQyxDQUFDOzs7OztJQS9FQyw4Q0FBZTs7OztJQUFmLFVBQWdCLEtBQUs7UUFBckIsaUJBS0M7UUFKQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxPQUFPO1lBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHlDQUFVOzs7O0lBQVYsVUFBVyxHQUFRO0lBRW5CLENBQUM7Ozs7O0lBQ0QsK0NBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFNUIsQ0FBQzs7Ozs7SUFFRCxnREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTyxJQUFVLENBQUM7Ozs7O0lBRXBDLDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFZLElBQUksQ0FBQzs7OztJQUU3Qix1Q0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUzs7OztnQkFBQyxVQUFDLE1BQU07b0JBQ3JFLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLENBQUMsRUFBQyxDQUFDO1lBQ0wsQ0FBQztRQUVILENBQUM7SUFFSCxDQUFDOzs7OztJQUVELHNDQUFPOzs7O0lBQVAsVUFBUSxVQUFrQjtRQUExQixpQkFzQkM7UUFwQkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQzs7WUFFM0MsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLFNBQVM7Ozs7UUFDekIsVUFBQyxPQUFPOzs7Z0JBRUEsYUFBYSxHQUFhLElBQUksS0FBSyxFQUFVO1lBRW5ELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7Ozs7UUFDRCxVQUFDLEtBQUs7WUFDSixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQ0YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsNENBQWE7Ozs7SUFBYixVQUFjLEtBQUssSUFBSSxDQUFDOzs7OztJQUN4QixvREFBcUI7Ozs7SUFBckIsVUFBc0IsS0FBVTtRQUFoQyxpQkFnQkM7UUFkQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDOztZQUNqRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUVwRSxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQ3hCLFVBQUMsTUFBTTtZQUNMLGlDQUFpQztZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7O1FBQ0QsVUFBQyxLQUFLO1lBQ0osS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUNGLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsMkNBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQVUsQ0FBQyxDQUFDO0lBRXpDLENBQUM7O2dCQXhHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSw4UUFNVDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLEVBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUFDO2lCQUNMOzs7NkJBSUUsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7O0lBcUZSLDJCQUFDO0NBQUEsQUExR0QsSUEwR0M7U0ExRlksb0JBQW9COzs7SUFDL0IsdUNBQW1DOztJQUNuQyw2Q0FBdUM7O0lBQ3ZDLDBDQUFnQzs7SUFDaEMsd0NBQTJCOztJQUMzQixzQ0FBcUI7O0lBQ3JCLGdEQUEyQjs7SUFDM0Isd0RBQThCOztJQUM5QixzQ0FBaUI7O0lBQ2pCLCtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LW9wdGlvbic7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZmUtbmctc2VsZWN0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy1zZWxlY3RcclxuICAgICAgICAgICAgICAgICAgIChzZWFyY2hJbnB1dFRleHQpPVwiZ2V0Q2hhbmdpbmdUZXh0KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwicXVlc3Rpb25fb3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCIgPlxyXG4gICAgICAgICAgICA8L25nLXNlbGVjdD5cclxuICBgLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWZlTmdTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFmZU5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+O1xyXG4gIHN1YmplY3RPcHRpb246IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+O1xyXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZXh0cmFzOiBhbnk7XHJcbiAgcXVlc3Rpb25fb3B0aW9uczogYW55ID0gW107XHJcbiAgc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uOiBhbnk7XHJcbiAgZXJyb3JzOiBhbnkgPSBbXTtcclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcblxyXG4gIGdldENoYW5naW5nVGV4dChldmVudCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgdGhpcy5nZXREYXRhKGV2ZW50KS5zdWJzY3JpYmUoKG9wdGlvbnMpID0+IHtcclxuICAgICAgdGhpcy5xdWVzdGlvbl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG5cclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG5cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmV4dHJhcykge1xyXG4gICAgICBpZiAodGhpcy5leHRyYXMub3JpZ2luYWxWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMucmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpLnN1YnNjcmliZSgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbiA9IG9wdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnZXREYXRhKHNlYXJjaFRleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8T3B0aW9uW10+IHtcclxuXHJcbiAgICB0aGlzLnN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wdGlvbltdPihbXSk7XHJcblxyXG4gICAgY29uc3QgT3B0aW9uc09ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0KTtcclxuXHJcbiAgICBPcHRpb25zT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXHJcbiAgICAgIChvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zOiBPcHRpb25bXSA9IG5ldyBBcnJheTxPcHRpb24+KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbWFwcGVkT3B0aW9ucy5wdXNoKG5ldyBPcHRpb24ob3B0aW9uc1tpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChtYXBwZWRPcHRpb25zKTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0LmVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgb25WYWx1ZUNoYW5nZShldmVudCkgeyB9XHJcbiAgcmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPE9wdGlvbj4ge1xyXG5cclxuICAgIHRoaXMuc3ViamVjdE9wdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPihudWxsKTtcclxuICAgIGNvbnN0IE9wdGlvbk9ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgIE9wdGlvbk9ic2VydmFibGUuc3Vic2NyaWJlKFxyXG4gICAgICAob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29wdGlvbicsIG9wdGlvbik7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLm5leHQob3B0aW9uKTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJqZWN0T3B0aW9uLmVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0T3B0aW9uLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRPcHRpb25zKCkge1xyXG4gICAgdGhpcy5zdWJqZWN0Lm5leHQobmV3IEFycmF5PE9wdGlvbj4oKSk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19