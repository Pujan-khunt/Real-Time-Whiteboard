const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('static'));

app.listen(PORT, () => {
    console.log(`Real Time Whiteboard Application Running At http://localhost:${PORT}`);
})