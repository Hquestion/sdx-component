# LogDetail 日志详情
---
日志详情组件

## Example

<Common-BasicUsage>
<ui-log-detail-index></ui-log-detail-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <SdxuLogDetail :content="content" height="600px" :preLoading="preLoading" :sufLoading="sufLoading" :loading="loading" />
    </template>

    <script>
    import SdxuLogDetail from '@sdx/ui/components/log-detail';
    export default {
        name: 'LogDetail',
        data() {
            return {
                loading: true,
                preLoading: true,
                sufLoading: true,
                content: '2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on 198.168.49.147:36463 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 597
            };
        },
        components: {
            SdxuLogDetail
        },
        mounted() {
            setTimeout(() => {
                this.loading = false;
                this.preLoading = true;
                this.sufLoading = false;
                setTimeout(() => {
                    this.loading = false;
                    this.preLoading = false;
                    this.sufLoading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.preLoading = false;
                        this.sufLoading = false;
                    }, 2000)
                }, 2000)
            }, 2000)
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
import { LogDetail } from '@sdx/ui';

Vue.use(LogDetail);

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
@import '~@sdx/ui/lib/theme/log-detail.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss
// 日志背景
$sdx-log-background: #F4F8FD !default;
// 日志字体大小
$sdx-log-font-size: $sdx-content-font-size !default;
// 日志行距
$sdx-log-line-height: 26px !default;

```

## API

 <ui-log-detail-api slot="api" />