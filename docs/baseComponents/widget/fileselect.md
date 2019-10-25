# FileSelect 文件选择

文件选择弹出框，还支持展示文件结构，简单文件搜索等

## Example

<Common-BasicUsage>
<widget-fileselect-index></widget-fileselect-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
     <SdxwFileSelect></SdxwFileSelect>
    </template>
  </highlight-code>
</Common-BasicUsage>
  
## Usage

```js
import Vue from 'vue';
import { FileSelect } from '@sdx/widget';
// 也可以这么引入
import FileSelect from '@sdx/widget/lib/file-select';

// 注册到全局
Vue.use(FileSelect);

// 组件components选项中注册,其中FileSelectMix为主组件，本地文件/本地文件夹/平台文件三合一
{
    components: {
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        [FileSelect.FileSelectPop.name]: FileSelect.FileSelectPop,
        [FileSelect.FileSelectMain.name]: FileSelect.FileSelectMain,
        [FileSelect.FileSelectTree.name]: FileSelect.FileSelectTree,
        [FileSelect.FileSelectSearch.name]: FileSelect.FileSelectSearch
    }
}


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
@import '~@sdx/widget/lib/theme/file-select.scss';

```

## SCSS定制

```scss

$sdx-file-select-node-height: 32px !default;
$sdx-file-select-node-font-size: 14px !default;
$sdx-file-select-node-icon-text-margin: 8px !default;
```

## API

### SdxwFileSelect 三合一组件

<widget-fileselect-api></widget-fileselect-api>

### SdxwFileSelectTree 文件树

用于展示文件结构，可以设置checkable=false来隐藏checkbox

<widget-fileselect-tree></widget-fileselect-tree>

### SdxwFileSelectPop 平台文件选择框

仅支持平台文件的选择，包括文件树和搜索功能

<widget-fileselect-pop></widget-fileselect-pop>