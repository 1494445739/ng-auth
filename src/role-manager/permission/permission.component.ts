import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TreeNode, Tree } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { clone } from 'lodash';

import { RoleManagerService } from '../role-manager.service';
import { ResourceManagerService } from '../../resource-manager/resource-manager.service';
import { Resource, Permission } from '../../models/models';
import { Alert, Confirm } from '@tzg/web-shared';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {
  roleId: string;
  resources: Resource[] = [];
  resourceNodes: TreeNode[] = [];
  @ViewChild('resourceTree') private resourceTree: Tree;
  pending = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: RoleManagerService,
    private resourceService: ResourceManagerService) { }
  ngOnInit() {
    this.initModels();
  }

  private initModels () {
    this.pending = true;
    this.route.params.switchMap((params: Params) => {
      this.roleId = params['id'];
      return Observable.combineLatest(
        this.service.getPermission(this.roleId),
        this.resourceService.list({ pageSize: 99999 })
      );
    }).subscribe(results => {
      if (results.every(r => r.status === 'ok')) {
        const permissions = results[0].data as Permission[];
        const allResources = results[1].data as Resource[];
        this.initResources(allResources, permissions);
      } else {
        if (results[0].status !== 'ok') {
          Alert(results[0].data as string);
        } else {
          Alert(results[1].data as string);
        }
      }
      this.pending = false;
    }, err => {
      Alert(err);
    });
  }

  private initResources (resources: Resource[], permissions: Permission[]) {
    const nodeMap = new Map<number, TreeNode>();
    const nodes: TreeNode[] = [];

    resources.forEach(item => {
      const node = {
        label: item.name,
        data: item
      };
      nodeMap.set(item.id, node);
      nodes.push(node);
    });
    nodes.forEach(node => {
      if (node.data.pid !== 0) {
        const parentNode = nodeMap.get(node.data.pid);
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(node);
        node.parent = parentNode;
      }
    });

    this.initNodeSelected(nodes.filter(node => !!permissions.find(pm => pm.resId === node.data.id)));
    this.resourceNodes = nodes.filter(node => node.data.pid === 0);
  }
  private initNodeSelected (selectedNodes: TreeNode[]) {
    selectedNodes.forEach(n => {
      this.propagateSelected(n);
      if (n.parent) {
        let parentNode = n.parent;
        while (parentNode) {
          parentNode.expanded = true;
          parentNode = parentNode.parent;
        }
      }
    });
  }
  onNodeSelectChange (checked: boolean, node: TreeNode) {
    if (checked) {
      this.propagateSelected(node);
    } else {
      this.propagateUnselected(node);
    }
  }
  private propagateSelected (node: TreeNode) {
    (<Resource>node.data).isSelected = true;
    if (node.parent) {
      this.propagateSelected(node.parent);
    }
  }
  private propagateUnselected (node: TreeNode) {
    (<Resource>node.data).isSelected = false;
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => this.propagateUnselected(child));
    }
  }

  submit () {
    const selectedResources = this.resources.filter(r => r.isSelected);
    this.pending = true;
    this.service.savePermission(this.roleId, selectedResources)
      .subscribe(result => {
        if (result.status === 'ok') {
          Alert('保存成功!');
        } else {
          Alert(result.data as string);
        }
        this.pending = false;
      }, err => {
        Alert(err);
        this.pending = false;
      });
  }
  close () {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onVisibleChange (visible: boolean) {
    if (!visible) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
