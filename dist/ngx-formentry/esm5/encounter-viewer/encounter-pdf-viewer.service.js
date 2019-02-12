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
     * @private
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    EncounterPdfViewerService.prototype.appendResolvedAnswer = /**
     * @private
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
                    if (answer) {
                        resolvedAnswer = this_1.resolveValue(answer, form);
                        this_1.appendResolvedAnswer(resolvedAnswer, questions, node);
                    }
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
                    pageSize: 'A4',
                    content: _this.getPages(_this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
                    styles: {
                        answers: {
                            fontSize: 8
                        },
                        banner: {
                            fontSize: 9,
                            bold: true,
                            margin: [50, 15, 30, 0]
                        },
                        bannerItem: {
                            margin: [2, 2, 2, 2]
                        },
                        bannerLabel: {
                            color: '#2f4f4f'
                        },
                        confidential: {
                            color: 'red',
                            fontSize: 8,
                            bold: true,
                            margin: [60, 0, 0, 0]
                        },
                        footer: {
                            alignment: 'center',
                            fontSize: 8,
                            bold: true
                        },
                        header: {
                            fontSize: 9,
                            bold: true,
                            margin: [5, 5, 5, 5]
                        },
                        pageNumber: {
                            color: '#2f4f4f',
                            fontSize: 6
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
                        timestamp: {
                            bold: true,
                            color: '#2f4f4f'
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
                                { text: 'ID: ', style: 'bannerLabel' },
                                { text: "" + patient.nid }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'DOB: ', style: 'bannerLabel' },
                                { text: moment(patient.birthdate).format('l') + " (" + patient.age + " yo)" }
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
                    if (patient.mhn) {
                        banner.push({
                            text: [
                                { text: 'MTRH No: ', style: 'bannerLabel' },
                                { text: "" + patient.mhn }
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
                        style: 'footer',
                        widths: ['*', 'auto'],
                        table: {
                            body: [
                                [
                                    {
                                        text: 'Note: Confidentiality is one of the core duties of all medical practitioners. '
                                            + 'Patients\' personal health information should be kept private.', style: 'confidential'
                                    }, ''
                                ],
                                [
                                    { text: "Generated on " + new Date().toUTCString(), style: 'timestamp' },
                                    { text: currentPage.toString() + " of " + pageCount, style: 'pageNumber' }
                                ],
                            ]
                        },
                        layout: 'noBorders'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBRTlDLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBZ0JFLG1DQUNVLHNCQUE4QyxFQUM5QyxlQUFnQyxFQUNoQyxXQUF3QjtRQUZ4QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVYzQixzQkFBaUIsR0FBUTtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztJQU1DLENBQUM7Ozs7Ozs7O0lBRUosNENBQVE7Ozs7Ozs7SUFBUixVQUFTLEtBQVUsRUFBRSxJQUFVLEVBQUUsaUJB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bEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVE7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBckQsQ0FBcUQsRUFBQyxDQUFDO0lBQzNGLENBQUM7O2dCQTNhRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Z0JBakJRLHNCQUFzQjtnQkFEdEIsZUFBZTtnQkFFZixXQUFXOzs7b0NBTHBCO0NBK2JDLEFBNWFELElBNGFDO1NBeGFZLHlCQUF5Qjs7Ozs7O0lBQ3BDLHFEQUFxQzs7SUFDckMsMENBQXNCOztJQUN0QixpREFBNEI7O0lBQzVCLCtDQUEyQjs7SUFDM0Isc0RBS0U7Ozs7O0lBR0EsMkRBQXNEOzs7OztJQUN0RCxvREFBd0M7Ozs7O0lBQ3hDLGdEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gJ3BkZm1ha2UvYnVpbGQvcGRmbWFrZS5qcyc7XG5pbXBvcnQgJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzLmpzJztcbmltcG9ydCAqIGFzIHBkZkZvbnRzIGZyb20gJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgZXJyb3I6IGJvb2xlYW47XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHNob3dMb2FkZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBzdWJzY3JpYmVkQW5zd2VyczogYW55ID0ge1xuICAgIHF1ZXN0aW9uczoge1xuICAgICAgc3RhY2s6IFtdXG4gICAgfSxcbiAgICBhbnN3ZXJzOiBbXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIG9ic1ZhbHVlQWRhcHRlcjogT2JzVmFsdWVBZGFwdGVyLFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzXG4gICkge31cblxuICBnZXRQYWdlcyhwYWdlczogYW55LCBmb3JtOiBGb3JtLCByZW1vdGVTZWxlY3RzT25seT86IGJvb2xlYW4sIHJlbW90ZUFucz86IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgbGV0IHJlbW90ZVF1ZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBpZiAocmVtb3RlU2VsZWN0c09ubHkpIHtcbiAgICAgICAgcmVtb3RlUXVlc3Rpb25zID0gcmVtb3RlUXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbiBvZiBmb3JtLnJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgIGlmIChwYWdlLmxhYmVsID09PSBmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0ucXVlc3Rpb24ubGFiZWwgJiZcbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goe1xuICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGtlZXBXaXRoSGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICBbeyB0ZXh0OiBwYWdlLmxhYmVsLCBzdHlsZTogJ3RhYmxlSGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCB0cnVlLCByZW1vdGVBbnMpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLndpZHRocy5sZW5ndGgpID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaExpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1vdGVTZWxlY3RzT25seSA/IHJlbW90ZVF1ZXN0aW9ucyA6IGNvbnRlbnQ7XG4gIH1cblxuICBnZXRTZWN0aW9ucyhzZWN0aW9uczogYW55LCBmb3JtOiBGb3JtLCByZXNvbHZlOiBhbnksIHJlbW90ZUFuczogYW55KTogYW55W10ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcbiAgICBjb25zdCBhbnN3ZXJlZFNlY3Rpb25zID0gW107XG4gICAgbGV0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuXG4gICAgc2VjdGlvbnMubWFwKHMgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChzLm5vZGUpKSB7XG4gICAgICAgIGFuc3dlcmVkU2VjdGlvbnMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XG4gICAgICBxdWVzdGlvbnMgPSBxdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc29sdmUgJiYgcmVtb3RlQW5zKSB7XG4gICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgICBjb250ZW50LnB1c2goW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICBbeyB0ZXh0OiBzZWN0aW9uLmxhYmVsLCBzdHlsZTogJ3RhYmxlU3ViaGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICBbIHRoaXMuZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uLCByZW1vdGVBbnMsIGZvcm0pIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlcjogYW55LCBxdWVzdGlvbnM6IGFueSwgbm9kZT86IGFueSkge1xuICAgIGlmIChyZXNvbHZlZEFuc3dlcikge1xuICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2goe1xuICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgYCR7KG5vZGUpID8gbm9kZS5xdWVzdGlvbi5sYWJlbCA6ICdRdWVzdGlvbiBsYWJlbCcgfSR7XG4gICAgICAgICAgICAobm9kZSkgPyAobm9kZS5xdWVzdGlvbi5sYWJlbC5pbmRleE9mKCc6JykgPiAxID8gJycgOiAnOicpIDogJydcbiAgICAgICAgICB9IGAsXG4gICAgICAgICAgeyB0ZXh0OiBgJHtyZXNvbHZlZEFuc3dlcn1gLCBib2xkOiB0cnVlIH1cbiAgICAgICAgXSwgc3R5bGU6ICdhbnN3ZXJzJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZ2V0IHJlbW90ZSBzZWxlY3RzIG9ubHlcbiAgZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbjogYW55KTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcbiAgICB0aGlzLnN1YnNjcmliZWRBbnN3ZXJzLnF1ZXN0aW9ucy5zdGFjayA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVtb3RlRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2godGhpcy5yZW1vdGVEYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKG5vZGUuY29udHJvbC52YWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLy8gbWVyZ2UgcmVtb3RlIHNlbGVjdHNcbiAgZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbjogYW55LCByZW1vdGVBbnM6IGFueVtdLCBmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSB7XG4gICAgICBzdGFjazogW11cbiAgICB9O1xuXG4gICAgbGV0IHJlc29sdmVkQW5zd2VyID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikubWFwKChrZXkpID0+IG5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShncm91cE1lbWJlcnNbMF0sIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlbW90ZS1zZWxlY3QnOlxuICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGFucyBvZiByZW1vdGVBbnMpIHtcbiAgICAgICAgICAgIGlmIChhbnMudmFsdWUgPT09IG5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKGFucy5sYWJlbCwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSBub2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgaWYgKGFuc3dlcikge1xuICAgICAgICAgICAgcmVzb2x2ZWRBbnN3ZXIgPSB0aGlzLnJlc29sdmVWYWx1ZShhbnN3ZXIsIGZvcm0pO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlciwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIHJlc29sdmVWYWx1ZShhbnN3ZXI6IGFueSwgZm9ybTogRm9ybSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgaWYgKGFuc3dlciAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmlzVXVpZChhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyLCBmb3JtLnNjaGVtYSk7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBfLmZvckVhY2goYW5zd2VyLCBlbGVtID0+IHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLnJlc29sdmVWYWx1ZShlbGVtLCBmb3JtLCB0cnVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKGFuc3dlcikpIHtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbnN3ZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhhbnN3ZXIpLm1hcCgoa2V5KSA9PiBba2V5LCBhbnN3ZXJba2V5XV0pO1xuXG4gICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IGRvY0RlZmluaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcbiAgICBjb25zdCByZW1vdGVTZWxlY3RzID0gdGhpcy5nZXRQYWdlcygodGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSkpLCBmb3JtLCB0cnVlKTtcblxuICAgIGNvbWJpbmVMYXRlc3QocmVtb3RlU2VsZWN0cykuc3Vic2NyaWJlKHJlbW90ZUFucyA9PiB7XG4gICAgICBpZiAocmVtb3RlQW5zKSB7XG4gICAgICAgIGNvbnN0IGRvY0RlZmluaXRpb24gPSB7XG4gICAgICAgICAgcGFnZVNpemU6ICdBNCcsXG4gICAgICAgICAgY29udGVudDogdGhpcy5nZXRQYWdlcyh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucyksXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1MCwgMTUsIDMwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckl0ZW06IHtcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMiwgMiwgMiwgMl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJMYWJlbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJyMyZjRmNGYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlkZW50aWFsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzYwLCAwLCAwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgNSwgNSwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzJmNGY0ZicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVFeGFtcGxlOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZjVmNWY1JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMzMzMnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZVN1YmhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzJmNGY0ZidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IDdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY0RlZmluaXRpb24kLm5leHQoZG9jRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZG9jRGVmaW5pdGlvbiQ7XG4gIH1cblxuICBkaXNwbGF5UGRmKGZvcm0pIHtcbiAgICBjb25zdCBwZGYgPSBwZGZNYWtlO1xuICAgIGxldCBwYXRpZW50O1xuICAgIHBkZi52ZnMgPSBwZGZGb250cy5wZGZNYWtlLnZmcztcblxuICAgIGlmIChmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlcykge1xuICAgICAgcGF0aWVudCA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzWydwYXRpZW50SW5mbyddO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm0pLnN1YnNjcmliZShkb2NEZWZpbml0aW9uID0+IHtcbiAgICAgIGlmICghKF8uaXNFbXB0eShkb2NEZWZpbml0aW9uKSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRpZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGJhbm5lciA9IFtdO1xuXG4gICAgICAgICAgaWYgKHBhdGllbnQubmFtZSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmFtZTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3RoaXMudGl0bGVpemUocGF0aWVudC5uYW1lKX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhdGllbnQubmlkKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdJRDogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubmlkfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGF0aWVudC5iaXJ0aGRhdGUpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RPQjogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke21vbWVudChwYXRpZW50LmJpcnRoZGF0ZSkuZm9ybWF0KCdsJyl9ICgke3BhdGllbnQuYWdlfSB5bylgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhdGllbnQubXVpKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVUk6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm11aX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhdGllbnQubWhuKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVFJIIE5vOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5taG59YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY0RlZmluaXRpb24uaGVhZGVyID0ge1xuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXInLFxuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgYm9keTogWyBiYW5uZXIgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jRGVmaW5pdGlvbi5mb290ZXIgPSAoY3VycmVudFBhZ2UsIHBhZ2VDb3VudCkgPT4ge1xuICAgICAgICAgIHJldHVybiBcdHtcbiAgICAgICAgICAgIHN0eWxlOiAnZm9vdGVyJyxcbiAgICAgICAgICAgIHdpZHRoczogWycqJywgJ2F1dG8nXSxcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdOb3RlOiBDb25maWRlbnRpYWxpdHkgaXMgb25lIG9mIHRoZSBjb3JlIGR1dGllcyBvZiBhbGwgbWVkaWNhbCBwcmFjdGl0aW9uZXJzLiAnXG4gICAgICAgICAgICAgICAgICAgICAgKyAnUGF0aWVudHNcXCcgcGVyc29uYWwgaGVhbHRoIGluZm9ybWF0aW9uIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuJywgc3R5bGU6ICdjb25maWRlbnRpYWwnXG4gICAgICAgICAgICAgICAgICB9LCAnJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBgR2VuZXJhdGVkIG9uICR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfWAsIHN0eWxlOiAndGltZXN0YW1wJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtjdXJyZW50UGFnZS50b1N0cmluZygpfSBvZiAke3BhZ2VDb3VudH1gLCBzdHlsZTogJ3BhZ2VOdW1iZXInIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnKTtcbiAgICAgICAgcGRmLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKHt9LCB3aW4pO1xuICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICByZXR1cm4gbW9tZW50KHZhbCwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpO1xuICB9XG5cbiAgdGl0bGVpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIHMgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG59XG4iXX0=