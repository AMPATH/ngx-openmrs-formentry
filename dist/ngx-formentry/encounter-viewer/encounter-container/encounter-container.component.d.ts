import { OnInit } from '@angular/core';
import { Form } from '../../form-entry/form-factory/form';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
export declare class EncounterContainerComponent implements OnInit {
    private encAdapter;
    private encounterPdfViewerService;
    $form: Form;
    $enc: any;
    form: any;
    encounter: any;
    constructor(encAdapter: EncounterAdapter, encounterPdfViewerService: EncounterPdfViewerService);
    ngOnInit(): void;
    displayPdf(): void;
}
