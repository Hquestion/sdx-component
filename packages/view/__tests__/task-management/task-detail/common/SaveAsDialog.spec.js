import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'jest-canvas-mock';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
import SdxuInput from '@sdx/ui/lib/input';
import ElFormItem from 'element-ui/lib/form-item';
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

const SdxvSaveAsDialog = require('../../../../components/task-management/src/task-detail/common/SaveAsDialog').default;

describe('SdxvSaveAsDialog', () => {

    it('test props', done => {
        const wrapper = mount(SdxvSaveAsDialog, {
            propsData: {
                visible: true,
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
            }
        });

        setTimeout(() => {
            expect(wrapper.find('.sdxv-saveas-dialog__name--prefix').text()).toEqual('spark2.4.0_py2.7_cpu_');
            expect(wrapper.findAll(ElFormItem).at(2).find('.el-form-item__content').text()).toEqual('SPARK');
            done();
        }, 300);
    })
})