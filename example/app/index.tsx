import { Link, Stack } from "expo-router";
import { Button, View } from "react-native";

const c = [
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
] as const;

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ headerTitle: "Glitzy Native ✨" }} />
      {c.map((node) => (
        <Link
          asChild
          style={{ padding: 16, paddingHorizontal: 8, borderTopWidth: 1 }}
          href={{
            pathname: node.href,
            params: {
              name: node.name,
            },
          }}
          key={node.href}
        >
          <Button title={node.name} />
        </Link>
      ))}
    </View>
  );
}
