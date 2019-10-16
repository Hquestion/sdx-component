<template>
    <div class="sdxv-create-task-card">
        <div
            class="sdxv-create-task-card__task-icon"
        >
            <task-icon :icon-class="iconClass" />
        </div>
        <div class="sdxv-create-task-card__create-label">
            <i class="sdx-icon sdx-icon-plus" />
            <span class="sdxv-create-task-card__create-label--text">
                {{ createLabel }}
            </span>
        </div>
        <div class="sdxv-create-task-card__task-type">
            {{ taskType }}
        </div>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import TaskIcon from './TaskIcon';
export default {
    name: 'CreateTaskCard',
    data() {
        return {};
    },
    props: {
        iconClass: {
            type: String,
            default: ''
        },
        createLabel: {
            type: String,
            default: ''
        },
        taskType: {
            type: String,
            default: ''
        }
    },
    components: {
        [Button.name]: Button,
        TaskIcon
    }
};
</script>
