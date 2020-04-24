import Link from "next/link";
import { useRouter } from "next/router";

import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";

import { Button } from "antd";

import Layout from "../../components/Layout";
import postTabHook from "../../hooks/postTabHook";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function WeasleyFamily(props) {
  const router = useRouter();
  const tab_search_list = [
    { key: "1", tab: "appreciation" },
    { key: "2", tab: "fanart" },
  ];

  const [selectedTab, setSelectedTab] = React.useState("appreciation");
  const [activeTabKey, setActiveTabKey] = React.useState("1");
  const [loading, setLoading] = React.useState(true);

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
  const [filteredPosts, setFilteredPosts] = React.useState([]);

  React.useEffect(() => {
    if (!selectedTab) return;

    setLoading(true);
    fetch(BASE_URL + "/get_post/weasley_family_" + selectedTab)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          getPosts(data.posts);
          setFilteredPosts(data.posts);
        }
        setLoading(false);
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
    setFilteredPosts([]);
    setSearchField("");
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

  const [searchField, setSearchField] = React.useState("");

  React.useEffect(() => {
    const filter_function = (x) => {
      let post_title = x["post_title"]["S"].toLowerCase();
      let post_author = x["post_author"]["S"].toLowerCase();
      let post_summary = isEmpty(x["post_summary"])
        ? ""
        : x["post_summary"]["S"].toLowerCase();
      let post_description = isEmpty(x["post_description"])
        ? ""
        : x["post_description"]["S"].toLowerCase();
      let search = searchField.toLowerCase();
      if (search === "") {
        return true;
      }
      return (
        post_title.indexOf(search) >= 0 ||
        post_author.indexOf(search) >= 0 ||
        post_summary.indexOf(search) >= 0 ||
        post_description.indexOf(search) >= 0
      );
    };
    setFilteredPosts(posts.filter(filter_function));
  }, [searchField]);

  return (
    <div>
      <Layout
        title="Weasley Family"
        main_heading="Weasley Family"
        about_heading="The Weasleys were Harry’s favorite family in the world."
        landscape="/weasley_family/landscape.jpg"
        portrait="/weasley_family/portrait.jpg"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={handleOnTabChange}
        tabBarExtraContent={tabBarExtraContent}
        posts={filteredPosts}
        type={selectedTab}
        loading={loading}
        searchbar={(value) => setSearchField(value)}
        searchvalue={searchField}
      />
    </div>
  );
}

WeasleyFamily.getInitialProps = ({ query }) => {
  return { query: query };
};

export default WeasleyFamily;
