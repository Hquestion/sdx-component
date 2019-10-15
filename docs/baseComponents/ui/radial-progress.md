# RadialProgress 圆形进度条
---

基础圆形进度条组件

## Examples

<Common-BasicUsage>
  <ui-radial-progress-index></ui-radial-progress-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <sdxu-radial-progress :diameter="200"
                            :completed-steps="5"
                            :total-steps="10">
            <p>Total steps: 10</p>
            <p>Completed steps: 5</p>
        </sdxu-radial-progress>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {RadialProgress} from '@sdx/ui';

Vue.use(RadialProgress);

// 也可以全量引入使用
import SdxUI from '@sdx/ui';

Vue.use(SdxUI);
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/ui/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/ui/lib/theme/base.scss';
@import '~@sdx/ui/lib/theme/radial-progress.scss';

```

## API

<ui-radial-progress-api slot="api" />
