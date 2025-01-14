document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dataContainer.innerHTML = `
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Completed:</strong> ${data.completed}</p>
            `;
        })
        .catch(error => {
            dataContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});