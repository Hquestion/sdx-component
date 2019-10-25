# 用户管理
---

用户管理组件

## Examples

<Common-BasicUsage>
  <view-usermanage-usermanage />
</Common-BasicUsage>


## Usage

```js
import UserManage from '@sdx/view/components/user-manage';

AuthorizeManage.viewRouter.register(router, '/user');
```


## API


```js
import UserManage from './src/Index';
// 路由配置
const routeCfg = [
    {
        path: '/sdxv-user-manage',
        name: 'SdxvUserManage',
        component: UserManage,
        meta: {
            breadcrumbName: '用户管理',
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
export default {AuthorizeManage, viewRouter};

```