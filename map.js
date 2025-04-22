mapboxgl.accessToken =
"pk.eyJ1IjoibWlxdWVseGFtZW5hIiwiYSI6ImNtMWp0MTY2eDE0Y3IyanB5eTRpbDI4cTMifQ.nYe7wrw3RqtGoSYDtG7_uA"; 
// CREATE A NEW OBJECT CALLED MAP
const map = new mapboxgl.Map({
container: "map", // container ID for the map object (this points to the HTML element)
style: "mapbox://styles/miquelxamena/cm9rxg6jx00vv01s53zcd93q8", //YOUR STYLE URL
center: [-82.548205, 35.601878], // starting position [lng, lat] 
zoom: 11.18
projection: "globe", // display the map as a 3D globe
});