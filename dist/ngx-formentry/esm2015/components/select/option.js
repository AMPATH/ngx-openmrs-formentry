/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3Qvb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sTUFBTTs7Ozs7SUFVZixZQUFZLEtBQWEsRUFBRSxLQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKOzs7SUF4Q0csdUJBQWM7O0lBQ2QsdUJBQWM7O0lBRWQsMEJBQWtCOztJQUNsQiw2QkFBcUI7O0lBQ3JCLDBCQUFrQjs7SUFDbEIsdUJBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgT3B0aW9uIHtcblxuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGhpZ2hsaWdodGVkOiBib29sZWFuO1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIHNob3duOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgbGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLnNob3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnNob3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdW5kZWNvcmF0ZWRDb3B5KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==