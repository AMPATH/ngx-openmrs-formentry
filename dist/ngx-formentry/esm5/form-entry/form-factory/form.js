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
        get: function () {
            return this._dataSourcesContainer;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.searchNodeByPath = function (node, path, found) {
        var _this = this;
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
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
                    var aChild = child;
                    aChild.children.forEach(function (aChildNode) {
                        _this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    };
    Form.prototype.searchNodeByQuestionId = function (questionId, questionType) {
        var found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    };
    Form.prototype.searchNodeByQuestionType = function (rootNode, questionType, found) {
        var _this = this;
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            var questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    };
    Form.prototype.findNodesByQuestionId = function (rootNode, questionId, results) {
        var _this = this;
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this.findNodesByQuestionId(node, questionId, results);
            });
        }
    };
    Object.defineProperty(Form.prototype, "valid", {
        get: function () {
            return this.rootNode.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "showErrors", {
        get: function () {
            return this._showErrors;
        },
        set: function (show) {
            this._showErrors = show;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.markInvalidControls = function (node, invalidControlNodes) {
        var _this = this;
        var children = node.children;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                var child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    var questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        var c = child.control;
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    var arrayNode = child;
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
    Form.prototype.updateHiddenDisabledStateForAllControls = function () {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    };
    Form.prototype.updateAlertsForAllControls = function () {
        this._updateAlertsForAllControls(this.rootNode);
    };
    Form.prototype._updateAlertsForAllControls = function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (rootNode.control.updateAlert) {
                rootNode.control.updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this._updateAlertsForAllControls(node);
            });
        }
    };
    Form.prototype._updateHiddenDisabledStateForAllControls = function (rootNode) {
        var _this = this;
        if (rootNode.control) {
            if (rootNode.control.updateDisabledState) {
                rootNode.control.updateDisabledState();
            }
            if (rootNode.control.updateHiddenState) {
                rootNode.control.updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            var nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (var o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            var nodeAsArray = rootNode;
            nodeAsArray.children.forEach(function (node) {
                _this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    };
    return Form;
}());
export { Form };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUk1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS3ZFO0lBTUUsY0FBbUIsTUFBVyxFQUFTLFdBQXdCLEVBQVMsZUFBZ0M7UUFBckYsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSmpHLHdCQUFtQixHQUFRLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUUxQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0JBQUksc0NBQW9CO2FBQXhCO1lBQ0UsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCwrQkFBZ0IsR0FBaEIsVUFBaUIsSUFBZSxFQUFFLElBQUksRUFBRSxLQUFzQjtRQUE5RCxpQkF5Q0M7UUF2Q0MsSUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QyxLQUFLLElBQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUUxQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBRWhDLElBQU0sS0FBSyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxLQUFLLFlBQVksU0FBUyxFQUFFO29C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QUUsQ0FBQzthQUMvQztTQUNGO1FBRUQsSUFBSSxRQUFRLFlBQVksU0FBUyxFQUFFO1lBQ2pDLElBQU0sV0FBVyxHQUFHLFFBQXFCLENBQUM7WUFDMUMsaUNBQWlDO1lBQ2pDLEtBQUssSUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNGO1FBRUQsSUFBSSxRQUFRLFlBQVksU0FBUyxFQUFFO1lBQ2pDLElBQU0sV0FBVyxHQUFHLFFBQXFCLENBQUM7WUFFMUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUMvQixLQUFJLENBQUMsd0NBQXdDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQTlPRCxJQThPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBRdWVzdGlvbkZhY3RvcnkgfSBmcm9tICcuL3F1ZXN0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IE5vZGVCYXNlLCBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUgfSBmcm9tICcuL2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IEFmZUZvcm1BcnJheSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1hcnJheSc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtIHtcbiAgcHVibGljIHJvb3ROb2RlOiBHcm91cE5vZGU7XG4gIHB1YmxpYyB2YWx1ZVByb2Nlc3NpbmdJbmZvOiBhbnkgPSB7fTtcbiAgICBwdWJsaWMgZXhpc3RpbmdPcmRlcnM6IGFueSA9IHt9O1xuICBwcml2YXRlIF9kYXRhU291cmNlc0NvbnRhaW5lcjogRGF0YVNvdXJjZXM7XG4gIHByaXZhdGUgX3Nob3dFcnJvcnMgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHVibGljIHNjaGVtYTogYW55LCBwdWJsaWMgZm9ybUZhY3Rvcnk6IEZvcm1GYWN0b3J5LCBwdWJsaWMgcXVlc3Rpb25GYWN0b3J5OiBRdWVzdGlvbkZhY3RvcnkpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlc0NvbnRhaW5lciA9IG5ldyBEYXRhU291cmNlcygpO1xuICB9XG5cbiAgZ2V0IGRhdGFTb3VyY2VzQ29udGFpbmVyKCk6IERhdGFTb3VyY2VzIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXI7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlQYXRoKG5vZGU6IEdyb3VwTm9kZSwgcGF0aCwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xuXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG5cbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcblxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XG4gICAgICAgICAgICBmb3VuZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVBhdGgoY2hpbGQsIHBhdGgsIGZvdW5kKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYUNoaWxkOiBBcnJheU5vZGUgPSBjaGlsZCBhcyBBcnJheU5vZGU7XG5cbiAgICAgICAgICBhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaChhQ2hpbGROb2RlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UGF0aChhQ2hpbGROb2RlLCBwYXRoLCBmb3VuZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlRdWVzdGlvbklkKHF1ZXN0aW9uSWQ6IHN0cmluZywgcXVlc3Rpb25UeXBlPzogc3RyaW5nKTogQXJyYXk8Tm9kZUJhc2U+IHtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuICAgIGlmIChxdWVzdGlvblR5cGUpIHtcbiAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKHRoaXMucm9vdE5vZGUsIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZCh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvbklkLCBmb3VuZCk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShyb290Tm9kZTogYW55LCBxdWVzdGlvblR5cGU6IHN0cmluZyAsIGZvdW5kOiBBcnJheTxOb2RlQmFzZT4pIHtcblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlQXNHcm91cC5jaGlsZHJlbltvXSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSByb290Tm9kZS5xdWVzdGlvbjtcblxuICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5leHRyYXMgJiYgcXVlc3Rpb25CYXNlLmV4dHJhcy50eXBlICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSA9PT0gcXVlc3Rpb25UeXBlKSB7XG4gICAgICAgIGZvdW5kLnB1c2gocm9vdE5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZE5vZGVzQnlRdWVzdGlvbklkKHJvb3ROb2RlOiBOb2RlQmFzZSwgcXVlc3Rpb25JZDogc3RyaW5nLFxuICAgIHJlc3VsdHM6IEFycmF5PE5vZGVCYXNlPikge1xuICAgIGlmIChyb290Tm9kZS5xdWVzdGlvbi5rZXkgPT09IHF1ZXN0aW9uSWQpIHtcbiAgICAgIHJlc3VsdHMucHVzaChyb290Tm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZChub2RlLCBxdWVzdGlvbklkLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cblxuICBnZXQgdmFsaWQoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5yb290Tm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgc2V0IHNob3dFcnJvcnMoc2hvdzogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dFcnJvcnMgPSBzaG93O1xuICB9XG5cbiAgZ2V0IHNob3dFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dFcnJvcnM7XG4gIH1cblxuICBtYXJrSW52YWxpZENvbnRyb2xzKG5vZGU6IEdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcz86IGFueSkge1xuXG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgdGhpcy5tYXJrSW52YWxpZENvbnRyb2xzKGNoaWxkLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG5cbiAgICAgICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IChjaGlsZCBhcyBMZWFmTm9kZSkucXVlc3Rpb247XG5cbiAgICAgICAgICBpZiAocXVlc3Rpb25CYXNlLmtleSAmJiBxdWVzdGlvbkJhc2Uua2V5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29uc3QgYzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgPSBjaGlsZC5jb250cm9sIGFzIEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5O1xuXG4gICAgICAgICAgICBpZiAoIWMudmFsaWQgJiYgIWMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGludmFsaWRDb250cm9sTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ29udHJvbE5vZGVzLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYy5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlOb2RlOiBBcnJheU5vZGUgPSBjaGlsZCBhcyBBcnJheU5vZGU7XG5cbiAgICAgICAgICBpZiAoYXJyYXlOb2RlICYmIGFycmF5Tm9kZS5jaGlsZHJlbiAmJiBhcnJheU5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyYXlOb2RlLmNoaWxkcmVuLCAoZ3JvdXBOb2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5tYXJrSW52YWxpZENvbnRyb2xzKGdyb3VwTm9kZSwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW52YWxpZENvbnRyb2xOb2RlcztcbiAgfVxuXG4gIHVwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scygpIHtcbiAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XG4gIH1cblxuXG4gIHVwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKCkge1xuICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHRoaXMucm9vdE5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KSB7XG4gICAgICAgIChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cbiAgcHJpdmF0ZSBfdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgIChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=