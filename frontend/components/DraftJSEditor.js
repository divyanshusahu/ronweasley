import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";

import Head from "next/head";

import { Row, Col, Radio, Button, Popover, Input, Icon } from "antd";

import clsx from "clsx";
import isEmpty from "is-empty";

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
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  };

  const decorator = new CompositeDecorator([
    { strategy: findLinkEntities, component: Link }
  ]);

  const [editorState, setEditorState] = React.useState(
    isEmpty(props.post_content)
      ? EditorState.createEmpty(decorator)
      : EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.post_content))
        )
  );
  const [currentInlineStyles, setCurrentInlineStyles] = React.useState(1);
  // a hacky way to avoid initial check
  const [currentBlockType, setCurrentBlockType] = React.useState("unstyled");

  React.useEffect(() => {
    const inlineStyle = editorState.getCurrentInlineStyle();
    setCurrentInlineStyles(inlineStyle);
    setCurrentBlockType(RichUtils.getCurrentBlockType(editorState));
  }, [editorState]);

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    HIGHLIGHT: {
      background: "#ffff00"
    }
  };

  const myKeyBindingFn = event => {
    if (event.keyCode === 72 && KeyBindingUtil.hasCommandModifier(event)) {
      return "custom-command-highlight";
    } else if (
      event.keyCode === 68 &&
      KeyBindingUtil.hasCommandModifier(event)
    ) {
      return "custom-command-strikethrough";
    }
    return getDefaultKeyBinding(event);
  };

  const handleKeyCommand = command => {
    if (command === "custom-command-highlight") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
      return "handled";
    } else if (command === "custom-command-strikethrough") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
      return "handled";
    }
    const ns = RichUtils.handleKeyCommand(editorState, command);
    if (ns) {
      setEditorState(ns);
    }
    return "not-handled";
  };

  const handleUndoClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const handleBoldClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleStrikeClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const handleUnderlineClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleHighlightClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  const handleULClick = event => {
    event.preventDefault();
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const handleOLClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const handleBlockqouteClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
  };

  const handleCodeblockClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, "code-block"));
  };

  const handleHeaderClick = event => {
    setEditorState(RichUtils.toggleBlockType(editorState, event.target.value));
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
    <img
      src={props.src}
      alt="An error occurred"
      style={{ width: "300px", maxWidth: "90%" }}
    />
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

  const myBlockStyleFn = contentBlock => {
    let type = contentBlock.getType();
    if (type === "blockquote") {
      return "editorBlockQuote";
    }
  };

  return (
    <div className="root">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/draft-js@0.11.3/dist/Draft.css"
          rel="stylesheet"
        />
      </Head>
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
            <span onMouseDown={() => handleBoldClick(event)}>
              <Button
                icon="bold"
                title="Bold (Ctrl + B)"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    typeof currentInlineStyles === "object"
                      ? currentInlineStyles.has("BOLD")
                      : false
                })}
              />
            </span>
            <span onMouseDown={() => handleItalicClick(event)}>
              <Button
                icon="italic"
                title="Italic (Ctrl + I)"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    typeof currentInlineStyles === "object"
                      ? currentInlineStyles.has("ITALIC")
                      : false
                })}
              />
            </span>
            <span onMouseDown={() => handleUnderlineClick(event)}>
              <Button
                icon="underline"
                title="Underline (Ctrl + U)"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    typeof currentInlineStyles === "object"
                      ? currentInlineStyles.has("UNDERLINE")
                      : false
                })}
              />
            </span>
            <span onMouseDown={() => handleStrikeClick(event)}>
              <Button
                icon="strikethrough"
                title="Strikethrough  (Ctrl + D)"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    typeof currentInlineStyles === "object"
                      ? currentInlineStyles.has("STRIKETHROUGH")
                      : false
                })}
              />
            </span>
            <span onMouseDown={() => handleHighlightClick(event)}>
              <Button
                icon="highlight"
                title="Highlight (Ctrl + H)"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    typeof currentInlineStyles === "object"
                      ? currentInlineStyles.has("HIGHLIGHT")
                      : false
                })}
              />
            </span>
          </Col>
          <Col>
            <span onMouseDown={() => handleULClick(event)}>
              <Button
                icon="unordered-list"
                title="Unordered List"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    currentBlockType === "unordered-list-item" ? true : false
                })}
              />
            </span>
            <span onMouseDown={() => handleOLClick(event)}>
              <Button
                icon="ordered-list"
                title="Ordered List"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    currentBlockType === "ordered-list-item" ? true : false
                })}
              />
            </span>
            <span onMouseDown={() => handleCodeblockClick(event)}>
              <Button
                icon="code"
                title="Code Block"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    currentBlockType === "code-block" ? true : false
                })}
              />
            </span>
            <span onMouseDown={() => handleBlockqouteClick(event)}>
              <Button
                icon="block"
                title="Blockquote"
                className={clsx({
                  "ant-radio-button-wrapper-checked":
                    currentBlockType === "blockquote" ? true : false
                })}
              />
            </span>
          </Col>
          <Col>
            <Popover
              trigger="click"
              placement="top"
              content={
                <Input
                  id="link-url-field"
                  placeholder="Insert Link"
                  prefix={<Icon type="link" />}
                  addonAfter={<Icon type="enter" onClick={confirm_link} />}
                  onPressEnter={confirm_link}
                />
              }
            >
              <Button icon="link" title="Insert Link" />
            </Popover>
            <Popover
              trigger="click"
              placement="top"
              content={
                <Input
                  id="image-url-field"
                  placeholder="Insert Image Link"
                  prefix={<Icon type="file-image" />}
                  addonAfter={<Icon type="enter" onClick={confirm_media} />}
                  onPressEnter={confirm_media}
                />
              }
            >
              <Button icon="file-image" title="Insert Image" />
            </Popover>
          </Col>
        </Row>
      </div>
      <div className="editor">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          customStyleMap={styleMap}
          blockRendererFn={mediaBlockRenderer}
          blockStyleFn={myBlockStyleFn}
          placeholder="Begin typing here..."
        />
      </div>
      <style jsx global>
        {`
          .editorBlockQuote {
            padding: 8px;
            font-style: italic;
            border-left: 4px solid rgba(192, 192, 192, 1);
          }
        `}
      </style>
      <style jsx>
        {`
          .toolbar {
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          .editor {
            min-height: 200px;
            max-height: 600px;
            padding: 0 8px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

export default DraftJSEditor;
