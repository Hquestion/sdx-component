<template>
    <div 
        class="sdxw-subject-card"
    >
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
                        v-if="meta.type"
                    >
                        {{ `${meta.taskNumber}个任务` }}
                    </span>
                </div>
                <div class="right">
                    <span class="creator">
                        {{ (meta && meta.creator ) || '' }}
                    </span>
                    <i />
                    <span>
                        {{ `创建于${dateFormatter(meta && meta.createdAt)}` }}
                    </span>
                </div>
            </div>
            <div class="sdxw-subject-card__content--description">
                {{ meta && meta.description }}
            </div>
        </div>
        <div class="sdxw-subject-card__footer">
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
export default {
    name: 'SdxwSubjectCard',
    mixins: [locale],
    components: {
        [Button.name]: Button
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
        dateFormatter
    }
};
</script>