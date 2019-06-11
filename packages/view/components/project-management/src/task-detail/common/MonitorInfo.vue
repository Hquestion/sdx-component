<template>
    <div class="sdxv-monitor-info">
        <div class="sdxv-monitor-info__select">
            <span>请选择实例：</span>
            <el-select
                v-model="currentPod"
                size="small"
            >
                <el-option
                    v-for="pod in pods"
                    :key="pod.name"
                    :value="pod.name"
                    :label="pod.name"
                />
            </el-select>
        </div>
        <div class="sdxv-monitor-info__chart">
            <div
                class="sdxv-monitor-info__chart--item"
                ref="usedCpu" 
            />
            <div
                class="sdxv-monitor-info__chart--item"
                ref="usedMem"
            />
            <div
                v-if="hasGpu"
                class="sdxv-monitor-info__chart--item"
                ref="usedGpu" 
            />
            <div
                v-if="hasGpu"
                class="sdxv-monitor-info__chart--item"
                ref="usedGpuMem" 
            />
        </div>
    </div>
</template>

<script>
import Select from 'element-ui/lib/select';
import Option from 'element-ui/lib/option';

import echarts from 'echarts';
import { formatDate } from '@sdx/utils/src/helper/transform';

const CHART_DEFAULT_OPTION = {
    // 监t图的基本配置
    title: {
        text: '', // 需要自己设置
        textStyle: {
            fontSize: 14,
            color: '#333'
        },
        left: '10px',
        top: '10px'
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        extraCssText: 'width: 200px',
        formatter: null // 需要自己设置
    },
    // legend: {
    //     data: [] // 需要自己设置
    // },
    grid: {
        left: '70px',
        right: '70px'
    },
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
            show: true,
            backgroundColor: '#777'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
            label: {
                show: true,
                backgroundColor: '#777'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#C4C6CF'
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#606266',
            rotate: 10,
            margin: 40,
            align: 'center'
        },
        data: [] // 需要自己设置
    },
    yAxis: {
        name: '', // 需要自己设置
        scale: false,
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#606266',
            align: 'right'
        },
        splitLine: {
            show: false
        }
    },
    series: [] // 需要自己设置
};

export default {
    name: 'SdxvMonitorInfo',
    components: {
        [Select.name]: Select,
        [Option.name]: Option
    },
    props: {
        pods: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentPod: this.pods[0].name,
            hasGpu: false,
            chartInstance: {
                // chart实例的挂载点
                usedCpu: null,
                usedMem: null,
                usedGpu: null,
                usedGpuMem: null
            },
            chartData: {
                'action': 'TaskMetricsResultResponse', 
                'allocatedCpu': '4.0', 
                'allocatedGpu': '0.0', 
                'allocatedMem': '8192.0', 
                'errCode': 1000, 
                'message': 'success', 
                'perGpuMemTotal': [], 
                'serverVersion': 'v1', 
                'stats': [
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597177', 
                        'usedCpu': '0.23133983555554652', 
                        'usedMem': '14.9453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597182', 
                        'usedCpu': '0.23133983555554652', 
                        'usedMem': '14.9453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597187', 
                        'usedCpu': '0.23133983555554652', 
                        'usedMem': '14.9453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597192', 
                        'usedCpu': '0.21255005666835722', 
                        'usedMem': '14.78515625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597197', 
                        'usedCpu': '0.21255005666835722', 
                        'usedMem': '14.78515625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597202', 
                        'usedCpu': '0.21255005666835722', 
                        'usedMem': '14.78515625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597207', 
                        'usedCpu': '0.33613450666659145', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597212', 
                        'usedCpu': '0.33613450666659145', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597217', 
                        'usedCpu': '0.33613450666659145', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597222', 
                        'usedCpu': '0.3075716022218936', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597227', 
                        'usedCpu': '0.3075716022218936', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597232', 
                        'usedCpu': '0.3075716022218936', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597237', 
                        'usedCpu': '0.3152811066663869', 
                        'usedMem': '14.89453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597242', 
                        'usedCpu': '0.3152811066663869', 
                        'usedMem': '14.89453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597247', 
                        'usedCpu': '0.3152811066663869', 
                        'usedMem': '14.89453125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597252', 
                        'usedCpu': '0.27666932222220764', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597257', 
                        'usedCpu': '0.27666932222220764', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597262', 
                        'usedCpu': '0.27666932222220764', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597267', 
                        'usedCpu': '0.2674002555563169', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597272', 
                        'usedCpu': '0.2674002555563169', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597277', 
                        'usedCpu': '0.2674002555563169', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597282', 
                        'usedCpu': '0.2635557911111795', 
                        'usedMem': '14.94921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597287', 
                        'usedCpu': '0.2635557911111795', 
                        'usedMem': '14.94921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597292', 
                        'usedCpu': '0.2635557911111795', 
                        'usedMem': '14.94921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597297', 
                        'usedCpu': '0.30504602000089814', 
                        'usedMem': '14.96875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597302', 
                        'usedCpu': '0.30504602000089814', 
                        'usedMem': '14.96875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597307', 
                        'usedCpu': '0.30504602000089814', 
                        'usedMem': '14.96875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597312', 
                        'usedCpu': '0.28630407777705436', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597317', 
                        'usedCpu': '0.28630407777705436', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597322', 
                        'usedCpu': '0.28630407777705436', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597327', 
                        'usedCpu': '0.25991236222277314', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597332', 
                        'usedCpu': '0.25991236222277314', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597337', 
                        'usedCpu': '0.25991236222277314', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597342', 
                        'usedCpu': '0.22518612888840533', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597347', 
                        'usedCpu': '0.22518612888840533', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597352', 
                        'usedCpu': '0.22518612888840533', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597357', 
                        'usedCpu': '0.2772900844451619', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597362', 
                        'usedCpu': '0.2772900844451619', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597367', 
                        'usedCpu': '0.2772900844451619', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597372', 
                        'usedCpu': '0.30823069999920943', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597377', 
                        'usedCpu': '0.30823069999920943', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597382', 
                        'usedCpu': '0.30823069999920943', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597387', 
                        'usedCpu': '0.28418234888906424', 
                        'usedMem': '14.87890625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597392', 
                        'usedCpu': '0.28418234888906424', 
                        'usedMem': '14.87890625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597397', 
                        'usedCpu': '0.28418234888906424', 
                        'usedMem': '14.87890625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597402', 
                        'usedCpu': '0.29181329111047993', 
                        'usedMem': '14.90625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597407', 
                        'usedCpu': '0.29181329111047993', 
                        'usedMem': '14.90625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597412', 
                        'usedCpu': '0.29181329111047993', 
                        'usedMem': '14.90625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597417', 
                        'usedCpu': '0.28960066666715845', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597422', 
                        'usedCpu': '0.28960066666715845', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597427', 
                        'usedCpu': '0.28960066666715845', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597432', 
                        'usedCpu': '0.31729776888823835', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597437', 
                        'usedCpu': '0.31729776888823835', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597442', 
                        'usedCpu': '0.31729776888823835', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597447', 
                        'usedCpu': '0.3116465777778406', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597452', 
                        'usedCpu': '0.3116465777778406', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597457', 
                        'usedCpu': '0.3116465777778406', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597462', 
                        'usedCpu': '0.31671905777734033', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597467', 
                        'usedCpu': '0.31671905777734033', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597472', 
                        'usedCpu': '0.31671905777734033', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597477', 
                        'usedCpu': '0.3175946533337992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597482', 
                        'usedCpu': '0.3175946533337992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597487', 
                        'usedCpu': '0.3175946533337992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597492', 
                        'usedCpu': '0.1955641844445684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597497', 
                        'usedCpu': '0.1955641844445684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597502', 
                        'usedCpu': '0.1955641844445684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597507', 
                        'usedCpu': '0.22336329111163244', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597512', 
                        'usedCpu': '0.22336329111163244', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597517', 
                        'usedCpu': '0.22336329111163244', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597522', 
                        'usedCpu': '0.24648976222225527', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597527', 
                        'usedCpu': '0.24648976222225527', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597532', 
                        'usedCpu': '0.24648976222225527', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597537', 
                        'usedCpu': '0.36883300000024766', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597542', 
                        'usedCpu': '0.36883300000024766', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597547', 
                        'usedCpu': '0.36883300000024766', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597552', 
                        'usedCpu': '0.36574350444425363', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597557', 
                        'usedCpu': '0.36574350444425363', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597562', 
                        'usedCpu': '0.36574350444425363', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597567', 
                        'usedCpu': '0.2463513022222388', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597572', 
                        'usedCpu': '0.2463513022222388', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597577', 
                        'usedCpu': '0.2463513022222388', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597582', 
                        'usedCpu': '0.21754895333288005', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597587', 
                        'usedCpu': '0.21754895333288005', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597592', 
                        'usedCpu': '0.21754895333288005', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597597', 
                        'usedCpu': '0.21172428888854075', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597602', 
                        'usedCpu': '0.21172428888854075', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597607', 
                        'usedCpu': '0.21172428888854075', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597612', 
                        'usedCpu': '0.3104991755551762', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597617', 
                        'usedCpu': '0.3104991755551762', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597622', 
                        'usedCpu': '0.3104991755551762', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597627', 
                        'usedCpu': '0.3695394799999323', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597632', 
                        'usedCpu': '0.3695394799999323', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597637', 
                        'usedCpu': '0.3695394799999323', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597642', 
                        'usedCpu': '0.2513560800000252', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597647', 
                        'usedCpu': '0.2513560800000252', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597652', 
                        'usedCpu': '0.2513560800000252', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597657', 
                        'usedCpu': '0.2734110533341057', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597662', 
                        'usedCpu': '0.2734110533341057', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597667', 
                        'usedCpu': '0.2734110533341057', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597672', 
                        'usedCpu': '0.21130948888943143', 
                        'usedMem': '14.84375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597677', 
                        'usedCpu': '0.21130948888943143', 
                        'usedMem': '14.84375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597682', 
                        'usedCpu': '0.21130948888943143', 
                        'usedMem': '14.84375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597687', 
                        'usedCpu': '0.33343273111111355', 
                        'usedMem': '14.91796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597692', 
                        'usedCpu': '0.33343273111111355', 
                        'usedMem': '14.91796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597697', 
                        'usedCpu': '0.33343273111111355', 
                        'usedMem': '14.91796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597702', 
                        'usedCpu': '0.3101029511102145', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597707', 
                        'usedCpu': '0.3101029511102145', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597712', 
                        'usedCpu': '0.3101029511102145', 
                        'usedMem': '15.01953125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597717', 
                        'usedCpu': '0.33975843777726467', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597722', 
                        'usedCpu': '0.33975843777726467', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597727', 
                        'usedCpu': '0.33975843777726467', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597732', 
                        'usedCpu': '0.3143385755558685', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597737', 
                        'usedCpu': '0.3143385755558685', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597742', 
                        'usedCpu': '0.3143385755558685', 
                        'usedMem': '14.75'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597747', 
                        'usedCpu': '0.2812687266668945', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597752', 
                        'usedCpu': '0.2812687266668945', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597757', 
                        'usedCpu': '0.2812687266668945', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597762', 
                        'usedCpu': '0.24503137111120546', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597767', 
                        'usedCpu': '0.24503137111120546', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597772', 
                        'usedCpu': '0.24503137111120546', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597777', 
                        'usedCpu': '0.24201484444448498', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597782', 
                        'usedCpu': '0.24201484444448498', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597787', 
                        'usedCpu': '0.24201484444448498', 
                        'usedMem': '14.72265625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597792', 
                        'usedCpu': '0.2727865422224972', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597797', 
                        'usedCpu': '0.2727865422224972', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597802', 
                        'usedCpu': '0.2727865422224972', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597807', 
                        'usedCpu': '0.27711559777748734', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597812', 
                        'usedCpu': '0.27711559777748734', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597817', 
                        'usedCpu': '0.27711559777748734', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597822', 
                        'usedCpu': '0.2812807755556908', 
                        'usedMem': '14.75390625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597827', 
                        'usedCpu': '0.2812807755556908', 
                        'usedMem': '14.75390625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597832', 
                        'usedCpu': '0.2812807755556908', 
                        'usedMem': '14.75390625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597837', 
                        'usedCpu': '0.2470094622225992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597842', 
                        'usedCpu': '0.2470094622225992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597847', 
                        'usedCpu': '0.2470094622225992', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597852', 
                        'usedCpu': '0.28760776888904926', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597857', 
                        'usedCpu': '0.28760776888904926', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597862', 
                        'usedCpu': '0.28760776888904926', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597867', 
                        'usedCpu': '0.25269809777758684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597872', 
                        'usedCpu': '0.25269809777758684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597877', 
                        'usedCpu': '0.25269809777758684', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597882', 
                        'usedCpu': '0.3139225888884943', 
                        'usedMem': '15.05078125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597887', 
                        'usedCpu': '0.3139225888884943', 
                        'usedMem': '15.05078125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597892', 
                        'usedCpu': '0.3139225888884943', 
                        'usedMem': '15.05078125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597897', 
                        'usedCpu': '0.25069721111119886', 
                        'usedMem': '14.796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597902', 
                        'usedCpu': '0.25069721111119886', 
                        'usedMem': '14.796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597907', 
                        'usedCpu': '0.25069721111119886', 
                        'usedMem': '14.796875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597912', 
                        'usedCpu': '0.27856362666676027', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597917', 
                        'usedCpu': '0.27856362666676027', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597922', 
                        'usedCpu': '0.27856362666676027', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597927', 
                        'usedCpu': '0.31557562222183655', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597932', 
                        'usedCpu': '0.31557562222183655', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597937', 
                        'usedCpu': '0.31557562222183655', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597942', 
                        'usedCpu': '0.31534026666728704', 
                        'usedMem': '14.82421875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597947', 
                        'usedCpu': '0.31534026666728704', 
                        'usedMem': '14.82421875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597952', 
                        'usedCpu': '0.31534026666728704', 
                        'usedMem': '14.82421875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597957', 
                        'usedCpu': '0.34315920888831086', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597962', 
                        'usedCpu': '0.34315920888831086', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597967', 
                        'usedCpu': '0.34315920888831086', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597972', 
                        'usedCpu': '0.1839921066665637', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597977', 
                        'usedCpu': '0.1839921066665637', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597982', 
                        'usedCpu': '0.1839921066665637', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597987', 
                        'usedCpu': '0.2239192822222928', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597992', 
                        'usedCpu': '0.2239192822222928', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558597997', 
                        'usedCpu': '0.2239192822222928', 
                        'usedMem': '14.7734375'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598002', 
                        'usedCpu': '0.23071602444461958', 
                        'usedMem': '15.21875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598007', 
                        'usedCpu': '0.23071602444461958', 
                        'usedMem': '15.21875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598012', 
                        'usedCpu': '0.23071602444461958', 
                        'usedMem': '15.21875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598017', 
                        'usedCpu': '0.329033455555974', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598022', 
                        'usedCpu': '0.329033455555974', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598027', 
                        'usedCpu': '0.329033455555974', 
                        'usedMem': '14.67578125'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598032', 
                        'usedCpu': '0.3134980333329117', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598037', 
                        'usedCpu': '0.3134980333329117', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598042', 
                        'usedCpu': '0.3134980333329117', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598047', 
                        'usedCpu': '0.2825954755553539', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598052', 
                        'usedCpu': '0.2825954755553539', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598057', 
                        'usedCpu': '0.2825954755553539', 
                        'usedMem': '14.69921875'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598062', 
                        'usedCpu': '0.2761733622224306', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598067', 
                        'usedCpu': '0.2761733622224306', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598072', 
                        'usedCpu': '0.2761733622224306', 
                        'usedMem': '14.84765625'
                    }, 
                    {
                        'gpuUsage': [], 
                        'timeStamp': '1558598077', 
                        'usedCpu': '0.28401196888909097', 
                        'usedMem': '14.75'
                    }
                ], 
                'taskId': 'containerdev-1558512811773-120', 
                'taskName': 'containerdev-1558512811773-120'
            }
        };
    },
    methods: {
        /** 获图表数据 */
        fetchTaskStat() {
            // todo:
        },
        /** 将获取的数据处理成 chart 需要的形式 */
        processData() {
            this.hasGpu = +this.chartData.allocatedGpu > 0;
            this.xAxisData = this.chartData.stats.map(item =>
                formatDate(item.timeStamp * 1000, 'YYYY-MM-DD HH:mm:ss')
            );
            // 整理 cpu 使用
            this.usedCpuSeriesData = [
                {
                    name: 'cpu使用率',
                    type: 'line',
                    itemStyle: {
                        color: '#4781F8',
                        borderWidth: 2
                    },
                    data: this.chartData.stats.map(item =>
                        parseFloat(item.usedCpu).toFixed(2)
                    )
                }
            ];
            // 整理 mem 使用
            this.usedMemSeriesData = [
                {
                    name: '内存使用量',
                    type: 'line',
                    itemStyle: {
                        color: '#9E5BF8',
                        borderWidth: 2
                    },
                    data: this.chartData.stats.map(item =>
                        parseInt(item.usedMem)
                    )
                }
            ];
            // 如果有 gpu 整理 cpu 相关数据
            if (this.hasGpu) {
                // gpu 使用率
                this.usedGpuSeriesData = this.chartData.perGpuMemTotal.map(
                    item => ({
                        name: `${item.gpuId}使用率`,
                        type: 'line',
                        itemStyle: {
                            color: '#4781F8',
                            borderWidth: 2
                        },
                        data: this.chartData.stats.map(stat =>
                            parseFloat(
                                (
                                    stat.gpuUsage.find(
                                        gpu => gpu.gpuId === item.gpuId
                                    ) || {}
                                ).usedGpu || 0
                            ).toFixed(2)
                        )
                    })
                );
                // gpu 内存使用量
                this.usedGpuMemSeriesData = this.chartData.perGpuMemTotal.map(
                    item => ({
                        name: `${item.gpuId}-显存使用量`,
                        type: 'line',
                        itemStyle: {
                            color: '#9E5BF8',
                            borderWidth: 2
                        },
                        data: this.chartData.stats.map(stat =>
                            parseInt(
                                (
                                    stat.gpuUsage.find(
                                        gpu => gpu.gpuId === item.gpuId
                                    ) || {}
                                ).usedGpuMem
                            )
                        )
                    })
                );
            }

            this.hasGpu = true;
            this.usedGpuSeriesData = this.usedCpuSeriesData;
            this.usedGpuMemSeriesData = this.usedMemSeriesData;

            // 渲染图表
            this.$nextTick().then(() => {
                this.renderChart();
            });
        },
        renderChart() {
            this.renderChartByName('usedCpu');
            this.renderChartByName('usedMem');
            if (this.hasGpu) {
                this.renderChartByName('usedGpu');
                this.renderChartByName('usedGpuMem');
            }
        },
        renderChartByName(name) {
            if (this.chartInstance[name]) {
                this.chartInstance[name].dispose();
                this.chartInstance[name] = null;
            }
            this.chartInstance[name] = echarts.init(this.$refs[name]);
            this.chartInstance[name].setOption({
                ...this.getOptionsByName(name),
                series: this[`${name}SeriesData`],
                animation: false
            });
        },
        getOptionsByName(name) {
            let text = '';
            let yAxisName = '';
            // let data = this[`${name}SeriesData`];
            switch (name) {
            case 'usedCpu':
                text = 'CPU平均使用率';
                yAxisName = '(%)';
                break;
            case 'usedMem':
                text = '内存使用量';
                yAxisName = '(MB)';
                break;
            case 'usedGpu':
                text = 'GPU平均使用率';
                yAxisName = '(%)';
                break;
            case 'usedGpuMem':
                text = 'GPU-显存使用量';
                yAxisName = '(MB)';
            }
            return {
                ...CHART_DEFAULT_OPTION,
                title: {
                    ...CHART_DEFAULT_OPTION.title,
                    text: text
                },
                // legend: {
                //     data: data.map(item => item.name)
                // },
                xAxis: {
                    ...CHART_DEFAULT_OPTION.xAxis,
                    data: this.xAxisData
                },
                yAxis: {
                    ...CHART_DEFAULT_OPTION.yAxis,
                    name: yAxisName
                }
            };
        },
        handleWindowResize() {
            window.onresize = () => {
                this.resizeCharts();
            };
        },
        resizeCharts() {
            for (let inst in this.chartInstance) {
                if (this.chartInstance[inst]) {
                    this.chartInstance[inst].resize();
                }
            }
        }
    },
    created() {
        this.processData();
        this.handleWindowResize();
    }
};
</script>

<style>

</style>
