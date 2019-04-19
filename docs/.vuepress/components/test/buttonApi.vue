<template>
  <div class="demo-button">
    <CommonApi :apiData="attrData" title="Attributes"/>
    <CommonApi :apiData="eventData" title="Events" type="event"/>
  </div>
</template>

<script>
import CommonApi from '../Common/BasicApi'
export default {
  name: 'ButtonApi',
  data() {
    return {
      attrData: [
          {
            params: 'size',
            describe: '尺寸',
            type: 'string',
            optionValue: 'medium / small / mini',
            defaultValue: '—',
          }, {
            params: 'type',
            describe: '类型',
            type: 'string',
            optionValue: 'primary / success / warning / danger / info / text',
            defaultValue: '—',
          }, {
            params: 'plain',
            describe: '是否朴素按钮',
            type: 'boolean',
            optionValue: '—',
            defaultValue: 'false',
          }, {
            params: 'round',
            describe: '是否圆角按钮',
            type: 'boolean',
            optionValue: '—',
            defaultValue: 'false',
          }
      ],
      eventData: [
          {
            params: 'show',
            describe: '显示时触发',
            cbparams: '—',
          }, {
            params: 'after-leave',
            describe: '显示动画播放完毕后触发',
            cbparams: '—',
          }, {
            params: 'show',
            describe: '显示时触发',
            cbparams: '—',
          }, {
            params: 'hide',
            describe: '隐藏时触发',
            cbparams: '—',
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