import { moderateScale } from "./Metrics";

/** Corner radii. Larger, softer corners are the default in this design. */
const Radius = {
  /** 8 — chips, tags, small controls */
  xs: moderateScale(8),
  /** 12 — menu items, inline surfaces */
  sm: moderateScale(12),
  /** 16 — buttons, inputs */
  md: moderateScale(16),
  /** 20 — cards */
  lg: moderateScale(20),
  /** 24 — dialogs, modals */
  xl: moderateScale(24),
  /** 28 — bottom sheets */
  xxl: moderateScale(28),
  /** fully rounded */
  pill: 999,
};

export default Radius;
