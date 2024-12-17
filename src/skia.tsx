import { Canvas, LinearGradient, vec } from "@shopify/react-native-skia";
import { Glitzy as NGlitzy } from "./glitzy";
import { GlitzyGroup } from "./group";
import type { GlitzyImplProps, GradientProps } from "./types";

const Gradient = (props: GradientProps) => (
  <Canvas style={props.style}>
    <LinearGradient
      colors={props.colors}
      start={vec(props.start?.x, props.start?.y)}
      end={vec(props.end?.x, props.end?.y)}
    />
  </Canvas>
);

export function Glitzy(props: GlitzyImplProps) {
  return <NGlitzy LinearGradientComponent={Gradient} {...props} />;
}

Glitzy.Group = GlitzyGroup;
