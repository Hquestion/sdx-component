<template>
    <div
        :class="['sdxw-subject-card', `sdxw-subject-card--${size}`]"
    >
        <div :class="['sdxw-subject-card__header', `sdxw-subject-card__header--${cardIcon}`]">
            <div
                class="sdxw-subject-card__icon"
                v-if="cardIcon"
            >
                <svg
                    aria-hidden="true"
                >
                    <use :xlink:href="`#${meta && meta.icon}`" />
                </svg>
                <div>
                    {{ meta && meta.iconName }}
                </div>
            </div>
            <div
                :class="['sdxw-subject-card__content', `sdxw-subject-card__content--${cardIcon}`]"
            >
                <div class="sdxw-subject-card__content--info">
                    <div>
                        <div
                            @click="$emit('operate', {id: meta.uuid, type: 'detail'})"
                        >
                            {{ meta && meta.title }}
                        </div>
                        <div
                            class="sdxw-subject-card__taskCount"
                            v-if="size === 'large'"
                        >
                            {{ `${meta.taskNumber}${meta.taskNumber === 0 ? t('view.project.taskCount') : t('view.project.taskCounts')}` }}
                        </div>
                        <div>
                            <SdxwFoldLabel
                                plain
                                :type="meta && meta.state && meta.state.type"
                                :status="meta && meta.state && meta.state.status"
                                v-if="meta && meta.state && meta.state.type && size === 'small'"
                            >
                                {{ meta && meta.state && meta.state.statusText }}
                            </SdxwFoldLabel>
                        </div>
                    </div>

                    <div>
                        <div>
                            {{ (meta && meta.creator ) || '' }}
                            <span v-if="getUser().userId === (meta && meta.owner.uuid)">({{ t('view.project.oneself') }})</span>
                        </div>
                        <i v-if="size === 'large'" />
                        <div>
                            {{ `${t('view.project.Created')}${dateFormatter(meta && meta.createdAt)}` }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="size === 'large'"
                    class="sdxw-subject-card__content--description"
                >
                    {{ (meta && meta.description) ? meta.description : t('widget.projectCard.NoDescriptionAdded') }}
                </div>
            </div>
        </div>
        <div
            class="sdxw-subject-card__taskdesc"
            v-if="size === 'small' && !needProjectName"
        >
            {{ (meta && meta.description) ? meta.description : t('widget.projectCard.NoDescriptionAdded') }}
        </div>
        <div
            v-if="size === 'small' && needProjectName"
            class="sdxw-subject-card__projectName"
        >
            <div>
                <span>{{ `${t('view.task.TaskDescription')}：` }}</span>
                <span> {{ (meta && meta.description) ? meta.description : t('widget.projectCard.NoDescriptionAdded') }}</span>
            </div>
            <div>
                <span>{{ `${t('view.task.taskProject')}：` }}</span>
                <span @click="$emit('goProjectDetail',meta.projectId)">{{ meta && meta.projectName }}</span>
            </div>
        </div>
        <div>
            <slot name="cardLabel" />
        </div>
        <div
            class="sdxw-subject-card__footer"
            v-if="meta && meta.footer !== false"
        >
            <div>
                <slot name="footerLeft" />
            </div>
            <div>
                <slot name="footerRight" />
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
        },
        size: {
            type: String,
            default: 'small'
        },
        cardIcon: {
            type: Boolean,
            default: true
        },
        needProjectName: {
            type: Boolean,
            default: false
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
