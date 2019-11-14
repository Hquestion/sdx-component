<template>
    <div class="sdxw-create-task-card">
        <div
            class="sdxw-create-task-card__task-icon"
        >
            <svg
                aria-hidden="true"
                style="width:48px;height:48px"
            >
                <use :xlink:href="`#${iconClass}`" />
            </svg>
        </div>
        <div class="sdxw-create-task-card__create-label">
            <i class="sdx-icon sdx-icon-plus" />
            <span class="sdxw-create-task-card__create-label--text">
                {{ createLabel }}
            </span>
        </div>
        <div class="sdxw-create-task-card__task-type">
            {{ taskType }}
        </div>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxwCreateTaskCard',
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
        [Button.name]: Button
    }
};
</script>
