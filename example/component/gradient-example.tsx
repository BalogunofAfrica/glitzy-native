import type { ComponentProps } from "react";
import { ScrollView, Text, View } from "react-native";
import { Skeleton as NSkeleton } from "./skeleton";

export function GradientExample({
  Glitzy,
  Skeleton = NSkeleton,
}: {
  Glitzy: ComponentProps<typeof NSkeleton>["Glitzy"];
  Skeleton?: typeof NSkeleton;
}) {
  return (
    <ScrollView style={{ backgroundColor: "white", flexGrow: 1 }}>
      <View
        style={{
          rowGap: 16,
          marginBottom: 100,
          paddingTop: 32,
        }}
      >
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: shiver (default)</Text>
          <Skeleton Glitzy={Glitzy} />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: pulse</Text>
          <Skeleton Glitzy={Glitzy} animationType="pulse" />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: none</Text>
          <Skeleton Glitzy={Glitzy} boneColor="#d5d5d5" animationType="none" />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Change bone and highlight color</Text>
          <Skeleton
            Glitzy={Glitzy}
            bg="#111111"
            boneColor="#777777"
            highlightColor="#333333"
          />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Change animation direction</Text>
          <Skeleton
            Glitzy={Glitzy}
            animationDirection="verticalDown"
            bg="#111111"
            boneColor="#777777"
            highlightColor="#333333"
          />
        </View>
      </View>
    </ScrollView>
  );
}
