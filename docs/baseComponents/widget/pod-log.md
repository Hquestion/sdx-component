# PodLog pod日志
---
查询pod相关的日志

## Example

<Common-BasicUsage>
<widget-pod-log-index></widget-pod-log-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="pod-log">
            <SdxwPodLog method="head" type="system" />
        </div>
    </template>

    <script>
    import SdxwPodLog from '@sdx/widget/components/pod-log';
    export default {
        name: 'PodLog',
        components: {
            SdxwPodLog
        },
        data() {
            return {
                podName: 'fluentd-es-w2rw9'
            };
        }
    }
    </script>

    <style lang="scss">
    </style>


  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { SdxwPodLog } from '@sdx/widget';

Vue.use(SdxwPodLog);

// 也可以全量引入使用
import SdxwPodLog from '@sdx/widget';

Vue.use(SdxwPodLog);
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/pod-log.scss';

```


## API

 <widget-pod-log-api slot="api" />