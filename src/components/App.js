/* global google */
import React, { Component } from 'react';

import './App.css';
import Navigation from './Navigation/Navigation';
import SearchBox from './SearchBox/SearchBox';
import GoogleMap from './GoogleMap/GoogleMap';
import { Marker, DirectionsRenderer } from 'react-google-maps';

function boundsAdd(place, boundsObject) {
  const { geometry: { location, viewport } } = place;
  viewport ? boundsObject.union(viewport) : boundsObject.extend(location);
  Promise.resolve();
}

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
      map: null,
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

        await boundsAdd(this.state.place1, bounds);
        await boundsAdd(this.state.place2, bounds);

        DirectionsService.route({
          origin: new google.maps.LatLng(this.state.marker1),
          destination: new google.maps.LatLng(this.state.marker2),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });

        this.state.map.fitBounds(bounds);
      }
    });
  }

  onBoundChange = ({ center, map }) => {
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng(),
      },
      map,
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
        <GoogleMap
          onBoundChange={this.onBoundChange}
          center={this.state.center}
        >
          {(this.state.marker1 && !this.state.directions) && <Marker key='Marker1' position={this.state.marker1}/>}
          {(this.state.marker2 && !this.state.directions) && <Marker key='Marker2' position={this.state.marker2}/>}
          {this.state.directions && <DirectionsRenderer directions={this.state.directions}/>}
        </GoogleMap>
      </div>
    );
  }
}

export default App;
