import Link from "next/link";
import { useRouter } from "next/router";

import fetch from "isomorphic-unfetch";

import { Button } from "antd";

import Layout from "../components/Layout";
import postTabHook from "../hooks/postTabHook";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Romione(props) {
  const router = useRouter();
  const tab_search_list = [
    { key: "1", tab: "appreciation" },
    { key: "2", tab: "fanart" }
  ];

  const [selectedTab, setSelectedTab] = React.useState(null);
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
    getPosts([]);
    if (!selectedTab) return;

    fetch(BASE_URL + "/get_post/romione_" + selectedTab)
      .then(r => r.json())
      .then(data => {
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
              color: activeTabKey == 1 ? "inherit" : "rgba(0,0,0,0.65)"
            }}
          >
            Appreciation
          </a>
        </Link>
      )
    },
    {
      key: "2",
      tab: (
        <Link href="?tab=fanart" scroll={false}>
          <a
            style={{
              color: activeTabKey == 2 ? "inherit" : "rgba(0,0,0,0.65)"
            }}
          >
            Fanart
          </a>
        </Link>
      )
    }
  ];

  const handleOnTabChange = key => {
    setActiveTabKey(key);
    if (key === "1") {
      setSelectedTab("appreciation");
    } else if (key === "2") {
      setSelectedTab("fanart");
    }
  };

  const tabBarExtraContent = (
    <Link href="/new_post/[post_type]" as={`/new_post/romione_${selectedTab}`}>
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <Layout
      title="Romione"
      main_heading="Romione"
      about_heading="'No' said Ron seriously, 'I mean we should tell them to get out. We dont want anymore Dobbys, do we? 
      We can't order them to die for us -'"
      landscape="/romione/landscape.jpg"
      portrait="/romione/portrait.jpg"
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={handleOnTabChange}
      tabBarExtraContent={tabBarExtraContent}
      posts={posts}
      type={selectedTab}
    />
  );
}

Romione.getInitialProps = async ({ query }) => {
  return { query: query };
};

export default Romione;
