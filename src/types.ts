import type { PropsWithChildren, ReactElement } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SharedValue, WithTimingConfig } from "react-native-reanimated";

export type AnimationType = "none" | "shiver" | "pulse";
export type AnimationDirection =
  | "horizontalLeft"
  | "horizontalRight"
  | "verticalTop"
  | "verticalDown"
  | "diagonalDownLeft"
  | "diagonalDownRight"
  | "diagonalTopLeft"
  | "diagonalTopRight";

export interface CustomViewStyle extends ViewStyle {
  children?: CustomViewStyle[];
  key?: number | string;
}

export interface GradientProps {
  colors: [string, string, ...string[]];
  end?: { x: number; y: number };
  start?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export interface GlitzyProps
  extends PropsWithChildren<{
    LinearGradientComponent?: (props: GradientProps) => ReactElement;
    animationDirection?: AnimationDirection;
    animationType?: AnimationType;
    boneColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    duration?: WithTimingConfig["duration"];
    easing?: WithTimingConfig["easing"];
    highlightColor?: string;
    isLoading: boolean;
    layout?: CustomViewStyle[];
  }> {}

export interface GlitzyGroupProps
  extends PropsWithChildren<
    Pick<GlitzyProps, "animationType" | "duration" | "easing">
  > {}

export interface GlitzyImplProps
  extends Omit<GlitzyProps, "LinearGradientComponent"> {}

export interface Direction {
  x: number;
  y: number;
}

export interface ShiverBoneProps
  extends Pick<
    GlitzyProps,
    | "animationDirection"
    | "animationType"
    | "boneColor"
    | "highlightColor"
    | "LinearGradientComponent"
  > {
  animationValue: SharedValue<number>;
  boneHeight: number;
  boneWidth: number;
  layoutStyle: CustomViewStyle;
  positionRange: number[];
}

export interface StaticBoneProps
  extends Required<
    Pick<
      GlitzyProps,
      "animationDirection" | "animationType" | "boneColor" | "highlightColor"
    >
  > {
  animationValue: SharedValue<number>;
  boneHeight: number;
  boneWidth: number;
  highlightColor: string;
  layoutStyle: CustomViewStyle;
}
