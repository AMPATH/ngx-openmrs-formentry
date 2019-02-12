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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsOENBS0M7Ozs7OztJQUhHLHFGQUF1Qzs7Ozs7SUFFdkMsc0ZBQThDOzs7OztBQUtsRCxrREFFQztBQUVEO0lBU0ksa0JBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUN4SCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUFFRCxzQkFBVyw4QkFBUTs7OztRQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNkJBQU87Ozs7UUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDBCQUFJOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTs7Ozs7SUFDRCwyQkFBUTs7OztJQUFSLFVBQVMsS0FBYSxJQUFHLENBQUM7Ozs7SUFFMUIsa0NBQWU7OztJQUFmLGNBQW1CLENBQUM7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QUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Z0JBRXBELElBQUksR0FBUSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBN0NELENBQStCLFFBQVEsR0E2Q3RDOzs7Ozs7O0lBM0NHLDJDQUEyQzs7Ozs7SUFDM0MsOEJBQStCOztJQUMvQixvQ0FBcUQ7O0lBQ3JELG9DQUFxRDs7Ozs7SUFHYSxnQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5cbi8vIGltcG9ydCB7IEFmZUNvbnRyb2xUeXBlLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlRm9ybUNvbnRyb2wgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcblxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpO1xuXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uID0gKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbiwgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpID0+IEdyb3VwTm9kZTtcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uIHtcbiAgICAoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKTtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlIHtcbiAgICBwdWJsaWMgY2hpbGRyZW4/OiBhbnk7XG4gICAgcHJpdmF0ZSBfY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXA7XG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlO1xuICAgIHByaXZhdGUgX2Zvcm06IEZvcm07XG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuXG4gICAgcHVibGljIGluaXRpYWxWYWx1ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25Nb2RlbCA9IHF1ZXN0aW9uO1xuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybTtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhcmVudFBhdGggPyBwYXJlbnRQYXRoICsgJy4nICsgcXVlc3Rpb24ua2V5IDogcXVlc3Rpb24ua2V5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uTW9kZWw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb250cm9sKCk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmb3JtKCk6IEZvcm0ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuICAgIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHt9XG5cbiAgICBjcmVhdGVDaGlsZE5vZGUoKSB7fVxuICAgIHJlbW92ZUNoaWxkTm9kZSgpIHt9XG5cbn1cblxuZXhwb3J0IGNsYXNzIExlYWZOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3VwTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogYW55O1xuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0ge307XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGlsZHJlbigpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldENoaWxkKGtleTogc3RyaW5nLCBub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuW2tleV0gPSBub2RlO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQXJyYXlOb2RlIGV4dGVuZHMgTm9kZUJhc2UgaW1wbGVtZW50cyBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuXG4gICAgcHJpdmF0ZSBjaGlsZE5vZGVDcmVhdGVkRXZlbnRzOiBhbnlbXSA9IFtdO1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBHcm91cE5vZGVbXTtcbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGRGdW5jOiBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xuICAgIHB1YmxpYyByZW1vdmVDaGlsZEZ1bmM6IFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgcHJpdmF0ZSBmb3JtRmFjdG9yeT86IEZvcm1GYWN0b3J5LFxuICAgICAgICBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogR3JvdXBOb2RlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNoaWxkTm9kZSgpOiBHcm91cE5vZGUge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDaGlsZEZ1bmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGc6IEdyb3VwTm9kZSA9IHRoaXMuY3JlYXRlQ2hpbGRGdW5jKHRoaXMucXVlc3Rpb24gYXMgUmVwZWF0aW5nUXVlc3Rpb24sIHRoaXMsIHRoaXMuZm9ybUZhY3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5maXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGcpO1xuICAgICAgICAgICAgcmV0dXJuIGc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlQ2hpbGRGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkRnVuYyhpbmRleCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KSB7XG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5wdXNoKGZ1bmMpO1xuICAgIH1cblxuICAgIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZ1bmM6IGFueSA9IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50c1tpXTtcbiAgICAgICAgICAgIGZ1bmMobm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19