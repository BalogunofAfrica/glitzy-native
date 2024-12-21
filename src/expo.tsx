import { LinearGradient } from "expo-linear-gradient";
import { Glitzy as NGlitzy } from "./glitzy";
import type { GlitzyImplProps, GradientProps } from "./types";

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

export function Glitzy(props: GlitzyImplProps) {
  return <NGlitzy LinearGradientComponent={Gradient} {...props} />;
}

Glitzy.Group = NGlitzy.Group;
