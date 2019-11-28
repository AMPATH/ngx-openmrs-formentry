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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFJNUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBWSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUt2RTtJQU1FLGNBQW1CLE1BQVcsRUFBUyxXQUF3QixFQUFTLGVBQWdDO1FBQXJGLFdBQU0sR0FBTixNQUFNLENBQUs7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUpqRyx3QkFBbUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFFMUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELHNCQUFJLHNDQUFvQjthQUF4QjtZQUNFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsK0JBQWdCLEdBQWhCLFVBQWlCLElBQWUsRUFBRSxJQUFJLEVBQUUsS0FBc0I7UUFBOUQsaUJBeUNDO1FBdkNDLElBQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFekMsS0FBSyxJQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFFMUIsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVoQyxJQUFNLEtBQUssR0FBYSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXRDLElBQUksS0FBSyxZQUFZLFNBQVMsRUFBRTtvQkFFOUIsSUFBSSxJQUFJ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U0FDRjtRQUVELElBQUksUUFBUSxZQUFZLFNBQVMsRUFBRTtZQUNqQyxJQUFNLFdBQVcsR0FBRyxRQUFxQixDQUFDO1lBQzFDLGlDQUFpQztZQUNqQyxLQUFLLElBQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEU7U0FDRjtRQUVELElBQUksUUFBUSxZQUFZLFNBQVMsRUFBRTtZQUNqQyxJQUFNLFdBQVcsR0FBRyxRQUFxQixDQUFDO1lBRTFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDL0IsS0FBSSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUE5T0QsSUE4T0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdWVzdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBBZmVGb3JtQXJyYXkgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tYXJyYXknO1xuXG5leHBvcnQgY2xhc3MgRm9ybSB7XG4gIHB1YmxpYyByb290Tm9kZTogR3JvdXBOb2RlO1xuICBwdWJsaWMgdmFsdWVQcm9jZXNzaW5nSW5mbzogYW55ID0ge307XG4gICAgcHVibGljIGV4aXN0aW5nT3JkZXJzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZXNDb250YWluZXI6IERhdGFTb3VyY2VzO1xuICBwcml2YXRlIF9zaG93RXJyb3JzID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzY2hlbWE6IGFueSwgcHVibGljIGZvcm1GYWN0b3J5OiBGb3JtRmFjdG9yeSwgcHVibGljIHF1ZXN0aW9uRmFjdG9yeTogUXVlc3Rpb25GYWN0b3J5KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZXNDb250YWluZXIgPSBuZXcgRGF0YVNvdXJjZXMoKTtcbiAgfVxuXG4gIGdldCBkYXRhU291cmNlc0NvbnRhaW5lcigpOiBEYXRhU291cmNlcyB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzQ29udGFpbmVyO1xuICB9XG5cbiAgc2VhcmNoTm9kZUJ5UGF0aChub2RlOiBHcm91cE5vZGUsIHBhdGgsIGZvdW5kOiBBcnJheTxOb2RlQmFzZT4pIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICBpZiAocGF0aCA9PT0gY2hpbGQucGF0aCkge1xuICAgICAgICAgICAgZm91bmQucHVzaChjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGNoaWxkLCBwYXRoLCBmb3VuZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGFDaGlsZDogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgICAgYUNoaWxkLmNoaWxkcmVuLmZvckVhY2goYUNoaWxkTm9kZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVBhdGgoYUNoaWxkTm9kZSwgcGF0aCwgZm91bmQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZChxdWVzdGlvbklkOiBzdHJpbmcsIHF1ZXN0aW9uVHlwZT86IHN0cmluZyk6IEFycmF5PE5vZGVCYXNlPiB7XG4gICAgY29uc3QgZm91bmQgPSBbXTtcbiAgICBpZiAocXVlc3Rpb25UeXBlKSB7XG4gICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZSh0aGlzLnJvb3ROb2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25JZCwgZm91bmQpO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBzZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUocm9vdE5vZGU6IGFueSwgcXVlc3Rpb25UeXBlOiBzdHJpbmcgLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKG5vZGUsIHF1ZXN0aW9uVHlwZSwgZm91bmQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gcm9vdE5vZGUucXVlc3Rpb247XG5cbiAgICAgIGlmIChxdWVzdGlvbkJhc2UuZXh0cmFzICYmIHF1ZXN0aW9uQmFzZS5leHRyYXMudHlwZSAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgPT09IHF1ZXN0aW9uVHlwZSkge1xuICAgICAgICBmb3VuZC5wdXNoKHJvb3ROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmROb2Rlc0J5UXVlc3Rpb25JZChyb290Tm9kZTogTm9kZUJhc2UsIHF1ZXN0aW9uSWQ6IHN0cmluZyxcbiAgICByZXN1bHRzOiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICBpZiAocm9vdE5vZGUucXVlc3Rpb24ua2V5ID09PSBxdWVzdGlvbklkKSB7XG4gICAgICByZXN1bHRzLnB1c2gocm9vdE5vZGUpO1xuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLmZpbmROb2Rlc0J5UXVlc3Rpb25JZChub2RlQXNHcm91cC5jaGlsZHJlbltvXSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZSwgcXVlc3Rpb25JZCwgcmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG5cbiAgZ2V0IHZhbGlkKCkge1xuXG4gICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHNldCBzaG93RXJyb3JzKHNob3c6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93RXJyb3JzID0gc2hvdztcbiAgfVxuXG4gIGdldCBzaG93RXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLl9zaG93RXJyb3JzO1xuICB9XG5cbiAgbWFya0ludmFsaWRDb250cm9scyhub2RlOiBHcm91cE5vZGUsIGludmFsaWRDb250cm9sTm9kZXM/OiBhbnkpIHtcblxuXG4gICAgY29uc3QgY2hpbGRyZW46IE5vZGVCYXNlID0gbm9kZS5jaGlsZHJlbjtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG5cbiAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQ6IE5vZGVCYXNlID0gY2hpbGRyZW5ba2V5XTtcblxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcblxuICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhjaGlsZCwgaW52YWxpZENvbnRyb2xOb2Rlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBMZWFmTm9kZSkge1xuXG4gICAgICAgICAgY29uc3QgcXVlc3Rpb25CYXNlOiBRdWVzdGlvbkJhc2UgPSAoY2hpbGQgYXMgTGVhZk5vZGUpLnF1ZXN0aW9uO1xuXG4gICAgICAgICAgaWYgKHF1ZXN0aW9uQmFzZS5rZXkgJiYgcXVlc3Rpb25CYXNlLmtleS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGM6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5ID0gY2hpbGQuY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheTtcblxuICAgICAgICAgICAgaWYgKCFjLnZhbGlkICYmICFjLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIGlmIChpbnZhbGlkQ29udHJvbE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaW52YWxpZENvbnRyb2xOb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGMubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gY2hpbGQgYXMgQXJyYXlOb2RlO1xuXG4gICAgICAgICAgaWYgKGFycmF5Tm9kZSAmJiBhcnJheU5vZGUuY2hpbGRyZW4gJiYgYXJyYXlOb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgXy5mb3JFYWNoKGFycmF5Tm9kZS5jaGlsZHJlbiwgKGdyb3VwTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubWFya0ludmFsaWRDb250cm9scyhncm91cE5vZGUsIGludmFsaWRDb250cm9sTm9kZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGludmFsaWRDb250cm9sTm9kZXM7XG4gIH1cblxuICB1cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMoKSB7XG4gICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKHRoaXMucm9vdE5vZGUpO1xuICB9XG5cblxuICB1cGRhdGVBbGVydHNGb3JBbGxDb250cm9scygpIHtcbiAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgIGlmIChyb290Tm9kZS5jb250cm9sKSB7XG4gICAgICBpZiAoKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFsZXJ0c0ZvckFsbENvbnRyb2xzKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG4gIHByaXZhdGUgX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAocm9vdE5vZGUuY29udHJvbCkge1xuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlRGlzYWJsZWRTdGF0ZSkge1xuICAgICAgICAocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUpIHtcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVIaWRkZW5TdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyhub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19