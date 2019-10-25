# Scroll 滚动条组件

基于vuescroll插件，用于替换浏览器默认的进度条

## Example

<Common-BasicUsage>
<ui-scroll-index></ui-scroll-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
     <div class="index" style="height: 300px;width: 500px;border: 1px solid #ccc">
             <SdxuScroll>
                 <div class="main" style="height: 500px;"></div>
             </SdxuScroll>
         </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage 

```js
import Vue from 'vue';
import { Scroll } from '@sdx/widget';
// 也可以这么引入
import Scroll from '@sdx/widget/lib/scroll';

// 注册到全局
Vue.use(Scroll);

// 也可以全量引入使用
import SdxUI from '@sdx/ui';

Vue.use(SdxUI);

```

## SCSS定制

无

## API

<ui-scroll-api></ui-scroll-api>