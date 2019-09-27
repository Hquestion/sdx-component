<template>
    <div class="skyide-title">
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
        .logo {
            position: absolute;
            left: 20px;
        }
    }
</style>