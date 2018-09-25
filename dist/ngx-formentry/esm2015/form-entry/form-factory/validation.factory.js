/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ConditionalRequiredValidator } from '../validators/conditional-required.validator';
import { ConditionalAnsweredValidator } from '../validators/conditional-answered.validator';
import { RequiredValidator } from '../validators/required.validator';
import { DateValidator } from '../validators/date.validator';
import { MinValidator } from '../validators/min.validator';
import { MaxValidator } from '../validators/max.validator';
import { MinDateValidator } from '../validators/min-date.validator';
import { MaxDateValidator } from '../validators/max-date.validator';
import { FutureDateRestrictionValidator } from '../validators/future-date-restriction.validator';
import { JsExpressionValidator } from '../validators/js-expression.validator';
import { Messages } from '../utils/messages';
export class ValidationFactory {
    constructor() { }
    /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    getValidators(question, form) {
        const /** @type {?} */ list = [];
        if (question.validators) {
            _.forEach(question.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        list.push(this.dateValidator);
                        const /** @type {?} */ allowFutureDates = (/** @type {?} */ (validator)).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(this.jsExpressionValidator.validate(/** @type {?} */ (validator), form));
                        break;
                    case 'max':
                        list.push(this.getMaxValueValidator((/** @type {?} */ (validator)).max));
                        break;
                    case 'min':
                        list.push(this.getMinValueValidator((/** @type {?} */ (validator)).min));
                        break;
                    case 'conditionalRequired':
                        list.push(this.conditionalRequiredValidator.validate(/** @type {?} */ (validator)));
                        break;
                    case 'conditionalAnswered':
                        list.push(this.conditionalAnsweredValidator.validate(/** @type {?} */ (validator)));
                        break;
                }
            });
        }
        if (question.required && typeof (question.required) === 'string' && question.required === 'true') {
            list.push(this.requiredValidator);
        }
        else {
            // TODO - handle custom required validator
        }
        return list;
    }
    /**
     * @return {?}
     */
    get conditionalRequiredValidator() {
        return new ConditionalRequiredValidator();
    }
    /**
     * @return {?}
     */
    get conditionalAnsweredValidator() {
        return new ConditionalAnsweredValidator();
    }
    /**
     * @return {?}
     */
    get requiredValidator() {
        return new RequiredValidator().validate;
    }
    /**
     * @return {?}
     */
    get dateValidator() {
        return new DateValidator().validate;
    }
    /**
     * @return {?}
     */
    get futureDateRestrictionValidator() {
        return new FutureDateRestrictionValidator().validate;
    }
    /**
     * @return {?}
     */
    get maxDateValidator() {
        return new MaxDateValidator().validate;
    }
    /**
     * @return {?}
     */
    get minDateValidator() {
        return new MinDateValidator().validate;
    }
    /**
     * @return {?}
     */
    get minLengthValidator() {
        return Validators.minLength;
    }
    /**
     * @return {?}
     */
    get maxLengthValidator() {
        return Validators.maxLength;
    }
    /**
     * @param {?} min
     * @return {?}
     */
    getMinValueValidator(min) {
        return new MinValidator().validate(min);
    }
    /**
     * @param {?} max
     * @return {?}
     */
    getMaxValueValidator(max) {
        return new MaxValidator().validate(max);
    }
    /**
     * @return {?}
     */
    get jsExpressionValidator() {
        return new JsExpressionValidator();
    }
    /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    errors(errors, question) {
        const /** @type {?} */ messages = [];
        for (const /** @type {?} */ property in errors) {
            if (errors.hasOwnProperty(property)) {
                switch (property) {
                    case 'required':
                        messages.push(Messages.REQUIRED_FIELD_MSG);
                        break;
                    case 'date':
                        messages.push(Messages.INVALID_DATE_MSG);
                        break;
                    case 'futureDateRestriction':
                        messages.push(Messages.FUTURE_DATE_RESTRICTION_MSG);
                        break;
                    case 'minlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{minLength}', errors.minlength.requiredLength));
                        break;
                    case 'maxlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{maxLength}', errors.maxlength.requiredLength));
                        break;
                    case 'maxdate':
                        messages.push(Messages.MAX_DATE_MSG.replace('{maxDate}', errors.maxdate.requiredDate));
                        break;
                    case 'mindate':
                        messages.push(Messages.MIN_DATE_MSG.replace('{minDate}', errors.mindate.requiredDate));
                        break;
                    case 'max':
                        messages.push(Messages.MAX_MSG.replace('{max}', errors.max.requiredValue));
                        break;
                    case 'min':
                        messages.push(Messages.MIN_MSG.replace('{min}', errors.min.requiredValue));
                        break;
                    case 'js_expression':
                        messages.push(errors['js_expression'].message);
                        break;
                    case 'conditional_required':
                        messages.push(errors['conditional_required'].message);
                        break;
                    case 'conditional_answered':
                        messages.push(errors['conditional_answered'].message);
                        break;
                }
            }
        }
        return messages;
    }
}
ValidationFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ValidationFactory.ctorParameters = () => [];
function ValidationFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ValidationFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ValidationFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0MsTUFBTTtJQUVKLGlCQUFnQjs7Ozs7O0lBRWhCLGFBQWEsQ0FBQyxRQUFzQixFQUFFLElBQVU7UUFFOUMsdUJBQU0sSUFBSSxHQUFlLEVBQUUsQ0FBQztRQUU1QixFQUFFLENBQUMsQ0FBQyxRQUFRLENB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TSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO2lCQUNUO2FBQ0o7U0FDSjtRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7Ozs7WUFySm5CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1yZXF1aXJlZC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1hbnN3ZXJlZC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvcmVxdWlyZWQudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZGF0ZS52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBNaW5WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBNYXhWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBNaW5EYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4tZGF0ZS52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBNYXhEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgtZGF0ZS52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VzIH0gZnJvbSAnLi4vdXRpbHMvbWVzc2FnZXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgTWF4VmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWx9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25GYWN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBnZXRWYWxpZGF0b3JzKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGZvcm0/OiBhbnkpIHtcclxuXHJcbiAgICBjb25zdCBsaXN0OiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgaWYgKHF1ZXN0aW9uLnZhbGlkYXRvcnMpIHtcclxuXHJcbiAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi52YWxpZGF0b3JzLCAodmFsaWRhdG9yOiBWYWxpZGF0aW9uTW9kZWwpID0+IHtcclxuXHJcbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmRhdGVWYWxpZGF0b3IpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxvd0Z1dHVyZURhdGVzOiBib29sZWFuID0gKCA8RGF0ZVZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IgKS5hbGxvd0Z1dHVyZURhdGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhbGxvd0Z1dHVyZURhdGVzKSB7XHJcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5qc0V4cHJlc3Npb25WYWxpZGF0b3IudmFsaWRhdGUoPEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IsIGZvcm0pKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdtYXgnOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5nZXRNYXhWYWx1ZVZhbGlkYXRvcigoPE1heFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1heCkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ21pbic6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmdldE1pblZhbHVlVmFsaWRhdG9yKCg8TWluVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWluKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxSZXF1aXJlZCc6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmNvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IudmFsaWRhdGUoPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsQW5zd2VyZWQnOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5jb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yLnZhbGlkYXRlKDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlc3Rpb24ucmVxdWlyZWQgJiYgdHlwZW9mKHF1ZXN0aW9uLnJlcXVpcmVkKSA9PT0gJ3N0cmluZycgJiYgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICd0cnVlJykge1xyXG4gICAgICBsaXN0LnB1c2godGhpcy5yZXF1aXJlZFZhbGlkYXRvcik7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gVE9ETyAtIGhhbmRsZSBjdXN0b20gcmVxdWlyZWQgdmFsaWRhdG9yXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXQgY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTtcclxuICB9XHJcblxyXG4gIGdldCByZXF1aXJlZFZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBSZXF1aXJlZFZhbGlkYXRvcigpLnZhbGlkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGVWYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKS52YWxpZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBtYXhEYXRlVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IE1heERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBtaW5EYXRlVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IE1pbkRhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBtaW5MZW5ndGhWYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBWYWxpZGF0b3JzLm1pbkxlbmd0aDtcclxuICB9XHJcblxyXG4gIGdldCBtYXhMZW5ndGhWYWxpZGF0b3IoKSB7XHJcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWluVmFsdWVWYWxpZGF0b3IobWluOiBudW1iZXIpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBNaW5WYWxpZGF0b3IoKS52YWxpZGF0ZShtaW4pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1heFZhbHVlVmFsaWRhdG9yKG1heDogbnVtYmVyKTogYW55IHtcclxuXHJcbiAgICByZXR1cm4gbmV3IE1heFZhbGlkYXRvcigpLnZhbGlkYXRlKG1heCk7XHJcbiAgfVxyXG5cclxuICBnZXQganNFeHByZXNzaW9uVmFsaWRhdG9yKCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgSnNFeHByZXNzaW9uVmFsaWRhdG9yKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXJyb3JzKGVycm9yczogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogQXJyYXk8c3RyaW5nPiB7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGVycm9ycykge1xyXG4gICAgICAgIGlmIChlcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5SRVFVSVJFRF9GSUVMRF9NU0cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLklOVkFMSURfREFURV9NU0cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuRlVUVVJFX0RBVEVfUkVTVFJJQ1RJT05fTVNHKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21pbmxlbmd0aCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoJ3ttaW5MZW5ndGh9JywgZXJyb3JzLm1pbmxlbmd0aC5yZXF1aXJlZExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZSgne21heExlbmd0aH0nLCBlcnJvcnMubWF4bGVuZ3RoLnJlcXVpcmVkTGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtYXhkYXRlJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUFYX0RBVEVfTVNHLnJlcGxhY2UoJ3ttYXhEYXRlfScsIGVycm9ycy5tYXhkYXRlLnJlcXVpcmVkRGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWluZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9EQVRFX01TRy5yZXBsYWNlKCd7bWluRGF0ZX0nLCBlcnJvcnMubWluZGF0ZS5yZXF1aXJlZERhdGUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21heCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1BWF9NU0cucmVwbGFjZSgne21heH0nLCBlcnJvcnMubWF4LnJlcXVpcmVkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21pbic6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9NU0cucmVwbGFjZSgne21pbn0nLCBlcnJvcnMubWluLnJlcXVpcmVkVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2pzX2V4cHJlc3Npb24nXS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9yZXF1aXJlZCddLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJ10ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==