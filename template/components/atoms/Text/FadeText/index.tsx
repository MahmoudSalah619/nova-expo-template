// import FadeText  from "@/components/vendor/reactICX/FadeText";

import { FadeText } from "@/components/vendor/reactICX/FadeText";
import { CustomTextProps } from "../Base/types";

interface FadeTextExampleProps extends CustomTextProps {
  text: string;
  duration?: number;
  wordDelay?: number;
}

export default function FadeTextExample({
  text,
  duration = 1500,
  wordDelay = 150,
  ...props
}: FadeTextExampleProps): React.JSX.Element {
  return (
    <FadeText
      inputs={[text]}
      duration={duration}
      wordDelay={wordDelay}
      blurTint="extraLight"
      {...props}
    />
  );
}
