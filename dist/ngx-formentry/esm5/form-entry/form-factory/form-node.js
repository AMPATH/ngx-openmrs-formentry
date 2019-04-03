/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @record
 */
export function ChildNodeCreatedListener() { }
if (false) {
    /**
     * @param {?} func
     * @return {?}
     */
    ChildNodeCreatedListener.prototype.addChildNodeCreatedListener = function (func) { };
    /**
     * @param {?} node
     * @return {?}
     */
    ChildNodeCreatedListener.prototype.fireChildNodeCreatedListener = function (node) { };
}
/**
 * @record
 */
export function RemoveArrayChildNodeFunction() { }
var NodeBase = /** @class */ (function () {
    function NodeBase(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    Object.defineProperty(NodeBase.prototype, "question", {
        get: /**
         * @return {?}
         */
        function () {
            return this._questionModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "form", {
        get: /**
         * @return {?}
         */
        function () {
            return this._form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} index
     * @return {?}
     */
    NodeBase.prototype.removeAt = /**
     * @param {?} index
     * @return {?}
     */
    function (index) { };
    /**
     * @return {?}
     */
    NodeBase.prototype.createChildNode = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    NodeBase.prototype.removeChildNode = /**
     * @return {?}
     */
    function () { };
    return NodeBase;
}());
export { NodeBase };
if (false) {
    /** @type {?} */
    NodeBase.prototype.children;
    /**
     * @type {?}
     * @private
     */
    NodeBase.prototype._control;
    /**
     * @type {?}
     * @private
     */
    NodeBase.prototype._questionModel;
    /**
     * @type {?}
     * @private
     */
    NodeBase.prototype._form;
    /**
     * @type {?}
     * @private
     */
    NodeBase.prototype._path;
    /** @type {?} */
    NodeBase.prototype.initialValue;
}
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
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} node
     * @return {?}
     */
    GroupNode.prototype.setChild = /**
     * @param {?} key
     * @param {?} node
     * @return {?}
     */
    function (key, node) {
        this.children[key] = node;
    };
    return GroupNode;
}(NodeBase));
export { GroupNode };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GroupNode.prototype._children;
}
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
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ArrayNode.prototype.createChildNode = /**
     * @return {?}
     */
    function () {
        if (this.createChildFunc) {
            /** @type {?} */
            var g = this.createChildFunc((/** @type {?} */ (this.question)), this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ArrayNode.prototype.removeAt = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    };
    /**
     * @param {?} func
     * @return {?}
     */
    ArrayNode.prototype.addChildNodeCreatedListener = /**
     * @param {?} func
     * @return {?}
     */
    function (func) {
        this.childNodeCreatedEvents.push(func);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ArrayNode.prototype.fireChildNodeCreatedListener = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        for (var i = 0; i < this.childNodeCreatedEvents.length; i++) {
            /** @type {?} */
            var func = this.childNodeCreatedEvents[i];
            func(node);
        }
    };
    return ArrayNode;
}(NodeBase));
export { ArrayNode };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ArrayNode.prototype.childNodeCreatedEvents;
    /**
     * @type {?}
     * @private
     */
    ArrayNode.prototype._children;
    /** @type {?} */
    ArrayNode.prototype.createChildFunc;
    /** @type {?} */
    ArrayNode.prototype.removeChildFunc;
    /**
     * @type {?}
     * @private
     */
    ArrayNode.prototype.formFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsOENBS0M7Ozs7OztJQUhHLHFGQUF1Qzs7Ozs7SUFFdkMsc0ZBQThDOzs7OztBQUtsRCxrREFFQztBQUVEO0lBU0ksa0JBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUN4SCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUFFRCxzQkFBVyw4QkFBUTs7OztRQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkJBQU87Ozs7UUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTs7Ozs7SUFDRCwyQkFBUTs7OztJQUFSLFVBQVMsS0FBYSxJQUFHLENBQUM7Ozs7SUFFMUIsa0NBQWU7OztJQUFmLGNBQW1CLENBQUM7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QUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Z0JBRXBELElBQUksR0FBUSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBN0NELENBQStCLFFBQVEsR0E2Q3RDOzs7Ozs7O0lBM0NHLDJDQUEyQzs7Ozs7SUFDM0MsOEJBQStCOztJQUMvQixvQ0FBcUQ7O0lBQ3JELG9DQUFxRDs7Ozs7SUFHYSxnQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcblxyXG4vLyBpbXBvcnQgeyBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5leHBvcnQgaW50ZXJmYWNlIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XHJcblxyXG4gICAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSk7XHJcblxyXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uID0gKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbiwgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpID0+IEdyb3VwTm9kZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiB7XHJcbiAgICAoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlIHtcclxuICAgIHB1YmxpYyBjaGlsZHJlbj86IGFueTtcclxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwO1xyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlO1xyXG4gICAgcHJpdmF0ZSBfZm9ybTogRm9ybTtcclxuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTW9kZWwgPSBxdWVzdGlvbjtcclxuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybTtcclxuICAgICAgICB0aGlzLl9wYXRoID0gcGFyZW50UGF0aCA/IHBhcmVudFBhdGggKyAnLicgKyBxdWVzdGlvbi5rZXkgOiBxdWVzdGlvbi5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBxdWVzdGlvbigpOiBRdWVzdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29udHJvbCgpOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmb3JtKCk6IEZvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge31cclxuXHJcbiAgICBjcmVhdGVDaGlsZE5vZGUoKSB7fVxyXG4gICAgcmVtb3ZlQ2hpbGROb2RlKCkge31cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFmTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VwTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcclxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENoaWxkKGtleTogc3RyaW5nLCBub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5ba2V5XSA9IG5vZGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXJyYXlOb2RlIGV4dGVuZHMgTm9kZUJhc2UgaW1wbGVtZW50cyBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xyXG5cclxuICAgIHByaXZhdGUgY2hpbGROb2RlQ3JlYXRlZEV2ZW50czogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBHcm91cE5vZGVbXTtcclxuICAgIHB1YmxpYyBjcmVhdGVDaGlsZEZ1bmM6IENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRGdW5jOiBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIHByaXZhdGUgZm9ybUZhY3Rvcnk/OiBGb3JtRmFjdG9yeSxcclxuICAgICAgICBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogR3JvdXBOb2RlW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGROb2RlKCk6IEdyb3VwTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ2hpbGRGdW5jKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGc6IEdyb3VwTm9kZSA9IHRoaXMuY3JlYXRlQ2hpbGRGdW5jKHRoaXMucXVlc3Rpb24gYXMgUmVwZWF0aW5nUXVlc3Rpb24sIHRoaXMsIHRoaXMuZm9ybUZhY3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUNoaWxkRnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkRnVuYyhpbmRleCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMucHVzaChmdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmdW5jOiBhbnkgPSB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHNbaV07XHJcbiAgICAgICAgICAgIGZ1bmMobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19