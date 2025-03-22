// Get elements
const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");
const uploadBtn = document.getElementById("uploadBtn");
const clearSignature = document.getElementById("clearSignature");
const fileInput = document.getElementById("fileInput");

// Adjust canvas size
canvas.width = 350;
canvas.height = 200;

// Variables for drawing
let drawing = false;

// Start drawing
canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

// Drawing function
function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Clear signature
clearSignature.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Handle file upload
uploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please upload a document first.");
        return;
    }

    // Convert signature to image
    const signatureData = canvas.toDataURL("image/png");
    
    // Convert the file & signature into FormData for backend
    const formData = new FormData();
    formData.append("document", file);
    formData.append("signature", signatureData);

    // Send to backend (next step: build the server)
    fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => alert(`File uploaded successfully: ${data.url}`))
    .catch(error => console.error("Error:", error));
});
