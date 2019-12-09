import * as tslib_1 from "tslib";
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
                if (element.attributeType.uuid
                    === node.question.extras.questionOptions.attributeType) {
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
    PersonAttribuAdapter = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], PersonAttribuAdapter);
    return PersonAttribuAdapter;
}());
export { PersonAttribuAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLM0U7SUFDSTtJQUFnQixDQUFDO0lBRWpCLGtEQUFtQixHQUFuQixVQUFvQixJQUFVO1FBQzFCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsa0RBQW1CLEdBQW5CLFVBQW9CLFFBQWtCO1FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBRTFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7b0JBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ1QsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUs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Q0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDdkIsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXhGUSxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFOztPQUNBLG9CQUFvQixDQXlGaEM7SUFBRCwyQkFBQztDQUFBLEFBekZELElBeUZDO1NBekZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBlcnNvbkF0dHJpYnVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVOb2RlUGF5bG9hZChyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJyAmJlxuICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSBub2RlLmNvbnRyb2wudmFsdWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuaXNTaW1wbGVWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuYXR0cmlidXRlVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh5ZHJhdGVkT2JqZWN0OiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLnBvcHVsYXRlTm9kZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZU5vZGUocm9vdE5vZGU6IE5vZGVCYXNlLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiBhdHRyaWJ1dGVzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGUpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBwYXlsb2FkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cmlidXRlVHlwZS51dWlkXG4gICAgICAgICAgICAgICAgICAgID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuYXR0cmlidXRlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZWxlbWVudC52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZWxlbWVudC52YWx1ZS51dWlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPiA9IFtdO1xuICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlLCBhcnJheTogQXJyYXk8Tm9kZUJhc2U+KSB7XG4gICAgICAgIGlmIChyb290Tm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIHJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAncGVyc29uQXR0cmlidXRlJykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW5bb10gaW5zdGFuY2VvZiBOb2RlQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKGNoaWxkLCBhcnJheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==