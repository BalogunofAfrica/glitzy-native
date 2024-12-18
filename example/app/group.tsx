import { Stack, useLocalSearchParams } from "expo-router";
import { Glitzy } from "glitzy-native/lib/expo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const skeletons = Array.from({ length: 5 }, (_, index) => index.toString());

export default function Group() {
  const params = useLocalSearchParams<{ name: string }>();
  console.log("🚀 ~ Group ~ params:", params);
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

function Skeleton() {
  return (
    <Glitzy
      isLoading
      highlightColor="#d5d5d5"
      boneColor="#F8F8F8"
      layout={[
        {
          children: [
            {
              alignSelf: "center",
              borderColor: "#F0F2F9",
              borderRadius: 12,
              borderWidth: 1,
              children: [
                {
                  alignSelf: "center",
                  borderRadius: 16,
                  height: 32,
                  key: "image",
                  width: 32,
                },
                {
                  alignItems: "center",
                  children: [
                    {
                      borderRadius: 4,
                      height: 18,
                      width: 109,
                    },
                  ],
                  rowGap: 10,
                },
              ],

              justifyContent: "space-between",
              padding: 16,
              rowGap: 16,
            },
          ],
          width: 248,
        },
      ]}
    />
  );
}
