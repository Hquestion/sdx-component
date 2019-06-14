<template>
    <div
        class="sdxv-workflow-card"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout"
    >
        <header class="sdxv-workflow-card__header">
            <i
                class="sdxv-workflow-card__header--icon sdx-icon"
                :class="[workflowType.state, workflowType.icon]"
            />
            <span class="sdxv-workflow-card__header--name">{{ meta.name }}</span>
            <span>
                <SdxwFoldLabel :type="meta.processType === 'PATCH' ? 'patch' : 'stream'">{{ meta.processType === 'PATCH' ? '批处理' : '流处理' }}</SdxwFoldLabel>
            </span>
        </header>
        <main class="sdxv-workflow-card__main">
            <div class="sdxv-workflow-card__info">
                <i class="sdx-icon sdx-icon-user" />
                <span>{{ meta.owner }}</span>
            </div>
            <div class="sdxv-workflow-card__info">
                <i class="sdx-icon sdx-icon-time" />
                <span>{{ dateFormatter(meta.createdAt) }}</span>
            </div>
        </main>
        <footer class="sdxv-workflow-card__footer">
            <div
                v-if="operateType === 'template'"
                class="sdxv-workflow-card__footer--select"
                @click="$emit('operate', {id: meta.uuid, type: 'template'})"
            >
                <i class="sdx-icon sdx-icon-detail" />
                <slot name="operationName">
                    <span>选择模板</span>
                </slot>
            </div>
            <div
                v-else-if="operateType === 'workflow'"
                class="sdxv-workflow-card__footer--select"
                @click="$emit('operate', {id: meta.uuid, type: 'workflow'})"
            >
                <i class="sdx-icon sdx-icon-detail" />
                <slot name="operationName">
                    <span>选择工作流</span>
                </slot>
            </div>
            <div
                v-else
                class="sdxv-workflow-card__footer--operation"
            >
                <i
                    class="sdx-icon sdx-huabu"
                    title="进入画布"
                    @click="$emit('operate', {id: meta.uuid, type: 'canvas'})"
                />
                <i
                    class="sdx-icon sdx-icon-tickets"
                    title="运行记录"
                    @click="$emit('operate', {id: meta.uuid, type: 'detail'})"
                />
                <i
                    v-if="editAble"
                    class="sdx-icon sdx-icon-edit"
                    title="编辑"
                    @click="$emit('operate', {item: meta, type: 'edit'})"
                />
                <i
                    v-if="deleteAble"
                    class="sdx-icon sdx-icon-delete"
                    title="删除"
                    @click="$emit('operate', {id: meta.uuid, type: 'delete'})"
                />
            </div>
        </footer>
        <div
            class="sdxv-workflow-card__mask"
            :class="workflowType.state"
            :style="{display: showMask ? 'inherit' : 'none'}"
        >
            <span class="sdxv-workflow-card__mask--text">
                {{ meta.description }}
            </span>
        </div>
    </div>
</template>

<script>
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import FoldLabel from '@sdx/widget/components/fold-label';
export default {
    name: 'SdxvWorkflowCard',
    props: {
        meta: {
            type: Object,
            default: () => ({})
        },
        editAble: {
            type: Boolean,
            default: false
        },
        deleteAble: {
            type: Boolean,
            default: false
        },
        operateType: {
            type: String,
            default: 'rud',
            validator: function (value) {
                return ['rud', 'template', 'workflow'].includes(value);
            }
        }
    },
    data() {
        return {
            showMask: false
        };
    },
    components: {
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel
    },
    computed: {
        workflowType() {
            const type = {};
            if (this.meta.isTemplate) {
                type.state = 'is-template';
                type.icon = 'sdx-icon-muban1';
            } else if ((Array.isArray(this.meta.users) && this.meta.users.length > 0) || (Array.isArray(this.meta.groups) && this.meta.groups.length > 0)) {
                type.state = 'is-cooperation';
                type.icon = 'sdx-icon-xiezuo1';
            } else {
                type.state = 'is-self';
                type.icon = 'sdx-icon-zijian1';
            }
            return type;
        }
    },
    methods: {
        handleMouseover() {
            this.showMask = !!this.meta.description;
        },
        handleMouseout() {
            this.showMask = false;
        },
        dateFormatter
    }
};
</script>
