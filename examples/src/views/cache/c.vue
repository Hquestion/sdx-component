<template>
    <div>
        <h1>我是C页面</h1>
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
            <router-link to="/Cache/a/123456">
                前往A页面
            </router-link>
        </p>
        <p class="page-link">
            <button @click="toReturn">
                back回退返回
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
        toReturn() {
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
  /* position: fixed;
  bottom: 100px; */
  margin-top: 30px;
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
