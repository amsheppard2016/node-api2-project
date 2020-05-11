const app = require("./server.js");

const PORT = 4000;

app.listen(4000, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});
