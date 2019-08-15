import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const ProjectList = require('../../components/project-management/src/ProjectList.vue').default;

describe('SkyflowList', () => {
    it('test render works', (done) => {
        var wrapper = mount(ProjectList, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-project', 'SdxuEmpty', 'SdxuScroll']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-project-management')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-project-management__tool--right');
            expect(wrapper.html()).toContain('项目列表');
            expect(wrapper.html()).toContain('自建项目');
            expect(wrapper.html()).toContain('新建项目');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ProjectList, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-project', 'SdxuEmpty', 'SdxuScroll']
        });
        setTimeout(() => {
            expect(wrapper.vm.total).toEqual(2);
                wrapper.destroy();
                done();
        }, 100);
    });
});
