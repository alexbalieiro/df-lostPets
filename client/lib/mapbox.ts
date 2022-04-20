import "dotenv/config";
import * as MapboxClient from "mapbox";
import mapboxgl from "mapbox-gl";

const mapboxClient = new MapboxClient(process.env.MAPBOX_TOKEN);
function initMap() {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-64.1757056, -31.405335], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });
}
function initSearchForm(lng, lat, callback) {
  mapboxClient.geocodeReverse(
    {
      longitude: lng,
      latitude: lat,
    },
    function (err, data, res) {
      if (!err) callback(data.features);
    }
  );
}
const mapbox = mapboxgl;

export { initMap, initSearchForm, mapbox };
