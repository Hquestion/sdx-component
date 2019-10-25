/**
 * 用户名,群租名通用检查规则,用于element-ui的form组件的rule参数 const reg = /^[a-zA-Z][a-zA-Z0-9_\-\\.]{3,19}$/i;
 */
import { t } from '../locale';

export function ValidateReg (limit, character, start) {
    this.limit = {
        min: 1,
        max: 10
    };
    this.character = {
        upperCase: true,
        lowerCase: true,
        number: true,
        chinese: true,
        space: true,
        underline: true,
        dot: true,
        dash: true,
        at: true,
        other: false
    };

    this.start = undefined;

    limit && Object.assign(this.limit, limit );
    character && Object.assign(this.character, character);
    this.start = start;
}

ValidateReg.characterMap = {
    lowerCase: 'a-z',
    upperCase: 'A-Z',
    letter: 'a-zA-Z',
    number: '0-9',
    chinese: '\\u4e00-\\u9fa5',
    space: '\\s',
    underline: '_',
    dot: '\\.',
    dash: '\\-',
    at: '@',
    other: '.'
};

ValidateReg.appendMatchedRegStr = function appendMatchedRegStr(key, str) {
    return str + ValidateReg.characterMap[key];
};

ValidateReg.prototype.generate = function() {
    let regStr = '';
    if (this.start) {
        regStr += `[${ValidateReg.characterMap[this.start]}]`;
    }
    // if can match any character
    if (this.character.other) {
        regStr = `${ValidateReg.characterMap['other']}`;
    } else {
        let matchedKeys = Object.keys(this.character).filter(key => this.character[key]);

        matchedKeys.forEach((key, index) => {
            if (index === 0) {
                regStr += '[';
                regStr = ValidateReg.appendMatchedRegStr(key, regStr);
            } else if (index === matchedKeys.length - 1) {
                regStr = ValidateReg.appendMatchedRegStr(key, regStr);
                regStr += ']';
            } else {
                regStr = ValidateReg.appendMatchedRegStr(key, regStr);
            }
        });
    }
    let {min, max} = this.limit;

    min = this.start ? min - 1 : min;
    min = min <= 0 ? 0 : min;

    max = this.start ? max - 1 : max;
    max = max <= 0 ? 0 : max;
    regStr += `{${min},${max}}`;
    return eval(`/^${regStr}$${this.limit.min === 0 ? '|^$' : ''}/`);
};

// export class ValidateReg {
//     limit = {
//         min: 1,
//         max: 10
//     };
//
//     character = {
//         upperCase: true,
//         lowerCase: true,
//         number: true,
//         chinese: true,
//         space: true,
//         underline: true,
//         dot: true,
//         dash: true,
//         at: true,
//         other: false
//     };
//
//     start = undefined;
//
//     static characterMap = {
//         lowerCase: 'a-z',
//         upperCase: 'A-Z',
//         letter: 'a-zA-Z',
//         number: '1-9',
//         chinese: '\\u4e00-\\u9fa5',
//         space: '\\s',
//         underline: '_',
//         dot: '\\.',
//         dash: '\\-',
//         at: '@',
//         other: '.'
//     };
//
//     constructor(limit, character, start) {
//         limit && Object.assign(this.limit, limit );
//         character && Object.assign(this.character, character);
//         this.start = start;
//     }
//
//     generate() {
//         let regStr = '';
//         if (this.start) {
//             regStr += `[${ValidateReg.characterMap[this.start]}]`;
//         }
//         // if can match any character
//         if (this.character.other) {
//             regStr = `${ValidateReg.characterMap['other']}`;
//         } else {
//             let matchedKeys = Object.keys(this.character).filter(key => this.character[key]);
//
//             matchedKeys.forEach((key, index) => {
//                 if (index === 0) {
//                     regStr += '[';
//                     regStr = ValidateReg.appendMatchedRegStr(key, regStr);
//                 } else if (index === matchedKeys.length - 1) {
//                     regStr = ValidateReg.appendMatchedRegStr(key, regStr);
//                     regStr += ']';
//                 } else {
//                     regStr = ValidateReg.appendMatchedRegStr(key, regStr);
//                 }
//             });
//         }
//         let {min, max} = this.limit;
//
//         min = this.start ? min - 1 : min;
//         min = min <= 0 ? 0 : min;
//
//         max = this.start ? max - 1 : max;
//         max = max <= 0 ? 0 : max;
//         regStr += `{${min},${max}}`;
//         return eval(`/^${regStr}$${this.limit.min === 0 ? '|^$' : ''}/`);
//     }
//
//     static appendMatchedRegStr(key, str) {
//         return str + ValidateReg.characterMap[key];
//     }
// }

export function commonNameValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {at: false, chinese: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.commonNameValidator'));
    }
}

export function nickNameValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {underline: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.nickNameValidator'));
    }
}

export function passwordValidator(rule, value, callback) {
    const reg = new ValidateReg({min:6, max:16}, {other: true, chinese: false, space: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.passwordValidator'));
    }
}

export function nameWithChineseValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {at: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.nameWithChineseValidator'));
    }
}

export function descValidator(rule, value, callback) {
    const reg = new ValidateReg({min:0, max:256}, {other: true}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.descValidator'));
    }
}

export function nameStartWithLowerCaseValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {upperCase: false, chinese: false, at: false, space: false}, 'lowerCase').generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.nameStartWithLowerCaseValidator'));
    }
}

export function nameStartWithLetterValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {chinese: false, at: false}, 'letter').generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.nameStartWithLetterValidator'));
    }
}

export function tagValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:10}, {chinese: true, at: false, space: false, underline: false, dash: false, dot: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback(t('utils.validator.tagValidator'));
    }
}

export function tagArrayValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:10}, {chinese: true, at: false, space: false, underline: false, dash: false, dot: false}).generate();
    value.forEach(item => {
        if (!reg.test(item)) {
            callback(t('utils.validator.tagArrayValidator'));
        }
    });
    callback();
}

// ------------------------------------------------------------------------------------

// /^[a-zA-Z][a-zA-Z0-9_\-\\.]{0,63}$/i 请填写4到20位,字母开头,数字、字母、下划线、点组成的字符串
// /^[a-zA-Z\d\\.\\_\\-]{1,64}$/
export function nameValidate(rule, value, callback) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_.]{3,19}$/i;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                t('utils.validator.nameValidate')
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
                t('utils.validator.cNameValidate')
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
                t('utils.validator.itemNameValidate')
            )
        );
    }
}
/**
 * 镜像名称
 */
export function imageNameValidate(rule, value, callback) {
    const reg = /^[a-z][a-z0-9_.-]{0,63}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                t('utils.validator.imageNameValidate')
            )
        );
    }
}
/**
 * 镜像版本号
 */
export function imageVersionValidate(rule, value, callback) {
    const reg = /^[A-Za-z0-9_.-]{0,63}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                t('utils.validator.imageVersionValidate')
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
                t('utils.validator.itemNameValidate100')
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
                t('utils.validator.tagNameValidate')
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
                t('utils.validator.testNumber')
            )
        );
    }
}
