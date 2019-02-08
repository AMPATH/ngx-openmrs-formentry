/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
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
        }));
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
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            payload.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
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
            }));
        }));
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
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this._getPersonAttributesNodes(child, array);
            }));
        }
    };
    PersonAttribuAdapter.decorators = [
        { type: Injectable },
    ];
    PersonAttribuAdapter.ctorParameters = function () { return []; };
    return PersonAttribuAdapter;
}());
export { PersonAttribuAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJM0U7SUFFSTtJQUFnQixDQUFDOzs7OztJQUVqQixrREFBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBVTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVELGtEQUFtQjs7OztJQUFuQixVQUFvQixRQUFrQjs7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7O1lBQzlDLE9BQU8sR0FBRyxFQUFFO1FBQ2xCLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFD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QyxJQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7O2dCQUMxQixJQUFJLEdBQUcsbUJBQUEsUUFBUSxFQUFhO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsS0FBSztnQkFDdkIsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDOztnQkF6RkosVUFBVTs7O0lBMEZYLDJCQUFDO0NBQUEsQUExRkQsSUEwRkM7U0F6Rlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGVyc29uQXR0cmlidUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGUpO1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gW107XG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnICYmXG4gICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgIT09IG5vZGUuY29udHJvbC52YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5pc1NpbXBsZVZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuYXR0cmlidXRlVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5hdHRyaWJ1dGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHlkcmF0ZWRPYmplY3Q6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMucG9wdWxhdGVOb2RlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIHBvcHVsYXRlTm9kZShyb290Tm9kZTogTm9kZUJhc2UsIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGFuIGFycmF5IG9mIGF0dHJpYnV0ZXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZSk7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIHBheWxvYWQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyaWJ1dGVUeXBlLnV1aWRcbiAgICAgICAgICAgICAgICAgICAgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5hdHRyaWJ1dGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnZhbHVlLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShlbGVtZW50LnZhbHVlLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBlbGVtZW50LnZhbHVlLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlKTogQXJyYXk8Tm9kZUJhc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XG4gICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2Rlcyhyb290Tm9kZSwgcmVzdWx0cyk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICAgICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgcm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdwZXJzb25BdHRyaWJ1dGUnKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKHJvb3ROb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2Rlcyhub2RlLmNoaWxkcmVuW29dLCBhcnJheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMoY2hpbGQsIGFycmF5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19