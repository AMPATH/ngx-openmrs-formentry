export declare class FormSchemaCompiler {
    constructor();
    compileFormSchema(formSchema: Object, referencedComponents: Array<any>): Object;
    private findSchemaByName;
    private getPageInSchemaByLabel;
    private getSectionInSchemaByPageLabelBySectionLabel;
    private getQuestionByIdInSchema;
    private getQuestionsArrayByQuestionIdInSchema;
    private getQuestionsArrayByQuestionId;
    private isSchemaSubObjectExpandable;
    private isQuestionObjectWithId;
    private getAllPlaceholderObjects;
    private extractPlaceholderObjects;
    private fillPlaceholderObject;
    private replaceAllPlaceholdersWithActualObjects;
    private removeObjectFromArray;
    private removeExcludedQuestionsFromPlaceholder;
    private getReferencedObject;
    private getReferencedForms;
}
