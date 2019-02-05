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
                    resolvedAnswer = this.resolveValue(answer, form);
                    this.appendResolvedAnswer(resolvedAnswer, questions, node);
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
                    content: this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
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
                                { text: 'NID: ', style: 'bannerLabel' },
                                { text: `${patient.nid}` }
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
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'YOB: ', style: 'bannerLabel' },
                                { text: `${moment(patient.birthdate).format('l')} (${patient.age} yo)` }
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
                        columns: [
                            {
                                widths: ['*', '*', '*'],
                                stack: [
                                    {
                                        text: 
                                        // tslint:disable-next-line:max-line-length
                                        `Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.`,
                                        style: 'confidential'
                                    }, {
                                        text: currentPage.toString() + ' of ' + pageCount,
                                        style: 'pageNumber'
                                    }, {
                                        text: `Generated on ` + new Date(),
                                        style: 'timestamp'
                                    }
                                ]
                            }
                        ]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7TUFFOUMsTUFBTSxHQUFHLE9BQU87QUFNdEIsTUFBTTs7Ozs7O0lBWUosWUFDVSxzQkFBOEMsRUFDOUMsZUFBZ0MsRUFDaEMsV0FBd0I7UUFGeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWM0Isc0JBQWlCLEdBQVE7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNQyxDQUFDOzs7Ozs7OztJQUVKLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBVSxFQUFFLGlCQUEyQixFQUFFLFNBQWU7O2NBQ3JFLE9BQU8sR0FBRyxFQUFFOztZQUNkLGVBQWUsR0FBRyxFQUFFO1FBRXhCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixHQUFHLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSzt3QkFDcEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEYsT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDWCxLQUFLLEVBQUUsY0FBYzs0QkFDckIsS0FBSyxFQUFFO2dDQUNMLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztnQ0FDYixVQUFVLEVBQUUsQ0FBQztnQ0FDYixrQkFBa0IsRUFBRSxDQUFDO2dDQUNyQixJQUFJLEVBQUU7b0NBQ0osQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztvQ0FDNUM7d0NBQ0U7NENBQ0UsS0FBSyxFQUFFLGNBQWM7NENBQ3JCLEtBQUssRUFBRTtnREFDTCxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0RBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQzs2Q0FDekQ7NENBQ0QsTUFBTSxFQUFFLFdBQVc7NENBQ25CLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5Q0FDckI7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7NEJBQ0QsTUFBTSxFQUFFO2dDQUNOLFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDL0QsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FDakUsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQ0FDckUsQ0FBQyxDQUFBO2dDQUNELFVBQVU7Ozs7O2dDQUFFLFVBQVMsQ0FBQyxFQUFFLElBQUk7b0NBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElB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LENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBUTtRQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEQsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsS0FBYTtRQUNsQixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxHQUFHO1FBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUTs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDM0YsQ0FBQzs7O1lBNVpGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBakJRLHNCQUFzQjtZQUR0QixlQUFlO1lBRWYsV0FBVzs7Ozs7Ozs7SUFtQmxCLHFEQUFxQzs7SUFDckMsMENBQXNCOztJQUN0QixpREFBNEI7O0lBQzVCLCtDQUEyQjs7SUFDM0Isc0RBS0U7Ozs7O0lBR0EsMkRBQXNEOzs7OztJQUN0RCxvREFBd0M7Ozs7O0lBQ3hDLGdEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gJ3BkZm1ha2UvYnVpbGQvcGRmbWFrZS5qcyc7XG5pbXBvcnQgJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzLmpzJztcbmltcG9ydCAqIGFzIHBkZkZvbnRzIGZyb20gJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgZXJyb3I6IGJvb2xlYW47XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHNob3dMb2FkZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBzdWJzY3JpYmVkQW5zd2VyczogYW55ID0ge1xuICAgIHF1ZXN0aW9uczoge1xuICAgICAgc3RhY2s6IFtdXG4gICAgfSxcbiAgICBhbnN3ZXJzOiBbXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIG9ic1ZhbHVlQWRhcHRlcjogT2JzVmFsdWVBZGFwdGVyLFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzXG4gICkge31cblxuICBnZXRQYWdlcyhwYWdlczogYW55LCBmb3JtOiBGb3JtLCByZW1vdGVTZWxlY3RzT25seT86IGJvb2xlYW4sIHJlbW90ZUFucz86IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgbGV0IHJlbW90ZVF1ZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBpZiAocmVtb3RlU2VsZWN0c09ubHkpIHtcbiAgICAgICAgcmVtb3RlUXVlc3Rpb25zID0gcmVtb3RlUXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbiBvZiBmb3JtLnJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgIGlmIChwYWdlLmxhYmVsID09PSBmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0ucXVlc3Rpb24ubGFiZWwgJiZcbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goe1xuICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGtlZXBXaXRoSGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICBbeyB0ZXh0OiBwYWdlLmxhYmVsLCBzdHlsZTogJ3RhYmxlSGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCB0cnVlLCByZW1vdGVBbnMpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLndpZHRocy5sZW5ndGgpID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaExpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1vdGVTZWxlY3RzT25seSA/IHJlbW90ZVF1ZXN0aW9ucyA6IGNvbnRlbnQ7XG4gIH1cblxuICBnZXRTZWN0aW9ucyhzZWN0aW9uczogYW55LCBmb3JtOiBGb3JtLCByZXNvbHZlOiBhbnksIHJlbW90ZUFuczogYW55KTogYW55W10ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcbiAgICBjb25zdCBhbnN3ZXJlZFNlY3Rpb25zID0gW107XG4gICAgbGV0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuXG4gICAgc2VjdGlvbnMubWFwKHMgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChzLm5vZGUpKSB7XG4gICAgICAgIGFuc3dlcmVkU2VjdGlvbnMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XG4gICAgICBxdWVzdGlvbnMgPSBxdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc29sdmUgJiYgcmVtb3RlQW5zKSB7XG4gICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgICBjb250ZW50LnB1c2goW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICBbeyB0ZXh0OiBzZWN0aW9uLmxhYmVsLCBzdHlsZTogJ3RhYmxlU3ViaGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICBbIHRoaXMuZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uLCByZW1vdGVBbnMsIGZvcm0pIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXI6IGFueSwgcXVlc3Rpb25zOiBhbnksIG5vZGU/OiBhbnkpIHtcbiAgICBpZiAocmVzb2x2ZWRBbnN3ZXIpIHtcbiAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHtcbiAgICAgICAgdGV4dDogW1xuICAgICAgICAgIGAkeyhub2RlKSA/IG5vZGUucXVlc3Rpb24ubGFiZWwgOiAnUXVlc3Rpb24gbGFiZWwnIH0ke1xuICAgICAgICAgICAgKG5vZGUpID8gKG5vZGUucXVlc3Rpb24ubGFiZWwuaW5kZXhPZignOicpID4gMSA/ICcnIDogJzonKSA6ICcnXG4gICAgICAgICAgfSBgLFxuICAgICAgICAgIHsgdGV4dDogYCR7cmVzb2x2ZWRBbnN3ZXJ9YCwgYm9sZDogdHJ1ZSB9XG4gICAgICAgIF0sIHN0eWxlOiAnYW5zd2VycydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCByZW1vdGUgc2VsZWN0cyBvbmx5XG4gIGdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSk6IGFueSB7XG4gICAgY29uc3QgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgdGhpcy5zdWJzY3JpYmVkQW5zd2Vycy5xdWVzdGlvbnMuc3RhY2sgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBzZWN0aW9uKSB7XG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVtb3RlLXNlbGVjdCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgIGlmICh0aGlzLnJlbW90ZURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHRoaXMucmVtb3RlRGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShub2RlLmNvbnRyb2wudmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIC8vIG1lcmdlIHJlbW90ZSBzZWxlY3RzXG4gIGdldFNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSwgcmVtb3RlQW5zOiBhbnlbXSwgZm9ybTogRm9ybSk6IGFueSB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0ge1xuICAgICAgc3RhY2s6IFtdXG4gICAgfTtcblxuICAgIGxldCByZXNvbHZlZEFuc3dlciA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcbiAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEobm9kZS5ncm91cE1lbWJlcnMsIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmaWVsZC1zZXQnOlxuICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cE1lbWJlcnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKG5vZGUuY2hpbGRyZW4pLm1hcCgoa2V5KSA9PiBub2RlLmNoaWxkcmVuW2tleV0pO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGdyb3VwTWVtYmVycy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEoZ3JvdXBNZW1iZXJzWzBdLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEobm9kZS5ncm91cE1lbWJlcnMsIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZW1vdGUtc2VsZWN0JzpcbiAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgICAgZm9yIChjb25zdCBhbnMgb2YgcmVtb3RlQW5zKSB7XG4gICAgICAgICAgICBpZiAoYW5zLnZhbHVlID09PSBub2RlLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihhbnMubGFiZWwsIHF1ZXN0aW9ucywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc3QgYW5zd2VyID0gbm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgIHJlc29sdmVkQW5zd2VyID0gdGhpcy5yZXNvbHZlVmFsdWUoYW5zd2VyLCBmb3JtKTtcbiAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKHJlc29sdmVkQW5zd2VyLCBxdWVzdGlvbnMsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICByZXNvbHZlVmFsdWUoYW5zd2VyOiBhbnksIGZvcm06IEZvcm0sIGFycmF5RWxlbWVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGlmIChhbnN3ZXIgIT09ICcnKSB7XG4gICAgICBpZiAodGhpcy5pc1V1aWQoYW5zd2VyKSkge1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlciwgZm9ybS5zY2hlbWEpO1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoYW5zd2VyKSkge1xuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgXy5mb3JFYWNoKGFuc3dlciwgZWxlbSA9PiB7XG4gICAgICAgICAgYXJyLnB1c2godGhpcy5yZXNvbHZlVmFsdWUoZWxlbSwgZm9ybSwgdHJ1ZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFyci50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZShhbnN3ZXIpKSB7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYW5zd2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMoYW5zd2VyKS5tYXAoKGtleSkgPT4gW2tleSwgYW5zd2VyW2tleV1dKTtcblxuICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlUGRmRGVmaW5pdGlvbihmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBkb2NEZWZpbml0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih7fSk7XG4gICAgY29uc3QgcmVtb3RlU2VsZWN0cyA9IHRoaXMuZ2V0UGFnZXMoKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpKSwgZm9ybSwgdHJ1ZSk7XG5cbiAgICBjb21iaW5lTGF0ZXN0KHJlbW90ZVNlbGVjdHMpLnN1YnNjcmliZShyZW1vdGVBbnMgPT4ge1xuICAgICAgaWYgKHJlbW90ZUFucykge1xuICAgICAgICBjb25zdCBkb2NEZWZpbml0aW9uID0ge1xuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuZ2V0UGFnZXModGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSksIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYW5zd2Vyczoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs2MCwgMCwgMCwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDUsIDUsIDVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVFeGFtcGxlOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZjVmNWY1JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMzMzMnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZVN1YmhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyNkOWVkZjcnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNDUsIDIwLCAyMCwgMjBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyTGFiZWw6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjYTlhOWE5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckl0ZW06IHtcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMjAsIDAsIDEwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBib2xkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnZU51bWJlcjoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdyaWdodCcsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDUsIDVdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiA3XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2NEZWZpbml0aW9uJC5uZXh0KGRvY0RlZmluaXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRvY0RlZmluaXRpb24kO1xuICB9XG5cbiAgZGlzcGxheVBkZihmb3JtKSB7XG4gICAgY29uc3QgcGRmID0gcGRmTWFrZTtcbiAgICBsZXQgcGF0aWVudDtcbiAgICBwZGYudmZzID0gcGRmRm9udHMucGRmTWFrZS52ZnM7XG4gICAgXG4gICAgaWYgKGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzKSB7XG4gICAgICBwYXRpZW50ID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXNbJ3BhdGllbnRJbmZvJ107XG4gICAgfVxuXG4gICAgdGhpcy5nZW5lcmF0ZVBkZkRlZmluaXRpb24oZm9ybSkuc3Vic2NyaWJlKGRvY0RlZmluaXRpb24gPT4ge1xuICAgICAgaWYgKCEoXy5pc0VtcHR5KGRvY0RlZmluaXRpb24pKSkge1xuICAgICAgICBpZiAodHlwZW9mIHBhdGllbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgYmFubmVyID0gW107XG5cbiAgICAgICAgICBpZiAocGF0aWVudC5uYW1lKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdOYW1lOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7dGhpcy50aXRsZWl6ZShwYXRpZW50Lm5hbWUpfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50Lm5pZCkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTklEOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5uaWR9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQubXVpKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVUk6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm11aX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5iaXJ0aGRhdGUpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnWU9COiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IGAke21vbWVudChwYXRpZW50LmJpcnRoZGF0ZSkuZm9ybWF0KCdsJyl9ICgke3BhdGllbnQuYWdlfSB5bylgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGRvY0RlZmluaXRpb24uaGVhZGVyID0ge1xuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXInLFxuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgYm9keTogWyBiYW5uZXIgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jRGVmaW5pdGlvbi5mb290ZXIgPSAoY3VycmVudFBhZ2UsIHBhZ2VDb3VudCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKicsICcqJywgJyonXSxcbiAgICAgICAgICAgICAgICBzdGFjazogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICBgTm90ZTogQ29uZmlkZW50aWFsaXR5IGlzIG9uZSBvZiB0aGUgY29yZSBkdXRpZXMgb2YgYWxsIG1lZGljYWwgcHJhY3RpdGlvbmVycy4gUGF0aWVudHMnIHBlcnNvbmFsIGhlYWx0aCBpbmZvcm1hdGlvbiBzaG91bGQgYmUga2VwdCBwcml2YXRlLmAsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY29uZmlkZW50aWFsJ1xuICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjdXJyZW50UGFnZS50b1N0cmluZygpICsgJyBvZiAnICsgcGFnZUNvdW50LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3BhZ2VOdW1iZXInXG4gICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGBHZW5lcmF0ZWQgb24gYCArIG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGltZXN0YW1wJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnKTtcbiAgICAgICAgcGRmLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKHt9LCB3aW4pO1xuICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICByZXR1cm4gbW9tZW50KHZhbCwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpO1xuICB9XG5cbiAgdGl0bGVpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIHMgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG59XG4iXX0=