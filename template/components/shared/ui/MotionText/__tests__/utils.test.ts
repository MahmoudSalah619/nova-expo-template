import {
  easeOutCubic,
  formatCount,
  hasJoiningScript,
  splitWords,
  toLoopColors,
} from "@/components/shared/ui/MotionText/utils";

describe("toLoopColors", () => {
  it("builds two mirrored periods so the loop has no seam", () => {
    expect(toLoopColors(["a", "b", "c"])).toEqual([
      "a",
      "b",
      "c",
      "b",
      "a",
      "b",
      "c",
      "b",
      "a",
    ]);
  });

  it("starts, middles and ends on the same color", () => {
    const loop = toLoopColors(["a", "b"]);

    expect(loop[0]).toBe("a");
    expect(loop[(loop.length - 1) / 2]).toBe("a");
    expect(loop[loop.length - 1]).toBe("a");
  });
});

describe("splitWords", () => {
  it("keeps each word whole when splitting by words", () => {
    expect(splitWords("Build apps fast", "words")).toEqual([
      { pieces: ["Build"], firstIndex: 0 },
      { pieces: ["apps"], firstIndex: 1 },
      { pieces: ["fast"], firstIndex: 2 },
    ]);
  });

  it("numbers letters across words so the stagger continues", () => {
    expect(splitWords("Hi you", "letters")).toEqual([
      { pieces: ["H", "i"], firstIndex: 0 },
      { pieces: ["y", "o", "u"], firstIndex: 2 },
    ]);
  });

  it("keeps emoji as a single letter", () => {
    expect(splitWords("ok👋", "letters")[0].pieces).toEqual(["o", "k", "👋"]);
  });
});

describe("easeOutCubic", () => {
  it("runs from 0 to 1 and moves fastest at the start", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

describe("formatCount", () => {
  it("rounds and groups thousands", () => {
    expect(formatCount(1250.4)).toBe("1,250");
  });
});

describe("hasJoiningScript", () => {
  it("detects Arabic text", () => {
    expect(hasJoiningScript("مرحبًا بعودتك")).toBe(true);
  });

  it("detects Arabic mixed with Latin", () => {
    expect(hasJoiningScript("Expo تطبيق")).toBe(true);
  });

  it("is false for Latin text and emoji", () => {
    expect(hasJoiningScript("Welcome back 👋")).toBe(false);
  });
});
