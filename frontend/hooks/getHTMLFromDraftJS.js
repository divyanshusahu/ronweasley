import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

function getHTMLFromDraftJS(content) {
  const options = {
    inlineStyles: {
      HIGHLIGHT: {
        style: { backgroundColor: "#ff0" }
      },
      STRIKETHROUGH: {
        style: { textDecoration: "line-through" }
      }
    },
    blockStyleFn: block => {
      const blockType = block.get("type");
      if (
        blockType === "unordered-list-item" ||
        blockType === "ordered-list-item"
      ) {
        return {
          style: {
            marginLeft: 24
          }
        };
      } else if (blockType === "blockquote") {
        return {
          style: {
            padding: 8,
            fontStyle: "italic",
            borderLeft: "4px solid rgba(192, 192, 192, 1)"
          }
        };
      }
    },
    entityStyleFn: entity => {
      const entityType = entity.get("type");
      if (entityType === "IMAGE") {
        const data = entity.getData();
        return {
          element: "img",
          attributes: {
            src: data.src
          },
          style: {
            maxWidth: "90%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }
        };
      }
    }
  };

  return ReactHtmlParser(
    stateToHTML(convertFromRaw(JSON.parse(content)), options)
  );
}

export default getHTMLFromDraftJS;
