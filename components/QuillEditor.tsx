import React, { useRef } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const QuillEditor = () => {
  const webviewRef = useRef<WebView>(null);

  const handleSave = () => {
    // WebView ke through editor content fetch karne ke liye
    webviewRef.current?.injectJavaScript(`
      window.ReactNativeWebView.postMessage(
        document.getElementById("editor").innerHTML
      );
    `);
  };

  interface WebViewMessageEvent {
    nativeEvent: {
      data: string;
    };
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    const htmlContent = event.nativeEvent.data;
    Alert.alert('Saved Content', htmlContent);
  };

  const htmlContent = `
    <html>
      <head>
        <!-- Quill Editor CDN -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <style>
          body { margin: 0; padding: 10px; }
          #editor { height: 100%; }
        </style>
      </head>
      <body>
        <div id="editor"></div>
        <script>
          var quill = new Quill('#editor', {
            theme: 'snow',
            placeholder: 'Start writing here...',
            modules: {
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline'],
                ['link']
              ]
            }
          });

          window.quill = quill; // Make quill instance accessible
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        onMessage={handleMessage} // Receive messages from the WebView
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
});

export default QuillEditor;
