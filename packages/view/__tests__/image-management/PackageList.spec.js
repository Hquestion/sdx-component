import { shallowMount } from '@vue/test-utils';
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const PackageList = require('../../components/image-management/src/PackageList');

// describe('PackageList', () => {
    let wrapper;
    // afterEach(() => {
    //     wrapper.destroy();
    // });
    // it('create', () => {
    //     wrapper = shallowMount(PackageList, {
    //         propsData: {
    //             imageId: '300277f0-349c-4932-bae3-5f8278b9afef'
    //         }
    //     });
    //     expect(wrapper.contains('.sdxv-package-list')).toBeTruthy();
    // });
    //
    // it('props', () => {
    //     wrapper = shallowMount(PackageList, {
    //         propsData: {
    //             imageId: '300277f0-349c-4932-bae3-5f8278b9afef',
    //             search: 'abcdefg',
    //             operatable: false
    //         }
    //     });
    //     expect(wrapper.props().imageId).toEqual('300277f0-349c-4932-bae3-5f8278b9afef');
    //     expect(wrapper.props().search).toEqual('abcdefg');
    //     expect(wrapper.props().operatable).toEqual(false);
    // });

    // it('handleUpgrade', () => {
    //     wrapper = shallowMount(PackageList, {
    //         propsData: {
    //             imageId: '300277f0-349c-4932-bae3-5f8278b9afef'
    //         }
    //     });
    //     const mockFn = jest.fn();
    //     wrapper.setMethods({
    //         handleUpgrade: mockFn
    //     });
    //     wrapper.setData({
    //         'packageList': [{
    //             uuid: '300277f0-349c-4932-bae3-5f8278b9afef',
    //             'name': 'absl-py',
    //             'sourceType': 'PIP',
    //             'version': '0.6.1'
    //         }]
    //     });
    //     wrapper.find('.sdx-shengji').trigger('click');
    //     expect(mockFn).toBeCalled();
    // });
// });
