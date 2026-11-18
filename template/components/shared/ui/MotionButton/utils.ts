/**
 * "#RRGGBB" (or "#RGB") → "rgba(r, g, b, alpha)". Gradients need a
 * transparent version of the same color: plain "transparent" fades through
 * black on iOS.
 */
export function withAlpha(hex: string, alpha: number): string {
  const digits = hex.replace("#", "");
  const full =
    digits.length === 3
      ? digits
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : digits.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((start) =>
    parseInt(full.slice(start, start + 2), 16),
  );
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface BeamGeometry {
  /** Side of the square that spins behind the button (its diagonal). */
  size: number;
  /** Offsets that center the square on the button. */
  left: number;
  top: number;
  /** Thickness of the bright bar, so the lit part of the border stays short. */
  barThickness: number;
}

/** Spinning square big enough to cover the button at any angle. */
export function getBeamGeometry(width: number, height: number): BeamGeometry {
  const size = Math.hypot(width, height);
  return {
    size,
    left: (width - size) / 2,
    top: (height - size) / 2,
    barThickness: height * 0.9,
  };
}
