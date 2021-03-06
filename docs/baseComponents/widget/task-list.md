# TaskList 任务列表
---
监控中心任务top10 / 全部任务列表 / 我的任务

## Example

<Common-BasicUsage>
<widget-task-list-index></widget-task-list-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdxw-task-list">
            <SdxwTaskResourceList></SdxwTaskResourceList>
        </div>
    </template>

    <script>
    import SdxwTaskResourceList from '@sdx/widget/components/task-list';

    export default {
        name: 'TaskListDemo',
        components: {
            SdxwTaskResourceList
        }
    }
    </script>

    <style lang="scss">
        .sdxw-task-list {
            background: #f7f7f7;
        }
    </style>

  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { TaskResourceList } from '@sdx/widget';

Vue.use(TaskResourceList);

// 也可以全量引入使用
import SdxWidget from '@sdx/widget';

Vue.use(SdxWidget);
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/task-list.scss';

```

## API

 <widget-task-list-api slot="api" />