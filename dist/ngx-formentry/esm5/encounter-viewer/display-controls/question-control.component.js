/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
var QuestionControlComponent = /** @class */ (function () {
    function QuestionControlComponent() {
        // The internal data model
        this.innerValue = '';
    }
    Object.defineProperty(QuestionControlComponent.prototype, "schema", {
        set: /**
         * @param {?} schema
         * @return {?}
         */
        function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "dataSource", {
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            this._dataSource = dataSource;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    QuestionControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.writeValue(this._value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    QuestionControlComponent.prototype.isUuid = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    // Current time string.
    // Current time string.
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    QuestionControlComponent.prototype.writeValue = 
    // Current time string.
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    function (v, arrayElement) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    /** @type {?} */
                    var val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                    if (val) {
                        this.innerValue = val.toUpperCase();
                    }
                    else {
                        this.innerValue = v;
                    }
                }
                else {
                    return this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
                }
            }
            else if (_.isArray(v)) {
                /** @type {?} */
                var arr_1 = [];
                _.forEach(v, function (el) {
                    arr_1.push(_this.writeValue(el, true));
                });
                this.innerValue = arr_1;
            }
            else if (this.isDate(v)) {
                if (!arrayElement) {
                    this.innerValue = this._dataSource.convertTime(v);
                }
                else {
                    return this._dataSource.convertTime(v);
                }
            }
            else {
                if (!arrayElement) {
                    this.innerValue = v;
                }
                else {
                    return v;
                }
            }
        }
    };
    /**
     * @param {?} str
     * @return {?}
     */
    QuestionControlComponent.prototype.isDate = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    };
    QuestionControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'question-control',
                    template: "<div>\n    {{innerValue}}\n</div>",
                    styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"]
                }] }
    ];
    /** @nocollapse */
    QuestionControlComponent.ctorParameters = function () { return []; };
    QuestionControlComponent.propDecorators = {
        schema: [{ type: Input }],
        value: [{ type: Input }],
        dataSource: [{ type: Input }]
    };
    return QuestionControlComponent;
}());
export { QuestionControlComponent };
if (false) {
    /** @type {?} */
    QuestionControlComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._schema;
    /**
     * @type {?}
     * @private
     */
    QuestionControlComponent.prototype._dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCO0lBb0JJOztRQUpPLGVBQVUsR0FBUSxFQUFFLENBQUM7SUFJYixDQUFDO0lBZGhCLHNCQUFvQiw0Q0FBTTs7Ozs7UUFBMUIsVUFBMkIsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQiwyQ0FBSzs7Ozs7UUFBekIsVUFBMEIsS0FBSztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNELHNCQUFvQixnREFBVTs7Ozs7UUFBOUIsVUFBK0IsVUFBZTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7OztJQVFELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBQ00seUNBQU07Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakYsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFDRCx1QkFBdUI7Ozs7Ozs7SUFFaEIsNkNBQVU7Ozs7Ozs7SUFBakIsVUFBa0IsQ0FBTSxFQUFFLFlBQXNCO1FBQWhELGlCQXlCQztRQXhCQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRTs7d0JBQ1gsR0FBRyxHQUNULElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ2hFLElBQUksR0FBRyxFQUFFO3dCQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUFFO3lCQUFNO3dCQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO3FCQUFFO2lCQUNoRjtxQkFBTTtvQkFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFBRTthQUNwRjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7O29CQUNqQixLQUFHLEdBQUcsRUFBRTtnQkFDZCxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFDLEVBQUU7b0JBQ2QsS0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUcsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFBRTtxQkFBTTtvQkFDM0UsT0FBUSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0M7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO3FCQUFNO29CQUMvQyxPQUFPLENBQUMsQ0FBQztpQkFDVjthQUNKO1NBRUo7SUFDSCxDQUFDOzs7OztJQUVNLHlDQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQS9ESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFFNUIsNkNBQWdEOztpQkFDakQ7Ozs7O3lCQUVFLEtBQUs7d0JBR0wsS0FBSzs2QkFHTCxLQUFLOztJQXFEUiwrQkFBQztDQUFBLEFBakVILElBaUVHO1NBNURVLHdCQUF3Qjs7O0lBV2pDLDhDQUE0Qjs7Ozs7SUFDNUIsMENBQW9COzs7OztJQUNwQiwyQ0FBcUI7Ozs7O0lBQ3JCLCtDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3F1ZXN0aW9uLWNvbnRyb2wnLFxuICAgIHN0eWxlVXJsczogWycuL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgfSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgc2NoZW1hKHNjaGVtYTogYW55KSB7XG4gICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBhbnkpIHtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cbiAgICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICAgIHB1YmxpYyBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuICAgIHByaXZhdGUgX3NjaGVtYTogYW55O1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2U7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICBwdWJsaWMgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ3VycmVudCB0aW1lIHN0cmluZy5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbikge1xuICAgICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmlzVXVpZCh2KSkge1xuICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID1cbiAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTtcbiAgICAgICAgICAgICAgaWYgKHZhbCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2YWwudG9VcHBlckNhc2UoKTsgfSBlbHNlIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfVxuICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICBfLmZvckVhY2godiwgKGVsKSA9PiB7XG4gICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMud3JpdGVWYWx1ZShlbCwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSBhcnI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpOyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0RhdGUoc3RyOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlLmlzRGF0ZShzdHIpICYmICFfLmlzTnVtYmVyKHN0cik7XG4gICAgfVxuXG4gIH1cbiJdfQ==