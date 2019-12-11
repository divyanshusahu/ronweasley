import Head from "next/head";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

function Footer() {
  return (
    <footer>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ron Weasley" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <style jsx global>
        {`
          html {
            box-sizing: border-box;
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
            background-color: #eaeaea;
          }
          .icon {
            position: relative;
            top: 5px;
          }
        `}
      </style>
      <Container maxWidth="sm">
        <Typography variant="body1" component="p" align="center">
          Made with{" "}
          <Icon color="error" fontSize="small" className="icon">
            favorite
          </Icon>{" "}
          by{" "}
          <a
            href="https://github.com/divyanshusahu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Divyanshu
          </a>
          .
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
