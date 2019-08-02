<template>
    <div
        class="resource-card"
        :class="{'is-gpu': isGPU, 'is-cpu': isCPU}"
    >
        <div class="icon">
            <i v-if="isCPU" class="sdx-icon sdx-cpu-dashboard" />
            <i v-if="isGPU" class="sdx-icon sdx-icon-GPU-dashboard" />
        </div>
        <div class="detail">
            <div
                class="cate-group"
                v-for="(cate, index) in cates"
                :key="index"
            >
                <div class="cate-type">
                    {{ cate }}
                </div>
                <div class="cate-count" :title="`${count[index]}${unit[index]}`">
                    <span>{{ count[index] }}</span>{{ unit[index] }}
                </div>
            </div>
        </div>
        <div v-auth.resource.button="'TEMPLATE:WRITE'">
            <IconButton
                class="delete"
                icon="iconfont sdx-icon-delete"
                @click.stop="handleDelete"
            />
        </div>
    </div>
</template>

<script>
import MessageBox from '@sdx/ui/components/message-box';
import IconButton from '@sdx/ui/components/icon-button';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'ResourceCard',
    data() {
        return {};
    },
    mixins: [locale],
    components: {
        IconButton
    },
    props: {
        type: {
            type: String,
            default: 'CPU'
        },
        count: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isGPU() {
            return this.type === 'GPU';
        },
        isCPU() {
            return this.type === 'CPU';
        },
        cates() {
            if (this.isCPU) {
                return ['CPU', this.t('view.resourceManage.Memory')];
            } else if (this.isGPU) {
                return ['GPU', this.t('view.resourceManage.Model')];
            } else{
                return [];
            }
        },
        unit() {
            if (this.isCPU) {
                return [this.t('view.resourceManage.Core'), 'G'];
            } else if (this.isGPU) {
                return [this.t('view.resourceManage.Piece'), ''];
            } else {
                return [];
            }
        }
    },
    methods: {
        handleDelete() {
            MessageBox.confirm.error({
                title: this.t('view.resourceManage.ConfirmDeleteTemplate'),
                content: this.t('view.file.CantRecoveryAfterDel')
            }).then(() => {
                this.$emit('delete');
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    @import '~@sdx/utils/src/theme-common/var';
    .resource-card {
        display: flex;
        width: 173px;
        height: 68px;
        padding: 0 14px;
        align-items: center;
        justify-content: flex-start;
        background: rgba(242,246,252,0.8);
        border-radius: $sdx-border-radius;
        position: relative;
        &.is-cpu {
            .icon {
                background:rgba(220,230,251,1);
                color: $sdx-primary-color;
            }
        }
        &.is-gpu {
            .icon {
                background: rgba(30,230,212,0.13);
                color: $sdx-success-color;
            }
        }
        .icon {
            width: 32px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            background: rgba(242,246,252,0.8);
            border-radius: $sdx-border-radius;
            .iconfont {
                font-size: 17px;
            }
        }
        .detail {
            margin-left: 10px;
            font-size: 13px;
            width: calc(100% - 46px);
            .cate-group {
                line-height: 1.5;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .cate-type {
                    color: $sdx-text-regular-color;
                    white-space: nowrap;
                }
                .cate-count {
                    margin-left: 14px;
                    color: $sdx-text-primary-color;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .delete {
            position: absolute;
            right: 8px;
            top: 8px;
            display: none;
        }
        &:hover {
            .delete {
                display: block;
            }
        }
    }
</style>
