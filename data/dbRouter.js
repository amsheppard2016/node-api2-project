const express = require("express");
const dbs = require("./db.js");
const router = express.Router();

router.post("/", (req, res) => {
    dbs.insert(req.body)
        .then((db) => {
            if (
                req.body.title !== undefined ||
                req.body.contents !== undefined
            ) {
                console.log(db);
                res.status(201).json(db);
            } else {
                res.status(400).json({
                    errorMessage:
                        "Please provide title and contents for the post.",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error:
                    "There was an error while saving the post to the database",
            });
        });
});

router.post("/:id/comments", (req, res) => {
    dbs.insertComment(req.params.id)
        .then((comment) => {
            if (comment) {
                if (comment.text === undefined) {
                    res.status(400).json({
                        errorMessage: "Please provide text for the comment.",
                    });
                } else {
                    console.log(comment);
                    res.status(201).json(comment[0].text);
                }
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error:
                    "There was an error while saving the comment to the database",
            });
        });
});

router.get("/", (req, res) => {
    dbs.find(req.query)
        .then((db) => {
            res.status(200).json(db);
        })
        .catch((error) => {
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            });
        });
});

router.get("/:id", (req, res) => {
    dbs.findById(req.params.id)
        .then((db) => {
            if (db) {
                res.status(200).json(db);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

router.get("/:id/comments", (req, res) => {
    dbs.findCommentById(req.params.id)
        .then((post) => {
            if (post) {
                console.log(post[0].post);
                res.status(200).json(post[0].post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "The comments information could not be retrieved.",
            });
        });
});

router.delete("/:id", (req, res) => {
    dbs.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json();
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed" });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    dbs.update(req.params.id, changes)
        .then((post) => {
            if (post) {
                if (
                    changes.title === undefined ||
                    changes.contents === undefined
                ) {
                    res.status(400).json({
                        errorMessage:
                            "Please provide title and contents for the post.",
                    });
                } else {
                    res.status(200).json(changes);
                }
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })

        .catch((error) => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

module.exports = router;
