import AnimatedText from "@/components/vendor/reactICX/AnimatedText";
import { useEffect, useState } from "react";

export default function AnimatedTextExample({ TEXTS }: { TEXTS: string[] }) {
  const [text, setText] = useState<string>(TEXTS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % TEXTS.length;
      setText(TEXTS[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <AnimatedText text={text} />;
}
