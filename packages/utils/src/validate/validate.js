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