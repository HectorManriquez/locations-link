/* global google */
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import './App.css';
import Navigation from './Navigation/Navigation';
import SearchBox from './SearchBox/SearchBox';
import GoogleMap from './GoogleMap/GoogleMap';
import { Marker, DirectionsRenderer } from 'react-google-maps';
import { url } from '../googleMaps';

function boundsAdd(place, boundsObject) {
  const { geometry: { location, viewport } } = place;
  viewport ? boundsObject.union(viewport) : boundsObject.extend(location);
  Promise.resolve();
}

// function directionsDisplay(directions) {
//   const { distance, duration } = directions.routes[0].legs[0];
//
//   return (
//     <div>
//       {`Duration: ${duration.text}`}
//       <br/>
//       {`Distance: ${distance.text}`}
//     </div>
//   )
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place1: null,
      place2: null,
      marker1: null,
      marker2: null,
      center: {
        lat: 30.267153,
        lng: -97.74306079999997
      },
      directions: null,
    }
  }

  onPlaceChange = (place, number) => {
    const { geometry: { location } } = place;

    this.setState({
      ['place' + number]: place,
      ['marker' + number]: {
        lat: location.lat(),
        lng: location.lng(),
      },
      center: location,
    }, async () => {
      if (this.state.place1 && this.state.place2) {
        const bounds = new google.maps.LatLngBounds();
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: new google.maps.LatLng(this.state.marker1),
          destination: new google.maps.LatLng(this.state.marker2),
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });

        await boundsAdd(this.state.place1, bounds);
        await boundsAdd(this.state.place2, bounds);

        this.map.fitBounds(bounds);
      }
    });
  }

  onBoundsChanged = () => {
    this.setState({
      center: this.map.getCenter(),
    });
  }

  onMarker1Changed = () => {
    // console.log(this.marker1);
  }

  onMarker2Changed = () => {
    // console.log(this.marker2);
  }

  onDirectionsChanged = () => {
    console.log(this.directions.getPanel());
    this.setState({
      directions: this.directions.getDirections(),
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation/>
        <SearchBox
          onPlaceChange={this.onPlaceChange}
          number={1}
        />
        <SearchBox
          onPlaceChange={this.onPlaceChange}
          number={2}
        />
        {/*<br/>*/}
        {/*{this.state.directions && directionsDisplay(this.state.directions)}*/}
        <br/>
        {this.state.directions &&
          <Panel
            id='googlePanel'
            header='Google Directions Options'
            ref={panel => this.googlePanel = panel}
            collapsible
            defaultExpanded={true}
          />
        }
        <GoogleMap
          googleMapURL={url}
          loadingElement={<div style={{ height: `100%` }}/>}
          containerElement={<div style={{ height: `500px` }}/>}
          mapElement={<div style={{ height: `100%` }}/>}
          onMapMounted={ref => this.map = ref}
          onBoundsChanged={this.onBoundsChanged}
          center={this.state.center}
        >
          {(this.state.marker1 && !this.state.directions) &&
          <Marker
            key='marker1'
            ref={marker => this.marker1 = marker}
            onPositionChanged={this.onMarker1Changed}
            position={this.state.marker1}
            draggable={false}
          />
          }
          {(this.state.marker2 && !this.state.directions) &&
          <Marker
            key='marker2'
            ref={marker => this.marker2 = marker}
            onPositionChanged={this.onMarker2Changed}
            position={this.state.marker2}
            draggable={false}
          />
          }
          {this.state.directions &&
          <DirectionsRenderer
            ref={directions => this.directions = directions}
            onDirectionsChanged={this.onDirectionsChanged}
            panel={document.getElementById('googlePanel')}
            // panel={this.googlePanel}
            directions={this.state.directions}
            options={{
              draggable: true,
            }}
          />
          }
        </GoogleMap>
      </div>
    );
  }
}

export default App;
