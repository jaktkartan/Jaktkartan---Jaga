document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([56.0, 13.0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Example of adding GeoJSON data
    const geoJsonLayer = L.geoJSON().addTo(map);

    // Load GeoJSON from Firestore
    db.collection('hunting_areas').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            geoJsonLayer.addData(doc.data());
        });
    });

    // Add new GeoJSON data
    function addGeoJsonData(geoJson) {
        geoJsonLayer.addData(geoJson);
        db.collection('hunting_areas').add(geoJson);
    }
});
