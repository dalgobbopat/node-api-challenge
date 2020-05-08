const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(404).json({
                err,
                errorMessage: "Projects not found."
            });
        });
});

router.get("/:id", (req, res) => {
    db.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(404).json({
                err,
                errorMessage: "Project not found."
            });
        });
});

router.post("/", (req, res) => {
    if(req.body.name && req.body.description) {
        db.insert(req.body)
        .then(newProject => {
            res.status(200).json(newProject);
        })
        .catch(err => {
            res.status(500).json({
                err, 
                errorMessage: "Project could not be created."
            });
        });
    } else {
        res.status(500).json({
            errorMessage: "Please include a name, and description."
        });
    }
});

router.put("/:id", (req, res) => {

});

router.delete("/id", (req, res) => {

});



module.exports = router; 