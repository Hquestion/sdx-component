import {setLang, getLang, t, getI18n, registerI18n} from '../../src/locale/index';

describe('locale', () => {
    let i18n = 'i18n-test';
    it('test setLang', () => {
        let lang = 'English'
        let langMsg = setLang(lang)
        expect(langMsg).toBe('English')
        lang = 'zh-CN'
        langMsg = setLang(lang)
        expect(langMsg).toBe('zh-CN')
    })

    it('test getLang', () => {
        let langMsg = getLang()
        expect(langMsg).toBe('zh-CN')
    })

    it('test t', () => {
        expect(t('ui.panel.noContent')).toBe('暂无内容')
        expect(t('widget.userInfo.title')).toBe('用户信息')
    })

    it('test registerI18n getI18n', () => {
        let i18nInstance = i18n
        registerI18n(i18nInstance)
        expect(i18n).toBe('i18n-test')
        expect(getI18n()).toBe('i18n-test')
    })
})