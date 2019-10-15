<template>
   <div class="breadcrumb-container">
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
   </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {}
   },
  components: {}
}
</script>

<style lang="scss">
.breadcrumb-container {
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
        color: #00002A;
    }
    .el-breadcrumb__inner.is-link,
    .el-breadcrumb__inner a {
        color: #4781F8;
    }
    .el-breadcrumb__separator {
        color: #4781F8;
        margin: 0 4px;
    }
}
</style>
