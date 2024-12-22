import { GradientExample } from "@/component/gradient-example";
import { Skeleton } from "@/component/skeleton-declarative";
import { Stack, useLocalSearchParams } from "expo-router";
import { Glitzy } from "glitzy-native/expo";
import { Fragment } from "react";

export default function Declarative() {
  const params = useLocalSearchParams<{ impl: string; name: string }>();

  return (
    <Fragment>
      <Stack.Screen options={{ title: params.name }} />
      <GradientExample Skeleton={Skeleton} Glitzy={Glitzy} />
    </Fragment>
  );
}
