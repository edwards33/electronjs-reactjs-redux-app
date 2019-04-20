import React, { Component } from "react";
import VideoPlayer from "./videoPlayer";
import { connect } from "react-redux";
import { closeMovie } from "../actions/movie";
import { Header, Segment, Grid, Divider, Button } from 'semantic-ui-react';

class Player extends Component {
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      fluid: true,
      nativeControlsForTouch: true,
      controlBar: {
        fullscreenToggle: false
      },
      sources: [
        {
          src: this.props.selectedMovie,
          type: "video/mp4"
        }
      ]
    };
    return (
      <div>
          <Segment >
              <Grid columns={2} stackable textAlign='left'>
                  <Divider vertical hidden/>
                  <Grid.Row color='green' verticalAlign='middle'>
                      <Grid.Column>
                          <Header as='h2' textAlign='left' image='http://freevector.co/wp-content/uploads/2009/01/83820-horizontal-film-strip.png' content='Movie Player' />
                      </Grid.Column>

                      <Grid.Column>
                          <Button
                              floated='right'
                              circular
                              icon='close'
                              onClick={() => this.props.closeMovie()}
                          />
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
        <Segment>
            <Grid stackable>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column width={2}>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <VideoPlayer {...videoJsOptions} />
                    </Grid.Column>

                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ movie }) => {
  return movie;
};

export default connect(
  mapStateToProps,
  { closeMovie }
)(Player);
