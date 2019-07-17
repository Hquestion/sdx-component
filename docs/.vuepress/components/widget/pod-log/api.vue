<template>
  <div class="demo-project-card">
    <CommonApi :apiData="attrData" title="Attributes"/>
   </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'PodLog',
  data() {
    return {
      attrData: [
          {
            params: 'autoPull',
            describe: '自动拉取日志',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false',
          }, {
            params: 'followScroll',
            describe: '滚动跟随',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false'
          }, {
            params: 'method',
            describe: '查看日志方法',
            type: 'string',
            optionValue: 'head / tail',
            defaultValue: 'head'
          }, {
            params: 'podName',
            describe: '必填: pod的名称',
            type: 'String',
            optionValue: '-',
            defaultValue: ''
          }, {
            params: 'type',
            describe: 'pod来源',
            type: 'string',
            optionValue: 'user / system',
            defaultValue: 'user'
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
