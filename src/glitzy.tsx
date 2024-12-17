import type React from "react";
import { Children, memo, useCallback, useEffect, useMemo } from "react";
import type { ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import {
  ANIMATIONS,
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_BONE_COLOR,
  DEFAULT_DURATION,
  DEFAULT_EASING,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_LOADING,
} from "./constants";
import { GlitzyGroup, useGroup } from "./group";
import { useLayout } from "./helpers";
import { LeanView } from "./lean-view";
import { ShiverBone } from "./shiver-bone";
import { StaticBone } from "./static-bone";
import type { CustomViewStyle, GlitzyProps } from "./types";

const container$ = {
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
} satisfies ViewStyle;

export function Glitzy({
  LinearGradientComponent,
  containerStyle = container$,
  easing = DEFAULT_EASING,
  duration = DEFAULT_DURATION,
  layout = [],
  animationType: singleAnimationType = DEFAULT_ANIMATION_TYPE,
  animationDirection = DEFAULT_ANIMATION_DIRECTION,
  isLoading = DEFAULT_LOADING,
  boneColor = DEFAULT_BONE_COLOR,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  children,
}: GlitzyProps) {
  const group = useGroup();
  const singleAnimation = useSharedValue(0);
  const animationValue = useMemo(() => {
    if (group !== null) return group.animationValue;

    return singleAnimation;
  }, [group, singleAnimation]);
  const animationType = useMemo(() => {
    if (group !== null) return group.animationType;

    return singleAnimationType;
  }, [group, singleAnimationType]);

  useEffect(() => {
    if (group !== null || !isLoading) return;

    singleAnimation.value = ANIMATIONS[singleAnimationType]({
      duration,
      easing,
    });
  }, [
    duration,
    easing,
    isLoading,
    singleAnimationType,
    singleAnimation,
    group,
  ]);
  const [componentSize, onLayout] = useLayout();

  const getBoneWidth = useCallback(
    (boneLayout: CustomViewStyle) =>
      (typeof boneLayout.width === "string"
        ? componentSize.width
        : Number(boneLayout.width)) || 0,
    [componentSize.width]
  );

  const getBoneHeight = useCallback(
    (boneLayout: CustomViewStyle) =>
      (typeof boneLayout.height === "string"
        ? componentSize.height
        : Number(boneLayout.height)) || 0,
    [componentSize.height]
  );

  const getPositionRange = useCallback(
    (boneLayout: CustomViewStyle): number[] => {
      const outputRange: number[] = [];
      // use layout dimensions for percentages (string type)
      const boneWidth = getBoneWidth(boneLayout);
      const boneHeight = getBoneHeight(boneLayout);

      switch (animationDirection) {
        case "horizontalRight": {
          outputRange.push(-boneWidth, +boneWidth);

          break;
        }
        case "horizontalLeft": {
          outputRange.push(+boneWidth, -boneWidth);

          break;
        }
        case "verticalDown": {
          outputRange.push(-boneHeight, +boneHeight);

          break;
        }
        case "verticalTop": {
          outputRange.push(+boneHeight, -boneHeight);

          break;
        }
        // No default
      }
      return outputRange;
    },
    [animationDirection, getBoneHeight, getBoneWidth]
  );

  const getBoneContainer = useCallback(
    (
      layoutStyle: CustomViewStyle,
      childrenBones: JSX.Element[],
      key: number | string
    ) => (
      <LeanView key={layoutStyle.key || key} style={layoutStyle}>
        {childrenBones}
      </LeanView>
    ),
    []
  );

  const getBones = useCallback(
    (
      bonesLayout: CustomViewStyle[] | undefined,
      childrenItems: React.ReactNode,
      prefix: string | number = ""
    ): JSX.Element[] => {
      if (bonesLayout && bonesLayout.length > 0) {
        const iterator = Array.from({ length: bonesLayout.length }, () => 0);
        return iterator.map((_, index) => {
          // has a nested layout
          if ((bonesLayout[index]?.children?.length ?? 0) > 0) {
            const containerPrefix =
              bonesLayout[index].key || `bone_container_${index}`;
            const { children: childBones, ...layoutStyle } = bonesLayout[index];
            return getBoneContainer(
              layoutStyle,
              getBones(childBones, [], containerPrefix),
              containerPrefix
            );
          }
          if (animationType === "pulse" || animationType === "none") {
            return (
              <StaticBone
                key={prefix ? `${prefix}_${index}` : index}
                animationDirection={animationDirection}
                animationType={animationType}
                animationValue={animationValue}
                boneColor={boneColor}
                boneHeight={getBoneHeight(bonesLayout[index])}
                boneWidth={getBoneWidth(bonesLayout[index])}
                highlightColor={highlightColor}
                layoutStyle={bonesLayout[index]}
              />
            );
          }
          return (
            <ShiverBone
              LinearGradientComponent={LinearGradientComponent}
              key={prefix ? `${prefix}_${index}` : index}
              animationDirection={animationDirection}
              animationType={animationType}
              animationValue={animationValue}
              boneColor={boneColor}
              boneHeight={getBoneHeight(bonesLayout[index])}
              boneWidth={getBoneWidth(bonesLayout[index])}
              highlightColor={highlightColor}
              layoutStyle={bonesLayout[index]}
              positionRange={getPositionRange(bonesLayout[index])}
            />
          );
        });
      }
      return Children.map(
        childrenItems as React.ReactElement,
        (child, index) => {
          const styling = child.props.style || {};
          if (animationType === "pulse" || animationType === "none") {
            return (
              <StaticBone
                key={prefix ? `${prefix}_${index}` : index}
                animationDirection={animationDirection}
                animationType={animationType}
                animationValue={animationValue}
                boneColor={boneColor}
                boneHeight={getBoneHeight(styling)}
                boneWidth={getBoneWidth(styling)}
                highlightColor={highlightColor}
                layoutStyle={styling}
              />
            );
          }

          return (
            <ShiverBone
              LinearGradientComponent={LinearGradientComponent}
              key={prefix ? `${prefix}_${index}` : index}
              animationDirection={animationDirection}
              animationType={animationType}
              animationValue={animationValue}
              boneColor={boneColor}
              boneHeight={getBoneHeight(styling)}
              boneWidth={getBoneWidth(styling)}
              highlightColor={highlightColor}
              layoutStyle={styling}
              positionRange={getPositionRange(styling)}
            />
          );
        }
      );
    },
    [
      LinearGradientComponent,
      animationDirection,
      animationType,
      animationValue,
      boneColor,
      highlightColor,
      getBoneContainer,
      getBoneHeight,
      getBoneWidth,
      getPositionRange,
    ]
  );

  return (
    <LeanView style={containerStyle} onLayout={onLayout}>
      {isLoading ? getBones(layout, children) : children}
    </LeanView>
  );
}

Glitzy.Group = GlitzyGroup;
