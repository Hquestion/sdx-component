# ResourceConfig 资源
---
资源组件

## Example
<Common-BasicUsage>
<widget-resource-config-index></widget-resource-config-index>
   <highlight-code slot="codeText" lang="vue">
        <template>
            <div class="sdxw-resource-config">
                <SdxwResourceConfig
                    v-model="cpuObj"
                    type="onlycpu"
                />
                <SdxwResourceConfig
                    v-model="cpuObj"
                    type="cpu"
                />
                <SdxwResourceConfig
                    v-model="gpuObj"
                    type="gpu"
                />
            </div>
        </template>

        <script>
        import SdxwResourceConfig from '@sdx/widget/components/resource-config';
            export default {
                name: 'ResourceDemo',
                components: {
                    SdxwResourceConfig
                },
                data() {
                    return {
                        cpuObj: {
                            cpu: 4,
                            memory: 7,
                            uuid: '4-7'
                        },
                        gpuObj: {
                            label: 'GXU-001',
                            count: 4,
                            uuid: 'GXU-001-4'
                        },
                    }
                }
            }
        </script>
  </highlight-code>
</Common-BasicUsage>
## Usage

```js
import Vue from 'vue';
import { SdxwResourceConfig } from '@sdx/widget';

Vue.use(SdxwResourceConfig);


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
@import '~@sdx/widget/lib/theme/resource-config.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss
$sdxw-resource-label-width: 130px !default;
$sdxw-resource-label-fontsize: 13px !default;
$sdw-resource-icon-color: #457FF6 !default;
$sdw-resource-icon-size: 4px !default;
$sdw-resource-file-select-width: 560px !default;

```

## API

 <widget-resource-config-api slot="api" />