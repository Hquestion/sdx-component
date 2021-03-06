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
        '^@sdx/ui/(.*)': '<rootDir>/../ui/$1',
        '^@sdx/widget/(.*)': '<rootDir>/../widget/$1',
        '^@sdx/view/(.*)': '<rootDir>/../view/$1',
        '^@sdx/utils/(.*)': '<rootDir>/../utils/$1',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@sdx)']
};
