<template>
    <div>
        <h1>我是A页面</h1>
        <p>count: {{ count }}</p>
        <p class="page-action">
            <button
                class="page-action--item"
                @click="count += 1"
            >
                增加
            </button>
        </p>
        <p class="page-link">
            <button @click="toBPage">
                前往B页面
            </button>
        </p>
        <p class="page-link">
            <button @click="$router.push('/Cache/c')">
                前往C页面
            </button>
        </p>
        <p class="page-link">
            <button @click="$router.push('/Cache/comp')">
                前往组件页面
            </button>
            <button @click="$router.push('/Cache/table')">
                前往table页面
            </button>
        </p>
        <p class="page-link">
            <button @click="$router.push('/Cache/roleManage')">
                前往角色管理页面
            </button>
        </p>
        <p class="page-link">
            <button @click="$router.push('/Cache/authorizeManage')">
                前往权限管理页面
            </button>
        </p>
        <p class="page-link">
            <button @click="toBack">
                返回
            </button>
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            count: 0
        };
    },
    methods: {
        toBPage() {
            this.$router.push(`/Cache/b`);
        },
        toBack() {
            this.$router.back();
        }
    }
};
</script>

<style>
h1 {
  text-align: center;
}
p {
  text-align: center;
}
.page-action {
  margin-top: 30px;
  /* position: fixed;
  bottom: 100px; */
  width: 100%;
  text-align: center;
}
.page-action--item {
  display: inline-block;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  background: #3f86ff;
  border: none;
  border-radius: 5px;
  outline: none;
}
.page-link {
  margin-top: 50px;
}
</style>
