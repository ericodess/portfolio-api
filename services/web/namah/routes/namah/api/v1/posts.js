const express = require("express");

//Models
const { getConnection, getQuery } = require("../../../../models");

//Services
const { translateObjectListKeys } = require("../../../../services");

const router = express.Router();

router.get("/", (req, res) => {
    getConnection(async (error, connection) => {
        if (!error && connection) {
            await getQuery(connection, {
                queryRequest: req.query,
                queryTargetTable: "posts",
                queryIsLimitless: true,
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(404).json({
                            wasSuccessful: false,
                            description: "No posts found",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            posts: translateObjectListKeys(result),
                        });
                    }
                })
                .catch((error) => {
                    if (error.code === "ER_BAD_FIELD_ERROR") {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Invalid query parameter",
                        });
                    } else {
                        res.status(500).json({
                            wasSuccessful: false,
                            description: "Server error, please try again",
                        });
                    }
                });

            connection.release();
        } else {
            res.status(500).json({
                wasSuccessful: false,
                description: "Server error, please try again",
            });
        }
    });
});

module.exports = router;
