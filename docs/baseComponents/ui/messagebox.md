# MessageBox 提示框
---

基础按钮组件

## Examples

<Common-BasicUsage>
  <ui-messagebox-index></ui-messagebox-index>
  <highlight-code slot="codeText" lang="js">
            onclick() {
                MessageBox({
                    title: '确定删除吗？',
                    content: '删除后将不可恢复'
                });
            },
            onclick1() {
                MessageBox({
                    title: '确定删除吗？',
                    content: '删除后将不可恢复',
                    type: 'alert',
                    status: 'success'
                });
            },
            onclick2() {
                MessageBox.confirm({
                    title: '确定删除吗？',
                    content: '删除后将不可恢复'
                });
            },
            onclick3() {
                MessageBox.confirm.warning({
                    title: '确定删除吗？',
                    content: '删除后将不可恢复',
                    type: 'alert'
                }).then(() => {
                    alert('你点击了确定');
                }, () => {
                    alert('你点击了取消');
                });
            },
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {MessageBox} from '@sdx/ui';

// 支持多种方式调用,并返回promise

MessageBox(opt);

MessageBox.confirm(opt);  // opt需传status,默认error

MessageBox.alert.error(opt); // 错误类型的alert

// 也可以全量引入使用
import SdxUI from '@sdx/ui';

Vue.use(SdxUI);

// 在组件中调用时，可调用原型链方法$sdxuMessageBox,
// API与MessageBox调用一致，并返回promise

this.$sdxuMessageBox(opt);

this.$sdxuMessageBox.confirm(opt);  // opt需传status,默认error

this.$sdxuMessageBox.alert.error(opt); // 错误类型的alert
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/ui/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/ui/lib/theme/base.scss';
@import '~@sdx/ui/lib/theme/message-box.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// messagebox宽度
$sdxu-messagebox-width: 460px !default;
// messagebox边距
$sdxu-messagebox-padding: 40px !default;
// messagebox图标大小
$sdxu-status-icon-size: 24px !default;
```

## API

<ui-messagebox-api></ui-messagebox-api>