/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        _.each(schemaArray, (/**
         * @param {?} schema
         * @return {?}
         */
        (schema) => {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        }));
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
        _.each(schema.pages, (/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        }));
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
        _.each(foundPage.sections, (/**
         * @param {?} section
         * @return {?}
         */
        (section) => {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        }));
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
        _.each(placeHoldersArray, (/**
         * @param {?} placeHolder
         * @return {?}
         */
        (placeHolder) => {
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
        }));
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
            _.each(placeHolder.reference.excludeQuestions, (/**
             * @param {?} excludedQuestionId
             * @return {?}
             */
            (excludedQuestionId) => {
                /** @type {?} */
                const questionsArray = this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                /** @type {?} */
                const question = this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                this.removeObjectFromArray(questionsArray, question);
            }));
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
        _.each(referencedForms, (/**
         * @param {?} reference
         * @return {?}
         */
        (reference) => {
            keyValReferencedForms[reference.alias] =
                this.findSchemaByName(formSchemasLookupArray, reference.formName);
        }));
        return keyValReferencedForms;
    }
}
FormSchemaCompiler.decorators = [
    { type: Injectable },
];
FormSchemaCompiler.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNO0lBQ0o7SUFFQSxDQUFDOzs7Ozs7SUFFTSxpQkFBaUIsQ0FBQyxVQUFrQixFQUFFLG9CQUFnQzs7O2NBRXJFLFFBQVEsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUFDLENBQUM7OztjQUd6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFBQyxDQUFDO1FBRW5ELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsdUNBQXVDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUdPLGdCQUFnQixDQUFDLFdBQXVCLEVBQUUsWUFBb0I7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0s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QkFBa0IsQ0FBQyxVQUFlLEVBQUUsc0JBQWtDOztjQUN0RSxlQUFlLEdBQWUsVUFBVSxDQUFDLGVBQWU7UUFFOUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDOztjQUVyQyxxQkFBcUIsR0FBVyxFQUFFO1FBRXhDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTs7OztRQUFFLENBQUMsU0FBYyxFQUFFLEVBQUU7WUFDekMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxDQUFDLEVBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOzs7WUE1UEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TY2hlbWFDb21waWxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBwdWJsaWMgY29tcGlsZUZvcm1TY2hlbWEoZm9ybVNjaGVtYTogT2JqZWN0LCByZWZlcmVuY2VkQ29tcG9uZW50czogQXJyYXk8YW55Pik6IE9iamVjdCB7XG4gICAgLy8gZ2V0IGFsbCByZWZlcmVuY2VkIGZvcm1zXG4gICAgY29uc3QgcmVmRm9ybXM6IE9iamVjdCA9IHRoaXMuZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWEsIHJlZmVyZW5jZWRDb21wb25lbnRzKTtcbiAgICBpZiAoXy5pc0VtcHR5KHJlZkZvcm1zKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxuXG4gICAgLy8gZ2V0IGFsbCBwbGFjZS1ob2xkZXJzIGZyb20gdGhlIGZvcm0gc2NoZW1hXG4gICAgY29uc3QgcGxhY2VIb2xkZXJzID0gdGhpcy5nZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoZm9ybVNjaGVtYSk7XG4gICAgaWYgKF8uaXNFbXB0eShwbGFjZUhvbGRlcnMpKSB7IHJldHVybiBmb3JtU2NoZW1hOyB9XG5cbiAgICAvLyByZXBsYWNlIGFsbCBwbGFjZUhvbGRlcnNcbiAgICB0aGlzLnJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0cyhyZWZGb3JtcywgcGxhY2VIb2xkZXJzKTtcbiAgICByZXR1cm4gZm9ybVNjaGVtYTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBmaW5kU2NoZW1hQnlOYW1lKHNjaGVtYUFycmF5OiBBcnJheTxhbnk+LCBuYW1lT2ZTY2hlbWE6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWFBcnJheSkgfHwgXy5pc0VtcHR5KG5hbWVPZlNjaGVtYSkpIHsgcmV0dXJuOyB9XG4gICAgbGV0IGZvdW5kU2NoZW1hOiBhbnkgPSB7fTtcbiAgICBfLmVhY2goc2NoZW1hQXJyYXksIChzY2hlbWE6IGFueSkgPT4ge1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBuYW1lT2ZTY2hlbWEpIHtcbiAgICAgICAgZm91bmRTY2hlbWEgPSBzY2hlbWE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kU2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYTogYW55LCBwYWdlTGFiZWw6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpKSB7IHJldHVybjsgfVxuICAgIGxldCBmb3VuZFBhZ2U6IE9iamVjdCA9IHt9O1xuICAgIF8uZWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XG4gICAgICBpZiAocGFnZS5sYWJlbCA9PT0gcGFnZUxhYmVsKSB7XG4gICAgICAgIGZvdW5kUGFnZSA9IHBhZ2U7XG4gICAgICB9XG4gICAgfVxuICAgICk7XG4gICAgcmV0dXJuIGZvdW5kUGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbFxuICAgIChzY2hlbWE6IE9iamVjdCwgcGFnZUxhYmVsOiBzdHJpbmcsIHNlY3Rpb25MYWJlbDogc3RyaW5nKTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHBhZ2VMYWJlbCkgfHwgXy5pc0VtcHR5KHNlY3Rpb25MYWJlbCkpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgZm91bmRQYWdlOiBhbnkgPSB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoc2NoZW1hLCBwYWdlTGFiZWwpO1xuICAgIGlmIChfLmlzRW1wdHkoZm91bmRQYWdlKSkgeyByZXR1cm47IH1cbiAgICBsZXQgZm91bmRTZWN0aW9uOiBPYmplY3QgPSB7fTtcbiAgICBfLmVhY2goZm91bmRQYWdlLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xuICAgICAgaWYgKHNlY3Rpb24ubGFiZWwgPT09IHNlY3Rpb25MYWJlbCkge1xuICAgICAgICBmb3VuZFNlY3Rpb24gPSBzZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICApO1xuICAgIHJldHVybiBmb3VuZFNlY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYTogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgIGxldCBxdWVzdGlvbjogQXJyYXk8YW55PjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoZW1hLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KHNjaGVtYVtpXSkpIHtcbiAgICAgICAgICBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEoc2NoZW1hW2ldLCBxdWVzdGlvbklkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNFbXB0eShxdWVzdGlvbikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25PYmplY3RXaXRoSWQoc2NoZW1hLCBxdWVzdGlvbklkKSkge1xuICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzY2hlbWEpKSB7XG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKHNjaGVtYS5wYWdlcyB8fCBzY2hlbWEuc2VjdGlvbnMgfHwgc2NoZW1hLnF1ZXN0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShxdWVzdGlvbklkKSkgeyByZXR1cm47IH1cbiAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZChzY2hlbWEsIHNjaGVtYSwgcXVlc3Rpb25JZCk7XG4gIH1cblxuXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQocGFyZW50OiBhbnksIG9iamVjdDogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBsZXQgcmV0dXJuZWRWYWx1ZTogQXJyYXk8YW55PjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KG9iamVjdFtpXSkpIHtcbiAgICAgICAgICByZXR1cm5lZFZhbHVlID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZChvYmplY3QsIG9iamVjdFtpXSwgcXVlc3Rpb25JZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocmV0dXJuZWRWYWx1ZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuZWRWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodGhpcy5pc1F1ZXN0aW9uT2JqZWN0V2l0aElkKG9iamVjdCwgcXVlc3Rpb25JZCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUob2JqZWN0KSkge1xuICAgICAgICBjb25zdCB0b0V4cGFuZCA9IChvYmplY3QucGFnZXMgfHwgb2JqZWN0LnNlY3Rpb25zIHx8IG9iamVjdC5xdWVzdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZCh0b0V4cGFuZCwgdG9FeHBhbmQsIHF1ZXN0aW9uSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLy8gb2JqZWN0IGlzIHBhZ2Ugb3Igc2VjdGlvbiBvciBxdWVzdGlvblxuICBwcml2YXRlIGlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3Q6IE9iamVjdCk6IEJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICBpZiAoXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAncGFnZXMnKSB8fFxuICAgICAgICBfLmluY2x1ZGVzKG9iamVjdEtleXMsICdzZWN0aW9ucycpIHx8XG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3F1ZXN0aW9ucycpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0OiBPYmplY3QsIGlkOiBhbnkpOiBCb29sZWFuIHtcbiAgICByZXR1cm4gb2JqZWN0WydpZCddID09PSBpZDtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hOiBPYmplY3QpOiBBcnJheTxhbnk+IHtcbiAgICBjb25zdCByZWZlcmVuY2VkT2JqZWN0czogQXJyYXk8YW55PiA9IFtdO1xuICAgIHRoaXMuZXh0cmFjdFBsYWNlaG9sZGVyT2JqZWN0cyhzY2hlbWEsIHJlZmVyZW5jZWRPYmplY3RzKTtcbiAgICByZXR1cm4gcmVmZXJlbmNlZE9iamVjdHM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hOiBhbnksIG9iamVjdHNBcnJheTogQXJyYXk8T2JqZWN0Pik6IHZvaWQge1xuICAgIGlmIChfLmlzRW1wdHkoc3ViU2NoZW1hKSkgeyByZXR1cm47IH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJTY2hlbWEpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlNjaGVtYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWFbaV0pKSB7XG4gICAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHN1YlNjaGVtYVtpXSwgb2JqZWN0c0FycmF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1YlNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYS5yZWZlcmVuY2UpKSB7XG4gICAgICAgIG9iamVjdHNBcnJheS5wdXNoKHN1YlNjaGVtYSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKHN1YlNjaGVtYSkpIHtcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc3ViU2NoZW1hLnBhZ2VzIHx8IHN1YlNjaGVtYS5zZWN0aW9ucyB8fCBzdWJTY2hlbWEucXVlc3Rpb25zKTtcbiAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHRvRXhwYW5kLCBvYmplY3RzQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlsbFBsYWNlaG9sZGVyT2JqZWN0KHBsYWNlSG9sZGVyT2JqZWN0OiBPYmplY3QsIHJlZmVyZW5jZU9iamVjdDogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBmb3IgKGNvbnN0IG1lbWJlciBpbiByZWZlcmVuY2VPYmplY3QpIHtcbiAgICAgIGlmIChfLmlzRW1wdHkocGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSkpIHtcbiAgICAgICAgcGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSA9IHJlZmVyZW5jZU9iamVjdFttZW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGxhY2VIb2xkZXJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIHJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0c1xuICAgIChrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCwgcGxhY2VIb2xkZXJzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgICBfLmVhY2gocGxhY2VIb2xkZXJzQXJyYXksIChwbGFjZUhvbGRlcikgPT4ge1xuICAgICAgY29uc3QgcmVmZXJlbmNlZE9iamVjdDogT2JqZWN0ID1cbiAgICAgICAgdGhpcy5nZXRSZWZlcmVuY2VkT2JqZWN0KHBsYWNlSG9sZGVyLnJlZmVyZW5jZSwga2V5VmFsUmVmZXJlbmNlZEZvcm1zKTtcblxuICAgICAgaWYgKF8uaXNFbXB0eShyZWZlcmVuY2VkT2JqZWN0KSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IEVycm9yIGZpbmRpbmcgcmVmZXJlbmNlZCBvYmplY3QnLCBwbGFjZUhvbGRlci5yZWZlcmVuY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLmZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlciwgcmVmZXJlbmNlZE9iamVjdCk7XG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5yZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcik7XG4gICAgICAgIGRlbGV0ZSBwbGFjZUhvbGRlclsncmVmZXJlbmNlJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBsYWNlSG9sZGVyc0FycmF5O1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVPYmplY3RGcm9tQXJyYXkoYXJyYXk6IEFycmF5PGFueT4sIG9iamVjdDogT2JqZWN0KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXhPZk9iamVjdCA9IGFycmF5LmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXhPZk9iamVjdCA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICBhcnJheS5zcGxpY2UoaW5kZXhPZk9iamVjdCwgMSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyOiBhbnkpOiBPYmplY3Qge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zKSkge1xuICAgICAgXy5lYWNoKHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zLCAoZXhjbHVkZWRRdWVzdGlvbklkKSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc0FycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZEluU2NoZW1hKFxuICAgICAgICAgIHBsYWNlSG9sZGVyLCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxdWVzdGlvbnNBcnJheSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShxdWVzdGlvbnNBcnJheSwgZXhjbHVkZWRRdWVzdGlvbklkKTtcblxuICAgICAgICB0aGlzLnJlbW92ZU9iamVjdEZyb21BcnJheShxdWVzdGlvbnNBcnJheSwgcXVlc3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwbGFjZUhvbGRlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZE9iamVjdChyZWZlcmVuY2VEYXRhOiBhbnksIGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuZm9ybSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlIG1pc3NpbmcgZm9ybSBhdHRyaWJ1dGUnLCByZWZlcmVuY2VEYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF8uaXNFbXB0eShrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlZCBmb3JtIGFsaWFzIG5vdCBmb3VuZCcsIHJlZmVyZW5jZURhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXG4gICAgICAgIHJlZmVyZW5jZURhdGEucXVlc3Rpb25JZCk7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSAmJiAhXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuc2VjdGlvbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWwoXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxuICAgICAgICByZWZlcmVuY2VEYXRhLnBhZ2UsXG4gICAgICAgIHJlZmVyZW5jZURhdGEuc2VjdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUluU2NoZW1hQnlMYWJlbChcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXG4gICAgICAgIHJlZmVyZW5jZURhdGEucGFnZVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiBVbnN1cHBvcnRlZCByZWZlcmVuY2UgdHlwZScsIHJlZmVyZW5jZURhdGEucmVmZXJlbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWE6IGFueSwgZm9ybVNjaGVtYXNMb29rdXBBcnJheTogQXJyYXk8YW55Pik6IE9iamVjdCB7XG4gICAgY29uc3QgcmVmZXJlbmNlZEZvcm1zOiBBcnJheTxhbnk+ID0gZm9ybVNjaGVtYS5yZWZlcmVuY2VkRm9ybXM7XG5cbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZWRGb3JtcykpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCA9IHt9O1xuXG4gICAgXy5lYWNoKHJlZmVyZW5jZWRGb3JtcywgKHJlZmVyZW5jZTogYW55KSA9PiB7XG4gICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlLmFsaWFzXSA9XG4gICAgICAgIHRoaXMuZmluZFNjaGVtYUJ5TmFtZShmb3JtU2NoZW1hc0xvb2t1cEFycmF5LCByZWZlcmVuY2UuZm9ybU5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBrZXlWYWxSZWZlcmVuY2VkRm9ybXM7XG4gIH1cbn1cbiJdfQ==