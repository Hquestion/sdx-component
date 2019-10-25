<template>
    <div
        class="sdxw-subject-card"
    >
        <div class="sdxw-subject-card__header">
            <div class="sdxw-subject-card__icon">
                <svg
                    aria-hidden="true"
                >
                    <use :xlink:href="`#${meta.icon}`" />
                </svg>
                <div>
                    {{ meta.iconName }}
                </div>
            </div>
            <div class="sdxw-subject-card__content">
                <div class="sdxw-subject-card__content--info">
                    <div class="left">
                        <span
                            class="title"
                            @click="$emit('operate', {id: meta.uuid, type: 'detail'})"
                        >
                            {{ meta && meta.title }}
                        </span>
                        <span
                            class="task"
                            v-if="meta.type === 'project'"
                        >
                            {{ `${meta.taskNumber}${meta.taskNumber === 0 ? t('view.project.taskCount') : t('view.project.taskCounts')}` }}
                        </span>
                    </div>
                    <div class="right">
                        <SdxwFoldLabel
                            plain
                            :type="meta.state && meta.state.type"
                            :status="meta.state && meta.state.status"
                            v-if="meta.state && meta.state.type"
                        >
                            {{ meta.state && meta.state.statusText || 'null-state' }}
                        </SdxwFoldLabel>
                        <i
                            v-if="meta.state && meta.state.type"
                            class="customize-icon"
                        />
                        <div class="creator">
                            {{ (meta && meta.creator ) || '' }}
                            <span v-if="getUser().userId === meta.owner.uuid">({{ t('view.project.oneself') }})</span>
                        </div>
                        <i class="customize-icon" />
                        <div>
                            {{ `${t('view.project.Created')}${dateFormatter(meta && meta.createdAt)}` }}
                        </div>
                    </div>
                </div>
                <div class="sdxw-subject-card__content--description">
                    {{ meta && meta.description }}
                </div>
            </div>
        </div>

        <div
            class="sdxw-subject-card__footer"
            v-if="meta.footer !== false"
        >
            <div class="toUrl">
                <slot name="toUrl" />
            </div>
            <div class="operation">
                <slot
                    name="operations"
                    v-if="meta.type === 'task'"
                />
                <div
                    v-else
                    class="self"
                >
                    <sdxu-button
                        type="primary"
                        icon="sdx-icon sdx-icon-edit"
                        :plain="true"
                        v-if="meta.showEdit"
                        @click="$emit('operate', {item: meta, type: 'edit'})"
                    >
                        {{ t('widget.projectCard.title.Edit') }}
                    </sdxu-button>
                    <sdxu-button
                        type="primary"
                        icon="sdx-icon sdx-icon-delete"
                        :plain="true"
                        v-if="meta.showRemove"
                        @click="$emit('operate', {id: meta.uuid, type: 'delete'})"
                    >
                        {{ t('widget.projectCard.title.Delete') }}
                    </sdxu-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import Button from '@sdx/ui/components/button';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import FoldLabel from '@sdx/widget/components/fold-label';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
export default {
    name: 'SdxwSubjectCard',
    mixins: [locale],
    components: {
        [Button.name]: Button,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel
    },
    props: {
        meta: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        };
    },
    methods: {
        dateFormatter,
        getUser
    }
};
</script>
