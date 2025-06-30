module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // Code quality
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    
    // Best practices
    'eqeqeq': 'error',
    'curly': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Stylistic
    'indent': ['error', 4],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    
    // ES6+
    'prefer-const': 'error',
    'no-var': 'error',
    'arrow-spacing': 'error',
    'template-curly-spacing': 'error',
    
    // Accessibility
    'jsx-a11y/alt-text': 'off', // Not using JSX
    'jsx-a11y/anchor-has-content': 'off', // Not using JSX
    
    // Performance
    'no-loop-func': 'error',
    'no-new-object': 'error',
    
    // Security
    'no-implied-eval': 'error',
    'no-new-func': 'error'
  },
  globals: {
    // Jest globals
    'describe': 'readonly',
    'test': 'readonly',
    'it': 'readonly',
    'expect': 'readonly',
    'beforeEach': 'readonly',
    'afterEach': 'readonly',
    'beforeAll': 'readonly',
    'afterAll': 'readonly',
    'jest': 'readonly'
  }
}; 