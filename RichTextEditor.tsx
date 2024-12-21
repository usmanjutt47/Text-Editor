import React, { useRef } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const RichTextEditor: React.FC = () => {
  const richText = useRef<RichEditor>(null);

  const handleSave = () => {
    richText.current?.getContentHtml().then((html) => {
      Alert.alert('Saved Content', html);
    });
  };

  return (
    <View style={styles.container}>
      <RichEditor
        ref={richText}
        style={styles.editor}
        placeholder="Start writing your rich text here..."
        onChange={(text) => console.log('Editor Content:', text)}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
        ]}
        iconTint="#000"
        selectedIconTint="#2096F3"
        disabledIconTint="#B0B0B0"
        style={styles.toolbar}
      />
      <Button title="Save Content" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  editor: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  toolbar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default RichTextEditor;
