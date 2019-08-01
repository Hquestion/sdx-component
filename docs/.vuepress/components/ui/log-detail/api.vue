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
          }, {
            params: 'preLoading',
            describe: '日志向前滚动加载动画',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false'
          }, {
            params: 'sufLoading',
            describe: '日志向后滚动加载动画',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false'
          }, {
            params: 'loading',
            describe: '首次请求日志全页面遮罩',
            type: 'boolean',
            optionValue: 'true / false',
            defaultValue: 'false'
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
