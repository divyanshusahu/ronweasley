import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  convertToRaw
} from "draft-js";

import Head from "next/head";

import { Row, Col, Radio, Button } from "antd";

import clsx from "clsx";

/*import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from "@material-ui/core/Icon";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";*/

function DraftJSEditor(props) {
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
  const [currentInlineStyles, setCurrentInlineStyles] = React.useState(1); // a hacky way to avoid initial check

  React.useEffect(() => {
    const inlineStyle = editorState.getCurrentInlineStyle();
    setCurrentInlineStyles(inlineStyle);
  }, [editorState]);

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

  const handleUndoClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoClick = () => {
    setEditorState(EditorState.redo(editorState));
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
    setEditorState(RichUtils.toggleCode(editorState, "blockquote"));
  };

  const handleCodeblockClick = () => {
    setEditorState(RichUtils.toggleCode(editorState, "code-block"));
  };

  /*const handleHeaderClick = type => {
    if (type === "one") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
    } else if (type === "two") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
    } else if (type === "normal") {
      setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
    }
  };*/

  const handleHeaderClick = event => {
    setEditorState(RichUtils.toggleBlockType(editorState, event.target.value));
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
    <img src={props.src} alt="An error occurred" width="300px" />
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

  if (true) {
    const currentContent = convertToRaw(editorState.getCurrentContent());
    props.handleEditorContent(JSON.stringify(currentContent));
  }

  return (
    <div className="root">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/draft-js@0.11.3/dist/Draft.css"
          rel="stylesheet"
        />
      </Head>
      <div>
        <div>
          {/*<ButtonBase
            onClick={handleBoldClick}
            title="Bold"
            size="small"
          >
            <Icon>format_bold</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleItalicClick}
            title="Italic"
            size="small"
          >
            <Icon>format_italic</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleStrikeClick}
            title="Strikethrough"
            size="small"
          >
            <Icon>format_strikethrough</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleUnderlineClick}
            title="Underline"
            size="small"
          >
            <Icon>format_underlined</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleHighlightClick}
            title="Highlight"
            size="small"
          >
            <Icon>highlight</Icon>
          </ButtonBase>*/}
        </div>
        <div>
          {/*<ButtonBase
            onClick={handleULClick}
            title="Bullet List"
            size="small"
          >
            <Icon>format_list_bulleted</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleOLClick}
            title="Numbered List"
            size="small"
          >
            <Icon>format_list_numbered</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleBlockqouteClick}
            title="Blockquote"
            size="small"
          >
            <Icon>format_quote</Icon>
          </ButtonBase>
          <ButtonBase
            onClick={handleCodeblockClick}
            title="Code Block"
            size="small"
          >
            <Icon>code</Icon>
          </ButtonBase>
          <ButtonBase
            aria-owns={linkPopoverOpen ? "link-Popover" : undefined}
            aria-haspopup={true}
            onClick={handleInsertLinkClick}
            title="Insert Link"
            size="small"
          >
            <Icon>insert_link</Icon>
          </ButtonBase>
          <ButtonBase
            aria-owns={imagePopoverOpen ? "image-Popover" : undefined}
            aria-haspopup={true}
            onClick={handleInsertImageClick}
            title="Insert Image"
            size="small"
          >
            <Icon>image</Icon>
          </ButtonBase>
          <Popover
            id="link-Popover"
            open={linkPopoverOpen}
            anchorEl={linkPopover}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleInsertLinkClose}
          >
            <div style={{ padding: "8px" }}>
              <TextField label="Paste Link" size="small" id="link-url-field" />
              <Button
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
          >
            <div style={{ padding: "8px" }}>
              <TextField
                label="Insert Image Link"
                size="small"
                id="image-url-field"
              />
              <Button
                variant="outlined"
                style={{ height: "45px" }}
                onClick={confirm_media}
              >
                Confirm
              </Button>
            </div>
          </Popover>*/}
        </div>
      </div>
      <div className="toolbar">
        <Row type="flex" justify="start" gutter={[16, 16]}>
          <Col>
            <Button icon="undo" title="Undo" onClick={handleUndoClick} />
            <Button icon="redo" title="Redo" onClick={handleRedoClick} />
          </Col>
          <Col>
            <Radio.Group defaultValue="unstyled" onChange={handleHeaderClick}>
              <Radio.Button value="unstyled">N</Radio.Button>
              <Radio.Button value="header-one">H1</Radio.Button>
              <Radio.Button value="header-three">H2</Radio.Button>
              <Radio.Button value="header-four">H3</Radio.Button>
            </Radio.Group>
          </Col>
          <Col>
            <Button
              icon="bold"
              title="Bold"
              onClick={handleBoldClick}
              className={clsx({
                "ant-radio-button-wrapper-checked":
                  typeof currentInlineStyles === "object"
                    ? currentInlineStyles.has("BOLD")
                    : false
              })}
            />
            <Button
              icon="italic"
              title="Italic"
              onClick={handleItalicClick}
              className={clsx({
                "ant-radio-button-wrapper-checked":
                  typeof currentInlineStyles === "object"
                    ? currentInlineStyles.has("ITALIC")
                    : false
              })}
            />
            <Button
              icon="underline"
              title="Underline"
              onClick={handleUnderlineClick}
              className={clsx({
                "ant-radio-button-wrapper-checked":
                  typeof currentInlineStyles === "object"
                    ? currentInlineStyles.has("UNDERLINE")
                    : false
              })}
            />
            <Button
              icon="strikethrough"
              title="Strikethrough"
              onClick={handleStrikeClick}
              className={clsx({
                "ant-radio-button-wrapper-checked":
                  typeof currentInlineStyles === "object"
                    ? currentInlineStyles.has("STRIKETHROUGH")
                    : false
              })}
            />
            <Button
              icon="highlight"
              title="highlight"
              onClick={handleHighlightClick}
              className={clsx({
                "ant-radio-button-wrapper-checked":
                  typeof currentInlineStyles === "object"
                    ? currentInlineStyles.has("HIGHLIGHT")
                    : false
              })}
            />
          </Col>
          <Col>
            <Button
              icon="unordered-list"
              title="Unordered List"
              onClick={handleULClick}
            />
            <Button
              icon="ordered-list"
              title="Ordered List"
              onClick={handleOLClick}
            />
            <Button icon="code" />
            <Button icon="block" />
          </Col>
          <Col>
            <Button icon="link" />
            <Button icon="file-image" />
          </Col>
        </Row>
      </div>
      <div className="editor">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          blockRendererFn={mediaBlockRenderer}
          placeholder="Begin typing here..."
        />
      </div>
      <style jsx>
        {`
          .toolbar {
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          .editor {
            height: 200px;
            padding: 0 8px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

export default DraftJSEditor;
