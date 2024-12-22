import { GradientExample } from "@/component/gradient-example";
import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";

export default function Impl() {
  const params = useLocalSearchParams<{ impl: string; name: string }>();
  const { Glitzy } =
    params.impl === "skia"
      ? require("glitzy-native/skia")
      : require("glitzy-native/expo");

  return (
    <Fragment>
      <Stack.Screen options={{ title: params.name }} />
      <GradientExample Glitzy={Glitzy} />
    </Fragment>
  );
}
