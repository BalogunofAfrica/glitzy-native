import { LinearGradient } from "react-native-linear-gradient";
import { Glitzy as NGlitzy } from "./glitzy";
import type { GlitzyImplProps, GradientProps } from "./types";
import { createLayout, Box, Circle, Text } from "./layout";

export * from "./index";
export {
  GlitzyImplProps as GlitzyProps,
  GlitzyImplLayoutProps as GlitzyLayoutProps,
} from "./types";

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

export function Glitzy(props: GlitzyImplProps) {
  return <NGlitzy LinearGradientComponent={Gradient} {...props} />;
}

Glitzy.Group = NGlitzy.Group;
Glitzy.Layout = createLayout(Glitzy);
Glitzy.Box = Box;
Glitzy.Circle = Circle;
Glitzy.Text = Text;
