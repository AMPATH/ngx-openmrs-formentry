import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
var PersonAttribuAdapter = /** @class */ (function () {
    function PersonAttribuAdapter() {
    }
    PersonAttribuAdapter.prototype.generateFormPayload = function (form) {
        return this.generateNodePayload(form.rootNode);
    };
    PersonAttribuAdapter.prototype.generateNodePayload = function (rootNode) {
        var nodes = this.getPersonAttributeNodes(rootNode);
        var payload = [];
        nodes.forEach(function (node) {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '' &&
                node.initialValue !== node.control.value) {
                if (node.question.extras.questionOptions.isSimpleValue === true) {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        value: node.control.value
                    });
                }
                else {
                    payload.push({
                        attributeType: node.question.extras.questionOptions.attributeType,
                        hydratedObject: node.control.value
                    });
                }
            }
        });
        return payload;
    };
    PersonAttribuAdapter.prototype.populateForm = function (form, payload) {
        this.populateNode(form.rootNode, payload);
    };
    PersonAttribuAdapter.prototype.populateNode = function (rootNode, payload) {
        if (!Array.isArray(payload)) {
            throw new Error('Expected an array of attributes');
        }
        var nodes = this.getPersonAttributeNodes(rootNode);
        nodes.forEach(function (node) {
            payload.forEach(function (element) {
                if (element.attributeType.uuid ===
                    node.question.extras.questionOptions.attributeType) {
                    if (element.value.uuid) {
                        node.control.setValue(element.value.uuid);
                        node.initialValue = element.value.uuid;
                    }
                    else {
                        node.control.setValue(element.value);
                        node.initialValue = element.value;
                    }
                }
            });
        });
    };
    PersonAttribuAdapter.prototype.getPersonAttributeNodes = function (rootNode) {
        var results = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    };
    PersonAttribuAdapter.prototype._getPersonAttributesNodes = function (rootNode, array) {
        var _this = this;
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var node = rootNode;
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            var node = rootNode;
            node.children.forEach(function (child) {
                _this._getPersonAttributesNodes(child, array);
            });
        }
    };
    PersonAttribuAdapter.decorators = [
        { type: Injectable },
    ];
    PersonAttribuAdapter.ctorParameters = function () { return []; };
    return PersonAttribuAdapter;
}());
export { PersonAttribuAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUkzRTtJQUVFO0lBQWUsQ0FBQztJQUVoQixrREFBbUIsR0FBbkIsVUFBb0IsSUFBVTtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsa0RBQW1CLEdBQW5CLFVBQW9CLFFBQWtCO1FBQ3BDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDakIsRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDWCxh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QVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFELENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQU0sSUFBSSxHQUFHLFFBQXFCLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2dCQUMxQixLQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7O2dCQWhHRixVQUFVOzs7SUFpR1gsMkJBQUM7Q0FBQSxBQWpHRCxJQWlHQztTQWhHWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQZXJzb25BdHRyaWJ1QWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICB9XG5cbiAgZ2VuZXJhdGVOb2RlUGF5bG9hZChyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGUpO1xuICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnICYmXG4gICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICkge1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmlzU2ltcGxlVmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5hdHRyaWJ1dGVUeXBlLFxuICAgICAgICAgICAgaHlkcmF0ZWRPYmplY3Q6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgIHRoaXMucG9wdWxhdGVOb2RlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuICB9XG5cbiAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiBhdHRyaWJ1dGVzJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlKTtcblxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHBheWxvYWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZWxlbWVudC5hdHRyaWJ1dGVUeXBlLnV1aWQgPT09XG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUudXVpZCk7XG4gICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGVsZW1lbnQudmFsdWUudXVpZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UpOiBBcnJheTxOb2RlQmFzZT4ge1xuICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPiA9IFtdO1xuICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2Rlcyhyb290Tm9kZSwgcmVzdWx0cyk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMoXG4gICAgcm9vdE5vZGU6IE5vZGVCYXNlLFxuICAgIGFycmF5OiBBcnJheTxOb2RlQmFzZT5cbiAgKSB7XG4gICAgaWYgKFxuICAgICAgcm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICByb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3BlcnNvbkF0dHJpYnV0ZSdcbiAgICApIHtcbiAgICAgIGFycmF5LnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW5bb10gaW5zdGFuY2VvZiBOb2RlQmFzZSkge1xuICAgICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2Rlcyhub2RlLmNoaWxkcmVuW29dLCBhcnJheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=