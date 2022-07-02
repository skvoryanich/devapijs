const sql = require("./db.js");

const Bot = function(bot) {
    this.name = bot.name;
    this.idTg = bot.idTg;
};

Bot.create = (newBot, result) => {
    sql.query("INSERT INTO bots SET ?", newBot, (err, res) => {
        if (err) {result(null, err); return;}

        result(null, { id: res.insertId, ...newBot });
    });
};

Bot.findById = (id, result) => {
    sql.query(`SELECT * FROM bots WHERE id = ${id}`, (err, res) => {
        if (err) {result(null, err); return;}

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Bot.getAll = (name, result) => {
    let query = "SELECT * FROM bots";
    if (name) {query += ` WHERE name LIKE '%${name}%'`;}

    sql.query(query, (err, res) => {
        if (err) {result(null, err); return;}

        result(null, res);
    });
};

Bot.updateById = (id, bot, result) => {
    sql.query("UPDATE bots SET name = ?, idTg = ? WHERE id = ?", [bot.name, bot.idTg, id], (err, res) => {
        if (err) {result(null, err); return;}

        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { id: id, ...bot });
    });
};

Bot.remove = (id, result) => {
    sql.query("DELETE FROM bots WHERE id = ?", id, (err, res) => {
        if (err) {result(null, err); return;}

        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Bot;