const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("toy/addOrEdit", {
        viewTitle: "Insert Toy Information"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var toy = new Toy();
    toy.fullName = req.body.fullName;
    toy.amount = req.body.amount;
    toy.price = req.body.price;
    toy.company = req.body.company;

    toy.save((err, doc) => {
        if (!err) {
            res.redirect('toy/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("toy/addOrEdit", {
                    viewTitle: "Insert Toy Information",
                    toy: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Toy.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('toy/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("toy/addOrEdit", {
                    viewTitle: 'Update Toy Information',
                    toy: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Toy.find((err, docs) => {
        if (!err) {
            res.render("toy/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Toy.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("toy/addOrEdit", {
                viewTitle: "Update Toy Information",
                toy: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Toy.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/toy/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'amount':
                body['amountError'] = err.errors[field].message;
                break;

            case 'price':
                body['priceError'] = err.errors[field].message;
                break;

            case 'company':
                body['companyError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;