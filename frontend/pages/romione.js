import Link from "next/link";

import { Button } from "antd";

import Layout from "../components/Layout";
import DisplayPosts from "../components/DisplayPosts";

function Index() {
  const [display, setDisplay] = React.useState(
    <DisplayPosts post_type="romione_appreciation" />
  );
  const [selectedTab, setSelectedTab] = React.useState("appreciation");

  const tabList = [
    { key: "1", tab: "Appreciation" },
    { key: "2", tab: "Fanart" },
    { key: "3", tab: "Fanfiction" }
  ];

  const [activeTabKey, setActiveTabKey] = React.useState("1");
  const handleOnTabChange = key => {
    setActiveTabKey(key);
    if (key === "1") {
      setSelectedTab("appreciation");
      setDisplay(<DisplayPosts post_type="romione_appreciation" />);
    } else if (key === "2") {
      setSelectedTab("fanart");
    } else if (key === "3") {
      setSelectedTab("fanfiction");
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
      landscape="https://i.imgur.com/5XFq6a3.jpg"
      portrait="https://i.imgur.com/AKuRxbB.jpg"
      tabList={tabList}
      display={display}
      activeTabKey={activeTabKey}
      onTabChange={handleOnTabChange}
      tabBarExtraContent={tabBarExtraContent}
    />
  );
}

export default Index;
