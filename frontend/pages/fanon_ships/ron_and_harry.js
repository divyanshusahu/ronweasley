import Link from "next/link";
import { useRouter } from "next/router";

import fetch from "isomorphic-unfetch";

import { Button } from "antd";

import Layout from "../../components/Layout";
import postTabHook from "../../hooks/postTabHook";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function RonAndHarry(props) {
  const router = useRouter();
  const tab_search_list = [
    { key: "1", tab: "appreciation" },
    { key: "2", tab: "fanart" },
  ];

  const [selectedTab, setSelectedTab] = React.useState("appreciation");
  const [activeTabKey, setActiveTabKey] = React.useState("1");

  React.useEffect(() => {
    const result = postTabHook(tab_search_list, props.query);
    if (result.result === -1) {
      setSelectedTab("appreciation");
      return;
    } else if (result.result === -2) {
      router.replace(router.pathname);
      setSelectedTab("appreciation");
      return;
    } else if (result.result === -3) {
      router.replace(router.pathname + "?tab=appreciation");
      setSelectedTab("appreciation");
      return;
    } else {
      setSelectedTab(result.tab);
      setActiveTabKey(result.key);
    }
  }, []);

  const [posts, getPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/get_post/ron_and_harry_" + selectedTab)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          getPosts(data.posts);
        }
      });
  }, [selectedTab]);

  const tabList = [
    {
      key: "1",
      tab: (
        <Link href="?tab=appreciation" scroll={false}>
          <a
            style={{
              color: activeTabKey == 1 ? "inherit" : "rgba(0,0,0,0.65)",
            }}
          >
            Appreciation
          </a>
        </Link>
      ),
    },
    {
      key: "2",
      tab: (
        <Link href="?tab=fanart" scroll={false}>
          <a
            style={{
              color: activeTabKey == 2 ? "inherit" : "rgba(0,0,0,0.65)",
            }}
          >
            Fanart
          </a>
        </Link>
      ),
    },
  ];

  const handleOnTabChange = (key) => {
    setActiveTabKey(key);
    getPosts([]);
    if (key === "1") {
      setSelectedTab("appreciation");
    } else if (key === "2") {
      setSelectedTab("fanart");
    }
  };

  const tabBarExtraContent = (
    <Link
      href="/new_post/[post_type]"
      as={`/new_post/ron_and_harry_${selectedTab}`}
    >
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <div>
      <Layout
        title="Ron-Harry"
        main_heading="Ron-Harry"
        about_heading="Harry, you’ve got to come and stay with us. 
        I’ll fix it up with Mum and Dad, then I’ll call you. I know how to use a fellytone now."
        landscape="/ron_and_harry/landscape.jpg"
        portrait="/ron_and_harry/portrait.jpg"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={handleOnTabChange}
        tabBarExtraContent={tabBarExtraContent}
        posts={posts}
        type={selectedTab}
      />
    </div>
  );
}

RonAndHarry.getInitialProps = ({ query }) => {
  return { query: query };
};

export default RonAndHarry;
