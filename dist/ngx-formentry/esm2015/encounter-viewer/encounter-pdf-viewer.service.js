/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const moment = moment_;
export class EncounterPdfViewerService {
    /**
     * @param {?} encounterViewerService
     * @param {?} obsValueAdapter
     * @param {?} dataSources
     */
    constructor(encounterViewerService, obsValueAdapter, dataSources) {
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
    getPages(pages, form, remoteSelectsOnly, remoteAns) {
        /** @type {?} */
        const content = [];
        /** @type {?} */
        let remoteQuestions = [];
        for (const page of pages) {
            if (remoteSelectsOnly) {
                remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
            }
            else {
                for (const question of form.rootNode.question.questions) {
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
        }
        return remoteSelectsOnly ? remoteQuestions : content;
    }
    /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    getSections(sections, form, resolve, remoteAns) {
        /** @type {?} */
        const content = [];
        /** @type {?} */
        const answeredSections = [];
        /** @type {?} */
        let questions = [];
        sections.map((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        }));
        for (const section of answeredSections) {
            questions = questions.concat(this.getRemoteSectionData(section.section));
        }
        if (resolve && remoteAns) {
            for (const section of answeredSections) {
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
            return content;
        }
        else {
            return questions;
        }
    }
    /**
     * @private
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    appendResolvedAnswer(resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    `${(node) ? node.question.label : 'Question label'}${(node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : ''} `,
                    { text: `${resolvedAnswer}`, bold: true }
                ], style: 'answers'
            });
        }
    }
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    getRemoteSectionData(section) {
        /** @type {?} */
        const questions = [];
        this.subscribedAnswers.questions.stack = [];
        for (const node of section) {
            if (node.question.renderingType === 'remote-select') {
                this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                if (node.control.value !== '') {
                    if (this.remoteDataSource) {
                        questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                    }
                }
            }
        }
        return questions;
    }
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    getSectionData(section, remoteAns, form) {
        /** @type {?} */
        const questions = {
            stack: []
        };
        /** @type {?} */
        let resolvedAnswer = '';
        for (const node of section) {
            switch (node.question.renderingType) {
                case 'group':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'field-set':
                    if (node.children) {
                        /** @type {?} */
                        const groupMembers = [];
                        /** @type {?} */
                        const result = Object.keys(node.children).map((/**
                         * @param {?} key
                         * @return {?}
                         */
                        (key) => node.children[key]));
                        if (result) {
                            groupMembers.push(result);
                            questions.stack.push(this.getSectionData(groupMembers[0], remoteAns, form));
                        }
                    }
                    break;
                case 'repeating':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'remote-select':
                    this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                    for (const ans of remoteAns) {
                        if (ans.value === node.control.value) {
                            this.appendResolvedAnswer(ans.label, questions, node);
                        }
                    }
                    break;
                default:
                    /** @type {?} */
                    const answer = node.control.value;
                    if (answer) {
                        resolvedAnswer = this.resolveValue(answer, form);
                        this.appendResolvedAnswer(resolvedAnswer, questions, node);
                    }
            }
        }
        return questions;
    }
    /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    resolveValue(answer, form, arrayElement) {
        if (answer !== '') {
            if (this.isUuid(answer)) {
                /** @type {?} */
                const val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
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
                const arr = [];
                _.forEach(answer, (/**
                 * @param {?} elem
                 * @return {?}
                 */
                elem => {
                    arr.push(this.resolveValue(elem, form, true));
                }));
                return arr.toString();
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
                const values = [];
                /** @type {?} */
                const result = Object.keys(answer).map((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => [key, answer[key]]));
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generatePdfDefinition(form) {
        /** @type {?} */
        const docDefinition$ = new BehaviorSubject({});
        /** @type {?} */
        const remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);
        combineLatest(remoteSelects).subscribe((/**
         * @param {?} remoteAns
         * @return {?}
         */
        remoteAns => {
            if (remoteAns) {
                /** @type {?} */
                const docDefinition = {
                    pageSize: 'A4',
                    content: this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
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
    }
    /**
     * @param {?} form
     * @return {?}
     */
    displayPdf(form) {
        /** @type {?} */
        const pdf = pdfMake;
        /** @type {?} */
        let patient;
        pdf.vfs = pdfFonts.pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe((/**
         * @param {?} docDefinition
         * @return {?}
         */
        docDefinition => {
            if (!(_.isEmpty(docDefinition))) {
                if (typeof patient !== 'undefined') {
                    /** @type {?} */
                    const banner = [];
                    if (patient.name) {
                        banner.push({
                            text: [
                                { text: 'Name: ', style: 'bannerLabel' },
                                { text: `${this.titleize(patient.name)}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.nid) {
                        banner.push({
                            text: [
                                { text: 'ID: ', style: 'bannerLabel' },
                                { text: `${patient.nid}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'DOB: ', style: 'bannerLabel' },
                                { text: `${moment(patient.birthdate).format('l')} (${patient.age} yo)` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mui) {
                        banner.push({
                            text: [
                                { text: 'MUI: ', style: 'bannerLabel' },
                                { text: `${patient.mui}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mhn) {
                        banner.push({
                            text: [
                                { text: 'MTRH No: ', style: 'bannerLabel' },
                                { text: `${patient.mhn}` }
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
                (currentPage, pageCount) => {
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
                                    { text: `Generated on ${new Date().toUTCString()}`, style: 'timestamp' },
                                    { text: `${currentPage.toString()} of ${pageCount}`, style: 'pageNumber' }
                                ],
                            ]
                        },
                        layout: 'noBorders'
                    };
                });
                /** @type {?} */
                const win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.log('Error: ', error);
        }));
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isDate(val) {
        return moment(val, moment.ISO_8601, true).isValid();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUuid(value) {
        return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    titleize(str) {
        return str.replace(/\w\S*/g, (/**
         * @param {?} s
         * @return {?}
         */
        s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()));
    }
}
EncounterPdfViewerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
EncounterPdfViewerService.ctorParameters = () => [
    { type: EncounterViewerService },
    { type: ObsValueAdapter },
    { type: DataSources }
];
/** @nocollapse */ EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7TUFFOUMsTUFBTSxHQUFHLE9BQU87QUFNdEIsTUFBTTs7Ozs7O0lBWUosWUFDVSxzQkFBOEMsRUFDOUMsZUFBZ0MsRUFDaEMsV0FBd0I7UUFGeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWM0Isc0JBQWlCLEdBQVE7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNQyxDQUFDOzs7Ozs7OztJQUVKLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBVSxFQUFFLGlCQUEyQixFQUFFLFNBQWU7O2NBQ3JFLE9BQU8sR0FBRyxFQUFFOztZQUNkLGVBQWUsR0FBRyxFQUFFO1FBRXhCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixHQUFHLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSzt3QkFDcEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEYsT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDWCxLQUFLLEVBQUUsY0FBYzs0QkFDckIsS0FBSyxFQUFFO2dDQUNMLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztnQ0FDYixVQUFVLEVBQUUsQ0FBQztnQ0FDYixrQkFBa0IsRUFBRSxDQUFDO2dDQUNyQixJQUFJLEVBQUU7b0NBQ0osQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztvQ0FDNUM7d0NBQ0U7NENBQ0UsS0FBSyxFQUFFLGNBQWM7NENBQ3JCLEtBQUssRUFBRTtnREFDTCxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0RBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQzs2Q0FDekQ7NENBQ0QsTUFBTSxFQUFFLFdBQVc7NENBQ25CLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5Q0FDckI7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7NEJBQ0QsTUFBTSxFQUFFO2dDQUNOLFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDL0QsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDakUsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQ0FDckUsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElB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QUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUMzRixDQUFDOzs7WUEzYUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFqQlEsc0JBQXNCO1lBRHRCLGVBQWU7WUFFZixXQUFXOzs7Ozs7OztJQW1CbEIscURBQXFDOztJQUNyQywwQ0FBc0I7O0lBQ3RCLGlEQUE0Qjs7SUFDNUIsK0NBQTJCOztJQUMzQixzREFLRTs7Ozs7SUFHQSwyREFBc0Q7Ozs7O0lBQ3RELG9EQUF3Qzs7Ozs7SUFDeEMsZ0RBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xyXG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcclxuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UuanMnO1xyXG5pbXBvcnQgJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzLmpzJztcclxuaW1wb3J0ICogYXMgcGRmRm9udHMgZnJvbSAncGRmbWFrZS9idWlsZC92ZnNfZm9udHMnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgcHVibGljIGVycm9yOiBib29sZWFuO1xyXG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBwdWJsaWMgc2hvd0xvYWRlcjogYm9vbGVhbjtcclxuICBwdWJsaWMgc3Vic2NyaWJlZEFuc3dlcnM6IGFueSA9IHtcclxuICAgIHF1ZXN0aW9uczoge1xyXG4gICAgICBzdGFjazogW11cclxuICAgIH0sXHJcbiAgICBhbnN3ZXJzOiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBvYnNWYWx1ZUFkYXB0ZXI6IE9ic1ZhbHVlQWRhcHRlcixcclxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzXHJcbiAgKSB7fVxyXG5cclxuICBnZXRQYWdlcyhwYWdlczogYW55LCBmb3JtOiBGb3JtLCByZW1vdGVTZWxlY3RzT25seT86IGJvb2xlYW4sIHJlbW90ZUFucz86IGFueSk6IGFueVtdIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcclxuICAgIGxldCByZW1vdGVRdWVzdGlvbnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcclxuICAgICAgaWYgKHJlbW90ZVNlbGVjdHNPbmx5KSB7XHJcbiAgICAgICAgcmVtb3RlUXVlc3Rpb25zID0gcmVtb3RlUXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2YgZm9ybS5yb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMpIHtcclxuICAgICAgICAgIGlmIChwYWdlLmxhYmVsID09PSBmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0ucXVlc3Rpb24ubGFiZWwgJiZcclxuICAgICAgICAgICAgdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKGZvcm0ucm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XSkpIHtcclxuICAgICAgICAgICAgY29udGVudC5wdXNoKHtcclxuICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXHJcbiAgICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxyXG4gICAgICAgICAgICAgICAga2VlcFdpdGhIZWFkZXJSb3dzOiAxLFxyXG4gICAgICAgICAgICAgICAgYm9keTogW1xyXG4gICAgICAgICAgICAgICAgICBbeyB0ZXh0OiBwYWdlLmxhYmVsLCBzdHlsZTogJ3RhYmxlSGVhZGVyJyB9XSxcclxuICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCB0cnVlLCByZW1vdGVBbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gMC41IDogMC41O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUud2lkdGhzLmxlbmd0aCkgPyAwLjUgOiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaExpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdkxpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZW1vdGVTZWxlY3RzT25seSA/IHJlbW90ZVF1ZXN0aW9ucyA6IGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRTZWN0aW9ucyhzZWN0aW9uczogYW55LCBmb3JtOiBGb3JtLCByZXNvbHZlOiBhbnksIHJlbW90ZUFuczogYW55KTogYW55W10ge1xyXG4gICAgY29uc3QgY29udGVudCA9IFtdO1xyXG4gICAgY29uc3QgYW5zd2VyZWRTZWN0aW9ucyA9IFtdO1xyXG4gICAgbGV0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xyXG5cclxuICAgIHNlY3Rpb25zLm1hcChzID0+IHtcclxuICAgICAgaWYgKHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChzLm5vZGUpKSB7XHJcbiAgICAgICAgYW5zd2VyZWRTZWN0aW9ucy5wdXNoKHMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xyXG4gICAgICBxdWVzdGlvbnMgPSBxdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc29sdmUgJiYgcmVtb3RlQW5zKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XHJcbiAgICAgICAgY29udGVudC5wdXNoKFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxyXG4gICAgICAgICAgICAgIGJvZHk6IFtcclxuICAgICAgICAgICAgICAgIFt7IHRleHQ6IHNlY3Rpb24ubGFiZWwsIHN0eWxlOiAndGFibGVTdWJoZWFkZXInIH1dLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmdldFNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbiwgcmVtb3RlQW5zLCBmb3JtKSBdXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcXVlc3Rpb25zO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlcjogYW55LCBxdWVzdGlvbnM6IGFueSwgbm9kZT86IGFueSkge1xyXG4gICAgaWYgKHJlc29sdmVkQW5zd2VyKSB7XHJcbiAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHtcclxuICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICBgJHsobm9kZSkgPyBub2RlLnF1ZXN0aW9uLmxhYmVsIDogJ1F1ZXN0aW9uIGxhYmVsJyB9JHtcclxuICAgICAgICAgICAgKG5vZGUpID8gKG5vZGUucXVlc3Rpb24ubGFiZWwuaW5kZXhPZignOicpID4gMSA/ICcnIDogJzonKSA6ICcnXHJcbiAgICAgICAgICB9IGAsXHJcbiAgICAgICAgICB7IHRleHQ6IGAke3Jlc29sdmVkQW5zd2VyfWAsIGJvbGQ6IHRydWUgfVxyXG4gICAgICAgIF0sIHN0eWxlOiAnYW5zd2VycydcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBnZXQgcmVtb3RlIHNlbGVjdHMgb25seVxyXG4gIGdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcclxuICAgIHRoaXMuc3Vic2NyaWJlZEFuc3dlcnMucXVlc3Rpb25zLnN0YWNrID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcclxuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xyXG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5yZW1vdGVEYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHRoaXMucmVtb3RlRGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShub2RlLmNvbnRyb2wudmFsdWUpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBxdWVzdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvLyBtZXJnZSByZW1vdGUgc2VsZWN0c1xyXG4gIGdldFNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSwgcmVtb3RlQW5zOiBhbnlbXSwgZm9ybTogRm9ybSk6IGFueSB7XHJcbiAgICBjb25zdCBxdWVzdGlvbnMgPSB7XHJcbiAgICAgIHN0YWNrOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzb2x2ZWRBbnN3ZXIgPSAnJztcclxuXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xyXG4gICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2dyb3VwJzpcclxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdmaWVsZC1zZXQnOlxyXG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBNZW1iZXJzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKG5vZGUuY2hpbGRyZW4pLm1hcCgoa2V5KSA9PiBub2RlLmNoaWxkcmVuW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgIGdyb3VwTWVtYmVycy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShncm91cE1lbWJlcnNbMF0sIHJlbW90ZUFucywgZm9ybSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcclxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdyZW1vdGUtc2VsZWN0JzpcclxuICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcclxuICAgICAgICAgIGZvciAoY29uc3QgYW5zIG9mIHJlbW90ZUFucykge1xyXG4gICAgICAgICAgICBpZiAoYW5zLnZhbHVlID09PSBub2RlLmNvbnRyb2wudmFsdWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKGFucy5sYWJlbCwgcXVlc3Rpb25zLCBub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSBub2RlLmNvbnRyb2wudmFsdWU7XHJcbiAgICAgICAgICBpZiAoYW5zd2VyKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmVkQW5zd2VyID0gdGhpcy5yZXNvbHZlVmFsdWUoYW5zd2VyLCBmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlciwgcXVlc3Rpb25zLCBub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBxdWVzdGlvbnM7XHJcbiAgfVxyXG5cclxuICByZXNvbHZlVmFsdWUoYW5zd2VyOiBhbnksIGZvcm06IEZvcm0sIGFycmF5RWxlbWVudD86IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgaWYgKGFuc3dlciAhPT0gJycpIHtcclxuICAgICAgaWYgKHRoaXMuaXNVdWlkKGFuc3dlcikpIHtcclxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlciwgZm9ybS5zY2hlbWEpO1xyXG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbnN3ZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShhbnN3ZXIpKSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gW107XHJcbiAgICAgICAgXy5mb3JFYWNoKGFuc3dlciwgZWxlbSA9PiB7XHJcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLnJlc29sdmVWYWx1ZShlbGVtLCBmb3JtLCB0cnVlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFyci50b1N0cmluZygpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKGFuc3dlcikpIHtcclxuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbnN3ZXIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMoYW5zd2VyKS5tYXAoKGtleSkgPT4gW2tleSwgYW5zd2VyW2tleV1dKTtcclxuXHJcbiAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgcmV0dXJuIGFuc3dlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm06IEZvcm0pOiBhbnkge1xyXG4gICAgY29uc3QgZG9jRGVmaW5pdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30pO1xyXG4gICAgY29uc3QgcmVtb3RlU2VsZWN0cyA9IHRoaXMuZ2V0UGFnZXMoKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpKSwgZm9ybSwgdHJ1ZSk7XHJcblxyXG4gICAgY29tYmluZUxhdGVzdChyZW1vdGVTZWxlY3RzKS5zdWJzY3JpYmUocmVtb3RlQW5zID0+IHtcclxuICAgICAgaWYgKHJlbW90ZUFucykge1xyXG4gICAgICAgIGNvbnN0IGRvY0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICBwYWdlU2l6ZTogJ0E0JyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuZ2V0UGFnZXModGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSksIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpLFxyXG4gICAgICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgICAgIGFuc3dlcnM6IHtcclxuICAgICAgICAgICAgICBmb250U2l6ZTogOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYW5uZXI6IHtcclxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcclxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUwLCAxNSwgMzAsIDBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJhbm5lckl0ZW06IHtcclxuICAgICAgICAgICAgICBtYXJnaW46IFsyLCAyLCAyLCAyXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYW5uZXJMYWJlbDoge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzJmNGY0ZidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29uZmlkZW50aWFsOiB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4LFxyXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNjAsIDAsIDAsIDBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgIGFsaWdubWVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IDgsXHJcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcclxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDUsIDUsIDVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHtcclxuICAgICAgICAgICAgICBjb2xvcjogJyMyZjRmNGYnLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRhYmxlRXhhbXBsZToge1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcclxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCA1XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJsZUhlYWRlcjoge1xyXG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyNmNWY1ZjUnLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBbJzEwMCUnXSxcclxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMzMzMnLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxyXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGFibGVTdWJoZWFkZXI6IHtcclxuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMzM3YWI3JyxcclxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXHJcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiB7XHJcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBjb2xvcjogJyMyZjRmNGYnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkZWZhdWx0U3R5bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6IDdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY0RlZmluaXRpb24kLm5leHQoZG9jRGVmaW5pdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkb2NEZWZpbml0aW9uJDtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlQZGYoZm9ybSkge1xyXG4gICAgY29uc3QgcGRmID0gcGRmTWFrZTtcclxuICAgIGxldCBwYXRpZW50O1xyXG4gICAgcGRmLnZmcyA9IHBkZkZvbnRzLnBkZk1ha2UudmZzO1xyXG5cclxuICAgIGlmIChmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlcykge1xyXG4gICAgICBwYXRpZW50ID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXNbJ3BhdGllbnRJbmZvJ107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVBkZkRlZmluaXRpb24oZm9ybSkuc3Vic2NyaWJlKGRvY0RlZmluaXRpb24gPT4ge1xyXG4gICAgICBpZiAoIShfLmlzRW1wdHkoZG9jRGVmaW5pdGlvbikpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRpZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgY29uc3QgYmFubmVyID0gW107XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGllbnQubmFtZSkge1xyXG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGV4dDogW1xyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmFtZTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7dGhpcy50aXRsZWl6ZShwYXRpZW50Lm5hbWUpfWAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocGF0aWVudC5uaWQpIHtcclxuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xyXG4gICAgICAgICAgICAgIHRleHQ6IFtcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0lEOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm5pZH1gIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGllbnQuYmlydGhkYXRlKSB7XHJcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdET0I6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke21vbWVudChwYXRpZW50LmJpcnRoZGF0ZSkuZm9ybWF0KCdsJyl9ICgke3BhdGllbnQuYWdlfSB5bylgIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGllbnQubXVpKSB7XHJcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVUk6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubXVpfWAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocGF0aWVudC5taG4pIHtcclxuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xyXG4gICAgICAgICAgICAgIHRleHQ6IFtcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ01UUkggTm86ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubWhufWAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkb2NEZWZpbml0aW9uLmhlYWRlciA9IHtcclxuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXInLFxyXG4gICAgICAgICAgICB0YWJsZToge1xyXG4gICAgICAgICAgICAgIGJvZHk6IFsgYmFubmVyIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY0RlZmluaXRpb24uZm9vdGVyID0gKGN1cnJlbnRQYWdlLCBwYWdlQ291bnQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBcdHtcclxuICAgICAgICAgICAgc3R5bGU6ICdmb290ZXInLFxyXG4gICAgICAgICAgICB3aWR0aHM6IFsnKicsICdhdXRvJ10sXHJcbiAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgYm9keTogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05vdGU6IENvbmZpZGVudGlhbGl0eSBpcyBvbmUgb2YgdGhlIGNvcmUgZHV0aWVzIG9mIGFsbCBtZWRpY2FsIHByYWN0aXRpb25lcnMuICdcclxuICAgICAgICAgICAgICAgICAgICAgICsgJ1BhdGllbnRzXFwnIHBlcnNvbmFsIGhlYWx0aCBpbmZvcm1hdGlvbiBzaG91bGQgYmUga2VwdCBwcml2YXRlLicsIHN0eWxlOiAnY29uZmlkZW50aWFsJ1xyXG4gICAgICAgICAgICAgICAgICB9LCAnJ1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBgR2VuZXJhdGVkIG9uICR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfWAsIHN0eWxlOiAndGltZXN0YW1wJyB9LFxyXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IGAke2N1cnJlbnRQYWdlLnRvU3RyaW5nKCl9IG9mICR7cGFnZUNvdW50fWAsIHN0eWxlOiAncGFnZU51bWJlcicgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnKTtcclxuICAgICAgICBwZGYuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oe30sIHdpbik7XHJcbiAgICAgIH1cclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNEYXRlKHZhbDogYW55KSB7XHJcbiAgICByZXR1cm4gbW9tZW50KHZhbCwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICBpc1V1aWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSk7XHJcbiAgfVxyXG5cclxuICB0aXRsZWl6ZShzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBzID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKTtcclxuICB9XHJcbn1cclxuIl19