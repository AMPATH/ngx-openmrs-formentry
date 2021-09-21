export declare class JsExpressionHelper {
    calcBMI(height: any, weight: any): number;
    calcBSA(height: number, weight: number): number;
    calcBMIForAgeZscore(bmiForAgeRef: any, height: any, weight: any): any;
    calcWeightForHeightZscore(weightForHeightRef: any, height: any, weight: any): any;
    calcHeightForAgeZscore(heightForAgeRef: any, height: any, weight: any): any;
    isEmpty(val: any): boolean;
    arrayContains(array: any, members: any): boolean;
    extractRepeatingGroupValues(key: any, array: any): any;
    formatDate(value: any, format: any, offset: any): any;
    arrayContainsAny(array: any, members: any): boolean;
    readonly helperFunctions: {
        arrayContainsAny: (array: any, members: any) => boolean;
        calcBMI: (height: any, weight: any) => number;
        calcBMIForAgeZscore: (bmiForAgeRef: any, height: any, weight: any) => any;
        calcWeightForHeightZscore: (weightForHeightRef: any, height: any, weight: any) => any;
        calcHeightForAgeZscore: (heightForAgeRef: any, height: any, weight: any) => any;
        isEmpty: (val: any) => boolean;
        arrayContains: (array: any, members: any) => boolean;
        extractRepeatingGroupValues: (key: any, array: any) => any;
    };
}
