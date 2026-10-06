export interface AnimatedSplashProps {
  /** True once fonts/resources are loaded; the splash exits after this flips. */
  isReady: boolean;
  /** Called after the exit animation finishes so the parent can unmount it. */
  onFinish: () => void;
}
