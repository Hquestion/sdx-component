<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                Home
            </router-link> |
            <router-link to="/about">
                About
            </router-link> |
            <!-- <IlvButton @click="setlang">
                你好，点我
            </IlvButton> -->
            <router-link to="/dialogTest">
                对话框测试页面
            </router-link> |
            <router-link to="/demo/input">
                input测试
            </router-link>
            <router-link to="/paginationTest">
                分页测试页面
            </router-link>>
            <router-link to="/breadcrumbTest">
                面包屑测试页面
            </router-link>>
            <router-link to="/changePwdTest">
                修改密码测试页面
            </router-link>>
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
  text-align: center;
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
