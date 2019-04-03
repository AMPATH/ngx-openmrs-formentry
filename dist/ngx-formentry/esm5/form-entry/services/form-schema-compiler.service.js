/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var FormSchemaCompiler = /** @class */ (function () {
    function FormSchemaCompiler() {
    }
    /**
     * @param {?} formSchema
     * @param {?} referencedComponents
     * @return {?}
     */
    FormSchemaCompiler.prototype.compileFormSchema = /**
     * @param {?} formSchema
     * @param {?} referencedComponents
     * @return {?}
     */
    function (formSchema, referencedComponents) {
        // get all referenced forms
        /** @type {?} */
        var refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        /** @type {?} */
        var placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    };
    /**
     * @private
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    FormSchemaCompiler.prototype.findSchemaByName = /**
     * @private
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    function (schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        /** @type {?} */
        var foundSchema = {};
        _.each(schemaArray, (/**
         * @param {?} schema
         * @return {?}
         */
        function (schema) {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        }));
        return foundSchema;
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    FormSchemaCompiler.prototype.getPageInSchemaByLabel = /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    function (schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        /** @type {?} */
        var foundPage = {};
        _.each(schema.pages, (/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        }));
        return foundPage;
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    FormSchemaCompiler.prototype.getSectionInSchemaByPageLabelBySectionLabel = /**
     * @private
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    function (schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        /** @type {?} */
        var foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        /** @type {?} */
        var foundSection = {};
        _.each(foundPage.sections, (/**
         * @param {?} section
         * @return {?}
         */
        function (section) {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        }));
        return foundSection;
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionByIdInSchema = /**
     * @private
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    function (schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            /** @type {?} */
            var question = void 0;
            for (var i = 0; i < schema.length; i++) {
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
                var toExpand = (schema.pages || schema.sections || schema.questions);
                return this.getQuestionByIdInSchema(toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionIdInSchema = /**
     * @private
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    function (schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
    };
    /**
     * @private
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionId = /**
     * @private
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    function (parent, object, questionId) {
        if (Array.isArray(object)) {
            /** @type {?} */
            var returnedValue = void 0;
            for (var i = 0; i < object.length; i++) {
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
                var toExpand = (object.pages || object.sections || object.questions);
                return this.getQuestionsArrayByQuestionId(toExpand, toExpand, questionId);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    // object is page or section or question
    // object is page or section or question
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    FormSchemaCompiler.prototype.isSchemaSubObjectExpandable = 
    // object is page or section or question
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (typeof object === 'object') {
            /** @type {?} */
            var objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    FormSchemaCompiler.prototype.isQuestionObjectWithId = /**
     * @private
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    function (object, id) {
        return object['id'] === id;
    };
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    FormSchemaCompiler.prototype.getAllPlaceholderObjects = /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    };
    /**
     * @private
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.extractPlaceholderObjects = /**
     * @private
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    function (subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (var i = 0; i < subSchema.length; i++) {
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
                var toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    };
    /**
     * @private
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    FormSchemaCompiler.prototype.fillPlaceholderObject = /**
     * @private
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    function (placeHolderObject, referenceObject) {
        for (var member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    };
    /**
     * @private
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.replaceAllPlaceholdersWithActualObjects = /**
     * @private
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    function (keyValReferencedForms, placeHoldersArray) {
        var _this = this;
        _.each(placeHoldersArray, (/**
         * @param {?} placeHolder
         * @return {?}
         */
        function (placeHolder) {
            /** @type {?} */
            var referencedObject = _this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (_.isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = _this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = _this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        }));
        return placeHoldersArray;
    };
    /**
     * @private
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    FormSchemaCompiler.prototype.removeObjectFromArray = /**
     * @private
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    function (array, object) {
        /** @type {?} */
        var indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    };
    /**
     * @private
     * @param {?} placeHolder
     * @return {?}
     */
    FormSchemaCompiler.prototype.removeExcludedQuestionsFromPlaceholder = /**
     * @private
     * @param {?} placeHolder
     * @return {?}
     */
    function (placeHolder) {
        var _this = this;
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, (/**
             * @param {?} excludedQuestionId
             * @return {?}
             */
            function (excludedQuestionId) {
                /** @type {?} */
                var questionsArray = _this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                /** @type {?} */
                var question = _this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                _this.removeObjectFromArray(questionsArray, question);
            }));
        }
        return placeHolder;
    };
    /**
     * @private
     * @param {?} referenceData
     * @param {?} keyValReferencedForms
     * @return {?}
     */
    FormSchemaCompiler.prototype.getReferencedObject = /**
     * @private
     * @param {?} referenceData
     * @param {?} keyValReferencedForms
     * @return {?}
     */
    function (referenceData, keyValReferencedForms) {
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
    };
    /**
     * @private
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.getReferencedForms = /**
     * @private
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    function (formSchema, formSchemasLookupArray) {
        var _this = this;
        /** @type {?} */
        var referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        /** @type {?} */
        var keyValReferencedForms = {};
        _.each(referencedForms, (/**
         * @param {?} reference
         * @return {?}
         */
        function (reference) {
            keyValReferencedForms[reference.alias] =
                _this.findSchemaByName(formSchemasLookupArray, reference.formName);
        }));
        return keyValReferencedForms;
    };
    FormSchemaCompiler.decorators = [
        { type: Injectable },
    ];
    FormSchemaCompiler.ctorParameters = function () { return []; };
    return FormSchemaCompiler;
}());
export { FormSchemaCompiler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QjtJQUVFO0lBRUEsQ0FBQzs7Ozs7O0lBRU0sOENBQWlCOzs7OztJQUF4QixVQUF5QixVQUFrQixFQUFFLG9CQUFnQzs7O1lBRXJFLFFBQVEsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUFDLENBQUM7OztZQUd6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFBQyxDQUFDO1FBRW5ELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsdUNBQXVDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUdPLDZDQUFnQjs7Ozs7O0lBQXhCLFVBQXlCLFdBQXVCLEVBQUUsWUFBb0I7UUFDcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENB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QUFDLHNCQUFzQixDQUNoQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQ3pDLGFBQWEsQ0FBQyxJQUFJLENBQ25CLENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7Ozs7OztJQUVPLCtDQUFrQjs7Ozs7O0lBQTFCLFVBQTJCLFVBQWUsRUFBRSxzQkFBa0M7UUFBOUUsaUJBWUM7O1lBWE8sZUFBZSxHQUFlLFVBQVUsQ0FBQyxlQUFlO1FBRTlELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQUMsQ0FBQzs7WUFFckMscUJBQXFCLEdBQVcsRUFBRTtRQUV4QyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWU7Ozs7UUFBRSxVQUFDLFNBQWM7WUFDckMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxDQUFDLEVBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOztnQkE1UEYsVUFBVTs7O0lBNlBYLHlCQUFDO0NBQUEsQUE3UEQsSUE2UEM7U0E1UFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtU2NoZW1hQ29tcGlsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb21waWxlRm9ybVNjaGVtYShmb3JtU2NoZW1hOiBPYmplY3QsIHJlZmVyZW5jZWRDb21wb25lbnRzOiBBcnJheTxhbnk+KTogT2JqZWN0IHtcclxuICAgIC8vIGdldCBhbGwgcmVmZXJlbmNlZCBmb3Jtc1xyXG4gICAgY29uc3QgcmVmRm9ybXM6IE9iamVjdCA9IHRoaXMuZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWEsIHJlZmVyZW5jZWRDb21wb25lbnRzKTtcclxuICAgIGlmIChfLmlzRW1wdHkocmVmRm9ybXMpKSB7IHJldHVybiBmb3JtU2NoZW1hOyB9XHJcblxyXG4gICAgLy8gZ2V0IGFsbCBwbGFjZS1ob2xkZXJzIGZyb20gdGhlIGZvcm0gc2NoZW1hXHJcbiAgICBjb25zdCBwbGFjZUhvbGRlcnMgPSB0aGlzLmdldEFsbFBsYWNlaG9sZGVyT2JqZWN0cyhmb3JtU2NoZW1hKTtcclxuICAgIGlmIChfLmlzRW1wdHkocGxhY2VIb2xkZXJzKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxyXG5cclxuICAgIC8vIHJlcGxhY2UgYWxsIHBsYWNlSG9sZGVyc1xyXG4gICAgdGhpcy5yZXBsYWNlQWxsUGxhY2Vob2xkZXJzV2l0aEFjdHVhbE9iamVjdHMocmVmRm9ybXMsIHBsYWNlSG9sZGVycyk7XHJcbiAgICByZXR1cm4gZm9ybVNjaGVtYTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGZpbmRTY2hlbWFCeU5hbWUoc2NoZW1hQXJyYXk6IEFycmF5PGFueT4sIG5hbWVPZlNjaGVtYTogc3RyaW5nKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hQXJyYXkpIHx8IF8uaXNFbXB0eShuYW1lT2ZTY2hlbWEpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kU2NoZW1hOiBhbnkgPSB7fTtcclxuICAgIF8uZWFjaChzY2hlbWFBcnJheSwgKHNjaGVtYTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzY2hlbWEubmFtZSA9PT0gbmFtZU9mU2NoZW1hKSB7XHJcbiAgICAgICAgZm91bmRTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvdW5kU2NoZW1hO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYTogYW55LCBwYWdlTGFiZWw6IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHBhZ2VMYWJlbCkpIHsgcmV0dXJuOyB9XHJcbiAgICBsZXQgZm91bmRQYWdlOiBPYmplY3QgPSB7fTtcclxuICAgIF8uZWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XHJcbiAgICAgIGlmIChwYWdlLmxhYmVsID09PSBwYWdlTGFiZWwpIHtcclxuICAgICAgICBmb3VuZFBhZ2UgPSBwYWdlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGZvdW5kUGFnZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbFxyXG4gICAgKHNjaGVtYTogT2JqZWN0LCBwYWdlTGFiZWw6IHN0cmluZywgc2VjdGlvbkxhYmVsOiBzdHJpbmcpOiBPYmplY3Qge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpIHx8IF8uaXNFbXB0eShzZWN0aW9uTGFiZWwpKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgZm91bmRQYWdlOiBhbnkgPSB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoc2NoZW1hLCBwYWdlTGFiZWwpO1xyXG4gICAgaWYgKF8uaXNFbXB0eShmb3VuZFBhZ2UpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kU2VjdGlvbjogT2JqZWN0ID0ge307XHJcbiAgICBfLmVhY2goZm91bmRQYWdlLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc2VjdGlvbi5sYWJlbCA9PT0gc2VjdGlvbkxhYmVsKSB7XHJcbiAgICAgICAgZm91bmRTZWN0aW9uID0gc2VjdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3VuZFNlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYTogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocXVlc3Rpb25JZCkpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XHJcbiAgICAgIGxldCBxdWVzdGlvbjogQXJyYXk8YW55PjtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2hlbWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShzY2hlbWFbaV0pKSB7XHJcbiAgICAgICAgICBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeUlkSW5TY2hlbWEoc2NoZW1hW2ldLCBxdWVzdGlvbklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocXVlc3Rpb24pKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAodGhpcy5pc1F1ZXN0aW9uT2JqZWN0V2l0aElkKHNjaGVtYSwgcXVlc3Rpb25JZCkpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1hO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKHNjaGVtYSkpIHtcclxuICAgICAgICBjb25zdCB0b0V4cGFuZCA9IChzY2hlbWEucGFnZXMgfHwgc2NoZW1hLnNlY3Rpb25zIHx8IHNjaGVtYS5xdWVzdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQoc2NoZW1hLCBzY2hlbWEsIHF1ZXN0aW9uSWQpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQocGFyZW50OiBhbnksIG9iamVjdDogYW55LCBxdWVzdGlvbklkOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcclxuICAgICAgbGV0IHJldHVybmVkVmFsdWU6IEFycmF5PGFueT47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob2JqZWN0W2ldKSkge1xyXG4gICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQob2JqZWN0LCBvYmplY3RbaV0sIHF1ZXN0aW9uSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXR1cm5lZFZhbHVlKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmV0dXJuZWRWYWx1ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvbk9iamVjdFdpdGhJZChvYmplY3QsIHF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3QpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAob2JqZWN0LnBhZ2VzIHx8IG9iamVjdC5zZWN0aW9ucyB8fCBvYmplY3QucXVlc3Rpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZCh0b0V4cGFuZCwgdG9FeHBhbmQsIHF1ZXN0aW9uSWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gb2JqZWN0IGlzIHBhZ2Ugb3Igc2VjdGlvbiBvciBxdWVzdGlvblxyXG4gIHByaXZhdGUgaXNTY2hlbWFTdWJPYmplY3RFeHBhbmRhYmxlKG9iamVjdDogT2JqZWN0KTogQm9vbGVhbiB7XHJcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3Qgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XHJcbiAgICAgIGlmIChfLmluY2x1ZGVzKG9iamVjdEtleXMsICdwYWdlcycpIHx8XHJcbiAgICAgICAgXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAnc2VjdGlvbnMnKSB8fFxyXG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3F1ZXN0aW9ucycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNRdWVzdGlvbk9iamVjdFdpdGhJZChvYmplY3Q6IE9iamVjdCwgaWQ6IGFueSk6IEJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iamVjdFsnaWQnXSA9PT0gaWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hOiBPYmplY3QpOiBBcnJheTxhbnk+IHtcclxuICAgIGNvbnN0IHJlZmVyZW5jZWRPYmplY3RzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc2NoZW1hLCByZWZlcmVuY2VkT2JqZWN0cyk7XHJcbiAgICByZXR1cm4gcmVmZXJlbmNlZE9iamVjdHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hOiBhbnksIG9iamVjdHNBcnJheTogQXJyYXk8T2JqZWN0Pik6IHZvaWQge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzdWJTY2hlbWEpKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViU2NoZW1hKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlNjaGVtYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYVtpXSkpIHtcclxuICAgICAgICAgIHRoaXMuZXh0cmFjdFBsYWNlaG9sZGVyT2JqZWN0cyhzdWJTY2hlbWFbaV0sIG9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJTY2hlbWEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICghXy5pc0VtcHR5KHN1YlNjaGVtYS5yZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgb2JqZWN0c0FycmF5LnB1c2goc3ViU2NoZW1hKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzdWJTY2hlbWEpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc3ViU2NoZW1hLnBhZ2VzIHx8IHN1YlNjaGVtYS5zZWN0aW9ucyB8fCBzdWJTY2hlbWEucXVlc3Rpb25zKTtcclxuICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHModG9FeHBhbmQsIG9iamVjdHNBcnJheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsbFBsYWNlaG9sZGVyT2JqZWN0KHBsYWNlSG9sZGVyT2JqZWN0OiBPYmplY3QsIHJlZmVyZW5jZU9iamVjdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgIGZvciAoY29uc3QgbWVtYmVyIGluIHJlZmVyZW5jZU9iamVjdCkge1xyXG4gICAgICBpZiAoXy5pc0VtcHR5KHBsYWNlSG9sZGVyT2JqZWN0W21lbWJlcl0pKSB7XHJcbiAgICAgICAgcGxhY2VIb2xkZXJPYmplY3RbbWVtYmVyXSA9IHJlZmVyZW5jZU9iamVjdFttZW1iZXJdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXJPYmplY3Q7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlcGxhY2VBbGxQbGFjZWhvbGRlcnNXaXRoQWN0dWFsT2JqZWN0c1xyXG4gICAgKGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0LCBwbGFjZUhvbGRlcnNBcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG4gICAgXy5lYWNoKHBsYWNlSG9sZGVyc0FycmF5LCAocGxhY2VIb2xkZXIpID0+IHtcclxuICAgICAgY29uc3QgcmVmZXJlbmNlZE9iamVjdDogT2JqZWN0ID1cclxuICAgICAgICB0aGlzLmdldFJlZmVyZW5jZWRPYmplY3QocGxhY2VIb2xkZXIucmVmZXJlbmNlLCBrZXlWYWxSZWZlcmVuY2VkRm9ybXMpO1xyXG5cclxuICAgICAgaWYgKF8uaXNFbXB0eShyZWZlcmVuY2VkT2JqZWN0KSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogRXJyb3IgZmluZGluZyByZWZlcmVuY2VkIG9iamVjdCcsIHBsYWNlSG9sZGVyLnJlZmVyZW5jZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLmZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlciwgcmVmZXJlbmNlZE9iamVjdCk7XHJcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLnJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyKTtcclxuICAgICAgICBkZWxldGUgcGxhY2VIb2xkZXJbJ3JlZmVyZW5jZSddO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwbGFjZUhvbGRlcnNBcnJheTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlT2JqZWN0RnJvbUFycmF5KGFycmF5OiBBcnJheTxhbnk+LCBvYmplY3Q6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5kZXhPZk9iamVjdCA9IGFycmF5LmluZGV4T2Yob2JqZWN0KTtcclxuICAgIGlmIChpbmRleE9mT2JqZWN0ID09PSAtMSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBhcnJheS5zcGxpY2UoaW5kZXhPZk9iamVjdCwgMSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUV4Y2x1ZGVkUXVlc3Rpb25zRnJvbVBsYWNlaG9sZGVyKHBsYWNlSG9sZGVyOiBhbnkpOiBPYmplY3Qge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMpKSB7XHJcbiAgICAgIF8uZWFjaChwbGFjZUhvbGRlci5yZWZlcmVuY2UuZXhjbHVkZVF1ZXN0aW9ucywgKGV4Y2x1ZGVkUXVlc3Rpb25JZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uc0FycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5nZXRRdWVzdGlvbnNBcnJheUJ5UXVlc3Rpb25JZEluU2NoZW1hKFxyXG4gICAgICAgICAgcGxhY2VIb2xkZXIsIGV4Y2x1ZGVkUXVlc3Rpb25JZCk7XHJcblxyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxdWVzdGlvbnNBcnJheSkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHF1ZXN0aW9uc0FycmF5LCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZU9iamVjdEZyb21BcnJheShxdWVzdGlvbnNBcnJheSwgcXVlc3Rpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwbGFjZUhvbGRlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZE9iamVjdChyZWZlcmVuY2VEYXRhOiBhbnksIGtleVZhbFJlZmVyZW5jZWRGb3JtczogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5mb3JtKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IHJlZmVyZW5jZSBtaXNzaW5nIGZvcm0gYXR0cmlidXRlJywgcmVmZXJlbmNlRGF0YSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChfLmlzRW1wdHkoa2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0pKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gY29tcGlsZTogcmVmZXJlbmNlZCBmb3JtIGFsaWFzIG5vdCBmb3VuZCcsIHJlZmVyZW5jZURhdGEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKFxyXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEucXVlc3Rpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSAmJiAhXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuc2VjdGlvbikpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VjdGlvbkluU2NoZW1hQnlQYWdlTGFiZWxCeVNlY3Rpb25MYWJlbChcclxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcclxuICAgICAgICByZWZlcmVuY2VEYXRhLnBhZ2UsXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5zZWN0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAoIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnBhZ2UpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VJblNjaGVtYUJ5TGFiZWwoXHJcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5wYWdlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IFVuc3VwcG9ydGVkIHJlZmVyZW5jZSB0eXBlJywgcmVmZXJlbmNlRGF0YS5yZWZlcmVuY2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZWZlcmVuY2VkRm9ybXMoZm9ybVNjaGVtYTogYW55LCBmb3JtU2NoZW1hc0xvb2t1cEFycmF5OiBBcnJheTxhbnk+KTogT2JqZWN0IHtcclxuICAgIGNvbnN0IHJlZmVyZW5jZWRGb3JtczogQXJyYXk8YW55PiA9IGZvcm1TY2hlbWEucmVmZXJlbmNlZEZvcm1zO1xyXG5cclxuICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlZEZvcm1zKSkgeyByZXR1cm47IH1cclxuXHJcbiAgICBjb25zdCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCA9IHt9O1xyXG5cclxuICAgIF8uZWFjaChyZWZlcmVuY2VkRm9ybXMsIChyZWZlcmVuY2U6IGFueSkgPT4ge1xyXG4gICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlLmFsaWFzXSA9XHJcbiAgICAgICAgdGhpcy5maW5kU2NoZW1hQnlOYW1lKGZvcm1TY2hlbWFzTG9va3VwQXJyYXksIHJlZmVyZW5jZS5mb3JtTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBrZXlWYWxSZWZlcmVuY2VkRm9ybXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==