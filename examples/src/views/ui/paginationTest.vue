<template>
    <div class="dialog-test">
        <sdxu-pagination
            :current-page.sync="current"
            :page-size="pageSize"
            :total="total"
            @current-change="currentChange"
        />
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            current: 1,
            pageSize: 14,
            total: 100
        };
    },
    components: {},
    methods: {
        currentChange(val) {
            console.log('currentChange', val);
            console.log('current', this.current);
        }
    }
};
</script>

<style scoped lang="scss">
.dialog-test {
    height: 400px;
    width: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
