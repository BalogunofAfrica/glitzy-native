import { Link, Stack } from "expo-router";
import { Button, View } from "react-native";

const demos = [
  {
    name: "Expo 🖇️",
    href: "/expo",
  },
  {
    name: "Skia 🎨",
    href: "/skia",
  },
  {
    name: "Group 🧑‍🧑‍🧒‍🧒",
    href: "/group",
  },
  {
    name: "Declarative API 🖋️",
    href: "/declarative",
  },
] as const;

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerTitle: "Glitzy Native ✨" }} />
      {demos.map((demo) => (
        <Link
          asChild
          style={{ padding: 16, paddingHorizontal: 8, borderTopWidth: 1 }}
          href={{
            pathname: demo.href as any,
            params: {
              name: demo.name,
            },
          }}
          key={demo.href}
        >
          <Button title={demo.name} />
        </Link>
      ))}
    </View>
  );
}
