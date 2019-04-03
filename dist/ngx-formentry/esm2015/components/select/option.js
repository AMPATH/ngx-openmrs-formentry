/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Option {
    /**
     * @param {?} value
     * @param {?} label
     */
    constructor(value, label) {
        this.value = value;
        this.label = label;
        this.disabled = false;
        this.highlighted = false;
        this.selected = false;
        this.shown = true;
    }
    /**
     * @return {?}
     */
    show() {
        this.shown = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.shown = false;
    }
    /**
     * @return {?}
     */
    disable() {
        this.disabled = true;
    }
    /**
     * @return {?}
     */
    enable() {
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    undecoratedCopy() {
        return {
            label: this.label,
            value: this.value
        };
    }
}
if (false) {
    /** @type {?} */
    Option.prototype.value;
    /** @type {?} */
    Option.prototype.label;
    /** @type {?} */
    Option.prototype.disabled;
    /** @type {?} */
    Option.prototype.highlighted;
    /** @type {?} */
    Option.prototype.selected;
    /** @type {?} */
    Option.prototype.shown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNOzs7OztJQVVGLFlBQVksS0FBYSxFQUFFLEtBQWE7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLE1BQU0sQ0FBQztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSjs7O0lBeENHLHVCQUFjOztJQUNkLHVCQUFjOztJQUVkLDBCQUFrQjs7SUFDbEIsNkJBQXFCOztJQUNyQiwwQkFBa0I7O0lBQ2xCLHVCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE9wdGlvbiB7XHJcblxyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbjtcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgc2hvd246IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgbGFiZWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5zaG93biA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnNob3duID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVuZGVjb3JhdGVkQ29weSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==