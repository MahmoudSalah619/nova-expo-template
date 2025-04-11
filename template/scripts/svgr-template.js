function template(
    { template },
    opts,
    { componentName, jsx }
  ) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  
    return typeScriptTpl.ast`
      import * as React from "react";
      import Svg, { SvgProps } from "react-native-svg";
      import { IconProps } from "../components/Icon/types";
  
      interface CustomProps extends SvgProps {
        size?: number;
        strokeWidth?: number;
        color?: string;
      }
  
      const ${componentName} = ({ 
        size = 24, 
        strokeWidth = 2, 
        color = "currentColor", 
        ...props 
      }: IconProps) => (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth={strokeWidth}
          fill={props.fill || color}
          {...props}
        >
          ${jsx.children}
        </Svg>
      );
  
      export default ${componentName};
    `;
  }
  
  module.exports = template;