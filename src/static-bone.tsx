import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { getBoneStyles } from "./helpers";
import { AnimatedLeanView } from "./lean-view";
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
    if (animationType === "none") return {};

    const backgroundColor = interpolateColor(
      animationValue.value,
      [0, 1],
      [boneColor, highlightColor]
    );

    return { backgroundColor };
  });

  return (
    <AnimatedLeanView
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
