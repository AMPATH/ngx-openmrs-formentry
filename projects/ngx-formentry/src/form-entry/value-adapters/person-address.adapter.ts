import { Injectable } from '@angular/core';

import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';

@Injectable()
export class PersonAddressAdapter implements ValueAdapter {
  constructor() {}

  generateFormPayload(form: Form) {
    return this.generateNodePayload(form.rootNode);
  }

  generateNodePayload(rootNode: NodeBase) {
    const nodes = this.getPersonAddressNodes(rootNode);
    const payload = [];
    nodes.forEach((node) => {
      if (
        node.control.value !== null &&
        node.control.value !== undefined &&
        node.control.value !== '' &&
        node.initialValue !== node.control.value
      ) {
        const addressType =
          node.question.extras.questionOptions.addressType +
          ':' +
          node.control.value;
        payload.push({
          addressType
        });
      }
    });
    return payload;
  }

  populateForm(form: Form, payload) {
    this.populateNode(form.rootNode, payload);
  }

  populateNode(rootNode: NodeBase, payload) {
    if (!Array.isArray(payload)) {
      throw new Error('Expected an array of addresses');
    }

    const nodes = this.getPersonAddressNodes(rootNode);

    nodes.forEach((node) => {
      payload.forEach((element) => {
        if (
          element.attributeType.uuid ===
          node.question.extras.questionOptions.attributeType
        ) {
          if (element.value.uuid) {
            node.control.setValue(element.value.uuid);
            node.initialValue = element.value.uuid;
          } else {
            node.control.setValue(element.value);
            node.initialValue = element.value;
          }
        }
      });
    });
  }

  getPersonAddressNodes(rootNode: NodeBase): Array<NodeBase> {
    const results: Array<NodeBase> = [];
    this._getPersonAddressNodes(rootNode, results);
    return results;
  }

  private _getPersonAddressNodes(rootNode: NodeBase, array: Array<NodeBase>) {
    if (
      rootNode.question.extras &&
      rootNode.question.extras.type === 'personAddress'
    ) {
      array.push(rootNode);
    }

    if (rootNode instanceof GroupNode) {
      const node = rootNode as GroupNode;
      // tslint:disable-next-line:forin
      for (const o in node.children) {
        if (node.children[o] instanceof NodeBase) {
          this._getPersonAddressNodes(node.children[o], array);
        }
      }
    }

    if (rootNode instanceof ArrayNode) {
      const node = rootNode as ArrayNode;
      node.children.forEach((child) => {
        this._getPersonAddressNodes(child, array);
      });
    }
  }
}
