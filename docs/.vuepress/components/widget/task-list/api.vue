<template>
  <div class="demo-task-list">
    <CommonApi :apiData="attrData" title="Attributes"/>
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'TaskListApi',
  data() {
    return {
      attrData: [
          {
            params: 'ranking',
            describe: '排行榜',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false',
          }, {
            params: 'monitor',
            describe: '资源监控',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false'
          }, {
            params: 'ownerId',
            describe: '当前用户id',
            type: 'string',
            optionValue: '-',
            defaultValue: '-'
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
