/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSw4Q0FLQzs7Ozs7O0lBSEcscUZBQXVDOzs7OztJQUV2QyxzRkFBOEM7Ozs7O0FBS2xELGtEQUVDO0FBRUQsTUFBTTs7Ozs7OztJQVNGLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUN4SCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzdFLENBQUM7Ozs7SUFFRCxJQUFXLFFBQVE7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsSUFBVyxPQUFPO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFXLElBQUk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELFFBQVEsQ0FBQyxLQUFhLElBQUcsQ0FBQzs7OztJQUUxQixlQUFlLEtBQUksQ0FBQzs7OztJQUNwQixlQUFlLEtBQUksQ0FBQztDQUV2Qjs7O0lBbkNHLDRCQUFzQjs7Ozs7SUFDdEIsNEJBQStEOzs7OztJ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OztJQUNyRCxvQ0FBcUQ7Ozs7O0lBR2EsZ0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5cclxuLy8gaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwLCBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSwgUmVwZWF0aW5nUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuZXhwb3J0IGludGVyZmFjZSBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xyXG5cclxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpO1xyXG5cclxuICAgIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiA9IChxdWVzdGlvbjogUmVwZWF0aW5nUXVlc3Rpb24sIG5vZGU6IEFycmF5Tm9kZSwgZmFjdG9yeT86IEZvcm1GYWN0b3J5KSA9PiBHcm91cE5vZGU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24ge1xyXG4gICAgKGluZGV4OiBudW1iZXIsIG5vZGU6IEFycmF5Tm9kZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlQmFzZSB7XHJcbiAgICBwdWJsaWMgY2hpbGRyZW4/OiBhbnk7XHJcbiAgICBwcml2YXRlIF9jb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cDtcclxuICAgIHByaXZhdGUgX3F1ZXN0aW9uTW9kZWw6IFF1ZXN0aW9uQmFzZTtcclxuICAgIHByaXZhdGUgX2Zvcm06IEZvcm07XHJcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxWYWx1ZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbk1vZGVsID0gcXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhcmVudFBhdGggPyBwYXJlbnRQYXRoICsgJy4nICsgcXVlc3Rpb24ua2V5IDogcXVlc3Rpb24ua2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25Nb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbnRyb2woKTogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZm9ybSgpOiBGb3JtIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcclxuICAgIH1cclxuICAgIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHt9XHJcblxyXG4gICAgY3JlYXRlQ2hpbGROb2RlKCkge31cclxuICAgIHJlbW92ZUNoaWxkTm9kZSgpIHt9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGVhZk5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cE5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XHJcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogYW55O1xyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxyXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDaGlsZChrZXk6IHN0cmluZywgbm9kZTogTm9kZUJhc2UpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2tleV0gPSBub2RlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFycmF5Tm9kZSBleHRlbmRzIE5vZGVCYXNlIGltcGxlbWVudHMgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNoaWxkTm9kZUNyZWF0ZWRFdmVudHM6IGFueVtdID0gW107XHJcbiAgICBwcml2YXRlIF9jaGlsZHJlbjogR3JvdXBOb2RlW107XHJcbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGRGdW5jOiBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xyXG4gICAgcHVibGljIHJlbW92ZUNoaWxkRnVuYzogUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBwcml2YXRlIGZvcm1GYWN0b3J5PzogRm9ybUZhY3RvcnksXHJcbiAgICAgICAgZm9ybT86IEZvcm0sIHBhcmVudFBhdGg/OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IEdyb3VwTm9kZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUNoaWxkTm9kZSgpOiBHcm91cE5vZGUge1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNoaWxkRnVuYykge1xyXG4gICAgICAgICAgICBjb25zdCBnOiBHcm91cE5vZGUgPSB0aGlzLmNyZWF0ZUNoaWxkRnVuYyh0aGlzLnF1ZXN0aW9uIGFzIFJlcGVhdGluZ1F1ZXN0aW9uLCB0aGlzLCB0aGlzLmZvcm1GYWN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5maXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW1vdmVDaGlsZEZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZEZ1bmMoaW5kZXgsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZnVuYzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZnVuYzogYW55ID0gdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBmdW5jKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==