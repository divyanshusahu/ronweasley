import ReactHtmlParser from "react-html-parser";
import isEmpty from "is-empty";

function parseHtml(str) {
  const transform = (node) => {
    if (node.type === "tag" && node.name === "img") {
      if (isEmpty(node.attribs.style)) {
        node.attribs["style"] = "max-width: 100%; height: auto";
      } else {
        node.attribs.style += " max-width: 100%; height: auto;";
      }
    } else if (
      node.type === "tag" &&
      (node.name === "ol" || node.name === "ul")
    ) {
      node.attribs["style"] = "padding-left: 48px;";
    } else if (node.type === "tag" && node.name === "hr") {
      node.attribs["style"] =
        "border-color: rgb(204, 204, 204); border-style: solid; border-width: 1px 0 0 0; margin-bottom: 16px;";
    }
  };
  return ReactHtmlParser(str, { transform: transform });
}

export default parseHtml;
