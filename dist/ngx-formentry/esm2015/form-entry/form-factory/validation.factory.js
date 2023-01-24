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
    getValidators(question, form) {
        const list = [];
        if (question.validators) {
            _.forEach(question.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        list.push(this.dateValidator);
                        const allowFutureDates = validator
                            .allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(this.jsExpressionValidator.validate(validator, form));
                        break;
                    case 'max':
                        list.push(this.getMaxValueValidator(validator.max));
                        break;
                    case 'min':
                        list.push(this.getMinValueValidator(validator.min));
                        break;
                    case 'conditionalRequired':
                        list.push(this.conditionalRequiredValidator.validate(validator));
                        break;
                    case 'conditionalAnswered':
                        list.push(this.conditionalAnsweredValidator.validate(validator));
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
    }
    get conditionalRequiredValidator() {
        return new ConditionalRequiredValidator();
    }
    get conditionalAnsweredValidator() {
        return new ConditionalAnsweredValidator();
    }
    get requiredValidator() {
        return new RequiredValidator().validate;
    }
    get dateValidator() {
        return new DateValidator().validate;
    }
    get futureDateRestrictionValidator() {
        return new FutureDateRestrictionValidator().validate;
    }
    get maxDateValidator() {
        return new MaxDateValidator().validate;
    }
    get minDateValidator() {
        return new MinDateValidator().validate;
    }
    get minLengthValidator() {
        return Validators.minLength;
    }
    get maxLengthValidator() {
        return Validators.maxLength;
    }
    getMinValueValidator(min) {
        return new MinValidator().validate(min);
    }
    getMaxValueValidator(max) {
        return new MaxValidator().validate(max);
    }
    get jsExpressionValidator() {
        return new JsExpressionValidator();
    }
    errors(errors, question) {
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
/** @nocollapse */
ValidationFactory.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDNUYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDNUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDakcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUzdDLE1BQU07SUFDSixnQkFBZSxDQUFDO0lBRWhCLGFBQWEsQ0FBQyxRQUFzQixFQUFFLElBQVU7UUFDOUMsTUFBTSxJQUFJLEdBQWUsRUFBRSxDQUFDO1FBRTVCLEVBQUUsQ0FBQyxDQUFD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QkFBc0I7d0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7O1lBM0xGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1yZXF1aXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9yZXF1aXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWluVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yJztcbmltcG9ydCB7IE1heFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNaW5EYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4tZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWF4RGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LWRhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgTWVzc2FnZXMgfSBmcm9tICcuLi91dGlscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNYXhWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWluVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRWYWxpZGF0b3JzKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGZvcm0/OiBhbnkpIHtcbiAgICBjb25zdCBsaXN0OiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBpZiAocXVlc3Rpb24udmFsaWRhdG9ycykge1xuICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnZhbGlkYXRvcnMsICh2YWxpZGF0b3I6IFZhbGlkYXRpb25Nb2RlbCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5kYXRlVmFsaWRhdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbG93RnV0dXJlRGF0ZXM6IGJvb2xlYW4gPSAoPERhdGVWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKVxuICAgICAgICAgICAgICAuYWxsb3dGdXR1cmVEYXRlcztcblxuICAgICAgICAgICAgaWYgKCFhbGxvd0Z1dHVyZURhdGVzKSB7XG4gICAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgIGxpc3QucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5qc0V4cHJlc3Npb25WYWxpZGF0b3IudmFsaWRhdGUoXG4gICAgICAgICAgICAgICAgPEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IsXG4gICAgICAgICAgICAgICAgZm9ybVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICAgIGxpc3QucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5nZXRNYXhWYWx1ZVZhbGlkYXRvcigoPE1heFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1heClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLmdldE1pblZhbHVlVmFsaWRhdG9yKCg8TWluVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWluKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsUmVxdWlyZWQnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IudmFsaWRhdGUoXG4gICAgICAgICAgICAgICAgPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvclxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxBbnN3ZXJlZCc6XG4gICAgICAgICAgICBsaXN0LnB1c2goXG4gICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvci52YWxpZGF0ZShcbiAgICAgICAgICAgICAgICA8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgcXVlc3Rpb24ucmVxdWlyZWQgJiZcbiAgICAgIHR5cGVvZiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ3N0cmluZycgJiZcbiAgICAgIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAndHJ1ZSdcbiAgICApIHtcbiAgICAgIGxpc3QucHVzaCh0aGlzLnJlcXVpcmVkVmFsaWRhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyAtIGhhbmRsZSBjdXN0b20gcmVxdWlyZWQgdmFsaWRhdG9yXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1aXJlZFZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBmdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1heERhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1heERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5EYXRlVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5EYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWluTGVuZ3RoVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWluTGVuZ3RoO1xuICB9XG5cbiAgZ2V0IG1heExlbmd0aFZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluVmFsdWVWYWxpZGF0b3IobWluOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWluVmFsaWRhdG9yKCkudmFsaWRhdGUobWluKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhWYWx1ZVZhbGlkYXRvcihtYXg6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNYXhWYWxpZGF0b3IoKS52YWxpZGF0ZShtYXgpO1xuICB9XG5cbiAgZ2V0IGpzRXhwcmVzc2lvblZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gbmV3IEpzRXhwcmVzc2lvblZhbGlkYXRvcigpO1xuICB9XG5cbiAgcHVibGljIGVycm9ycyhlcnJvcnM6IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGVycm9ycykge1xuICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuUkVRVUlSRURfRklFTERfTVNHKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5JTlZBTElEX0RBVEVfTVNHKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLkZVVFVSRV9EQVRFX1JFU1RSSUNUSU9OX01TRyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW5sZW5ndGgnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgICAgTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZShcbiAgICAgICAgICAgICAgICAne21pbkxlbmd0aH0nLFxuICAgICAgICAgICAgICAgIGVycm9ycy5taW5sZW5ndGgucmVxdWlyZWRMZW5ndGhcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21heGxlbmd0aCc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICd7bWF4TGVuZ3RofScsXG4gICAgICAgICAgICAgICAgZXJyb3JzLm1heGxlbmd0aC5yZXF1aXJlZExlbmd0aFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4ZGF0ZSc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICBNZXNzYWdlcy5NQVhfREFURV9NU0cucmVwbGFjZShcbiAgICAgICAgICAgICAgICAne21heERhdGV9JyxcbiAgICAgICAgICAgICAgICBlcnJvcnMubWF4ZGF0ZS5yZXF1aXJlZERhdGVcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbmRhdGUnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgICAgTWVzc2FnZXMuTUlOX0RBVEVfTVNHLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgJ3ttaW5EYXRlfScsXG4gICAgICAgICAgICAgICAgZXJyb3JzLm1pbmRhdGUucmVxdWlyZWREYXRlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgICAgTWVzc2FnZXMuTUFYX01TRy5yZXBsYWNlKCd7bWF4fScsIGVycm9ycy5tYXgucmVxdWlyZWRWYWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgICAgTWVzc2FnZXMuTUlOX01TRy5yZXBsYWNlKCd7bWlufScsIGVycm9ycy5taW4ucmVxdWlyZWRWYWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydqc19leHByZXNzaW9uJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9yZXF1aXJlZCc6XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfcmVxdWlyZWQnXS5tZXNzYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzpcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9hbnN3ZXJlZCddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cbn1cbiJdfQ==