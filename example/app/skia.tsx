import { Stack, useLocalSearchParams } from "expo-router";
import { Glitzy } from "glitzy-native/skia";
import type { GlitzyProps } from "glitzy-native/types";
import { ScrollView, Text, View } from "react-native";

export default function Expo() {
  const params = useLocalSearchParams<{ name: string }>();

  return (
    <ScrollView style={{ backgroundColor: "white", flexGrow: 1 }}>
      <Stack.Screen options={{ title: params.name }} />
      <View
        style={{
          paddingTop: 32,
          rowGap: 16,
          marginBottom: 100,
        }}
      >
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: shiver (default)</Text>
          <Skeleton />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: pulse</Text>
          <Skeleton animationType="pulse" />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Animation type: none</Text>
          <Skeleton boneColor="#d5d5d5" animationType="none" />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Change bone and highlight color</Text>
          <Skeleton bg="#111111" boneColor="#777777" highlightColor="#333333" />
        </View>
        <View style={{ rowGap: 8, alignItems: "center" }}>
          <Text>Change animation direction</Text>
          <Skeleton
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

export function Skeleton({
  animationType = "shiver",
  bg,
  boneColor = "#F8F8F8",
  highlightColor = "#d5d5d5",
  ...rest
}: Omit<GlitzyProps, "isLoading"> & {
  bg?: string;
}) {
  return (
    <Glitzy
      animationType={animationType}
      boneColor={boneColor}
      highlightColor={highlightColor}
      {...rest}
      isLoading
      layout={[
        {
          children: [
            {
              alignSelf: "center",
              borderColor: "#F0F2F9",
              borderRadius: 12,
              backgroundColor: bg,
              borderWidth: 1,
              children: [
                {
                  children: [
                    {
                      alignSelf: "center",
                      borderRadius: 16,
                      height: 32,
                      key: "image",
                      width: 32,
                    },
                    {
                      height: 16,
                      width: 100,
                    },
                  ],
                  columnGap: 16,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                },
                {
                  children: [
                    {
                      key: "bottom1",
                      borderRadius: 4,
                      height: 16,
                      width: "100%",
                    },
                    {
                      key: "bottom2",
                      borderRadius: 4,
                      height: 16,
                      width: "90%",
                    },
                  ],
                  rowGap: 10,
                },
              ],
              justifyContent: "space-between",
              padding: 16,
              rowGap: 32,
            },
          ],
          width: 248,
        },
      ]}
    />
  );
}
