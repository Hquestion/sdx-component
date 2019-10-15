import { mount, createWrapper } from '@vue/test-utils';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import ElRadio from 'element-ui/lib/radio';
import SdxuButton from '@sdx/ui/lib/button';

// mock script标签
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxwTaskStartDialog = require('../components/task-start-dialog').default;

describe('SdxwTaskStartDialog', () => {

    it('test props', done => {
        SdxwTaskStartDialog({
            visible: true,
            image: {
                name: 'image-name'
            },
            autoImage: {
                updatedAt: '2019/08/02'
            }
        });
        const wrapper = createWrapper(document.body.querySelector('.sdxu-dialog'));
        
        setTimeout(() => {
            const wrapperArray = wrapper.findAll('.el-radio');
            expect(wrapperArray.length).toBe(2);
            done();
        }, 500);
    });

    it('test execute promise resolve callback when click button confirm, ', done => {
        const mockFn = jest.fn();
        SdxwTaskStartDialog({
            visible: true,
            image: {
                name: 'image-name'
            },
            autoImage: {
                updatedAt: '2019/08/02'
            }
        }).then(data => {
            mockFn(data);
        })
        const wrapper = createWrapper(document.body.querySelector('.sdxu-dialog'));

        const wrapperArray = wrapper.findAll('.sdxu-button');
        wrapperArray.at(1).trigger('click');
        
        setTimeout(() => {
            expect(mockFn).toBeCalled();
            expect(mockFn).toBeCalledWith('confirm');
            done();
        }, 500);
    })
})