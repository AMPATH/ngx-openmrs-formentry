/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Option } from './option';
import { Diacritics } from './diacritics';
var OptionList = /** @class */ (function () {
    function OptionList(options) {
        /* Consider using these for performance improvement. */
        // private _selection: Array<Option>;
        // private _filtered: Array<Option>;
        // private _value: Array<string>;
        this._highlightedOption = null;
        if (typeof options === 'undefined' || options === null) {
            options = [];
        }
        this._options = options.map(function (option) {
            /** @type {?} */
            var o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });
        this.highlight();
    }
    // v0 and v1 are assumed not to be undefined or null.
    // v0 and v1 are assumed not to be undefined or null.
    /**
     * @param {?} v0
     * @param {?} v1
     * @return {?}
     */
    OptionList.equalValues = 
    // v0 and v1 are assumed not to be undefined or null.
    /**
     * @param {?} v0
     * @param {?} v1
     * @return {?}
     */
    function (v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        /** @type {?} */
        var a = v0.slice().sort();
        /** @type {?} */
        var b = v1.slice().sort();
        return a.every(function (v, i) {
            return v === b[i];
        });
    };
    Object.defineProperty(OptionList.prototype, "options", {
        /** Options. **/
        get: /**
         * Options. *
         * @return {?}
         */
        function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    OptionList.prototype.getOptionsByValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.filter(function (option) {
            return option.value === value;
        });
    };
    Object.defineProperty(OptionList.prototype, "value", {
        /** Value. **/
        get: /**
         * Value. *
         * @return {?}
         */
        function () {
            return this.selection.map(function (selectedOption) {
                return selectedOption.value;
            });
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = typeof v === 'undefined' || v === null ? [] : v;
            this.options.forEach(function (option) {
                option.selected = v.indexOf(option.value) > -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionList.prototype, "selection", {
        /** Selection. **/
        get: /**
         * Selection. *
         * @return {?}
         */
        function () {
            return this.options.filter(function (option) {
                return option.selected;
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} option
     * @param {?} multiple
     * @return {?}
     */
    OptionList.prototype.select = /**
     * @param {?} option
     * @param {?} multiple
     * @return {?}
     */
    function (option, multiple) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    OptionList.prototype.deselect = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        option.selected = false;
    };
    /**
     * @return {?}
     */
    OptionList.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) {
            option.selected = false;
        });
    };
    Object.defineProperty(OptionList.prototype, "filtered", {
        /** Filter. **/
        get: /**
         * Filter. *
         * @return {?}
         */
        function () {
            return this.options.filter(function (option) {
                return option.shown;
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} term
     * @return {?}
     */
    OptionList.prototype.filter = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this.options.forEach(function (option) {
                /** @type {?} */
                var l = Diacritics.strip(option.label).toUpperCase();
                /** @type {?} */
                var t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
            });
        }
        this.highlight();
    };
    /**
     * @return {?}
     */
    OptionList.prototype.resetFilter = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) {
            option.shown = true;
        });
    };
    Object.defineProperty(OptionList.prototype, "highlightedOption", {
        /** Highlight. **/
        get: /**
         * Highlight. *
         * @return {?}
         */
        function () {
            return this._highlightedOption;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OptionList.prototype.highlight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    OptionList.prototype.highlightOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.clearHighlightedOption();
        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    };
    /**
     * @return {?}
     */
    OptionList.prototype.highlightNextOption = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var shownOptions = this.filtered;
        /** @type {?} */
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    };
    /**
     * @return {?}
     */
    OptionList.prototype.highlightPreviousOption = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var shownOptions = this.filtered;
        /** @type {?} */
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    OptionList.prototype.clearHighlightedOption = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    OptionList.prototype.getHighlightedIndexFromList = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @return {?}
     */
    OptionList.prototype.getHighlightedIndex = /**
     * @return {?}
     */
    function () {
        return this.getHighlightedIndexFromList(this.filtered);
    };
    /** Util. **/
    /**
     * Util. *
     * @return {?}
     */
    OptionList.prototype.hasShown = /**
     * Util. *
     * @return {?}
     */
    function () {
        return this.options.some(function (option) {
            return option.shown;
        });
    };
    /**
     * @return {?}
     */
    OptionList.prototype.hasSelected = /**
     * @return {?}
     */
    function () {
        return this.options.some(function (option) {
            return option.selected;
        });
    };
    /**
     * @return {?}
     */
    OptionList.prototype.hasShownSelected = /**
     * @return {?}
     */
    function () {
        return this.options.some(function (option) {
            return option.shown && option.selected;
        });
    };
    /**
     * @private
     * @return {?}
     */
    OptionList.prototype.getFirstShown = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                if (option.shown) {
                    return option;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    OptionList.prototype.getFirstShownSelected = /**
     * @private
     * @return {?}
     */
    function () {
        var e_2, _a;
        try {
            for (var _b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                if (option.shown && option.selected) {
                    return option;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    return OptionList;
}());
export { OptionList };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxQztJQXlCSSxvQkFBWSxPQUFtQjs7Ozs7UUFqQnZCLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQW1CdEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwRCxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTTs7Z0JBQ3pCLENBQUMsR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDeEQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNqQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQS9CRCxxREFBcUQ7Ozs7Ozs7SUFDOUMsc0JBQVc7Ozs7Ozs7SUFBbEIsVUFBbUIsRUFBaUIsRUFBRSxFQUFpQjtRQUVuRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNoQjs7WUFFSyxDQUFDLEdBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUU7O1lBQ3BDLENBQUMsR0FBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElB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b20gJy4vb3B0aW9uJztcbmltcG9ydCB7IERpYWNyaXRpY3MgfSBmcm9tICcuL2RpYWNyaXRpY3MnO1xuXG5leHBvcnQgY2xhc3MgT3B0aW9uTGlzdCB7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogQXJyYXk8T3B0aW9uPjtcblxuICAgIC8qIENvbnNpZGVyIHVzaW5nIHRoZXNlIGZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gKi9cbiAgICAvLyBwcml2YXRlIF9zZWxlY3Rpb246IEFycmF5PE9wdGlvbj47XG4gICAgLy8gcHJpdmF0ZSBfZmlsdGVyZWQ6IEFycmF5PE9wdGlvbj47XG4gICAgLy8gcHJpdmF0ZSBfdmFsdWU6IEFycmF5PHN0cmluZz47XG5cbiAgICBwcml2YXRlIF9oaWdobGlnaHRlZE9wdGlvbjogT3B0aW9uID0gbnVsbDtcbiAgICAvLyB2MCBhbmQgdjEgYXJlIGFzc3VtZWQgbm90IHRvIGJlIHVuZGVmaW5lZCBvciBudWxsLlxuICAgIHN0YXRpYyBlcXVhbFZhbHVlcyh2MDogQXJyYXk8c3RyaW5nPiwgdjE6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcblxuICAgICAgICBpZiAodjAubGVuZ3RoICE9PSB2MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGE6IEFycmF5PHN0cmluZz4gPSB2MC5zbGljZSgpLnNvcnQoKTtcbiAgICAgICAgY29uc3QgYjogQXJyYXk8c3RyaW5nPiA9IHYxLnNsaWNlKCkuc29ydCgpO1xuXG4gICAgICAgIHJldHVybiBhLmV2ZXJ5KCh2LCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYltpXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxhbnk+KSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyB8fCBvcHRpb25zID09PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucy5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogT3B0aW9uID0gbmV3IE9wdGlvbihvcHRpb24udmFsdWUsIG9wdGlvbi5sYWJlbCk7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgby5kaXNhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucy4gKiovXG5cbiAgICBnZXQgb3B0aW9ucygpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWU6IHN0cmluZyk6IEFycmF5PE9wdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFZhbHVlLiAqKi9cblxuICAgIGdldCB2YWx1ZSgpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLm1hcCgoc2VsZWN0ZWRPcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbi52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHY6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgdiA9IHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsID8gW10gOiB2O1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHYuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3Rpb24uICoqL1xuXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KG9wdGlvbjogT3B0aW9uLCBtdWx0aXBsZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoIW11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdChvcHRpb246IE9wdGlvbikge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBGaWx0ZXIuICoqL1xuXG4gICAgZ2V0IGZpbHRlcmVkKCk6IEFycmF5PE9wdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIodGVybTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHRlcm0udHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGw6IHN0cmluZyA9IERpYWNyaXRpY3Muc3RyaXAob3B0aW9uLmxhYmVsKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHQ6IHN0cmluZyA9IERpYWNyaXRpY3Muc3RyaXAodGVybSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2hvd24gPSBsLmluZGV4T2YodCkgPiAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICB9XG5cbiAgICByZXNldEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgb3B0aW9uLnNob3duID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEhpZ2hsaWdodC4gKiovXG5cbiAgICBnZXQgaGlnaGxpZ2h0ZWRPcHRpb24oKTogT3B0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSB0aGlzLmhhc1Nob3duU2VsZWN0ZWQoKSA/XG4gICAgICAgICAgICB0aGlzLmdldEZpcnN0U2hvd25TZWxlY3RlZCgpIDogdGhpcy5nZXRGaXJzdFNob3duKCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuY2xlYXJIaWdobGlnaHRlZE9wdGlvbigpO1xuXG4gICAgICAgIGlmIChvcHRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbi5oaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZ2hsaWdodE5leHRPcHRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNob3duT3B0aW9ucyA9IHRoaXMuZmlsdGVyZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qoc2hvd25PcHRpb25zKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSAmJiBpbmRleCA8IHNob3duT3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggKyAxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWdobGlnaHRQcmV2aW91c09wdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hvd25PcHRpb25zID0gdGhpcy5maWx0ZXJlZDtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChzaG93bk9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKHNob3duT3B0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJIaWdobGlnaHRlZE9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KG9wdGlvbnM6IEFycmF5PE9wdGlvbj4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5oaWdobGlnaHRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBnZXRIaWdobGlnaHRlZEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3QodGhpcy5maWx0ZXJlZCk7XG4gICAgfVxuXG4gICAgLyoqIFV0aWwuICoqL1xuXG4gICAgaGFzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhc1Nob3duU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNob3duICYmIG9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duKCk6IE9wdGlvbiB7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zaG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duU2VsZWN0ZWQoKTogT3B0aW9uIHtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNob3duICYmIG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbn1cbiJdfQ==