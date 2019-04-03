/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._options = options.map((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            /** @type {?} */
            var o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        }));
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
        return a.every((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        function (v, i) {
            return v === b[i];
        }));
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
        return this.options.filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.value === value;
        }));
    };
    Object.defineProperty(OptionList.prototype, "value", {
        /** Value. **/
        get: /**
         * Value. *
         * @return {?}
         */
        function () {
            return this.selection.map((/**
             * @param {?} selectedOption
             * @return {?}
             */
            function (selectedOption) {
                return selectedOption.value;
            }));
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = typeof v === 'undefined' || v === null ? [] : v;
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                option.selected = v.indexOf(option.value) > -1;
            }));
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
            return this.options.filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                return option.selected;
            }));
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
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            option.selected = false;
        }));
    };
    Object.defineProperty(OptionList.prototype, "filtered", {
        /** Filter. **/
        get: /**
         * Filter. *
         * @return {?}
         */
        function () {
            return this.options.filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                return option.shown;
            }));
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
            this.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                /** @type {?} */
                var l = Diacritics.strip(option.label).toUpperCase();
                /** @type {?} */
                var t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
            }));
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
        this.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            option.shown = true;
        }));
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
        return this.options.some((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.shown;
        }));
    };
    /**
     * @return {?}
     */
    OptionList.prototype.hasSelected = /**
     * @return {?}
     */
    function () {
        return this.options.some((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.selected;
        }));
    };
    /**
     * @return {?}
     */
    OptionList.prototype.hasShownSelected = /**
     * @return {?}
     */
    function () {
        return this.options.some((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.shown && option.selected;
        }));
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
        try {
            for (var _a = tslib_1.__values(this.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                var option = _b.value;
                if (option.shown) {
                    return option;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _c;
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
        try {
            for (var _a = tslib_1.__values(this.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                var option = _b.value;
                if (option.shown && option.selected) {
                    return option;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
        var e_2, _c;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxQztJQXlCSSxvQkFBWSxPQUFtQjtRQXRCL0IsdURBQXVEO1FBQ3ZELHFDQUFxQztRQUNyQyxvQ0FBb0M7UUFDcEMsaUNBQWlDO1FBRXpCLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQW1CdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLE1BQU07O2dCQUN6QixDQUFDLEdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBL0JELHFEQUFxRDs7Ozs7OztJQUM5QyxzQkFBVzs7Ozs7OztJQUFsQixVQUFtQixFQUFpQixFQUFFLEVBQWlCO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDOztZQUVLLENBQUMsR0FBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRTs7WUFDcEMsQ0FBQyxHQUFrQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFO1FBRTFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSzs7Ozs7UUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQXNCRCxzQkFBSSwrQkFBTztRQUZYLGdCQUFnQjs7Ozs7UUFFaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7Ozs7SUFFRCxzQ0FBaUI7Ozs7SUFBakIsVUFBa0IsS0FBYTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxNQUFNO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFJRCxzQkFBSSw2QkFBSztRQUZULGNBQWM7Ozs7O1FBRWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxjQUFjO2dCQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUNoQyxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7Ozs7O1FBRUQsVUFBVSxDQUFnQjtZQUN0QixDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssV0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsTUFBTTtnQkFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7OztPQVJBO0lBWUQsc0JBQUksaUNBQVM7UUFGYixrQkFBa0I7Ozs7O1FBRWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUMsTUFBTTtnQkFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FBQTs7Ozs7O0lBRUQsMkJBQU07Ozs7O0lBQU4sVUFBTyxNQUFjLEVBQUUsUUFBaUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELDZCQUFROzs7O0lBQVIsVUFBUyxNQUFjO1FBQ25CLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxtQ0FBYzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE1BQU07WUFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQsc0JBQUksZ0NBQVE7UUFGWixlQUFlOzs7OztRQUVmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUMsTUFBTTtnQkFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FBQTs7Ozs7SUFFRCwyQkFBTTs7OztJQUFOLFVBQU8sSUFBWTtRQUVmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLE1BQU07O29CQUNsQixDQUFDLEdBQVcsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFOztvQkFDeEQsQ0FBQyxHQUFXLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFO2dCQUN0RCxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxnQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE1BQU07WUFDeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQsc0JBQUkseUNBQWlCO1FBRnJCLGtCQUFrQjs7Ozs7UUFFbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ25DLENBQUM7OztPQUFBOzs7O0lBRUQsOEJBQVM7OztJQUFUOztZQUNVLE1BQU0sR0FBVyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxvQ0FBZTs7OztJQUFmLFVBQWdCLE1BQWM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUNyQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHdDQUFtQjs7O0lBQW5COztZQUNVLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUTs7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUM7UUFFNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCw0Q0FBdUI7OztJQUF2Qjs7WUFDVSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVE7O1lBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sMkNBQXNCOzs7O0lBQTlCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNuQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sZ0RBQTJCOzs7OztJQUFuQyxVQUFvQyxPQUFzQjtRQUN0RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNiLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELHdDQUFtQjs7O0lBQW5CO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGFBQWE7Ozs7O0lBRWIsNkJBQVE7Ozs7SUFBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLE1BQU07WUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsZ0NBQVc7OztJQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsTUFBTTtZQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxxQ0FBZ0I7OztJQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLE1BQU07WUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sa0NBQWE7Ozs7SUFBckI7O1lBQ0ksR0FBRyxDQUFDLENBQWlCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFBLGdCQUFBO2dCQUE1QixJQUFNLE1BQU0sV0FBQTtnQkFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDZixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2FBQ0o7Ozs7Ozs7OztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2hCLENBQUM7Ozs7O0lBRU8sMENBQXFCOzs7O0lBQTdCOztZQUNJLEdBQUcsQ0FBQyxDQUFpQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQTtnQkFBNUIsSUFBTSxNQUFNLFdBQUE7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQzthQUNKOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNoQixDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQUFDLEFBOU5ELElBOE5DOzs7Ozs7O0lBN05HLDhCQUFnQzs7Ozs7SUFPaEMsd0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xyXG5pbXBvcnQgeyBEaWFjcml0aWNzIH0gZnJvbSAnLi9kaWFjcml0aWNzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25MaXN0IHtcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IEFycmF5PE9wdGlvbj47XHJcblxyXG4gICAgLyogQ29uc2lkZXIgdXNpbmcgdGhlc2UgZm9yIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiAqL1xyXG4gICAgLy8gcHJpdmF0ZSBfc2VsZWN0aW9uOiBBcnJheTxPcHRpb24+O1xyXG4gICAgLy8gcHJpdmF0ZSBfZmlsdGVyZWQ6IEFycmF5PE9wdGlvbj47XHJcbiAgICAvLyBwcml2YXRlIF92YWx1ZTogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBwcml2YXRlIF9oaWdobGlnaHRlZE9wdGlvbjogT3B0aW9uID0gbnVsbDtcclxuICAgIC8vIHYwIGFuZCB2MSBhcmUgYXNzdW1lZCBub3QgdG8gYmUgdW5kZWZpbmVkIG9yIG51bGwuXHJcbiAgICBzdGF0aWMgZXF1YWxWYWx1ZXModjA6IEFycmF5PHN0cmluZz4sIHYxOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmICh2MC5sZW5ndGggIT09IHYxLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhOiBBcnJheTxzdHJpbmc+ID0gdjAuc2xpY2UoKS5zb3J0KCk7XHJcbiAgICAgICAgY29uc3QgYjogQXJyYXk8c3RyaW5nPiA9IHYxLnNsaWNlKCkuc29ydCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gYS5ldmVyeSgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYltpXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8YW55Pikge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnIHx8IG9wdGlvbnMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMubWFwKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbzogT3B0aW9uID0gbmV3IE9wdGlvbihvcHRpb24udmFsdWUsIG9wdGlvbi5sYWJlbCk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIG8uZGlzYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmhpZ2hsaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPcHRpb25zLiAqKi9cclxuXHJcbiAgICBnZXQgb3B0aW9ucygpOiBBcnJheTxPcHRpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXRPcHRpb25zQnlWYWx1ZSh2YWx1ZTogc3RyaW5nKTogQXJyYXk8T3B0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVmFsdWUuICoqL1xyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24ubWFwKChzZWxlY3RlZE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb24udmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHY6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB2ID0gdHlwZW9mIHYgPT09ICd1bmRlZmluZWQnIHx8IHYgPT09IG51bGwgPyBbXSA6IHY7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdi5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2VsZWN0aW9uLiAqKi9cclxuXHJcbiAgICBnZXQgc2VsZWN0aW9uKCk6IEFycmF5PE9wdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3Qob3B0aW9uOiBPcHRpb24sIG11bHRpcGxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCFtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzZWxlY3Qob3B0aW9uOiBPcHRpb24pIHtcclxuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclNlbGVjdGlvbigpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBGaWx0ZXIuICoqL1xyXG5cclxuICAgIGdldCBmaWx0ZXJlZCgpOiBBcnJheTxPcHRpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2hvd247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyKHRlcm06IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodGVybS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsOiBzdHJpbmcgPSBEaWFjcml0aWNzLnN0cmlwKG9wdGlvbi5sYWJlbCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHQ6IHN0cmluZyA9IERpYWNyaXRpY3Muc3RyaXAodGVybSkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5zaG93biA9IGwuaW5kZXhPZih0KSA+IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBvcHRpb24uc2hvd24gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBIaWdobGlnaHQuICoqL1xyXG5cclxuICAgIGdldCBoaWdobGlnaHRlZE9wdGlvbigpOiBPcHRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHQoKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uOiBPcHRpb24gPSB0aGlzLmhhc1Nob3duU2VsZWN0ZWQoKSA/XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RTaG93blNlbGVjdGVkKCkgOiB0aGlzLmdldEZpcnN0U2hvd24oKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZ2hsaWdodE9wdGlvbihvcHRpb246IE9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJIaWdobGlnaHRlZE9wdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5oaWdobGlnaHRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uID0gb3B0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWdobGlnaHROZXh0T3B0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3duT3B0aW9ucyA9IHRoaXMuZmlsdGVyZWQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChzaG93bk9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSAmJiBpbmRleCA8IHNob3duT3B0aW9ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uKHNob3duT3B0aW9uc1tpbmRleCArIDFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvd25PcHRpb25zID0gdGhpcy5maWx0ZXJlZDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KHNob3duT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24oc2hvd25PcHRpb25zW2luZGV4IC0gMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFySGlnaGxpZ2h0ZWRPcHRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0ZWRPcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZE9wdGlvbi5oaWdobGlnaHRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KG9wdGlvbnM6IEFycmF5PE9wdGlvbj4pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV0uaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIaWdobGlnaHRlZEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdCh0aGlzLmZpbHRlcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVXRpbC4gKiovXHJcblxyXG4gICAgaGFzU2hvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zaG93bjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTZWxlY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1Nob3duU2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zb21lKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zaG93biAmJiBvcHRpb24uc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duKCk6IE9wdGlvbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2hvd24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGaXJzdFNob3duU2VsZWN0ZWQoKTogT3B0aW9uIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zaG93biAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=