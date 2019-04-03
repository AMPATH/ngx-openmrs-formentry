/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
export class PersonAttribuAdapter {
    constructor() { }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        return this.generateNodePayload(form.rootNode);
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    generateNodePayload(rootNode) {
        /** @type {?} */
        const nodes = this.getPersonAttributeNodes(rootNode);
        /** @type {?} */
        const payload = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        node => {
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
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        this.populateNode(form.rootNode, payload);
    }
    /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    populateNode(rootNode, payload) {
        if (!Array.isArray(payload)) {
            throw new Error('Expected an array of attributes');
        }
        /** @type {?} */
        const nodes = this.getPersonAttributeNodes(rootNode);
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        node => {
            payload.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
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
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    getPersonAttributeNodes(rootNode) {
        /** @type {?} */
        const results = [];
        this._getPersonAttributesNodes(rootNode, results);
        return results;
    }
    /**
     * @private
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    _getPersonAttributesNodes(rootNode, array) {
        if (rootNode.question.extras &&
            rootNode.question.extras.type === 'personAttribute') {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const node = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getPersonAttributesNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const node = (/** @type {?} */ (rootNode));
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => {
                this._getPersonAttributesNodes(child, array);
            }));
        }
    }
}
PersonAttribuAdapter.decorators = [
    { type: Injectable },
];
PersonAttribuAdapter.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLM0UsTUFBTTtJQUNGLGdCQUFnQixDQUFDOzs7OztJQUVqQixtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsUUFBa0I7O2NBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDOztjQUM5QyxPQUFPLEdBQUcsRUFBRTtRQUNsQixLQUFLLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ1QsYUFBYSxF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QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQzs7a0JBQzFCLElBQUksR0FBRyxtQkFBQSxRQUFRLEVBQWE7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQzs7O1lBekZKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcclxuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBlcnNvbkF0dHJpYnVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZSk7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xyXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnICYmXHJcbiAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSAhPT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5pc1NpbXBsZVZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLmNvbnRyb2wudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh5ZHJhdGVkT2JqZWN0OiBub2RlLmNvbnRyb2wudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xyXG4gICAgICAgIHRoaXMucG9wdWxhdGVOb2RlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlTm9kZShyb290Tm9kZTogTm9kZUJhc2UsIHBheWxvYWQpIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiBhdHRyaWJ1dGVzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBwYXlsb2FkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyaWJ1dGVUeXBlLnV1aWRcclxuICAgICAgICAgICAgICAgICAgICA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWx1ZS51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShlbGVtZW50LnZhbHVlLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGVsZW1lbnQudmFsdWUudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XHJcbiAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKHJvb3ROb2RlLCByZXN1bHRzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlLCBhcnJheTogQXJyYXk8Tm9kZUJhc2U+KSB7XHJcbiAgICAgICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxyXG4gICAgICAgICAgICByb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3BlcnNvbkF0dHJpYnV0ZScpIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbltvXSBpbnN0YW5jZW9mIE5vZGVCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKG5vZGUuY2hpbGRyZW5bb10sIGFycmF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMoY2hpbGQsIGFycmF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==