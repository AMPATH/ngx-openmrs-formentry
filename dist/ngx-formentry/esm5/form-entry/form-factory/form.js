/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                var child = children[key];
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
                    var aChild = (/** @type {?} */ (child));
                    aChild.children.forEach((/**
                     * @param {?} aChildNode
                     * @return {?}
                     */
                    function (aChildNode) {
                        _this.searchNodeByPath(aChildNode, path, found);
                    }));
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
        /** @type {?} */
        var found = [];
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
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this.searchNodeByQuestionType(node, questionType, found);
            }));
        }
        if (rootNode instanceof LeafNode) {
            /** @type {?} */
            var questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    };
    /**
     * @private
     * @param {?} rootNode
     * @param {?} questionId
     * @param {?} results
     * @return {?}
     */
    Form.prototype.findNodesByQuestionId = /**
     * @private
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
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this.findNodesByQuestionId(node, questionId, results);
            }));
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
        /** @type {?} */
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                /** @type {?} */
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    /** @type {?} */
                    var questionBase = ((/** @type {?} */ (child))).question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        /** @type {?} */
                        var c = (/** @type {?} */ (child.control));
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
                    var arrayNode = (/** @type {?} */ (child));
                    if (arrayNode && arrayNode.children && arrayNode.children.length > 0) {
                        _.forEach(arrayNode.children, (/**
                         * @param {?} groupNode
                         * @return {?}
                         */
                        function (groupNode) {
                            _this.markInvalidControls(groupNode, invalidControlNodes);
                        }));
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
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateAlertsForAllControls = /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (((/** @type {?} */ (rootNode.control))).updateAlert) {
                ((/** @type {?} */ (rootNode.control))).updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            /** @type {?} */
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this._updateAlertsForAllControls(node);
            }));
        }
    };
    /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    Form.prototype._updateHiddenDisabledStateForAllControls = /**
     * @private
     * @param {?} rootNode
     * @return {?}
     */
    function (rootNode) {
        var _this = this;
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
            var nodeAsGroup = (/** @type {?} */ (rootNode));
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            /** @type {?} */
            var nodeAsArray = (/** @type {?} */ (rootNode));
            nodeAsArray.children.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this._updateHiddenDisabledStateForAllControls(node);
            }));
        }
    };
    return Form;
}());
export { Form };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkU7SUFNRSxjQUFtQixNQUFXLEVBQVMsV0FBd0IsRUFBUyxlQUFnQztRQUFyRixXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKakcsd0JBQW1CLEdBQVEsRUFBRSxDQUFDO1FBQzVCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRTFCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQkFBSSxzQ0FBb0I7Ozs7UUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3BDLENBQUM7OztPQUFBOzs7Ozs7O0lBRUQsK0JBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsSUFBZSxFQUFFLElBQUksRUFBRSxLQUFzQjtRQUE5RCxpQkF5Q0M7O1lBdkNPLFFBQVEsR0FBYSxJQUFJLENBQUMsUUFBUTtRQUV4QyxHQUFHLENBQUMsQ0FBQyxJQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFFM0IsS0FBSyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JB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LDJCQUErQjs7SUFBRSwrQkFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xuXG5leHBvcnQgY2xhc3MgRm9ybSB7XG4gIHB1YmxpYyByb290Tm9kZTogR3JvdXBOb2RlO1xuICBwdWJsaWMgdmFsdWVQcm9jZXNzaW5nSW5mbzogYW55ID0ge307XG4gICAgcHVibGljIGV4aXN0aW5nT3JkZXJzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXNDb250YWluZXI6IERhdGFTb3VyY2VzO1xuICBwcml2YXRlIF9zaG93RXJyb3JzID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzY2hlbWE6IGFueSwgcHVibGljIGZvcm1GYWN0b3J5OiBGb3JtRmFjdG9yeSwgcHVibGljIHF1ZXN0aW9uRmFjdG9yeTogUXVlc3Rpb25GYWN0b3J5KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXIgPSBuZXcgRGF0YVNvdXJjZXMoKTtcbiAgfVxuXG4gIGdldCBkYXRhU291cmNlc0NvbnRhaW5lcigpOiBEYXRhU291cmNlcyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzQ29udGFpbmVyO1xuICB9XG5cbiAgc2VhcmNoTm9kZUJ5UGF0aChub2RlOiBHcm91cE5vZGUsIHBhdGgsIGZvdW5kOiBBcnJheTxOb2RlQmFzZT4pIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGNoaWxkLCBwYXRoLCBmb3VuZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGFDaGlsZDogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgICAgYUNoaWxkLmNoaWxkcmVuLmZvckVhY2goYUNoaWxkTm9kZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVBhdGgoYUNoaWxkTm9kZSwgcGF0aCwgZm91bmQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChxdWVzdGlvbklkOiBzdHJpbmcsIHF1ZXN0aW9uVHlwZT86IHN0cmluZyk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgY29uc3QgZm91bmQgPSBbXTtcbiAgICBpZiAocXVlc3Rpb25UeXBlKSB7XG4gICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZSh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25JZCwgZm91bmQpO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUocm9vdE5vZGU6IGFueSwgcXVlc3Rpb25UeXBlOiBzdHJpbmcgLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKG5vZGUsIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gcm9vdE5vZGUucXVlc3Rpb247XG5cbiAgICAgIGlmIChxdWVzdGlvbkJhc2UuZXh0cmFzICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgPT09IHF1ZXN0aW9uVHlwZSkge1xuICAgICAgICBmb3VuZC5wdXNoKHJvb3ROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmROb2Rlc0J5UXVlc3Rpb25JZChyb290Tm9kZTogTm9kZUJhc2UsIHF1ZXN0aW9uSWQ6IHN0cmluZyxcbiAgICByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICBpZiAocm9vdE5vZGUucXVlc3Rpb24ua2V5ID09PSBxdWVzdGlvbklkKSB7XG4gICAgICByZXN1bHRzLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZChub2RlQXNHcm91cC5jaGlsZHJlbltvXSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG5cbiAgZ2V0IHZhbGlkKCkge1xuXG4gICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHNldCBzaG93RXJyb3JzKHNob3c6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93RXJyb3JzID0gc2hvdztcbiAgfVxuXG4gIGdldCBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLl9zaG93RXJyb3JzO1xuICB9XG5cbiAgbWFya0ludmFsaWRDb250cm9scyhub2RlOiBHcm91cE5vZGUsIGludmFsaWRDb250cm9sTm9kZXM/OiBhbnkpIHtcblxuXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG5cbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcblxuICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhjaGlsZCwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGM6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcblxuICAgICAgICAgICAgaWYgKCFjLnZhbGlkICYmICFjLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIGlmIChpbnZhbGlkQ29udHJvbE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaW52YWxpZENvbnRyb2xOb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgICAgaWYgKGFycmF5Tm9kZSAmJiBhcnJheU5vZGUuY2hpbGRyZW4gJiYgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgXy5mb3JFYWNoKGFycmF5Tm9kZS5jaGlsZHJlbiwgKGdyb3VwTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhncm91cE5vZGUsIGludmFsaWRDb250cm9sTm9kZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGludmFsaWRDb250cm9sTm9kZXM7XG4gIH1cblxuICB1cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKSB7XG4gICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKHRoaXMucm9vdE5vZGUpO1xuICB9XG5cblxuICB1cGRhdGVBbGVydHNGb3JBbGxDb250cm9scygpIHtcbiAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG4gIHByaXZhdGUgX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAocm9vdE5vZGUuY29udHJvbCkge1xuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19