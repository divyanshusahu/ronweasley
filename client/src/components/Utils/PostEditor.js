import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
//import "draft-js/dist/Draft.css";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = new makeStyles(theme => ({
  "@global": {
    blockquote: {
      padding: theme.spacing(2),
      backgroundColor: "#fff",
      color: "#888",
      borderLeft: "2px solid #888"
    },
    ul: {
      padding: theme.spacing(2)
    },
    ol: {
      padding: theme.spacing(2)
    }
  },
  root: {
    border: "1px solid #cfcfcf",
    padding: theme.spacing(2)
  },
  toolbar: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between"
  },
  editor: {
    backgroundColor: "#f6f6f6",
    height: "250px",
    padding: theme.spacing(1),
    overflow: "auto"
  }
}));

function PostEditor() {
  const classes = useStyles();

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    HIGHLIGHT: {
      background: "#ffff00"
    }
  };

  const handleKeyCommand = command => {
    const ns = RichUtils.handleKeyCommand(editorState, command);
    if (ns) {
      setEditorState(ns);
    }
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleStrikeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleHighlightClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  const handleULClick = () => {
    console.log(editorState.getCurrentContent().getBlockMap().first().getType());
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const handleOLClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const handleBlockqouteClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <div>
          <Button variant="outlined" onClick={handleBoldClick}>
            <Icon>format_bold</Icon>
          </Button>
          <Button variant="outlined" onClick={handleItalicClick}>
            <Icon>format_italic</Icon>
          </Button>
          <Button variant="outlined" onClick={handleStrikeClick}>
            <Icon>format_strikethrough</Icon>
          </Button>
          <Button variant="outlined" onClick={handleUnderlineClick}>
            <Icon>format_underlined</Icon>
          </Button>
          <Button variant="outlined" onClick={handleHighlightClick}>
            <Icon>highlight</Icon>
          </Button>
        </div>
        <div>
          <Button variant="outlined" onClick={handleULClick}>
            <Icon>format_list_bulleted</Icon>
          </Button>
          <Button variant="outlined" onClick={handleOLClick}>
            <Icon>format_list_numbered</Icon>
          </Button>
          <Button variant="outlined" onClick={handleBlockqouteClick}>
            <Icon>format_quote</Icon>
          </Button>
        </div>
        <div>
          <Button variant="outlined">
            <strong>H1</strong>
          </Button>
          <Button variant="outlined">
            <strong>H2</strong>
          </Button>
          <Button variant="outlined">
            <strong>H3</strong>
          </Button>
          <Button variant="outlined">
            <strong>H4</strong>
          </Button>
        </div>
      </div>
      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
        />
      </div>
    </div>
  );
}

export default PostEditor;
