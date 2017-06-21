import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { clone } from 'lodash';

import { ResourceManagerService } from '../resource-manager.service';
import { Resource } from '../../models/models';
import { Alert, Confirm, BaseFormComponent } from '@tzg/ng-shared';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent extends BaseFormComponent<Resource> {
  viewForm: NgForm;
  @ViewChild('resourceForm') currentForm: NgForm;

  defaultModel: Resource = {
    id: null,
    pid: 0,
    name: '',
    category: 'd',
    seq: 0,
    uri: ''
  };

  constructor(protected router: Router,
    protected route: ActivatedRoute,
    protected service: ResourceManagerService) {
      super(router, route, service);
    }

  init() {
    this.pending = true;
    this.route.params.switchMap((params: Params) => {
      if (params['nodeId'] && params['nodeId'].length > 0) {
        return this.service.get({ id: params['nodeId'] }).map(result => {
          if (result.status === 'ok') {
            return result.data as Resource;
          } else {
            throw result.data as string;
          }
        });
      } else {
        const model = <Resource>clone(this.defaultModel);
        if (params['parentId'] && params['parentId'].length > 0) {
          model.pid = params['parentId'];
          model.category = 'm';
        }
        return Observable.of(model);
      }
    }).subscribe(model => {
      this.model = model;
      this.pending = false;
    }, err => {
      Alert(err);
      this.pending = false;
    });
  }

  /* form validate */
  formErrors = {
    'name': '',
    'uri': ''
  };
  validationMessages = {
    'name': {
      'required': '资源名称不能为空',
      'minlength': '资源名称长度必须在2到20之间',
      'maxlength': '资源名称长度必须在2到20之间'
    },
    'uri': {
      'required': '资源地址不能为空'
    }
  };
}
