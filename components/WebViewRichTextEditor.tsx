import React, { useRef } from "react";
import { SafeAreaView, StyleSheet, Button } from "react-native";
import WebView from "react-native-webview";

const WebViewRichTextEditor = () => {
  const webViewRef = useRef<WebView>(null);

  const editorHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Quill Rich Text Editor</title>
      <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        #editor-container {
          height: 90vh;
        }
      </style>
    </head>
    <body>
      <div id="toolbar">
        <!-- Add toolbar options -->
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </div>
      <div id="editor-container"></div>
      <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
      <script>
        const quill = new Quill('#editor-container', {
          modules: { toolbar: '#toolbar' },
          theme: 'snow'
        });

        document.addEventListener("message", function(event) {
          if (event.data === "GET_CONTENT") {
            const content = quill.root.innerHTML;
            window.ReactNativeWebView.postMessage(content);
          }
        });
      </script>
    </body>
    </html>
  `;

  const getEditorContent = () => {
    webViewRef.current?.injectJavaScript(`
      window.ReactNativeWebView.postMessage(document.getElementById('editor-container').innerHTML);
    `);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: editorHTML }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          const content = event.nativeEvent.data;
          console.log("Editor Content:", content);
        }}
      />
      <Button title="Get Content" onPress={getEditorContent} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default WebViewRichTextEditor;
