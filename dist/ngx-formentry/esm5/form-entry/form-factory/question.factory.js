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
var QuestionFactory = /** @class */ (function () {
    function QuestionFactory() {
        this.dataSources = {};
        this.historicalHelperService = new HistoricalHelperService();
    }
    /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    QuestionFactory.prototype.createQuestionModel = /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    function (formSchema, form) {
        if (form) {
            var /** @type {?} */ dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSelectQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        var /** @type {?} */ options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumericQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumberQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDateQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        var /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = /** @type {?} */ (schemaQuestion.questionOptions.showTime);
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterDatetimeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toCheckBoxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        var /** @type {?} */ mappings = {
            label: 'label',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toMultiCheckboxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
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
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextAreaQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextAreaInputQuestion({
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
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFileUploadQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDrugQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toProblemQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toConceptAnswerSelect = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toRepeatingQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            var /** @type {?} */ testOrder = this.toTestOrderQuestion(schemaQuestion);
            var /** @type {?} */ orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toGroupQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPageQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach(function (element) {
            question.questions.push(_this.toSectionQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFormQuestionModel = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach(function (element) {
            question.questions.push(_this.toPageQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSectionQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPersonAttributeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
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
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterProviderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
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
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFieldSetQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterLocationQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
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
        var /** @type {?} */ mappings = {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTestOrderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TestOrderQuestion({
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
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getSchemaQuestions = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var /** @type {?} */ listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    };
    /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    QuestionFactory.prototype.getQuestions = /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    function (schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (var /** @type {?} */ property in schema) {
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
                for (var /** @type {?} */ o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getChildrenQuestionModels = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var /** @type {?} */ children = [];
        this.getQuestions(schema, children);
        return children;
    };
    /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    QuestionFactory.prototype.toModel = /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    function (schema, renderType) {
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
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.convertOldVersionComplexObsQuestionToNewVersion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        var /** @type {?} */ mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        var /** @type {?} */ dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        var /** @type {?} */ dateOptions = (/** @type {?} */ (Object)).assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    };
    /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    QuestionFactory.prototype.copyProperties = /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    function (mappings, source, destination) {
        for (var /** @type {?} */ property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.addValidators = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            _.forEach(schemaQuestion.validators, function (validator) {
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
        var /** @type {?} */ questionOptions = schemaQuestion.questionOptions;
        var /** @type {?} */ renderingType = questionOptions ? questionOptions.rendering : '';
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
            var /** @type {?} */ required = schemaQuestion.required;
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
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addHistoricalExpressions = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            var /** @type {?} */ origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources);
            question.historicalDataValue = origValue;
            if (schemaQuestion.historicalPrepopulate) {
                question.defaultValue = origValue;
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addCalculatorProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addAlertProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.alert) {
            question.alert = schemaQuestion.alert;
        }
        // if (typeof schemaQuestion.message === 'object') {
        //   if (schemaQuestion.message.alertWhenExpression) {
        //     question.message = schemaQuestion.message.alertWhenExpression;
        //   }
        // }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addDisableOrHideProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
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
    };
    /**
     * @param {?} x
     * @return {?}
     */
    QuestionFactory.prototype.generateId = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        var /** @type {?} */ s = '_';
        while (s.length < x && x > 0) {
            var /** @type {?} */ r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    };
    return QuestionFactory;
}());
export { QuestionFactory };
function QuestionFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionFactory.prototype.dataSources;
    /** @type {?} */
    QuestionFactory.prototype.historicalHelperService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1B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QXFCLENBQUM7U0FDakU7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO1NBQ3JDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFjLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFNUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUN4RDtTQUNGO0tBQ0Y7Ozs7O0lBQ08sb0NBQVU7Ozs7Y0FBQyxDQUFDO1FBQ2xCLHFCQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDWixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixxQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUNELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOzswQkF4MkJuQjtJQTAyQkMsQ0FBQTtBQWgxQkQsMkJBZzFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgVGV4dElucHV0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGV4dC1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXh0QXJlYUlucHV0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBVaVNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3VpLXNlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBEYXRlUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS1xdWVzdGlvbic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL211bHRpLXNlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IFJlcGVhdGluZ1F1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3JlcGVhdGluZy1xdWVzdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZmlsZS11cGxvYWQtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVGVzdE9yZGVyUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGVzdC1vcmRlci1xdWVzdGlvbic7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3ZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWF4VmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1pblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRHVtbXlEYXRhU291cmNlIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2R1bW15LWRhdGEtc291cmNlJztcbmltcG9ydCB7IEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVycy9oaXN0b3JpY2FsLWV4cHJlc3Npb24taGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5pbXBvcnQgeyBDaGVja0JveFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZhY3Rvcnkge1xuICBkYXRhU291cmNlczogYW55ID0ge307XG4gIGhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlOiBIaXN0b3JpY2FsSGVscGVyU2VydmljZSA9IG5ldyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSgpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGNyZWF0ZVF1ZXN0aW9uTW9kZWwoZm9ybVNjaGVtYTogYW55LCBmb3JtPzogRm9ybSk6IFF1ZXN0aW9uQmFzZSB7XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VzID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcztcbiAgICAgIHRoaXMuZGF0YVNvdXJjZXMgPSBkYXRhU291cmNlcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9Gb3JtUXVlc3Rpb25Nb2RlbChmb3JtU2NoZW1hKTtcbiAgfVxuXG4gIHRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gcXVlc3Rpb24ub3B0aW9ucztcbiAgICBvcHRpb25zLnNwbGljZSgwLCAwLCB7XG4gICAgICBsYWJlbDogJycsXG4gICAgICB2YWx1ZTogJydcbiAgICB9KTtcblxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b051bWVyaWNRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnbnVtYmVyJztcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvTnVtYmVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ251bWJlcic7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRGF0ZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBEYXRlUXVlc3Rpb24ge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi50eXBlID09PSAnZW5jb3VudGVyRGF0ZXRpbWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgIH1cbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBEYXRlUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnNob3dUaW1lID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNob3dUaW1lIGFzIGJvb2xlYW47XG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRGF0ZVF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBEYXRlUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZGF0ZSc7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuICAgIHF1ZXN0aW9uLnNob3dUaW1lID0gdHJ1ZTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBDaGVja0JveFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBDaGVja0JveFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcCgob2JqKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ub3B0aW9ucy5zcGxpY2UoMCwgMCk7XG5cbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG5cbiAgfVxuXG4gIHRvTXVsdGlDaGVja2JveFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBNdWx0aVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBNdWx0aVNlbGVjdFF1ZXN0aW9uKHsgcmVuZGVyVHlwZTogJycsIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSBuZXcgRHVtbXlEYXRhU291cmNlKCk7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0QXJlYUlucHV0UXVlc3Rpb24oe1xuICAgICAgaXNFeHBhbmRlZDogZmFsc2UsIHJvd3M6IDE4LFxuICAgICAgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJ1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24uaXNFeHBhbmRlZCA9IHNjaGVtYVF1ZXN0aW9uLmlzRXhwYW5kZWQ7XG4gICAgcXVlc3Rpb24ucm93cyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5yb3dzO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1RleHRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAndGV4dCc7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0ZpbGVVcGxvYWRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRmlsZVVwbG9hZFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBGaWxlVXBsb2FkUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZmlsZSc7XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdmaWxlJztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9EcnVnUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdkcnVnJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvUHJvYmxlbVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncHJvYmxlbSc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0NvbmNlcHRBbnN3ZXJTZWxlY3Qoc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5kYXRhU291cmNlIHx8ICdjb25jZXB0QW5zd2Vycyc7XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMgPSB7XG4gICAgICBjb25jZXB0OiBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxuICAgIH07XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1JlcGVhdGluZ1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBSZXBlYXRpbmdRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUmVwZWF0aW5nUXVlc3Rpb24oeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnR5cGUgPT09ICd0ZXN0T3JkZXInKSB7XG4gICAgICBjb25zdCB0ZXN0T3JkZXIgPSB0aGlzLnRvVGVzdE9yZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgICAgY29uc3Qgb3JkZXJzID0gW107IG9yZGVycy5wdXNoKHRlc3RPcmRlcik7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSBvcmRlcnM7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0dyb3VwUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1BhZ2VRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdwYWdlJztcbiAgICBxdWVzdGlvbi5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLk5vbmU7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gW107XG4gICAgc2NoZW1hUXVlc3Rpb24uc2VjdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5wdXNoKHRoaXMudG9TZWN0aW9uUXVlc3Rpb24oZWxlbWVudCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRm9ybVF1ZXN0aW9uTW9kZWwoc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZm9ybSc7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXA7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gW107XG4gICAgc2NoZW1hUXVlc3Rpb24ucGFnZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5wdXNoKHRoaXMudG9QYWdlUXVlc3Rpb24oZWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9TZWN0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnc2VjdGlvbic7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5Ob25lO1xuICAgIHF1ZXN0aW9uLmlzRXhwYW5kZWQgPSBzY2hlbWFRdWVzdGlvbi5pc0V4cGFuZGVkID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gdGhpcy5nZXRTY2hlbWFRdWVzdGlvbnMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1BlcnNvbkF0dHJpYnV0ZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBVaVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHJlc29sdmVGdW5jdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncGVyc29uQXR0cmlidXRlJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFVpU2VsZWN0UXVlc3Rpb24oe1xuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdwcm92aWRlcic7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRmllbGRTZXRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgdG9SZXR1cm4gPSB0aGlzLnRvR3JvdXBRdWVzdGlvbihzY2hlbWFRdWVzdGlvbik7XG4gICAgdG9SZXR1cm4ucmVuZGVyaW5nVHlwZSA9ICdmaWVsZC1zZXQnO1xuICAgIHJldHVybiB0b1JldHVybjtcbiAgfVxuXG4gIHRvRW5jb3VudGVyTG9jYXRpb25RdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XG4gICAgICBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycsIHNlYXJjaEZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9IHNjaGVtYVF1ZXN0aW9uLnR5cGU7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2xvY2F0aW9uJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9UZXN0T3JkZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGVzdE9yZGVyUXVlc3Rpb24ge1xuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGVzdE9yZGVyUXVlc3Rpb24oe1xuICAgICAgdHlwZTogJycsIGtleTogJycsIG9yZGVyVHlwZTogJycsIHNlbGVjdGFibGVPcmRlcnM6IFtdLFxuICAgICAgb3JkZXJTZXR0aW5nVXVpZDogJycsIGxhYmVsOiAnJywgcmVuZGVyaW5nOiAnJ1xuICAgIH0pO1xuXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIGdldFNjaGVtYVF1ZXN0aW9ucyhzY2hlbWE6IGFueSk6IGFueSB7XG4gICAgY29uc3QgbGlzdFF1ZXN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYSwgbGlzdFF1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RRdWVzdGlvbnM7XG4gIH1cblxuICBnZXRRdWVzdGlvbnMoc2NoZW1hOiBhbnksIGZvdW5kQXJyYXk6IGFueSk6IGFueSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZvdW5kQXJyYXkpKSB7XG4gICAgICBmb3VuZEFycmF5ID0gW107XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcblxuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWFbcHJvcGVydHldLCBmb3VuZEFycmF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY2hlbWEgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnIHx8XG4gICAgICAgICAgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgLy8gc2NoZW1hLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0R3JvdXBNZW1iZXJzKHNjaGVtYS5xdWVzdGlvbnMpO1xuICAgICAgICAgIGZvdW5kQXJyYXkucHVzaCh0aGlzLnRvTW9kZWwoc2NoZW1hLCBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZykpO1xuICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZmllbGQtc2V0Jykge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvdW5kQXJyYXkucHVzaCh0aGlzLnRvTW9kZWwoc2NoZW1hLCBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gc2NoZW1hKSB7XG4gICAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hW29dLCBmb3VuZEFycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hLCBjaGlsZHJlbik7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICB0b01vZGVsKHNjaGVtYTogYW55LCByZW5kZXJUeXBlOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChyZW5kZXJUeXBlID09PSAndWktc2VsZWN0LWV4dGVuZGVkJykge1xuICAgICAgcmVuZGVyVHlwZSA9IHNjaGVtYS50eXBlO1xuICAgIH1cbiAgICBpZiAoIXNjaGVtYS5pZCkge1xuICAgICAgc2NoZW1hWydpZCddID0gdGhpcy5nZW5lcmF0ZUlkKDEwKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGUgPT09IHRydWUgfHxcbiAgICAgICAgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZSA9PT0gJ3RydWUnKSkge1xuICAgICAgc2NoZW1hID0gdGhpcy5jb252ZXJ0T2xkVmVyc2lvbkNvbXBsZXhPYnNRdWVzdGlvblRvTmV3VmVyc2lvbihzY2hlbWEpO1xuICAgICAgcmVuZGVyVHlwZSA9ICdmaWVsZC1zZXQnO1xuICAgIH1cblxuICAgIHN3aXRjaCAocmVuZGVyVHlwZSkge1xuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TZWxlY3RRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnc2luZ2xlLXNlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ211bHRpLXNlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ251bWVyaWMnOlxuICAgICAgICByZXR1cm4gdGhpcy50b051bWVyaWNRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1iZXJRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0RhdGVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbXVsdGlDaGVja2JveCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvTXVsdGlDaGVja2JveFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdkcnVnJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EcnVnUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3Byb2JsZW0nOlxuICAgICAgICByZXR1cm4gdGhpcy50b1Byb2JsZW1RdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0dyb3VwUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRmllbGRTZXRRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9SZXBlYXRpbmdRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncGVyc29uQXR0cmlidXRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9QZXJzb25BdHRyaWJ1dGVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3NlbGVjdC1jb25jZXB0LWFuc3dlcnMnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0NvbmNlcHRBbnN3ZXJTZWxlY3Qoc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJMb2NhdGlvblF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyUHJvdmlkZXJRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCdOZXcgU2NoZW1hIFF1ZXN0aW9uIFR5cGUgZm91bmQuLi4uLi4uLi4nICsgcmVuZGVyVHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgfVxuXG4gIH1cblxuICBjb252ZXJ0T2xkVmVyc2lvbkNvbXBsZXhPYnNRdWVzdGlvblRvTmV3VmVyc2lvbihzY2hlbWFRdWVzdGlvbjogYW55KSB7XG4gICAgY29uc3QgY29udmVydGVkOiBhbnkgPSB7fTtcbiAgICBjb252ZXJ0ZWQudHlwZSA9ICdjb21wbGV4LW9icyc7XG4gICAgY29udmVydGVkLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgY29udmVydGVkLmlkID0gJ2NvbXBsZXhfJyArIHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMgPSB7fTtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9ICdmaWVsZC1zZXQnO1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbnMgPSBbXTtcbiAgICBjb252ZXJ0ZWQudmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgY29uc3QgbWFpbkZpZWxkOiBhbnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNjaGVtYVF1ZXN0aW9uKSk7XG4gICAgbWFpbkZpZWxkLnR5cGUgPSAnY29tcGxleC1vYnMtY2hpbGQnO1xuICAgIGRlbGV0ZSBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlO1xuICAgIGRlbGV0ZSBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLnNob3duRGF0ZU9wdGlvbnM7XG4gICAgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9ICd2YWx1ZSc7XG5cbiAgICBjb25zdCBkYXRlRmllbGQ6IGFueSA9IHt9O1xuICAgIGRhdGVGaWVsZC50eXBlID0gJ2NvbXBsZXgtb2JzLWNoaWxkJztcbiAgICBkYXRlRmllbGQubGFiZWwgPSAnRGF0ZSBvZiAnICsgbWFpbkZpZWxkLmxhYmVsO1xuICAgIGRhdGVGaWVsZC5pZCA9ICdkYXRlXycgKyBtYWluRmllbGQuaWQ7XG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucyA9IHt9O1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID0gJ2RhdGUnO1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPSAnb2JzRGF0ZXRpbWUnO1xuICAgIGNvbnN0IGRhdGVPcHRpb25zOiBhbnkgPSAoT2JqZWN0IGFzIGFueSkuYXNzaWduKHt9LFxuICAgIHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zaG93bkRhdGVPcHRpb25zKTtcbiAgICBkYXRlRmllbGQudmFsaWRhdG9ycyA9IGRhdGVPcHRpb25zLnZhbGlkYXRvcnM7XG4gICAgZGF0ZUZpZWxkLmhpZGUgPSBkYXRlT3B0aW9ucy5oaWRlO1xuXG5cbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zLnB1c2gobWFpbkZpZWxkKTtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zLnB1c2goZGF0ZUZpZWxkKTtcblxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cblxuICBjb3B5UHJvcGVydGllcyhtYXBwaW5nczogYW55LCBzb3VyY2U6IGFueSwgZGVzdGluYXRpb246IFF1ZXN0aW9uQmFzZSkge1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChtYXBwaW5ncy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgZGVzdGluYXRpb24uaGFzT3duUHJvcGVydHkobWFwcGluZ3NbcHJvcGVydHldKSkge1xuICAgICAgICBkZXN0aW5hdGlvblttYXBwaW5nc1twcm9wZXJ0eV1dID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+IHtcblxuICAgIGNvbnN0IHZhbGlkYXRvcnM6IEFycmF5PFZhbGlkYXRpb25Nb2RlbD4gPSBbXTtcblxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzKSB7XG5cbiAgICAgIC8vIFRPRE8gLSBhZGQgbW9yZSB2YWxpZGF0b3IgdHlwZXNcbiAgICAgIF8uZm9yRWFjaChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzLCAodmFsaWRhdG9yOiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBEYXRlVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsQW5zd2VyZWQnOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbk9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnM7XG4gICAgY29uc3QgcmVuZGVyaW5nVHlwZSA9IHF1ZXN0aW9uT3B0aW9ucyA/IHF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgOiAnJztcbiAgICBzd2l0Y2ggKHJlbmRlcmluZ1R5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uT3B0aW9ucy5tYXggJiYgcXVlc3Rpb25PcHRpb25zLm1pbikge1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgTWF4VmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICAgIHR5cGU6ICdtYXgnLFxuICAgICAgICAgICAgbWF4OiBxdWVzdGlvbk9wdGlvbnMubWF4XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgTWluVmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICAgIHR5cGU6ICdtaW4nLFxuICAgICAgICAgICAgbWluOiBxdWVzdGlvbk9wdGlvbnMubWluXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgdmFsaWRhdG9yc1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBzY2hlbWFRdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgaWYgKHJlcXVpcmVkLnR5cGUgPT09ICdjb25kaXRpb25hbFJlcXVpcmVkJykge1xuXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwoe1xuICAgICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQsXG4gICAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMsXG4gICAgICAgICAgdHlwZTogcmVxdWlyZWQudHlwZSxcbiAgICAgICAgICBtZXNzYWdlOiByZXF1aXJlZC5tZXNzYWdlLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvcnM7XG4gIH1cblxuICBhZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uICYmIHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uLmxlbmd0aCA+IDApIHtcbiAgICAgIHF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZSh0cnVlKTtcbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBxdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUoXG4gICAgICAgICAgKHNjaGVtYVF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSA9PT0gJ3RydWUnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yaWdWYWx1ZSA9IHRoaXMuaGlzdG9yaWNhbEhlbHBlclNlcnZpY2UuZXZhbHVhdGUoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbEV4cHJlc3Npb24sXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZXMpO1xuICAgICAgcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSA9IG9yaWdWYWx1ZTtcbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsUHJlcG9wdWxhdGUpIHtcbiAgICAgICAgcXVlc3Rpb24uZGVmYXVsdFZhbHVlID0gb3JpZ1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcblxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMgJiZcbiAgICAgIHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY2FsY3VsYXRlID09PSAnb2JqZWN0Jykge1xuICAgICAgcXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jYWxjdWxhdGUuY2FsY3VsYXRlRXhwcmVzc2lvbjtcbiAgICB9XG5cbiAgfVxuXG4gIGFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmFsZXJ0KSB7XG4gICAgICBxdWVzdGlvbi5hbGVydCA9IHNjaGVtYVF1ZXN0aW9uLmFsZXJ0O1xuICAgIH1cbiAgICAvLyBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gICBpZiAoc2NoZW1hUXVlc3Rpb24ubWVzc2FnZS5hbGVydFdoZW5FeHByZXNzaW9uKSB7XG4gICAgLy8gICAgIHF1ZXN0aW9uLm1lc3NhZ2UgPSBzY2hlbWFRdWVzdGlvbi5tZXNzYWdlLmFsZXJ0V2hlbkV4cHJlc3Npb247XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG5cbiAgYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuXG4gICAgaWYgKCEhc2NoZW1hUXVlc3Rpb24uZGlzYWJsZSkge1xuICAgICAgcXVlc3Rpb24uZGlzYWJsZSA9IHNjaGVtYVF1ZXN0aW9uLmRpc2FibGU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlID09PSAnb2JqZWN0Jykge1xuICAgICAgcXVlc3Rpb24uZGlzYWJsZSA9IHNjaGVtYVF1ZXN0aW9uLmRpc2FibGUuZGlzYWJsZVdoZW5FeHByZXNzaW9uO1xuICAgIH1cblxuICAgIGlmICghIXNjaGVtYVF1ZXN0aW9uLmhpZGUpIHtcbiAgICAgIHF1ZXN0aW9uLmhpZGUgPSBzY2hlbWFRdWVzdGlvbi5oaWRlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLmhpZGUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaWRlLmhpZGVXaGVuRXhwcmVzc2lvbikge1xuICAgICAgICBxdWVzdGlvbi5oaWRlID0gc2NoZW1hUXVlc3Rpb24uaGlkZS5oaWRlV2hlbkV4cHJlc3Npb247XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgZ2VuZXJhdGVJZCh4KSB7XG4gICAgbGV0IHMgPSAnXyc7XG4gICAgd2hpbGUgKHMubGVuZ3RoIDwgeCAmJiB4ID4gMCkge1xuICAgICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBzICs9IChyIDwgMC4xID8gTWF0aC5mbG9vcihyICogMTAwKSA6XG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihyICogMjYpICsgKHIgPiAwLjUgPyA5NyA6IDY1KSkpO1xuICAgIH1cbiAgICByZXR1cm4gJ18nICsgcztcbiAgfVxufVxuIl19