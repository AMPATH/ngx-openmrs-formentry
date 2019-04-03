/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { DataSources } from '../data-sources/data-sources';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
export class Form {
    /**
     * @param {?} schema
     * @param {?} formFactory
     * @param {?} questionFactory
     */
    constructor(schema, formFactory, questionFactory) {
        this.schema = schema;
        this.formFactory = formFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    /**
     * @return {?}
     */
    get dataSourcesContainer() {
        return this._dataSourcesContainer;
    }
    /**
     * @param {?} node
     * @param {?} path
     * @param {?} found
     * @return {?}
     */
    searchNodeByPath(node, path, found) {
        /** @type {?} */
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                const child = children[key];
                if (child instanceof GroupNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    this.searchNodeByPath(child, path, found);
                }
                else if (child instanceof LeafNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                }
                else if (child instanceof ArrayNode) {
                    if (path === child.path) {
                        found.push(child);
                        return found;
                    }
                    /** @type {?} */
                    const aChild = (/** @type {?} */ (child));
                    aChild.children.forEach((/**
                     * @param {?} aChildNode
                     * @return {?}
                     */
                    aChildNode => {
                        this.searchNodeByPath(aChildNode, path, found);
                    }));
                }
            }
        }
        return found;
    }
    /**
     * @param {?} questionId
     * @param {?=} questionType
     * @return {?}
     */
    searchNodeByQuestionId(questionId, questionType) {
        /** @type {?} */
        const found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    }
    /**
     * @param {?} rootNode
     * @param {?} questionType
     * @param {?} found
     * @return {?}
     */
    searchNodeByQuestionType(rootNode, questionType, found) {
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            node => {
                this.searchNodeByQuestionType(node, questionType, found);
            }));
        }
        if (rootNode instanceof LeafNode) {
            /** @type {?} */
            const questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    }
    /**
     * @private
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    findNodesByQuestionId(rootNode, questionId, results) {
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            node => {
                this.findNodesByQuestionId(node, questionId, results);
            }));
        }
    }
    /**
     * @return {?}
     */
    get valid() {
        return this.rootNode.control.valid;
    }
    /**
     * @param {?} show
     * @return {?}
     */
    set showErrors(show) {
        this._showErrors = show;
    }
    /**
     * @return {?}
     */
    get showErrors() {
        return this._showErrors;
    }
    /**
     * @param {?} node
     * @param {?=} invalidControlNodes
     * @return {?}
     */
    markInvalidControls(node, invalidControlNodes) {
        /** @type {?} */
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                const child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    /** @type {?} */
                    const questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        /** @type {?} */
                        const c = (/** @type {?} */ (child.control));
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    /** @type {?} */
                    const arrayNode = (/** @type {?} */ (child));
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, (/**
                         * @param {?} groupNode
                         * @return {?}
                         */
                        (groupNode) => {
                            this.markInvalidControls(groupNode, invalidControlNodes);
                        }));
                    }
                }
            }
        }
        return invalidControlNodes;
    }
    /**
     * @return {?}
     */
    updateHiddenDisabledStateForAllControls() {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    }
    /**
     * @return {?}
     */
    updateAlertsForAllControls() {
        this._updateAlertsForAllControls(this.rootNode);
    }
    /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    _updateAlertsForAllControls(rootNode) {
        if (rootNode.control) {
            if (((/** @type {?} */ (rootNode.control))).updateAlert) {
                ((/** @type {?} */ (rootNode.control))).updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            node => {
                this._updateAlertsForAllControls(node);
            }));
        }
    }
    /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    _updateHiddenDisabledStateForAllControls(rootNode) {
        if (rootNode.control) {
            if (((/** @type {?} */ (rootNode.control))).updateDisabledState) {
                ((/** @type {?} */ (rootNode.control))).updateDisabledState();
            }
            if (((/** @type {?} */ (rootNode.control))).updateHiddenState) {
                ((/** @type {?} */ (rootNode.control))).updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            const nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            const nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            node => {
                this._updateHiddenDisabledStateForAllControls(node);
            }));
        }
    }
}
if (false) {
    /** @type {?} */
    Form.prototype.rootNode;
    /** @type {?} */
    Form.prototype.valueProcessingInfo;
    /** @type {?} */
    Form.prototype.existingOrders;
    /**
     * @type {?}
     * @private
     */
    Form.prototype._dataSourcesContainer;
    /**
     * @type {?}
     * @private
     */
    Form.prototype._showErrors;
    /** @type {?} */
    Form.prototype.schema;
    /** @type {?} */
    Form.prototype.formFactory;
    /** @type {?} */
    Form.prototype.questionFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkUsTUFBTTs7Ozs7O0lBTUosWUFBbUIsTUFBVyxFQUFTLFdBQXdCLEVBQVMsZUFBZ0M7UUFBckYsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSmpHLHdCQUFtQixHQUFRLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUUxQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsSUFBSSxvQkFBb0I7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsSUFBZSxFQUFFLElBQUksRUFBRSxLQUFzQjs7Y0FFdEQsUUFBUSxHQUFhLElBQUksQ0FBQyxRQUFRO1FBRXhDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O3NCQUUzQixLQUFLLEdBQWEsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFFckMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZ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QVEsQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxtQkFBQSxRQUFRLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7O2tCQUM1QixXQUFXLEdBQUcsbUJBQUEsUUFBUSxFQUFhO1lBQ3pDLGlDQUFpQztZQUNqQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDOztrQkFDNUIsV0FBVyxHQUFHLG1CQUFBLFFBQVEsRUFBYTtZQUV6QyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7Q0FDRjs7O0lBN09DLHdCQUEyQjs7SUFDM0IsbUNBQXFDOztJQUNuQyw4QkFBZ0M7Ozs7O0lBQ2xDLHFDQUEyQzs7Ozs7SUFDM0MsMkJBQTRCOztJQUNoQixzQkFBa0I7O0lBQUUsMkJBQStCOztJQUFFLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG4gIHB1YmxpYyByb290Tm9kZTogR3JvdXBOb2RlO1xyXG4gIHB1YmxpYyB2YWx1ZVByb2Nlc3NpbmdJbmZvOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyBleGlzdGluZ09yZGVyczogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXNDb250YWluZXI6IERhdGFTb3VyY2VzO1xyXG4gIHByaXZhdGUgX3Nob3dFcnJvcnMgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NoZW1hOiBhbnksIHB1YmxpYyBmb3JtRmFjdG9yeTogRm9ybUZhY3RvcnksIHB1YmxpYyBxdWVzdGlvbkZhY3Rvcnk6IFF1ZXN0aW9uRmFjdG9yeSkge1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXIgPSBuZXcgRGF0YVNvdXJjZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhU291cmNlc0NvbnRhaW5lcigpOiBEYXRhU291cmNlcyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlQYXRoKG5vZGU6IEdyb3VwTm9kZSwgcGF0aCwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGNoaWxkLCBwYXRoLCBmb3VuZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBhQ2hpbGQ6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgICAgICBhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaChhQ2hpbGROb2RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGFDaGlsZE5vZGUsIHBhdGgsIGZvdW5kKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQocXVlc3Rpb25JZDogc3RyaW5nLCBxdWVzdGlvblR5cGU/OiBzdHJpbmcpOiBBcnJheTxOb2RlQmFzZT4ge1xyXG4gICAgY29uc3QgZm91bmQgPSBbXTtcclxuICAgIGlmIChxdWVzdGlvblR5cGUpIHtcclxuICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZCh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvbklkLCBmb3VuZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUocm9vdE5vZGU6IGFueSwgcXVlc3Rpb25UeXBlOiBzdHJpbmcgLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSByb290Tm9kZS5xdWVzdGlvbjtcclxuXHJcbiAgICAgIGlmIChxdWVzdGlvbkJhc2UuZXh0cmFzICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgPT09IHF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgIGZvdW5kLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmROb2Rlc0J5UXVlc3Rpb25JZChyb290Tm9kZTogTm9kZUJhc2UsIHF1ZXN0aW9uSWQ6IHN0cmluZyxcclxuICAgIHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPikge1xyXG4gICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmtleSA9PT0gcXVlc3Rpb25JZCkge1xyXG4gICAgICByZXN1bHRzLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBnZXQgdmFsaWQoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuY29udHJvbC52YWxpZDtcclxuICB9XHJcblxyXG4gIHNldCBzaG93RXJyb3JzKHNob3c6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dFcnJvcnMgPSBzaG93O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dFcnJvcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0Vycm9ycztcclxuICB9XHJcblxyXG4gIG1hcmtJbnZhbGlkQ29udHJvbHMobm9kZTogR3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzPzogYW55KSB7XHJcblxyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhjaGlsZCwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjLnZhbGlkICYmICFjLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGludmFsaWRDb250cm9sTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGludmFsaWRDb250cm9sTm9kZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgICAgIGlmIChhcnJheU5vZGUgJiYgYXJyYXlOb2RlLmNoaWxkcmVuICYmIGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyYXlOb2RlLmNoaWxkcmVuLCAoZ3JvdXBOb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoZ3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGludmFsaWRDb250cm9sTm9kZXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XHJcblxyXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHByaXZhdGUgX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcclxuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XHJcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=