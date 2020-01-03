<script>
import ElAlert from 'element-ui/lib/alert';
import locale from '@sdx/utils/src/mixins/locale';
import BubbleTipPopper from '@sdx/ui/components/bubble-tip-popper';
import Cache from '@sdx/utils/src/helper/cache';
import { RESOURCE_CONFIG_KEY } from '@sdx/utils/src/const/cache';
import { cpuTplFriendly, secToDay, secToHour } from '@sdx/utils/src/helper/transform';

export default {
    name: 'SdxwResourceAlert',
    components: {
        ElAlert,
        BubbleTipPopper
    },
    mixins: [locale],
    data() {
        return {
            typeMap: {
                develop: this.t('widget.resourceAlert.dev_type'),
                model: this.t('widget.resourceAlert.model_type'),
                develop_flow: this.t('widget.resourceAlert.dev_flow_type'),
                all: this.t('widget.resourceAlert.all')
            }
        };
    },
    computed: {
        taskType() {
            return this.typeMap[this.type];
        },
        userResourceConfig() {
            const config = Cache.get(RESOURCE_CONFIG_KEY);
            return config || {};
        },
        resourceConfigMap() {
            return {
                'maxConcurrentSkyideTasks': `${this.t('view.resourceManage.maxConcurrentSkyIDETasks')}${this.t('view.resourceManage.LessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentSkyideTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxConcurrentJupyterTasks': `${this.t('view.resourceManage.maxConcurrentJupyterTasks')}${this.t('view.resourceManage.LessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentJupyterTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxConcurrentContainerTasks': `${this.t('view.resourceManage.maxConcurrentContainerTasks')}${this.t('view.resourceManage.LessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentContainerTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxConcurrentSkyflowTasks': `${this.t('view.resourceManage.maxConcurrentSkyFlowTasks')}${this.t('view.resourceManage.LessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentSkyflowTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxConcurrentModelTasks': `${this.t('view.resourceManage.maxConcurrentModelTasks')}${this.t('view.resourceManage.LessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentModelTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxConcurrentHeavyTasks': `${this.t('view.resourceManage.TotalConcurrentHighResourceTasks')}${this.t('view.resourceManage.MoreOrEqual')}
                                            ${cpuTplFriendly(this.userResourceConfig.heavyTaskThreshold)}
                                            ${this.t('view.resourceManage.CountOfTotalTasksLessOrEqual')}
                                            ${this.userResourceConfig.maxConcurrentHeavyTasks}${this.t('view.resourceManage.NumberUnit')}`,
                'maxGpuTime': `${this.t('widget.resourceAlert.singleGPUDevTaskRunTime')}${this.t('view.resourceManage.LessOrEqual')}
                                ${secToHour(this.userResourceConfig.maxGpuTime)}${this.t('view.resourceManage.HourUnit')}`,
                'maxCpuTime': `${this.t('widget.resourceAlert.singleNonGPUDevTaskRunTime')}${this.t('view.resourceManage.LessOrEqual')}
                                ${secToDay(this.userResourceConfig.maxNonGpuTime)}${this.t('view.resourceManage.DayUnit')}`,
                'maxGpus': `${this.t('view.resourceManage.GPUsOccupied')}${this.t('view.resourceManage.LessOrEqual')}
                            ${this.userResourceConfig.maxGpus}${this.t('view.resourceManage.PieceUnit')}`
            };
        },
        typeKeys() {
            return {
                develop: ['maxConcurrentSkyideTasks', 'maxConcurrentJupyterTasks', 'maxConcurrentContainerTasks',
                    'maxConcurrentSkyflowTasks', 'maxGpuTime', 'maxCpuTime', 'maxConcurrentHeavyTasks', 'maxGpus'],
                develop_flow: ['maxConcurrentSkyideTasks', 'maxConcurrentJupyterTasks', 'maxConcurrentContainerTasks',
                    'maxConcurrentSkyflowTasks', 'maxGpuTime', 'maxCpuTime', 'maxConcurrentHeavyTasks', 'maxGpus'],
                model: ['maxConcurrentModelTasks', 'maxConcurrentHeavyTasks', 'maxGpus'],
                all: ['maxConcurrentSkyideTasks', 'maxConcurrentJupyterTasks', 'maxConcurrentContainerTasks',
                    'maxConcurrentSkyflowTasks', 'maxConcurrentModelTasks', 'maxGpuTime', 'maxCpuTime', 'maxConcurrentHeavyTasks', 'maxGpus']
            };
        }
    },
    props: {
        type: {
            type: String,
            default: 'develop', // model, develop, develop_flow
            validator: value => {
                return ['model', 'develop', 'develop_flow', 'all'].includes(value);
            }
        }
    },
    render(h) {
        const {t, taskType, typeKeys, resourceConfigMap, type} = this;
        return (
            <ElAlert type="info" closable={false} show-icon={true} class="sdxw-resource-alert">
                {t('widget.resourceAlert.currentUser') }{ taskType }{t('widget.resourceAlert.resource_rule') }
                <BubbleTipPopper title={t('widget.resourceAlert.resourceLimitTip')} light={true}>
                    <a slot="ref">{ t('widget.resourceAlert.detail_view') }</a>
                    <div>
                        {
                            typeKeys[type].map((key, index) => {
                                return (
                                    <div>{index + 1}、{resourceConfigMap[key]}</div>
                                );
                            })
                        }
                    </div>
                </BubbleTipPopper>
        ， { t('widget.resourceAlert.info') }
            </ElAlert>
        );
    }
};
</script>

<style scoped>

</style>
