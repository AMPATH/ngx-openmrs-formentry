/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                }
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
        sections.map(s => {
            if (this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        });
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
                        const result = Object.keys(node.children).map((key) => node.children[key]);
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
                _.forEach(answer, elem => {
                    arr.push(this.resolveValue(elem, form, true));
                });
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
                const result = Object.keys(answer).map((key) => [key, answer[key]]);
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
        combineLatest(remoteSelects).subscribe(remoteAns => {
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
        });
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
        this.generatePdfDefinition(form).subscribe(docDefinition => {
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
                docDefinition.footer = (currentPage, pageCount) => {
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
                };
                /** @type {?} */
                const win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }, (error) => {
            console.log('Error: ', error);
        });
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
        return str.replace(/\w\S*/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7TUFFOUMsTUFBTSxHQUFHLE9BQU87QUFNdEIsTUFBTTs7Ozs7O0lBWUosWUFDVSxzQkFBOEMsRUFDOUMsZUFBZ0MsRUFDaEMsV0FBd0I7UUFGeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWM0Isc0JBQWlCLEdBQVE7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNQyxDQUFDOzs7Ozs7OztJQUVKLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBVSxFQUFFLGlCQUEyQixF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TSxDQUFDLEdBQVE7UUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDbEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBRztRQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7OztZQTVaRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWpCUSxzQkFBc0I7WUFEdEIsZUFBZTtZQUVmLFdBQVc7Ozs7Ozs7O0lBbUJsQixxREFBcUM7O0lBQ3JDLDBDQUFzQjs7SUFDdEIsaURBQTRCOztJQUM1QiwrQ0FBMkI7O0lBQzNCLHNEQUtFOzs7OztJQUdBLDJEQUFzRDs7Ozs7SUFDdEQsb0RBQXdDOzs7OztJQUN4QyxnREFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UuanMnO1xuaW1wb3J0ICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cy5qcyc7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cyc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB7XG4gIHByaXZhdGUgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGVycm9yOiBib29sZWFuO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93TG9hZGVyOiBib29sZWFuO1xuICBwdWJsaWMgc3Vic2NyaWJlZEFuc3dlcnM6IGFueSA9IHtcbiAgICBxdWVzdGlvbnM6IHtcbiAgICAgIHN0YWNrOiBbXVxuICAgIH0sXG4gICAgYW5zd2VyczogW11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVuY291bnRlclZpZXdlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBvYnNWYWx1ZUFkYXB0ZXI6IE9ic1ZhbHVlQWRhcHRlcixcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlc1xuICApIHt9XG5cbiAgZ2V0UGFnZXMocGFnZXM6IGFueSwgZm9ybTogRm9ybSwgcmVtb3RlU2VsZWN0c09ubHk/OiBib29sZWFuLCByZW1vdGVBbnM/OiBhbnkpOiBhbnlbXSB7XG4gICAgY29uc3QgY29udGVudCA9IFtdO1xuICAgIGxldCByZW1vdGVRdWVzdGlvbnMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgaWYgKHJlbW90ZVNlbGVjdHNPbmx5KSB7XG4gICAgICAgIHJlbW90ZVF1ZXN0aW9ucyA9IHJlbW90ZVF1ZXN0aW9ucy5jb25jYXQodGhpcy5nZXRTZWN0aW9ucyhwYWdlLnBhZ2UsIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2YgZm9ybS5yb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICBpZiAocGFnZS5sYWJlbCA9PT0gZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldLnF1ZXN0aW9uLmxhYmVsICYmXG4gICAgICAgICAgICB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQoZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldKSkge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKHtcbiAgICAgICAgICAgICAgc3R5bGU6ICd0YWJsZUV4YW1wbGUnLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBrZWVwV2l0aEhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAgYm9keTogW1xuICAgICAgICAgICAgICAgICAgW3sgdGV4dDogcGFnZS5sYWJlbCwgc3R5bGU6ICd0YWJsZUhlYWRlcicgfV0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgdHJ1ZSwgcmVtb3RlQW5zKVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCAwXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICBoTGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAwLjUgOiAwLjU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2TGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS53aWR0aHMubGVuZ3RoKSA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/ICcjZGRkJyA6ICcjZGRkJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/ICcjZGRkJyA6ICcjZGRkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtb3RlU2VsZWN0c09ubHkgPyByZW1vdGVRdWVzdGlvbnMgOiBjb250ZW50O1xuICB9XG5cbiAgZ2V0U2VjdGlvbnMoc2VjdGlvbnM6IGFueSwgZm9ybTogRm9ybSwgcmVzb2x2ZTogYW55LCByZW1vdGVBbnM6IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgY29uc3QgYW5zd2VyZWRTZWN0aW9ucyA9IFtdO1xuICAgIGxldCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcblxuICAgIHNlY3Rpb25zLm1hcChzID0+IHtcbiAgICAgIGlmICh0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQocy5ub2RlKSkge1xuICAgICAgICBhbnN3ZXJlZFNlY3Rpb25zLnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgcXVlc3Rpb25zID0gcXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChyZXNvbHZlICYmIHJlbW90ZUFucykge1xuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgW3sgdGV4dDogc2VjdGlvbi5sYWJlbCwgc3R5bGU6ICd0YWJsZVN1YmhlYWRlcicgfV0sXG4gICAgICAgICAgICAgICAgWyB0aGlzLmdldFNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbiwgcmVtb3RlQW5zLCBmb3JtKSBdXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXG4gICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb25zO1xuICAgIH1cbiAgfVxuXG4gIGFwcGVuZFJlc29sdmVkQW5zd2VyKHJlc29sdmVkQW5zd2VyOiBhbnksIHF1ZXN0aW9uczogYW55LCBub2RlPzogYW55KSB7XG4gICAgaWYgKHJlc29sdmVkQW5zd2VyKSB7XG4gICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh7XG4gICAgICAgIHRleHQ6IFtcbiAgICAgICAgICBgJHsobm9kZSkgPyBub2RlLnF1ZXN0aW9uLmxhYmVsIDogJ1F1ZXN0aW9uIGxhYmVsJyB9JHtcbiAgICAgICAgICAgIChub2RlKSA/IChub2RlLnF1ZXN0aW9uLmxhYmVsLmluZGV4T2YoJzonKSA+IDEgPyAnJyA6ICc6JykgOiAnJ1xuICAgICAgICAgIH0gYCxcbiAgICAgICAgICB7IHRleHQ6IGAke3Jlc29sdmVkQW5zd2VyfWAsIGJvbGQ6IHRydWUgfVxuICAgICAgICBdLCBzdHlsZTogJ2Fuc3dlcnMnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBnZXQgcmVtb3RlIHNlbGVjdHMgb25seVxuICBnZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuICAgIHRoaXMuc3Vic2NyaWJlZEFuc3dlcnMucXVlc3Rpb25zLnN0YWNrID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICBpZiAodGhpcy5yZW1vdGVEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh0aGlzLnJlbW90ZURhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUobm9kZS5jb250cm9sLnZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvLyBtZXJnZSByZW1vdGUgc2VsZWN0c1xuICBnZXRTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnksIHJlbW90ZUFuczogYW55W10sIGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IHtcbiAgICAgIHN0YWNrOiBbXVxuICAgIH07XG5cbiAgICBsZXQgcmVzb2x2ZWRBbnN3ZXIgPSAnJztcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBzZWN0aW9uKSB7XG4gICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZmllbGQtc2V0JzpcbiAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBNZW1iZXJzID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhub2RlLmNoaWxkcmVuKS5tYXAoKGtleSkgPT4gbm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBncm91cE1lbWJlcnMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKGdyb3VwTWVtYmVyc1swXSwgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVtb3RlLXNlbGVjdCc6XG4gICAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICAgIGZvciAoY29uc3QgYW5zIG9mIHJlbW90ZUFucykge1xuICAgICAgICAgICAgaWYgKGFucy52YWx1ZSA9PT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwZW5kUmVzb2x2ZWRBbnN3ZXIoYW5zLmxhYmVsLCBxdWVzdGlvbnMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnN0IGFuc3dlciA9IG5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICByZXNvbHZlZEFuc3dlciA9IHRoaXMucmVzb2x2ZVZhbHVlKGFuc3dlciwgZm9ybSk7XG4gICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlciwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgcmVzb2x2ZVZhbHVlKGFuc3dlcjogYW55LCBmb3JtOiBGb3JtLCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBpZiAoYW5zd2VyICE9PSAnJykge1xuICAgICAgaWYgKHRoaXMuaXNVdWlkKGFuc3dlcikpIHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXIsIGZvcm0uc2NoZW1hKTtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGFuc3dlcikpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIF8uZm9yRWFjaChhbnN3ZXIsIGVsZW0gPT4ge1xuICAgICAgICAgIGFyci5wdXNoKHRoaXMucmVzb2x2ZVZhbHVlKGVsZW0sIGZvcm0sIHRydWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnIudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUoYW5zd2VyKSkge1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFuc3dlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKGFuc3dlcikubWFwKChrZXkpID0+IFtrZXksIGFuc3dlcltrZXldXSk7XG5cbiAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVBkZkRlZmluaXRpb24oZm9ybTogRm9ybSk6IGFueSB7XG4gICAgY29uc3QgZG9jRGVmaW5pdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30pO1xuICAgIGNvbnN0IHJlbW90ZVNlbGVjdHMgPSB0aGlzLmdldFBhZ2VzKCh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSksIGZvcm0sIHRydWUpO1xuXG4gICAgY29tYmluZUxhdGVzdChyZW1vdGVTZWxlY3RzKS5zdWJzY3JpYmUocmVtb3RlQW5zID0+IHtcbiAgICAgIGlmIChyZW1vdGVBbnMpIHtcbiAgICAgICAgY29uc3QgZG9jRGVmaW5pdGlvbiA9IHtcbiAgICAgICAgICBjb250ZW50OiB0aGlzLmdldFBhZ2VzKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpLCBmb3JtLCBmYWxzZSwgcmVtb3RlQW5zKSxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGFuc3dlcnM6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWRlbnRpYWw6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNjAsIDAsIDAsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCA1LCA1LCA1XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlRXhhbXBsZToge1xuICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVIZWFkZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnI2Y1ZjVmNScsXG4gICAgICAgICAgICAgIHdpZHRoOiBbJzEwMCUnXSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMzMzJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVTdWJoZWFkZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnIzMzN2FiNycsXG4gICAgICAgICAgICAgIHdpZHRoOiBbJzEwMCUnXSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCA1LCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZDllZGY3JyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzQ1LCAyMCwgMjAsIDIwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckxhYmVsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnI2E5YTlhOSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJJdGVtOiB7XG4gICAgICAgICAgICAgIG1hcmdpbjogWzIwLCAwLCAxMCwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHtcbiAgICAgICAgICAgICAgYWxpZ25tZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHtcbiAgICAgICAgICAgICAgYWxpZ25tZW50OiAncmlnaHQnLFxuICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCA1LCA1XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVmYXVsdFN0eWxlOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogN1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jRGVmaW5pdGlvbiQubmV4dChkb2NEZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkb2NEZWZpbml0aW9uJDtcbiAgfVxuXG4gIGRpc3BsYXlQZGYoZm9ybSkge1xuICAgIGNvbnN0IHBkZiA9IHBkZk1ha2U7XG4gICAgbGV0IHBhdGllbnQ7XG4gICAgcGRmLnZmcyA9IHBkZkZvbnRzLnBkZk1ha2UudmZzO1xuICAgIFxuICAgIGlmIChmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlcykge1xuICAgICAgcGF0aWVudCA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzWydwYXRpZW50SW5mbyddO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm0pLnN1YnNjcmliZShkb2NEZWZpbml0aW9uID0+IHtcbiAgICAgIGlmICghKF8uaXNFbXB0eShkb2NEZWZpbml0aW9uKSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRpZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGJhbm5lciA9IFtdO1xuXG4gICAgICAgICAgaWYgKHBhdGllbnQubmFtZSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmFtZTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3RoaXMudGl0bGVpemUocGF0aWVudC5uYW1lKX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5uaWQpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05JRDogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubmlkfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50Lm11aSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTVVJOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5tdWl9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQuYmlydGhkYXRlKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1lPQjogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBgJHttb21lbnQocGF0aWVudC5iaXJ0aGRhdGUpLmZvcm1hdCgnbCcpfSAoJHtwYXRpZW50LmFnZX0geW8pYCB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBkb2NEZWZpbml0aW9uLmhlYWRlciA9IHtcbiAgICAgICAgICAgIHN0eWxlOiAnYmFubmVyJyxcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIGJvZHk6IFsgYmFubmVyIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY0RlZmluaXRpb24uZm9vdGVyID0gKGN1cnJlbnRQYWdlLCBwYWdlQ291bnQpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonLCAnKicsICcqJ10sXG4gICAgICAgICAgICAgICAgc3RhY2s6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgYE5vdGU6IENvbmZpZGVudGlhbGl0eSBpcyBvbmUgb2YgdGhlIGNvcmUgZHV0aWVzIG9mIGFsbCBtZWRpY2FsIHByYWN0aXRpb25lcnMuIFBhdGllbnRzJyBwZXJzb25hbCBoZWFsdGggaW5mb3JtYXRpb24gc2hvdWxkIGJlIGtlcHQgcHJpdmF0ZS5gLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2NvbmZpZGVudGlhbCdcbiAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogY3VycmVudFBhZ2UudG9TdHJpbmcoKSArICcgb2YgJyArIHBhZ2VDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdwYWdlTnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgR2VuZXJhdGVkIG9uIGAgKyBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3RpbWVzdGFtcCdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJyk7XG4gICAgICAgIHBkZi5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikub3Blbih7fSwgd2luKTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgaXNEYXRlKHZhbDogYW55KSB7XG4gICAgcmV0dXJuIG1vbWVudCh2YWwsIG1vbWVudC5JU09fODYwMSwgdHJ1ZSkuaXNWYWxpZCgpO1xuICB9XG5cbiAgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA9PT0gMzYgJiYgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJiB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xKTtcbiAgfVxuXG4gIHRpdGxlaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBzID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuIl19