/**
 * 用户名,群租名通用检查规则,用于element-ui的form组件的rule参数 const reg = /^[a-zA-Z][a-zA-Z0-9_\-\\.]{3,19}$/i;
 */

// /^[a-zA-Z][a-zA-Z0-9_\-\\.]{0,63}$/i 请填写4到20位,字母开头,数字、字母、下划线、点组成的字符串
// /^[a-zA-Z\d\\.\\_\\-]{1,64}$/
export function nameValidate(rule, value, callback) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_.]{3,19}$/i;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请填写4到20位,字母开头,数字、字母、下划线、点组成的字符串'
            )
        );
    }
}

export function cNameValidate(rule, value, callback) {
    const reg = /^[a-zA-Z0-9\u4e00-\u9fa5.@\-_]{1,24}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请填写1到24位,汉字、字母、数字、@、-、点、下划线组成的字符串'
            )
        );
    }
}

/**
 * 名称校验,长度限制24
 */
export function itemNameValidate(rule, value, callback) {
    const reg = /^[a-z][a-z0-9_.]{0,23}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请填写1-24位,小写字母开头,数字、小写字母、点与下划线组成的字符串'
            )
        );
    }
}

/**
 * 名称校验,长度限制100
 */
export function itemNameValidate100(rule, value, callback) {
    const reg = /^[a-z][a-z0-9_.]{0,99}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请填写1-100位,小写字母开头,数字、小写字母、点与下划线组成的字符串'
            )
        );
    }
}

/**
 * tag名称校验
 */
export function tagNameValidate(rule, value, callback) {
    const reg = /^[a-zA-Z0-9][a-zA-Z0-9.]{0,9}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请填写1-10位,字母或数字开头,字母、数字与点组成的字符串'
            )
        );
    }
}

/**
 * 正整数
 */
export function testNumber(rule, value, callback) {
    const reg = /^[1-9]\d*$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                '请输入正整数'
            )
        );
    }
}
