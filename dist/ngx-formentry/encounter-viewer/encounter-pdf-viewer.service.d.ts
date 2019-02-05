import { Form } from '../form-entry/form-factory/form';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';
import { DataSources } from '../form-entry/data-sources/data-sources';
import 'pdfmake/build/vfs_fonts.js';
export declare class EncounterPdfViewerService {
    private encounterViewerService;
    private obsValueAdapter;
    private dataSources;
    private remoteDataSource;
    error: boolean;
    errorMessage: string;
    showLoader: boolean;
    subscribedAnswers: any;
    constructor(encounterViewerService: EncounterViewerService, obsValueAdapter: ObsValueAdapter, dataSources: DataSources);
    getPages(pages: any, form: Form, remoteSelectsOnly?: boolean, remoteAns?: any): any[];
    getSections(sections: any, form: Form, resolve: any, remoteAns: any): any[];
    appendResolvedAnswer(resolvedAnswer: any, questions: any, node?: any): void;
    getRemoteSectionData(section: any): any;
    getSectionData(section: any, remoteAns: any[], form: Form): any;
    resolveValue(answer: any, form: Form, arrayElement?: boolean): any;
    generatePdfDefinition(form: Form): any;
    displayPdf(form: any): void;
    isDate(val: any): boolean;
    isUuid(value: string): boolean;
    titleize(str: any): any;
}
