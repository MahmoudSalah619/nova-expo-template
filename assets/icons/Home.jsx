import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Home = ({ color = "#FF7E55", strokeWidth, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
    <Path
      d="M9.5 21v-7.4c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C10.26 12 10.54 12 11.1 12h2.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437c.109.214.109.494.109 1.054V21M11.518 2.764L4.735 8.039c-.453.353-.68.53-.843.75a2 2 0 00-.318.65c-.074.265-.074.552-.074 1.126V17.8c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C5.02 21 5.58 21 6.7 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874c.218-.428.218-.988.218-2.108v-7.235c0-.574 0-.861-.074-1.126a2.002 2.002 0 00-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 00-.523 0c-.194.052-.37.189-.721.462z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Home;
