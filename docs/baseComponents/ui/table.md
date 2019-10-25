# Table 表格
---

基础table组件

## Examples

<Common-BasicUsage>
  <ui-table-table></ui-table-table>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div class="demo-table">
        <SdxuTable   
            :data="tableData"
            :highlight-key="key"
            >
             <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
            />
            <el-table-column
                prop="name"
                label="姓名"
            />
            <el-table-column
                prop="address"
                label="地址"
            />
        </SdxuTable>
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Table} from '@sdx/ui';

Vue.use(Table);

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
@import '~@sdx/ui/lib/theme/table.scss';

```
## SCSS定制
```scss
$sdxu-table-head-color: #303133 !default;
$sdxu-table-header-height: 52px !default;
$sdxu-table-td-height: 52px !default;
$sdxu-table-cell-background:  #F7FAFF !default;
$sdxu-table-header-background: #fff !default;
$sdxu-table-header-fontsize: 14px !default;
$sdxu-table-td-fontsize: 14px !default;
$sdxu-table-table-margincolor: #fff !default;
$sdxu-table-border-color: #EBEEF5 !default;
```
## API

<ui-table-api slot="api" />
