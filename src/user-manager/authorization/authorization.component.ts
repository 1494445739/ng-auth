import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { clone } from 'lodash';

import { RoleManagerService } from '../../role-manager/role-manager.service';
import { UserManagerService } from '../user-manager.service';
import { Role, Authorization } from '../../models/models';
import { Alert, Confirm } from '@tzg/ng-shared';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {
  userId: string;
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  pending = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: UserManagerService,
    private roleService: RoleManagerService) { }
  ngOnInit() {
    this.initModels();
  }

  private initModels () {
    this.pending = true;
    this.route.params.switchMap((params: Params) => {
      this.userId = params['id'];
      return Observable.combineLatest(
        this.service.getAuthorization(this.userId),
        this.roleService.list({ pageSize: 99999 })
      );
    }).subscribe(results => {
      if (results.every(r => r.status === 'ok')) {
        const authes = results[0].data as Authorization[];
        const allRoles = results[1].data as Role[];
        const selectedRoles = allRoles.filter(r => !!authes.find(auth => auth.roleId === r.id));

        this.initRoles(allRoles, selectedRoles);
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

  private initRoles (allRoles: Role[], selectedRoles: Role[]) {
    this.roles = allRoles;
    this.selectedRoles = selectedRoles;
  }

  submit () {
    const selectedRoles = this.selectedRoles;
    this.pending = true;
    this.service.saveAuthorization(this.userId, selectedRoles)
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
