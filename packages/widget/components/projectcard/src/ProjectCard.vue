<template>
    <div
        class="sdxw-project-card"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout"
    >
        <header class="sdxw-project-card__header">
            <i
                class="sdxw-project-card__header--icon sdx-icon"
                :class="[projectType.state, projectType.icon]"
            />
            <span class="sdxw-project-card__header--name">{{ meta.name }}</span>
        </header>
        <main class="sdxw-project-card__main">
            <div class="sdxw-project-card__info">
                <i class="sdx-icon sdx-icon-user" />
                <span>{{ meta.owner && meta.owner.fullName }}</span>
            </div>
            <div class="sdxw-project-card__info">
                <i class="sdx-icon sdx-icon-time" />
                <span>{{ dateFormatter(meta.createdAt) }}</span>
            </div>
        </main>
        <footer class="sdxw-project-card__footer">
            <div
                v-if="operateType === 'template'"
                class="sdxw-project-card__footer--select"
                @click="$emit('operate', {id: meta.uuid, type: 'template'})"
            >
                <i class="sdx-icon sdx-icon-detail" />
                <slot name="operationName">
                    <span>选择模板</span>
                </slot>
            </div>
            <div
                v-else-if="operateType === 'project'"
                class="sdxw-project-card__footer--select"
                @click="$emit('operate', {id: meta.uuid, type: 'project'})"
            >
                <i class="sdx-icon sdx-icon-detail" />
                <slot name="operationName">
                    <span>选择项目</span>
                </slot>
            </div>
            <div
                v-else
                class="sdxw-project-card__footer--operation"
            >
                <i
                    v-if="viewAble"
                    class="sdx-icon sdx-icon-detail"
                    title="查看详情"
                    @click="$emit('operate', {id: meta.uuid, type: 'detail'})"
                />
                <i
                    v-if="editAble"
                    class="sdx-icon sdx-icon-edit"
                    title="编辑"
                    @click="$emit('operate', {id: meta.uuid, type: 'edit'})"
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
            class="sdxw-project-card__mask"
            :class="projectType.state"
            :style="{display: showMask ? 'inherit' : 'none'}"
        >
            <span class="sdxw-project-card__mask--text">
                {{ meta.description }}
            </span>
        </div>
    </div>
</template>

<script>
import {dateFormatter} from '@sdx/utils/src/helper/transform';
export default {
    name: 'SdxwProjectCard',
    props: {
        meta: {
            type: Object,
            default: () => ({})
        },
        viewAble: {
            type: Boolean,
            default: true
        },
        editAble: {
            type: Boolean,
            default: true
        },
        deleteAble: {
            type: Boolean,
            default: true
        },
        operateType: {
            type: String,
            default: 'rud',
            validator: function (value) {
                return ['rud', 'template', 'project'].includes(value);
            }
        }
    },
    data() {
        return {
            showMask: false
        };
    },
    computed: {
        projectType() {
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

<style>

</style>
