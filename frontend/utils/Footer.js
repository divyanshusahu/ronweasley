import Head from "next/head";

import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";

function Footer() {
  return (
    <footer>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ron Weasley" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
          type="text/css"
        />
      </Head>
      <style jsx global>
        {`
          html {
            box-sizing: border-box;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          footer {
            padding: 16px;
            background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
            margin-top: auto;
          }
          .icon {
            position: relative;
            top: 5px;
          }
          .footer_text {
            text-align: center;
            font-size: 1rem;
            font-family: "Roboto";
            font-weight: 400;
            line-height: 1.5;
          }
          .custom_link {
            text-decoration: underline;
            color: rgb(0, 0, 255);
          }
        `}
      </style>
      <Container maxWidth="sm">
        <p className="footer_text">This Website is dedicated to Ron Lovers.</p>
        <p className="footer_text">
          Made with{" "}
          <span className="icon">
            <Icon color="error" fontSize="small">
              favorite
            </Icon>
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/divyanshusahu"
            target="_blank"
            rel="noopener noreferrer"
            className="custom_link"
          >
            Divyanshu
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
