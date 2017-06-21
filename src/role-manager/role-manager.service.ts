import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService, PageQuery, Result } from '@tzg/web-shared';
import { Role, Resource, Permission } from '../models/models';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RoleManagerService extends BaseService<Role> {
  getUrl = 'auth/role/proto/get';
  listUrl = 'auth/role/proto/index';
  addUrl = 'auth/role/proto/post';
  editUrl = 'auth/role/proto/put';
  deleteUrl = 'auth/role/proto/delete';

  getPermissionUrl = 'auth/permission/get';
  savePermissionUrl = 'auth/permission/authz';

  constructor (protected http: Http) {
    super(http);
  }

  getPermission (roleId: string) {
    return this._get<Permission[]>(this.getPermissionUrl, { roleId });
  }
  savePermission (roleId: string, resources: Resource[]) {
    const data = { roleId, resourceIds: resources.map(r => r.id).join(',') };
    return this._post<any, string>(this.savePermissionUrl, data);
  }
}
