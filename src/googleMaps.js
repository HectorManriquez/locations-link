import { createClient } from '@google/maps'

export const key = process.env.GOOGLE_MAPS_API_KEY;
export const url = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=places`;

const googleMapsClient = createClient({
  key,
  Promise,
});

export default googleMapsClient;