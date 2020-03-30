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

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      {/*<div className="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="content">
          <h2>My animated Border </h2>
        </div>
      </div>
      <style jsx>
        {`
          .box {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: #111845a6;
            box-sizing: border-box;
            overflow: hidden;
            box-shadow: 0 20px 50px rgb(23, 32, 90);
            color: white;
            padding: 20px;
          }

          .box:before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            transition: 0.5s;
            pointer-events: none;
          }

          .box:hover:before {
            left: -50%;
            transform: skewX(-5deg);
          }

          .box .content {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 1px solid #f0a591;
            padding: 20px;
            text-align: center;
            box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
          }

          .box span {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;
            box-sizing: border-box;
          }

          .box span:nth-child(1) {
            transform: rotate(0deg);
          }

          .box span:nth-child(2) {
            transform: rotate(90deg);
          }

          .box span:nth-child(3) {
            transform: rotate(180deg);
          }

          .box span:nth-child(4) {
            transform: rotate(270deg);
          }

          .box span:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background: #50dfdb;
            animation: animate 4s linear infinite;
          }

          @keyframes animate {
            0% {
              transform: scaleX(0);
              transform-origin: left;
            }
            50% {
              transform: scaleX(1);
              transform-origin: left;
            }
            50.1% {
              transform: scaleX(1);
              transform-origin: right;
            }

            100% {
              transform: scaleX(0);
              transform-origin: right;
            }
          }
        `}
        </style>*/}
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
            width: 300px;
            height: 100px;
            margin: auto;
            box-shadow: inset 0 0 0 1px rgba(240, 240, 240, 0.8);
            color: rgba(255, 255, 255, 1);
          }
          .heading, .heading::before, .heading::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .heading::before, .heading::after {
            content: "";
            z-index: 1;
            margin: -3%;
            box-shadow: inset 0 0 0 2px;
            animation: clipMe 8s linear infinite;
          }
          .heading::before {
            animation-delay: -4s;
         }
          @keyframes clipMe {
            0%, 100% {
              clip: rect(0px, 318px, 2px, 0px);
           }
            25% {
              clip: rect(0px, 2px, 118px, 0px);
           }
            50% {
              clip: rect(116px, 318px, 118px, 0px);
           }
            75% {
              clip: rect(0px, 318px, 118px, 316px);
           }
         }
        `}
      </style>
    </div>
  );
}

export default HeroHeading;
