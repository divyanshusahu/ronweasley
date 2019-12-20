import Head from "next/head";
import Error from "next/error";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

import NavigationBar from "../../utils/NavigationBar";
import Footer from "../../utils/Footer";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function ShowPosts(props) {
  if (!props.success) {
    return <Error statusCode={404} />;
  }

  const post = props.post[0];

  return (
    <div className="root">
      <Head>
        <title>hjh</title>
      </Head>
      <NavigationBar dark={true} />
      <div className="section">
        <Container>
          <Card raised>
            <CardHeader
              title={post.title.S}
              subheader={
                <a
                  href={post.author_link.S}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.author.S}
                </a>
              }
            />
            <CardContent>
              {ReactHtmlParser(
                stateToHTML(convertFromRaw(JSON.parse(post.content.S)), {
                  inlineStyles: {
                    HIGHLIGHT: { style: { background: "$ff0" } }
                  }
                })
              )}
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
      <style jsx>
        {`
          .root {
            height: 100vh;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
            display: flex;
            flex-direction: column;
          }
          .section {
            margin: 40px 0 80px 0;
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

ShowPosts.getInitialProps = async ({ query }) => {
  const res = await fetch(BASE_URL + "/posts/pid/" + query.pid);
  const result = await res.json();
  return result;
};

export default ShowPosts;
