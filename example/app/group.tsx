import { Stack, useLocalSearchParams } from "expo-router";
import { Glitzy } from "glitzy-native/lib/expo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Skeleton } from "./expo";

const skeletons = Array.from({ length: 3 }, (_, index) => index.toString());

export default function Group() {
  const params = useLocalSearchParams<{ name: string }>();
  const [visibility, setVisibility] = useState(skeletons.map(() => true));

  useEffect(() => {
    const timer = setInterval(() => {
      const setIndex = Math.floor(Math.random() * 5);
      setVisibility((item) => {
        const newItem = [...item];
        newItem[setIndex] = !newItem[setIndex];

        return newItem;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Stack.Screen options={{ title: params.name }} />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View
          style={{
            flex: 1,
            height: "100%",
            borderRightWidth: 0.5,
            borderRightColor: "#c3c3c3",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              borderBottomWidth: 1,
              borderColor: "#c3c3c3",
            }}
          >
            Without Group
          </Text>
          {skeletons.map((sk, index) => {
            const visible = visibility[index];

            return visible ? <Skeleton key={sk} /> : null;
          })}
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            borderLeftWidth: 0.5,
            borderLeftColor: "#c3c3c3",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              borderBottomWidth: 1,
              borderColor: "#c3c3c3",
            }}
          >
            With Group
          </Text>
          <Glitzy.Group animationType="shiver">
            {skeletons.map((sk, index) => {
              const visible = visibility[index];

              return visible ? <Skeleton key={sk} /> : null;
            })}
          </Glitzy.Group>
        </View>
      </View>
    </View>
  );
}
