import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  convertToRaw
} from "draft-js";

import Head from "next/head";

import { Row, Col, Radio, Button, Popover, Input, Icon } from "antd";

import clsx from "clsx";

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
    EditorState.createEmpty(decorator)
  );
  const [currentInlineStyles, setCurrentInlineStyles] = React.useState(1);
  // a hacky way to avoid initial check

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
            <Popover
              trigger="click"
              placement="top"
              content={
                <Input
                  id="link-url-field"
                  placeholder="Insert Link"
                  prefix={<Icon type="link" />}
                  addonAfter={<Icon type="enter" onClick={confirm_link} />}
                  size="small"
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
                  size="small"
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
