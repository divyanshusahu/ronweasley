import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import SecondaryLayout from "../utils/SecondaryLayout";

function Suggestions() {
  return (
    <div>
      <SecondaryLayout title="Suggestions">
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
                    avatar={<Icon>announcement</Icon>}
                  />
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
                        <ListItemText primary="Better Text Editor UI/UX and performance. Support for more rich styling." />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>build</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Improve display post cards UI." />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className="user_feedbacks">
            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Card raised>
                  <CardHeader
                    title={
                      <Typography variant="h5" component="p">
                        Help Needed
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
                  />
                  <CardContent>
                    <div className="card_content"></div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card raised>
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
                  />
                  <CardContent>
                    <div className="card_content"></div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card raised>
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
                        Every suggestions to improve the user experience or to
                        add new feature is welcomed.
                      </Typography>
                    }
                  />
                  <CardContent>
                    <div className="card_content"></div>
                  </CardContent>
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
            max-height: 25vh;
            height: 25vh;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

export default Suggestions;
