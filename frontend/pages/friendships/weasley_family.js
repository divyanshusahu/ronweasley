import Link from "next/link";

import fetch from "isomorphic-unfetch";

import { Button } from "antd";

import Layout from "../../components/Layout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function WeasleyFamily() {
  const [selectedTab, setSelectedTab] = React.useState("appreciation");

  const [posts, getPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/get_post/weasley_family_" + selectedTab)
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
      as={`/new_post/weasley_family_${selectedTab}`}
    >
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <div>
      <Layout
        title="Weasley Family"
        main_heading="Most beloved family of Harry Potter."
        about_heading="Some lines best describing weasley family."
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

export default WeasleyFamily;
