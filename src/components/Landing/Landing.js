import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Landing() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            A website dedicated to the most selfless HP character.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Landing;
