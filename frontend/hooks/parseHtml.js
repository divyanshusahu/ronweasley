import ReactHtmlParser from "react-html-parser";
import isEmpty from "is-empty";

function parseHtml(str) {
  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "img") {
      if (isEmpty(node.attribs.style)) {
        node.attribs["style"] = "max-width: 100%; height: auto;";
      } else {
        node.attribs.style += " max-width: 100%; height: auto;";
      }
    } else if (
      node.type === "tag" &&
      (node.name === "ol" || node.name === "ul")
    ) {
      node.attribs["style"] = "margin-left: 36px;";
    } else if (node.type === "tag" && node.name === "hr") {
      return (
        <div
          className="ant-divider ant-divider-horizontal"
          role="separator"
          key={index}
        />
      );
    } else if (node.type === "tag" && node.name === "blockquote") {
      node.attribs["style"] =
        "padding-left: 14px; border-left: 4px solid rgba(0,0,0,0.2)";
    }
  };
  return ReactHtmlParser(str, { transform: transform });
}

export default parseHtml;
