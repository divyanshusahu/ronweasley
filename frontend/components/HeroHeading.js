import Head from "next/head";

import { motion } from "framer-motion";

function HeroHeading(props) {
  let heading_text = props.heading_text;
  const variants = {
    initial: { y: 30, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.25 } }
  };
  let character_array = heading_text.split("");
  const framer_spans = character_array.map((c, i) => (
    <motion.span
      key={i}
      variants={variants}
      style={{
        fontFamily: "Oleo Script",
        fontSize: "3rem",
        color: "#fff",
        display: c === " " ? "inline" : "inline-block"
      }}
    >
      {c}
    </motion.span>
  ));

  const [animationDiv, setAnimationDiv] = React.useState({
    width: 0,
    height: 0
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let w = document.getElementsByClassName("heading")[0];
      let width = window.getComputedStyle(w, ":before").width;
      let height = window.getComputedStyle(w, ":before").height;
      setAnimationDiv({ width: width, height: height });
    }
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className="box">
        <div className="content">
          <motion.div
            initial="initial"
            animate="enter"
            variants={{ enter: { transition: { staggerChildren: 0.1 } } }}
          >
            <div className="heading_container">
              <div className="heading">{framer_spans}</div>
            </div>
            <div style={{ padding: "0 16px" }}>
              <motion.p
                style={{
                  margin: "32px 0 0 0",
                  color: "#dfdfdf",
                  fontSize: "1.2rem",
                  fontFamily: "Allerta"
                }}
                variants={variants}
              >
                {props.description_text}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>
        {`
          .box {
            padding: 4px;
          }
          .heading_container {
            position: relative;
            width: 100%;
            height: 100px;
          }
          .heading {
            width: fit-content;
            height: 75px;
            padding: 0 8px;
            margin: auto;
            box-shadow: inset 0 0 0 1px rgba(212, 212, 212, 0.5);
            color: #fff;
          }
          .heading,
          .heading::before,
          .heading::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .heading::before,
          .heading::after {
            content: "";
            z-index: 1;
            margin: -4%;
            box-shadow: inset 0 0 0 2px;
            animation: clipMe 8s linear infinite;
          }
          .heading::before {
            animation-delay: -4s;
          }
          @keyframes clipMe {
            0%,
            100% {
              clip: rect(0px, ${animationDiv.width}, 2px, 0px);
            }
            25% {
              clip: rect(0px, 2px, ${animationDiv.height}, 0px);
            }
            50% {
              clip: rect(
                ${parseFloat(animationDiv.height) - 2 + "px"},
                ${animationDiv.width},
                ${animationDiv.height},
                0px
              );
            }
            75% {
              clip: rect(
                0px,
                ${animationDiv.width},
                ${animationDiv.height},
                ${parseFloat(animationDiv.width) - 2 + "px"}
              );
            }
          }
        `}
      </style>
    </div>
  );
}

export default HeroHeading;
