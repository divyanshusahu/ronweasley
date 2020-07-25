import { Editor } from "@tinymce/tinymce-react";

function TinyMCEEditor(props) {
  const [editorContent, setEditorContent] = React.useState(
    props.initialContent
  );

  const handleEditorChange = (content) => {
    setEditorContent(content);
    props.handleEditorContent(content);
  };

  return (
    <Editor
      apiKey="jd409gy3ue9tezr052s8diph49j4lb78m10nvm3h4rbxtopv"
      value={editorContent}
      onEditorChange={handleEditorChange}
      init={{
        min_height: 400,
        max_height: 500,
        menubar: false,
        plugins: [
          "advlist autolink autoresize charmap emoticons",
          "fullscreen help hr image link lists preview",
          "searchreplace spellchecker wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline strikethrough blockquote | \
        forecolor backcolor forecolorpicker backcolorpicker | \
        alignleft aligncenter alignright alignjustify outdent indent | \
        bullist numlist link image hr | \
        charmap emoticons searchreplace  \
        preview fullscreen | \
        removeformat | \
        help",
      }}
    />
  );
}

export default TinyMCEEditor;
