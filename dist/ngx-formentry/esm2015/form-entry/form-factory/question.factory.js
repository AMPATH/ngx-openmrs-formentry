import * as _ from 'lodash';
import * as moment_ from 'moment';
const moment = moment_;
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
    createQuestionModel(formSchema, form) {
        if (form) {
            const dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    }
    toSelectQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        const options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
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
    toNumericQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const mappings = {
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
    toNumberQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        const mappings = {
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
    toDateQuestion(schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        const question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = schemaQuestion.questionOptions.showTime;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const mappings = {
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
    toEncounterDatetimeQuestion(schemaQuestion) {
        const question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        const mappings = {
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
    toCheckBoxQuestion(schemaQuestion) {
        const question = new CheckBoxQuestion({ options: [], type: '', key: '' });
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
        const mappings = {
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
    toMultiCheckboxQuestion(schemaQuestion) {
        const question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
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
        const mappings = {
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
    toTextAreaQuestion(schemaQuestion) {
        const question = new TextAreaInputQuestion({
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
        const mappings = {
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
    toTextQuestion(schemaQuestion) {
        const question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        const mappings = {
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
    toFileUploadQuestion(schemaQuestion) {
        const question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
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
    toDrugQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        const mappings = {
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
    toProblemQuestion(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        const mappings = {
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
    toConceptAnswerSelect(schemaQuestion) {
        const question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        const mappings = {
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
    toRepeatingQuestion(schemaQuestion) {
        const question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            const testOrder = this.toTestOrderQuestion(schemaQuestion);
            const orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        const mappings = {
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
    toGroupQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        const mappings = {
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
    toPageQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
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
    toFormQuestionModel(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
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
    toSectionQuestion(schemaQuestion) {
        const question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    }
    toPersonAttributeQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
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
        const mappings = {
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
    toEncounterProviderQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
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
        const mappings = {
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
    toFieldSetQuestion(schemaQuestion) {
        const toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    }
    toEncounterLocationQuestion(schemaQuestion) {
        const question = new UiSelectQuestion({
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
        const mappings = {
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
    toTestOrderQuestion(schemaQuestion) {
        const question = new TestOrderQuestion({
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
        const mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    }
    getSchemaQuestions(schema) {
        const listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    }
    getQuestions(schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (const property in schema) {
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
                for (const o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    }
    getChildrenQuestionModels(schema) {
        const children = [];
        this.getQuestions(schema, children);
        return children;
    }
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
            case 'file':
                return this.toFileUploadQuestion(schema);
            default:
                console.warn('New Schema Question Type found.........' + renderType);
                return this.toTextQuestion(schema);
        }
    }
    convertOldVersionComplexObsQuestionToNewVersion(schemaQuestion) {
        const converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        const mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        const dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        const dateOptions = Object.assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    }
    copyProperties(mappings, source, destination) {
        for (const property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    }
    addValidators(schemaQuestion) {
        const validators = [];
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
        const questionOptions = schemaQuestion.questionOptions;
        const renderingType = questionOptions ? questionOptions.rendering : '';
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
            const required = schemaQuestion.required;
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
    addHistoricalExpressions(schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            const origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources, undefined);
            question.historicalDataValue = origValue;
            // console.info('historical value', origValue);
            // console.info('historical data question :::', question);
            // console.info('schema data question :::', schemaQuestion);
            if (schemaQuestion.historicalPrepopulateCondition && origValue) {
                const toPopulate = this.historicalHelperService.evaluatePrecondition(schemaQuestion.historicalPrepopulateCondition, this.dataSources, origValue);
                if (toPopulate) {
                    question.defaultValue = origValue.value;
                }
                return; // don't try to evaluate the other option
            }
            if (schemaQuestion.historicalPrepopulate && origValue) {
                // sample schema options for this branch
                // "historicalPrepopulate":true,
                // "allowedHistoricalValueAgeInDays": 40000,
                const valDate = moment(origValue.valueDate);
                const differenceInDays = moment().diff(valDate, 'days');
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
    }
    addCalculatorProperty(schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    }
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
    generateId(x) {
        let s = '_';
        while (s.length < x && x > 0) {
            const r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxF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QUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUNELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmltcG9ydCB7IFRleHRJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3RleHQtaW5wdXQtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3RleHQtYXJlYS1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVWlTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy91aS1zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgRGF0ZVF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtcXVlc3Rpb24nO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tdWx0aS1zZWxlY3QtcXVlc3Rpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9yZXBlYXRpbmctcXVlc3Rpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ZpbGUtdXBsb2FkLXF1ZXN0aW9uJztcbmltcG9ydCB7IFRlc3RPcmRlclF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24nO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tYXgtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IER1bW15RGF0YVNvdXJjZSB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2hlbHBlcnMvaGlzdG9yaWNhbC1leHByZXNzaW9uLWhlbHBlci1zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHsgQ2hlY2tCb3hRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GYWN0b3J5IHtcbiAgZGF0YVNvdXJjZXM6IGFueSA9IHt9O1xuICBoaXN0b3JpY2FsSGVscGVyU2VydmljZTogSGlzdG9yaWNhbEhlbHBlclNlcnZpY2UgPSBuZXcgSGlzdG9yaWNhbEhlbHBlclNlcnZpY2UoKTtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBjcmVhdGVRdWVzdGlvbk1vZGVsKGZvcm1TY2hlbWE6IGFueSwgZm9ybT86IEZvcm0pOiBRdWVzdGlvbkJhc2Uge1xuICAgIGlmIChmb3JtKSB7XG4gICAgICBjb25zdCBkYXRhU291cmNlcyA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXM7XG4gICAgICB0aGlzLmRhdGFTb3VyY2VzID0gZGF0YVNvdXJjZXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRvRm9ybVF1ZXN0aW9uTW9kZWwoZm9ybVNjaGVtYSk7XG4gIH1cblxuICB0b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHF1ZXN0aW9uLm9wdGlvbnM7XG4gICAgb3B0aW9ucy5zcGxpY2UoMCwgMCwge1xuICAgICAgbGFiZWw6ICcnLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSk7XG5cbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ251bWJlcic7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b051bWJlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0SW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dElucHV0UXVlc3Rpb24oeyBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdudW1iZXInO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0RhdGVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRGF0ZVF1ZXN0aW9uIHtcbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24udHlwZSA9PT0gJ2VuY291bnRlckRhdGV0aW1lJykge1xuICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICB9XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRGF0ZVF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdkYXRlJztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5zaG93VGltZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zaG93VGltZSBhcyBib29sZWFuO1xuICAgIHF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IERhdGVRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRGF0ZVF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcbiAgICBxdWVzdGlvbi5zaG93VGltZSA9IHRydWU7XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogQ2hlY2tCb3hRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgQ2hlY2tCb3hRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMuc3BsaWNlKDAsIDApO1xuXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuXG4gIH1cblxuICB0b011bHRpQ2hlY2tib3hRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogTXVsdGlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgTXVsdGlTZWxlY3RRdWVzdGlvbih7IHJlbmRlclR5cGU6ICcnLCBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gbmV3IER1bW15RGF0YVNvdXJjZSgpO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRBcmVhSW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dEFyZWFJbnB1dFF1ZXN0aW9uKHtcbiAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlLCByb3dzOiAxOCxcbiAgICAgIHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJydcbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIHF1ZXN0aW9uLmlzRXhwYW5kZWQgPSBzY2hlbWFRdWVzdGlvbi5pc0V4cGFuZGVkO1xuICAgIHF1ZXN0aW9uLnJvd3MgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucm93cztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9UZXh0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3RleHQnO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9GaWxlVXBsb2FkUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IEZpbGVVcGxvYWRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgRmlsZVVwbG9hZFF1ZXN0aW9uKHsgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2ZpbGUnO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAnZmlsZSc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRHJ1Z1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAnZHJ1Zyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1Byb2JsZW1RdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3Byb2JsZW0nO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Db25jZXB0QW5zd2VyU2VsZWN0KHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuZGF0YVNvdXJjZSB8fCAnY29uY2VwdEFuc3dlcnMnO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zID0ge1xuICAgICAgY29uY2VwdDogc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcbiAgICB9O1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9SZXBlYXRpbmdRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUmVwZWF0aW5nUXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFJlcGVhdGluZ1F1ZXN0aW9uKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgY29uc3QgdGVzdE9yZGVyID0gdGhpcy50b1Rlc3RPcmRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICAgIGNvbnN0IG9yZGVycyA9IFtdOyBvcmRlcnMucHVzaCh0ZXN0T3JkZXIpO1xuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gb3JkZXJzO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Hcm91cFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9QYWdlUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncGFnZSc7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5Ob25lO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IFtdO1xuICAgIHNjaGVtYVF1ZXN0aW9uLnNlY3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMucHVzaCh0aGlzLnRvU2VjdGlvblF1ZXN0aW9uKGVsZW1lbnQpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0Zvcm1RdWVzdGlvbk1vZGVsKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2Zvcm0nO1xuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IFtdO1xuICAgIHNjaGVtYVF1ZXN0aW9uLnBhZ2VzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMucHVzaCh0aGlzLnRvUGFnZVF1ZXN0aW9uKGVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvU2VjdGlvblF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3NlY3Rpb24nO1xuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuTm9uZTtcbiAgICBxdWVzdGlvbi5pc0V4cGFuZGVkID0gc2NoZW1hUXVlc3Rpb24uaXNFeHBhbmRlZCA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0U2NoZW1hUXVlc3Rpb25zKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9QZXJzb25BdHRyaWJ1dGVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XG4gICAgICBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycsIHNlYXJjaEZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3BlcnNvbkF0dHJpYnV0ZSc7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9FbmNvdW50ZXJQcm92aWRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBVaVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHJlc29sdmVGdW5jdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncHJvdmlkZXInO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0ZpZWxkU2V0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHRvUmV0dXJuID0gdGhpcy50b0dyb3VwUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgIHRvUmV0dXJuLnJlbmRlcmluZ1R5cGUgPSAnZmllbGQtc2V0JztcbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH1cblxuICB0b0VuY291bnRlckxvY2F0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFVpU2VsZWN0UXVlc3Rpb24oe1xuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi50eXBlO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdsb2NhdGlvbic7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvVGVzdE9yZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRlc3RPcmRlclF1ZXN0aW9uIHtcblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRlc3RPcmRlclF1ZXN0aW9uKHtcbiAgICAgIHR5cGU6ICcnLCBrZXk6ICcnLCBvcmRlclR5cGU6ICcnLCBzZWxlY3RhYmxlT3JkZXJzOiBbXSxcbiAgICAgIG9yZGVyU2V0dGluZ1V1aWQ6ICcnLCBsYWJlbDogJycsIHJlbmRlcmluZzogJydcbiAgICB9KTtcblxuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICBnZXRTY2hlbWFRdWVzdGlvbnMoc2NoZW1hOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGxpc3RRdWVzdGlvbnMgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWEsIGxpc3RRdWVzdGlvbnMpO1xuICAgIHJldHVybiBsaXN0UXVlc3Rpb25zO1xuICB9XG5cbiAgZ2V0UXVlc3Rpb25zKHNjaGVtYTogYW55LCBmb3VuZEFycmF5OiBhbnkpOiBhbnkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShmb3VuZEFycmF5KSkge1xuICAgICAgZm91bmRBcnJheSA9IFtdO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG5cbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hW3Byb3BlcnR5XSwgZm91bmRBcnJheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJyB8fFxuICAgICAgICAgIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAncmVwZWF0aW5nJykge1xuICAgICAgICAgIC8vIHNjaGVtYS5xdWVzdGlvbnMgPSB0aGlzLmdldEdyb3VwTWVtYmVycyhzY2hlbWEucXVlc3Rpb25zKTtcbiAgICAgICAgICBmb3VuZEFycmF5LnB1c2godGhpcy50b01vZGVsKHNjaGVtYSwgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2ZpZWxkLXNldCcpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3VuZEFycmF5LnB1c2godGhpcy50b01vZGVsKHNjaGVtYSwgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBvIGluIHNjaGVtYSkge1xuICAgICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkobykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYVtvXSwgZm91bmRBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBnZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYTogYW55KTogYW55IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYSwgY2hpbGRyZW4pO1xuICAgIHJldHVybiBjaGlsZHJlbjtcblxuICB9XG5cbiAgdG9Nb2RlbChzY2hlbWE6IGFueSwgcmVuZGVyVHlwZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAocmVuZGVyVHlwZSA9PT0gJ3VpLXNlbGVjdC1leHRlbmRlZCcpIHtcbiAgICAgIHJlbmRlclR5cGUgPSBzY2hlbWEudHlwZTtcbiAgICB9XG4gICAgaWYgKCFzY2hlbWEuaWQpIHtcbiAgICAgIHNjaGVtYVsnaWQnXSA9IHRoaXMuZ2VuZXJhdGVJZCgxMCk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMgJiZcbiAgICAgIChzY2hlbWEucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlID09PSB0cnVlIHx8XG4gICAgICAgIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGUgPT09ICd0cnVlJykpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMuY29udmVydE9sZFZlcnNpb25Db21wbGV4T2JzUXVlc3Rpb25Ub05ld1ZlcnNpb24oc2NoZW1hKTtcbiAgICAgIHJlbmRlclR5cGUgPSAnZmllbGQtc2V0JztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHJlbmRlclR5cGUpIHtcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3NpbmdsZS1zZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdtdWx0aS1zZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdudW1lcmljJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1lcmljUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvTnVtYmVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ211bHRpQ2hlY2tib3gnOlxuICAgICAgICByZXR1cm4gdGhpcy50b011bHRpQ2hlY2tib3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZHJ1Zyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRHJ1Z1F1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdwcm9ibGVtJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Qcm9ibGVtUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Hcm91cFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdmaWVsZC1zZXQnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0ZpZWxkU2V0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUmVwZWF0aW5nUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3BlcnNvbkF0dHJpYnV0ZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUGVyc29uQXR0cmlidXRlUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9UZXh0QXJlYVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdzZWxlY3QtY29uY2VwdC1hbnN3ZXJzJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Db25jZXB0QW5zd2VyU2VsZWN0KHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJMb2NhdGlvbic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyTG9jYXRpb25RdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJQcm92aWRlclF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0NoZWNrQm94UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJQcm92aWRlclF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9GaWxlVXBsb2FkUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybignTmV3IFNjaGVtYSBRdWVzdGlvbiBUeXBlIGZvdW5kLi4uLi4uLi4uJyArIHJlbmRlclR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRRdWVzdGlvbihzY2hlbWEpO1xuICAgIH1cblxuICB9XG5cbiAgY29udmVydE9sZFZlcnNpb25Db21wbGV4T2JzUXVlc3Rpb25Ub05ld1ZlcnNpb24oc2NoZW1hUXVlc3Rpb246IGFueSkge1xuICAgIGNvbnN0IGNvbnZlcnRlZDogYW55ID0ge307XG4gICAgY29udmVydGVkLnR5cGUgPSAnY29tcGxleC1vYnMnO1xuICAgIGNvbnZlcnRlZC5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIGNvbnZlcnRlZC5pZCA9ICdjb21wbGV4XycgKyBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zID0ge307XG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPSAnZmllbGQtc2V0JztcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zID0gW107XG4gICAgY29udmVydGVkLnZhbGlkYXRvcnMgPSBbXTtcblxuICAgIGNvbnN0IG1haW5GaWVsZDogYW55ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzY2hlbWFRdWVzdGlvbikpO1xuICAgIG1haW5GaWVsZC50eXBlID0gJ2NvbXBsZXgtb2JzLWNoaWxkJztcbiAgICBkZWxldGUgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZTtcbiAgICBkZWxldGUgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5zaG93bkRhdGVPcHRpb25zO1xuICAgIG1haW5GaWVsZC5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPSAndmFsdWUnO1xuXG4gICAgY29uc3QgZGF0ZUZpZWxkOiBhbnkgPSB7fTtcbiAgICBkYXRlRmllbGQudHlwZSA9ICdjb21wbGV4LW9icy1jaGlsZCc7XG4gICAgZGF0ZUZpZWxkLmxhYmVsID0gJ0RhdGUgb2YgJyArIG1haW5GaWVsZC5sYWJlbDtcbiAgICBkYXRlRmllbGQuaWQgPSAnZGF0ZV8nICsgbWFpbkZpZWxkLmlkO1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMgPSB7fTtcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9ICdkYXRlJztcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID0gJ29ic0RhdGV0aW1lJztcbiAgICBjb25zdCBkYXRlT3B0aW9uczogYW55ID0gKE9iamVjdCBhcyBhbnkpLmFzc2lnbih7fSxcbiAgICAgIHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zaG93bkRhdGVPcHRpb25zKTtcbiAgICBkYXRlRmllbGQudmFsaWRhdG9ycyA9IGRhdGVPcHRpb25zLnZhbGlkYXRvcnM7XG4gICAgZGF0ZUZpZWxkLmhpZGUgPSBkYXRlT3B0aW9ucy5oaWRlO1xuXG5cbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zLnB1c2gobWFpbkZpZWxkKTtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25zLnB1c2goZGF0ZUZpZWxkKTtcblxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cblxuICBjb3B5UHJvcGVydGllcyhtYXBwaW5nczogYW55LCBzb3VyY2U6IGFueSwgZGVzdGluYXRpb246IFF1ZXN0aW9uQmFzZSkge1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChtYXBwaW5ncy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgZGVzdGluYXRpb24uaGFzT3duUHJvcGVydHkobWFwcGluZ3NbcHJvcGVydHldKSkge1xuICAgICAgICBkZXN0aW5hdGlvblttYXBwaW5nc1twcm9wZXJ0eV1dID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+IHtcblxuICAgIGNvbnN0IHZhbGlkYXRvcnM6IEFycmF5PFZhbGlkYXRpb25Nb2RlbD4gPSBbXTtcblxuICAgIGlmIChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzKSB7XG5cbiAgICAgIC8vIFRPRE8gLSBhZGQgbW9yZSB2YWxpZGF0b3IgdHlwZXNcbiAgICAgIF8uZm9yRWFjaChzY2hlbWFRdWVzdGlvbi52YWxpZGF0b3JzLCAodmFsaWRhdG9yOiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBEYXRlVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsQW5zd2VyZWQnOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IFZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbk9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnM7XG4gICAgY29uc3QgcmVuZGVyaW5nVHlwZSA9IHF1ZXN0aW9uT3B0aW9ucyA/IHF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgOiAnJztcbiAgICBzd2l0Y2ggKHJlbmRlcmluZ1R5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uT3B0aW9ucy5tYXggJiYgcXVlc3Rpb25PcHRpb25zLm1pbikge1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgTWF4VmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICAgIHR5cGU6ICdtYXgnLFxuICAgICAgICAgICAgbWF4OiBxdWVzdGlvbk9wdGlvbnMubWF4XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgTWluVmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICAgIHR5cGU6ICdtaW4nLFxuICAgICAgICAgICAgbWluOiBxdWVzdGlvbk9wdGlvbnMubWluXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBhZGQgY29uZGl0aW9uYWwgcmVxdWlyZWQgdmFsaWRhdG9yc1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ucmVxdWlyZWQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIGNvbnN0IHJlcXVpcmVkOiBhbnkgPSBzY2hlbWFRdWVzdGlvbi5yZXF1aXJlZDtcblxuICAgICAgaWYgKHJlcXVpcmVkLnR5cGUgPT09ICdjb25kaXRpb25hbFJlcXVpcmVkJykge1xuXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwoe1xuICAgICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uSWQ6IHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uSWQsXG4gICAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnMsXG4gICAgICAgICAgdHlwZTogcmVxdWlyZWQudHlwZSxcbiAgICAgICAgICBtZXNzYWdlOiByZXF1aXJlZC5tZXNzYWdlLFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvcnM7XG4gIH1cblxuICBhZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uICYmIHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uLmxlbmd0aCA+IDApIHtcbiAgICAgIHF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZSh0cnVlKTtcbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBxdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUoXG4gICAgICAgICAgKHNjaGVtYVF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSA9PT0gJ3RydWUnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yaWdWYWx1ZSA9IHRoaXMuaGlzdG9yaWNhbEhlbHBlclNlcnZpY2UuZXZhbHVhdGUoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbEV4cHJlc3Npb24sXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZXMsIHVuZGVmaW5lZCk7XG4gICAgICBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3JpZ1ZhbHVlO1xuICAgICAgLy8gY29uc29sZS5pbmZvKCdoaXN0b3JpY2FsIHZhbHVlJywgb3JpZ1ZhbHVlKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnaGlzdG9yaWNhbCBkYXRhIHF1ZXN0aW9uIDo6OicsIHF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnc2NoZW1hIGRhdGEgcXVlc3Rpb24gOjo6Jywgc2NoZW1hUXVlc3Rpb24pO1xuXG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbFByZXBvcHVsYXRlQ29uZGl0aW9uICYmIG9yaWdWYWx1ZSkge1xuICAgICAgICBjb25zdCB0b1BvcHVsYXRlID0gdGhpcy5oaXN0b3JpY2FsSGVscGVyU2VydmljZS5ldmFsdWF0ZVByZWNvbmRpdGlvbihzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsUHJlcG9wdWxhdGVDb25kaXRpb24sXG4gICAgICAgICAgdGhpcy5kYXRhU291cmNlcywgb3JpZ1ZhbHVlKTtcblxuICAgICAgICBpZiAodG9Qb3B1bGF0ZSkge1xuICAgICAgICAgIHF1ZXN0aW9uLmRlZmF1bHRWYWx1ZSA9IG9yaWdWYWx1ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47IC8vIGRvbid0IHRyeSB0byBldmFsdWF0ZSB0aGUgb3RoZXIgb3B0aW9uXG4gICAgICB9XG5cbiAgICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsUHJlcG9wdWxhdGUgJiYgb3JpZ1ZhbHVlKSB7XG4gICAgICAgIC8vIHNhbXBsZSBzY2hlbWEgb3B0aW9ucyBmb3IgdGhpcyBicmFuY2hcbiAgICAgICAgLy8gXCJoaXN0b3JpY2FsUHJlcG9wdWxhdGVcIjp0cnVlLFxuICAgICAgICAvLyBcImFsbG93ZWRIaXN0b3JpY2FsVmFsdWVBZ2VJbkRheXNcIjogNDAwMDAsXG4gICAgICAgIGNvbnN0IHZhbERhdGUgPSBtb21lbnQob3JpZ1ZhbHVlLnZhbHVlRGF0ZSk7XG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VJbkRheXMgPSBtb21lbnQoKS5kaWZmKHZhbERhdGUsICdkYXlzJyk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNjaGVtYVF1ZXN0aW9uLmFsbG93ZWRIaXN0b3JpY2FsVmFsdWVBZ2VJbkRheXMpKSB7XG4gICAgICAgICAgaWYgKGRpZmZlcmVuY2VJbkRheXMgPD0gc2NoZW1hUXVlc3Rpb24uYWxsb3dlZEhpc3RvcmljYWxWYWx1ZUFnZUluRGF5cykge1xuICAgICAgICAgICAgcXVlc3Rpb24uZGVmYXVsdFZhbHVlID0gb3JpZ1ZhbHVlLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgPSBvcmlnVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG5cbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zICYmXG4gICAgICB0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNhbGN1bGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY2FsY3VsYXRlLmNhbGN1bGF0ZUV4cHJlc3Npb247XG4gICAgfVxuXG4gIH1cblxuICBhZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5hbGVydCkge1xuICAgICAgcXVlc3Rpb24uYWxlcnQgPSBzY2hlbWFRdWVzdGlvbi5hbGVydDtcbiAgICB9XG4gICAgLy8gaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5tZXNzYWdlID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgaWYgKHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UuYWxlcnRXaGVuRXhwcmVzc2lvbikge1xuICAgIC8vICAgICBxdWVzdGlvbi5tZXNzYWdlID0gc2NoZW1hUXVlc3Rpb24ubWVzc2FnZS5hbGVydFdoZW5FeHByZXNzaW9uO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIGFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcblxuICAgIGlmICghIXNjaGVtYVF1ZXN0aW9uLmRpc2FibGUpIHtcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgPSBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24uZGlzYWJsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHF1ZXN0aW9uLmRpc2FibGUgPSBzY2hlbWFRdWVzdGlvbi5kaXNhYmxlLmRpc2FibGVXaGVuRXhwcmVzc2lvbjtcbiAgICB9XG5cbiAgICBpZiAoISFzY2hlbWFRdWVzdGlvbi5oaWRlKSB7XG4gICAgICBxdWVzdGlvbi5oaWRlID0gc2NoZW1hUXVlc3Rpb24uaGlkZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5oaWRlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlkZS5oaWRlV2hlbkV4cHJlc3Npb24pIHtcbiAgICAgICAgcXVlc3Rpb24uaGlkZSA9IHNjaGVtYVF1ZXN0aW9uLmhpZGUuaGlkZVdoZW5FeHByZXNzaW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGdlbmVyYXRlSWQoeCkge1xuICAgIGxldCBzID0gJ18nO1xuICAgIHdoaWxlIChzLmxlbmd0aCA8IHggJiYgeCA+IDApIHtcbiAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgcyArPSAociA8IDAuMSA/IE1hdGguZmxvb3IociAqIDEwMCkgOlxuICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IociAqIDI2KSArIChyID4gMC41ID8gOTcgOiA2NSkpKTtcbiAgICB9XG4gICAgcmV0dXJuICdfJyArIHM7XG4gIH1cbn1cbiJdfQ==