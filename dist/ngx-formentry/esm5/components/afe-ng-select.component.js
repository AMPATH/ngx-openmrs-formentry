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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWZlLW5nLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FmZS1uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUtyRTtJQUFBO1FBc0JFLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUUzQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlOzs7O1FBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxFQUFDO0lBaUZwQyxDQUFDOzs7OztJQS9FQyw4Q0FBZTs7OztJQUFmLFVBQWdCLEtBQUs7UUFBckIsaUJBS0M7UUFKQyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxPQUFPO1lBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHlDQUFVOzs7O0lBQVYsVUFBVyxHQUFRO0lBRW5CLENBQUM7Ozs7O0lBQ0QsK0NBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFNUIsQ0FBQzs7Ozs7SUFFRCxnREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTyxJQUFVLENBQUM7Ozs7O0lBRXBDLDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFZLElBQUksQ0FBQzs7OztJQUU3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QW9COzs7SUFDL0IsdUNBQW1DOztJQUNuQyw2Q0FBdUM7O0lBQ3ZDLDBDQUFnQzs7SUFDaEMsd0NBQTJCOztJQUMzQixzQ0FBcUI7O0lBQ3JCLGdEQUEyQjs7SUFDM0Isd0RBQThCOztJQUM5QixzQ0FBaUI7O0lBQ2pCLCtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9zZWxlY3Qtb3B0aW9uJztcblxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FmZS1uZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxuZy1zZWxlY3RcbiAgICAgICAgICAgICAgICAgICAoc2VhcmNoSW5wdXRUZXh0KT1cImdldENoYW5naW5nVGV4dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwicXVlc3Rpb25fb3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiID5cbiAgICAgICAgICAgIDwvbmctc2VsZWN0PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFmZU5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgQWZlTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuICBzdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uW10+O1xuICBzdWJqZWN0T3B0aW9uOiBCZWhhdmlvclN1YmplY3Q8T3B0aW9uPjtcbiAgQElucHV0KCkgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGV4dHJhczogYW55O1xuICBxdWVzdGlvbl9vcHRpb25zOiBhbnkgPSBbXTtcbiAgc2VsZWN0ZWRfcXVlc3Rpb25fb3B0aW9uOiBhbnk7XG4gIGVycm9yczogYW55ID0gW107XG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICBnZXRDaGFuZ2luZ1RleHQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgdGhpcy5nZXREYXRhKGV2ZW50KS5zdWJzY3JpYmUoKG9wdGlvbnMpID0+IHtcbiAgICAgIHRoaXMucXVlc3Rpb25fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG5cbiAgfVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuXG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmV4dHJhcykge1xuICAgICAgaWYgKHRoaXMuZXh0cmFzLm9yaWdpbmFsVmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlU2VsZWN0ZWRPcHRpb24odGhpcy5leHRyYXMub3JpZ2luYWxWYWx1ZSkuc3Vic2NyaWJlKChvcHRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkX3F1ZXN0aW9uX29wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldERhdGEoc2VhcmNoVGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcHRpb25bXT4ge1xuXG4gICAgdGhpcy5zdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb25bXT4oW10pO1xuXG4gICAgY29uc3QgT3B0aW9uc09ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0KTtcblxuICAgIE9wdGlvbnNPYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgIChvcHRpb25zKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcHRpb25zJywgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnM6IE9wdGlvbltdID0gbmV3IEFycmF5PE9wdGlvbj4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtYXBwZWRPcHRpb25zLnB1c2gobmV3IE9wdGlvbihvcHRpb25zW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQobWFwcGVkT3B0aW9ucyk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc3ViamVjdC5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlKGV2ZW50KSB7IH1cbiAgcmVzb2x2ZVNlbGVjdGVkT3B0aW9uKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPE9wdGlvbj4ge1xuXG4gICAgdGhpcy5zdWJqZWN0T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcHRpb24+KG51bGwpO1xuICAgIGNvbnN0IE9wdGlvbk9ic2VydmFibGUgPSB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWUpO1xuXG4gICAgT3B0aW9uT2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAob3B0aW9uKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcHRpb24nLCBvcHRpb24pO1xuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24ubmV4dChvcHRpb24pO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnN1YmplY3RPcHRpb24uZXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0T3B0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVzZXRPcHRpb25zKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KG5ldyBBcnJheTxPcHRpb24+KCkpO1xuXG4gIH1cblxufVxuIl19