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
        <div class="sdxw-create-project-card__info">
            <span>{{ t('view.project.Created') }}：</span>
            <span>{{ dateFormatter(meta.createdAt) }}</span>
        </div>
        <div
            @click="$emit('operate', {id: meta.uuid, type: 'project'})"
            class="sdxw-create-project-card__btn"
        >
            <span>{{ t('widget.projectCard.SelectProject') }}</span>
        </div>
    </div> 
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';
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
        [IconButton.name]: IconButton
    },
    methods: {
        dateFormatter
    }
};
</script>