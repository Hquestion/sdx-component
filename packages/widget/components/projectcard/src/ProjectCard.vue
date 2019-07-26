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
            <span
                v-if="meta.isTemplate"
                class="sdxw-project-card__header--type"
            >{{ t('widget.projectCard.Template') }}</span>
        </header>
        <main class="sdxw-project-card__main">
            <div class="sdxw-project-card__info">
                <i class="sdx-icon sdx-icon-user" />
                <span>{{ (meta.owner && meta.owner.fullName) || '' }}</span>
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
                    <span>{{ t('widget.projectCard.SelectTemplate') }}</span>
                </slot>
            </div>
            <div
                v-else-if="operateType === 'project'"
                class="sdxw-project-card__footer--select"
                @click="$emit('operate', {id: meta.uuid, type: 'project'})"
            >
                <i class="sdx-icon sdx-icon-detail" />
                <slot name="operationName">
                    <span>{{ t('widget.projectCard.SelectProject') }}</span>
                </slot>
            </div>
            <div
                v-else
                class="sdxw-project-card__footer--operation"
            >
                <sdxu-icon-button
                    v-if="viewAble"
                    icon="sdx-icon sdx-icon-detail"
                    :title="t('widget.projectCard.title.ViewDetail')"
                    @click="$emit('operate', {id: meta.uuid, type: 'detail'})"
                />
                <sdxu-icon-button
                    v-if="editAble"
                    icon="sdx-icon sdx-icon-edit"
                    :title="t('widget.projectCard.title.Edit')"
                    @click="$emit('operate', {id: meta.uuid, type: 'edit'})"
                />
                <sdxu-icon-button
                    v-if="deleteAble"
                    icon="sdx-icon sdx-icon-delete"
                    :title="t('widget.projectCard.title.Delete')"
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
import locale from '@sdx/utils/src/mixins/locale';
import IconButton from '@sdx/ui/components/icon-button';
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
            default: 'rud', // 读改删
            validator: function (value) {
                return ['rud', 'template', 'project'].includes(value);
            }
        }
    },
    components: {
        [IconButton.name]: IconButton
    },
    mixins: [locale],
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
