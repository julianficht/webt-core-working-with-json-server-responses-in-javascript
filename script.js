document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');

    fetch('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRAUMHOCHZEITOGD&srsName=EPSG:4326&outputFormat=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            dataContainer.innerHTML = `
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        })
        .catch(error => {
            dataContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});