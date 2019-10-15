<template>
  <div class="demo-button">
    <CommonApi :apiData="attrData" title="Attributes"/>
    <CommonApi :apiData="eventData" title="Events" type="event"/>
  </div>
</template>

<script>
import CommonApi from "../../Common/BasicApi";
export default {
  name: "ButtonApi",
  data() {
    return {
      attrData: [
        {
          params: "visible",
          describe: "是否显示修改密码Dialog，支持 .sync 修饰符",
          type: "boolean",
          optionValue: "—",
          defaultValue: "false"
        },
        {
          params: "handler",
          describe:
            "修改密码处理函数, 注意: 在用户点击确认修改密码时将调用此函数, 并且传入一个带有oldPasswd和newPasswd的对象。 在该处理函数内必须手动将visible属性置为false来关闭对话框",
          type: "function",
          optionValue: "—",
          defaultValue: "—"
        }
      ],
      eventData: [
        {
          params: "close",
          describe: "修改密码 Dialog 关闭的回调",
          cbparams: "—"
        },
        {
          params: "on-success",
          describe: "不提供修改密码处理函数时密码修改成功的回调",
          cbparams: "—"
        },
        {
          params: "on-error",
          describe: "不提供修改密码处理函数时密码修改失败的回调",
          cbparams: "—"
        }
      ]
    };
  },
  components: {
    CommonApi
  }
};
</script>

<style lang="less" scoped>
</style>
