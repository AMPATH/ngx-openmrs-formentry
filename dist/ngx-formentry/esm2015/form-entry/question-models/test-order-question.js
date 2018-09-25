/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
function TestOrderQuestion_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSx3QkFBeUIsU0FBUSxZQUFZOzs7O0lBTS9DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0tBQ3BEO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBUZXN0T3JkZXJRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvdGVzdC1vcmRlci1xdWVzdGlvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGVzdE9yZGVyUXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xyXG4gICAgb3JkZXJUeXBlOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RhYmxlT3JkZXJzOiB7IGNvbmNlcHQ6IHN0cmluZywgbGFiZWw6IHN0cmluZyB9W107XHJcbiAgICBvcmRlclNldHRpbmdVdWlkOiBzdHJpbmc7XHJcbiAgICByZW5kZXJpbmc6IHN0cmluZztcclxuICAgIG9wdGlvbnM6IGFueVtdO1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVGVzdE9yZGVyUXVlc3Rpb25PcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3NlbGVjdCc7XHJcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBvcHRpb25zLm9yZGVyVHlwZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGFibGVPcmRlcnMgPSBvcHRpb25zLnNlbGVjdGFibGVPcmRlcnM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucy5vcHRpb25zO1xyXG4gICAgICAgIHRoaXMub3JkZXJTZXR0aW5nVXVpZCA9IG9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IG9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcbn1cclxuIl19