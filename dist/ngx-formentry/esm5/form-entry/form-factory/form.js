/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from 'lodash';
import { DataSources } from '../data-sources/data-sources';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
var Form = /** @class */ (function () {
    function Form(schema, formFactory, questionFactory) {
        this.schema = schema;
        this.formFactory = formFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    Object.defineProperty(Form.prototype, "dataSourcesContainer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataSourcesContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @param {?} path
     * @param {?} found
     * @return {?}
     */
    Form.prototype.searchNodeByPath = /**
     * @param {?} node
     * @param {?} path
     * @param {?} found
     * @return {?}
     */
    function (node, path, found) {
        var _this = this;
        var /** @type {?} */ children = node.children;
        for (var /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                var /** @type {?} */ child = children[key];
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
                    var /** @type {?} */ aChild = /** @type {?} */ (child);
                    aChild.children.forEach(function (aChildNode) {
                        _this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    };
    /**
     * @param {?} questionId
     * @param {?=} questionType
     * @return {?}
     */
    Form.prototype.searchNodeByQuestionId = /**
     * @param {?} questionId
     * @param {?=} questionType
     * @return {?}
     */
    function (questionId, questionType) {
        var /** @type {?} */ found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    };
    /**
     * @param {?} rootNode
     * @param {?} questionType
     * @param {?} found
     * @return {?}
     */
    Form.prototype.searchNodeByQuestionType = /**
     * @param {?} rootNode
     * @param {?} questionType
     * @param {?} found
     * @return {?}
     */
    function (rootNode, questionType, found) {
        var _this = this;
        if (rootNode instanceof GroupNode) {
            var /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(function (node) {
                _this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            var /** @type {?} */ questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    };
    /**
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    Form.prototype.findNodesByQuestionId = /**
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    function (rootNode, questionId, results) {
        var _this = this;
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(function (node) {
                _this.findNodesByQuestionId(node, questionId, results);
            });
        }
    };
    Object.defineProperty(Form.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rootNode.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "showErrors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showErrors;
        },
        set: /**
         * @param {?} show
         * @return {?}
         */
        function (show) {
            this._showErrors = show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @param {?=} invalidControlNodes
     * @return {?}
     */
    Form.prototype.markInvalidControls = /**
     * @param {?} node
     * @param {?=} invalidControlNodes
     * @return {?}
     */
    function (node, invalidControlNodes) {
        var _this = this;
        var /** @type {?} */ children = node.children;
        for (var /** @type {?} */ key in children) {
            if (children.hasOwnProperty(key)) {
                var /** @type {?} */ child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    var /** @type {?} */ questionBase = (/** @type {?} */ (child)).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        var /** @type {?} */ c = /** @type {?} */ (child.control);
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    var /** @type {?} */ arrayNode = /** @type {?} */ (child);
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, function (groupNode) {
                            _this.markInvalidControls(groupNode, invalidControlNodes);
                        });
                    }
                }
            }
        }
        return invalidControlNodes;
    };
    /**
     * @return {?}
     */
    Form.prototype.updateHiddenDisabledStateForAllControls = /**
     * @return {?}
     */
    function () {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    };
    /**
     * @return {?}
     */
    Form.prototype.updateAlertsForAllControls = /**
     * @return {?}
     */
    function () {
        this._updateAlertsForAllControls(this.rootNode);
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateAlertsForAllControls = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if ((/** @type {?} */ (rootNode.control)).updateAlert) {
                (/** @type {?} */ (rootNode.control)).updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            var /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(function (node) {
                _this._updateAlertsForAllControls(node);
            });
        }
    };
    /**
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateHiddenDisabledStateForAllControls = /**
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if ((/** @type {?} */ (rootNode.control)).updateDisabledState) {
                (/** @type {?} */ (rootNode.control)).updateDisabledState();
            }
            if ((/** @type {?} */ (rootNode.control)).updateHiddenState) {
                (/** @type {?} */ (rootNode.control)).updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            var /** @type {?} */ nodeAsGroup = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (var /** @type {?} */ o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var /** @type {?} */ nodeAsArray = /** @type {?} */ (rootNode);
            nodeAsArray.children.forEach(function (node) {
                _this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    };
    return Form;
}());
export { Form };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkUsSUFBQTtJQU1FLGNBQW1CLE1BQVcsRUFBUyxXQUF3QixFQUFTLGVBQWdDO1FBQXJGLFdBQU0sR0FBTixNQUFNLENBQUs7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjttQ0FKdEUsRUFBRTs4QkFDTCxFQUFFOzJCQUVYLEtBQUs7UUFFekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7S0FDaEQ7SUFFRCxzQkFBSSxzQ0FBb0I7Ozs7UUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ25DOzs7T0FBQTs7Ozs7OztJQUVELCtCQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLElBQWUsRUFBRSxJQUFJLEVBQUUsS0FBc0I7UUFBOUQsaUJBeUNDO1FBdkNDLHFCQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqQyxxQkFBTSxLQUFLLEdBQWEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUV0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksU0FB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QUFDOztZQUUxQyxHQUFHLENBQUMsQ0FBQyxxQkFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEU7U0FDRjtRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLHFCQUFNLFdBQVcscUJBQUcsUUFBcUIsQ0FBQSxDQUFDO1lBRTFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDL0IsS0FBSSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JELENBQUMsQ0FBQztTQUNKOztlQXRQTDtJQXdQQyxDQUFBO0FBOU9ELGdCQThPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xyXG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm0ge1xyXG4gIHB1YmxpYyByb290Tm9kZTogR3JvdXBOb2RlO1xyXG4gIHB1YmxpYyB2YWx1ZVByb2Nlc3NpbmdJbmZvOiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyBleGlzdGluZ09yZGVyczogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXNDb250YWluZXI6IERhdGFTb3VyY2VzO1xyXG4gIHByaXZhdGUgX3Nob3dFcnJvcnMgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NoZW1hOiBhbnksIHB1YmxpYyBmb3JtRmFjdG9yeTogRm9ybUZhY3RvcnksIHB1YmxpYyBxdWVzdGlvbkZhY3Rvcnk6IFF1ZXN0aW9uRmFjdG9yeSkge1xyXG4gICAgdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXIgPSBuZXcgRGF0YVNvdXJjZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhU291cmNlc0NvbnRhaW5lcigpOiBEYXRhU291cmNlcyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlQYXRoKG5vZGU6IEdyb3VwTm9kZSwgcGF0aCwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGNoaWxkLCBwYXRoLCBmb3VuZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcclxuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBhQ2hpbGQ6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgICAgICBhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaChhQ2hpbGROb2RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGFDaGlsZE5vZGUsIHBhdGgsIGZvdW5kKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9XHJcblxyXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQocXVlc3Rpb25JZDogc3RyaW5nLCBxdWVzdGlvblR5cGU/OiBzdHJpbmcpOiBBcnJheTxOb2RlQmFzZT4ge1xyXG4gICAgY29uc3QgZm91bmQgPSBbXTtcclxuICAgIGlmIChxdWVzdGlvblR5cGUpIHtcclxuICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZCh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvbklkLCBmb3VuZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUocm9vdE5vZGU6IGFueSwgcXVlc3Rpb25UeXBlOiBzdHJpbmcgLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcclxuICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSByb290Tm9kZS5xdWVzdGlvbjtcclxuXHJcbiAgICAgIGlmIChxdWVzdGlvbkJhc2UuZXh0cmFzICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgPT09IHF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgIGZvdW5kLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmROb2Rlc0J5UXVlc3Rpb25JZChyb290Tm9kZTogTm9kZUJhc2UsIHF1ZXN0aW9uSWQ6IHN0cmluZyxcclxuICAgIHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPikge1xyXG4gICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmtleSA9PT0gcXVlc3Rpb25JZCkge1xyXG4gICAgICByZXN1bHRzLnB1c2gocm9vdE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBnZXQgdmFsaWQoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuY29udHJvbC52YWxpZDtcclxuICB9XHJcblxyXG4gIHNldCBzaG93RXJyb3JzKHNob3c6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dFcnJvcnMgPSBzaG93O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNob3dFcnJvcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0Vycm9ycztcclxuICB9XHJcblxyXG4gIG1hcmtJbnZhbGlkQ29udHJvbHMobm9kZTogR3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzPzogYW55KSB7XHJcblxyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcclxuXHJcbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XHJcblxyXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG5cclxuICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhjaGlsZCwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcblxyXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjLnZhbGlkICYmICFjLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGludmFsaWRDb250cm9sTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGludmFsaWRDb250cm9sTm9kZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgICAgIGlmIChhcnJheU5vZGUgJiYgYXJyYXlOb2RlLmNoaWxkcmVuICYmIGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyYXlOb2RlLmNoaWxkcmVuLCAoZ3JvdXBOb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoZ3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGludmFsaWRDb250cm9sTm9kZXM7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xyXG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XHJcblxyXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHByaXZhdGUgX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcclxuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XHJcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcclxuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=