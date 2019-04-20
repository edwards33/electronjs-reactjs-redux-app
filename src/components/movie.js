import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as movieActions from "../actions/movie";
import { Header, Card, Grid, Button } from 'semantic-ui-react';

class Movie extends Component {
  renderPagination() {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={13}>
                    <Button
                        floated='left'
                        disabled={this.props.page === 1}
                        onClick={() => {
                            this.props.startFetchingMovies();
                            this.props.getMovies(
                                this.props.selected_category,
                                this.props.page - 1
                            );
                        }}
                    >
                        BACK
                    </Button>
                    <Button
                        floated='right'
                        disabled={this.props.page === this.props.maxPage}
                        onClick={() => {
                            this.props.startFetchingMovies();
                            this.props.getMovies(
                                this.props.selected_category,
                                this.props.page + 1
                            );
                        }}
                    >
                        FORWARD
                    </Button>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
        </Grid>

    );
  }

  renderMovieItem(item, i) {
    return (
      <Card
          onClick={() =>
              this.props.selectMovie(
                  `${this.props.CATEGORY_FOLDER}/video/${item.replace(
                      "jpg",
                      "mp4"
                  )}`
              )
          }
          image={`${this.props.CATEGORY_FOLDER}/image/${item}`}
          header={item.replace(".jpg", "")}
      />
    );
  }
  renderMovies() {
    if (this.props.loading)
      return (
        <div className="col-md-2 col-md-offset-5">
          <BounceLoader />
        </div>
      );
    else if (!this.props.movies && this.props.selected_category === null)
      return (
        <div>
           <Header as='h2' textAlign='left' image='http://freevector.co/wp-content/uploads/2009/01/83820-horizontal-film-strip.png' content='Select a Category' />
        </div>
      );
    else if (!this.props.movies)
      return (
          <div>
              <Header as='h2' textAlign='left' image='http://freevector.co/wp-content/uploads/2009/01/83820-horizontal-film-strip.png' content='No movies' />
          </div>
      );
    return (
      <div>
        <div>
            <Header as='h2' textAlign='left' image='http://freevector.co/wp-content/uploads/2009/01/83820-horizontal-film-strip.png' content='Movies' />
        </div>
        <Card.Group>
          {this.props.movies.map((item, i) => this.renderMovieItem(item, i))}
        </Card.Group>
        <div>{this.renderPagination()}</div>
      </div>
    );
  }

  render() {
    return <div>{this.renderMovies()}</div>;
  }
}

const mapStateToProps = ({ category, movie }) => {
  return {
    ...category,
    ...movie
  };
};

export default connect(
  mapStateToProps,
  movieActions
)(Movie);
