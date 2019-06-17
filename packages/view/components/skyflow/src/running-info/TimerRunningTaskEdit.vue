<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        @close="dialogClose"
        :close-on-click-modal="false"
        title="定时运行设置"
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
                label="任务名称："
            >
                <sdxu-input
                    v-model="taskForm.crontabName"
                    placeholder="请输入任务名称"
                    disabled
                />
            </el-form-item>
            <el-form-item
                label="触发频率："
                prop="crontab"
            >
                <sdxu-input
                    v-model="taskForm.crontab"
                    placeholder="请输入触发频率"
                />
                <div class="sdxv-task-edit__tip">
                    示例：“0 0 * * ？”表示每天0点触发执行。
                </div>
            </el-form-item>
        </el-form>
        <div class="sdxv-task-edit__hint">
            <div style="margin-bottom: 10px;">
                周期内未执行完时：放弃
            </div>
            <div>
                <el-alert
                    title="如果下次触发时, 上一轮任务还没有执行完成, 则直接Kill掉当前任务, 启动新一轮任务。"
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
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                确认
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
                    { required: true, message: '请输入触发频率', trigger: 'change' }
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
        Object.assign(this.taskForm, this.data);
    },
    methods: {
        confirm() {
            this.$refs.taskForm.validate(valid => {
                if (!valid) {
                    Message.error('请输入必填信息');
                } else {
                    updateTimerRunningTask(this.taskForm.uuid, this.taskForm).then(() => {
                        Message({
                            message: '更新成功',
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

