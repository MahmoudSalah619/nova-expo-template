const path = require('path');

module.exports = function (plop) {
  // Helper to capitalize first letter
  plop.setHelper('capitalize', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  // Helper to convert to camelCase
  plop.setHelper('camelCase', function (text) {
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  });

  // Helper to convert to PascalCase
  plop.setHelper('pascalCase', function (text) {
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase();
    }).replace(/\s+/g, '');
  });

  // Helper to convert to kebab-case
  plop.setHelper('kebabCase', function (text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  });

  plop.setGenerator('create', {
    description: 'Generate components, screens, hooks, or utilities',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the generation?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Name is required';
        }
      },
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to create?',
        choices: ['component', 'screen', 'hook', 'util', 'svg']
      },
      // Component type selection
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of component?',
        choices: ['atoms', 'molecules', 'organisms', 'templates', 'wrappers'],
        when: function (answers) {
          return answers.type === 'component';
        }
      },
      // Molecules and organisms scope selection
      {
        type: 'list',
        name: 'componentScope',
        message: 'Is this component common or scoped?',
        choices: ['common', 'scoped'],
        when: function (answers) {
          return answers.type === 'component' && (answers.componentType === 'molecules' || answers.componentType === 'organisms');
        }
      },
      // Screen type selection
      {
        type: 'list',
        name: 'screenType',
        message: 'What type of screen?',
        choices: ['auth', 'main'],
        when: function (answers) {
          return answers.type === 'screen';
        }
      }
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === 'component') {
        let componentPath = 'components/{{componentType}}';
        
        // Handle scoped components
        if (data.componentScope) {
          componentPath += '/{{componentScope}}';
        }
        
        componentPath += '/{{pascalCase name}}';

        actions.push({
          type: 'add',
          path: `${componentPath}/index.tsx`,
          templateFile: 'plop-templates/component/index.tsx.hbs'
        });

        actions.push({
          type: 'add',
          path: `${componentPath}/styles.ts`,
          templateFile: 'plop-templates/component/styles.ts.hbs'
        });

      } else if (data.type === 'screen') {
        const screenPath = data.screenType === 'auth' 
          ? 'app/(auth)/{{camelCase name}}'
          : 'app/(main)/{{camelCase name}}';

        actions.push({
          type: 'add',
          path: `${screenPath}/index.tsx`,
          templateFile: 'plop-templates/screen/index.tsx.hbs'
        });

        actions.push({
          type: 'add',
          path: `${screenPath}/styles.ts`,
          templateFile: 'plop-templates/screen/styles.ts.hbs'
        });

      } else if (data.type === 'hook') {
        actions.push({
          type: 'add',
          path: 'hooks/use{{pascalCase name}}.ts',
          templateFile: 'plop-templates/hook/hook.ts.hbs'
        });

      } else if (data.type === 'util') {
        actions.push({
          type: 'add',
          path: 'utils/{{camelCase name}}.ts',
          templateFile: 'plop-templates/util/util.ts.hbs'
        });
      } else if (data.type === 'svg') {
        // Create a React Native SVG icon component directly in assets/icons
        actions.push({
          type: 'add',
          path: 'assets/icons/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/icon/icon.tsx.hbs'
        });

        // Update the icon list to include the new icon
        actions.push({
          type: 'modify',
          path: 'components/atoms/Icon/list.ts',
          pattern: /^/,
          template: 'import {{pascalCase name}} from "@/assets/icons/{{pascalCase name}}";\n'
        });

        actions.push({
          type: 'modify',
          path: 'components/atoms/Icon/list.ts',
          pattern: /(\s*)(\}\;)/,
          template: '$1  {{camelCase name}}: {{pascalCase name}},\n$1$2'
        });
      }

      return actions;
    }
  });
};