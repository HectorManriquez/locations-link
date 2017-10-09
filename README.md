# Locations Link

A responsive react application that connects to Google Maps API through an npm package called react-google-maps, which wraps the API into react components.

Allows for input and selection of locations through Google Places API and placement of markers and routes through the Google Maps Javascript API.

Markers are places as soon as you finish your input, and directions are displayed when the second one is entered.

A panel is shown with relevant directions information and alternate routes which you can click on to choose an alternate route.

Places can be changed and the driving directions are recalculated.

Map is resized and recentered to accommodate placed markers.

### Development

To run a development instance run:
```node
npm start
```


### Production

`Host: http://localhost:8080/`

#### Build

Run one of the following:
```
npm run build
yarn build
```

#### Docker compose

To build image first:
Make sure to run the above npm build first.
```
docker-compose build
```

To spin up server:
```
docker-compose up -d
```

Or both at the same time:
Always builds, not always optimal.
```
docker-compose up -d --build
```

This was created through `create-react-app` so follow the documentation for different deployment scripts.

##### Notes:

##### Google Maps API

Make sure to set your google api key in `src/googlemaps.js` if running development instance.

Update `docker-compose.yml` environment variable for docker instance.