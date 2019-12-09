import * as _ from 'lodash';
import { DataSources } from '../data-sources/data-sources';
import { GroupNode, LeafNode, ArrayNode } from './form-node';
export class Form {
    constructor(schema, formFactory, questionFactory) {
        this.schema = schema;
        this.formFactory = formFactory;
        this.questionFactory = questionFactory;
        this.valueProcessingInfo = {};
        this.existingOrders = {};
        this._showErrors = false;
        this._dataSourcesContainer = new DataSources();
    }
    get dataSourcesContainer() {
        return this._dataSourcesContainer;
    }
    searchNodeByPath(node, path, found) {
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
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
                    const aChild = child;
                    aChild.children.forEach(aChildNode => {
                        this.searchNodeByPath(aChildNode, path, found);
                    });
                }
            }
        }
        return found;
    }
    searchNodeByQuestionId(questionId, questionType) {
        const found = [];
        if (questionType) {
            this.searchNodeByQuestionType(this.rootNode, questionType, found);
        }
        else {
            this.findNodesByQuestionId(this.rootNode, questionId, found);
        }
        return found;
    }
    searchNodeByQuestionType(rootNode, questionType, found) {
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.searchNodeByQuestionType(nodeAsGroup.children[o], questionType, found);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this.searchNodeByQuestionType(node, questionType, found);
            });
        }
        if (rootNode instanceof LeafNode) {
            const questionBase = rootNode.question;
            if (questionBase.extras && questionBase.extras.type && questionBase.extras.type === questionType) {
                found.push(rootNode);
            }
        }
    }
    findNodesByQuestionId(rootNode, questionId, results) {
        if (rootNode.question.key === questionId) {
            results.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this.findNodesByQuestionId(nodeAsGroup.children[o], questionId, results);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this.findNodesByQuestionId(node, questionId, results);
            });
        }
    }
    get valid() {
        return this.rootNode.control.valid;
    }
    set showErrors(show) {
        this._showErrors = show;
    }
    get showErrors() {
        return this._showErrors;
    }
    markInvalidControls(node, invalidControlNodes) {
        const children = node.children;
        for (const key in children) {
            if (children.hasOwnProperty(key)) {
                const child = children[key];
                if (child instanceof GroupNode) {
                    this.markInvalidControls(child, invalidControlNodes);
                }
                else if (child instanceof LeafNode) {
                    const questionBase = child.question;
                    if (questionBase.key && questionBase.key.length > 0) {
                        const c = child.control;
                        if (!c.valid && !c.disabled) {
                            if (invalidControlNodes) {
                                invalidControlNodes.push(child);
                            }
                            c.markAsTouched();
                        }
                    }
                }
                else if (child instanceof ArrayNode) {
                    const arrayNode = child;
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
    updateHiddenDisabledStateForAllControls() {
        this._updateHiddenDisabledStateForAllControls(this.rootNode);
    }
    updateAlertsForAllControls() {
        this._updateAlertsForAllControls(this.rootNode);
    }
    _updateAlertsForAllControls(rootNode) {
        if (rootNode.control) {
            if (rootNode.control.updateAlert) {
                rootNode.control.updateAlert();
            }
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateAlertsForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this._updateAlertsForAllControls(node);
            });
        }
    }
    _updateHiddenDisabledStateForAllControls(rootNode) {
        if (rootNode.control) {
            if (rootNode.control.updateDisabledState) {
                rootNode.control.updateDisabledState();
            }
            if (rootNode.control.updateHiddenState) {
                rootNode.control.updateHiddenState();
            }
        }
        if (rootNode instanceof GroupNode) {
            const nodeAsGroup = rootNode;
            // tslint:disable-next-line:forin
            for (const o in nodeAsGroup.children) {
                this._updateHiddenDisabledStateForAllControls(nodeAsGroup.children[o]);
            }
        }
        if (rootNode instanceof ArrayNode) {
            const nodeAsArray = rootNode;
            nodeAsArray.children.forEach(node => {
                this._updateHiddenDisabledStateForAllControls(node);
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUk1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFZLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS3ZFLE1BQU0sT0FBTyxJQUFJO0lBTWYsWUFBbUIsTUFBVyxFQUFTLFdBQXdCLEVBQVMsZUFBZ0M7UUFBckYsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSmpHLHdCQUFtQixHQUFRLEVBQUUsQ0FBQztRQUM1QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUUxQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDcEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQWUsRUFBRSxJQUFJLEVBQUUsS0FBc0I7UUFFNUQsTUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QyxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUUxQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBRWhDLE1BQU0sS0FBSyxHQUFhLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxLQUFLLFlBQVksU0FBUyxFQUFFO29CQUU5QixJQUFJLElBQUksS0FB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VyxDQUFDLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNGO1FBRUQsSUFBSSxRQUFRLFlBQVksU0FBUyxFQUFFO1lBQ2pDLE1BQU0sV0FBVyxHQUFHLFFBQXFCLENBQUM7WUFFMUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IFF1ZXN0aW9uRmFjdG9yeSB9IGZyb20gJy4vcXVlc3Rpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSB9IGZyb20gJy4vZm9ybS1ub2RlJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQWZlRm9ybUFycmF5IH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWFycmF5JztcblxuZXhwb3J0IGNsYXNzIEZvcm0ge1xuICBwdWJsaWMgcm9vdE5vZGU6IEdyb3VwTm9kZTtcbiAgcHVibGljIHZhbHVlUHJvY2Vzc2luZ0luZm86IGFueSA9IHt9O1xuICAgIHB1YmxpYyBleGlzdGluZ09yZGVyczogYW55ID0ge307XG4gIHByaXZhdGUgX2RhdGFTb3VyY2VzQ29udGFpbmVyOiBEYXRhU291cmNlcztcbiAgcHJpdmF0ZSBfc2hvd0Vycm9ycyA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NoZW1hOiBhbnksIHB1YmxpYyBmb3JtRmFjdG9yeTogRm9ybUZhY3RvcnksIHB1YmxpYyBxdWVzdGlvbkZhY3Rvcnk6IFF1ZXN0aW9uRmFjdG9yeSkge1xuICAgIHRoaXMuX2RhdGFTb3VyY2VzQ29udGFpbmVyID0gbmV3IERhdGFTb3VyY2VzKCk7XG4gIH1cblxuICBnZXQgZGF0YVNvdXJjZXNDb250YWluZXIoKTogRGF0YVNvdXJjZXMge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlc0NvbnRhaW5lcjtcbiAgfVxuXG4gIHNlYXJjaE5vZGVCeVBhdGgobm9kZTogR3JvdXBOb2RlLCBwYXRoLCBmb3VuZDogQXJyYXk8Tm9kZUJhc2U+KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbjogTm9kZUJhc2UgPSBub2RlLmNoaWxkcmVuO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hpbGRyZW4pIHtcblxuICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICBjb25zdCBjaGlsZDogTm9kZUJhc2UgPSBjaGlsZHJlbltrZXldO1xuXG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuXG4gICAgICAgICAgaWYgKHBhdGggPT09IGNoaWxkLnBhdGgpIHtcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UGF0aChjaGlsZCwgcGF0aCwgZm91bmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XG4gICAgICAgICAgICBmb3VuZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcblxuICAgICAgICAgIGlmIChwYXRoID09PSBjaGlsZC5wYXRoKSB7XG4gICAgICAgICAgICBmb3VuZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBhQ2hpbGQ6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcblxuICAgICAgICAgIGFDaGlsZC5jaGlsZHJlbi5mb3JFYWNoKGFDaGlsZE5vZGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hOb2RlQnlQYXRoKGFDaGlsZE5vZGUsIHBhdGgsIGZvdW5kKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQocXVlc3Rpb25JZDogc3RyaW5nLCBxdWVzdGlvblR5cGU/OiBzdHJpbmcpOiBBcnJheTxOb2RlQmFzZT4ge1xuICAgIGNvbnN0IGZvdW5kID0gW107XG4gICAgaWYgKHF1ZXN0aW9uVHlwZSkge1xuICAgICAgdGhpcy5zZWFyY2hOb2RlQnlRdWVzdGlvblR5cGUodGhpcy5yb290Tm9kZSwgcXVlc3Rpb25UeXBlLCBmb3VuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKHRoaXMucm9vdE5vZGUsIHF1ZXN0aW9uSWQsIGZvdW5kKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKHJvb3ROb2RlOiBhbnksIHF1ZXN0aW9uVHlwZTogc3RyaW5nICwgZm91bmQ6IEFycmF5PE5vZGVCYXNlPikge1xuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNHcm91cCA9IHJvb3ROb2RlIGFzIEdyb3VwTm9kZTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBvIGluIG5vZGVBc0dyb3VwLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoTm9kZUJ5UXVlc3Rpb25UeXBlKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaE5vZGVCeVF1ZXN0aW9uVHlwZShub2RlLCBxdWVzdGlvblR5cGUsIGZvdW5kKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZSA9IHJvb3ROb2RlLnF1ZXN0aW9uO1xuXG4gICAgICBpZiAocXVlc3Rpb25CYXNlLmV4dHJhcyAmJiBxdWVzdGlvbkJhc2UuZXh0cmFzLnR5cGUgJiYgcXVlc3Rpb25CYXNlLmV4dHJhcy50eXBlID09PSBxdWVzdGlvblR5cGUpIHtcbiAgICAgICAgZm91bmQucHVzaChyb290Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTm9kZXNCeVF1ZXN0aW9uSWQocm9vdE5vZGU6IE5vZGVCYXNlLCBxdWVzdGlvbklkOiBzdHJpbmcsXG4gICAgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+KSB7XG4gICAgaWYgKHJvb3ROb2RlLnF1ZXN0aW9uLmtleSA9PT0gcXVlc3Rpb25JZCkge1xuICAgICAgcmVzdWx0cy5wdXNoKHJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5maW5kTm9kZXNCeVF1ZXN0aW9uSWQobm9kZUFzR3JvdXAuY2hpbGRyZW5bb10sIHF1ZXN0aW9uSWQsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzQXJyYXkgPSByb290Tm9kZSBhcyBBcnJheU5vZGU7XG5cbiAgICAgIG5vZGVBc0FycmF5LmNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIHRoaXMuZmluZE5vZGVzQnlRdWVzdGlvbklkKG5vZGUsIHF1ZXN0aW9uSWQsIHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuXG4gIGdldCB2YWxpZCgpIHtcblxuICAgIHJldHVybiB0aGlzLnJvb3ROb2RlLmNvbnRyb2wudmFsaWQ7XG4gIH1cblxuICBzZXQgc2hvd0Vycm9ycyhzaG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0Vycm9ycyA9IHNob3c7XG4gIH1cblxuICBnZXQgc2hvd0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0Vycm9ycztcbiAgfVxuXG4gIG1hcmtJbnZhbGlkQ29udHJvbHMobm9kZTogR3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzPzogYW55KSB7XG5cblxuICAgIGNvbnN0IGNoaWxkcmVuOiBOb2RlQmFzZSA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHJlbikge1xuXG4gICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkOiBOb2RlQmFzZSA9IGNoaWxkcmVuW2tleV07XG5cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG5cbiAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoY2hpbGQsIGludmFsaWRDb250cm9sTm9kZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcblxuICAgICAgICAgIGNvbnN0IHF1ZXN0aW9uQmFzZTogUXVlc3Rpb25CYXNlID0gKGNoaWxkIGFzIExlYWZOb2RlKS5xdWVzdGlvbjtcblxuICAgICAgICAgIGlmIChxdWVzdGlvbkJhc2Uua2V5ICYmIHF1ZXN0aW9uQmFzZS5rZXkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb25zdCBjOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSA9IGNoaWxkLmNvbnRyb2wgYXMgQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk7XG5cbiAgICAgICAgICAgIGlmICghYy52YWxpZCAmJiAhYy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoaW52YWxpZENvbnRyb2xOb2Rlcykge1xuICAgICAgICAgICAgICAgIGludmFsaWRDb250cm9sTm9kZXMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgICAgICBjb25zdCBhcnJheU5vZGU6IEFycmF5Tm9kZSA9IGNoaWxkIGFzIEFycmF5Tm9kZTtcblxuICAgICAgICAgIGlmIChhcnJheU5vZGUgJiYgYXJyYXlOb2RlLmNoaWxkcmVuICYmIGFycmF5Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIF8uZm9yRWFjaChhcnJheU5vZGUuY2hpbGRyZW4sIChncm91cE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1hcmtJbnZhbGlkQ29udHJvbHMoZ3JvdXBOb2RlLCBpbnZhbGlkQ29udHJvbE5vZGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbnZhbGlkQ29udHJvbE5vZGVzO1xuICB9XG5cbiAgdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKCkge1xuICAgIHRoaXMuX3VwZGF0ZUhpZGRlbkRpc2FibGVkU3RhdGVGb3JBbGxDb250cm9scyh0aGlzLnJvb3ROb2RlKTtcbiAgfVxuXG5cbiAgdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMoKSB7XG4gICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHModGhpcy5yb290Tm9kZSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhyb290Tm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAocm9vdE5vZGUuY29udHJvbCkge1xuICAgICAgaWYgKChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlQWxlcnQpIHtcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVBbGVydCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgY29uc3Qgbm9kZUFzR3JvdXAgPSByb290Tm9kZSBhcyBHcm91cE5vZGU7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlQXNHcm91cC5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLl91cGRhdGVBbGVydHNGb3JBbGxDb250cm9scyhub2RlQXNHcm91cC5jaGlsZHJlbltvXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICBjb25zdCBub2RlQXNBcnJheSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcblxuICAgICAgbm9kZUFzQXJyYXkuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxlcnRzRm9yQWxsQ29udHJvbHMobm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuICBwcml2YXRlIF91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKHJvb3ROb2RlLmNvbnRyb2wpIHtcbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZURpc2FibGVkU3RhdGUpIHtcbiAgICAgICAgKHJvb3ROb2RlLmNvbnRyb2wgYXMgYW55KS51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgocm9vdE5vZGUuY29udHJvbCBhcyBhbnkpLnVwZGF0ZUhpZGRlblN0YXRlKSB7XG4gICAgICAgIChyb290Tm9kZS5jb250cm9sIGFzIGFueSkudXBkYXRlSGlkZGVuU3RhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0dyb3VwID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZUFzR3JvdXAuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGlkZGVuRGlzYWJsZWRTdGF0ZUZvckFsbENvbnRyb2xzKG5vZGVBc0dyb3VwLmNoaWxkcmVuW29dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUgaW5zdGFuY2VvZiBBcnJheU5vZGUpIHtcbiAgICAgIGNvbnN0IG5vZGVBc0FycmF5ID0gcm9vdE5vZGUgYXMgQXJyYXlOb2RlO1xuXG4gICAgICBub2RlQXNBcnJheS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVIaWRkZW5EaXNhYmxlZFN0YXRlRm9yQWxsQ29udHJvbHMobm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==