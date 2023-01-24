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
        var removePrompt = confirm('Are you sure you want to remove?');
        if (removePrompt) {
            if (this.removeChildFunc) {
                this.removeChildFunc(index, this);
            }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQTRCQTtJQVNFLGtCQUNFLFFBQXNCLEVBQ3RCLE9BQXNELEVBQ3RELElBQVcsRUFDWCxVQUFtQjtRQUVuQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzNFLENBQUM7SUFFRCxzQkFBVyw4QkFBUTthQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkJBQU87YUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUNELDJCQUFRLEdBQVIsVUFBUyxLQUFhLElBQUcsQ0FBQztJQUUxQixrQ0FBZSxHQUFmLGNBQW1CLENBQUM7SUFDcEIsa0NBQWUsR0FBZixjQUFtQixDQUFDO0lBQ3RCLGVBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDOztBQUVEO0lBQThCLG9D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QyxDQUFDO1FBQ2IsQ0FBQztJQUNILENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2REQsQ0FBK0IsUUFBUSxHQXVEdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbi8vIGltcG9ydCB7IEFmZUNvbnRyb2xUeXBlLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWZlRm9ybUNvbnRyb2wsXG4gIEFmZUZvcm1BcnJheSxcbiAgQWZlRm9ybUdyb3VwXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5leHBvcnQgaW50ZXJmYWNlIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XG4gIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpO1xuXG4gIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKTtcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiA9IChcbiAgcXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLFxuICBub2RlOiBBcnJheU5vZGUsXG4gIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeVxuKSA9PiBHcm91cE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiB7XG4gIChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2Uge1xuICBwdWJsaWMgY2hpbGRyZW4/OiBhbnk7XG4gIHByaXZhdGUgX2NvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwO1xuICBwcml2YXRlIF9xdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2U7XG4gIHByaXZhdGUgX2Zvcm06IEZvcm07XG4gIHByaXZhdGUgX3BhdGg6IHN0cmluZztcblxuICBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm0sXG4gICAgcGFyZW50UGF0aD86IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICB0aGlzLl9xdWVzdGlvbk1vZGVsID0gcXVlc3Rpb247XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgdGhpcy5fcGF0aCA9IHBhcmVudFBhdGggPyBwYXJlbnRQYXRoICsgJy4nICsgcXVlc3Rpb24ua2V5IDogcXVlc3Rpb24ua2V5O1xuICB9XG5cbiAgcHVibGljIGdldCBxdWVzdGlvbigpOiBRdWVzdGlvbkJhc2Uge1xuICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk1vZGVsO1xuICB9XG5cbiAgcHVibGljIGdldCBjb250cm9sKCk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZm9ybSgpOiBGb3JtIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG4gIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHt9XG5cbiAgY3JlYXRlQ2hpbGROb2RlKCkge31cbiAgcmVtb3ZlQ2hpbGROb2RlKCkge31cbn1cblxuZXhwb3J0IGNsYXNzIExlYWZOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm0sXG4gICAgcGFyZW50UGF0aD86IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtLFxuICAgIHBhcmVudFBhdGg/OiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgIHRoaXMuX2NoaWxkcmVuID0ge307XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIHNldENoaWxkKGtleTogc3RyaW5nLCBub2RlOiBOb2RlQmFzZSkge1xuICAgIHRoaXMuY2hpbGRyZW5ba2V5XSA9IG5vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFycmF5Tm9kZSBleHRlbmRzIE5vZGVCYXNlIGltcGxlbWVudHMgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcbiAgcHJpdmF0ZSBjaGlsZE5vZGVDcmVhdGVkRXZlbnRzOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIF9jaGlsZHJlbjogR3JvdXBOb2RlW107XG4gIHB1YmxpYyBjcmVhdGVDaGlsZEZ1bmM6IENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG4gIHB1YmxpYyByZW1vdmVDaGlsZEZ1bmM6IFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIHByaXZhdGUgZm9ybUZhY3Rvcnk/OiBGb3JtRmFjdG9yeSxcbiAgICBmb3JtPzogRm9ybSxcbiAgICBwYXJlbnRQYXRoPzogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBHcm91cE5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNoaWxkTm9kZSgpOiBHcm91cE5vZGUge1xuICAgIGlmICh0aGlzLmNyZWF0ZUNoaWxkRnVuYykge1xuICAgICAgY29uc3QgZzogR3JvdXBOb2RlID0gdGhpcy5jcmVhdGVDaGlsZEZ1bmMoXG4gICAgICAgIHRoaXMucXVlc3Rpb24gYXMgUmVwZWF0aW5nUXVlc3Rpb24sXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMuZm9ybUZhY3RvcnlcbiAgICAgICk7XG4gICAgICB0aGlzLmZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZyk7XG4gICAgICByZXR1cm4gZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IHJlbW92ZVByb21wdCA9IGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZW1vdmU/Jyk7XG4gICAgaWYgKHJlbW92ZVByb21wdCkge1xuICAgICAgaWYgKHRoaXMucmVtb3ZlQ2hpbGRGdW5jKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRGdW5jKGluZGV4LCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLnB1c2goZnVuYyk7XG4gIH1cblxuICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmdW5jOiBhbnkgPSB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHNbaV07XG4gICAgICBmdW5jKG5vZGUpO1xuICAgIH1cbiAgfVxufVxuIl19