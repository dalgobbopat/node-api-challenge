const express = require("express");

const db = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");

const router = express.Router();



router.get("/", (req, res) => {
    db.get()
        .then((projects) => res.status(200).json(projects))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error:"Unable to retrieve prokects"
            });
        });
});

router.post("/", (req, res) => {
	if (req.body.name && req.body.description) {
		db.insert(req.body)
			.then((project) => res.status(201).json(project))
			.catch((err) => {
				console.log(err);
				res.status(500).json({ 
                    error: "Unable to create project" 
                });
			});
	} else {
		res
			.status(400)
			.json({ 
                message: "Project must include name and description" 
            });
	}
});

router.use("/:id", validateProjectId);

router.get("/:id", (req, res) => {
    db.get(req.params.id)
        .then((project) => res.status(200).json(project))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error:"Unable to retrieve projects"
            });
        });
});

router.get("/:id/actions", (req,res) => {
    db.getProjectActions(req.params.id)
        .then((actions) => res.status(200).json(actions))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error:"Unable to retrieve projects"
            })
        })
})

router.post("/:id/actions", (req, res) => {

	if (req.body.description && req.body.notes) {
		actionsDB
			.insert({ ...req.body, ["project_id"]: req.params.id })
			.then((action) => res.status(201).json(action))
			.catch((err) => {
				console.log(err);
				res.status(500).json({ 
                    error: "Unable to create action" 
                });
			});
	} else {
		res
			.status(400)
			.json({ 
                message: "Action must include description and notes" 
            });
	}
});	

router.put("/:id", (req, res) => {
	if (Object.keys(req.body).length !== 0) {
		db.update(req.params.id, req.body)
			.then((project) => res.status(200).json(project))
			.catch((err) => {
				console.log(err);
				res.status(500).json({ 
                    error: "Unable to update project" 
                });
			});
	} else {
		res.status(400).json({ 
            message: "Missing project data" 
        });
	}
});


router.delete("/:id", (req, res) => {
	db.remove(req.params.id)
		.then(() => res.sendStatus(200))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ 
                error: "Unable to delete project" 
            });
		});
});	


// middleware
function validateProjectId(req, res, next) {
	db.get(req.params.id)
		.then((project) => {
			project ? next() : res.status(400).json({ 
                message: "Project not found" 
            });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ 
                error: "Unable to retrieve projects" 
            });
		});
}



module.exports = router; 