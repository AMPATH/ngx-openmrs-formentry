import * as tslib_1 from "tslib";
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
var FileUploadQuestion = /** @class */ (function (_super) {
    tslib_1.__extends(FileUploadQuestion, _super);
    function FileUploadQuestion(options) {
        var _this = _super.call(this, options) || this;
        _this.showTime = true;
        _this.showWeeksAdder = false;
        _this.renderingType = 'file';
        _this.dataSource = options.dataSource;
        _this.controlType = AfeControlType.AfeFormControl;
        return _this;
    }
    return FileUploadQuestion;
}(QuestionBase));
export { FileUploadQuestion };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ZpbGUtdXBsb2FkLXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGO0lBQXdDLDhDQUFZO0lBSWxELDRCQUFZLE9BQWtDO1FBQTlDLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBSWY7UUFSRCxjQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBSXJCLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNyQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0lBQ25ELENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFWRCxDQUF3QyxZQUFZLEdBVW5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEZpbGVVcGxvYWRRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsZS11cGxvYWQtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XG4gIHNob3dUaW1lID0gdHJ1ZTtcbiAgc2hvd1dlZWtzQWRkZXIgPSBmYWxzZTtcbiAgZGF0YVNvdXJjZT86IGFueTtcbiAgY29uc3RydWN0b3Iob3B0aW9uczogRmlsZVVwbG9hZFF1ZXN0aW9uT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdmaWxlJztcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBvcHRpb25zLmRhdGFTb3VyY2U7XG4gICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICB9XG59XG4iXX0=