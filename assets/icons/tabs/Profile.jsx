import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Profile({ size = 24, strokeWidth, color = "#141211" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      color="#000000"
      fill="none"
    >
      <Path
        d="M12.5 15c-3.17 0-5.99 1.53-7.784 3.906-.386.511-.58.767-.573 1.112.005.267.172.604.382.769.272.213.649.213 1.402.213h13.146c.753 0 1.13 0 1.402-.213.21-.165.377-.502.382-.769.006-.345-.187-.6-.573-1.112C18.489 16.531 15.67 15 12.5 15z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 15c-3.17 0-5.99 1.53-7.784 3.906-.386.511-.58.767-.573 1.112.005.267.172.604.382.769.272.213.649.213 1.402.213h13.146c.753 0 1.13 0 1.402-.213.21-.165.377-.502.382-.769.006-.345-.187-.6-.573-1.112C18.489 16.531 15.67 15 12.5 15z"
        stroke="#000"
        strokeOpacity={0.2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        stroke="#000"
        strokeOpacity={0.2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Profile;
