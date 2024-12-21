import { createContext, memo, useCallback, useContext, useRef } from "react";
import {
  type SharedValue,
  cancelAnimation,
  useSharedValue,
} from "react-native-reanimated";
import {
  ANIMATIONS,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_DURATION,
  DEFAULT_EASING,
} from "./constants";
import { useEffectOnce } from "./helpers";
import type { GlitzyGroupProps, GlitzyProps } from "./types";

type GroupContext = {
  animationType: NonNullable<GlitzyProps["animationType"]>;
  animationValue: SharedValue<number>;
  subscribe: () => () => void;
} | null;

const GroupContext = createContext<GroupContext>(null);

export function useGroup() {
  const ctx = useContext(GroupContext);

  useEffectOnce(() => {
    if (!ctx) return;

    return ctx.subscribe();
  }, []);

  return ctx;
}

export const GlitzyGroup = memo(
  ({
    animationType = DEFAULT_ANIMATION_TYPE,
    children,
    duration = DEFAULT_DURATION,
    easing = DEFAULT_EASING,
  }: GlitzyGroupProps) => {
    const listeners = useRef(new Set<symbol>());
    const animationValue = useSharedValue(0);

    const startAnimation = useCallback(() => {
      animationValue.value = 0;
      animationValue.value = ANIMATIONS[animationType]({ duration, easing });
    }, [animationType, duration, easing, animationValue]);

    const subscribe = useCallback(() => {
      const id = Symbol();
      const wasEmpty = listeners.current.size === 0;
      listeners.current.add(id);

      if (wasEmpty) {
        startAnimation();
      }

      return () => {
        listeners.current.delete(id);
        if (listeners.current.size === 0) {
          cancelAnimation(animationValue);
        }
      };
    }, [startAnimation, animationValue]);

    return (
      <GroupContext.Provider
        value={{ animationType, animationValue, subscribe }}
      >
        {children}
      </GroupContext.Provider>
    );
  }
);
