/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SelectQuestion } from './select-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class MultiSelectQuestion extends SelectQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'multi-select' || 'single-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    MultiSelectQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUFjOzs7O0lBSW5ELFlBQVksT0FBbUM7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLElBQUssZUFBZSxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3JELENBQUM7Q0FFSjs7O0lBVEcsc0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuL3NlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tdWx0aS1zZWxlY3Qtb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0UXVlc3Rpb24gZXh0ZW5kcyBTZWxlY3RRdWVzdGlvbiB7XG5cbiAgICBvcHRpb25zOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE11bHRpU2VsZWN0UXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnbXVsdGktc2VsZWN0JyAgfHwgJ3NpbmdsZS1zZWxlY3QnO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgW107XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG5cbn1cbiJdfQ==