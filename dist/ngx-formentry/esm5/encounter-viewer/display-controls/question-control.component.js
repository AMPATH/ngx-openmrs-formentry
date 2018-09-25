/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
var QuestionControlComponent = /** @class */ (function () {
    function QuestionControlComponent() {
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
    /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    QuestionControlComponent.prototype.writeValue = /**
     * @param {?} v
     * @param {?=} arrayElement
     * @return {?}
     */
    function (v, arrayElement) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
                    var /** @type {?} */ val = this._dataSource.resolveSelectedValueFromSchema(v, this._schema);
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
                var /** @type {?} */ arr_1 = [];
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
                    styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"],
                    template: "<div>\n    {{innerValue}}\n</div>",
                },] },
    ];
    /** @nocollapse */
    QuestionControlComponent.ctorParameters = function () { return []; };
    QuestionControlComponent.propDecorators = {
        "schema": [{ type: Input },],
        "value": [{ type: Input },],
        "dataSource": [{ type: Input },],
    };
    return QuestionControlComponent;
}());
export { QuestionControlComponent };
function QuestionControlComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    QuestionControlComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    QuestionControlComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    QuestionControlComponent.propDecorators;
    /** @type {?} */
    QuestionControlComponent.prototype.innerValue;
    /** @type {?} */
    QuestionControlComponent.prototype._value;
    /** @type {?} */
    QuestionControlComponent.prototype._schema;
    /** @type {?} */
    QuestionControlComponent.prototype._dataSource;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOztJQXdCeEI7MEJBSnlCLEVBQUU7S0FJWDswQkFkSSw0Q0FBTTs7Ozs7a0JBQUMsTUFBVztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7MEJBRUosMkNBQUs7Ozs7O2tCQUFDLEtBQUs7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Ozs7OzBCQUVGLGdEQUFVOzs7OztrQkFBQyxVQUFlO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDOzs7Ozs7OztJQVNoQywyQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5Qjs7Ozs7SUFDTSx5Q0FBTTs7OztjQUFDLEtBQWE7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDs7Ozs7OztJQUlJLDZDQUFVOzs7OztjQUFDLENBQU0sRUFBRSxZQUFzQjs7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLHFCQUFNLEdBQUcsR0FDVCxJQUFJLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQUU7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7cUJBQUU7aUJBQ2hGO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQUU7YUFDcEY7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLHFCQUFNLEtBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsVUFBQyxFQUFFO29CQUNkLEtBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBRyxDQUFDO2FBQ3ZCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUUsTUFBTSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQzthQUNKO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2FBQ0o7U0FFSjs7Ozs7O0lBR0kseUNBQU07Ozs7Y0FBQyxHQUFXO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7OztnQkFoRTdELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixNQUFNLEVBQUUsQ0FBQywwSEFBMEgsQ0FBQztvQkFDcEksUUFBUSxFQUFFLG1DQUVQO2lCQUNKOzs7OzsyQkFFRSxLQUFLOzBCQUdMLEtBQUs7K0JBR0wsS0FBSzs7bUNBbEJWOztTQVdhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdxdWVzdGlvbi1jb250cm9sJyxcclxuICAgIHN0eWxlczogW2BpbnB1dHtib3JkZXI6bm9uZTtib3gtc2hhZG93Om5vbmU7Y29sb3I6IzAwMDtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O3BhZGRpbmctdG9wOjIzcHg7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX1gXSxcclxuICAgIHRlbXBsYXRlOiBgPGRpdj5cclxuICAgIHt7aW5uZXJWYWx1ZX19XHJcbjwvZGl2PmAsXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xyXG4gICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZTogYW55KSB7XHJcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcclxuICAgIHB1YmxpYyBpbm5lclZhbHVlOiBhbnkgPSAnJztcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XHJcbiAgICBwcml2YXRlIF9zY2hlbWE6IGFueTtcclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2U7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl92YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMzYgJiYgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJiB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHY6IGFueSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbikge1xyXG4gICAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5pc1V1aWQodikpIHtcclxuICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICBjb25zdCB2YWwgPVxyXG4gICAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2YWwudG9VcHBlckNhc2UoKTsgfSBlbHNlIHsgdGhpcy5pbm5lclZhbHVlID0gdjsgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEodiwgdGhpcy5fc2NoZW1hKTsgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyID0gW107XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaCh2LCAoZWwpID0+IHtcclxuICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLndyaXRlVmFsdWUoZWwsIHRydWUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IGFycjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUodikpIHtcclxuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLl9kYXRhU291cmNlLmNvbnZlcnRUaW1lKHYpOyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX2RhdGFTb3VyY2UuY29udmVydFRpbWUodik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkgeyB0aGlzLmlubmVyVmFsdWUgPSB2OyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0RhdGUoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuaXNEYXRlKHN0cikgJiYgIV8uaXNOdW1iZXIoc3RyKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4iXX0=