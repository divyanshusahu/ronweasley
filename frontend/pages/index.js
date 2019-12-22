import Link from "next/link";

import Hidden from "@material-ui/core/Hidden";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import Layout from "../utils/Layout";
import DisplayPosts from "../utils/DisplayPosts";

function Index() {
  const [display, setDisplay] = React.useState(
    <DisplayPosts post_type="ron_weasley_appreciation" />
  );
  const [selectedTab, setSelectedTab] = React.useState("appreciation");
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
    if (value === 0) {
      setSelectedTab("appreciation");
      setDisplay(<DisplayPosts post_type="ron_weasley_appreciation" />);
    } else if (value === 1) {
      setSelectedTab("defense");
      setDisplay(<DisplayPosts post_type="ron_weasley_defense" />);
    } else if (value === 2) {
      setSelectedTab("fanart");
      setDisplay(null);
    } else if (value === 3) {
      setSelectedTab("fanfiction");
      setDisplay(null);
    }
  };
  const handleSelectTabChange = event => {
    setTabValue(event.target.value);
    if (event.target.value === 0) {
      setSelectedTab("appreciation");
      setDisplay(<DisplayPosts post_type="ron_weasley_appreciation" />);
    } else if (event.target.value === 1) {
      setSelectedTab("defense");
      setDisplay(<DisplayPosts post_type="ron_weasley_defense" />);
    } else if (event.target.value === 2) {
      setSelectedTab("fanart");
    } else if (event.target.value === 3) {
      setSelectedTab("fanfiction");
    }
  };

  return (
    <Layout
      title="Ron Weasley"
      main_heading="A Website dedicated to the most selfless Harry Potter Character."
      about_heading="Some lines best describing Ron."
      landscape="https://i.imgur.com/FS2A8uM.jpg"
      portrait="https://i.imgur.com/kfXav0X.jpg"
      display={display}
    >
      <div>
        <Hidden smDown>
          <Tabs
            value={tab_value}
            onChange={tab_handlechange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Appreciation"></Tab>
            <Tab label="Defense"></Tab>
            <Tab label="Fanart"></Tab>
            <Tab label="Fanfiction"></Tab>
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <FormControl variant="outlined">
            <Select value={tab_value} onChange={handleSelectTabChange}>
              <MenuItem value={0}>Appreciation</MenuItem>
              <MenuItem value={1}>Defense</MenuItem>
              <MenuItem value={2}>Fanart</MenuItem>
              <MenuItem value={3}>Fanfiction</MenuItem>
            </Select>
          </FormControl>
        </Hidden>
      </div>
      <div>
        {tab_value === 0 || tab_value === 1 ? (
          <Link
            href="/new_post/[type]"
            as={`new_post/ron_weasley_${selectedTab}`}
          >
            <a>
              <Button variant="outlined">NEW POST</Button>
            </a>
          </Link>
        ) : (
          <Button variant="outlined">NEW POST</Button>
        )}
      </div>
    </Layout>
  );
}

export default Index;
