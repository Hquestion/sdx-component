import { shallowMount } from '@vue/test-utils';
import 'babel-polyfill';
import SdxvUserResourceList from '../../components/resource-statistics/src/UserResourceList';
import SdxvPlatformResource from '../../components/resource-statistics/src/PlatformResource';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvResourceStatisticsIndex = require('../../components/resource-statistics/src/ResourceStatistics').default;
const SdxvTaskResourceRanking = require('../../components/resource-statistics/src/TaskResourceRanking').default;

describe('SdxvResourceStatisticsIndex', () => {

    it('dom render', () => {
        const wrapper = shallowMount(SdxvResourceStatisticsIndex);

        expect(wrapper.findAll('.sdxv-resource-statistics__item').length).toEqual(3);
        expect(wrapper.find(SdxvUserResourceList).exists()).toBeTruthy();
        expect(wrapper.find(SdxvPlatformResource).exists()).toBeTruthy();
        expect(wrapper.find(SdxvTaskResourceRanking).exists()).toBeTruthy();
    })
})