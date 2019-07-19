<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :close-on-click-modal="false"
        :title="t('view.skyflow.columns.runningSetting')"
        class="sdxv-task-edit"
    >
        <el-form
            label-position="left"
            label-width="110px"
            :model="taskForm"
            :rules="taskFormRule"
            ref="taskForm"
        >
            <el-form-item
                :label="t('view.skyflow.taskName')"
            >
                <sdxu-input
                    v-model="taskForm.crontabName"
                    :placeholder="t('view.skyflow.enterTaskName')"
                    disabled
                />
            </el-form-item>
            <el-form-item
                :label="t('view.skyflow.createForm.triggerFreq')"
                prop="crontab"
            >
                <sdxu-input
                    v-model="taskForm.crontab"
                    :placeholder="t('view.skyflow.enterFreq')"
                />
                <div class="sdxv-task-edit__tip">
                    {{ t('view.skyflow.example') }}
                </div>
            </el-form-item>
        </el-form>
        <div class="sdxv-task-edit__hint">
            <div style="margin-bottom: 10px;">
                {{ t('view.skyflow.taskAbort') }}
            </div>
            <div>
                <el-alert
                    :title="t('view.skyflow.taskAlert')"
                    type="info"
                    show-icon
                    :closable="false"
                />
            </div>
        </div>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import Dialog from '@sdx/ui/components/dialog';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import { Form, FormItem, Message } from 'element-ui';
import { updateTimerRunningTask } from '@sdx/utils/src/api/skyflow';
import Alert from 'element-ui/lib/alert';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'TimerRunningTaskEdit',
    data() {
        return {
            dialogVisible: this.visible,
            taskForm: {
                crontabName: '',
                crontab: ''
            },
            taskFormRule: {
                crontab: [
                    { required: true, message: this.t('view.skyflow.enterFreq'), trigger: 'change' }
                ]
            },
            needRefresh: false
        };
    },
    components: {
        [Dialog.name]: Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Input.name]: Input,
        [Button.name]: Button,
        [Alert.name]: Alert
    },
    mixins: [locale],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: null
        }
    },
    watch: {
        visible (nVal) {
            this.dialogVisible = nVal;
        }
    },
    created() {
        this.taskForm.crontabName = this.data.crontabName;
        this.taskForm.crontab = this.data.crontab;
    },
    methods: {
        confirm() {
            this.$refs.taskForm.validate(valid => {
                if (!valid) {
                    Message.error(this.t('sdxCommon.requiredInfo'));
                } else {
                    updateTimerRunningTask(this.data.uuid, this.taskForm).then(() => {
                        Message({
                            message: this.t('sdxCommon.UpdateSuccess'),
                            type: 'success'
                        });
                        this.needRefresh = true;
                        this.dialogVisible = false;
                    }).catch(() => {});
                }
            });
        },
        dialogClose() {
            this.$refs.taskForm.clearValidate();
            this.taskForm = {};
            this.$emit('update:visible', false);
            this.$emit('close', this.needRefresh);
        },
        cancel() {
            this.dialogVisible = false;
        }
    }
};
</script>

