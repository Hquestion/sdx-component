# TaskStartDialog 任务运行弹框
---
任务列表 / 任务卡片 开始运行按钮（目前仅Jupyter和ContainerDEV任务有）

## Example

<Common-BasicUsage>
<widget-task-start-dialog-index></widget-task-start-dialog-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdxw-task-start-dialog">
            <SdxuButton @click="handleClick">运行</SdxuButton>
        </div>
    </template>

    <script>
    import SdxuButton from '@sdx/ui/components/button';
    import SdxwTaskStartDialog from '@sdx/widget/components/task-start-dialog';

    export default {
        name: 'TaskStartDialogDemo',
        components: {
            SdxuButton
        },
        methods: {
            handleClick() {
                SdxwTaskStartDialog({ visible: true, autoImage: {image_update_time: '2019-06-06 14:00:00'}, image: {image_name: 'tensorflow1.12.0_py3.6_cpu_dsad'} }).then(data => {
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
import { SdxwTaskStartDialog } from '@sdx/widget';

Vue.use(SdxwTaskStartDialog);

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
@import '~@sdx/widget/lib/theme/task-start-dialog.scss';

```

## API

 <widget-task-start-dialog-api slot="api" />