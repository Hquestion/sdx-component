import locale from '../../src/mixins/locale';

describe('locale', () => {
    it('test t', () => {
        expect(locale.methods.t('ui.panel.noContent')).toBe('暂无内容')
        expect(locale.methods.t('widget.userInfo.title')).toBe('用户信息')
    })
})