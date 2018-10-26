/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from 'lodash';
import { TextInputQuestion } from '../question-models/text-input-question';
import { TextAreaInputQuestion } from '../question-models/text-area-input-question';
import { SelectQuestion } from '../question-models/select-question';
import { UiSelectQuestion } from '../question-models/ui-select-question';
import { DateQuestion } from '../question-models/date-question';
import { MultiSelectQuestion } from '../question-models/multi-select-question';
import { QuestionGroup } from '../question-models/group-question';
import { RepeatingQuestion } from '../question-models/repeating-question';
import { FileUploadQuestion } from '../question-models/file-upload-question';
import { TestOrderQuestion } from '../question-models/test-order-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel } from '../question-models/max-validation.model';
import { MinValidationModel } from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { DummyDataSource } from '../data-sources/dummy-data-source';
import { HistoricalHelperService } from '../helpers/historical-expression-helper-service';
import { CheckBoxQuestion } from '../question-models/models';
export class QuestionFactory {
    constructor() {
        this.dataSources = {};
        this.historicalHelperService = new HistoricalHelperService();
    }
    /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    createQuestionModel(formSchema, form) {
        if (form) {
            const /** @type {?} */ dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toSelectQuestion(schemaQuestion) {
        const /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        const /** @type {?} */ options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toNumericQuestion(schemaQuestion) {
        const /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toNumberQuestion(schemaQuestion) {
        const /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        question.validators = this.addValidators(schemaQuestion);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toDateQuestion(schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        const /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = /** @type {?} */ (schemaQuestion.questionOptions.showTime);
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toEncounterDatetimeQuestion(schemaQuestion) {
        const /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        question.showTime = true;
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toCheckBoxQuestion(schemaQuestion) {
        const /** @type {?} */ question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map((obj) => {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        const /** @type {?} */ mappings = {
            label: 'label',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toMultiCheckboxQuestion(schemaQuestion) {
        const /** @type {?} */ question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.validators = this.addValidators(schemaQuestion);
        question.dataSource = new DummyDataSource();
        question.extras = schemaQuestion;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toTextAreaQuestion(schemaQuestion) {
        const /** @type {?} */ question = new TextAreaInputQuestion({
            isExpanded: false, rows: 18,
            placeholder: '', type: '', key: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.isExpanded = schemaQuestion.isExpanded;
        question.rows = schemaQuestion.questionOptions.rows;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toTextQuestion(schemaQuestion) {
        const /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toFileUploadQuestion(schemaQuestion) {
        const /** @type {?} */ question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toDrugQuestion(schemaQuestion) {
        const /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toProblemQuestion(schemaQuestion) {
        const /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toConceptAnswerSelect(schemaQuestion) {
        const /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toRepeatingQuestion(schemaQuestion) {
        const /** @type {?} */ question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            const /** @type {?} */ testOrder = this.toTestOrderQuestion(schemaQuestion);
            const /** @type {?} */ orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toGroupQuestion(schemaQuestion) {
        const /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toPageQuestion(schemaQuestion) {
        const /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach(element => {
            question.questions.push(this.toSectionQuestion(element));
        });
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toFormQuestionModel(schemaQuestion) {
        const /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach(element => {
            question.questions.push(this.toPageQuestion(element));
        });
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toSectionQuestion(schemaQuestion) {
        const /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toPersonAttributeQuestion(schemaQuestion) {
        const /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'personAttribute';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toEncounterProviderQuestion(schemaQuestion) {
        const /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'provider';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toFieldSetQuestion(schemaQuestion) {
        const /** @type {?} */ toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toEncounterLocationQuestion(schemaQuestion) {
        const /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = schemaQuestion.type;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'location';
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    toTestOrderQuestion(schemaQuestion) {
        const /** @type {?} */ question = new TestOrderQuestion({
            type: '', key: '', orderType: '', selectableOrders: [],
            orderSettingUuid: '', label: '', rendering: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.selectableOrders.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        const /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    getSchemaQuestions(schema) {
        const /** @type {?} */ listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    }
    /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    getQuestions(schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (const /** @type {?} */ property in schema) {
                if (schema.hasOwnProperty(property)) {
                    this.getQuestions(schema[property], foundArray);
                }
            }
        }
        if (schema && !Array.isArray(schema) && typeof schema === 'object') {
            if (schema.questionOptions) {
                if (schema.questionOptions.rendering === 'group' ||
                    schema.questionOptions.rendering === 'repeating') {
                    // schema.questions = this.getGroupMembers(schema.questions);
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
                else if (schema.questionOptions.rendering === 'field-set') {
                }
                else {
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
            }
            else {
                for (const /** @type {?} */ o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    }
    /**
     * @param {?} schema
     * @return {?}
     */
    getChildrenQuestionModels(schema) {
        const /** @type {?} */ children = [];
        this.getQuestions(schema, children);
        return children;
    }
    /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    toModel(schema, renderType) {
        if (renderType === 'ui-select-extended') {
            renderType = schema.type;
        }
        if (!schema.id) {
            schema['id'] = this.generateId(10);
        }
        if (schema.questionOptions &&
            (schema.questionOptions.showDate === true ||
                schema.questionOptions.showDate === 'true')) {
            schema = this.convertOldVersionComplexObsQuestionToNewVersion(schema);
            renderType = 'field-set';
        }
        switch (renderType) {
            case 'select':
                return this.toSelectQuestion(schema);
            case 'single-select':
                return this.toSelectQuestion(schema);
            case 'multi-select':
                return this.toSelectQuestion(schema);
            case 'numeric':
                return this.toNumericQuestion(schema);
            case 'number':
                return this.toNumberQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'date':
                return this.toDateQuestion(schema);
            case 'multiCheckbox':
                return this.toMultiCheckboxQuestion(schema);
            case 'drug':
                return this.toDrugQuestion(schema);
            case 'problem':
                return this.toProblemQuestion(schema);
            case 'group':
                return this.toGroupQuestion(schema);
            case 'field-set':
                return this.toFieldSetQuestion(schema);
            case 'repeating':
                return this.toRepeatingQuestion(schema);
            case 'personAttribute':
                return this.toPersonAttributeQuestion(schema);
            case 'text':
                return this.toTextQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'select-concept-answers':
                return this.toConceptAnswerSelect(schema);
            case 'encounterLocation':
                return this.toEncounterLocationQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'radio':
                return this.toCheckBoxQuestion(schema);
            case 'checkbox':
                return this.toCheckBoxQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            default:
                console.warn('New Schema Question Type found.........' + renderType);
                return this.toTextQuestion(schema);
        }
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    convertOldVersionComplexObsQuestionToNewVersion(schemaQuestion) {
        const /** @type {?} */ converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        const /** @type {?} */ mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        const /** @type {?} */ dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        const /** @type {?} */ dateOptions = (/** @type {?} */ (Object)).assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    }
    /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    copyProperties(mappings, source, destination) {
        for (const /** @type {?} */ property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    }
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    addValidators(schemaQuestion) {
        const /** @type {?} */ validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            _.forEach(schemaQuestion.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        validators.push(new DateValidationModel(validator));
                        break;
                    case 'js_expression':
                        validators.push(new JsExpressionValidationModel(validator));
                        break;
                    case 'conditionalAnswered':
                        validators.push(new ConditionalValidationModel(validator));
                        break;
                    default:
                        validators.push(new ValidationModel(validator));
                        break;
                }
            });
        }
        const /** @type {?} */ questionOptions = schemaQuestion.questionOptions;
        const /** @type {?} */ renderingType = questionOptions ? questionOptions.rendering : '';
        switch (renderingType) {
            case 'number':
                if (questionOptions.max && questionOptions.min) {
                    validators.push(new MaxValidationModel({
                        type: 'max',
                        max: questionOptions.max
                    }));
                    validators.push(new MinValidationModel({
                        type: 'min',
                        min: questionOptions.min
                    }));
                }
                break;
            default:
                break;
        }
        // add conditional required validators
        if (typeof schemaQuestion.required === 'object') {
            const /** @type {?} */ required = schemaQuestion.required;
            if (required.type === 'conditionalRequired') {
                validators.push(new ConditionalValidationModel({
                    referenceQuestionId: required.referenceQuestionId,
                    referenceQuestionAnswers: required.referenceQuestionAnswers,
                    type: required.type,
                    message: required.message,
                }));
            }
        }
        return validators;
    }
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    addHistoricalExpressions(schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            const /** @type {?} */ origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources);
            question.historicalDataValue = origValue;
            if (schemaQuestion.historicalPrepopulate) {
                question.defaultValue = origValue;
            }
        }
    }
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    addCalculatorProperty(schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    }
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    addAlertProperty(schemaQuestion, question) {
        if (schemaQuestion.alert) {
            question.alert = schemaQuestion.alert;
        }
        // if (typeof schemaQuestion.message === 'object') {
        //   if (schemaQuestion.message.alertWhenExpression) {
        //     question.message = schemaQuestion.message.alertWhenExpression;
        //   }
        // }
    }
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    addDisableOrHideProperty(schemaQuestion, question) {
        if (!!schemaQuestion.disable) {
            question.disable = schemaQuestion.disable;
        }
        if (typeof schemaQuestion.disable === 'object') {
            question.disable = schemaQuestion.disable.disableWhenExpression;
        }
        if (!!schemaQuestion.hide) {
            question.hide = schemaQuestion.hide;
        }
        if (typeof schemaQuestion.hide === 'object') {
            if (schemaQuestion.hide.hideWhenExpression) {
                question.hide = schemaQuestion.hide.hideWhenExpression;
            }
        }
    }
    /**
     * @param {?} x
     * @return {?}
     */
    generateId(x) {
        let /** @type {?} */ s = '_';
        while (s.length < x && x > 0) {
            const /** @type {?} */ r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    }
}
function QuestionFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionFactory.prototype.dataSources;
    /** @type {?} */
    QuestionFactory.prototype.historicalHelperService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1B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LENBQUMsQ0FBQztRQUNsQixxQkFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsdUJBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7Q0FFbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3RleHQtaW5wdXQtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3RleHQtYXJlYS1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVWlTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy91aS1zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgRGF0ZVF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtcXVlc3Rpb24nO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tdWx0aS1zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9yZXBlYXRpbmctcXVlc3Rpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ZpbGUtdXBsb2FkLXF1ZXN0aW9uJztcbmltcG9ydCB7IFRlc3RPcmRlclF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24nO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tYXgtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IER1bW15RGF0YVNvdXJjZSB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2hlbHBlcnMvaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHsgQ2hlY2tCb3hRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GYWN0b3J5IHtcbiAgZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICBoaXN0b3JpY2FsSGVscGVyU2VydmljZTogSGlzdG9yaWNhbEhlbHBlclNlcnZpY2UgPSBuZXcgSGlzdG9yaWNhbEhlbHBlclNlcnZpY2UoKTtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBjcmVhdGVRdWVzdGlvbk1vZGVsKGZvcm1TY2hlbWE6IGFueSwgZm9ybT86IEZvcm0pOiBRdWVzdGlvbkJhc2Uge1xuICAgIGlmIChmb3JtKSB7XG4gICAgICBjb25zdCBkYXRhU291cmNlcyA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXM7XG4gICAgICB0aGlzLmRhdGFTb3VyY2VzID0gZGF0YVNvdXJjZXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRvRm9ybVF1ZXN0aW9uTW9kZWwoZm9ybVNjaGVtYSk7XG4gIH1cblxuICB0b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHF1ZXN0aW9uLm9wdGlvbnM7XG4gICAgb3B0aW9ucy5zcGxpY2UoMCwgMCwge1xuICAgICAgbGFiZWw6ICcnLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSk7XG5cbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ251bWJlcic7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b051bWJlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0SW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dElucHV0UXVlc3Rpb24oeyBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdudW1iZXInO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0RhdGVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRGF0ZVF1ZXN0aW9uIHtcbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24udHlwZSA9PT0gJ2VuY291bnRlckRhdGV0aW1lJykge1xuICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICB9XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRGF0ZVF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdkYXRlJztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5zaG93VGltZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zaG93VGltZSBhcyBib29sZWFuO1xuICAgIHF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IERhdGVRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRGF0ZVF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcbiAgICBxdWVzdGlvbi5zaG93VGltZSA9IHRydWU7XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogQ2hlY2tCb3hRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgQ2hlY2tCb3hRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMuc3BsaWNlKDAsIDApO1xuXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuXG4gIH1cblxuICB0b011bHRpQ2hlY2tib3hRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogTXVsdGlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgTXVsdGlTZWxlY3RRdWVzdGlvbih7IHJlbmRlclR5cGU6ICcnLCBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gbmV3IER1bW15RGF0YVNvdXJjZSgpO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRBcmVhSW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uKHtcbiAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlLCByb3dzOiAxOCxcbiAgICAgIHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJydcbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIHF1ZXN0aW9uLmlzRXhwYW5kZWQgPSBzY2hlbWFRdWVzdGlvbi5pc0V4cGFuZGVkO1xuICAgIHF1ZXN0aW9uLnJvd3MgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucm93cztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9UZXh0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3RleHQnO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9GaWxlVXBsb2FkUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IEZpbGVVcGxvYWRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRmlsZVVwbG9hZFF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2ZpbGUnO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAnZmlsZSc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRHJ1Z1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAnZHJ1Zyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1Byb2JsZW1RdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3Byb2JsZW0nO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Db25jZXB0QW5zd2VyU2VsZWN0KHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuZGF0YVNvdXJjZSB8fCAnY29uY2VwdEFuc3dlcnMnO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zID0ge1xuICAgICAgY29uY2VwdDogc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcbiAgICB9O1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9SZXBlYXRpbmdRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUmVwZWF0aW5nUXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFJlcGVhdGluZ1F1ZXN0aW9uKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgY29uc3QgdGVzdE9yZGVyID0gdGhpcy50b1Rlc3RPcmRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IFtdOyBvcmRlcnMucHVzaCh0ZXN0T3JkZXIpO1xuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gb3JkZXJzO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Hcm91cFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9QYWdlUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncGFnZSc7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5Ob25lO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IFtdO1xuICAgIHNjaGVtYVF1ZXN0aW9uLnNlY3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMucHVzaCh0aGlzLnRvU2VjdGlvblF1ZXN0aW9uKGVsZW1lbnQpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0Zvcm1RdWVzdGlvbk1vZGVsKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2Zvcm0nO1xuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IFtdO1xuICAgIHNjaGVtYVF1ZXN0aW9uLnBhZ2VzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMucHVzaCh0aGlzLnRvUGFnZVF1ZXN0aW9uKGVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvU2VjdGlvblF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3NlY3Rpb24nO1xuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuTm9uZTtcbiAgICBxdWVzdGlvbi5pc0V4cGFuZGVkID0gc2NoZW1hUXVlc3Rpb24uaXNFeHBhbmRlZCA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0U2NoZW1hUXVlc3Rpb25zKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9QZXJzb25BdHRyaWJ1dGVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XG4gICAgICBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycsIHNlYXJjaEZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3BlcnNvbkF0dHJpYnV0ZSc7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9FbmNvdW50ZXJQcm92aWRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBVaVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHJlc29sdmVGdW5jdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncHJvdmlkZXInO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0ZpZWxkU2V0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHRvUmV0dXJuID0gdGhpcy50b0dyb3VwUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgIHRvUmV0dXJuLnJlbmRlcmluZ1R5cGUgPSAnZmllbGQtc2V0JztcbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH1cblxuICB0b0VuY291bnRlckxvY2F0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFVpU2VsZWN0UXVlc3Rpb24oe1xuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi50eXBlO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdsb2NhdGlvbic7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvVGVzdE9yZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRlc3RPcmRlclF1ZXN0aW9uIHtcblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRlc3RPcmRlclF1ZXN0aW9uKHtcbiAgICAgIHR5cGU6ICcnLCBrZXk6ICcnLCBvcmRlclR5cGU6ICcnLCBzZWxlY3RhYmxlT3JkZXJzOiBbXSxcbiAgICAgIG9yZGVyU2V0dGluZ1V1aWQ6ICcnLCBsYWJlbDogJycsIHJlbmRlcmluZzogJydcbiAgICB9KTtcblxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBnZXRTY2hlbWFRdWVzdGlvbnMoc2NoZW1hOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGxpc3RRdWVzdGlvbnMgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWEsIGxpc3RRdWVzdGlvbnMpO1xuICAgIHJldHVybiBsaXN0UXVlc3Rpb25zO1xuICB9XG5cbiAgZ2V0UXVlc3Rpb25zKHNjaGVtYTogYW55LCBmb3VuZEFycmF5OiBhbnkpOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShmb3VuZEFycmF5KSkge1xuICAgICAgZm91bmRBcnJheSA9IFtdO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG5cbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hW3Byb3BlcnR5XSwgZm91bmRBcnJheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJyB8fFxuICAgICAgICAgIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xuICAgICAgICAgIC8vIHNjaGVtYS5xdWVzdGlvbnMgPSB0aGlzLmdldEdyb3VwTWVtYmVycyhzY2hlbWEucXVlc3Rpb25zKTtcbiAgICAgICAgICBmb3VuZEFycmF5LnB1c2godGhpcy50b01vZGVsKHNjaGVtYSwgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2ZpZWxkLXNldCcpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3VuZEFycmF5LnB1c2godGhpcy50b01vZGVsKHNjaGVtYSwgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBvIGluIHNjaGVtYSkge1xuICAgICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYVtvXSwgZm91bmRBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBnZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYTogYW55KTogYW55IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYSwgY2hpbGRyZW4pO1xuICAgIHJldHVybiBjaGlsZHJlbjtcblxuICB9XG5cbiAgdG9Nb2RlbChzY2hlbWE6IGFueSwgcmVuZGVyVHlwZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAocmVuZGVyVHlwZSA9PT0gJ3VpLXNlbGVjdC1leHRlbmRlZCcpIHtcbiAgICAgIHJlbmRlclR5cGUgPSBzY2hlbWEudHlwZTtcbiAgICB9XG4gICAgaWYgKCFzY2hlbWEuaWQpIHtcbiAgICAgIHNjaGVtYVsnaWQnXSA9IHRoaXMuZ2VuZXJhdGVJZCgxMCk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMgJiZcbiAgICAgIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlID09PSB0cnVlIHx8XG4gICAgICAgIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGUgPT09ICd0cnVlJykpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMuY29udmVydE9sZFZlcnNpb25Db21wbGV4T2JzUXVlc3Rpb25Ub05ld1ZlcnNpb24oc2NoZW1hKTtcbiAgICAgIHJlbmRlclR5cGUgPSAnZmllbGQtc2V0JztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHJlbmRlclR5cGUpIHtcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3NpbmdsZS1zZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdtdWx0aS1zZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdudW1lcmljJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvTnVtYmVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ211bHRpQ2hlY2tib3gnOlxuICAgICAgICByZXR1cm4gdGhpcy50b011bHRpQ2hlY2tib3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZHJ1Zyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRHJ1Z1F1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdwcm9ibGVtJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Qcm9ibGVtUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Hcm91cFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdmaWVsZC1zZXQnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0ZpZWxkU2V0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUmVwZWF0aW5nUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3BlcnNvbkF0dHJpYnV0ZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUGVyc29uQXR0cmlidXRlUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9UZXh0QXJlYVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdzZWxlY3QtY29uY2VwdC1hbnN3ZXJzJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Db25jZXB0QW5zd2VyU2VsZWN0KHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyTG9jYXRpb25RdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJQcm92aWRlclF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0NoZWNrQm94UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybignTmV3IFNjaGVtYSBRdWVzdGlvbiBUeXBlIGZvdW5kLi4uLi4uLi4uJyArIHJlbmRlclR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRRdWVzdGlvbihzY2hlbWEpO1xuICAgIH1cblxuICB9XG5cbiAgY29udmVydE9sZFZlcnNpb25Db21wbGV4T2JzUXVlc3Rpb25Ub05ld1ZlcnNpb24oc2NoZW1hUXVlc3Rpb246IGFueSkge1xuICAgIGNvbnN0IGNvbnZlcnRlZDogYW55ID0ge307XG4gICAgY29udmVydGVkLnR5cGUgPSAnY29tcGxleC1vYnMnO1xuICAgIGNvbnZlcnRlZC5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIGNvbnZlcnRlZC5pZCA9ICdjb21wbGV4XycgKyBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zID0ge307XG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPSAnZmllbGQtc2V0JztcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zID0gW107XG4gICAgY29udmVydGVkLnZhbGlkYXRvcnMgPSBbXTtcblxuICAgIGNvbnN0IG1haW5GaWVsZDogYW55ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzY2hlbWFRdWVzdGlvbikpO1xuICAgIG1haW5GaWVsZC50eXBlID0gJ2NvbXBsZXgtb2JzLWNoaWxkJztcbiAgICBkZWxldGUgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZTtcbiAgICBkZWxldGUgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5zaG93bkRhdGVPcHRpb25zO1xuICAgIG1haW5GaWVsZC5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPSAndmFsdWUnO1xuXG4gICAgY29uc3QgZGF0ZUZpZWxkOiBhbnkgPSB7fTtcbiAgICBkYXRlRmllbGQudHlwZSA9ICdjb21wbGV4LW9icy1jaGlsZCc7XG4gICAgZGF0ZUZpZWxkLmxhYmVsID0gJ0RhdGUgb2YgJyArIG1haW5GaWVsZC5sYWJlbDtcbiAgICBkYXRlRmllbGQuaWQgPSAnZGF0ZV8nICsgbWFpbkZpZWxkLmlkO1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMgPSB7fTtcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9ICdkYXRlJztcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID0gJ29ic0RhdGV0aW1lJztcbiAgICBjb25zdCBkYXRlT3B0aW9uczogYW55ID0gKE9iamVjdCBhcyBhbnkpLmFzc2lnbih7fSxcbiAgICBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2hvd25EYXRlT3B0aW9ucyk7XG4gICAgZGF0ZUZpZWxkLnZhbGlkYXRvcnMgPSBkYXRlT3B0aW9ucy52YWxpZGF0b3JzO1xuICAgIGRhdGVGaWVsZC5oaWRlID0gZGF0ZU9wdGlvbnMuaGlkZTtcblxuXG4gICAgY29udmVydGVkLnF1ZXN0aW9ucy5wdXNoKG1haW5GaWVsZCk7XG4gICAgY29udmVydGVkLnF1ZXN0aW9ucy5wdXNoKGRhdGVGaWVsZCk7XG5cbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG5cbiAgY29weVByb3BlcnRpZXMobWFwcGluZ3M6IGFueSwgc291cmNlOiBhbnksIGRlc3RpbmF0aW9uOiBRdWVzdGlvbkJhc2UpIHtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICBpZiAobWFwcGluZ3MuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIGRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KG1hcHBpbmdzW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgZGVzdGluYXRpb25bbWFwcGluZ3NbcHJvcGVydHldXSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbjogYW55KTogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPiB7XG5cbiAgICBjb25zdCB2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+ID0gW107XG5cbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24udmFsaWRhdG9ycykge1xuXG4gICAgICAvLyBUT0RPIC0gYWRkIG1vcmUgdmFsaWRhdG9yIHR5cGVzXG4gICAgICBfLmZvckVhY2goc2NoZW1hUXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogYW55KSA9PiB7XG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgRGF0ZVZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBWYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb25PcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zO1xuICAgIGNvbnN0IHJlbmRlcmluZ1R5cGUgPSBxdWVzdGlvbk9wdGlvbnMgPyBxdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nIDogJyc7XG4gICAgc3dpdGNoIChyZW5kZXJpbmdUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuXG4gICAgICAgIGlmIChxdWVzdGlvbk9wdGlvbnMubWF4ICYmIHF1ZXN0aW9uT3B0aW9ucy5taW4pIHtcbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IE1heFZhbGlkYXRpb25Nb2RlbCh7XG4gICAgICAgICAgICB0eXBlOiAnbWF4JyxcbiAgICAgICAgICAgIG1heDogcXVlc3Rpb25PcHRpb25zLm1heFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IE1pblZhbGlkYXRpb25Nb2RlbCh7XG4gICAgICAgICAgICB0eXBlOiAnbWluJyxcbiAgICAgICAgICAgIG1pbjogcXVlc3Rpb25PcHRpb25zLm1pblxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIHZhbGlkYXRvcnNcbiAgICBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLnJlcXVpcmVkID09PSAnb2JqZWN0Jykge1xuXG4gICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gc2NoZW1hUXVlc3Rpb24ucmVxdWlyZWQ7XG5cbiAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcblxuICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICByZWZlcmVuY2VRdWVzdGlvbklkOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkLFxuICAgICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VyczogcmVxdWlyZWQucmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLFxuICAgICAgICAgIHR5cGU6IHJlcXVpcmVkLnR5cGUsXG4gICAgICAgICAgbWVzc2FnZTogcmVxdWlyZWQubWVzc2FnZSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICB9XG5cbiAgYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbiAmJiBzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbi5sZW5ndGggPiAwKSB7XG4gICAgICBxdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUodHJ1ZSk7XG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKFxuICAgICAgICAgIChzY2hlbWFRdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUgPT09ICd0cnVlJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcmlnVmFsdWUgPSB0aGlzLmhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlLmV2YWx1YXRlKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uLFxuICAgICAgICB0aGlzLmRhdGFTb3VyY2VzKTtcbiAgICAgIHF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUgPSBvcmlnVmFsdWU7XG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbFByZXBvcHVsYXRlKSB7XG4gICAgICAgIHF1ZXN0aW9uLmRlZmF1bHRWYWx1ZSA9IG9yaWdWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG5cbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zICYmXG4gICAgICB0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNhbGN1bGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY2FsY3VsYXRlLmNhbGN1bGF0ZUV4cHJlc3Npb247XG4gICAgfVxuXG4gIH1cblxuICBhZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5hbGVydCkge1xuICAgICAgcXVlc3Rpb24uYWxlcnQgPSBzY2hlbWFRdWVzdGlvbi5hbGVydDtcbiAgICB9XG4gICAgLy8gaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5tZXNzYWdlID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgaWYgKHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UuYWxlcnRXaGVuRXhwcmVzc2lvbikge1xuICAgIC8vICAgICBxdWVzdGlvbi5tZXNzYWdlID0gc2NoZW1hUXVlc3Rpb24ubWVzc2FnZS5hbGVydFdoZW5FeHByZXNzaW9uO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIGFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcblxuICAgIGlmICghIXNjaGVtYVF1ZXN0aW9uLmRpc2FibGUpIHtcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgPSBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24uZGlzYWJsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgPSBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlLmRpc2FibGVXaGVuRXhwcmVzc2lvbjtcbiAgICB9XG5cbiAgICBpZiAoISFzY2hlbWFRdWVzdGlvbi5oaWRlKSB7XG4gICAgICBxdWVzdGlvbi5oaWRlID0gc2NoZW1hUXVlc3Rpb24uaGlkZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5oaWRlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlkZS5oaWRlV2hlbkV4cHJlc3Npb24pIHtcbiAgICAgICAgcXVlc3Rpb24uaGlkZSA9IHNjaGVtYVF1ZXN0aW9uLmhpZGUuaGlkZVdoZW5FeHByZXNzaW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGdlbmVyYXRlSWQoeCkge1xuICAgIGxldCBzID0gJ18nO1xuICAgIHdoaWxlIChzLmxlbmd0aCA8IHggJiYgeCA+IDApIHtcbiAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgcyArPSAociA8IDAuMSA/IE1hdGguZmxvb3IociAqIDEwMCkgOlxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IociAqIDI2KSArIChyID4gMC41ID8gOTcgOiA2NSkpKTtcbiAgICB9XG4gICAgcmV0dXJuICdfJyArIHM7XG4gIH1cbn1cbiJdfQ==