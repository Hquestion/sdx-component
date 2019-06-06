<template>
  <div class="task-start-dialog">
    <CommonApi :apiData="attrData" title="Attributes"/>
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'TaskStartDialogApi',
  data() {
    return {
      attrData: [
          {
            params: 'visible',
            describe: '控制弹框是否显示',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false',
          }, {
            params: 'autoImage',
            describe: '中间镜像信息',
            type: 'object',
            optionValue: '-',
            defaultValue: 'null'
          }, {
            params: 'image',
            describe: '基础镜像信息',
            type: 'object',
            optionValue: '-',
            defaultValue: 'null'
          }
      ]
    }
  },
  components: {
    CommonApi
  }
}
</script>

<style lang="less" scoped>

</style>
