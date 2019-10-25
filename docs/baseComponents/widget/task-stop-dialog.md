# TaskStopDialog 任务停止弹框
---
任务列表 / 任务卡片 停止按钮（目前仅Jupyter和ContainerDEV任务有）

## Example

<Common-BasicUsage>
<widget-task-stop-dialog-index></widget-task-stop-dialog-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdxw-task-stop-dialog">
            <SdxuButton @click="handleClick">停止</SdxuButton>
        </div>
    </template>

    <script>
    import SdxuButton from '@sdx/ui/components/button';
    import SdxwTaskStopDialog from '@sdx/widget/components/task-stop-dialog';

    export default {
        name: 'TaskStopDialogDemo',
        components: {
            SdxuButton
        },
        methods: {
            handleClick() {
                SdxwTaskStopDialog({ visible: true }).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }
    </script>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { TaskStopDialog } from '@sdx/widget';

Vue.use(TaskStopDialog);

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
@import '~@sdx/widget/lib/theme/task-stop-dialog.scss';

```

## API

 <widget-task-stop-dialog-api slot="api" />