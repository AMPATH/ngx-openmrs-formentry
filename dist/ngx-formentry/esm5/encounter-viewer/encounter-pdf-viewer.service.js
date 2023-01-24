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
import * as i0 from "@angular/core";
import * as i1 from "./encounter-viewer.service";
import * as i2 from "../form-entry/value-adapters/obs.adapter";
import * as i3 from "../form-entry/data-sources/data-sources";
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
    EncounterPdfViewerService.prototype.getPages = function (pages, form, remoteSelectsOnly, remoteAns) {
        var content = [];
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
                            if (page.label ===
                                form.rootNode.children[question.key].question.label &&
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
                                            return i === 0 || i === node.table.body.length ? 0.5 : 0.5;
                                        },
                                        vLineWidth: function (i, node) {
                                            return i === 0 || i === node.table.widths.length ? 0.5 : 0.5;
                                        },
                                        hLineColor: function (i, node) {
                                            return i === 0 || i === node.table.body.length
                                                ? '#ddd'
                                                : '#ddd';
                                        },
                                        vLineColor: function (i, node) {
                                            return i === 0 || i === node.table.body.length
                                                ? '#ddd'
                                                : '#ddd';
                                        }
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
    EncounterPdfViewerService.prototype.getSections = function (sections, form, resolve, remoteAns) {
        var _this = this;
        var content = [];
        var answeredSections = [];
        var questions = [];
        sections.map(function (s) {
            if (_this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        });
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
    EncounterPdfViewerService.prototype.appendResolvedAnswer = function (resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    "" + (node ? node.question.label : 'Question label') + (node ? (node.question.label.indexOf(':') > 1 ? '' : ':') : '') + " ",
                    { text: "" + resolvedAnswer, bold: true }
                ],
                style: 'answers'
            });
        }
    };
    // get remote selects only
    EncounterPdfViewerService.prototype.getRemoteSectionData = function (section) {
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
    EncounterPdfViewerService.prototype.getSectionData = function (section, remoteAns, form) {
        var questions = {
            stack: []
        };
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
                        var groupMembers = [];
                        var result = Object.keys(node.children).map(function (key) { return node.children[key]; });
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
    EncounterPdfViewerService.prototype.resolveValue = function (answer, form, arrayElement) {
        var _this = this;
        if (answer !== '') {
            if (this.isUuid(answer)) {
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
                var arr_1 = [];
                _.forEach(answer, function (elem) {
                    arr_1.push(_this.resolveValue(elem, form, true));
                });
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
                var values = [];
                var result = Object.keys(answer).map(function (key) { return [key, answer[key]]; });
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    };
    EncounterPdfViewerService.prototype.generatePdfDefinition = function (form) {
        var _this = this;
        var docDefinition$ = new BehaviorSubject({});
        var remoteSelects = this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, true);
        combineLatest(remoteSelects).subscribe(function (remoteAns) {
            if (remoteAns) {
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
        });
        return docDefinition$;
    };
    EncounterPdfViewerService.prototype.displayPdf = function (form) {
        var _this = this;
        var pdf = pdfMake;
        var patient;
        pdf.vfs = pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient =
                form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe(function (docDefinition) {
            if (!_.isEmpty(docDefinition)) {
                if (typeof patient !== 'undefined') {
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
                                {
                                    text: moment(patient.birthdate).format('l') + " (" + patient.age + " yo)"
                                }
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
                docDefinition.footer = function (currentPage, pageCount) {
                    return {
                        style: 'footer',
                        widths: ['*', 'auto'],
                        table: {
                            body: [
                                [
                                    {
                                        text: 'Note: Confidentiality is one of the core duties of all medical practitioners. ' +
                                            "Patients' personal health information should be kept private.",
                                        style: 'confidential'
                                    },
                                    ''
                                ],
                                [
                                    {
                                        text: "Generated on " + new Date().toUTCString(),
                                        style: 'timestamp'
                                    },
                                    {
                                        text: currentPage.toString() + " of " + pageCount,
                                        style: 'pageNumber'
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    };
                };
                var win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }, function (error) {
            console.log('Error: ', error);
        });
    };
    EncounterPdfViewerService.prototype.isDate = function (val) {
        return moment(val, moment.ISO_8601, true).isValid();
    };
    EncounterPdfViewerService.prototype.isUuid = function (value) {
        return (value.length === 36 &&
            value.indexOf(' ') === -1 &&
            value.indexOf('.') === -1);
    };
    EncounterPdfViewerService.prototype.titleize = function (str) {
        return str.replace(/\w\S*/g, function (s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });
    };
    EncounterPdfViewerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    EncounterPdfViewerService.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: ObsValueAdapter },
        { type: DataSources }
    ]; };
    EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
    return EncounterPdfViewerService;
}());
export { EncounterPdfViewerService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItcGRmLXZpZXdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFHdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLDRCQUE0QixDQUFDOzs7OztBQUdwQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkI7SUFlRSxtQ0FDVSxzQkFBOEMsRUFDOUMsZUFBZ0MsRUFDaEMsV0FBd0I7UUFGeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWM0Isc0JBQWlCLEdBQVE7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNQyxDQUFDO0lBRUosNENBQVEsR0FBUixVQUNFLEtBQVUsRUFDVixJQUFVLEVBQ1YsaUJBQTJCLEVBQzNCLFNBQWU7UUFFZixJQUFNLE9BQU8sR0FB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Q0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRUQsNENBQVEsR0FBUixVQUFTLEdBQUc7UUFDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDaEIsUUFBUSxFQUNSLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFyRCxDQUFxRCxDQUM3RCxDQUFDO0lBQ0osQ0FBQzs7Z0JBamZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBakJRLHNCQUFzQjtnQkFEdEIsZUFBZTtnQkFFZixXQUFXOzs7b0NBTHBCO0NBcWdCQyxBQWxmRCxJQWtmQztTQS9lWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UuanMnO1xuaW1wb3J0ICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cy5qcyc7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cyc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclBkZlZpZXdlclNlcnZpY2Uge1xuICBwcml2YXRlIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBlcnJvcjogYm9vbGVhbjtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0xvYWRlcjogYm9vbGVhbjtcbiAgcHVibGljIHN1YnNjcmliZWRBbnN3ZXJzOiBhbnkgPSB7XG4gICAgcXVlc3Rpb25zOiB7XG4gICAgICBzdGFjazogW11cbiAgICB9LFxuICAgIGFuc3dlcnM6IFtdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgb2JzVmFsdWVBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXNcbiAgKSB7fVxuXG4gIGdldFBhZ2VzKFxuICAgIHBhZ2VzOiBhbnksXG4gICAgZm9ybTogRm9ybSxcbiAgICByZW1vdGVTZWxlY3RzT25seT86IGJvb2xlYW4sXG4gICAgcmVtb3RlQW5zPzogYW55XG4gICk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgbGV0IHJlbW90ZVF1ZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBpZiAocmVtb3RlU2VsZWN0c09ubHkpIHtcbiAgICAgICAgcmVtb3RlUXVlc3Rpb25zID0gcmVtb3RlUXVlc3Rpb25zLmNvbmNhdChcbiAgICAgICAgICB0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2YgZm9ybS5yb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYWdlLmxhYmVsID09PVxuICAgICAgICAgICAgICBmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0ucXVlc3Rpb24ubGFiZWwgJiZcbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChcbiAgICAgICAgICAgICAgZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goe1xuICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGtlZXBXaXRoSGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICBbeyB0ZXh0OiBwYWdlLmxhYmVsLCBzdHlsZTogJ3RhYmxlSGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCB0cnVlLCByZW1vdGVBbnMpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uIChpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVXaWR0aDogZnVuY3Rpb24gKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUud2lkdGhzLmxlbmd0aCA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhMaW5lQ29sb3I6IGZ1bmN0aW9uIChpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8gJyNkZGQnXG4gICAgICAgICAgICAgICAgICAgIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVDb2xvcjogZnVuY3Rpb24gKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyAnI2RkZCdcbiAgICAgICAgICAgICAgICAgICAgOiAnI2RkZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbW90ZVNlbGVjdHNPbmx5ID8gcmVtb3RlUXVlc3Rpb25zIDogY29udGVudDtcbiAgfVxuXG4gIGdldFNlY3Rpb25zKHNlY3Rpb25zOiBhbnksIGZvcm06IEZvcm0sIHJlc29sdmU6IGFueSwgcmVtb3RlQW5zOiBhbnkpOiBhbnlbXSB7XG4gICAgY29uc3QgY29udGVudCA9IFtdO1xuICAgIGNvbnN0IGFuc3dlcmVkU2VjdGlvbnMgPSBbXTtcbiAgICBsZXQgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG5cbiAgICBzZWN0aW9ucy5tYXAoKHMpID0+IHtcbiAgICAgIGlmICh0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQocy5ub2RlKSkge1xuICAgICAgICBhbnN3ZXJlZFNlY3Rpb25zLnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgcXVlc3Rpb25zID0gcXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChyZXNvbHZlICYmIHJlbW90ZUFucykge1xuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgW3sgdGV4dDogc2VjdGlvbi5sYWJlbCwgc3R5bGU6ICd0YWJsZVN1YmhlYWRlcicgfV0sXG4gICAgICAgICAgICAgICAgW3RoaXMuZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uLCByZW1vdGVBbnMsIGZvcm0pXVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZFJlc29sdmVkQW5zd2VyKFxuICAgIHJlc29sdmVkQW5zd2VyOiBhbnksXG4gICAgcXVlc3Rpb25zOiBhbnksXG4gICAgbm9kZT86IGFueVxuICApIHtcbiAgICBpZiAocmVzb2x2ZWRBbnN3ZXIpIHtcbiAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHtcbiAgICAgICAgdGV4dDogW1xuICAgICAgICAgIGAke25vZGUgPyBub2RlLnF1ZXN0aW9uLmxhYmVsIDogJ1F1ZXN0aW9uIGxhYmVsJ30ke1xuICAgICAgICAgICAgbm9kZSA/IChub2RlLnF1ZXN0aW9uLmxhYmVsLmluZGV4T2YoJzonKSA+IDEgPyAnJyA6ICc6JykgOiAnJ1xuICAgICAgICAgIH0gYCxcbiAgICAgICAgICB7IHRleHQ6IGAke3Jlc29sdmVkQW5zd2VyfWAsIGJvbGQ6IHRydWUgfVxuICAgICAgICBdLFxuICAgICAgICBzdHlsZTogJ2Fuc3dlcnMnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBnZXQgcmVtb3RlIHNlbGVjdHMgb25seVxuICBnZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuICAgIHRoaXMuc3Vic2NyaWJlZEFuc3dlcnMucXVlc3Rpb25zLnN0YWNrID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbXG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXG4gICAgICAgIF07XG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVtb3RlRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goXG4gICAgICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShub2RlLmNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLy8gbWVyZ2UgcmVtb3RlIHNlbGVjdHNcbiAgZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbjogYW55LCByZW1vdGVBbnM6IGFueVtdLCBmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSB7XG4gICAgICBzdGFjazogW11cbiAgICB9O1xuXG4gICAgbGV0IHJlc29sdmVkQW5zd2VyID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2goXG4gICAgICAgICAgICAgIHRoaXMuZ2V0U2VjdGlvbkRhdGEobm9kZS5ncm91cE1lbWJlcnMsIHJlbW90ZUFucywgZm9ybSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikubWFwKFxuICAgICAgICAgICAgICAoa2V5KSA9PiBub2RlLmNoaWxkcmVuW2tleV1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTZWN0aW9uRGF0YShncm91cE1lbWJlcnNbMF0sIHJlbW90ZUFucywgZm9ybSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZW1vdGUtc2VsZWN0JzpcbiAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW1xuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXG4gICAgICAgICAgXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGFucyBvZiByZW1vdGVBbnMpIHtcbiAgICAgICAgICAgIGlmIChhbnMudmFsdWUgPT09IG5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKGFucy5sYWJlbCwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSBub2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgaWYgKGFuc3dlcikge1xuICAgICAgICAgICAgcmVzb2x2ZWRBbnN3ZXIgPSB0aGlzLnJlc29sdmVWYWx1ZShhbnN3ZXIsIGZvcm0pO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlciwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIHJlc29sdmVWYWx1ZShhbnN3ZXI6IGFueSwgZm9ybTogRm9ybSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgaWYgKGFuc3dlciAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmlzVXVpZChhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoXG4gICAgICAgICAgYW5zd2VyLFxuICAgICAgICAgIGZvcm0uc2NoZW1hXG4gICAgICAgICk7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBfLmZvckVhY2goYW5zd2VyLCAoZWxlbSkgPT4ge1xuICAgICAgICAgIGFyci5wdXNoKHRoaXMucmVzb2x2ZVZhbHVlKGVsZW0sIGZvcm0sIHRydWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnIudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUoYW5zd2VyKSkge1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFuc3dlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKGFuc3dlcikubWFwKChrZXkpID0+IFtrZXksIGFuc3dlcltrZXldXSk7XG5cbiAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IGRvY0RlZmluaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcbiAgICBjb25zdCByZW1vdGVTZWxlY3RzID0gdGhpcy5nZXRQYWdlcyhcbiAgICAgIHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpLFxuICAgICAgZm9ybSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29tYmluZUxhdGVzdChyZW1vdGVTZWxlY3RzKS5zdWJzY3JpYmUoKHJlbW90ZUFucykgPT4ge1xuICAgICAgaWYgKHJlbW90ZUFucykge1xuICAgICAgICBjb25zdCBkb2NEZWZpbml0aW9uID0ge1xuICAgICAgICAgIHBhZ2VTaXplOiAnQTQnLFxuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuZ2V0UGFnZXMoXG4gICAgICAgICAgICB0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSxcbiAgICAgICAgICAgIGZvcm0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIHJlbW90ZUFuc1xuICAgICAgICAgICksXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1MCwgMTUsIDMwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckl0ZW06IHtcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMiwgMiwgMiwgMl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJMYWJlbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJyMyZjRmNGYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlkZW50aWFsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzYwLCAwLCAwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgNSwgNSwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzJmNGY0ZicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVFeGFtcGxlOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZjVmNWY1JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMzMzMnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZVN1YmhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzJmNGY0ZidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IDdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY0RlZmluaXRpb24kLm5leHQoZG9jRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZG9jRGVmaW5pdGlvbiQ7XG4gIH1cblxuICBkaXNwbGF5UGRmKGZvcm0pIHtcbiAgICBjb25zdCBwZGYgPSBwZGZNYWtlO1xuICAgIGxldCBwYXRpZW50O1xuICAgIHBkZi52ZnMgPSBwZGZNYWtlLnZmcztcblxuICAgIGlmIChmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlcykge1xuICAgICAgcGF0aWVudCA9XG4gICAgICAgIGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzWydwYXRpZW50SW5mbyddO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm0pLnN1YnNjcmliZShcbiAgICAgIChkb2NEZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIGlmICghXy5pc0VtcHR5KGRvY0RlZmluaXRpb24pKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXRpZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gW107XG5cbiAgICAgICAgICAgIGlmIChwYXRpZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWU6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3RoaXMudGl0bGVpemUocGF0aWVudC5uYW1lKX1gIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXRpZW50Lm5pZCkge1xuICAgICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnSUQ6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubmlkfWAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhdGllbnQuYmlydGhkYXRlKSB7XG4gICAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdET0I6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGAke21vbWVudChwYXRpZW50LmJpcnRoZGF0ZSkuZm9ybWF0KCdsJyl9ICgke1xuICAgICAgICAgICAgICAgICAgICAgIHBhdGllbnQuYWdlXG4gICAgICAgICAgICAgICAgICAgIH0geW8pYFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhdGllbnQubXVpKSB7XG4gICAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVUk6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubXVpfWAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhdGllbnQubWhuKSB7XG4gICAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVFJIIE5vOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm1obn1gIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY0RlZmluaXRpb24uaGVhZGVyID0ge1xuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lcicsXG4gICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgYm9keTogW2Jhbm5lcl1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2NEZWZpbml0aW9uLmZvb3RlciA9IChjdXJyZW50UGFnZSwgcGFnZUNvdW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzdHlsZTogJ2Zvb3RlcicsXG4gICAgICAgICAgICAgIHdpZHRoczogWycqJywgJ2F1dG8nXSxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgICAgJ05vdGU6IENvbmZpZGVudGlhbGl0eSBpcyBvbmUgb2YgdGhlIGNvcmUgZHV0aWVzIG9mIGFsbCBtZWRpY2FsIHByYWN0aXRpb25lcnMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJQYXRpZW50cycgcGVyc29uYWwgaGVhbHRoIGluZm9ybWF0aW9uIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb25maWRlbnRpYWwnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEdlbmVyYXRlZCBvbiAke25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGltZXN0YW1wJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogYCR7Y3VycmVudFBhZ2UudG9TdHJpbmcoKX0gb2YgJHtwYWdlQ291bnR9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3BhZ2VOdW1iZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJyk7XG4gICAgICAgICAgcGRmLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKHt9LCB3aW4pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICByZXR1cm4gbW9tZW50KHZhbCwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiAoXG4gICAgICB2YWx1ZS5sZW5ndGggPT09IDM2ICYmXG4gICAgICB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmXG4gICAgICB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xXG4gICAgKTtcbiAgfVxuXG4gIHRpdGxlaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShcbiAgICAgIC9cXHdcXFMqL2csXG4gICAgICAocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKClcbiAgICApO1xuICB9XG59XG4iXX0=