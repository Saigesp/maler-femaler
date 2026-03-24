import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const ignores = [
  'dist/**',
  'node_modules/**',
  'public/**',
  'src/assets/**',
];

export default [
  ...pluginVue.configs['flat/recommended'].map((obj) => ({ ...obj, ignores })),
  {
    files: ['**/*.{js,vue}'],
    ignores,
    rules: {
      // POSIBLE ERRORS
      'no-use-before-define': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-self-compare': 'error',
      'prefer-promise-reject-errors': 'error',
      // BEST PRACTICES
      'prefer-arrow-callback': 'warn',
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      }],
      'no-unreachable': 'warn',
      'class-methods-use-this': 'warn',
      'no-extra-bind': 'warn',
      'no-mixed-operators': 'warn',
      'prefer-template': 'warn',
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
      'no-constant-condition': 'warn',
      'no-nested-ternary': 'warn',
      // STYLE
      quotes: ['warn', 'single', {
        avoidEscape: true,
      }],
      'quote-props': ['warn', 'as-needed'],
      semi: ['error', 'always'],
      'max-len': ['warn', {
        code: 100,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],
      camelcase: ['warn', {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true,
      }],
      'operator-linebreak': ['warn', 'after', {
        overrides: { '?': 'before', ':': 'before' },
      }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      'prefer-destructuring': ['warn', {
        array: false,
        object: true,
      }],
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': 'warn',
      'object-curly-spacing': ['warn', 'always', {
        arraysInObjects: true,
        objectsInObjects: true,
      }],
      'spaced-comment': 'warn',
      'space-in-parens': 'warn',
      'eol-last': 'warn',
      indent: ['warn', 2, {
        SwitchCase: 1,
      }],
      'space-infix-ops': 'warn',
      'padded-blocks': ['warn', 'never'],
      'space-before-blocks': 'warn',
      'arrow-spacing': 'warn',
      'no-multi-spaces': ['warn'],
      'no-empty': 'warn',
      'lines-between-class-members': 'warn',
      'space-before-function-paren': ['warn', {
        named: 'never',
        anonymous: 'always',
      }],
      'key-spacing': 'warn',
      'no-useless-escape': 'warn',
      'no-useless-return': 'warn',
      'block-spacing': 'warn',
      'comma-spacing': ['warn', {
        before: false,
        after: true,
      }],
      // VUE
      'vue/no-required-prop-with-default': 'off',
      'vue/html-closing-bracket-spacing': ['warn', {
        selfClosingTag: 'never',
      }],
      'vue/html-closing-bracket-newline': ['warn', {
        singleline: 'never',
        multiline: 'never',
        selfClosingTag: {
          singleline: 'never',
          multiline: 'always',
        },
      }],
      'vue/multiline-html-element-content-newline': ['warn', {
        ignoreWhenEmpty: true,
        allowEmptyLines: true,
      }],
      'vue/max-attributes-per-line': ['warn', {
        singleline: 5,
        multiline: 1,
      }],
      'vue/mustache-interpolation-spacing': ['warn', 'never'],
      'vue/no-unused-components': 'warn',
      'vue/html-indent': ['warn', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      'vue/html-end-tags': 'warn',
      'vue/html-self-closing': 'warn',
      'vue/mustache-interpolation-spacing': ['warn', 'never'],
      'vue/no-multi-spaces': 'warn',
      'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
      'vue/require-default-prop': 'error',
      'vue/require-prop-types': 'error',
      'vue/this-in-template': 'error',
      'vue/match-component-file-name': 'error',
      'vue/no-empty-component-block': 'warn',
      'vue/no-static-inline-styles': 'warn',
      'vue/no-template-target-blank': 'error',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-v-text': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-unused-refs': 'warn',
      'vue/no-useless-mustaches': 'warn',
      'vue/prefer-template': 'warn',
      'vue/no-v-html': 'error',
      'vue/block-tag-newline': 'warn',
      'vue/multi-word-component-names': ['warn', {
        ignores: ['Tag', 'Alert', 'Notification', 'Navbar'],
      }],
      'vue/component-api-style': [
        'error',
        ['script-setup', 'composition'],
      ],
      'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
        registeredComponentsOnly: true,
      }],
      'vue/custom-event-name-casing': ['warn', 'kebab-case'],
      'vue/padding-line-between-blocks': ['warn', 'always'],
      'vue/max-lines-per-block': ['warn', {
        script: 300,
        template: 200,
        style: 200,
        skipBlankLines: true,
      }],
      'vue/attributes-order': ['warn', {
        order: [
          'DEFINITION',
          'CONDITIONALS',
          'LIST_RENDERING',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'SLOT',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      }],
      'vue/block-order': ['error', {
        order: [
          'template',
          'script',
          'style',
          'docs',
        ],
      }],
      'vue/order-in-components': ['error', {
        order: [
          'name',
          'el',
          'key',
          'parent',
          'extends',
          'mixins',
          'directives',
          'components',
          'emits',
          'data',
          'props',
          'propsData',
          'computed',
          'methods',
          'watch',
        ],
      }],
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
];
