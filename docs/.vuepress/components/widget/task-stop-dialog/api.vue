<template>
  <div class="task-stop-dialog">
    <CommonApi :apiData="attrData" title="Attributes"/>
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'TaskStopDialogApi',
  data() {
    return {
      attrData: [
          {
            params: 'visible',
            describe: '控制弹框是否显示',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false',
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
