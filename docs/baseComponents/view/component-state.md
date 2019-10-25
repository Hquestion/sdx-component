# 组件状态
---

监控中心-组件状态，包括基础组件和微服务组件

## Examples

![componentState](/view/component-state.png)


## Usage

```js
import ComponentState from '@sdx/view/lib/component-state';

ComponentState.viewRouter.register(router, '/home');
```


## API

```js

import ComponentState from './src/index';
import { t } from '@sdx/utils/src/locale';

ComponentState.install = vue => {
    vue.component(ComponentState.name, ComponentState);
};

const routeCfg = [{
    path: '/sdxv-component-state',
    name: 'SdxvComponentState',
    component: ComponentState,
    meta: {
        breadcrumb: t('view.monitor.componentState.ComponentState'),
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

export default { ComponentState, viewRouter };

```