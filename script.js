document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json';
    const button = document.getElementById('get-location');
    const display = document.getElementById('location-display');
    let locations = [];

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            return response.json();
        })
        .then(data => {
            locations = data.features.map(feature => ({
                title: feature.properties.LOCATION || "Title unavailable",
                address: feature.properties.ADRESSE || "Address unavailable",
                email: feature.properties.EMAIL || "No email address",
            }));
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });

    button.addEventListener('click', () => {
        if (locations.length === 0) {
            alert("Data is not loaded yet. Please try again later.");
            return;
        }

        const randomIndex = Math.floor(Math.random() * locations.length);
        const randomLocation = locations[randomIndex];

        display.innerHTML = `
            <h1>${randomLocation.title}</h1>
            <p><strong>Address:</strong> ${randomLocation.address}</p>
            <p><strong>Email:</strong> ${randomLocation.email}</p>
        `;
        display.classList.remove('d-none');
    });
});