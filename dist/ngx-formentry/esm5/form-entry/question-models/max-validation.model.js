import * as tslib_1 from "tslib";
import { ValidationModel } from './validation.model';
var MaxValidationModel = /** @class */ (function (_super) {
    tslib_1.__extends(MaxValidationModel, _super);
    function MaxValidationModel(validations) {
        var _this = _super.call(this, validations) || this;
        var max = validations.max;
        _this.max = +max;
        return _this;
    }
    return MaxValidationModel;
}(ValidationModel));
export { MaxValidationModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LXZhbGlkYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFBd0MsOENBQWU7SUFJckQsNEJBQVksV0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FHbkI7UUFGQyxJQUFNLEdBQUcsR0FBUSxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0lBQ2xCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFURCxDQUF3QyxlQUFlLEdBU3REIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIE1heFZhbGlkYXRpb25Nb2RlbCBleHRlbmRzIFZhbGlkYXRpb25Nb2RlbCB7XG5cbiAgbWF4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHZhbGlkYXRpb25zKTtcbiAgICBjb25zdCBtYXg6IGFueSA9IHZhbGlkYXRpb25zLm1heDtcbiAgICB0aGlzLm1heCA9ICttYXg7XG4gIH1cbn1cbiJdfQ==