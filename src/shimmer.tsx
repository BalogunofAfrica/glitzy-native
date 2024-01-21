import React, { Children, memo, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_BONE_COLOR,
  DEFAULT_DURATION,
  DEFAULT_EASING,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_LOADING,
} from './constants';
import { useLayout } from './helpers';
import { ShiverBone } from './shiver-bone';
import { StaticBone } from './static-bone';
import type { CustomViewStyle, ShimmerProps } from './types';

const container$ = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
} satisfies ViewStyle;

const ShimmerComponent: React.FunctionComponent<ShimmerProps> = ({
  LinearGradientComponent = LinearGradient,
  containerStyle = container$,
  easing = DEFAULT_EASING,
  duration = DEFAULT_DURATION,
  layout = [],
  animationType = DEFAULT_ANIMATION_TYPE,
  animationDirection = DEFAULT_ANIMATION_DIRECTION,
  isLoading = DEFAULT_LOADING,
  boneColor = DEFAULT_BONE_COLOR,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  children,
}) => {
  if (!LinearGradientComponent) {
    throw new Error(
      "Error: 'react-native-linear-gradient' is not installed and no 'LinearGradientComponent' was provided.",
    );
  }

  const animationValue = useSharedValue(0);
  const loadingValue = useSharedValue(isLoading ? 1 : 0);
  const shiverValue = useSharedValue(animationType === 'shiver' ? 1 : 0);
  const [componentSize, onLayout] = useLayout();

  useEffect(() => {
    if (loadingValue.value === 1) {
      animationValue.value =
        shiverValue.value === 1
          ? withRepeat(withTiming(1, { duration, easing }), -1, false)
          : withRepeat(
              withTiming(1, { duration: duration! / 2, easing }),
              -1,
              true,
            );
    }
  }, [loadingValue, shiverValue, animationValue, duration, easing]);

  const getBoneWidth = (boneLayout: CustomViewStyle) =>
    (typeof boneLayout.width === 'string'
      ? componentSize.width
      : Number(boneLayout.width)) || 0;
  const getBoneHeight = (boneLayout: CustomViewStyle) =>
    (typeof boneLayout.height === 'string'
      ? componentSize.height
      : Number(boneLayout.height)) || 0;

  const getPositionRange = (boneLayout: CustomViewStyle): number[] => {
    const outputRange: number[] = [];
    // use layout dimensions for percentages (string type)
    const boneWidth = getBoneWidth(boneLayout);
    const boneHeight = getBoneHeight(boneLayout);

    switch (animationDirection) {
      case 'horizontalRight': {
        outputRange.push(-boneWidth, +boneWidth);

        break;
      }
      case 'horizontalLeft': {
        outputRange.push(+boneWidth, -boneWidth);

        break;
      }
      case 'verticalDown': {
        outputRange.push(-boneHeight, +boneHeight);

        break;
      }
      case 'verticalTop': {
        outputRange.push(+boneHeight, -boneHeight);

        break;
      }
      // No default
    }
    return outputRange;
  };

  const getBoneContainer = (
    layoutStyle: CustomViewStyle,
    childrenBones: JSX.Element[],
    key: number | string,
  ) => (
    <View key={layoutStyle.key || key} style={layoutStyle}>
      {childrenBones}
    </View>
  );

  const getBones = (
    bonesLayout: CustomViewStyle[] | undefined,
    childrenItems: any,
    prefix: string | number = '',
  ): JSX.Element[] => {
    if (bonesLayout && bonesLayout.length > 0) {
      const iterator = Array.from({ length: bonesLayout.length }, () => 0);
      return iterator.map((_, index) => {
        // has a nested layout
        if (
          bonesLayout[index].children &&
          bonesLayout[index].children!.length > 0
        ) {
          const containerPrefix =
            bonesLayout[index].key || `bone_container_${index}`;
          const { children: childBones, ...layoutStyle } = bonesLayout[index];
          return getBoneContainer(
            layoutStyle,
            getBones(childBones, [], containerPrefix),
            containerPrefix,
          );
        }
        if (animationType === 'pulse' || animationType === 'none') {
          return (
            <StaticBone
              key={prefix ? `${prefix}_${index}` : index}
              {...{
                animationDirection,
                animationType,
                animationValue,
                boneColor,
                boneHeight: getBoneHeight(bonesLayout[index]),
                boneWidth: getBoneWidth(bonesLayout[index]),
                highlightColor,
                layoutStyle: bonesLayout[index],
              }}
            />
          );
        }
        return (
          <ShiverBone
            LinearGradientComponent={LinearGradientComponent}
            key={prefix ? `${prefix}_${index}` : index}
            {...{
              animationDirection,
              animationType,
              animationValue,
              boneColor,
              boneHeight: getBoneHeight(bonesLayout[index]),
              boneWidth: getBoneWidth(bonesLayout[index]),
              highlightColor,
              layoutStyle: bonesLayout[index],
              positionRange: getPositionRange(bonesLayout[index]),
            }}
          />
        );
      });
    }
    return Children.map(childrenItems, (child, index) => {
      const styling = child.props.style || {};
      if (animationType === 'pulse' || animationType === 'none') {
        return (
          <StaticBone
            key={prefix ? `${prefix}_${index}` : index}
            {...{
              animationDirection,
              animationType,
              animationValue,
              boneColor,
              boneHeight: getBoneHeight(styling),
              boneWidth: getBoneWidth(styling),
              highlightColor,
              layoutStyle: styling,
            }}
          />
        );
      }

      return (
        <ShiverBone
          LinearGradientComponent={LinearGradientComponent}
          key={prefix ? `${prefix}_${index}` : index}
          {...{
            animationDirection,
            animationType,
            animationValue,
            boneColor,
            boneHeight: getBoneHeight(styling),
            boneWidth: getBoneWidth(styling),
            highlightColor,
            layoutStyle: styling,
            positionRange: getPositionRange(styling),
          }}
        />
      );
    });
  };

  return (
    <View style={containerStyle} onLayout={onLayout}>
      {isLoading ? getBones(layout, children) : children}
    </View>
  );
};

export const Shimmer = memo(ShimmerComponent);
