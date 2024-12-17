import { Glitzy as NGlitzy } from "./glitzy";
import { LinearGradient } from "expo-linear-gradient";
import type { GlitzyProps, GradientProps } from "./types";

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

export function Glitzy(props: Omit<GlitzyProps, "LinearGradientComponent">) {
  return <NGlitzy LinearGradientComponent={Gradient} {...props} />;
}
