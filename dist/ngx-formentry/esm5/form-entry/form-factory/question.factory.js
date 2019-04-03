/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
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
            /** @type {?} */
            var dataSources = form.dataSourcesContainer.dataSources;
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
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        /** @type {?} */
        var options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = (/** @type {?} */ (schemaQuestion.questionOptions.showTime));
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        question.validators = this.addValidators(schemaQuestion);
        question.dataSource = new DummyDataSource();
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new TextAreaInputQuestion({
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
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            /** @type {?} */
            var testOrder = this.toTestOrderQuestion(schemaQuestion);
            /** @type {?} */
            var orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            question.questions.push(_this.toSectionQuestion(element));
        }));
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
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            question.questions.push(_this.toPageQuestion(element));
        }));
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
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
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
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: (/**
             * @return {?}
             */
            function () { }),
            resolveFunction: (/**
             * @return {?}
             */
            function () {
            })
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'personAttribute';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: (/**
             * @return {?}
             */
            function () { }),
            resolveFunction: (/**
             * @return {?}
             */
            function () {
            })
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'provider';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var toReturn = this.toGroupQuestion(schemaQuestion);
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
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: (/**
             * @return {?}
             */
            function () { }),
            resolveFunction: (/**
             * @return {?}
             */
            function () {
            })
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = schemaQuestion.type;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'location';
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var question = new TestOrderQuestion({
            type: '', key: '', orderType: '', selectableOrders: [],
            orderSettingUuid: '', label: '', rendering: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.selectableOrders.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        }));
        /** @type {?} */
        var mappings = {
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
        /** @type {?} */
        var listQuestions = new Array();
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
            for (var property in schema) {
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
                for (var o in schema) {
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
        /** @type {?} */
        var children = [];
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
            case 'file':
                return this.toFileUploadQuestion(schema);
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
        /** @type {?} */
        var converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        /** @type {?} */
        var mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        /** @type {?} */
        var dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        /** @type {?} */
        var dateOptions = ((/** @type {?} */ (Object))).assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        if (dateOptions.historicalExpression) {
            dateField.historicalExpression = dateOptions.historicalExpression;
        }
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
        for (var property in source) {
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
        /** @type {?} */
        var validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            _.forEach(schemaQuestion.validators, (/**
             * @param {?} validator
             * @return {?}
             */
            function (validator) {
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
            }));
        }
        /** @type {?} */
        var questionOptions = schemaQuestion.questionOptions;
        /** @type {?} */
        var renderingType = questionOptions ? questionOptions.rendering : '';
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
            /** @type {?} */
            var required = schemaQuestion.required;
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
            /** @type {?} */
            var origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources, undefined);
            question.historicalDataValue = origValue;
            // console.info('historical value', origValue);
            // console.info('historical data question :::', question);
            // console.info('schema data question :::', schemaQuestion);
            if (schemaQuestion.historicalPrepopulateCondition && origValue) {
                /** @type {?} */
                var toPopulate = this.historicalHelperService.evaluatePrecondition(schemaQuestion.historicalPrepopulateCondition, this.dataSources, origValue);
                if (toPopulate) {
                    question.defaultValue = origValue.value;
                }
                return; // don't try to evaluate the other option
            }
            if (schemaQuestion.historicalPrepopulate && origValue) {
                // sample schema options for this branch
                // "historicalPrepopulate":true,
                // "allowedHistoricalValueAgeInDays": 40000,
                /** @type {?} */
                var valDate = moment(origValue.valueDate);
                /** @type {?} */
                var differenceInDays = moment().diff(valDate, 'days');
                if (Number.isInteger(schemaQuestion.allowedHistoricalValueAgeInDays)) {
                    if (differenceInDays <= schemaQuestion.allowedHistoricalValueAgeInDays) {
                        question.defaultValue = origValue.value;
                    }
                }
                else {
                    question.defaultValue = origValue.value;
                }
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
     * @private
     * @param {?} x
     * @return {?}
     */
    QuestionFactory.prototype.generateId = /**
     * @private
     * @param {?} x
     * @return {?}
     */
    function (x) {
        /** @type {?} */
        var s = '_';
        while (s.length < x && x > 0) {
            /** @type {?} */
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    };
    return QuestionFactory;
}());
export { QuestionFactory };
if (false) {
    /** @type {?} */
    QuestionFactory.prototype.dataSources;
    /** @type {?} */
    QuestionFactory.prototype.historicalHelperService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOztJQUU1QixNQUFNLEdBQUcsT0FBTztBQUV0QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxr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QU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUE1MkJELElBNDJCQzs7OztJQTMyQkMsc0NBQXNCOztJQUN0QixrREFBaUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5pbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy90ZXh0LWlucHV0LXF1ZXN0aW9uJztcclxuaW1wb3J0IHsgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3RleHQtYXJlYS1pbnB1dC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFVpU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uJztcclxuaW1wb3J0IHsgRGF0ZVF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL211bHRpLXNlbGVjdC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9yZXBlYXRpbmctcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9maWxlLXVwbG9hZC1xdWVzdGlvbic7XHJcbmltcG9ydCB7IFRlc3RPcmRlclF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24nO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNYXhWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IER1bW15RGF0YVNvdXJjZSB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZSc7XHJcbmltcG9ydCB7IEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVycy9oaXN0b3JpY2FsLWV4cHJlc3Npb24taGVscGVyLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcclxuaW1wb3J0IHsgQ2hlY2tCb3hRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uRmFjdG9yeSB7XHJcbiAgZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xyXG4gIGhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlOiBIaXN0b3JpY2FsSGVscGVyU2VydmljZSA9IG5ldyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSgpO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUXVlc3Rpb25Nb2RlbChmb3JtU2NoZW1hOiBhbnksIGZvcm0/OiBGb3JtKTogUXVlc3Rpb25CYXNlIHtcclxuICAgIGlmIChmb3JtKSB7XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VzID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcztcclxuICAgICAgdGhpcy5kYXRhU291cmNlcyA9IGRhdGFTb3VyY2VzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudG9Gb3JtUXVlc3Rpb25Nb2RlbChmb3JtU2NoZW1hKTtcclxuICB9XHJcblxyXG4gIHRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcclxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHF1ZXN0aW9uLm9wdGlvbnM7XHJcbiAgICBvcHRpb25zLnNwbGljZSgwLCAwLCB7XHJcbiAgICAgIGxhYmVsOiAnJyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9KTtcclxuXHJcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnbnVtYmVyJztcclxuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xyXG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XHJcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcclxuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9OdW1iZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dElucHV0UXVlc3Rpb24oeyBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdudW1iZXInO1xyXG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcclxuXHJcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xyXG4gICAgICBsYWJlbDogJ2xhYmVsJyxcclxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgIGlkOiAna2V5J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvRGF0ZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBEYXRlUXVlc3Rpb24ge1xyXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnR5cGUgPT09ICdlbmNvdW50ZXJEYXRldGltZScpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IERhdGVRdWVzdGlvbih7IHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdkYXRlJztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5zaG93VGltZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zaG93VGltZSBhcyBib29sZWFuO1xyXG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XHJcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxyXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgaWQ6ICdrZXknXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgfVxyXG5cclxuICB0b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IERhdGVRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBEYXRlUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xyXG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XHJcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcclxuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xyXG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XHJcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxyXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgaWQ6ICdrZXknXHJcbiAgICB9O1xyXG4gICAgcXVlc3Rpb24uc2hvd1RpbWUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogQ2hlY2tCb3hRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBDaGVja0JveFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKChvYmopID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxyXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBxdWVzdGlvbi5vcHRpb25zLnNwbGljZSgwLCAwKTtcclxuXHJcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcclxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XHJcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG5cclxuICB9XHJcblxyXG4gIHRvTXVsdGlDaGVja2JveFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBNdWx0aVNlbGVjdFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IE11bHRpU2VsZWN0UXVlc3Rpb24oeyByZW5kZXJUeXBlOiAnJywgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcclxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gbmV3IER1bW15RGF0YVNvdXJjZSgpO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9UZXh0QXJlYVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0QXJlYUlucHV0UXVlc3Rpb24ge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uKHtcclxuICAgICAgaXNFeHBhbmRlZDogZmFsc2UsIHJvd3M6IDE4LFxyXG4gICAgICBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnXHJcbiAgICB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xyXG4gICAgcXVlc3Rpb24uaXNFeHBhbmRlZCA9IHNjaGVtYVF1ZXN0aW9uLmlzRXhwYW5kZWQ7XHJcbiAgICBxdWVzdGlvbi5yb3dzID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJvd3M7XHJcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcclxuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xyXG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9UZXh0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAndGV4dCc7XHJcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlcjtcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XHJcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxyXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgaWQ6ICdrZXknXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvRmlsZVVwbG9hZFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBGaWxlVXBsb2FkUXVlc3Rpb24ge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRmlsZVVwbG9hZFF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XHJcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xyXG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XHJcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2ZpbGUnO1xyXG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdmaWxlJztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9EcnVnUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2RydWcnO1xyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9Qcm9ibGVtUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcclxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3Byb2JsZW0nO1xyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9Db25jZXB0QW5zd2VyU2VsZWN0KHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XHJcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcclxuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xyXG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5kYXRhU291cmNlIHx8ICdjb25jZXB0QW5zd2Vycyc7XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucyA9IHtcclxuICAgICAgY29uY2VwdDogc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcclxuICAgIH07XHJcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xyXG4gICAgICBsYWJlbDogJ2xhYmVsJyxcclxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgIGlkOiAna2V5J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgfVxyXG5cclxuICB0b1JlcGVhdGluZ1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBSZXBlYXRpbmdRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBSZXBlYXRpbmdRdWVzdGlvbih7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xyXG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XHJcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcclxuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xyXG5cclxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi50eXBlID09PSAndGVzdE9yZGVyJykge1xyXG4gICAgICBjb25zdCB0ZXN0T3JkZXIgPSB0aGlzLnRvVGVzdE9yZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgICBjb25zdCBvcmRlcnMgPSBbXTsgb3JkZXJzLnB1c2godGVzdE9yZGVyKTtcclxuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gb3JkZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XHJcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxyXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcclxuICAgICAgaWQ6ICdrZXknXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvR3JvdXBRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XHJcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xyXG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gdGhpcy5nZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9ucyk7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9QYWdlUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdwYWdlJztcclxuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuTm9uZTtcclxuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgc2NoZW1hUXVlc3Rpb24uc2VjdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLnB1c2godGhpcy50b1NlY3Rpb25RdWVzdGlvbihlbGVtZW50KSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvRm9ybVF1ZXN0aW9uTW9kZWwoc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdmb3JtJztcclxuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSBbXTtcclxuICAgIHNjaGVtYVF1ZXN0aW9uLnBhZ2VzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5wdXNoKHRoaXMudG9QYWdlUXVlc3Rpb24oZWxlbWVudCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9TZWN0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdzZWN0aW9uJztcclxuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuTm9uZTtcclxuICAgIHF1ZXN0aW9uLmlzRXhwYW5kZWQgPSBzY2hlbWFRdWVzdGlvbi5pc0V4cGFuZGVkID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldFNjaGVtYVF1ZXN0aW9ucyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgdG9QZXJzb25BdHRyaWJ1dGVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcclxuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3BlcnNvbkF0dHJpYnV0ZSc7XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHJldHVybiBxdWVzdGlvbjtcclxuICB9XHJcblxyXG4gIHRvRW5jb3VudGVyUHJvdmlkZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcclxuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3Byb3ZpZGVyJztcclxuXHJcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xyXG4gICAgICBsYWJlbDogJ2xhYmVsJyxcclxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgIGlkOiAna2V5J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgfVxyXG5cclxuICB0b0ZpZWxkU2V0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xyXG4gICAgY29uc3QgdG9SZXR1cm4gPSB0aGlzLnRvR3JvdXBRdWVzdGlvbihzY2hlbWFRdWVzdGlvbik7XHJcbiAgICB0b1JldHVybi5yZW5kZXJpbmdUeXBlID0gJ2ZpZWxkLXNldCc7XHJcbiAgICByZXR1cm4gdG9SZXR1cm47XHJcbiAgfVxyXG5cclxuICB0b0VuY291bnRlckxvY2F0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XHJcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi50eXBlO1xyXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2xvY2F0aW9uJztcclxuXHJcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xyXG4gICAgICBsYWJlbDogJ2xhYmVsJyxcclxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXHJcbiAgICAgIGlkOiAna2V5J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcclxuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XHJcbiAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgfVxyXG5cclxuICB0b1Rlc3RPcmRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXN0T3JkZXJRdWVzdGlvbiB7XHJcblxyXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGVzdE9yZGVyUXVlc3Rpb24oe1xyXG4gICAgICB0eXBlOiAnJywga2V5OiAnJywgb3JkZXJUeXBlOiAnJywgc2VsZWN0YWJsZU9yZGVyczogW10sXHJcbiAgICAgIG9yZGVyU2V0dGluZ1V1aWQ6ICcnLCBsYWJlbDogJycsIHJlbmRlcmluZzogJydcclxuICAgIH0pO1xyXG5cclxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XHJcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xyXG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XHJcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxyXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcclxuICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxyXG4gICAgICBpZDogJ2tleSdcclxuICAgIH07XHJcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xyXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2NoZW1hUXVlc3Rpb25zKHNjaGVtYTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGxpc3RRdWVzdGlvbnMgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYSwgbGlzdFF1ZXN0aW9ucyk7XHJcbiAgICByZXR1cm4gbGlzdFF1ZXN0aW9ucztcclxuICB9XHJcblxyXG4gIGdldFF1ZXN0aW9ucyhzY2hlbWE6IGFueSwgZm91bmRBcnJheTogYW55KTogYW55IHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShmb3VuZEFycmF5KSkge1xyXG4gICAgICBmb3VuZEFycmF5ID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYSkge1xyXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWFbcHJvcGVydHldLCBmb3VuZEFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2NoZW1hICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcgfHxcclxuICAgICAgICAgIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xyXG4gICAgICAgICAgLy8gc2NoZW1hLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0R3JvdXBNZW1iZXJzKHNjaGVtYS5xdWVzdGlvbnMpO1xyXG4gICAgICAgICAgZm91bmRBcnJheS5wdXNoKHRoaXMudG9Nb2RlbChzY2hlbWEsIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2ZpZWxkLXNldCcpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm91bmRBcnJheS5wdXNoKHRoaXMudG9Nb2RlbChzY2hlbWEsIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkobykpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hW29dLCBmb3VuZEFycmF5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYTogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XHJcbiAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWEsIGNoaWxkcmVuKTtcclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxuXHJcbiAgfVxyXG5cclxuICB0b01vZGVsKHNjaGVtYTogYW55LCByZW5kZXJUeXBlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKHJlbmRlclR5cGUgPT09ICd1aS1zZWxlY3QtZXh0ZW5kZWQnKSB7XHJcbiAgICAgIHJlbmRlclR5cGUgPSBzY2hlbWEudHlwZTtcclxuICAgIH1cclxuICAgIGlmICghc2NoZW1hLmlkKSB7XHJcbiAgICAgIHNjaGVtYVsnaWQnXSA9IHRoaXMuZ2VuZXJhdGVJZCgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMgJiZcclxuICAgICAgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGUgPT09IHRydWUgfHxcclxuICAgICAgICBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlID09PSAndHJ1ZScpKSB7XHJcbiAgICAgIHNjaGVtYSA9IHRoaXMuY29udmVydE9sZFZlcnNpb25Db21wbGV4T2JzUXVlc3Rpb25Ub05ld1ZlcnNpb24oc2NoZW1hKTtcclxuICAgICAgcmVuZGVyVHlwZSA9ICdmaWVsZC1zZXQnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocmVuZGVyVHlwZSkge1xyXG4gICAgICBjYXNlICdzZWxlY3QnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnc2luZ2xlLXNlbGVjdCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TZWxlY3RRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdtdWx0aS1zZWxlY3QnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnbnVtZXJpYyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b051bWJlclF1ZXN0aW9uKHNjaGVtYSk7XHJcbiAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnbXVsdGlDaGVja2JveCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9NdWx0aUNoZWNrYm94UXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnZHJ1Zyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EcnVnUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAncHJvYmxlbSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Qcm9ibGVtUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnZ3JvdXAnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvR3JvdXBRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdmaWVsZC1zZXQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvRmllbGRTZXRRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdyZXBlYXRpbmcnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvUmVwZWF0aW5nUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAncGVyc29uQXR0cmlidXRlJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b1BlcnNvbkF0dHJpYnV0ZVF1ZXN0aW9uKHNjaGVtYSk7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dFF1ZXN0aW9uKHNjaGVtYSk7XHJcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAndGV4dGFyZWEnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdzZWxlY3QtY29uY2VwdC1hbnN3ZXJzJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b0NvbmNlcHRBbnN3ZXJTZWxlY3Qoc2NoZW1hKTtcclxuICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyTG9jYXRpb25RdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYSk7XHJcbiAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAncmFkaW8nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYSk7XHJcbiAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9GaWxlVXBsb2FkUXVlc3Rpb24oc2NoZW1hKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLndhcm4oJ05ldyBTY2hlbWEgUXVlc3Rpb24gVHlwZSBmb3VuZC4uLi4uLi4uLicgKyByZW5kZXJUeXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRRdWVzdGlvbihzY2hlbWEpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNvbnZlcnRPbGRWZXJzaW9uQ29tcGxleE9ic1F1ZXN0aW9uVG9OZXdWZXJzaW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpIHtcclxuICAgIGNvbnN0IGNvbnZlcnRlZDogYW55ID0ge307XHJcbiAgICBjb252ZXJ0ZWQudHlwZSA9ICdjb21wbGV4LW9icyc7XHJcbiAgICBjb252ZXJ0ZWQubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcclxuICAgIGNvbnZlcnRlZC5pZCA9ICdjb21wbGV4XycgKyBzY2hlbWFRdWVzdGlvbi5pZDtcclxuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMgPSB7fTtcclxuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xyXG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPSAnZmllbGQtc2V0JztcclxuICAgIGNvbnZlcnRlZC5xdWVzdGlvbnMgPSBbXTtcclxuICAgIGNvbnZlcnRlZC52YWxpZGF0b3JzID0gW107XHJcblxyXG4gICAgY29uc3QgbWFpbkZpZWxkOiBhbnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNjaGVtYVF1ZXN0aW9uKSk7XHJcbiAgICBtYWluRmllbGQudHlwZSA9ICdjb21wbGV4LW9icy1jaGlsZCc7XHJcbiAgICBkZWxldGUgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZTtcclxuICAgIGRlbGV0ZSBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLnNob3duRGF0ZU9wdGlvbnM7XHJcbiAgICBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID0gJ3ZhbHVlJztcclxuXHJcbiAgICBjb25zdCBkYXRlRmllbGQ6IGFueSA9IHt9O1xyXG4gICAgZGF0ZUZpZWxkLnR5cGUgPSAnY29tcGxleC1vYnMtY2hpbGQnO1xyXG4gICAgZGF0ZUZpZWxkLmxhYmVsID0gJ0RhdGUgb2YgJyArIG1haW5GaWVsZC5sYWJlbDtcclxuICAgIGRhdGVGaWVsZC5pZCA9ICdkYXRlXycgKyBtYWluRmllbGQuaWQ7XHJcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zID0ge307XHJcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcclxuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID0gJ2RhdGUnO1xyXG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9ICdvYnNEYXRldGltZSc7XHJcbiAgICBjb25zdCBkYXRlT3B0aW9uczogYW55ID0gKE9iamVjdCBhcyBhbnkpLmFzc2lnbih7fSxcclxuICAgICAgc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNob3duRGF0ZU9wdGlvbnMpO1xyXG4gICAgZGF0ZUZpZWxkLnZhbGlkYXRvcnMgPSBkYXRlT3B0aW9ucy52YWxpZGF0b3JzO1xyXG4gICAgZGF0ZUZpZWxkLmhpZGUgPSBkYXRlT3B0aW9ucy5oaWRlO1xyXG4gICAgaWYgKGRhdGVPcHRpb25zLmhpc3RvcmljYWxFeHByZXNzaW9uKSB7XHJcbiAgICAgIGRhdGVGaWVsZC5oaXN0b3JpY2FsRXhwcmVzc2lvbiA9IGRhdGVPcHRpb25zLmhpc3RvcmljYWxFeHByZXNzaW9uO1xyXG4gICAgfVxyXG4gICAgY29udmVydGVkLnF1ZXN0aW9ucy5wdXNoKG1haW5GaWVsZCk7XHJcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zLnB1c2goZGF0ZUZpZWxkKTtcclxuXHJcbiAgICByZXR1cm4gY29udmVydGVkO1xyXG4gIH1cclxuXHJcbiAgY29weVByb3BlcnRpZXMobWFwcGluZ3M6IGFueSwgc291cmNlOiBhbnksIGRlc3RpbmF0aW9uOiBRdWVzdGlvbkJhc2UpIHtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNvdXJjZSkge1xyXG4gICAgICBpZiAobWFwcGluZ3MuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIGRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KG1hcHBpbmdzW3Byb3BlcnR5XSkpIHtcclxuICAgICAgICBkZXN0aW5hdGlvblttYXBwaW5nc1twcm9wZXJ0eV1dID0gc291cmNlW3Byb3BlcnR5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbjogYW55KTogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPiB7XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdG9yczogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPiA9IFtdO1xyXG5cclxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzKSB7XHJcblxyXG4gICAgICAvLyBUT0RPIC0gYWRkIG1vcmUgdmFsaWRhdG9yIHR5cGVzXHJcbiAgICAgIF8uZm9yRWFjaChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzLCAodmFsaWRhdG9yOiBhbnkpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBEYXRlVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxyXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcclxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVzdGlvbk9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnM7XHJcbiAgICBjb25zdCByZW5kZXJpbmdUeXBlID0gcXVlc3Rpb25PcHRpb25zID8gcXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA6ICcnO1xyXG4gICAgc3dpdGNoIChyZW5kZXJpbmdUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6XHJcblxyXG4gICAgICAgIGlmIChxdWVzdGlvbk9wdGlvbnMubWF4ICYmIHF1ZXN0aW9uT3B0aW9ucy5taW4pIHtcclxuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgTWF4VmFsaWRhdGlvbk1vZGVsKHtcclxuICAgICAgICAgICAgdHlwZTogJ21heCcsXHJcbiAgICAgICAgICAgIG1heDogcXVlc3Rpb25PcHRpb25zLm1heFxyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBNaW5WYWxpZGF0aW9uTW9kZWwoe1xyXG4gICAgICAgICAgICB0eXBlOiAnbWluJyxcclxuICAgICAgICAgICAgbWluOiBxdWVzdGlvbk9wdGlvbnMubWluXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgdmFsaWRhdG9yc1xyXG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBzY2hlbWFRdWVzdGlvbi5yZXF1aXJlZDtcclxuXHJcbiAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcclxuXHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCh7XHJcbiAgICAgICAgICByZWZlcmVuY2VRdWVzdGlvbklkOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkLFxyXG4gICAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMsXHJcbiAgICAgICAgICB0eXBlOiByZXF1aXJlZC50eXBlLFxyXG4gICAgICAgICAgbWVzc2FnZTogcmVxdWlyZWQubWVzc2FnZSxcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsaWRhdG9ycztcclxuICB9XHJcblxyXG4gIGFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcclxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbiAmJiBzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZSh0cnVlKTtcclxuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKFxyXG4gICAgICAgICAgKHNjaGVtYVF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSA9PT0gJ3RydWUnKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgb3JpZ1ZhbHVlID0gdGhpcy5oaXN0b3JpY2FsSGVscGVyU2VydmljZS5ldmFsdWF0ZShzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbixcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLCB1bmRlZmluZWQpO1xyXG4gICAgICBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3JpZ1ZhbHVlO1xyXG4gICAgICAvLyBjb25zb2xlLmluZm8oJ2hpc3RvcmljYWwgdmFsdWUnLCBvcmlnVmFsdWUpO1xyXG4gICAgICAvLyBjb25zb2xlLmluZm8oJ2hpc3RvcmljYWwgZGF0YSBxdWVzdGlvbiA6OjonLCBxdWVzdGlvbik7XHJcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnc2NoZW1hIGRhdGEgcXVlc3Rpb24gOjo6Jywgc2NoZW1hUXVlc3Rpb24pO1xyXG5cclxuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxQcmVwb3B1bGF0ZUNvbmRpdGlvbiAmJiBvcmlnVmFsdWUpIHtcclxuICAgICAgICBjb25zdCB0b1BvcHVsYXRlID0gdGhpcy5oaXN0b3JpY2FsSGVscGVyU2VydmljZS5ldmFsdWF0ZVByZWNvbmRpdGlvbihzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsUHJlcG9wdWxhdGVDb25kaXRpb24sXHJcbiAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLCBvcmlnVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAodG9Qb3B1bGF0ZSkge1xyXG4gICAgICAgICAgcXVlc3Rpb24uZGVmYXVsdFZhbHVlID0gb3JpZ1ZhbHVlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47IC8vIGRvbid0IHRyeSB0byBldmFsdWF0ZSB0aGUgb3RoZXIgb3B0aW9uXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsUHJlcG9wdWxhdGUgJiYgb3JpZ1ZhbHVlKSB7XHJcbiAgICAgICAgLy8gc2FtcGxlIHNjaGVtYSBvcHRpb25zIGZvciB0aGlzIGJyYW5jaFxyXG4gICAgICAgIC8vIFwiaGlzdG9yaWNhbFByZXBvcHVsYXRlXCI6dHJ1ZSxcclxuICAgICAgICAvLyBcImFsbG93ZWRIaXN0b3JpY2FsVmFsdWVBZ2VJbkRheXNcIjogNDAwMDAsXHJcbiAgICAgICAgY29uc3QgdmFsRGF0ZSA9IG1vbWVudChvcmlnVmFsdWUudmFsdWVEYXRlKTtcclxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5EYXlzID0gbW9tZW50KCkuZGlmZih2YWxEYXRlLCAnZGF5cycpO1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNjaGVtYVF1ZXN0aW9uLmFsbG93ZWRIaXN0b3JpY2FsVmFsdWVBZ2VJbkRheXMpKSB7XHJcbiAgICAgICAgICBpZiAoZGlmZmVyZW5jZUluRGF5cyA8PSBzY2hlbWFRdWVzdGlvbi5hbGxvd2VkSGlzdG9yaWNhbFZhbHVlQWdlSW5EYXlzKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLmRlZmF1bHRWYWx1ZSA9IG9yaWdWYWx1ZS52YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcXVlc3Rpb24uZGVmYXVsdFZhbHVlID0gb3JpZ1ZhbHVlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xyXG5cclxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMgJiZcclxuICAgICAgdHlwZW9mIHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jYWxjdWxhdGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY2FsY3VsYXRlLmNhbGN1bGF0ZUV4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcclxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5hbGVydCkge1xyXG4gICAgICBxdWVzdGlvbi5hbGVydCA9IHNjaGVtYVF1ZXN0aW9uLmFsZXJ0O1xyXG4gICAgfVxyXG4gICAgLy8gaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5tZXNzYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgLy8gICBpZiAoc2NoZW1hUXVlc3Rpb24ubWVzc2FnZS5hbGVydFdoZW5FeHByZXNzaW9uKSB7XHJcbiAgICAvLyAgICAgcXVlc3Rpb24ubWVzc2FnZSA9IHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UuYWxlcnRXaGVuRXhwcmVzc2lvbjtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xyXG5cclxuICAgIGlmICghIXNjaGVtYVF1ZXN0aW9uLmRpc2FibGUpIHtcclxuICAgICAgcXVlc3Rpb24uZGlzYWJsZSA9IHNjaGVtYVF1ZXN0aW9uLmRpc2FibGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBxdWVzdGlvbi5kaXNhYmxlID0gc2NoZW1hUXVlc3Rpb24uZGlzYWJsZS5kaXNhYmxlV2hlbkV4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEhc2NoZW1hUXVlc3Rpb24uaGlkZSkge1xyXG4gICAgICBxdWVzdGlvbi5oaWRlID0gc2NoZW1hUXVlc3Rpb24uaGlkZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24uaGlkZSA9PT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaWRlLmhpZGVXaGVuRXhwcmVzc2lvbikge1xyXG4gICAgICAgIHF1ZXN0aW9uLmhpZGUgPSBzY2hlbWFRdWVzdGlvbi5oaWRlLmhpZGVXaGVuRXhwcmVzc2lvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIGdlbmVyYXRlSWQoeCkge1xyXG4gICAgbGV0IHMgPSAnXyc7XHJcbiAgICB3aGlsZSAocy5sZW5ndGggPCB4ICYmIHggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICBzICs9IChyIDwgMC4xID8gTWF0aC5mbG9vcihyICogMTAwKSA6XHJcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKHIgKiAyNikgKyAociA+IDAuNSA/IDk3IDogNjUpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ18nICsgcztcclxuICB9XHJcbn1cclxuIl19