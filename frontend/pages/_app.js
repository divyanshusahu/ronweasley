import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import "antd/dist/antd.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
