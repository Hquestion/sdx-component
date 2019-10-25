<template>
  <div class="demo-project-card">
    <CommonApi :apiData="attrData" title="Attributes"/>
    <CommonApi :apiData="slotData" title="Slots" type="slot"/>
    <CommonApi :apiData="eventData" title="Events" type="event"/>
    <CommonApi :apiData="listSlotData" title="Project Card List Slots" type="slot" />
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'ProjectCardApi',
  data() {
    return {
      attrData: [
          {
            params: 'meta',
            describe: '项目信息',
            type: 'Object',
            optionValue: '-',
            defaultValue: '{}',
          }, {
            params: 'viewAble',
            describe: '是否显示详情按钮',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'true'
          }, {
            params: 'editAble',
            describe: '是否显示编辑按钮',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'true'
          }, {
            params: 'deleteAble',
            describe: '是否显示删除按钮',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'true'
          }, {
            params: 'operateType',
            describe: '操作类型',
            type: 'string',
            optionValue: 'rud / template / project',
            defaultValue: 'rud'
          }
      ], 
      slotData: [{
        params: 'operationName',
        describe: '操作名称插槽, 选择项目或者选择模板时自定义显示名称'
      }],
      eventData: [{
        params: 'operate',
        describe: '点击按钮，返回操作类型',
        cbparams: 'Object: { id: "", type: "" } // type: detail|edit|delete|template|project'
      }],
      listSlotData: [{
        params: 'default',
        describe: '默认插槽, 卡片列表'
      }]
    }
  },
  components: {
    CommonApi
  }
}
</script>

<style lang="less" scoped>

</style>
