/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.defaultValue = options.defaultValue;
        this.originalValue = options.originalValue;
        this.extras = options.extras;
        this.renderingType = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
        this.hide = options.hide;
        this.disable = options.disable;
        this.alert = options.alert;
        this.historicalDataValue = options.historicalDataValue;
        this.calculateExpression = options.calculateExpression;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setHistoricalValue(v) {
        this.enableHistoricalValue = v;
    }
    /**
     * @param {?=} v
     * @return {?}
     */
    showHistoricalEncounterDate(v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    }
}
if (false) {
    /** @type {?} */
    QuestionBase.prototype.type;
    /** @type {?} */
    QuestionBase.prototype.order;
    /** @type {?} */
    QuestionBase.prototype.questionOptions;
    /** @type {?} */
    QuestionBase.prototype.questions;
    /** @type {?} */
    QuestionBase.prototype.placeholder;
    /** @type {?} */
    QuestionBase.prototype.hidden;
    /** @type {?} */
    QuestionBase.prototype.showTime;
    /** @type {?} */
    QuestionBase.prototype.showWeek;
    /** @type {?} */
    QuestionBase.prototype.historicalDisplay;
    /** @type {?} */
    QuestionBase.prototype.rows;
    /** @type {?} */
    QuestionBase.prototype.showWeeksAdder;
    /** @type {?} */
    QuestionBase.prototype.key;
    /** @type {?} */
    QuestionBase.prototype.alert;
    /** @type {?} */
    QuestionBase.prototype.label;
    /** @type {?} */
    QuestionBase.prototype.renderingType;
    /** @type {?} */
    QuestionBase.prototype.defaultValue;
    /** @type {?} */
    QuestionBase.prototype.originalValue;
    /** @type {?} */
    QuestionBase.prototype.enableHistoricalValue;
    /** @type {?} */
    QuestionBase.prototype.showHistoricalValueDate;
    /** @type {?} */
    QuestionBase.prototype.historicalDataValue;
    /** @type {?} */
    QuestionBase.prototype.extras;
    /** @type {?} */
    QuestionBase.prototype.dataSource;
    /** @type {?} */
    QuestionBase.prototype.dataSourceOptions;
    /** @type {?} */
    QuestionBase.prototype.controlType;
    /** @type {?} */
    QuestionBase.prototype.validators;
    /** @type {?} */
    QuestionBase.prototype.required;
    /** @type {?} */
    QuestionBase.prototype.hide;
    /** @type {?} */
    QuestionBase.prototype.disable;
    /** @type {?} */
    QuestionBase.prototype.calculateExpression;
    /** @type {?} */
    QuestionBase.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE1BQU0sT0FBTyxZQUFZOzs7O0lBa0NyQixZQUFZLE9BQW9CO1FBRTVCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0lBQzNELENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsQ0FBVTtRQUN6QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBQ0QsMkJBQTJCLENBQUMsQ0FBVztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUNKOzs7SUF4REcsNEJBQWE7O0lBQ2IsNkJBQWU7O0lBQ2YsdUNBQXNCOztJQUN0QixpQ0FBZ0I7O0lBQ2hCLG1DQUFrQjs7SUFDbEIsOEJBQWE7O0lBQ2IsZ0NBQWU7O0lBQ2YsZ0NBQWU7O0lBQ2YseUNBQXdCOztJQUN4Qiw0QkFBVzs7SUFDWCxzQ0FBcUI7O0lBQ3JCLDJCQUFZOztJQUFJLDZCQUFZOztJQUU1Qiw2QkFBZTs7SUFDZixxQ0FBc0I7O0lBRXRCLG9DQUFtQjs7SUFDbkIscUNBQW9COztJQUNwQiw2Q0FBZ0M7O0lBQ2hDLCtDQUFrQzs7SUFDbEMsMkNBQTBCOztJQUMxQiw4QkFBYTs7SUFDYixrQ0FBb0I7O0lBQ3BCLHlDQUF3Qjs7SUFFeEIsbUNBQTZCOztJQUM3QixrQ0FBb0M7O0lBQ3BDLGdDQUFtQjs7SUFDbkIsNEJBQXdCOztJQUN4QiwrQkFBMkI7O0lBQzNCLDJDQUE2Qjs7SUFDN0IsK0JBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9iYXNlLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25CYXNlIGltcGxlbWVudHMgQmFzZU9wdGlvbnMge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBvcmRlcj86IG51bWJlcjtcbiAgICBxdWVzdGlvbk9wdGlvbnM/OiBhbnk7XG4gICAgcXVlc3Rpb25zPzogYW55O1xuICAgIHBsYWNlaG9sZGVyPzogYW55O1xuICAgIGhpZGRlbj86IGFueTtcbiAgICBzaG93VGltZT86IGFueTtcbiAgICBzaG93V2Vlaz86IGFueTtcbiAgICBoaXN0b3JpY2FsRGlzcGxheT86IGFueTtcbiAgICByb3dzPzogYW55O1xuICAgIHNob3dXZWVrc0FkZGVyPzogYW55O1xuICAgIGtleTogc3RyaW5nOyAgICBhbGVydD86IGFueTtcblxuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIHJlbmRlcmluZ1R5cGU6IHN0cmluZztcblxuICAgIGRlZmF1bHRWYWx1ZT86IGFueTtcbiAgICBvcmlnaW5hbFZhbHVlPzogYW55O1xuICAgIGVuYWJsZUhpc3RvcmljYWxWYWx1ZT86IGJvb2xlYW47XG4gICAgc2hvd0hpc3RvcmljYWxWYWx1ZURhdGU/OiBib29sZWFuO1xuICAgIGhpc3RvcmljYWxEYXRhVmFsdWU/OiBhbnk7XG4gICAgZXh0cmFzPzogYW55O1xuICAgIGRhdGFTb3VyY2U/OiBzdHJpbmc7XG4gICAgZGF0YVNvdXJjZU9wdGlvbnM/OiBhbnk7XG5cbiAgICBjb250cm9sVHlwZT86IEFmZUNvbnRyb2xUeXBlO1xuICAgIHZhbGlkYXRvcnM/OiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+O1xuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgICBoaWRlPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgICBkaXNhYmxlPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgICBjYWxjdWxhdGVFeHByZXNzaW9uPzogc3RyaW5nO1xuICAgIG9wdGlvbnM/OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCYXNlT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gb3B0aW9ucy5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHRoaXMub3JpZ2luYWxWYWx1ZSA9IG9wdGlvbnMub3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgdGhpcy5leHRyYXMgPSBvcHRpb25zLmV4dHJhcztcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5IHx8ICcnO1xuICAgICAgICB0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCAnJztcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzID0gb3B0aW9ucy52YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICB0aGlzLnJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZDtcbiAgICAgICAgdGhpcy5oaWRlID0gb3B0aW9ucy5oaWRlO1xuICAgICAgICB0aGlzLmRpc2FibGUgPSBvcHRpb25zLmRpc2FibGU7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBvcHRpb25zLmFsZXJ0O1xuICAgICAgICB0aGlzLmhpc3RvcmljYWxEYXRhVmFsdWUgPSBvcHRpb25zLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRXhwcmVzc2lvbiA9IG9wdGlvbnMuY2FsY3VsYXRlRXhwcmVzc2lvbjtcbiAgICB9XG5cbiAgICBzZXRIaXN0b3JpY2FsVmFsdWUodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSA9IHY7XG4gICAgfVxuICAgIHNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSh2PzogYm9vbGVhbikge1xuICAgICAgdGhpcy5zaG93SGlzdG9yaWNhbFZhbHVlRGF0ZSA9IHYgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB2O1xuICAgIH1cbn1cbiJdfQ==