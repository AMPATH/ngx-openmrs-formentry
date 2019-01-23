/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    /**
     * @return {?}
     */
    get question() {
        return this._questionModel;
    }
    /**
     * @return {?}
     */
    get control() {
        return this._control;
    }
    /**
     * @return {?}
     */
    get form() {
        return this._form;
    }
    /**
     * @return {?}
     */
    get path() {
        return this._path;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAt(index) { }
    /**
     * @return {?}
     */
    createChildNode() { }
    /**
     * @return {?}
     */
    removeChildNode() { }
}
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
export class LeafNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
    }
}
export class GroupNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
        this._children = {};
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @param {?} key
     * @param {?} node
     * @return {?}
     */
    setChild(key, node) {
        this.children[key] = node;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    GroupNode.prototype._children;
}
export class ArrayNode extends NodeBase {
    /**
     * @param {?} question
     * @param {?=} control
     * @param {?=} parentControl
     * @param {?=} formFactory
     * @param {?=} form
     * @param {?=} parentPath
     */
    constructor(question, control, parentControl, formFactory, form, parentPath) {
        super(question, control, form, parentPath);
        this.formFactory = formFactory;
        this.childNodeCreatedEvents = [];
        this._children = [];
        this.childNodeCreatedEvents = [];
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @return {?}
     */
    createChildNode() {
        if (this.createChildFunc) {
            /** @type {?} */
            const g = this.createChildFunc((/** @type {?} */ (this.question)), this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAt(index) {
        if (this.removeChildFunc) {
            this.removeChildFunc(index, this);
        }
    }
    /**
     * @param {?} func
     * @return {?}
     */
    addChildNodeCreatedListener(func) {
        this.childNodeCreatedEvents.push(func);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    fireChildNodeCreatedListener(node) {
        for (let i = 0; i < this.childNodeCreatedEvents.length; i++) {
            /** @type {?} */
            const func = this.childNodeCreatedEvents[i];
            func(node);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSw4Q0FLQzs7Ozs7O0lBSEcscUZBQXVDOzs7OztJQUV2QyxzRkFBOEM7Ozs7O0FBS2xELGtEQUVDO0FBRUQsTUFBTTs7Ozs7OztJQVNGLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUN4SCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzdFLENBQUM7Ozs7SUFFRCxJQUFXLFFBQVE7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsSUFBVyxPQUFPO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFXLElBQUk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELFFBQVEsQ0FBQyxLQUFhLElBQUcsQ0FBQzs7OztJQUUxQixlQUFlLEtBQUksQ0FBQzs7OztJQUNwQixlQUFlLEtBQUksQ0FBQztDQUV2Qjs7O0lBbkNHLDRCQUFzQjs7Ozs7SUFDdEIsNEJBQStEOzs7OztJQUMvRCxrQ0FBcUM7Ozs7O0lBQ3JDLHlCQUFvQjs7Ozs7SUFDcEIseUJBQXNCOztJQUV0QixnQ0FBeUI7O0FBK0I3QixNQUFNLGVBQWdCLFNBQVEsUUFBUTs7Ozs7Ozs7SUFDbEMsWUFBWSxRQUFzQixFQUFFLE9BQXNELEVBQ3JGLGFBQTRELEVBQUUsSUFBVyxFQUFFLFVBQW1CO1FBQy9GLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0o7QUFFRCxNQUFNLGdCQUFpQixTQUFRLFFBQVE7Ozs7Ozs7O0lBRW5DLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUM5RixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQVcsUUFBUTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVNLFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBYztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0NBRUo7Ozs7OztJQWZHLDhCQUF1Qjs7QUFpQjNCLE1BQU0sZ0JBQWlCLFNBQVEsUUFBUTs7Ozs7Ozs7O0lBT25DLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFVLFdBQXlCLEVBQy9GLElBQVcsRUFBRSxVQUFtQjtRQUNoQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFGMkIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFOM0YsMkJBQXNCLEdBQVUsRUFBRSxDQUFDO1FBU3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELElBQVcsUUFBUTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFTSxlQUFlO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOztrQkFDakIsQ0FBQyxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBcUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNyRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRU0sUUFBUSxDQUFDLEtBQWE7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsMkJBQTJCLENBQUMsSUFBUztRQUNqQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsNEJBQTRCLENBQUMsSUFBZTtRQUN4QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7a0JBRXBELElBQUksR0FBUSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQTNDRywyQ0FBMkM7Ozs7O0lBQzNDLDhCQUErQjs7SUFDL0Isb0NBQXFEOztJQUNyRCxvQ0FBcUQ7Ozs7O0lBR2EsZ0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xuXG4vLyBpbXBvcnQgeyBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgUmVwZWF0aW5nUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5leHBvcnQgaW50ZXJmYWNlIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XG5cbiAgICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KTtcblxuICAgIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKTtcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiA9IChxdWVzdGlvbjogUmVwZWF0aW5nUXVlc3Rpb24sIG5vZGU6IEFycmF5Tm9kZSwgZmFjdG9yeT86IEZvcm1GYWN0b3J5KSA9PiBHcm91cE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiB7XG4gICAgKGluZGV4OiBudW1iZXIsIG5vZGU6IEFycmF5Tm9kZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZSB7XG4gICAgcHVibGljIGNoaWxkcmVuPzogYW55O1xuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwO1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uTW9kZWw6IFF1ZXN0aW9uQmFzZTtcbiAgICBwcml2YXRlIF9mb3JtOiBGb3JtO1xuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcblxuICAgIHB1YmxpYyBpbml0aWFsVmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTW9kZWwgPSBxdWVzdGlvbjtcbiAgICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICAgIHRoaXMuX3BhdGggPSBwYXJlbnRQYXRoID8gcGFyZW50UGF0aCArICcuJyArIHF1ZXN0aW9uLmtleSA6IHF1ZXN0aW9uLmtleTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHF1ZXN0aW9uKCk6IFF1ZXN0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk1vZGVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29udHJvbCgpOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZm9ybSgpOiBGb3JtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cbiAgICByZW1vdmVBdChpbmRleDogbnVtYmVyKSB7fVxuXG4gICAgY3JlYXRlQ2hpbGROb2RlKCkge31cbiAgICByZW1vdmVDaGlsZE5vZGUoKSB7fVxuXG59XG5cbmV4cG9ydCBjbGFzcyBMZWFmTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cE5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XG4gICAgcHJpdmF0ZSBfY2hpbGRyZW46IGFueTtcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDaGlsZChrZXk6IHN0cmluZywgbm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbltrZXldID0gbm9kZTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEFycmF5Tm9kZSBleHRlbmRzIE5vZGVCYXNlIGltcGxlbWVudHMgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcblxuICAgIHByaXZhdGUgY2hpbGROb2RlQ3JlYXRlZEV2ZW50czogYW55W10gPSBbXTtcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogR3JvdXBOb2RlW107XG4gICAgcHVibGljIGNyZWF0ZUNoaWxkRnVuYzogQ3JlYXRlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRGdW5jOiBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIHByaXZhdGUgZm9ybUZhY3Rvcnk/OiBGb3JtRmFjdG9yeSxcbiAgICAgICAgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IEdyb3VwTm9kZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDaGlsZE5vZGUoKTogR3JvdXBOb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ2hpbGRGdW5jKSB7XG4gICAgICAgICAgICBjb25zdCBnOiBHcm91cE5vZGUgPSB0aGlzLmNyZWF0ZUNoaWxkRnVuYyh0aGlzLnF1ZXN0aW9uIGFzIFJlcGVhdGluZ1F1ZXN0aW9uLCB0aGlzLCB0aGlzLmZvcm1GYWN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihnKTtcbiAgICAgICAgICAgIHJldHVybiBnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBdChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUNoaWxkRnVuYykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZEZ1bmMoaW5kZXgsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSkge1xuICAgICAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMucHVzaChmdW5jKTtcbiAgICB9XG5cbiAgICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjb25zdCBmdW5jOiBhbnkgPSB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHNbaV07XG4gICAgICAgICAgICBmdW5jKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdfQ==