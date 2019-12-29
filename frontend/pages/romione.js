import Link from "next/link";

import fetch from "isomorphic-unfetch";

import { Button } from "antd";

import Layout from "../components/Layout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Romione() {
  const [selectedTab, setSelectedTab] = React.useState("appreciation");

  const [posts, getPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/get/romione_" + selectedTab)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          getPosts(data.posts);
        }
      });
  }, [selectedTab]);

  const tabList = [
    { key: "1", tab: "Appreciation" },
    { key: "2", tab: "Fanart" }
  ];

  const [activeTabKey, setActiveTabKey] = React.useState("1");
  const handleOnTabChange = key => {
    setActiveTabKey(key);
    if (key === "1") {
      setSelectedTab("appreciation");
    } else if (key === "2") {
      setSelectedTab("fanart");
    }
  };

  const tabBarExtraContent = (
    <Link href="/new_post/[type]" as={`new_post/romione_${selectedTab}`}>
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <Layout
      title="Romione"
      main_heading="Most Celebrated Harry Potter canon couple."
      about_heading="Some lines best describing Romione."
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

export default Romione;
