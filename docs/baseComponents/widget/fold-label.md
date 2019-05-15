# FoldLabel 可折叠标签组件

使用场景：表格上用户角色标签展示，标签堆叠列表展示

## Examples

<Common-BasicUsage>
<widget-fold-label-index></widget-fold-label-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxwFoldLabelGroup :list="list"></SdxwFoldLabelGroup>
      <p>
          <SdxwFoldLabelGroup :list="list" mode="inline"></SdxwFoldLabelGroup>
      </p>
      <p>
          <SdxwFoldLabelGroup :list="list3" mode="inline"></SdxwFoldLabelGroup>
      </p>
      <p>
          <SdxwFoldLabelGroup :list="list" mode="inline" type="default"></SdxwFoldLabelGroup>
      </p>
      <p>
          <SdxwFoldLabelGroup mode="list">
              <SdxwFoldLabel :plain="true" type="create">创建</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="processing" status="loading">启动中</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="running" status="loading">运行中</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="finish">已完成</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="dying" status="loading">终止中</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="die">已终止</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="exception" status="warning">启动异常</SdxwFoldLabel>
              <SdxwFoldLabel :plain="true" type="error" status="warning">失败</SdxwFoldLabel>
          </SdxwFoldLabelGroup>
      </p>
    </template>
  </highlight-code>
  </Common-BasicUsage>
  
## Usage

```js
import Vue from 'vue';
import { FoldLabel } from '@sdx/widget';

Vue.use(FoldLabel);

// 也可以全量引入使用
import SdxWidget from '@sdx/widget';

Vue.use(SdxWidget);

// 如果在组件中以components选项注册组件
import { FoldLabel } from '@sdx/widget';

{
    components: {
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel
    }
}
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/fold-label.scss';

```

::: warning 注意：

FoldLabel组件由两部分组成：FoldLabelGroup和FoldLabel;

可以只使用FoldLabelGroup来展示标签组，也可以使用FoldLabel来自定义标签组展示方式，或者
展示单个标签。

:::

## SCSS定制

```scss

$sdxw-foldlabel-height: 22px !default;
$sdxw-foldlabel-padding-h: 8px !default;
$sdxw-foldlabel-padding-v: 5px !default;
$sdxw-foldlabel-primary-bg: #E9EFFE !default;
$sdxw-foldlabel-top-margin: 10px !default;
$sdxw-foldlabel-left-margin: 6px !default;
$sdxw-foldlabel-fontsize: 12px !default;
```

## API

### FoldLabelGroup

<widget-fold-label-groupApi />

### FoldLabel

<widget-fold-label-api />