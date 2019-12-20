import Link from "next/link";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import fetch from "isomorphic-unfetch";

import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

function DisplayPosts(props) {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    let url = BASE_URL + "/posts/post_type/" + props.post_type;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPosts(data.posts);
        }
      });
  }, [props.post_type]);

  return (
    <div>
      <div className="post_root">
        {posts.map(p => (
          <div key={p.post_id.S} className="show_post">
            <Card raised>
              <CardHeader
                action={
                  <IconButton>
                    <Icon>more_vert</Icon>
                  </IconButton>
                }
                title={
                  <Link href="/post/[pid]" as={`/post/${p.post_id.S}`}>
                    <a>{p.title.S}</a>
                  </Link>
                }
                subheader={
                  <a
                    href={p.author_link.S}
                    target="_blank"
                    rel="nopener noreferrer"
                  >
                    {p.author.S}
                  </a>
                }
              />
              <CardContent>
                {ReactHtmlParser(
                  stateToHTML(convertFromRaw(JSON.parse(p.content.S)), {
                    inlineStyles: {
                      HIGHLIGHT: { style: { background: "$ff0" } }
                    }
                  })
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <style jsx>
        {`
        .post_root {
          padding: 16px 32px;
        }
          .show_post {
            padding: 16px 0px;
          }
          .show_post figure {
            display: flex;
            justify-content: center;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      </style>
    </div>
  );
}

export default DisplayPosts;
