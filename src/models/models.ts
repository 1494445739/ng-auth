import { DataModel } from '@tzg/ng-shared';

/**
 * 角色
 * @export
 * @interface Role
 * @extends {DataModel}
 */
export interface Role extends DataModel {
  id?: number;
  name: string;
  cdt?: string;
  udt?: string;
}

/**
 * 资源
 * @export
 * @interface Resource
 * @extends {DataModel}
 */
export interface Resource extends DataModel {
  id?: number;
  pid: number;
  name: string;
  category: string;
  seq: number;
  uri: string;
  cdt?: string;
  udt?: string;
  isSelected?: boolean;
}

/**
 * 用户
 * @export
 * @interface User
 * @extends {DataModel}
 */
export interface User extends DataModel {
  id?: number;
  name: string;
  password?: string;
  cdt?: string;
  udt?: string;
}


/**
 * 用户-角色 授权关系
 * @export
 * @interface Authorization
 * @extends {DataModel}
 */
export interface Authorization extends DataModel {
  id: number;
  roleId: number;
  userId: number;
  cdt: number;
  udt: number;
}

/**
 * 角色-资源 授权关系
 * @export
 * @interface Permission
 * @extends {DataModel}
 */
export interface Permission extends DataModel {
  id: number;
  roleId: number;
  resId: number;
  cdt: number;
  udt: number;
}
