import React, { useRef } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webviewRef = useRef<WebView>(null);

  // Save content from the editor
  const handleSave = () => {
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

  // Handle the message received from WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    const htmlContent = event.nativeEvent.data;
    Alert.alert('Saved Content', htmlContent);
  };

  // HTML content for the Quill editor with toolbar
  const htmlContent = `
    <html>
      <head>
        <!-- Quill Editor CDN -->
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <style>
          /* Mobile Responsive Styling */
          body {
            margin: 0;
            padding: 10px;
            font-family: Arial, sans-serif;
          }

          /* Toolbar Style with height of 500px */
          .ql-toolbar.ql-snow {
            border: none;
            background-color: #4CAF50; /* Changed toolbar color to green */
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            height: 100px; /* Set height of the toolbar */
            margin-top:40%
          }

          /* Input Container Style with height of 500px */
          .ql-container.ql-snow {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            min-height: 500px; /* Set height of the editor */
            background-color: #f4f4f4; /* Changed input background color */
            color: #333; /* Changed input text color */
            font-size: 16px; /* Added better text size for mobile */
          }

          /* Disable Scroll in Editor */
          .ql-editor {
            overflow-y: hidden; 
          }

          /* Ensuring editor is responsive */
          @media (max-width: 600px) {
            .ql-container {
              min-height: 300px; /* Increased height for mobile view */
            }
            .ql-toolbar {
              font-size: 14px; /* Smaller toolbar buttons on mobile */
            }
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
        onMessage={handleMessage}
        style={{ flex: 1 }} // Make WebView take full screen
        scalesPageToFit={false} // Disable zooming
        useWebKit={true} // Ensure webkit is used (required for iOS)
        zoomable={false} // Disable zooming (Android specific)
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
