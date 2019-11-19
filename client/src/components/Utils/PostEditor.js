import React from "react";
import { Editor, EditorState } from "draft-js";

function PostEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  return (
    <Editor
      placeholder="Explore Your Way In..."
      editorState={editorState}
      onChange={setEditorState}
    />
  );
}

export default PostEditor;
