import React from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  getBoneStyles,
  getGradientEndDirection,
  getGradientSize,
} from './helpers';
import type { ShiverBoneProps } from './types';

const absoluteGradient$ = {
  height: '100%',
  position: 'absolute',
  width: '100%',
} satisfies ViewStyle;

const gradientChild$ = {
  flex: 1,
} satisfies ViewStyle;

export function ShiverBone({
  animationDirection,
  animationType,
  animationValue,
  boneColor,
  boneHeight,
  boneWidth,
  highlightColor,
  layoutStyle,
  LinearGradientComponent = LinearGradient,
  positionRange,
}: ShiverBoneProps) {
  const animatedStyle = useAnimatedStyle<any>(() => {
    if (
      animationDirection === 'verticalTop' ||
      animationDirection === 'verticalDown' ||
      animationDirection === 'horizontalLeft' ||
      animationDirection === 'horizontalRight'
    ) {
      const interpolatedPosition = interpolate(
        animationValue.value,
        [0, 1],
        positionRange,
      );
      if (
        animationDirection === 'verticalTop' ||
        animationDirection === 'verticalDown'
      ) {
        return {
          transform: [{ translateY: interpolatedPosition }],
        };
      }
      return {
        transform: [{ translateX: interpolatedPosition }],
      };
    }

    if (
      animationDirection === 'diagonalDownRight' ||
      animationDirection === 'diagonalTopRight' ||
      animationDirection === 'diagonalDownLeft' ||
      animationDirection === 'diagonalTopLeft'
    ) {
      const diagonal = Math.sqrt(
        boneHeight * boneHeight + boneWidth * boneWidth,
      );
      const mainDimension = Math.max(boneHeight, boneWidth);
      const oppositeDimension =
        mainDimension === boneWidth ? boneHeight : boneWidth;
      const diagonalAngle = Math.acos(mainDimension / diagonal);
      let rotateAngle =
        animationDirection === 'diagonalDownRight' ||
        animationDirection === 'diagonalTopLeft'
          ? Math.PI / 2 - diagonalAngle
          : Math.PI / 2 + diagonalAngle;
      const additionalRotate =
        animationDirection === 'diagonalDownRight' ||
        animationDirection === 'diagonalTopLeft'
          ? 2 * diagonalAngle
          : -2 * diagonalAngle;
      const distanceFactor = (diagonal + oppositeDimension) / 2;
      if (mainDimension === boneWidth && boneWidth !== boneHeight)
        rotateAngle += additionalRotate;
      const sinComponent = Math.sin(diagonalAngle) * distanceFactor;
      const cosComponent = Math.cos(diagonalAngle) * distanceFactor;
      let xOutputRange = [0, 0];
      let yOutputRange = [0, 0];
      if (
        animationDirection === 'diagonalDownRight' ||
        animationDirection === 'diagonalTopLeft'
      ) {
        xOutputRange =
          animationDirection === 'diagonalDownRight'
            ? [-sinComponent, sinComponent]
            : [sinComponent, -sinComponent];
        yOutputRange =
          animationDirection === 'diagonalDownRight'
            ? [-cosComponent, cosComponent]
            : [cosComponent, -cosComponent];
      } else {
        xOutputRange =
          animationDirection === 'diagonalDownLeft'
            ? [-sinComponent, sinComponent]
            : [sinComponent, -sinComponent];
        yOutputRange =
          animationDirection === 'diagonalDownLeft'
            ? [cosComponent, -cosComponent]
            : [-cosComponent, cosComponent];
        if (mainDimension === boneHeight && boneWidth !== boneHeight) {
          xOutputRange.reverse();
          yOutputRange.reverse();
        }
      }
      const translateX = interpolate(
        animationValue.value,
        [0, 1],
        xOutputRange,
      );
      const translateY = interpolate(
        animationValue.value,
        [0, 1],
        yOutputRange,
      );
      if (mainDimension === boneWidth) {
        return {
          transform: [{ translateX: translateY }, { translateY: translateX }],
        };
      }

      return {
        transform: [
          { translateX },
          { translateY },
          { rotate: `${rotateAngle}rad` },
        ],
      };
    }

    return {};
  });

  return (
    <View
      style={getBoneStyles(
        layoutStyle,
        boneColor,
        animationDirection,
        animationType,
        boneWidth,
        boneHeight,
      )}
    >
      <Animated.View
        style={[
          absoluteGradient$,
          animatedStyle,
          getGradientSize(animationDirection, boneWidth, boneHeight),
        ]}
      >
        <LinearGradientComponent
          colors={[boneColor, highlightColor, boneColor]}
          start={{ x: 0, y: 0 }}
          end={getGradientEndDirection(
            animationDirection,
            animationType,
            boneWidth,
            boneHeight,
          )}
          style={gradientChild$}
        />
      </Animated.View>
    </View>
  );
}
