/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
export class FormSchemaCompiler {
    constructor() {
    }
    /**
     * @param {?} formSchema
     * @param {?} referencedComponents
     * @return {?}
     */
    compileFormSchema(formSchema, referencedComponents) {
        // get all referenced forms
        const /** @type {?} */ refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        const /** @type {?} */ placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    }
    /**
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    findSchemaByName(schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        let /** @type {?} */ foundSchema = {};
        _.each(schemaArray, (schema) => {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    }
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    getPageInSchemaByLabel(schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        let /** @type {?} */ foundPage = {};
        _.each(schema.pages, (page) => {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    }
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        const /** @type {?} */ foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        let /** @type {?} */ foundSection = {};
        _.each(foundPage.sections, (section) => {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    }
    /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    getQuestionByIdInSchema(schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            let /** @type {?} */ question;
            for (let /** @type {?} */ i = 0; i < schema.length; i++) {
                if (!_.isEmpty(schema[i])) {
                    question = this.getQuestionByIdInSchema(schema[i], questionId);
                }
                if (!_.isEmpty(question)) {
                    break;
                }
            }
            return question;
        }
        else if (typeof schema === 'object') {
            if (this.isQuestionObjectWithId(schema, questionId)) {
                return schema;
            }
            else if (this.isSchemaSubObjectExpandable(schema)) {
                const /** @type {?} */ toExpand = (schema.pages || schema.sections || schema.questions);
                return this.getQuestionByIdInSchema(toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    getQuestionsArrayByQuestionIdInSchema(schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
    }
    /**
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    getQuestionsArrayByQuestionId(parent, object, questionId) {
        if (Array.isArray(object)) {
            let /** @type {?} */ returnedValue;
            for (let /** @type {?} */ i = 0; i < object.length; i++) {
                if (!_.isEmpty(object[i])) {
                    returnedValue = this.getQuestionsArrayByQuestionId(object, object[i], questionId);
                }
                if (!_.isEmpty(returnedValue)) {
                    break;
                }
            }
            return returnedValue;
        }
        else if (typeof object === 'object') {
            if (this.isQuestionObjectWithId(object, questionId)) {
                return parent;
            }
            else if (this.isSchemaSubObjectExpandable(object)) {
                const /** @type {?} */ toExpand = (object.pages || object.sections || object.questions);
                return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isSchemaSubObjectExpandable(object) {
        if (typeof object === 'object') {
            const /** @type {?} */ objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    isQuestionObjectWithId(object, id) {
        return object['id'] === id;
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    getAllPlaceholderObjects(schema) {
        const /** @type {?} */ referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    }
    /**
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    extractPlaceholderObjects(subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (let /** @type {?} */ i = 0; i < subSchema.length; i++) {
                if (!_.isEmpty(subSchema[i])) {
                    this.extractPlaceholderObjects(subSchema[i], objectsArray);
                }
            }
        }
        else if (typeof subSchema === 'object') {
            if (!_.isEmpty(subSchema.reference)) {
                objectsArray.push(subSchema);
            }
            else if (this.isSchemaSubObjectExpandable(subSchema)) {
                const /** @type {?} */ toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    }
    /**
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    fillPlaceholderObject(placeHolderObject, referenceObject) {
        for (const /** @type {?} */ member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    }
    /**
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    replaceAllPlaceholdersWithActualObjects(keyValReferencedForms, placeHoldersArray) {
        _.each(placeHoldersArray, (placeHolder) => {
            const /** @type {?} */ referencedObject = this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (_.isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        });
        return placeHoldersArray;
    }
    /**
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    removeObjectFromArray(array, object) {
        const /** @type {?} */ indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    }
    /**
     * @param {?} placeHolder
     * @return {?}
     */
    removeExcludedQuestionsFromPlaceholder(placeHolder) {
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, (excludedQuestionId) => {
                const /** @type {?} */ questionsArray = this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                const /** @type {?} */ question = this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    }
    /**
     * @param {?} referenceData
     * @param {?} keyValReferencedForms
     * @return {?}
     */
    getReferencedObject(referenceData, keyValReferencedForms) {
        if (_.isEmpty(referenceData.form)) {
            console.error('Form compile: reference missing form attribute', referenceData);
            return;
        }
        if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
            console.error('Form compile: referenced form alias not found', referenceData);
            return;
        }
        if (!_.isEmpty(referenceData.questionId)) {
            return this.getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
        }
        if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
            return this.getSectionInSchemaByPageLabelBySectionLabel(keyValReferencedForms[referenceData.form], referenceData.page, referenceData.section);
        }
        if (!_.isEmpty(referenceData.page)) {
            return this.getPageInSchemaByLabel(keyValReferencedForms[referenceData.form], referenceData.page);
        }
        console.error('Form compile: Unsupported reference type', referenceData.reference);
    }
    /**
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    getReferencedForms(formSchema, formSchemasLookupArray) {
        const /** @type {?} */ referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        const /** @type {?} */ keyValReferencedForms = {};
        _.each(referencedForms, (reference) => {
            keyValReferencedForms[reference.alias] =
                this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    }
}
FormSchemaCompiler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormSchemaCompiler.ctorParameters = () => [];
function FormSchemaCompiler_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormSchemaCompiler.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormSchemaCompiler.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNO0lBQ0o7S0FFQzs7Ozs7O0lBRU0saUJBQWlCLENBQUMsVUFBa0IsRUFBRSxvQkFBZ0M7O1FBRTNFLHVCQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQUU7O1FBRy9DLHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQUU7O1FBR25ELElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztJQUlaLGdCQUFnQixDQUFDLFdBQXVCLEVBQUUsWUFBb0I7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ2xFLHFC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Z0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHFCQUFxQixDQUFDOzs7O1lBM1BoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtU2NoZW1hQ29tcGlsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb21waWxlRm9ybVNjaGVtYShmb3JtU2NoZW1hOiBPYmplY3QsIHJlZmVyZW5jZWRDb21wb25lbnRzOiBBcnJheTxhbnk+KTogT2JqZWN0IHtcclxuICAgIC8vIGdldCBhbGwgcmVmZXJlbmNlZCBmb3Jtc1xyXG4gICAgY29uc3QgcmVmRm9ybXM6IE9iamVjdCA9IHRoaXMuZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWEsIHJlZmVyZW5jZWRDb21wb25lbnRzKTtcclxuICAgIGlmIChfLmlzRW1wdHkocmVmRm9ybXMpKSB7IHJldHVybiBmb3JtU2NoZW1hOyB9XHJcblxyXG4gICAgLy8gZ2V0IGFsbCBwbGFjZS1ob2xkZXJzIGZyb20gdGhlIGZvcm0gc2NoZW1hXHJcbiAgICBjb25zdCBwbGFjZUhvbGRlcnMgPSB0aGlzLmdldEFsbFBsYWNlaG9sZGVyT2JqZWN0cyhmb3JtU2NoZW1hKTtcclxuICAgIGlmIChfLmlzRW1wdHkocGxhY2VIb2xkZXJzKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxyXG5cclxuICAgIC8vIHJlcGxhY2UgYWxsIHBsYWNlSG9sZGVyc1xyXG4gICAgdGhpcy5yZXBsYWNlQWxsUGxhY2Vob2xkZXJzV2l0aEFjdHVhbE9iamVjdHMocmVmRm9ybXMsIHBsYWNlSG9sZGVycyk7XHJcbiAgICByZXR1cm4gZm9ybVNjaGVtYTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGZpbmRTY2hlbWFCeU5hbWUoc2NoZW1hQXJyYXk6IEFycmF5PGFueT4sIG5hbWVPZlNjaGVtYTogc3RyaW5nKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hQXJyYXkpIHx8IF8uaXNFbXB0eShuYW1lT2ZTY2hlbWEpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kU2NoZW1hOiBhbnkgPSB7fTtcclxuICAgIF8uZWFjaChzY2hlbWFBcnJheSwgKHNjaGVtYTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzY2hlbWEubmFtZSA9PT0gbmFtZU9mU2NoZW1hKSB7XHJcbiAgICAgICAgZm91bmRTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvdW5kU2NoZW1hO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYTogYW55LCBwYWdlTGFiZWw6IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHBhZ2VMYWJlbCkpIHsgcmV0dXJuOyB9XHJcbiAgICBsZXQgZm91bmRQYWdlOiBPYmplY3QgPSB7fTtcclxuICAgIF8uZWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XHJcbiAgICAgIGlmIChwYWdlLmxhYmVsID09PSBwYWdlTGFiZWwpIHtcclxuICAgICAgICBmb3VuZFBhZ2UgPSBwYWdlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZvdW5kUGFnZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbFxyXG4gICAgKHNjaGVtYTogT2JqZWN0LCBwYWdlTGFiZWw6IHN0cmluZywgc2VjdGlvbkxhYmVsOiBzdHJpbmcpOiBPYmplY3Qge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpIHx8IF8uaXNFbXB0eShzZWN0aW9uTGFiZWwpKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgZm91bmRQYWdlOiBhbnkgPSB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoc2NoZW1hLCBwYWdlTGFiZWwpO1xyXG4gICAgaWYgKF8uaXNFbXB0eShmb3VuZFBhZ2UpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kU2VjdGlvbjogT2JqZWN0ID0ge307XHJcbiAgICBfLmVhY2goZm91bmRQYWdlLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc2VjdGlvbi5sYWJlbCA9PT0gc2VjdGlvbkxhYmVsKSB7XHJcbiAgICAgICAgZm91bmRTZWN0aW9uID0gc2VjdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3VuZFNlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYTogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocXVlc3Rpb25JZCkpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XHJcbiAgICAgIGxldCBxdWVzdGlvbjogQXJyYXk8YW55PjtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2hlbWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShzY2hlbWFbaV0pKSB7XHJcbiAgICAgICAgICBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEoc2NoZW1hW2ldLCBxdWVzdGlvbklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocXVlc3Rpb24pKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAodGhpcy5pc1F1ZXN0aW9uT2JqZWN0V2l0aElkKHNjaGVtYSwgcXVlc3Rpb25JZCkpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1hO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKHNjaGVtYSkpIHtcclxuICAgICAgICBjb25zdCB0b0V4cGFuZCA9IChzY2hlbWEucGFnZXMgfHwgc2NoZW1hLnNlY3Rpb25zIHx8IHNjaGVtYS5xdWVzdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQoc2NoZW1hLCBzY2hlbWEsIHF1ZXN0aW9uSWQpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQocGFyZW50OiBhbnksIG9iamVjdDogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcclxuICAgICAgbGV0IHJldHVybmVkVmFsdWU6IEFycmF5PGFueT47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob2JqZWN0W2ldKSkge1xyXG4gICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQob2JqZWN0LCBvYmplY3RbaV0sIHF1ZXN0aW9uSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXR1cm5lZFZhbHVlKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmV0dXJuZWRWYWx1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvbk9iamVjdFdpdGhJZChvYmplY3QsIHF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3QpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAob2JqZWN0LnBhZ2VzIHx8IG9iamVjdC5zZWN0aW9ucyB8fCBvYmplY3QucXVlc3Rpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZCh0b0V4cGFuZCwgdG9FeHBhbmQsIHF1ZXN0aW9uSWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gb2JqZWN0IGlzIHBhZ2Ugb3Igc2VjdGlvbiBvciBxdWVzdGlvblxyXG4gIHByaXZhdGUgaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKG9iamVjdDogT2JqZWN0KTogQm9vbGVhbiB7XHJcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3Qgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgIGlmIChfLmluY2x1ZGVzKG9iamVjdEtleXMsICdwYWdlcycpIHx8XHJcbiAgICAgICAgXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAnc2VjdGlvbnMnKSB8fFxyXG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3F1ZXN0aW9ucycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNRdWVzdGlvbk9iamVjdFdpdGhJZChvYmplY3Q6IE9iamVjdCwgaWQ6IGFueSk6IEJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iamVjdFsnaWQnXSA9PT0gaWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hOiBPYmplY3QpOiBBcnJheTxhbnk+IHtcclxuICAgIGNvbnN0IHJlZmVyZW5jZWRPYmplY3RzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hLCByZWZlcmVuY2VkT2JqZWN0cyk7XHJcbiAgICByZXR1cm4gcmVmZXJlbmNlZE9iamVjdHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hOiBhbnksIG9iamVjdHNBcnJheTogQXJyYXk8T2JqZWN0Pik6IHZvaWQge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzdWJTY2hlbWEpKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViU2NoZW1hKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlNjaGVtYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYVtpXSkpIHtcclxuICAgICAgICAgIHRoaXMuZXh0cmFjdFBsYWNlaG9sZGVyT2JqZWN0cyhzdWJTY2hlbWFbaV0sIG9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJTY2hlbWEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYS5yZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgb2JqZWN0c0FycmF5LnB1c2goc3ViU2NoZW1hKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzdWJTY2hlbWEpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc3ViU2NoZW1hLnBhZ2VzIHx8IHN1YlNjaGVtYS5zZWN0aW9ucyB8fCBzdWJTY2hlbWEucXVlc3Rpb25zKTtcclxuICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHModG9FeHBhbmQsIG9iamVjdHNBcnJheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsbFBsYWNlaG9sZGVyT2JqZWN0KHBsYWNlSG9sZGVyT2JqZWN0OiBPYmplY3QsIHJlZmVyZW5jZU9iamVjdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgIGZvciAoY29uc3QgbWVtYmVyIGluIHJlZmVyZW5jZU9iamVjdCkge1xyXG4gICAgICBpZiAoXy5pc0VtcHR5KHBsYWNlSG9sZGVyT2JqZWN0W21lbWJlcl0pKSB7XHJcbiAgICAgICAgcGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSA9IHJlZmVyZW5jZU9iamVjdFttZW1iZXJdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXJPYmplY3Q7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0c1xyXG4gICAgKGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0LCBwbGFjZUhvbGRlcnNBcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG4gICAgXy5lYWNoKHBsYWNlSG9sZGVyc0FycmF5LCAocGxhY2VIb2xkZXIpID0+IHtcclxuICAgICAgY29uc3QgcmVmZXJlbmNlZE9iamVjdDogT2JqZWN0ID1cclxuICAgICAgICB0aGlzLmdldFJlZmVyZW5jZWRPYmplY3QocGxhY2VIb2xkZXIucmVmZXJlbmNlLCBrZXlWYWxSZWZlcmVuY2VkRm9ybXMpO1xyXG5cclxuICAgICAgaWYgKF8uaXNFbXB0eShyZWZlcmVuY2VkT2JqZWN0KSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogRXJyb3IgZmluZGluZyByZWZlcmVuY2VkIG9iamVjdCcsIHBsYWNlSG9sZGVyLnJlZmVyZW5jZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLmZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlciwgcmVmZXJlbmNlZE9iamVjdCk7XHJcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLnJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyKTtcclxuICAgICAgICBkZWxldGUgcGxhY2VIb2xkZXJbJ3JlZmVyZW5jZSddO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwbGFjZUhvbGRlcnNBcnJheTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlT2JqZWN0RnJvbUFycmF5KGFycmF5OiBBcnJheTxhbnk+LCBvYmplY3Q6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5kZXhPZk9iamVjdCA9IGFycmF5LmluZGV4T2Yob2JqZWN0KTtcclxuICAgIGlmIChpbmRleE9mT2JqZWN0ID09PSAtMSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBhcnJheS5zcGxpY2UoaW5kZXhPZk9iamVjdCwgMSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyOiBhbnkpOiBPYmplY3Qge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMpKSB7XHJcbiAgICAgIF8uZWFjaChwbGFjZUhvbGRlci5yZWZlcmVuY2UuZXhjbHVkZVF1ZXN0aW9ucywgKGV4Y2x1ZGVkUXVlc3Rpb25JZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc0FycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZEluU2NoZW1hKFxyXG4gICAgICAgICAgcGxhY2VIb2xkZXIsIGV4Y2x1ZGVkUXVlc3Rpb25JZCk7XHJcblxyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxdWVzdGlvbnNBcnJheSkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHF1ZXN0aW9uc0FycmF5LCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZU9iamVjdEZyb21BcnJheShxdWVzdGlvbnNBcnJheSwgcXVlc3Rpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwbGFjZUhvbGRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZE9iamVjdChyZWZlcmVuY2VEYXRhOiBhbnksIGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5mb3JtKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IHJlZmVyZW5jZSBtaXNzaW5nIGZvcm0gYXR0cmlidXRlJywgcmVmZXJlbmNlRGF0YSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChfLmlzRW1wdHkoa2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0pKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlZCBmb3JtIGFsaWFzIG5vdCBmb3VuZCcsIHJlZmVyZW5jZURhdGEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKFxyXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEucXVlc3Rpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSAmJiAhXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuc2VjdGlvbikpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbChcclxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcclxuICAgICAgICByZWZlcmVuY2VEYXRhLnBhZ2UsXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5zZWN0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnBhZ2UpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoXHJcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5wYWdlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IFVuc3VwcG9ydGVkIHJlZmVyZW5jZSB0eXBlJywgcmVmZXJlbmNlRGF0YS5yZWZlcmVuY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VkRm9ybXMoZm9ybVNjaGVtYTogYW55LCBmb3JtU2NoZW1hc0xvb2t1cEFycmF5OiBBcnJheTxhbnk+KTogT2JqZWN0IHtcclxuICAgIGNvbnN0IHJlZmVyZW5jZWRGb3JtczogQXJyYXk8YW55PiA9IGZvcm1TY2hlbWEucmVmZXJlbmNlZEZvcm1zO1xyXG5cclxuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlZEZvcm1zKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBjb25zdCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCA9IHt9O1xyXG5cclxuICAgIF8uZWFjaChyZWZlcmVuY2VkRm9ybXMsIChyZWZlcmVuY2U6IGFueSkgPT4ge1xyXG4gICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlLmFsaWFzXSA9XHJcbiAgICAgICAgdGhpcy5maW5kU2NoZW1hQnlOYW1lKGZvcm1TY2hlbWFzTG9va3VwQXJyYXksIHJlZmVyZW5jZS5mb3JtTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBrZXlWYWxSZWZlcmVuY2VkRm9ybXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==