import React, { Component } from 'react';
import { Navbar, Grid } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar inverse>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              Locations Link
            </Navbar.Brand>
          </Navbar.Header>
        </Grid>
      </Navbar>
    );
  }
}

export default Navigation;