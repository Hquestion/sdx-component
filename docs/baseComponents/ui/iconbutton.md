# IconButton 图标按钮

仅有图标的按钮

## Examples

<Common-BasicUsage>
  <ui-icon-button-index></ui-icon-button-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuIconButton icon="sdx-icon sdx-icon--download"></SdxuIconButton>
              <SdxuIconButton icon="sdx-icon sdx-icon--download" :disable="true"></SdxuIconButton>
              <SdxuIconButton icon="sdx-icon sdx-icon--download" size="small"></SdxuIconButton>
              <SdxuIconButton icon="sdx-icon sdx-icon--download" title="我是title"></SdxuIconButton>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {IconButton} from '@sdx/ui';

Vue.use(IconButton);

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
@import '~@sdx/ui/lib/theme/icon-button.scss';

```

## SCSS定制

无，根据默认主题

## API

<ui-icon-button-api></ui-icon-button-api>
