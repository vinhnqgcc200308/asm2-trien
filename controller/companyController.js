const express = require('express');
const mongoose = require('mongoose');
const Com = mongoose.model('Company');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("com/company", {
        viewTitle: "Insert Company Information"
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
    var com = new Com();
    com.comName = req.body.comName;
    com.email = req.body.email;
    com.city = req.body.city;
    com.mobile = req.body.mobile;

    com.save((err, doc) => {
        if (!err) {
            res.redirect('com/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("com/company", {
                    viewTitle: "Insert Company Information",
                    com: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Com.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('com/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("com/company", {
                    viewTitle: 'Update Company Information',
                    com: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Com.find((err, docs) => {
        if (!err) {
            res.render("com/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Com.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("com/company", {
                viewTitle: "Update Company Information",
                com: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Com.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/com/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'comName':
                body['comNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;

            case 'city':
                body['cityError'] = err.errors[field].message;
                break;

            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;