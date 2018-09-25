/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ refForms = this.getReferencedForms(formSchema, referencedComponents);
        if (_.isEmpty(refForms)) {
            return formSchema;
        }
        // get all place-holders from the form schema
        var /** @type {?} */ placeHolders = this.getAllPlaceholderObjects(formSchema);
        if (_.isEmpty(placeHolders)) {
            return formSchema;
        }
        // replace all placeHolders
        this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
        return formSchema;
    };
    /**
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    FormSchemaCompiler.prototype.findSchemaByName = /**
     * @param {?} schemaArray
     * @param {?} nameOfSchema
     * @return {?}
     */
    function (schemaArray, nameOfSchema) {
        if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
            return;
        }
        var /** @type {?} */ foundSchema = {};
        _.each(schemaArray, function (schema) {
            if (schema.name === nameOfSchema) {
                foundSchema = schema;
            }
        });
        return foundSchema;
    };
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    FormSchemaCompiler.prototype.getPageInSchemaByLabel = /**
     * @param {?} schema
     * @param {?} pageLabel
     * @return {?}
     */
    function (schema, pageLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
            return;
        }
        var /** @type {?} */ foundPage = {};
        _.each(schema.pages, function (page) {
            if (page.label === pageLabel) {
                foundPage = page;
            }
        });
        return foundPage;
    };
    /**
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    FormSchemaCompiler.prototype.getSectionInSchemaByPageLabelBySectionLabel = /**
     * @param {?} schema
     * @param {?} pageLabel
     * @param {?} sectionLabel
     * @return {?}
     */
    function (schema, pageLabel, sectionLabel) {
        if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
            return;
        }
        var /** @type {?} */ foundPage = this.getPageInSchemaByLabel(schema, pageLabel);
        if (_.isEmpty(foundPage)) {
            return;
        }
        var /** @type {?} */ foundSection = {};
        _.each(foundPage.sections, function (section) {
            if (section.label === sectionLabel) {
                foundSection = section;
            }
        });
        return foundSection;
    };
    /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionByIdInSchema = /**
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    function (schema, questionId) {
        if (_.isEmpty(schema) || _.isEmpty(questionId)) {
            return;
        }
        if (Array.isArray(schema)) {
            var /** @type {?} */ question = void 0;
            for (var /** @type {?} */ i = 0; i < schema.length; i++) {
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
                var /** @type {?} */ toExpand = (schema.pages || schema.sections || schema.questions);
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
     * @param {?} schema
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionIdInSchema = /**
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
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    FormSchemaCompiler.prototype.getQuestionsArrayByQuestionId = /**
     * @param {?} parent
     * @param {?} object
     * @param {?} questionId
     * @return {?}
     */
    function (parent, object, questionId) {
        if (Array.isArray(object)) {
            var /** @type {?} */ returnedValue = void 0;
            for (var /** @type {?} */ i = 0; i < object.length; i++) {
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
                var /** @type {?} */ toExpand = (object.pages || object.sections || object.questions);
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
    /**
     * @param {?} object
     * @return {?}
     */
    FormSchemaCompiler.prototype.isSchemaSubObjectExpandable = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (typeof object === 'object') {
            var /** @type {?} */ objectKeys = Object.keys(object);
            if (_.includes(objectKeys, 'pages') ||
                _.includes(objectKeys, 'sections') ||
                _.includes(objectKeys, 'questions')) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    FormSchemaCompiler.prototype.isQuestionObjectWithId = /**
     * @param {?} object
     * @param {?} id
     * @return {?}
     */
    function (object, id) {
        return object['id'] === id;
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    FormSchemaCompiler.prototype.getAllPlaceholderObjects = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var /** @type {?} */ referencedObjects = [];
        this.extractPlaceholderObjects(schema, referencedObjects);
        return referencedObjects;
    };
    /**
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.extractPlaceholderObjects = /**
     * @param {?} subSchema
     * @param {?} objectsArray
     * @return {?}
     */
    function (subSchema, objectsArray) {
        if (_.isEmpty(subSchema)) {
            return;
        }
        if (Array.isArray(subSchema)) {
            for (var /** @type {?} */ i = 0; i < subSchema.length; i++) {
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
                var /** @type {?} */ toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                this.extractPlaceholderObjects(toExpand, objectsArray);
            }
        }
    };
    /**
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    FormSchemaCompiler.prototype.fillPlaceholderObject = /**
     * @param {?} placeHolderObject
     * @param {?} referenceObject
     * @return {?}
     */
    function (placeHolderObject, referenceObject) {
        for (var /** @type {?} */ member in referenceObject) {
            if (_.isEmpty(placeHolderObject[member])) {
                placeHolderObject[member] = referenceObject[member];
            }
        }
        return placeHolderObject;
    };
    /**
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.replaceAllPlaceholdersWithActualObjects = /**
     * @param {?} keyValReferencedForms
     * @param {?} placeHoldersArray
     * @return {?}
     */
    function (keyValReferencedForms, placeHoldersArray) {
        var _this = this;
        _.each(placeHoldersArray, function (placeHolder) {
            var /** @type {?} */ referencedObject = _this.getReferencedObject(placeHolder.reference, keyValReferencedForms);
            if (_.isEmpty(referencedObject)) {
                console.error('Form compile: Error finding referenced object', placeHolder.reference);
            }
            else {
                placeHolder = _this.fillPlaceholderObject(placeHolder, referencedObject);
                placeHolder = _this.removeExcludedQuestionsFromPlaceholder(placeHolder);
                delete placeHolder['reference'];
            }
        });
        return placeHoldersArray;
    };
    /**
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    FormSchemaCompiler.prototype.removeObjectFromArray = /**
     * @param {?} array
     * @param {?} object
     * @return {?}
     */
    function (array, object) {
        var /** @type {?} */ indexOfObject = array.indexOf(object);
        if (indexOfObject === -1) {
            return;
        }
        array.splice(indexOfObject, 1);
    };
    /**
     * @param {?} placeHolder
     * @return {?}
     */
    FormSchemaCompiler.prototype.removeExcludedQuestionsFromPlaceholder = /**
     * @param {?} placeHolder
     * @return {?}
     */
    function (placeHolder) {
        var _this = this;
        if (Array.isArray(placeHolder.reference.excludeQuestions)) {
            _.each(placeHolder.reference.excludeQuestions, function (excludedQuestionId) {
                var /** @type {?} */ questionsArray = _this.getQuestionsArrayByQuestionIdInSchema(placeHolder, excludedQuestionId);
                if (!Array.isArray(questionsArray)) {
                    return;
                }
                var /** @type {?} */ question = _this.getQuestionByIdInSchema(questionsArray, excludedQuestionId);
                _this.removeObjectFromArray(questionsArray, question);
            });
        }
        return placeHolder;
    };
    /**
     * @param {?} referenceData
     * @param {?} keyValReferencedForms
     * @return {?}
     */
    FormSchemaCompiler.prototype.getReferencedObject = /**
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
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    FormSchemaCompiler.prototype.getReferencedForms = /**
     * @param {?} formSchema
     * @param {?} formSchemasLookupArray
     * @return {?}
     */
    function (formSchema, formSchemasLookupArray) {
        var _this = this;
        var /** @type {?} */ referencedForms = formSchema.referencedForms;
        if (_.isEmpty(referencedForms)) {
            return;
        }
        var /** @type {?} */ keyValReferencedForms = {};
        _.each(referencedForms, function (reference) {
            keyValReferencedForms[reference.alias] =
                _this.findSchemaByName(formSchemasLookupArray, reference.formName);
        });
        return keyValReferencedForms;
    };
    FormSchemaCompiler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormSchemaCompiler.ctorParameters = function () { return []; };
    return FormSchemaCompiler;
}());
export { FormSchemaCompiler };
function FormSchemaCompiler_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormSchemaCompiler.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormSchemaCompiler.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvc2VydmljZXMvZm9ybS1zY2hlbWEtY29tcGlsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7SUFJMUI7S0FFQzs7Ozs7O0lBRU0sOENBQWlCOzs7OztjQUFDLFVBQWtCLEVBQUUsb0JBQWdDOztRQUUzRSxxQkFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25GLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUFFOztRQUcvQyxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUFFOztRQUduRCxJQUFJLENBQUMsdUNBQXVDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7SUFJWiw2Q0FBZ0I7Ozs7O2NBQUMsV0FBdUIsRUFBRSxZQUFvQjtRQUNwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFDbEUscUJBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFDLE1BQVc7WUFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2FBQ3RCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztJQUdiLG1EQUFzQjs7Ozs7Y0FBQyxNQUFXLEVBQUUsU0FBaUI7UUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQzFELHFCQUFJLFNBQVMsR0FBVyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDbEI7U0FDRixDQUNBLENBQUM7UUFDRixNQUFNLENBQUMsU0FBUyxDQUFDOzs7Ozs7OztJQUdYLHdFQUEyQzs7Ozs7O2NBQ2hELE1BQWMsRUFBRSxTQUFpQixFQUFFLFlBQW9CO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3JGLHFCQUFNLFNBQVMsR0FBUSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFDckMscUJBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBQyxPQUFPO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUN4QjtTQUNGLENBQ0EsQ0FBQztRQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7SUFHZCxvREFBdUI7Ozs7O2NBQUMsTUFBVyxFQUFFLFVBQWtCO1FBQzdELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUMzRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixxQkFBSSxRQUFRLFNBQVksQ0FBQztZQUN6QixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNoRTtnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFLLENBQUM7aUJBQ1A7YUFDRjtZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNmO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELHFCQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDO2FBQ1I7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDO1NBQ1I7Ozs7Ozs7SUFHSyxrRUFBcUM7Ozs7O2NBQUMsTUFBVyxFQUFFLFVBQWtCO1FBQzNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7O0lBSWhFLDBEQUE2Qjs7Ozs7O2NBQUMsTUFBVyxFQUFFLE1BQVcsRUFBRSxVQUFrQjtRQUNoRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixxQkFBSSxhQUFhLFNBQVksQ0FBQztZQUM5QixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLGFBQWEsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDbkY7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxDQUFDO2lCQUNQO2FBQ0Y7WUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDO1NBQ3RCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDZjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxxQkFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDM0U7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUM7YUFDUjtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUM7U0FDUjs7Ozs7O0lBSUssd0RBQTJCOzs7O2NBQUMsTUFBYztRQUNoRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLHFCQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztnQkFDakMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztJQUdQLG1EQUFzQjs7Ozs7Y0FBQyxNQUFjLEVBQUUsRUFBTztRQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7O0lBSXJCLHFEQUF3Qjs7OztjQUFDLE1BQWM7UUFDN0MscUJBQU0saUJBQWlCLEdBQWUsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsaUJBQWlCLENBQUM7Ozs7Ozs7SUFHbkIsc0RBQXlCOzs7OztjQUFDLFNBQWMsRUFBRSxZQUEyQjtRQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDNUQ7YUFDRjtTQUNGO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUI7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQscUJBQU0sUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN4RDtTQUNGOzs7Ozs7O0lBR0ssa0RBQXFCOzs7OztjQUFDLGlCQUF5QixFQUFFLGVBQXVCO1FBQzlFLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLE1BQU0sSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtTQUNGO1FBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDOzs7Ozs7O0lBR25CLG9FQUF1Qzs7Ozs7Y0FDNUMscUJBQTZCLEVBQUUsaUJBQTZCOztRQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsV0FBVztZQUNwQyxxQkFBTSxnQkFBZ0IsR0FDcEIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUV6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN2RjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFdBQVcsR0FBRyxLQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hFLFdBQVcsR0FBRyxLQUFJLENBQUMsc0NBQXNDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZFLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDOzs7Ozs7O0lBR25CLGtEQUFxQjs7Ozs7Y0FBQyxLQUFpQixFQUFFLE1BQWM7UUFDN0QscUJBQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBRXJDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFHekIsbUVBQXNDOzs7O2NBQUMsV0FBZ0I7O1FBQzdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxrQkFBa0I7Z0JBQ2hFLHFCQUFNLGNBQWMsR0FBZSxLQUFJLENBQUMscUNBQXFDLENBQzNFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUVuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQztpQkFBRTtnQkFDL0MscUJBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFFbEYsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0RCxDQUFDLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7SUFHYixnREFBbUI7Ozs7O2NBQUMsYUFBa0IsRUFBRSxxQkFBNkI7UUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDL0UsTUFBTSxDQUFDO1NBQ1I7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sQ0FBQztTQUNSO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FDakMscUJBQXFCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUN6QyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0I7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQ3JELHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFDekMsYUFBYSxDQUFDLElBQUksRUFDbEIsYUFBYSxDQUFDLE9BQU8sQ0FDdEIsQ0FBQztTQUNIO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FDaEMscUJBQXFCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUN6QyxhQUFhLENBQUMsSUFBSSxDQUNuQixDQUFDO1NBQ0g7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7OztJQUc3RSwrQ0FBa0I7Ozs7O2NBQUMsVUFBZSxFQUFFLHNCQUFrQzs7UUFDNUUscUJBQU0sZUFBZSxHQUFlLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFFL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUUzQyxxQkFBTSxxQkFBcUIsR0FBVyxFQUFFLENBQUM7UUFFekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxTQUFjO1lBQ3JDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckUsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHFCQUFxQixDQUFDOzs7Z0JBM1BoQyxVQUFVOzs7OzZCQUhYOztTQUlhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybVNjaGVtYUNvbXBpbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29tcGlsZUZvcm1TY2hlbWEoZm9ybVNjaGVtYTogT2JqZWN0LCByZWZlcmVuY2VkQ29tcG9uZW50czogQXJyYXk8YW55Pik6IE9iamVjdCB7XHJcbiAgICAvLyBnZXQgYWxsIHJlZmVyZW5jZWQgZm9ybXNcclxuICAgIGNvbnN0IHJlZkZvcm1zOiBPYmplY3QgPSB0aGlzLmdldFJlZmVyZW5jZWRGb3Jtcyhmb3JtU2NoZW1hLCByZWZlcmVuY2VkQ29tcG9uZW50cyk7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZkZvcm1zKSkgeyByZXR1cm4gZm9ybVNjaGVtYTsgfVxyXG5cclxuICAgIC8vIGdldCBhbGwgcGxhY2UtaG9sZGVycyBmcm9tIHRoZSBmb3JtIHNjaGVtYVxyXG4gICAgY29uc3QgcGxhY2VIb2xkZXJzID0gdGhpcy5nZXRBbGxQbGFjZWhvbGRlck9iamVjdHMoZm9ybVNjaGVtYSk7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHBsYWNlSG9sZGVycykpIHsgcmV0dXJuIGZvcm1TY2hlbWE7IH1cclxuXHJcbiAgICAvLyByZXBsYWNlIGFsbCBwbGFjZUhvbGRlcnNcclxuICAgIHRoaXMucmVwbGFjZUFsbFBsYWNlaG9sZGVyc1dpdGhBY3R1YWxPYmplY3RzKHJlZkZvcm1zLCBwbGFjZUhvbGRlcnMpO1xyXG4gICAgcmV0dXJuIGZvcm1TY2hlbWE7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBmaW5kU2NoZW1hQnlOYW1lKHNjaGVtYUFycmF5OiBBcnJheTxhbnk+LCBuYW1lT2ZTY2hlbWE6IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYUFycmF5KSB8fCBfLmlzRW1wdHkobmFtZU9mU2NoZW1hKSkgeyByZXR1cm47IH1cclxuICAgIGxldCBmb3VuZFNjaGVtYTogYW55ID0ge307XHJcbiAgICBfLmVhY2goc2NoZW1hQXJyYXksIChzY2hlbWE6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IG5hbWVPZlNjaGVtYSkge1xyXG4gICAgICAgIGZvdW5kU2NoZW1hID0gc2NoZW1hO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3VuZFNjaGVtYTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFnZUluU2NoZW1hQnlMYWJlbChzY2hlbWE6IGFueSwgcGFnZUxhYmVsOiBzdHJpbmcpOiBPYmplY3Qge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShwYWdlTGFiZWwpKSB7IHJldHVybjsgfVxyXG4gICAgbGV0IGZvdW5kUGFnZTogT2JqZWN0ID0ge307XHJcbiAgICBfLmVhY2goc2NoZW1hLnBhZ2VzLCAocGFnZSkgPT4ge1xyXG4gICAgICBpZiAocGFnZS5sYWJlbCA9PT0gcGFnZUxhYmVsKSB7XHJcbiAgICAgICAgZm91bmRQYWdlID0gcGFnZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBmb3VuZFBhZ2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWxcclxuICAgIChzY2hlbWE6IE9iamVjdCwgcGFnZUxhYmVsOiBzdHJpbmcsIHNlY3Rpb25MYWJlbDogc3RyaW5nKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzRW1wdHkoc2NoZW1hKSB8fCBfLmlzRW1wdHkocGFnZUxhYmVsKSB8fCBfLmlzRW1wdHkoc2VjdGlvbkxhYmVsKSkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGZvdW5kUGFnZTogYW55ID0gdGhpcy5nZXRQYWdlSW5TY2hlbWFCeUxhYmVsKHNjaGVtYSwgcGFnZUxhYmVsKTtcclxuICAgIGlmIChfLmlzRW1wdHkoZm91bmRQYWdlKSkgeyByZXR1cm47IH1cclxuICAgIGxldCBmb3VuZFNlY3Rpb246IE9iamVjdCA9IHt9O1xyXG4gICAgXy5lYWNoKGZvdW5kUGFnZS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcclxuICAgICAgaWYgKHNlY3Rpb24ubGFiZWwgPT09IHNlY3Rpb25MYWJlbCkge1xyXG4gICAgICAgIGZvdW5kU2VjdGlvbiA9IHNlY3Rpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gZm91bmRTZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShzY2hlbWE6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHNjaGVtYSkgfHwgXy5pc0VtcHR5KHF1ZXN0aW9uSWQpKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xyXG4gICAgICBsZXQgcXVlc3Rpb246IEFycmF5PGFueT47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoZW1hLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkoc2NoZW1hW2ldKSkge1xyXG4gICAgICAgICAgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlJZEluU2NoZW1hKHNjaGVtYVtpXSwgcXVlc3Rpb25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHF1ZXN0aW9uKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBxdWVzdGlvbjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvbk9iamVjdFdpdGhJZChzY2hlbWEsIHF1ZXN0aW9uSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShzY2hlbWEpKSB7XHJcbiAgICAgICAgY29uc3QgdG9FeHBhbmQgPSAoc2NoZW1hLnBhZ2VzIHx8IHNjaGVtYS5zZWN0aW9ucyB8fCBzY2hlbWEucXVlc3Rpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYSh0b0V4cGFuZCwgcXVlc3Rpb25JZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkSW5TY2hlbWEoc2NoZW1hOiBhbnksIHF1ZXN0aW9uSWQ6IHN0cmluZyk6IEFycmF5PGFueT4ge1xyXG4gICAgaWYgKF8uaXNFbXB0eShzY2hlbWEpIHx8IF8uaXNFbXB0eShxdWVzdGlvbklkKSkgeyByZXR1cm47IH1cclxuICAgIHJldHVybiB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHNjaGVtYSwgc2NoZW1hLCBxdWVzdGlvbklkKTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIGdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKHBhcmVudDogYW55LCBvYmplY3Q6IGFueSwgcXVlc3Rpb25JZDogc3RyaW5nKTogQXJyYXk8YW55PiB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XHJcbiAgICAgIGxldCByZXR1cm5lZFZhbHVlOiBBcnJheTxhbnk+O1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KG9iamVjdFtpXSkpIHtcclxuICAgICAgICAgIHJldHVybmVkVmFsdWUgPSB0aGlzLmdldFF1ZXN0aW9uc0FycmF5QnlRdWVzdGlvbklkKG9iamVjdCwgb2JqZWN0W2ldLCBxdWVzdGlvbklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkocmV0dXJuZWRWYWx1ZSkpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJldHVybmVkVmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0LCBxdWVzdGlvbklkKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUob2JqZWN0KSkge1xyXG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKG9iamVjdC5wYWdlcyB8fCBvYmplY3Quc2VjdGlvbnMgfHwgb2JqZWN0LnF1ZXN0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWQodG9FeHBhbmQsIHRvRXhwYW5kLCBxdWVzdGlvbklkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIG9iamVjdCBpcyBwYWdlIG9yIHNlY3Rpb24gb3IgcXVlc3Rpb25cclxuICBwcml2YXRlIGlzU2NoZW1hU3ViT2JqZWN0RXhwYW5kYWJsZShvYmplY3Q6IE9iamVjdCk6IEJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNvbnN0IG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xyXG4gICAgICBpZiAoXy5pbmNsdWRlcyhvYmplY3RLZXlzLCAncGFnZXMnKSB8fFxyXG4gICAgICAgIF8uaW5jbHVkZXMob2JqZWN0S2V5cywgJ3NlY3Rpb25zJykgfHxcclxuICAgICAgICBfLmluY2x1ZGVzKG9iamVjdEtleXMsICdxdWVzdGlvbnMnKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGlzUXVlc3Rpb25PYmplY3RXaXRoSWQob2JqZWN0OiBPYmplY3QsIGlkOiBhbnkpOiBCb29sZWFuIHtcclxuICAgIHJldHVybiBvYmplY3RbJ2lkJ10gPT09IGlkO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWxsUGxhY2Vob2xkZXJPYmplY3RzKHNjaGVtYTogT2JqZWN0KTogQXJyYXk8YW55PiB7XHJcbiAgICBjb25zdCByZWZlcmVuY2VkT2JqZWN0czogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHNjaGVtYSwgcmVmZXJlbmNlZE9iamVjdHMpO1xyXG4gICAgcmV0dXJuIHJlZmVyZW5jZWRPYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHN1YlNjaGVtYTogYW55LCBvYmplY3RzQXJyYXk6IEFycmF5PE9iamVjdD4pOiB2b2lkIHtcclxuICAgIGlmIChfLmlzRW1wdHkoc3ViU2NoZW1hKSkgeyByZXR1cm47IH1cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YlNjaGVtYSkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJTY2hlbWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWFbaV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmV4dHJhY3RQbGFjZWhvbGRlck9iamVjdHMoc3ViU2NoZW1hW2ldLCBvYmplY3RzQXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViU2NoZW1hID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoIV8uaXNFbXB0eShzdWJTY2hlbWEucmVmZXJlbmNlKSkge1xyXG4gICAgICAgIG9iamVjdHNBcnJheS5wdXNoKHN1YlNjaGVtYSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVtYVN1Yk9iamVjdEV4cGFuZGFibGUoc3ViU2NoZW1hKSkge1xyXG4gICAgICAgIGNvbnN0IHRvRXhwYW5kID0gKHN1YlNjaGVtYS5wYWdlcyB8fCBzdWJTY2hlbWEuc2VjdGlvbnMgfHwgc3ViU2NoZW1hLnF1ZXN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5leHRyYWN0UGxhY2Vob2xkZXJPYmplY3RzKHRvRXhwYW5kLCBvYmplY3RzQXJyYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbGxQbGFjZWhvbGRlck9iamVjdChwbGFjZUhvbGRlck9iamVjdDogT2JqZWN0LCByZWZlcmVuY2VPYmplY3Q6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICBmb3IgKGNvbnN0IG1lbWJlciBpbiByZWZlcmVuY2VPYmplY3QpIHtcclxuICAgICAgaWYgKF8uaXNFbXB0eShwbGFjZUhvbGRlck9iamVjdFttZW1iZXJdKSkge1xyXG4gICAgICAgIHBsYWNlSG9sZGVyT2JqZWN0W21lbWJlcl0gPSByZWZlcmVuY2VPYmplY3RbbWVtYmVyXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBsYWNlSG9sZGVyT2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXBsYWNlQWxsUGxhY2Vob2xkZXJzV2l0aEFjdHVhbE9iamVjdHNcclxuICAgIChrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCwgcGxhY2VIb2xkZXJzQXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgIF8uZWFjaChwbGFjZUhvbGRlcnNBcnJheSwgKHBsYWNlSG9sZGVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZmVyZW5jZWRPYmplY3Q6IE9iamVjdCA9XHJcbiAgICAgICAgdGhpcy5nZXRSZWZlcmVuY2VkT2JqZWN0KHBsYWNlSG9sZGVyLnJlZmVyZW5jZSwga2V5VmFsUmVmZXJlbmNlZEZvcm1zKTtcclxuXHJcbiAgICAgIGlmIChfLmlzRW1wdHkocmVmZXJlbmNlZE9iamVjdCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IEVycm9yIGZpbmRpbmcgcmVmZXJlbmNlZCBvYmplY3QnLCBwbGFjZUhvbGRlci5yZWZlcmVuY2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5maWxsUGxhY2Vob2xkZXJPYmplY3QocGxhY2VIb2xkZXIsIHJlZmVyZW5jZWRPYmplY3QpO1xyXG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5yZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcik7XHJcbiAgICAgICAgZGVsZXRlIHBsYWNlSG9sZGVyWydyZWZlcmVuY2UnXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXJzQXJyYXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU9iamVjdEZyb21BcnJheShhcnJheTogQXJyYXk8YW55Piwgb2JqZWN0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluZGV4T2ZPYmplY3QgPSBhcnJheS5pbmRleE9mKG9iamVjdCk7XHJcbiAgICBpZiAoaW5kZXhPZk9iamVjdCA9PT0gLTEpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgYXJyYXkuc3BsaWNlKGluZGV4T2ZPYmplY3QsIDEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVFeGNsdWRlZFF1ZXN0aW9uc0Zyb21QbGFjZWhvbGRlcihwbGFjZUhvbGRlcjogYW55KTogT2JqZWN0IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlSG9sZGVyLnJlZmVyZW5jZS5leGNsdWRlUXVlc3Rpb25zKSkge1xyXG4gICAgICBfLmVhY2gocGxhY2VIb2xkZXIucmVmZXJlbmNlLmV4Y2x1ZGVRdWVzdGlvbnMsIChleGNsdWRlZFF1ZXN0aW9uSWQpID0+IHtcclxuICAgICAgICBjb25zdCBxdWVzdGlvbnNBcnJheTogQXJyYXk8YW55PiA9IHRoaXMuZ2V0UXVlc3Rpb25zQXJyYXlCeVF1ZXN0aW9uSWRJblNjaGVtYShcclxuICAgICAgICAgIHBsYWNlSG9sZGVyLCBleGNsdWRlZFF1ZXN0aW9uSWQpO1xyXG5cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocXVlc3Rpb25zQXJyYXkpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShxdWVzdGlvbnNBcnJheSwgZXhjbHVkZWRRdWVzdGlvbklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVPYmplY3RGcm9tQXJyYXkocXVlc3Rpb25zQXJyYXksIHF1ZXN0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGxhY2VIb2xkZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlZmVyZW5jZWRPYmplY3QocmVmZXJlbmNlRGF0YTogYW55LCBrZXlWYWxSZWZlcmVuY2VkRm9ybXM6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEuZm9ybSkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiByZWZlcmVuY2UgbWlzc2luZyBmb3JtIGF0dHJpYnV0ZScsIHJlZmVyZW5jZURhdGEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc0VtcHR5KGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGb3JtIGNvbXBpbGU6IHJlZmVyZW5jZWQgZm9ybSBhbGlhcyBub3QgZm91bmQnLCByZWZlcmVuY2VEYXRhKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5xdWVzdGlvbklkKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRRdWVzdGlvbkJ5SWRJblNjaGVtYShcclxuICAgICAgICBrZXlWYWxSZWZlcmVuY2VkRm9ybXNbcmVmZXJlbmNlRGF0YS5mb3JtXSxcclxuICAgICAgICByZWZlcmVuY2VEYXRhLnF1ZXN0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghXy5pc0VtcHR5KHJlZmVyZW5jZURhdGEucGFnZSkgJiYgIV8uaXNFbXB0eShyZWZlcmVuY2VEYXRhLnNlY3Rpb24pKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25JblNjaGVtYUJ5UGFnZUxhYmVsQnlTZWN0aW9uTGFiZWwoXHJcbiAgICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZURhdGEuZm9ybV0sXHJcbiAgICAgICAgcmVmZXJlbmNlRGF0YS5wYWdlLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEuc2VjdGlvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCFfLmlzRW1wdHkocmVmZXJlbmNlRGF0YS5wYWdlKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRQYWdlSW5TY2hlbWFCeUxhYmVsKFxyXG4gICAgICAgIGtleVZhbFJlZmVyZW5jZWRGb3Jtc1tyZWZlcmVuY2VEYXRhLmZvcm1dLFxyXG4gICAgICAgIHJlZmVyZW5jZURhdGEucGFnZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcignRm9ybSBjb21waWxlOiBVbnN1cHBvcnRlZCByZWZlcmVuY2UgdHlwZScsIHJlZmVyZW5jZURhdGEucmVmZXJlbmNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVmZXJlbmNlZEZvcm1zKGZvcm1TY2hlbWE6IGFueSwgZm9ybVNjaGVtYXNMb29rdXBBcnJheTogQXJyYXk8YW55Pik6IE9iamVjdCB7XHJcbiAgICBjb25zdCByZWZlcmVuY2VkRm9ybXM6IEFycmF5PGFueT4gPSBmb3JtU2NoZW1hLnJlZmVyZW5jZWRGb3JtcztcclxuXHJcbiAgICBpZiAoXy5pc0VtcHR5KHJlZmVyZW5jZWRGb3JtcykpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgY29uc3Qga2V5VmFsUmVmZXJlbmNlZEZvcm1zOiBPYmplY3QgPSB7fTtcclxuXHJcbiAgICBfLmVhY2gocmVmZXJlbmNlZEZvcm1zLCAocmVmZXJlbmNlOiBhbnkpID0+IHtcclxuICAgICAga2V5VmFsUmVmZXJlbmNlZEZvcm1zW3JlZmVyZW5jZS5hbGlhc10gPVxyXG4gICAgICAgIHRoaXMuZmluZFNjaGVtYUJ5TmFtZShmb3JtU2NoZW1hc0xvb2t1cEFycmF5LCByZWZlcmVuY2UuZm9ybU5hbWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ga2V5VmFsUmVmZXJlbmNlZEZvcm1zO1xyXG4gIH1cclxufVxyXG4iXX0=