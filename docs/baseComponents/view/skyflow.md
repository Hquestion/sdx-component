# Skyflow
---

工作流管理组件

## Examples

<Common-BasicUsage>
  <view-skyflow-index />
</Common-BasicUsage>


## Usage

```js
import Skyflow from '@sdx/view/lib/skyflow';

Skyflow.viewRouter.register(router, '/');
```


## API


```js

import Skyflow from './src/Index.vue';
import SkyflowList from './src/SkyflowList.vue';
import RunningInfo from './src/running-info/Index.vue';

Skyflow.install = vue => {
    vue.component(Skyflow.name, Skyflow);
};

const routeCfg = [
    {
        path: '/sdxv-skyflow',
        name: 'SdxvSkyflow',
        redirect: '/sdxv-skyflow/skyflow-list',
        component: Skyflow,
        meta: {
            breadcrumb: 'Skyflow'
        },
        children: [
            {
                path: 'skyflow-list',
                name: 'SdxvSkyflowList',
                component: SkyflowList
            },
            {
                path: 'running-info/:id',
                name: 'SdxvRunningInfo',
                component: RunningInfo
            }
        ]
    }
];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { Skyflow, viewRouter };

```