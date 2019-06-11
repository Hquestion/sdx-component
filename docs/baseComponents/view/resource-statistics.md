# 资源统计
---

监控中心-资源统计，包括平台资源、用户资源top10、任务资源top10、全部任务列表

## Examples

![resourceStatistics](/view/resource-statistics.jpg)
![AllTaskList](/view/all-task-list.jpg)


## Usage

```js
import ResourceStatistics from '@sdx/view/lib/resource-statistics';

ResourceStatistics.viewRouter.register(router, '/home');
```


## API

```js

import ResourceStatistics from './src/index';
import AllTaskList from './src/AllTaskList';

ResourceStatistics.install = vue => {
    vue.component(ResourceStatistics.name, ResourceStatistics);
};

const routeCfg = [{
    path: '/sdxv-resource-statistics',
    name: 'SdxvResourceStatistics',
    component: ResourceStatistics,
    meta: {
        breadcrumb: '资源统计'
    },
    children: [{
        path: 'all-task-list',
        name: 'SdxvAllTaskList',
        component: AllTaskList,
        meta: {
            breadcrumb: '全部任务列表'
        }
    }]
}];

const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

export default { ResourceStatistics, viewRouter };

```