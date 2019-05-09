# 授权管理
---

授权管理组件

## Examples

<Common-BasicUsage>
  <view-authorize-authorize />
</Common-BasicUsage>


## Usage

```js
import AuthorizeManage from '@sdx/view/components/role-manage';

AuthorizeManage.viewRouter.register(router, '/home');
```


## API


```js
import AuthorizeManage from './src/Index';
// 路由配置
const routeCfg = [
    {
        path: '/sdxv-authorize-manage',
        name: 'SdxvAuthorizeManage',
        component: AuthorizeManage,
        meta: {
            breadcrumbName: '授权管理',
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