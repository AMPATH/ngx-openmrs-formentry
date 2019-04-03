/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE1BQU07Ozs7SUFrQ0YsWUFBWSxPQUFvQjtRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztJQUMzRCxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLENBQVU7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUNELDJCQUEyQixDQUFDLENBQVc7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDSjs7O0lBeERHLDRCQUFhOztJQUNiLDZCQUFlOztJQUNmLHVDQUFzQjs7SUFDdEIsaUNBQWdCOztJQUNoQixtQ0FBa0I7O0lBQ2xCLDhCQUFhOztJQUNiLGdDQUFlOztJQUNmLGdDQUFlOztJQUNmLHlDQUF3Qjs7SUFDeEIsNEJBQVc7O0lBQ1gsc0NBQXFCOztJQUNyQiwyQkFBWTs7SUFBSSw2QkFBWTs7SUFFNUIsNkJBQWU7O0lBQ2YscUNBQXNCOztJQUV0QixvQ0FBbUI7O0lBQ25CLHFDQUFvQjs7SUFDcEIsNkNBQWdDOztJQUNoQywrQ0FBa0M7O0lBQ2xDLDJDQUEwQjs7SUFDMUIsOEJBQWE7O0lBQ2Isa0NBQW9COztJQUNwQix5Q0FBd0I7O0lBRXhCLG1DQUE2Qjs7SUFDN0Isa0NBQW9DOztJQUNwQyxnQ0FBbUI7O0lBQ25CLDRCQUF3Qjs7SUFDeEIsK0JBQTJCOztJQUMzQiwyQ0FBNkI7O0lBQzdCLCtCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvYmFzZS1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25CYXNlIGltcGxlbWVudHMgQmFzZU9wdGlvbnMge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgb3JkZXI/OiBudW1iZXI7XHJcbiAgICBxdWVzdGlvbk9wdGlvbnM/OiBhbnk7XHJcbiAgICBxdWVzdGlvbnM/OiBhbnk7XHJcbiAgICBwbGFjZWhvbGRlcj86IGFueTtcclxuICAgIGhpZGRlbj86IGFueTtcclxuICAgIHNob3dUaW1lPzogYW55O1xyXG4gICAgc2hvd1dlZWs/OiBhbnk7XHJcbiAgICBoaXN0b3JpY2FsRGlzcGxheT86IGFueTtcclxuICAgIHJvd3M/OiBhbnk7XHJcbiAgICBzaG93V2Vla3NBZGRlcj86IGFueTtcclxuICAgIGtleTogc3RyaW5nOyAgICBhbGVydD86IGFueTtcclxuXHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIHJlbmRlcmluZ1R5cGU6IHN0cmluZztcclxuXHJcbiAgICBkZWZhdWx0VmFsdWU/OiBhbnk7XHJcbiAgICBvcmlnaW5hbFZhbHVlPzogYW55O1xyXG4gICAgZW5hYmxlSGlzdG9yaWNhbFZhbHVlPzogYm9vbGVhbjtcclxuICAgIHNob3dIaXN0b3JpY2FsVmFsdWVEYXRlPzogYm9vbGVhbjtcclxuICAgIGhpc3RvcmljYWxEYXRhVmFsdWU/OiBhbnk7XHJcbiAgICBleHRyYXM/OiBhbnk7XHJcbiAgICBkYXRhU291cmNlPzogc3RyaW5nO1xyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM/OiBhbnk7XHJcblxyXG4gICAgY29udHJvbFR5cGU/OiBBZmVDb250cm9sVHlwZTtcclxuICAgIHZhbGlkYXRvcnM/OiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+O1xyXG4gICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgaGlkZT86IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgICBkaXNhYmxlPzogc3RyaW5nIHwgYm9vbGVhbjtcclxuICAgIGNhbGN1bGF0ZUV4cHJlc3Npb24/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gb3B0aW9ucy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gb3B0aW9ucy5vcmlnaW5hbFZhbHVlO1xyXG4gICAgICAgIHRoaXMuZXh0cmFzID0gb3B0aW9ucy5leHRyYXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gb3B0aW9ucy50eXBlO1xyXG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXkgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgJyc7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzID0gb3B0aW9ucy52YWxpZGF0b3JzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xyXG4gICAgICAgIHRoaXMuaGlkZSA9IG9wdGlvbnMuaGlkZTtcclxuICAgICAgICB0aGlzLmRpc2FibGUgPSBvcHRpb25zLmRpc2FibGU7XHJcbiAgICAgICAgdGhpcy5hbGVydCA9IG9wdGlvbnMuYWxlcnQ7XHJcbiAgICAgICAgdGhpcy5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3B0aW9ucy5oaXN0b3JpY2FsRGF0YVZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRXhwcmVzc2lvbiA9IG9wdGlvbnMuY2FsY3VsYXRlRXhwcmVzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIaXN0b3JpY2FsVmFsdWUodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlSGlzdG9yaWNhbFZhbHVlID0gdjtcclxuICAgIH1cclxuICAgIHNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSh2PzogYm9vbGVhbikge1xyXG4gICAgICB0aGlzLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlID0gdiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHY7XHJcbiAgICB9XHJcbn1cclxuIl19