# DropdownTip 提示类下拉框
---

提示类下拉框组件，鼠标悬浮后，展示提示，位于主元素的正下方

## Examples

<Common-BasicUsage>
  <ui-dropdown-tip-index></ui-dropdown-tip-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div>
          <SdxuDropdownTip>
              <i class="sdx-icon sdx-tiaofutishi" slot="ref"></i>
              <span slot="title">你好</span>
              <div>xsajkhckjsahcjksahkchaskchkashkcas</div>
          </SdxuDropdownTip>
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {DropdownTip} from '@sdx/ui';

Vue.use(DropdownTip);

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
@import '~@sdx/ui/lib/theme/dropdown-tip.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss
// 暂无

```

## API

<ui-dropdown-tip-api slot="api" />
