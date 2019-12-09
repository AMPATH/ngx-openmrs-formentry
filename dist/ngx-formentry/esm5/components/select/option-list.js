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
            var o = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });
        this.highlight();
    }
    // v0 and v1 are assumed not to be undefined or null.
    OptionList.equalValues = function (v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        var a = v0.slice().sort();
        var b = v1.slice().sort();
        return a.every(function (v, i) {
            return v === b[i];
        });
    };
    Object.defineProperty(OptionList.prototype, "options", {
        /** Options. **/
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.getOptionsByValue = function (value) {
        return this.options.filter(function (option) {
            return option.value === value;
        });
    };
    Object.defineProperty(OptionList.prototype, "value", {
        /** Value. **/
        get: function () {
            return this.selection.map(function (selectedOption) {
                return selectedOption.value;
            });
        },
        set: function (v) {
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
        get: function () {
            return this.options.filter(function (option) {
                return option.selected;
            });
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.select = function (option, multiple) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    };
    OptionList.prototype.deselect = function (option) {
        option.selected = false;
    };
    OptionList.prototype.clearSelection = function () {
        this.options.forEach(function (option) {
            option.selected = false;
        });
    };
    Object.defineProperty(OptionList.prototype, "filtered", {
        /** Filter. **/
        get: function () {
            return this.options.filter(function (option) {
                return option.shown;
            });
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.filter = function (term) {
        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this.options.forEach(function (option) {
                var l = Diacritics.strip(option.label).toUpperCase();
                var t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
            });
        }
        this.highlight();
    };
    OptionList.prototype.resetFilter = function () {
        this.options.forEach(function (option) {
            option.shown = true;
        });
    };
    Object.defineProperty(OptionList.prototype, "highlightedOption", {
        /** Highlight. **/
        get: function () {
            return this._highlightedOption;
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.highlight = function () {
        var option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    };
    OptionList.prototype.highlightOption = function (option) {
        this.clearHighlightedOption();
        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    };
    OptionList.prototype.highlightNextOption = function () {
        var shownOptions = this.filtered;
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    };
    OptionList.prototype.highlightPreviousOption = function () {
        var shownOptions = this.filtered;
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    };
    OptionList.prototype.clearHighlightedOption = function () {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    };
    OptionList.prototype.getHighlightedIndexFromList = function (options) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    };
    OptionList.prototype.getHighlightedIndex = function () {
        return this.getHighlightedIndexFromList(this.filtered);
    };
    /** Util. **/
    OptionList.prototype.hasShown = function () {
        return this.options.some(function (option) {
            return option.shown;
        });
    };
    OptionList.prototype.hasSelected = function () {
        return this.options.some(function (option) {
            return option.selected;
        });
    };
    OptionList.prototype.hasShownSelected = function () {
        return this.options.some(function (option) {
            return option.shown && option.selected;
        });
    };
    OptionList.prototype.getFirstShown = function () {
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
    OptionList.prototype.getFirstShownSelected = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDO0lBeUJJLG9CQUFZLE9BQW1CO1FBdEIvQix1REFBdUQ7UUFDdkQscUNBQXFDO1FBQ3JDLG9DQUFvQztRQUNwQyxpQ0FBaUM7UUFFekIsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBbUJ0QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BELE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQy9CLElBQU0sQ0FBQyxHQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUEvQkQscURBQXFEO0lBQzlDLHNCQUFXLEdBQWxCLFVBQW1CLEVBQWlCLEVBQUUsRUFBaUI7UUFFbkQsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFNLENBQUMsR0FBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxD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LE1BQU07WUFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUM1QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sa0NBQWEsR0FBckI7OztZQUNJLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFBLGdCQUFBLDRCQUFFO2dCQUE5QixJQUFNLE1BQU0sV0FBQTtnQkFDYixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7Ozs7Ozs7OztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTywwQ0FBcUIsR0FBN0I7OztZQUNJLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFBLGdCQUFBLDRCQUFFO2dCQUE5QixJQUFNLE1BQU0sV0FBQTtnQkFDYixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7Ozs7Ozs7OztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHTCxpQkFBQztBQUFELENBQUMsQUE5TkQsSUE4TkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBEaWFjcml0aWNzIH0gZnJvbSAnLi9kaWFjcml0aWNzJztcblxuZXhwb3J0IGNsYXNzIE9wdGlvbkxpc3Qge1xuICAgIHByaXZhdGUgX29wdGlvbnM6IEFycmF5PE9wdGlvbj47XG5cbiAgICAvKiBDb25zaWRlciB1c2luZyB0aGVzZSBmb3IgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQuICovXG4gICAgLy8gcHJpdmF0ZSBfc2VsZWN0aW9uOiBBcnJheTxPcHRpb24+O1xuICAgIC8vIHByaXZhdGUgX2ZpbHRlcmVkOiBBcnJheTxPcHRpb24+O1xuICAgIC8vIHByaXZhdGUgX3ZhbHVlOiBBcnJheTxzdHJpbmc+O1xuXG4gICAgcHJpdmF0ZSBfaGlnaGxpZ2h0ZWRPcHRpb246IE9wdGlvbiA9IG51bGw7XG4gICAgLy8gdjAgYW5kIHYxIGFyZSBhc3N1bWVkIG5vdCB0byBiZSB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICBzdGF0aWMgZXF1YWxWYWx1ZXModjA6IEFycmF5PHN0cmluZz4sIHYxOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKHYwLmxlbmd0aCAhPT0gdjEubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhOiBBcnJheTxzdHJpbmc+ID0gdjAuc2xpY2UoKS5zb3J0KCk7XG4gICAgICAgIGNvbnN0IGI6IEFycmF5PHN0cmluZz4gPSB2MS5zbGljZSgpLnNvcnQoKTtcblxuICAgICAgICByZXR1cm4gYS5ldmVyeSgodiwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGJbaV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8YW55Pikge1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG86IE9wdGlvbiA9IG5ldyBPcHRpb24ob3B0aW9uLnZhbHVlLCBvcHRpb24ubGFiZWwpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIG8uZGlzYWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgfVxuXG4gICAgLyoqIE9wdGlvbnMuICoqL1xuXG4gICAgZ2V0IG9wdGlvbnMoKTogQXJyYXk8T3B0aW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIGdldE9wdGlvbnNCeVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBWYWx1ZS4gKiovXG5cbiAgICBnZXQgdmFsdWUoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5tYXAoKHNlbGVjdGVkT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb24udmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcgfHwgdiA9PT0gbnVsbCA/IFtdIDogdjtcblxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2LmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogU2VsZWN0aW9uLiAqKi9cblxuICAgIGdldCBzZWxlY3Rpb24oKTogQXJyYXk8T3B0aW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdChvcHRpb246IE9wdGlvbiwgbXVsdGlwbGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCFtdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGVzZWxlY3Qob3B0aW9uOiBPcHRpb24pIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogRmlsdGVyLiAqKi9cblxuICAgIGdldCBmaWx0ZXJlZCgpOiBBcnJheTxPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zaG93bjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyKHRlcm06IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0ZXJtLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsOiBzdHJpbmcgPSBEaWFjcml0aWNzLnN0cmlwKG9wdGlvbi5sYWJlbCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0OiBzdHJpbmcgPSBEaWFjcml0aWNzLnN0cmlwKHRlcm0pLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNob3duID0gbC5pbmRleE9mKHQpID4gLTE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIG9wdGlvbi5zaG93biA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBIaWdobGlnaHQuICoqL1xuXG4gICAgZ2V0IGhpZ2hsaWdodGVkT3B0aW9uKCk6IE9wdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbjtcbiAgICB9XG5cbiAgICBoaWdobGlnaHQoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gdGhpcy5oYXNTaG93blNlbGVjdGVkKCkgP1xuICAgICAgICAgICAgdGhpcy5nZXRGaXJzdFNob3duU2VsZWN0ZWQoKSA6IHRoaXMuZ2V0Rmlyc3RTaG93bigpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihvcHRpb24pO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodE9wdGlvbihvcHRpb246IE9wdGlvbikge1xuICAgICAgICB0aGlzLmNsZWFySGlnaGxpZ2h0ZWRPcHRpb24oKTtcblxuICAgICAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb24uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWdobGlnaHROZXh0T3B0aW9uKCkge1xuICAgICAgICBjb25zdCBzaG93bk9wdGlvbnMgPSB0aGlzLmZpbHRlcmVkO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KHNob3duT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEgJiYgaW5kZXggPCBzaG93bk9wdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24oc2hvd25PcHRpb25zW2luZGV4ICsgMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNob3duT3B0aW9ucyA9IHRoaXMuZmlsdGVyZWQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qoc2hvd25PcHRpb25zKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFySGlnaGxpZ2h0ZWRPcHRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkT3B0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkT3B0aW9uLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhpZ2hsaWdodGVkSW5kZXhGcm9tTGlzdChvcHRpb25zOiBBcnJheTxPcHRpb24+KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV0uaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZ2V0SGlnaGxpZ2h0ZWRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KHRoaXMuZmlsdGVyZWQpO1xuICAgIH1cblxuICAgIC8qKiBVdGlsLiAqKi9cblxuICAgIGhhc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zaG93bjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNTaG93blNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zaG93biAmJiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rmlyc3RTaG93bigpOiBPcHRpb24ge1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2hvd24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rmlyc3RTaG93blNlbGVjdGVkKCk6IE9wdGlvbiB7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zaG93biAmJiBvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG59XG4iXX0=