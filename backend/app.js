const express = require('express');
const cors = require('cors')
const { PORT } = require('./src/constants/constant');
const app = express();
const router = require('./src/route/route');

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT ", PORT);
});