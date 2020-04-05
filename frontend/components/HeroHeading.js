import { motion } from "framer-motion";

function HeroHeading(props) {
  let heading_text = props.heading_text;
  const variants = {
    initial: { y: 30, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.25 } },
  };
  let character_array = heading_text.split("");
  const framer_spans = character_array.map((c, i) => (
    <motion.span
      key={i}
      variants={variants}
      style={{
        fontFamily: "Karla",
        fontSize: "48px",
        fontWeight: "700",
        color: "#fff",
        display: c === " " ? "inline" : "inline-block",
      }}
    >
      {c}
    </motion.span>
  ));

  return (
    <div>
      <div className="box">
        <div className="content">
          <motion.div
            initial="initial"
            animate="enter"
            variants={{ enter: { transition: { staggerChildren: 0.1 } } }}
          >
            <div className="heading">{framer_spans}</div>
            <div style={{ padding: "0 16px" }}>
              <motion.p
                style={{
                  margin: "32px 0 0 0",
                  color: "rgba(250, 250, 250, 0.95)",
                  fontSize: "20px",
                  fontFamily: "Karla",
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
          .heading {
            margin: auto;
            width: fit-content;
            padding: 0px 16px;
            border-bottom: 4px solid rgba(228, 228, 228, 1);
          }
        `}
      </style>
    </div>
  );
}

export default HeroHeading;
