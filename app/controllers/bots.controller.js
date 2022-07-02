const Bot = require("../models/bots.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "error"});
    }

    const bot = new Bot({
        name: req.body.name,
        idTg: req.body.idTg,
    });

    Bot.create(bot, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;

    Bot.getAll(name, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    Bot.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Bot with id ${req.params.id} not found`});
            } else {
                res.status(500).send({message: "Error get Bot with id " + req.params.id});
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "error"});
    }

    Bot.updateById(req.params.id, new Bot(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Bot with id ${req.params.id} not found`});
            } else {
                res.status(500).send({message: "Error update Bot with id " + req.params.id});
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    Bot.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `Bot with id ${req.params.id} not found`});
            } else {
                res.status(500).send({message: "Error delete Bot with id " + req.params.id});
            }
        } else {
            res.send({ message: `Bot was deleted successfully! ${data}` });
        }
    });
};