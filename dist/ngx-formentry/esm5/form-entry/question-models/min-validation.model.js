import * as tslib_1 from "tslib";
import { ValidationModel } from './validation.model';
var MinValidationModel = /** @class */ (function (_super) {
    tslib_1.__extends(MinValidationModel, _super);
    function MinValidationModel(validations) {
        var _this = _super.call(this, validations) || this;
        var min = validations.min;
        _this.min = +min;
        return _this;
    }
    return MinValidationModel;
}(ValidationModel));
export { MinValidationModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXZhbGlkYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJEO0lBQXdDLDhDQUFlO0lBSXJELDRCQUFZLFdBQWdCO1FBQTVCLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBR25CO1FBRkMsSUFBTSxHQUFHLEdBQVEsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxLQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDOztJQUNsQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBd0MsZUFBZSxHQVN0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0aW9uTW9kZWwgZXh0ZW5kcyBWYWxpZGF0aW9uTW9kZWwge1xuXG4gIG1pbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25zOiBhbnkpIHtcbiAgICBzdXBlcih2YWxpZGF0aW9ucyk7XG4gICAgY29uc3QgbWluOiBhbnkgPSB2YWxpZGF0aW9ucy5taW47XG4gICAgdGhpcy5taW4gPSArbWluO1xuICB9XG59XG4iXX0=