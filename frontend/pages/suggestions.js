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
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import SecondaryLayout from "../utils/SecondaryLayout";

function Suggestions() {
  return (
    <div>
      <SecondaryLayout title="Suggestions">
        <Container maxWidth="xl">
          <div className="work_in_progress">
            <Grid container spacing={8}>
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
                    <CardContent></CardContent>
                  </div>
                  <CardActions>
                    <div className="card_action">
                      <InputBase
                        size="small"
                        multiline
                        rowsMax={2}
                        placeholder="Type your suggestion here"
                        style={{ flex: 1 }}
                      />
                      <Divider
                        orientation="vertical"
                        style={{ height: 40, margin: 4 }}
                      />
                      <IconButton title="Send">
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
                    <CardContent></CardContent>
                  </div>
                  <CardActions>
                    <div className="card_action">
                      <InputBase
                        size="small"
                        multiline
                        rowsMax={2}
                        placeholder="Type your review here"
                        style={{ flex: 1 }}
                      />
                      <Divider
                        orientation="vertical"
                        style={{ height: 40, margin: 4 }}
                      />
                      <IconButton title="Send">
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
