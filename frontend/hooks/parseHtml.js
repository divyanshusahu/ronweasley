import ReactHtmlParser from "react-html-parser";
import { Image } from "antd";

function parseHtml(str) {
  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "img") {
      return (
        <Image
          src={node.attribs.src}
          alt={node.attribs.alt}
          width={node.attribs.width}
          height={node.attribs.height}
          placeholder={true}
          key={node.attribs.src}
        />
      );
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
