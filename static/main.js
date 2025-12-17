const form = document.getElementById('upload-form');
const table = document.getElementById('product-table');
form.onsubmit = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('leaflet');
    const formData = new FormData();
    formData.append('leaflet', fileInput.files[0]);
    try{
        const response = await fetch('/upload',{
            method: 'POST',
            body : formData

        });
        const products = await response.json
        // clear previous table rows
        table.innerHTML=<tr><th>Name</th><th>Price</th></tr>;
        
        // Render new Products
        products.foreach(product=>{
            const row = table.insertRow();
            row.insertcell(0).textcontext = product.name;
            row.insertCell(1).textContent = product.price;
            row.onclick=()=> alert(`You selected: ${product.name}`);
        });
    } catch (err){
        console.error("Upload failed:", err);
    };









}