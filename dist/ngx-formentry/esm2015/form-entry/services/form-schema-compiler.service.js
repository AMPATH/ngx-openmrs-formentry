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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNO0lBQ0o7SUFFQSxDQUFDOzs7Ozs7SUFFTSxpQkFBaUIsQ0FBQyxVQUFrQixFQUFFLG9CQUFnQzs7O2NBRXJFLFFBQVEsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUFDLENBQUM7OztjQUd6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFBQyxDQUFDO1FBRW5ELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsdUNBQXVDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUdPLGdCQUFnQixDQUFDLFdBQXVCLEVBQUUsWUFBb0I7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0s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QkFBa0IsQ0FBQyxVQUFlLEVBQUUsc0JBQWtDOztjQUN0RSxlQUFlLEdBQWUsVUFBVSxDQUFDLGVBQWU7UUFFOUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDOztjQUVyQyxxQkFBcUIsR0FBVyxFQUFFO1FBRXhDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTs7OztRQUFFLENBQUMsU0FBYyxFQUFFLEVBQUU7WUFDekMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxDQUFDLEVBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOzs7WUE1UEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVNjaGVtYUNvbXBpbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29tcGlsZUZvcm1TY2hlbWEoZm9ybVNjaGVtYTogT2JqZWN0LCByZWZlcmVuY2VkQ29tcG9uZW50czogQXJyYXk8YW55Pik6IE9iamVjdCB7XHJcbiAgICAvLyBnZXQgYWxsIHJlZmVyZW5jZWQgZm9ybXNcclxuICAgIGNvbnN0IHJlZkZvcm1zOiBPYmplY3QgPSB0aGlzLmdldFJlZmVyZW5jZWRGb3Jtcyhmb3JtU2NoZW1hLCByZWZlcmVuY2VkQ29tcG9uZW50cyk7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZkZvcm1zKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxyXG5cclxuICAgIC8vIGdldCBhbGwgcGxhY2UtaG9sZGVycyBmcm9tIHRoZSBmb3JtIHNjaGVtYVxyXG4gICAgY29uc3QgcGxhY2VIb2xkZXJzID0gdGhpcy5nZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoZm9ybVNjaGVtYSk7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHBsYWNlSG9sZGVycykpIHsgcmV0dXJuIGZvcm1TY2hlbWE7IH1cclxuXHJcbiAgICAvLyByZXBsYWNlIGFsbCBwbGFjZUhvbGRlcnNcclxuICAgIHRoaXMucmVwbGFjZUFsbFBsYWNlaG9sZGVyc1dpdGhBY3R1YWxPYmplY3RzKHJlZkZvcm1zLCBwbGFjZUhvbGRlcnMpO1xyXG4gICAgcmV0dXJuIGZvcm1TY2hlbWE7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBmaW5kU2NoZW1hQnlOYW1lKHNjaGVtYUFycmF5OiBBcnJheTxhbnk+LCBuYW1lT2ZTY2hlbWE6IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYUFycmF5KSB8fCBfLmlzRW1wdHkobmFtZU9mU2NoZW1hKSkgeyByZXR1cm47IH1cclxuICAgIGxldCBmb3VuZFNjaGVtYTogYW55ID0ge307XHJcbiAgICBfLmVhY2goc2NoZW1hQXJyYXksIChzY2hlbWE6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IG5hbWVPZlNjaGVtYSkge1xyXG4gICAgICAgIGZvdW5kU2NoZW1hID0gc2NoZW1hO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFnZUluU2NoZW1hQnlMYWJlbChzY2hlbWE6IGFueSwgcGFnZUxhYmVsOiBzdHJpbmcpOiBPYmplY3Qge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kUGFnZTogT2JqZWN0ID0ge307XHJcbiAgICBfLmVhY2goc2NoZW1hLnBhZ2VzLCAocGFnZSkgPT4ge1xyXG4gICAgICBpZiAocGFnZS5sYWJlbCA9PT0gcGFnZUxhYmVsKSB7XHJcbiAgICAgICAgZm91bmRQYWdlID0gcGFnZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3VuZFBhZ2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWxcclxuICAgIChzY2hlbWE6IE9iamVjdCwgcGFnZUxhYmVsOiBzdHJpbmcsIHNlY3Rpb25MYWJlbDogc3RyaW5nKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocGFnZUxhYmVsKSB8fCBfLmlzRW1wdHkoc2VjdGlvbkxhYmVsKSkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGZvdW5kUGFnZTogYW55ID0gdGhpcy5nZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYSwgcGFnZUxhYmVsKTtcclxuICAgIGlmIChfLmlzRW1wdHkoZm91bmRQYWdlKSkgeyByZXR1cm47IH1cclxuICAgIGxldCBmb3VuZFNlY3Rpb246IE9iamVjdCA9IHt9O1xyXG4gICAgXy5lYWNoKGZvdW5kUGFnZS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcclxuICAgICAgaWYgKHNlY3Rpb24ubGFiZWwgPT09IHNlY3Rpb25MYWJlbCkge1xyXG4gICAgICAgIGZvdW5kU2VjdGlvbiA9IHNlY3Rpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gZm91bmRTZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xyXG4gICAgICBsZXQgcXVlc3Rpb246IEFycmF5PGFueT47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoZW1hLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoc2NoZW1hW2ldKSkge1xyXG4gICAgICAgICAgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYVtpXSwgcXVlc3Rpb25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHF1ZXN0aW9uKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvbk9iamVjdFdpdGhJZChzY2hlbWEsIHF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzY2hlbWEpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc2NoZW1hLnBhZ2VzIHx8IHNjaGVtYS5zZWN0aW9ucyB8fCBzY2hlbWEucXVlc3Rpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYSh0b0V4cGFuZCwgcXVlc3Rpb25JZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkSW5TY2hlbWEoc2NoZW1hOiBhbnksIHF1ZXN0aW9uSWQ6IHN0cmluZyk6IEFycmF5PGFueT4ge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShxdWVzdGlvbklkKSkgeyByZXR1cm47IH1cclxuICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHNjaGVtYSwgc2NoZW1hLCBxdWVzdGlvbklkKTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHBhcmVudDogYW55LCBvYmplY3Q6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XHJcbiAgICAgIGxldCByZXR1cm5lZFZhbHVlOiBBcnJheTxhbnk+O1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KG9iamVjdFtpXSkpIHtcclxuICAgICAgICAgIHJldHVybmVkVmFsdWUgPSB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKG9iamVjdCwgb2JqZWN0W2ldLCBxdWVzdGlvbklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocmV0dXJuZWRWYWx1ZSkpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJldHVybmVkVmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0LCBxdWVzdGlvbklkKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUob2JqZWN0KSkge1xyXG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKG9iamVjdC5wYWdlcyB8fCBvYmplY3Quc2VjdGlvbnMgfHwgb2JqZWN0LnF1ZXN0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQodG9FeHBhbmQsIHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIG9iamVjdCBpcyBwYWdlIG9yIHNlY3Rpb24gb3IgcXVlc3Rpb25cclxuICBwcml2YXRlIGlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3Q6IE9iamVjdCk6IEJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNvbnN0IG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICBpZiAoXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAncGFnZXMnKSB8fFxyXG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3NlY3Rpb25zJykgfHxcclxuICAgICAgICBfLmluY2x1ZGVzKG9iamVjdEtleXMsICdxdWVzdGlvbnMnKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0OiBPYmplY3QsIGlkOiBhbnkpOiBCb29sZWFuIHtcclxuICAgIHJldHVybiBvYmplY3RbJ2lkJ10gPT09IGlkO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWxsUGxhY2Vob2xkZXJPYmplY3RzKHNjaGVtYTogT2JqZWN0KTogQXJyYXk8YW55PiB7XHJcbiAgICBjb25zdCByZWZlcmVuY2VkT2JqZWN0czogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHNjaGVtYSwgcmVmZXJlbmNlZE9iamVjdHMpO1xyXG4gICAgcmV0dXJuIHJlZmVyZW5jZWRPYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHN1YlNjaGVtYTogYW55LCBvYmplY3RzQXJyYXk6IEFycmF5PE9iamVjdD4pOiB2b2lkIHtcclxuICAgIGlmIChfLmlzRW1wdHkoc3ViU2NoZW1hKSkgeyByZXR1cm47IH1cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YlNjaGVtYSkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJTY2hlbWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWFbaV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hW2ldLCBvYmplY3RzQXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViU2NoZW1hID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWEucmVmZXJlbmNlKSkge1xyXG4gICAgICAgIG9iamVjdHNBcnJheS5wdXNoKHN1YlNjaGVtYSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUoc3ViU2NoZW1hKSkge1xyXG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKHN1YlNjaGVtYS5wYWdlcyB8fCBzdWJTY2hlbWEuc2VjdGlvbnMgfHwgc3ViU2NoZW1hLnF1ZXN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHRvRXhwYW5kLCBvYmplY3RzQXJyYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlck9iamVjdDogT2JqZWN0LCByZWZlcmVuY2VPYmplY3Q6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICBmb3IgKGNvbnN0IG1lbWJlciBpbiByZWZlcmVuY2VPYmplY3QpIHtcclxuICAgICAgaWYgKF8uaXNFbXB0eShwbGFjZUhvbGRlck9iamVjdFttZW1iZXJdKSkge1xyXG4gICAgICAgIHBsYWNlSG9sZGVyT2JqZWN0W21lbWJlcl0gPSByZWZlcmVuY2VPYmplY3RbbWVtYmVyXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsYWNlSG9sZGVyT2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXBsYWNlQWxsUGxhY2Vob2xkZXJzV2l0aEFjdHVhbE9iamVjdHNcclxuICAgIChrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCwgcGxhY2VIb2xkZXJzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgIF8uZWFjaChwbGFjZUhvbGRlcnNBcnJheSwgKHBsYWNlSG9sZGVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZmVyZW5jZWRPYmplY3Q6IE9iamVjdCA9XHJcbiAgICAgICAgdGhpcy5nZXRSZWZlcmVuY2VkT2JqZWN0KHBsYWNlSG9sZGVyLnJlZmVyZW5jZSwga2V5VmFsUmVmZXJlbmNlZEZvcm1zKTtcclxuXHJcbiAgICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlZE9iamVjdCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IEVycm9yIGZpbmRpbmcgcmVmZXJlbmNlZCBvYmplY3QnLCBwbGFjZUhvbGRlci5yZWZlcmVuY2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5maWxsUGxhY2Vob2xkZXJPYmplY3QocGxhY2VIb2xkZXIsIHJlZmVyZW5jZWRPYmplY3QpO1xyXG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5yZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcik7XHJcbiAgICAgICAgZGVsZXRlIHBsYWNlSG9sZGVyWydyZWZlcmVuY2UnXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXJzQXJyYXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU9iamVjdEZyb21BcnJheShhcnJheTogQXJyYXk8YW55Piwgb2JqZWN0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluZGV4T2ZPYmplY3QgPSBhcnJheS5pbmRleE9mKG9iamVjdCk7XHJcbiAgICBpZiAoaW5kZXhPZk9iamVjdCA9PT0gLTEpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgYXJyYXkuc3BsaWNlKGluZGV4T2ZPYmplY3QsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcjogYW55KTogT2JqZWN0IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zKSkge1xyXG4gICAgICBfLmVhY2gocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMsIChleGNsdWRlZFF1ZXN0aW9uSWQpID0+IHtcclxuICAgICAgICBjb25zdCBxdWVzdGlvbnNBcnJheTogQXJyYXk8YW55PiA9IHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShcclxuICAgICAgICAgIHBsYWNlSG9sZGVyLCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocXVlc3Rpb25zQXJyYXkpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShxdWVzdGlvbnNBcnJheSwgZXhjbHVkZWRRdWVzdGlvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVPYmplY3RGcm9tQXJyYXkocXVlc3Rpb25zQXJyYXksIHF1ZXN0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlZmVyZW5jZWRPYmplY3QocmVmZXJlbmNlRGF0YTogYW55LCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuZm9ybSkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiByZWZlcmVuY2UgbWlzc2luZyBmb3JtIGF0dHJpYnV0ZScsIHJlZmVyZW5jZURhdGEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc0VtcHR5KGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IHJlZmVyZW5jZWQgZm9ybSBhbGlhcyBub3QgZm91bmQnLCByZWZlcmVuY2VEYXRhKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5xdWVzdGlvbklkKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShcclxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcclxuICAgICAgICByZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEucGFnZSkgJiYgIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnNlY3Rpb24pKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWwoXHJcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5wYWdlLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEuc2VjdGlvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRQYWdlSW5TY2hlbWFCeUxhYmVsKFxyXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEucGFnZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiBVbnN1cHBvcnRlZCByZWZlcmVuY2UgdHlwZScsIHJlZmVyZW5jZURhdGEucmVmZXJlbmNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWE6IGFueSwgZm9ybVNjaGVtYXNMb29rdXBBcnJheTogQXJyYXk8YW55Pik6IE9iamVjdCB7XHJcbiAgICBjb25zdCByZWZlcmVuY2VkRm9ybXM6IEFycmF5PGFueT4gPSBmb3JtU2NoZW1hLnJlZmVyZW5jZWRGb3JtcztcclxuXHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZWRGb3JtcykpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgY29uc3Qga2V5VmFsUmVmZXJlbmNlZEZvcm1zOiBPYmplY3QgPSB7fTtcclxuXHJcbiAgICBfLmVhY2gocmVmZXJlbmNlZEZvcm1zLCAocmVmZXJlbmNlOiBhbnkpID0+IHtcclxuICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZS5hbGlhc10gPVxyXG4gICAgICAgIHRoaXMuZmluZFNjaGVtYUJ5TmFtZShmb3JtU2NoZW1hc0xvb2t1cEFycmF5LCByZWZlcmVuY2UuZm9ybU5hbWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ga2V5VmFsUmVmZXJlbmNlZEZvcm1zO1xyXG4gIH1cclxufVxyXG4iXX0=