const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const url = "http://localhost:8081"
const corsOptions = {origin: url};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "RESTfull api for telegram reminds" });
});

require("./routes/bots.routes.js")(app);

app.listen(8080, () => {
    console.log(`Server is running. Link ${url}.`);
});