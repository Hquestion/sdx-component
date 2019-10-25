import handler from '../../src/error-handler/index';
import { createWrapper } from '@vue/test-utils';
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
describe('error-handler', () => {
    it('test handler', () => {
    let errorCodeMap = {
        // default 为默认处理，必须，
        // 在无法命中请求中的错误码时，将从默认处理中匹配以降级处理
        default: {
            POST: {
                httpCode: '401', // httpCode: http请求的状态码
                code: '', // 接口返回的错误码
                // 要展示的错误信息，如需国际化这里可配置国际化词条的关键字
                msg: 'server_internal_error'
            },
            DEFAULT: [
                {
                    httpCode: '401',
                    code: '',
                    msg: 'errinfo'
                },
                // 需要一个httpCode和code都为空的配置，作为都未命中时的降级处理
                // 否则将会返回一个unknown的词条
                {
                    httpCode: '',
                    code: '',
                    msg: 'errinfo'
                }
            ]
        },
        req: [
            {
                reg: /\/login/, // 接口地址的正则表达式描述
                messages: {
                    POST: [
                        {
                            httpCode: '',
                            code: '9999',
                            msg: 'server_internal_error'
                        }
                    ],
                    GET: [
                        {
                            httpCode: '',
                            code: '110',
                            msg: 'errinfo'
                        }
                    ]
                }
            }
        ]
    };
    let specialCodeHandler = {}; 
    handler.register(errorCodeMap, specialCodeHandler);
    let resp = {
        status: 401,
        data: {
            code: '110',
            msg: 'errinfo'
        },
        config: {
            url: '',
            method: 'GET'
        }
    }
    handler(resp);
        const wrapper = createWrapper(document.body.querySelector('.el-notification'));
        expect(wrapper.find('.el-notification__title').text()).toBe('错误码: 110')
        expect(wrapper.find('.el-notification__content').text()).toBe('errinfo')
    });
})