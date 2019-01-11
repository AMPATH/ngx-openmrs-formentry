/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Option } from './option';
import { Diacritics } from './diacritics';
export class OptionList {
    /**
     * @param {?} options
     */
    constructor(options) {
        /* Consider using these for performance improvement. */
        // private _selection: Array<Option>;
        // private _filtered: Array<Option>;
        // private _value: Array<string>;
        this._highlightedOption = null;
        if (typeof options === 'undefined' || options === null) {
            options = [];
        }
        this._options = options.map((option) => {
            /** @type {?} */
            const o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });
        this.highlight();
    }
    // v0 and v1 are assumed not to be undefined or null.
    /**
     * @param {?} v0
     * @param {?} v1
     * @return {?}
     */
    static equalValues(v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        /** @type {?} */
        const a = v0.slice().sort();
        /** @type {?} */
        const b = v1.slice().sort();
        return a.every((v, i) => {
            return v === b[i];
        });
    }
    /**
     * Options. *
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getOptionsByValue(value) {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }
    /**
     * Value. *
     * @return {?}
     */
    get value() {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        v = typeof v === 'undefined' || v === null ? [] : v;
        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }
    /**
     * Selection. *
     * @return {?}
     */
    get selection() {
        return this.options.filter((option) => {
            return option.selected;
        });
    }
    /**
     * @param {?} option
     * @param {?} multiple
     * @return {?}
     */
    select(option, multiple) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    deselect(option) {
        option.selected = false;
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.options.forEach((option) => {
            option.selected = false;
        });
    }
    /**
     * Filter. *
     * @return {?}
     */
    get filtered() {
        return this.options.filter((option) => {
            return option.shown;
        });
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this.options.forEach((option) => {
                /** @type {?} */
                const l = Diacritics.strip(option.label).toUpperCase();
                /** @type {?} */
                const t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
            });
        }
        this.highlight();
    }
    /**
     * @return {?}
     */
    resetFilter() {
        this.options.forEach((option) => {
            option.shown = true;
        });
    }
    /**
     * Highlight. *
     * @return {?}
     */
    get highlightedOption() {
        return this._highlightedOption;
    }
    /**
     * @return {?}
     */
    highlight() {
        /** @type {?} */
        const option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    highlightOption(option) {
        this.clearHighlightedOption();
        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    }
    /**
     * @return {?}
     */
    highlightNextOption() {
        /** @type {?} */
        const shownOptions = this.filtered;
        /** @type {?} */
        const index = this.getHighlightedIndexFromList(shownOptions);
        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    }
    /**
     * @return {?}
     */
    highlightPreviousOption() {
        /** @type {?} */
        const shownOptions = this.filtered;
        /** @type {?} */
        const index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    getHighlightedIndexFromList(options) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @return {?}
     */
    getHighlightedIndex() {
        return this.getHighlightedIndexFromList(this.filtered);
    }
    /**
     * Util. *
     * @return {?}
     */
    hasShown() {
        return this.options.some((option) => {
            return option.shown;
        });
    }
    /**
     * @return {?}
     */
    hasSelected() {
        return this.options.some((option) => {
            return option.selected;
        });
    }
    /**
     * @return {?}
     */
    hasShownSelected() {
        return this.options.some((option) => {
            return option.shown && option.selected;
        });
    }
    /**
     * @private
     * @return {?}
     */
    getFirstShown() {
        for (const option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }
    /**
     * @private
     * @return {?}
     */
    getFirstShownSelected() {
        for (const option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OptionList.prototype._options;
    /**
     * @type {?}
     * @private
     */
    OptionList.prototype._highlightedOption;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDLE1BQU0sT0FBTyxVQUFVOzs7O0lBeUJuQixZQUFZLE9BQW1COzs7OztRQWpCdkIsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBbUJ0QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BELE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7a0JBQzdCLENBQUMsR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDeEQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNqQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7OztJQTlCRCxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQWlCLEVBQUUsRUFBaUI7UUFFbkQsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDaEI7O2NBRUssQ0FBQyxHQUFrQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFOztjQUNwQyxDQUFDLEdBQWtCLEVBQUUsQ0FBQyxLQUFLLEVB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QUFNLENBQUMsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sYUFBYTtRQUNqQixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUN6QixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBR0o7Ozs7OztJQTdORyw4QkFBZ0M7Ozs7O0lBT2hDLHdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IERpYWNyaXRpY3MgfSBmcm9tICcuL2RpYWNyaXRpY3MnO1xuXG5leHBvcnQgY2xhc3MgT3B0aW9uTGlzdCB7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogQXJyYXk8T3B0aW9uPjtcblxuICAgIC8qIENvbnNpZGVyIHVzaW5nIHRoZXNlIGZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gKi9cbiAgICAvLyBwcml2YXRlIF9zZWxlY3Rpb246IEFycmF5PE9wdGlvbj47XG4gICAgLy8gcHJpdmF0ZSBfZmlsdGVyZWQ6IEFycmF5PE9wdGlvbj47XG4gICAgLy8gcHJpdmF0ZSBfdmFsdWU6IEFycmF5PHN0cmluZz47XG5cbiAgICBwcml2YXRlIF9oaWdobGlnaHRlZE9wdGlvbjogT3B0aW9uID0gbnVsbDtcbiAgICAvLyB2MCBhbmQgdjEgYXJlIGFzc3VtZWQgbm90IHRvIGJlIHVuZGVmaW5lZCBvciBudWxsLlxuICAgIHN0YXRpYyBlcXVhbFZhbHVlcyh2MDogQXJyYXk8c3RyaW5nPiwgdjE6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcblxuICAgICAgICBpZiAodjAubGVuZ3RoICE9PSB2MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGE6IEFycmF5PHN0cmluZz4gPSB2MC5zbGljZSgpLnNvcnQoKTtcbiAgICAgICAgY29uc3QgYjogQXJyYXk8c3RyaW5nPiA9IHYxLnNsaWNlKCkuc29ydCgpO1xuXG4gICAgICAgIHJldHVybiBhLmV2ZXJ5KCh2LCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYltpXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxhbnk+KSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyB8fCBvcHRpb25zID09PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucy5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogT3B0aW9uID0gbmV3IE9wdGlvbihvcHRpb24udmFsdWUsIG9wdGlvbi5sYWJlbCk7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgby5kaXNhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucy4gKiovXG5cbiAgICBnZXQgb3B0aW9ucygpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWU6IHN0cmluZyk6IEFycmF5PE9wdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlLiAqKi9cblxuICAgIGdldCB2YWx1ZSgpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLm1hcCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbi52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHY6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgdiA9IHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsID8gW10gOiB2O1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHYuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3Rpb24uICoqL1xuXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KG9wdGlvbjogT3B0aW9uLCBtdWx0aXBsZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoIW11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdChvcHRpb246IE9wdGlvbikge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBGaWx0ZXIuICoqL1xuXG4gICAgZ2V0IGZpbHRlcmVkKCk6IEFycmF5PE9wdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIodGVybTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHRlcm0udHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGw6IHN0cmluZyA9IERpYWNyaXRpY3Muc3RyaXAob3B0aW9uLmxhYmVsKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHQ6IHN0cmluZyA9IERpYWNyaXRpY3Muc3RyaXAodGVybSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2hvd24gPSBsLmluZGV4T2YodCkgPiAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICB9XG5cbiAgICByZXNldEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLnNob3duID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEhpZ2hsaWdodC4gKiovXG5cbiAgICBnZXQgaGlnaGxpZ2h0ZWRPcHRpb24oKTogT3B0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSB0aGlzLmhhc1Nob3duU2VsZWN0ZWQoKSA/XG4gICAgICAgICAgICB0aGlzLmdldEZpcnN0U2hvd25TZWxlY3RlZCgpIDogdGhpcy5nZXRGaXJzdFNob3duKCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuY2xlYXJIaWdobGlnaHRlZE9wdGlvbigpO1xuXG4gICAgICAgIGlmIChvcHRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbi5oaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZ2hsaWdodE5leHRPcHRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNob3duT3B0aW9ucyA9IHRoaXMuZmlsdGVyZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qoc2hvd25PcHRpb25zKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSAmJiBpbmRleCA8IHNob3duT3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggKyAxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWdobGlnaHRQcmV2aW91c09wdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hvd25PcHRpb25zID0gdGhpcy5maWx0ZXJlZDtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChzaG93bk9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKHNob3duT3B0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJIaWdobGlnaHRlZE9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KG9wdGlvbnM6IEFycmF5PE9wdGlvbj4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBnZXRIaWdobGlnaHRlZEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3QodGhpcy5maWx0ZXJlZCk7XG4gICAgfVxuXG4gICAgLyoqIFV0aWwuICoqL1xuXG4gICAgaGFzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhc1Nob3duU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duICYmIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duKCk6IE9wdGlvbiB7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zaG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duU2VsZWN0ZWQoKTogT3B0aW9uIHtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNob3duICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbn1cbiJdfQ==