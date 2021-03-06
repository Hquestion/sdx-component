module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        'plugin:vue/strongly-recommended',
        'eslint:recommended',
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "parser": 'babel-eslint'
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "semi": ["error", "always"],
        "vue/html-indent": ["error", 4],
        "no-unused-vars": 1,
        "quotes": ['error', 'single'],
        "indent": ["error", 4, {
            SwitchCase: 1
        }]
    }
};
