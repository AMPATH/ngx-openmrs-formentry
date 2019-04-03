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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBRTlDLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBZ0JFLG1DQUNVLHNCQUE4QyxFQUM5QyxlQUFnQyxFQUNoQyxXQUF3QjtRQUZ4QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVYzQixzQkFBaUIsR0FBUTtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztJQU1DLENBQUM7Ozs7Ozs7O0lBRUosNENBQVE7Ozs7Ozs7SUFBUixVQUFTLEtBQVUsRUFBRSxJQUFVLEVBQUUsaUJB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bEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVE7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBckQsQ0FBcUQsRUFBQyxDQUFDO0lBQzNGLENBQUM7O2dCQTNhRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Z0JBakJRLHNCQUFzQjtnQkFEdEIsZUFBZTtnQkFFZixXQUFXOzs7b0NBTHBCO0NBK2JDLEFBNWFELElBNGFDO1NBeGFZLHlCQUF5Qjs7Ozs7O0lBQ3BDLHFEQUFxQzs7SUFDckMsMENBQXNCOztJQUN0QixpREFBNEI7O0lBQzVCLCtDQUEyQjs7SUFDM0Isc0RBS0U7Ozs7O0lBR0EsMkRBQXNEOzs7OztJQUN0RCxvREFBd0M7Ozs7O0lBQ3hDLGdEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XHJcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlLmpzJztcclxuaW1wb3J0ICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cy5qcyc7XHJcbmltcG9ydCAqIGFzIHBkZkZvbnRzIGZyb20gJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzJztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBlcnJvcjogYm9vbGVhbjtcclxuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcHVibGljIHNob3dMb2FkZXI6IGJvb2xlYW47XHJcbiAgcHVibGljIHN1YnNjcmliZWRBbnN3ZXJzOiBhbnkgPSB7XHJcbiAgICBxdWVzdGlvbnM6IHtcclxuICAgICAgc3RhY2s6IFtdXHJcbiAgICB9LFxyXG4gICAgYW5zd2VyczogW11cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcclxuICAgIHByaXZhdGUgb2JzVmFsdWVBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIsXHJcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlc1xyXG4gICkge31cclxuXHJcbiAgZ2V0UGFnZXMocGFnZXM6IGFueSwgZm9ybTogRm9ybSwgcmVtb3RlU2VsZWN0c09ubHk/OiBib29sZWFuLCByZW1vdGVBbnM/OiBhbnkpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gW107XHJcbiAgICBsZXQgcmVtb3RlUXVlc3Rpb25zID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XHJcbiAgICAgIGlmIChyZW1vdGVTZWxlY3RzT25seSkge1xyXG4gICAgICAgIHJlbW90ZVF1ZXN0aW9ucyA9IHJlbW90ZVF1ZXN0aW9ucy5jb25jYXQodGhpcy5nZXRTZWN0aW9ucyhwYWdlLnBhZ2UsIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIGZvcm0ucm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zKSB7XHJcbiAgICAgICAgICBpZiAocGFnZS5sYWJlbCA9PT0gZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldLnF1ZXN0aW9uLmxhYmVsICYmXHJcbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh7XHJcbiAgICAgICAgICAgICAgc3R5bGU6ICd0YWJsZUV4YW1wbGUnLFxyXG4gICAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93czogMSxcclxuICAgICAgICAgICAgICAgIGtlZXBXaXRoSGVhZGVyUm93czogMSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IFtcclxuICAgICAgICAgICAgICAgICAgW3sgdGV4dDogcGFnZS5sYWJlbCwgc3R5bGU6ICd0YWJsZUhlYWRlcicgfV0sXHJcbiAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgdHJ1ZSwgcmVtb3RlQW5zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCAwXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICBoTGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/IDAuNSA6IDAuNTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2TGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLndpZHRocy5sZW5ndGgpID8gMC41IDogMC41O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGhMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtb3RlU2VsZWN0c09ubHkgPyByZW1vdGVRdWVzdGlvbnMgOiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VjdGlvbnMoc2VjdGlvbnM6IGFueSwgZm9ybTogRm9ybSwgcmVzb2x2ZTogYW55LCByZW1vdGVBbnM6IGFueSk6IGFueVtdIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcclxuICAgIGNvbnN0IGFuc3dlcmVkU2VjdGlvbnMgPSBbXTtcclxuICAgIGxldCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcclxuXHJcbiAgICBzZWN0aW9ucy5tYXAocyA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQocy5ub2RlKSkge1xyXG4gICAgICAgIGFuc3dlcmVkU2VjdGlvbnMucHVzaChzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcclxuICAgICAgcXVlc3Rpb25zID0gcXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNvbHZlICYmIHJlbW90ZUFucykge1xyXG4gICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xyXG4gICAgICAgIGNvbnRlbnQucHVzaChbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcclxuICAgICAgICAgICAgICBib2R5OiBbXHJcbiAgICAgICAgICAgICAgICBbeyB0ZXh0OiBzZWN0aW9uLmxhYmVsLCBzdHlsZTogJ3RhYmxlU3ViaGVhZGVyJyB9XSxcclxuICAgICAgICAgICAgICAgIFsgdGhpcy5nZXRTZWN0aW9uRGF0YShzZWN0aW9uLnNlY3Rpb24sIHJlbW90ZUFucywgZm9ybSkgXVxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXI6IGFueSwgcXVlc3Rpb25zOiBhbnksIG5vZGU/OiBhbnkpIHtcclxuICAgIGlmIChyZXNvbHZlZEFuc3dlcikge1xyXG4gICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh7XHJcbiAgICAgICAgdGV4dDogW1xyXG4gICAgICAgICAgYCR7KG5vZGUpID8gbm9kZS5xdWVzdGlvbi5sYWJlbCA6ICdRdWVzdGlvbiBsYWJlbCcgfSR7XHJcbiAgICAgICAgICAgIChub2RlKSA/IChub2RlLnF1ZXN0aW9uLmxhYmVsLmluZGV4T2YoJzonKSA+IDEgPyAnJyA6ICc6JykgOiAnJ1xyXG4gICAgICAgICAgfSBgLFxyXG4gICAgICAgICAgeyB0ZXh0OiBgJHtyZXNvbHZlZEFuc3dlcn1gLCBib2xkOiB0cnVlIH1cclxuICAgICAgICBdLCBzdHlsZTogJ2Fuc3dlcnMnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZ2V0IHJlbW90ZSBzZWxlY3RzIG9ubHlcclxuICBnZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3QgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XHJcbiAgICB0aGlzLnN1YnNjcmliZWRBbnN3ZXJzLnF1ZXN0aW9ucy5zdGFjayA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBzZWN0aW9uKSB7XHJcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xyXG4gICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcclxuICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgaWYgKHRoaXMucmVtb3RlRGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh0aGlzLnJlbW90ZURhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUobm9kZS5jb250cm9sLnZhbHVlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcXVlc3Rpb25zO1xyXG4gIH1cclxuXHJcbiAgLy8gbWVyZ2UgcmVtb3RlIHNlbGVjdHNcclxuICBnZXRTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnksIHJlbW90ZUFuczogYW55W10sIGZvcm06IEZvcm0pOiBhbnkge1xyXG4gICAgY29uc3QgcXVlc3Rpb25zID0ge1xyXG4gICAgICBzdGFjazogW11cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlc29sdmVkQW5zd2VyID0gJyc7XHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcclxuICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcclxuICAgICAgICBjYXNlICdncm91cCc6XHJcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnZmllbGQtc2V0JzpcclxuICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTWVtYmVycyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhub2RlLmNoaWxkcmVuKS5tYXAoKGtleSkgPT4gbm9kZS5jaGlsZHJlbltrZXldKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICBncm91cE1lbWJlcnMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEoZ3JvdXBNZW1iZXJzWzBdLCByZW1vdGVBbnMsIGZvcm0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XHJcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAncmVtb3RlLXNlbGVjdCc6XHJcbiAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGFucyBvZiByZW1vdGVBbnMpIHtcclxuICAgICAgICAgICAgaWYgKGFucy52YWx1ZSA9PT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihhbnMubGFiZWwsIHF1ZXN0aW9ucywgbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgY29uc3QgYW5zd2VyID0gbm9kZS5jb250cm9sLnZhbHVlO1xyXG4gICAgICAgICAgaWYgKGFuc3dlcikge1xyXG4gICAgICAgICAgICByZXNvbHZlZEFuc3dlciA9IHRoaXMucmVzb2x2ZVZhbHVlKGFuc3dlciwgZm9ybSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXIsIHF1ZXN0aW9ucywgbm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVlc3Rpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVzb2x2ZVZhbHVlKGFuc3dlcjogYW55LCBmb3JtOiBGb3JtLCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKTogYW55IHtcclxuICAgIGlmIChhbnN3ZXIgIT09ICcnKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzVXVpZChhbnN3ZXIpKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXIsIGZvcm0uc2NoZW1hKTtcclxuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYW5zd2VyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoYW5zd2VyKSkge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xyXG4gICAgICAgIF8uZm9yRWFjaChhbnN3ZXIsIGVsZW0gPT4ge1xyXG4gICAgICAgICAgYXJyLnB1c2godGhpcy5yZXNvbHZlVmFsdWUoZWxlbSwgZm9ybSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnIudG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZShhbnN3ZXIpKSB7XHJcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYW5zd2VyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKGFuc3dlcikubWFwKChrZXkpID0+IFtrZXksIGFuc3dlcltrZXldXSk7XHJcblxyXG4gICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgIHJldHVybiBhbnN3ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUGRmRGVmaW5pdGlvbihmb3JtOiBGb3JtKTogYW55IHtcclxuICAgIGNvbnN0IGRvY0RlZmluaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcclxuICAgIGNvbnN0IHJlbW90ZVNlbGVjdHMgPSB0aGlzLmdldFBhZ2VzKCh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSksIGZvcm0sIHRydWUpO1xyXG5cclxuICAgIGNvbWJpbmVMYXRlc3QocmVtb3RlU2VsZWN0cykuc3Vic2NyaWJlKHJlbW90ZUFucyA9PiB7XHJcbiAgICAgIGlmIChyZW1vdGVBbnMpIHtcclxuICAgICAgICBjb25zdCBkb2NEZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgcGFnZVNpemU6ICdBNCcsXHJcbiAgICAgICAgICBjb250ZW50OiB0aGlzLmdldFBhZ2VzKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpLCBmb3JtLCBmYWxzZSwgcmVtb3RlQW5zKSxcclxuICAgICAgICAgIHN0eWxlczoge1xyXG4gICAgICAgICAgICBhbnN3ZXJzOiB7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmFubmVyOiB7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXHJcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBtYXJnaW46IFs1MCwgMTUsIDMwLCAwXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYW5uZXJJdGVtOiB7XHJcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMiwgMiwgMiwgMl1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmFubmVyTGFiZWw6IHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyMyZjRmNGYnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDoge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcclxuICAgICAgICAgICAgICBmb250U2l6ZTogOCxcclxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogWzYwLCAwLCAwLCAwXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4LFxyXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXHJcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCA1LCA1LCA1XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMmY0ZjRmJyxcclxuICAgICAgICAgICAgICBmb250U2l6ZTogNlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJsZUV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgNV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGFibGVIZWFkZXI6IHtcclxuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZjVmNWY1JyxcclxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXHJcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMzMzJyxcclxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcclxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRhYmxlU3ViaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnIzMzN2FiNycsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDoge1xyXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMmY0ZjRmJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGVmYXVsdFN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiA3XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2NEZWZpbml0aW9uJC5uZXh0KGRvY0RlZmluaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZG9jRGVmaW5pdGlvbiQ7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5UGRmKGZvcm0pIHtcclxuICAgIGNvbnN0IHBkZiA9IHBkZk1ha2U7XHJcbiAgICBsZXQgcGF0aWVudDtcclxuICAgIHBkZi52ZnMgPSBwZGZGb250cy5wZGZNYWtlLnZmcztcclxuXHJcbiAgICBpZiAoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXMpIHtcclxuICAgICAgcGF0aWVudCA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzWydwYXRpZW50SW5mbyddO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm0pLnN1YnNjcmliZShkb2NEZWZpbml0aW9uID0+IHtcclxuICAgICAgaWYgKCEoXy5pc0VtcHR5KGRvY0RlZmluaXRpb24pKSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGNvbnN0IGJhbm5lciA9IFtdO1xyXG5cclxuICAgICAgICAgIGlmIChwYXRpZW50Lm5hbWUpIHtcclxuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xyXG4gICAgICAgICAgICAgIHRleHQ6IFtcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWU6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3RoaXMudGl0bGVpemUocGF0aWVudC5uYW1lKX1gIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGllbnQubmlkKSB7XHJcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdJRDogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5uaWR9YCB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwYXRpZW50LmJpcnRoZGF0ZSkge1xyXG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGV4dDogW1xyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnRE9COiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHttb21lbnQocGF0aWVudC5iaXJ0aGRhdGUpLmZvcm1hdCgnbCcpfSAoJHtwYXRpZW50LmFnZX0geW8pYCB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwYXRpZW50Lm11aSkge1xyXG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGV4dDogW1xyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTVVJOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm11aX1gIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGllbnQubWhuKSB7XHJcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVFJIIE5vOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm1obn1gIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZG9jRGVmaW5pdGlvbi5oZWFkZXIgPSB7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnYmFubmVyJyxcclxuICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICBib2R5OiBbIGJhbm5lciBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2NEZWZpbml0aW9uLmZvb3RlciA9IChjdXJyZW50UGFnZSwgcGFnZUNvdW50KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gXHR7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnZm9vdGVyJyxcclxuICAgICAgICAgICAgd2lkdGhzOiBbJyonLCAnYXV0byddLFxyXG4gICAgICAgICAgICB0YWJsZToge1xyXG4gICAgICAgICAgICAgIGJvZHk6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdOb3RlOiBDb25maWRlbnRpYWxpdHkgaXMgb25lIG9mIHRoZSBjb3JlIGR1dGllcyBvZiBhbGwgbWVkaWNhbCBwcmFjdGl0aW9uZXJzLiAnXHJcbiAgICAgICAgICAgICAgICAgICAgICArICdQYXRpZW50c1xcJyBwZXJzb25hbCBoZWFsdGggaW5mb3JtYXRpb24gc2hvdWxkIGJlIGtlcHQgcHJpdmF0ZS4nLCBzdHlsZTogJ2NvbmZpZGVudGlhbCdcclxuICAgICAgICAgICAgICAgICAgfSwgJydcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogYEdlbmVyYXRlZCBvbiAke25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX1gLCBzdHlsZTogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtjdXJyZW50UGFnZS50b1N0cmluZygpfSBvZiAke3BhZ2VDb3VudH1gLCBzdHlsZTogJ3BhZ2VOdW1iZXInIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgcGRmLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKHt9LCB3aW4pO1xyXG4gICAgICB9XHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlzRGF0ZSh2YWw6IGFueSkge1xyXG4gICAgcmV0dXJuIG1vbWVudCh2YWwsIG1vbWVudC5JU09fODYwMSwgdHJ1ZSkuaXNWYWxpZCgpO1xyXG4gIH1cclxuXHJcbiAgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpO1xyXG4gIH1cclxuXHJcbiAgdGl0bGVpemUoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgcyA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==