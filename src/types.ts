import type { StyleProp, ViewStyle } from 'react-native';
import type {
  EasingFunctionFactory,
  SharedValue,
} from 'react-native-reanimated';

export type AnimationType = 'none' | 'shiver' | 'pulse';
export type AnimationDirection =
  | 'horizontalLeft'
  | 'horizontalRight'
  | 'verticalTop'
  | 'verticalDown'
  | 'diagonalDownLeft'
  | 'diagonalDownRight'
  | 'diagonalTopLeft'
  | 'diagonalTopRight';

export interface CustomViewStyle extends ViewStyle {
  children?: CustomViewStyle[];
  key?: number | string;
}

export interface GradientProps {
  colors: (string | number)[];
  end?: { x: number; y: number };
  start?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export interface ShimmerProps {
  LinearGradientComponent?: React.ComponentClass<GradientProps>;
  animationDirection?: AnimationDirection;
  animationType?: AnimationType;
  boneColor?: string;
  children?: any;
  containerStyle?: StyleProp<ViewStyle>;
  duration?: number;
  easing?: EasingFunctionFactory;
  highlightColor?: string;
  isLoading: boolean;
  layout?: CustomViewStyle[];
}

export interface Direction {
  x: number;
  y: number;
}

export interface ShiverBoneProps
  extends Required<
    Pick<
      ShimmerProps,
      | 'animationDirection'
      | 'animationType'
      | 'boneColor'
      | 'highlightColor'
      | 'LinearGradientComponent'
    >
  > {
  animationValue: SharedValue<number>;
  boneHeight: number;
  boneWidth: number;
  layoutStyle: CustomViewStyle;
  positionRange: number[];
}

export interface StaticBoneProps
  extends Required<
    Pick<
      ShimmerProps,
      'animationDirection' | 'animationType' | 'boneColor' | 'highlightColor'
    >
  > {
  animationValue: SharedValue<number>;
  boneHeight: number;
  boneWidth: number;
  highlightColor: string;
  layoutStyle: CustomViewStyle;
}