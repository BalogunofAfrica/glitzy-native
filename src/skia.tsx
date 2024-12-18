import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Glitzy as NGlitzy } from "./glitzy";
import { GlitzyGroup } from "./group";
import type { GlitzyImplProps, GradientProps } from "./types";
import { useLayout } from "./helpers";

const Gradient = (props: GradientProps) => {
  const [size, onLayout] = useLayout();

  return (
    <Canvas onLayout={onLayout} style={props.style}>
      <Rect height={size.height} width={size.width} x={0} y={0}>
        <LinearGradient
          colors={props.colors}
          start={vec(props.start?.x, props.start?.y)}
          end={vec(
            (props.end?.x ?? 0) * size.width,
            (props.end?.y ?? 0) * size.height
          )}
        />
      </Rect>
    </Canvas>
  );
};

export function Glitzy(props: GlitzyImplProps) {
  return <NGlitzy LinearGradientComponent={Gradient} {...props} />;
}

Glitzy.Group = GlitzyGroup;
