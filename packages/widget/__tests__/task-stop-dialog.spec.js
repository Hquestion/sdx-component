import { mount, createWrapper } from '@vue/test-utils';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import SdxuButton from '@sdx/ui/lib/button';

// mock script标签
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxwTaskStopDialog = require('../components/task-stop-dialog').default;

describe('SdxwTaskStopDialog', () => {

    it('test execute promise resolve callback when click button confirm, ', done => {
        const mockFn = jest.fn();
        SdxwTaskStopDialog({
            visible: true
        }).then(data => {
            mockFn(data);
        })
        const wrapper = createWrapper(document.body.querySelector('.sdxu-dialog'));

        const wrapperArray = wrapper.findAll('.sdxu-button');
        wrapperArray.at(1).trigger('click');
        
        setTimeout(() => {
            expect(mockFn).toBeCalled();
            expect(mockFn).toBeCalledWith(false);
            done();
        }, 500);
    });

    it('test promise resolve when checked checkbox and click confirm button , ', done => {
        const mockFn = jest.fn();
        SdxwTaskStopDialog({
            visible: true
        }).then(data => {
            mockFn(data);
        })
        const wrapper = createWrapper(document.body.querySelector('.sdxu-dialog'));
        
        setTimeout(() => {
            wrapper.find('.sdxw-task-stop-dialog__checkbox input').setChecked();
            const wrapperArray = wrapper.findAll('.sdxu-button');
            wrapperArray.at(1).trigger('click');
            setTimeout(() => {
                expect(mockFn).toBeCalled();
                expect(mockFn).toBeCalledWith(true);
                done();
            }, 500);
        }, 500);
    });
})