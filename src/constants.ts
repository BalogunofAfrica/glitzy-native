import type {
  AnimatableValue,
  WithTimingConfig,
  EasingFunctionFactory,
} from "react-native-reanimated";
import { Easing, withRepeat, withTiming } from "react-native-reanimated";
import type { AnimationDirection, AnimationType } from "./types";

export const DEFAULT_BORDER_RADIUS = 4;
export const DEFAULT_DURATION = 1200;
export const DEFAULT_ANIMATION_TYPE: AnimationType = "shiver";
export const DEFAULT_ANIMATION_DIRECTION: AnimationDirection =
  "horizontalRight";
export const DEFAULT_BONE_COLOR = "#E1E9EE";
export const DEFAULT_HIGHLIGHT_COLOR = "#F2F8FC";
export const DEFAULT_EASING: EasingFunctionFactory = Easing.bezier(
  0.5,
  0,
  0.25,
  1
);
export const DEFAULT_LOADING = true;
export const ANIMATIONS = {
  none: () => 0,
  pulse: (config: WithTimingConfig) =>
    withRepeat(
      withTiming(1, { ...config, duration: (config.duration ?? 0) / 2 }),
      -1,
      true
    ),
  shiver: (config: WithTimingConfig) =>
    withRepeat(withTiming(1, config), -1, false),
} as const satisfies Record<
  AnimationType,
  (...props: any[]) => AnimatableValue | number
>;
