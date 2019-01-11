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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQSw4Q0FLQzs7Ozs7O0lBSEcscUZBQXVDOzs7OztJQUV2QyxzRkFBOEM7Ozs7O0FBS2xELGtEQUVDO0FBRUQsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFTakIsWUFBWSxRQUFzQixFQUFFLE9BQXNELEVBQUUsSUFBVyxFQUFFLFVBQW1CO1FBQ3hILElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFDN0UsQ0FBQzs7OztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELFFBQVEsQ0FBQyxLQUFhLElBQUcsQ0FBQzs7OztJQUUxQixlQUFlLEtBQUksQ0FBQzs7OztJQUNwQixlQUFlLEtBQUksQ0FBQztDQUV2Qjs7O0lBbkNHLDRCQUFzQjs7Ozs7SUFDdEIsNEJBQStEOzs7OztJQUMvRCxrQ0FB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bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuLy8gaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwLCBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UsIFJlcGVhdGluZ1F1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuZXhwb3J0IGludGVyZmFjZSBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuXG4gICAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSk7XG5cbiAgICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSk7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24gPSAocXVlc3Rpb246IFJlcGVhdGluZ1F1ZXN0aW9uLCBub2RlOiBBcnJheU5vZGUsIGZhY3Rvcnk/OiBGb3JtRmFjdG9yeSkgPT4gR3JvdXBOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbW92ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb24ge1xuICAgIChpbmRleDogbnVtYmVyLCBub2RlOiBBcnJheU5vZGUpO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2Uge1xuICAgIHB1YmxpYyBjaGlsZHJlbj86IGFueTtcbiAgICBwcml2YXRlIF9jb250cm9sOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cDtcbiAgICBwcml2YXRlIF9xdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2U7XG4gICAgcHJpdmF0ZSBfZm9ybTogRm9ybTtcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB0aGlzLl9xdWVzdGlvbk1vZGVsID0gcXVlc3Rpb247XG4gICAgICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgICAgICB0aGlzLl9wYXRoID0gcGFyZW50UGF0aCA/IHBhcmVudFBhdGggKyAnLicgKyBxdWVzdGlvbi5rZXkgOiBxdWVzdGlvbi5rZXk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBxdWVzdGlvbigpOiBRdWVzdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25Nb2RlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvbnRyb2woKTogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm0oKTogRm9ybSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge31cblxuICAgIGNyZWF0ZUNoaWxkTm9kZSgpIHt9XG4gICAgcmVtb3ZlQ2hpbGROb2RlKCkge31cblxufVxuXG5leHBvcnQgY2xhc3MgTGVhZk5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xuICAgICAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXBOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBhbnk7XG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q2hpbGQoa2V5OiBzdHJpbmcsIG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5ba2V5XSA9IG5vZGU7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheU5vZGUgZXh0ZW5kcyBOb2RlQmFzZSBpbXBsZW1lbnRzIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XG5cbiAgICBwcml2YXRlIGNoaWxkTm9kZUNyZWF0ZWRFdmVudHM6IGFueVtdID0gW107XG4gICAgcHJpdmF0ZSBfY2hpbGRyZW46IEdyb3VwTm9kZVtdO1xuICAgIHB1YmxpYyBjcmVhdGVDaGlsZEZ1bmM6IENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XG4gICAgcHVibGljIHJlbW92ZUNoaWxkRnVuYzogUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBwcml2YXRlIGZvcm1GYWN0b3J5PzogRm9ybUZhY3RvcnksXG4gICAgICAgIGZvcm0/OiBGb3JtLCBwYXJlbnRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGlsZHJlbigpOiBHcm91cE5vZGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGROb2RlKCk6IEdyb3VwTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNoaWxkRnVuYykge1xuICAgICAgICAgICAgY29uc3QgZzogR3JvdXBOb2RlID0gdGhpcy5jcmVhdGVDaGlsZEZ1bmModGhpcy5xdWVzdGlvbiBhcyBSZXBlYXRpbmdRdWVzdGlvbiwgdGhpcywgdGhpcy5mb3JtRmFjdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZyk7XG4gICAgICAgICAgICByZXR1cm4gZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5yZW1vdmVDaGlsZEZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGRGdW5jKGluZGV4LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLnB1c2goZnVuYyk7XG4gICAgfVxuXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3QgZnVuYzogYW55ID0gdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzW2ldO1xuICAgICAgICAgICAgZnVuYyhub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXX0=