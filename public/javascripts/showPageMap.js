if (!campground.geometry || !campground.geometry.coordinates) {
    document.getElementById('map').style.display = 'none';
} else {
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: campground.geometry.coordinates,
        zoom: 8
    });
    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: '#73F138' })
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
        )
        .addTo(map);
}


    

