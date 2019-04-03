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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQVksU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLdkU7SUFNRSxjQUFtQixNQUFXLEVBQVMsV0FBd0IsRUFBUyxlQUFnQztRQUFyRixXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKakcsd0JBQW1CLEdBQVEsRUFBRSxDQUFDO1FBQzVCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRTFCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQkFBSSxzQ0FBb0I7Ozs7UUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3BDLENBQUM7OztPQUFBOzs7Ozs7O0lBRUQsK0JBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsSUFBZSxFQUFFLElBQUksRUFBRSxLQUFzQjtRQUE5RCxpQkF5Q0M7O1lBdkNPLFFBQVEsR0FBYSxJQUFJLENBQUMsUUFBUTtRQUV4QyxHQUFHLENBQUMsQ0FBQyxJQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFFM0IsS0FBSyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JB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LDJCQUErQjs7SUFBRSwrQkFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcclxuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdWVzdGlvbi5mYWN0b3J5JztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcclxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcclxuaW1wb3J0IHsgQWZlRm9ybUFycmF5IH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWFycmF5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIHtcclxuICBwdWJsaWMgcm9vdE5vZGU6IEdyb3VwTm9kZTtcclxuICBwdWJsaWMgdmFsdWVQcm9jZXNzaW5nSW5mbzogYW55ID0ge307XHJcbiAgICBwdWJsaWMgZXhpc3RpbmdPcmRlcnM6IGFueSA9IHt9O1xyXG4gIHByaXZhdGUgX2RhdGFTb3VyY2VzQ29udGFpbmVyOiBEYXRhU291cmNlcztcclxuICBwcml2YXRlIF9zaG93RXJyb3JzID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHNjaGVtYTogYW55LCBwdWJsaWMgZm9ybUZhY3Rvcnk6IEZvcm1GYWN0b3J5LCBwdWJsaWMgcXVlc3Rpb25GYWN0b3J5OiBRdWVzdGlvbkZhY3RvcnkpIHtcclxuICAgIHRoaXMuX2RhdGFTb3VyY2VzQ29udGFpbmVyID0gbmV3IERhdGFTb3VyY2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0YVNvdXJjZXNDb250YWluZXIoKTogRGF0YVNvdXJjZXMge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzQ29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoTm9kZUJ5UGF0aChub2RlOiBHcm91cE5vZGUsIHBhdGgsIGZvdW5kOiBBcnJheTxOb2RlQmFzZT4pIHtcclxuXHJcbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XHJcblxyXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xyXG4gICAgICAgICAgICBmb3VuZC5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UGF0aChjaGlsZCwgcGF0aCwgZm91bmQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xyXG5cclxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG5cclxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgYUNoaWxkOiBBcnJheU5vZGUgPSBjaGlsZCBhcyBBcnJheU5vZGU7XHJcblxyXG4gICAgICAgICAgYUNoaWxkLmNoaWxkcmVuLmZvckVhY2goYUNoaWxkTm9kZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UGF0aChhQ2hpbGROb2RlLCBwYXRoLCBmb3VuZCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hOb2RlQnlRdWVzdGlvbklkKHF1ZXN0aW9uSWQ6IHN0cmluZywgcXVlc3Rpb25UeXBlPzogc3RyaW5nKTogQXJyYXk8Tm9kZUJhc2U+IHtcclxuICAgIGNvbnN0IGZvdW5kID0gW107XHJcbiAgICBpZiAocXVlc3Rpb25UeXBlKSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKHRoaXMucm9vdE5vZGUsIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25JZCwgZm91bmQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKHJvb3ROb2RlOiBhbnksIHF1ZXN0aW9uVHlwZTogc3RyaW5nICwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gcm9vdE5vZGUucXVlc3Rpb247XHJcblxyXG4gICAgICBpZiAocXVlc3Rpb25CYXNlLmV4dHJhcyAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgJiYgcXVlc3Rpb25CYXNlLmV4dHJhcy50eXBlID09PSBxdWVzdGlvblR5cGUpIHtcclxuICAgICAgICBmb3VuZC5wdXNoKHJvb3ROb2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kTm9kZXNCeVF1ZXN0aW9uSWQocm9vdE5vZGU6IE5vZGVCYXNlLCBxdWVzdGlvbklkOiBzdHJpbmcsXHJcbiAgICByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4pIHtcclxuICAgIGlmIChyb290Tm9kZS5xdWVzdGlvbi5rZXkgPT09IHF1ZXN0aW9uSWQpIHtcclxuICAgICAgcmVzdWx0cy5wdXNoKHJvb3ROb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcclxuICAgICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZChub2RlQXNHcm91cC5jaGlsZHJlbltvXSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XHJcblxyXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGUsIHF1ZXN0aW9uSWQsIHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuXHJcbiAgZ2V0IHZhbGlkKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJvb3ROb2RlLmNvbnRyb2wudmFsaWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgc2hvd0Vycm9ycyhzaG93OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93RXJyb3JzID0gc2hvdztcclxuICB9XHJcblxyXG4gIGdldCBzaG93RXJyb3JzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dFcnJvcnM7XHJcbiAgfVxyXG5cclxuICBtYXJrSW52YWxpZENvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcz86IGFueSkge1xyXG5cclxuXHJcbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XHJcblxyXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcclxuXHJcbiAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoY2hpbGQsIGludmFsaWRDb250cm9sTm9kZXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xyXG5cclxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGM6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYy52YWxpZCAmJiAhYy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgIGlmIChpbnZhbGlkQ29udHJvbE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ29udHJvbE5vZGVzLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYy5tYXJrQXNUb3VjaGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBhcnJheU5vZGU6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgICAgICBpZiAoYXJyYXlOb2RlICYmIGFycmF5Tm9kZS5jaGlsZHJlbiAmJiBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgXy5mb3JFYWNoKGFycmF5Tm9kZS5jaGlsZHJlbiwgKGdyb3VwTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYXJrSW52YWxpZENvbnRyb2xzKGdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbnZhbGlkQ29udHJvbE5vZGVzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKHRoaXMucm9vdE5vZGUpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcclxuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XHJcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XHJcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xyXG5cclxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICBwcml2YXRlIF91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMocm9vdE5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICBpZiAocm9vdE5vZGUuY29udHJvbCkge1xyXG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XHJcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XHJcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcclxuXHJcbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKG5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19