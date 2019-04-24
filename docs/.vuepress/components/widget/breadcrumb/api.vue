<template>
  <div class="demo-button">
    <CommonApi :apiData="attrData" title="Breadcrumb Attributes"/>
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'ButtonApi',
  data() {
    return {
      attrData: [
          {
            params: 'separator',
            describe: '分隔符',
            type: 'string',
            optionValue: '—',
            defaultValue: '斜杠 /',
          }, {
            params: 'separator-class',
            describe: '图标分隔符 class',
            type: 'string',
            optionValue: '—',
            defaultValue: '—',
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
