import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import useReadable from "@/hooks/useReadable";
import { ActivityIndicator } from "react-native-paper";
import ReaderComponent from "@/components/ReaderComponent";

export default function ReadableScreen() {
  const { item } = useLocalSearchParams<{ item: string }>();
  const readable = useReadable(item);

  if (!readable) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return <ReaderComponent readable={readable} />;
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
