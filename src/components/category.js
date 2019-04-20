import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as categoryActions from "../actions/category";
import * as movieActions from "../actions/movie";
import { Header, Segment, Grid } from 'semantic-ui-react';

class Category extends Component {
  componentDidMount() {
    this.props.startFetchingCategories();
    this.props.getCategories();
  }

  renderCategories() {
    if (this.props.loading)
      return (
        <div className="col-md-8 col-md-offset-4">
          <BounceLoader />
        </div>
      );

    return (
      <div>
        <Header as='h2' textAlign='center' image='https://catalog.suu.edu/mime/media/14/1998/icon-courses.png' content='Categories' />
        <Grid>

          {this.props.categories.map((item, i) => (
            <Grid.Row>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={13}>
                <Segment
                  style={{cursor: 'pointer'}}
                  key={i}
                  inverted
                  color={this.props.selected_category === i ? 'violet' : 'blue'}
                  onClick={() => {
                    this.props.selectCategory(i);
                    this.props.startFetchingMovies();
                    this.props.getMovies(i, 1);
                  }}
                >
                  <Header as='h4' content={item} textAlign='center' />
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }

  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

const mapStateToProps = ({ category }) => {
  return category;
};

export default connect(
  mapStateToProps,
  {
    ...categoryActions,
    ...movieActions
  }
)(Category);
