import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { Alert, Confirm, Query, BaseListComponent } from '@tzg/web-shared';
import { ResourceManagerService } from '../resource-manager.service';
import { Resource } from '../../models/models';

export interface ResourceQuery extends Query {
  name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends BaseListComponent<Resource> {
  query: ResourceQuery;
  nodes: TreeNode[];

  constructor(protected service: ResourceManagerService) {
    super(service);
    this.pagination = false;
  }
  search () {
    this.query.pageSize = 99999;
    this.service.list(this.query).subscribe(
      result => {
        if (result.status === 'ok') {
          this.list = result.data as Resource[];
          this.initResourceData(this.list);
        } else {
          Alert(result.data as string);
        }
      },
      err => {
        Alert(err);
      }
    );
  }
  delete (node: TreeNode) {
    Confirm('确认要删除吗?').then(ok => {
      if (!ok) { return; }

      this.service.delete(node.data as Resource).subscribe(success => {
        if (success) {
          Alert('删除成功!').then(_ => this.removeNode(node));
        } else {
          Alert('操作失败!');
        }
      }, err => {
        Alert(err);
      });
    });
  }

  private removeNode (node: TreeNode) {
    const index = node.parent.children.indexOf(node);
    node.parent.children.splice(index, 1);
  }
  private initResourceData (resources: Resource[]) {
    const nodeMap = new Map<number, TreeNode>();
    const nodeList: TreeNode[] = [];
    let nodes = resources.map(rec => ({ data: rec } as TreeNode));

    nodes = nodes.sort((a, b) => { return a.data.seq - b.data.seq });
    nodes.forEach((node) => {
      nodeMap.set(node.data.id, node);
      if (!node.data.isLeaf) {
        node.children = [];
      }
      if (node.data.pid === 0) {
        nodeList.push(node);
      }
    });
    nodes.forEach((node) => {
      if (node.data.pid !== 0) {
        const parentNode = nodeMap.get(node.data.pid);
        node.parent = parentNode;
        parentNode.children.push(node);
      }
    });

    this.nodes = nodeList;
  }
}
