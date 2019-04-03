/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Option = /** @class */ (function () {
    function Option(value, label) {
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
    Option.prototype.show = /**
     * @return {?}
     */
    function () {
        this.shown = true;
    };
    /**
     * @return {?}
     */
    Option.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.shown = false;
    };
    /**
     * @return {?}
     */
    Option.prototype.disable = /**
     * @return {?}
     */
    function () {
        this.disabled = true;
    };
    /**
     * @return {?}
     */
    Option.prototype.enable = /**
     * @return {?}
     */
    function () {
        this.disabled = false;
    };
    /**
     * @return {?}
     */
    Option.prototype.undecoratedCopy = /**
     * @return {?}
     */
    function () {
        return {
            label: this.label,
            value: this.value
        };
    };
    return Option;
}());
export { Option };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQVVJLGdCQUFZLEtBQWEsRUFBRSxLQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxxQkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQscUJBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELHdCQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCx1QkFBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsZ0NBQWU7OztJQUFmO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDO0lBQ04sQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDOzs7O0lBeENHLHVCQUFjOztJQUNkLHVCQUFjOztJQUVkLDBCQUFrQjs7SUFDbEIsNkJBQXFCOztJQUNyQiwwQkFBa0I7O0lBQ2xCLHVCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE9wdGlvbiB7XHJcblxyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbjtcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgc2hvd246IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgbGFiZWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5zaG93biA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnNob3duID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVuZGVjb3JhdGVkQ29weSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==