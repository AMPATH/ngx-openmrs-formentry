/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';
import { DataSources } from '../form-entry/data-sources/data-sources';
import { combineLatest, BehaviorSubject } from 'rxjs';
import * as moment_ from 'moment';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as i0 from "@angular/core";
import * as i1 from "./encounter-viewer.service";
import * as i2 from "../form-entry/value-adapters/obs.adapter";
import * as i3 from "../form-entry/data-sources/data-sources";
/** @type {?} */
var moment = moment_;
var EncounterPdfViewerService = /** @class */ (function () {
    function EncounterPdfViewerService(encounterViewerService, obsValueAdapter, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.obsValueAdapter = obsValueAdapter;
        this.dataSources = dataSources;
        this.subscribedAnswers = {
            questions: {
                stack: []
            },
            answers: []
        };
    }
    /**
     * @param {?} pages
     * @param {?} form
     * @param {?=} remoteSelectsOnly
     * @param {?=} remoteAns
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getPages = /**
     * @param {?} pages
     * @param {?} form
     * @param {?=} remoteSelectsOnly
     * @param {?=} remoteAns
     * @return {?}
     */
    function (pages, form, remoteSelectsOnly, remoteAns) {
        /** @type {?} */
        var content = [];
        /** @type {?} */
        var remoteQuestions = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                if (remoteSelectsOnly) {
                    remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
                }
                else {
                    try {
                        for (var _a = tslib_1.__values(form.rootNode.question.questions), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var question = _b.value;
                            if (page.label === form.rootNode.children[question.key].question.label &&
                                this.encounterViewerService.questionsAnswered(form.rootNode.children[question.key])) {
                                content.push({
                                    style: 'tableExample',
                                    table: {
                                        widths: ['*'],
                                        headerRows: 1,
                                        keepWithHeaderRows: 1,
                                        body: [
                                            [{ text: page.label, style: 'tableHeader' }],
                                            [
                                                {
                                                    style: 'tableExample',
                                                    table: {
                                                        widths: ['*'],
                                                        body: this.getSections(page.page, form, true, remoteAns)
                                                    },
                                                    layout: 'noBorders',
                                                    margin: [5, 0, 0, 0]
                                                }
                                            ]
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: (/**
                                         * @param {?} i
                                         * @param {?} node
                                         * @return {?}
                                         */
                                        function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                                        }),
                                        vLineWidth: (/**
                                         * @param {?} i
                                         * @param {?} node
                                         * @return {?}
                                         */
                                        function (i, node) {
                                            return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                                        }),
                                        hLineColor: (/**
                                         * @param {?} i
                                         * @param {?} node
                                         * @return {?}
                                         */
                                        function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                        }),
                                        vLineColor: (/**
                                         * @param {?} i
                                         * @param {?} node
                                         * @return {?}
                                         */
                                        function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                        })
                                    }
                                });
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_d = pages_1.return)) _d.call(pages_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return remoteSelectsOnly ? remoteQuestions : content;
        var e_2, _d, e_1, _c;
    };
    /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getSections = /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    function (sections, form, resolve, remoteAns) {
        var _this = this;
        /** @type {?} */
        var content = [];
        /** @type {?} */
        var answeredSections = [];
        /** @type {?} */
        var questions = [];
        sections.map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            if (_this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        }));
        try {
            for (var answeredSections_1 = tslib_1.__values(answeredSections), answeredSections_1_1 = answeredSections_1.next(); !answeredSections_1_1.done; answeredSections_1_1 = answeredSections_1.next()) {
                var section = answeredSections_1_1.value;
                questions = questions.concat(this.getRemoteSectionData(section.section));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (answeredSections_1_1 && !answeredSections_1_1.done && (_a = answeredSections_1.return)) _a.call(answeredSections_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (resolve && remoteAns) {
            try {
                for (var answeredSections_2 = tslib_1.__values(answeredSections), answeredSections_2_1 = answeredSections_2.next(); !answeredSections_2_1.done; answeredSections_2_1 = answeredSections_2.next()) {
                    var section = answeredSections_2_1.value;
                    content.push([
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    [{ text: section.label, style: 'tableSubheader' }],
                                    [this.getSectionData(section.section, remoteAns, form)]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (answeredSections_2_1 && !answeredSections_2_1.done && (_b = answeredSections_2.return)) _b.call(answeredSections_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return content;
        }
        else {
            return questions;
        }
        var e_3, _a, e_4, _b;
    };
    /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    EncounterPdfViewerService.prototype.appendResolvedAnswer = /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    function (resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    "" + ((node) ? node.question.label : 'Question label') + ((node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : '') + " ",
                    { text: "" + resolvedAnswer, bold: true }
                ], style: 'answers'
            });
        }
    };
    // get remote selects only
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getRemoteSectionData = 
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    function (section) {
        /** @type {?} */
        var questions = [];
        this.subscribedAnswers.questions.stack = [];
        try {
            for (var section_1 = tslib_1.__values(section), section_1_1 = section_1.next(); !section_1_1.done; section_1_1 = section_1.next()) {
                var node = section_1_1.value;
                if (node.question.renderingType === 'remote-select') {
                    this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                    if (node.control.value !== '') {
                        if (this.remoteDataSource) {
                            questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                        }
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (section_1_1 && !section_1_1.done && (_a = section_1.return)) _a.call(section_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return questions;
        var e_5, _a;
    };
    // merge remote selects
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getSectionData = 
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    function (section, remoteAns, form) {
        /** @type {?} */
        var questions = {
            stack: []
        };
        /** @type {?} */
        var resolvedAnswer = '';
        var _loop_1 = function (node) {
            switch (node.question.renderingType) {
                case 'group':
                    if (node.groupMembers) {
                        questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'field-set':
                    if (node.children) {
                        /** @type {?} */
                        var groupMembers = [];
                        /** @type {?} */
                        var result = Object.keys(node.children).map((/**
                         * @param {?} key
                         * @return {?}
                         */
                        function (key) { return node.children[key]; }));
                        if (result) {
                            groupMembers.push(result);
                            questions.stack.push(this_1.getSectionData(groupMembers[0], remoteAns, form));
                        }
                    }
                    break;
                case 'repeating':
                    if (node.groupMembers) {
                        questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'remote-select':
                    this_1.remoteDataSource = this_1.dataSources.dataSources[node.question.dataSource];
                    try {
                        for (var remoteAns_1 = tslib_1.__values(remoteAns), remoteAns_1_1 = remoteAns_1.next(); !remoteAns_1_1.done; remoteAns_1_1 = remoteAns_1.next()) {
                            var ans = remoteAns_1_1.value;
                            if (ans.value === node.control.value) {
                                this_1.appendResolvedAnswer(ans.label, questions, node);
                            }
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (remoteAns_1_1 && !remoteAns_1_1.done && (_a = remoteAns_1.return)) _a.call(remoteAns_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    break;
                default:
                    /** @type {?} */
                    var answer = node.control.value;
                    resolvedAnswer = this_1.resolveValue(answer, form);
                    this_1.appendResolvedAnswer(resolvedAnswer, questions, node);
            }
            var e_6, _a;
        };
        var this_1 = this;
        try {
            for (var section_2 = tslib_1.__values(section), section_2_1 = section_2.next(); !section_2_1.done; section_2_1 = section_2.next()) {
                var node = section_2_1.value;
                _loop_1(node);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (section_2_1 && !section_2_1.done && (_a = section_2.return)) _a.call(section_2);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return questions;
        var e_7, _a;
    };
    /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    EncounterPdfViewerService.prototype.resolveValue = /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    function (answer, form, arrayElement) {
        var _this = this;
        if (answer !== '') {
            if (this.isUuid(answer)) {
                /** @type {?} */
                var val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
                if (!arrayElement) {
                    if (val) {
                        return val.toUpperCase();
                    }
                    else {
                        return answer;
                    }
                }
                else {
                    return val;
                }
            }
            else if (_.isArray(answer)) {
                /** @type {?} */
                var arr_1 = [];
                _.forEach(answer, (/**
                 * @param {?} elem
                 * @return {?}
                 */
                function (elem) {
                    arr_1.push(_this.resolveValue(elem, form, true));
                }));
                return arr_1.toString();
            }
            else if (this.isDate(answer)) {
                if (!arrayElement) {
                    return this.encounterViewerService.convertTime(answer);
                }
                else {
                    return this.encounterViewerService.convertTime(answer);
                }
            }
            else if (typeof answer === 'object') {
                /** @type {?} */
                var values = [];
                /** @type {?} */
                var result = Object.keys(answer).map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return [key, answer[key]]; }));
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    };
    /**
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.generatePdfDefinition = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        /** @type {?} */
        var docDefinition$ = new BehaviorSubject({});
        /** @type {?} */
        var remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);
        combineLatest(remoteSelects).subscribe((/**
         * @param {?} remoteAns
         * @return {?}
         */
        function (remoteAns) {
            if (remoteAns) {
                /** @type {?} */
                var docDefinition = {
                    content: _this.getPages(_this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
                    styles: {
                        answers: {
                            fontSize: 8
                        },
                        confidential: {
                            color: 'red',
                            fontSize: 8,
                            bold: true,
                            margin: [60, 0, 0, 0]
                        },
                        header: {
                            fontSize: 9,
                            bold: true,
                            margin: [5, 5, 5, 5]
                        },
                        tableExample: {
                            fontSize: 10,
                            margin: [5, 0, 0, 5]
                        },
                        tableHeader: {
                            fillColor: '#f5f5f5',
                            width: ['100%'],
                            borderColor: '#333',
                            fontSize: 9,
                            bold: true,
                            margin: [5, 0, 5, 0]
                        },
                        tableSubheader: {
                            fillColor: '#337ab7',
                            width: ['100%'],
                            fontSize: 9,
                            color: 'white',
                            margin: [5, 0, 5, 0]
                        },
                        banner: {
                            fillColor: '#d9edf7',
                            fontSize: 9,
                            bold: true,
                            margin: [45, 20, 20, 20]
                        },
                        bannerLabel: {
                            color: '#a9a9a9'
                        },
                        bannerItem: {
                            margin: [20, 0, 10, 0]
                        },
                        timestamp: {
                            alignment: 'center',
                            bold: true
                        },
                        pageNumber: {
                            alignment: 'right',
                            margin: [0, 0, 5, 5]
                        }
                    },
                    defaultStyle: {
                        fontSize: 7
                    }
                };
                docDefinition$.next(docDefinition);
            }
        }));
        return docDefinition$;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.displayPdf = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        /** @type {?} */
        var pdf = pdfMake;
        /** @type {?} */
        var patient;
        pdf.vfs = pdfFonts.pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe((/**
         * @param {?} docDefinition
         * @return {?}
         */
        function (docDefinition) {
            if (!(_.isEmpty(docDefinition))) {
                if (typeof patient !== 'undefined') {
                    /** @type {?} */
                    var banner = [];
                    if (patient.name) {
                        banner.push({
                            text: [
                                { text: 'Name: ', style: 'bannerLabel' },
                                { text: "" + _this.titleize(patient.name) }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.nid) {
                        banner.push({
                            text: [
                                { text: 'NID: ', style: 'bannerLabel' },
                                { text: "" + patient.nid }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mui) {
                        banner.push({
                            text: [
                                { text: 'MUI: ', style: 'bannerLabel' },
                                { text: "" + patient.mui }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'YOB: ', style: 'bannerLabel' },
                                { text: moment(patient.birthdate).format('l') + " (" + patient.age + " yo)" }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    docDefinition.header = {
                        style: 'banner',
                        table: {
                            body: [banner]
                        },
                        layout: 'noBorders'
                    };
                }
                docDefinition.footer = (/**
                 * @param {?} currentPage
                 * @param {?} pageCount
                 * @return {?}
                 */
                function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                widths: ['*', '*', '*'],
                                stack: [
                                    {
                                        text: 
                                        // tslint:disable-next-line:max-line-length
                                        "Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.",
                                        style: 'confidential'
                                    }, {
                                        text: currentPage.toString() + ' of ' + pageCount,
                                        style: 'pageNumber'
                                    }, {
                                        text: "Generated on " + new Date(),
                                        style: 'timestamp'
                                    }
                                ]
                            }
                        ]
                    };
                });
                /** @type {?} */
                var win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log('Error: ', error);
        }));
    };
    /**
     * @param {?} val
     * @return {?}
     */
    EncounterPdfViewerService.prototype.isDate = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return moment(val, moment.ISO_8601, true).isValid();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    EncounterPdfViewerService.prototype.isUuid = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    EncounterPdfViewerService.prototype.titleize = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/\w\S*/g, (/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); }));
    };
    EncounterPdfViewerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    EncounterPdfViewerService.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: ObsValueAdapter },
        { type: DataSources }
    ]; };
    /** @nocollapse */ EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
    return EncounterPdfViewerService;
}());
export { EncounterPdfViewerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.remoteDataSource;
    /** @type {?} */
    EncounterPdfViewerService.prototype.error;
    /** @type {?} */
    EncounterPdfViewerService.prototype.errorMessage;
    /** @type {?} */
    EncounterPdfViewerService.prototype.showLoader;
    /** @type {?} */
    EncounterPdfViewerService.prototype.subscribedAnswers;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.encounterViewerService;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.obsValueAdapter;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBRTlDLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBZ0JFLG1DQUNVLHNCQUE4QyxFQUM5QyxlQUFnQyxFQUNoQyxXQUF3QjtRQUZ4QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVYzQixzQkFBaUIsR0FBUTtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztJQU1DLENBQUM7Ozs7Ozs7O0lBRUosNENBQVE7Ozs7Ozs7SUFBUixVQUFTLEtBQVUsRUFBRSxJQUFVLEVBQUUsaUJB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Z0JBNVpGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnQkFqQlEsc0JBQXNCO2dCQUR0QixlQUFlO2dCQUVmLFdBQVc7OztvQ0FMcEI7Q0FnYkMsQUE3WkQsSUE2WkM7U0F6WlkseUJBQXlCOzs7Ozs7SUFDcEMscURBQXFDOztJQUNyQywwQ0FBc0I7O0lBQ3RCLGlEQUE0Qjs7SUFDNUIsK0NBQTJCOztJQUMzQixzREFLRTs7Ozs7SUFHQSwyREFBc0Q7Ozs7O0lBQ3RELG9EQUF3Qzs7Ozs7SUFDeEMsZ0RBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlLmpzJztcbmltcG9ydCAncGRmbWFrZS9idWlsZC92ZnNfZm9udHMuanMnO1xuaW1wb3J0ICogYXMgcGRmRm9udHMgZnJvbSAncGRmbWFrZS9idWlsZC92ZnNfZm9udHMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVuY291bnRlclBkZlZpZXdlclNlcnZpY2Uge1xuICBwcml2YXRlIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBlcnJvcjogYm9vbGVhbjtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0xvYWRlcjogYm9vbGVhbjtcbiAgcHVibGljIHN1YnNjcmliZWRBbnN3ZXJzOiBhbnkgPSB7XG4gICAgcXVlc3Rpb25zOiB7XG4gICAgICBzdGFjazogW11cbiAgICB9LFxuICAgIGFuc3dlcnM6IFtdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgb2JzVmFsdWVBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXNcbiAgKSB7fVxuXG4gIGdldFBhZ2VzKHBhZ2VzOiBhbnksIGZvcm06IEZvcm0sIHJlbW90ZVNlbGVjdHNPbmx5PzogYm9vbGVhbiwgcmVtb3RlQW5zPzogYW55KTogYW55W10ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcbiAgICBsZXQgcmVtb3RlUXVlc3Rpb25zID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGlmIChyZW1vdGVTZWxlY3RzT25seSkge1xuICAgICAgICByZW1vdGVRdWVzdGlvbnMgPSByZW1vdGVRdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCBmYWxzZSwgcmVtb3RlQW5zKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIGZvcm0ucm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zKSB7XG4gICAgICAgICAgaWYgKHBhZ2UubGFiZWwgPT09IGZvcm0ucm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XS5xdWVzdGlvbi5sYWJlbCAmJlxuICAgICAgICAgICAgdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKGZvcm0ucm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAga2VlcFdpdGhIZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICAgIFt7IHRleHQ6IHBhZ2UubGFiZWwsIHN0eWxlOiAndGFibGVIZWFkZXInIH1dLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICd0YWJsZUV4YW1wbGUnLFxuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogdGhpcy5nZXRTZWN0aW9ucyhwYWdlLnBhZ2UsIGZvcm0sIHRydWUsIHJlbW90ZUFucylcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycycsXG4gICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgMF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgaExpbmVXaWR0aDogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVXaWR0aDogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUud2lkdGhzLmxlbmd0aCkgPyAwLjUgOiAwLjU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoTGluZUNvbG9yOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2TGluZUNvbG9yOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbW90ZVNlbGVjdHNPbmx5ID8gcmVtb3RlUXVlc3Rpb25zIDogY29udGVudDtcbiAgfVxuXG4gIGdldFNlY3Rpb25zKHNlY3Rpb25zOiBhbnksIGZvcm06IEZvcm0sIHJlc29sdmU6IGFueSwgcmVtb3RlQW5zOiBhbnkpOiBhbnlbXSB7XG4gICAgY29uc3QgY29udGVudCA9IFtdO1xuICAgIGNvbnN0IGFuc3dlcmVkU2VjdGlvbnMgPSBbXTtcbiAgICBsZXQgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG5cbiAgICBzZWN0aW9ucy5tYXAocyA9PiB7XG4gICAgICBpZiAodGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKHMubm9kZSkpIHtcbiAgICAgICAgYW5zd2VyZWRTZWN0aW9ucy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcbiAgICAgIHF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5jb25jYXQodGhpcy5nZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uLnNlY3Rpb24pKTtcbiAgICB9XG5cbiAgICBpZiAocmVzb2x2ZSAmJiByZW1vdGVBbnMpIHtcbiAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgYm9keTogW1xuICAgICAgICAgICAgICAgIFt7IHRleHQ6IHNlY3Rpb24ubGFiZWwsIHN0eWxlOiAndGFibGVTdWJoZWFkZXInIH1dLFxuICAgICAgICAgICAgICAgIFsgdGhpcy5nZXRTZWN0aW9uRGF0YShzZWN0aW9uLnNlY3Rpb24sIHJlbW90ZUFucywgZm9ybSkgXVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG4gIH1cblxuICBhcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlcjogYW55LCBxdWVzdGlvbnM6IGFueSwgbm9kZT86IGFueSkge1xuICAgIGlmIChyZXNvbHZlZEFuc3dlcikge1xuICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2goe1xuICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgYCR7KG5vZGUpID8gbm9kZS5xdWVzdGlvbi5sYWJlbCA6ICdRdWVzdGlvbiBsYWJlbCcgfSR7XG4gICAgICAgICAgICAobm9kZSkgPyAobm9kZS5xdWVzdGlvbi5sYWJlbC5pbmRleE9mKCc6JykgPiAxID8gJycgOiAnOicpIDogJydcbiAgICAgICAgICB9IGAsXG4gICAgICAgICAgeyB0ZXh0OiBgJHtyZXNvbHZlZEFuc3dlcn1gLCBib2xkOiB0cnVlIH1cbiAgICAgICAgXSwgc3R5bGU6ICdhbnN3ZXJzJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZ2V0IHJlbW90ZSBzZWxlY3RzIG9ubHlcbiAgZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbjogYW55KTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcbiAgICB0aGlzLnN1YnNjcmliZWRBbnN3ZXJzLnF1ZXN0aW9ucy5zdGFjayA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVtb3RlRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2godGhpcy5yZW1vdGVEYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKG5vZGUuY29udHJvbC52YWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLy8gbWVyZ2UgcmVtb3RlIHNlbGVjdHNcbiAgZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbjogYW55LCByZW1vdGVBbnM6IGFueVtdLCBmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSB7XG4gICAgICBzdGFjazogW11cbiAgICB9O1xuXG4gICAgbGV0IHJlc29sdmVkQW5zd2VyID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikubWFwKChrZXkpID0+IG5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShncm91cE1lbWJlcnNbMF0sIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlbW90ZS1zZWxlY3QnOlxuICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGFucyBvZiByZW1vdGVBbnMpIHtcbiAgICAgICAgICAgIGlmIChhbnMudmFsdWUgPT09IG5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKGFucy5sYWJlbCwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSBub2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgcmVzb2x2ZWRBbnN3ZXIgPSB0aGlzLnJlc29sdmVWYWx1ZShhbnN3ZXIsIGZvcm0pO1xuICAgICAgICAgIHRoaXMuYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXIsIHF1ZXN0aW9ucywgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIHJlc29sdmVWYWx1ZShhbnN3ZXI6IGFueSwgZm9ybTogRm9ybSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgaWYgKGFuc3dlciAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmlzVXVpZChhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyLCBmb3JtLnNjaGVtYSk7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBfLmZvckVhY2goYW5zd2VyLCBlbGVtID0+IHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLnJlc29sdmVWYWx1ZShlbGVtLCBmb3JtLCB0cnVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKGFuc3dlcikpIHtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbnN3ZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhhbnN3ZXIpLm1hcCgoa2V5KSA9PiBba2V5LCBhbnN3ZXJba2V5XV0pO1xuXG4gICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IGRvY0RlZmluaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcbiAgICBjb25zdCByZW1vdGVTZWxlY3RzID0gdGhpcy5nZXRQYWdlcygodGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSkpLCBmb3JtLCB0cnVlKTtcblxuICAgIGNvbWJpbmVMYXRlc3QocmVtb3RlU2VsZWN0cykuc3Vic2NyaWJlKHJlbW90ZUFucyA9PiB7XG4gICAgICBpZiAocmVtb3RlQW5zKSB7XG4gICAgICAgIGNvbnN0IGRvY0RlZmluaXRpb24gPSB7XG4gICAgICAgICAgY29udGVudDogdGhpcy5nZXRQYWdlcyh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucyksXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlkZW50aWFsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzYwLCAwLCAwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgNSwgNSwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCA1XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlSGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyNmNWY1ZjUnLFxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzMzMycsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCA1LCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlU3ViaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyMzMzdhYjcnLFxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnI2Q5ZWRmNycsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs0NSwgMjAsIDIwLCAyMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJMYWJlbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJyNhOWE5YTknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVySXRlbToge1xuICAgICAgICAgICAgICBtYXJnaW46IFsyMCwgMCwgMTAsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgICAgICAgIGFsaWdubWVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB7XG4gICAgICAgICAgICAgIGFsaWdubWVudDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMCwgNSwgNV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IDdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY0RlZmluaXRpb24kLm5leHQoZG9jRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZG9jRGVmaW5pdGlvbiQ7XG4gIH1cblxuICBkaXNwbGF5UGRmKGZvcm0pIHtcbiAgICBjb25zdCBwZGYgPSBwZGZNYWtlO1xuICAgIGxldCBwYXRpZW50O1xuICAgIHBkZi52ZnMgPSBwZGZGb250cy5wZGZNYWtlLnZmcztcbiAgICBcbiAgICBpZiAoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXMpIHtcbiAgICAgIHBhdGllbnQgPSBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlc1sncGF0aWVudEluZm8nXTtcbiAgICB9XG5cbiAgICB0aGlzLmdlbmVyYXRlUGRmRGVmaW5pdGlvbihmb3JtKS5zdWJzY3JpYmUoZG9jRGVmaW5pdGlvbiA9PiB7XG4gICAgICBpZiAoIShfLmlzRW1wdHkoZG9jRGVmaW5pdGlvbikpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBiYW5uZXIgPSBbXTtcblxuICAgICAgICAgIGlmIChwYXRpZW50Lm5hbWUpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWU6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHt0aGlzLnRpdGxlaXplKHBhdGllbnQubmFtZSl9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQubmlkKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdOSUQ6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm5pZH1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5tdWkpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ01VSTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubXVpfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50LmJpcnRoZGF0ZSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdZT0I6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogYCR7bW9tZW50KHBhdGllbnQuYmlydGhkYXRlKS5mb3JtYXQoJ2wnKX0gKCR7cGF0aWVudC5hZ2V9IHlvKWAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgZG9jRGVmaW5pdGlvbi5oZWFkZXIgPSB7XG4gICAgICAgICAgICBzdHlsZTogJ2Jhbm5lcicsXG4gICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICBib2R5OiBbIGJhbm5lciBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBkb2NEZWZpbml0aW9uLmZvb3RlciA9IChjdXJyZW50UGFnZSwgcGFnZUNvdW50KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoczogWycqJywgJyonLCAnKiddLFxuICAgICAgICAgICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgIGBOb3RlOiBDb25maWRlbnRpYWxpdHkgaXMgb25lIG9mIHRoZSBjb3JlIGR1dGllcyBvZiBhbGwgbWVkaWNhbCBwcmFjdGl0aW9uZXJzLiBQYXRpZW50cycgcGVyc29uYWwgaGVhbHRoIGluZm9ybWF0aW9uIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuYCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb25maWRlbnRpYWwnXG4gICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGN1cnJlbnRQYWdlLnRvU3RyaW5nKCkgKyAnIG9mICcgKyBwYWdlQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAncGFnZU51bWJlcidcbiAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogYEdlbmVyYXRlZCBvbiBgICsgbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICd0aW1lc3RhbXAnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB3aW4gPSB3aW5kb3cub3BlbignJywgJ19ibGFuaycpO1xuICAgICAgICBwZGYuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oe30sIHdpbik7XG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzRGF0ZSh2YWw6IGFueSkge1xuICAgIHJldHVybiBtb21lbnQodmFsLCBtb21lbnQuSVNPXzg2MDEsIHRydWUpLmlzVmFsaWQoKTtcbiAgfVxuXG4gIGlzVXVpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSk7XG4gIH1cblxuICB0aXRsZWl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgcyA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSk7XG4gIH1cbn1cbiJdfQ==