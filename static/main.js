// Grab form and table elements
const form = document.getElementById('upload-form');
const table = document.getElementById('products-table');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submission

    const fileInput = document.getElementById('leaflet');

    if (!fileInput.files.length) {
        alert("Please select an image file.");
        return;
    }

    const formData = new FormData();
    formData.append('leaflet', fileInput.files[0]);

    console.log("Uploading file...");

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            alert("Upload failed. Check console for details.");
            console.error("Server response:", response.statusText);
            return;
        }

        const products = await response.json();
        console.log("Products received:", products);

        // Clear existing table rows (except header)
        table.innerHTML = '<tr><th>Name</th><th>Price</th></tr>';

        // Populate table with products
        products.forEach(product => {
            const row = table.insertRow();
            row.insertCell(0).textContent = product.name;
            row.insertCell(1).textContent = product.price;

            row.addEventListener('click', () => {
                alert(`You selected: ${product.name}`);
            });
        });

    } catch (err) {
        console.error("Upload error:", err);
        alert("An error occurred during upload.");
    }
});
