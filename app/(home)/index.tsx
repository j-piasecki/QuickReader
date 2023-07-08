import { Button, Pressable, StyleSheet, useColorScheme } from "react-native";

import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <Link
        href={{
          pathname: "reader/[item]",
          params: { item: "test_book" },
        }}
        asChild
      >
        <Button title="Open reader" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
