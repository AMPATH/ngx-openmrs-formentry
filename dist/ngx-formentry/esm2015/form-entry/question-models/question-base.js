/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function QuestionBase_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE1BQU07Ozs7SUFrQ0YsWUFBWSxPQUFvQjtRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztLQUMxRDs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxDQUFVO1FBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7S0FDbEM7Ozs7O0lBQ0QsMkJBQTJCLENBQUMsQ0FBVztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2Jhc2Utb3B0aW9ucyc7XHJcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQmFzZSBpbXBsZW1lbnRzIEJhc2VPcHRpb25zIHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIG9yZGVyPzogbnVtYmVyO1xyXG4gICAgcXVlc3Rpb25PcHRpb25zPzogYW55O1xyXG4gICAgcXVlc3Rpb25zPzogYW55O1xyXG4gICAgcGxhY2Vob2xkZXI/OiBhbnk7XHJcbiAgICBoaWRkZW4/OiBhbnk7XHJcbiAgICBzaG93VGltZT86IGFueTtcclxuICAgIHNob3dXZWVrPzogYW55O1xyXG4gICAgaGlzdG9yaWNhbERpc3BsYXk/OiBhbnk7XHJcbiAgICByb3dzPzogYW55O1xyXG4gICAgc2hvd1dlZWtzQWRkZXI/OiBhbnk7XHJcbiAgICBrZXk6IHN0cmluZzsgICAgYWxlcnQ/OiBhbnk7XHJcblxyXG4gICAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgICByZW5kZXJpbmdUeXBlOiBzdHJpbmc7XHJcblxyXG4gICAgZGVmYXVsdFZhbHVlPzogYW55O1xyXG4gICAgb3JpZ2luYWxWYWx1ZT86IGFueTtcclxuICAgIGVuYWJsZUhpc3RvcmljYWxWYWx1ZT86IGJvb2xlYW47XHJcbiAgICBzaG93SGlzdG9yaWNhbFZhbHVlRGF0ZT86IGJvb2xlYW47XHJcbiAgICBoaXN0b3JpY2FsRGF0YVZhbHVlPzogYW55O1xyXG4gICAgZXh0cmFzPzogYW55O1xyXG4gICAgZGF0YVNvdXJjZT86IHN0cmluZztcclxuICAgIGRhdGFTb3VyY2VPcHRpb25zPzogYW55O1xyXG5cclxuICAgIGNvbnRyb2xUeXBlPzogQWZlQ29udHJvbFR5cGU7XHJcbiAgICB2YWxpZGF0b3JzPzogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPjtcclxuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICAgIGhpZGU/OiBzdHJpbmcgfCBib29sZWFuO1xyXG4gICAgZGlzYWJsZT86IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgICBjYWxjdWxhdGVFeHByZXNzaW9uPzogc3RyaW5nO1xyXG4gICAgb3B0aW9ucz86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCYXNlT3B0aW9ucykge1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxWYWx1ZSA9IG9wdGlvbnMub3JpZ2luYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLmV4dHJhcyA9IG9wdGlvbnMuZXh0cmFzO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9IG9wdGlvbnMudHlwZTtcclxuICAgICAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5IHx8ICcnO1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8ICcnO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9ycyA9IG9wdGlvbnMudmFsaWRhdG9ycyB8fCBbXTtcclxuICAgICAgICB0aGlzLnJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZDtcclxuICAgICAgICB0aGlzLmhpZGUgPSBvcHRpb25zLmhpZGU7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlID0gb3B0aW9ucy5kaXNhYmxlO1xyXG4gICAgICAgIHRoaXMuYWxlcnQgPSBvcHRpb25zLmFsZXJ0O1xyXG4gICAgICAgIHRoaXMuaGlzdG9yaWNhbERhdGFWYWx1ZSA9IG9wdGlvbnMuaGlzdG9yaWNhbERhdGFWYWx1ZTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUV4cHJlc3Npb24gPSBvcHRpb25zLmNhbGN1bGF0ZUV4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGlzdG9yaWNhbFZhbHVlKHY6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSA9IHY7XHJcbiAgICB9XHJcbiAgICBzaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUodj86IGJvb2xlYW4pIHtcclxuICAgICAgdGhpcy5zaG93SGlzdG9yaWNhbFZhbHVlRGF0ZSA9IHYgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB2O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==