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
        background: #1E2948;;
        height: 48px;
        line-height: 48px;
        position: relative;
        display: flex;
        justify-content: center;
        color: #fff;
        position: relative;
        .logo {
            position: absolute;
            left: 70px;
            font-size: 20px;
            color: #FFFFFF;
        }
        .ide-logo {
            width: 40px;
            left: 16px;
            top: 4px;
            height: 40px;
            position: absolute;
        }
        .content {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
        }
    }
</style>