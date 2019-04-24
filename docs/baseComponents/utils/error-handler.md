# error-handler 错误码处理
---

为错误码处理提供通用服务，应用中需按照指定格式提供错误码映射表。引用error-handler组件后，通过register函数注册错误码映射表。
如果需使用国际化服务，还需传入i18n实例（目前仅支持vue-i18n）

## Usage

<br>

```js

import errorHandler from '@sdx/utils/lib/error-handler';
import errorCodeMap from 'path/to/errorCodeMap';

// 注册errorCodeMap和i18n服务
errorHandler.register(errorCodeMap, i18n);

// 使用，如在ajax请求出错时调用。
// preventDefaultNotify用于阻止该方法封装的
// notification提示，在应用中处理，默认false
errorHandler(resp, preventDefaultNotify);
```

::: warning 抑制默认错误处理
有些场景需要抑制默认错误码的处理，可以在ajax请求中配置preventError: true来阻止默认处理
:::

::: tip 错误码映射表

错误码映射表（errorCodeMap）结构如下：

```js
// 按HTTP请求方法分类，POST/GET/DEL/PUT， 
// DEFAULT为各http method中的配置未命中时，从DEFAULT中匹配做降级处理
module.exports = {
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
                msg: 'server_internal_error'
            },
            // 需要一个httpCode和code都为空的配置，作为都未命中时的降级处理
            // 否则将会返回一个unknown的词条
            {
                httpCode: '',
                code: '',
                msg: 'server_internal_error'
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
                        code: '9999',
                        msg: 'server_internal_error'
                    }
                ]
            }
        }
    ]
};
```
:::

::: tip vue-i18n注入
i18n还可以通过其他方式注入：

```js

import locale from '@sdx/utils/lib/locale';
import { registerI18n } from '@sdx/utils/lib/locale';

locale.registerI18n(i18n);
registerI18n(i18n);
```
或者

```js
import sdxUI from '@sdx/ui';

vue.use(sdxUI, {i18n});
```

因为在ui/utils/widget/view中国际化处理共用了@sdx/utils/lib/locale处理，最终都会将i18n存储在@sdx/utils/lib/locale里
:::

## API

### methods

| 方法名 | 功能 | 参数 |  响应 |
| --- | --- | --- | --- |
| handler | 暴露的主函数，用于处理ajax请求的响应体 | response,http请求的响应 | {httpCode: '', code: '', msg: ''}，httpCode和code根据response解析得来，msg为根据错误码映射表匹配得到得内容 |
| handler.register | 接收错误码映射表和i18n服务 | （errorCode, [i18n]）,i18n为可选参数 | undefined |