/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
var PersonAttribuAdapter = /** @class */ (function () {
    function PersonAttribuAdapter() {
    }
    /**
     * @param {?} form
     * @return {?}
     */
    PersonAttribuAdapter.prototype.generateFormPayload = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return this.generateNodePayload(form.rootNode);
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    PersonAttribuAdapter.prototype.generateNodePayload = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        /** @type {?} */
        var nodes = this.getPersonAttributeNodes(rootNode);
        /** @type {?} */
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
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    PersonAttribuAdapter.prototype.populateForm = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
        this.populateNode(form.rootNode, payload);
    };
    /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    PersonAttribuAdapter.prototype.populateNode = /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    function (rootNode, payload) {
        if (!Array.isArray(payload)) {
            throw new Error('Expected an array of attributes');
        }
        /** @type {?} */
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
    /**
     * @param {?} rootNode
     * @return {?}
     */
    PersonAttribuAdapter.prototype.getPersonAttributeNodes = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        /** @type {?} */
        var results = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    };
    /**
     * @private
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    PersonAttribuAdapter.prototype._getPersonAttributesNodes = /**
     * @private
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    function (rootNode, array) {
        var _this = this;
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var node = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var node = (/** @type {?} */ (rootNode));
            node.children.forEach(function (child) {
                _this._getPersonAttributesNodes(child, array);
            });
        }
    };
    PersonAttribuAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PersonAttribuAdapter.ctorParameters = function () { return []; };
    return PersonAttribuAdapter;
}());
export { PersonAttribuAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJM0U7SUFFSTtJQUFnQixDQUFDOzs7OztJQUVqQixrREFBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBVTtRQUMxQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxrREFBbUI7Ozs7SUFBbkIsVUFBb0IsUUFBa0I7O1lBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDOztZQUM5QyxPQUFPLEdBQUcsRUFBRTtRQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFFMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtvQkFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDVCxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxD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UUFBUSxFQUFhO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDdkIsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Z0JBekZKLFVBQVU7Ozs7SUEwRlgsMkJBQUM7Q0FBQSxBQTFGRCxJQTBGQztTQXpGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQZXJzb25BdHRyaWJ1QWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlTm9kZVBheWxvYWQocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZSk7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycgJiZcbiAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSAhPT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmlzU2ltcGxlVmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5hdHRyaWJ1dGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoeWRyYXRlZE9iamVjdDogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYW4gYXJyYXkgb2YgYXR0cmlidXRlcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlKTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmF0dHJpYnV0ZVR5cGUudXVpZFxuICAgICAgICAgICAgICAgICAgICA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUudXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGVsZW1lbnQudmFsdWUudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShlbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UpOiBBcnJheTxOb2RlQmFzZT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4gPSBbXTtcbiAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKHJvb3ROb2RlLCByZXN1bHRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSwgYXJyYXk6IEFycmF5PE5vZGVCYXNlPikge1xuICAgICAgICBpZiAocm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICByb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3BlcnNvbkF0dHJpYnV0ZScpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gocm9vdE5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW29dIGluc3RhbmNlb2YgTm9kZUJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKG5vZGUuY2hpbGRyZW5bb10sIGFycmF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=