document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json';

    const button = document.getElementById('get-location');
    const display = document.getElementById('location-display');
    const mapContainer = document.getElementById('map');
    const loadingMessage = document.getElementById('loading-message');

    let locations = [];
    let map;
    let currentMarker;

    loadingMessage.textContent = "Daten werden geladen, bitte warten...";
    loadingMessage.classList.remove('d-none');
    button.disabled = true;

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
                coordinates: feature.geometry.coordinates || [],
            }));
            loadingMessage.classList.add('d-none');
            button.disabled = false;
        })
        .catch(error => {
            loadingMessage.textContent = "Fehler beim Laden der Daten.";
            alert(`Error: ${error.message}`);
        });

    function initializeMap(lat, lng) {
        if (!map) {
            map = L.map('map').setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
        } else {
            map.setView([lat, lng], 15);
        }
    }

    button.addEventListener('click', () => {
        if (locations.length === 0) {
            alert("Data is not loaded yet. Please try again later.");
            return;
        }

        const randomIndex = Math.floor(Math.random() * locations.length);
        const randomLocation = locations[randomIndex];
        const [lng, lat] = randomLocation.coordinates;

        if (!lat || !lng) {
            alert("Location coordinates are not available.");
            return;
        }

        display.innerHTML = `
            <h2>${randomLocation.title}</h2>
            <p><strong>Address:</strong> ${randomLocation.address}</p>
        `;
        display.classList.remove('d-none');

        mapContainer.classList.remove('d-none');
        initializeMap(lat, lng);

        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        currentMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<strong>${randomLocation.title}</strong><br>${randomLocation.address}`)
            .openPopup();
    });
});
