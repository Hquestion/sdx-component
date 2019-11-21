<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.model.Online_testing')"
        class="sdxv-online-testing"
        width="720px"
    >
        <SdxwApiTest></SdxwApiTest>
    </sdxu-dialog>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuDialog from '@sdx/ui/components/dialog';
import {RadioGroup, Radio, Select, Option, Upload}  from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
import SdxwApiTest from '@sdx/widget/components/api-test';
export default {
    name: 'SdxvOnlineTesting',
    mixins: [locale],
    data() {
        return {
            radio: 'imageRecognition',
            testType: [
                {
                    value: 'CRUL',
                    label: 'CRUL'
                },
                {
                    value: 'JSON',
                    label: 'JSON'
                }
            ],
            params: {

            }
        };
    },
    components: {
        SdxuDialog,
        SdxwApiTest
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.sdxv-online-testing {
    .service-url {
        /deep/ {
            .el-form-item__content {
                display: flex;
                position: relative;
            }
            .sdxu-input.sdxu-input--regular {
                width: calc(100% - 100px);
            }
            .sdxu-button.sdxu-button--regular {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 68px;
                height: 40px;
                i {
                    font-size: 24px;
                }
            }
        }
    }
    .api-key {
        @extend .service-url;
    }
    .machine-test {
        /deep/ {
            div:first-child {
                display: flex;
                .el-select {
                    width: calc(100% - 60px);
                }
            }
            .sdxu-button.sdxu-button--regular.sdxu-button--default{
                width: 60px;
                border-left: none;
                border-radius: 0 0px 2px 0;
                padding: 0;
            }
            .el-select .el-input__inner {
                border-radius: 2px 0 0 0px;
            }
            .sdxu-input .el-input__inner, .sdxu-input .el-textarea__inner {
                border-top: none;
                border-radius: 0 0 2px 2px;
            }
        }
    }
    .upload-image {
        /deep/ {
            .el-upload {
                display: flex;
            }
            .occupying-box {
                background: #EDEFF2;
                border-radius: 2px;
                width: 200px;
                height: 200px;
                display: flex;
                flex-direction: column;
                font-size: 12px;
                color: #6E7C94;
                padding: 72px 0;
                span {
                    height: 16px;
                }
            }
            img {
                width: 200px;
                height: 200px;
            }
            .upload-btn {
                padding-top: 120px;
                text-align: left;
                padding-left: 16px;
            }
        }
    }
}
</style>
