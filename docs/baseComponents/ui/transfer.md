# Transfer 穿梭框
---

基础transfer组件

## Examples

<Common-BasicUsage>
  <ui-transfer-transfer></ui-transfer-transfer>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div class="demo-table">
        <SdxuTransfer
            :data="data"
            :tags.sync="tags"
            :default-keys.sync="defaultKeys"
            :tree-node-key="treeNodeKey"
            :placeholder="placeholder"
            :loading="loading"
            :need-show-tags="needShowTags"
        />
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Transfer} from '@sdx/ui';

Vue.use(Transfer);

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
@import '~@sdx/ui/lib/theme/transfer.scss';

```
## SCSS定制
```scss
$sdxu-transfer-width: 100% !default;
$sdxu-transfer-default-width: 210px !default;
$sdxu-transfer-default-height: 330px !default;
$sdxu-transfer-height-tree: 220px !default;
$sdxu-transfer-width-input: 179px !default;
$sdxu-transfer-height-wrap: 238px !default;
$sdxu-transfer-margin-small: 16px !default;
$sdxu-transfer-height-moveicon: 36px !default;
$sdxu-transfer-height-tagbox: 292px !default;
$sdxu-transfer-margin-tag: 10px !default;
$sdxu-transfer-background-taguser: #F4F7FD !default;
$sdxu-transfer-background-taggroup: rgba(213,229,255,0.75) !default;
$sdxu-transfer-background-tree:  #F7F9FD !default;
$sdxu-transfer-background-icon-move: #f2f6fc !default;
$sdxu-transfer-color-icon-move: #C0C4CC !default;
$sdxu-transfer-expand-icon-padding: 4px !default;

```
## API

<ui-transfer-api slot="api" />
