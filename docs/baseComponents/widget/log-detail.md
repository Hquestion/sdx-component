# LogDetail 日志详情
---
日志详情组件

## Example

<Common-BasicUsage>
<widget-log-detail-index></widget-log-detail-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <SdxwLogDetail :content="content" height="600px" />
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { SdxwLogDetail } from '@sdx/widget';

Vue.use(SdxwLogDetail);

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
@import '~@sdx/widget/lib/theme/log-detail.scss';

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

 <widget-log-detail-api slot="api" />