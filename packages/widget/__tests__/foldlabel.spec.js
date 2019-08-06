import FoldLabel from '../components/fold-label';
import { shallowMount, createLocalVue } from "@vue/test-utils";
import FoldLabelGroup from "../components/fold-label/src/FoldLabelGroup";

function createWrapper(opt = {}) {
    return shallowMount(FoldLabel.FoldLabel, {
        propsData: {
            label: 'test label',
            fold: opt.fold || false,
            type: opt.type || 'primary',
            ellipse: opt.ellipse || false,
            plain: opt.plain || false,
            index: 1,
            status: opt.status || 'loading'
        }
    })
}

describe('FoldLabel', () => {
    let wrapper;

    afterEach(() => {
        wrapper = null;
    });

    it('label渲染正确', () => {
        wrapper = createWrapper();
        expect(wrapper.find('.sdxw-fold-label__main').text()).toEqual('test label');
    });

    it('fold控制是否折叠', () => {
        wrapper = createWrapper({fold: false});
        expect(wrapper.classes('is-fold')).toBeFalsy();
        wrapper = createWrapper({fold: true});
        expect(wrapper.classes('is-fold')).toBeTruthy();
    });

    it('type', () => {
        wrapper = createWrapper({fold: false});
        expect(wrapper.classes('sdxw-fold-label--primary')).toBeTruthy();
    });

    it('ellipse', () => {
        wrapper = createWrapper({ellipse: false});
        expect(wrapper.classes('is-ellipse')).toBeFalsy();
        expect(wrapper.find('.sdxw-fold-label__main .sdx-icon-more').exists()).toBeFalsy();
        wrapper = createWrapper({ellipse: true});
        expect(wrapper.classes('is-ellipse')).toBeTruthy();
        expect(wrapper.find('.sdxw-fold-label__main .sdx-icon-more').exists()).toBeTruthy();
    });

    it('plain', () => {
        wrapper = createWrapper({plain: true});
        expect(wrapper.classes('is-plain')).toBeTruthy();
    });

    it('status', () => {
        wrapper = createWrapper({status: 'loading'});
        expect(wrapper.find('.sdxw-fold-label__loading-icon').exists()).toBeTruthy();
        wrapper = createWrapper({status: 'warning'});
        expect(wrapper.find('.sdxw-fold-label__warning-icon').exists()).toBeTruthy();
    });
});

function createGroupWrapper(opt = {}) {
    return shallowMount(FoldLabel.FoldLabelGroup, {
        propsData: {
            list: opt.list || ['testa', 'testb', 'testc', 'testd', 'teste'],
            mode: opt.mode || 'list',
            type: opt.type || 'primary',
            inlineMaxShow: opt.inlineMaxShow || 3
        },
        components: {
            SdxwFoldLabel: FoldLabel.FoldLabel
        },
        stubs: {
            'sdxw-fold-label': '<div class="fold-label-item"></div>'
        }
    })
}

describe('FoldLabelGroup', () => {
    let wrapper;

    it('list', () => {
        wrapper = createGroupWrapper();
        expect(wrapper.findAll('.fold-label-item').length).toEqual(5)
    });

    it('mode为inline是，会最多只展示inlineMaxShow个label', () => {
        wrapper = createGroupWrapper({
            mode: 'inline',
            inlineMaxShow: 3
        });
        expect(wrapper.classes('sdxw-fold-label-group--inline')).toBe(true);
        expect(wrapper.findAll('.fold-label-item').length).toEqual(3);
        wrapper = createGroupWrapper({
            mode: 'inline',
            inlineMaxShow: 3,
            list: ['test1', 'test2']
        });
        expect(wrapper.classes('sdxw-fold-label-group--inline')).toBe(true);
        expect(wrapper.findAll('.fold-label-item').length).toEqual(2);
    });
});
