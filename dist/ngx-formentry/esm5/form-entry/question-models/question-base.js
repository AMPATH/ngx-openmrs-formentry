/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var QuestionBase = /** @class */ (function () {
    function QuestionBase(options) {
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
    QuestionBase.prototype.setHistoricalValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.enableHistoricalValue = v;
    };
    /**
     * @param {?=} v
     * @return {?}
     */
    QuestionBase.prototype.showHistoricalEncounterDate = /**
     * @param {?=} v
     * @return {?}
     */
    function (v) {
        this.showHistoricalValueDate = v === undefined ? true : v;
    };
    return QuestionBase;
}());
export { QuestionBase };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLElBQUE7SUFrQ0ksc0JBQVksT0FBb0I7UUFFNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7S0FDMUQ7Ozs7O0lBRUQseUNBQWtCOzs7O0lBQWxCLFVBQW1CLENBQVU7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFDRCxrREFBMkI7Ozs7SUFBM0IsVUFBNEIsQ0FBVztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7dUJBNURMO0lBNkRDLENBQUE7QUF6REQsd0JBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvYmFzZS1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25CYXNlIGltcGxlbWVudHMgQmFzZU9wdGlvbnMge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgb3JkZXI/OiBudW1iZXI7XHJcbiAgICBxdWVzdGlvbk9wdGlvbnM/OiBhbnk7XHJcbiAgICBxdWVzdGlvbnM/OiBhbnk7XHJcbiAgICBwbGFjZWhvbGRlcj86IGFueTtcclxuICAgIGhpZGRlbj86IGFueTtcclxuICAgIHNob3dUaW1lPzogYW55O1xyXG4gICAgc2hvd1dlZWs/OiBhbnk7XHJcbiAgICBoaXN0b3JpY2FsRGlzcGxheT86IGFueTtcclxuICAgIHJvd3M/OiBhbnk7XHJcbiAgICBzaG93V2Vla3NBZGRlcj86IGFueTtcclxuICAgIGtleTogc3RyaW5nOyAgICBhbGVydD86IGFueTtcclxuXHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIHJlbmRlcmluZ1R5cGU6IHN0cmluZztcclxuXHJcbiAgICBkZWZhdWx0VmFsdWU/OiBhbnk7XHJcbiAgICBvcmlnaW5hbFZhbHVlPzogYW55O1xyXG4gICAgZW5hYmxlSGlzdG9yaWNhbFZhbHVlPzogYm9vbGVhbjtcclxuICAgIHNob3dIaXN0b3JpY2FsVmFsdWVEYXRlPzogYm9vbGVhbjtcclxuICAgIGhpc3RvcmljYWxEYXRhVmFsdWU/OiBhbnk7XHJcbiAgICBleHRyYXM/OiBhbnk7XHJcbiAgICBkYXRhU291cmNlPzogc3RyaW5nO1xyXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM/OiBhbnk7XHJcblxyXG4gICAgY29udHJvbFR5cGU/OiBBZmVDb250cm9sVHlwZTtcclxuICAgIHZhbGlkYXRvcnM/OiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+O1xyXG4gICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgaGlkZT86IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgICBkaXNhYmxlPzogc3RyaW5nIHwgYm9vbGVhbjtcclxuICAgIGNhbGN1bGF0ZUV4cHJlc3Npb24/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gb3B0aW9ucy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gb3B0aW9ucy5vcmlnaW5hbFZhbHVlO1xyXG4gICAgICAgIHRoaXMuZXh0cmFzID0gb3B0aW9ucy5leHRyYXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gb3B0aW9ucy50eXBlO1xyXG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXkgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgJyc7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JzID0gb3B0aW9ucy52YWxpZGF0b3JzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xyXG4gICAgICAgIHRoaXMuaGlkZSA9IG9wdGlvbnMuaGlkZTtcclxuICAgICAgICB0aGlzLmRpc2FibGUgPSBvcHRpb25zLmRpc2FibGU7XHJcbiAgICAgICAgdGhpcy5hbGVydCA9IG9wdGlvbnMuYWxlcnQ7XHJcbiAgICAgICAgdGhpcy5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3B0aW9ucy5oaXN0b3JpY2FsRGF0YVZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRXhwcmVzc2lvbiA9IG9wdGlvbnMuY2FsY3VsYXRlRXhwcmVzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIaXN0b3JpY2FsVmFsdWUodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlSGlzdG9yaWNhbFZhbHVlID0gdjtcclxuICAgIH1cclxuICAgIHNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSh2PzogYm9vbGVhbikge1xyXG4gICAgICB0aGlzLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlID0gdiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHY7XHJcbiAgICB9XHJcbn1cclxuIl19