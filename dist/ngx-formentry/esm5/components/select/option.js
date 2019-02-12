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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQVVJLGdCQUFZLEtBQWEsRUFBRSxLQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxxQkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQscUJBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELHdCQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCx1QkFBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsZ0NBQWU7OztJQUFmO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDO0lBQ04sQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDOzs7O0lBeENHLHVCQUFjOztJQUNkLHVCQUFjOztJQUVkLDBCQUFrQjs7SUFDbEIsNkJBQXFCOztJQUNyQiwwQkFBa0I7O0lBQ2xCLHVCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE9wdGlvbiB7XG5cbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbjtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBzaG93bjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5zaG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5zaG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVuZGVjb3JhdGVkQ29weSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=