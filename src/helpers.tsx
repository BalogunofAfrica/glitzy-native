import { useCallback, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { DEFAULT_BORDER_RADIUS } from "./constants";
import type {
  AnimationDirection,
  AnimationType,
  CustomViewStyle,
  Direction,
} from "./types";

export const getBoneStyles = (
  boneLayout: CustomViewStyle,
  boneColor: string,
  animationDirection: AnimationDirection,
  animationType: AnimationType,
  boneWidth: number,
  boneHeight: number
): CustomViewStyle => {
  const { backgroundColor, borderRadius } = boneLayout;
  const boneStyle: CustomViewStyle = {
    width: boneWidth,
    height: boneHeight,
    borderRadius: borderRadius || DEFAULT_BORDER_RADIUS,
    ...boneLayout,
  };
  if (animationType !== "pulse") {
    boneStyle.overflow = "hidden";
    boneStyle.backgroundColor = backgroundColor || boneColor;
  }
  if (
    animationDirection === "diagonalDownRight" ||
    animationDirection === "diagonalDownLeft" ||
    animationDirection === "diagonalTopRight" ||
    animationDirection === "diagonalTopLeft"
  ) {
    boneStyle.justifyContent = "center";
    boneStyle.alignItems = "center";
  }
  return boneStyle;
};

export const getGradientSize = (
  animationDirection: AnimationDirection,
  boneWidth: number,
  boneHeight: number
): CustomViewStyle => {
  const gradientStyle: CustomViewStyle = {};
  if (
    animationDirection === "diagonalDownRight" ||
    animationDirection === "diagonalDownLeft" ||
    animationDirection === "diagonalTopRight" ||
    animationDirection === "diagonalTopLeft"
  ) {
    gradientStyle.width = boneWidth;
    gradientStyle.height = boneHeight;
    if (boneHeight >= boneWidth) gradientStyle.height *= 1.5;
    else gradientStyle.width *= 1.5;
  }
  return gradientStyle;
};

export const getGradientEndDirection = (
  animationDirection: AnimationDirection,
  animationType: AnimationType,
  boneWidth: number,
  boneHeight: number
): Direction => {
  let direction = { x: 0, y: 0 };
  if (animationType === "shiver") {
    switch (animationDirection) {
      case "horizontalLeft":
      case "horizontalRight": {
        direction = { x: 1, y: 0 };

        break;
      }
      case "verticalTop":
      case "verticalDown": {
        direction = { x: 0, y: 1 };

        break;
      }
      case "diagonalTopRight":
      case "diagonalDownRight":
      case "diagonalDownLeft":
      case "diagonalTopLeft": {
        if (boneWidth && boneHeight && boneWidth > boneHeight)
          return { x: 0, y: 1 };
        return { x: 1, y: 0 };
      }
      // No default
    }
  }
  return direction;
};

export const useLayout = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setSize({ height, width });
  }, []);

  return [size, onLayout] as const;
};
