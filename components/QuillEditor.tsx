import React, { useRef } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function QuillEditor() {
  const webviewRef = useRef<WebView>(null);

  const handleSave = () => {
    console.log('Saving content...');
    webviewRef.current?.injectJavaScript(`
      window.ReactNativeWebView.postMessage(
        document.querySelector("#editor .ql-editor").innerHTML
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
    console.log(htmlContent); 
    Alert.alert('Saved Content', htmlContent);
  };

  const htmlContent = `
    <html>
      <head>
        <!-- Quill Editor CDN -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 10px;
            font-family: Arial, sans-serif;
          }
          .ql-toolbar.ql-snow {
            background-color: #4CAF50;
            border-radius: 12px;
            height: 50px;
            margin-top:40%
          }
          .ql-container.ql-snow {
            border-radius: 12px;
            background-color: #f0f0f0; 
            font-size: 16px; 
            height: 20%;
          }
          .ql-container {
          min-height: 250px; 
          }
          .ql-toolbar {
          font-size: 14px;
          }
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
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
                ['link'],
                ['blockquote'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['clean']
              ]
            }
          });
          window.quill = quill; 
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
        onMessage={handleMessage}
        style={{ height:300 ,backgroundColor: '#cecece' }}
        scalesPageToFit={false}
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
