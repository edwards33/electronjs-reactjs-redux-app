import React, { Component } from "react";
import { connect } from "react-redux";
import Category from "./components/category";
import Movie from "./components/movie";
import Player from "./components/player";
import "./App.css";
import { Grid } from 'semantic-ui-react';

class App extends Component {
  render() {
    if (this.props.movie.selectedMovie) return <Player />;
    return (
      <Grid className="App HomeScreen">
          <Grid.Row>
              <Grid.Column color='green' width={4}>
                  <Category />
              </Grid.Column>
              <Grid.Column color='teal' width={12}>
                  <Movie />
              </Grid.Column>
          </Grid.Row>
      </Grid>
    );
  }
}

const mapToStateToProps = state => {
  return {
    movie: state.movie
  };
};

export default connect(mapToStateToProps)(App);
