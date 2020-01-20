import Link from "next/link";

import fetch from "isomorphic-unfetch";

import { Button } from "antd";

import Layout from "../../components/Layout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function RonAndLavender() {
  const [selectedTab, setSelectedTab] = React.useState("appreciation");

  const [posts, getPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/get_post/ron_and_lavender_" + selectedTab)
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
    <Link
      href="/new_post/[post_type]"
      as={`/new_post/ron_and_lavender_${selectedTab}`}
    >
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <div>
      <Layout
        title="Ron-Lavender"
        main_heading="First relationship of Ron."
        about_heading="Some lines best describing ron-lavender."
        landscape=""
        portrait=""
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

export default RonAndLavender;
