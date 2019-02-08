/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const list = [];
        if (question.validators) {
            _.forEach(question.validators, (/**
             * @param {?} validator
             * @return {?}
             */
            (validator) => {
                switch (validator.type) {
                    case 'date':
                        list.push(this.dateValidator);
                        /** @type {?} */
                        const allowFutureDates = ((/** @type {?} */ (validator))).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(this.jsExpressionValidator.validate((/** @type {?} */ (validator)), form));
                        break;
                    case 'max':
                        list.push(this.getMaxValueValidator(((/** @type {?} */ (validator))).max));
                        break;
                    case 'min':
                        list.push(this.getMinValueValidator(((/** @type {?} */ (validator))).min));
                        break;
                    case 'conditionalRequired':
                        list.push(this.conditionalRequiredValidator.validate((/** @type {?} */ (validator))));
                        break;
                    case 'conditionalAnswered':
                        list.push(this.conditionalAnsweredValidator.validate((/** @type {?} */ (validator))));
                        break;
                }
            }));
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
        /** @type {?} */
        const messages = [];
        for (const property in errors) {
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
ValidationFactory.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0MsTUFBTTtJQUVKLGdCQUFlLENBQUM7Ozs7OztJQUVoQixhQUFhLENBQUMsUUFBc0IsRUFBRSxJQUFVOztjQUV4QyxJQUFJLEdBQWUsRUFBRTtRQUUzQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFB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QUM7b0JBQ1IsS0FBSyxlQUFlO3dCQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDL0MsS0FBSyxDQUFDO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUM7b0JBQ1IsS0FBSyxzQkFBc0I7d0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7OztZQXRKRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1hbnN3ZXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNaW5WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgudmFsaWRhdG9yJztcbmltcG9ydCB7IE1pbkRhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXhEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgtZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mdXR1cmUtZGF0ZS1yZXN0cmljdGlvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBNZXNzYWdlcyB9IGZyb20gJy4uL3V0aWxzL21lc3NhZ2VzJztcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1pblZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFZhbGlkYXRvcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZm9ybT86IGFueSkge1xuXG4gICAgY29uc3QgbGlzdDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnZhbGlkYXRvcnMpIHtcblxuICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnZhbGlkYXRvcnMsICh2YWxpZGF0b3I6IFZhbGlkYXRpb25Nb2RlbCkgPT4ge1xuXG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmRhdGVWYWxpZGF0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWxsb3dGdXR1cmVEYXRlczogYm9vbGVhbiA9ICggPERhdGVWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yICkuYWxsb3dGdXR1cmVEYXRlcztcblxuICAgICAgICAgICAgaWYgKCFhbGxvd0Z1dHVyZURhdGVzKSB7XG4gICAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmpzRXhwcmVzc2lvblZhbGlkYXRvci52YWxpZGF0ZSg8SnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvciwgZm9ybSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmdldE1heFZhbHVlVmFsaWRhdG9yKCg8TWF4VmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWF4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWluVmFsdWVWYWxpZGF0b3IoKDxNaW5WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5taW4pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsUmVxdWlyZWQnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IudmFsaWRhdGUoPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChxdWVzdGlvbi5yZXF1aXJlZCAmJiB0eXBlb2YocXVlc3Rpb24ucmVxdWlyZWQpID09PSAnc3RyaW5nJyAmJiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ3RydWUnKSB7XG4gICAgICBsaXN0LnB1c2godGhpcy5yZXF1aXJlZFZhbGlkYXRvcik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gVE9ETyAtIGhhbmRsZSBjdXN0b20gcmVxdWlyZWQgdmFsaWRhdG9yXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1aXJlZFZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBmdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1heERhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1heERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5EYXRlVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5EYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWluTGVuZ3RoVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWluTGVuZ3RoO1xuICB9XG5cbiAgZ2V0IG1heExlbmd0aFZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluVmFsdWVWYWxpZGF0b3IobWluOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWluVmFsaWRhdG9yKCkudmFsaWRhdGUobWluKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhWYWx1ZVZhbGlkYXRvcihtYXg6IG51bWJlcik6IGFueSB7XG5cbiAgICByZXR1cm4gbmV3IE1heFZhbGlkYXRvcigpLnZhbGlkYXRlKG1heCk7XG4gIH1cblxuICBnZXQganNFeHByZXNzaW9uVmFsaWRhdG9yKCkge1xuXG4gICAgcmV0dXJuIG5ldyBKc0V4cHJlc3Npb25WYWxpZGF0b3IoKTtcbiAgfVxuXG4gIHB1YmxpYyBlcnJvcnMoZXJyb3JzOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBBcnJheTxzdHJpbmc+IHtcblxuICAgIGNvbnN0IG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGVycm9ycykge1xuICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLlJFUVVJUkVEX0ZJRUxEX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuSU5WQUxJRF9EQVRFX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5GVVRVUkVfREFURV9SRVNUUklDVElPTl9NU0cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtaW5sZW5ndGgnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZSgne21pbkxlbmd0aH0nLCBlcnJvcnMubWlubGVuZ3RoLnJlcXVpcmVkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21heGxlbmd0aCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWF4TGVuZ3RofScsIGVycm9ycy5tYXhsZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWF4ZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfREFURV9NU0cucmVwbGFjZSgne21heERhdGV9JywgZXJyb3JzLm1heGRhdGUucmVxdWlyZWREYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbmRhdGUnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0RBVEVfTVNHLnJlcGxhY2UoJ3ttaW5EYXRlfScsIGVycm9ycy5taW5kYXRlLnJlcXVpcmVkRGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUFYX01TRy5yZXBsYWNlKCd7bWF4fScsIGVycm9ycy5tYXgucmVxdWlyZWRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX01TRy5yZXBsYWNlKCd7bWlufScsIGVycm9ycy5taW4ucmVxdWlyZWRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snanNfZXhwcmVzc2lvbiddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9yZXF1aXJlZCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfYW5zd2VyZWQnXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxufVxuIl19