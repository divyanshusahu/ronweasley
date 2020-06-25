import Link from "next/link";
import { useRouter } from "next/router";

import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";
import queryString from "query-string";

import Layout from "../../components/Layout";
import postTabHook from "../../hooks/postTabHook";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function GoldenTrio() {
  const router = useRouter();
  const { query } = queryString.parseUrl(router.asPath);
  const tab_search_list = [
    { key: "1", tab: "appreciation" },
    { key: "2", tab: "fanart" },
  ];

  const [selectedTab, setSelectedTab] = React.useState(null);
  const [activeTabKey, setActiveTabKey] = React.useState("1");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const result = postTabHook(tab_search_list, query);
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
    fetch(BASE_URL + "/get_post/golden_trio_" + selectedTab)
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
              padding: "19px 0",
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
              padding: "19px 0",
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
    <div className="add_post">
      <Link
        href="/new_post/[post_type]"
        as={
          selectedTab
            ? `/new_post/golden_trio_${selectedTab}`
            : "/new_post/golden_trio_appreciation"
        }
      >
        <a
          className="ant-btn ant-btn-round ant-btn-lg"
          style={{ lineHeight: "25px" }}
        >
          Add Post
        </a>
      </Link>
    </div>
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

  const page = isEmpty(query.page) ? 1 : query.page;

  return (
    <div>
      <Layout
        title="Golden Trio: Appreciation and Fanarts"
        main_heading="GOLDEN TRIO"
        about_heading="There are some things you can't share without ending up liking each other,
         and knocking out a twelve-foot mountain troll is one of them."
        meta_description="A website to celebrate the friendship between Harry Potter, Ron Weasley,
        and Hermione Granger from the Harry Potter series. Find appreciation posts along with beautiful fan arts."
        wall_alt="Golden Trio Wall"
        wall_src="/assets/golden_trio"
        wall_items={15}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={handleOnTabChange}
        tabBarExtraContent={tabBarExtraContent}
        posts={filteredPosts}
        addPostLink="golden_trio"
        type={selectedTab}
        loading={loading}
        searchbar={(value) => setSearchField(value)}
        searchvalue={searchField}
        paginationpage={page}
      />
      <style jsx global>
        {`
          @media only screen and (max-width: 575px) {
            .add_post {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default GoldenTrio;
