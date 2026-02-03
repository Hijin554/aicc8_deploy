const { response } = require('express');
const database = require('../database/database');
exports.updateComplitedTask = async (req, res) => { // 반드시 req, res 순서대로 있어야 함!
    try {

        return res.status(200).json({ message: "Update Success" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.updateTask = async (req, res) => { // 반드시 req, res 순서대로 있어야 함!
    const { description, title, isCompleted, _id, isImportant } = req.body;
    try {
        await database.pool.query(
            "UPDATE tasks SET title = $1, description = $2,date = $3, iscompleted = $4, isimportant = $5 WHERE _id = $6",
            [title, description, date, isCompleted, isImportant, _id]
        );
        return res.status(200).json({ message: "Task Update Success" });
    } catch (error) {
        return res.status(500).json({ message: "Update Task Fail : " + error });
    }
};
