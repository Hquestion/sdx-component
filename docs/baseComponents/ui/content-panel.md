# ContentPanel Panel组件

放置任意内容的Panel

## Examples

<Common-BasicUsage>
  <ui-contentpanel-index></ui-contentpanel-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxu-content-panel title="我是标题" subtitle="我是副标题">
                  我是内容
              </sdxu-content-panel>
              <SdxuPlaceholderBlock></SdxuPlaceholderBlock>
              <sdxu-content-panel>
                  <div slot="title">
                      我是通过slot设置的title
                  </div>
                  <div slot="right">
                      <i class="sdx-icon sdx-icon-star-off" title="我是通过slot插入的图标"></i>
                  </div>
                  我是内容
              </sdxu-content-panel>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {ContentPanel} from '@sdx/ui';

Vue.use(ContentPanel);

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
@import '~@sdx/ui/lib/theme/content-panel.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss

$sdx-content-panel-padding: 30px 20px 40px !default;
$sdx-content-panel-bg: #fff !default;
$sdx-content-panel-title-margin-left: 12px !default;
$sdx-content-panel-title-width: 3px !default;
$sdx-content-panel-title-height: 16px !default;
$sdx-content-panel-main-min-height: 50px !default;
$sdx-content-panel-subtitle-margin-left: 10px !default;
```

## API

<ui-contentpanel-api></ui-contentpanel-api>
