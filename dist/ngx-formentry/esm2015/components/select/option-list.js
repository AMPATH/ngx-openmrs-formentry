/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Option } from './option';
import { Diacritics } from './diacritics';
export class OptionList {
    /**
     * @param {?} options
     */
    constructor(options) {
        this._highlightedOption = null;
        if (typeof options === 'undefined' || options === null) {
            options = [];
        }
        this._options = options.map((option) => {
            const /** @type {?} */ o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });
        this.highlight();
    }
    /**
     * @param {?} v0
     * @param {?} v1
     * @return {?}
     */
    static equalValues(v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        const /** @type {?} */ a = v0.slice().sort();
        const /** @type {?} */ b = v1.slice().sort();
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
                const /** @type {?} */ l = Diacritics.strip(option.label).toUpperCase();
                const /** @type {?} */ t = Diacritics.strip(term).toUpperCase();
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
        const /** @type {?} */ option = this.hasShownSelected() ?
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
        const /** @type {?} */ shownOptions = this.filtered;
        const /** @type {?} */ index = this.getHighlightedIndexFromList(shownOptions);
        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    }
    /**
     * @return {?}
     */
    highlightPreviousOption() {
        const /** @type {?} */ shownOptions = this.filtered;
        const /** @type {?} */ index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    }
    /**
     * @return {?}
     */
    clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getHighlightedIndexFromList(options) {
        for (let /** @type {?} */ i = 0; i < options.length; i++) {
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
     * @return {?}
     */
    getFirstShown() {
        for (const /** @type {?} */ option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    getFirstShownSelected() {
        for (const /** @type {?} */ option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }
}
function OptionList_tsickle_Closure_declarations() {
    /** @type {?} */
    OptionList.prototype._options;
    /** @type {?} */
    OptionList.prototype._highlightedOption;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDLE1BQU07Ozs7SUF5QkYsWUFBWSxPQUFtQjtrQ0FqQk0sSUFBSTtRQW1CckMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQyx1QkFBTSxDQUFDLEdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNmO1lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNwQjs7Ozs7O0lBOUJELE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBaUIsRUFBRSxFQUFpQjtRQUVuRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCx1QkFBTSxDQUFDLEdBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJ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aW1wb3J0IHsgRGlhY3JpdGljcyB9IGZyb20gJy4vZGlhY3JpdGljcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uTGlzdCB7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBBcnJheTxPcHRpb24+O1xyXG5cclxuICAgIC8qIENvbnNpZGVyIHVzaW5nIHRoZXNlIGZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gKi9cclxuICAgIC8vIHByaXZhdGUgX3NlbGVjdGlvbjogQXJyYXk8T3B0aW9uPjtcclxuICAgIC8vIHByaXZhdGUgX2ZpbHRlcmVkOiBBcnJheTxPcHRpb24+O1xyXG4gICAgLy8gcHJpdmF0ZSBfdmFsdWU6IEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgcHJpdmF0ZSBfaGlnaGxpZ2h0ZWRPcHRpb246IE9wdGlvbiA9IG51bGw7XHJcbiAgICAvLyB2MCBhbmQgdjEgYXJlIGFzc3VtZWQgbm90IHRvIGJlIHVuZGVmaW5lZCBvciBudWxsLlxyXG4gICAgc3RhdGljIGVxdWFsVmFsdWVzKHYwOiBBcnJheTxzdHJpbmc+LCB2MTogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZiAodjAubGVuZ3RoICE9PSB2MS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYTogQXJyYXk8c3RyaW5nPiA9IHYwLnNsaWNlKCkuc29ydCgpO1xyXG4gICAgICAgIGNvbnN0IGI6IEFycmF5PHN0cmluZz4gPSB2MS5zbGljZSgpLnNvcnQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGEuZXZlcnkoKHYsIGkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGJbaV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PGFueT4pIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyB8fCBvcHRpb25zID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG86IE9wdGlvbiA9IG5ldyBPcHRpb24ob3B0aW9uLnZhbHVlLCBvcHRpb24ubGFiZWwpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBvLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogT3B0aW9ucy4gKiovXHJcblxyXG4gICAgZ2V0IG9wdGlvbnMoKTogQXJyYXk8T3B0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWU6IHN0cmluZyk6IEFycmF5PE9wdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSA9PT0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFZhbHVlLiAqKi9cclxuXHJcbiAgICBnZXQgdmFsdWUoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLm1hcCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdiA9IHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsID8gW10gOiB2O1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHYuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNlbGVjdGlvbi4gKiovXHJcblxyXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBBcnJheTxPcHRpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KG9wdGlvbjogT3B0aW9uLCBtdWx0aXBsZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICghbXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2VsZWN0KG9wdGlvbjogT3B0aW9uKSB7XHJcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRmlsdGVyLiAqKi9cclxuXHJcbiAgICBnZXQgZmlsdGVyZWQoKTogQXJyYXk8T3B0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlcih0ZXJtOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKHRlcm0udHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0RmlsdGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbDogc3RyaW5nID0gRGlhY3JpdGljcy5zdHJpcChvcHRpb24ubGFiZWwpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0OiBzdHJpbmcgPSBEaWFjcml0aWNzLnN0cmlwKHRlcm0pLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uc2hvd24gPSBsLmluZGV4T2YodCkgPiAtMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmhpZ2hsaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0RmlsdGVyKCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgb3B0aW9uLnNob3duID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSGlnaGxpZ2h0LiAqKi9cclxuXHJcbiAgICBnZXQgaGlnaGxpZ2h0ZWRPcHRpb24oKTogT3B0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGlnaGxpZ2h0ZWRPcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0KCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gdGhpcy5oYXNTaG93blNlbGVjdGVkKCkgP1xyXG4gICAgICAgICAgICB0aGlzLmdldEZpcnN0U2hvd25TZWxlY3RlZCgpIDogdGhpcy5nZXRGaXJzdFNob3duKCk7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24ob3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHRPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICB0aGlzLmNsZWFySGlnaGxpZ2h0ZWRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvcHRpb24uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG9wdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0TmV4dE9wdGlvbigpIHtcclxuICAgICAgICBjb25zdCBzaG93bk9wdGlvbnMgPSB0aGlzLmZpbHRlcmVkO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qoc2hvd25PcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEgJiYgaW5kZXggPCBzaG93bk9wdGlvbnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggKyAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodFByZXZpb3VzT3B0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3duT3B0aW9ucyA9IHRoaXMuZmlsdGVyZWQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChzaG93bk9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKHNob3duT3B0aW9uc1tpbmRleCAtIDFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhckhpZ2hsaWdodGVkT3B0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkT3B0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0ZWRPcHRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChvcHRpb25zOiBBcnJheTxPcHRpb24+KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGlnaGxpZ2h0ZWRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3QodGhpcy5maWx0ZXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFV0aWwuICoqL1xyXG5cclxuICAgIGhhc1Nob3duKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2hvd247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTaG93blNlbGVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2hvd24gJiYgb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rmlyc3RTaG93bigpOiBPcHRpb24ge1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnNob3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Rmlyc3RTaG93blNlbGVjdGVkKCk6IE9wdGlvbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2hvd24gJiYgb3B0aW9uLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19