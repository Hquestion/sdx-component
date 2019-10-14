<template>
    <div
        class="sdxw-subject-card"
    >
        <div class="sdxw-subject-card__header">
            <svg
                aria-hidden="true"
                class="sdxw-subject-card__icon"
            >
                <use :xlink:href="`#${meta.icon}`" />
            </svg>

            <div class="sdxw-subject-card__content">
                <div class="sdxw-subject-card__content--info">
                    <div class="left">
                        <span class="title">
                            {{ meta && meta.title }}
                        </span>
                        <span
                            class="task"
                            v-if="meta.type === 'project'"
                        >
                            {{ `${meta.taskNumber}个任务` }}
                        </span>
                    </div>
                    <div class="right">
                        <SdxwFoldLabel
                            plain
                            :type="meta.state && meta.state.type"
                            :status="meta.state && meta.state.status"
                            v-if="meta.type === 'task'"
                        >
                            {{ meta.state && meta.state.statusText || 'asffs' }}
                        </SdxwFoldLabel>
                        <i v-if="meta.type === 'task'" />
                        <div class="creator">
                            {{ (meta && meta.creator ) || '' }}
                        </div>
                        <i />
                        <div>
                            {{ `创建于${dateFormatter(meta && meta.createdAt)}` }}
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
                <slot name="operation" />
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
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import Button from '@sdx/ui/components/button';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import FoldLabel from '@sdx/widget/components/fold-label';
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
        showDetail() {
            this.$router.push({
                name: 'ProjectDetailNext',
                params: {
                    id: 'eb3f701c-0582-411b-a7dc-ed26956d81bf'
                }
            });
        }
    }
};
</script>
