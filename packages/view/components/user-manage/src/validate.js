/**
 * 用户名,群租名通用检查规则,用于element-ui的form组件的rule参数 const reg = /^[a-zA-Z][a-zA-Z0-9_\-\\.]{3,19}$/i;
 */

// /^[a-zA-Z][a-zA-Z0-9_\-\\.]{0,63}$/i 请填写4到20位,字母开头,数字、字母、下划线、点组成的字符串
// /^[a-zA-Z\d\\.\\_\\-]{1,64}$/
export function nameValidate(rule, value, callback) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_.-]{0,63}$/i;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '长度为1-64个字符，允许输入小写英文字母、数字、“.”、“_”或“-”'
            )
        );
    }
}

