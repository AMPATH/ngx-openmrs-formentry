import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
var QuestionControlComponent = /** @class */ (function () {
    function QuestionControlComponent() {
        // The internal data model
        this.innerValue = '';
    }
    Object.defineProperty(QuestionControlComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "value", {
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionControlComponent.prototype, "dataSource", {
        set: function (dataSource) {
            this._dataSource = dataSource;
        },
        enumerable: true,
        configurable: true
    });
    QuestionControlComponent.prototype.ngOnInit = function () {
        this.writeValue(this._value);
    };
    QuestionControlComponent.prototype.isUuid = function (value) {
        if (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    // Current time string.
    QuestionControlComponent.prototype.writeValue = function (v, arrayElement) {
        var _this = this;
        if (v !== this.innerValue) {
            if (this.isUuid(v)) {
                if (!arrayElement) {
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
    QuestionControlComponent.prototype.isDate = function (str) {
        return this._dataSource.isDate(str) && !_.isNumber(str);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], QuestionControlComponent.prototype, "schema", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], QuestionControlComponent.prototype, "value", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], QuestionControlComponent.prototype, "dataSource", null);
    QuestionControlComponent = tslib_1.__decorate([
        Component({
            selector: 'question-control',
            template: "<div>\n    {{innerValue}}\n</div>",
            styles: ["input{border:none;box-shadow:none;color:#000;background:#fff!important;padding-top:23px;display:block;position:relative}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], QuestionControlComponent);
    return QuestionControlComponent;
}());
export { QuestionControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2Rpc3BsYXktY29udHJvbHMvcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBTzVCO0lBZUk7UUFMQSwwQkFBMEI7UUFDbkIsZUFBVSxHQUFRLEVBQUUsQ0FBQztJQUliLENBQUM7SUFkUCxzQkFBVyw0Q0FBTTthQUFqQixVQUFrQixNQUFXO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBQ1Esc0JBQVcsMkNBQUs7YUFBaEIsVUFBaUIsS0FBSztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNRLHNCQUFXLGdEQUFVO2FBQXJCLFVBQXNCLFVBQWU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFRRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNNLHlDQUFNLEdBQWIsVUFBYyxLQUFhO1FBQ3pCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pGLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ0QsdUJBQXVCO0lBRWhCLDZDQUFVLEdBQWpCLFVBQWtCLENBQU0sRUFBRSxZQUFzQjtRQUFoRCxpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLElBQU0sR0FBRyxHQUNULElBQUksQ0FBQyxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakUsSUFBSSxHQUFHLEVBQUU7d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQUU7eUJBQU07d0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7cUJBQUU7aUJBQ2hGO3FCQUFNO29CQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUFFO2FBQ3BGO2lCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsSUFBTSxLQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQUMsRUFBRTtvQkFDZCxLQUFHLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBRyxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUFFO3FCQUFNO29CQUMzRSxPQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQzthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7aUJBQUU7cUJBQU07b0JBQy9DLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2FBQ0o7U0FFSjtJQUNILENBQUM7SUFFTSx5Q0FBTSxHQUFiLFVBQWMsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBekRRO1FBQVIsS0FBSyxFQUFFOzs7MERBRVA7SUFDUTtRQUFSLEtBQUssRUFBRTs7O3lEQUVQO0lBQ1E7UUFBUixLQUFLLEVBQUU7Ozs4REFFUDtJQVRRLHdCQUF3QjtRQUxwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBRTVCLDZDQUFnRDs7U0FDakQsQ0FBQzs7T0FDUyx3QkFBd0IsQ0E0RGxDO0lBQUQsK0JBQUM7Q0FBQSxBQTVESCxJQTRERztTQTVEVSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdxdWVzdGlvbi1jb250cm9sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9xdWVzdGlvbi1jb250cm9sLmNvbXBvbmVudC5jc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcXVlc3Rpb24tY29udHJvbC5jb21wb25lbnQuaHRtbCcsXG4gIH0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xuICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xuICAgIH1cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZTogYW55KSB7XG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgICBwdWJsaWMgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcbiAgICBwcml2YXRlIF9zY2hlbWE6IGFueTtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlO1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgcHVibGljIGlzVXVpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2OiBhbnksIGFycmF5RWxlbWVudD86IGJvb2xlYW4pIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc1V1aWQodikpIHtcbiAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9XG4gICAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKHYsIHRoaXMuX3NjaGVtYSk7XG4gICAgICAgICAgICAgIGlmICh2YWwpIHsgdGhpcy5pbm5lclZhbHVlID0gdmFsLnRvVXBwZXJDYXNlKCk7IH0gZWxzZSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHY7IH1cbiAgICAgICAgICAgIH0gZWxzZSB7IHJldHVybiB0aGlzLl9kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSh2LCB0aGlzLl9zY2hlbWEpOyB9XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICAgICAgXy5mb3JFYWNoKHYsIChlbCkgPT4ge1xuICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLndyaXRlVmFsdWUoZWwsIHRydWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gYXJyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUodikpIHtcbiAgICAgICAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHsgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5fZGF0YVNvdXJjZS5jb252ZXJ0VGltZSh2KTsgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fZGF0YVNvdXJjZS5jb252ZXJ0VGltZSh2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7IHRoaXMuaW5uZXJWYWx1ZSA9IHY7IH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXRlKHN0cjogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5pc0RhdGUoc3RyKSAmJiAhXy5pc051bWJlcihzdHIpO1xuICAgIH1cblxuICB9XG4iXX0=