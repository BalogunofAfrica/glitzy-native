import * as React from "react";
import type { ViewProps } from "react-native";
import Animated from "react-native-reanimated";

// Thanks to @hirbod
// https://gist.github.com/hirbod/03d487f40b4c091d2c56ebfb17dba7ed

export const LeanView = React.forwardRef((props, ref) => {
  return React.createElement("RCTView", { ...props, ref });
}) as React.ComponentType<ViewProps>;

LeanView.displayName = "RCTView";

// @ts-expect-error
export const AnimatedLeanView = Animated.createAnimatedComponent(LeanView);
