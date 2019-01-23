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
    { type: Injectable },
];
PersonAttribuAdapter.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWF0dHJpYnV0ZS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9wZXJzb24tYXR0cmlidXRlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLM0UsTUFBTTtJQUNGLGdCQUFnQixDQUFDOzs7OztJQUVqQixtQkFBbUIsQ0FBQyxJQUFVO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsUUFBa0I7O2NBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDOztjQUM5QyxPQUFPLEdBQUcsRUFBRTtRQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUk7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ1QsYUFBYSxFQUFF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QUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQzs7a0JBQzFCLElBQUksR0FBRyxtQkFBQSxRQUFRLEVBQWE7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQzs7O1lBekZKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQZXJzb25BdHRyaWJ1QWRhcHRlciBpbXBsZW1lbnRzIFZhbHVlQWRhcHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZU5vZGVQYXlsb2FkKGZvcm0ucm9vdE5vZGUpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlTm9kZVBheWxvYWQocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZSk7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBbXTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycgJiZcbiAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSAhPT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmlzU2ltcGxlVmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5hdHRyaWJ1dGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoeWRyYXRlZE9iamVjdDogbm9kZS5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVGb3JtKGZvcm06IEZvcm0sIHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU5vZGUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF5bG9hZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYW4gYXJyYXkgb2YgYXR0cmlidXRlcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldFBlcnNvbkF0dHJpYnV0ZU5vZGVzKHJvb3ROb2RlKTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmF0dHJpYnV0ZVR5cGUudXVpZFxuICAgICAgICAgICAgICAgICAgICA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmF0dHJpYnV0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKGVsZW1lbnQudmFsdWUudXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IGVsZW1lbnQudmFsdWUudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShlbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQZXJzb25BdHRyaWJ1dGVOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UpOiBBcnJheTxOb2RlQmFzZT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4gPSBbXTtcbiAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKHJvb3ROb2RlLCByZXN1bHRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKHJvb3ROb2RlOiBOb2RlQmFzZSwgYXJyYXk6IEFycmF5PE5vZGVCYXNlPikge1xuICAgICAgICBpZiAocm9vdE5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICByb290Tm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ3BlcnNvbkF0dHJpYnV0ZScpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gocm9vdE5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW29dIGluc3RhbmNlb2YgTm9kZUJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGVyc29uQXR0cmlidXRlc05vZGVzKG5vZGUuY2hpbGRyZW5bb10sIGFycmF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldFBlcnNvbkF0dHJpYnV0ZXNOb2RlcyhjaGlsZCwgYXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=