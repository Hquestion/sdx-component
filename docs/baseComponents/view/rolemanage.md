# 角色管理
---

角色管理组件

## Examples

<Common-BasicUsage>
  <view-rolemanage-rolemanage />
</Common-BasicUsage>


## Usage

```js
import RoleManage from '@sdx/view/components/role-manage';

RoleManage.viewRouter.register(router, '/home');
```


## API


```js
import RoleManage from './src/Index';
// 路由配置
const routeCfg = [
    {
        path: '/sdxv-role-manage',
        name: 'SdxvRoleManage',
        component: RoleManage,
        meta: {
            breadcrumbName: '角色管理',
            system: 'manage'
        }
    }
];


// 注册到应用路由的方法
const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

// 把组件及路由注册方法暴露，暴露路由配置的目的是为了给外部应用修改配置
export default {RoleManage, viewRouter};

```