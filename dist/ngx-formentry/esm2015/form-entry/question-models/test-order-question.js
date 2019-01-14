/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class TestOrderQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    TestOrderQuestion.prototype.orderType;
    /** @type {?} */
    TestOrderQuestion.prototype.selectableOrders;
    /** @type {?} */
    TestOrderQuestion.prototype.orderSettingUuid;
    /** @type {?} */
    TestOrderQuestion.prototype.rendering;
    /** @type {?} */
    TestOrderQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSx3QkFBeUIsU0FBUSxZQUFZOzs7O0lBTS9DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3JELENBQUM7Q0FDSjs7O0lBZkcsc0NBQWtCOztJQUNsQiw2Q0FBdUQ7O0lBQ3ZELDZDQUF5Qjs7SUFDekIsc0NBQWtCOztJQUNsQixvQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBUZXN0T3JkZXJRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGVzdC1vcmRlci1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVGVzdE9yZGVyUXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xuICAgIG9yZGVyVHlwZTogc3RyaW5nO1xuICAgIHNlbGVjdGFibGVPcmRlcnM6IHsgY29uY2VwdDogc3RyaW5nLCBsYWJlbDogc3RyaW5nIH1bXTtcbiAgICBvcmRlclNldHRpbmdVdWlkOiBzdHJpbmc7XG4gICAgcmVuZGVyaW5nOiBzdHJpbmc7XG4gICAgb3B0aW9uczogYW55W107XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVGVzdE9yZGVyUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBvcHRpb25zLm9yZGVyVHlwZTtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlT3JkZXJzID0gb3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnM7XG4gICAgICAgIHRoaXMub3JkZXJTZXR0aW5nVXVpZCA9IG9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSBvcHRpb25zLm9yZGVyU2V0dGluZ1V1aWQ7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG59XG4iXX0=