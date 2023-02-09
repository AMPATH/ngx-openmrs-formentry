export class NodeBase {
    constructor(question, control, form, parentPath) {
        this._control = control;
        this._questionModel = question;
        this._form = form;
        this._path = parentPath ? parentPath + '.' + question.key : question.key;
    }
    get question() {
        return this._questionModel;
    }
    get control() {
        return this._control;
    }
    get form() {
        return this._form;
    }
    get path() {
        return this._path;
    }
    removeAt(index) { }
    createChildNode() { }
    removeChildNode() { }
}
export class LeafNode extends NodeBase {
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
    }
}
export class GroupNode extends NodeBase {
    constructor(question, control, parentControl, form, parentPath) {
        super(question, control, form, parentPath);
        this._children = {};
    }
    get children() {
        return this._children;
    }
    setChild(key, node) {
        this.children[key] = node;
    }
}
export class ArrayNode extends NodeBase {
    constructor(question, control, parentControl, formFactory, form, parentPath) {
        super(question, control, form, parentPath);
        this.formFactory = formFactory;
        this.childNodeCreatedEvents = [];
        this._children = [];
        this.childNodeCreatedEvents = [];
    }
    get children() {
        return this._children;
    }
    createChildNode() {
        if (this.createChildFunc) {
            const g = this.createChildFunc(this.question, this, this.formFactory);
            this.fireChildNodeCreatedListener(g);
            return g;
        }
        return null;
    }
    removeAt(index) {
        const removePrompt = confirm('Are you sure you want to remove?');
        if (removePrompt) {
            if (this.removeChildFunc) {
                this.removeChildFunc(index, this);
            }
        }
    }
    addChildNodeCreatedListener(func) {
        this.childNodeCreatedEvents.push(func);
    }
    fireChildNodeCreatedListener(node) {
        for (let i = 0; i < this.childNodeCreatedEvents.length; i++) {
            const func = this.childNodeCreatedEvents[i];
            func(node);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCQSxNQUFNO0lBU0osWUFDRSxRQUFzQixFQUN0QixPQUFzRCxFQUN0RCxJQUFXLEVBQ1gsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMzRSxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWEsSUFBRyxDQUFDO0lBRTFCLGVBQWUsS0FBSSxDQUFDO0lBQ3BCLGVBQWUsS0FBSSxDQUFDO0NBQ3JCO0FBRUQsTUFBTSxlQUFnQixTQUFRLFFBQVE7SUFDcEMsWUFDRSxRQUFzQixFQUN0QixPQUFzRCxFQUN0RCxhQUE0RCxFQUM1RCxJQUFXLEVBQ1gsVUFBbUI7UUFFbkIsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQUVELE1BQU0sZ0JBQWlCLFNBQVEsUUFBUTtJQUVyQyxZQUNFLFFBQXNCLEVBQ3RCLE9BQXNELEVBQ3RELGFBQTRELEVBQzVELElBQVcsRUFDWCxVQUFtQjtRQUVuQixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sUUFBUSxDQUFDLEdBQVcsRUFBRSxJQUFjO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sZ0JBQWlCLFNBQVEsUUFBUTtJQU1yQyxZQUNFLFFBQXNCLEVBQ3RCLE9BQXNELEVBQ3RELGFBQTRELEVBQ3BELFdBQXlCLEVBQ2pDLElBQVcsRUFDWCxVQUFtQjtRQUVuQixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFKbkMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFUM0IsMkJBQXNCLEdBQVUsRUFBRSxDQUFDO1FBY3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sZUFBZTtRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUN2QyxJQUFJLENBQUMsUUFBNkIsRUFDbEMsSUFBSSxFQUNKLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7WUFDRixJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFhO1FBQzNCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELDJCQUEyQixDQUFDLElBQVM7UUFDbkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNEJBQTRCLENBQUMsSUFBZTtRQUMxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1RCxNQUFNLElBQUksR0FBUSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcblxuLy8gaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwLCBBZmVGb3JtQ29udHJvbCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UsIFJlcGVhdGluZ1F1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5pbXBvcnQge1xuICBBZmVGb3JtQ29udHJvbCxcbiAgQWZlRm9ybUFycmF5LFxuICBBZmVGb3JtR3JvdXBcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyIHtcbiAgYWRkQ2hpbGROb2RlQ3JlYXRlZExpc3RlbmVyKGZ1bmM6IGFueSk7XG5cbiAgZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihub2RlOiBHcm91cE5vZGUpO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uID0gKFxuICBxdWVzdGlvbjogUmVwZWF0aW5nUXVlc3Rpb24sXG4gIG5vZGU6IEFycmF5Tm9kZSxcbiAgZmFjdG9yeT86IEZvcm1GYWN0b3J5XG4pID0+IEdyb3VwTm9kZTtcblxuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVBcnJheUNoaWxkTm9kZUZ1bmN0aW9uIHtcbiAgKGluZGV4OiBudW1iZXIsIG5vZGU6IEFycmF5Tm9kZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZSB7XG4gIHB1YmxpYyBjaGlsZHJlbj86IGFueTtcbiAgcHJpdmF0ZSBfY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXA7XG4gIHByaXZhdGUgX3F1ZXN0aW9uTW9kZWw6IFF1ZXN0aW9uQmFzZTtcbiAgcHJpdmF0ZSBfZm9ybTogRm9ybTtcbiAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpbml0aWFsVmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBmb3JtPzogRm9ybSxcbiAgICBwYXJlbnRQYXRoPzogc3RyaW5nXG4gICkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgIHRoaXMuX3F1ZXN0aW9uTW9kZWwgPSBxdWVzdGlvbjtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcbiAgICB0aGlzLl9wYXRoID0gcGFyZW50UGF0aCA/IHBhcmVudFBhdGggKyAnLicgKyBxdWVzdGlvbi5rZXkgOiBxdWVzdGlvbi5rZXk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHF1ZXN0aW9uKCk6IFF1ZXN0aW9uQmFzZSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uTW9kZWw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbnRyb2woKTogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgcHVibGljIGdldCBmb3JtKCk6IEZvcm0ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cbiAgcmVtb3ZlQXQoaW5kZXg6IG51bWJlcikge31cblxuICBjcmVhdGVDaGlsZE5vZGUoKSB7fVxuICByZW1vdmVDaGlsZE5vZGUoKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTGVhZk5vZGUgZXh0ZW5kcyBOb2RlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbD86IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBmb3JtPzogRm9ybSxcbiAgICBwYXJlbnRQYXRoPzogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtLCBwYXJlbnRQYXRoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JvdXBOb2RlIGV4dGVuZHMgTm9kZUJhc2Uge1xuICBwcml2YXRlIF9jaGlsZHJlbjogYW55O1xuICBjb25zdHJ1Y3RvcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm0sXG4gICAgcGFyZW50UGF0aD86IHN0cmluZ1xuICApIHtcbiAgICBzdXBlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSwgcGFyZW50UGF0aCk7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBwdWJsaWMgc2V0Q2hpbGQoa2V5OiBzdHJpbmcsIG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgdGhpcy5jaGlsZHJlbltrZXldID0gbm9kZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXJyYXlOb2RlIGV4dGVuZHMgTm9kZUJhc2UgaW1wbGVtZW50cyBDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIge1xuICBwcml2YXRlIGNoaWxkTm9kZUNyZWF0ZWRFdmVudHM6IGFueVtdID0gW107XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBHcm91cE5vZGVbXTtcbiAgcHVibGljIGNyZWF0ZUNoaWxkRnVuYzogQ3JlYXRlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcbiAgcHVibGljIHJlbW92ZUNoaWxkRnVuYzogUmVtb3ZlQXJyYXlDaGlsZE5vZGVGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w/OiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCxcbiAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgcHJpdmF0ZSBmb3JtRmFjdG9yeT86IEZvcm1GYWN0b3J5LFxuICAgIGZvcm0/OiBGb3JtLFxuICAgIHBhcmVudFBhdGg/OiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0sIHBhcmVudFBhdGgpO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgdGhpcy5jaGlsZE5vZGVDcmVhdGVkRXZlbnRzID0gW107XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IEdyb3VwTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ2hpbGROb2RlKCk6IEdyb3VwTm9kZSB7XG4gICAgaWYgKHRoaXMuY3JlYXRlQ2hpbGRGdW5jKSB7XG4gICAgICBjb25zdCBnOiBHcm91cE5vZGUgPSB0aGlzLmNyZWF0ZUNoaWxkRnVuYyhcbiAgICAgICAgdGhpcy5xdWVzdGlvbiBhcyBSZXBlYXRpbmdRdWVzdGlvbixcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdGhpcy5mb3JtRmFjdG9yeVxuICAgICAgKTtcbiAgICAgIHRoaXMuZmlyZUNoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihnKTtcbiAgICAgIHJldHVybiBnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBdChpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgcmVtb3ZlUHJvbXB0ID0gY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZT8nKTtcbiAgICBpZiAocmVtb3ZlUHJvbXB0KSB7XG4gICAgICBpZiAodGhpcy5yZW1vdmVDaGlsZEZ1bmMpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZEZ1bmMoaW5kZXgsIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZENoaWxkTm9kZUNyZWF0ZWRMaXN0ZW5lcihmdW5jOiBhbnkpIHtcbiAgICB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMucHVzaChmdW5jKTtcbiAgfVxuXG4gIGZpcmVDaGlsZE5vZGVDcmVhdGVkTGlzdGVuZXIobm9kZTogR3JvdXBOb2RlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkTm9kZUNyZWF0ZWRFdmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZ1bmM6IGFueSA9IHRoaXMuY2hpbGROb2RlQ3JlYXRlZEV2ZW50c1tpXTtcbiAgICAgIGZ1bmMobm9kZSk7XG4gICAgfVxuICB9XG59XG4iXX0=