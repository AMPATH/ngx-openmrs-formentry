/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        nodes.forEach(node => {
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
        nodes.forEach(node => {
            payload.forEach(element => {
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
            node.children.forEach(child => {
                this._getPersonAttributesNodes(child, array);
            });
        }
    }
}
PersonAttribuAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PersonAttribuAdapter.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLM0UsTUFBTSxPQUFPLG9CQUFvQjtJQUM3QixnQkFBZ0IsQ0FBQzs7Ozs7SUFFakIsbUJBQW1CLENBQUMsSUFBVTtRQUMxQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxRQUFrQjs7Y0FDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7O2NBQzlDLE9BQU8sR0FBRyxFQUFFO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUUxQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO29CQUM3RCxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNULGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxl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TyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUF6RkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBlcnNvbkF0dHJpYnVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVOb2RlUGF5bG9hZChyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJyAmJlxuICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlICE9PSBub2RlLmNvbnRyb2wudmFsdWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuaXNTaW1wbGVWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuYXR0cmlidXRlVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh5ZHJhdGVkT2JqZWN0OiBub2RlLmNvbnRyb2wudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLnBvcHVsYXRlTm9kZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZU5vZGUocm9vdE5vZGU6IE5vZGVCYXNlLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiBhdHRyaWJ1dGVzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0UGVyc29uQXR0cmlidXRlTm9kZXMocm9vdE5vZGUpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBwYXlsb2FkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cmlidXRlVHlwZS51dWlkXG4gICAgICAgICAgICAgICAgICAgID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuYXR0cmlidXRlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWx1ZS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUoZWxlbWVudC52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZWxlbWVudC52YWx1ZS51dWlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsVmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPiA9IFtdO1xuICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMocm9vdE5vZGUsIHJlc3VsdHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlLCBhcnJheTogQXJyYXk8Tm9kZUJhc2U+KSB7XG4gICAgICAgIGlmIChyb290Tm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIHJvb3ROb2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAncGVyc29uQXR0cmlidXRlJykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChyb290Tm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW5bb10gaW5zdGFuY2VvZiBOb2RlQmFzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRQZXJzb25BdHRyaWJ1dGVzTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKGNoaWxkLCBhcnJheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==