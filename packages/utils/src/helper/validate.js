/**
 * 用户名,群租名通用检查规则,用于element-ui的form组件的rule参数 const reg = /^[a-zA-Z][a-zA-Z0-9_\-\\.]{3,19}$/i;
 */

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
        callback('请填写1到64位，英文字母，数字、空格、下划线、点、连字符组成的字符串');
    }
}

export function nickNameValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {underline: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写1到64位，汉字、英文字母、数字、@、空格、点、连字符组成的字符串');
    }
}

export function passwordValidator(rule, value, callback) {
    const reg = new ValidateReg({min:6, max:16}, {other: true}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写6到16位字符串');
    }
}

export function nameWithChineseValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {at: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写1到64位，汉字、英文字母、数字、空格、下划线、点、连字符组成的字符串');
    }
}

export function descValidator(rule, value, callback) {
    const reg = new ValidateReg({min:0, max:256}, {other: true}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写0到256位字符串');
    }
}

export function nameStartWithLowerCaseValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {upperCase: false, chinese: false, at: false, space: false}, 'lowerCase').generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写1到64位，小写字母开头，小写英文字母、数字、下划线、点、连字符组成的字符串');
    }
}

export function nameStartWithLetterValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:64}, {chinese: false, at: false}, 'letter').generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写1到64位，英文字母开头，英文字母、数字、空格、下划线、点、连字符组成的字符串');
    }
}

export function tagValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:10}, {chinese: true, at: false, space: false, underline: false, dash: false, dot: false}).generate();
    if (reg.test(value)) {
        callback();
    } else {
        callback('请填写1到10位，英文字母、数字、中文组成的字符串');
    }
}

export function tagArrayValidator(rule, value, callback) {
    const reg = new ValidateReg({min:1, max:10}, {chinese: true, at: false, space: false, underline: false, dash: false, dot: false}).generate();
    value.forEach(item => {
        if (!reg.test(item)) {
            callback('请填写1到10位，英文字母、数字、中文组成的字符串');
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
                '请填写4到20位，字母开头，数字、字母、下划线、点组成的字符串'
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
                '请填写1到24位，汉字、字母、数字、@、-、点、下划线组成的字符串',
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
                '请填写1-24位，小写字母开头，数字、小写字母、点与下划线组成的字符串'
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
                '请填写长度为1-64个字符，小写英文字母开头，允许小写英文字母、数字、"."、"_"或"-"'
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
                '请填写长度为1-64个字符，允许英文字母、数字、"."、"_"或"-"'
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
                '请填写1-100位，小写字母开头，数字、小写字母、点与下划线组成的字符串'
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
                '请填写1-10位，字母或数字开头，字母、数字与点组成的字符串'
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
