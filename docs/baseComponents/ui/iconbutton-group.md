# IconButtonGroup 图标按钮组

用于展示图标按钮组，超过三个按钮时将会折叠，点击后显示以IconButton的title作为按钮的按钮列表。

## Examples

<Common-BasicUsage>
  <ui-iconbuttongroup-index></ui-iconbuttongroup-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuIconButtonGroup>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮一"></SdxuIconButton>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮二"></SdxuIconButton>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮三"></SdxuIconButton>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮四"></SdxuIconButton>
              </SdxuIconButtonGroup>
              <SdxuIconButtonGroup>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮一"></SdxuIconButton>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮二"></SdxuIconButton>
                  <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮三"></SdxuIconButton>
              </SdxuIconButtonGroup>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {IconButtonGroup, IconButton} from '@sdx/ui';

Vue.use(IconButtonGroup);
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
@import '~@sdx/ui/lib/theme/icon-button-group.scss';

```

## SCSS定制

无，根据默认主题

## API

<ui-iconbuttongroup-api></ui-iconbuttongroup-api>
