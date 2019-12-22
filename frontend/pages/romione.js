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

function Romione() {
  const [display, setDisplay] = React.useState(
    <DisplayPosts post_type="romione_appreciation" />
  );
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
    if (value === 0) {
      setDisplay(<DisplayPosts post_type="romione_appreciation" />);
    } else if (value === 1) {
      setDisplay(null);
    } else if (value === 2) {
      setDisplay(null);
    }
  };
  const handleSelectTabChange = event => {
    setTabValue(event.target.value);
    if (event.target.value === 0) {
      setDisplay(<DisplayPosts post_type="romione_appreciation" />);
    } else if (event.target.value === 1) {
      setDisplay(null);
    } else if (event.target.value === 2) {
      setDisplay(null);
    }
  };

  return (
    <Layout
      title="Romione"
      main_heading="Most celebrated Harry Potter canon couples."
      about_heading="Some lines best describing Romione"
      landscape="https://i.imgur.com/5XFq6a3.jpg"
      portrait="https://i.imgur.com/AKuRxbB.jpg"
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
            <Tab label="Fanart"></Tab>
            <Tab label="Fanfiction"></Tab>
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <FormControl variant="outlined">
            <Select value={tab_value} onChange={handleSelectTabChange}>
              <MenuItem value={0}>Appreciation</MenuItem>
              <MenuItem value={2}>Fanart</MenuItem>
              <MenuItem value={3}>Fanfiction</MenuItem>
            </Select>
          </FormControl>
        </Hidden>
      </div>
      <div>
        {tab_value === 0 ? (
          <Link href="/new_post/[type]" as={`new_post/romione_appreciation`}>
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

export default Romione;
