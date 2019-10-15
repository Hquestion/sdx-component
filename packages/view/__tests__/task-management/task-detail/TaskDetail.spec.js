import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'jest-canvas-mock';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
import SdxuButton from '@sdx/ui/components/button';
import SdxvBaseInfoItem from '../../../components/task-management/src/task-detail/common/BaseInfoItem';
import SdxvMonitorInfo from '../../../components/task-management/src/task-detail/common/MonitorInfo';
import { t } from '@sdx/utils/src/locale';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const TaskDetail = require('../../../components/task-management/src/task-detail/TaskDetail').default;
const SdxvSaveAsDialog = require('../../../components/task-management/src/task-detail/common/SaveAsDialog').default;

describe('TaskDetail', () => {

    it('test mixin computed and method dealTime', () => {
        const wrapper = mount(TaskDetail, {
            localVue,
            propsData: {
                task: {
                    '_cls':'apis.v1.task.models.spark.SparkTask',
                    'args':'',
                    'createdAt':'2019-08-02T01:53:01.213000Z',
                    'description':'dddd',
                    'error':'',
                    'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                    'image':{
                        'name':'spark2.4.0_py2.7_cpu',
                    },
                    'mainClass':'org.apache.spark.examples.SparkPi ',
                    'name':'spark',
                    'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                    'owner':{
                        'fullName':'张霞'
                    },
                    'pods':[
                        {
                            'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                        }
                    ],
                    'project':{
                        'name':'new',
                        'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                    'resourceConfig':{
                        'SPARK_DRIVER_CPUS':12000,
                        'SPARK_DRIVER_MEMORY':25769803776,
                        'SPARK_EXECUTOR_CPUS':12000,
                        'SPARK_EXECUTOR_INSTANCES':1,
                        'SPARK_EXECUTOR_MEMORY':25769803776
                    },
                    'sourcePaths':['/test.py'],
                    'sparkParams':'',
                    'startedAt':'2019-08-02T07:57:50.370000Z',
                    'state':'FINISHED',
                    'stoppedAt':'2019-08-02T07:58:51.493000Z',
                    'type':'SPARK',
                    'updatedAt':'2019-08-02T08:08:20.874000Z',
                    'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b'
                }
            },
            stubs: {
                'el-select': true,
                'el-option': true,
                SdxvMonitorInfo: true
            }
        });

        expect(wrapper.vm.showSaveAsImage).toBeFalsy();
        expect(wrapper.vm.isSPARK).toBeTruthy();
        expect(wrapper.vm.isRunning).toBeFalsy();
        expect(wrapper.vm.stateIcon).toEqual('');
        expect(wrapper.vm.hasRealMonitor).toBeTruthy();
        expect(wrapper.vm.hasLog).toBeTruthy();
        expect(wrapper.vm.hasDataInfo).toBeFalsy();
        expect(wrapper.vm.isModelTask).toBeFalsy();
        expect(wrapper.vm.hasGpu).toBeFalsy();

        wrapper.setProps({
            task: {
                '_cls':'apis.v1.task.models.spark.SparkTask',
                'args':'',
                'createdAt':'2019-08-02T01:53:01.213000Z',
                'description':'dddd',
                'error':'',
                'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                'image':{
                    'name':'spark2.4.0_py2.7_cpu',
                },
                'mainClass':'org.apache.spark.examples.SparkPi ',
                'name':'spark',
                'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                'owner':{
                    'fullName':'张霞'
                },
                'pods':[
                    {
                        'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                    }
                ],
                'project':{
                    'name':'new',
                    'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                'resourceConfig':{
                    'SPARK_DRIVER_CPUS':12000,
                    'SPARK_DRIVER_MEMORY':25769803776,
                    'SPARK_EXECUTOR_CPUS':12000,
                    'SPARK_EXECUTOR_INSTANCES':1,
                    'SPARK_EXECUTOR_MEMORY':25769803776
                },
                'sourcePaths':['/test.py'],
                'sparkParams':'',
                'startedAt':'2019-08-02T07:57:50.370000Z',
                'state':'RUNNING',
                'stoppedAt':'2019-08-02T07:58:51.493000Z',
                'type':'JUPYTER',
                'updatedAt':'2019-08-02T08:08:20.874000Z',
                'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b',
                'datasources': [{

                }]
            }
        })

        expect(wrapper.vm.showSaveAsImage).toBeTruthy();
        expect(wrapper.vm.isSPARK).toBeFalsy();
        expect(wrapper.vm.isJUPYTER).toBeTruthy();
        expect(wrapper.vm.isRunning).toBeTruthy();
        expect(wrapper.vm.stateIcon).toEqual('loading');
        expect(wrapper.vm.hasRealMonitor).toBeTruthy();
        expect(wrapper.vm.hasLog).toBeTruthy();
        expect(wrapper.vm.hasDataInfo).toBeTruthy();
        expect(wrapper.vm.isModelTask).toBeFalsy();
        expect(wrapper.vm.hasGpu).toBeFalsy();

        expect(wrapper.vm.dealTime('2019/07/29 3:22:04', '2019/08/09 16:01:34')).toEqual(`11${t('sdxCommon.Days')}12${t('sdxCommon.Hours')}39${t('sdxCommon.Minutes')}30${t('sdxCommon.Seconds')}`);
    })

    it('test dom render', () => {
        const wrapper = mount(TaskDetail, {
            localVue,
            propsData: {
                task: {
                    '_cls':'apis.v1.task.models.spark.SparkTask',
                    'args':'',
                    'createdAt':'2019-08-02T01:53:01.213000Z',
                    'description':'dddd',
                    'error':'',
                    'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                    'image':{
                        'name':'spark2.4.0_py2.7_cpu',
                    },
                    'mainClass':'org.apache.spark.examples.SparkPi ',
                    'name':'spark',
                    'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                    'owner':{
                        'fullName':'张霞'
                    },
                    'pods':[
                        {
                            'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                        }
                    ],
                    'project':{
                        'name':'new',
                        'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                    'resourceConfig':{
                        'SPARK_DRIVER_CPUS':12000,
                        'SPARK_DRIVER_MEMORY':25769803776,
                        'SPARK_EXECUTOR_CPUS':12000,
                        'SPARK_EXECUTOR_INSTANCES':1,
                        'SPARK_EXECUTOR_MEMORY':25769803776
                    },
                    'sourcePaths':['/test.py'],
                    'sparkParams':'',
                    'startedAt':'2019-08-02T07:57:50.370000Z',
                    'state':'FINISHED',
                    'stoppedAt':'2019-08-02T07:58:51.493000Z',
                    'type':'SPARK',
                    'updatedAt':'2019-08-02T08:08:20.874000Z',
                    'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b'
                }
            },
            stubs: {
                'el-select': true,
                'el-option': true,
                SdxvMonitorInfo: true
            }
        });

        expect(wrapper.find(SdxvSaveAsDialog).exists()).toBeFalsy();
        expect(wrapper.findAll(SdxvBaseInfoItem).length).toEqual(16);

        wrapper.setProps({
            task: {
                '_cls':'apis.v1.task.models.spark.SparkTask',
                'args':'',
                'createdAt':'2019-08-02T01:53:01.213000Z',
                'description':'dddd',
                'error':'',
                'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                'image':{
                    'name':'spark2.4.0_py2.7_cpu',
                },
                'mainClass':'org.apache.spark.examples.SparkPi ',
                'name':'spark',
                'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                'owner':{
                    'fullName':'张霞'
                },
                'pods':[
                    {
                        'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                    }
                ],
                'project':{
                    'name':'new',
                    'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                'resourceConfig':{
                    'SPARK_DRIVER_CPUS':12000,
                    'SPARK_DRIVER_MEMORY':25769803776,
                    'SPARK_EXECUTOR_CPUS':12000,
                    'SPARK_EXECUTOR_INSTANCES':1,
                    'SPARK_EXECUTOR_MEMORY':25769803776
                },
                'sourcePaths':['/test.py'],
                'sparkParams':'',
                'startedAt':'2019-08-02T07:57:50.370000Z',
                'state':'RUNNING',
                'stoppedAt':'2019-08-02T07:58:51.493000Z',
                'type':'JUPYTER',
                'updatedAt':'2019-08-02T08:08:20.874000Z',
                'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b',
                'datasources': [{

                }]
            }
        });

        expect(wrapper.find(SdxvSaveAsDialog).exists()).toBeTruthy();
        expect(wrapper.findAll(SdxvBaseInfoItem).length).toEqual(13);
    })

    it('test click event', done => {
        const wrapper = mount(TaskDetail, {
            localVue,
            propsData: {
                task: {
                    '_cls':'apis.v1.task.models.spark.SparkTask',
                    'args':'',
                    'createdAt':'2019-08-02T01:53:01.213000Z',
                    'description':'dddd',
                    'error':'',
                    'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                    'image':{
                        'name':'spark2.4.0_py2.7_cpu',
                    },
                    'mainClass':'org.apache.spark.examples.SparkPi ',
                    'name':'spark',
                    'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                    'owner':{
                        'fullName':'张霞'
                    },
                    'pods':[
                        {
                            'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                        }
                    ],
                    'project':{
                        'name':'new',
                        'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                    'resourceConfig':{
                        'SPARK_DRIVER_CPUS':12000,
                        'SPARK_DRIVER_MEMORY':25769803776,
                        'SPARK_EXECUTOR_CPUS':12000,
                        'SPARK_EXECUTOR_INSTANCES':1,
                        'SPARK_EXECUTOR_MEMORY':25769803776
                    },
                    'sourcePaths':['/test.py'],
                    'sparkParams':'',
                    'startedAt':'2019-08-02T07:57:50.370000Z',
                    'state':'RUNNING',
                    'stoppedAt':'2019-08-02T07:58:51.493000Z',
                    'type':'JUPYTER',
                    'updatedAt':'2019-08-02T08:08:20.874000Z',
                    'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b'
                }
            },
            stubs: {
                'el-select': true,
                'el-option': true,
                SdxvMonitorInfo: true
            }
        });

        expect(wrapper.vm.dialogVisible).toBe(false);
        wrapper.find('.sdxu-content-panel__right').find(SdxuButton).trigger('click');
        expect(wrapper.vm.dialogVisible).toBe(true);

        const goJupyter = jest.fn();
        const goTerminal = jest.fn();
        wrapper.setMethods({
            goJupyter,
            goTerminal
        });

        const wrappperArray = wrapper.findAll('.sdxv-task-detail__external').wrappers;
        wrappperArray.forEach(wp => {
            wp.trigger('click');
        });

        expect(goJupyter).toBeCalled();
        expect(goJupyter).toHaveBeenCalledTimes(2);

        wrapper.setProps({
            task: {
                '_cls':'apis.v1.task.models.spark.SparkTask',
                    'args':'',
                    'createdAt':'2019-08-02T01:53:01.213000Z',
                    'description':'dddd',
                    'error':'',
                    'executionId':'1db08865-8fc0-4c6a-96cc-3a44fba97fc8',
                    'image':{
                        'name':'spark2.4.0_py2.7_cpu',
                    },
                    'mainClass':'org.apache.spark.examples.SparkPi ',
                    'name':'spark',
                    'nodeId':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261',
                    'owner':{
                        'fullName':'张霞'
                    },
                    'pods':[
                        {
                            'name':'spark-d1b7fda3-8ce4-4fae-848d-fe74b2e5d261-driver'
                        }
                    ],
                    'project':{
                        'name':'new',
                        'uuid':'10a9ffd7-6648-4849-9cb2-9c9aedf408c3'},
                    'resourceConfig':{
                        'SPARK_DRIVER_CPUS':12000,
                        'SPARK_DRIVER_MEMORY':25769803776,
                        'SPARK_EXECUTOR_CPUS':12000,
                        'SPARK_EXECUTOR_INSTANCES':1,
                        'SPARK_EXECUTOR_MEMORY':25769803776
                    },
                    'sourcePaths':['/test.py'],
                    'sparkParams':'',
                    'startedAt':'2019-08-02T07:57:50.370000Z',
                    'state':'RUNNING',
                    'stoppedAt':'2019-08-02T07:58:51.493000Z',
                    'type':'CONTAINERDEV',
                    'updatedAt':'2019-08-02T08:08:20.874000Z',
                    'uuid':'26f51dd5-c54b-4607-be49-3804f9b84e3b',
                    'externalUrl': 'test-url'
            }
        });

        setTimeout(() => {
            wrapper.find('.sdxv-task-detail__external').trigger('click');
            expect(goTerminal).toBeCalled();
            done();
        }, 300);
    })
})