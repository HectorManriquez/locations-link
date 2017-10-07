import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const BareGoogleMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    center={props.center}
  >
    {props.children}
  </GoogleMap>
));

export default BareGoogleMap;