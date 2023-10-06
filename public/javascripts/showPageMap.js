mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 8
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ "color": "#73F138"})
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25})
            .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);

