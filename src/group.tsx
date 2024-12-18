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
    const listenerCount = useRef(0);
    const [hasListeners, setHasListeners] = useState(false);
    const animationValue = useSharedValue(0);

    const subscribe = useCallback(() => {
      const prevCount = listenerCount.current;
      listenerCount.current += 1;

      // There is at least one listener
      if (prevCount === 0) {
        setHasListeners(true);
      }

      return () => {
        listenerCount.current -= 1;

        // There are no more listeners
        if (listenerCount.current === 0) {
          setHasListeners(false);
        }
      };
    }, []);

    useEffectOnce(() => {
      const startAnimation = () => {
        animationValue.value = 0;
        animationValue.value = ANIMATIONS[animationType]({ duration, easing });
      };

      if (hasListeners) {
        startAnimation();
      } else {
        cancelAnimation(animationValue);
      }
    }, [animationType, duration, easing, animationValue, hasListeners]);

    return (
      <GroupContext.Provider
        value={{ animationType, animationValue, subscribe }}
      >
        {children}
      </GroupContext.Provider>
    );
  }
);
