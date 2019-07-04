<template>
    <div 
        class="sdxv-monitor-info"
        v-loading="isLoading"
    >
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
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import { getPodResourceStatus } from '@sdx/utils/src/api/system';

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
            isLoading: false,
            statList: [],
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
                        'gpu': [],
                        'timeStamp': '1558597177',
                        'cpu': '0.23133983555554652',
                        'memory': '14.9453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597182',
                        'cpu': '0.23133983555554652',
                        'memory': '14.9453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597187',
                        'cpu': '0.23133983555554652',
                        'memory': '14.9453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597192',
                        'cpu': '0.21255005666835722',
                        'memory': '14.78515625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597197',
                        'cpu': '0.21255005666835722',
                        'memory': '14.78515625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597202',
                        'cpu': '0.21255005666835722',
                        'memory': '14.78515625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597207',
                        'cpu': '0.33613450666659145',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597212',
                        'cpu': '0.33613450666659145',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597217',
                        'cpu': '0.33613450666659145',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597222',
                        'cpu': '0.3075716022218936',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597227',
                        'cpu': '0.3075716022218936',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597232',
                        'cpu': '0.3075716022218936',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597237',
                        'cpu': '0.3152811066663869',
                        'memory': '14.89453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597242',
                        'cpu': '0.3152811066663869',
                        'memory': '14.89453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597247',
                        'cpu': '0.3152811066663869',
                        'memory': '14.89453125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597252',
                        'cpu': '0.27666932222220764',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597257',
                        'cpu': '0.27666932222220764',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597262',
                        'cpu': '0.27666932222220764',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597267',
                        'cpu': '0.2674002555563169',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597272',
                        'cpu': '0.2674002555563169',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597277',
                        'cpu': '0.2674002555563169',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597282',
                        'cpu': '0.2635557911111795',
                        'memory': '14.94921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597287',
                        'cpu': '0.2635557911111795',
                        'memory': '14.94921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597292',
                        'cpu': '0.2635557911111795',
                        'memory': '14.94921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597297',
                        'cpu': '0.30504602000089814',
                        'memory': '14.96875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597302',
                        'cpu': '0.30504602000089814',
                        'memory': '14.96875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597307',
                        'cpu': '0.30504602000089814',
                        'memory': '14.96875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597312',
                        'cpu': '0.28630407777705436',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597317',
                        'cpu': '0.28630407777705436',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597322',
                        'cpu': '0.28630407777705436',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597327',
                        'cpu': '0.25991236222277314',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597332',
                        'cpu': '0.25991236222277314',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597337',
                        'cpu': '0.25991236222277314',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597342',
                        'cpu': '0.22518612888840533',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597347',
                        'cpu': '0.22518612888840533',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597352',
                        'cpu': '0.22518612888840533',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597357',
                        'cpu': '0.2772900844451619',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597362',
                        'cpu': '0.2772900844451619',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597367',
                        'cpu': '0.2772900844451619',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597372',
                        'cpu': '0.30823069999920943',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597377',
                        'cpu': '0.30823069999920943',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597382',
                        'cpu': '0.30823069999920943',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597387',
                        'cpu': '0.28418234888906424',
                        'memory': '14.87890625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597392',
                        'cpu': '0.28418234888906424',
                        'memory': '14.87890625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597397',
                        'cpu': '0.28418234888906424',
                        'memory': '14.87890625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597402',
                        'cpu': '0.29181329111047993',
                        'memory': '14.90625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597407',
                        'cpu': '0.29181329111047993',
                        'memory': '14.90625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597412',
                        'cpu': '0.29181329111047993',
                        'memory': '14.90625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597417',
                        'cpu': '0.28960066666715845',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597422',
                        'cpu': '0.28960066666715845',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597427',
                        'cpu': '0.28960066666715845',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597432',
                        'cpu': '0.31729776888823835',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597437',
                        'cpu': '0.31729776888823835',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597442',
                        'cpu': '0.31729776888823835',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597447',
                        'cpu': '0.3116465777778406',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597452',
                        'cpu': '0.3116465777778406',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597457',
                        'cpu': '0.3116465777778406',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597462',
                        'cpu': '0.31671905777734033',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597467',
                        'cpu': '0.31671905777734033',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597472',
                        'cpu': '0.31671905777734033',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597477',
                        'cpu': '0.3175946533337992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597482',
                        'cpu': '0.3175946533337992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597487',
                        'cpu': '0.3175946533337992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597492',
                        'cpu': '0.1955641844445684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597497',
                        'cpu': '0.1955641844445684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597502',
                        'cpu': '0.1955641844445684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597507',
                        'cpu': '0.22336329111163244',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597512',
                        'cpu': '0.22336329111163244',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597517',
                        'cpu': '0.22336329111163244',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597522',
                        'cpu': '0.24648976222225527',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597527',
                        'cpu': '0.24648976222225527',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597532',
                        'cpu': '0.24648976222225527',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597537',
                        'cpu': '0.36883300000024766',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597542',
                        'cpu': '0.36883300000024766',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597547',
                        'cpu': '0.36883300000024766',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597552',
                        'cpu': '0.36574350444425363',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597557',
                        'cpu': '0.36574350444425363',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597562',
                        'cpu': '0.36574350444425363',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597567',
                        'cpu': '0.2463513022222388',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597572',
                        'cpu': '0.2463513022222388',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597577',
                        'cpu': '0.2463513022222388',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597582',
                        'cpu': '0.21754895333288005',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597587',
                        'cpu': '0.21754895333288005',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597592',
                        'cpu': '0.21754895333288005',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597597',
                        'cpu': '0.21172428888854075',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597602',
                        'cpu': '0.21172428888854075',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597607',
                        'cpu': '0.21172428888854075',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597612',
                        'cpu': '0.3104991755551762',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597617',
                        'cpu': '0.3104991755551762',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597622',
                        'cpu': '0.3104991755551762',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597627',
                        'cpu': '0.3695394799999323',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597632',
                        'cpu': '0.3695394799999323',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597637',
                        'cpu': '0.3695394799999323',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597642',
                        'cpu': '0.2513560800000252',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597647',
                        'cpu': '0.2513560800000252',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597652',
                        'cpu': '0.2513560800000252',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597657',
                        'cpu': '0.2734110533341057',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597662',
                        'cpu': '0.2734110533341057',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597667',
                        'cpu': '0.2734110533341057',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597672',
                        'cpu': '0.21130948888943143',
                        'memory': '14.84375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597677',
                        'cpu': '0.21130948888943143',
                        'memory': '14.84375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597682',
                        'cpu': '0.21130948888943143',
                        'memory': '14.84375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597687',
                        'cpu': '0.33343273111111355',
                        'memory': '14.91796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597692',
                        'cpu': '0.33343273111111355',
                        'memory': '14.91796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597697',
                        'cpu': '0.33343273111111355',
                        'memory': '14.91796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597702',
                        'cpu': '0.3101029511102145',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597707',
                        'cpu': '0.3101029511102145',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597712',
                        'cpu': '0.3101029511102145',
                        'memory': '15.01953125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597717',
                        'cpu': '0.33975843777726467',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597722',
                        'cpu': '0.33975843777726467',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597727',
                        'cpu': '0.33975843777726467',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597732',
                        'cpu': '0.3143385755558685',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597737',
                        'cpu': '0.3143385755558685',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597742',
                        'cpu': '0.3143385755558685',
                        'memory': '14.75'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597747',
                        'cpu': '0.2812687266668945',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597752',
                        'cpu': '0.2812687266668945',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597757',
                        'cpu': '0.2812687266668945',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597762',
                        'cpu': '0.24503137111120546',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597767',
                        'cpu': '0.24503137111120546',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597772',
                        'cpu': '0.24503137111120546',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597777',
                        'cpu': '0.24201484444448498',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597782',
                        'cpu': '0.24201484444448498',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597787',
                        'cpu': '0.24201484444448498',
                        'memory': '14.72265625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597792',
                        'cpu': '0.2727865422224972',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597797',
                        'cpu': '0.2727865422224972',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597802',
                        'cpu': '0.2727865422224972',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597807',
                        'cpu': '0.27711559777748734',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597812',
                        'cpu': '0.27711559777748734',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597817',
                        'cpu': '0.27711559777748734',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597822',
                        'cpu': '0.2812807755556908',
                        'memory': '14.75390625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597827',
                        'cpu': '0.2812807755556908',
                        'memory': '14.75390625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597832',
                        'cpu': '0.2812807755556908',
                        'memory': '14.75390625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597837',
                        'cpu': '0.2470094622225992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597842',
                        'cpu': '0.2470094622225992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597847',
                        'cpu': '0.2470094622225992',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597852',
                        'cpu': '0.28760776888904926',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597857',
                        'cpu': '0.28760776888904926',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597862',
                        'cpu': '0.28760776888904926',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597867',
                        'cpu': '0.25269809777758684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597872',
                        'cpu': '0.25269809777758684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597877',
                        'cpu': '0.25269809777758684',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597882',
                        'cpu': '0.3139225888884943',
                        'memory': '15.05078125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597887',
                        'cpu': '0.3139225888884943',
                        'memory': '15.05078125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597892',
                        'cpu': '0.3139225888884943',
                        'memory': '15.05078125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597897',
                        'cpu': '0.25069721111119886',
                        'memory': '14.796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597902',
                        'cpu': '0.25069721111119886',
                        'memory': '14.796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597907',
                        'cpu': '0.25069721111119886',
                        'memory': '14.796875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597912',
                        'cpu': '0.27856362666676027',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597917',
                        'cpu': '0.27856362666676027',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597922',
                        'cpu': '0.27856362666676027',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597927',
                        'cpu': '0.31557562222183655',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597932',
                        'cpu': '0.31557562222183655',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597937',
                        'cpu': '0.31557562222183655',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597942',
                        'cpu': '0.31534026666728704',
                        'memory': '14.82421875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597947',
                        'cpu': '0.31534026666728704',
                        'memory': '14.82421875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597952',
                        'cpu': '0.31534026666728704',
                        'memory': '14.82421875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597957',
                        'cpu': '0.34315920888831086',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597962',
                        'cpu': '0.34315920888831086',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597967',
                        'cpu': '0.34315920888831086',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597972',
                        'cpu': '0.1839921066665637',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597977',
                        'cpu': '0.1839921066665637',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597982',
                        'cpu': '0.1839921066665637',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597987',
                        'cpu': '0.2239192822222928',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597992',
                        'cpu': '0.2239192822222928',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558597997',
                        'cpu': '0.2239192822222928',
                        'memory': '14.7734375'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598002',
                        'cpu': '0.23071602444461958',
                        'memory': '15.21875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598007',
                        'cpu': '0.23071602444461958',
                        'memory': '15.21875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598012',
                        'cpu': '0.23071602444461958',
                        'memory': '15.21875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598017',
                        'cpu': '0.329033455555974',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598022',
                        'cpu': '0.329033455555974',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598027',
                        'cpu': '0.329033455555974',
                        'memory': '14.67578125'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598032',
                        'cpu': '0.3134980333329117',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598037',
                        'cpu': '0.3134980333329117',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598042',
                        'cpu': '0.3134980333329117',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598047',
                        'cpu': '0.2825954755553539',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598052',
                        'cpu': '0.2825954755553539',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598057',
                        'cpu': '0.2825954755553539',
                        'memory': '14.69921875'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598062',
                        'cpu': '0.2761733622224306',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598067',
                        'cpu': '0.2761733622224306',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598072',
                        'cpu': '0.2761733622224306',
                        'memory': '14.84765625'
                    },
                    {
                        'gpu': [],
                        'timeStamp': '1558598077',
                        'cpu': '0.28401196888909097',
                        'memory': '14.75'
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
            const params = {

            };
            this.isLoading = true;
            getPodResourceStatus(this.currentPod, params).then(data => {
                this.statList = data.stats;
                this.isLoading = false;
            }).catch(() => {
                this.statList = [];
                this.isLoading = false;
            });
        },
        /** 将获取的数据处理成 chart 需要的形式 */
        processData() {
            // todo: 1. 判断是否存在gpu 2. 先测试，使用率改成数字 3. 替换chartData
            this.hasGpu = +this.chartData.allocatedGpu > 0;

            this.xAxisData = this.statList.map(item => dateFormatter(new Date(+item.timestamp * 1000)));
            // 整理 cpu 使用
            this.usedCpuSeriesData = [
                {
                    name: 'cpu使用率',
                    type: 'line',
                    itemStyle: {
                        color: '#4781F8',
                        borderWidth: 2
                    },
                    data: this.statList.map(item =>
                        item.cpu
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
                    data: this.statList.map(item =>
                        parseInt(item.memory)
                    )
                }
            ];
            // todo:
            // 如果有 gpu 整理 cpu 相关数据
            if (this.hasGpu) {
                // gpu 使用率
                this.usedGpuSeriesData = this.statList.map(
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
            this.renderChartByName('cpu');
            this.renderChartByName('memory');
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
            case 'cpu':
                text = 'CPU平均使用率';
                yAxisName = '(%)';
                break;
            case 'memory':
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
