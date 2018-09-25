/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ children = node.children;
        for (const /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                const /** @type {?} */ child = children[key];
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
                    const /** @type {?} */ aChild = /** @type {?} */ (child);
                    aChild.children.forEach(aChildNode => {
                        this.searchNodeByPath(aChildNode, path, found);
                    });
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
        const /** @type {?} */ found = [];
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
            const /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(node => {
                this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            const /** @type {?} */ questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    }
    /**
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
            const /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(node => {
                this.findNodesByQuestionId(node, questionId, results);
            });
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
        const /** @type {?} */ children = node.children;
        for (const /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                const /** @type {?} */ child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    const /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        const /** @type {?} */ c = /** @type {?} */ (child.control);
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    const /** @type {?} */ arrayNode = /** @type {?} */ (child);
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, (groupNode) => {
                            this.markInvalidControls(groupNode, invalidControlNodes);
                        });
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
     * @param {?} rootNode
     * @return {?}
     */
    _updateAlertsForAllControls(rootNode) {
        if (rootNode.control) {
            if ((/** @type {?} */ (rootNode.control)).updateAlert) {
                (/** @type {?} */ (rootNode.control)).updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            const /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(node => {
                this._updateAlertsForAllControls(node);
            });
        }
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    _updateHiddenDisabledStateForAllControls(rootNode) {
        if (rootNode.control) {
            if ((/** @type {?} */ (rootNode.control)).updateDisabledState) {
                (/** @type {?} */ (rootNode.control)).updateDisabledState();
            }
            if ((/** @type {?} */ (rootNode.control)).updateHiddenState) {
                (/** @type {?} */ (rootNode.control)).updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            const /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(node => {
                this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    }
}
function Form_tsickle_Closure_declarations() {
    /** @type {?} */
    Form.prototype.rootNode;
    /** @type {?} */
    Form.prototype.valueProcessingInfo;
    /** @type {?} */
    Form.prototype.existingOrders;
    /** @type {?} */
    Form.prototype._dataSourcesContainer;
    /** @type {?} */
    Form.prototype._showErrors;
    /** @type {?} */
    Form.prototype.schema;
    /** @type {?} */
    Form.prototype.formFactory;
    /** @type {?} */
    Form.prototype.questionFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkUsTUFBTTs7Ozs7O0lBTUosWUFBbUIsTUFBVyxFQUFTLFdBQXdCLEVBQVMsZUFBZ0M7UUFBckYsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO21DQUp0RSxFQUFFOzhCQUNMLEVBQUU7MkJBRVgsS0FBSztRQUV6QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztLQUNoRDs7OztJQUVELElBQUksb0JBQW9CO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7S0FDbkM7Ozs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFlLEVBQUUsSUFBSSxFQUFFLEtBQXNCO1FBRTVELHVCQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqQyx1QkFBTSxLQUFLLEdBQWEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUV0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFFL0IsRUFBRSxDQUFD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QyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNGO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsdUJBQU0sV0FBVyxxQkFBRyxRQUFxQixDQUFBLENBQUM7WUFFMUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRCxDQUFDLENBQUM7U0FDSjs7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG4gIHB1YmxpYyByb290Tm9kZTogR3JvdXBOb2RlO1xyXG4gIHB1YmxpYyB2YWx1ZVByb2Nlc3NpbmdJbmZvOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyBleGlzdGluZ09yZGVyczogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXNDb250YWluZXI6IERhdGFTb3VyY2VzO1xyXG4gIHByaXZhdGUgX3Nob3dFcnJvcnMgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NoZW1hOiBhbnksIHB1YmxpYyBmb3JtRmFjdG9yeTogRm9ybUZhY3RvcnksIHB1YmxpYyBxdWVzdGlvbkZhY3Rvcnk6IFF1ZXN0aW9uRmFjdG9yeSkge1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXIgPSBuZXcgRGF0YVNvdXJjZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhU291cmNlc0NvbnRhaW5lcigpOiBEYXRhU291cmNlcyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlQYXRoKG5vZGU6IEdyb3VwTm9kZSwgcGF0aCwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGNoaWxkLCBwYXRoLCBmb3VuZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBhQ2hpbGQ6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgICAgICBhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaChhQ2hpbGROb2RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGFDaGlsZE5vZGUsIHBhdGgsIGZvdW5kKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQocXVlc3Rpb25JZDogc3RyaW5nLCBxdWVzdGlvblR5cGU/OiBzdHJpbmcpOiBBcnJheTxOb2RlQmFzZT4ge1xyXG4gICAgY29uc3QgZm91bmQgPSBbXTtcclxuICAgIGlmIChxdWVzdGlvblR5cGUpIHtcclxuICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZCh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvbklkLCBmb3VuZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUocm9vdE5vZGU6IGFueSwgcXVlc3Rpb25UeXBlOiBzdHJpbmcgLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSByb290Tm9kZS5xdWVzdGlvbjtcclxuXHJcbiAgICAgIGlmIChxdWVzdGlvbkJhc2UuZXh0cmFzICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgPT09IHF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgIGZvdW5kLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmROb2Rlc0J5UXVlc3Rpb25JZChyb290Tm9kZTogTm9kZUJhc2UsIHF1ZXN0aW9uSWQ6IHN0cmluZyxcclxuICAgIHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPikge1xyXG4gICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmtleSA9PT0gcXVlc3Rpb25JZCkge1xyXG4gICAgICByZXN1bHRzLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBnZXQgdmFsaWQoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuY29udHJvbC52YWxpZDtcclxuICB9XHJcblxyXG4gIHNldCBzaG93RXJyb3JzKHNob3c6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dFcnJvcnMgPSBzaG93O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dFcnJvcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0Vycm9ycztcclxuICB9XHJcblxyXG4gIG1hcmtJbnZhbGlkQ29udHJvbHMobm9kZTogR3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzPzogYW55KSB7XHJcblxyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhjaGlsZCwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjLnZhbGlkICYmICFjLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGludmFsaWRDb250cm9sTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGludmFsaWRDb250cm9sTm9kZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgICAgIGlmIChhcnJheU5vZGUgJiYgYXJyYXlOb2RlLmNoaWxkcmVuICYmIGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyYXlOb2RlLmNoaWxkcmVuLCAoZ3JvdXBOb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoZ3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGludmFsaWRDb250cm9sTm9kZXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XHJcblxyXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHByaXZhdGUgX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcclxuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XHJcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=