import React, { Component } from 'react';

import BareGoogleMap from './BareGoogleMap';
import { url } from '../../googleMaps';

class GoogleMap extends Component {
  onBoundsChanged = () => {
    this.props.onBoundChange({
      center: this.map.getCenter(),
      map: this.map,
    });
  }

  render() {
    return (
      <BareGoogleMap
        googleMapURL={url}
        loadingElement={<div style={{ height: `100%` }}/>}
        containerElement={<div style={{ height: `500px` }}/>}
        mapElement={<div style={{ height: `100%` }}/>}
        onMapMounted={ref => this.map = ref}
        onBoundsChanged={this.onBoundsChanged}
        center={this.props.center}
        clickableIcons={true}
      >
        {this.props.children}
      </BareGoogleMap>
    )
  }
}

export default GoogleMap;