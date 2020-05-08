const express = require("express");

const db = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
	db.get()
		.then((actions) => res.status(200).json(actions))
		.catch((err) => {
			console.log(err.message);
			res.status(500).json({ 
                error: "Unable to retrieve actions"
            });
		});
});

router.get("/:id", (req, res) => {
	db.get(req.params.id)
		.then((action) => {
			action
				? res.status(200).json(action)
				: res.status(404).json({ 
                    message: "Action not found" 
                });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ 
                error: "Unable to retrieve action" 
            });
		});
});

router.put("/:id", (req, res) => {
	if (Object.keys(req.body).length !== 0) {
		db.update(req.params.id, req.body)
			.then((action) => {
				action
					? res.status(200).json(action)
					: res.status(404).json({
                        message: "Action not found" 
                    });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ 
                    error: "Unable to update action" 
                });
			});
	} else {
		res.status(400).json({ 
            message: "Missing action data" 
        });
	}
});

router.delete("/:id", (req, res) => {
	db.remove(req.params.id)
		.then((count) => {
			count
				? res.sendStatus(200)
				: res.status(404).json({ 
                    message: "Action not found" 
                });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ 
                error: "Unable to delete action" 
            });
		});
});

module.exports = router; 