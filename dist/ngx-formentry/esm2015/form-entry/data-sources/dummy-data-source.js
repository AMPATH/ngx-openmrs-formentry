/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Option } from '../question-models/select-option';
import { BehaviorSubject, of } from 'rxjs';
export class DummyDataSource {
    constructor() {
        this.returnErrorOnNext = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resolveSelectedValue(value) {
        /** @type {?} */
        let selectOptions = this.sampleData();
        selectOptions = selectOptions.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            /** @type {?} */
            const option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        }));
        selectOptions = selectOptions.filter((/**
         * @param {?} option
         * @return {?}
         */
        option => option.value === value));
        /** @type {?} */
        const test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions[0]);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fileUpload(url) {
        return of({ image: '' });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fetchFile(url) {
        return of({ image: '' });
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    searchOptions(searchText) {
        /** @type {?} */
        let selectOptions = this.sampleData();
        selectOptions = selectOptions.map((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            /** @type {?} */
            const option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        }));
        selectOptions = selectOptions.filter((/**
         * @param {?} option
         * @return {?}
         */
        option => option.label.indexOf(searchText) !== -1));
        /** @type {?} */
        const test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    /**
     * @return {?}
     */
    sampleData() {
        return [
            {
                concept: 'a899e0ac-1350-11df-a1f1-0026b9348838',
                label: 'None'
            },
            {
                concept: 'a8ad1276-1350-11df-a1f1-0026b9348838',
                label: 'Breathlessness'
            },
            {
                concept: 'a892e4b4-1350-11df-a1f1-0026b9348838',
                label: 'Chest pain'
            },
            {
                concept: 'a8afc8b8-1350-11df-a1f1-0026b9348838',
                label: 'Cough = 2 weeks'
            },
            {
                concept: 'd7adae14-c386-49cc-8f7c-765d8ceec566',
                label: 'Fever for = 2 weeks'
            },
            {
                concept: '3f57aafc-7162-41da-a51b-6a804cb6f5e8',
                label: 'New exposure to household contact with TB'
            },
            {
                concept: 'a89807f0-1350-11df-a1f1-0026b9348838',
                label: 'Noticeable Weight loss'
            },
            {
                concept: 'e1862fef-68ed-4df4-90dd-a00152f719aa',
                label: 'Night sweats = 2 weeks'
            },
            {
                concept: 'a8ad462e-1350-11df-a1f1-0026b9348838',
                label: 'Abdomen'
            },
            {
                concept: 'f218c60e-4b54-475a-a4fa-facab9216da8',
                label: 'Groin'
            },
            {
                concept: 'a8a774b0-1350-11df-a1f1-0026b9348838',
                label: 'Joints'
            },
            {
                concept: '4639388c-ee31-4dcf-abb4-ad71253493bb',
                label: 'Neck Kw'
            }
        ];
    }
}
if (false) {
    /** @type {?} */
    DummyDataSource.prototype.options;
    /** @type {?} */
    DummyDataSource.prototype.option;
    /** @type {?} */
    DummyDataSource.prototype.returnErrorOnNext;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTFELE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3ZELE1BQU07SUFLSjtRQUZBLHNCQUFpQixHQUFHLEtBQUssQ0FBQztJQUVWLENBQUM7Ozs7O0lBRWpCLG9CQUFvQixDQUFDLEtBQUs7O1lBQ3BCLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBRXJDLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRzs7OztRQUFDLFVBQVUsR0FBRzs7a0JBQ3ZDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87YUFDbkIsQ0FBQztZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFDLENBQUM7UUFHSCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU07Ozs7UUFDbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFDakMsQ0FBQzs7Y0FFSSxJQUFJLEdBQXlCLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FB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bW9kZWxzL3NlbGVjdC1vcHRpb24nO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIER1bW15RGF0YVNvdXJjZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xyXG4gIG9wdGlvbnM6IE9ic2VydmFibGU8T3B0aW9uW10+O1xyXG4gIG9wdGlvbjogT2JzZXJ2YWJsZTxPcHRpb24+O1xyXG4gIHJldHVybkVycm9yT25OZXh0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKTogT2JzZXJ2YWJsZTxPcHRpb24+IHtcclxuICAgIGxldCBzZWxlY3RPcHRpb25zID0gdGhpcy5zYW1wbGVEYXRhKCk7XHJcblxyXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gbmV3IE9wdGlvbih7XHJcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcclxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICBvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihbXSk7XHJcbiAgICBpZiAoIXRoaXMucmV0dXJuRXJyb3JPbk5leHQpIHtcclxuICAgICAgdGVzdC5uZXh0KHNlbGVjdE9wdGlvbnNbMF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVzdC5lcnJvcihuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgT3B0aW9ucycpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVzdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcbiAgZmlsZVVwbG9hZCh1cmwpIHtcclxuICAgIHJldHVybiBvZih7IGltYWdlOiAnJyB9KTtcclxuICB9XHJcbiAgZmV0Y2hGaWxlKHVybCkge1xyXG4gICAgcmV0dXJuIG9mKHsgaW1hZ2U6ICcnIH0pO1xyXG4gIH1cclxuICBzZWFyY2hPcHRpb25zKHNlYXJjaFRleHQpOiBPYnNlcnZhYmxlPE9wdGlvbltdPiB7XHJcbiAgICBsZXQgc2VsZWN0T3B0aW9ucyA9IHRoaXMuc2FtcGxlRGF0YSgpO1xyXG5cclxuICAgIHNlbGVjdE9wdGlvbnMgPSBzZWxlY3RPcHRpb25zLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG5ldyBPcHRpb24oe1xyXG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXHJcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHNlbGVjdE9wdGlvbnMgPSBzZWxlY3RPcHRpb25zLmZpbHRlcihcclxuICAgICAgb3B0aW9uID0+IG9wdGlvbi5sYWJlbC5pbmRleE9mKHNlYXJjaFRleHQpICE9PSAtMVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihbXSk7XHJcbiAgICBpZiAoIXRoaXMucmV0dXJuRXJyb3JPbk5leHQpIHtcclxuICAgICAgdGVzdC5uZXh0KHNlbGVjdE9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVzdC5lcnJvcihuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgT3B0aW9ucycpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVzdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHNhbXBsZURhdGEoKTogYW55IHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBjb25jZXB0OiAnYTg5OWUwYWMtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcclxuICAgICAgICBsYWJlbDogJ05vbmUnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjb25jZXB0OiAnYThhZDEyNzYtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcclxuICAgICAgICBsYWJlbDogJ0JyZWF0aGxlc3NuZXNzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2E4OTJlNGI0LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgbGFiZWw6ICdDaGVzdCBwYWluJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2E4YWZjOGI4LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgbGFiZWw6ICdDb3VnaCA9IDIgd2Vla3MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjb25jZXB0OiAnZDdhZGFlMTQtYzM4Ni00OWNjLThmN2MtNzY1ZDhjZWVjNTY2JyxcclxuICAgICAgICBsYWJlbDogJ0ZldmVyIGZvciA9IDIgd2Vla3MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjb25jZXB0OiAnM2Y1N2FhZmMtNzE2Mi00MWRhLWE1MWItNmE4MDRjYjZmNWU4JyxcclxuICAgICAgICBsYWJlbDogJ05ldyBleHBvc3VyZSB0byBob3VzZWhvbGQgY29udGFjdCB3aXRoIFRCJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2E4OTgwN2YwLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgbGFiZWw6ICdOb3RpY2VhYmxlIFdlaWdodCBsb3NzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2UxODYyZmVmLTY4ZWQtNGRmNC05MGRkLWEwMDE1MmY3MTlhYScsXHJcbiAgICAgICAgbGFiZWw6ICdOaWdodCBzd2VhdHMgPSAyIHdlZWtzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2E4YWQ0NjJlLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgbGFiZWw6ICdBYmRvbWVuJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJ2YyMThjNjBlLTRiNTQtNDc1YS1hNGZhLWZhY2FiOTIxNmRhOCcsXHJcbiAgICAgICAgbGFiZWw6ICdHcm9pbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNvbmNlcHQ6ICdhOGE3NzRiMC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxyXG4gICAgICAgIGxhYmVsOiAnSm9pbnRzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY29uY2VwdDogJzQ2MzkzODhjLWVlMzEtNGRjZi1hYmI0LWFkNzEyNTM0OTNiYicsXHJcbiAgICAgICAgbGFiZWw6ICdOZWNrIEt3J1xyXG4gICAgICB9XHJcblxyXG4gICAgXTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==