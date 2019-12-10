import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator
} from "draft-js";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
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
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  editor: {
    backgroundColor: "#f6f6f6",
    height: "250px",
    padding: theme.spacing(1),
    overflow: "auto"
  },
  popover_paper: {
    padding: theme.spacing(2)
  }
}));

function PostEditor() {
  const classes = useStyles();

  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  };

  const Link = props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
  };

  const decorator = new CompositeDecorator([
    { strategy: findLinkEntities, component: Link }
  ]);

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(decorator)
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

  const handleHeaderClick = type => {
    if (type === "one") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    } else if (type === "two") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
    } else if (type === "normal") {
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    }
  };

  const [linkPopover, setLinkPopover] = React.useState(null);
  const handleInsertLinkClick = event => {
    setLinkPopover(linkPopover ? null : event.currentTarget);
  };

  const confirm_link = () => {
    let es = editorState;
    let contentState = es.getCurrentContent();
    let contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
      url: document.getElementById("link-url-field").value
    });
    let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(es, {
      currentContent: contentStateWithEntity
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  const handleInsertLinkClose = () => {
    setLinkPopover(null);
  };
  const linkPopoverOpen = Boolean(linkPopover);

  const [imagePopover, setImagePopover] = React.useState(null);
  const handleInsertImageClick = event => {
    setImagePopover(imagePopover ? null : event.currentTarget);
  };
  const handleInsertImageClose = () => {
    setImagePopover(null);
  };
  const imagePopoverOpen = Boolean(imagePopover);

  const mediaBlockRenderer = block => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false
      };
    }
    return null;
  };

  const Image = props => (
    <img src={props.src} alt="An error occurred" width="200px" />
  );

  const Media = props => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    let d;
    try {
      d = entity.getData();
    } catch {
      // this can be empty
    }
    const type = entity.getType();

    let media;
    if (type === "IMAGE") {
      media = <Image src={d.src} />;
    }

    return media;
  };

  const confirm_media = () => {
    let es = editorState;
    let contentState = es.getCurrentContent();
    let urlValue = document.getElementById("image-url-field").value;
    let contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src: urlValue
      }
    );
    let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(es, {
      currentContent: contentStateWithEntity
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
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
          <Button
            variant="outlined"
            aria-owns={linkPopoverOpen ? "link-Popover" : undefined}
            aria-haspopup={true}
            onClick={handleInsertLinkClick}
          >
            <Icon>insert_link</Icon>
          </Button>
          <Button
            variant="outlined"
            aria-owns={imagePopoverOpen ? "image-Popover" : undefined}
            aria-haspopup={true}
            onClick={handleInsertImageClick}
          >
            <Icon>image</Icon>
          </Button>
          <Popover
            id="link-Popover"
            open={linkPopoverOpen}
            anchorEl={linkPopover}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleInsertLinkClose}
            className={classes.popover_div}
          >
            <div className={classes.popover_paper}>
              <TextField label="Paste Link" size="small" id="link-url-field" />
              <Button
                color="primary"
                variant="outlined"
                style={{ height: "45px" }}
                onClick={confirm_link}
              >
                Confirm
              </Button>
            </div>
          </Popover>
          <Popover
            id="image-Popover"
            open={imagePopoverOpen}
            anchorEl={imagePopover}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleInsertImageClose}
            className={classes.popover_div}
          >
            <div className={classes.popover_paper}>
              <TextField
                label="Insert Image Link"
                size="small"
                id="image-url-field"
              />
              <Button
                color="primary"
                variant="outlined"
                style={{ height: "45px" }}
                onClick={confirm_media}
              >
                Confirm
              </Button>
            </div>
          </Popover>
        </div>
        <div>
          <Button variant="outlined" onClick={() => handleHeaderClick("one")}>
            <strong>H1</strong>
          </Button>
          <Button variant="outlined" onClick={() => handleHeaderClick("two")}>
            <strong>H2</strong>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleHeaderClick("normal")}
          >
            <strong>N</strong>
          </Button>
        </div>
      </div>
      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          blockRendererFn={mediaBlockRenderer}
        />
      </div>
    </div>
  );
}

export default PostEditor;
