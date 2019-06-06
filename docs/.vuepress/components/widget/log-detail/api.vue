<template>
  <div class="demo-project-card">
    <CommonApi
      :apiData="attrData"
      title="Attributes"
    />
    <CommonApi
      :apiData="eventData"
      title="Events"
      type="event"
    />
  </div>
</template>

<script>
import CommonApi from '../../Common/BasicApi'
export default {
  name: 'LogDetailApi',
  data() {
    return {
      attrData: [
          {
            params: 'content',
            describe: '日志内容',
            type: 'string',
            optionValue: '-',
            defaultValue: '',
          }, {
            params: 'height',
            describe: '日志显示高度',
            type: 'string',
            optionValue: '-',
            defaultValue: '60vh'
          }
      ],
      eventData: [
        {
            params: 'scroll',
            describe: '鼠标滚轮事件，返回滚动区域基本信息以及滚动事件',
            cbparams: 'Object: { scrollInfo: { warpHeight, offsetHeight, scrollTop }, event } '
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
