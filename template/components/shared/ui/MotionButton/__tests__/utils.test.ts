import {
  getBeamGeometry,
  withAlpha,
} from "@/components/shared/ui/MotionButton/utils";

describe("withAlpha", () => {
  it("converts #RRGGBB to rgba", () => {
    expect(withAlpha("#4F46E5", 0.5)).toBe("rgba(79, 70, 229, 0.5)");
  });

  it("expands #RGB shorthand", () => {
    expect(withAlpha("#FFF", 0)).toBe("rgba(255, 255, 255, 0)");
  });

  it("ignores an existing alpha channel", () => {
    expect(withAlpha("#00000080", 1)).toBe("rgba(0, 0, 0, 1)");
  });
});

describe("getBeamGeometry", () => {
  it("uses the diagonal so the square covers the button at any angle", () => {
    const beam = getBeamGeometry(300, 400);

    expect(beam.size).toBe(500);
  });

  it("centers the square on the button", () => {
    const beam = getBeamGeometry(300, 400);

    expect(beam.left).toBe(-100);
    expect(beam.top).toBe(-50);
  });
});
