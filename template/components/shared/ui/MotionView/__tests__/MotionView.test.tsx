import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { FadeIn } from "react-native-reanimated";

import MotionView from "@/components/shared/ui/MotionView";
import { MOTION_PRESETS } from "@/components/shared/ui/MotionView/presets";

// Reanimated needs native code, and its bundled Jest mock fails to initialize
// in this setup. MotionView only picks a preset and timing, so a minimal stand-in
// is enough: Animated.View renders a View, animation builders chain freely.
jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  const makeBuilder = () => {
    const builder = { duration: () => builder, delay: () => builder };
    return builder;
  };
  return new Proxy(
    {},
    {
      get: (_target, name) => {
        if (name === "__esModule") return true;
        if (name === "default") return { View };
        if (name === "Keyframe") return jest.fn(makeBuilder);
        return makeBuilder();
      },
    },
  );
});

describe("MotionView", () => {
  afterEach(() => jest.restoreAllMocks());

  it("renders its children", async () => {
    await render(
      <MotionView>
        <Text>Hello</Text>
      </MotionView>,
    );

    expect(screen.getByText("Hello")).toBeOnTheScreen();
  });

  it("uses fadeUp with the default 300ms duration and no delay", async () => {
    const entering = jest.spyOn(MOTION_PRESETS.fadeUp, "entering");

    await render(<MotionView>{null}</MotionView>);

    expect(entering).toHaveBeenCalledWith(300, 0);
  });

  it("uses the requested preset, duration and delay", async () => {
    const entering = jest.spyOn(MOTION_PRESETS.zoom, "entering");

    await render(
      <MotionView preset="zoom" duration={500} delay={150}>
        {null}
      </MotionView>,
    );

    expect(entering).toHaveBeenCalledWith(500, 150);
  });

  it("staggers by 60ms per index on top of the delay", async () => {
    const entering = jest.spyOn(MOTION_PRESETS.fadeUp, "entering");

    await render(
      <MotionView index={2} delay={100}>
        {null}
      </MotionView>,
    );

    expect(entering).toHaveBeenCalledWith(300, 220);
  });

  it("uses a custom entering animation instead of the preset", async () => {
    const entering = jest.spyOn(MOTION_PRESETS.fadeUp, "entering");

    await render(<MotionView entering={FadeIn}>{null}</MotionView>);

    expect(entering).not.toHaveBeenCalled();
  });

  it("skips the exit animation when hasExit is false", async () => {
    const exiting = jest.spyOn(MOTION_PRESETS.fadeUp, "exiting");

    await render(<MotionView hasExit={false}>{null}</MotionView>);

    expect(exiting).not.toHaveBeenCalled();
  });
});
