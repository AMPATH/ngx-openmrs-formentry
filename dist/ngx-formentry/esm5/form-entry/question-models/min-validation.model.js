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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXZhbGlkYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFBd0MsOENBQWU7SUFJckQsNEJBQVksV0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FHbkI7UUFGQyxJQUFNLEdBQUcsR0FBUSxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0lBQ2xCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFURCxDQUF3QyxlQUFlLEdBU3REIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIE1pblZhbGlkYXRpb25Nb2RlbCBleHRlbmRzIFZhbGlkYXRpb25Nb2RlbCB7XG5cbiAgbWluOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHZhbGlkYXRpb25zKTtcbiAgICBjb25zdCBtaW46IGFueSA9IHZhbGlkYXRpb25zLm1pbjtcbiAgICB0aGlzLm1pbiA9ICttaW47XG4gIH1cbn1cbiJdfQ==