import React, { Component } from 'react';

import GoogleMapsSearchBox from './GoogleMapsSearchBox';
import { url } from '../../googleMaps';

class SearchBox extends Component {
  onPlacesChanged = () => {
    const place = this.searchBox.getPlaces();

    this.props.onPlaceChange(place[0], this.props.number);
  }

  render() {
    return (
      <div>
        <GoogleMapsSearchBox
          googleMapURL={url}
          loadingElement={<div style={{ height: `100%` }}/>}
          containerElement={<div style={{ height: `400px` }}/>}
          onSearchBoxMounted={ref => this.searchBox = ref}
          onPlacesChanged={this.onPlacesChanged}
        />
      </div>
    )
  }
}

export default SearchBox;
