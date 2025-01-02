const canvas = document.querySelector('#whiteboard');
const ctx = canvas.getContext('2d');
console.log(canvas.getBoundingClientRect());
canvas.width = 1000;  
canvas.height = 600;

const penSize = document.querySelector('#penSize');

const clearBtn = document.querySelector('#clearBoard');
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let painting = false;
let lastX = 0;
let lastY = 0;

function calculateCanvasOffset() {
    const data = canvas.getBoundingClientRect();
    return { x: data.left, y: data.top };
}

canvas.addEventListener('mousedown', (event) => {
    painting = true;

    const offset = calculateCanvasOffset();
    lastX = event.clientX - offset.x;
    lastY = event.clientY - offset.y;
});

canvas.addEventListener('mouseup', () => {
    painting = false;
    
    // reset the drawing mode
    ctx.beginPath(); 
});

canvas.addEventListener('mousemove', (event) => {
    // dont draw unless the mouse is down
    if (!painting) return;

    const offset = calculateCanvasOffset();
    const x = event.clientX - offset.x;
    const y = event.clientY - offset.y;
    
    const thickness = penSize.value;

    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorPicker').value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();  
    ctx.moveTo(x, y); 
});
