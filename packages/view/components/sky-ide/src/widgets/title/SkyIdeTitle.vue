<template>
    <div class="skyide-title">
        <svg
            class="ide-logo"
            aria-hidden="true"
        >
            <use xlink:href="#sdx-skyIDElogo" />
        </svg>
        <div class="logo">
            SkyIDE
        </div>
        <div class="content">
            {{ app && app.taskManager && app.taskManager.task && app.taskManager.task.project && app.taskManager.task.project.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkyIdeTitle',
    inject: {
        app: {
            default: {}
        }
    },
};
</script>
<style lang="scss" scoped>
    .skyide-title {
        background: #1C253D;
        height: 64px;
        line-height: 64px;
        position: relative;
        display: flex;
        justify-content: center;
        color: #fff;
        position: relative;
        .logo {
            position: absolute;
            left: 70px;
            font-size: 24px;
            color: #FFFFFF;
        }
        .ide-logo {
            width: 44px;
            left: 16px;
            top: 10px;
            height: 44px;
            position: absolute;
        }
        .content {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #FFFFFF;
        }
    }
</style>