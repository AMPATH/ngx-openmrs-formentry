/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQVVJLGdCQUFZLEtBQWEsRUFBRSxLQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxxQkFBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQscUJBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELHdCQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCx1QkFBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsZ0NBQWU7OztJQUFmO1FBQ0ksT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQzs7OztJQXhDRyx1QkFBYzs7SUFDZCx1QkFBYzs7SUFFZCwwQkFBa0I7O0lBQ2xCLDZCQUFxQjs7SUFDckIsMEJBQWtCOztJQUNsQix1QkFBZSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBPcHRpb24ge1xuXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW47XG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgc2hvd246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc2hvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuc2hvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB1bmRlY29yYXRlZENvcHkoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19