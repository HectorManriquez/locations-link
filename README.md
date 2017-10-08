## Locations Link

A responsive react application that connects to Google Maps API through an npm package called react-google-maps, which wraps the API into react components.

Allows for input and selection of locations through Google Places API and placement of markers and routes through the Google Maps Javascript API.

Markers are places as soon as you finish your input, and directions are displayed when the second one is entered.

A panel is shown with relevant directions information and alternate routes which you can click on to choose an alternate route.

Places can be changed and the driving directions are recalculated.

Map is resized and recentered to accommodate placed markers.

##### Development

To run a development instance run:
```node
npm start
```

This was created through `create-react-app` so follow the documentation for different deployment scripts.

##### Notes:

Make sure to set your google api key in `src/googlemaps.js`.

