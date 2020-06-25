import { motion, AnimatePresence } from "framer-motion";

function WallCarousel(props) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % props.walls);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <picture>
            <source srcSet={`${props.src}/${index}.webp`} type="image/webp" />
            <source srcSet={`${props.src}/${index}.png`} type="image/png" />
            <img
              alt={props.alt}
              src={`${props.src}/${index}.png`}
              className="hero_wall"
            />
          </picture>
        </motion.div>
      </AnimatePresence>
      <style jsx>
        {`
          .hero_wall {
            width: 360px;
            max-width: 100%;
            height: auto;
          }
          @media only screen and (max-width: 1199px) {
            .hero_wall {
              width: 300px;
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default WallCarousel;
