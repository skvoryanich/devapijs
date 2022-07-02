module.exports = app => {
    const bots = require("../controllers/bots.controller.js");
    let router = require("express").Router();

    router.post("/", bots.create);
    router.get("/", bots.findAll);
    router.get("/:id", bots.findOne);
    router.put("/:id", bots.update);
    router.delete("/:id", bots.delete);

    app.use('/bots', router);
};