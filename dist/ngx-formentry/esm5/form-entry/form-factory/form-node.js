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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUE0QkE7SUFTRSxrQkFDRSxRQUFzQixFQUN0QixPQUFzRCxFQUN0RCxJQUFXLEVBQ1gsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzRSxDQUFDO0lBRUQsc0JBQVcsOEJBQVE7YUFBbkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDZCQUFPO2FBQWxCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQkFBSTthQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQkFBSTthQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCwyQkFBUSxHQUFSLFVBQVMsS0FBYSxJQUFHLENBQUM7SUFFMUIsa0NBQWUsR0FBZixjQUFtQixDQUFDO0lBQ3BCLGtDQUFlLEdBQWYsY0FBbUIsQ0FBQztJQUN0QixlQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQzs7QUFFRDtJQUE4QixvQ0FBUTtJQUNwQyxrQkFDRSxRQUFzQixFQUN0QixPQUFzRCxFQUN0RCxhQUE0RCxFQUM1RCxJQUFXLEVBQ1gsVUFBbUI7ZUFFbkIsa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQVZELENBQThCLFFBQVEsR0FVckM7O0FBRUQ7SUFBK0IscUNBQVE7SUFFckMsbUJBQ0UsUUFBc0IsRUFDdEIsT0FBc0QsRUFDdEQsYUFBNEQsRUFDNUQsSUFBVyxFQUNYLFVBQW1CO1FBTHJCLFlBT0Usa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLFNBRTNDO1FBREMsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBQ3RCLENBQUM7SUFFRCxzQkFBVywrQkFBUTthQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRU0sNEJBQVEsR0FBZixVQUFnQixHQUFXLEVBQUUsSUFBYztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQStCLFFBQVEsR0FvQnRDOztBQUVEO0lBQStCLHFDQUFRO0lBTXJDLG1CQUNFLFFBQXNCLEVBQ3RCLE9BQXNELEVBQ3RELGFBQTRELEVBQ3BELFdBQXlCLEVBQ2pDLElBQVcsRUFDWCxVQUFtQjtRQU5yQixZQVFFLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUczQztRQVBTLGlCQUFXLEdBQVgsV0FBVyxDQUFjO1FBVDNCLDRCQUFzQixHQUFVLEVBQUUsQ0FBQztRQWN6QyxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsc0JBQVcsK0JBQVE7YUFBbkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVNLG1DQUFlLEdBQXRCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBTSxDQUFDLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FDdkMsSUFBSSxDQUFDLFFBQTZCLEVBQ2xDLElBQUksRUFDSixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLEtBQWE7UUFDM0IsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsK0NBQTJCLEdBQTNCLFVBQTRCLElBQVM7UUFDbkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZ0RBQTRCLEdBQTVCLFVBQTZCLElBQWU7UUFDMUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUQsSUFBTSxJQUFJLEdBQVEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUM7SUFDSCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBdkRELENBQStCLFFBQVEsR0F1RHRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG4vLyBpbXBvcnQgeyBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgUmVwZWF0aW5nUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFmZUZvcm1Db250cm9sLFxuICBBZmVGb3JtQXJyYXksXG4gIEFmZUZvcm1Hcm91cFxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuZXhwb3J0IGludGVyZmFjZSBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KTtcblxuICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSk7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24gPSAoXG4gIHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbixcbiAgbm9kZTogQXJyYXlOb2RlLFxuICBmYWN0b3J5PzogRm9ybUZhY3RvcnlcbikgPT4gR3JvdXBOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24ge1xuICAoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKTtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlIHtcbiAgcHVibGljIGNoaWxkcmVuPzogYW55O1xuICBwcml2YXRlIF9jb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cDtcbiAgcHJpdmF0ZSBfcXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlO1xuICBwcml2YXRlIF9mb3JtOiBGb3JtO1xuICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG5cbiAgcHVibGljIGluaXRpYWxWYWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtLFxuICAgIHBhcmVudFBhdGg/OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgdGhpcy5fcXVlc3Rpb25Nb2RlbCA9IHF1ZXN0aW9uO1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgIHRoaXMuX3BhdGggPSBwYXJlbnRQYXRoID8gcGFyZW50UGF0aCArICcuJyArIHF1ZXN0aW9uLmtleSA6IHF1ZXN0aW9uLmtleTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb25CYXNlIHtcbiAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25Nb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29udHJvbCgpOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm0oKTogRm9ybSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgfVxuICByZW1vdmVBdChpbmRleDogbnVtYmVyKSB7fVxuXG4gIGNyZWF0ZUNoaWxkTm9kZSgpIHt9XG4gIHJlbW92ZUNoaWxkTm9kZSgpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBMZWFmTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtLFxuICAgIHBhcmVudFBhdGg/OiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cE5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBmb3JtPzogRm9ybSxcbiAgICBwYXJlbnRQYXRoPzogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xuICB9XG5cbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDaGlsZChrZXk6IHN0cmluZywgbm9kZTogTm9kZUJhc2UpIHtcbiAgICB0aGlzLmNoaWxkcmVuW2tleV0gPSBub2RlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheU5vZGUgZXh0ZW5kcyBOb2RlQmFzZSBpbXBsZW1lbnRzIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XG4gIHByaXZhdGUgY2hpbGROb2RlQ3JlYXRlZEV2ZW50czogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IEdyb3VwTm9kZVtdO1xuICBwdWJsaWMgY3JlYXRlQ2hpbGRGdW5jOiBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xuICBwdWJsaWMgcmVtb3ZlQ2hpbGRGdW5jOiBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBwcml2YXRlIGZvcm1GYWN0b3J5PzogRm9ybUZhY3RvcnksXG4gICAgZm9ybT86IEZvcm0sXG4gICAgcGFyZW50UGF0aD86IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogR3JvdXBOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVDaGlsZE5vZGUoKTogR3JvdXBOb2RlIHtcbiAgICBpZiAodGhpcy5jcmVhdGVDaGlsZEZ1bmMpIHtcbiAgICAgIGNvbnN0IGc6IEdyb3VwTm9kZSA9IHRoaXMuY3JlYXRlQ2hpbGRGdW5jKFxuICAgICAgICB0aGlzLnF1ZXN0aW9uIGFzIFJlcGVhdGluZ1F1ZXN0aW9uLFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLmZvcm1GYWN0b3J5XG4gICAgICApO1xuICAgICAgdGhpcy5maXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGcpO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCByZW1vdmVQcm9tcHQgPSBjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlPycpO1xuICAgIGlmIChyZW1vdmVQcm9tcHQpIHtcbiAgICAgIGlmICh0aGlzLnJlbW92ZUNoaWxkRnVuYykge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkRnVuYyhpbmRleCwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSkge1xuICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5wdXNoKGZ1bmMpO1xuICB9XG5cbiAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZnVuYzogYW55ID0gdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzW2ldO1xuICAgICAgZnVuYyhub2RlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==