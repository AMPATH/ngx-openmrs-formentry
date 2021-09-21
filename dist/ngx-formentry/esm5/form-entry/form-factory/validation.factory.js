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
var ValidationFactory = /** @class */ (function () {
    function ValidationFactory() {
    }
    ValidationFactory.prototype.getValidators = function (question, form) {
        var _this = this;
        var list = [];
        if (question.validators) {
            _.forEach(question.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        list.push(_this.dateValidator);
                        var allowFutureDates = validator
                            .allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(_this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(_this.jsExpressionValidator.validate(validator, form));
                        break;
                    case 'max':
                        list.push(_this.getMaxValueValidator(validator.max));
                        break;
                    case 'min':
                        list.push(_this.getMinValueValidator(validator.min));
                        break;
                    case 'conditionalRequired':
                        list.push(_this.conditionalRequiredValidator.validate(validator));
                        break;
                    case 'conditionalAnswered':
                        list.push(_this.conditionalAnsweredValidator.validate(validator));
                        break;
                }
            });
        }
        if (question.required &&
            typeof question.required === 'string' &&
            question.required === 'true') {
            list.push(this.requiredValidator);
        }
        else {
            // TODO - handle custom required validator
        }
        return list;
    };
    Object.defineProperty(ValidationFactory.prototype, "conditionalRequiredValidator", {
        get: function () {
            return new ConditionalRequiredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "conditionalAnsweredValidator", {
        get: function () {
            return new ConditionalAnsweredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "requiredValidator", {
        get: function () {
            return new RequiredValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "dateValidator", {
        get: function () {
            return new DateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "futureDateRestrictionValidator", {
        get: function () {
            return new FutureDateRestrictionValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxDateValidator", {
        get: function () {
            return new MaxDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minDateValidator", {
        get: function () {
            return new MinDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minLengthValidator", {
        get: function () {
            return Validators.minLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxLengthValidator", {
        get: function () {
            return Validators.maxLength;
        },
        enumerable: true,
        configurable: true
    });
    ValidationFactory.prototype.getMinValueValidator = function (min) {
        return new MinValidator().validate(min);
    };
    ValidationFactory.prototype.getMaxValueValidator = function (max) {
        return new MaxValidator().validate(max);
    };
    Object.defineProperty(ValidationFactory.prototype, "jsExpressionValidator", {
        get: function () {
            return new JsExpressionValidator();
        },
        enumerable: true,
        configurable: true
    });
    ValidationFactory.prototype.errors = function (errors, question) {
        var messages = [];
        for (var property in errors) {
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
    };
    ValidationFactory.decorators = [
        { type: Injectable },
    ];
    ValidationFactory.ctorParameters = function () { return []; };
    return ValidationFactory;
}());
export { ValidationFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVE3QztJQUVFO0lBQWUsQ0FBQztJQUVoQix5Q0FBYSxHQUFiLFVBQWMsUUFBc0IsRUFBRSxJQUFVO1FBQWhELGlCQThEQztRQTdEQyxJQUFNLElBQUksR0FBZSxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFDLENBQUMs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QyxDQUM1RCxDQUFDO3dCQUNGLEtBQUssQ0FBQztvQkFDUixLQUFLLGVBQWU7d0JBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLENBQUM7b0JBQ1IsS0FBSyxzQkFBc0I7d0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Z0JBM0xGLFVBQVU7OztJQTRMWCx3QkFBQztDQUFBLEFBNUxELElBNExDO1NBM0xZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1hbnN3ZXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNaW5WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgudmFsaWRhdG9yJztcbmltcG9ydCB7IE1pbkRhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXhEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgtZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mdXR1cmUtZGF0ZS1yZXN0cmljdGlvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBNZXNzYWdlcyB9IGZyb20gJy4uL3V0aWxzL21lc3NhZ2VzJztcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tYXgtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25GYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFZhbGlkYXRvcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZm9ybT86IGFueSkge1xuICAgIGNvbnN0IGxpc3Q6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIGlmIChxdWVzdGlvbi52YWxpZGF0b3JzKSB7XG4gICAgICBfLmZvckVhY2gocXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogVmFsaWRhdGlvbk1vZGVsKSA9PiB7XG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmRhdGVWYWxpZGF0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWxsb3dGdXR1cmVEYXRlczogYm9vbGVhbiA9ICg8RGF0ZVZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpXG4gICAgICAgICAgICAgIC5hbGxvd0Z1dHVyZURhdGVzO1xuXG4gICAgICAgICAgICBpZiAoIWFsbG93RnV0dXJlRGF0ZXMpIHtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLmpzRXhwcmVzc2lvblZhbGlkYXRvci52YWxpZGF0ZShcbiAgICAgICAgICAgICAgICA8SnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICBmb3JtXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLmdldE1heFZhbHVlVmFsaWRhdG9yKCg8TWF4VmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWF4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICAgIHRoaXMuZ2V0TWluVmFsdWVWYWxpZGF0b3IoKDxNaW5WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5taW4pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxSZXF1aXJlZCc6XG4gICAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvci52YWxpZGF0ZShcbiAgICAgICAgICAgICAgICA8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcbiAgICAgICAgICAgIGxpc3QucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yLnZhbGlkYXRlKFxuICAgICAgICAgICAgICAgIDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3JcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBxdWVzdGlvbi5yZXF1aXJlZCAmJlxuICAgICAgdHlwZW9mIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAnc3RyaW5nJyAmJlxuICAgICAgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICd0cnVlJ1xuICAgICkge1xuICAgICAgbGlzdC5wdXNoKHRoaXMucmVxdWlyZWRWYWxpZGF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPIC0gaGFuZGxlIGN1c3RvbSByZXF1aXJlZCB2YWxpZGF0b3JcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgZGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWF4RGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWF4RGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1pbkRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1pbkRhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5MZW5ndGhWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5taW5MZW5ndGg7XG4gIH1cblxuICBnZXQgbWF4TGVuZ3RoVmFsaWRhdG9yKCkge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLm1heExlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5WYWx1ZVZhbGlkYXRvcihtaW46IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5WYWxpZGF0b3IoKS52YWxpZGF0ZShtaW4pO1xuICB9XG5cbiAgcHVibGljIGdldE1heFZhbHVlVmFsaWRhdG9yKG1heDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1heFZhbGlkYXRvcigpLnZhbGlkYXRlKG1heCk7XG4gIH1cblxuICBnZXQganNFeHByZXNzaW9uVmFsaWRhdG9yKCkge1xuICAgIHJldHVybiBuZXcgSnNFeHByZXNzaW9uVmFsaWRhdG9yKCk7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKGVycm9yczogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZXJyb3JzKSB7XG4gICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5SRVFVSVJFRF9GSUVMRF9NU0cpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLklOVkFMSURfREFURV9NU0cpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuRlVUVVJFX0RBVEVfUkVTVFJJQ1RJT05fTVNHKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbmxlbmd0aCc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICd7bWluTGVuZ3RofScsXG4gICAgICAgICAgICAgICAgZXJyb3JzLm1pbmxlbmd0aC5yZXF1aXJlZExlbmd0aFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goXG4gICAgICAgICAgICAgIE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgJ3ttYXhMZW5ndGh9JyxcbiAgICAgICAgICAgICAgICBlcnJvcnMubWF4bGVuZ3RoLnJlcXVpcmVkTGVuZ3RoXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtYXhkYXRlJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goXG4gICAgICAgICAgICAgIE1lc3NhZ2VzLk1BWF9EQVRFX01TRy5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICd7bWF4RGF0ZX0nLFxuICAgICAgICAgICAgICAgIGVycm9ycy5tYXhkYXRlLnJlcXVpcmVkRGF0ZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWluZGF0ZSc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NSU5fREFURV9NU0cucmVwbGFjZShcbiAgICAgICAgICAgICAgICAne21pbkRhdGV9JyxcbiAgICAgICAgICAgICAgICBlcnJvcnMubWluZGF0ZS5yZXF1aXJlZERhdGVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NQVhfTVNHLnJlcGxhY2UoJ3ttYXh9JywgZXJyb3JzLm1heC5yZXF1aXJlZFZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NSU5fTVNHLnJlcGxhY2UoJ3ttaW59JywgZXJyb3JzLm1pbi5yZXF1aXJlZFZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2pzX2V4cHJlc3Npb24nXS5tZXNzYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9yZXF1aXJlZCddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxufVxuIl19