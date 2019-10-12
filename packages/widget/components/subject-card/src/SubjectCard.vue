<template>
    <div 
        class="sdxw-subject-card"
    >
        <svg
            aria-hidden="true"
            class="sdxw-subject-card__icon"
        >
            <use :xlink:href="`#${cardIcon}`" />
        </svg>
        
        <div class="sdxw-subject-card__content">
            <div class="sdxw-subject-card__content--info">
                <div class="left">
                    <span class="title">
                        {{ cardTitle }}
                    </span>
                    <span class="task">
                        {{ `${taskNumber}个任务` }}
                    </span>
                </div>
                <div class="right">
                    <span class="creator">
                        {{ creator }}
                    </span>
                    <i />
                    <span>
                        {{ `创建于${createdTime}` }}
                    </span>
                </div>
            </div>
            <div class="sdxw-subject-card__content--description">
                {{ description }}
            </div>
        </div>
        <div class="sdxw-subject-card__footer">
            <div class="toUrl">
                <slot name="toUrl" />
            </div>
            <div class="operation">
                <slot name="operation" />
                <sdxu-icon-button
                    icon="sdx-icon sdx-icon-edit"
                />
                <sdxu-icon-button
                    icon="sdx-icon sdx-icon-delete"
                />
            </div>
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxwSubjectCard',
    mixins: [locale],
    components: {
        [IconButton.name]: IconButton
    },
    props: {
        cardType: {
            type: String,
            default: 'project'
        },
        cardIcon: {
            type: String,
            default: 'sdx-icon-UserInfo'
        },
        cardTitle: {
            type: String,
            default: '私有项目' 
        },
        taskNumber: {
            type: Number,
            default: 5
        },
        creator: {
            type: String,
            default: '吴晓飞'
        },
        createdTime: {
            type: String,
            default: '2019-09-19 16:23:23'
        },
        description: {
            type: String,
            default: '我是描述喵啊是大大阿巴斯能发顺丰巴萨把生机勃发的就是放假啊是贝多芬把沙发沙发电视wfipjgpjspgjsjgpjapgjnafo;fo;jfa背景多少发把手机放哪了是非得失包括了四姑娘山劳工部公布是的'
        }
    },
    data() {
        return {
            
        };
    },
};
</script>