import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { clone } from 'lodash';

import { UserManagerService } from '../user-manager.service';
import { User } from '../../models/models';
import { Alert, Confirm, BaseFormComponent } from '@tzg/web-shared';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent extends BaseFormComponent<User> {
  viewForm: NgForm;
  @ViewChild('userForm') currentForm: NgForm;

  defaultModel: User = {
    id: null,
    name: '',
    password: ''
  };

  constructor(protected router: Router,
    protected route: ActivatedRoute,
    protected service: UserManagerService) {
      super(router, route, service);
    }

  /* form validate */
  formErrors = {
    'name': '',
    'password': 'password'
  };
  validationMessages = {
    'name': {
      'required': '用户名不能为空',
      'minlength': '用户名长度必须在2到10之间',
      'maxlength': '用户名长度必须在2到10之间'
    },
    'password': {
      'required': '密码不能为空',
      'minlength': '密码长度必须在2到20之间',
      'maxlength': '密码长度必须在2到20之间'
    }
  };
}
