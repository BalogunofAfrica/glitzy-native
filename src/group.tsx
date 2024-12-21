import {
  createContext,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
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
  animationDirection?: NonNullable<GlitzyProps["animationDirection"]>;
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
    animationDirection,
    animationType = DEFAULT_ANIMATION_TYPE,
    children,
    duration = DEFAULT_DURATION,
    easing = DEFAULT_EASING,
  }: GlitzyGroupProps) => {
    const subscribers = useRef(new Set<symbol>());
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const animationValue = useSharedValue(0);

    const subscribe = useCallback(() => {
      const id = Symbol();
      const wasEmpty = subscribers.current.size === 0;
      subscribers.current.add(id);

      if (wasEmpty) {
        setShouldAnimate(true);
      }

      return () => {
        subscribers.current.delete(id);
        if (subscribers.current.size === 0) {
          setShouldAnimate(false);
        }
      };
    }, []);

    useEffectOnce(() => {
      const startAnimation = () => {
        animationValue.value = 0;
        animationValue.value = ANIMATIONS[animationType]({ duration, easing });
      };

      if (shouldAnimate) {
        startAnimation();
      } else {
        cancelAnimation(animationValue);
      }
    }, [animationType, duration, easing, animationValue, shouldAnimate]);

    return (
      <GroupContext.Provider
        value={{ animationDirection, animationType, animationValue, subscribe }}
      >
        {children}
      </GroupContext.Provider>
    );
  }
);
