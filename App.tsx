import { View, Text } from "react-native";
import React from "react";
import QuillEditor from "./components/QuillEditor";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text>App</Text>
      <QuillEditor />
    </View>
  );
}
