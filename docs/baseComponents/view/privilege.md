# 权限管理
---

权限管理组件

## Examples

![componentState](/view/privilege.png)


## Usage

```js
import SdxvPrivilege from '@sdx/view/lib/privilege';

SdxvPrivilege.viewRouter.register(router, '/home');
```


## API


```js
import SdxvPrivilege from './src/Privilege';

const routeCfg = [{
    path: '/sdxv-privilege',
    name: 'SdxvPrivilege',
    component: SdxvPrivilege,
    meta: {
        breadcrumb: t('view.authority.Authority'),
        system: 'manage',
        isRoot: true,
    }
}];


const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { SdxvPrivilege, viewRouter };

```