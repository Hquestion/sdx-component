<template>
  <div class="api-wrap">
      <div class="title">{{title}}</div>
      <el-table
        v-if="type === 'attr'"
        :data="apiData"
        :border="false"
        style="width: 100%">
        <el-table-column
          prop="params"
          label="参数"
          width="140">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="说明"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="optionValue"
          label="可选值">
        </el-table-column>
        <el-table-column
          prop="defaultValue"
          label="默认值">
        </el-table-column>
      </el-table>
      <el-table
        v-else
        :data="apiData"
        :border="false"
        style="width: 100%">
        <el-table-column
          prop="params"
          label="事件名称"
         >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="cbparams"
          label="回调参数">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'BasicApi',
  props: {
    type: {
      type: String,
      default: 'attr'
    },
    title: {
      type: String,
      default: '属性'
    },
    apiData: Array
  }
}
</script>

<style lang="less" >
.api-wrap {
  .title {
    font-size: 22px;
    color: #1f2f3d;
    margin: 30px 0 20px;
  }
  + .api-wrap {
    margin: 0px 0;
  }
  &:first-child {
    /*margin-top: 80px;*/
  }
  &:last-child {
    margin-bottom: 80px;
  }
  .el-table {
    table {
      border-collapse: collapse;
      margin: 0;
    }

    th, td, th.is-leaf {
      border: none;
    }

    .el-table__body, .el-table__footer, .el-table__header{
      border-collapse: collapse;
    }
  }
}
</style>
