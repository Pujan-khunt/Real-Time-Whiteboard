const socket = io();

// canvas properties
const canvas = document.querySelector('#whiteboard');
const ctx = canvas.getContext('2d');
canvas.width = 1000;  
canvas.height = 600;

// Handling of clearing whiteboard
const clearBtn = document.querySelector('#clearBoard');
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clearBoard');
});

let drawingMode = false;

// calculating offset of canvas based on its location
function calculateCanvasOffset() {
    const data = canvas.getBoundingClientRect();
    return { x: data.left, y: data.top };
}

// drawing single points and also act as a starting point for a stroke
canvas.addEventListener('mousedown', (event) => {
    drawingMode = true;
    
    const offset = calculateCanvasOffset();
    const X = event.clientX - offset.x;
    const Y = event.clientY - offset.y;
    
    draw(X, Y, false);
    socket.emit('drawing', {
        x: X,
        y: Y,
        isStroke: false,
        color: ctx.strokeStyle,
        penSize: ctx.lineWidth
    })
});

canvas.addEventListener('mouseout', () => drawingMode = false);
canvas.addEventListener('mouseup', () => drawingMode = false);

canvas.addEventListener('mousemove', (event) => {
    if(!drawingMode) return;

    const offset = calculateCanvasOffset();
    const X = event.clientX - offset.x;
    const Y = event.clientY - offset.y;
    
    draw(X, Y, true);
    socket.emit('drawing', {
        x: X,
        y: Y,
        isStroke: true,
        color: ctx.strokeStyle,
        penSize: ctx.lineWidth
    });
});

function draw(X, Y, isStroke) {
    ctx.lineWidth = document.querySelector('#penSize').value || 2; /* Default size for pen */
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.getElementById('colorPicker').value || '#000000'; /* Default color (black) */

    if(isStroke) {
        ctx.lineTo(X, Y);
        ctx.stroke();
    } else{
        ctx.beginPath();
        ctx.moveTo(X, Y);
    }
}

socket.on('drawing', (data) => {
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.penSize;
    draw(data.x, data.y, data.isStroke);
})

socket.on('clearBoard', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

socket.on('userCount', (users) => {
    document.querySelector('#display-users').innerText = `Connected Users: ${users}`;
})

