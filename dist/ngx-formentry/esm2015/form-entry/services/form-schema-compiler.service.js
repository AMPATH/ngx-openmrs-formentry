/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        /** @type {?} */
        const placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    }
    /**
     * @private
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    findSchemaByName(schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        /** @type {?} */
        let foundSchema = {};
        _.each(schemaArray, (schema) => {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    getPageInSchemaByLabel(schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        /** @type {?} */
        let foundPage = {};
        _.each(schema.pages, (page) => {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        /** @type {?} */
        const foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        /** @type {?} */
        let foundSection = {};
        _.each(foundPage.sections, (section) => {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    getQuestionByIdInSchema(schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            /** @type {?} */
            let question;
            for (let i = 0; i < schema.length; i++) {
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
                /** @type {?} */
                const toExpand = (schema.pages || schema.sections || schema.questions);
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
     * @private
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
     * @private
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    getQuestionsArrayByQuestionId(parent, object, questionId) {
        if (Array.isArray(object)) {
            /** @type {?} */
            let returnedValue;
            for (let i = 0; i < object.length; i++) {
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
                /** @type {?} */
                const toExpand = (object.pages || object.sections || object.questions);
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
    // object is page or section or question
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    isSchemaSubObjectExpandable(object) {
        if (typeof object === 'object') {
            /** @type {?} */
            const objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    isQuestionObjectWithId(object, id) {
        return object['id'] === id;
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    getAllPlaceholderObjects(schema) {
        /** @type {?} */
        const referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    }
    /**
     * @private
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    extractPlaceholderObjects(subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (let i = 0; i < subSchema.length; i++) {
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
                /** @type {?} */
                const toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    }
    /**
     * @private
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    fillPlaceholderObject(placeHolderObject, referenceObject) {
        for (const member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    }
    /**
     * @private
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    replaceAllPlaceholdersWithActualObjects(keyValReferencedForms, placeHoldersArray) {
        _.each(placeHoldersArray, (placeHolder) => {
            /** @type {?} */
            const referencedObject = this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
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
     * @private
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    removeObjectFromArray(array, object) {
        /** @type {?} */
        const indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    }
    /**
     * @private
     * @param {?} placeHolder
     * @return {?}
     */
    removeExcludedQuestionsFromPlaceholder(placeHolder) {
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, (excludedQuestionId) => {
                /** @type {?} */
                const questionsArray = this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                /** @type {?} */
                const question = this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    }
    /**
     * @private
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
     * @private
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    getReferencedForms(formSchema, formSchemasLookupArray) {
        /** @type {?} */
        const referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        /** @type {?} */
        const keyValReferencedForms = {};
        _.each(referencedForms, (reference) => {
            keyValReferencedForms[reference.alias] =
                this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    }
}
FormSchemaCompiler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormSchemaCompiler.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCO0lBRUEsQ0FBQzs7Ozs7O0lBRU0saUJBQWlCLENBQUMsVUFBa0IsRUFBRSxvQkFBZ0M7OztjQUVyRSxRQUFRLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQztRQUNsRixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFBRSxPQUFPLFVBQVUsQ0FBQztTQUFFOzs7Y0FHekMsWUFBWSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUM7UUFDOUQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQUUsT0FBTyxVQUFVLENBQUM7U0FBRTtRQUVuRCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyRSxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7O0lBR08sZ0JBQWdCLENBQUMsV0FBdUIsRUFBRSxZQUFvQjtRQUNwRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTs7WUFDOUQsV0FBVyxHQUFRLEVBQUU7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFX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LENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUN6QyxhQUFhLENBQUMsSUFBSSxFQUNsQixhQUFhLENBQUMsT0FBTyxDQUN0QixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQ2hDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFDekMsYUFBYSxDQUFDLElBQUksQ0FDbkIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7Ozs7OztJQUVPLGtCQUFrQixDQUFDLFVBQWUsRUFBRSxzQkFBa0M7O2NBQ3RFLGVBQWUsR0FBZSxVQUFVLENBQUMsZUFBZTtRQUU5RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFBRSxPQUFPO1NBQUU7O2NBRXJDLHFCQUFxQixHQUFXLEVBQUU7UUFFeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFjLEVBQUUsRUFBRTtZQUN6QyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOzs7WUE1UEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TY2hlbWFDb21waWxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBwdWJsaWMgY29tcGlsZUZvcm1TY2hlbWEoZm9ybVNjaGVtYTogT2JqZWN0LCByZWZlcmVuY2VkQ29tcG9uZW50czogQXJyYXk8YW55Pik6IE9iamVjdCB7XG4gICAgLy8gZ2V0IGFsbCByZWZlcmVuY2VkIGZvcm1zXG4gICAgY29uc3QgcmVmRm9ybXM6IE9iamVjdCA9IHRoaXMuZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWEsIHJlZmVyZW5jZWRDb21wb25lbnRzKTtcbiAgICBpZiAoXy5pc0VtcHR5KHJlZkZvcm1zKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxuXG4gICAgLy8gZ2V0IGFsbCBwbGFjZS1ob2xkZXJzIGZyb20gdGhlIGZvcm0gc2NoZW1hXG4gICAgY29uc3QgcGxhY2VIb2xkZXJzID0gdGhpcy5nZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoZm9ybVNjaGVtYSk7XG4gICAgaWYgKF8uaXNFbXB0eShwbGFjZUhvbGRlcnMpKSB7IHJldHVybiBmb3JtU2NoZW1hOyB9XG5cbiAgICAvLyByZXBsYWNlIGFsbCBwbGFjZUhvbGRlcnNcbiAgICB0aGlzLnJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0cyhyZWZGb3JtcywgcGxhY2VIb2xkZXJzKTtcbiAgICByZXR1cm4gZm9ybVNjaGVtYTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBmaW5kU2NoZW1hQnlOYW1lKHNjaGVtYUFycmF5OiBBcnJheTxhbnk+LCBuYW1lT2ZTY2hlbWE6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWFBcnJheSkgfHwgXy5pc0VtcHR5KG5hbWVPZlNjaGVtYSkpIHsgcmV0dXJuOyB9XG4gICAgbGV0IGZvdW5kU2NoZW1hOiBhbnkgPSB7fTtcbiAgICBfLmVhY2goc2NoZW1hQXJyYXksIChzY2hlbWE6IGFueSkgPT4ge1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBuYW1lT2ZTY2hlbWEpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBzY2hlbWE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kU2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYTogYW55LCBwYWdlTGFiZWw6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpKSB7IHJldHVybjsgfVxuICAgIGxldCBmb3VuZFBhZ2U6IE9iamVjdCA9IHt9O1xuICAgIF8uZWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XG4gICAgICBpZiAocGFnZS5sYWJlbCA9PT0gcGFnZUxhYmVsKSB7XG4gICAgICAgIGZvdW5kUGFnZSA9IHBhZ2U7XG4gICAgICB9XG4gICAgfVxuICAgICk7XG4gICAgcmV0dXJuIGZvdW5kUGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbFxuICAgIChzY2hlbWE6IE9iamVjdCwgcGFnZUxhYmVsOiBzdHJpbmcsIHNlY3Rpb25MYWJlbDogc3RyaW5nKTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHBhZ2VMYWJlbCkgfHwgXy5pc0VtcHR5KHNlY3Rpb25MYWJlbCkpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgZm91bmRQYWdlOiBhbnkgPSB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoc2NoZW1hLCBwYWdlTGFiZWwpO1xuICAgIGlmIChfLmlzRW1wdHkoZm91bmRQYWdlKSkgeyByZXR1cm47IH1cbiAgICBsZXQgZm91bmRTZWN0aW9uOiBPYmplY3QgPSB7fTtcbiAgICBfLmVhY2goZm91bmRQYWdlLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xuICAgICAgaWYgKHNlY3Rpb24ubGFiZWwgPT09IHNlY3Rpb25MYWJlbCkge1xuICAgICAgICBmb3VuZFNlY3Rpb24gPSBzZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICApO1xuICAgIHJldHVybiBmb3VuZFNlY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYTogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgIGxldCBxdWVzdGlvbjogQXJyYXk8YW55PjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoZW1hLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KHNjaGVtYVtpXSkpIHtcbiAgICAgICAgICBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEoc2NoZW1hW2ldLCBxdWVzdGlvbklkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNFbXB0eShxdWVzdGlvbikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25PYmplY3RXaXRoSWQoc2NoZW1hLCBxdWVzdGlvbklkKSkge1xuICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzY2hlbWEpKSB7XG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKHNjaGVtYS5wYWdlcyB8fCBzY2hlbWEuc2VjdGlvbnMgfHwgc2NoZW1hLnF1ZXN0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShxdWVzdGlvbklkKSkgeyByZXR1cm47IH1cbiAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZChzY2hlbWEsIHNjaGVtYSwgcXVlc3Rpb25JZCk7XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQocGFyZW50OiBhbnksIG9iamVjdDogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBsZXQgcmV0dXJuZWRWYWx1ZTogQXJyYXk8YW55PjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KG9iamVjdFtpXSkpIHtcbiAgICAgICAgICByZXR1cm5lZFZhbHVlID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZChvYmplY3QsIG9iamVjdFtpXSwgcXVlc3Rpb25JZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocmV0dXJuZWRWYWx1ZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuZWRWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodGhpcy5pc1F1ZXN0aW9uT2JqZWN0V2l0aElkKG9iamVjdCwgcXVlc3Rpb25JZCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUob2JqZWN0KSkge1xuICAgICAgICBjb25zdCB0b0V4cGFuZCA9IChvYmplY3QucGFnZXMgfHwgb2JqZWN0LnNlY3Rpb25zIHx8IG9iamVjdC5xdWVzdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZCh0b0V4cGFuZCwgdG9FeHBhbmQsIHF1ZXN0aW9uSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLy8gb2JqZWN0IGlzIHBhZ2Ugb3Igc2VjdGlvbiBvciBxdWVzdGlvblxuICBwcml2YXRlIGlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3Q6IE9iamVjdCk6IEJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICBpZiAoXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAncGFnZXMnKSB8fFxuICAgICAgICBfLmluY2x1ZGVzKG9iamVjdEtleXMsICdzZWN0aW9ucycpIHx8XG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3F1ZXN0aW9ucycpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0OiBPYmplY3QsIGlkOiBhbnkpOiBCb29sZWFuIHtcbiAgICByZXR1cm4gb2JqZWN0WydpZCddID09PSBpZDtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hOiBPYmplY3QpOiBBcnJheTxhbnk+IHtcbiAgICBjb25zdCByZWZlcmVuY2VkT2JqZWN0czogQXJyYXk8YW55PiA9IFtdO1xuICAgIHRoaXMuZXh0cmFjdFBsYWNlaG9sZGVyT2JqZWN0cyhzY2hlbWEsIHJlZmVyZW5jZWRPYmplY3RzKTtcbiAgICByZXR1cm4gcmVmZXJlbmNlZE9iamVjdHM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hOiBhbnksIG9iamVjdHNBcnJheTogQXJyYXk8T2JqZWN0Pik6IHZvaWQge1xuICAgIGlmIChfLmlzRW1wdHkoc3ViU2NoZW1hKSkgeyByZXR1cm47IH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJTY2hlbWEpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlNjaGVtYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWFbaV0pKSB7XG4gICAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHN1YlNjaGVtYVtpXSwgb2JqZWN0c0FycmF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1YlNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYS5yZWZlcmVuY2UpKSB7XG4gICAgICAgIG9iamVjdHNBcnJheS5wdXNoKHN1YlNjaGVtYSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKHN1YlNjaGVtYSkpIHtcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc3ViU2NoZW1hLnBhZ2VzIHx8IHN1YlNjaGVtYS5zZWN0aW9ucyB8fCBzdWJTY2hlbWEucXVlc3Rpb25zKTtcbiAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHRvRXhwYW5kLCBvYmplY3RzQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlsbFBsYWNlaG9sZGVyT2JqZWN0KHBsYWNlSG9sZGVyT2JqZWN0OiBPYmplY3QsIHJlZmVyZW5jZU9iamVjdDogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBmb3IgKGNvbnN0IG1lbWJlciBpbiByZWZlcmVuY2VPYmplY3QpIHtcbiAgICAgIGlmIChfLmlzRW1wdHkocGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSkpIHtcbiAgICAgICAgcGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSA9IHJlZmVyZW5jZU9iamVjdFttZW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGxhY2VIb2xkZXJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIHJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0c1xuICAgIChrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCwgcGxhY2VIb2xkZXJzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICBfLmVhY2gocGxhY2VIb2xkZXJzQXJyYXksIChwbGFjZUhvbGRlcikgPT4ge1xuICAgICAgY29uc3QgcmVmZXJlbmNlZE9iamVjdDogT2JqZWN0ID1cbiAgICAgICAgdGhpcy5nZXRSZWZlcmVuY2VkT2JqZWN0KHBsYWNlSG9sZGVyLnJlZmVyZW5jZSwga2V5VmFsUmVmZXJlbmNlZEZvcm1zKTtcblxuICAgICAgaWYgKF8uaXNFbXB0eShyZWZlcmVuY2VkT2JqZWN0KSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IEVycm9yIGZpbmRpbmcgcmVmZXJlbmNlZCBvYmplY3QnLCBwbGFjZUhvbGRlci5yZWZlcmVuY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLmZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlciwgcmVmZXJlbmNlZE9iamVjdCk7XG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5yZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcik7XG4gICAgICAgIGRlbGV0ZSBwbGFjZUhvbGRlclsncmVmZXJlbmNlJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBsYWNlSG9sZGVyc0FycmF5O1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVPYmplY3RGcm9tQXJyYXkoYXJyYXk6IEFycmF5PGFueT4sIG9iamVjdDogT2JqZWN0KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXhPZk9iamVjdCA9IGFycmF5LmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXhPZk9iamVjdCA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICBhcnJheS5zcGxpY2UoaW5kZXhPZk9iamVjdCwgMSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyOiBhbnkpOiBPYmplY3Qge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zKSkge1xuICAgICAgXy5lYWNoKHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zLCAoZXhjbHVkZWRRdWVzdGlvbklkKSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc0FycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZEluU2NoZW1hKFxuICAgICAgICAgIHBsYWNlSG9sZGVyLCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxdWVzdGlvbnNBcnJheSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShxdWVzdGlvbnNBcnJheSwgZXhjbHVkZWRRdWVzdGlvbklkKTtcblxuICAgICAgICB0aGlzLnJlbW92ZU9iamVjdEZyb21BcnJheShxdWVzdGlvbnNBcnJheSwgcXVlc3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwbGFjZUhvbGRlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZE9iamVjdChyZWZlcmVuY2VEYXRhOiBhbnksIGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuZm9ybSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlIG1pc3NpbmcgZm9ybSBhdHRyaWJ1dGUnLCByZWZlcmVuY2VEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF8uaXNFbXB0eShrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlZCBmb3JtIGFsaWFzIG5vdCBmb3VuZCcsIHJlZmVyZW5jZURhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXG4gICAgICAgIHJlZmVyZW5jZURhdGEucXVlc3Rpb25JZCk7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSAmJiAhXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuc2VjdGlvbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWwoXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxuICAgICAgICByZWZlcmVuY2VEYXRhLnBhZ2UsXG4gICAgICAgIHJlZmVyZW5jZURhdGEuc2VjdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUluU2NoZW1hQnlMYWJlbChcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXG4gICAgICAgIHJlZmVyZW5jZURhdGEucGFnZVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiBVbnN1cHBvcnRlZCByZWZlcmVuY2UgdHlwZScsIHJlZmVyZW5jZURhdGEucmVmZXJlbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWE6IGFueSwgZm9ybVNjaGVtYXNMb29rdXBBcnJheTogQXJyYXk8YW55Pik6IE9iamVjdCB7XG4gICAgY29uc3QgcmVmZXJlbmNlZEZvcm1zOiBBcnJheTxhbnk+ID0gZm9ybVNjaGVtYS5yZWZlcmVuY2VkRm9ybXM7XG5cbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZWRGb3JtcykpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCA9IHt9O1xuXG4gICAgXy5lYWNoKHJlZmVyZW5jZWRGb3JtcywgKHJlZmVyZW5jZTogYW55KSA9PiB7XG4gICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlLmFsaWFzXSA9XG4gICAgICAgIHRoaXMuZmluZFNjaGVtYUJ5TmFtZShmb3JtU2NoZW1hc0xvb2t1cEFycmF5LCByZWZlcmVuY2UuZm9ybU5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBrZXlWYWxSZWZlcmVuY2VkRm9ybXM7XG4gIH1cbn1cbiJdfQ==