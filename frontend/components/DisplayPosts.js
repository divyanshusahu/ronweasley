import Link from "next/link";

import Icon from "@material-ui/core/Icon";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import fetch from "isomorphic-unfetch";

import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

import TimeAgo from "react-timeago";

function DisplayPosts(props) {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <div className="card">
              <div className="card_header">
                <div>
                  <div className="card_main_header">
                    <p>
                      <Link href="/post/[pid]" as={`/post/${p.post_id.S}`}>
                        <a>{p.title.S}</a>
                      </Link>
                    </p>
                  </div>
                  <div className="card_sub_header">
                    <p>
                      Author: &nbsp;
                      <a
                        href={p.author_link.S}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.author.S}
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <Icon
                    aria-controls="post-options"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    style={{ cursor: "pointer", color: "#aaa" }}
                  >
                    more_vert
                  </Icon>
                  <Popover
                    id="post-options"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    elevation={1}
                    PaperProps={{ square: true }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                  >
                    <div>
                      <List dense disablePadding>
                        <ListItem dense>
                          <ListItemText primary="Edit" />
                        </ListItem>
                        <ListItem dense divider>
                          <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem dense>
                          <ListItemText primary="Report" />
                        </ListItem>
                      </List>
                    </div>
                  </Popover>
                </div>
              </div>
              <div className="card_content">
                {ReactHtmlParser(
                  stateToHTML(convertFromRaw(JSON.parse(p.content.S)), {
                    inlineStyles: {
                      HIGHLIGHT: { style: { background: "$ff0" } }
                    }
                  })
                )}
              </div>
              <div className="card_action">
                <TimeAgo date={p.post_date.S} style={{ marginLeft: "auto" }} />
              </div>
            </div>
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
          .card {
            background-color: #fefefe;
            padding: 16px;
            font-family: "Roboto";
          }
          .card_header {
            display: flex;
            justify-content: space-between;
          }
          .card_main_header {
            font-size: 28px;
            font-weight: 600;
          }
          .card_sub_header {
            font-size: 16px;
            color: #777;
          }
          .card_content {
            overflow: hidden;
            max-height: 200px;
            padding: 20px 0;
          }
          .card_action {
            height: 32px;
            display: flex;
            align-items: flex-end;
            color: #aaa;
          }
          @media only screen and (max-width: 600px) {
            .post_root {
              padding: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default DisplayPosts;
