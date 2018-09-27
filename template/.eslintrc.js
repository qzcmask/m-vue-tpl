// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-list': 0, // end of line 空行 关闭规则
    'space-before-function-paren': 0, // function() {}
    "no-multiple-empty-lines": [1, {"max": 2}], // 空行不能超过两行
    "no-useless-escape": 0, // 关闭不需要的转义提醒
    "eol-last": 2, // 	代码间间隔出现一行
    "no-trailing-spaces": 0, // 语句后面允许有空格
    "no-unused-vars": 0, // 未使用的变量
    "object-curly-spacing": 0, // 大括号内是否允许不必要的空格
    'no-new': 0 // 0为禁止在使用new构造一个实例后不赋值，1为允许
  }
}
