import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { clone } from 'lodash';

import { RoleManagerService } from '../role-manager.service';
import { Role } from '../../models/models';
import { Alert, Confirm, BaseFormComponent } from '@tzg/web-shared';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent extends BaseFormComponent<Role> {
  viewForm: NgForm;
  @ViewChild('roleForm') currentForm: NgForm;

  defaultModel: Role = {
    id: null,
    name: ''
  };

  constructor(protected router: Router,
    protected route: ActivatedRoute,
    protected service: RoleManagerService) {
      super(router, route, service);
    }

  /* form validate */
  formErrors = {
    'name': ''
  };
  validationMessages = {
    'name': {
      'required': '角色名称不能为空',
      'minlength': '角色名称长度必须在2到10之间',
      'maxlength': '角色名称长度必须在2到10之间'
    }
  };
}
