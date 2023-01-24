import { Injectable } from '@angular/core';
export class DataSources {
    constructor() {
        this._dataSources = {};
    }
    get dataSources() {
        return this._dataSources;
    }
    registerDataSource(key, dataSource, unWrap = false) {
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (const o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    }
    clearDataSource(key) {
        delete this._dataSources[key];
    }
}
DataSources.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataSources.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNO0lBRUo7UUFEUSxpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRWhCLElBQUksV0FBVztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsVUFBZSxFQUFFLE1BQU0sR0FBRyxLQUFLO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxpQ0FBaUM7WUFDakMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRCxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7O1lBekJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlcyB7XG4gIHByaXZhdGUgX2RhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldCBkYXRhU291cmNlcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlcztcbiAgfVxuXG4gIHJlZ2lzdGVyRGF0YVNvdXJjZShrZXk6IHN0cmluZywgZGF0YVNvdXJjZTogYW55LCB1bldyYXAgPSBmYWxzZSkge1xuICAgIGlmICh1bldyYXApIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIGRhdGFTb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyaW5nJywgbywgZGF0YVNvdXJjZVtvXSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEYXRhU291cmNlKG8sIGRhdGFTb3VyY2Vbb10sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZXNba2V5XSkge1xuICAgICAgY29uc29sZS53YXJuKCdPdmVycmlkaW5nIHJlZ2lzdGVyZWQgZGF0YSBzb3VyY2UnLCBrZXkpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhU291cmNlc1trZXldID0gZGF0YVNvdXJjZTtcbiAgfVxuXG4gIGNsZWFyRGF0YVNvdXJjZShrZXk6IHN0cmluZykge1xuICAgIGRlbGV0ZSB0aGlzLl9kYXRhU291cmNlc1trZXldO1xuICB9XG59XG4iXX0=