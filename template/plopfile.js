module.exports = function (plop) {
  // Helper to capitalize first letter
  plop.setHelper("capitalize", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  // Helper to convert to camelCase
  plop.setHelper("camelCase", function (text) {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  });

  // Helper to convert to PascalCase
  plop.setHelper("pascalCase", function (text) {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
        return word.toUpperCase();
      })
      .replace(/\s+/g, "");
  });

  // Helper to check equality
  plop.setHelper("eq", function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Helper to convert to kebab-case
  plop.setHelper("kebabCase", function (text) {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  });

  plop.setGenerator("create", {
    description: "Generate components, screens, hooks, or utilities",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the generation?",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "Name is required";
        },
      },
      {
        type: "list",
        name: "type",
        message: "What would you like to create?",
        choices: ["component", "screen", "hook", "util", "svg", "integration"],
      },
      // Component group selection (feature-based structure)
      {
        type: "list",
        name: "componentGroup",
        message: "Where should this component live?",
        choices: [
          { name: "shared/ui — generic, reusable UI primitive", value: "ui" },
          { name: "shared/layout — navigation chrome or screen-layout wrapper", value: "layout" },
          { name: "shared/wrappers — container / overlay wrapper", value: "wrappers" },
          { name: "feature — belongs to a specific product feature", value: "feature" },
        ],
        when: function (answers) {
          return answers.type === "component";
        },
      },
      // Feature name (only when the component belongs to a feature)
      {
        type: "input",
        name: "featureName",
        message: "What feature does it belong to? (e.g. auth, notifications)",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "Feature name is required";
        },
        when: function (answers) {
          return answers.type === "component" && answers.componentGroup === "feature";
        },
      },
      // Screen type selection
      {
        type: "list",
        name: "screenType",
        message: "What type of screen?",
        choices: ["auth", "main"],
        when: function (answers) {
          return answers.type === "screen";
        },
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === "component") {
        // feature -> components/features/<feature>/components/<Name>; otherwise components/shared/<group>/<Name>
        let componentPath =
          data.componentGroup === "feature"
            ? "components/features/{{camelCase featureName}}/components"
            : "components/shared/{{componentGroup}}";

        componentPath += "/{{pascalCase name}}";

        actions.push({
          type: "add",
          path: `${componentPath}/index.tsx`,
          templateFile: "plop-templates/component/index.tsx.hbs",
        });

        actions.push({
          type: "add",
          path: `${componentPath}/styles.ts`,
          templateFile: "plop-templates/component/styles.ts.hbs",
        });

        // index.tsx imports its props interface from ./types
        actions.push({
          type: "add",
          path: `${componentPath}/types.ts`,
          templateFile: "plop-templates/component/types.ts.hbs",
        });
      } else if (data.type === "screen") {
        // Screen UI lives in components/features/<flow>/screens/<Name>, re-exported through
        // that feature's index.ts barrel — the single entry point app/ routes import from.
        const screenPath = "components/features/{{screenType}}/screens/{{pascalCase name}}";
        const barrelPath = "components/features/{{screenType}}/index.ts";
        const routePath =
          data.screenType === "auth"
            ? "app/(auth)/{{camelCase name}}"
            : "app/(main)/{{camelCase name}}";

        actions.push({
          type: "add",
          path: `${screenPath}/index.tsx`,
          templateFile: "plop-templates/screen/index.tsx.hbs",
        });

        actions.push({
          type: "add",
          path: `${screenPath}/styles.ts`,
          templateFile: "plop-templates/screen/styles.ts.hbs",
        });

        actions.push({
          type: "add",
          path: `${routePath}/index.tsx`,
          templateFile: "plop-templates/screen/route.tsx.hbs",
        });

        // Append the screen export to the end of the barrel (after its leading comment and
        // existing exports), normalising trailing newlines so the file ends with exactly one.
        actions.push({
          type: "modify",
          path: barrelPath,
          pattern: /\n*$/,
          template:
            '\nexport { default as {{pascalCase name}}Screen } from "./screens/{{pascalCase name}}";\n',
        });
      } else if (data.type === "hook") {
        actions.push({
          type: "add",
          path: "hooks/use{{pascalCase name}}.ts",
          templateFile: "plop-templates/hook/hook.ts.hbs",
        });
      } else if (data.type === "util") {
        actions.push({
          type: "add",
          path: "utils/{{camelCase name}}.ts",
          templateFile: "plop-templates/util/util.ts.hbs",
        });
      } else if (data.type === "svg") {
        // Create a React Native SVG icon component directly in assets/icons
        actions.push({
          type: "add",
          path: "assets/icons/{{pascalCase name}}.tsx",
          templateFile: "plop-templates/icon/icon.tsx.hbs",
        });

        // Update the icon list to include the new icon
        actions.push({
          type: "modify",
          path: "components/shared/ui/Icon/list.ts",
          pattern: /^/,
          template: 'import {{pascalCase name}} from "@/assets/icons/{{pascalCase name}}";\n',
        });

        actions.push({
          type: "modify",
          path: "components/shared/ui/Icon/list.ts",
          pattern: /(\s*)(\}\;)/,
          template: "$1  {{camelCase name}}: {{pascalCase name}},$1$2",
        });
      } else if (data.type === "integration") {
        // RTK Query API integration: services/<feature>/{index.ts,types.ts}.
        const integrationPath = "apis/services/{{camelCase name}}";

        actions.push({
          type: "add",
          path: `${integrationPath}/types.ts`,
          templateFile: "plop-templates/integration/types.ts.hbs",
        });

        actions.push({
          type: "add",
          path: `${integrationPath}/index.ts`,
          templateFile: "plop-templates/integration/index.ts.hbs",
        });

        // Register the cache tags this service provides/invalidates (inserted before the closing `]`).
        actions.push({
          type: "modify",
          path: "apis/tagTypes.ts",
          pattern: /(\n)(\];)/,
          template: '$1  "{{pascalCase name}}",\n  "{{pascalCase name}}s",\n$2',
        });
      }

      return actions;
    },
  });
};
