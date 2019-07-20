const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.Book
            .find(req.query)
            // .sort({ date: -1 })
            .then(dbModelBook => res.json(dbModelBook))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Book
            .findById(req.params.id)
            .then(dbModelBook => res.json(dbModelBook))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Book
            .create(req.body)
            .then(dbModelBook => res.json(dbModelBook))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Book
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModelBook => res.json(dbModelBook))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbModelBook => dbModelBook.remove())
            .then(dbModelBook => res.json(dbModelBook))
            .catch(err => res.status(422).json(err));
    }
};
