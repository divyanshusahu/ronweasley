import fetch from "isomorphic-unfetch";
import { ToastContainer, toast } from "react-toastify";
import isEmpty from "is-empty";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import SecondaryLayout from "../components/SecondaryLayout";

function Suggestions() {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  const [suggestions, setSuggestions] = React.useState([]);
  const [feedbacks, setFeedbacks] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/suggestions/get/suggestion")
      .then(r => r.json())
      .then(data => {
        setSuggestions(data["posts"]);
      });
    fetch(BASE_URL + "/suggestions/get/feedback")
      .then(r => r.json())
      .then(data => {
        setFeedbacks(data["posts"]);
      });
  }, []);

  const updateSuggestions = type => {
    fetch(BASE_URL + "/suggestions/get/" + type)
      .then(r => r.json())
      .then(data => {
        if (type === "suggestion") {
          setSuggestions(data["posts"]);
        } else if (type === "feedback") {
          setFeedbacks(data["posts"]);
        }
      });
  };

  const [postResult, setPostResult] = React.useState(null);
  const handlePost = type => {
    let post_data = {
      post_type: type,
      content:
        type === "suggestion"
          ? document.getElementById("suggestion_text").value
          : document.getElementById("feedback_text").value
    };
    fetch(BASE_URL + "/suggestions/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        setPostResult(data);
      });
  };

  React.useEffect(() => {
    if (!isEmpty(postResult)) {
      if (postResult["success"]) {
        toast.success(postResult["message"]);
        document.getElementById("suggestion_text").value = "";
        document.getElementById("feedback_text").value = "";
        updateSuggestions("suggestion");
        updateSuggestions("feedback");
      } else {
        toast.error(postResult["message"]);
      }
    }
  }, [postResult]);

  return (
    <div>
      <SecondaryLayout title="Suggestions">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          draggable
        />
        <Container maxWidth="xl">
          <div className="work_in_progress">
            <Grid container>
              <Grid item xs={12} md={3}></Grid>
              <Grid item xs={12} md={6}>
                <Card raised>
                  <CardHeader
                    title={
                      <Typography component="p" variant="h5">
                        Work in progress
                      </Typography>
                    }
                    subheader={
                      <Typography
                        component="p"
                        variant="caption"
                        color="textSecondary"
                      >
                        Current issues the admin is working on.
                      </Typography>
                    }
                    avatar={<Icon>verified_user</Icon>}
                  />
                  <div className="card_content">
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>build</Icon>
                          </ListItemIcon>
                          <ListItemText primary="Archiving Stories from old websites such as checkmated.com" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>build</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary="Better Text Editor UI/UX and performance.
                          Support for more rich styling."
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>build</Icon>
                          </ListItemIcon>
                          <ListItemText primary="Improve display post cards UI." />
                        </ListItem>
                      </List>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className="user_feedbacks">
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Card raised style={{ height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="h5" component="p" color="secondary">
                        Help Needed
                      </Typography>
                    }
                    subheader={
                      <Typography
                        component="p"
                        variant="caption"
                        color="textSecondary"
                      >
                        Admin needed user suggestions in below issues.
                      </Typography>
                    }
                    avatar={<Icon>add_alert</Icon>}
                  />
                  <div className="card_content">
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>edit</Icon>
                          </ListItemIcon>
                          <ListItemText primary="Android, IOS app?" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>edit</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary="All post added immediately with option to be reviewed
                          by admin later if reported. Second option, all posts will be accepted only after
                          admin review."
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>edit</Icon>
                          </ListItemIcon>
                          <ListItemText primary="Pagination or infinite scroll?" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Icon>edit</Icon>
                          </ListItemIcon>
                          <ListItemText primary="Fanfiction support?" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </div>
                  <CardActions>
                    <div className="card_action">
                      <IconButton>
                        <Icon>link</Icon>
                      </IconButton>
                      <Divider
                        orientation="vertical"
                        style={{ height: 40, margin: 4 }}
                      />
                      <InputBase
                        value="Google Form url"
                        readOnly
                        style={{ flex: 1 }}
                      />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card raised style={{ height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="h5" component="p">
                        Suggestions
                      </Typography>
                    }
                    subheader={
                      <Typography
                        component="p"
                        variant="caption"
                        color="textSecondary"
                      >
                        Every suggestions to improve the user experience or to
                        add new feature is welcomed.
                      </Typography>
                    }
                    avatar={<Icon>live_help</Icon>}
                  />
                  <div className="card_content">
                    <CardContent>
                      {suggestions.map((sug, index) => (
                        <ExpansionPanel
                          key={index}
                          style={{ backgroundColor: "#f5f5f5" }}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<Icon>expand_more</Icon>}
                          >
                            <Typography component="p" variant="body1">
                              {isEmpty(sug.content) ? "" : sug.content.S}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography
                              component="p"
                              variant="caption"
                              color="textSecondary"
                            >
                              {isEmpty(sug.reply)
                                ? "Admin will replay soon"
                                : sug.reply.S}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      ))}
                    </CardContent>
                  </div>
                  <CardActions>
                    <div className="card_action">
                      <InputBase
                        size="small"
                        multiline
                        rowsMax={2}
                        placeholder="Type your suggestion here"
                        style={{ flex: 1 }}
                        id="suggestion_text"
                      />
                      <Divider
                        orientation="vertical"
                        style={{ height: 40, margin: 4 }}
                      />
                      <IconButton
                        title="Send"
                        onClick={() => handlePost("suggestion")}
                      >
                        <Icon>send</Icon>
                      </IconButton>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card raised style={{ height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="h5" component="p">
                        Feedbacks
                      </Typography>
                    }
                    subheader={
                      <Typography
                        component="p"
                        variant="caption"
                        color="textSecondary"
                      >
                        Like it? Hate it? Please leave a review.
                      </Typography>
                    }
                    avatar={<Icon>feedback</Icon>}
                  />
                  <div className="card_content">
                    <CardContent>
                      {feedbacks.map((fed, index) => (
                        <ExpansionPanel
                          key={index}
                          style={{ backgroundColor: "#f5f5f5" }}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<Icon>expand_more</Icon>}
                          >
                            <Typography component="p" variant="body1">
                              {isEmpty(fed.content) ? "" : fed.content.S}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography
                              component="p"
                              variant="caption"
                              color="textSecondary"
                            >
                              {isEmpty(fed.reply)
                                ? "Admin will replay soon"
                                : fed.reply.S}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      ))}
                    </CardContent>
                  </div>
                  <CardActions>
                    <div className="card_action">
                      <InputBase
                        size="small"
                        multiline
                        rowsMax={2}
                        placeholder="Type your review here"
                        style={{ flex: 1 }}
                        id="feedback_text"
                      />
                      <Divider
                        orientation="vertical"
                        style={{ height: 40, margin: 4 }}
                      />
                      <IconButton
                        title="Send"
                        onClick={() => handlePost("feedback")}
                      >
                        <Icon>send</Icon>
                      </IconButton>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      </SecondaryLayout>
      <style jsx>
        {`
          .work_in_progress,
          .user_feedbacks {
            margin-top: 40px;
            margin-bottom: 40px;
          }
          .card_content {
            max-height: 300px;
            height: 300px;
            overflow: auto;
          }
          .card_action {
            width: 100%;
            display: flex;
            padding: 4px;
            align-items: center;
            background-color: #f5f5f5;
          }
        `}
      </style>
    </div>
  );
}

export default Suggestions;
