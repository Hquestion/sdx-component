# Input 输入框
---

基础输入框组件

## Examples

<Common-BasicUsage>
  <ui-input-input></ui-input-input>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdxui-input">
            <div>
                <SdxuInput v-model="value" :searchable="true" size="small"></SdxuInput>
            </div>
            <div>
                <SdxuInput v-model="value" :searchable="true" size="regular"></SdxuInput>
            </div>
            <div>
                <SdxuInput v-model="value" type="password"></SdxuInput>
            </div>
            <div>
                <SdxuInput v-model="value" type="password" :password-strength="true"></SdxuInput>
            </div>
            <div>
                <SdxuInput v-model="value" type="password" :password-visibleness="true"></SdxuInput>
            </div>
        </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Input} from '@sdx/ui';

Vue.use(Input);

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
@import '~@sdx/ui/lib/theme/input.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// 边框颜色：默认
$sdxu-input-border-default: 1px solid $sdx-border-color !default;
// 边框颜色：校验成功
$sdxu-input-border-color-success: $sdx-success-color !default;
// 边框颜色：校验失败
$sdxu-input-border-color-error: $sdx-danger-color !default;
// 边框颜色：focus
$sdxu-input-border-color-focus: $sdx-primary-color !default;
// 输入框高度：小尺寸
$sdxu-input-height-small: $sdx-form-element-height-regular !default;
// 输入框高度：常规尺寸
$sdxu-input-height-regular: $sdx-form-element-height-large !default;
// 输入框圆角半径
$sdxu-input-border-radius: $sdx-border-radius !default;
// 输入框占位字体颜色
$sdxu-input-placeholder: $sdx-info-color !default;
// 密码框强度校验框高度
$sdxu-input-password-strength-height: 5px !default;
// 密码强度颜色：弱
$sdxu-input-strength-color-weak: $sdx-danger-color !default;
// 密码强度颜色：正常
$sdxu-input-strength-color-normal: $sdx-warning-color !default;
// 密码强度颜色：强
$sdxu-input-strength-color-strong: $sdx-success-color !default;
// 密码强度颜色：占位
$sdxu-input-strength-color-none: $sdx-none-color !default;
// 输入框图标悬浮颜色
$sdxu-icon-hover: $sdx-primary-hover-color !default;

```

## API

<ui-input-api slot="api" />