const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.Googlebook
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModelGoogleBook => res.json(dbModelGoogleBook))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Googlebook
            .findById(req.params.id)
            .then(dbModelGoogleBook => res.json(dbModelGoogleBook))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Googlebook
            .create(req.body)
            .then(dbModelGoogleBook => res.json(dbModelGoogleBook))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Googlebook
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModelGoogleBook => res.json(dbModelGoogleBook))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Googlebook
            .findById({ _id: req.params.id })
            .then(dbModelGoogleBook => dbModelGoogleBook.remove())
            .then(dbModelGoogleBook => res.json(dbModelGoogleBook))
            .catch(err => res.status(422).json(err));
    }
};
