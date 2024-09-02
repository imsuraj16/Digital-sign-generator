// Text-based Signature
document.getElementById('nameInput').addEventListener('input', function() {
    const signature = document.getElementById('signature');
    signature.textContent = this.value;
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const signatureText = document.getElementById('signature').textContent;
    navigator.clipboard.writeText(signatureText).then(() => {
        alert('Signature copied to clipboard!');
    });
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const signatureText = document.getElementById('signature').textContent;

    // Set canvas dimensions and styles
    canvas.width = 500;
    canvas.height = 150;
    ctx.font = '36px cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';

    // Draw the signature text on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);

    // Download the canvas content as an image
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'signature.png';
    link.click();
});

// Free-hand Signature
const drawCanvas = document.getElementById('drawCanvas');
const ctx = drawCanvas.getContext('2d');
let drawing = false;

drawCanvas.addEventListener('mousedown', startDrawing);
drawCanvas.addEventListener('mouseup', stopDrawing);
drawCanvas.addEventListener('mousemove', draw);

function startDrawing(e) {
    drawing = true;
    draw(e); // Start drawing immediately when the mouse is pressed down
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Reset the context path so new lines don't connect to the previous ones
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    // Get mouse position relative to the canvas
    const rect = drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Clear canvas
document.getElementById('clearBtn').addEventListener('click', function() {
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

// Download the drawn signature as an image
document.getElementById('downloadDrawnBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = drawCanvas.toDataURL('image/png');
    link.download = 'drawn_signature.png';
    link.click();
});
