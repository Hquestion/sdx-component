<template>
    <div class="resource-usage">
        <div>
            <span>kernel运行时长: </span>
            <span>1h:15m</span>
        </div>
        <div>
            <span>CPU: </span>
            <span>10%(4core)</span>
        </div>
        <div>
            <span>内存: </span>
            <span>200MB(8GB)</span>
        </div>
        <div>
            <span>GPU(型号:xxx): </span>
            <span>200MB(2块)</span>
        </div>
        <div>
            <span>DISK: </span>
            <span>200MB(8GB)</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResourceUsage',
    props: {

    }
};
</script>

<style lang="scss" scoped>
    .resource-usage {
        min-height: 40px;
        background: #31436E;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #DDE5FE;
        letter-spacing: 0.07px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding: 16px;
        & > div {
            & + div {
                margin-left: 40px;
            }
        }
    }
</style>
