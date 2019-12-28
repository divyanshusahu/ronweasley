import Link from "next/link";

import { Button } from "antd";

import Layout from "../components/Layout";
import DisplayPosts from "../components/DisplayPosts";

function Index() {
  const [display, setDisplay] = React.useState(
    <DisplayPosts post_type="ron_weasley_appreciation" />
  );
  const [selectedTab, setSelectedTab] = React.useState("appreciation");

  const tabList = [
    { key: "1", tab: "Appreciation" },
    { key: "2", tab: "Defense" },
    { key: "3", tab: "Fanart" },
    { key: "4", tab: "Fanfiction" }
  ];

  const [activeTabKey, setActiveTabKey] = React.useState("1");
  const handleOnTabChange = key => {
    setActiveTabKey(key);
    if (key === "1") {
      setSelectedTab("appreciation");
      setDisplay(<DisplayPosts post_type="ron_weasley_appreciation" />);
    } else if (key === "2") {
      setSelectedTab("defense");
      setDisplay(<DisplayPosts post_type="ron_weasley_defense" />);
    } else if (key === "3") {
      setSelectedTab("fanart");
    } else if (key === "4") {
      setSelectedTab("fanfiction");
    }
  };

  const tabBarExtraContent = (
    <Link href="/new_post/[type]" as={`new_post/ron_weasley_${selectedTab}`}>
      <a>
        <Button>New</Button>
      </a>
    </Link>
  );

  return (
    <Layout
      title="Ron Weasley"
      main_heading="A Website dedicated to the most selfless Harry Potter Character."
      about_heading="Some lines best describing Ron."
      landscape="/ron_weasley/landscape.jpg"
      portrait="/ron_weasley/portrait.jpg"
      tabList={tabList}
      display={display}
      activeTabKey={activeTabKey}
      onTabChange={handleOnTabChange}
      tabBarExtraContent={tabBarExtraContent}
    />
  );
}

export default Index;
