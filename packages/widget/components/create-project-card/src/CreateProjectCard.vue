<template>
    <div class="sdxw-create-project-card">
        <div class="sdxw-create-project-card__header">
            <svg
                aria-hidden="true"
                class="sdxw-create-project-card__icon"
            >
                <use :xlink:href="`#${icon}`" />
            </svg>
            <span>{{ meta.name }}</span>
        </div>
        <div class="sdxw-create-project-card__info">
            <span>{{ t('sdxCommon.Creator') }}：</span>
            <span>{{ (meta.owner && meta.owner.fullName) || '' }}</span>
        </div>
        <div class="sdxw-create-project-card__info time">
            <span>{{ t('view.project.Created') }}：</span>
            <span>{{ dateFormatter(meta.createdAt) }}</span>
        </div>
        <SdxuButton
            @click="$emit('operate', {id: meta.uuid, type: 'project'})"
            type="default"
            size="small"
            block
            class="sdxw-create-project-card__btn"
        >
            {{ t('widget.projectCard.SelectProject') }}
        </SdxuButton>
    </div> 
</template>

<script>
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'SdxwCreateProjectCard',
    props: {
        meta: {
            type: Object,
            default: () => ({})
        },
    },
    mixins: [locale],
    computed: {
        icon() {
            let icon = '';
            if (this.meta.type === 'private' && !this.meta.isTemplate) {
                icon = 'sdx-siyouxiangmu';
            } else if(this.meta.type === 'public' && !this.meta.isTemplate) {
                icon = 'sdx-xiezuoxiangmu';
            } else if(this.meta.isTemplate === true) {
                icon = 'sdx-mobanxiangmu';
            }
            return icon;
        }
    },
    components: {
        SdxuButton
    },
    methods: {
        dateFormatter
    }
};
</script>