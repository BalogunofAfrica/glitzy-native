import { useCallback, useEffect, useRef, useState } from "react";
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

const isFunction = (value: unknown) =>
  typeof value === "function" || value instanceof Function;

// Thanks to @jmeistrich
// https://github.com/LegendApp/legend-state/blob/main/src/react/useEffectOnce.ts

export function useEffectOnce(
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  effect: () => void | (() => void),
  deps: unknown[]
) {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    const refDispose = useRef<{
      // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
      dispose?: void | (() => void);
      num: number;
    }>({
      num: 0,
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      // This is a hack to work around StrictMode running effects twice.
      // On the first run it returns a cleanup function that queues the dispose function
      // in a microtask. This way it will run at the end of the frame after StrictMode's second
      // run of the effect. If it's run a second time then the microtasked dispose will do nothing,
      // but the effect will return the dispose again so that when it actually unmounts it will dispose.
      // If not in StrictMode, then the dispose function will run in the microtask.
      // It's possible that this is not safe in 100% of cases, but I'm not sure what the
      // dangerous cases would be. The side effect is that the listener is still active
      // until the end of the frame, but that's probably not a problem.
      const { current } = refDispose;
      current.num++;
      const dispose = () => {
        if (current.dispose && current.num < 2) {
          (current.dispose as () => void)();
          current.dispose = undefined;
        }
        current.num--;
      };
      if (current.dispose === undefined) {
        const ret = effect() ?? null;
        // If ret is a function, then it's a dispose function.
        if (ret && isFunction(ret)) {
          current.dispose = ret;
          return () => queueMicrotask(dispose);
        }
      } else {
        return dispose;
      }
    }, deps);
  } else {
    useEffect(effect, deps);
  }
}
