# TabRadio radio型tab组件
---

radio型tab组件

## Examples

<Common-BasicUsage>
  <ui-tab-radio-index></ui-tab-radio-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
       <div class="tab-radio-demo">
               <SdxuTabRadioGroup v-model="activeTab1">
                   <SdxuTabRadioItem name="1">你好中国</SdxuTabRadioItem>
                   <SdxuTabRadioItem name="2">你好美国</SdxuTabRadioItem>
               </SdxuTabRadioGroup>
               <SdxuTabRadioGroup v-model="activeTab2">
                   <SdxuTabRadioItem name="1">你好中国</SdxuTabRadioItem>
                   <SdxuTabRadioItem name="2">你好美国</SdxuTabRadioItem>
                   <SdxuTabRadioItem name="3">你好巴基斯坦</SdxuTabRadioItem>
               </SdxuTabRadioGroup>
           </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {TabRadio} from '@sdx/ui';

Vue.use(TabRadio);

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
@import '~@sdx/ui/lib/theme/tab-radio.scss';

```

## SCSS定制

```scss

$sdxu-tab-radio-height: $sdx-form-element-height-regular !default;
$sdxu-tab-radio-height-small: $sdx-form-element-height-small !default;
$sdx-tab-radio-padding: 14px !default;
```

## API


### TabRadioItem

<ui-tab-radio-itemApi slot="api" />

### TabRadioGroup

<ui-tab-radio-groupApi />
