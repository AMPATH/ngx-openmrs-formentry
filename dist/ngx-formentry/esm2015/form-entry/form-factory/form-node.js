/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ChildNodeCreatedListener() { }
function ChildNodeCreatedListener_tsickle_Closure_declarations() {
    /** @type {?} */
    ChildNodeCreatedListener.prototype.addChildNodeCreatedListener;
    /** @type {?} */
    ChildNodeCreatedListener.prototype.fireChildNodeCreatedListener;
}
/**
 * @record
 */
export function RemoveArrayChildNodeFunction() { }
function RemoveArrayChildNodeFunction_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (index: number, node: ArrayNode);
    */
}
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
function NodeBase_tsickle_Closure_declarations() {
    /** @type {?} */
    NodeBase.prototype.children;
    /** @type {?} */
    NodeBase.prototype._control;
    /** @type {?} */
    NodeBase.prototype._questionModel;
    /** @type {?} */
    NodeBase.prototype._form;
    /** @type {?} */
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
function GroupNode_tsickle_Closure_declarations() {
    /** @type {?} */
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
            const /** @type {?} */ g = this.createChildFunc(/** @type {?} */ (this.question), this, this.formFactory);
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
        for (let /** @type {?} */ i = 0; i < this.childNodeCreatedEvents.length; i++) {
            const /** @type {?} */ func = this.childNodeCreatedEvents[i];
            func(node);
        }
    }
}
function ArrayNode_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayNode.prototype.childNodeCreatedEvents;
    /** @type {?} */
    ArrayNode.prototype._children;
    /** @type {?} */
    ArrayNode.prototype.createChildFunc;
    /** @type {?} */
    ArrayNode.prototype.removeChildFunc;
    /** @type {?} */
    ArrayNode.prototype.formFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU07Ozs7Ozs7SUFTRixZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFBRSxJQUFXLEVBQUUsVUFBbUI7UUFDeEgsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztLQUM1RTs7OztRQUVVLFFBQVE7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7Ozs7UUFHcEIsT0FBTztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztRQUdkLElBQUk7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7UUFHWCxJQUFJO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUV0QixRQUFRLENBQUMsS0FBYSxLQUFJOzs7O0lBRTFCLGVBQWUsTUFBSzs7OztJQUNwQixlQUFlLE1BQUs7Q0FFdkI7Ozs7Ozs7Ozs7Ozs7OztBQUVELE1BQU0sZUFBZ0IsU0FBUSxRQUFROzs7Ozs7OztJQUNsQyxZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFDckYsYUFBNEQsRUFBRSxJQUFXLEVBQUUsVUFBbUI7UUFDL0YsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0NBQ0o7QUFFRCxNQUFNLGdCQUFpQixTQUFRLFFBQVE7Ozs7Ozs7O0lBRW5DLFlBQVksUUFBc0IsRUFBRSxPQUFzRCxFQUN0RixhQUE0RCxFQUFFLElBQVcsRUFBRSxVQUFtQjtRQUM5RixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDdkI7Ozs7UUFFVSxRQUFRO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7SUFHbkIsUUFBUSxDQUFDLEdBQVcsRUFBRSxJQUFjO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOztDQUdqQzs7Ozs7QUFFRCxNQUFNLGdCQUFpQixTQUFRLFFBQVE7Ozs7Ozs7OztJQU9uQyxZQUFZLFFBQXNCLEVBQUUsT0FBc0QsRUFDdEYsYUFBNEQsRUFBVSxXQUF5QixFQUMvRixJQUFXLEVBQUUsVUFBbUI7UUFDaEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRjJCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO3NDQU4zRCxFQUFFO1FBU3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7S0FDcEM7Ozs7UUFFVSxRQUFRO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7O0lBR25CLGVBQWU7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsdUJBQU0sQ0FBQyxHQUFjLElBQUksQ0FBQyxlQUFlLG1CQUFDLElBQUksQ0FBQyxRQUE2QixHQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdULFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDOzs7Ozs7SUFHTCwyQkFBMkIsQ0FBQyxJQUFTO1FBQ2pDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRUQsNEJBQTRCLENBQUMsSUFBZTtRQUN4QyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFFMUQsdUJBQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZDtLQUNKO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtRmFjdG9yeSB9IGZyb20gJy4vZm9ybS5mYWN0b3J5JztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XHJcblxyXG4vLyBpbXBvcnQgeyBBZmVDb250cm9sVHlwZSwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlLCBSZXBlYXRpbmdRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xyXG5leHBvcnQgaW50ZXJmYWNlIENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lciB7XHJcblxyXG4gICAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSk7XHJcblxyXG4gICAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uID0gKHF1ZXN0aW9uOiBSZXBlYXRpbmdRdWVzdGlvbiwgbm9kZTogQXJyYXlOb2RlLCBmYWN0b3J5PzogRm9ybUZhY3RvcnkpID0+IEdyb3VwTm9kZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbiB7XHJcbiAgICAoaW5kZXg6IG51bWJlciwgbm9kZTogQXJyYXlOb2RlKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlIHtcclxuICAgIHB1YmxpYyBjaGlsZHJlbj86IGFueTtcclxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwO1xyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlO1xyXG4gICAgcHJpdmF0ZSBfZm9ybTogRm9ybTtcclxuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbFZhbHVlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTW9kZWwgPSBxdWVzdGlvbjtcclxuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybTtcclxuICAgICAgICB0aGlzLl9wYXRoID0gcGFyZW50UGF0aCA/IHBhcmVudFBhdGggKyAnLicgKyBxdWVzdGlvbi5rZXkgOiBxdWVzdGlvbi5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBxdWVzdGlvbigpOiBRdWVzdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29udHJvbCgpOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmb3JtKCk6IEZvcm0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge31cclxuXHJcbiAgICBjcmVhdGVDaGlsZE5vZGUoKSB7fVxyXG4gICAgcmVtb3ZlQ2hpbGROb2RlKCkge31cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFmTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VwTm9kZSBleHRlbmRzIE5vZGVCYXNlIHtcclxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBjb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXHJcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENoaWxkKGtleTogc3RyaW5nLCBub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5ba2V5XSA9IG5vZGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXJyYXlOb2RlIGV4dGVuZHMgTm9kZUJhc2UgaW1wbGVtZW50cyBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xyXG5cclxuICAgIHByaXZhdGUgY2hpbGROb2RlQ3JlYXRlZEV2ZW50czogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBHcm91cE5vZGVbXTtcclxuICAgIHB1YmxpYyBjcmVhdGVDaGlsZEZ1bmM6IENyZWF0ZUFycmF5Q2hpbGROb2RlRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRGdW5jOiBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcclxuICAgICAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsIHByaXZhdGUgZm9ybUZhY3Rvcnk/OiBGb3JtRmFjdG9yeSxcclxuICAgICAgICBmb3JtPzogRm9ybSwgcGFyZW50UGF0aD86IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogR3JvdXBOb2RlW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2hpbGROb2RlKCk6IEdyb3VwTm9kZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ2hpbGRGdW5jKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGc6IEdyb3VwTm9kZSA9IHRoaXMuY3JlYXRlQ2hpbGRGdW5jKHRoaXMucXVlc3Rpb24gYXMgUmVwZWF0aW5nUXVlc3Rpb24sIHRoaXMsIHRoaXMuZm9ybUZhY3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIoZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUNoaWxkRnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkRnVuYyhpbmRleCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMucHVzaChmdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKG5vZGU6IEdyb3VwTm9kZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmdW5jOiBhbnkgPSB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHNbaV07XHJcbiAgICAgICAgICAgIGZ1bmMobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19