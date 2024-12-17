import { createContext, useContext, useEffect } from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import {
  ANIMATIONS,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_DURATION,
  DEFAULT_EASING,
} from "./constants";
import type { GlitzyProps, GlitzyGroupProps } from "./types";

type GroupContext = {
  animationType: NonNullable<GlitzyProps["animationType"]>;
  animationValue: SharedValue<number>;
} | null;

const GroupContext = createContext<GroupContext>(null);

export function useGroup() {
  return useContext(GroupContext);
}

export function GlitzyGroup({
  animationType = DEFAULT_ANIMATION_TYPE,
  children,
  duration = DEFAULT_DURATION,
  easing = DEFAULT_EASING,
}: GlitzyGroupProps) {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = ANIMATIONS[animationType]({ duration, easing });
  }, [animationType, duration, easing, animationValue]);

  return (
    <GroupContext.Provider value={{ animationType, animationValue }}>
      {children}
    </GroupContext.Provider>
  );
}
