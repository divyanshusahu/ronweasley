import Head from "next/head";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import { Link as RSLink, Element } from "react-scroll";

import NavigationBar from "./NavigationBar";
import ScrollAnimation from "./ScrollAnimation";
import Footer from "./Footer";

function Layout(props) {
  const isBrowser = typeof window !== "undefined";
  const [dark, setDark] = React.useState(true);
  const [light, setLight] = React.useState(false);

  React.useEffect(() => {
    if (isBrowser) {
      window.addEventListener("scroll", handleScroll);
      if (window.scrollY > 200) {
        setDark(false);
        setLight(true);
      } else {
        setDark(true);
        setLight(false);
      }
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    if (isBrowser) {
      if (window.scrollY > 200) {
        setDark(false);
        setLight(true);
      } else {
        setDark(true);
        setLight(false);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className="post_root">
        <NavigationBar dark={dark} light={light} />
        <div className="main">
          <div className="main_overlay">
            <div className="hero">
              <p className="hero_big_heading">{props.main_heading}</p>
              <p className="hero_about_heading">{props.about_heading}</p>
              <RSLink to="pageContent" spy={true} smooth={true} duration={500}>
                <ScrollAnimation />
              </RSLink>
            </div>
          </div>
        </div>
        <Element name="pageContent">
          <div className="page_content">
            <Container>
              <Paper elevation={24}>
                <div className="toolbar">{props.children}</div>
                <div className="page_posts">{props.display}</div>
              </Paper>
            </Container>
          </div>
        </Element>
      </div>
      <Footer />
      <style jsx>
        {`
          .post_root {
            min-height: 100vh;
            height: 100%;
          }
          .main {
            min-height: 100vh;
            height: 100%;
            width: 100%;
            background-image: url(${props.landscape});
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-top: -8vh;
          }
          .main_overlay {
            width: 100%;
            height: 100vh;
            background-color: rgba(32, 32, 32, 0.75);
          }
          .hero {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .hero_big_heading {
            color: #fff;
            font-family: "Oleo Script";
            font-size: 3rem;
            margin-bottom: 0.35em;
            font-weight: 400;
            padding: 8px;
          }
          .hero_about_heading {
            color: #efefef;
            font-size: 1.25rem;
            font-family: "Roboto";
            font-weight: 500;
            line-height: 1.6;
            padding: 8px;
          }
          .page_content {
            padding: 40px 0 80px 0;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
          .toolbar {
            padding: 32px 16px 0 16px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .page_posts {
            min-height: calc(150vh - 80px);
            background-image: radial-gradient(
                73% 147%,
                #eadfdf 59%,
                #ece2df 100%
              ),
              radial-gradient(
                91% 146%,
                rgba(255, 255, 255, 0.5) 47%,
                rgba(0, 0, 0, 0.5) 100%
              );
            background-blend-mode: screen;
          }
          @media only screen and (orientation: portrait) {
            .main {
              background-image: url(${props.portrait});
            }
          }
          @media only screen and (max-width: 600px) {
            .hero_big_heading {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
