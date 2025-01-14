document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json';
    const button = document.getElementById('get-location');
    const display = document.getElementById('location-display');
    let locations = [];

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            locations = data.features.map(feature => ({
                name: feature.properties.LOCATION,
                address: feature.properties.ADRESSE,
            }));
        })
        .catch(error => {
            display.innerHTML = `<div class="alert alert-danger">Fehler: ${error.message}</div>`;
        });

    button.addEventListener('click', () => {
        if (locations.length === 0) {
            display.innerHTML = `<div class="alert alert-warning">Die Daten sind noch nicht geladen. Bitte versuche es später erneut.</div>`;
            return;
        }

        const randomIndex = Math.floor(Math.random() * locations.length);
        const randomLocation = locations[randomIndex];

        display.innerHTML = `
            <div class="alert alert-success">
                <h3>${randomLocation.name}</h3>
                <p>${randomLocation.address}</p>
            </div>
        `;
    });
});