import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getBoneStyles } from "./helpers";
import type { StaticBoneProps } from "./types";

export function StaticBone({
  animationValue,
  animationDirection,
  animationType,
  boneColor,
  boneHeight,
  boneWidth,
  highlightColor,
  layoutStyle,
}: StaticBoneProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [0, 1],
      [boneColor, highlightColor]
    );

    if (animationType === "none") return {};

    return { backgroundColor };
  });

  return (
    <Animated.View
      key={layoutStyle.key}
      style={[
        animatedStyle,
        getBoneStyles(
          layoutStyle,
          boneColor,
          animationDirection,
          animationType,
          boneWidth,
          boneHeight
        ),
      ]}
    />
  );
}
