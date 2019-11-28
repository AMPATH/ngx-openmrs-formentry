import * as tslib_1 from "tslib";
var NodeBase = /** @class */ (function () {
    function NodeBase(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    Object.defineProperty(NodeBase.prototype, "question", {
        get: function () {
            return this._questionModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "control", {
        get: function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "form", {
        get: function () {
            return this._form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    NodeBase.prototype.removeAt = function (index) { };
    NodeBase.prototype.createChildNode = function () { };
    NodeBase.prototype.removeChildNode = function () { };
    return NodeBase;
}());
export { NodeBase };
var LeafNode = /** @class */ (function (_super) {
    tslib_1.__extends(LeafNode, _super);
    function LeafNode(question, control, parentControl, form, parentPath) {
        return _super.call(this, question, control, form, parentPath) || this;
    }
    return LeafNode;
}(NodeBase));
export { LeafNode };
var GroupNode = /** @class */ (function (_super) {
    tslib_1.__extends(GroupNode, _super);
    function GroupNode(question, control, parentControl, form, parentPath) {
        var _this = _super.call(this, question, control, form, parentPath) || this;
        _this._children = {};
        return _this;
    }
    Object.defineProperty(GroupNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    GroupNode.prototype.setChild = function (key, node) {
        this.children[key] = node;
    };
    return GroupNode;
}(NodeBase));
export { GroupNode };
var ArrayNode = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayNode, _super);
    function ArrayNode(question, control, parentControl, formFactory, form, parentPath) {
        var _this = _super.call(this, question, control, form, parentPath) || this;
        _this.formFactory = formFactory;
        _this.childNodeCreatedEvents = [];
        _this._children = [];
        _this.childNodeCreatedEvents = [];
        return _this;
    }
    Object.defineProperty(ArrayNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    ArrayNode.prototype.createChildNode = function () {
        if (this.createChildFunc) {
            var g = this.createChildFunc(this.question, this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    };
    ArrayNode.prototype.removeAt = function (index) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    };
    ArrayNode.prototype.addChildNodeCreatedListener = function (func) {
        this.childNodeCreatedEvents.push(func);
    };
    ArrayNode.prototype.fireChildNodeCreatedListener = function (node) {
        for (var i = 0; i < this.childNodeCreatedEvents.length; i++) {
            var func = this.childNodeCreatedEvents[i];
            func(node);
        }
    };
    return ArrayNode;
}(NodeBase));
export { ArrayNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFxQkE7SUFTSSxrQkFBWSxRQUFzQixFQUFFLE9BQXNELEVBQUUsSUFBVyxFQUFFLFVBQW1CO1FBQ3hILElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFDN0UsQ0FBQztJQUVELHNCQUFXLDhCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUNELDJCQUFRLEdBQVIsVUFBUyxLQUFhLElBQUcsQ0FBQztJQUUxQixrQ0FBZSxHQUFmLGNBQW1CLENBQUM7SUFDcEIsa0NBQWUsR0FBZixjQUFtQixDQUFDO0lBRXhCLGVBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDOztBQUVEO0lBQThCLG9DQUFRO0lBQ2xDLGtCQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFDckYsYUFBNEQsRUFBRSxJQUFXLEVBQUUsVUFBbUI7ZUFDL0Ysa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDO0lBQzlDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQUxELENBQThCLFFBQVEsR0FLckM7O0FBRUQ7SUFBK0IscUNBQVE7SUFFbkMsbUJBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQURsRyxZQUVJLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUU3QztRQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztJQUN4QixDQUFDO0lBRUQsc0JBQVcsK0JBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxJQUFjO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFTCxnQkFBQztBQUFELENBQUMsQUFoQkQsQ0FBK0IsUUFBUSxHQWdCdEM7O0FBRUQ7SUFBK0IscUNBQVE7SUFPbkMsbUJBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFVLFdBQXlCLEVBQy9GLElBQVcsRUFBRSxVQUFtQjtRQUZwQyxZQUdJLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUc3QztRQUx5RSxpQkFBVyxHQUFYLFdBQVcsQ0FBYztRQU4zRiw0QkFBc0IsR0FBVSxFQUFFLENBQUM7UUFTdkMsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQzs7SUFDckMsQ0FBQztJQUVELHNCQUFXLCtCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRU0sbUNBQWUsR0FBdEI7UUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBTSxDQUFDLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBNkIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDRCQUFRLEdBQWYsVUFBZ0IsS0FBYTtRQUN6QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQsK0NBQTJCLEdBQTNCLFVBQTRCLElBQVM7UUFDakMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0RBQTRCLEdBQTVCLFVBQTZCLElBQWU7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFekQsSUFBTSxJQUFJLEdBQVEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQTdDRCxDQUErQixRQUFRLEdBNkN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuLy8gaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwLCBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UsIFJlcGVhdGluZ1F1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuZXhwb3J0IGludGVyZmFjZSBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuXG4gICAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSk7XG5cbiAgICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSk7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24gPSAocXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLCBub2RlOiBBcnJheU5vZGUsIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeSkgPT4gR3JvdXBOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24ge1xuICAgIChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2Uge1xuICAgIHB1YmxpYyBjaGlsZHJlbj86IGFueTtcbiAgICBwcml2YXRlIF9jb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cDtcbiAgICBwcml2YXRlIF9xdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2U7XG4gICAgcHJpdmF0ZSBfZm9ybTogRm9ybTtcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB0aGlzLl9xdWVzdGlvbk1vZGVsID0gcXVlc3Rpb247XG4gICAgICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgICAgICB0aGlzLl9wYXRoID0gcGFyZW50UGF0aCA/IHBhcmVudFBhdGggKyAnLicgKyBxdWVzdGlvbi5rZXkgOiBxdWVzdGlvbi5rZXk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBxdWVzdGlvbigpOiBRdWVzdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25Nb2RlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvbnRyb2woKTogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm0oKTogRm9ybSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge31cblxuICAgIGNyZWF0ZUNoaWxkTm9kZSgpIHt9XG4gICAgcmVtb3ZlQ2hpbGROb2RlKCkge31cblxufVxuXG5leHBvcnQgY2xhc3MgTGVhZk5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXBOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBhbnk7XG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q2hpbGQoa2V5OiBzdHJpbmcsIG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5ba2V5XSA9IG5vZGU7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheU5vZGUgZXh0ZW5kcyBOb2RlQmFzZSBpbXBsZW1lbnRzIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGNoaWxkTm9kZUNyZWF0ZWRFdmVudHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSBfY2hpbGRyZW46IEdyb3VwTm9kZVtdO1xuICAgIHB1YmxpYyBjcmVhdGVDaGlsZEZ1bmM6IENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG4gICAgcHVibGljIHJlbW92ZUNoaWxkRnVuYzogUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBwcml2YXRlIGZvcm1GYWN0b3J5PzogRm9ybUZhY3RvcnksXG4gICAgICAgIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGlsZHJlbigpOiBHcm91cE5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGROb2RlKCk6IEdyb3VwTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNoaWxkRnVuYykge1xuICAgICAgICAgICAgY29uc3QgZzogR3JvdXBOb2RlID0gdGhpcy5jcmVhdGVDaGlsZEZ1bmModGhpcy5xdWVzdGlvbiBhcyBSZXBlYXRpbmdRdWVzdGlvbiwgdGhpcywgdGhpcy5mb3JtRmFjdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZyk7XG4gICAgICAgICAgICByZXR1cm4gZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5yZW1vdmVDaGlsZEZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRGdW5jKGluZGV4LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLnB1c2goZnVuYyk7XG4gICAgfVxuXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3QgZnVuYzogYW55ID0gdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzW2ldO1xuICAgICAgICAgICAgZnVuYyhub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXX0=