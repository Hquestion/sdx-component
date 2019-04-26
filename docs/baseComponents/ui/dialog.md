# Dialog 对话框
---
在保留当前页面状态的情况下，告知用户并承载相关操作。

## Example

<Common-BasicUsage>
<ui-dialog-general></ui-dialog-general>
  <highlight-code slot="codeText" lang="vue">
    <sdxu-dialog :visible.sync="dialogVisible">
        <div slot="title">
            我是标题
        </div>
        <div>我是内容</div>
    </sdxu-dialog>
  </highlight-code>
</Common-BasicUsage>

::: tip 
默认情况下宽度为600px, header和footer内容居中显示, 不传入footer时默认有确认取消按钮。<br>
由于该组件是对Element Dialog组件的二次封装, 所以绝大部分Element Dialog的属性(除了width和center), 方法和事件都可在此使用。
:::

<Common-BasicUsage>
<ui-dialog-small></ui-dialog-small>
  <highlight-code slot="codeText" lang="vue">
        <sdxu-dialog
            :visible.sync="dialogVisible"
            size='small'
        >
            <div slot="title">
                我是小尺寸对话框
            </div>
            <div>我是内容</div>
            <div slot="footer">
                我是footer
            </div>
        </sdxu-dialog>
  </highlight-code>
</Common-BasicUsage>

::: tip 
如果既不想自定义footer也不想使用默认footer, 可以利用no-footer属性完全隐藏footer
:::

<Common-BasicUsage>
<ui-dialog-event></ui-dialog-event>
  <highlight-code slot="codeText" lang="vue">
        <sdxu-dialog
            :visible.sync="dialogVisible"
            @confirm="confirmClicked"
            @cancel="cancelClicked"
        >
            <div slot="title">
                我是标题
            </div>
            <div>我是内容</div>
        </sdxu-dialog>
  </highlight-code>
</Common-BasicUsage>

::: tip 
对于这里没做解释的其他属性与方法, 请参考[Element文档](https://element.eleme.cn/#/zh-CN/component/dialog)
:::

## Usage

<br>

```js
import { Dialog } from '@sdx/ui';

Vue.use(Dialog)
```
<br>

## API

<ui-dialog-api slot="api" />