mapboxgl.accessToken = ""; 

// CREATE A NEW OBJECT CALLED MAP
const map = new mapboxgl.Map({
container: "maphubs", // container ID for the map object (this points to the HTML element)
style: "mapbox://styles/miquelxamena/cm9rocgju006b01qt3y1t3va4", //YOUR STYLE URL
center: [-82.548205, 35.601878], // starting position [lng, lat] 
zoom: 11.18,
projection: "globe", // display the map as a 3D globe
});


// CREATE LEGEND AND POPUP

// Wait for the map to load
map.on('load', () => {
    // Create a popup but don't add it to the map yet
    const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
    });

    // Get all layers in the map
    const mapLayers = map.getStyle().layers;
    
    // Log all layer IDs to help identify your tileset layer
    console.log('Available layers:', mapLayers.map(layer => layer.id));

    // Add click event specifically for your tileset layer
    map.on('click', 'tilsethubs', (e) => {
        if (!e.features.length) return;

        // Get the coordinates from the clicked feature
        const coordinates = e.features[0].geometry.coordinates.slice();
        
        // Get just the name property
        const name = e.features[0].properties.description;

        // Create simple popup content with just the name
        const popupContent = `<div class="popup-content"><h3>${name}</h3></div>`;

        // Handle coordinate wrapping
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Set the popup content and location
        popup
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Change the cursor to a pointer when hovering over the tileset layer
    map.on('mouseenter', 'tilsethubs', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to default when it leaves
    map.on('mouseleave', 'tilsethubs', () => {
        map.getCanvas().style.cursor = '';
    });

    // Add the legend
    const legendItems = [
        ['Supply Centers', '#90cefe'],
        ['Meals', '#feaeae'],
        ['Interfaith Assistance Ministry', '#9092fd'],
        ['Shelter', '#bbe7cb'],
        ['Showers', '#1e4efa'],
        ['Wifi', '#ff3333'],
        ['Clothes', '#fdd290'],
        ['Organizations', '#a7a5a5'],
        ['Others (insulin, laundries, etc.)', '#000000']
    ];

    const legend = document.getElementById('legend');

    legendItems.forEach(([name, color]) => {
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.style.backgroundColor = color;
        item.appendChild(key);

        const value = document.createTextNode(name);
        item.appendChild(value);
        legend.appendChild(item);
    });
});
