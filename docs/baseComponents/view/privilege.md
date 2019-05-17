# 权限管理
---

权限管理组件

## Examples

<Common-BasicUsage>
  <view-privilege-privilege />
</Common-BasicUsage>


## Usage

```js
import SdxvPrivilege from '@sdx/view/components/privilege';

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