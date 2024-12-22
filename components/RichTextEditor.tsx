import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView
} from "react-native";

import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles
} from "react-native-cn-richtext-editor";

const defaultStyles = getDefaultStyles();

interface AppState {
  selectedTag: string;
  selectedStyles: string[];
  value: any[];
}

class RichTextEditor extends Component<{}, AppState> {
  private editor: CNRichTextEditor | null = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      selectedTag: "body",
      selectedStyles: [],
      value: [getInitialObject()]
    };
  }

  onStyleKeyPress = (toolType: string) => {
    if (this.editor) {
      this.editor.applyToolbar(toolType);
    }
  };

  onSelectedTagChanged = (tag: string) => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = (styles: string[]) => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = (value: any[]) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={(input) => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={this.state.value}
              style={styles.editor}
              styleList={defaultStyles}
              onValueChanged={this.onValueChanged}
              placeholder="Start typing here..."
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.toolbarContainer}>
          <CNToolbar
            style={styles.toolbar}
            iconSetContainerStyle={styles.iconSetContainer}
            size={30}
            iconSet={[
              {
                type: "tool",
                iconArray: [
                  {
                    toolTypeText: "image",
                    iconComponent: (
                      <Text style={styles.toolbarButton}>image</Text>
                    )
                  }
                ]
              },
              {
                type: "tool",
                iconArray: [
                  {
                    toolTypeText: "bold",
                    buttonTypes: "style",
                    iconComponent: (
                      <Text style={styles.toolbarButton}>bold</Text>
                    )
                  }
                ]
              },
              {
                type: "seperator"
              },
              {
                type: "tool",
                iconArray: [
                  {
                    toolTypeText: "body",
                    buttonTypes: "tag",
                    iconComponent: (
                      <Text style={styles.toolbarButton}>body</Text>
                    )
                  }
                ]
              },
              {
                type: "tool",
                iconArray: [
                  {
                    toolTypeText: "ul",
                    buttonTypes: "tag",
                    iconComponent: <Text style={styles.toolbarButton}>ul</Text>
                  }
                ]
              },
              {
                type: "tool",
                iconArray: [
                  {
                    toolTypeText: "ol",
                    buttonTypes: "tag",
                    iconComponent: <Text style={styles.toolbarButton}>ol</Text>
                  }
                ]
              }
            ]}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#eee",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  main: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    alignItems: "stretch"
  },
  editor: {
    backgroundColor: "#fff"
  },
  toolbarContainer: {
    minHeight: 35
  },
  toolbar: {
    height: 35
  },
  iconSetContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: "center"
  }
});

export default RichTextEditor;
