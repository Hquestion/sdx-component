<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                Home
            </router-link> |
            <router-link to="/about">
                About
            </router-link> |
            <router-link to="/dialogTest">
                对话框测试页面
            </router-link> |
            <router-link to="/demo/input">
                input测试
            </router-link> |
            <router-link to="/demo/privilege">
                privilege测试
            </router-link> |
            <router-link to="/demo/user-group">
                user-group测试
            </router-link> |
            <router-link to="/demo/task-detail">
                task-detail测试
            </router-link> |
            <router-link to="/demo/task-log">
                task-log测试
            </router-link> |
            <router-link to="/demo/buildImageBasic">
                在线构建
            </router-link> |
            <router-link to="/demo/resource-monitor">
                资源监控
            </router-link> |
            <router-link to="/demo/all-tasklist">
                全部列表
            </router-link> |
            <router-link to="/demo/component-state">
                组件状态
            </router-link> |
            <router-link to="/paginationTest">
                分页测试页面
            </router-link> |
            <router-link to="/breadcrumbTest">
                面包屑测试页面
            </router-link> |
            <router-link to="/userInfoTest">
                用户信息详情
            </router-link> |
            <router-link to="/changePwdTest">
                修改密码测试页面
            </router-link> |
            <router-link to="/projectManageTest">
                项目管理测试页面
            </router-link> |
            <router-link to="/userManage">
                用户管理
            </router-link> |
            <router-link to="/imageManageTest">
                镜像管理测试
            </router-link> |
            <router-link to="/modelManageTest">
                模型管理测试
            </router-link> |
            <router-link to="/skyflowTest">
                Skyflow测试
            </router-link> |
        </div>
        <p class="page-link">
            <button @click="toFeb">
                feb-alive
            </button>
        </p>
        <feb-alive>
            <router-view />
        </feb-alive>
    </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
//   text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
export default {
    // components: {IlvButton},
    methods: {
        setlang() {
            this.$i18n.locale = 'en';
        },
        toFeb() {
            this.$router.push(`/Cache/a/${123456}`);
        }
    },
    mounted() {

    }
};
</script>
