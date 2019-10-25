# Button 按钮
---

基础按钮组件

## Examples

<Common-BasicUsage>
  <ui-button-button></ui-button-button>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div>
                  <p>
                      <SdxuButton type="default">默认</SdxuButton>
                      <SdxuButton type="primary">primary</SdxuButton>
                      <SdxuButton type="primary" size="small">small</SdxuButton>
                      <SdxuButton type="primary" size="regular" :invert="true">invert</SdxuButton>
                      <SdxuButton type="primary" size="regular" :loading="true">loading</SdxuButton>
                  </p>
                  <p>
                      <SdxuButton type="primary" size="regular" :plain="true">文字按钮</SdxuButton>
                      <SdxuButton type="primary" size="regular" :disabled="true">禁用</SdxuButton>
                      <SdxuButton type="default" size="regular" :shadow="true">投影</SdxuButton>
                  </p>
                  <p>
                      <SdxuButton type="primary" size="regular" :block="true">block</SdxuButton>
                  </p>
                  <p>
                      <SdxuButton type="text" size="regular" trigger="hover">
                          中文
                          <template slot="dropdown">
                              <SdxuButton type="text" size="regular" block>中文</SdxuButton>
                              <SdxuButton type="primary" :invert="true" :plain="true" size="regular" block>English</SdxuButton>
                          </template>
                      </SdxuButton>
                      <SdxuButton type="primary" size="regular" trigger="click" dropdown-width="150px">
                          中文
                          <template slot="dropdown">
                              <SdxuButton type="primary" size="regular" block>中文</SdxuButton>
                              <SdxuButton type="text" size="regular" block>English</SdxuButton>
                          </template>
                      </SdxuButton>
                      <SdxuButton type="primary" :iconOnly="true" placement="right">
                          H
                          <template slot="dropdown">
                              <SdxuButton type="primary" size="regular" block>中文</SdxuButton>
                              <SdxuButton type="text" size="regular" block>English</SdxuButton>
                          </template>
                      </SdxuButton>
                  </p>
              </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Button} from '@sdx/ui';

Vue.use(Button);

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
@import '~@sdx/ui/lib/theme/button.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// 最小宽度
$sdxu-button-min-width: 95px !default; 
// 边距
$sdxu-button-padding: $sdx-padding !default;
// 常规尺寸按钮高度
$sdxu-button-height-regular: $sdx-form-element-height-regular !default;
// 小尺寸按钮高度
$sdxu-button-height-small: $sdx-form-element-height-small !default;
// default类型按钮边框颜色
$sdxu-button-default-border-color: #E4E7Ed !default;
```

## API

<ui-button-api slot="api" />
