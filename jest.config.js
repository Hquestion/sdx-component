module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@sdx/ui/(.*)': '<rootDir>/packages/ui/$1',
        '^@sdx/widget/(.*)': '<rootDir>/packages/widget/$1',
        '^@sdx/view/(.*)': '<rootDir>/packages/view/$1',
        '^@sdx/utils/(.*)': '<rootDir>/packages/utils/$1',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@sdx|vue-codemirror-lite))', '<rootDir>/packages/utils/src/theme-common/iconfont/iconfont.js']
};
